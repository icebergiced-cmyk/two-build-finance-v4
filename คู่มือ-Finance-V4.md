# 📘 คู่มือระบบ Two Build Finance V4

**เจ้าของ:** คุณไอซ์ · บจก. ทู บิลด์ ดีเวลลอปเมนท์
**อัปเดตล่าสุด:** 26 พ.ค. 2569
**Version:** 1.0 · Phase 1 เสร็จสมบูรณ์

---

## 🌐 ลิงค์สำคัญ — Bookmark ไว้เลย

| ระบบ | URL | ใช้ทำอะไร |
|---|---|---|
| 🌐 **เว็บใช้งานจริง** | https://two-build-finance.pages.dev | เปิดทุกวัน · ใช้ทุก module |
| 📊 **Google Sheet** | https://docs.google.com/spreadsheets/d/1xwjuIUdmTuvKVXjvJsI_uNPzgO7YL9gWsQ2o5m95-nA/edit | ฐานข้อมูลกลาง · 16 tabs |
| 📦 **GitHub repo** | https://github.com/icebergiced-cmyk/two-build-finance-v4 | code source · version history |
| ⚙️ **Apps Script editor** | https://script.google.com/d/1nIaviXMKINMARpZBd8yPIjaMh1IH49rUuq3TgNtzy-ekozGGLcfAl6wn/edit | backend API code (Claude แก้) |
| ⚙️ **Apps Script API URL** | `script.google.com/macros/s/AKfycbwFGUrdoER2KacLGyiDAV7ul4ajla7k0yfGm5FzWkiD7tPtvnPg1-SoK8vc9V2NRU37/exec` | endpoint ที่ frontend เรียก (ไม่ต้องเปิดตรง) |

---

## 🏗️ Architecture ภาพรวม (เหมือน One Vela Sales)

```
┌──────────────────────────────────────────────────────────┐
│  ผู้ใช้ (ไอซ์ + ทีม) เปิดในเบราว์เซอร์                  │
│  https://two-build-finance.pages.dev                      │
└──────────────────────────┬───────────────────────────────┘
                           │
                           ↓ HTTP GET (HTML/JS/CSS)
┌──────────────────────────────────────────────────────────┐
│  🌐 Cloudflare Pages (CDN ทั่วโลก)                       │
│     เสิร์ฟไฟล์ static · เร็วมาก · ฟรี                   │
│     auto-deploy เมื่อ Claude push GitHub                 │
└──────────────────────────┬───────────────────────────────┘
                           │
                           │  JavaScript บนหน้าเว็บเรียก:
                           │  fetch(API_URL + '?action=read&tab=Slip-Log')
                           ↓
┌──────────────────────────────────────────────────────────┐
│  🔌 Apps Script API (Google Cloud)                       │
│     doGet(e) → switch (action) → ทำงานแต่ละแบบ          │
│     actions: ping, read, append, update,                 │
│              getDashboard, getAPAging, getCashFlow,      │
│              getVendors, getMeta                          │
└──────────────────────────┬───────────────────────────────┘
                           │
                           │  SpreadsheetApp.openById(SHEET_ID)
                           ↓
┌──────────────────────────────────────────────────────────┐
│  📊 Google Sheet (Finance-Master-2569)                   │
│     16 tabs · ฐานข้อมูลทุกระบบ                          │
│     - Slip-Log · Cash-Book · Vendor-Invoice ฯลฯ        │
└──────────────────────────────────────────────────────────┘
```

**ข้อดี:**
- 🚀 เร็ว — Cloudflare CDN ใกล้ผู้ใช้
- 💸 ฟรี ทุกชั้น (CF Pages · Apps Script · Google Sheet)
- 🔐 ปลอดภัย — ข้อมูลอยู่ใน Google
- 🔄 Auto-deploy — แก้ code → push → ออนไลน์เอง
- 📜 Version control — git history ครบ

---

## 🗂️ ผังเว็บ (Sitemap)

```
two-build-finance.pages.dev
│
├── / (index.html)                    🏠 Hub
│   ├── KPI dashboard (สด)
│   ├── Module cards × 10
│   ├── Recent activity
│   └── Quick actions
│
├── /01-slip-scanner.html             🧾 Slip Inbox Scanner
├── /02-cash-book.html                📒 Cash Book
├── /03-vendor-invoice.html           📄 Vendor Invoice
├── /04-accounting.html               📚 RE Accounting
├── /05-sales-tax.html                🏛️ Sales + Tax
├── /06-financial-reports.html        📈 Financial Reports
├── /07-feasibility.html              🎯 Feasibility Study
├── /08-payroll.html                  💼 Payroll
├── /09-contractor-payment.html       🔨 Contractor Payment
└── /10-vendor-billing.html           📦 Vendor Billing (ใหม่)
                                        ├── view: packets
                                        ├── view: cheque schedule
                                        ├── view: discrepancy review
                                        └── view: AP aging
```

