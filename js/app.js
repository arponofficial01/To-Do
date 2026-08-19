/**
 * ARPON — MALAYSIA 2027
 * Main Application Orchestrator & Event Controller
 */

import { appState } from './state.js';
import { renderApp, ICONS } from './render.js';
import {
  showToast,
  showAddTaskModal,
  showEditTaskModal,
  showConfirmModal,
  showCommandPalette,
  showDataModal,
  closeModal
} from './modals.js';

// Soft, premium micro-haptic sound effect (synthesized Web Audio for zero asset lag)
function playHapticTone(type = 'check') {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'check') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.08); // A5
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.08);
    }
  } catch (e) {
    // Audio optional / blocked by browser policy
  }
}

// Router & Hash synchronizer
function syncRouteFromHash() {
  const hash = window.location.hash.replace('#', '').trim();
  const validViews = ['dashboard', ...appState.sections.map(s => s.id)];
  if (validViews.includes(hash)) {
    appState.setView(hash);
  } else {
    appState.setView('dashboard');
  }
}

// ==========================================================================
// EVENT DELEGATION
// ==========================================================================
function initGlobalEventListeners() {
  // Hash change listener
  window.addEventListener('hashchange', syncRouteFromHash);

  // Keyboard Shortcuts (Ctrl+K for command palette, Escape to close modals)
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      showCommandPalette();
    }
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-backdrop.open').forEach(modal => {
        closeModal(modal.id);
      });
      const sidebar = document.getElementById('sidebar');
      if (sidebar && sidebar.classList.contains('mobile-open')) {
        toggleMobileSidebar(false);
      }
    }
  });

  // Global search triggers
  const searchTriggers = document.querySelectorAll('.global-search-trigger, #header-search-btn');
  searchTriggers.forEach(btn => {
    btn.addEventListener('click', () => showCommandPalette());
  });

  // Global data backup modal trigger
  const dataBtn = document.getElementById('btn-header-data');
  if (dataBtn) {
    dataBtn.addEventListener('click', () => showDataModal());
  }

  // Mobile menu drawer toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileBackdrop = document.getElementById('mobile-backdrop');
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => toggleMobileSidebar(true));
  }
  if (mobileBackdrop) {
    mobileBackdrop.addEventListener('click', () => toggleMobileSidebar(false));
  }

  // Main Click Handler Delegator
  document.addEventListener('click', (e) => {
    // 1. Navigation clicks
    const navBtn = e.target.closest('[data-view]');
    if (navBtn) {
      const viewId = navBtn.dataset.view;
      window.location.hash = viewId;
      toggleMobileSidebar(false);
      return;
    }

    // 2. Toggle Task Checkbox click
    const checkbox = e.target.closest('.custom-checkbox');
    if (checkbox) {
      const taskId = checkbox.dataset.taskId;
      if (taskId) {
        appState.toggleTask(taskId);
        playHapticTone('check');
      }
      return;
    }

    // 3. Spotlight Mark Done click
    const spotlightBtn = e.target.closest('#btn-spotlight-check');
    if (spotlightBtn) {
      const taskId = spotlightBtn.dataset.taskId;
      if (taskId) {
        appState.toggleTask(taskId);
        playHapticTone('check');
        showToast('Priority milestone checked off! 🎯', 'success');
      }
      return;
    }

    // 4. Edit Task Button
    const editBtn = e.target.closest('[data-edit-task]');
    if (editBtn) {
      const taskId = editBtn.dataset.editTask;
      showEditTaskModal(taskId);
      return;
    }

    // 5. Delete Task Button
    const deleteBtn = e.target.closest('[data-delete-task]');
    if (deleteBtn) {
      const taskId = deleteBtn.dataset.deleteTask;
      showConfirmModal({
        title: 'Delete Task?',
        message: 'Are you sure you want to remove this task from your checklist?',
        confirmText: 'Delete Task',
        confirmType: 'danger',
        onConfirm: () => {
          const deleted = appState.deleteTask(taskId);
          if (deleted) {
            showToast(`Deleted "${deleted.title}"`);
          }
        }
      });
      return;
    }

    // 6. Filter Buttons (All / Active / Completed)
    const filterBtn = e.target.closest('[data-filter]');
    if (filterBtn) {
      const filterType = filterBtn.dataset.filter;
      appState.setFilter(filterType);
      return;
    }

    // 7. Add Task Button (Page / Section)
    const addTaskBtn = e.target.closest('#btn-add-task');
    if (addTaskBtn) {
      const secId = addTaskBtn.dataset.section;
      showAddTaskModal(secId);
      return;
    }

    // 8. Add to Category Button (Shopping)
    const addCatBtn = e.target.closest('[data-add-to-cat]');
    if (addCatBtn) {
      const catId = addCatBtn.dataset.addToCat;
      showAddTaskModal('shopping', catId);
      return;
    }

    // 9. Reset Section Button
    const resetSecBtn = e.target.closest('#btn-reset-section');
    if (resetSecBtn) {
      const secId = resetSecBtn.dataset.section;
      const section = appState.sections.find(s => s.id === secId);
      showConfirmModal({
        title: `Reset ${section ? section.title : 'Section'}?`,
        message: `This will uncheck all tasks in this section and restore initial defaults. Are you sure?`,
        confirmText: 'Reset Section',
        confirmType: 'danger',
        onConfirm: () => {
          appState.resetSection(secId);
          showToast(`Section "${section.title}" reset`);
        }
      });
      return;
    }

    // 10. Clear Completed Button
    const clearCompBtn = e.target.closest('#btn-clear-completed');
    if (clearCompBtn) {
      const secId = clearCompBtn.dataset.section;
      showConfirmModal({
        title: 'Clear Completed Tasks?',
        message: 'This will uncheck all completed items in this section so you can redo them.',
        confirmText: 'Clear Completed',
        confirmType: 'danger',
        onConfirm: () => {
          appState.clearCompleted(secId);
          showToast('Completed items cleared');
        }
      });
      return;
    }

    // 11. Shopping Accordion Toggle
    const accHeader = e.target.closest('[data-toggle-cat]');
    if (accHeader && !e.target.closest('button, input, a')) {
      const catId = accHeader.dataset.toggleCat;
      appState.toggleCategoryCollapse(catId);
      return;
    }

    // 12. Toggle All Accordions
    const toggleAllBtn = e.target.closest('#btn-toggle-all-accordions');
    if (toggleAllBtn) {
      const shopSec = appState.sections.find(s => s.id === 'shopping');
      if (shopSec && shopSec.categories) {
        if (appState.collapsedCategories.size > 0) {
          appState.collapsedCategories.clear();
        } else {
          shopSec.categories.forEach(c => appState.collapsedCategories.add(c.id));
        }
        appState.notify();
      }
      return;
    }

    // 13. Close Modal Handlers (backdrop or button)
    const closeBtn = e.target.closest('[data-close-modal]');
    if (closeBtn) {
      const modalId = closeBtn.dataset.closeModal;
      closeModal(modalId);
      return;
    }

    if (e.target.classList.contains('modal-backdrop')) {
      closeModal(e.target.id);
    }
  });

  // Search input typing handler
  document.addEventListener('input', (e) => {
    if (e.target.id === 'page-search-input') {
      appState.setSearchQuery(e.target.value);
    }
  });
}

function toggleMobileSidebar(isOpen) {
  const sidebar = document.getElementById('sidebar');
  const backdrop = document.getElementById('mobile-backdrop');
  if (sidebar && backdrop) {
    if (isOpen) {
      sidebar.classList.add('mobile-open');
      backdrop.classList.add('active');
    } else {
      sidebar.classList.remove('mobile-open');
      backdrop.classList.remove('active');
    }
  }
}

// ==========================================================================
// BOOTSTRAP APP
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  // Subscribe renderer to state changes
  appState.subscribe(() => {
    renderApp();
  });

  initGlobalEventListeners();
  syncRouteFromHash();
  renderApp();
});
