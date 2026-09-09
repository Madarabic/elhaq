# ⚡ HAQ SAUDI PREMIUM — Quick Start Checklist (30 Menit)

Panduan cepat untuk membuat portal live dalam 30 menit!

---

## 📦 FILE YANG DIBUTUHKAN

Anda sudah punya:
- ✅ `haq-saudi-premium.html` — Frontend portal (4KB)
- ✅ `Code.gs` — Backend Google Apps Script (15KB)
- ✅ `SETUP_GUIDE.md` — Dokumentasi lengkap
- ✅ `FEATURES_REFERENCE.md` — Reference fitur
- ✅ `QUICK_START.md` — File ini

---

## ⏱️ TIMELINE: 30 MENIT

```
├─ 00:00-05:00  → Setup Google Sheet & Drive
├─ 05:00-12:00  → Setup Google Apps Script
├─ 12:00-18:00  → Deploy & Test
├─ 18:00-25:00  → Setup GitHub Pages
└─ 25:00-30:00  → Final Testing & Go Live
```

---

## 🚀 STEP 1: GOOGLE SHEETS & DRIVE (5 MENIT)

### 1️⃣ Buat Google Sheet

- [ ] Buka https://sheets.google.com
- [ ] Klik "New Spreadsheet"
- [ ] Rename: `HAQ SAUDI - Master Database`
- [ ] **COPY SHEET ID** dari URL:
  ```
  https://docs.google.com/spreadsheets/d/[SHEET_ID_ANDA]/edit
  ```

### 2️⃣ Buat Google Drive Folder

- [ ] Buka https://drive.google.com
- [ ] Klik "New Folder"
- [ ] Nama: `HAQ SAUDI Files`
- [ ] **COPY FOLDER ID** dari URL:
  ```
  https://drive.google.com/drive/folders/[FOLDER_ID_ANDA]
  ```

✅ **Waktu: 5 menit**

---

## 🔧 STEP 2: GOOGLE APPS SCRIPT (7 MENIT)

### 1️⃣ Buka Script Editor

- [ ] Buka Sheet Anda (HAQ SAUDI - Master Database)
- [ ] Klik menu: **Tools > Script Editor**

### 2️⃣ Paste Google Apps Script Code

- [ ] Copy semua kode dari file `Code.gs`
- [ ] Paste di script editor (ganti semua yang ada)
- [ ] **GANTI CONFIGURATION:**

```javascript
const SHEET_ID = 'PASTE_SHEET_ID_ANDA_DI_SINI';
const DRIVE_FOLDER_ID = 'PASTE_FOLDER_ID_ANDA_DI_SINI';
const ADMIN_EMAIL = 'admin@example.com'; // Email Anda
```

### 3️⃣ Run Setup Functions

- [ ] Di dropdown "Select function", pilih: `setupGoogleSheets`
- [ ] Klik tombol **Run** (▶)
- [ ] **Approve permissions** yang muncul
- [ ] Tunggu log: `✓ Google Sheets berhasil diinisialisasi!`
- [ ] Ulangi untuk: `setupGoogleDrive()`
- [ ] Cek Google Sheet — seharusnya ada 6 sheet baru

### 4️⃣ Deploy Web App

- [ ] Klik: **Deploy > New Deployment**
- [ ] Select type: **Web app**
- [ ] Execute as: **Your email**
- [ ] Who has access: **Anyone**
- [ ] Klik **Deploy**
- [ ] **COPY WEB APP URL:**
  ```
  https://script.google.com/macros/d/[DEPLOYMENT_ID]/userweb
  ```
- [ ] **SIMPAN URL INI!**

✅ **Waktu: 7 menit**

---

## 🌐 STEP 3: DEPLOY & TEST (6 MENIT)

### Update HTML dengan Web App URL

- [ ] Buka file `haq-saudi-premium.html` dengan text editor
- [ ] Cari section `<script>` di bagian configuration
- [ ] **TAMBAHKAN setelah deklarasi translations:**

```javascript
// GANTI DENGAN WEB APP URL ANDA:
const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/d/YOUR_DEPLOYMENT_ID/userweb';

// Function untuk connect ke Google Apps Script
async function callGoogleScript(action, data) {
    try {
        const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
            method: 'POST',
            payload: JSON.stringify({ action, ...data })
        });
        return await response.json();
    } catch (e) {
        console.error('Error:', e);
        return { success: false, message: 'Server error' };
    }
}
```

### Test Locally

- [ ] Buka HTML file dengan browser (File > Open atau Drag & Drop)
- [ ] Coba language selector (🇮🇩 🇬🇧 🇸🇦)
- [ ] Coba klik registrasi forms
- [ ] Coba login
- [ ] Coba upload file

✅ **Waktu: 6 menit**

---

## 📤 STEP 4: GITHUB PAGES (8 MENIT)

### 1️⃣ Buat GitHub Repository

- [ ] Buka https://github.com (login atau buat akun)
- [ ] Klik **+** > **New Repository**
- [ ] **Repository name:** `haq-saudi`
- [ ] Pilih: **Public**
- [ ] ✅ Ceklis: "Add a README file"
- [ ] Klik **Create Repository**

### 2️⃣ Upload HTML File

- [ ] Buka repository yang baru dibuat
- [ ] Klik **Add file > Create new file**
- [ ] Filename: **`index.html`**
- [ ] Paste semua kode dari `haq-saudi-premium.html`
- [ ] **Scroll bawah, klik Commit changes**

### 3️⃣ Enable GitHub Pages

- [ ] Buka **Settings** (di tab atas)
- [ ] Scroll ke: **GitHub Pages**
- [ ] Source: **Deploy from a branch**
- [ ] Branch: **main** / **/ (root)**
- [ ] Klik **Save**
- [ ] **Tunggu 2-3 menit**
- [ ] GitHub akan show URL: `https://USERNAME.github.io/haq-saudi`