---

## 📊 ผังข้อมูล (Data Flow) — Sheet ↔ Module

```
Google Sheet "Finance-Master-2569" (16 tabs)
│
├── 📄 Slip-Log              ←─→  Module 01 (Slip Scanner)
├── 📒 Cash-Book             ←─→  Module 02 (Cash Book)
├── 📄 Vendor-Invoice        ←─→  Module 03 (Vendor Invoice)
├── 📋 PO-Tracker            ←─→  Module 03 + 09
├── 📦 Vendor-Billing-Packets←─→  Module 10 (Vendor Billing)
├── ✏️ Cheque-Schedule       ←─→  Module 10
├── ⚠️ Discrepancy-Log       ←─→  Module 10
├── 📚 Journal-2569          ←─→  Module 04 (Accounting)
├── 🏷️ COA (Chart of Accounts)←─→ Module 04
├── 🏠 Sales-Pipeline        ←─→  Module 05 (Sales + Tax)
├── 🏛️ Tax-Tracker           ←─→  Module 05
├── 🎯 Feasibility-Save      ←─→  Module 07 (Feasibility)
├── 💼 Payroll-2569          ←─→  Module 08 (Payroll)
├── 🔨 Contractor-Master     ←─→  Module 09 (Contractor)
├── 📊 Expense-Summary       ←─→  Module 06 (Financial Reports)
└── 📖 README                (เอกสารใน Sheet)

Module 06 (Reports) อ่านทุก tab → สร้างรายงานรวม
```

---

# 🧩 รายละเอียด 10 Modules

## สถานะปัจจุบัน (26 พ.ค. 2569)

| # | Module | UI พร้อม? | ผูก Sheet? | Notes |
|---|---|---|---|---|
| Hub | index.html | ✅ | ✅ Live | KPI สด · 5 ตัวอ่านจาก API |
| 01 | Slip Scanner | ✅ static | ❌ | sample data hardcoded |
| 02 | Cash Book | ✅ static | ❌ | รอ Phase 2 |
| 03 | Vendor Invoice | ✅ static | ❌ | รอ Phase 2 |
| 04 | RE Accounting | ✅ static | ❌ | รอ Phase 2 |
| 05 | Sales + Tax | ✅ static | ❌ | รอ Phase 2 |
| 06 | Financial Reports | ✅ static | ❌ | รอ Phase 2 |
| 07 | Feasibility | ✅ static | ❌ | รอ Phase 2 |
| 08 | Payroll | ✅ static | ❌ | รอ Phase 2 |
| 09 | Contractor Payment | ✅ static | ❌ | รอ Phase 2 |
| **10** | **Vendor Billing** | ✅ | ✅ **Live** | **ผูก Sheet จริง · ใช้ได้ทันที** |
| **11** | **WHT Center** | ✅ | ✅ **Live** | **หัก ณ ที่จ่าย + ใบ 50ทวิ ตามแบบสรรพากร** |

---

## 🏠 Hub (index.html)

**เปิดที่:** https://two-build-finance.pages.dev/

**ทำอะไรได้:**
- แสดง KPI 5 ตัว ดึงจาก Sheet จริง:
  - 💰 เงินสดในมือ (จาก Cash-Book balance ล่าสุด)
  - 📥 ขาย YTD (จาก Sales-Pipeline)
  - 📤 รายจ่าย YTD (จาก Cash-Book debit รวม)
  - ⏳ AP รอจ่าย (จาก Vendor-Billing-Packets status ≠ paid)
  - 📑 ภาษี pending (จาก Tax-Tracker status = pending)
- คลิก card → เข้า module นั้นๆ
- ดูสถานะระบบ (API online/offline)

**ไฟล์ต้นทาง:** `~/Desktop/two-build-finance-v4/index.html`

**Sheet ที่อ่าน:** หลาย tabs ผ่าน `getDashboard()`

---

## 01. 🧾 Slip Inbox Scanner

**เปิดที่:** https://two-build-finance.pages.dev/01-slip-scanner.html

**ใช้ทำอะไร:** อ่านสลิปธนาคาร (SCB · K+ · BBL · KTB · ธ.ก.ส.) → OCR → match กับ PO → บันทึก

**Workflow:**
```
1. ลากสลิป (รูป/PDF) เข้าหน้าเว็บ
2. ระบบ OCR อ่าน: วันที่, ยอด, ผู้รับ, ref no, memo
3. เลือก: project (OV/WW/OX3/OX4), plot, category
4. ระบบ match กับ PO ใน PO-Tracker tab อัตโนมัติ
5. กด "บันทึก" → ลง Slip-Log tab + upload Drive
```

