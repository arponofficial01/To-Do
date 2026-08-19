/**
 * ARPON — MALAYSIA 2027
 * Supabase Database & Realtime Sync Engine (Ultra-Resilient)
 * Realtime synchronization across all devices (PC, iOS, Tablet)
 */

import { appState } from './state.js';
import { showToast } from './modals.js';

const SUPABASE_STORAGE_KEY = 'arpon_supabase_config_v1';

// Arpon's Supabase Project Configuration
const SUPABASE_CONFIG = {
  url: 'https://vahtkuhruwzjyzmrvskv.supabase.co',
  anonKey: 'sb_publishable_9ZJtBGLaq_GvpokdnpYkJQ_ZVBuZyqM',
  tableName: 'arpon_todos',
  userId: 'arpon_official01'
};

class SupabaseManager {
  constructor() {
    this.client = null;
    this.config = { ...SUPABASE_CONFIG };
    this.isConnected = false;
    this.channel = null;
    this.isRemoteApplying = false;
    this.lastSentPayloadHash = '';
    this.init();
  }

  init() {
    try {
      const stored = localStorage.getItem(SUPABASE_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        this.config = { ...this.config, ...parsed };
      }
    } catch (e) {
      console.warn('Supabase config error', e);
    }

    this.initClient();
  }

  initClient() {
    if (window.supabase && this.config.url && this.config.anonKey) {
      try {
        this.client = window.supabase.createClient(this.config.url, this.config.anonKey, {
          realtime: {
            params: {
              eventsPerSecond: 10
            }
          }
        });
        this.isConnected = true;
        this.setupRealtimeListeners();
        this.pullLatestOnStartup();
      } catch (e) {
        console.warn('Supabase initialization fallback', e);
        this.isConnected = false;
      }
    }
  }

  // Set up both Postgres CDC and Realtime Broadcast listeners
  setupRealtimeListeners() {
    if (!this.client) return;

    try {
      if (this.channel) {
        this.client.removeChannel(this.channel);
      }

      this.channel = this.client
        .channel('arpon_realtime_tasks_channel')
        // 1. Broadcast channel (instant sub-300ms peer-to-peer relay)
        .on('broadcast', { event: 'task_sync' }, (event) => {
          if (event && event.payload && event.payload.sections) {
            this.handleIncomingData(event.payload.sections, event.payload.updatedAt, event.payload.device);
          }
        })
        // 2. Postgres Database row changes (CDC)
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: this.config.tableName,
            filter: `id=eq.${this.config.userId}`
          },
          (payload) => {
            if (payload && payload.new && payload.new.data) {
              this.handleIncomingData(payload.new.data, payload.new.updated_at, 'Supabase DB');
            }
          }
        )
        .subscribe((status) => {
          if (status === 'SUBSCRIBED') {
            console.log('⚡ Supabase Realtime Connected across devices');
          }
        });
    } catch (e) {
      console.warn('Realtime subscription error', e);
    }
  }

  // Handle incoming remote updates without glitching or looping
  handleIncomingData(sections, updatedAt, sourceDevice = 'Cloud') {
    if (!sections || !Array.isArray(sections)) return;

    const payloadHash = JSON.stringify(sections);
    if (payloadHash === this.lastSentPayloadHash) return;

    this.isRemoteApplying = true;
    this.lastSentPayloadHash = payloadHash;
    appState.sections = sections;
    appState.save();
    this.isRemoteApplying = false;

    // Optional subtle badge notification
    console.log(`Synced from ${sourceDevice}`);
  }

  // Fetch initial data on startup to ensure instant cross-device parity
  async pullLatestOnStartup() {
    if (!this.client || !this.isConnected) return;

    try {
      const { data, error } = await this.client
        .from(this.config.tableName)
        .select('*')
        .eq('id', this.config.userId)
        .single();

      if (!error && data && data.data && Array.isArray(data.data)) {
        this.handleIncomingData(data.data, data.updated_at, 'Supabase Database');
      } else if (error && error.code === 'PGRST116') {
        // No row yet, seed initial data to Supabase
        await this.pushData(appState.sections);
      }
    } catch (e) {
      console.warn('Initial Supabase pull error', e);
    }
  }

  // Push local changes to Supabase Database & Realtime channel
  async pushData(sections) {
    if (!this.client || !this.isConnected || this.isRemoteApplying) return false;

    const payloadHash = JSON.stringify(sections);
    this.lastSentPayloadHash = payloadHash;

    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    const deviceLabel = isIOS ? 'iPhone' : 'PC';
    const nowIso = new Date().toISOString();

    try {
      // 1. Broadcast instantaneously via Realtime websocket
      if (this.channel) {
        this.channel.send({
          type: 'broadcast',
          event: 'task_sync',
          payload: {
            sections,
            updatedAt: nowIso,
            device: deviceLabel
          }
        });
      }

      // 2. Persist to PostgreSQL Table
      const { error } = await this.client
        .from(this.config.tableName)
        .upsert({
          id: this.config.userId,
          data: sections,
          updated_at: nowIso
        });

      return !error;
    } catch (e) {
      return false;
    }
  }

  updateConfig(newConfig) {
    this.config = { ...this.config, ...newConfig };
    localStorage.setItem(SUPABASE_STORAGE_KEY, JSON.stringify(this.config));
    this.initClient();
    showToast('Supabase configuration updated!', 'success');
  }
}

export const supabaseManager = new SupabaseManager();
