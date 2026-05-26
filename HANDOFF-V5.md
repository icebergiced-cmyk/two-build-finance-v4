# 🚀 Handoff Document — Two Build Finance V4 → v5 Session

**Date:** 27 พ.ค. 2569 (00:50)
**Status:** Phase 1 เสร็จ · พร้อมลุย Phase 2 (overnight autonomous work)

---

## 🌐 ลิงค์ใช้งานจริง (Bookmark!)

| | URL |
|---|---|
| 🌐 **Web App (Frontend)** | https://two-build-finance.pages.dev |
| 📊 **Google Sheet** | https://docs.google.com/spreadsheets/d/1xwjuIUdmTuvKVXjvJsI_uNPzgO7YL9gWsQ2o5m95-nA/edit |
| 🔌 **API URL** | https://script.google.com/macros/s/AKfycbyZEYnPf3aAWIr7FGGN5Ko8ngvQtsDZr7UBXBoXeMXeRAjQDU_bI5t7LpDUEpzfeqh0/exec |
| 📦 **GitHub Frontend** | https://github.com/icebergiced-cmyk/two-build-finance-v4 |
| 📦 **GitHub Backend** | https://github.com/icebergiced-cmyk/finance-api |
| ⚙️ **Apps Script Editor** | https://script.google.com/d/1nIaviXMKINMARpZBd8yPIjaMh1IH49rUuq3TgNtzy-ekozGGLcfAl6wn/edit |

## 🔑 IDs สำคัญ

- **Sheet ID:** `1xwjuIUdmTuvKVXjvJsI_uNPzgO7YL9gWsQ2o5m95-nA`
- **Script ID:** `1nIaviXMKINMARpZBd8yPIjaMh1IH49rUuq3TgNtzy-ekozGGLcfAl6wn`
- **Deployment ID:** `AKfycbyZEYnPf3aAWIr7FGGN5Ko8ngvQtsDZr7UBXBoXeMXeRAjQDU_bI5t7LpDUEpzfeqh0`

---

## 🏢 ข้อมูลบริษัท (ใช้กับเอกสารทุกใบ)

- **ชื่อ:** บจก. ทู บิลด์ ดีเวลลอปเมนท์ จำกัด
- **ที่อยู่:** 1/88 หมู่ที่ 1 ตำบลหนองแหน อำเภอพนมสารคาม จังหวัดฉะเชิงเทรา 24120
- **เลขประจำตัวผู้เสียภาษี:** `0245566004014`
- **โทร:** 092-787-4222
- **ผู้มีอำนาจลงนาม:** นายเฉลิมไชย ดีแสน
- **โฟร์แมน:** นายโกวิท ราษีทอง
- **เจ้าของบัญชี (โอน):** นาย พงศกร ด. / PHONGSAKORN DEESAN

---

## 📊 สถานะ 11 Modules

| # | Module | สถานะ | ต้องทำต่อ |
|---|---|---|---|
| Hub | ✅ Live · KPI สด | เพิ่ม onboarding panel | 
| **01 Slip Scanner** | 🔴 Demo · ยังใช้ sample data | wire เต็ม + 4 ธนาคาร (SCB·K+·ttb·KTB) + memo→category | Priority 1 |
| **02 Cash Book** | 🔴 Demo | wire + 388 รายการเดิม | Priority 2 |
| **03 Vendor Invoice** | 🟡 drag-drop ใช้ได้ · ยัง demo | wire เต็ม | Priority 3 |
| 04 RE Accounting | 🔴 Demo | wire (Phase 2.5) | |
| 05 Sales + Tax | 🔴 Demo | wire (Phase 2.5) | |
| 06 Financial Reports | 🔴 Demo | wire (Phase 2.5) | |
| 07 Feasibility | 🔴 Demo | wire (Phase 2.5) | |
| **08 Payroll** | 🔴 Demo | wire (Phase 2.5) | Priority 6 |
| **09 Contractor Payment** | 🔴 Demo | **ใช้ template จริงของบริษัท** | Priority 4 |
| 10 Vendor Billing | ✅ Live | + Drive folder + คู่มือใช้ | |
| 11 WHT Center | ✅ Live | + Drive folder + คู่มือใช้ | |

---

## 📚 ข้อมูลที่อ่านแล้ว — ใช้ทำ Module ต่อ

### 🔵 Module 09 Contractor Payment — Template จริง

**ที่อยู่:** `/Users/twobuild/Downloads/เดือน เมษายน/`

**Format ใบสรุปยอด:**
```
สรุปใบส่งงาน ค่าแรง ประจำงวด 27-4-69
| ลำดับ | ช่าง | แปลง | แบบบ้าน | รายการ | หน่วย | จำนวน | ค่าแรง (หน่วย/เป็นเงิน) | หมายเหตุ |
```

**8 ทีมช่าง (เม.ย.69 · รวม ฿929,310):**
1. ช่างต่าย — โครงเหล็กหลังคา ซีแพคโมเนีย (฿14,850/หลัง)
2. ช่างจริง — ปูกระเบื้อง
3. ช่างจักร — อลูมิเนียม
4. ช่างเจอะ — ทาสี + รูฟชีลกันซึม
5. ช่างจอย — ปูกระเบื้อง
6. ลา — เทโครงสร้าง/ติดสุขภัณฑ์/ไฟฟ้า/รายวัน
7. **เจ้ทุเรียน** — โครงสร้าง+ก่ออิฐ+ฉาบปูน (6 งวด/฿300K/หลัง)
8. ช่างแอ็ด — ขับรถแบ็คโฮ+6 ล้อ

