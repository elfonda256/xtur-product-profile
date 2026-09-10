const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const baseDir = 'C:\\Users\\HP\\.gemini\\antigravity-ide\\scratch\\xtur-product-profile';
const imgDir = path.join(baseDir, 'assets', 'images');
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

function getBaseStyles() {
  return `
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; }
    body { background: #0b0f19; color: #1e293b; overflow: hidden; display: flex; flex-direction: column; height: 100vh; width: 100vw; }
    
    /* Browser Chrome Top Bar */
    .browser-bar { background: #131b2e; height: 42px; border-bottom: 1px solid #1e293b; display: flex; align-items: center; padding: 0 16px; gap: 12px; }
    .browser-controls { display: flex; gap: 6px; }
    .b-dot { width: 11px; height: 11px; border-radius: 50%; }
    .b-red { background: #ef4444; }
    .b-yellow { background: #f59e0b; }
    .b-green { background: #10b981; }
    
    .nav-arrows { display: flex; gap: 8px; color: #64748b; font-size: 14px; margin-left: 8px; }
    .url-bar { flex: 1; background: #0a0f1d; border: 1px solid #1e293b; border-radius: 20px; height: 28px; display: flex; align-items: center; padding: 0 14px; gap: 8px; font-size: 12px; color: #94a3b8; }
    .url-bar .lock-icon { color: #10b981; font-size: 11px; }
    .url-bar .domain { color: #f8fafc; font-weight: 500; }
    .browser-actions { display: flex; gap: 14px; color: #64748b; font-size: 13px; }
    
    /* App Workspace Layout */
    .app-layout { display: flex; flex: 1; height: calc(100vh - 42px); background: #f8fafc; }
    
    /* Left Sidebar */
    .sidebar { width: 220px; background: #ffffff; border-right: 1px solid #e2e8f0; display: flex; flex-direction: column; justify-content: space-between; padding: 18px 12px; }
    .brand-area { display: flex; align-items: center; justify-content: space-between; padding: 0 6px 18px 6px; border-bottom: 1px solid #f1f5f9; }
    .brand-logo-wrap { display: flex; align-items: center; gap: 10px; }
    .brand-badge-icon { width: 28px; height: 28px; background: #0A152E; border-radius: 6px; display: flex; align-items: center; justify-content: center; color: #38bdf8; font-weight: 800; font-size: 14px; }
    .brand-title { font-size: 18px; font-weight: 800; color: #0f172a; letter-spacing: -0.5px; }
    .brand-title span { color: #0284c7; }
    .brand-extra-icons { display: flex; gap: 6px; color: #94a3b8; font-size: 12px; }
    
    .nav-list { display: flex; flex-direction: column; gap: 4px; margin-top: 14px; }
    .nav-item { display: flex; align-items: center; gap: 10px; padding: 8px 12px; border-radius: 8px; font-size: 13px; font-weight: 500; color: #475569; text-decoration: none; }
    .nav-item.active { background: #eff6ff; color: #2563eb; font-weight: 700; border-left: 3px solid #2563eb; }
    .nav-item svg { width: 16px; height: 16px; stroke-width: 2.2; }
    
    .sidebar-footer { padding-top: 14px; border-top: 1px solid #f1f5f9; }
    .user-profile-box { font-size: 12px; }
    .user-name { font-weight: 700; color: #0f172a; }
    .user-role { font-size: 10px; color: #64748b; margin-bottom: 6px; }
    .logout-btn { display: flex; align-items: center; gap: 6px; font-size: 12px; color: #64748b; cursor: pointer; margin-top: 4px; }
    
    /* Main Content Area */
    .main-view { flex: 1; padding: 20px 28px; overflow-y: auto; display: flex; flex-direction: column; justify-content: space-between; }
    
    /* Global Elements */
    .header-row { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px; }
    .page-title { font-size: 22px; font-weight: 800; color: #0f172a; }
    .page-subtitle { font-size: 12px; color: #64748b; margin-top: 2px; }
    .header-actions-wrap { display: flex; gap: 10px; align-items: center; }
    
    .tenant-badge { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 6px 14px; display: flex; align-items: center; gap: 10px; box-shadow: 0 1px 2px rgba(0,0,0,0.03); }
    .tb-tag { background: #dbeafe; color: #1d4ed8; font-size: 9px; font-weight: 800; padding: 2px 6px; border-radius: 4px; }
    .tb-name { font-size: 12px; font-weight: 700; color: #0f172a; }
    
    .btn-action { display: inline-flex; align-items: center; gap: 6px; padding: 7px 14px; border-radius: 8px; font-size: 12px; font-weight: 600; border: none; cursor: pointer; }
    .btn-blue { background: #2563eb; color: #ffffff; }
    .btn-green { background: #dcfce7; color: #166534; border: 1px solid #bbf7d0; }
    .btn-red { background: #fee2e2; color: #991b1b; border: 1px solid #fecaca; }
    .btn-gray { background: #ffffff; border: 1px solid #cbd5e1; color: #475569; }
    
    .search-input-box { background: #ffffff; border: 1px solid #cbd5e1; border-radius: 8px; padding: 6px 12px; font-size: 12px; color: #334155; width: 240px; }
    
    .stat-cards-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-bottom: 16px; }
    .stat-card { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 14px 16px; display: flex; align-items: center; gap: 14px; box-shadow: 0 1px 3px rgba(0,0,0,0.02); }
    .stat-icon-wrap { width: 42px; height: 42px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 18px; }
    .stat-icon-wrap.purple { background: #f3e8ff; color: #9333ea; }
    .stat-icon-wrap.green { background: #dcfce7; color: #16a34a; }
    .stat-icon-wrap.yellow { background: #fef3c7; color: #d97706; }
    .stat-icon-wrap.blue { background: #e0f2fe; color: #0284c7; }
    .stat-label { font-size: 11px; color: #64748b; font-weight: 600; text-transform: capitalize; }
    .stat-val { font-size: 20px; font-weight: 800; color: #0f172a; margin-top: 2px; }
    
    .main-panel-card { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.02); margin-bottom: 12px; }
    .panel-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; }
    .panel-left-header { display: flex; align-items: center; gap: 10px; }
    .panel-icon-wrap { width: 32px; height: 32px; border-radius: 8px; background: #eef2ff; color: #4f46e5; display: flex; align-items: center; justify-content: center; font-size: 15px; }
    .panel-heading { font-size: 14px; font-weight: 700; color: #0f172a; }
    .panel-desc { font-size: 11px; color: #64748b; margin-top: 1px; }
    .panel-controls { display: flex; gap: 6px; align-items: center; }
    .btn-pill { border: 1px solid #cbd5e1; background: #ffffff; border-radius: 6px; padding: 4px 10px; font-size: 11px; font-weight: 600; color: #475569; }
    .btn-pill.active { background: #2563eb; color: #ffffff; border-color: #2563eb; }
    
    /* Table Styling */
    .data-table { width: 100%; border-collapse: collapse; font-size: 12px; }
    .data-table th { background: #f8fafc; color: #475569; font-weight: 700; text-align: left; padding: 10px 12px; border-bottom: 1px solid #e2e8f0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; }
    .data-table td { padding: 8px 12px; border-bottom: 1px solid #f1f5f9; color: #1e293b; vertical-align: middle; }
    .data-table tr:hover { background: #f8fafc; }
    .thumb-preview { width: 44px; height: 28px; border-radius: 4px; object-fit: cover; border: 1px solid #cbd5e1; }
    .conf-bar-bg { width: 80px; height: 6px; background: #e2e8f0; border-radius: 3px; overflow: hidden; display: inline-block; vertical-align: middle; margin-right: 6px; }
    .conf-bar-fill { height: 100%; background: #10b981; border-radius: 3px; }
    
    /* Copyright Footer */
    .app-footer-bar { font-size: 10.5px; color: #94a3b8; text-align: center; padding-top: 8px; }
  `;
}

