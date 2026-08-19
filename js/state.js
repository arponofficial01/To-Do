/**
 * ARPON — MALAYSIA 2027
 * State Management & LocalStorage Persistence
 */

import { INITIAL_SECTIONS, INTAKE_CONFIG, PREPARATION_STAGES } from './data.js';
import { cloudSync } from './sync.js';

const STORAGE_KEY = 'arpon_malaysia_2027_data_v1.2';

class AppState {
  constructor() {
    this.listeners = [];
    this.sections = [];
    this.filter = 'all'; // 'all' | 'active' | 'completed'
    this.searchQuery = '';
    this.currentView = 'dashboard';
    this.collapsedCategories = new Set();
    this.init();
  }

  init() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.sections && Array.isArray(parsed.sections)) {
          this.sections = parsed.sections;
        } else {
          this.sections = JSON.parse(JSON.stringify(INITIAL_SECTIONS));
        }
      } else {
        this.sections = JSON.parse(JSON.stringify(INITIAL_SECTIONS));
      }
    } catch (e) {
      console.warn('Failed to parse localStorage, resetting to defaults', e);
      this.sections = JSON.parse(JSON.stringify(INITIAL_SECTIONS));
    }
  }

  save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        version: '1.2',
        updatedAt: new Date().toISOString(),
        sections: this.sections
      }));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
    this.notify();
    cloudSync.pushToCloud();
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach(listener => listener(this));
  }

  // ==========================================
  // VIEW & FILTER ACTIONS
  // ==========================================
  setView(viewId) {
    this.currentView = viewId;
    this.searchQuery = '';
    this.notify();
  }

  setFilter(filterType) {
    this.filter = filterType;
    this.notify();
  }

  setSearchQuery(query) {
    this.searchQuery = (query || '').trim().toLowerCase();
    this.notify();
  }

  toggleCategoryCollapse(catId) {
    if (this.collapsedCategories.has(catId)) {
      this.collapsedCategories.delete(catId);
    } else {
      this.collapsedCategories.add(catId);
    }
    this.notify();
  }

  // ==========================================
  // TASK MUTATIONS
  // ==========================================
  toggleTask(taskId) {
    let found = false;

    for (const section of this.sections) {
      if (section.isCategorized && section.categories) {
        for (const cat of section.categories) {
          const task = cat.tasks.find(t => t.id === taskId);
          if (task) {
            task.completed = !task.completed;
            task.completedAt = task.completed ? new Date().toISOString() : null;
            found = true;
            break;
          }
        }
      } else if (section.tasks) {
        const task = section.tasks.find(t => t.id === taskId);
        if (task) {
          task.completed = !task.completed;
          task.completedAt = task.completed ? new Date().toISOString() : null;
          found = true;
          break;
        }
      }
      if (found) break;
    }

    if (found) {
      this.save();
    }
  }

  addTask({ sectionId, categoryId, title, priority = 'medium', note = '' }) {
    if (!title || !title.trim()) return null;

    const newTask = {
      id: 'custom-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      title: title.trim(),
      completed: false,
      priority,
      note: note.trim() || undefined,
      isCustom: true,
      createdAt: new Date().toISOString()
    };

    const section = this.sections.find(s => s.id === sectionId);
    if (!section) return null;

    if (section.isCategorized && section.categories) {
      const cat = section.categories.find(c => c.id === categoryId) || section.categories[0];
      if (cat) {
        cat.tasks.push(newTask);
      }
    } else {
      section.tasks.push(newTask);
    }

    this.save();
    return newTask;
  }

  editTask(taskId, updates) {
    let targetTask = null;

    for (const section of this.sections) {
      if (section.isCategorized && section.categories) {
        for (const cat of section.categories) {
          const task = cat.tasks.find(t => t.id === taskId);
          if (task) {
            Object.assign(task, updates);
            targetTask = task;
            break;
          }
        }
      } else if (section.tasks) {
        const task = section.tasks.find(t => t.id === taskId);
        if (task) {
          Object.assign(task, updates);
          targetTask = task;
          break;
        }
      }
      if (targetTask) break;
    }

    if (targetTask) {
      this.save();
    }
    return targetTask;
  }

  deleteTask(taskId) {
    let deletedTask = null;

    for (const section of this.sections) {
      if (section.isCategorized && section.categories) {
        for (const cat of section.categories) {
          const idx = cat.tasks.findIndex(t => t.id === taskId);
          if (idx !== -1) {
            deletedTask = cat.tasks.splice(idx, 1)[0];
            break;
          }
        }
      } else if (section.tasks) {
        const idx = section.tasks.findIndex(t => t.id === taskId);
        if (idx !== -1) {
          deletedTask = section.tasks.splice(idx, 1)[0];
          break;
        }
      }
      if (deletedTask) break;
    }

    if (deletedTask) {
      this.save();
    }
    return deletedTask;
  }

  // ==========================================
  // RESETS & BULK ACTIONS
  // ==========================================
  resetSection(sectionId) {
    const originalSection = INITIAL_SECTIONS.find(s => s.id === sectionId);
    const targetSection = this.sections.find(s => s.id === sectionId);

    if (originalSection && targetSection) {
      // Uncheck all items & restore default tasks
      if (targetSection.isCategorized && targetSection.categories) {
        targetSection.categories.forEach(cat => {
          cat.tasks.forEach(t => {
            t.completed = false;
            t.completedAt = null;
          });
        });
      } else {
        targetSection.tasks.forEach(t => {
          t.completed = false;
          t.completedAt = null;
        });
      }
      this.save();
    }
  }

  resetAll() {
    this.sections = JSON.parse(JSON.stringify(INITIAL_SECTIONS));
    this.save();
  }

  clearCompleted(sectionId = null) {
    if (sectionId) {
      const section = this.sections.find(s => s.id === sectionId);
      if (section) {
        if (section.isCategorized && section.categories) {
          section.categories.forEach(cat => {
            cat.tasks.forEach(t => {
              if (t.completed) {
                t.completed = false;
                t.completedAt = null;
              }
            });
          });
        } else {
          section.tasks.forEach(t => {
            if (t.completed) {
              t.completed = false;
              t.completedAt = null;
            }
          });
        }
      }
    } else {
      // Clear across all sections
      for (const section of this.sections) {
        if (section.isCategorized && section.categories) {
          section.categories.forEach(cat => {
            cat.tasks.forEach(t => {
              t.completed = false;
              t.completedAt = null;
            });
          });
        } else {
          section.tasks.forEach(t => {
            t.completed = false;
            t.completedAt = null;
          });
        }
      }
    }
    this.save();
  }

  // ==========================================
  // AGGREGATES & METRICS
  // ==========================================
  getAllTasks() {
    const all = [];
    for (const section of this.sections) {
      if (section.isCategorized && section.categories) {
        for (const cat of section.categories) {
          for (const task of cat.tasks) {
            all.push({ ...task, sectionId: section.id, sectionTitle: section.title, categoryId: cat.id, categoryTitle: cat.title });
          }
        }
      } else if (section.tasks) {
        for (const task of section.tasks) {
          all.push({ ...task, sectionId: section.id, sectionTitle: section.title });
        }
      }
    }
    return all;
  }

  getSectionStats(sectionId) {
    const section = this.sections.find(s => s.id === sectionId);
    if (!section) return { total: 0, completed: 0, percent: 0, pending: 0 };

    let total = 0;
    let completed = 0;

    if (section.isCategorized && section.categories) {
      for (const cat of section.categories) {
        for (const t of cat.tasks) {
          total++;
          if (t.completed) completed++;
        }
      }
    } else if (section.tasks) {
      total = section.tasks.length;
      completed = section.tasks.filter(t => t.completed).length;
    }

    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
    return {
      total,
      completed,
      pending: total - completed,
      percent
    };
  }

  getCategoryStats(sectionId, categoryId) {
    const section = this.sections.find(s => s.id === sectionId);
    if (!section || !section.categories) return { total: 0, completed: 0, percent: 0 };

    const cat = section.categories.find(c => c.id === categoryId);
    if (!cat) return { total: 0, completed: 0, percent: 0 };

    const total = cat.tasks.length;
    const completed = cat.tasks.filter(t => t.completed).length;
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

    return { total, completed, pending: total - completed, percent };
  }

  getOverallStats() {
    const all = this.getAllTasks();
    const total = all.length;
    const completed = all.filter(t => t.completed).length;
    const pending = total - completed;
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

    // Calculate current preparation stage
    let currentStage = PREPARATION_STAGES[0];
    for (let i = PREPARATION_STAGES.length - 1; i >= 0; i--) {
      const stage = PREPARATION_STAGES[i];
      if (completed >= stage.threshold) {
        currentStage = stage;
        break;
      }
    }

    // Find next uncompleted priority task
    const nextTask = all.find(t => !t.completed) || null;

    // Find up to 6 upcoming pending tasks
    const upcomingTasks = all.filter(t => !t.completed).slice(0, 6);

    return {
      total,
      completed,
      pending,
      percent,
      currentStage,
      nextTask,
      upcomingTasks
    };
  }

  // ==========================================
  // EXPORT & IMPORT
  // ==========================================
  exportJSON() {
    return JSON.stringify({
      appName: "Arpon — Malaysia 2027",
      studentName: INTAKE_CONFIG.studentName,
      brand: INTAKE_CONFIG.username,
      exportedAt: new Date().toISOString(),
      sections: this.sections
    }, null, 2);
  }

  importJSON(jsonString) {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.sections && Array.isArray(parsed.sections)) {
        this.sections = parsed.sections;
        this.save();
        return { success: true, count: this.getAllTasks().length };
      }
      return { success: false, error: 'Invalid JSON schema: Missing sections' };
    } catch (e) {
      return { success: false, error: e.message };
    }
  }
}

export const appState = new AppState();
