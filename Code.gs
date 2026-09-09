/**
 * HAQ SAUDI PREMIUM - Google Apps Script Backend
 * Integrasi: Google Sheets + Google Drive + Email Notifications
 * Author: Premium Portal Developer
 * Version: 1.0.0
 */

// ==================== CONFIGURATION ====================
const SHEET_ID = 'YOUR_GOOGLE_SHEET_ID'; // Ganti dengan ID Sheet Anda
const DRIVE_FOLDER_ID = 'YOUR_GOOGLE_DRIVE_FOLDER_ID'; // Ganti dengan Folder ID di Drive
const ADMIN_EMAIL = 'admin@haqsaudi.com'; // Email admin untuk notifikasi

const SHEET_NAMES = {
    WORKERS: 'Workers',
    LAWYERS: 'Lawyers',
    PAYMENTS: 'Payments',
    DOCUMENTS: 'Documents',
    CASES: 'Cases',
    MESSAGES: 'Messages'
};

// ==================== INITIALIZATION ====================

/**
 * Fungsi pertama kali setup - buat semua sheet yang diperlukan
 */
function setupGoogleSheets() {
    const ss = SpreadsheetApp.openById(SHEET_ID);
    
    // Create Workers Sheet
    createSheetIfNotExists(ss, SHEET_NAMES.WORKERS, [
        'Timestamp',
        'Iqamah',
        'Full Name',
        'Email',
        'Phone',
        'Password (Hashed)',
        'Workplace',
        'Nationality',
        'Status',
        'Registration Date',
        'Payment Status',
        'ID Document Link',
        'Passport Link',
        'Contract Link'
    ]);
    
    // Create Lawyers Sheet
    createSheetIfNotExists(ss, SHEET_NAMES.LAWYERS, [
        'Timestamp',
        'Iqamah',
        'Full Name',
        'Email',
        'Phone',
        'Password (Hashed)',
        'License Number',
        'Experience Years',
        'Law Firm',
        'Status',
        'Registration Date',
        'License Document Link',
        'Total Cases',
        'Cases Solved'
    ]);
    
    // Create Payments Sheet
    createSheetIfNotExists(ss, SHEET_NAMES.PAYMENTS, [
        'Timestamp',
        'Worker Iqamah',
        'Worker Name',
        'Payment Amount (SAR)',
        'Payment Method',
        'Receipt Document Link',
        'Payment Date',
        'Verification Status',
        'Verified By (Admin)',
        'Verification Date',
        'Expiry Date'
    ]);
    
    // Create Documents Sheet
    createSheetIfNotExists(ss, SHEET_NAMES.DOCUMENTS, [
        'Timestamp',
        'User Iqamah',
        'User Type',
        'Document Type',
        'Document Name',
        'File Link (Google Drive)',
        'File Size (KB)',
        'Upload Date',
        'Status',
        'Notes'
    ]);
    
    // Create Cases Sheet
    createSheetIfNotExists(ss, SHEET_NAMES.CASES, [
        'Timestamp',
        'Case ID',
        'Worker Iqamah',
        'Worker Name',
        'Lawyer Iqamah',
        'Lawyer Name',
        'Case Type',
        'Case Description',
        'Status',
        'Created Date',
        'Last Updated',
        'Resolution',
        'Notes'
    ]);
    
    // Create Messages Sheet
    createSheetIfNotExists(ss, SHEET_NAMES.MESSAGES, [
        'Timestamp',
        'From Iqamah',
        'From Name',
        'From Role',
        'To Iqamah',
        'To Name',
        'To Role',
        'Message Content',
        'Message Date',
        'Read Status',
        'Language'
    ]);
    
    Logger.log('✓ Google Sheets berhasil diinisialisasi!');
    return true;
}

/**
 * Buat sheet jika belum ada
 */
