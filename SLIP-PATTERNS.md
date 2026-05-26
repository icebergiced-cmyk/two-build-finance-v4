# 📋 Slip OCR Patterns — Reference Document

อ้างอิงจากสลิปจริง 5 ใบ ที่คุณไอซ์ส่งให้ผม (25 พ.ค. 2569)

---

## 🏦 ธนาคารและ Layout

### SCB (4 ใบ)
**Visual landmarks:**
- 🦅 Banner: ภาพนก + เมฆม่วง + ลาเวนเดอร์
- 🐕 Footer: หมาชิบะ + ทุ่งดอกไม้ + ม้า + บ้าน
- โลโก้ SCB อยู่กลางบน
- ป้าย ✅ สีเขียว = "โอนเงินสำเร็จ" / "จ่ายเงินสำเร็จ"

**Fields ที่ดึง:**
| Field | Position | Format | ตัวอย่าง |
|-------|----------|--------|----------|
| Status | บนสุด | ✅ + ข้อความ | "โอนเงินสำเร็จ" |
| Date/Time | ใต้ status | DD MMM YYYY - HH:MM | "28 มี.ค. 2569 - 09:49" |
| Ref Code | ใต้ date | alphanumeric 24 chars | "202603288QZdLiLc6dewNeyMV" |
| From | section "จาก" | ชื่อ + โลโก้ + masked acc | "นางสาว กมลชนก สิมมาลา · xxx-xxx499-7" |
| To | section "ไปยัง" | ชื่อ + โลโก้ + masked acc | "นาย โกวิท ราษีทอง · x-3186" |
| Amount | section "จำนวนเงิน" | comma-separated decimal | "3,500.00" |
| Memo | section "บันทึกช่วยจำ" | free text | "น้ำมัน" |

**Reference code pattern:**
- เริ่มด้วย `YYYYMMDD` (เช่น 20260328) แล้วตามด้วย alphanumeric ~16 ตัว
- ใช้แยกแยะ transaction ได้ unique

### K+ / KBANK (1 ใบ)
**Visual landmarks:**
- 🟢 ธีมเขียวอ่อน
- 👼 ภาพแมลงนางฟ้านั่งบนเก้าอี้ + ธนบัตรปลิว
- โลโก้ K+ มุมขวาบน
- ☘️ โลโก้กสิกรไทย (สัญลักษณ์ใบ ก.) ซ้ายมือ

**Fields เพิ่มเติม (Bill Payment):**
| Field | Format | ตัวอย่าง |
|-------|--------|----------|
| Biller Name | ชื่อหน่วยงาน | "สำนักงานที่ดินจังหวัด ชลบุรี" |
| Ref 1 | numeric | "000000801727 0369" |
| Ref 2 | numeric | "0000000000247213" |
| Transaction No. | alphanumeric | "016086133835APM13635" |
| Fee | จำนวน | "0.00 บาท" |

---

## 🎯 บันทึกช่วยจำ (Memo) — ❤️ The Gold Mine!

**Patterns ที่เจอ:**

| Memo | Category | Auto-action |
|------|----------|-------------|
| `น้ำมัน` | ⛽ ค่าน้ำมัน | → ลง EXP-Fuel · บัญชี 61020 |
| `ค่าโอนแปลง 89-158` | 🏛️ ค่าธรรมเนียมโอน | → Module 05 · ผูกแปลง 89-158 · บัญชี 23020 |
| `ค่าติดตั้งงานหลังคา` | 🔨 ค่าผู้รับเหมา | → Module 09 · ค่าแรง · บัญชี 52020 |
| `ติดตั้งหลังคา` | 🔨 (เหมือนข้างบน) | → Auto-link กับใบก่อนหน้า |
| `MEGA Home` | 🧱 ค่าวัสดุ (HomePro chain) | → Module 03 · บัญชี 52010 |

**Regex patterns ใน code:**
```javascript
const memoPatterns = [
  { pattern: /น้ำมัน|gasoline|fuel/i,                    cat: '⛽ ค่าน้ำมัน' },
  { pattern: /ค่าโอน|โอนแปลง|กรมที่ดิน/i,                  cat: '🏛️ ค่าธรรมเนียมโอน' },
  { pattern: /หลังคา|มุงหลังคา|roof/i,                    cat: '🔨 ผู้รับเหมา · หลังคา' },
  { pattern: /ก่ออิฐ|ฉาบ|ก่อผนัง/i,                        cat: '🔨 ผู้รับเหมา · ก่อสร้าง' },
  { pattern: /Mega Home|HomePro|ไทยวัสดุ|Global House/i,  cat: '🧱 ค่าวัสดุ Home Center' },
  // ... extend as needed
];
```

