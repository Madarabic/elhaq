# 📊 HAQ SAUDI — Database Schema & Data Model

Dokumentasi lengkap struktur Google Sheets untuk sistem HAQ SAUDI Premium.

---

## 🗂️ DATABASE OVERVIEW

**Platform:** Google Sheets  
**Format:** Cloud-based NoSQL Spreadsheet  
**Autoscale:** Automatic (Google handle storage)  
**Backup:** Daily automatic + manual on-demand  

### Total Sheets: 6 Main Tables

```
┌─────────────────────────────────────────┐
│ HAQ SAUDI - Master Database             │
├─────────────────────────────────────────┤
│ 1. Workers        (Worker registrations)│
│ 2. Lawyers        (Lawyer profiles)     │
│ 3. Payments       (Payment records)     │
│ 4. Documents      (File tracking)       │
│ 5. Cases          (Case management)     │
│ 6. Messages       (Communication logs)  │
└─────────────────────────────────────────┘
```

---

## 📋 SHEET 1: WORKERS

**Tujuan:** Menyimpan data registrasi semua pekerja/PMI

### Kolom Structure:

| No | Column Name | Type | Size | Description | Example |
|----|------------|------|------|-------------|---------|
| A | Timestamp | DateTime | - | Auto-generated saat row dibuat | 2026-01-15 10:30:45 |
| B | Iqamah | Text | 10 | Nomor identitas unik | 2134567890 |
| C | Full Name | Text | 100 | Nama lengkap pekerja | Siti Aminah |
| D | Email | Text | 100 | Email aktif | siti@email.com |
| E | Phone | Text | 20 | Nomor WhatsApp/Telpon | +966501234567 |
| F | Password (Hashed) | Text | 64 | Password terenkripsi SHA-256 | a1b2c3d4e5f6... |
| G | Workplace | Text | 100 | Nama tempat kerja | PT ABC Company |
| H | Nationality | Text | 50 | Negara asal | Indonesia |
| I | Status | Text | 20 | Account status | Active / Suspended |
| J | Registration Date | DateTime | - | Tanggal registrasi | 2026-01-15 |
| K | Payment Status | Text | 30 | Status pembayaran | Verified / Pending |
| L | ID Document Link | URL | - | Link file identitas | https://drive.google.com/file/... |
| M | Passport Link | URL | - | Link file paspor | https://drive.google.com/file/... |
| N | Contract Link | URL | - | Link file kontrak kerja | https://drive.google.com/file/... |

### Sample Data:

```
Timestamp | Iqamah | Full Name | Email | Phone | Password | Workplace | Nationality | Status | Registration Date | Payment Status | ID Doc | Passport | Contract
2026-01-15 10:30 | 2134567890 | Siti Aminah | siti@mail.com | +966501234567 | [HASH] | PT ABC | Indonesia | Active | 2026-01-15 | Verified | [URL] | [URL] | [URL]
2026-01-16 14:22 | 2198765432 | Budi Rahman | budi@mail.com | +966509876543 | [HASH] | Hotel X | Indonesia | Active | 2026-01-16 | Pending | [URL] | [URL] | -
```

### Data Validation:

```javascript
// Iqamah: harus 10 digit, dimulai dengan 1-9
// Email: valid email format
// Phone: +966 format
// Status: "Active" atau "Suspended"
// Payment Status: "Verified", "Pending", "Expired"
```

### Query Examples:

```javascript
// Cari worker berdasarkan Iqamah
=FILTER(Workers!A:N, Workers!B:B = "2134567890")

// Hitung total worker terdaftar
=COUNTA(Workers!B2:B)

// Hitung worker dengan payment verified
=COUNTIF(Workers!K:K, "Verified")
```

---

## ⚖️ SHEET 2: LAWYERS

**Tujuan:** Menyimpan profil dan data semua advokat

### Kolom Structure:

| No | Column Name | Type | Size | Description | Example |
|----|------------|------|------|-------------|---------|
| A | Timestamp | DateTime | - | Auto-generated | 2026-01-15 11:00:00 |
| B | Iqamah | Text | 10 | Nomor identitas advokat | 1234567890 |
| C | Full Name | Text | 100 | Nama lengkap | Dr. Muhammad Al-Rashid |
| D | Email | Text | 100 | Email kantor | doctor@lawfirm.com |
| E | Phone | Text | 20 | Nomor telepon | +966502222222 |
| F | Password (Hashed) | Text | 64 | Password terenkripsi | b2c3d4e5f6a7... |
| G | License Number | Text | 50 | Nomor lisensi praktik | SBL-2025-001234 |
| H | Experience Years | Number | - | Tahun pengalaman | 12 |
| I | Law Firm | Text | 100 | Nama firma hukum | Al-Rashid & Partners |
| J | Status | Text | 20 | Approval status | Approved / Pending |
| K | Registration Date | DateTime | - | Tanggal registrasi | 2026-01-15 |
| L | License Document Link | URL | - | Dokumen lisensi | https://drive.google.com/file/... |
| M | Total Cases | Number | - | Jumlah kasus | 42 |
| N | Cases Solved | Number | - | Kasus yang resolved | 38 |

### Sample Data:

```
Timestamp | Iqamah | Full Name | Email | Phone | License | Experience | Law Firm | Status | Reg Date | License Doc | Total Cases | Solved
2026-01-15 11:00 | 1234567890 | Dr. Muhammad Al-Rashid | dr@lawfirm.com | +966502222222 | SBL-2025-001234 | 12 | Al-Rashid & Partners | Approved | 2026-01-15 | [URL] | 42 | 38
2026-01-16 13:45 | 1987654321 | Adv. Fatima Al-Zahra | fatima@lawfirm2.com | +966503333333 | SBL-2025-005678 | 8 | Zahra Legal | Pending | 2026-01-16 | [URL] | 5 | 3
```

### Data Validation:

```javascript
// Status: "Approved" atau "Pending Approval"
// Experience: angka positif
// License Number: format SBL-YYYY-XXXXXX
```

### Query Examples:

```javascript
// Hitung total lawyer
=COUNTA(Lawyers!B2:B)

// Cari lawyer dengan pengalaman > 10 tahun
=FILTER(Lawyers!A:N, Lawyers!H:H > 10)

// Lawyer dengan case solved terbanyak
=SORT(Lawyers!A:N, Lawyers!N:N, FALSE)
```

---

## 💳 SHEET 3: PAYMENTS

**Tujuan:** Mencatat semua transaksi pembayaran iuran

### Kolom Structure:

| No | Column Name | Type | Size | Description | Example |
|----|------------|------|------|-------------|---------|
| A | Timestamp | DateTime | - | Waktu pembayaran dicatat | 2026-01-15 15:45:30 |
| B | Worker Iqamah | Text | 10 | Referensi ke Workers | 2134567890 |
| C | Worker Name | Text | 100 | Nama pekerja | Siti Aminah |
| D | Payment Amount (SAR) | Number | - | Nominal pembayaran | 99 |
| E | Payment Method | Text | 30 | Metode pembayaran | Bank Transfer / Mobile Wallet |
| F | Receipt Document Link | URL | - | Link screenshot resi | https://drive.google.com/file/... |
| G | Payment Date | DateTime | - | Tanggal transfer | 2026-01-15 |
| H | Verification Status | Text | 20 | Status verifikasi | Verified / Pending |
| I | Verified By (Admin) | Text | 50 | Email admin yang verifikasi | admin@haqsaudi.com |
| J | Verification Date | DateTime | - | Tanggal diverifikasi | 2026-01-16 |
| K | Expiry Date | DateTime | - | Tanggal pembayaran kadaluarsa | 2027-01-15 |

### Sample Data:

```
Timestamp | Worker Iqamah | Worker Name | Amount | Method | Receipt | Payment Date | Status | Verified By | Verification Date | Expiry Date
2026-01-15 15:45 | 2134567890 | Siti Aminah | 99 | Bank Transfer | [URL] | 2026-01-15 | Verified | admin@haq.com | 2026-01-16 | 2027-01-15
2026-01-16 10:20 | 2198765432 | Budi Rahman | 99 | Mobile Wallet | [URL] | 2026-01-16 | Pending | - | - | 2027-01-16
```