function createSheetIfNotExists(ss, sheetName, headers) {
    let sheet = ss.getSheetByName(sheetName);
    if (!sheet) {
        sheet = ss.insertSheet(sheetName);
        sheet.appendRow(headers);
        sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold').setBackground('#B8860B').setFontColor('#FFFFFF');
    }
    return sheet;
}

/**
 * Setup Google Drive folder structure
 */
function setupGoogleDrive() {
    try {
        const parentFolder = DriveApp.getFolderById(DRIVE_FOLDER_ID);
        
        const folders = [
            'Worker Documents',
            'Lawyer Documents',
            'Payment Receipts',
            'Legal Documents',
            'Case Files',
            'Backup'
        ];
        
        folders.forEach(folderName => {
            const existing = parentFolder.getFoldersByName(folderName);
            if (!existing.hasNext()) {
                parentFolder.createFolder(folderName);
            }
        });
        
        Logger.log('✓ Google Drive folder structure berhasil diinisialisasi!');
        return true;
    } catch (e) {
        Logger.log('Error setting up Drive: ' + e.toString());
        return false;
    }
}

// ==================== WORKER REGISTRATION ====================

/**
 * Register worker baru
 */
function registerWorker(data) {
    try {
        const ss = SpreadsheetApp.openById(SHEET_ID);
        const sheet = ss.getSheetByName(SHEET_NAMES.WORKERS);
        
        // Validasi data
        if (!data.iqamah || !data.name || !data.email) {
            return { success: false, message: 'Data tidak lengkap' };
        }
        
        // Cek duplikat
        const range = sheet.getDataRange();
        const values = range.getValues();
        for (let i = 1; i < values.length; i++) {
            if (values[i][1] === data.iqamah) {
                return { success: false, message: 'Iqamah sudah terdaftar' };
            }
        }
        
        // Hash password
        const hashedPassword = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, data.password);
        
        // Tambah data ke sheet
        sheet.appendRow([
            new Date(),
            data.iqamah,
            data.name,
            data.email,
            data.phone,
            Utilities.base64Encode(hashedPassword),
            data.workplace || '',
            data.nationality || '',
            'Active',
            new Date(),
            'Pending Verification',
            '',
            '',
            ''
        ]);
        
        // Send welcome email
        GmailApp.sendEmail(data.email, 
            '[HAQ SAUDI] Selamat Datang!',
            `Halo ${data.name},\n\nPendaftaran Anda berhasil. Silakan login dengan:\nIqamah: ${data.iqamah}\n\nTunggu verifikasi pembayaran dari admin.`
        );
        
        return { success: true, message: 'Registrasi berhasil!' };
    } catch (e) {
        Logger.log('Error in registerWorker: ' + e.toString());
        return { success: false, message: 'Error: ' + e.toString() };
    }
}

// ==================== LAWYER REGISTRATION ====================

/**
 * Register lawyer baru
 */
function registerLawyer(data) {
    try {
        const ss = SpreadsheetApp.openById(SHEET_ID);
        const sheet = ss.getSheetByName(SHEET_NAMES.LAWYERS);
        
        // Validasi
        if (!data.iqamah || !data.name || !data.license) {
            return { success: false, message: 'Data tidak lengkap' };
        }
        
        // Cek duplikat
        const range = sheet.getDataRange();
        const values = range.getValues();
        for (let i = 1; i < values.length; i++) {
            if (values[i][1] === data.iqamah) {
                return { success: false, message: 'Iqamah sudah terdaftar' };
            }
        }
        
        // Hash password
        const hashedPassword = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, data.password);
        
        sheet.appendRow([
            new Date(),
            data.iqamah,
            data.name,
            data.email,
            data.phone,
            Utilities.base64Encode(hashedPassword),
            data.license,
            data.experience || 0,
            data.lawFirm || '',
            'Pending Approval',
            new Date(),
            '',
            0,
            0
        ]);
        
        // Send welcome email
        GmailApp.sendEmail(data.email, 
            '[HAQ SAUDI] Registrasi Advokat Anda Diterima',
            `Halo Dr. ${data.name},\n\nTerima kasih telah mendaftar sebagai advokat. Profil Anda sedang diverifikasi oleh admin.\n\nNomor Lisensi: ${data.license}`
        );
        
        return { success: true, message: 'Registrasi advokat berhasil!' };
    } catch (e) {
        Logger.log('Error in registerLawyer: ' + e.toString());
        return { success: false, message: 'Error: ' + e.toString() };
    }
}