**Sheet ที่ผูก:** `Slip-Log` (ยังไม่ wire — Phase 2)

**ไฟล์ต้นทาง:** `01-slip-scanner.html` (1,178 lines · ใหญ่สุด)

**Notes:**
- หัวใจของระบบ — ใช้ทุกวัน
- Sample สลิป 5 ใบ อยู่ใน `SLIP-PATTERNS.md`
- รองรับสลิปจาก SCB · K+ ดีที่สุด (มี pattern หลัก)

---

## 02. 📒 Cash Book

**เปิดที่:** https://two-build-finance.pages.dev/02-cash-book.html

**ใช้ทำอะไร:** สมุดเงินสดรายวัน · running balance · breakdown ตามหมวด

**Workflow:**
```
1. ดูยอดเงินสดในมือล่าสุด (running balance)
2. รายการล่าสุดเรียงตามวัน
3. กรองตาม: หมวดหมู่ · โครงการ · ช่วงวัน
4. เพิ่ม voucher ใหม่ (เงินเข้า/ออก)
5. ดูรายงาน P&L mini (รายเดือน)
```

**Sheet ที่ผูก:** `Cash-Book`

**ไฟล์ต้นทาง:** `02-cash-book.html`

**Notes:**
- ตอนนี้มี 388 รายการ (import จากค่าใช้จ่าย ต.ค.68-พ.ค.69)
- ต้นทุน vendor + เงินสำรองจ่าย + ค่าน้ำ-ไฟ ฯลฯ

---

## 03. 📄 Vendor Invoice

**เปิดที่:** https://two-build-finance.pages.dev/03-vendor-invoice.html

**ใช้ทำอะไร:** จัดการบิลจาก vendor + match กับ PO + ตารางชำระตาม credit term

**Workflow:**
```
1. รับใบกำกับภาษีจาก vendor
2. กรอกรายละเอียด: vendor, invoice_no, ยอด, VAT, due_date
3. match กับ PO อัตโนมัติ
4. ระบบจัดลำดับชำระตาม credit term (15/30/60 วัน)
5. mark "ชำระ" เมื่อจ่ายเช็ค
```

**Sheet ที่ผูก:** `Vendor-Invoice` + `PO-Tracker`

**ไฟล์ต้นทาง:** `03-vendor-invoice.html`

**Notes:**
- ตอนนี้มี vendor master 11 ราย (ส.เจริญชัย · บ้านช้าง · STC ฯลฯ)
- เชื่อมกับ Module 10 (Vendor Billing) ตอน wire phase 2

---

## 04. 📚 RE Accounting (Real Estate)

**เปิดที่:** https://two-build-finance.pages.dev/04-accounting.html

**ใช้ทำอะไร:** บัญชีอสังหาฯ เต็มรูปแบบ — Chart of Accounts · Journal Entries · GL · Trial Balance

**Workflow:**
```
1. ดู Chart of Accounts 43 บัญชี (1xxx Asset, 2xxx Liability, ฯลฯ)
2. ลงรายการ Journal Entry (Dr/Cr ต้อง balance)
3. ดู General Ledger ของแต่ละบัญชี
4. ออก Trial Balance ปลายเดือน
5. WIP รายแปลง (งานระหว่างก่อสร้าง)
```

**Sheet ที่ผูก:** `Journal-2569` + `COA`

**ไฟล์ต้นทาง:** `04-accounting.html`

**Notes:**
- COA seed 43 บัญชี (Asset/Liability/Equity/Revenue/Expense)
- ภาษาบัญชีไทย — ยอดยกมา · ลูกหนี้ · เจ้าหนี้ · WIP · ปูน ฯลฯ

---

## 05. 🏛️ Sales + Tax

**เปิดที่:** https://two-build-finance.pages.dev/05-sales-tax.html

**ใช้ทำอะไร:** รายได้จากขายบ้าน + ภาษีอสังหาฯ + ปฏิทินยื่นภาษี

**Workflow:**
```
1. ลงทะเบียนการขาย: plot, ลูกค้า, ราคา, วันโอน
2. คำนวณภาษีอัตโนมัติ:
   - SBT 3.3% (ภาษีธุรกิจเฉพาะ)
   - ค่าโอน 2% (กรมที่ดิน)
   - จดจำนอง 1% (ธนาคาร)
   - WHT 1%
3. ดูปฏิทินภาษี: ภงด.1/3/53/ภพ.30/ภงด.50/51
4. forecast ภาษีตามแผนขาย
```

**Sheet ที่ผูก:** `Sales-Pipeline` + `Tax-Tracker`

**ไฟล์ต้นทาง:** `05-sales-tax.html`

---

## 06. 📈 Financial Reports

