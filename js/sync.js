/**
 * ARPON — MALAYSIA 2027
 * Real-Time Cloud Database & Multi-Device Sync Engine
 * Synchronizes PC and iOS Phone in real-time
 */

import { appState } from './state.js';
import { showToast } from './modals.js';
import { supabaseManager } from './supabase.js';

// Default private sync vault key for Arpon Chakraborty
const DEFAULT_SYNC_KEY = 'arpon_official01_malaysia2027_vault';
const SYNC_CONFIG_STORAGE_KEY = 'arpon_sync_config_v1';

class CloudSyncEngine {
  constructor() {
    this.syncKey = DEFAULT_SYNC_KEY;
    this.isSyncing = false;
    this.lastSyncedAt = null;
    this.status = 'connected'; // 'connected' | 'syncing' | 'offline'
    this.pollInterval = null;
    this.isRemoteApplying = false;
    this.listeners = [];

    this.init();
  }

  init() {
    try {
      const stored = localStorage.getItem(SYNC_CONFIG_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.syncKey) this.syncKey = parsed.syncKey;
        if (parsed.binId) this.binId = parsed.binId;
      }
    } catch (e) {
      console.warn('Sync config parse error', e);
    }

    // Start background sync heartbeat (every 4 seconds for instant cross-device updates)
    this.startPolling();
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach(l => l(this));
  }

  setStatus(status) {
    this.status = status;
    this.notify();
  }

  // Push local changes to cloud database
  async pushToCloud() {
    if (this.isRemoteApplying) return; // Don't bounce back an update that came from remote
    this.setStatus('syncing');

    try {
      // 1. Push to Supabase if connected
      supabaseManager.pushData(appState.sections);

      // 2. Push to Cloud Storage channel
      const payload = {
        updatedAt: new Date().toISOString(),
        device: navigator.userAgent.includes('iPhone') ? 'iOS' : 'PC',
        syncKey: this.syncKey,
        sections: appState.sections
      };

      const endpoint = `https://kvdb.io/4y9nQe8c1k2v8z7x6/arpon_${this.syncKey}`;
      
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        this.lastSyncedAt = new Date();
        this.setStatus('connected');
      } else {
        this.setStatus('connected');
      }
    } catch (e) {
      this.setStatus('offline');
    }
  }

  // Pull latest updates from cloud database (run on phone or PC)
  async pullFromCloud(isInitial = false) {
    if (this.isSyncing) return;
    this.isSyncing = true;

    try {
      const endpoint = `https://kvdb.io/4y9nQe8c1k2v8z7x6/arpon_${this.syncKey}`;
      const res = await fetch(endpoint, {
        method: 'GET',
        headers: { 'Cache-Control': 'no-cache' }
      });

      if (res.ok) {
        const data = await res.json();
        if (data && data.sections && Array.isArray(data.sections)) {
          // Check if remote data is newer than local state
          const localStored = localStorage.getItem('arpon_malaysia_2027_data_v1.2');
          let localUpdatedAt = '1970-01-01T00:00:00.000Z';
          if (localStored) {
            try {
              const localParsed = JSON.parse(localStored);
              if (localParsed.updatedAt) localUpdatedAt = localParsed.updatedAt;
            } catch (e) {}
          }

          if (!data.updatedAt || new Date(data.updatedAt) > new Date(localUpdatedAt)) {
            this.isRemoteApplying = true;
            appState.sections = data.sections;
            appState.save();
            this.isRemoteApplying = false;
            this.lastSyncedAt = new Date();
            this.setStatus('connected');
            if (isInitial) {
              showToast(`Synced with Cloud Database (${data.device || 'Remote'})`, 'success');
            }
          }
        }
      }
      this.setStatus('connected');
    } catch (e) {
      this.setStatus('offline');
    } finally {
      this.isSyncing = false;
    }
  }

  startPolling() {
    if (this.pollInterval) clearInterval(this.pollInterval);
    
    // Initial fetch
    this.pullFromCloud(true);

    // Poll every 3.5s for real-time live sync across devices
    this.pollInterval = setInterval(() => {
      this.pullFromCloud();
    }, 3500);
  }

  setSyncPasscode(newKey) {
    if (!newKey || !newKey.trim()) return;
    this.syncKey = newKey.trim().toLowerCase().replace(/[^a-z0-9_]/g, '_');
    localStorage.setItem(SYNC_CONFIG_STORAGE_KEY, JSON.stringify({ syncKey: this.syncKey }));
    showToast(`Sync Passcode updated: ${this.syncKey}`, 'success');
    this.pullFromCloud(true);
  }
}

export const cloudSync = new CloudSyncEngine();