// ==================== FILE UPLOAD & STORAGE ====================

/**
 * Upload file ke Google Drive
 */
function uploadFileToGoogleDrive(fileBlob, folderName, fileName) {
    try {
        const parentFolder = DriveApp.getFolderById(DRIVE_FOLDER_ID);
        const folders = parentFolder.getFoldersByName(folderName);
        
        if (folders.hasNext()) {
            const folder = folders.next();
            const file = folder.createFile(fileBlob);
            file.setSharing(DriveApp.Access.ANYONE, DriveApp.Permission.VIEW);
            
            return {
                success: true,
                fileId: file.getId(),
                fileLink: file.getUrl(),
                fileName: file.getName(),
                fileSize: file.getSize()
            };
        } else {
            return { success: false, message: 'Folder tidak ditemukan' };
        }
    } catch (e) {
        Logger.log('Error in uploadFileToGoogleDrive: ' + e.toString());
        return { success: false, message: 'Error: ' + e.toString() };
    }
}

/**
 * Catat dokumen yang diupload
 */
function recordDocumentUpload(iqamah, userType, docType, docName, fileLink, fileSize) {
    try {
        const ss = SpreadsheetApp.openById(SHEET_ID);
        const sheet = ss.getSheetByName(SHEET_NAMES.DOCUMENTS);
        
        sheet.appendRow([
            new Date(),
            iqamah,
            userType,
            docType,
            docName,
            fileLink,
            fileSize,
            new Date(),
            'Uploaded',
            ''
        ]);
        
        return { success: true, message: 'Dokumen tercatat' };
    } catch (e) {
        Logger.log('Error in recordDocumentUpload: ' + e.toString());
        return { success: false, message: 'Error' };
    }
}

// ==================== PAYMENT VERIFICATION ====================

/**
 * Catat pembayaran worker
 */
function recordPayment(iqamah, workerName, paymentAmount, paymentMethod, receiptLink) {
    try {
        const ss = SpreadsheetApp.openById(SHEET_ID);
        const sheet = ss.getSheetByName(SHEET_NAMES.PAYMENTS);
        
        // Hitung expiry date (1 tahun kemudian)
        const expiryDate = new Date();
        expiryDate.setFullYear(expiryDate.getFullYear() + 1);
        
        sheet.appendRow([
            new Date(),
            iqamah,
            workerName,
            paymentAmount,
            paymentMethod,
            receiptLink,
            new Date(),
            'Pending Verification',
            '',
            '',
            expiryDate
        ]);
        
        // Kirim notifikasi ke admin
        GmailApp.sendEmail(ADMIN_EMAIL,
            '[HAQ SAUDI] Pembayaran Baru: ' + iqamah,
            `Worker: ${workerName}\nIqamah: ${iqamah}\nAmount: ${paymentAmount} SAR\nReceipt: ${receiptLink}\n\nSilakan verifikasi.`
        );
        
        return { success: true, message: 'Pembayaran tercatat' };
    } catch (e) {
        Logger.log('Error in recordPayment: ' + e.toString());
        return { success: false, message: 'Error' };
    }
}

/**
 * Verifikasi pembayaran oleh admin
 */
