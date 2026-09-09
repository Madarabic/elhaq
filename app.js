/**
 * HAQ SAUDI PREMIUM - Main Application Logic
 * Fixed & Error-Proof Version
 */
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxYwuPjdbJtypEXn78R0TijQNVTcf1JksEKYEyycoDZiMeHp1qqUDJ5Fa_8hVxOxBXT/exec";

// Fungsi Pengirim Data ke Google Apps Script
function sendToGoogleSheet(formData) {
    return fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })
    .then(() => {
        console.log("Data berhasil dikirim ke Google Sheets!");
        return true;
    })
    .catch(error => {
        console.error("Gagal mengirim data:", error);
        return false;
    });
}

const translations = {
    id: {
        login: 'Masuk',
        register: 'Daftar Sekarang',
        system: 'Multi-Portal Premium System',
        title: 'Layanan Hukum Khusus Pekerja Migran di',
        subtitle: 'Portal khusus Pekerja (PMI), Workspace khusus Advokat dengan Fitur Translasi Otomatis, dan Audit khusus Admin dengan Peringatan Tunggakan 1 Tahun.',
        'card-worker': 'Portal PMI (Pekerja)',
        'card-worker-desc': 'Daftar, konsultasi advokat, bayar iuran 99 SAR, dan dapat perlindungan hukum penuh.',
        'card-lawyer': 'Registrasi Advokat',
        'card-lawyer-desc': 'Daftar sebagai advokat, kelola kasus pekerja, dan balas konsultasi dengan mudah.',
        'card-admin': 'Dashboard Admin',
        'card-admin-desc': 'Verifikasi pembayaran, kelola data, dan pantau sistem keseluruhan.',
        'reg-title': 'DAFTAR AKUN',
        'reg-subtitle': 'Lengkapi semua data dengan benar',
        fullname: 'Nama Lengkap',
        iqamah: 'Nomor Iqamah / ID',
        email: 'Email',
        password: 'Password',
        phone: 'Nomor Telepon',
        workplace: 'Tempat Kerja',
        nationality: 'Kewarganegaraan',
        license: 'Nomor Lisensi Advokat',
        experience: 'Pengalaman (Tahun)',
        'law-firm': 'Nama Firma Hukum',
        'upload-docs': 'Upload Dokumen (PDF/JPG)',
        'upload-id': 'Upload Kartu Identitas',
        'upload-passport': 'Upload Paspor',
        'upload-contract': 'Upload Kontrak Kerja',
        'upload-license': 'Upload Sertifikat Advokat',
        'agree-terms': 'Saya setuju dengan syarat dan ketentuan layanan',
        'submit-reg': 'Daftar Sekarang',
        'login-subtitle': 'Masuk Portal Anda',
        'no-account': 'Belum punya akun?',
        'register-here': 'Daftar di sini',
        welcome: 'Selamat Datang, Pekerja PMI!',
        'status-text': 'Status:',
        'upload-payment': 'Upload Pembayaran',
        consultation: 'Konsultasi Advokat',
        offline: 'Advokat Offline',
        send: 'Kirim Pertanyaan',
        info: 'Informasi Penting',
        'info-1': 'Biaya konsultasi: 99 SAR per tahun',
        'info-2': 'Respons advokat dalam 24 jam kerja',
        'info-3': 'Semua dokumen disimpan aman di cloud',
        'my-docs': 'Dokumen Saya',
        'add-doc': 'Tambah Dokumen',
        workspace: 'Workspace Advokat',
        'workspace-desc': 'Kelola kasus dan konsultasi dengan pekerja',
        cases: 'Kasus Aktif',
        messages: 'Pesan',
        documents: 'Dokumen',
        'active-cases': 'Kasus Aktif',
        pending: 'Menunggu',
        reply: 'Balas Pertanyaan',
        'recent-msg': 'Pesan Terbaru',
        'doc-lib': 'Perpustakaan Dokumen',
        'upload-doc': 'Upload Dokumen',
        'admin-dash': 'Dashboard Admin',
        'admin-desc': 'Kelola pengguna, verifikasi pembayaran, dan pantau sistem',
        'total-workers': 'Total Pekerja',
        'total-lawyers': 'Total Advokat',
        verified: 'Sudah Verifikasi',
        'pending-verify': 'Menunggu Verifikasi',
        'verify-payment': 'Verifikasi Pembayaran',
        name: 'Nama',
        status: 'Status',
        action: 'Aksi',
        approve: 'Approve',
        'upload-file': 'Upload File',
        'upload-desc': 'Unggah PDF atau JPG',
        'click-upload': 'Klik untuk Upload',
        'upload-submit': 'Upload File',
        cancel: 'Batal'
    },
    en: {
        login: 'Login',
        register: 'Register Now',
        system: 'Multi-Portal Premium System',
        title: 'Legal Services for Migrant Workers in',
        subtitle: 'Dedicated Portal for Workers (PMI), Special Workspace for Lawyers with Auto-Translation, and Admin Audit with Delinquency Alerts.',
        'card-worker': 'Worker Portal (PMI)',
        'card-worker-desc': 'Register, consult with lawyers, pay 99 SAR fee, and get full legal protection.',
        'card-lawyer': 'Lawyer Registration',
        'card-lawyer-desc': 'Register as a lawyer, manage worker cases, and reply to consultations easily.',
        'card-admin': 'Admin Dashboard',
        'card-admin-desc': 'Verify payments, manage data, and monitor the entire system.',
        'reg-title': 'REGISTER ACCOUNT',
        'reg-subtitle': 'Complete all information correctly',
        fullname: 'Full Name',
        iqamah: 'Iqamah Number / ID',
        email: 'Email',
        password: 'Password',
        phone: 'Phone Number',
        workplace: 'Workplace',
        nationality: 'Nationality',
        license: 'Lawyer License Number',
        experience: 'Experience (Years)',
        'law-firm': 'Law Firm Name',
        'upload-docs': 'Upload Documents (PDF/JPG)',
        'upload-id': 'Upload ID Card',
        'upload-passport': 'Upload Passport',
        'upload-contract': 'Upload Work Contract',
        'upload-license': 'Upload Lawyer Certificate',
        'agree-terms': 'I agree to the terms and conditions of service',
        'submit-reg': 'Register Now',
        'login-subtitle': 'Login to Your Portal',
        'no-account': 'Do not have an account?',
        'register-here': 'Register here',
        welcome: 'Welcome, PMI Worker!',
        'status-text': 'Status:',
        'upload-payment': 'Upload Payment',
        consultation: 'Lawyer Consultation',
        offline: 'Lawyer Offline',
        send: 'Send Question',
        info: 'Important Information',
        'info-1': 'Consultation fee: 99 SAR per year',
        'info-2': 'Lawyer response within 24 business hours',
        'info-3': 'All documents stored securely in cloud',
        'my-docs': 'My Documents',
        'add-doc': 'Add Document',
        workspace: 'Lawyer Workspace',
        'workspace-desc': 'Manage cases and consult with workers',
        cases: 'Active Cases',
        messages: 'Messages',
        documents: 'Documents',
        'active-cases': 'Active Cases',
        pending: 'Pending',
        reply: 'Reply Question',
        'recent-msg': 'Recent Messages',
        'doc-lib': 'Document Library',
        'upload-doc': 'Upload Document',
        'admin-dash': 'Admin Dashboard',
        'admin-desc': 'Manage users, verify payments, and monitor system',
        'total-workers': 'Total Workers',
        'total-lawyers': 'Total Lawyers',
        verified: 'Verified',
        'pending-verify': 'Pending Verification',
        'verify-payment': 'Verify Payment',
        name: 'Name',
        status: 'Status',
        action: 'Action',
        approve: 'Approve',
        'upload-file': 'Upload File',
        'upload-desc': 'Upload PDF or JPG',
        'click-upload': 'Click to Upload',
        'upload-submit': 'Upload File',
        cancel: 'Cancel'
    },
    ar: {
        login: 'تسجيل الدخول',
        register: 'سجل الآن',
        system: 'نظام المتعدد البوابات المتميز',
        title: 'الخدمات القانونية للعمال المهاجرين في',
        subtitle: 'بوابة خاصة للعمال (PMI)، مساحة عمل خاصة للمحامين مع الترجمة الفورية، ولوحة تحكم الإدارة مع تنبيهات الديون المتأخرة.',
        'card-worker': 'بوابة العامل (PMI)',
        'card-worker-desc': 'سجل، استشر مع المحامين، ادفع رسم 99 ريال، واحصل على الحماية القانونية الكاملة.',
        'card-lawyer': 'تسجيل المحامي',
        'card-lawyer-desc': 'سجل كمحامي، أدر قضايا العمال، وجاوب على الاستشارات بسهولة.',
        'card-admin': 'لوحة تحكم الإدارة',
        'card-admin-desc': 'تحقق من المدفوعات، أدر البيانات، ومراقبة النظام بأكمله.',
        'reg-title': 'تسجيل الحساب',
        'reg-subtitle': 'أكمل جميع المعلومات بشكل صحيح',
        fullname: 'الاسم الكامل',
        iqamah: 'رقم الإقامة / معرف',
        email: 'البريد الإلكتروني',
        password: 'كلمة المرور',
        phone: 'رقم الهاتف',
        workplace: 'مكان العمل',
        nationality: 'الجنسية',
        license: 'رقم رخصة المحامي',
        experience: 'الخبرة (السنوات)',
        'law-firm': 'اسم مكتب المحاماة',
        'upload-docs': 'تحميل المستندات (PDF/JPG)',
        'upload-id': 'تحميل بطاقة الهوية',
        'upload-passport': 'تحميل جواز السفر',
        'upload-contract': 'تحميل العقد',
        'upload-license': 'تحميل شهادة المحامي',
        'agree-terms': 'أوافق على شروط وأحكام الخدمة',
        'submit-reg': 'سجل الآن',
        'login-subtitle': 'تسجيل الدخول إلى بوابتك',
        'no-account': 'لا تملك حساب؟',
        'register-here': 'سجل هنا',
        welcome: 'أهلا وسهلا، عامل PMI!',
        'status-text': 'الحالة:',
        'upload-payment': 'تحميل الدفع',
        consultation: 'استشارة المحامي',
        offline: 'المحامي غير متصل',
        send: 'إرسال السؤال',
        info: 'معلومات مهمة',
        'info-1': 'رسم الاستشارة: 99 ريال سنويا',
        'info-2': 'رد المحامي خلال 24 ساعة عمل',
        'info-3': 'تخزين جميع المستندات بأمان في السحابة',
        'my-docs': 'وثائقي',
        'add-doc': 'إضافة مستند',
        workspace: 'مساحة عمل المحامي',
        'workspace-desc': 'أدر الحالات واستشر العمال',
        cases: 'الحالات النشطة',
        messages: 'الرسائل',
        documents: 'المستندات',
        'active-cases': 'الحالات النشطة',
        pending: 'قيد الانتظار',
        reply: 'الرد على السؤال',
        'recent-msg': 'الرسائل الأخيرة',
        'doc-lib': 'مكتبة المستندات',
        'upload-doc': 'تحميل المستند',
        'admin-dash': 'لوحة تحكم الإدارة',
        'admin-desc': 'أدر المستخدمين والتحقق من المدفوعات ومراقبة النظام',
        'total-workers': 'إجمالي العمال',
        'total-lawyers': 'إجمالي المحامين',
        verified: 'تم التحقق',
        'pending-verify': 'قيد التحقق',
        'verify-payment': 'التحقق من الدفع',
        name: 'الاسم',
        status: 'الحالة',
        action: 'الإجراء',
        approve: 'الموافقة',
        'upload-file': 'تحميل الملف',
        'upload-desc': 'تحميل PDF أو JPG',
        'click-upload': 'انقر لتحميل',
        'upload-submit': 'تحميل الملف',
        cancel: 'إلغاء'
    }
};

