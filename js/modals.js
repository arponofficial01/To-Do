/**
 * ARPON — MALAYSIA 2027
 * Modals & Interactive Dialogs Controller
 */

import { appState } from './state.js';
import { ICONS } from './render.js';

let activeToastTimeout = null;

// ==========================================================================
// TOAST SYSTEM
// ==========================================================================
export function showToast(message, type = 'gold') {
  let toastContainer = document.getElementById('toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <div class="toast-icon">${type === 'success' ? ICONS.check : ICONS.sparkles}</div>
    <div class="toast-msg">${message}</div>
  `;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.25s ease';
    setTimeout(() => toast.remove(), 250);
  }, 3200);
}

// ==========================================================================
// MODAL HELPERS
// ==========================================================================
export function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('open');
    const firstInput = modal.querySelector('input, textarea, select');
    if (firstInput) {
      setTimeout(() => firstInput.focus(), 50);
    }
  }
}

export function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('open');
  }
}

// ==========================================================================
// ADD TASK MODAL
// ==========================================================================
export function showAddTaskModal(defaultSectionId = 'documents', defaultCategoryId = null) {
  let modal = document.getElementById('modal-add-task');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'modal-add-task';
    modal.className = 'modal-backdrop';
    document.body.appendChild(modal);
  }

  const sectionOptions = appState.sections.map(s => `
    <option value="${s.id}" ${s.id === defaultSectionId ? 'selected' : ''}>${s.title}</option>
  `).join('');

  modal.innerHTML = `
    <div class="modal-card">
      <div class="modal-header">
        <div class="modal-title">Add New Checklist Item</div>
        <button class="modal-close-btn" data-close-modal="modal-add-task">${ICONS.close}</button>
      </div>

      <form id="form-add-task">
        <div class="modal-body">
          <div class="form-group">
            <label class="form-label" for="add-task-title">Task / Item Name *</label>
            <input type="text" id="add-task-title" class="form-input" placeholder="e.g., Get notarized bank statement" required />
          </div>

          <div class="form-group">
            <label class="form-label" for="add-task-section">Section</label>
            <select id="add-task-section" class="form-select">
              ${sectionOptions}
            </select>
          </div>

          <div class="form-group" id="add-task-cat-group" style="${defaultSectionId === 'shopping' ? '' : 'display: none;'}">
            <label class="form-label" for="add-task-category">Shopping Category</label>
            <select id="add-task-category" class="form-select">
              <option value="travel">Travel</option>
              <option value="study">Study</option>
              <option value="electronics">Electronics</option>
              <option value="clothes">Clothes</option>
              <option value="personal">Personal</option>
              <option value="creator">Creator</option>
              <option value="room">Room (If needed)</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label" for="add-task-priority">Priority Level</label>
            <select id="add-task-priority" class="form-select">
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
              <option value="low">Low Priority</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label" for="add-task-note">Notes / Reminder (Optional)</label>
            <input type="text" id="add-task-note" class="form-input" placeholder="e.g., Target completion by end of week" />
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn-ghost" data-close-modal="modal-add-task">Cancel</button>
          <button type="submit" class="btn-primary-gold">Save Task</button>
        </div>
      </form>
    </div>
  `;

  // Handle section dropdown change to show/hide category select
  const secSelect = modal.querySelector('#add-task-section');
  const catGroup = modal.querySelector('#add-task-cat-group');
  secSelect.addEventListener('change', (e) => {
    if (e.target.value === 'shopping') {
      catGroup.style.display = '';
    } else {
      catGroup.style.display = 'none';
    }
  });

  if (defaultCategoryId) {
    const catSelect = modal.querySelector('#add-task-category');
    if (catSelect) catSelect.value = defaultCategoryId;
  }

  // Handle form submission
  const form = modal.querySelector('#form-add-task');
  form.onsubmit = (e) => {
    e.preventDefault();
    const title = modal.querySelector('#add-task-title').value;
    const sectionId = secSelect.value;
    const categoryId = catGroup.style.display !== 'none' ? modal.querySelector('#add-task-category').value : null;
    const priority = modal.querySelector('#add-task-priority').value;
    const note = modal.querySelector('#add-task-note').value;

    const created = appState.addTask({ sectionId, categoryId, title, priority, note });
    if (created) {
      closeModal('modal-add-task');
      showToast(`Added "${created.title}" successfully!`);
    }
  };

  openModal('modal-add-task');
}

// ==========================================================================
// EDIT TASK MODAL
// ==========================================================================
export function showEditTaskModal(taskId) {
  const allTasks = appState.getAllTasks();
  const task = allTasks.find(t => t.id === taskId);
  if (!task) return;

  let modal = document.getElementById('modal-edit-task');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'modal-edit-task';
    modal.className = 'modal-backdrop';
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="modal-card">
      <div class="modal-header">
        <div class="modal-title">Edit Checklist Item</div>
        <button class="modal-close-btn" data-close-modal="modal-edit-task">${ICONS.close}</button>
      </div>

      <form id="form-edit-task">
        <div class="modal-body">
          <div class="form-group">
            <label class="form-label" for="edit-task-title">Task Title *</label>
            <input type="text" id="edit-task-title" class="form-input" value="${task.title.replace(/"/g, '&quot;')}" required />
          </div>

          <div class="form-group">
            <label class="form-label" for="edit-task-priority">Priority</label>
            <select id="edit-task-priority" class="form-select">
              <option value="high" ${task.priority === 'high' ? 'selected' : ''}>High Priority</option>
              <option value="medium" ${task.priority === 'medium' || !task.priority ? 'selected' : ''}>Medium Priority</option>
              <option value="low" ${task.priority === 'low' ? 'selected' : ''}>Low Priority</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label" for="edit-task-note">Notes / Details</label>
            <input type="text" id="edit-task-note" class="form-input" value="${(task.note || '').replace(/"/g, '&quot;')}" placeholder="e.g., Deadline or requirements" />
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn-ghost" data-close-modal="modal-edit-task">Cancel</button>
          <button type="submit" class="btn-primary-gold">Save Changes</button>
        </div>
      </form>
    </div>
  `;

  const form = modal.querySelector('#form-edit-task');
  form.onsubmit = (e) => {
    e.preventDefault();
    const title = modal.querySelector('#edit-task-title').value;
    const priority = modal.querySelector('#edit-task-priority').value;
    const note = modal.querySelector('#edit-task-note').value;

    appState.editTask(taskId, { title, priority, note });
    closeModal('modal-edit-task');
    showToast('Task updated successfully');
  };

  openModal('modal-edit-task');
}

// ==========================================================================
// CONFIRMATION DIALOG
// ==========================================================================
export function showConfirmModal({ title, message, confirmText = 'Confirm', confirmType = 'danger', onConfirm }) {
  let modal = document.getElementById('modal-confirm');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'modal-confirm';
    modal.className = 'modal-backdrop';
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="modal-card" style="max-width: 440px;">
      <div class="modal-header">
        <div class="modal-title">${title}</div>
        <button class="modal-close-btn" data-close-modal="modal-confirm">${ICONS.close}</button>
      </div>

      <div class="modal-body">
        <p style="color: var(--text-secondary); font-size: 0.92rem; line-height: 1.5;">${message}</p>
      </div>

      <div class="modal-footer">
        <button type="button" class="btn-ghost" data-close-modal="modal-confirm">Cancel</button>
        <button type="button" id="btn-confirm-action" class="${confirmType === 'danger' ? 'btn-ghost' : 'btn-primary-gold'}" style="${confirmType === 'danger' ? 'background: rgba(239, 68, 68, 0.15); color: #EF4444; border-color: rgba(239, 68, 68, 0.4);' : ''}">
          ${confirmText}
        </button>
      </div>
    </div>
  `;

  const confirmBtn = modal.querySelector('#btn-confirm-action');
  confirmBtn.onclick = () => {
    closeModal('modal-confirm');
    if (onConfirm) onConfirm();
  };

  openModal('modal-confirm');
}

// ==========================================================================
// COMMAND PALETTE / GLOBAL SEARCH MODAL (Ctrl + K)
// ==========================================================================
export function showCommandPalette() {
  let modal = document.getElementById('modal-command-palette');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'modal-command-palette';
    modal.className = 'modal-backdrop';
    document.body.appendChild(modal);
  }

  const allTasks = appState.getAllTasks();

  modal.innerHTML = `
    <div class="modal-card command-palette-card">
      <div class="command-search-row">
        <div style="color: var(--gold-primary); display: flex;">${ICONS.search}</div>
        <input type="text" class="command-search-input" id="command-search-input" placeholder="Search tasks, sections or jump to page..." autofocus />
        <span class="search-shortcut-badge">ESC</span>
      </div>

      <div class="command-results" id="command-results-list">
        <!-- Results dynamically populated -->
      </div>
    </div>
  `;

  const input = modal.querySelector('#command-search-input');
  const resultsContainer = modal.querySelector('#command-results-list');

  function updateResults(query) {
    const q = (query || '').toLowerCase().trim();
    if (!q) {
      // Show section quick jumps
      let html = `<div style="font-size: 0.72rem; text-transform: uppercase; color: var(--text-muted); padding: 8px 12px; font-weight: 700;">Sections</div>`;
      html += `
        <div class="command-item" data-cmd-view="dashboard">
          <div style="display: flex; align-items: center; gap: 10px;">
            <span style="color: var(--gold-primary);">${ICONS.dashboard}</span>
            <span style="font-weight: 600; font-size: 0.88rem;">Dashboard</span>
          </div>
          <span style="font-size: 0.75rem; color: var(--text-muted);">Command Center</span>
        </div>
      `;
      appState.sections.forEach(s => {
        html += `
          <div class="command-item" data-cmd-view="${s.id}">
            <div style="display: flex; align-items: center; gap: 10px;">
              <span style="color: var(--gold-primary);">${ICONS[s.icon] || ICONS['file-text']}</span>
              <span style="font-weight: 600; font-size: 0.88rem;">${s.title}</span>
            </div>
            <span style="font-size: 0.75rem; color: var(--text-muted);">Page ${s.pageNumber || '•'}</span>
          </div>
        `;
      });
      resultsContainer.innerHTML = html;
      return;
    }

    const filtered = allTasks.filter(t => t.title.toLowerCase().includes(q) || t.sectionTitle.toLowerCase().includes(q));

    if (filtered.length === 0) {
      resultsContainer.innerHTML = `
        <div style="padding: 24px; text-align: center; color: var(--text-muted); font-size: 0.85rem;">
          No matching tasks found for "${query}"
        </div>
      `;
      return;
    }

    let html = `<div style="font-size: 0.72rem; text-transform: uppercase; color: var(--text-muted); padding: 8px 12px; font-weight: 700;">Matching Tasks (${filtered.length})</div>`;
    html += filtered.slice(0, 15).map(t => `
      <div class="command-item" data-cmd-task-jump="${t.sectionId}" data-cmd-task-id="${t.id}">
        <div style="display: flex; align-items: center; gap: 10px; min-width: 0;">
          <span style="color: ${t.completed ? 'var(--accent-emerald)' : 'var(--text-tertiary)'};">${t.completed ? ICONS.checkCheck : ICONS.clock}</span>
          <span style="font-size: 0.88rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; ${t.completed ? 'text-decoration: line-through; color: var(--text-muted);' : ''}">${t.title}</span>
        </div>
        <span style="font-size: 0.72rem; color: var(--gold-metallic); font-family: var(--font-mono); flex-shrink: 0;">${t.sectionTitle}</span>
      </div>
    `).join('');

    resultsContainer.innerHTML = html;
  }

  input.addEventListener('input', (e) => updateResults(e.target.value));
  updateResults('');

  // Click handler on results
  resultsContainer.addEventListener('click', (e) => {
    const viewItem = e.target.closest('[data-cmd-view]');
    if (viewItem) {
      const viewId = viewItem.dataset.cmdView;
      appState.setView(viewId);
      closeModal('modal-command-palette');
      return;
    }

    const taskItem = e.target.closest('[data-cmd-task-jump]');
    if (taskItem) {
      const sectionId = taskItem.dataset.cmdTaskJump;
      appState.setView(sectionId);
      closeModal('modal-command-palette');
    }
  });

  openModal('modal-command-palette');
}

// ==========================================================================
// DATA BACKUP / EXPORT / IMPORT MODAL
// ==========================================================================
export function showDataModal() {
  let modal = document.getElementById('modal-data-backup');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'modal-data-backup';
    modal.className = 'modal-backdrop';
    document.body.appendChild(modal);
  }

  const jsonStr = appState.exportJSON();

  modal.innerHTML = `
    <div class="modal-card" style="max-width: 580px;">
      <div class="modal-header">
        <div class="modal-title">Checklist Data & Backup</div>
        <button class="modal-close-btn" data-close-modal="modal-data-backup">${ICONS.close}</button>
      </div>

      <div class="modal-body">
        <p style="font-size: 0.85rem; color: var(--text-secondary);">
          Your progress is automatically saved to this browser. You can export a JSON backup or import saved data below.
        </p>

        <div class="form-group">
          <label class="form-label">Data JSON</label>
          <textarea id="data-json-textarea" class="form-textarea" style="height: 150px; font-family: var(--font-mono); font-size: 0.78rem;" readonly>${jsonStr}</textarea>
        </div>

        <div style="display: flex; gap: 10px; flex-wrap: wrap;">
          <button class="btn-primary-gold" id="btn-copy-json" style="flex: 1;">
            Copy Backup JSON
          </button>
          <button class="btn-ghost" id="btn-download-json" style="flex: 1;">
            ${ICONS.download} Download .json
          </button>
        </div>

        <div style="border-top: 1px solid var(--border-subtle); padding-top: 16px; margin-top: 4px;">
          <label class="form-label" style="margin-bottom: 6px;">Restore / Import Backup</label>
          <textarea id="data-import-textarea" class="form-textarea" placeholder="Paste your backup JSON here..." style="height: 80px; font-family: var(--font-mono); font-size: 0.78rem;"></textarea>
          <button class="btn-ghost" id="btn-run-import" style="margin-top: 8px; width: 100%;">
            Restore from JSON
          </button>
        </div>
      </div>

      <div class="modal-footer">
        <button class="btn-ghost" id="btn-hard-reset-all" style="color: #EF4444; border-color: rgba(239, 68, 68, 0.3);">
          Reset Everything
        </button>
        <button class="btn-ghost" data-close-modal="modal-data-backup">Close</button>
      </div>
    </div>
  `;

  // Copy JSON
  const copyBtn = modal.querySelector('#btn-copy-json');
  copyBtn.onclick = () => {
    navigator.clipboard.writeText(jsonStr).then(() => {
      showToast('Backup JSON copied to clipboard!', 'success');
    });
  };

  // Download JSON
  const downloadBtn = modal.querySelector('#btn-download-json');
  downloadBtn.onclick = () => {
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `arpon_malaysia_2027_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Downloaded backup file', 'success');
  };

  // Run Import
  const importBtn = modal.querySelector('#btn-run-import');
  importBtn.onclick = () => {
    const val = modal.querySelector('#data-import-textarea').value.trim();
    if (!val) {
      showToast('Please paste valid JSON first');
      return;
    }
    const res = appState.importJSON(val);
    if (res.success) {
      closeModal('modal-data-backup');
      showToast(`Successfully restored ${res.count} tasks!`, 'success');
    } else {
      showToast(`Import failed: ${res.error}`);
    }
  };

  // Hard Reset All
  const hardResetBtn = modal.querySelector('#btn-hard-reset-all');
  hardResetBtn.onclick = () => {
    closeModal('modal-data-backup');
    showConfirmModal({
      title: 'Reset Everything?',
      message: 'Are you sure you want to reset all checklist tasks back to their initial uncompleted state? This action cannot be undone unless you made a JSON backup.',
      confirmText: 'Reset All Progress',
      confirmType: 'danger',
      onConfirm: () => {
        appState.resetAll();
        showToast('All progress has been reset to defaults');
      }
    });
  };

  openModal('modal-data-backup');
}