function verifyPayment(iqamah, verifiedBy) {
    try {
        const ss = SpreadsheetApp.openById(SHEET_ID);
        const sheet = ss.getSheetByName(SHEET_NAMES.PAYMENTS);
        const range = sheet.getDataRange();
        const values = range.getValues();
        
        // Cari payment dengan iqamah
        for (let i = 1; i < values.length; i++) {
            if (values[i][1] === iqamah && values[i][7] === 'Pending Verification') {
                sheet.getRange(i + 1, 8).setValue('Verified');
                sheet.getRange(i + 1, 9).setValue(verifiedBy);
                sheet.getRange(i + 1, 10).setValue(new Date());
                
                // Update worker status
                updateWorkerPaymentStatus(iqamah, 'Verified');
                
                return { success: true, message: 'Pembayaran terverifikasi' };
            }
        }
        
        return { success: false, message: 'Pembayaran tidak ditemukan' };
    } catch (e) {
        Logger.log('Error in verifyPayment: ' + e.toString());
        return { success: false, message: 'Error' };
    }
}

/**
 * Update status pembayaran worker
 */
function updateWorkerPaymentStatus(iqamah, status) {
    try {
        const ss = SpreadsheetApp.openById(SHEET_ID);
        const sheet = ss.getSheetByName(SHEET_NAMES.WORKERS);
        const range = sheet.getDataRange();
        const values = range.getValues();
        
        for (let i = 1; i < values.length; i++) {
            if (values[i][1] === iqamah) {
                sheet.getRange(i + 1, 11).setValue(status);
                
                // Send email notification
                const email = values[i][3];
                const name = values[i][2];
                GmailApp.sendEmail(email,
                    '[HAQ SAUDI] Status Pembayaran Diperbarui',
                    `Halo ${name},\n\nStatus pembayaran Anda: ${status}\nAnda sekarang dapat mengakses konsultasi advokat.`
                );
                
                return true;
            }
        }
        return false;
    } catch (e) {
        Logger.log('Error in updateWorkerPaymentStatus: ' + e.toString());
        return false;
    }
}

// ==================== CASE MANAGEMENT ====================

/**
 * Buat case baru antara worker dan lawyer
 */
function createCase(workerIqamah, workerName, lawyerIqamah, lawyerName, caseType, caseDescription) {
    try {
        const ss = SpreadsheetApp.openById(SHEET_ID);
        const sheet = ss.getSheetByName(SHEET_NAMES.CASES);
        
        // Generate Case ID
        const caseId = 'CASE-' + Date.now();
        
        sheet.appendRow([
            new Date(),
            caseId,
            workerIqamah,
            workerName,
            lawyerIqamah,
            lawyerName,
            caseType,
            caseDescription,
            'Open',
            new Date(),
            new Date(),
            '',
            ''
        ]);
        
        // Notify both parties
        notifyNewCase(workerIqamah, lawyerIqamah, caseId, caseType);
        
        return { success: true, caseId: caseId, message: 'Case dibuat' };
    } catch (e) {
        Logger.log('Error in createCase: ' + e.toString());
        return { success: false, message: 'Error' };
    }
}

/**
 * Notify tentang case baru
 */
function notifyNewCase(workerIqamah, lawyerIqamah, caseId, caseType) {
    try {
        const ss = SpreadsheetApp.openById(SHEET_ID);
        
        // Get worker email
        const workerSheet = ss.getSheetByName(SHEET_NAMES.WORKERS);
        const workerRange = workerSheet.getDataRange();
        const workerValues = workerRange.getValues();
        let workerEmail = '';
        let workerName = '';
        
        for (let i = 1; i < workerValues.length; i++) {
            if (workerValues[i][1] === workerIqamah) {
                workerEmail = workerValues[i][3];
                workerName = workerValues[i][2];
                break;
            }
        }
        
        // Get lawyer email
        const lawyerSheet = ss.getSheetByName(SHEET_NAMES.LAWYERS);
        const lawyerRange = lawyerSheet.getDataRange();
        const lawyerValues = lawyerRange.getValues();
        let lawyerEmail = '';
        let lawyerName = '';
        
        for (let i = 1; i < lawyerValues.length; i++) {
            if (lawyerValues[i][1] === lawyerIqamah) {
                lawyerEmail = lawyerValues[i][3];
                lawyerName = lawyerValues[i][2];
                break;
            }
        }
        
        if (workerEmail) {
            GmailApp.sendEmail(workerEmail,
                '[HAQ SAUDI] Case Baru Ditugaskan',
                `Halo ${workerName},\n\nCase Anda telah ditugaskan ke ${lawyerName}.\nCase ID: ${caseId}\nTipe: ${caseType}`
            );
        }
        
        if (lawyerEmail) {
            GmailApp.sendEmail(lawyerEmail,
                '[HAQ SAUDI] Case Baru untuk Ditangani',
                `Halo ${lawyerName},\n\nAnda memiliki case baru dari ${workerName}.\nCase ID: ${caseId}\nTipe: ${caseType}`
            );
        }
    } catch (e) {
        Logger.log('Error in notifyNewCase: ' + e.toString());
    }
}