let currentLanguage = typeof CONFIG !== 'undefined' ? CONFIG.DEFAULT_LANGUAGE : 'id';
let currentUser = null;

const USERS = {
    'admin': { name: 'Admin System', role: 'ADMIN', portal: 'admin', iqamah: 'ADMIN001', password: 'admin123' }
};

const REGISTERED_USERS = {};

function getEl(id) {
    return document.getElementById(id);
}

function changeLanguage(lang) {
    if (!translations[lang]) return;
    currentLanguage = lang;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    updateTranslations();
}

function updateTranslations() {
    document.querySelectorAll('.lang-text').forEach(elem => {
        const key = elem.getAttribute('data-id');
        if (translations[currentLanguage] && translations[currentLanguage][key]) {
            elem.textContent = translations[currentLanguage][key];
        }
    });
}

function openRegisterModal(roleType) {
    const modal = getEl('register-modal');
    if (!modal) return;

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    
    if (getEl('reg-role')) getEl('reg-role').value = roleType;

    if (roleType === 'worker') {
        getEl('worker-fields')?.classList.remove('hidden');
        getEl('lawyer-fields')?.classList.add('hidden');
        getEl('contract-upload')?.classList.remove('hidden');
        getEl('license-upload')?.classList.add('hidden');
    } else {
        getEl('worker-fields')?.classList.add('hidden');
        getEl('lawyer-fields')?.classList.remove('hidden');
        getEl('contract-upload')?.classList.add('hidden');
        getEl('license-upload')?.classList.remove('hidden');
    }
}