**เปิดที่:** https://two-build-finance.pages.dev/06-financial-reports.html

**ใช้ทำอะไร:** สรุปรายงาน — P&L · Balance Sheet · Cash Flow · KPI

**Workflow:**
```
1. เลือกช่วงเวลา (รายเดือน/ไตรมาส/ปี)
2. ดู:
   - P&L (กำไรขาดทุน)
   - Balance Sheet (งบดุล)
   - Cash Flow Statement (กระแสเงินสด)
   - KPI Dashboard (GP Margin · ROI ฯลฯ)
   - P&L รายโครงการ
3. Export PDF / Excel
```

**Sheet ที่ผูก:** อ่านทุก tab (Aggregator)

**ไฟล์ต้นทาง:** `06-financial-reports.html`

**Notes:**
- module ใหญ่สุด · pull data จากทุก tab
- ทำหลังจาก module อื่นๆ ใช้ได้แล้ว (P7-P8 ใน Phase 2)

---

## 07. 🎯 Feasibility Study

**เปิดที่:** https://two-build-finance.pages.dev/07-feasibility.html

**ใช้ทำอะไร:** วิเคราะห์ feasibility โครงการใหม่ — IRR, NPV, Payback, Sensitivity

**Workflow:**
```
1. กรอก input โครงการ:
   - ที่ดิน + ราคา
   - จำนวนหลัง × ราคาขายต่อหลัง
   - ต้นทุนก่อสร้างต่อหลัง
   - timeline เปิด-ปิดโครงการ
2. ระบบคำนวณ:
   - IRR (Internal Rate of Return)
   - NPV (Net Present Value)
   - Payback period
3. Sensitivity analysis (ราคา ±10%, ต้นทุน ±10%)
4. บันทึก scenario (Base/Best/Worst)
```

**Sheet ที่ผูก:** `Feasibility-Save`

**ไฟล์ต้นทาง:** `07-feasibility.html`

**Notes:**
- ใช้ก่อนเปิดโครงการใหม่
- เก็บ scenario ทุกครั้ง เปรียบเทียบได้

---

## 08. 💼 Payroll

**เปิดที่:** https://two-build-finance.pages.dev/08-payroll.html

**ใช้ทำอะไร:** เงินเดือนพนักงาน · OT · ประกันสังคม · ภงด.1 · ออก slip + bank file

**Workflow:**
```
1. ดูรายชื่อพนักงาน 24 คน (ประจำ + รายวัน)
2. กรอก base salary + OT hours
3. ระบบคำนวณ:
   - Gross = base + OT
   - SSO 5% (max ฿750)
   - WHT (ตามฐาน)
   - Net = Gross - SSO - WHT
4. ออก slip PDF ส่งพนักงาน
5. ออก bank file (.txt format)
6. ลงรายการใน Payroll-2569 tab + บันทึก Journal
```

**Sheet ที่ผูก:** `Payroll-2569`

**ไฟล์ต้นทาง:** `08-payroll.html`

**Notes:**
- ตอนนี้มี sample 3 คน (ไอซ์ · ก้อ · ยาย)
- ต้องเติม master list 24 คนตอน Phase 2

---

## 09. 🔨 Contractor Payment

**เปิดที่:** https://two-build-finance.pages.dev/09-contractor-payment.html

**ใช้ทำอะไร:** จ่ายผู้รับเหมาตามงวด · QC ก่อนจ่าย · หักประกัน + WHT

**Workflow:**
```
1. รายชื่อผู้รับเหมา (ทีมต้น · ทีมนัท · ทีมนก ฯลฯ)
2. งวดงานที่รอจ่าย
3. โฟร์แมนตรวจ QC → ติ๊ก checklist
4. คำนวณยอดจ่าย:
   - ค่าจ้างงวด - หักประกัน 5%
   - หัก WHT 3%
   - = Net payable
5. approve flow → เขียนเช็ค → mark paid
```

**Sheet ที่ผูก:** `Contractor-Master` + `PO-Tracker`

**ไฟล์ต้นทาง:** `09-contractor-payment.html`

**Notes:**
- หลักการเหมือน Vendor Billing แต่จ่ายตามงวดงาน
- มี QC step เพิ่ม

---

## 10. 📦 Vendor Billing ⭐ (ใช้ได้แล้ว!)

**เปิดที่:** https://two-build-finance.pages.dev/10-vendor-billing.html

**ใช้ทำอะไร:** รับ packet vendor วันที่ 5 ของเดือน · 3-way match · ตารางเช็ค

**Workflow ละเอียด:**

### 📅 วันที่ 5 ของทุกเดือน (10 นาที)

