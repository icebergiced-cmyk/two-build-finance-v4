// === Two Build Finance V4 — Module Shell ===
// Shared component: Info Panel + Tooltip + Drive view button
// Use:
//   <script src="js/module-shell.js"></script>
//   <script>ModuleShell.init({ module:'01', name:'Slip Scanner', sheetTab:'Slip-Log', live:false });</script>
// Or simply add data attribute to <body data-module-shell='{"module":"01",...}'>

const ModuleShell = (() => {

  const MODULE_NAMES = {
    '01': { name: 'Slip Inbox Scanner',  sheet: 'Slip-Log',               icon: '🧾' },
    '02': { name: 'Cash Book',           sheet: 'Cash-Book',              icon: '📒' },
    '03': { name: 'Vendor Invoice',      sheet: 'Vendor-Invoice',         icon: '📄' },
    '04': { name: 'RE Accounting',       sheet: 'Journal-2569 + COA',     icon: '📚' },
    '05': { name: 'Sales + Tax',         sheet: 'Sales-Pipeline + Tax-Tracker', icon: '🏛️' },
    '06': { name: 'Financial Reports',   sheet: 'อ่านทุก tab',            icon: '📈' },
    '07': { name: 'Feasibility',         sheet: 'Feasibility-Save',       icon: '🎯' },
    '08': { name: 'Payroll',             sheet: 'Payroll-2569',           icon: '💼' },
    '09': { name: 'Contractor Payment',  sheet: 'Contractor-Master',      icon: '🔨' },
    '10': { name: 'Vendor Billing',      sheet: 'Vendor-Billing-Packets', icon: '📦' },
    '11': { name: 'WHT Center',          sheet: 'WHT-Records',            icon: '🧾' }
  };

  let state = null;

  function styleOnce() {
    if (document.getElementById('ms-style')) return;
    const css = `
      .ms-tip{position:relative;cursor:help;display:inline-flex;align-items:center;justify-content:center;width:16px;height:16px;border-radius:50%;background:#e7e5e4;color:#57534e;font-size:10px;font-weight:bold;margin-left:4px}
      .ms-tip:hover{background:#fbbf24;color:#fff}
      .ms-tip:hover::after{content:attr(data-tip);position:absolute;left:50%;transform:translateX(-50%);bottom:130%;background:#1c1917;color:#fff;font-weight:400;font-size:11px;padding:6px 10px;border-radius:6px;white-space:pre-line;min-width:160px;max-width:260px;line-height:1.4;z-index:9999;box-shadow:0 8px 24px rgba(0,0,0,.18)}
      .ms-fab{position:fixed;right:18px;bottom:18px;width:48px;height:48px;border-radius:50%;background:linear-gradient(135deg,#1c1917,#44403c);color:#fcd34d;font-size:22px;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 10px 25px rgba(0,0,0,.25);z-index:9000;border:2px solid #fcd34d;transition:transform .2s}
      .ms-fab:hover{transform:scale(1.08)}
      .ms-panel{position:fixed;right:18px;bottom:78px;width:320px;background:#fff;border-radius:14px;box-shadow:0 20px 50px rgba(0,0,0,.25);z-index:9001;border:1px solid #e7e5e4;overflow:hidden;display:none}
      .ms-panel.open{display:block;animation:msIn .2s ease-out}
      @keyframes msIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
      .ms-panel-head{background:linear-gradient(135deg,#0f172a,#1c1917);color:#fff;padding:12px 14px}
      .ms-panel-body{padding:12px 14px;font-size:12px;color:#44403c}
      .ms-panel-body .ms-row{display:flex;justify-content:space-between;align-items:center;padding:5px 0;border-bottom:1px solid #f5f5f4}
      .ms-panel-body .ms-row:last-child{border:0}
      .ms-panel-body .ms-key{color:#78716c;font-size:11px}
      .ms-panel-body .ms-val{font-weight:600;color:#1c1917}
      .ms-badge{font-size:10px;padding:2px 7px;border-radius:10px;font-weight:600}
      .ms-badge-live{background:#d1fae5;color:#065f46}
      .ms-badge-demo{background:#fef3c7;color:#92400e}
      .ms-actions{padding:10px 14px;background:#fafaf9;display:flex;gap:6px;flex-wrap:wrap}
      .ms-btn{flex:1;font-size:11px;padding:7px 8px;border-radius:6px;text-align:center;font-weight:600;cursor:pointer;text-decoration:none;border:1px solid #d6d3d1;background:#fff;color:#44403c;transition:all .15s;display:block}
      .ms-btn:hover{background:#fcd34d;color:#1c1917;border-color:#fcd34d}
      .ms-btn-primary{background:#1c1917;color:#fcd34d;border-color:#1c1917}
      .ms-btn-primary:hover{background:#0c0a09;color:#fde68a}
    `;
    const el = document.createElement('style');
    el.id = 'ms-style';
    el.textContent = css;
    document.head.appendChild(el);
  }

  function ensureMount() {
    if (document.getElementById('ms-fab')) return;
    const fab = document.createElement('div');
    fab.id = 'ms-fab';
    fab.className = 'ms-fab';
    fab.title = 'Module Info';
    fab.textContent = 'ⓘ';
    fab.onclick = togglePanel;
    document.body.appendChild(fab);

    const panel = document.createElement('div');
    panel.id = 'ms-panel';
    panel.className = 'ms-panel';
    document.body.appendChild(panel);
  }

  function togglePanel() {
    const p = document.getElementById('ms-panel');
    if (p.classList.contains('open')) p.classList.remove('open');
    else { p.classList.add('open'); refreshPanel(); }
  }

  async function refreshPanel() {
    const panel = document.getElementById('ms-panel');
    const meta = MODULE_NAMES[state.module] || { name: state.name || '?', sheet: state.sheetTab || '-', icon: '🧩' };
    const liveCls = state.live ? 'ms-badge-live' : 'ms-badge-demo';
    const liveLabel = state.live ? '🟢 Live' : '🟡 Demo';

    panel.innerHTML = `
      <div class="ms-panel-head">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <div>
            <div style="font-size:10px;color:#fcd34d;letter-spacing:.1em">MODULE ${state.module}</div>
            <div style="font-size:14px;font-weight:700;margin-top:2px">${meta.icon} ${meta.name}</div>
          </div>
          <span class="ms-badge ${liveCls}">${liveLabel}</span>
        </div>
      </div>
      <div class="ms-panel-body">
        <div class="ms-row"><span class="ms-key">📊 Sheet Tab</span><span class="ms-val" style="font-family:monospace;font-size:11px">${meta.sheet}</span></div>
        <div class="ms-row"><span class="ms-key">📁 Drive</span><span class="ms-val" id="ms-drive-status">กำลังโหลด...</span></div>
        <div class="ms-row"><span class="ms-key">🌐 API</span><span class="ms-val" id="ms-api-status">กำลังเช็ค...</span></div>
        <div class="ms-row"><span class="ms-key">🔄 อัปเดต</span><span class="ms-val" id="ms-time">${new Date().toLocaleTimeString('th-TH')}</span></div>
      </div>
      <div class="ms-actions">
        <a class="ms-btn ms-btn-primary" id="ms-drive-link" target="_blank">📁 เปิด Drive</a>
        <a class="ms-btn" href="${FINANCE_SHEET_URL}" target="_blank">📊 เปิด Sheet</a>
        <a class="ms-btn" href="index.html">🏠 Hub</a>
      </div>
    `;

    // Ping API
    try {
      const ping = await API.ping();
      document.getElementById('ms-api-status').innerHTML = ping.ok
        ? '<span style="color:#10b981">● Online v' + ping.version + '</span>'
        : '<span style="color:#ef4444">● Error</span>';
    } catch (e) {
      document.getElementById('ms-api-status').innerHTML = '<span style="color:#ef4444">● Offline</span>';
    }

    // Drive folder
    try {
      const fld = await API.listModuleFolder(state.module);
      if (fld.ok) {
        document.getElementById('ms-drive-status').innerHTML =
          '<span style="color:#10b981">✓ ' + fld.count + ' ไฟล์</span>';
        document.getElementById('ms-drive-link').href = fld.folder_url;
      } else {
        document.getElementById('ms-drive-status').innerHTML =
          '<span style="color:#f59e0b">! ยังไม่ได้สร้าง</span>';
        document.getElementById('ms-drive-link').href = '#';
        document.getElementById('ms-drive-link').onclick = async (e) => {
          e.preventDefault();
          if (!confirm('สร้างโฟลเดอร์ Drive สำหรับ 11 modules ตอนนี้?')) return;
          const r = await API.setupAllFolders();
          if (r.ok) { alert('✓ สร้างโฟลเดอร์ Drive ครบแล้ว'); refreshPanel(); }
          else alert('✗ ' + (r.error || 'ผิดพลาด'));
        };
      }
    } catch (e) {
      document.getElementById('ms-drive-status').innerHTML = '<span style="color:#ef4444">- ไม่ได้</span>';
    }
  }

  function autoBindTooltips() {
    // Auto-convert <span class="tip" data-tip="..."></span> to styled tooltip
    document.querySelectorAll('.tip:not(.ms-tip)').forEach(el => {
      el.classList.add('ms-tip');
      if (!el.textContent.trim()) el.textContent = '?';
    });
  }

  function init(opts) {
    state = Object.assign({ module: '00', name: '', sheetTab: '', live: false }, opts || {});
    styleOnce();
    ensureMount();
    autoBindTooltips();
  }

  // Auto-init if <body data-module-shell='...'> present
  document.addEventListener('DOMContentLoaded', () => {
    const ds = document.body && document.body.dataset && document.body.dataset.moduleShell;
    if (ds) {
      try { init(JSON.parse(ds)); } catch (e) { console.warn('module-shell auto-init failed', e); }
    }
  });

  return { init, refreshPanel, MODULE_NAMES };
})();
