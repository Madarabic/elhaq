# ✨ HAQ SAUDI PREMIUM — Feature Reference & Usage Guide

---

## 📋 DAFTAR ISI
1. [Fitur Umum](#fitur-umum)
2. [Portal Worker/PMI](#portal-worker)
3. [Portal Advokat](#portal-lawyer)
4. [Portal Admin](#portal-admin)
5. [Fitur Multilingual](#multilingual)
6. [File Management](#file-management)
7. [Payment & Verification](#payment)
8. [Case Management](#cases)
9. [Messaging System](#messaging)
10. [Admin Features](#admin-features)

---

## 🌟 Fitur Umum {#fitur-umum}

### 1. **Language Selector** 🌍
- **Lokasi:** Header atas portal
- **Bahasa tersedia:** 
  - 🇮🇩 Bahasa Indonesia (Default)
  - 🇬🇧 English (Inggris)
  - 🇸🇦 العربية (Arabic)
- **Cara pakai:**
  1. Klik dropdown "BAHASA" di header
  2. Pilih bahasa yang diinginkan
  3. Semua teks otomatis berubah
- **Note:** Pilihan bahasa tersimpan per session

---

### 2. **User Profile & Avatar** 👤
- **Tampil di:** Header navigation
- **Informasi:**
  - Nama pengguna
  - Role (Worker/Lawyer/Admin)
  - Avatar huruf pertama nama
- **Aksi:**
  - Klik logout untuk keluar dari portal

---

### 3. **Landing Page** 🏠
- **Konten:**
  - Deskripsi sistem
  - 3 kartu role dengan deskripsi
  - Call-to-action untuk registrasi
- **Akses:** Klik logo HAQ SAUDI untuk kembali

---

## 💼 Portal Worker / PMI {#portal-worker}

### 1. **Status Subscription** 📊

```
┌─────────────────────────────────────┐
│ Selamat Datang, Pekerja PMI!       │
│ Status: AKTIF (99 SAR Verifikasi)  │
└─────────────────────────────────────┘
```

**Kemungkinan Status:**
- 🔴 **MENUNGGU VERIFIKASI (99 SAR)** - Belum upload pembayaran
- 🟡 **PEMBAYARAN PENDING** - Sudah upload, menunggu verifikasi admin
- 🟢 **AKTIF (99 SAR Verifikasi)** - Pembayaran terverifikasi, akses penuh

---

### 2. **Upload Pembayaran** 💳

**Step-by-step:**

1. **Klik tombol** "Upload Pembayaran"
2. **Modal akan muncul dengan form upload**
3. **Pilih file PDF/JPG** dari resi transfer
4. **File harus:**
   - Format: PDF, JPG, atau PNG
   - Maksimal ukuran: 10 MB
   - Terlihat jelas resi/bukti transfer 99 SAR
5. **Klik "Upload File"**
6. **Tunggu notifikasi** "✅ File berhasil diupload"

**Apa yang terjadi setelahnya:**
- File disimpan di Google Drive
- Notifikasi terkirim ke admin untuk verifikasi
- Admin akan approve dalam 1-2 jam kerja
- Email konfirmasi akan dikirim ke Anda

---

### 3. **Konsultasi Advokat** 💬

**Chat Real-time dengan Advokat:**

1. **Buka tab:** "Konsultasi Advokat"
2. **Status badge akan menunjukkan:**
   - 🔴 "Advokat Offline" - Tidak ada yang online
   - 🟢 "Advokat Online" - Ada yang siap membantu
3. **Ketik pertanyaan Anda** di text area
4. **Pertanyaan bisa dalam:**
   - Bahasa Indonesia
   - Bahasa Arab
   - Bahasa Inggris (advokat akan menterjemahkan)
5. **Klik "Kirim Pertanyaan"**
6. **Tunggu balasan advokat** (biasanya 24 jam)

**Contoh Pertanyaan:**
```
"Saya belum menerima gaji selama 3 bulan. 
Apa yang bisa saya lakukan?"

"I haven't received my salary for 3 months. 
What can I do?"

"لم أتلق راتبي منذ 3 أشهر. ماذا يمكنني أن أفعل؟"
```

---

### 4. **Informasi Penting** ℹ️

Pannel info menampilkan:
- ✅ Biaya konsultasi: 99 SAR per tahun
- ✅ Respons advokat dalam 24 jam kerja
- ✅ Semua dokumen disimpan aman di cloud
- ✅ Confidential dan aman

---

### 5. **Dokumen Saya** 📄

**Kelola semua dokumen Anda:**

**Dokumen yang bisa diupload:**
- ✅ Kartu Identitas (ID Card/Iqamah)
- ✅ Paspor (Passport)
- ✅ Kontrak Kerja (Work Contract)
- ✅ Surat Ijin Kerja
- ✅ Slip Gaji
- ✅ Dokumen lain yang relevan

**Cara upload:**
1. **Klik "Tambah Dokumen"**
2. **Pilih jenis dokumen** dari dropdown (jika ada)
3. **Upload file** PDF/JPG
4. **Dokumen tersimpan** di cloud Google Drive
5. **Bisa diakses kapan saja**

**Note:**
- Semua dokumen private (hanya Anda & advokat yang bisa lihat)
- Backup otomatis di Google Drive
- Tidak pernah dihapus tanpa izin

---

## ⚖️ Portal Advokat / Lawyer {#portal-lawyer}

### 1. **Dashboard Workspace** 📊

Menampilkan:
- Jumlah kasus aktif
- Jumlah pesan masuk
- Dokumen yang perlu direview
- Statistik performa

---

### 2. **Tab: Kasus Aktif** 📋

**Menampilkan semua kasus yang ditangani:**

```
┌──────────────────────────────────────┐
│ Kasus #001 - Siti Aminah             │
│ Iqamah: 2XXXXXXX                     │
│ Status: Menunggu Balasan             │
├──────────────────────────────────────┤
│ "Pertanyaan tentang upah minimum     │
│  dan jaminan kerja..."               │
├──────────────────────────────────────┤
│ [Balas Pertanyaan]                  │
└──────────────────────────────────────┘
```

**Aksi yang bisa dilakukan:**
1. **Baca pertanyaan lengkap**
2. **Klik "Balas Pertanyaan"**
3. **Modal reply akan muncul**
4. **Ketik jawaban dalam:**
   - Bahasa Arab (Recommended - akan auto-translate ke Indonesia)
   - Bahasa Indonesia
   - Bahasa Inggris
5. **Attachment:** Bisa sertakan dokumen legal (PDF)
6. **Klik "Kirim Balasan"**

**Fitur Auto-Translate:**
- Advokat ketik dalam Bahasa Arab
- Sistem otomatis menterjemahkan ke Bahasa Indonesia
- Worker bisa baca dalam bahasa mereka
- Badge "Diterjemahkan Otomatis" tampil

---

### 3. **Tab: Pesan** 💌

**Komunikasi langsung dengan workers:**

- Daftar pesan masuk dari berbagai worker
- Bisa reply langsung
- Thread conversation tersimpan
- Notifikasi untuk pesan baru

---

### 4. **Tab: Dokumen** 📁

**Perpustakaan dokumen & template:**

**Template yang tersedia:**
- ✅ Legal Opinion Template
- ✅ Complaint Letter Template
- ✅ Demand Letter Template
- ✅ Settlement Agreement Template
- ✅ Case Summary Template

**Fungsi:**
1. **Download template** untuk digunakan
2. **Upload dokumen baru** ke library
3. **Bagikan dokumen** dengan worker tertentu

---

## 🔐 Portal Admin {#portal-admin}

### 1. **Dashboard Statistics** 📊

**Menampilkan:**
- 👥 **Total Pekerja:** Jumlah semua worker terdaftar
- ⚖️ **Total Advokat:** Jumlah lawyer dalam sistem
- ✅ **Sudah Verifikasi:** Berapa banyak pembayaran terverifikasi
- ⏳ **Menunggu Verifikasi:** Berapa banyak pembayaran pending

**Contoh:**
```
┌────────┬────────┬────────┬────────┐
│ 42     │ 12     │ 38     │ 4      │
│ Pekerja│Advokat │Verif.  │Pending │
└────────┴────────┴────────┴────────┘
```

---

### 2. **Verifikasi Pembayaran** ✅

**Tabel lengkap dengan:**
- Nomor Iqamah worker
- Nama lengkap
- Status pembayaran (Menunggu/Verified)
- Tombol untuk approve

**Workflow verifikasi:**

```
1. Admin melihat worker belum verified
2. Admin cek receipt yang diupload
3. Klik "Approve" jika valid
4. Status berubah ke "Verified"
5. Email otomatis terkirim ke worker
6. Worker bisa akses konsultasi
```

**Note:**
- Semua pembayaran harus di-verify manual
- Maksimal waktu: 2 jam kerja
- Jangan approve jika resi tidak jelas

---

### 3. **Monitoring Delinquency (Tunggakan)** ⚠️

**Sistem otomatis akan:**

1. **Check setiap hari** pembayaran yang akan kadaluarsa dalam 30 hari
2. **Send reminder email** ke worker
3. **Alert di admin dashboard** jika ada yang akan overdue
4. **Pembayaran otomatis unlock** 30 hari sebelum expiry

**Email Reminder:**
```
Subject: [HAQ SAUDI] Pengingat Pembayaran - [N] Hari Tersisa

Halo [Nama],

Iuran Anda akan kadaluarsa dalam [N] hari.
Silakan lakukan perpanjangan secepatnya.

Expiry Date: [Tanggal]

Link Pembayaran: [URL]
```

---

### 4. **User Management** 👥

**Admin bisa:**
- ✅ Lihat semua data worker (Iqamah, Nama, Email, Phone, Status)
- ✅ Lihat semua data advokat (License, Firma, Experience, Status)
- ✅ Deactivate/suspend akun jika diperlukan
- ✅ Reset password jika user lupa
- ✅ Export data ke CSV

---

### 5. **Case Analytics** 📈

**Statistics tentang kasus:**
- Total kasus dibuka
- Kasus yang resolved
- Average resolution time
- Rating advokat
- Worker satisfaction score

---

## 🌐 Fitur Multilingual {#multilingual}

### Cara Kerja 3 Bahasa:

#### 1. **Interface Language (UI)**
- Semua teks, button, label berubah otomatis
- **Pilih di dropdown** "BAHASA" di header
- Translasi live tanpa reload page

#### 2. **Auto-Translate Messages**
- **Worker mengirim dalam Bahasa Indonesia**
- **Advokat menjawab dalam Bahasa Arab**
- **Sistem otomatis translate ke Bahasa Indonesia**
- **Badge:** "Diterjemahkan Otomatis" tampil

#### 3. **Multilingual Documents**
- Dokumen bisa di-upload dalam bahasa apapun
- Advokat bisa menambah note dalam berbagai bahasa
- Chat history tersimpan dengan language code

### Contoh Message Flow:

```
WORKER (Indonesia):
"Berapa gaji minimum di Saudi Arabia untuk PMI?"

↓ [Message tersimpan dengan language: 'id']

LAWYER (Arabic):
"الحد الأدنى للأجور في المملكة العربية السعودية هو..."

↓ [System auto-translate Arab → Indonesian]

WORKER (Lihat):
"[Terjemahan] Gaji minimum di Arab Saudi adalah... 
[Teks Asli Arab] الحد الأدنى..."
```

---

## 📁 File Management {#file-management}

### File Hosting di Google Drive:

**Folder Structure Otomatis:**
```
HAQ SAUDI Files/
├── Worker Documents/       → Dokumen pekerja
├── Lawyer Documents/       → Dokumen advokat
├── Payment Receipts/       → Resi pembayaran
├── Legal Documents/        → Opini hukum & dokumen legal
├── Case Files/             → File per kasus
└── Backup/                 → Backup otomatis
```

### Upload Features:

**Format File Supported:**
- ✅ PDF (Recommended)
- ✅ JPG / JPEG
- ✅ PNG
- ✅ DOC / DOCX
- ✅ XLSX (Excel)

**Batasan:**
- Maksimal file size: **10 MB**
- Maksimal total per user: **1 GB** (auto-cleanup after 1 year)

### File Sharing:

**Default Settings:**
- Worker documents: Private (hanya worker + assigned lawyer)
- Lawyer documents: Private (hanya lawyer)
- Payment receipts: Private (worker + admin)
- Legal documents: Public dalam case

---

## 💳 Payment & Verification {#payment}

### Payment Flow:

```
┌─────────────────────────────────────────────┐
│ 1. WORKER UPLOAD PAYMENT                   │
│    ✓ Klik "Upload Pembayaran"              │
│    ✓ Pilih screenshot/foto resi transfer   │
│    ✓ Amount: 99 SAR                        │
│    ✓ Click "Upload"                        │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│ 2. FILE SAVED TO GOOGLE DRIVE               │
│    ✓ Auto-saved dengan nama: [Iqamah]_[Date] │
│    ✓ Backup otomatis                       │
│    ✓ Link terekam di Google Sheets         │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│ 3. NOTIFICATION TO ADMIN                   │
│    ✓ Email: Pembayaran baru dari Iqamah   │
│    ✓ Link ke file receipt                  │
│    ✓ Highlighted di admin dashboard        │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│ 4. ADMIN VERIFICATION                      │
│    ✓ Review receipt                        │
│    ✓ Cek nominal (99 SAR)                  │
│    ✓ Klik "Approve" atau "Reject"         │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│ 5. CONFIRMATION EMAIL TO WORKER            │
│    ✓ Status updated: "VERIFIED"            │
│    ✓ Access granted otomatis               │
│    ✓ Expiry date: 1 tahun kemudian         │
└─────────────────────────────────────────────┘
```

### Payment Methods Accepted:

- 💰 **Bank Transfer:** Langsung ke rekening firma hukum
- 📱 **Mobile Wallet:** STC Pay, Zain Cash (if available)
- 🏦 **Saudi IBAN:** Nomor rekening khusus Saudi Arabia
- 💳 **Credit Card:** Via payment gateway (Telr, PayTabs)

### Expiry & Renewal:

**Pembayaran berlaku selama 1 tahun:**
- Start date: Tanggal verification
- Expiry date: +1 tahun otomatis
- Alert dikirim 30 hari sebelum expiry
- Bisa renew kapan saja sebelum expiry

---

## ⚖️ Case Management {#cases}

### Case Lifecycle:

```
OPEN → IN PROGRESS → RESOLVED → CLOSED
```

### Case Status:

- 🔴 **Open:** Case baru, belum ada balasan
- 🟡 **In Progress:** Sedang dalam proses
- 🟢 **Resolved:** Ada solusi/jawaban
- ⚫ **Closed:** Ditutup oleh lawyer/worker

### Case Details Tracked:

- **Case ID:** CASE-[timestamp]
- **Worker Name & Iqamah**
- **Assigned Lawyer & Iqamah**
- **Case Type:** Upah, Kontrak, Harassment, dll
- **Description:** Detail kasus
- **Created Date:** Kapan dibuat
- **Last Updated:** Perubahan terakhir
- **Resolution:** Solusi yang diberikan

---

## 💬 Messaging System {#messaging}

### Message Features:

**Supported:**
- ✅ Text message (unlimited length)
- ✅ File attachment (PDF, JPG)
- ✅ Multi-language support
- ✅ Read receipts
- ✅ Message history (tersimpan permanent)

**Message Types:**
- Worker ↔ Lawyer (Consultation)
- Worker → Admin (Complaints)
- Lawyer ↔ Admin (Coordination)
- Admin → All (Announcements)

### Message Notifications:

- Email notification untuk pesan baru
- Push notification (jika app)
- Desktop notification
- Sound alert (configurable)

---

## 🔧 Admin Features {#admin-features}

### Advanced Admin Functions:

**1. Bulk Operations**
```javascript
- Export all worker data (CSV)
- Export all payment records
- Generate monthly reports
- Bulk email workers
```

**2. System Monitoring**
```javascript
- Real-time stats dashboard
- API usage monitoring
- Storage usage tracking
- User activity logs
```

**3. Backup & Recovery**
```javascript
- Daily automatic backup to Google Drive
- Manual backup on demand
- 30-day backup retention
- One-click restore function
```

**4. Security & Access**
```javascript
- 2FA (2-Factor Authentication)
- IP whitelist configuration
- Session management
- Login history audit
```

**5. Communication**
```javascript
- Bulk SMS/Email campaigns
- Auto-responders
- Email templates
- Message scheduling
```

---

## 🆘 Help & Support

### Frequently Asked Questions:

**Q: Bagaimana jika saya lupa password?**
A: Klik "Forgot Password" → Email reset akan dikirim

**Q: Berapa biaya konsultasi?**
A: 99 SAR per tahun untuk unlimited consultation

**Q: Seberapa cepat respons advokat?**
A: Maksimal 24 jam kerja

**Q: Apakah dokumen saya aman?**
A: Ya, tersimpan aman di Google Drive dengan enkripsi

**Q: Bagaimana jika pembayaran saya ditolak?**
A: Admin akan menghubungi via email/WhatsApp

---

## 📊 System Requirements

**Browser Compatibility:**
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

**Device Support:**
- ✅ Desktop (Windows, Mac, Linux)
- ✅ Tablet (iPad, Android)
- ✅ Mobile (iPhone, Android)

**Internet:**
- Minimal 1 Mbps
- Stabil untuk upload file

---

## 🎯 Success Tips

1. **Lengkapi profil** dengan data yang benar
2. **Upload dokumen penting** sejak awal
3. **Bayar iuran tepat waktu** untuk akses tanpa terputus
4. **Gunakan Bahasa Indonesia** untuk komunikasi yang jelas
5. **Simpan file copy** dari semua dokumen penting
6. **Aktifkan email notifications** untuk update
7. **Konsultasi segera** jika ada masalah

---

**Selamat menggunakan HAQ SAUDI Premium Portal!** 🎉

Semoga sistem ini membantu memberikan perlindungan hukum yang lebih baik untuk semua pekerja migran.

**Masya Allah ✨**