// ==================== MESSAGING ====================

/**
 * Catat pesan antara pengguna
 */
function sendMessage(fromIqamah, fromName, fromRole, toIqamah, toName, toRole, messageContent, language = 'id') {
    try {
        const ss = SpreadsheetApp.openById(SHEET_ID);
        const sheet = ss.getSheetByName(SHEET_NAMES.MESSAGES);
        
        sheet.appendRow([
            new Date(),
            fromIqamah,
            fromName,
            fromRole,
            toIqamah,
            toName,
            toRole,
            messageContent,
            new Date(),
            'Unread',
            language
        ]);
        
        return { success: true, message: 'Pesan terkirim' };
    } catch (e) {
        Logger.log('Error in sendMessage: ' + e.toString());
        return { success: false, message: 'Error' };
    }
}

/**
 * Get messages untuk user
 */
function getMessages(userIqamah) {
    try {
        const ss = SpreadsheetApp.openById(SHEET_ID);
        const sheet = ss.getSheetByName(SHEET_NAMES.MESSAGES);
        const range = sheet.getDataRange();
        const values = range.getValues();
        
        const messages = [];
        for (let i = 1; i < values.length; i++) {
            if (values[i][4] === userIqamah) { // toIqamah
                messages.push({
                    messageId: i,
                    fromName: values[i][2],
                    fromRole: values[i][3],
                    content: values[i][7],
                    date: values[i][8],
                    read: values[i][9]
                });
            }
        }
        
        return { success: true, messages: messages };
    } catch (e) {
        Logger.log('Error in getMessages: ' + e.toString());
        return { success: false, messages: [] };
    }
}

// ==================== DELINQUENCY ALERTS ====================

/**
 * Check pembayaran yang akan expire dalam 30 hari
 */
function checkUpcomingDelinquency() {
    try {
        const ss = SpreadsheetApp.openById(SHEET_ID);
        const sheet = ss.getSheetByName(SHEET_NAMES.PAYMENTS);
        const range = sheet.getDataRange();
        const values = range.getValues();
        
        const thirtyDaysLater = new Date();
        thirtyDaysLater.setDate(thirtyDaysLater.getDate() + 30);
        
        const upcomingDelinquencies = [];
        
        for (let i = 1; i < values.length; i++) {
            const expiryDate = new Date(values[i][10]);
            if (expiryDate <= thirtyDaysLater && expiryDate > new Date()) {
                upcomingDelinquencies.push({
                    iqamah: values[i][1],
                    name: values[i][2],
                    expiryDate: expiryDate
                });
            }
        }
        
        // Send reminders via email
        upcomingDelinquencies.forEach(item => {
            const workerSheet = ss.getSheetByName(SHEET_NAMES.WORKERS);
            const workerRange = workerSheet.getDataRange();
            const workerValues = workerRange.getValues();
            
            for (let i = 1; i < workerValues.length; i++) {
                if (workerValues[i][1] === item.iqamah) {
                    const email = workerValues[i][3];
                    const daysLeft = Math.ceil((item.expiryDate - new Date()) / (1000 * 60 * 60 * 24));
                    
                    GmailApp.sendEmail(email,
                        '[HAQ SAUDI] Pengingat Pembayaran - Masa Aktif ' + daysLeft + ' Hari Lagi',
                        `Halo ${item.name},\n\nIuran Anda akan kadaluarsa dalam ${daysLeft} hari.\nSilakan lakukan perpanjangan secepatnya untuk mempertahankan akses.\n\nExpiry Date: ${item.expiryDate.toLocaleDateString('id-ID')}`
                    );
                    break;
                }
            }
        });
        
        return { success: true, delinquencies: upcomingDelinquencies };
    } catch (e) {
        Logger.log('Error in checkUpcomingDelinquency: ' + e.toString());
        return { success: false };
    }
}

