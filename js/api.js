// === Global: prevent browser from opening file when dropped on page ===
// (loaded by every module — protects pages without explicit drop handler)
['dragenter','dragover','dragleave','drop'].forEach(ev => {
  window.addEventListener(ev, function(e) {
    // Only prevent if dragging files (not text/links)
    if (e.dataTransfer && e.dataTransfer.types && e.dataTransfer.types.indexOf && e.dataTransfer.types.indexOf('Files') > -1) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, false);
});

// === Two Build Finance V4 — API client ===
// Wraps fetch() calls to Apps Script API (FINANCE_API_URL from config.js)

const API = {
  // Generic: read all rows from a tab
  async read(tab) {
    const url = `${FINANCE_API_URL}?action=read&tab=${encodeURIComponent(tab)}`;
    const r = await fetch(url);
    return await r.json();
  },

  // Generic: append a row
  async append(tab, data) {
    const url = `${FINANCE_API_URL}?action=append&tab=${encodeURIComponent(tab)}&data=${encodeURIComponent(JSON.stringify(data))}`;
    const r = await fetch(url);
    return await r.json();
  },

  // Generic: update row by match (e.g. "packet_id:VB-25690505-001")
  async update(tab, matchCol, matchVal, data) {
    const match = `${matchCol}:${matchVal}`;
    const url = `${FINANCE_API_URL}?action=update&tab=${encodeURIComponent(tab)}&match=${encodeURIComponent(match)}&data=${encodeURIComponent(JSON.stringify(data))}`;
    const r = await fetch(url);
    return await r.json();
  },

  // Compound endpoints
  async ping() {
    const r = await fetch(`${FINANCE_API_URL}?action=ping`);
    return await r.json();
  },

  async getMeta() {
    const r = await fetch(`${FINANCE_API_URL}?action=getMeta`);
    return await r.json();
  },

  async getDashboard() {
    const r = await fetch(`${FINANCE_API_URL}?action=getDashboard`);
    return await r.json();
  },

  async getAPAging() {
    const r = await fetch(`${FINANCE_API_URL}?action=getAPAging`);
    return await r.json();
  },

  async getCashFlow() {
    const r = await fetch(`${FINANCE_API_URL}?action=getCashFlow`);
    return await r.json();
  },

  async getVendors() {
    const r = await fetch(`${FINANCE_API_URL}?action=getVendors`);
    return await r.json();
  }
};

// === Common formatters (used across modules) ===
const fmt = {
  money: (n) => '฿' + (Number(n) || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
  num: (n) => (Number(n) || 0).toLocaleString('en-US'),

  // Buddhist year date (yyyy-mm-dd → DD MMM YY)
  thaiDate(iso) {
    if (!iso) return '-';
    const s = String(iso);
    const [y, m, d] = s.split('-');
    if (!d) return s;
    const months = ['ม.ค.','ก.พ.','มี.ค.','เม.ย.','พ.ค.','มิ.ย.','ก.ค.','ส.ค.','ก.ย.','ต.ค.','พ.ย.','ธ.ค.'];
    return parseInt(d) + ' ' + months[parseInt(m)-1] + ' ' + y.slice(-2);
  },

  // Days between Buddhist year dates
  daysBetween(iso1, iso2) {
    const toAD = (s) => { const [y, m, d] = String(s).split('-').map(Number); return new Date(y - 543, m - 1, d); };
    return Math.round((toAD(iso2) - toAD(iso1)) / (1000 * 60 * 60 * 24));
  },

  statusBadge(status) {
    const map = {
      'approved': { txt: '✓ ผ่าน', cls: 'bg-emerald-100 text-emerald-800' },
      'review':   { txt: '⚠ Review', cls: 'bg-amber-100 text-amber-800' },
      'pending':  { txt: '◷ รออนุมัติ', cls: 'bg-stone-100 text-stone-700' },
      'paid':     { txt: '💰 จ่ายแล้ว', cls: 'bg-blue-100 text-blue-800' },
      'drawn':    { txt: '✏ เขียนเช็คแล้ว', cls: 'bg-purple-100 text-purple-800' },
      'cleared':  { txt: '✓ เคลียร์', cls: 'bg-emerald-100 text-emerald-800' },
      'received': { txt: '📦 รับของ', cls: 'bg-blue-100 text-blue-800' },
      'open':     { txt: '◷ Open', cls: 'bg-stone-100 text-stone-700' },
      'closed':   { txt: '✓ Closed', cls: 'bg-emerald-100 text-emerald-800' }
    };
    const m = map[status] || { txt: status || '-', cls: 'bg-stone-100 text-stone-700' };
    return '<span class="px-2 py-0.5 rounded-full text-[10px] font-semibold ' + m.cls + '">' + m.txt + '</span>';
  }
};