const ICONS = {
  overview: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"/></svg>`,
  cameras: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"/></svg>`,
  logs: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/></svg>`,
  report: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"/></svg>`,
  engine: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V5.25a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 5.25v13.5A2.25 2.25 0 006.75 19.5z"/></svg>`,
  users: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"/></svg>`,
  tenants: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"/></svg>`,
  plates: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h14.25c.621 0 1.125.504 1.125 1.125v14.25c0 .621-.504 1.125-1.125 1.125H4.875c-.621 0-1.125-.504-1.125-1.125V4.875zM9 9h6m-6 3h6m-6 3h3"/></svg>`,
  settings: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.6 6.6 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.241.437-.613.43-.991a6.932 6.932 0 010-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>`
};

function renderSidebar(activeItem) {
  const items = [
    { id: 'overview', name: 'Overview', icon: ICONS.overview },
    { id: 'cameras', name: 'Cameras', icon: ICONS.cameras },
    { id: 'logs', name: 'Logs', icon: ICONS.logs },
    { id: 'report', name: 'Report', icon: ICONS.report },
    { id: 'engine', name: 'Engine Health', icon: ICONS.engine },
    { id: 'users', name: 'Users', icon: ICONS.users },
    { id: 'tenants', name: 'Tenants', icon: ICONS.tenants },
    { id: 'plates', name: 'Plat Nomor DB', icon: ICONS.plates },
    { id: 'settings', name: 'Settings', icon: ICONS.settings }
  ];

  return `
    <div class="sidebar">
      <div>
        <div class="brand-area">
          <div class="brand-logo-wrap">
            <div class="brand-badge-icon">X</div>
            <div class="brand-title">X<span>tur</span></div>
          </div>
          <div class="brand-extra-icons">🌙 ▦</div>
        </div>
        <div class="nav-list">
          ${items.map(it => `
            <a class="nav-item ${it.id === activeItem ? 'active' : ''}">
              ${it.icon} <span>${it.name}</span>
            </a>
          `).join('')}
        </div>
      </div>
      <div class="sidebar-footer">
        <div class="user-profile-box">
          <div class="user-name">System Superadmin</div>
          <div class="user-role">platform_superadmin</div>
        </div>
        <div class="logout-btn">↪ Log out</div>
      </div>
    </div>
  `;
}

function wrapInBrowser(urlPath, activeSidebar, contentHtml) {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    ${getBaseStyles()}
  </style>
</head>
<body>
  <div class="browser-bar">
    <div class="browser-controls">
      <div class="b-dot b-red"></div>
      <div class="b-dot b-yellow"></div>
      <div class="b-dot b-green"></div>
    </div>
    <div class="nav-arrows">◀ ▶ ↻</div>
    <div class="url-bar">
      <span class="lock-icon">🔒</span>
      <span class="domain">xtur.exac.site</span>${urlPath}
    </div>
    <div class="browser-actions">☆ 🧩 👤</div>
  </div>

  <div class="app-layout">
    ${renderSidebar(activeSidebar)}
    <div class="main-view">
      ${contentHtml}
      <div class="app-footer-bar">
        © 2026 Copyright by Maudy Network Komunikasi. All rights reserved.
      </div>
    </div>
  </div>
</body>
</html>`;
}

// 2. DETECTION LOGS
function getHtmlLogs() {
  const rows = [
    { time: '09/09/2026, 16:48:08', cls: 'Car', id: '#1205', cam: 'Samping', conf: '89.5%' },
    { time: '09/09/2026, 16:47:50', cls: 'Motorcycle', id: '#1204', cam: 'Samping', conf: '77.5%' },
    { time: '09/09/2026, 16:45:21', cls: 'Person', id: '#412', cam: 'A5', conf: '78.7%' },
    { time: '09/09/2026, 16:44:39', cls: 'Person', id: '#1074', cam: 'J30B', conf: '75.7%' },
    { time: '09/09/2026, 16:43:55', cls: 'Car', id: '#1212', cam: 'Depan', conf: '83.2%' },
    { time: '09/09/2026, 16:43:53', cls: 'Person', id: '#409', cam: 'A5', conf: '75.3%' },
    { time: '09/09/2026, 16:43:29', cls: 'Person', id: '#408', cam: 'A5', conf: '87.4%' },
    { time: '09/09/2026, 16:42:50', cls: 'Motorcycle', id: '#407', cam: 'A5', conf: '83.4%' },
    { time: '09/09/2026, 16:42:44', cls: 'Motorcycle', id: '#1186', cam: 'Samping', conf: '82.4%' }
  ];

  const content = `
    <div>
      <div class="header-row">
        <div>
          <h1 class="page-title">Detection Logs</h1>
          <p class="page-subtitle">Review historical AI detections & CRUD management</p>
        </div>
        <div class="header-actions-wrap">
          <input type="text" class="search-input-box" placeholder="🔍 Cari objek, kamera, waktu, track...">
          <select class="btn-action btn-gray"><option>Semua Objek</option></select>
          <button class="btn-action btn-green">📊 CSV</button>
          <button class="btn-action btn-red">📄 PDF</button>
          <button class="btn-action btn-blue">+ Tambah Log</button>
        </div>
      </div>

      <div class="main-panel-card" style="padding: 0; overflow: hidden;">
        <table class="data-table">
          <thead>
            <tr>
              <th>SNAPSHOT</th>
              <th>TIME</th>
              <th>OBJECT CLASS</th>
              <th>TRACK ID</th>
              <th>CAMERA</th>
              <th>CONFIDENCE</th>
              <th style="text-align: right;">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            ${rows.map(r => `
              <tr>
                <td><div style="width:46px;height:30px;background:#1e293b;border-radius:4px;display:flex;align-items:center;justify-content:center;color:#94a3b8;font-size:10px;">📸 HD</div></td>
                <td style="color:#64748b;font-family:monospace;font-size:11px;">${r.time}</td>
                <td><strong style="color:#0f172a;">${r.cls}</strong></td>
                <td><span style="background:#f1f5f9;color:#475569;padding:2px 6px;border-radius:4px;font-weight:600;font-size:11px;">${r.id}</span></td>
                <td><span style="color:#2563eb;font-weight:600;">${r.cam}</span></td>
                <td>
                  <div class="conf-bar-bg"><div class="conf-bar-fill" style="width:${r.conf};"></div></div>
                  <strong style="color:#10b981;font-size:11px;">${r.conf}</strong>
                </td>
                <td style="text-align: right;">
                  <button class="btn-pill" style="padding:2px 6px;">ℹ</button>
                  <button class="btn-pill" style="padding:2px 6px;">🚩 Incorrect</button>
                  <button class="btn-pill" style="padding:2px 6px;">✏</button>
                  <button class="btn-pill" style="padding:2px 6px;">🗑</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
  return wrapInBrowser('/dashboard/logs', 'logs', content);
}