```
[09:00] Vendor เดินเข้าบริษัท วาง packet
        - PO ที่เราเคยออก
        - GR/ใบส่งของ (ที่ลงนามรับของแล้ว)
        - Invoice / ใบกำกับภาษี

[09:15] พนักงาน:
        1. สแกนทุกหน้า → upload ที่หน้า "📥 รับ Packet"
        2. ระบบ OCR + จับคู่ 3-way match อัตโนมัติ:
           PO qty/price = GR qty (รับจริง) = Invoice qty/price
        3. ดูผล:
           ✅ match ครบ → status = approved
           ⚠️ ไม่ match → status = review

[09:30] กดเข้า "📋 ตารางเช็ค"
        - เห็นเช็คทุกใบที่ต้องออก 5 ก.ค. (เดือนถัดไป)
        - แต่ละแถวมี: vendor, ก่อน VAT, VAT 7%, WHT 3%, Net Payable
        - กรอกเลขเช็คล่วงหน้าได้

[09:45] กดเข้า "⚠️ Review"
        - ถ้ามี discrepancy → คุยกับ vendor
        - resolve → บันทึก resolution → status → resolved

[เดือนถัดไป]
        เขียนเช็คตามตารางทันที 5 ก.ค.
        mark "drawn" → "cleared"
```

**Sheet ที่ผูก:**
- `Vendor-Billing-Packets` (header ของแต่ละ packet)
- `Cheque-Schedule` (ตารางเช็ค)
- `Discrepancy-Log` (รายการ mismatch)

**ไฟล์ต้นทาง:** `10-vendor-billing.html`

**4 views ในหน้าเดียว:**
1. 📦 **Packets** — รายการ packet ทั้งหมด
2. 📋 **Cheque Schedule** — ตารางเช็คที่ต้องออก
3. ⚠️ **Discrepancy Review** — บิลที่ไม่ match · resolve
4. 📊 **AP Aging** — เจ้าหนี้ค้างจ่าย bucketize

**ตอนนี้มี sample 5 packets (ต.ค.68 - พ.ค.69):**
- ส.เจริญชัย: ฿335,715 (5 บิล)
- สุทธิพงศ์: ฿193,128 (3 บิล)
- ชลบุรีอึ้งย่งล้ง: ฿206,562 (2 บิล)
- พี.เจ.ฮาร์ดแวร์: ฿171,600 (4 บิล · ⚠️ 1 ติด review)
- คุงเจริญโลหะกิจ: ฿103,115 (1 บิล)

---

## 11. 🧾 WHT Center ⭐ (ใช้ได้แล้ว!)

**เปิดที่:** https://two-build-finance.pages.dev/11-wht-center.html

**ใช้ทำอะไร:** ระบบหักภาษี ณ ที่จ่าย — บันทึก คำนวณ ออกใบ 50ทวิ สรุปยื่นภงด. ตามแบบสรรพากร

### 📚 ประเภทเงินได้ (มาตรา 40) + อัตรา WHT

| มาตรา | ประเภทเงินได้ | อัตรา | แบบยื่น |
|---|---|---|---|
| **40(1)** | เงินเดือน ค่าจ้าง โบนัส | ตามฐาน | ภงด.1 |
| **40(2)** | ค่าธรรมเนียม นายหน้า | 3% | ภงด.3/53 |
| **40(3)** | ค่าแห่งกู๊ดวิลล์ ค่าลิขสิทธิ์ | 3% | ภงด.3/53 |
| **40(4a)** | ดอกเบี้ย | 1% | ภงด.2 |
| **40(4b)** | เงินปันผล | 10% | ภงด.2 |
| **40(5)** | ค่าเช่าทรัพย์สิน | 5% | ภงด.3/53 |
| **40(6)** | วิชาชีพอิสระ (แพทย์/ทนาย/วิศวกร) | 3% | ภงด.3 |
| **40(7)** | ค่ารับเหมาก่อสร้าง / จ้างทำของ | 3% | ภงด.3/53 |
| **40(8)** | รายได้อื่น (ขายสินค้า/บริการ) | 3% | ภงด.3/53 |

### 4 Views ในหน้าเดียว

1. **📝 บันทึก** — ฟอร์มกรอก WHT ใหม่
   - เลือกประเภทผู้รับ (บุคคล/นิติบุคคล/พนักงาน)
   - เลือกประเภทเงินได้ (40(1)-40(8)) → ระบบใส่อัตรา WHT อัตโนมัติ
   - กรอกยอดก่อนหัก → คำนวณ WHT + Net Paid อัตโนมัติ
   - บันทึก หรือบันทึก + ออกใบ 50ทวิ พิมพ์ทันที

2. **📋 รายการ** — WHT ทั้งหมด · กรองตามงวด/แบบยื่น