**ราคาทีมเจ้ทุเรียน — บ้านเดี่ยว 2 ชั้น:**
- งวด 1 (15%) ฐานราก+คานคอดิน = ฿45,000
- งวด 2 (22%) คานชั้น 2+TOPPING = ฿66,000
- งวด 3 (3%) บันได คสล. = ฿9,000
- งวด 4 (2%) พื้นจอดรถ+ซักล้าง = ฿6,000
- งวด 5 (23%) ก่ออิฐมวลเบา = ฿69,000
- งวด 6 (35%) ฉาบปูน = ฿105,000
- **รวม ฿300,000/หลัง**

**Workflow 5 ขั้น:**
1. ทำงาน → โฟร์แมนตรวจรับ
2. ออกใบส่งงาน + รูป
3. ใบสรุปยอด รายเดือน
4. หนังสือส่งมอบงาน → ประธานกรรมการ + บัญชี
5. บัญชีออกเช็ค

### 🔵 Module 01 Slip Scanner — 5 ธนาคารที่ใช้

| ธนาคาร | Layout/Field |
|---|---|
| 🟣 SCB | "โอนเงินสำเร็จ" + "บันทึกช่วยจำ" ใต้ยอด · มี QR |
| 🟢 K+ | "เลขที่รายการ" + ลำดับ ผู้โอน→ผู้รับ |
| 🔵 ttb | "จ่ายบิลสำเร็จ" (บัตรเครดิต) + "หมายเลขใบเสร็จ" |
| 🔷 KTB | "บันทึกช่วยจำ" + รหัสอ้างอิงยาว |
| BBL | (ยังไม่เห็นตัวอย่าง) |

**Memo→Category mapping:**
- "ค่าประเมิน..." → ค่าธรรมเนียม
- "ค่ามิเตอร์ น้ำ"/"ค่าน้ำ"/"ค่าไฟ" → ค่าสาธารณูปโภค
- "สำรอง..."/"เงินทดรอง..." → เงินสำรองจ่าย
- "ค่า [vendor name]" → จับคู่ Vendor Master
- ชื่อช่าง → ค่าแรงผู้รับเหมา
- "ค่ากระเบื้อง/ปูน/เหล็ก..." → วัสดุก่อสร้าง

---

## 🗂️ Google Sheet (Finance-Master-2569) — 17 tabs

1. Slip-Log
2. Cash-Book (388 รายการเดิม)
3. Expense-Summary
4. Vendor-Invoice
5. PO-Tracker
6. **Vendor-Billing-Packets** (6 packets พ.ค.69)
7. **Cheque-Schedule**
8. **Discrepancy-Log**
9. Journal-2569
10. COA (43 บัญชี)
11. Sales-Pipeline
12. Tax-Tracker
13. Feasibility-Save
14. Payroll-2569
15. Contractor-Master
16. **WHT-Records** (4 records)
17. **WHT-Certificates**
18. **Payment-Vouchers** (12 vouchers พ.ค.69)

---

## 🛠️ Workflow Dev

```bash
# Frontend
cd ~/Desktop/two-build-finance-v4
git add . && git commit -m "..." && git push
# → Cloudflare auto-deploy

# Backend
cd ~/Desktop/finance-api
clasp push --force
clasp deploy --deploymentId AKfycbyZEYnPf3aAWIr7FGGN5Ko8ngvQtsDZr7UBXBoXeMXeRAjQDU_bI5t7LpDUEpzfeqh0 --description "..."
git add . && git commit -m "..." && git push
```

---

## ⚙️ ตั้งค่า Permission แล้ว (overnight work)

`~/Desktop/.claude/settings.local.json`:
- `defaultMode: "acceptEdits"`
- 267 allow rules (รวม wildcards Bash, MCP, Drive, Web)

---

## 🎯 Plan ที่ค้าง (สำหรับ v5)

### Phase 2 — Overnight (ก่อนคุณไอซ์ตื่น)
1. **[O1]** สร้าง Drive folder structure ครบ 11 modules
2. **[O2]** Standard template (Info Panel + Tooltip + Drive view)
3. **[O3]** Module 09 Contractor Payment — ใช้ template จริงของบริษัท
4. **[O4]** Module 01 Slip Scanner — wire + 4 ธนาคาร + memo→category
5. **[O5]** Module 02 Cash Book — wire + 388 รายการเดิม
6. **[O6]** Module 03 Vendor Invoice — wire เต็ม
7. **[O7]** Module 08 Payroll — wire 24 คน

### Phase 2.5 — ทำต่อหลังจาก v5
- 04 RE Accounting, 05 Sales+Tax, 06 Reports, 07 Feasibility

---

## 📝 Prompt เริ่ม v5

> "อ่าน HANDOFF-V5.md ที่ ~/Desktop/two-build-finance-v4/ แล้วเริ่มลุย overnight plan ตามนั้น — ทำ O1-O7 ตามลำดับ · ไม่ต้องถามอนุญาต permission แล้ว"

หรือลากไฟล์ HANDOFF-V5.md เข้าแชต v5 ใหม่
