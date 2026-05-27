# 🚀 Handoff Document — Two Build Finance V4 → v6 Session

**Date:** 27 พ.ค. 2569 (01:30)
**Status:** ✨ **11/11 Live** · ทุก module wire เข้า Sheet จริง · Drive folder ครบ

---

## 🌐 ลิงค์ใช้งานจริง

| | URL |
|---|---|
| 🌐 **Web App** | https://two-build-finance.pages.dev |
| 📊 **Google Sheet** | https://docs.google.com/spreadsheets/d/1xwjuIUdmTuvKVXjvJsI_uNPzgO7YL9gWsQ2o5m95-nA/edit |
| 📁 **Drive Root** | https://drive.google.com/drive/folders/1DDTlhreKaxZfCUqSzQ3Fa3e9XW1sarX7 |
| 🔌 **API URL** | https://script.google.com/macros/s/AKfycbyZEYnPf3aAWIr7FGGN5Ko8ngvQtsDZr7UBXBoXeMXeRAjQDU_bI5t7LpDUEpzfeqh0/exec |
| 📦 **GitHub Frontend** | https://github.com/icebergiced-cmyk/two-build-finance-v4 |
| 📦 **GitHub Backend** | https://github.com/icebergiced-cmyk/finance-api |
| ⚙️ **Apps Script** | https://script.google.com/d/1nIaviXMKINMARpZBd8yPIjaMh1IH49rUuq3TgNtzy-ekozGGLcfAl6wn/edit |

## 🔑 IDs

- **Sheet ID:** `1xwjuIUdmTuvKVXjvJsI_uNPzgO7YL9gWsQ2o5m95-nA`
- **Script ID:** `1nIaviXMKINMARpZBd8yPIjaMh1IH49rUuq3TgNtzy-ekozGGLcfAl6wn`
- **Deployment ID:** `AKfycbyZEYnPf3aAWIr7FGGN5Ko8ngvQtsDZr7UBXBoXeMXeRAjQDU_bI5t7LpDUEpzfeqh0`
- **Drive Root ID:** `1DDTlhreKaxZfCUqSzQ3Fa3e9XW1sarX7`

---

## 🏢 ข้อมูลบริษัท

- **ชื่อ:** บจก. ทู บิลด์ ดีเวลลอปเมนท์ จำกัด
- **ที่อยู่:** 1/88 หมู่ที่ 1 ต.หนองแหน อ.พนมสารคาม จ.ฉะเชิงเทรา 24120
- **เลขประจำตัวผู้เสียภาษี:** `0245566004014`
- **โทร:** 092-787-4222
- **ผู้มีอำนาจลงนาม:** นายเฉลิมไชย ดีแสน
- **โฟร์แมน:** นายโกวิท ราษีทอง

---

## 📊 สถานะ 11 Modules — ทั้งหมด Live

| # | Module | Sheet Tab | Status |
|---|---|---|---|
| Hub | KPI dashboard | getDashboard endpoint | ✅ |
| 01 Slip Scanner | Slip-Log | 4 ธนาคาร + memo classifier · save ลง Sheet จริง | ✅ |
| 02 Cash Book | Cash-Book (388 รายการเดิม) | filter/search · saveTx · CSV export | ✅ |
| 03 Vendor Invoice | Vendor-Invoice + PO-Tracker | 11 vendors · 3-way match · API.update | ✅ |
| 04 RE Accounting | Journal-2569 + COA (43 บัญชี) | rebuildGL+TB จาก journal entries · Dr/Cr 2-row format | ✅ |
| 05 Sales+Tax | Sales-Pipeline + Tax-Tracker | loadSales · recordTransfer → tax entries | ✅ |
| 06 Reports | อ่านทุก tab | getDashboard live · refresh button | ✅ |
| 07 Feasibility | Feasibility-Save | IRR/NPV/Payback · save+load scenarios | ✅ |
| 08 Payroll | Payroll-2569 | 24 คน · SSO 5% · ภงด.1 · batch approve | ✅ |
| 09 Contractor | Contractor-Master | 8 ทีมจริง เม.ย.69 · เจ้ทุเรียน 6 งวด/300K · workflow 5 ขั้น | ✅ |
| 10 Vendor Billing | Vendor-Billing-Packets (15 packets) | 3-Way Match · AP Aging · Cheque Schedule | ✅ |
| 11 WHT Center | WHT-Records + WHT-Certificates | ใบ 50ทวิ · ภงด.1/3/53 | ✅ |

---

## 🆕 ที่ทำใหม่ใน v5 → v6

### O1: Drive folder structure 11 modules ✅
```
Two Build Finance V4/
├── 01-Slip-Scanner/
├── 02-Cash-Book/
├── 03-Vendor-Invoice/
├── 04-RE-Accounting/
├── 05-Sales-Tax/
├── 06-Financial-Reports/
├── 07-Feasibility/
├── 08-Payroll/
├── 09-Contractor-Payment/
├── 10-Vendor-Billing/
├── 11-WHT-Center/
└── WHT Certificates/  (เดิม)
```