3. **📄 ใบ 50ทวิ** — พรีวิว + พิมพ์
   - layout A4 ตรงตามแบบ "หนังสือรับรองการหักภาษี ณ ที่จ่าย (ม.50 ทวิ)"
   - มีหัวข้อครบ: ผู้จ่าย · ผู้ถูกหัก · ประเภทเงินได้ checkbox · ตารางยอด · จำนวนเงินภาษีเป็นตัวอักษร · ลงชื่อ
   - เลขประจำตัวผู้เสียภาษี 13 หลัก แบ่งช่อง

4. **🏛️ สรุปยื่น ภงด.** — รายงานรายเดือนสำหรับยื่นสรรพากร
   - แบ่งตามแบบ (ภงด.1/3/53)
   - แสดงยอดก่อนหัก + ยอดหัก + วันครบกำหนดยื่น
   - แสดงปฏิทินภาษีรายเดือน

### 📅 ปฏิทินยื่นภาษี (สำคัญมาก!)

| แบบ | เนื้อหา | กำหนดยื่น |
|---|---|---|
| **ภงด.1/3/53** | หัก ณ ที่จ่าย รายเดือน | **ภายในวันที่ 7** ของเดือนถัดไป |
| **ภพ.30** | VAT ขาย − VAT ซื้อ | **ภายในวันที่ 15** ของเดือนถัดไป |
| **ภงด.1ก** | สรุปเงินเดือนทั้งปี | **ภายในเดือน ก.พ.** ปีถัดไป |
| **ภงด.51** | ภาษีกลางปี (CIT) | ภายใน 2 เดือนหลังครึ่งปี (ส.ค.) |
| **ภงด.50** | ภาษีเงินได้นิติบุคคล (ปี) | ภายใน 150 วันหลังปิดงบ |

### 📐 ตัวอย่างใบ 50ทวิ ที่ออก

```
┌──────────────────────────────────────────────────────────┐
│       หนังสือรับรองการหักภาษี ณ ที่จ่าย                 │
│       ตามมาตรา 50 ทวิ แห่งประมวลรัษฎากร                 │
│                                                          │
│  เลขที่ใบรับรอง: CERT-2569-0001                          │
│  ┌────────────────────┬────────────────────┐            │
│  │ ผู้จ่ายเงิน:        │ ผู้ถูกหักภาษี:      │            │
│  │ บจก. ทู บิลด์       │ บ.ดับเบิ้ลยู พีเอ็น  │            │
│  │ เลขประจำตัว:        │ เลขประจำตัว:        │            │
│  │ 0205565000123       │ □□□□□□□□□□□□□      │            │
│  └────────────────────┴────────────────────┘            │
│                                                          │
│  ประเภทเงินได้:                                          │
│  ☐1 เงินเดือน  ☐2 ค่านายหน้า  ☐3 ลิขสิทธิ์              │
│  ☐4 ดอกเบี้ย  ☐5 ค่าเช่า  ☐6 วิชาชีพ                    │
│  ☑7 รับเหมาก่อสร้าง  ☐8 รายได้อื่น                       │
│                                                          │
│  ┌─────┬──────────┬────────────┬──────┬──────────┐      │
│  │ ลำดับ│ วันที่จ่าย│ ยอดเงิน    │ อัตรา│ ภาษีที่หัก│      │
│  ├─────┼──────────┼────────────┼──────┼──────────┤      │
│  │  1  │15 พ.ค.69│฿2,000,000  │ 3%   │ ฿60,000  │      │
│  └─────┴──────────┴────────────┴──────┴──────────┘      │
│                                                          │
│  (ตัวอักษร) หกหมื่นบาทถ้วน                              │
│                                                          │
│  แบบที่ใช้นำส่ง: ☐ภงด.1  ☐ภงด.3  ☑ภงด.53                │
│  งวด: 2569-05                                            │
│                                                          │
│  ───────────────        ───────────────                  │
│  ผู้จ่ายเงิน              ผู้รับเงิน                       │
│  (คุณไอซ์)                                                │
└──────────────────────────────────────────────────────────┘
```

### Workflow ใช้งาน

```
1. จ่ายเงินให้ผู้รับเหมา/freelance/ค่าเช่า
       ↓
2. เปิด Module 11 → "📝 บันทึก"
       ↓
3. เลือก:
   - ประเภทผู้รับ (บุคคล/นิติบุคคล)
   - ประเภทเงินได้ (40(1)-(8)) → อัตราใส่อัตโนมัติ
   - ยอดก่อนหัก
   → ระบบคำนวณ WHT + Net Paid
       ↓
4. กด "บันทึก + ออกใบ 50ทวิ"
       ↓
5. ระบบ:
   - บันทึก WHT-Records tab ใน Sheet
   - เปิด print dialog เลย (Ctrl+P)
   - พิมพ์ใบให้ผู้รับเงิน 2 ฉบับ (สำหรับเขา + เก็บ)
       ↓
6. สิ้นเดือน → "🏛️ สรุปยื่น ภงด."
   - เลือกงวด → เห็นยอดต่อแบบ
   - ยื่น efiling.rd.go.th ตามตัวเลข
   - mark "filed" ในระบบ
```

