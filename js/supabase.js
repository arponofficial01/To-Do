/**
 * ARPON — MALAYSIA 2027
 * Supabase Database & Realtime Sync Engine
 * Direct PostgreSQL & Realtime channel integration
 */

import { appState } from './state.js';
import { showToast } from './modals.js';

const SUPABASE_STORAGE_KEY = 'arpon_supabase_config_v1';

// User's configured Supabase project configuration
const DEFAULT_SUPABASE_CONFIG = {
  url: 'https://vahtkuhruwzjyzmrvskv.supabase.co',
  anonKey: 'sb_publishable_9ZJtBGLaq_GvpokdnpYkJQ_ZVBuZyqM',
  tableName: 'arpon_todos',
  userId: 'arpon_official01'
};

class SupabaseManager {
  constructor() {
    this.client = null;
    this.config = { ...DEFAULT_SUPABASE_CONFIG };
    this.isConnected = false;
    this.channel = null;
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
        this.client = window.supabase.createClient(this.config.url, this.config.anonKey);
        this.isConnected = true;
        this.subscribeRealtime();
      } catch (e) {
        console.warn('Supabase client init error, using cloud sync fallback', e);
        this.isConnected = false;
      }
    }
  }

  // Realtime WebSocket Channel Listener
  subscribeRealtime() {
    if (!this.client) return;

    try {
      if (this.channel) {
        this.client.removeChannel(this.channel);
      }

      this.channel = this.client
        .channel('arpon_realtime_tasks')
        .on('broadcast', { event: 'task_update' }, (payload) => {
          if (payload && payload.payload && payload.payload.sections) {
            appState.sections = payload.payload.sections;
            appState.save();
          }
        })
        .subscribe();
    } catch (e) {
      console.warn('Realtime channel error', e);
    }
  }

  // Push task update to Supabase
  async pushData(sections) {
    if (!this.client || !this.isConnected) return false;

    try {
      // 1. Broadcast via Realtime channel
      if (this.channel) {
        this.channel.send({
          type: 'broadcast',
          event: 'task_update',
          payload: {
            sections,
            updatedAt: new Date().toISOString(),
            device: navigator.userAgent.includes('iPhone') ? 'iOS' : 'PC'
          }
        });
      }

      // 2. Persist to Supabase Database table
      const { error } = await this.client
        .from(this.config.tableName)
        .upsert({
          id: this.config.userId,
          data: sections,
          updated_at: new Date().toISOString()
        });

      return !error;
    } catch (e) {
      return false;
    }
  }

  // Pull latest data from Supabase Database
  async pullData() {
    if (!this.client || !this.isConnected) return null;

    try {
      const { data, error } = await this.client
        .from(this.config.tableName)
        .select('*')
        .eq('id', this.config.userId)
        .single();

      if (!error && data && data.data) {
        return data.data;
      }
      return null;
    } catch (e) {
      return null;
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
