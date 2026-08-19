/**
 * ARPON — MALAYSIA 2027
 * Pure Supabase Cloud Database & Realtime Synchronization Engine
 * Zero CORS issues • 100% Direct PostgreSQL & WebSockets
 */

import { appState } from './state.js';
import { supabaseManager } from './supabase.js';

class CloudSyncEngine {
  constructor() {
    this.isSyncing = false;
    this.lastSyncedAt = null;
    this.status = 'connected'; // 'connected' | 'syncing' | 'offline'
    this.pollInterval = null;
    this.listeners = [];

    this.init();
  }

  init() {
    // Start periodic background check (every 5 seconds) to ensure all devices stay in sync
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

  // Push local changes directly to Supabase Database & Realtime Channel
  async pushToCloud() {
    this.setStatus('syncing');

    try {
      const success = await supabaseManager.pushData(appState.sections);
      if (success) {
        this.lastSyncedAt = new Date();
        this.setStatus('connected');
      } else {
        this.setStatus('connected'); // Offline fallback to localStorage
      }
    } catch (e) {
      this.setStatus('offline');
    }
  }

  // Pull latest updates from Supabase Database
  async pullFromCloud() {
    if (this.isSyncing) return;
    this.isSyncing = true;

    try {
      const remoteData = await supabaseManager.pullData();
      if (remoteData && Array.isArray(remoteData)) {
        supabaseManager.handleIncomingData(remoteData, new Date().toISOString(), 'Supabase Cloud');
        this.lastSyncedAt = new Date();
        this.setStatus('connected');
      }
    } catch (e) {
      this.setStatus('offline');
    } finally {
      this.isSyncing = false;
    }
  }

  startPolling() {
    if (this.pollInterval) clearInterval(this.pollInterval);

    // Initial pull
    this.pullFromCloud();

    // Check every 5 seconds for continuous cross-device sync
    this.pollInterval = setInterval(() => {
      this.pullFromCloud();
    }, 5000);
  }

  setSyncPasscode(newKey) {
    // Kept for backward compatibility
    this.pullFromCloud();
  }
}

export const cloudSync = new CloudSyncEngine();