**Sheet ที่ผูก:** `WHT-Records` + `WHT-Certificates`

**ไฟล์ต้นทาง:** `11-wht-center.html`

**Notes:**
- ตอนนี้มี sample 4 รายการ (1 บริษัท + 3 บุคคล)
- ภงด.53: ฿60,000 (W.P. งานประปา 2M)
- ภงด.3: ฿2,500 (3 รายการ)
- พิมพ์ใบ 50ทวิ จากเบราว์เซอร์ Ctrl+P → save PDF ได้
- หน้ากระดาษ A4 portrait · ตามแบบราชการ

### ⚠️ สิ่งที่ต้องเช็คก่อนยื่นจริง

1. **เลขประจำตัวผู้เสียภาษีของบริษัทไอซ์** — ตอนนี้ผมใส่ placeholder `0205565000123` ต้องเปลี่ยนเป็นเลขจริง (ใน `11-wht-center.html` ฟังก์ชั่น `buildCertHTML`)
2. **ที่อยู่บริษัท** — ตอนนี้ placeholder ต้องอัปเดต
3. **ลงชื่อ** — ตอนนี้ใส่ "คุณไอซ์ Iceberg" ผู้บริหาร · ปรับได้
4. **ใบรับรองพิมพ์ 2 ฉบับ:** ผู้ถูกหัก 1 ฉบับ + บริษัทเก็บ 1 ฉบับ

---

# 🔄 Workflow Dev (ระหว่าง Claude กับ Pi)

## วิธีที่ Claude อัปเดต code

```bash
# Claude ทำงานที่:
cd ~/Desktop/two-build-finance-v4

# แก้ไฟล์ HTML/JS:
# (เปลี่ยน sample data → fetch from API)

# Push ขึ้น GitHub:
git add .
git commit -m "wire module XX into API"
git push

# → Cloudflare auto-deploy ใน 30-60 วินาที
# → URL https://two-build-finance.pages.dev อัปเดตเอง
# → ไอซ์แค่ refresh หน้าเว็บ
```

## วิธีที่ Claude อัปเดต Apps Script API

```bash
cd ~/Desktop/finance-api

# แก้ Code.gs:
# (เพิ่ม endpoint ใหม่ หรือ fix bug)

clasp push --force        # อัปขึ้น Apps Script
clasp deploy --deploymentId AKfycbwFGUrdoER2KacLGyiDAV7ul4ajla7k0yfGm5FzWkiD7tPtvnPg1-SoK8vc9V2NRU37 --description "..."

# → URL เดิม · อัปเดตทันที
```

## วิธีที่ไอซ์อัปเดตข้อมูล (โดยไม่ต้องผ่าน Claude)

```
แก้ใน Google Sheet → save → หน้าเว็บ refresh → เห็นข้อมูลใหม่ทันที
```

---

# 📁 ไฟล์ต้นทางทั้งหมด

## โฟลเดอร์หลัก

```
~/Desktop/two-build-finance-v4/         ← Frontend (push GitHub)
├── index.html                          🏠 Hub
├── 01-slip-scanner.html
├── 02-cash-book.html
├── 03-vendor-invoice.html
├── 04-accounting.html
├── 05-sales-tax.html
├── 06-financial-reports.html
├── 07-feasibility.html
├── 08-payroll.html
├── 09-contractor-payment.html
├── 10-vendor-billing.html              📦 ใช้งานจริงแล้ว
├── js/
│   ├── config.js                       API URL + Sheet ID
│   └── api.js                          fetch wrapper + formatters
├── assets/
│   └── brand/                          One Vela logos
├── data/
│   └── sample-packets.json             (fallback ตอน API ล่ม)
├── Finance-Master-2569.xlsx            (backup local ของ Sheet)
├── SLIP-PATTERNS.md                    pattern OCR
├── README.md
└── คู่มือ-Finance-V4.md                ← ไฟล์นี้

~/Desktop/finance-api/                  ← Backend API (clasp push)
├── .clasp.json                         link to Apps Script project
└── src/
    ├── appsscript.json                 config (timezone, webapp access)
    └── Code.gs                         doGet + 8 actions
```

## ไฟล์อื่นที่เกี่ยวข้อง