### Data Validation:

```javascript
// Amount: harus 99 SAR
// Status: "Verified" atau "Pending Verification"
// Payment Method: "Bank Transfer", "Mobile Wallet", "Credit Card"
// Expiry Date: auto-calculate = Payment Date + 1 year
```

### Query Examples:

```javascript
// Total revenue dari pembayaran terverifikasi
=SUMIF(Payments!H:H, "Verified", Payments!D:D)

// Pembayaran yang akan expire dalam 30 hari
=FILTER(Payments!A:K, 
  Payments!K:K <= TODAY()+30, 
  Payments!K:K > TODAY())

// Hitung pembayaran pending
=COUNTIF(Payments!H:H, "Pending Verification")
```

---

## 📁 SHEET 4: DOCUMENTS

**Tujuan:** Tracking semua file yang diupload users

### Kolom Structure:

| No | Column Name | Type | Size | Description | Example |
|----|------------|------|------|-------------|---------|
| A | Timestamp | DateTime | - | Waktu upload | 2026-01-15 16:30:00 |
| B | User Iqamah | Text | 10 | Siapa yang upload | 2134567890 |
| C | User Type | Text | 20 | Worker atau Lawyer | Worker |
| D | Document Type | Text | 50 | Jenis dokumen | ID Card / Passport / Contract |
| E | Document Name | Text | 100 | Nama file | Siti_Aminah_Iqamah.jpg |
| F | File Link (Google Drive) | URL | - | Link file di Drive | https://drive.google.com/file/d/... |
| G | File Size (KB) | Number | - | Ukuran file | 245 |
| H | Upload Date | DateTime | - | Tanggal upload | 2026-01-15 |
| I | Status | Text | 20 | Status file | Uploaded / Verified / Archived |
| J | Notes | Text | 200 | Catatan tambahan | Dokumen sudah diverifikasi |

### Sample Data:

```
Timestamp | User Iqamah | User Type | Doc Type | Doc Name | File Link | File Size | Upload Date | Status | Notes
2026-01-15 16:30 | 2134567890 | Worker | ID Card | Siti_ID.jpg | [URL] | 245 | 2026-01-15 | Verified | Clear quality
2026-01-15 17:15 | 2134567890 | Worker | Passport | Siti_Passport.pdf | [URL] | 512 | 2026-01-15 | Uploaded | Pending review
2026-01-16 09:00 | 1234567890 | Lawyer | License | DR_Muhammad_License.pdf | [URL] | 356 | 2026-01-16 | Verified | Valid cert
```

### Data Validation:

```javascript
// User Type: "Worker" atau "Lawyer"
// Status: "Uploaded", "Verified", "Archived"
// File Size: otomatis dari Google Drive API
// Supported: PDF, JPG, PNG, DOCX, XLSX
```

### Query Examples:

```javascript
// Semua dokumen dari worker tertentu
=FILTER(Documents!A:J, Documents!B:B = "2134567890")

// Total storage used (dalam MB)
=SUM(Documents!G:G) / 1024

// Dokumen yang perlu di-verify
=FILTER(Documents!A:J, Documents!I:I = "Uploaded")
```

---

## ⚖️ SHEET 5: CASES

**Tujuan:** Manajemen kasus antara worker dan lawyer

### Kolom Structure:

| No | Column Name | Type | Size | Description | Example |
|----|------------|------|------|-------------|---------|
| A | Timestamp | DateTime | - | Waktu dibuat | 2026-01-15 17:00:00 |
| B | Case ID | Text | 30 | ID unik kasus | CASE-1673799600000 |
| C | Worker Iqamah | Text | 10 | Referensi worker | 2134567890 |
| D | Worker Name | Text | 100 | Nama worker | Siti Aminah |
| E | Lawyer Iqamah | Text | 10 | Referensi lawyer | 1234567890 |
| F | Lawyer Name | Text | 100 | Nama lawyer | Dr. Muhammad Al-Rashid |
| G | Case Type | Text | 50 | Kategori kasus | Wage Issue / Contract / Harassment |
| H | Case Description | Text | 500 | Detail kasus | Belum menerima gaji selama 3 bulan |
| I | Status | Text | 20 | Status kasus | Open / In Progress / Resolved |
| J | Created Date | DateTime | - | Tanggal dibuat | 2026-01-15 |
| K | Last Updated | DateTime | - | Update terakhir | 2026-01-17 |
| L | Resolution | Text | 500 | Solusi yang diberikan | Advokat melayangkan surat teguran |
| M | Notes | Text | 200 | Catatan internal | Follow up minggu depan |