### 4️⃣ Test Live Portal

- [ ] Buka URL yang diberikan GitHub Pages
- [ ] Coba semua fitur (language, register, login, upload)

✅ **Waktu: 8 menit**

---

## ✅ FINAL CHECKLIST (4 MENIT)

### Sebelum Go Live:

- [ ] Google Sheet sudah dibuat & dikonfigurasi
- [ ] Google Drive folder sudah dibuat
- [ ] Google Apps Script sudah di-deploy
- [ ] Web App URL tersimpan & diupdate di HTML
- [ ] HTML sudah di-upload ke GitHub
- [ ] GitHub Pages sudah enabled
- [ ] Portal accessible via GitHub Pages URL
- [ ] Language selector berfungsi (3 bahasa)
- [ ] Test registration form (jangan submit)
- [ ] Test login form (admin demo)
- [ ] Test upload file feature
- [ ] Test message function

### Documentation:

- [ ] Baca SETUP_GUIDE.md lengkap untuk advanced setup
- [ ] Baca FEATURES_REFERENCE.md untuk semua fitur
- [ ] Simpan semua SHEET_ID, FOLDER_ID, WEB_APP_URL

---

## 🎉 PORTAL SUDAH LIVE!

Selamat! Portal Anda sekarang accessible di:

```
https://USERNAME.github.io/haq-saudi
```

---

## 📝 NEXT STEPS (Setelah Go Live)

### Minggu Pertama:

1. **Invite Users**
   - Share link ke workers
   - Share link ke lawyers
   - Share link ke admin panel

2. **Setup Email Notifications**
   - Test email registration
   - Test email verification
   - Test reminder emails

3. **Monitor First Cases**
   - Pantau registrasi pertama
   - Verifikasi pembayaran pertama
   - Test consultation workflow

4. **Collect Feedback**
   - Tanya user experience
   - Fix bugs jika ada
   - Improve UX berdasarkan feedback

### Bulan Pertama:

1. **Optimize Performance**
   - Monitor Google Sheets size
   - Setup backup schedule
   - Optimize file storage

2. **Scale Infrastructure**
   - Upgrade ke Google Workspace jika diperlukan
   - Setup more storage buckets
   - Prepare untuk growth

3. **Add Advanced Features**
   - SMS notifications (Twilio)
   - WhatsApp integration
   - Payment gateway integration
   - Analytics dashboard

---

## 🐛 QUICK TROUBLESHOOTING

### Portal tidak muncul?
```
❌ GitHub Pages URL belum siap (tunggu 3 menit)
❌ File bukan index.html
❌ Repository bukan public

✅ Solusi: Cek settings GitHub Pages
```

### Upload file error?
```
❌ Web App URL belum di-update di HTML
❌ CORS error (Web App permission belum "Anyone")
❌ File terlalu besar (>10MB)

✅ Solusi: 
1. Re-check Web App URL
2. Update permissions ke "Anyone"
3. Compress file jika perlu
```

### Email notifikasi tidak masuk?
```
❌ Google Apps Script belum di-approve
❌ ADMIN_EMAIL salah
❌ Email masuk spam folder

✅ Solusi:
1. Run function manual
2. Cek ADMIN_EMAIL configuration
3. Add email ke safe senders
```

### Registrasi data tidak tersimpan?
```
❌ SHEET_ID atau FOLDER_ID salah
❌ Google Sheets/Drive tidak di-share public
❌ Web App belum di-deploy

✅ Solusi:
1. Double-check IDs
2. Cek folder permissions
3. Re-deploy Web App
```

---

## 📞 SUPPORT & CONTACT

**Bug Report:**
- Check logs: Google Apps Script > Ctrl+Enter
- Check browser console: F12
- Check Google Sheets untuk error messages

**Feature Request:**
- Lihat FEATURES_REFERENCE.md
- Edit Code.gs untuk customization
- Deploy ulang Web App

**Community:**
- Join forum migrant worker support
- Share pengalaman dengan portal
- Help workers lain menggunakan sistem

---

## 🎓 LEARNING RESOURCES

**Google Apps Script:**
- https://developers.google.com/apps-script

**Google Sheets API:**
- https://developers.google.com/sheets/api

**GitHub Pages:**
- https://pages.github.com

**Web Development:**
- https://developer.mozilla.org/en-US/docs/Web

---

## 🙏 TERIMA KASIH

Terima kasih telah menggunakan **HAQ SAUDI Premium Portal**!

Semoga sistem ini membantu memberikan perlindungan hukum yang lebih baik untuk semua pekerja migran Indonesia di Saudi Arabia.

**Masya Allah, selamat mengembangkan portal Anda!** ✨

---

## 📊 SUMMARY

**Yang Anda dapat:**
- ✅ Full-featured legal portal (Premium)
- ✅ Worker registration system
- ✅ Lawyer management dashboard
- ✅ Admin verification panel
- ✅ Document storage di Google Drive
- ✅ Multilingual support (3 bahasa)
- ✅ Email notifications otomatis
- ✅ Backup & security built-in
- ✅ 24/7 uptime via GitHub Pages + Google Workspace
- ✅ Scalable infrastructure

**Dalam waktu:** ⏱️ **30 Menit**

**Dengan biaya:** 💰 **GRATIS** (Untuk tier Google Workspace gratis)

**Maintenance:** 📅 **Minimal** (Automated backups & notifications)

---

**Versi:** 1.0.0 PREMIUM  
**Status:** ✅ Production Ready  
**Last Updated:** 2026  

**Made with ❤️ for Migrant Workers Protection**

