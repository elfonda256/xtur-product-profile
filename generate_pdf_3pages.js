const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const base = 'C:\\Users\\HP\\.gemini\\antigravity-ide\\scratch\\xtur-product-profile';
const exportDir = path.join(base, 'exports');
const imgDir = path.join(base, 'assets', 'images');
const catDir = path.join(imgDir, 'catalog');

if (!fs.existsSync(exportDir)) fs.mkdirSync(exportDir, { recursive: true });

// Output paths
const outMainPdf = path.join(exportDir, 'XTUR-AI-Surveillance-Product-Profile.pdf');
const outSummaryPdf = path.join(exportDir, 'XTUR-AI-Surveillance-Ringkasan-Eksekutif-3-Lembar.pdf');

function safeImage(doc, imgPath, x, y, options) {
  try {
    if (fs.existsSync(imgPath)) {
      doc.image(imgPath, x, y, options);
    }
  } catch (err) {
    console.warn('Image load error:', imgPath, err.message);
  }
}

function create3PageDocument(targetFile, onFinish) {
  const doc = new PDFDocument({
    size: 'A4',
    margins: { top: 0, bottom: 0, left: 0, right: 0 },
    autoFirstPage: false
  });

  const writeStream = fs.createWriteStream(targetFile);
  doc.pipe(writeStream);

  // Color Palette Tokens
  const C_DARK_BG    = '#0A152E';
  const C_NAVY_BG    = '#0F1E36';
  const C_CARD_BG    = '#F8FAFC';
  const C_BORDER     = '#CBD5E1';
  const C_PRIMARY    = '#0284C7';
  const C_BLUE_DARK  = '#1E40AF';
  const C_TEXT_MAIN  = '#0F172A';
  const C_TEXT_MUTED = '#64748B';
  const C_ACCENT_CYAN= '#38BDF8';
  const C_ACCENT_GRN = '#10B981';

  // Helper Header & Footer
  function drawHeaderFooter(pageNum, sectionName) {
    doc.save();
    // Running Top Header
    doc.fontSize(7.5).fillColor('#64748B').font('Helvetica-Bold')
       .text(`XTUR VISION AI PLATFORM — ${sectionName.toUpperCase()}`, 38, 16);
    doc.fontSize(7.5).fillColor('#1E40AF').font('Helvetica-Bold')
       .text('MAUDY NETWORK KOMUNIKASI', 38, 16, { align: 'right', width: 519 });
    doc.moveTo(38, 26).lineTo(557, 26).strokeColor('#E2E8F0').lineWidth(0.75).stroke();

    // Running Bottom Footer
    doc.moveTo(38, 814).lineTo(557, 814).strokeColor('#CBD5E1').lineWidth(0.75).stroke();
    doc.fontSize(7.5).fillColor('#64748B').font('Helvetica')
       .text('© 2026 Maudy Network Komunikasi | Dokumen Resmi Ringkasan Eksekutif | Portal: xtur.exac.site', 38, 820);
    doc.fontSize(7.5).fillColor('#1E40AF').font('Helvetica-Bold')
       .text(`Lembar ${pageNum} dari 3`, 38, 820, { align: 'right', width: 519 });
    doc.restore();
  }

  // ==============================================================================
  // LEMBAR 1: EXECUTIVE OVERVIEW, LIVE TELEMETRI & ARSITEKTUR EDGE
  // ==============================================================================
  doc.addPage();
  drawHeaderFooter(1, 'Ringkasan Eksekutif & Arsitektur AI');

  // 1. Hero Light Header Container (y = 34 to 126, h = 92)
  doc.roundedRect(38, 34, 519, 92, 6).fillColor('#F0F7FF').strokeColor('#38BDF8').lineWidth(1.2).fillAndStroke();

  // Left side: Badge
  doc.roundedRect(48, 42, 215, 14, 7).fillColor('#FFFFFF').strokeColor('#0284C7').lineWidth(0.75).fillAndStroke();
  doc.fontSize(6.8).fillColor('#0284C7').font('Helvetica-Bold').text('XTUR  |  AI SECURITY SURVEILLANCE PLATFORM', 54, 45);

  // Main Hero Heading
  doc.fontSize(15).fillColor('#0F172A').font('Helvetica-Bold').text('Smarter Surveillance for a Safer Tomorrow', 48, 60);
  doc.fontSize(8).fillColor('#0284C7').font('Helvetica-Bold')
     .text('Transformasi Kamera CCTV Eksisting Menjadi Asisten Keamanan Cerdas & Proaktif 24/7', 48, 78);

  // Hero Narrative
  doc.fontSize(7.2).fillColor('#334155').font('Helvetica').lineGap(1.5)
     .text('XTUR adalah platform AI Computer Vision mutakhir yang mengintegrasikan kamera pengawas eksisting untuk mendeteksi ancaman seketika, menganalisis objek visual, dan mengirimkan peringatan dini sebelum insiden terjadi. Tanpa perlu mengganti kamera ataupun kabel lama.', 48, 92, { width: 355 });

  // Embedded Screenshot Thumbnail on the right of Hero Container
  safeImage(doc, path.join(imgDir, '01-dashboard-overview.png'), 412, 42, { width: 135, height: 76 });
  doc.roundedRect(412, 42, 135, 76, 3).strokeColor('#93C5FD').lineWidth(0.75).stroke();

  // 2. 4 Telemetry Metrics Row (y = 132 to 184, h = 52)
  const telemetryData = [
    { label: 'LATENSI INFERENSI AI', val: '4.2 ms', sub: 'Kecepatan Deteksi Real-Time', color: '#10B981' },
    { label: 'PEMANFAATAN CPU', val: '21%', sub: 'Intel i7 Onsite Micro-Server', color: '#0284C7' },
    { label: 'BUFFER IN-MEMORY', val: '22.36 MB', sub: 'Arsitektur Redis Non-Loss', color: '#D97706' },
    { label: 'MULTI-STREAM LIVE', val: '4+ Cam', sub: 'Simultan 30 FPS Full HD', color: '#6366F1' }
  ];

  let tx = 38;
  telemetryData.forEach((item) => {
    doc.roundedRect(tx, 132, 124, 52, 4).fillColor('#FFFFFF').strokeColor('#CBD5E1').lineWidth(0.75).fillAndStroke();
    doc.fontSize(6.2).fillColor(C_TEXT_MUTED).font('Helvetica-Bold').text(item.label, tx + 8, 140);
    doc.fontSize(13.5).fillColor(item.color).font('Helvetica-Bold').text(item.val, tx + 8, 150);
    doc.fontSize(6.2).fillColor(C_TEXT_MAIN).font('Helvetica').text(item.sub, tx + 8, 169);
    tx += 132;
  });

  // 3. Masalah vs Solusi XTUR AI (y = 192 to 294, h = 102)
  // Left Box: Keterbatasan Tradisional
  doc.roundedRect(38, 192, 255, 102, 5).fillColor('#FEF2F2').strokeColor('#FECACA').lineWidth(0.75).fillAndStroke();
  doc.fontSize(8).fillColor('#991B1B').font('Helvetica-Bold').text('KELEMAHAN CCTV TRADISIONAL (PASIF)', 48, 201);
  doc.fontSize(7.2).fillColor('#7F1D1D').font('Helvetica').lineGap(2.5)
     .text('• Hanya Saksi Bisu: Rekaman baru ditonton setelah musibah/pencurian terjadi; tidak ada mitigasi di awal.', 48, 215, { width: 235 })
     .text('• Kelelahan Manusia (Human Fatigue): Fokus petugas jaga turun hingga 95% setelah 20 menit menatap layar monitor.', 48, 240, { width: 235 })
     .text('• False Alarm Tinggi: Sensor gerak jadul sering tertipu oleh hembusan angin, hewan peliharaan, dan bayangan lampu.', 48, 265, { width: 235 });

  // Right Box: Solusi Unggul XTUR AI
  doc.roundedRect(301, 192, 256, 102, 5).fillColor('#F0FDF4').strokeColor('#BBF7D0').lineWidth(0.75).fillAndStroke();
  doc.fontSize(8).fillColor('#166534').font('Helvetica-Bold').text('KEUNGGULAN SOLUSI XTUR AI VISION (AKTIF)', 311, 201);
  doc.fontSize(7.2).fillColor('#14532D').font('Helvetica').lineGap(2.5)
     .text('• Pencegahan Aktif: Alarm audio-visual berbunyi seketika saat potensi anomali/bahaya pertama kali terdeteksi.', 311, 215, { width: 236 })
     .text('• Asisten Siaga 24/7: Memfilter 99% anomali visual tanpa henti dengan kecerdasan neural network teruji.', 311, 240, { width: 236 })
     .text('• Fleksibel & Universal: Terkoneksi langsung via RTSP/ONVIF kamera lama Anda tanpa bongkar infrastruktur.', 311, 265, { width: 236 });

  // 4. Visual Dashboard Preview & Arsitektur Onsite (y = 302 to 432, h = 130)
  // Left: Dashboard Preview
  doc.roundedRect(38, 302, 265, 130, 5).fillColor('#F8FAFC').strokeColor('#CBD5E1').lineWidth(0.75).fillAndStroke();
  doc.fontSize(7.5).fillColor(C_BLUE_DARK).font('Helvetica-Bold').text('LIVE DASHBOARD & MULTI-CAMERA STREAM', 48, 310);
  safeImage(doc, path.join(imgDir, '01-dashboard-overview.png'), 46, 324, { width: 249, height: 100 });
  doc.roundedRect(46, 324, 249, 100, 2).strokeColor('#CBD5E1').lineWidth(0.5).stroke();

  // Right: Arsitektur Highlights
  doc.roundedRect(311, 302, 246, 130, 5).fillColor(C_CARD_BG).strokeColor(C_BORDER).lineWidth(0.75).fillAndStroke();
  doc.fontSize(8).fillColor(C_BLUE_DARK).font('Helvetica-Bold').text('KONTROL TERPUSAT & KEDAULATAN DATA', 321, 310);
  doc.fontSize(7).fillColor(C_TEXT_MAIN).font('Helvetica').lineGap(2.5)
     .text('• 100% On-Premise Edge Engine:', 321, 324, { width: 226 })
     .text('  Video stream diproses lokal di server internal Anda. Nol ketergantungan internet publik & bebas biaya cloud bulanan.', 321, 334, { width: 226 })
     .text('• Kepatuhan UU PDP No. 27/2022:', 321, 356, { width: 226 })
     .text('  Fitur Privacy Face Blur otomatis memburamkan wajah masyarakat umum guna memenuhi undang-undang perlindungan data pribadi.', 321, 366, { width: 226 })
     .text('• Multi-Channel Alerting Berkecepatan Tinggi:', 321, 392, { width: 226 })
     .text('  Notifikasi bahaya terkirim serentak dalam <1 detik via WhatsApp Bot, Telegram Pimpinan, dan sirene pos jaga.', 321, 402, { width: 226 });

  // 5. 3 Core Architecture Pillars (y = 440 to 552, h = 112)
  const pillars = [
    {
      tag: 'ZERO CLOUD COST',
      col: '#0284C7',
      title: 'Edge Onsite Engine',
      desc: 'Pemrosesan video berlangsung 100% pada server fisik internal Anda. Tidak membebani bandwidth internet keluar dan menjamin kerahasiaan data rekaman CCTV sensitif.'
    },
    {
      tag: 'LEGAL PRIVACY',
      col: '#8B5CF6',
      title: 'Kepatuhan UU PDP',
      desc: 'Algoritma Face Obfuscation otomatis memburamkan wajah publik pejalan kaki secara real-time, memastikan kepatuhan hukum penuh terhadap UU PDP No. 27 Tahun 2022.'
    },
    {
      tag: 'SUB-SECOND DISPATCH',
      col: '#10B981',
      title: 'Notifikasi Multi-Kanal',
      desc: 'Sistem peringatan terintegrasi otomatis mendistribusikan foto bukti tangkapan kamera beserta timestamp & lokasi secara instan ke pos sekuriti, WhatsApp bot, & Telegram.'
    }
  ];

  let px = 38;
  pillars.forEach(p => {
    doc.roundedRect(px, 440, 167, 112, 5).fillColor(C_CARD_BG).strokeColor(C_BORDER).lineWidth(0.75).fillAndStroke();
    doc.roundedRect(px + 8, 448, 80, 13, 3).fillColor(p.col).strokeColor(p.col).fillAndStroke();
    doc.fontSize(5.8).fillColor('#FFFFFF').font('Helvetica-Bold').text(p.tag, px + 12, 451);
    doc.fontSize(8.2).fillColor(C_TEXT_MAIN).font('Helvetica-Bold').text(p.title, px + 8, 467);
    doc.fontSize(6.8).fillColor(C_TEXT_MUTED).font('Helvetica').lineGap(2).text(p.desc, px + 8, 481, { width: 151 });
    px += 176;
  });

  // 6. Perbandingan Dampak Operasional & Finansial (y = 560 to 734, h = 174)
  // Left Box: Transformasi Tim Sekuriti
  doc.roundedRect(38, 560, 255, 174, 5).fillColor('#FFFFFF').strokeColor('#CBD5E1').lineWidth(0.75).fillAndStroke();
  doc.roundedRect(38, 560, 255, 20, 5).fillColor('#EFF6FF').strokeColor('#BFDBFE').lineWidth(0.5).fillAndStroke();
  doc.fontSize(7.5).fillColor('#1E40AF').font('Helvetica-Bold').text('TRANSFORMASI EFISIENSI TIM OPERASIONAL SEKURITI', 48, 566);

  doc.fontSize(7.1).fillColor(C_TEXT_MAIN).font('Helvetica').lineGap(2.8)
     .text('1. Pengurangan Beban Monitor Manual:', 48, 588, { width: 235 })
     .text('   Petugas tidak perlu menatap layar berjam-jam. AI menyaring 99% rekaman statis dan hanya memanggil petugas saat terdeteksi anomali nyata.', 48, 599, { width: 235 })
     .text('2. Respon Cepat Terkoordinasi:', 48, 626, { width: 235 })
     .text('   Setiap alarm dilengkapi cuplikan foto objek, klasifikasi bahaya, dan lokasi persis kamera sehingga aksi penanganan dapat langsung dieksekusi.', 48, 637, { width: 235 })
     .text('3. Audit Trail Terenkripsi & Otomatis:', 48, 664, { width: 235 })
     .text('   Seluruh histori kejadian terekam dalam log digital yang terstruktur, memudahkan pencarian barang hilang atau investigasi tindak kejahatan.', 48, 675, { width: 235 })
     .text('4. Peningkatan Produktivitas Petugas Lapangan:', 48, 702, { width: 235 })
     .text('   Personel jaga dapat dialokasikan untuk patroli fisik aktif daripada sekadar duduk di depan monitor pos satpam.', 48, 713, { width: 235 });

  // Right Box: Integrasi Tanpa Gangguan (Zero Disruption)
  doc.roundedRect(301, 560, 256, 174, 5).fillColor('#FFFFFF').strokeColor('#CBD5E1').lineWidth(0.75).fillAndStroke();
  doc.roundedRect(301, 560, 256, 20, 5).fillColor('#F0FDF4').strokeColor('#BBF7D0').lineWidth(0.5).fillAndStroke();
  doc.fontSize(7.5).fillColor('#166534').font('Helvetica-Bold').text('INTEGRASI TANPA GANGGUAN (ZERO DOWNTIME)', 311, 566);

  doc.fontSize(7.1).fillColor(C_TEXT_MAIN).font('Helvetica').lineGap(2.8)
     .text('1. Kompatibilitas Kamera Eksisting (RTSP / ONVIF):', 311, 588, { width: 236 })
     .text('   Tidak perlu meremajakan kamera analog/IP yang sudah terpasang. Cukup hubungkan RTSP stream ke XTUR Edge AI Server.', 311, 599, { width: 236 })
     .text('2. Arsitektur Non-Intrusif & Paralel:', 311, 626, { width: 236 })
     .text('   XTUR berjalan secara paralel berdampingan dengan NVR/DVR lama Anda tanpa mengganggu alur perekaman CCTV harian.', 311, 637, { width: 236 })
     .text('3. Skalabilitas Bertahap (Modular):', 311, 664, { width: 236 })
     .text('   Dapat dimulai dari 4 titik kamera paling rawan (gerbang utama, gudang, kasir), lalu diperluas secara berkala sesuai kebutuhan.', 311, 675, { width: 236 })
     .text('4. Kemudahan Perawatan Onsite & Remote Support:', 311, 702, { width: 236 })
     .text('   Dukungan pembaruan model AI secara berkala dan pemantauan kesehatan sistem (health check) secara terpusat.', 311, 713, { width: 236 });

  // 7. Lembar Pengesahan & Pengembang Dokumen (y = 742 to 804, h = 62)
  doc.roundedRect(38, 742, 519, 62, 5).fillColor('#F1F5F9').strokeColor('#CBD5E1').lineWidth(0.75).fillAndStroke();
  doc.fontSize(7.8).fillColor(C_BLUE_DARK).font('Helvetica-Bold').text('LEMBAR PENGESAHAN EKSEKUTIF & PENGEMBANG RESMI:', 48, 750);
  doc.fontSize(7.1).fillColor(C_TEXT_MAIN).font('Helvetica').lineGap(2)
     .text('Mitra Pengembang Resmi: Maudy Network Komunikasi  |  Spesialisasi: AI Vision Surveillance & Smart Security IoT', 48, 762)
     .text('Kanal Layanan Resmi: Email: admin@maudynetwork.id  |  Hotline/WhatsApp: 0852-3319-5874  |  Portal: xtur.exac.site', 48, 774)
     .text('Catatan Kerahasiaan: Dokumen ini disusun untuk evaluasi pengadaan solusi sistem keamanan berteknologi AI di fasilitas perusahaan.', 48, 786);


  // ==============================================================================
  // LEMBAR 2: 6 MODUL DETEKSI AI CERDAS & EKOSISTEM HARDWARE
  // ==============================================================================
  doc.addPage();
  drawHeaderFooter(2, 'Fitur Deteksi AI & Katalog Hardware');

  // Title Section
  doc.fontSize(13).fillColor(C_BLUE_DARK).font('Helvetica-Bold').text('6 MODUL DETEKSI CERDAS XTUR AI VISION', 38, 34);
  doc.fontSize(7.5).fillColor(C_TEXT_MUTED).font('Helvetica')
     .text('Didesain khusus untuk mengenali objek dan anomali visual secara presisi pada lingkungan operasional industri nyata:', 38, 46);

  // 6 Detection Cards (2 Cols x 3 Rows, y = 56 to 346, h = 92 each)
  const detCards = [
    {
      img: 'det-person.jpg',
      badge: 'PEOPLE COUNTING',
      bCol: '#0284C7',
      title: '1. Person Detection & Tracking',
      desc: 'Mendeteksi keberadaan orang, melacak alur pergerakan pengunjung, menghitung flow keluar-masuk pejalan kaki, dan membatasi zona akses terlarang.',
      metric: 'Akurasi: 99.2% | Latensi: < 5 ms'
    },
    {
      img: 'det-vehicle.jpg',
      badge: 'TRAFFIC LOGISTICS',
      bCol: '#0D9488',
      title: '2. Vehicle & License Plate (ALPR)',
      desc: 'Mengenali tipe kendaraan (mobil, truk, motor) dan membaca pelat nomor polisi secara otomatis untuk verifikasi tiket gate masuk pergudangan.',
      metric: 'Akurasi: 98.6% | Multi-Kategori'
    },
    {
      img: 'det-ppe.jpg',
      badge: 'HSE COMPLIANCE',
      bCol: '#D97706',
      title: '3. APD / PPE Detection (K3 Proyek)',
      desc: 'Memastikan kepatuhan keselamatan kerja di area proyek, mendeteksi pekerja yang tidak memakai helm pelindung (hard hat), rompi, atau sepatu K3.',
      metric: 'Kepatuhan Regulasi K3 Nasional'
    },
    {
      img: 'det-fire-smoke.jpg',
      badge: 'HAZARD PREVENTION',
      bCol: '#DC2626',
      title: '4. Fire & Smoke Early Detection',
      desc: 'Mendeteksi percikan api dini dan kepulan asap tebal dalam hitungan detik sebelum sensor panas/asap konvensional plafon terpicu.',
      metric: 'Respons Dini: < 3 Detik Kejadian'
    },
    {
      img: 'det-intrusion.jpg',
      badge: 'PERIMETER DEFENSE',
      bCol: '#E11D48',
      title: '5. Perimeter Intrusion & Tripwire',
      desc: 'Garis pembatas virtual pada pagar fasilitas. Memicu sirene instan saat orang melompati tembok atau memotong garis zona terlarang.',
      metric: 'Zero Blindspot | Sub-Second Trigger'
    },
    {
      img: 'det-crowd.jpg',
      badge: 'PUBLIC SAFETY',
      bCol: '#4F46E5',
      title: '6. Crowd Density & Congestion',
      desc: 'Mengukur estimasi kepadatan kerumunan di concourse, mall, atau gerbang umum guna mencegah penumpukan massa dan risiko desak-desakan.',
      metric: 'Analisis Kapasitas Ruang Real-Time'
    }
  ];

  let cardY = 56;
  for (let i = 0; i < detCards.length; i += 2) {
    // Left Card
    const c1 = detCards[i];
    doc.roundedRect(38, cardY, 255, 92, 5).fillColor('#FFFFFF').strokeColor('#CBD5E1').lineWidth(0.75).fillAndStroke();
    safeImage(doc, path.join(imgDir, c1.img), 44, cardY + 7, { width: 78, height: 78 });
    doc.roundedRect(44, cardY + 7, 78, 78, 3).strokeColor('#E2E8F0').lineWidth(0.5).stroke();

    doc.roundedRect(128, cardY + 7, 76, 11, 3).fillColor(c1.bCol).strokeColor(c1.bCol).fillAndStroke();
    doc.fontSize(5.5).fillColor('#FFFFFF').font('Helvetica-Bold').text(c1.badge, 132, cardY + 9);
    doc.fontSize(7.5).fillColor(C_TEXT_MAIN).font('Helvetica-Bold').text(c1.title, 128, cardY + 21, { width: 160 });
    doc.fontSize(6.5).fillColor('#334155').font('Helvetica').lineGap(1.5).text(c1.desc, 128, cardY + 33, { width: 160 });
    doc.fontSize(6.2).fillColor(c1.bCol).font('Helvetica-Bold').text(`• ${c1.metric}`, 128, cardY + 75);

    // Right Card
    const c2 = detCards[i + 1];
    doc.roundedRect(301, cardY, 256, 92, 5).fillColor('#FFFFFF').strokeColor('#CBD5E1').lineWidth(0.75).fillAndStroke();
    safeImage(doc, path.join(imgDir, c2.img), 307, cardY + 7, { width: 78, height: 78 });
    doc.roundedRect(307, cardY + 7, 78, 78, 3).strokeColor('#E2E8F0').lineWidth(0.5).stroke();

    doc.roundedRect(391, cardY + 7, 76, 11, 3).fillColor(c2.bCol).strokeColor(c2.bCol).fillAndStroke();
    doc.fontSize(5.5).fillColor('#FFFFFF').font('Helvetica-Bold').text(c2.badge, 395, cardY + 9);
    doc.fontSize(7.5).fillColor(C_TEXT_MAIN).font('Helvetica-Bold').text(c2.title, 391, cardY + 21, { width: 160 });
    doc.fontSize(6.5).fillColor('#334155').font('Helvetica').lineGap(1.5).text(c2.desc, 391, cardY + 33, { width: 160 });
    doc.fontSize(6.2).fillColor(c2.bCol).font('Helvetica-Bold').text(`• ${c2.metric}`, 391, cardY + 75);

    cardY += 98;
  }

  // Section 2: Ekosistem Perangkat Keras (Hardware) & Kamera (y = 356 to 522, h = 166)
  doc.fontSize(11).fillColor(C_BLUE_DARK).font('Helvetica-Bold').text('EKOSISTEM PERANGKAT KERAS (HARDWARE) & KAMERA TERUJI', 38, 356);
  doc.fontSize(7.2).fillColor(C_TEXT_MUTED).font('Helvetica')
     .text('Katalog perangkat edge AI dan kamera CCTV bersertifikasi yang siap dideploy bersama platform XTUR:', 38, 368);

  const hwList = [
    {
      img: 'hw-edge-box.jpg',
      name: 'XTUR Edge AI Box 8-CH',
      cat: 'Onsite Micro Server',
      spec: 'Intel Core i5/i7 14th Gen, 16GB RAM, Tensor NPU Coprocessor, Dual Gigabit LAN, SSD 512GB NVMe. Kapasitas 8 kamera Full HD simultan.'
    },
    {
      img: 'hw-server-rack.jpg',
      name: 'XTUR Enterprise Server 32-CH',
      cat: 'Rackmount 2U Server',
      spec: 'Intel Xeon Scalable / i9, 64GB DDR5, Dual Dedicated AI Accelerator GPU, 8-Bay Hot-Swap Storage, Redundant Power Supply 24/7.'
    },
    {
      img: 'cam-dome.jpg',
      name: 'XTUR AI Smart Dome 4MP',
      cat: 'Kamera CCTV Indoor',
      spec: 'Resolusi 4MP Super HD, Wide Angle Lens 2.8mm, True WDR 120dB, Smart IR 30m, 2-Way Audio Intercom, IK10 Vandal-Proof Casing.'
    },
    {
      img: 'cam-ptz.jpg',
      name: 'XTUR AI Bullet PTZ 4MP',
      cat: 'Kamera CCTV Perimeter',
      spec: 'Resolusi 4MP, Optical Zoom 25x, Smart Laser IR 100m, IP67 Weatherproof Tahan Cuaca Ekstrem, AI Auto-Tracking Target Bergerak.'
    }
  ];

  let hwy = 380;
  hwList.forEach((hw, idx) => {
    const bgRow = idx % 2 === 0 ? '#F8FAFC' : '#FFFFFF';
    doc.roundedRect(38, hwy, 519, 33, 4).fillColor(bgRow).strokeColor('#E2E8F0').lineWidth(0.5).fillAndStroke();
    safeImage(doc, path.join(catDir, hw.img), 42, hwy + 3, { width: 27, height: 27 });
    doc.roundedRect(42, hwy + 3, 27, 27, 2).strokeColor('#CBD5E1').lineWidth(0.5).stroke();

    doc.fontSize(7.5).fillColor(C_TEXT_MAIN).font('Helvetica-Bold').text(hw.name, 76, hwy + 6);
    doc.roundedRect(240, hwy + 5, 80, 11, 2).fillColor('#EFF6FF').strokeColor('#BFDBFE').lineWidth(0.5).fillAndStroke();
    doc.fontSize(5.8).fillColor(C_PRIMARY).font('Helvetica-Bold').text(hw.cat, 244, hwy + 7);

    doc.fontSize(6.3).fillColor(C_TEXT_MUTED).font('Helvetica').lineGap(1).text(hw.spec, 328, hwy + 5, { width: 224 });
    hwy += 36;
  });

  // Section 3: Penerapan Vertikal pada Sektor Industri Strategis (y = 530 to 804, h = 274)
  doc.fontSize(11).fillColor(C_BLUE_DARK).font('Helvetica-Bold').text('PENERAPAN PADA SEKTOR-SEKTOR INDUSTRI STRATEGIS', 38, 532);
  doc.fontSize(7.2).fillColor(C_TEXT_MUTED).font('Helvetica')
     .text('Solusi XTUR telah disesuaikan dengan tantangan operasional spesifik lintas industri di Indonesia:', 38, 544);

  const sectors = [
    {
      img: 'sector-factory.jpg',
      title: '1. Manufaktur & Pabrik Industri',
      badge: 'PRODUKSI & K3',
      bCol: '#D97706',
      items: [
        'Audit K3 Otomatis: Deteksi pelanggaran APD (helm/rompi/sarung tangan) tanpa inspeksi manual.',
        'Proteksi Zona Berbahaya: Alarm otomatis bila pekerja mendekati mesin pres atau boiler berisiko tinggi.',
        'Monitoring Forklift: Mencegah tabrakan antara armada forklift dengan pejalan kaki di lorong pabrik.'
      ]
    },
    {
      img: 'sector-mall.jpg',
      title: '2. Ritel, Mall & Komersial',
      badge: 'RETAIL ANALYTICS',
      bCol: '#0284C7',
      items: [
        'Heatmap & Footfall: Memetakan rute pengunjung paling ramai dan mengukur konversi tenant.',
        'Pencegahan Pencurian (Loss Prevention): Deteksi perilaku mencurigakan dan loitering berlebih.',
        'Optimasi Antrean: Notifikasi otomatis saat antrean kasir melebihi kapasitas standar pelayanan.'
      ]
    },
    {
      img: 'sector-construction.jpg',
      title: '3. Logistik & Pergudangan Modern',
      badge: 'SUPPLY CHAIN',
      bCol: '#0D9488',
      items: [
        'ALPR Gerbang Truk: Pencatatan nomor pelat kendaraan kargo masuk/keluar otomatis ke database.',
        'Proteksi Kebakaran Gudang: Deteksi dini percikan api dan kepulan asap di tumpukan palet kargo 24 jam.',
        'Perimeter Anti-Maling: Garis batas virtual dinding gudang untuk mencegah pembobolan malam hari.'
      ]
    },
    {
      img: 'sector-campus.jpg',
      title: '4. Institusi Kampus & Sekolah',
      badge: 'CAMPUS SAFETY',
      bCol: '#6366F1',
      items: [
        'Akses Gerbang Terpadu: Pemantauan arus kedatangan bus sekolah, kendaraan dosen, dan tamu umum.',
        'Pengawasan Zona Rawan: Deteksi kerumunan mencurigakan atau perkelahian pelajar di area luar pandangan.',
        'Perlindungan Privasi: Penerapan otomatis privacy face blur sesuai etika perlindungan privasi siswa.'
      ]
    }
  ];

  let secY = 558;
  for (let s = 0; s < sectors.length; s += 2) {
    // Left Sector
    const s1 = sectors[s];
    doc.roundedRect(38, secY, 255, 120, 5).fillColor(C_CARD_BG).strokeColor(C_BORDER).lineWidth(0.75).fillAndStroke();
    safeImage(doc, path.join(catDir, s1.img), 44, secY + 6, { width: 60, height: 60 });
    doc.roundedRect(44, secY + 6, 60, 60, 3).strokeColor('#CBD5E1').lineWidth(0.5).stroke();

    doc.roundedRect(110, secY + 6, 70, 11, 2).fillColor(s1.bCol).strokeColor(s1.bCol).fillAndStroke();
    doc.fontSize(5.5).fillColor('#FFFFFF').font('Helvetica-Bold').text(s1.badge, 114, secY + 8);
    doc.fontSize(7.5).fillColor(C_TEXT_MAIN).font('Helvetica-Bold').text(s1.title, 110, secY + 20, { width: 178 });

    doc.fontSize(6.3).fillColor('#334155').font('Helvetica').lineGap(1.5)
       .text(`• ${s1.items[0]}`, 44, secY + 70, { width: 243 })
       .text(`• ${s1.items[1]}`, 44, secY + 86, { width: 243 })
       .text(`• ${s1.items[2]}`, 44, secY + 102, { width: 243 });

    // Right Sector
    const s2 = sectors[s + 1];
    doc.roundedRect(301, secY, 256, 120, 5).fillColor(C_CARD_BG).strokeColor(C_BORDER).lineWidth(0.75).fillAndStroke();
    safeImage(doc, path.join(catDir, s2.img), 307, secY + 6, { width: 60, height: 60 });
    doc.roundedRect(307, secY + 6, 60, 60, 3).strokeColor('#CBD5E1').lineWidth(0.5).stroke();

    doc.roundedRect(373, secY + 6, 70, 11, 2).fillColor(s2.bCol).strokeColor(s2.bCol).fillAndStroke();
    doc.fontSize(5.5).fillColor('#FFFFFF').font('Helvetica-Bold').text(s2.badge, 377, secY + 8);
    doc.fontSize(7.5).fillColor(C_TEXT_MAIN).font('Helvetica-Bold').text(s2.title, 373, secY + 20, { width: 178 });

    doc.fontSize(6.3).fillColor('#334155').font('Helvetica').lineGap(1.5)
       .text(`• ${s2.items[0]}`, 307, secY + 70, { width: 244 })
       .text(`• ${s2.items[1]}`, 307, secY + 86, { width: 244 })
       .text(`• ${s2.items[2]}`, 307, secY + 102, { width: 244 });

    secY += 126;
  }


  // ==============================================================================
  // LEMBAR 3: ANALISIS ROI, TAHAPAN IMPLEMENTASI, LISENSI & KONTAK RESMI
  // ==============================================================================
  doc.addPage();
  drawHeaderFooter(3, 'Analisis ROI, Roadmap & Kontak');

  // Title Section
  doc.fontSize(13).fillColor(C_BLUE_DARK).font('Helvetica-Bold').text('SIMULASI RETURN ON INVESTMENT (ROI) & EFISIENSI ANGGARAN', 38, 34);
  doc.fontSize(7.5).fillColor(C_TEXT_MUTED).font('Helvetica')
     .text('Bagaimana implementasi sistem cerdas XTUR AI Surveillance memangkas beban pengeluaran operasional perusahaan secara terukur:', 38, 46);

  // 1. ROI Container (y = 56 to 186, h = 130)
  doc.roundedRect(38, 56, 519, 130, 6).fillColor('#F0FDF4').strokeColor('#86EFAC').lineWidth(1).fillAndStroke();
  doc.fontSize(9.2).fillColor('#166534').font('Helvetica-Bold')
     .text('PROYEKSI EFISIENSI ANGGARAN HINGGA 65%  |  PAYBACK PERIOD 4–6 BULAN', 48, 64);
  doc.fontSize(7.2).fillColor('#15803D').font('Helvetica').lineGap(2)
     .text('Pada fasilitas dengan 16–32 titik kamera pengawas, perusahaan konvensional biasanya memerlukan 6–8 staf pengawas per shift untuk memantau monitor pos jaga secara bergantian. Dengan XTUR AI, pemantauan rutin diambil alih 95% oleh sistem, sehingga tim sekuriti fokus pada eksekusi respon cepat saat alarm berbunyi.', 48, 77, { width: 499 });

  // 3 Comparison Sub-Cards Inside ROI
  const roiCols = [
    {
      title: 'SEBELUM IMPLEMENTASI AI',
      c: '#991B1B', bg: '#FEF2F2', bdr: '#FECACA',
      t1: '• Kebutuhan 6–8 staf sekuriti per shift',
      t2: '• Beban biaya lembur & tunjangan tinggi',
      t3: '• Risiko insiden fatal terlambat dideteksi'
    },
    {
      title: 'DENGAN XTUR AI VISION',
      c: '#166534', bg: '#FFFFFF', bdr: '#BBF7D0',
      t1: '• Cukup 2 staf jaga siaga terkoordinasi',
      t2: '• Peringatan bahaya instan < 1 detik',
      t3: '• Pemantauan presisi 24 jam tanpa lelah'
    },
    {
      title: 'DAMPAK FINANSIAL TERUKUR',
      c: '#1E40AF', bg: '#EFF6FF', bdr: '#BFDBFE',
      t1: '• Penghematan OPEX hingga 65% per tahun',
      t2: '• Balik modal (BEP) tercapai 4–6 bulan',
      t3: '• Mitigasi kerugian pencurian aset berharga'
    }
  ];

  let rx = 48;
  roiCols.forEach(rc => {
    doc.roundedRect(rx, 114, 159, 64, 4).fillColor(rc.bg).strokeColor(rc.bdr).lineWidth(0.75).fillAndStroke();
    doc.fontSize(6.8).fillColor(rc.c).font('Helvetica-Bold').text(rc.title, rx + 6, 120);
    doc.fontSize(6.2).fillColor('#334155').font('Helvetica').lineGap(2)
       .text(rc.t1, rx + 6, 131, { width: 147 })
       .text(rc.t2, rx + 6, 142, { width: 147 })
       .text(rc.t3, rx + 6, 153, { width: 147 });
    rx += 170;
  });

  // 2. 4 Tahapan Implementasi Cepat (y = 194 to 326, h = 132)
  doc.fontSize(11).fillColor(C_BLUE_DARK).font('Helvetica-Bold').text('4 TAHAPAN IMPLEMENTASI CEPAT (ZERO OPERATIONAL DOWNTIME)', 38, 194);
  doc.fontSize(7.2).fillColor(C_TEXT_MUTED).font('Helvetica')
     .text('Metodologi penerapan terstandar untuk menjamin kelancaran operasional harian perusahaan tanpa gangguan:', 38, 206);

  const steps = [
    {
      no: '1',
      time: 'HARI 1–2',
      title: 'Audit & Survei Lokasi',
      desc: 'Inspeksi menyeluruh terhadap topologi CCTV eksisting, kondisi kapasitas jaringan LAN onsite, serta identifikasi titik rawan ancaman keamanan yang memerlukan AI.'
    },
    {
      no: '2',
      time: 'HARI 3–10',
      title: 'Free POC (Uji Coba)',
      desc: 'Pemasangan perangkat demo langsung pada 2–4 kamera eksisting fasilitas Anda selama 7–14 hari kerja tanpa biaya komitmen, agar tim Anda dapat melihat hasilnya.'
    },
    {
      no: '3',
      time: 'HARI 11–14',
      title: 'Deployment & Tuning',
      desc: 'Pemasangan Edge AI Box onsite, integrasi feed RTSP, kalibrasi ambang batas akurasi deteksi AI, serta konfigurasi push alert ke WhatsApp Bot & Telegram grup pos satpam.'
    },
    {
      no: '4',
      time: 'HARI 15+',
      title: 'Training & Garansi 24/7',
      desc: 'Pelatihan operator pos jaga, serah terima buku panduan SOP, serta jaminan Service Level Agreement (SLA) 99.9% dengan dukungan teknis onsite & remote bergaransi.'
    }
  ];

  let stX = 38;
  steps.forEach(st => {
    doc.roundedRect(stX, 220, 124, 102, 5).fillColor(C_CARD_BG).strokeColor(C_BORDER).lineWidth(0.75).fillAndStroke();

    doc.roundedRect(stX + 8, 226, 18, 18, 9).fillColor(C_PRIMARY).strokeColor(C_PRIMARY).fillAndStroke();
    doc.fontSize(9).fillColor('#FFFFFF').font('Helvetica-Bold').text(st.no, stX + 13, 230);

    doc.roundedRect(stX + 32, 228, 55, 12, 3).fillColor('#EFF6FF').strokeColor('#BFDBFE').lineWidth(0.5).fillAndStroke();
    doc.fontSize(5.5).fillColor(C_PRIMARY).font('Helvetica-Bold').text(st.time, stX + 36, 230);

    doc.fontSize(7.5).fillColor(C_TEXT_MAIN).font('Helvetica-Bold').text(st.title, stX + 8, 248, { width: 110 });
    doc.fontSize(6.5).fillColor(C_TEXT_MUTED).font('Helvetica').lineGap(1.5).text(st.desc, stX + 8, 260, { width: 110 });
    stX += 132;
  });

  // 3. Skema Lisensi Fleksibel Perusahaan (y = 334 to 452, h = 118)
  doc.fontSize(11).fillColor(C_BLUE_DARK).font('Helvetica-Bold').text('SKEMA LISENSI PERANGKAT LUNAK FLEKSIBEL', 38, 334);
  doc.fontSize(7.2).fillColor(C_TEXT_MUTED).font('Helvetica')
     .text('Pilihan paket lisensi perangkat lunak modular yang dapat disesuaikan dengan skala infrastruktur organisasi:', 38, 346);

  const tiers = [
    {
      name: 'Starter Tier (4–8 Cam)',
      tag: 'ENTRY LEVEL',
      col: '#0284C7',
      desc: 'Dirancang untuk kantor cabang, ruko komersial, klinik kesehatan, SPBU, dan pergudangan skala kecil.',
      feats: ['Hingga 8 channel kamera simultan', 'Modul Person & Intrusion Tripwire', 'Notifikasi alert via WhatsApp Bot', 'Garansi & SLA Support 8x5']
    },
    {
      name: 'Professional Tier (16–32 Cam)',
      tag: 'PALING POPULER',
      col: '#10B981',
      desc: 'Sangat ideal untuk pabrik manufaktur, komplek perumahan, mall, rumah sakit, dan gedung perkantoran bertingkat.',
      feats: ['Hingga 32 channel kamera Full HD', 'Seluruh 6 modul deteksi AI aktif', 'Integrasi Telegram, Siren, & Relai Fisik', 'Dukungan Prioritas SLA 24/7']
    },
    {
      name: 'Enterprise Tier (Unlimited Cam)',
      tag: 'FULL SCALE MULTI-SITE',
      col: '#8B5CF6',
      desc: 'Arsitektur terpusat multi-site untuk korporasi nasional, kawasan industri terpadu ribuan hektar, dan smart city.',
      feats: ['Kapasitas unlimited kamera multi-cabang', 'Custom AI Model Training onsite', 'Integrasi API VMS / Smart Building ERP', 'Dedicated Technical Account Manager']
    }
  ];

  let plX = 38;
  tiers.forEach(pl => {
    doc.roundedRect(plX, 358, 167, 92, 5).fillColor('#FFFFFF').strokeColor('#CBD5E1').lineWidth(0.75).fillAndStroke();
    doc.roundedRect(plX + 8, 364, 85, 11, 2).fillColor(pl.col).strokeColor(pl.col).fillAndStroke();
    doc.fontSize(5.5).fillColor('#FFFFFF').font('Helvetica-Bold').text(pl.tag, plX + 12, 366);

    doc.fontSize(7.8).fillColor(C_TEXT_MAIN).font('Helvetica-Bold').text(pl.name, plX + 8, 378);
    doc.fontSize(6.2).fillColor(C_TEXT_MUTED).font('Helvetica').lineGap(1).text(pl.desc, plX + 8, 389, { width: 151 });

    let fy = 412;
    pl.feats.forEach(ft => {
      doc.fontSize(6).fillColor('#334155').font('Helvetica').text(`✓ ${ft}`, plX + 8, fy);
      fy += 9;
    });
    plX += 176;
  });

  // 4. Official Corporate Contact Box (y = 458 to 736, h = 278) - FULL LIGHT MODE
  doc.roundedRect(38, 458, 519, 278, 7).fillColor('#F0F7FF').strokeColor('#0284C7').lineWidth(1.2).fillAndStroke();

  // Header Box
  doc.fontSize(13).fillColor('#0F172A').font('Helvetica-Bold').text('MAUDY NETWORK KOMUNIKASI', 52, 472);
  doc.fontSize(7.8).fillColor('#0284C7').font('Helvetica-Bold')
     .text('Mitra Resmi Pengembang Solusi AI Vision Surveillance & Sistem Keamanan Terpadu Indonesia', 52, 488);

  doc.moveTo(52, 500).lineTo(543, 500).strokeColor('#BFDBFE').lineWidth(0.75).stroke();

  // Contact Grid: 2x2 Clean White Cards inside Container
  // 1. WhatsApp Hotline
  doc.roundedRect(52, 508, 238, 64, 4).fillColor('#FFFFFF').strokeColor('#CBD5E1').lineWidth(0.75).fillAndStroke();
  doc.fontSize(7).fillColor('#1E40AF').font('Helvetica-Bold').text('HOTLINE & WHATSAPP RESMI KONSULTASI:', 62, 516);
  doc.fontSize(12).fillColor('#0284C7').font('Helvetica-Bold').text('0852-3319-5874', 62, 528);
  doc.fontSize(6.5).fillColor('#475569').font('Helvetica').lineGap(1)
     .text('Konsultasi teknis, pertanyaan integrasi CCTV, dan pendaftaran jadwal survei demo langsung ke kantor Anda.', 62, 544, { width: 220 });

  // 2. Email Resmi
  doc.roundedRect(304, 508, 239, 64, 4).fillColor('#FFFFFF').strokeColor('#CBD5E1').lineWidth(0.75).fillAndStroke();
  doc.fontSize(7).fillColor('#1E40AF').font('Helvetica-Bold').text('EMAIL RESMI KORPORAT & PENGADAAN:', 314, 516);
  doc.fontSize(11).fillColor('#0284C7').font('Helvetica-Bold').text('admin@maudynetwork.id', 314, 528);
  doc.fontSize(6.5).fillColor('#475569').font('Helvetica').lineGap(1)
     .text('Pengajuan surat penawaran harga resmi, penerbitan dokumen RAB, dan kelengkapan administrasi tender.', 314, 544, { width: 220 });

  // 3. Portal Web
  doc.roundedRect(52, 580, 238, 60, 4).fillColor('#FFFFFF').strokeColor('#CBD5E1').lineWidth(0.75).fillAndStroke();
  doc.fontSize(7).fillColor('#1E40AF').font('Helvetica-Bold').text('PORTAL SISTEM & LIVE DEMO:', 62, 588);
  doc.fontSize(10.5).fillColor('#0284C7').font('Helvetica-Bold').text('https://xtur.exac.site', 62, 599);
  doc.fontSize(6.5).fillColor('#475569').font('Helvetica').lineGap(1)
     .text('Eksplorasi modul deteksi, simulasi ROI interaktif, dan unduh brosur spesifikasi teknis platform.', 62, 614, { width: 220 });

  // 4. Layanan & Jangkauan
  doc.roundedRect(304, 580, 239, 60, 4).fillColor('#FFFFFF').strokeColor('#CBD5E1').lineWidth(0.75).fillAndStroke();
  doc.fontSize(7).fillColor('#1E40AF').font('Helvetica-Bold').text('CAKUPAN LAYANAN & DUKUNGAN ONSITE:', 314, 588);
  doc.fontSize(10.5).fillColor('#0F172A').font('Helvetica-Bold').text('Seluruh Wilayah Republik Indonesia', 314, 599);
  doc.fontSize(6.5).fillColor('#475569').font('Helvetica').lineGap(1)
     .text('Layanan survei lokasi, pengiriman hardware, instalasi fisik, training operator, dan SLA garansi resmi.', 314, 614, { width: 220 });

  // Special Call-To-Action Promo Banner (Soft Light Emerald)
  doc.roundedRect(52, 648, 491, 74, 5).fillColor('#ECFDF5').strokeColor('#10B981').lineWidth(1.2).fillAndStroke();
  doc.fontSize(9.5).fillColor('#065F46').font('Helvetica-Bold')
     .text('PENAWARAN KHUSUS: AJUKAN FREE PROOF-OF-CONCEPT (POC) SEKARANG!', 64, 658);
  doc.fontSize(7.2).fillColor('#047857').font('Helvetica').lineGap(2)
     .text('Buktikan keandalan dan akurasi sistem deteksi XTUR AI langsung pada 2–4 kamera eksisting fasilitas kantor atau pabrik Anda selama 7–14 hari kerja tanpa biaya komitmen apa pun!', 64, 674, { width: 467 })
     .text('Hubungi WhatsApp kami di 0852-3319-5874 atau kirimkan email ke admin@maudynetwork.id untuk memesan jadwal survei tim engineering kami.', 64, 698, { width: 467 });

  // 5. Footer Legal & Compliance Bar (y = 744 to 804, h = 60)
  doc.roundedRect(38, 744, 519, 60, 5).fillColor('#F1F5F9').strokeColor('#CBD5E1').lineWidth(0.75).fillAndStroke();
  doc.fontSize(7.2).fillColor(C_BLUE_DARK).font('Helvetica-Bold')
     .text('STANDAR KEAMANAN, ENKRIPSI & KEPATUHAN HUKUM:', 48, 752);
  doc.fontSize(6.6).fillColor('#475569').font('Helvetica').lineGap(2)
     .text('• Kepatuhan Penuh UU Perlindungan Data Pribadi (UU PDP No. 27/2022) melalui fitur Privacy Face Blur otomatis.', 48, 763, { width: 499 })
     .text('• Arsitektur On-Premise menjamin data rekaman CCTV 100% berada dalam kendali internal perusahaan tanpa kebocoran cloud.', 48, 774, { width: 499 })
     .text('• Seluruh hak cipta, merek dagang, dan algoritma dikembangkan oleh Maudy Network Komunikasi bergaransi resmi.', 48, 785, { width: 499 });

  doc.end();

  writeStream.on('finish', () => {
    const size = fs.statSync(targetFile).size;
    console.log(`Generated: ${targetFile} (${size} bytes)`);
    if (onFinish) onFinish();
  });
}

// Generate both the main PDF file and the summary file
create3PageDocument(outMainPdf, () => {
  create3PageDocument(outSummaryPdf, () => {
    console.log('Successfully created both 3-page summary PDF documents!');
  });
});