---

## 🚨 Edge Cases ที่เจอ

### 1. โอนติดกัน (Split payment)
สลิป S003 + S004:
- 20/03/2569 17:04 → ฿12,896.34 · memo: "ค่าติดตั้งงานหลังคา"
- 20/03/2569 17:05 → ฿3,974.86 · memo: "ติดตั้งหลังคา"

**Pattern:** ผู้รับเดียวกัน · ห่างกัน < 5 นาที · memo คล้ายกัน
**Action:** ระบบควรเสนอ "รวมเป็น 1 transaction" (16,871.20) หรือผูกเข้า PO เดียวกัน

### 2. Bill Payment (multi-reference)
SCB ไป HomePro:
- Biller ID: 010754400004305
- Ref 1, 2, 3 (HomePro มี 3 ref)
- K+ ไปกรมที่ดิน: Ref 1, 2

**Action:** เก็บ ref ทุกตัว · ใช้ ref ในการ verify กับใบเสร็จร้าน

### 3. ปี พ.ศ. ย่อ vs เต็ม
- K+: "27 มี.ค. 69" (ย่อ 2 หลัก)
- SCB: "28 มี.ค. 2569" (เต็ม)

**Action:** parser ต้องเข้าใจทั้ง 2 format · ถ้า 2 หลัก → +2500

### 4. บัญชี Mask
- SCB เลขบัญชีต้นทาง: `xxx-xxx499-7` (เห็น 3 ตัว)
- บัญชีปลายทาง (ธ.ก.ส.): `x-3186` (เห็นแค่ 4 ตัวท้าย)

**Action:** match แค่ 4 ตัวท้าย · ระบุธนาคารปลายทางจากโลโก้

### 5. คนเดียวกันใช้หลายธนาคาร
น.ส. กมลชนก สิมมาลา:
- SCB: `xxx-xxx499-7`
- KBANK: `xxx-x-x1615-x`

**Action:** Map cross-bank → "user profile" เดียวกัน

---

## 📊 ข้อมูลสรุปจากสลิป 5 ใบ

| Slip | ธ. | Date | Amount | Memo | Category | Match |
|------|-----|------|--------|------|----------|-------|
| S001 | SCB | 28/03 09:49 | 3,500.00 | น้ำมัน | ⛽ Fuel | EXP-2569-0234 |
| S002 | K+ | 27/03 13:38 | 157,914.00 | ค่าโอนแปลง 89-158 | 🏛️ Land transfer | GOV-2569-0015 |
| S003 | SCB | 20/03 17:04 | 12,896.34 | ค่าติดตั้งงานหลังคา | 🔨 Contractor | CTR-2569-0042 |
| S004 | SCB | 20/03 17:05 | 3,974.86 | ติดตั้งหลังคา | 🔨 Contractor | CTR-2569-0042B |
| S005 | SCB | 20/03 12:18 | 4,644.36 | MEGA Home | 🧱 Material | PO-2569-0089 |
| **รวม** | | มี.ค. 2569 | **฿182,929.56** | | | 5/5 matched |

---

## 💡 What's Next?

ส่งสลิปเพิ่ม **จากธนาคารอื่น** จะได้ pattern ครบ:
- 🟦 **BBL** (กรุงเทพ) — สีน้ำเงิน
- 🟦 **KTB** (กรุงไทย) — สีฟ้า
- 🟪 **BAY** (กรุงศรี) — สีเหลือง
- 🟪 **TMB/TTB** (TMBThanachart)
- 🟢 **GSB** (ออมสิน)
- 🟧 **ธ.ก.ส.** (ลายต้นข้าว) — เห็นเป็น recipient บ่อย

และ patterns พิเศษ:
- 💳 จ่ายผ่าน PromptPay
- 🏪 จ่ายผ่าน TrueMoney/Rabbit LINE Pay
- 💵 ฝากเงินสดเข้าบัญชี