/**
 * Auto-run reminder setiap hari (setup di trigger)
 */
function dailyDelinquencyCheck() {
    checkUpcomingDelinquency();
    Logger.log('✓ Daily delinquency check completed');
}

// ==================== DATA EXPORT & BACKUP ====================

/**
 * Export data worker ke CSV
 */
function exportWorkersToCSV() {
    try {
        const ss = SpreadsheetApp.openById(SHEET_ID);
        const sheet = ss.getSheetByName(SHEET_NAMES.WORKERS);
        const range = sheet.getDataRange();
        const values = range.getValues();
        
        let csv = '';
        values.forEach(row => {
            csv += row.join(',') + '\n';
        });
        
        return { success: true, csv: csv };
    } catch (e) {
        Logger.log('Error in exportWorkersToCSV: ' + e.toString());
        return { success: false };
    }
}

/**
 * Backup semua data ke Google Drive
 */
function backupAllData() {
    try {
        const ss = SpreadsheetApp.openById(SHEET_ID);
        const parentFolder = DriveApp.getFolderById(DRIVE_FOLDER_ID);
        const backupFolder = parentFolder.getFoldersByName('Backup').next();
        
        // Create backup file name with timestamp
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const backupFileName = `HAQ_SAUDI_BACKUP_${timestamp}`;
        
        // Copy entire sheet
        const backupFile = ss.copy(backupFileName);
        
        // Move to backup folder
        const file = DriveApp.getFileById(backupFile.getId());
        backupFolder.addFile(file);
        DriveApp.getRootFolder().removeFile(file);
        
        Logger.log('✓ Backup completed: ' + backupFileName);
        return { success: true, fileName: backupFileName };
    } catch (e) {
        Logger.log('Error in backupAllData: ' + e.toString());
        return { success: false };
    }
}

// ==================== STATISTICS & REPORTING ====================

/**
 * Get dashboard statistics
 */
function getDashboardStats() {
    try {
        const ss = SpreadsheetApp.openById(SHEET_ID);
        
        // Workers count
        const workerSheet = ss.getSheetByName(SHEET_NAMES.WORKERS);
        const workerCount = workerSheet.getLastRow() - 1;
        
        // Lawyers count
        const lawyerSheet = ss.getSheetByName(SHEET_NAMES.LAWYERS);
        const lawyerCount = lawyerSheet.getLastRow() - 1;
        
        // Verified payments
        const paymentSheet = ss.getSheetByName(SHEET_NAMES.PAYMENTS);
        const paymentRange = paymentSheet.getDataRange();
        const paymentValues = paymentRange.getValues();
        let verifiedCount = 0;
        let totalRevenue = 0;
        
        for (let i = 1; i < paymentValues.length; i++) {
            if (paymentValues[i][7] === 'Verified') {
                verifiedCount++;
                totalRevenue += paymentValues[i][3];
            }
        }
        
        // Active cases
        const caseSheet = ss.getSheetByName(SHEET_NAMES.CASES);
        const caseRange = caseSheet.getDataRange();
        const caseValues = caseRange.getValues();
        let activeCases = 0;
        
        for (let i = 1; i < caseValues.length; i++) {
            if (caseValues[i][8] === 'Open') {
                activeCases++;
            }
        }
        
        return {
            success: true,
            stats: {
                totalWorkers: workerCount,
                totalLawyers: lawyerCount,
                verifiedPayments: verifiedCount,
                totalRevenue: totalRevenue,
                activeCases: activeCases
            }
        };
    } catch (e) {
        Logger.log('Error in getDashboardStats: ' + e.toString());
        return { success: false };
    }
}