### Sample Data:

```
Case ID | Worker Iqamah | Worker Name | Lawyer Iqamah | Lawyer Name | Case Type | Description | Status | Created | Last Updated | Resolution
CASE-1673799600000 | 2134567890 | Siti Aminah | 1234567890 | Dr. Muhammad | Wage Issue | Gaji 3 bulan belum | Open | 2026-01-15 | 2026-01-17 | -
CASE-1673886000000 | 2198765432 | Budi Rahman | 1987654321 | Adv. Fatima | Contract | Kontrak tidak jelas | Resolved | 2026-01-16 | 2026-01-18 | Selesai win case
```

### Data Validation:

```javascript
// Case ID: auto-generated = "CASE-" + timestamp
// Status: "Open", "In Progress", "Resolved", "Closed"
// Case Type: "Wage Issue", "Contract", "Harassment", "Termination", "Other"
```

### Query Examples:

```javascript
// Kasus terbuka (tidak resolved)
=FILTER(Cases!A:M, Cases!I:I = "Open")

// Kasus yang ditangani lawyer tertentu
=FILTER(Cases!A:M, Cases!E:E = "1234567890")

// Statistik kasus per bulan
=COUNTIFS(Cases!J:J, ">="&DATE(2026,1,1), 
          Cases!J:J, "<="&DATE(2026,1,31))
```

---

## 💬 SHEET 6: MESSAGES

**Tujuan:** Log semua komunikasi antar pengguna

### Kolom Structure:

| No | Column Name | Type | Size | Description | Example |
|----|------------|------|------|-------------|---------|
| A | Timestamp | DateTime | - | Waktu pesan | 2026-01-15 18:30:15 |
| B | From Iqamah | Text | 10 | Pengirim | 2134567890 |
| C | From Name | Text | 100 | Nama pengirim | Siti Aminah |
| D | From Role | Text | 20 | Role pengirim | Worker / Lawyer / Admin |
| E | To Iqamah | Text | 10 | Penerima | 1234567890 |
| F | To Name | Text | 100 | Nama penerima | Dr. Muhammad |
| G | To Role | Text | 20 | Role penerima | Lawyer / Admin |
| H | Message Content | Text | 5000 | Isi pesan | Apakah saya bisa mengajukan keluhan... |
| I | Message Date | DateTime | - | Tanggal pengiriman | 2026-01-15 |
| J | Read Status | Text | 20 | Sudah dibaca? | Read / Unread |
| K | Language | Text | 10 | Bahasa pesan | id / en / ar |

### Sample Data:

```
Timestamp | From Iqamah | From Name | From Role | To Iqamah | To Name | To Role | Message Content | Date | Read Status | Language
2026-01-15 18:30 | 2134567890 | Siti Aminah | Worker | 1234567890 | Dr. Muhammad | Lawyer | Apakah saya bisa mengajukan keluhan? | 2026-01-15 | Read | id
2026-01-15 19:45 | 1234567890 | Dr. Muhammad | Lawyer | 2134567890 | Siti Aminah | Worker | Tentu saja, berikut prosesnya... | 2026-01-15 | Unread | id
```

### Data Validation:

```javascript
// Role: "Worker", "Lawyer", "Admin"
// Read Status: "Read" atau "Unread"
// Language: "id" (Indonesian), "en" (English), "ar" (Arabic)
```

### Query Examples:

```javascript
// Pesan yang belum dibaca
=FILTER(Messages!A:K, Messages!J:J = "Unread")

// Pesan dari worker ke lawyer tertentu
=FILTER(Messages!A:K, 
  Messages!B:B = "2134567890",
  Messages!E:E = "1234567890")

// Hitung jumlah pesan per user
=COUNTIF(Messages!E:E, "1234567890")
```

---

## 🔐 DATA SECURITY & PRIVACY

### Password Hashing:

```javascript
// Stored as SHA-256 hash:
function hashPassword(password) {
    return Utilities.computeDigest(
        Utilities.DigestAlgorithm.SHA_256, 
        password
    );
}
// Tidak pernah simpan plain text password!
```

### File Permissions:

- **Worker Documents:** Private to Worker + Assigned Lawyer
- **Lawyer Documents:** Private to Lawyer
- **Payment Receipts:** Private to Worker + Admin
- **Case Files:** Private to Worker + Assigned Lawyer
- **Messages:** Private to Sender + Recipient

### Data Retention:

- **Worker Data:** Simpan permanent (sampai request delete)
- **Completed Cases:** Archive setelah 2 tahun
- **Backup:** Keep 30 hari backup copies
- **Deleted Files:** Restore jika diperlukan sampai 90 hari

---

## 📊 KEY METRICS & REPORTS

### Dashboard Queries:

```javascript
// Total Registered Workers
=COUNTA(Workers!B2:B)

// Total Registered Lawyers
=COUNTA(Lawyers!B2:B)

// Total Revenue (Verified Payments)
=SUMIF(Payments!H:H, "Verified", Payments!D:D)

// Active Cases
=COUNTIF(Cases!I:I, "Open")

// Cases Resolved This Month
=COUNTIFS(Cases!K:K, ">="&DATE(2026,1,1), 
          Cases!I:I, "Resolved")

// Pending Verifications
=COUNTIF(Payments!H:H, "Pending Verification")

// Total Files Stored
=SUM(Documents!G:G)

// Average Resolution Time (days)
=AVERAGE(DAYS(Cases!K:K, Cases!J:J))
```

---

## 🔄 DATA SYNC & INTEGRATION

### Google Apps Script Integration:

```javascript
// Read from Sheets
const ss = SpreadsheetApp.openById(SHEET_ID);
const sheet = ss.getSheetByName('Workers');
const data = sheet.getDataRange().getValues();

// Write to Sheets
sheet.appendRow([new Date(), iqamah, name, ...]);

// Query/Filter
const range = sheet.getDataRange();
for (let i = 1; i < values.length; i++) {
    if (values[i][1] === iqamah) {
        // Found!
    }
}
```

### File Storage (Google Drive):

```javascript
// Upload file
const file = folder.createFile(blob);

// Get file link
const fileLink = file.getUrl();

// Set sharing
file.setSharing(DriveApp.Access.ANYONE, 
                DriveApp.Permission.VIEW);
```

---

## 📈 SCALABILITY & PERFORMANCE

### Current Limits:

- **Google Sheets:** Unlimited rows (Google handle internally)
- **Google Drive:** 15 GB (Google Account) / Unlimited (Workspace)
- **File Upload:** Max 10 MB per file
- **Daily API Calls:** 50,000 (Google Apps Script)

### Optimization Tips:

1. **Archive old data** setiap 6 bulan
2. **Delete cached files** yang sudah di-backup
3. **Use filtering** untuk query besar
4. **Implement pagination** di frontend untuk large lists
5. **Cache frequently accessed data** di script properties

---

## 🛠️ MAINTENANCE SCRIPTS

### Backup Automation:

```javascript
// Run daily via trigger
function dailyBackup() {
    backupAllData(); // Defined in Code.gs
}

// Run monthly cleanup
function monthlyCleanup() {
    archiveOldCases();
    deleteExpiredDocuments();
}
```

---

## 📝 DATABASE DOCUMENTATION

**Last Updated:** 2026  
**Schema Version:** 1.0  
**Compatibility:** Google Sheets API v4  

Untuk update atau perubahan schema, update dokumentasi ini dan inform semua stakeholders.

---

**Happy Data Management!** 📊✨