```
~/Desktop/two-build-finance-v4/
├── _build_master_sheet.py              สร้าง xlsx ครั้งแรก
├── _add_billing_tabs.py                เพิ่ม 3 tab vendor billing
└── _import_expenses.py                 import 388 รายการ ต.ค.68-พ.ค.69

~/Desktop/📥 Inbox-Claude/              ← drop ไฟล์ให้ Claude อ่าน
├── 01-vendor-lists/
├── 02-employee-payroll/
├── 03-contractor-data/
├── 04-boq-materials/
├── 05-bank-slips/
├── 06-invoices-bills/                  ← packet vendor วันที่ 5
├── 07-customer-sales/
└── 99-misc/
```

---

# 🛣️ Roadmap — Phase 2 (รออัปเดต)

## ลำดับ wire ที่แนะนำ (ทำทีละ module · ใช้ได้ทันที)

| Sprint | Module | Sheet Tab | เวลาประมาณ |
|---|---|---|---|
| 🔴 **Sprint 1** | 01 Slip Scanner | Slip-Log | 2-3 ชม. |
| 🔴 **Sprint 1** | 02 Cash Book | Cash-Book | 2 ชม. |
| 🟡 **Sprint 2** | 03 Vendor Invoice | Vendor-Invoice + PO-Tracker | 2 ชม. |
| 🟡 **Sprint 2** | 09 Contractor Payment | Contractor-Master + PO-Tracker | 2 ชม. |
| 🟡 **Sprint 3** | 08 Payroll | Payroll-2569 | 2 ชม. |
| 🟢 **Sprint 3** | 05 Sales + Tax | Sales-Pipeline + Tax-Tracker | 2 ชม. |
| 🟢 **Sprint 4** | 06 Financial Reports | (ทุก tab) | 3 ชม. |
| ⚪ **Sprint 5** | 04 Accounting | Journal-2569 + COA | 2 ชม. |
| ⚪ **Sprint 5** | 07 Feasibility | Feasibility-Save | 2 ชม. |

**รวมเวลา Phase 2:** ~20 ชั่วโมง · แบ่ง 5 sprints

## หลังจาก wire ครบ 10 modules

### Phase 3 — Polish + Production
- Cross-module linking (slip → PO → invoice → cheque)
- Search ค้นหาทั้งระบบ
- Reports export PDF
- Email notifications
- Multi-user (Login + roles)

---

# 🔐 Security & Access

## ตอนนี้

| ระบบ | Access |
|---|---|
| Cloudflare Pages | 🌐 Public — ทุกคนเปิด URL ได้ |
| Apps Script API | 🌐 Public — anonymous · ใครรู้ URL เรียกได้ |
| Google Sheet | 🔒 Private — แค่ iceberg.iced@gmail.com |
| GitHub repo | 🌐 Public — code อ่านได้ |

**ความปลอดภัย:**
- URL Apps Script API ยาวมาก (~75 chars) เดาไม่ได้
- เขียน Sheet ได้แต่อ่านได้แบบ public — risk: ข้อมูลขายไม่ลับ
- ไม่มี password — เหมาะใช้ใน office network

## Phase 3 จะเพิ่ม
- CI_TOKEN (shared secret) ตอน POST → ต้องมี token ถูกต้อง
- Login via Google account
- Role-based access (Admin/Accountant/Viewer)

---

# 🆘 Troubleshooting

## ปัญหาที่อาจเจอ

### 1. หน้าเว็บโหลด แต่ KPI เป็น "-" ทุกตัว

→ API ไม่ตอบ · เช็ค:
- เปิด console (F12) → ดู error
- ลอง: `curl https://script.google.com/macros/s/.../exec?action=ping`
- ถ้า HTTP 403 → ต้องตั้ง access เป็น Anyone ที่ Apps Script editor

### 2. แก้ Sheet แล้วเว็บไม่เห็นการเปลี่ยน

→ Browser cache · ทำ:
- กด ⌘⇧R (hard refresh)
- หรือเปิด private window

### 3. ทำงานช้า

→ ตรวจ Apps Script logs:
- editor → Executions tab
- ดูว่ามี call ไหน timeout

### 4. Push GitHub error

→ token หมดอายุ · ทำ:
- ใช้คำสั่ง `gh auth status` เช็ค
- ถ้าหมดอายุ → re-auth ผ่าน device flow

---

# 📞 ติดต่อ Claude

ถ้าอยากให้แก้/ต่อยอด:
1. บอกชื่อ module + สิ่งที่ต้องการ
2. หรือส่งไฟล์ (สลิป/บิล/data) เข้า `~/Desktop/📥 Inbox-Claude/`
3. Claude จะ:
   - แก้ code → push GitHub → Cloudflare auto-deploy
   - หรือเพิ่ม endpoint ใน Apps Script → clasp deploy
   - บอกผลให้ทราบ + URL ที่ทดสอบได้

---

**🎉 Phase 1 พร้อมใช้!** เปิด https://two-build-finance.pages.dev/ แล้วลองดูครับ