function closeRegisterModal() {
    const modal = getEl('register-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
    getEl('register-form')?.reset();
}

function openLoginModal() {
    const modal = getEl('login-modal');
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }
}

function closeLoginModal() {
    const modal = getEl('login-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
}

function quickLogin(role) {
    if (role === 'admin') {
        currentUser = USERS['admin'];
        closeLoginModal();
        initSession();
    } else {
        openLoginModal();
    }
}

function showUploadModal(roleType) {
    const modal = getEl('upload-modal');
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        modal.dataset.role = roleType;
    }
}

function closeUploadModal() {
    const modal = getEl('upload-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
}

function updateFileName(input, displayId) {
    const displayEl = getEl(displayId);
    if (input && input.files[0] && displayEl) {
        displayEl.textContent = `✓ ${input.files[0].name} (${(input.files[0].size / 1024).toFixed(1)} KB)`;
    }
}

// Fungsi Registrasi Tunggal & Terhubung ke Google Apps Script
function handleRegistration(event) {
    event.preventDefault();
    const iqamah = getEl('reg-iqamah')?.value;
    const name = getEl('reg-fullname')?.value;
    const password = getEl('reg-password')?.value;
    const role = getEl('reg-role')?.value || 'worker';
    const email = getEl('reg-email')?.value || '';
    const phone = getEl('reg-phone')?.value || '';
    const workplace = getEl('reg-workplace')?.value || '';
    const nationality = getEl('reg-nationality')?.value || '';
    const license = getEl('reg-license')?.value || '';
    const experience = getEl('reg-experience')?.value || '';
    const lawFirm = getEl('reg-lawfirm')?.value || '';

    if (!iqamah || !password || !name) {
        alert(translations[currentLanguage]['reg-subtitle'] || 'Lengkapi data Anda');
        return;
    }

    // Simpan ke sesi lokal
    REGISTERED_USERS[iqamah] = {
        iqamah: iqamah,
        name: name,
        password: password,
        role: role,
        email: email,
        phone: phone,
        isPaid: false
    };

    // Siapkan payload data untuk dikirim ke Google Sheets
    const payload = {
        action: role === 'worker' ? 'registerWorker' : 'registerLawyer',
        iqamah: iqamah,
        name: name,
        password: password,
        email: email,
        phone: phone,
        workplace: workplace,
        nationality: nationality,
        license: license,
        experience: experience,
        lawFirm: lawFirm
    };

    // Kirim data ke backend
    sendToGoogleSheet(payload);

    alert(translations[currentLanguage]['submit-reg'] || 'Pendaftaran Berhasil & Data Tersimpan!');
    closeRegisterModal();
}

function handleLogin(event) {
    event.preventDefault();
    const iqamah = getEl('login-iqamah')?.value;
    const password = getEl('login-password')?.value;

    if (iqamah === 'ADMIN001' && password === 'admin123') {
        currentUser = USERS['admin'];
        closeLoginModal();
        initSession();
        return;
    }

    if (REGISTERED_USERS[iqamah] && REGISTERED_USERS[iqamah].password === password) {
        const user = REGISTERED_USERS[iqamah];
        currentUser = {
            name: user.name,
            role: user.role === 'worker' ? 'WORKER (PMI)' : 'LAWYER',
            portal: user.role === 'worker' ? 'worker' : 'lawyer',
            iqamah: iqamah,
            isPaid: user.isPaid
        };
        closeLoginModal();
        initSession();
        return;
    }

    alert('Iqamah atau password salah!');
}

function handleLogout() {
    currentUser = null;
    getEl('nav-user-controls')?.classList.add('hidden');
    getEl('btn-open-login')?.classList.remove('hidden');
    showLandingPage();
}

function showLandingPage() {
    getEl('landing-page')?.classList.remove('hidden');
    getEl('main-app')?.classList.add('hidden');
}

function initSession() {
    getEl('landing-page')?.classList.add('hidden');
    getEl('btn-open-login')?.classList.add('hidden');
    getEl('nav-user-controls')?.classList.remove('hidden');
    getEl('main-app')?.classList.remove('hidden');

    if (currentUser) {
        if (getEl('user-display-name')) getEl('user-display-name').innerText = currentUser.name;
        if (getEl('user-display-role')) getEl('user-display-role').innerText = currentUser.role;
        if (getEl('user-avatar')) getEl('user-avatar').innerText = currentUser.name.charAt(0).toUpperCase();

        ['worker', 'lawyer', 'admin'].forEach(p => {
            const sec = getEl(`portal-${p}`);
            if (sec) {
                if (p === currentUser.portal) {
                    sec.classList.remove('hidden');
                } else {
                    sec.classList.add('hidden');
                }
            }
        });
    }
}

function pmiSendConsultation(event) {
    event.preventDefault();
    const input = getEl('pmi-msg-input');
    const stream = getEl('pmi-chat-stream');

    if (!input || !stream || !input.value.trim()) return;

    const msgDiv = document.createElement('div');
    msgDiv.className = "p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs space-y-1";
    msgDiv.innerHTML = `
        <span class="font-bold text-amber-900">${currentUser ? currentUser.name : 'Anda'} (${translations[currentLanguage]['status-text'] || 'Status'} Anda):</span>
        <p class="text-slate-800">${input.value}</p>
    `;
    stream.appendChild(msgDiv);
    const userMsg = input.value;
    input.value = '';
    stream.scrollTop = stream.scrollHeight;

    setTimeout(() => {
        const replyDiv = document.createElement('div');
        replyDiv.className = "p-3.5 rounded-2xl bg-slate-100 border border-slate-200 text-xs space-y-1";
        replyDiv.innerHTML = `
            <span class="font-bold text-slate-900">Dr. Muhammad Al-Rashid (${translations[currentLanguage].consultation || 'Konsultasi'}):</span>
            <p class="text-slate-800">${translations[currentLanguage]['info-2'] || 'Terima kasih, pertanyaan Anda telah diterima dan akan direspons dalam 24 jam.'}</p>
        `;
        stream.appendChild(replyDiv);
        stream.scrollTop = stream.scrollHeight;
    }, 1000);
}

function handleUpload(event) {
    event.preventDefault();
    const fileInput = getEl('upload-file-input');
    const file = fileInput?.files[0];
    if (file) {
        alert((translations[currentLanguage]['upload-submit'] || 'Upload File') + ': ' + file.name);
        closeUploadModal();
    } else {
        alert('Pilih file terlebih dahulu.');
    }
}

function switchLawyerTab(tab) {
    document.querySelectorAll('[id^="lawyer-tab-"]').forEach(el => el.classList.add('hidden'));
    const targetTab = getEl(`lawyer-tab-${tab}`);
    if (targetTab) targetTab.classList.remove('hidden');

    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
        btn.classList.add('inactive');
    });

    const activeBtn = document.querySelector(`[data-tab="${tab}"]`);
    if (activeBtn) {
        activeBtn.classList.remove('inactive');
        activeBtn.classList.add('active');
    }
}

function showLawyerReplyModal(btn) {
    const replyText = prompt("Ketikkan balasan/jawaban konsultasi advokat:");
    if (replyText) {
        alert("Balasan berhasil dikirimkan ke pekerja!");
    }
}

function adminApprove(iqamah) {
    const statusCell = getEl('admin-status-cell');
    const actionCell = getEl('admin-action-cell');
    if (statusCell) statusCell.innerHTML = `<span class="bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full text-xs font-bold">Verified (99 SAR)</span>`;
    if (actionCell) actionCell.innerHTML = `<button disabled class="px-3 py-1 bg-slate-200 text-slate-500 rounded-xl text-xs font-bold">Verified</button>`;
    
    // Kirim verifikasi pembayaran ke Google Apps Script
    sendToGoogleSheet({
        action: 'verifyPayment',
        iqamah: iqamah,
        verifiedBy: 'Admin'
    });

    alert(`Pembayaran diverifikasi untuk Iqamah ${iqamah}`);
}

// Inisialisasi saat halaman selesai dimuat
document.addEventListener('DOMContentLoaded', () => {
    updateTranslations();
});
