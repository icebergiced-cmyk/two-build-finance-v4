// === Two Build Finance V4 — Config ===
// Apps Script API endpoint (read/write Finance-Master-2569 Sheet)
const FINANCE_API_URL = 'https://script.google.com/macros/s/AKfycbyZEYnPf3aAWIr7FGGN5Ko8ngvQtsDZr7UBXBoXeMXeRAjQDU_bI5t7LpDUEpzfeqh0/exec';

// Google Sheet (Finance-Master-2569)
const FINANCE_SHEET_ID = '1xwjuIUdmTuvKVXjvJsI_uNPzgO7YL9gWsQ2o5m95-nA';
const FINANCE_SHEET_URL = `https://docs.google.com/spreadsheets/d/${FINANCE_SHEET_ID}/edit`;

// Allowed tabs (must match Apps Script API)
const FINANCE_TABS = [
  'Slip-Log', 'Cash-Book', 'Vendor-Invoice', 'PO-Tracker',
  'Vendor-Billing-Packets', 'Cheque-Schedule', 'Discrepancy-Log',
  'Journal-2569', 'COA', 'Sales-Pipeline', 'Tax-Tracker',
  'Feasibility-Save', 'Payroll-2569', 'Contractor-Master', 'Expense-Summary',
  'WHT-Records', 'WHT-Certificates', 'Payment-Vouchers'
];

// 11 modules with metadata for module-shell.js
const FINANCE_MODULES = {
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