// 3. CAMERAS MONITOR
function getHtmlCameras() {
  const cams = [
    { name: 'J30B', tag: 'Dual Stream', st: 'online', pills: ['Person', 'Mobil', 'Motor', 'Bus', 'Truk'], bg: '#0A152E', label: 'Menghubungkan Aliran Live...' },
    { name: 'A5', tag: 'Dual Stream', st: 'online', pills: ['Person', 'Mobil', 'Motor', 'Bus', 'Truk'], bg: '#1E293B', label: 'Feed Kamera Aktif 30 FPS' },
    { name: 'Samping', tag: 'Dual Stream', st: 'online', pills: ['Person', 'Mobil', 'Bus', 'Truk', 'Motor'], bg: '#0A152E', label: 'Menghubungkan Aliran Live...' },
    { name: 'Depan', tag: 'Dual Stream', st: 'online', pills: ['Person', 'Mobil', 'Bus', 'Truk', 'Motor'], bg: '#1E293B', label: 'Feed Gerbang Utama 30 FPS' }
  ];

  const content = `
    <div>
      <div class="header-row">
        <div>
          <h1 class="page-title">Cameras</h1>
          <p class="page-subtitle">Manage and view your video streams</p>
        </div>
        <div class="header-actions-wrap">
          <select class="btn-action btn-gray"><option>Semua Tenant (2)</option></select>
          <input type="text" class="search-input-box" placeholder="🔍 Cari nama kamera, RTSP, status...">
          <button class="btn-action btn-blue">+ Add Camera</button>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
        ${cams.slice(0,3).map(c => `
          <div class="main-panel-card" style="padding: 0; overflow: hidden; margin-bottom: 0;">
            <div style="height: 160px; background: ${c.bg}; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #38bdf8; gap: 8px;">
              <div style="width: 24px; height: 24px; border: 2px solid #38bdf8; border-top-color: transparent; border-radius: 50%;"></div>
              <span style="font-size: 11px; color: #94a3b8;">${c.label}</span>
            </div>
            <div style="padding: 12px 14px;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <strong style="font-size: 14px; color: #0f172a;">${c.name}</strong>
                <div style="display: flex; gap: 6px;">
                  <span style="font-size: 9px; background: #e0f2fe; color: #0284c7; padding: 2px 6px; border-radius: 4px; font-weight: 700;">${c.tag}</span>
                  <span style="font-size: 9px; background: #dcfce7; color: #16a34a; padding: 2px 6px; border-radius: 4px; font-weight: 700;">${c.st}</span>
                </div>
              </div>
              <div style="font-size: 10px; color: #64748b; margin: 4px 0 8px 0;">🏢 Xtur Platform</div>
              <div style="display: flex; gap: 4px; flex-wrap: wrap; margin-bottom: 10px;">
                ${c.pills.map(p => `<span style="font-size: 9px; background: #f1f5f9; color: #475569; padding: 2px 6px; border-radius: 4px;">+ ${p}</span>`).join('')}
              </div>
              <div style="display: flex; justify-content: space-between; border-top: 1px solid #f1f5f9; padding-top: 8px; font-size: 11px; color: #64748b;">
                <span>⚙ Edit</span>
                <span style="color: #ef4444;">🗑 Delete</span>
              </div>
            </div>
          </div>
        `).join('')}
      </div>

      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 14px;">
        <div class="main-panel-card" style="padding: 0; overflow: hidden; margin-bottom: 0;">
          <div style="height: 160px; background: #131d33; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #10b981; gap: 8px;">
            <div style="font-size: 32px;">📷</div>
            <span style="font-size: 11px; color: #94a3b8;">Depan (Gerbang Utama) — Online</span>
          </div>
          <div style="padding: 12px 14px;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <strong style="font-size: 14px; color: #0f172a;">Depan</strong>
              <div style="display: flex; gap: 6px;">
                <span style="font-size: 9px; background: #e0f2fe; color: #0284c7; padding: 2px 6px; border-radius: 4px; font-weight: 700;">Dual Stream</span>
                <span style="font-size: 9px; background: #dcfce7; color: #16a34a; padding: 2px 6px; border-radius: 4px; font-weight: 700;">online</span>
              </div>
            </div>
            <div style="font-size: 10px; color: #64748b; margin: 4px 0 8px 0;">🏢 Xtur Platform</div>
            <div style="display: flex; gap: 4px; flex-wrap: wrap; margin-bottom: 10px;">
              <span style="font-size: 9px; background: #f1f5f9; color: #475569; padding: 2px 6px; border-radius: 4px;">+ Person</span>
              <span style="font-size: 9px; background: #f1f5f9; color: #475569; padding: 2px 6px; border-radius: 4px;">+ Mobil</span>
              <span style="font-size: 9px; background: #f1f5f9; color: #475569; padding: 2px 6px; border-radius: 4px;">+ Motor</span>
            </div>
            <div style="display: flex; justify-content: space-between; border-top: 1px solid #f1f5f9; padding-top: 8px; font-size: 11px; color: #64748b;">
              <span>⚙ Edit</span>
              <span style="color: #ef4444;">🗑 Delete</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  return wrapInBrowser('/dashboard/cameras', 'cameras', content);
}

// 4. REPORTS TOP
function getHtmlReportsTop() {
  const content = `
    <div>
      <div class="header-row">
        <div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <h1 class="page-title">Report & Analitik CCTV</h1>
            <span style="background: #dcfce7; color: #15803d; font-size: 10px; font-weight: 800; padding: 2px 6px; border-radius: 4px;">Live Insights</span>
          </div>
          <p class="page-subtitle">Pusat grafik historis, tren waktu, analisis jam sibuk, demografi, dan wilayah plat nomor kendaraan</p>
        </div>
        <div class="header-actions-wrap">
          <button class="btn-action btn-green">📊 Export Excel</button>
          <button class="btn-action btn-red">📄 Export PDF</button>
        </div>
      </div>

      <div class="main-panel-card" style="padding: 10px 16px; margin-bottom: 14px;">
        <div style="display: flex; justify-content: space-between; align-items: center; font-size: 11px;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <strong style="color: #475569;">📅 PERIODE:</strong>
            <button class="btn-pill">Hari Ini</button>
            <button class="btn-pill active">7 Hari</button>
            <button class="btn-pill">30 Hari</button>
            <button class="btn-pill">Bulan Ini</button>
            <button class="btn-pill">Kustom</button>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="color: #64748b;">Interval:</span>
            <button class="btn-pill active">Otomatis</button>
            <button class="btn-pill">Jam</button>
            <button class="btn-pill">Hari</button>
            <button class="btn-pill">Minggu</button>
          </div>
        </div>
      </div>

      <div class="stat-cards-grid" style="grid-template-columns: repeat(5, 1fr); margin-bottom: 14px;">
        <div class="stat-card">
          <div>
            <div class="stat-label">TOTAL DETEKSI</div>
            <div class="stat-val">1.748</div>
            <div style="font-size: 9.5px; color: #64748b;">Seluruh objek tervalidasi</div>
          </div>
        </div>
        <div class="stat-card">
          <div>
            <div class="stat-label">PUNCAK TRAFIK</div>
            <div class="stat-val" style="color: #d97706;">8 Sep</div>
            <div style="font-size: 9.5px; color: #64748b;">868 deteksi tertinggi</div>
          </div>
        </div>
        <div class="stat-card">
          <div>
            <div class="stat-label">TOTAL KENDARAAN</div>
            <div class="stat-val" style="color: #2563eb;">605</div>
            <div style="font-size: 9.5px; color: #64748b;">Mobil, Motor, Bus, Truk</div>
          </div>
        </div>
        <div class="stat-card">
          <div>
            <div class="stat-label">PLAT UNIK (ALPR)</div>
            <div class="stat-val" style="color: #16a34a;">17</div>
            <div style="font-size: 9.5px; color: #64748b;">Nomor polisi berbeda</div>
          </div>
        </div>
        <div class="stat-card">
          <div>
            <div class="stat-label">AKURASI AI RATA-RATA</div>
            <div class="stat-val" style="color: #9333ea;">78.7%</div>
            <div style="font-size: 9.5px; color: #64748b;">Confidence score</div>
          </div>
        </div>
      </div>

      <div class="main-panel-card">
        <div class="panel-header">
          <div>
            <div class="panel-heading">📈 Tren Deteksi Sepanjang Waktu</div>
            <div class="panel-desc">Visualisasi volume deteksi objek terverifikasi berdasarkan filter rentang waktu</div>
          </div>
          <div style="display: flex; gap: 6px;">
            <button class="btn-pill active">Area Kurva</button>
            <button class="btn-pill">Batang</button>
          </div>
        </div>

        <div style="display: flex; gap: 10px; font-size: 11px; margin-bottom: 12px;">
          <span style="color: #2563eb; font-weight: 600;">● Mobil (351)</span>
          <span style="color: #6366f1; font-weight: 600;">● Motor (247)</span>
          <span style="color: #ec4899; font-weight: 600;">● Orang (1143)</span>
          <span style="color: #f59e0b; font-weight: 600;">● Bus (1)</span>
          <span style="color: #10b981; font-weight: 600;">● Truk (6)</span>
        </div>

        <div style="height: 180px; width: 100%; position: relative;">
          <svg viewBox="0 0 800 180" style="width: 100%; height: 100%;">
            <defs>
              <linearGradient id="gradWave" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#6366f1" stop-opacity="0.35"/>
                <stop offset="100%" stop-color="#6366f1" stop-opacity="0.0"/>
              </linearGradient>
            </defs>
            <path d="M 0 170 Q 200 160 400 120 T 650 30 T 800 60 L 800 180 L 0 180 Z" fill="url(#gradWave)" />
            <path d="M 0 170 Q 200 160 400 120 T 650 30 T 800 60" fill="none" stroke="#4f46e5" stroke-width="3" />
            <circle cx="0" cy="170" r="4" fill="#4f46e5"/>
            <circle cx="400" cy="120" r="4" fill="#4f46e5"/>
            <circle cx="650" cy="30" r="5" fill="#4f46e5"/>
            <circle cx="800" cy="60" r="4" fill="#4f46e5"/>
          </svg>
        </div>
      </div>
    </div>
  `;
  return wrapInBrowser('/dashboard/reports', 'report', content);
}

// 5. REPORTS BOTTOM
function getHtmlReportsBottom() {
  const content = `
    <div>
      <div class="header-row">
        <div>
          <h1 class="page-title">Analisis Lanjutan Kepadatan & Wilayah</h1>
          <p class="page-subtitle">Distribusi jam sibuk 24 jam, demografi pengunjung, dan asal wilayah plat nomor</p>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 14px;">
        <div class="main-panel-card" style="margin-bottom: 0;">
          <div class="panel-heading" style="margin-bottom: 4px;">⏰ Analisis Jam Sibuk 24 Jam</div>
          <div class="panel-desc" style="margin-bottom: 14px;">Pola konsentrasi kepadatan lalu lintas per jam (00:00 s.d. 23:00)</div>
          <div style="display: flex; align-items: flex-end; height: 110px; gap: 4px; border-bottom: 1px solid #e2e8f0; padding-bottom: 4px;">
            ${[5,8,4,2,3,10,25,48,80,65,55,70,88,95,75,60,70,85,90,75,45,30,15,8].map((h, idx) => `
              <div style="flex: 1; background: ${idx >= 12 && idx <= 18 ? '#4f46e5' : '#cbd5e1'}; height: ${h}%; border-radius: 2px;"></div>
            `).join('')}
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 10px; color: #94a3b8; margin-top: 4px;">
            <span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>23:00</span>
          </div>
        </div>

        <div class="main-panel-card" style="margin-bottom: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
            <div class="panel-heading">👥 Demografi Pejalan Kaki</div>
            <strong style="color: #ec4899; font-size: 12px;">1.143 Orang</strong>
          </div>
          <div class="panel-desc" style="margin-bottom: 14px;">Komposisi jenis kelamin dan sebaran kelompok usia pejalan kaki</div>
          
          <div style="margin-bottom: 10px;">
            <div style="display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 4px;">
              <span>Tidak Teridentifikasi (Privasi / Jarak)</span>
              <strong>1.143 (100%)</strong>
            </div>
            <div style="height: 8px; background: #6366f1; border-radius: 4px;"></div>
          </div>
          <div>
            <div style="display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 4px;">
              <span>Lainnya (Sensor Jarak Jauh)</span>
              <strong>1.143 (100%)</strong>
            </div>
            <div style="height: 8px; background: #ec4899; border-radius: 4px;"></div>
          </div>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
        <div class="main-panel-card" style="margin-bottom: 0;">
          <div class="panel-heading" style="margin-bottom: 4px;">🚘 Asal Wilayah Plat Nomor Terbanyak</div>
          <div class="panel-desc" style="margin-bottom: 12px;">Peringkat kota/kabupaten asal kendaraan yang melintas</div>
          <div style="font-size: 11.5px; display: flex; flex-direction: column; gap: 8px;">
            <div style="display: flex; justify-content: space-between;">
              <span>1. <strong>Karawang, Purwakarta, Subang</strong> (Jawa Barat)</span>
              <strong style="color: #16a34a;">11 unit</strong>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span>2. <strong>Banten</strong> (Serang, Cilegon, Tangerang)</span>
              <strong style="color: #16a34a;">4 unit</strong>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span>3. <strong>Garut, Tasikmalaya, Ciamis</strong> (Jawa Barat)</span>
              <strong style="color: #16a34a;">2 unit</strong>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span>4. <strong>Semarang, Salatiga, Demak</strong> (Jawa Tengah)</span>
              <strong style="color: #16a34a;">1 unit</strong>
            </div>
          </div>
        </div>

        <div class="main-panel-card" style="margin-bottom: 0;">
          <div class="panel-heading" style="margin-bottom: 4px;">📷 Distribusi Titik Pantau Kamera</div>
          <div class="panel-desc" style="margin-bottom: 12px;">Perbandingan volume deteksi objek antar titik kamera CCTV</div>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <div>
              <div style="display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 2px;">
                <span>Kamera J30B</span><strong>574 (33%)</strong>
              </div>
              <div style="height: 6px; background: #e2e8f0; border-radius: 3px;"><div style="width: 33%; height: 100%; background: #2563eb; border-radius: 3px;"></div></div>
            </div>
            <div>
              <div style="display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 2px;">
                <span>Kamera Samping</span><strong>477 (27%)</strong>
              </div>
              <div style="height: 6px; background: #e2e8f0; border-radius: 3px;"><div style="width: 27%; height: 100%; background: #2563eb; border-radius: 3px;"></div></div>
            </div>
            <div>
              <div style="display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 2px;">
                <span>Kamera Depan</span><strong>424 (24%)</strong>
              </div>
              <div style="height: 6px; background: #e2e8f0; border-radius: 3px;"><div style="width: 24%; height: 100%; background: #2563eb; border-radius: 3px;"></div></div>
            </div>
            <div>
              <div style="display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 2px;">
                <span>Kamera A5</span><strong>273 (16%)</strong>
              </div>
              <div style="height: 6px; background: #e2e8f0; border-radius: 3px;"><div style="width: 16%; height: 100%; background: #2563eb; border-radius: 3px;"></div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  return wrapInBrowser('/dashboard/reports', 'report', content);
}