// ==========================================================================
// SYNC SETTINGS MODAL (PC & iOS SYNC)
// ==========================================================================
export function showSyncModal() {
  let modal = document.getElementById('modal-sync-settings');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'modal-sync-settings';
    modal.className = 'modal-backdrop';
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="modal-card" style="max-width: 500px;">
      <div class="modal-header">
        <div class="modal-title">Live Cloud Database & Device Sync</div>
        <button class="modal-close-btn" data-close-modal="modal-sync-settings">${ICONS.close}</button>
      </div>

      <div class="modal-body">
        <div style="display: flex; align-items: center; gap: 10px; background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.25); padding: 12px 16px; border-radius: var(--radius-md);">
          <div class="sync-dot" style="width: 10px; height: 10px;"></div>
          <div style="font-size: 0.85rem; color: var(--text-primary); font-weight: 600;">
            Real-Time Cloud Synchronization Active
          </div>
        </div>

        <p style="font-size: 0.86rem; color: var(--text-secondary); line-height: 1.55;">
          Your checklist is continuously synchronized with the secure cloud database. To connect your iPhone, simply open your live app URL on your iOS Safari browser. Both devices share the same sync key.
        </p>

        <form id="form-sync-key">
          <div class="form-group">
            <label class="form-label" for="input-sync-key">Private Sync Vault Key</label>
            <input type="text" id="input-sync-key" class="form-input" value="arpon_official01_malaysia2027_vault" style="font-family: var(--font-mono); font-size: 0.82rem;" />
            <span style="font-size: 0.72rem; color: var(--text-muted);">Ensure this key matches across your PC and iPhone.</span>
          </div>

          <div style="display: flex; gap: 10px; margin-top: 14px;">
            <button type="submit" class="btn-primary-gold" style="flex: 1;">Save Sync Key</button>
            <button type="button" id="btn-force-sync" class="btn-ghost" style="flex: 1;">Force Sync Now</button>
          </div>
        </form>
      </div>

      <div class="modal-footer">
        <button type="button" class="btn-ghost" data-close-modal="modal-sync-settings">Close</button>
      </div>
    </div>
  `;

  const form = modal.querySelector('#form-sync-key');
  form.onsubmit = async (e) => {
    e.preventDefault();
    const val = modal.querySelector('#input-sync-key').value.trim();
    const { cloudSync } = await import('./sync.js');
    cloudSync.setSyncPasscode(val);
    closeModal('modal-sync-settings');
  };

  const forceBtn = modal.querySelector('#btn-force-sync');
  forceBtn.onclick = async () => {
    const { cloudSync } = await import('./sync.js');
    await cloudSync.pushToCloud();
    await cloudSync.pullFromCloud();
    showToast('Force synchronized with Cloud Database!', 'success');
  };

  openModal('modal-sync-settings');
}
