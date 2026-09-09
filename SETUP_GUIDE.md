# 🔐 HAQ SAUDI PREMIUM — Setup Guide Lengkap

## ⚡ Quick Summary

Sistem portal hukum premium untuk migrant workers dengan:
- ✅ Registrasi Worker & Lawyer lengkap
- ✅ Upload PDF/JPG untuk semua dokumen
- ✅ 3 Bahasa (Indonesia, English, Arabic)
- ✅ Login dengan Iqamah & Password
- ✅ Google Sheets untuk data management
- ✅ Google Drive untuk file storage
- ✅ Google Apps Script untuk backend
- ✅ GitHub Pages untuk hosting

---

## 📋 STEP 1: Persiapan Google Workspace

### 1.1 Buat Google Sheet untuk Data Storage

1. **Buka [Google Sheets](https://sheets.google.com)**
2. **Klik "New Spreadsheet"**
3. **Rename file menjadi:** `HAQ SAUDI - Master Database`
4. **Copy ID Sheet dari URL:**
   ```
   https://docs.google.com/spreadsheets/d/SHEET_ID_ANDA/edit
   ```
   Simpan `SHEET_ID_ANDA` untuk langkah berikutnya

---

### 1.2 Buat Google Drive Folder untuk File Storage

1. **Buka [Google Drive](https://drive.google.com)**
2. **Klik "New Folder"**
3. **Beri nama:** `HAQ SAUDI Files`
4. **Klik folder tersebut**
5. **Copy URL folder:**
   ```
   https://drive.google.com/drive/folders/FOLDER_ID_ANDA
   ```
   Simpan `FOLDER_ID_ANDA`

---

## 🔧 STEP 2: Setup Google Apps Script

### 2.1 Buka Google Apps Script Editor

1. **Buka Sheet yang sudah dibuat**
2. **Klik Tools > Script Editor**
3. Atau buka langsung: [script.google.com](https://script.google.com)
4. **Klik "New Project"**

---

### 2.2 Paste Google Apps Script Code

1. **Buka file `Code.gs`** yang sudah disediakan
2. **Copy semua kode**
3. **Paste di Google Apps Script Editor**
4. **Ubah configuration:**

```javascript
// GANTI INI DENGAN DATA ANDA:
const SHEET_ID = 'PASTE_SHEET_ID_ANDA_DI_SINI';
const DRIVE_FOLDER_ID = 'PASTE_FOLDER_ID_ANDA_DI_SINI';
const ADMIN_EMAIL = 'admin@haqsaudi.com'; // Ganti email admin
```

---

### 2.3 Jalankan Setup Automation

1. **Pilih function:** `setupGoogleSheets` di dropdown
2. **Klik tombol Run (▶)**
3. **Approve permissions** yang diminta
4. **Check log:** Ctrl+Enter untuk lihat hasil
5. **Ulangi untuk:** `setupGoogleDrive()`

Jika berhasil, lihat pesan: `✓ Google Sheets berhasil diinisialisasi!`

---

### 2.4 Deploy sebagai Web App

1. **Klik:** "Deploy" > "New Deployment"
2. **Pilih type:** "Web app"
3. **Execute as:** (Email Anda)
4. **Who has access:** "Anyone"
5. **Klik "Deploy"**
6. **Copy Web App URL:** 
   ```
   https://script.google.com/macros/d/YOUR_DEPLOYMENT_ID/userweb
   ```

**PENTING:** Simpan URL ini! Akan digunakan di HTML.

---

### 2.5 Setup Scheduled Triggers (Automatic Reminders)

1. **Di Google Apps Script, klik:** Triggers (⏰)
2. **Klik:** "Add Trigger"
3. **Pilih:**
   - Function: `dailyDelinquencyCheck`
   - Deployment: `Head`
   - Event: `Time-driven`
   - Type: `Day timer`
   - Time: `9:00 AM - 10:00 AM` (waktu yang diinginkan)
4. **Klik Save**

Ini akan otomatis kirim reminder ke worker setiap hari pada jam 9 pagi.

---

## 🌐 STEP 3: Setup GitHub Pages Hosting

### 3.1 Persiapan GitHub Repository

1. **Buka [GitHub.com](https://github.com)**
2. **Login atau buat akun**
3. **Klik "+" > "New Repository"**
4. **Nama repository:** `haq-saudi` (atau nama lain)
5. **Ceklis:** "Add a README file"
6. **Klik "Create Repository"**

---

### 3.2 Upload HTML File

1. **Buka repository yang dibuat**
2. **Klik "Add file" > "Create new file"**
3. **Nama file:** `index.html`
4. **Paste kode HTML** dari file `haq-saudi-premium.html`
5. **Di HTML, GANTI di bagian atas script:**

```javascript
// TAMBAHKAN INI SETELAH KONFIGURASI BAHASA:
const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/d/YOUR_DEPLOYMENT_ID/userweb';

// FUNCTION UNTUK CONNECT KE GOOGLE APPS SCRIPT:
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

6. **Klik "Commit changes"**

---

### 3.3 Enable GitHub Pages

1. **Buka repository settings**
2. **Scroll ke:** "GitHub Pages"
3. **Pilih branch:** `main`
4. **Pilih folder:** `/ (root)`
5. **Klik Save**
6. **Tunggu beberapa menit**
7. **Buka:** `https://USERNAME.github.io/haq-saudi`

Selesai! Portal sudah live! 🎉

---

## 📱 STEP 4: Integrasi Frontend dengan Backend

### 4.1 Update HTML Registration Form

Di file HTML, update function `handleRegistration`:

```javascript
async function handleRegistration(event) {
    event.preventDefault();
    
    const data = {
        action: document.getElementById('reg-role').value === 'worker' ? 'registerWorker' : 'registerLawyer',
        iqamah: document.getElementById('reg-iqamah').value,
        name: document.getElementById('reg-fullname').value,
        email: document.getElementById('reg-email').value,
        password: document.getElementById('reg-password').value,
        phone: document.getElementById('reg-phone').value
    };
    
    // Worker fields
    if (document.getElementById('reg-role').value === 'worker') {
        data.workplace = document.getElementById('reg-workplace').value;
        data.nationality = document.getElementById('reg-nationality').value;
    }
    
    // Lawyer fields
    if (document.getElementById('reg-role').value === 'lawyer') {
        data.license = document.getElementById('reg-license').value;
        data.experience = document.getElementById('reg-experience').value;
        data.lawFirm = document.getElementById('reg-law-firm').value;
    }
    
    const result = await callGoogleScript(data.action, data);
    
    if (result.success) {
        alert('✅ Registrasi berhasil! Silakan login.');
        closeRegisterModal();
    } else {
        alert('❌ Error: ' + result.message);
    }
}
```

---

### 4.2 Update HTML Login Form

```javascript
async function handleLogin(event) {
    event.preventDefault();
    
    const iqamah = document.getElementById('login-iqamah').value;
    const password = document.getElementById('login-password').value;
    
    // Kirim ke Google Apps Script untuk verifikasi
    // (Ini bisa dilakukan di backend sheet untuk keamanan)
    
    // Untuk demo, gunakan validation lokal atau:
    const result = await callGoogleScript('verifyLogin', { 
        iqamah, 
        password 
    });
    
    if (result.success) {
        currentUser = result.user;
        closeLoginModal();
        initSession();
    } else {
        alert('Iqamah atau password salah!');
    }
}
```

---

### 4.3 Update HTML Payment Upload

```javascript
async function handleUpload(event) {
    event.preventDefault();
    
    const file = document.getElementById('upload-file-input').files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('iqamah', currentUser.iqamah);
    formData.append('fileType', 'payment_receipt');
    
    try {
        // Upload ke Google Drive via Google Apps Script
        const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
            method: 'POST',
            payload: JSON.stringify({
                action: 'uploadFile',
                iqamah: currentUser.iqamah,
                fileName: file.name,
                fileSize: file.size
            })
        });
        
        const result = await response.json();
        if (result.success) {
            // Catat pembayaran di Sheets
            await callGoogleScript('recordPayment', {
                iqamah: currentUser.iqamah,
                name: currentUser.name,
                amount: 99,
                method: 'transfer',
                receiptLink: result.fileLink
            });
            
            alert('✅ Pembayaran berhasil diupload! Menunggu verifikasi admin.');
            closeUploadModal();
        }
    } catch (e) {
        alert('❌ Error: ' + e.message);
    }
}
```

---

## 📊 STEP 5: Setup Google Sheet Structure

### Lembar yang Akan Dibuat Otomatis:

**1. Workers Sheet**
- Iqamah | Full Name | Email | Phone | Password | Workplace | Nationality | Status | Payment Status

**2. Lawyers Sheet**
- Iqamah | Full Name | Email | Phone | Password | License | Experience | Law Firm | Status | Cases

**3. Payments Sheet**
- Iqamah | Amount | Method | Receipt Link | Status | Verification Date | Expiry Date

**4. Documents Sheet**
- Iqamah | Doc Type | Document Name | File Link | Upload Date | Status

**5. Cases Sheet**
- Case ID | Worker | Lawyer | Type | Description | Status | Created Date

**6. Messages Sheet**
- From | To | Message | Date | Language | Read Status

---

## 🔐 STEP 6: Security Best Practices

### 6.1 Proteksi Password
```javascript
function hashPassword(password) {
    return Utilities.computeDigest(
        Utilities.DigestAlgorithm.SHA_256, 
        password
    );
}
```

### 6.2 CORS Headers (untuk komunikasi antar domain)
```javascript
// Di Google Apps Script doPost:
const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
};
```

### 6.3 Validasi Input
- Selalu validasi Iqamah format (10 digit)
- Cek email valid sebelum disimpan
- Minimal password 8 karakter
- Maksimal file upload 10MB

---

## 📧 STEP 7: Email Configuration

### Admin Notifications Template:

**New Payment:**
```
Subject: [HAQ SAUDI] Pembayaran Baru - Iqamah XXX
Body: 
Worker: [Nama]
Amount: 99 SAR
Receipt: [Link]
Verification: [Link ke Admin Panel]
```

**Delinquency Reminder:**
```
Subject: [HAQ SAUDI] Pengingat Pembayaran - [N] Hari Tersisa
Body:
Halo [Nama],
Masa aktif Anda akan kadaluarsa dalam [N] hari.
Silakan lakukan perpanjangan: [Link Pembayaran]
```

---

## 🚀 STEP 8: Deployment Checklist

- [ ] Google Sheet dibuat dan dikonfigurasi
- [ ] Google Drive folder dibuat
- [ ] Google Apps Script dikonfigurasi dengan Sheet & Folder ID
- [ ] All functions berhasil dijalankan (setupGoogleSheets, setupGoogleDrive)
- [ ] Web App sudah di-deploy dan URL tersimpan
- [ ] GitHub repository dibuat
- [ ] HTML file diupload ke GitHub
- [ ] GitHub Pages diaktifkan
- [ ] URL GitHub Pages accessible
- [ ] HTML sudah update dengan Google Apps Script URL
- [ ] Test registration form
- [ ] Test login
- [ ] Test payment upload
- [ ] Triggered emails berfungsi
- [ ] Admin dashboard menampilkan data

---

## 🐛 Troubleshooting

### Error: "Script authorization required"
✓ Buka Google Apps Script > Run > Approve permissions

### Error: "Sheet not found"
✓ Pastikan SHEET_ID di Code.gs benar

### Error: "Drive folder not found"
✓ Pastikan DRIVE_FOLDER_ID di Code.gs benar dan folder shared publicly

### Error: "CORS error"
✓ Pastikan Web App deployment "Who has access" = "Anyone"

### GitHub Pages tidak muncul
✓ Tunggu 2-3 menit setelah deployment
✓ Hard refresh (Ctrl+Shift+R) browser
✓ Pastikan file bernama `index.html`

---

## 📈 Advanced Features (Optional)

### 1. SMS Notifications
```javascript
function sendSMS(phoneNumber, message) {
    // Gunakan Twilio API
    // Dokumentasi: https://www.twilio.com/docs
}
```

### 2. WhatsApp Integration
```javascript
function sendWhatsApp(phoneNumber, message) {
    // Gunakan WhatsApp Business API
    // Atau Twilio WhatsApp
}
```

### 3. Auto-Translate dengan Google Translate API
```javascript
function translateText(text, targetLanguage) {
    return LanguageApp.translate(text, 'id', targetLanguage);
}
```

### 4. Dashboard Analytics
```javascript
function getMonthlyStats() {
    // Generate report dengan grafik
    // Gunakan Google Charts API
}
```

---

## 📞 Support & Contact

**Issues?** 
- Check Google Apps Script logs: `Ctrl+Enter`
- Read error messages carefully
- Check SHEET_ID dan FOLDER_ID format

**Features Request?**
- Ini adalah PREMIUM version
- Semua fitur sudah included

---

## 📝 License

Sistem HAQ SAUDI - Khusus untuk Perlindungan Pekerja Migran
© 2026 - All Rights Reserved

---

**Terima kasih telah menggunakan HAQ SAUDI Premium!** 🙏

Semoga sistem ini membantu melindungi dan memberikan akses hukum yang lebih baik untuk migrant workers di Saudi Arabia.

**Masya Allah, selamat mengembangkan!** ✨
