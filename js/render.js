/**
 * ARPON — MALAYSIA 2027
 * UI Rendering Engine
 */

import { appState } from './state.js';
import { INTAKE_CONFIG } from './data.js';

// SVG Icons Dictionary for crisp luxury rendering
export const ICONS = {
  dashboard: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>`,
  "file-text": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`,
  "graduation-cap": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>`,
  "shield-check": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><polyline points="9 12 11 14 15 10"></polyline></svg>`,
  home: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>`,
  "dollar-sign": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>`,
  "shopping-bag": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>`,
  plane: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"></path></svg>`,
  compass: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>`,
  briefcase: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>`,
  "book-open": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>`,
  cpu: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>`,
  tag: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>`,
  heart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`,
  video: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>`,
  moon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`,
  check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`,
  search: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>`,
  plus: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>`,
  edit: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>`,
  trash: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>`,
  rotateCcw: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"></polyline><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path></svg>`,
  chevronDown: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>`,
  clock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`,
  target: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>`,
  sparkles: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path></svg>`,
  download: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>`,
  checkCheck: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L7 17l-5-5"></path><path d="m22 10-7.5 7.5L13 16"></path></svg>`,
  close: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`,
  arrowUp: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>`,
  arrowDown: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>`
};

function formatCompletedDate(isoString) {
  if (!isoString) return '';
  const d = new Date(isoString);
  const month = d.toLocaleString('en-US', { month: 'short' });
  const day = d.getDate();
  const time = d.toLocaleString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  return `${month} ${day} • ${time}`;
}

function getDaysUntil(dateString) {
  const target = new Date(dateString).getTime();
  const now = new Date().getTime();
  const diff = target - now;
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  return days > 0 ? days : 0;
}

// ==========================================================================
// RENDER APP ENTRY POINT
// ==========================================================================
export function renderApp() {
  const container = document.getElementById('view-container');
  if (!container) return;

  renderSidebar();
  renderHeader();
  renderMobileNav();

  const currentView = appState.currentView;

  if (currentView === 'dashboard') {
    renderDashboard(container);
  } else {
    const section = appState.sections.find(s => s.id === currentView);
    if (section) {
      if (section.isCategorized) {
        renderShoppingPage(container, section);
      } else {
        renderChecklistPage(container, section);
      }
    } else {
      renderDashboard(container);
    }
  }
}

// ==========================================================================
// RENDER HEADER & SIDEBAR
// ==========================================================================
export function renderHeader() {
  const stats = appState.getOverallStats();
  const progressValEl = document.getElementById('header-progress-val');
  if (progressValEl) {
    progressValEl.textContent = `${stats.percent}% (${stats.completed}/${stats.total})`;
  }
}

export function renderSidebar() {
  const navContainer = document.getElementById('sidebar-nav');
  if (!navContainer) return;

  const currentView = appState.currentView;
  const stats = appState.getOverallStats();

  let html = `
    <div class="nav-section-label">Overview</div>
    <button class="nav-item ${currentView === 'dashboard' ? 'active' : ''}" data-view="dashboard" id="nav-dashboard">
      <span class="nav-icon">${ICONS.dashboard}</span>
      <span class="nav-label">Dashboard</span>
      <span class="nav-badge ${stats.percent === 100 ? 'completed-badge' : ''}">${stats.percent}%</span>
    </button>
    <div class="nav-section-label">Preparation Pipeline</div>
  `;

  appState.sections.forEach(section => {
    const secStats = appState.getSectionStats(section.id);
    const isActive = currentView === section.id;
    const isCompleted = secStats.total > 0 && secStats.completed === secStats.total;
    const icon = ICONS[section.icon] || ICONS['file-text'];

    html += `
      <button class="nav-item ${isActive ? 'active' : ''}" data-view="${section.id}" id="nav-${section.id}">
        <span class="nav-icon">${icon}</span>
        <span class="nav-label">${section.title}</span>
        <span class="nav-badge ${isCompleted ? 'completed-badge' : ''}">${secStats.completed}/${secStats.total}</span>
      </button>
    `;
  });

  navContainer.innerHTML = html;

  // Update sidebar progress card
  const progressPercentEl = document.getElementById('sidebar-progress-percent');
  const progressFillEl = document.getElementById('sidebar-progress-fill');
  if (progressPercentEl) progressPercentEl.textContent = `${stats.percent}%`;
  if (progressFillEl) progressFillEl.style.width = `${stats.percent}%`;
}

export function renderMobileNav() {
  const mobileNav = document.getElementById('mobile-bottom-nav');
  if (!mobileNav) return;

  const currentView = appState.currentView;
  const keyViews = [
    { id: 'dashboard', label: 'Dashboard', icon: ICONS.dashboard },
    { id: 'documents', label: 'Docs', icon: ICONS['file-text'] },
    { id: 'inti', label: 'INTI', icon: ICONS['graduation-cap'] },
    { id: 'visa', label: 'Visa', icon: ICONS['shield-check'] },
    { id: 'shopping', label: 'Shopping', icon: ICONS['shopping-bag'] }
  ];

  mobileNav.innerHTML = keyViews.map(v => `
    <button class="mobile-nav-item ${currentView === v.id ? 'active' : ''}" data-view="${v.id}">
      ${v.icon}
      <span>${v.label}</span>
    </button>
  `).join('');
}

// ==========================================================================
// RENDER DASHBOARD
// ==========================================================================
export function renderDashboard(container) {
  const stats = appState.getOverallStats();
  const daysToIntake = getDaysUntil(INTAKE_CONFIG.intakeDate);
  const daysToAppTarget = getDaysUntil(INTAKE_CONFIG.applicationDeadlineTarget);

  // SVG circular gauge calculation
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (stats.percent / 100) * circumference;

  let html = `
    <!-- HERO BANNER -->
    <div class="glass-card hero-banner">
      <div>
        <div class="hero-tag">
          ${ICONS.sparkles} ${INTAKE_CONFIG.username}
        </div>
        <h1 class="hero-title">${INTAKE_CONFIG.studentName}</h1>
        <p class="hero-desc">
          Preparation Command Center for <strong>INTI International University & Colleges (Malaysia)</strong>.
          Program: <strong>${INTAKE_CONFIG.program}</strong>.
        </p>
        <div class="hero-intake-badge">
          ${ICONS.target} Intake: ${INTAKE_CONFIG.intake} • Target Submission: Sept 2026
        </div>
      </div>
      <div class="hero-stage-container">
        <span class="stage-badge">${stats.currentStage.name}</span>
        <span class="text-muted" style="font-size: 0.78rem; font-family: var(--font-mono);">
          Progress: ${stats.completed} of ${stats.total} Tasks Completed
        </span>
      </div>
    </div>

    <!-- STATS GRID -->
    <div class="stats-grid">
      <div class="glass-card stat-card">
        <div class="stat-header">
          <span>Total Pipeline</span>
          <div class="stat-icon">${ICONS['file-text']}</div>
        </div>
        <div class="stat-value">${stats.total}</div>
        <div class="stat-sub">Tasks across 8 core stages</div>
      </div>

      <div class="glass-card stat-card">
        <div class="stat-header">
          <span>Completed</span>
          <div class="stat-icon" style="color: var(--accent-emerald);">${ICONS.check}</div>
        </div>
        <div class="stat-value" style="color: var(--text-gold-light);">${stats.completed}</div>
        <div class="stat-sub">${stats.percent}% total milestone completion</div>
      </div>

      <div class="glass-card stat-card">
        <div class="stat-header">
          <span>Pending Actions</span>
          <div class="stat-icon" style="color: var(--accent-amber);">${ICONS.clock}</div>
        </div>
        <div class="stat-value">${stats.pending}</div>
        <div class="stat-sub">Requires action or verification</div>
      </div>

      <div class="glass-card stat-card">
        <div class="stat-header">
          <span>Countdown</span>
          <div class="stat-icon">${ICONS.plane}</div>
        </div>
        <div class="stat-value gold-text">${daysToIntake} <span style="font-size: 1rem; color: var(--text-tertiary);">Days</span></div>
        <div class="stat-sub">${daysToAppTarget > 0 ? `${daysToAppTarget}d until Sept 2026 target` : 'Intake: Jan 2027'}</div>
      </div>
    </div>

    <!-- OVERALL PROGRESS CARD WITH CIRCULAR GAUGE -->
    <div class="glass-card gold-accent progress-card">
      <div class="progress-info">
        <div class="progress-info-title">Overall Preparation Progress</div>
        <div class="progress-info-sub">
          Current phase status: <strong>${stats.currentStage.name}</strong>. All updates are automatically encrypted & stored in local storage.
        </div>
        <div class="progress-track-lg">
          <div class="progress-fill-lg" style="width: ${stats.percent}%;"></div>
        </div>
      </div>

      <div class="progress-circle-wrap">
        <svg class="progress-circle-svg" viewBox="0 0 100 100">
          <defs>
            <linearGradient id="goldGradientSvg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#F3E5AB" />
              <stop offset="50%" stop-color="#D4AF37" />
              <stop offset="100%" stop-color="#AA820A" />
            </linearGradient>
          </defs>
          <circle class="progress-circle-bg" cx="50" cy="50" r="${radius}" />
          <circle class="progress-circle-fill" cx="50" cy="50" r="${radius}"
            stroke-dasharray="${circumference}"
            stroke-dashoffset="${offset}" />
        </svg>
        <span class="progress-circle-text">${stats.percent}%</span>
      </div>
    </div>

    <!-- NEXT TASK SPOTLIGHT & UPCOMING TASKS FEED -->
    <div class="dashboard-split-grid">
      <!-- SPOTLIGHT NEXT TASK -->
      <div class="glass-card spotlight-card">
        <div>
          <div class="spotlight-header">
            <span class="spotlight-tag">${ICONS.target} Priority Action</span>
            ${stats.nextTask ? `<span class="spotlight-section-pill">${stats.nextTask.sectionTitle}</span>` : ''}
          </div>
          ${stats.nextTask ? `
            <div class="spotlight-task-title">${stats.nextTask.title}</div>
            <div class="spotlight-task-desc">${stats.nextTask.note || 'Mark this step as done once verified to advance preparation stage.'}</div>
          ` : `
            <div class="spotlight-task-title gold-text">All Milestones Complete! 🎉</div>
            <div class="spotlight-task-desc">Congratulations Arpon! You have completed every task for your January 2027 intake at INTI Malaysia.</div>
          `}
        </div>

        ${stats.nextTask ? `
          <div class="spotlight-actions">
            <button class="btn-primary-gold" id="btn-spotlight-check" data-task-id="${stats.nextTask.id}">
              ${ICONS.check} Mark Done
            </button>
            <button class="btn-ghost" data-view="${stats.nextTask.sectionId}">
              Open Section →
            </button>
          </div>
        ` : ''}
      </div>

      <!-- UPCOMING TASKS LIST -->
      <div class="glass-card upcoming-list-card">
        <div class="upcoming-header">
          <span class="upcoming-title">Upcoming Pipeline Tasks</span>
          <span class="nav-badge">${stats.pending} remaining</span>
        </div>
        <div class="upcoming-items">
          ${stats.upcomingTasks.length > 0 ? stats.upcomingTasks.map(task => `
            <div class="upcoming-item">
              <div class="upcoming-item-left">
                <button class="custom-checkbox" data-task-id="${task.id}" title="Toggle Task">
                  ${ICONS.check}
                </button>
                <span class="upcoming-item-text" title="${task.title}">${task.title}</span>
              </div>
              <span class="upcoming-item-section">${task.sectionTitle}</span>
            </div>
          `).join('') : `
            <div style="padding: 24px; text-align: center; color: var(--text-muted); font-size: 0.85rem;">
              No pending tasks!
            </div>
          `}
        </div>
      </div>
    </div>

    <!-- 8 SECTION OVERVIEW CARDS GRID -->
    <div class="section-grid-title">
      <span>Preparation Sections</span>
      <span class="text-muted" style="font-size: 0.8rem; font-weight: 500;">8 Stages</span>
    </div>

    <div class="sections-overview-grid">
      ${appState.sections.map(section => {
        const secStats = appState.getSectionStats(section.id);
        const icon = ICONS[section.icon] || ICONS['file-text'];
        const isComplete = secStats.total > 0 && secStats.completed === secStats.total;

        return `
          <div class="glass-card section-overview-card" data-view="${section.id}">
            <div class="section-card-top">
              <div>
                <span class="section-card-number">PAGE ${section.pageNumber || '•'}</span>
                <div class="section-card-title">${section.title}</div>
              </div>
              <div class="stat-icon" style="${isComplete ? 'color: var(--accent-emerald); border-color: rgba(16, 185, 129, 0.3);' : ''}">
                ${isComplete ? ICONS.checkCheck : icon}
              </div>
            </div>

            <div class="section-card-bottom">
              <div class="section-card-counts">
                <span class="section-card-ratio">${secStats.completed} / ${secStats.total} done</span>
                <span class="section-card-percent">${secStats.percent}%</span>
              </div>
              <div class="section-card-track">
                <div class="section-card-fill" style="width: ${secStats.percent}%;"></div>
              </div>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;

  container.innerHTML = html;
}

// ==========================================================================
// RENDER STANDARD CHECKLIST PAGE
// ==========================================================================
export function renderChecklistPage(container, section) {
  const stats = appState.getSectionStats(section.id);
  const filter = appState.filter;
  const searchQuery = appState.searchQuery;

  // Filter tasks
  let tasks = section.tasks || [];
  if (filter === 'active') {
    tasks = tasks.filter(t => !t.completed);
  } else if (filter === 'completed') {
    tasks = tasks.filter(t => t.completed);
  }

  if (searchQuery) {
    tasks = tasks.filter(t => t.title.toLowerCase().includes(searchQuery) || (t.note && t.note.toLowerCase().includes(searchQuery)));
  }

  const html = `
    <!-- PAGE HEADER -->
    <div class="glass-card gold-accent page-header-card">
      <div class="page-header-top">
        <div class="page-title-wrap">
          <div class="page-badge-row">
            <span class="page-number-badge">Page ${section.pageNumber || '•'}</span>
            ${stats.percent === 100 ? `<span class="page-number-badge" style="color: var(--accent-emerald); border-color: rgba(16, 185, 129, 0.3); background: rgba(16, 185, 129, 0.1);">100% Completed</span>` : ''}
          </div>
          <h1 class="page-title">${section.displayTitle || section.title}</h1>
          <p class="page-subtitle">${section.subtitle || ''}</p>
        </div>

        <div class="page-header-meta">
          <div class="counter-pill">
            <span>Completed:</span>
            <span class="counter-pill-val">${stats.completed} / ${stats.total}</span>
            <span class="text-gold">(${stats.percent}%)</span>
          </div>
        </div>
      </div>

      <div class="progress-track-lg">
        <div class="progress-fill-lg" style="width: ${stats.percent}%;"></div>
      </div>
    </div>

    <!-- TOOLBAR CONTROLS -->
    <div class="toolbar-wrap">
      <div class="filters-group">
        <button class="filter-btn ${filter === 'all' ? 'active' : ''}" data-filter="all">All (${stats.total})</button>
        <button class="filter-btn ${filter === 'active' ? 'active' : ''}" data-filter="active">Active (${stats.pending})</button>
        <button class="filter-btn ${filter === 'completed' ? 'active' : ''}" data-filter="completed">Completed (${stats.completed})</button>
      </div>

      <div class="toolbar-actions">
        <div class="search-input-wrap">
          ${ICONS.search}
          <input type="text" class="page-search-input" id="page-search-input" placeholder="Search tasks..." value="${searchQuery}" />
        </div>

        <button class="btn-primary-gold" id="btn-add-task" data-section="${section.id}">
          ${ICONS.plus} Add Task
        </button>

        <button class="btn-ghost" id="btn-clear-completed" data-section="${section.id}" title="Uncheck completed items">
          ${ICONS.checkCheck} Clear Done
        </button>

        <button class="btn-ghost" id="btn-reset-section" data-section="${section.id}" title="Reset Section">
          ${ICONS.rotateCcw} Reset
        </button>
      </div>
    </div>

    <!-- TASK LIST -->
    <div class="task-list">
      ${tasks.length > 0 ? tasks.map((task, idx) => renderTaskItem(task, section.id, null, idx)).join('') : `
        <div class="glass-card empty-state">
          <div class="empty-state-icon">${ICONS.search}</div>
          <div style="font-weight: 600; color: var(--text-secondary);">No tasks match your criteria</div>
          <div style="font-size: 0.8rem;">Try clearing the filter or search query.</div>
        </div>
      `}
    </div>
  `;

  container.innerHTML = html;
}

// ==========================================================================
// RENDER SHOPPING PAGE (COLLAPSIBLE CATEGORIES)
// ==========================================================================
export function renderShoppingPage(container, section) {
  const stats = appState.getSectionStats(section.id);
  const filter = appState.filter;
  const searchQuery = appState.searchQuery;

  const html = `
    <!-- PAGE HEADER -->
    <div class="glass-card gold-accent page-header-card">
      <div class="page-header-top">
        <div class="page-title-wrap">
          <div class="page-badge-row">
            <span class="page-number-badge">Page ${section.pageNumber || '6'}</span>
            <span class="page-number-badge" style="color: var(--text-gold); background: rgba(212, 175, 55, 0.08);">7 Categories</span>
          </div>
          <h1 class="page-title">${section.title}</h1>
          <p class="page-subtitle">${section.subtitle}</p>
        </div>

        <div class="page-header-meta">
          <div class="counter-pill">
            <span>Packed / Ready:</span>
            <span class="counter-pill-val">${stats.completed} / ${stats.total}</span>
            <span class="text-gold">(${stats.percent}%)</span>
          </div>
        </div>
      </div>

      <div class="progress-track-lg">
        <div class="progress-fill-lg" style="width: ${stats.percent}%;"></div>
      </div>
    </div>

    <!-- TOOLBAR CONTROLS -->
    <div class="toolbar-wrap">
      <div class="filters-group">
        <button class="filter-btn ${filter === 'all' ? 'active' : ''}" data-filter="all">All (${stats.total})</button>
        <button class="filter-btn ${filter === 'active' ? 'active' : ''}" data-filter="active">Active (${stats.pending})</button>
        <button class="filter-btn ${filter === 'completed' ? 'active' : ''}" data-filter="completed">Completed (${stats.completed})</button>
      </div>

      <div class="toolbar-actions">
        <div class="search-input-wrap">
          ${ICONS.search}
          <input type="text" class="page-search-input" id="page-search-input" placeholder="Search shopping items..." value="${searchQuery}" />
        </div>

        <button class="btn-primary-gold" id="btn-add-task" data-section="${section.id}">
          ${ICONS.plus} Add Item
        </button>

        <button class="btn-ghost" id="btn-toggle-all-accordions">
          Expand / Collapse
        </button>

        <button class="btn-ghost" id="btn-reset-section" data-section="${section.id}" title="Reset Section">
          ${ICONS.rotateCcw} Reset
        </button>
      </div>
    </div>

    <!-- CATEGORIES ACCORDIONS -->
    <div class="shopping-categories">
      ${section.categories.map(category => {
        const catStats = appState.getCategoryStats(section.id, category.id);
        const isOpen = !appState.collapsedCategories.has(category.id);
        const icon = ICONS[category.icon] || ICONS['shopping-bag'];

        let catTasks = category.tasks;
        if (filter === 'active') catTasks = catTasks.filter(t => !t.completed);
        if (filter === 'completed') catTasks = catTasks.filter(t => t.completed);
        if (searchQuery) {
          catTasks = catTasks.filter(t => t.title.toLowerCase().includes(searchQuery) || (t.note && t.note.toLowerCase().includes(searchQuery)));
        }

        return `
          <div class="accordion-item ${isOpen ? 'open' : ''}" id="cat-${category.id}">
            <div class="accordion-header" data-toggle-cat="${category.id}">
              <div class="accordion-header-left">
                <div class="accordion-icon">${icon}</div>
                <div class="accordion-title-wrap">
                  <div class="accordion-title">${category.title}</div>
                  <div class="accordion-count-sub">${catStats.completed} of ${catStats.total} ready (${catStats.percent}%)</div>
                </div>
              </div>

              <div class="accordion-header-right">
                <div class="accordion-progress-mini">
                  <div class="section-card-fill" style="width: ${catStats.percent}%;"></div>
                </div>
                <div class="accordion-chevron">${ICONS.chevronDown}</div>
              </div>
            </div>

            <div class="accordion-body">
              <div class="task-list" style="margin-top: 10px;">
                ${catTasks.length > 0 ? catTasks.map((task, idx) => renderTaskItem(task, section.id, category.id, idx)).join('') : `
                  <div style="padding: 16px; text-align: center; color: var(--text-muted); font-size: 0.85rem;">
                    No items match the current filter in this category.
                  </div>
                `}
              </div>
              <div class="accordion-footer-add">
                <button class="btn-ghost" data-add-to-cat="${category.id}" style="font-size: 0.78rem; padding: 6px 12px;">
                  ${ICONS.plus} Add item to ${category.title}
                </button>
              </div>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;

  container.innerHTML = html;
}

// ==========================================================================
// RENDER TASK ITEM
// ==========================================================================
function renderTaskItem(task, sectionId, categoryId = null, index = 0) {
  const isChecked = task.completed;
  const dateFormatted = formatCompletedDate(task.completedAt);
  const serialNumber = String(index + 1).padStart(2, '0');

  return `
    <div class="task-card ${isChecked ? 'completed' : ''}" 
         id="task-card-${task.id}" 
         draggable="true" 
         data-task-id="${task.id}" 
         data-section-id="${sectionId}" 
         data-category-id="${categoryId || ''}">
      <div class="task-left">
        <!-- REORDER GRIP & SERIAL BADGE -->
        <div class="task-reorder-group">
          <div class="task-drag-handle" title="Hold and drag to reorder" data-drag-handle="true">
            <svg viewBox="0 0 16 16" fill="currentColor" width="13" height="13">
              <circle cx="5" cy="3" r="1.3" />
              <circle cx="11" cy="3" r="1.3" />
              <circle cx="5" cy="8" r="1.3" />
              <circle cx="11" cy="8" r="1.3" />
              <circle cx="5" cy="13" r="1.3" />
              <circle cx="11" cy="13" r="1.3" />
            </svg>
          </div>
          <span class="task-serial-num" title="Serial #${serialNumber}">#${serialNumber}</span>
        </div>

        <button class="custom-checkbox ${isChecked ? 'checked' : ''}" data-task-id="${task.id}" aria-label="Toggle ${task.title}">
          ${ICONS.check}
        </button>

        <div class="task-content">
          <div class="task-title">${task.title}</div>
          <div class="task-meta">
            ${task.priority === 'high' ? `<span class="task-tag" style="color: var(--accent-amber); background: rgba(245, 158, 11, 0.1);">High Priority</span>` : ''}
            ${task.note ? `<span>${task.note}</span>` : ''}
            ${isChecked && dateFormatted ? `<span class="task-date-badge">${ICONS.clock} Done ${dateFormatted}</span>` : ''}
            ${task.isCustom ? `<span class="task-tag">Custom</span>` : ''}
          </div>
        </div>
      </div>

      <div class="task-right-actions">
        <!-- QUICK REORDER BUTTONS -->
        <button class="task-action-btn move-btn" data-move-up="${task.id}" title="Move Up">
          ${ICONS.arrowUp}
        </button>
        <button class="task-action-btn move-btn" data-move-down="${task.id}" title="Move Down">
          ${ICONS.arrowDown}
        </button>
        <button class="task-action-btn" data-edit-task="${task.id}" title="Edit Task">
          ${ICONS.edit}
        </button>
        <button class="task-action-btn delete-btn" data-delete-task="${task.id}" title="Delete Task">
          ${ICONS.trash}
        </button>
      </div>
    </div>
  `;
}