// 6. ENGINE HEALTH
function getHtmlEngineHealth() {
  const content = `
    <div>
      <div class="header-row">
        <div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <h1 class="page-title">Engine Health & Resource</h1>
            <span style="background: #dcfce7; color: #15803d; font-size: 10px; font-weight: 800; padding: 2px 6px; border-radius: 4px;">Live Monitor</span>
          </div>
          <p class="page-subtitle">Informasi penggunaan komputasi perangkat (CPU, RAM, GPU/MPS, Redis, AI) & efektivitas optimasi sistem.</p>
        </div>
        <div class="header-actions-wrap">
          <span style="font-size: 11px; color: #64748b;">🕒 Update: 4:51:14 PM</span>
          <select class="btn-action btn-gray"><option>Interval: 3 Detik (Cepat)</option></select>
          <button class="btn-action btn-blue">🔄 Refresh</button>
        </div>
      </div>

      <div class="stat-cards-grid">
        <div class="stat-card">
          <div class="stat-icon-wrap green">⚙</div>
          <div>
            <div class="stat-label">Host CPU Load</div>
            <div class="stat-val">21% <span style="font-size: 11px; color: #64748b; font-weight: normal;">16 Cores</span></div>
            <div style="font-size: 9.5px; color: #64748b;">Intel(R) Core(TM) i7-14700F</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon-wrap purple">💾</div>
          <div>
            <div class="stat-label">Host RAM Memory</div>
            <div class="stat-val">8.04 <span style="font-size: 12px; color: #64748b; font-weight: normal;">/ 15.11 GB</span></div>
            <div style="font-size: 9.5px; color: #10b981;">53% (Free: 7.07 GB)</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon-wrap yellow">⚡</div>
          <div>
            <div class="stat-label">Redis RAM & Stream Buffer</div>
            <div class="stat-val">22.36M <span style="font-size: 9.5px; background: #fee2e2; color: #991b1b; padding: 2px 4px; border-radius: 3px;">Capped</span></div>
            <div style="font-size: 9.5px; color: #64748b;">Buffer: 100 / 50 (Peak: 26.96M)</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon-wrap blue">🧠</div>
          <div>
            <div class="stat-label">AI Inference Engine</div>
            <div class="stat-val" style="color: #10b981;">4.2 ms <span style="font-size: 11px; color: #64748b; font-weight: normal;">/ frame</span></div>
            <div style="font-size: 9.5px; color: #64748b;">NVIDIA CUDA (640x640 Opt)</div>
          </div>
        </div>
      </div>

      <div class="main-panel-card">
        <div class="panel-header">
          <div>
            <div class="panel-heading">📉 Tren Telemetri Real-time (20 Titik Terakhir)</div>
            <div class="panel-desc">Pantauan pergerakan beban CPU, RAM, dan latensi inferensi AI secara berkesinambungan</div>
          </div>
          <div style="display: flex; gap: 12px; font-size: 11px;">
            <span style="color: #10b981; font-weight: 600;">● CPU (21%)</span>
            <span style="color: #2563eb; font-weight: 600;">● RAM (53%)</span>
            <span style="color: #f59e0b; font-weight: 600;">● AI Latency (4.2ms)</span>
          </div>
        </div>
        <div style="height: 100px; width: 100%; display: flex; align-items: center; justify-content: center; background: #fafafa; border-radius: 6px; border: 1px dashed #e2e8f0;">
          <svg viewBox="0 0 600 80" style="width: 100%; height: 100%;">
            <polyline points="0,50 100,50 200,48 300,52 400,49 500,50 600,50" fill="none" stroke="#2563eb" stroke-width="2.5" />
            <polyline points="0,65 100,65 200,64 300,66 400,65 500,64 600,65" fill="none" stroke="#10b981" stroke-width="2" />
            <polyline points="0,70 150,70 250,30 350,70 500,70 600,70" fill="none" stroke="#f59e0b" stroke-width="2" />
          </svg>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px;">
        <div class="main-panel-card" style="padding: 12px; margin-bottom: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
            <strong style="font-size: 12px;">🐘 PostgreSQL DB</strong>
            <span style="background: #dcfce7; color: #15803d; font-size: 9px; font-weight: 700; padding: 2px 6px; border-radius: 4px;">Online</span>
          </div>
          <div style="font-size: 10.5px; color: #64748b; line-height: 1.6;">
            <div>Ping Latency: <strong>0 ms</strong></div>
            <div>Total Kamera: <strong>4 (4 Online)</strong></div>
            <div>ORM: <strong>Prisma 8 (RC)</strong></div>
          </div>
        </div>

        <div class="main-panel-card" style="padding: 12px; margin-bottom: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
            <strong style="font-size: 12px;">⚡ Redis Broker</strong>
            <span style="background: #dcfce7; color: #15803d; font-size: 9px; font-weight: 700; padding: 2px 6px; border-radius: 4px;">Active</span>
          </div>
          <div style="font-size: 10.5px; color: #64748b; line-height: 1.6;">
            <div>Stream Key: <strong>xtur:frames</strong></div>
            <div>Trimming Limit: <strong>MAXLEN ~ 50</strong></div>
            <div>Koneksi Klien: <strong>9 Klien</strong></div>
          </div>
        </div>

        <div class="main-panel-card" style="padding: 12px; margin-bottom: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
            <strong style="font-size: 12px;">🧠 AI Engine (PyTorch)</strong>
            <span style="background: #e0f2fe; color: #0284c7; font-size: 9px; font-weight: 700; padding: 2px 6px; border-radius: 4px;">MPS Enabled</span>
          </div>
          <div style="font-size: 10.5px; color: #64748b; line-height: 1.6;">
            <div>Model Detector: <strong>YOLOv8 Nano</strong></div>
            <div>Tracking: <strong>DeepSORT + Cache</strong></div>
            <div>Auto Memory GC: <strong>Tiap 50 Frame</strong></div>
          </div>
        </div>

        <div class="main-panel-card" style="padding: 12px; margin-bottom: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
            <strong style="font-size: 12px;">📡 RTSP Ingestion</strong>
            <span style="background: #fef3c7; color: #d97706; font-size: 9px; font-weight: 700; padding: 2px 6px; border-radius: 4px;">Rate Limited</span>
          </div>
          <div style="font-size: 10.5px; color: #64748b; line-height: 1.6;">
            <div>Frame Extraction: <strong>5 FPS (-r 5)</strong></div>
            <div>Rate Interval: <strong>200 ms / frame</strong></div>
            <div>MediaMTX Gateway: <strong>Port 8554 / 9997</strong></div>
          </div>
        </div>
      </div>
    </div>
  `;
  return wrapInBrowser('/dashboard/engine-health', 'engine', content);
}

