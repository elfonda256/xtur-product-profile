# XTUR AI Vision Surveillance Platform — Product Profile & Interactive Presentation

Aplikasi web interaktif **Product Profile** resmi untuk **XTUR AI Vision Surveillance Platform**, yang dirancang dengan standar desain perusahaan teknologi modern, mencakup seluruh analisis teknis, telemetri live, perbandingan arsitektur, dan integrasi screenshot sistem yang telah Anda sediakan.

---

## Fitur Utama Aplikasi Web Ini:

1. **Dual-Mode Experience (Dokumen & Slide Presentasi PPT)**:
   - **Mode Dokumen:** Tampilan lengkap 12+ bab komprehensif dengan tipografi modern, kartu glassmorphism, tabel matriks, dan kalkulator ROI.
   - **Mode Slide PPT:** Mode layar penuh bergaya slide PowerPoint/Keynote. Navigasi menggunakan panah keyboard (kiri/kanan), tombol spasi, atau tombol kontrol di layar.
2. **Cetak & Ekspor ke PDF Otomatis (`window.print`)**:
   - Dilengkapi aturan styling `@media print` khusus yang merapikan jeda halaman (*page break*), menghilangkan kontrol navigasi, dan menghasilkan dokumen proposal PDF 12–16 halaman siap kirim ke klien/investor.
3. **Screenshot Lightbox Forensik**:
   - 9 screenshot asli sistem Xtur dapat diklik untuk diperbesar ke ukuran resolusi penuh lengkap dengan takarir (*caption*) teknis profesional.
4. **Kalkulator Interaktif ROI (Return on Investment)**:
   - Slider interaktif untuk menghitung estimasi efisiensi pengeluaran operasional sekuriti berdasarkan jumlah kamera dan staf jaga.
5. **Telemetri & Metrik Aktual Terverifikasi**:
   - Mencantumkan data riil dari dashboard Xtur: latensi AI **4.2 ms**, pemanfaatan CPU **21%** (i7-14700F), buffer Redis **22.36 MB**, 4 kamera online stream, dan 57 kode pelat nomor nasional.

---

## Struktur Folder:

```
C:\Users\HP\.gemini\antigravity-ide\scratch\xtur-product-profile\
│
├── index.html                # Struktur utama dokumen & slide
├── styles.css                # Desain sistem, mode PPT, dan optimasi cetak PDF
├── app.js                    # Logika interaktif, navigasi keyboard & kalkulator ROI
├── server.js                 # Server lokal ringan (Node.js)
├── start-server.bat          # Script peluncur satu-klik di Windows
│
└── assets/
    └── images/
        ├── 01-dashboard-overview.png
        ├── 02-detection-logs.png
        ├── 03-cameras-monitor.png
        ├── 04-reports-analytics-top.png
        ├── 05-reports-analytics-bottom.png
        ├── 06-engine-health.png
        ├── 07-detection-settings-1.png
        ├── 08-detection-settings-2.png
        └── 09-plate-regions-db.png
```

---

## Cara Menjalankan:

Server lokal saat ini sudah aktif di:
👉 **[http://localhost:3456](http://localhost:3456)**

Untuk membuka secara manual di kemudian hari:
- Cukup dobel-klik file `start-server.bat`, atau
- Buka terminal di folder project lalu jalankan: `node server.js`