### O2: Standard module shell ✅
`js/module-shell.js` — ปุ่ม ⓘ มุมล่างขวา · Info Panel แสดง:
- Module name + Live/Demo badge
- Sheet tab + Drive folder link
- API ping status
- เปิด Hub/Sheet/Drive shortcut

### O3-O7 + P2.5: Wire ทุก module เข้า Sheet
ทุก module load + save schema ตรงกับ headers จริง (fix mismatch)

### Backend endpoints ใหม่
```
?action=setupAllFolders          — สร้าง Drive folder 11 modules
?action=listModuleFolder&module=XX — list files ใน module folder
?action=uploadModuleFile         — upload binary file
?action=getContractorTeams       — 8 ทีมจริง + เจ้ทุเรียน 6 งวด
?action=classifyMemo&memo=...    — memo → category (5 ธนาคาร)

# Setup (เคยรันแล้ว — ครั้งเดียวจบ)
ONE_CLICK_SETUP()                — touch ทุก scope + สร้าง folder
```

---

## 🗂️ Sheet Tabs (19 tabs · ทั้งหมด accessible)

| Tab | Rows | Headers |
|---|---|---|
| README | 32 | — |
| Cash-Book | 388 | date, voucher_no, description, category, project, debit, credit, balance, ref_doc |
| Slip-Log | 2 | date, amount, direction, counterparty, bank, ref_no, memo, category, project, plot, po_ref, drive_file_url, status |
| Vendor-Invoice | 2 | invoice_no, invoice_date, vendor_id, vendor_name, amount_before_vat, vat_7, total, credit_term_days, due_date, po_ref, project, status |
| PO-Tracker | 2 | po_no, po_date, vendor_id, vendor_name, project, plot, total_amount, received_amount, paid_amount, status |
| Vendor-Billing-Packets | 15 | packet_id, billing_date, vendor_id, ... |
| Cheque-Schedule | 12 | — |
| Discrepancy-Log | 2 | — |
| Journal-2569 | 3 | entry_no, date, account_code, account_name, debit, credit, description, project, ref_doc, created_by |
| COA | 43 | account_code, account_name, type, parent_code, normal_balance |
| Sales-Pipeline | 2 | plot_no, project, customer_name, phone, ..., transfer_date, sale_price, sbt_3_3, transfer_fee_2, mortgage_fee_1, wht_1, net_revenue, status |
| Tax-Tracker | 4 | form_type, period, due_date, amount_due, status, filed_date, paid_date, ref_no, notes |
| Feasibility-Save | 2 | analysis_id, saved_date, project_name, total_units, total_investment, expected_revenue, irr, npv, payback_years, scenario, notes |
| Payroll-2569 | 3 | month, employee_id, name, position, type, base_salary, ot_hours, ot_amount, gross, sso_5, wht, net, bank_account, slip_pdf_url |
| Contractor-Master | 3 | contractor_id, name, specialty, phone, line_id, tax_id, bank_account, status, total_jobs, total_paid_ytd, notes |
| WHT-Records | 6 | wht_id, date, recipient_type, ... |
| WHT-Certificates | 3 | cert_no, issue_date, ... |
| Payment-Vouchers | 14 | voucher_no, date, paid_to, ... |
| Expense-Summary | 68 | — |

---

## 🛠️ Workflow Dev

```bash
# Frontend
cd ~/Desktop/two-build-finance-v4
git add . && git commit -m "..." && git push
# → Cloudflare auto-deploy in ~30s

# Backend
cd ~/Desktop/finance-api
clasp push --force
clasp deploy --deploymentId AKfycbyZEYnPf3aAWIr7FGGN5Ko8ngvQtsDZr7UBXBoXeMXeRAjQDU_bI5t7LpDUEpzfeqh0 --description "..."
git add . && git commit -m "..." && git push
```

---

## 🎯 Plan ที่เหลือ (v7 candidates)

### Quick wins
1. **Index.html dynamic data** — KPI strip ดึงข้อมูลจาก getDashboard live (มี implementation อยู่แล้ว แต่ HUD ยังโชว์ hardcoded)
2. **Sheet data backfill** — Slip-Log, Vendor-Invoice, Sales-Pipeline, Tax-Tracker, Feasibility-Save, Payroll-2569 มีตัวอย่าง 2-3 แถว ต้องเติมข้อมูลจริงเดือน พ.ค.
3. **LINE Notify integration** — Module 09 ส่ง LINE หาผู้รับเหมาเมื่อ approve งวด
4. **Auto-journal entries** — Cash-Book บันทึก → auto-post เข้า Journal-2569

### Longer term
- Customer transfer schedule (เชื่อมโยง Module 05 ↔ Construction Tracker)
- Auto AP/AR aging report
- Mobile-friendly UI (responsive ปัจจุบันยังไม่เต็มที่)
- Export ภงด.50 / ภงด.51 PDF format

---

## 📝 Prompt เริ่ม v7

> "อ่าน HANDOFF-V6.md ที่ ~/Desktop/two-build-finance-v4/ แล้วทำต่อ Quick Wins · ไม่ต้องถาม authorize Drive อีก (ทำแล้ว)"