// 7. DETECTION SETTINGS 1
function getHtmlSettings1() {
  const content = `
    <div>
      <div class="header-row">
        <div>
          <h1 class="page-title">Detection Settings</h1>
          <p class="page-subtitle">Configure AI object detection classes and parameters</p>
        </div>
        <div class="header-actions-wrap">
          <button class="btn-action btn-blue">💾 Save Settings</button>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1.2fr 1fr; gap: 16px;">
        <div>
          <div class="main-panel-card">
            <div class="panel-heading" style="margin-bottom: 4px;">🎯 Kelas Objek yang Dideteksi</div>
            <div class="panel-desc" style="margin-bottom: 12px;">Pilih jenis objek yang akan dideteksi oleh YOLOv8. Menonaktifkan kelas akan mengurangi beban CPU.</div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 12px;">
              <div style="background: #eef2ff; border: 1px solid #c7d2fe; border-radius: 8px; padding: 10px; display: flex; justify-content: space-between; align-items: center;">
                <div>
                  <strong style="font-size: 12px; color: #3730a3;">Manusia (Person)</strong>
                  <div style="font-size: 10px; color: #6366f1;">Deteksi pejalan kaki & individu</div>
                </div>
                <span style="color: #4f46e5;">●</span>
              </div>
              <div style="background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 8px; padding: 10px; display: flex; justify-content: space-between; align-items: center;">
                <div>
                  <strong style="font-size: 12px; color: #065f46;">Mobil (Car)</strong>
                  <div style="font-size: 10px; color: #059669;">Deteksi kendaraan roda 4</div>
                </div>
                <span style="color: #10b981;">●</span>
              </div>
              <div style="background: #fffbeb; border: 1px solid #fde68a; border-radius: 8px; padding: 10px; display: flex; justify-content: space-between; align-items: center;">
                <div>
                  <strong style="font-size: 12px; color: #92400e;">Motor (Motorcycle)</strong>
                  <div style="font-size: 10px; color: #d97706;">Deteksi sepeda motor</div>
                </div>
                <span style="color: #f59e0b;">●</span>
              </div>
              <div style="background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 8px; padding: 10px; display: flex; justify-content: space-between; align-items: center;">
                <div>
                  <strong style="font-size: 12px; color: #075985;">Bus</strong>
                  <div style="font-size: 10px; color: #0284c7;">Deteksi bus dan minibus</div>
                </div>
                <span style="color: #0284c7;">●</span>
              </div>
            </div>

            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 6px 10px; font-size: 11px; color: #64748b;">
              <strong>Aktif:</strong> Manusia (Person), Mobil (Car), Motor (Motorcycle), Bus, Truk (Truck)
            </div>
          </div>

          <div class="main-panel-card">
            <div class="panel-heading" style="margin-bottom: 4px;">🎚 Confidence Threshold</div>
            <div class="panel-desc" style="margin-bottom: 12px;">Ambang batas minimum skor kepercayaan YOLO. Nilai lebih tinggi = lebih ketat & akurat.</div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <span style="font-size: 12px; color: #475569;">Threshold saat ini</span>
              <strong style="font-size: 18px; color: #2563eb;">75%</strong>
            </div>
            <input type="range" min="10" max="95" value="75" style="width: 100%; margin-bottom: 10px;">
            <div style="display: flex; gap: 6px;">
              <button class="btn-pill">30%</button>
              <button class="btn-pill">40%</button>
              <button class="btn-pill">50%</button>
              <button class="btn-pill">60%</button>
              <button class="btn-pill active">70%</button>
              <button class="btn-pill">80%</button>
            </div>
          </div>
        </div>

        <div>
          <div class="main-panel-card">
            <div class="panel-heading" style="margin-bottom: 10px;">⚙ Opsi Lanjutan Tracking & Privasi</div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; border-bottom: 1px solid #f1f5f9; padding-bottom: 8px;">
              <div>
                <strong style="font-size: 12px;">DeepSORT Tracking</strong>
                <div style="font-size: 10.5px; color: #64748b;">Lacak ID unik per objek antar frame CCTV</div>
              </div>
              <span style="color: #2563eb; font-weight: 700;">ON [✓]</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <div>
                <strong style="font-size: 12px;">Privacy Blur (Wajah)</strong>
                <div style="font-size: 10.5px; color: #64748b;">Otomatis blur wajah manusia untuk kepatuhan UU PDP</div>
              </div>
              <span style="color: #64748b; font-weight: 700;">OFF [ ]</span>
            </div>
          </div>

          <div class="main-panel-card">
            <div class="panel-heading" style="margin-bottom: 4px;">🧬 Secondary AI Pipeline</div>
            <div class="panel-desc" style="margin-bottom: 12px;">Analisis atribut tambahan menggunakan model AI sekunder.</div>
            <div style="background: #faf5ff; border: 1px solid #e9d5ff; border-radius: 8px; padding: 12px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                <strong style="font-size: 12px; color: #6b21a8;">Analisis Wajah (Usia & Gender)</strong>
                <span style="color: #9333ea; font-weight: 700;">ON [✓]</span>
              </div>
              <div style="font-size: 10.5px; color: #7e22ce; line-height: 1.5;">
                Menggunakan DeepFace untuk mengestimasi rentang umur dan jenis kelamin secara real-time.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  return wrapInBrowser('/dashboard/settings', 'settings', content);
}

// 8. DETECTION SETTINGS 2
function getHtmlSettings2() {
  const content = `
    <div>
      <div class="header-row">
        <div>
          <h1 class="page-title">Detection Parameters & ALPR</h1>
          <p class="page-subtitle">Kecepatan ekstraksi frame, filter validasi wajah, dan pembacaan plat nomor otomatis</p>
        </div>
        <div class="header-actions-wrap">
          <button class="btn-action btn-blue">💾 Save Settings</button>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
        <div class="main-panel-card">
          <div class="panel-heading" style="margin-bottom: 4px;">⏱ Kecepatan Ekstraksi Frame (FPS)</div>
          <div class="panel-desc" style="margin-bottom: 12px;">Atur frekuensi frame RTSP yang diekstrak per detik untuk dianalisis oleh AI Engine (YOLOv8 & DeepSORT).</div>
          
          <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 10px; margin-bottom: 14px;">
            <strong style="color: #15803d; font-size: 11.5px;">✓ Rekomendasi Optimal GPU RTX (4-6 FPS)</strong>
            <p style="font-size: 10.5px; color: #166534; margin-top: 2px;">Keseimbangan sempurna untuk GPU RTX, inferensi ~8-15ms dengan tracking mulus dan latency rendah.</p>
          </div>

          <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 6px;">
            <span>1 FPS (Minimal)</span>
            <strong style="color: #4f46e5; font-size: 14px;">5 FPS (Optimal)</strong>
            <span>10 FPS (Maksimal)</span>
          </div>
          <input type="range" min="1" max="10" value="5" style="width: 100%; margin-bottom: 14px;">

          <div style="display: flex; gap: 8px;">
            <button class="btn-pill">2 FPS (Hemat)</button>
            <button class="btn-pill">3 FPS (Standar)</button>
            <button class="btn-pill active">5 FPS (Optimal GPU)</button>
            <button class="btn-pill">8 FPS (Presisi)</button>
          </div>
        </div>

        <div class="main-panel-card">
          <div class="panel-heading" style="margin-bottom: 4px;">💳 Baca Plat Nomor Kendaraan (ALPR)</div>
          <div class="panel-desc" style="margin-bottom: 14px;">Menggunakan OCR Neural Network untuk membaca teks plat nomor dari kendaraan yang terdeteksi.</div>

          <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 12px; margin-bottom: 14px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <strong style="color: #1e40af; font-size: 12px;">Fitur ALPR Indonesia</strong>
              <span style="color: #2563eb; font-weight: 700;">AKTIF [✓]</span>
            </div>
            <div style="font-size: 10.5px; color: #1e3a8a; line-height: 1.5;">
              Mendukung format plat nomor standar Indonesia (contoh: B 1234 ABC, D 5678 EF, dsb).
            </div>
          </div>

          <div style="display: flex; gap: 8px;">
            <span class="btn-pill active">✓ Plat Nomor Indonesia</span>
            <span class="btn-pill active">✓ CLAHE Pre-processing</span>
          </div>
        </div>
      </div>
    </div>
  `;
  return wrapInBrowser('/dashboard/settings', 'settings', content);
}

// 9. PLATE REGIONS DATABASE
function getHtmlPlates() {
  const plates = [
    { code: 'A', reg: 'Banten (Serang, Cilegon, Pandeglang, Lebak, Tangerang)', prov: 'Banten', area: 'Wilayah Provinsi Banten Barat & Tengah' },
    { code: 'AA', reg: 'Magelang, Purworejo, Temanggung, Wonosobo, Kebumen', prov: 'Jawa Tengah', area: 'Wilayah Karesidenan Kedu' },
    { code: 'AB', reg: 'Kota Yogyakarta, Sleman, Bantul, Gunungkidul, Kulon Progo', prov: 'DI Yogyakarta', area: 'Seluruh Daerah Istimewa Yogyakarta' },
    { code: 'AD', reg: 'Kota Surakarta (Solo), Sukoharjo, Klaten, Boyolali, Sragen', prov: 'Jawa Tengah', area: 'Wilayah Solo Raya / Subosukawonosraten' },
    { code: 'AE', reg: 'Madiun, Magetan, Ngawi, Pacitan, Ponorogo', prov: 'Jawa Timur', area: 'Wilayah Karesidenan Madiun' },
    { code: 'AG', reg: 'Kediri, Blitar, Tulungagung, Trenggalek, Nganjuk', prov: 'Jawa Timur', area: 'Wilayah Karesidenan Kediri' },
    { code: 'B', reg: 'DKI Jakarta, Bekasi, Depok, Kota Tangerang, Tangerang Selatan', prov: 'DKI Jakarta & Jawa Barat', area: 'Wilayah Metropolitan Jabodetabek' },
    { code: 'BA', reg: 'Padang, Bukittinggi, Pariaman, Solok, Agam, Pasaman', prov: 'Sumatera Barat', area: 'Seluruh Provinsi Sumatera Barat' },
    { code: 'BB', reg: 'Tapanuli, Sibolga, Mandailing Natal, Nias, Toba Samosir', prov: 'Sumatera Utara', area: 'Wilayah Sumatera Utara Bagian Barat' }
  ];

  const content = `
    <div>
      <div class="header-row">
        <div>
          <h1 class="page-title">Database Plat Nomor</h1>
          <p class="page-subtitle">Peta kode plat nomor kendaraan Indonesia ke wilayah/kota asal</p>
        </div>
        <div class="header-actions-wrap">
          <button class="btn-action btn-blue">+ Tambah Kode Plat</button>
        </div>
      </div>

      <div class="stat-cards-grid" style="margin-bottom: 14px;">
        <div class="stat-card">
          <div>
            <div class="stat-label">TOTAL KODE</div>
            <div class="stat-val">57</div>
          </div>
        </div>
        <div class="stat-card">
          <div>
            <div class="stat-label">JAWA</div>
            <div class="stat-val" style="color: #2563eb;">21</div>
          </div>
        </div>
        <div class="stat-card">
          <div>
            <div class="stat-label">SUMATERA</div>
            <div class="stat-val" style="color: #10b981;">11</div>
          </div>
        </div>
        <div class="stat-card">
          <div>
            <div class="stat-label">KALIMANTAN + LAINNYA</div>
            <div class="stat-val" style="color: #f59e0b;">24</div>
          </div>
        </div>
      </div>

      <div class="main-panel-card" style="padding: 0; overflow: hidden;">
        <div style="padding: 10px 16px; border-bottom: 1px solid #e2e8f0;">
          <input type="text" class="search-input-box" style="width: 320px;" placeholder="🔍 Cari kode plat, kota, atau provinsi...">
        </div>
        <table class="data-table">
          <thead>
            <tr>
              <th style="width: 70px;">KODE</th>
              <th>WILAYAH</th>
              <th>PROVINSI</th>
              <th>CAKUPAN KAB/KOTA</th>
            </tr>
          </thead>
          <tbody>
            ${plates.map(p => `
              <tr>
                <td><span style="background:#fef3c7;color:#b45309;font-weight:800;padding:3px 8px;border-radius:4px;font-size:12px;">${p.code}</span></td>
                <td><strong style="color: #0f172a;">📍 ${p.reg}</strong></td>
                <td><span style="background:#eff6ff;color:#1d4ed8;padding:2px 6px;border-radius:4px;font-size:10.5px;font-weight:600;">${p.prov}</span></td>
                <td style="color: #64748b; font-size: 11px;">${p.area}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
  return wrapInBrowser('/dashboard/plate-regions', 'plates', content);
}

function getHtmlOverview() {
  const content = `
    <div>
      <div class="header-row">
        <div>
          <h1 class="page-title">Overview</h1>
          <p class="page-subtitle">Welcome back, System Superadmin</p>
        </div>
        <div class="tenant-badge">
          <span class="tb-tag">SUPERADMIN</span>
          <span class="tb-name">Xtur Platform</span>
        </div>
      </div>

      <div class="stat-cards-grid">
        <div class="stat-card">
          <div class="stat-icon-wrap purple">📷</div>
          <div>
            <div class="stat-label">Total Cameras</div>
            <div class="stat-val">4</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon-wrap green">🛡</div>
          <div>
            <div class="stat-label">Online Streams</div>
            <div class="stat-val">4</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon-wrap yellow">⚠</div>
          <div>
            <div class="stat-label">Offline Cameras</div>
            <div class="stat-val">0</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon-wrap blue">📈</div>
          <div>
            <div class="stat-label">System Status</div>
            <div class="stat-val" style="color: #10b981; font-size: 17px;">Healthy</div>
          </div>
        </div>
      </div>

      <div class="main-panel-card">
        <div class="panel-header">
          <div class="panel-left-header">
            <div class="panel-icon-wrap">📊</div>
            <div>
              <div class="panel-heading">Riwayat Hasil Tangkapan Objek</div>
              <div class="panel-desc">Histori komparasi deteksi kendaraan & pejalan kaki dari hari ke hari</div>
            </div>
          </div>
          <div class="panel-controls">
            <button class="btn-pill">📈</button>
            <button class="btn-pill">📊</button>
            <button class="btn-pill">1 Hari</button>
            <button class="btn-pill active">7 Hari</button>
            <button class="btn-pill">1 Bulan</button>
            <button class="btn-pill">6 Bulan</button>
            <button class="btn-pill">Custom</button>
            <button class="btn-pill">🔄</button>
          </div>
        </div>

        <div class="kpi-row" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; padding-bottom: 14px; border-bottom: 1px solid #f1f5f9; margin-bottom: 14px;">
          <div class="kpi-box" style="font-size: 11px; color: #64748b;">
            <div>Total Tangkapan</div>
            <div style="font-size: 18px; font-weight: 800; color: #0f172a; margin-top: 2px;">1,734</div>
            <div style="font-size: 9.5px; color: #94a3b8;">Objek terekam</div>
          </div>
          <div class="kpi-box" style="font-size: 11px; color: #64748b;">
            <div>Puncak Tertinggi</div>
            <div style="font-size: 18px; font-weight: 800; color: #4f46e5; margin-top: 2px;">868</div>
            <div style="font-size: 9.5px; color: #94a3b8;">Pada 8 Sep</div>
          </div>
          <div class="kpi-box" style="font-size: 11px; color: #64748b;">
            <div>Rata-rata</div>
            <div style="font-size: 18px; font-weight: 800; color: #10b981; margin-top: 2px;">433.5</div>
            <div style="font-size: 9.5px; color: #94a3b8;">per interval waktu</div>
          </div>
          <div class="kpi-box" style="font-size: 11px; color: #64748b;">
            <div>Objek Terbanyak</div>
            <div style="font-size: 18px; font-weight: 800; color: #f59e0b; margin-top: 2px;">Person</div>
            <div style="font-size: 9.5px; color: #94a3b8;">1134 unit</div>
          </div>
        </div>

        <div style="height: 180px; display: flex; flex-direction: column; justify-content: space-between; position: relative; padding-top: 10px;">
          <div style="position: absolute; inset: 0; display: flex; flex-direction: column; justify-content: space-between; pointer-events: none;">
            <div style="display: flex; align-items: center; font-size: 10px; color: #94a3b8;"><span style="width: 35px;">999</span><div style="flex: 1; border-bottom: 1px dashed #e2e8f0; margin-left: 6px;"></div></div>
            <div style="display: flex; align-items: center; font-size: 10px; color: #94a3b8;"><span style="width: 35px;">749</span><div style="flex: 1; border-bottom: 1px dashed #e2e8f0; margin-left: 6px;"></div></div>
            <div style="display: flex; align-items: center; font-size: 10px; color: #94a3b8;"><span style="width: 35px;">500</span><div style="flex: 1; border-bottom: 1px dashed #e2e8f0; margin-left: 6px;"></div></div>
            <div style="display: flex; align-items: center; font-size: 10px; color: #94a3b8;"><span style="width: 35px;">250</span><div style="flex: 1; border-bottom: 1px dashed #e2e8f0; margin-left: 6px;"></div></div>
            <div style="display: flex; align-items: center; font-size: 10px; color: #94a3b8;"><span style="width: 35px;">0</span><div style="flex: 1; border-bottom: 1px dashed #e2e8f0; margin-left: 6px;"></div></div>
          </div>

          <div style="display: flex; justify-content: space-around; align-items: flex-end; height: 150px; z-index: 2; padding-left: 45px;">
            <div style="display: flex; flex-direction: column; align-items: center; gap: 6px; width: 60px;">
              <div style="width: 36px; height: 6px; border-radius: 6px 6px 0 0; background: #6366f1;"></div>
              <div style="font-size: 11px; color: #64748b; font-weight: 600;">6 Sep</div>
            </div>
            <div style="display: flex; flex-direction: column; align-items: center; gap: 6px; width: 60px;">
              <div style="width: 36px; height: 38px; border-radius: 6px 6px 0 0; background: #6366f1;"></div>
              <div style="font-size: 11px; color: #64748b; font-weight: 600;">7 Sep</div>
            </div>
            <div style="display: flex; flex-direction: column; align-items: center; gap: 6px; width: 60px;">
              <div style="width: 36px; height: 130px; border-radius: 6px 6px 0 0; background: linear-gradient(180deg, #818cf8 0%, #6366f1 100%);"></div>
              <div style="font-size: 11px; color: #4f46e5; font-weight: 700;">8 Sep</div>
            </div>
            <div style="display: flex; flex-direction: column; align-items: center; gap: 6px; width: 60px;">
              <div style="width: 36px; height: 92px; border-radius: 6px 6px 0 0; background: #6366f1;"></div>
              <div style="font-size: 11px; color: #64748b; font-weight: 600;">9 Sep</div>
            </div>
          </div>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 14px; padding-top: 10px; border-top: 1px solid #f8fafc;">
          <div style="display: flex; gap: 8px;">
            <div style="font-size: 10px; font-weight: 600; padding: 3px 8px; border-radius: 20px; background: #eff6ff; color: #1d4ed8; display: flex; align-items: center; gap: 6px;"><div style="width: 6px; height: 6px; border-radius: 50%; background: #3b82f6;"></div> Car (349)</div>
            <div style="font-size: 10px; font-weight: 600; padding: 3px 8px; border-radius: 20px; background: #fdf2f8; color: #be185d; display: flex; align-items: center; gap: 6px;"><div style="width: 6px; height: 6px; border-radius: 50%; background: #ec4899;"></div> Person (1134)</div>
            <div style="font-size: 10px; font-weight: 600; padding: 3px 8px; border-radius: 20px; background: #eef2ff; color: #4338ca; display: flex; align-items: center; gap: 6px;"><div style="width: 6px; height: 6px; border-radius: 50%; background: #6366f1;"></div> Motorcycle (244)</div>
            <div style="font-size: 10px; font-weight: 600; padding: 3px 8px; border-radius: 20px; background: #f0fdf4; color: #15803d; display: flex; align-items: center; gap: 6px;"><div style="width: 6px; height: 6px; border-radius: 50%; background: #22c55e;"></div> Truck (6)</div>
            <div style="font-size: 10px; font-weight: 600; padding: 3px 8px; border-radius: 20px; background: #fffbeb; color: #b45309; display: flex; align-items: center; gap: 6px;"><div style="width: 6px; height: 6px; border-radius: 50%; background: #f59e0b;"></div> Bus (1)</div>
          </div>
          <div style="font-size: 10px; color: #94a3b8;">✨ Data agregat diperbarui otomatis</div>
        </div>
      </div>
    </div>
  `;
  return wrapInBrowser('/dashboard', 'overview', content);
}

// Execute capture for all 9 screens
function captureAllScreens() {
  console.log('Starting Ultra-HD 2560x1440 generation for all 9 dashboard screens...');
  
  const screens = [
    { file: '01-dashboard-overview.png', html: getHtmlOverview() },
    { file: '02-detection-logs.png', html: getHtmlLogs() },
    { file: '03-cameras-monitor.png', html: getHtmlCameras() },
    { file: '04-reports-analytics-top.png', html: getHtmlReportsTop() },
    { file: '05-reports-analytics-bottom.png', html: getHtmlReportsBottom() },
    { file: '06-engine-health.png', html: getHtmlEngineHealth() },
    { file: '07-detection-settings-1.png', html: getHtmlSettings1() },
    { file: '08-detection-settings-2.png', html: getHtmlSettings2() },
    { file: '09-plate-regions-db.png', html: getHtmlPlates() }
  ];

  screens.forEach((s, idx) => {
    const tmpHtml = path.join(baseDir, `temp_render_${idx}.html`);
    const targetImg = path.join(imgDir, s.file);
    fs.writeFileSync(tmpHtml, s.html, 'utf-8');

    const fileUrl = 'file:///' + tmpHtml.replace(/\\/g, '/');
    const cmd = `"${chromePath}" --headless --disable-gpu --window-size=1600,900 --force-device-scale-factor=1.6 --screenshot="${targetImg}" "${fileUrl}"`;
    
    console.log(`[${idx+1}/9] Rendering HD ${s.file}...`);
    try {
      execSync(cmd);
      if (fs.existsSync(targetImg)) {
        const stats = fs.statSync(targetImg);
        const buf = fs.readFileSync(targetImg);
        const w = buf.readUInt32BE(16);
        const h = buf.readUInt32BE(20);
        console.log(`✓ ${s.file} -> ${w}x${h} (${Math.round(stats.size/1024)} KB)`);
      }
    } catch (e) {
      console.error(`Error rendering ${s.file}:`, e.message);
    }

    if (fs.existsSync(tmpHtml)) {
      fs.unlinkSync(tmpHtml);
    }
  });

  console.log('All 9 screens successfully regenerated in Ultra-HD!');
}

module.exports = { getBaseStyles, renderSidebar, wrapInBrowser };

if (require.main === module) {
  captureAllScreens();
}