// ==================== DOGET & DOPOST (Web App Endpoints) ====================

/**
 * Handle GET requests
 */
function doGet(e) {
    const action = e.parameter.action;
    
    if (action === 'getMessages') {
        return ContentService.createTextOutput(JSON.stringify(
            getMessages(e.parameter.iqamah)
        )).setMimeType(ContentService.MimeType.JSON);
    }
    
    if (action === 'getDashboardStats') {
        return ContentService.createTextOutput(JSON.stringify(
            getDashboardStats()
        )).setMimeType(ContentService.MimeType.JSON);
    }
    
    return ContentService.createTextOutput(JSON.stringify({ success: false, message: 'Invalid action' }))
        .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Handle POST requests
 */
function doPost(e) {
    const data = JSON.parse(e.postData.contents);
    const action = data.action;
    
    let response = { success: false, message: 'Unknown action' };
    
    switch(action) {
        case 'registerWorker':
            response = registerWorker(data);
            break;
        case 'registerLawyer':
            response = registerLawyer(data);
            break;
        case 'recordPayment':
            response = recordPayment(data.iqamah, data.name, data.amount, data.method, data.receiptLink);
            break;
        case 'verifyPayment':
            response = verifyPayment(data.iqamah, data.verifiedBy);
            break;
        case 'createCase':
            response = createCase(data.workerIqamah, data.workerName, data.lawyerIqamah, data.lawyerName, data.caseType, data.caseDescription);
            break;
        case 'sendMessage':
            response = sendMessage(data.fromIqamah, data.fromName, data.fromRole, data.toIqamah, data.toName, data.toRole, data.messageContent, data.language);
            break;
        case 'recordDocument':
            response = recordDocumentUpload(data.iqamah, data.userType, data.docType, data.docName, data.fileLink, data.fileSize);
            break;
        case 'checkDelinquency':
            response = checkUpcomingDelinquency();
            break;
        case 'backup':
            response = backupAllData();
            break;
    }
    
    return ContentService.createTextOutput(JSON.stringify(response))
        .setMimeType(ContentService.MimeType.JSON);
}

// ==================== SETUP INSTRUCTIONS ====================

/**
 * Log setup instructions
 */
function printSetupInstructions() {
    Logger.log(`
    
    ╔════════════════════════════════════════════════════════════════╗
    ║        HAQ SAUDI PREMIUM - SETUP INSTRUCTIONS                 ║
    ╚════════════════════════════════════════════════════════════════╝
    
    1. GANTI KONFIGURASI:
       - SHEET_ID: Masukkan ID Sheet Anda
       - DRIVE_FOLDER_ID: Masukkan Folder ID Drive Anda
       - ADMIN_EMAIL: Masukkan email admin
    
    2. RUN SETUP:
       - Jalankan: setupGoogleSheets()
       - Jalankan: setupGoogleDrive()
    
    3. DEPLOY WEB APP:
       - Klik: Deploy > New Deployment
       - Pilih: Web app
       - Execute as: (Your email)
       - Who has access: Anyone
       - Copy Web App URL
    
    4. INTEGRATION HTML:
       - Update Web App URL di HTML:
         const GOOGLE_APPS_SCRIPT_URL = 'YOUR_WEB_APP_URL';
    
    5. SETUP SCHEDULED TRIGGERS:
       - Triggers > Add trigger
       - Function: dailyDelinquencyCheck
       - Time-based: Day timer, setiap pukul 09:00
    
    6. GITHUB PAGES:
       - Push HTML ke GitHub
       - Buka: https://username.github.io/filename.html
    
    ═══════════════════════════════════════════════════════════════════
    
    `);
}
