const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const base = 'C:\\Users\\HP\\.gemini\\antigravity-ide\\scratch\\xtur-product-profile';
const exportDir = path.join(base, 'exports');
if (!fs.existsSync(exportDir)) fs.mkdirSync(exportDir, { recursive: true });

const outPdf = path.join(exportDir, 'XTUR-AI-Surveillance-Product-Profile.pdf');
const doc = new PDFDocument({
  size: 'A4',
  margins: { top: 30, bottom: 30, left: 40, right: 40 }
});

const writeStream = fs.createWriteStream(outPdf);
doc.pipe(writeStream);

function getImgPath(name) {
  return path.join(base, 'assets', 'images', name);
}

// Global drawing helpers
function drawHeaderFooter(doc, pageNum, totalPages = 10, sectionName = 'PROFIL PRODUK & SPESIFIKASI') {
  doc.save();
  // Header
  doc.fontSize(7.5).fillColor('#64748B').font('Helvetica-Bold')
     .text(`XTUR VISION AI PLATFORM — ${sectionName.toUpperCase()}`, 40, 20);
  doc.fontSize(7.5).fillColor('#1E40AF').font('Helvetica-Bold')
     .text('MAUDY NETWORK KOMUNIKASI', 40, 20, { align: 'right' });
  doc.moveTo(40, 31).lineTo(555, 31).strokeColor('#CBD5E1').lineWidth(0.5).stroke();

  // Footer
  doc.moveTo(40, 806).lineTo(555, 806).strokeColor('#CBD5E1').lineWidth(0.5).stroke();
  doc.fontSize(7.5).fillColor('#94A3B8').font('Helvetica')
     .text('© 2026 Maudy Network Komunikasi | Portal Resmi: xtur.exac.site | Dokumen Rahasia Perusahaan', 40, 812);
  doc.fontSize(7.5).fillColor('#475569').font('Helvetica-Bold')
     .text(`Halaman ${pageNum} dari ${totalPages}`, 40, 812, { align: 'right' });
  doc.restore();
}

// ==============================================================================
// PAGE 1: COVER (EXECUTIVE POSTER & PRODUCT OVERVIEW)
// ==============================================================================
drawHeaderFooter(doc, 1, 10, 'Executive Overview');

// Top Brand Badge & Subtitle
doc.roundedRect(40, 46, 260, 20, 10).fillColor('#0A192F').strokeColor('#38BDF8').lineWidth(0.75).fillAndStroke();
doc.fontSize(8.5).fillColor('#38BDF8').font('Helvetica-Bold').text('XTUR  |  AI SECURITY MONITORING SYSTEM', 52, 52);

// Title & Tagline from Reference Flyer
doc.fontSize(22).fillColor('#0F172A').font('Helvetica-Bold').text('Smarter Surveillance', 40, 74);
doc.fontSize(22).fillColor('#0284C7').font('Helvetica-Bold').text('for a Safer Tomorrow', 40, 98);

doc.fontSize(8.5).fillColor('#475569').font('Helvetica').lineGap(2.5)
   .text('XTUR adalah software CCTV berbasis Artificial Intelligence yang menggunakan teknologi Object Detection untuk mendeteksi objek, menganalisis kejadian, dan memberikan notifikasi secara real-time. Solusi keamanan cerdas untuk berbagai kebutuhan industri, perusahaan, dan instansi.', 40, 126, { width: 515 });

// 6 Key Capabilities Badges from Poster
const posterCaps = [
  '• Real-time Detection',
  '• AI Powered Analytics',
  '• Multi Camera Support',
  '• Instant Alert & Notif',
  '• Easy to Use Dashboard',
  '• Scalable Solution'
];
posterCaps.forEach((cap, idx) => {
  const col = idx % 3;
  const row = Math.floor(idx / 3);
  const x = 40 + col * 175;
  const y = 168 + row * 24;
  doc.roundedRect(x, y, 165, 19, 9.5).fillColor('#F0F9FF').strokeColor('#BAE6FD').lineWidth(0.5).fillAndStroke();
  doc.fontSize(7.8).fillColor('#0369A1').font('Helvetica-Bold').text(cap, x + 10, y + 5);
});

// Center Showcase Card: Executive Poster Visual
const imgPoster = getImgPath('xtur-overview-poster.jpg');
const imgCover = fs.existsSync(imgPoster) ? imgPoster : getImgPath('01-dashboard-overview.png');
if (fs.existsSync(imgCover)) {
  doc.roundedRect(40, 222, 515, 355, 6).fillColor('#FFFFFF').strokeColor('#CBD5E1').lineWidth(0.75).fillAndStroke();
  doc.image(imgCover, 46, 228, { fit: [503, 330], align: 'center', valign: 'center' });
  doc.fontSize(7.5).fillColor('#64748B').font('Helvetica-Bold')
     .text('Gambar 1: Lembar Ikhtisar Resmi XTUR AI Security Monitoring System — Dashboard AI & Deteksi Multi-Objek', 40, 563, { align: 'center', width: 515 });
}

// Publisher Metadata Table at Bottom
doc.roundedRect(40, 588, 515, 80, 5).fillColor('#0A192F').strokeColor('#1E3A8A').lineWidth(0.75).fillAndStroke();
doc.fontSize(10).fillColor('#60A5FA').font('Helvetica-Bold').text('LEMBAR PENGESAHAN DOKUMEN PROFIL PRODUK', 55, 600);
doc.fontSize(8).fillColor('#CBD5E1').font('Helvetica').lineGap(3)
   .text('Nama Entitas Pengembang : Maudy Network Komunikasi', 55, 618)
   .text('Bidang Keahlian Bisnis   : AI Computer Vision, IoT Surveillance & Smart City Solutions', 55, 631)
   .text('Status Distribusi Dokumen: Komersial Enterprise (Edisi Resmi 2026)', 55, 644)
   .text('Kanal Informasi Resmi    : Portal: xtur.exac.site | Email: admin@maudynetwork.id | WA: 0852-3319-5874', 55, 657);

// ==============================================================================
// PAGE 2: BAB 01: PENDEKATAN MANUSIAWI & ANALISIS MASALAH
// ==============================================================================
doc.addPage();
drawHeaderFooter(doc, 2, 10, 'Bab 01: Pendekatan Solusi');

doc.fontSize(16).fillColor('#1E40AF').font('Helvetica-Bold').text('BAB 01: MENGAPA CCTV BIASA TAK LAGI CUKUP?', 40, 48);
doc.fontSize(9).fillColor('#475569').font('Helvetica').text('Meringankan beban kelelahan petugas keamanan melalui asisten cerdas yang siaga 24 jam.', 40, 68);

// Two Comparison Boxes
// Left: Problem
doc.roundedRect(40, 88, 250, 160, 5).fillColor('#FEF2F2').strokeColor('#FECACA').lineWidth(0.75).fillAndStroke();
doc.fontSize(10).fillColor('#DC2626').font('Helvetica-Bold').text('Kelemahan CCTV Biasa (Legacy)', 52, 98);
doc.fontSize(8).fillColor('#475569').font('Helvetica').lineGap(2.5)
   .text('• Kelelahan Fisik Operator:', 52, 116, { bold: true })
   .text('Setelah 20 menit menatap layar monitor, fokus mata manusia turun hingga 45%. Peristiwa genting rawan terlewat.', 52, 127, { width: 226 })
   .text('• Respon Pasif & Terlambat (Post-Mortem):', 52, 155)
   .text('Hanya merekam setelah musibah terjadi, tidak ada pencegahan dini terhadap penerobosan.', 52, 166, { width: 226 })
   .text('• Audit Rekaman Melelahkan:', 52, 194)
   .text('Memutar rekaman video berjam-jam secara manual demi menemukan satu kejadian singkat.', 52, 205, { width: 226 });

// Right: Solution
doc.roundedRect(305, 88, 250, 160, 5).fillColor('#ECFDF5').strokeColor('#A7F3D0').lineWidth(0.75).fillAndStroke();
doc.fontSize(10).fillColor('#059669').font('Helvetica-Bold').text('Solusi Cerdas XTUR AI Platform', 317, 98);
doc.fontSize(8).fillColor('#475569').font('Helvetica').lineGap(2.5)
   .text('• Asisten Setia 24 Jam Non-Stop:', 317, 116)
   .text('Menganalisis frame dalam 4.2 ms dan membunyikan peringatan suara seketika pada detik kejadian.', 317, 127, { width: 226 })
   .text('• Menghormati Hak Privasi (Face Blur):', 317, 155)
   .text('Secara otomatis mengaburkan wajah pejalan kaki demi kepatuhan terhadap regulasi UU PDP.', 317, 166, { width: 226 })
   .text('• Pencarian Bukti Cepat 1 Detik:', 317, 194)
   .text('Temukan plat nomor, kategori kendaraan, dan orang seketika berdasarkan filter tanggal.', 317, 205, { width: 226 });

// Table Comparison
doc.fontSize(10.5).fillColor('#0F172A').font('Helvetica-Bold').text('Matriks Evaluasi: CCTV Biasa vs XTUR AI Surveillance', 40, 264);

const tY = 280;
doc.roundedRect(40, tY, 515, 145, 4).strokeColor('#E2E8F0').lineWidth(0.75).stroke();
doc.rect(40, tY, 515, 20).fillColor('#F1F5F9').fill();
doc.fontSize(8).fillColor('#0F172A').font('Helvetica-Bold')
   .text('Parameter Evaluasi', 48, tY + 6, { width: 120 })
   .text('CCTV Biasa (Legacy)', 175, tY + 6, { width: 140 })
   .text('Dengan XTUR AI Vision', 320, tY + 6, { width: 140 })
   .text('Manfaat Bagi Bisnis', 465, tY + 6, { width: 85 });

const matrixRows = [
  ['Beban Petugas Jaga', 'Stres, jenuh menatap layar terus', 'Tenang, asisten AI memberi alarm', 'Bebas kelelahan fatal'],
  ['Kecepatan Respon', 'Lambat (15 – 60 menit kemudian)', 'Real-time (< 1 detik kejadian)', 'Cegah kerugian dini'],
  ['Akurasi Deteksi', 'Banyak false alarm (angin/kucing)', 'Akurat: Orang/Mobil/Motor/Truk', 'Bebas informasi palsu'],
  ['Identifikasi Plat', 'Dizoom dan dicatat manual', 'Otomatis via OCR + Database Kota', 'Audit forensik rapi'],
  ['Investasi Kamera', 'Harus beli kamera merk khusus', 'Gunakan kamera lama via RTSP', 'Nol CapEx Baru']
];

matrixRows.forEach((r, idx) => {
  const rowY = tY + 20 + idx * 25;
  doc.moveTo(40, rowY).lineTo(555, rowY).strokeColor('#E2E8F0').lineWidth(0.5).stroke();
  doc.fontSize(7.5).fillColor('#334155').font('Helvetica')
     .text(r[0], 48, rowY + 7, { width: 120 })
     .text(r[1], 175, rowY + 7, { width: 140 })
     .text(r[2], 320, rowY + 7, { width: 140, bold: true })
     .text(r[3], 465, rowY + 7, { width: 85 });
});

// 3 Value Pillars Box
doc.fontSize(10.5).fillColor('#0F172A').font('Helvetica-Bold').text('3 Prinsip Humanis Pengawasan XTUR AI:', 40, 442);
const pillars = [
  { n: '1', t: 'Empati Operasional', d: 'Meringankan mata dan fisik petugas keamanan sehingga mereka bisa fokus pada tindakan pengamanan fisik nyata.' },
  { n: '2', t: 'Privasi Beretika (UU PDP)', d: 'Otomatis memburamkan wajah subjek sipil untuk mematuhi Undang-Undang Perlindungan Data Pribadi tanpa mengurangi akurasi deteksi.' },
  { n: '3', t: 'Transparansi Forensik', d: 'Menyediakan tombol verifikasi manusia (Human-in-the-Loop) sehingga petugas memiliki hak koreksi terhadap model AI.' }
];

pillars.forEach((pl, idx) => {
  const x = 40 + idx * 175;
  doc.roundedRect(x, 460, 165, 80, 4).fillColor('#FFFFFF').strokeColor('#CBD5E1').lineWidth(0.75).fillAndStroke();
  doc.roundedRect(x + 10, 470, 18, 18, 9).fillColor('#1E40AF').fill();
  doc.fontSize(9).fillColor('#FFFFFF').font('Helvetica-Bold').text(pl.n, x + 10, 474, { width: 18, align: 'center' });
  doc.fontSize(8.5).fillColor('#0F172A').font('Helvetica-Bold').text(pl.t, x + 34, 473, { width: 122 });
  doc.fontSize(7.5).fillColor('#475569').font('Helvetica').lineGap(2).text(pl.d, x + 10, 496, { width: 145 });
});

// Quote Callout
doc.roundedRect(40, 554, 515, 45, 4).fillColor('#F8FAFC').strokeColor('#CBD5E1').lineWidth(0.5).fillAndStroke();
doc.fontSize(8.5).fillColor('#1E40AF').font('Helvetica-Oblique')
   .text('"XTUR hadir bukan untuk menggantikan manusia, melainkan menjadi asisten jeli yang meringankan pekerjaan sehari-hari petugas keamanan fasilitas Anda."', 52, 570, { width: 490, align: 'center' });

// ==============================================================================
// PAGE 3: BAB 02: PONDASI TEKNOLOGI & ARSITEKTUR
// ==============================================================================
doc.addPage();
drawHeaderFooter(doc, 3, 10, 'Bab 02: Pondasi Teknologi');

doc.fontSize(16).fillColor('#1E40AF').font('Helvetica-Bold').text('BAB 02: PONDASI TEKNOLOGI & ARSITEKTUR INTI', 40, 48);
doc.fontSize(9).fillColor('#475569').font('Helvetica').text('Integrasi model deep learning modern dengan efisiensi komputasi server komersial.', 40, 68);

const techItems = [
  {
    title: '1. Model Deteksi YOLOv8 (TensorRT CUDA)',
    desc: 'Model neural network yang mengeksekusi inferensi pada citra 640x640 dalam latensi 4.2 ms / frame dengan akselerasi NVIDIA TensorRT. Menjamin deteksi akurat siang & malam.'
  },
  {
    title: '2. Pelacakan Objek DeepSORT (Persistent Tracking)',
    desc: 'Memadukan Kalman Filter dan Deep Appearance Descriptors untuk mengunci Track ID unik (#1205, #1204) pada setiap objek, mencegah duplikasi hitungan saat objek tertutup sejenak.'
  },
  {
    title: '3. Secondary OCR Pipeline (EasyOCR ALPR & DeepFace)',
    desc: 'Pipeline cerdas yang membaca nomor polisi kendaraan Indonesia dan mengestimasi demografi pejalan kaki secara etis tanpa membebani thread deteksi utama.'
  },
  {
    title: '4. MediaMTX Gateway & Redis Ingest Buffer',
    desc: 'Gerbang ingesti multi-kamera RTSP berlatensi nol dengan filter 5 FPS (200 ms). Antrian memori Redis capped 22 MB menjamin sistem stabil, dingin, dan bebas kebocoran memori.'
  }
];

techItems.forEach((t, idx) => {
  const y = 88 + idx * 72;
  doc.roundedRect(40, y, 515, 64, 4).fillColor('#FFFFFF').strokeColor('#E2E8F0').lineWidth(0.75).fillAndStroke();
  doc.fontSize(9.5).fillColor('#1E40AF').font('Helvetica-Bold').text(t.title, 52, y + 9);
  doc.fontSize(7.8).fillColor('#475569').font('Helvetica').lineGap(2).text(t.desc, 52, y + 24, { width: 490 });
});

// Architecture Flow ASCII Box
const aY = 385;
doc.roundedRect(40, aY, 515, 140, 5).fillColor('#0A192F').fill();
doc.fontSize(8.5).fillColor('#38BDF8').font('Helvetica-Bold').text('DIAGRAM ALUR PEMROSESAN DATA REAL-TIME XTUR AI', 52, aY + 10);
const flowText = 
`[ Kamera CCTV (RTSP Stream) ] ───► [ MediaMTX Gateway (Port 8554) ]
                                          │ (Ekstraksi 5 FPS / 200 ms)
                                          ▼
                           [ Redis Ingest Buffer (MAXLEN 50) ]
                                          │
                                          ▼
                           [ YOLOv8 Inference (4.2 ms / Frame) ]
                                          │
                            [ DeepSORT Tracking Engine ]
                                          │
                ┌─────────────────────────┴─────────────────────────┐
                ▼                                                   ▼
    [ Kendaraan: EasyOCR ALPR ]                         [ Orang: Face Blur Filter ]
                │                                                   │
                └─────────────────────────┬─────────────────────────┘
                                          ▼
       [ PostgreSQL Database ]   ───►   [ Web Dashboard & Notifikasi Alert ]`;
doc.fontSize(6.8).fillColor('#60A5FA').font('Courier').lineGap(2).text(flowText, 52, aY + 26);

// Benchmark Table
doc.fontSize(10).fillColor('#0F172A').font('Helvetica-Bold').text('Uji Performa Nyata (Hardware Benchmark XTUR Engine):', 40, 538);
const bTableY = 554;
doc.roundedRect(40, bTableY, 515, 75, 4).strokeColor('#E2E8F0').lineWidth(0.75).stroke();
doc.rect(40, bTableY, 515, 18).fillColor('#F1F5F9').fill();
doc.fontSize(7.5).fillColor('#0F172A').font('Helvetica-Bold')
   .text('Komponen Benchmark', 48, bTableY + 5, { width: 140 })
   .text('Nilai Hasil Uji Lapangan', 195, bTableY + 5, { width: 150 })
   .text('Keterangan Keandalan', 355, bTableY + 5, { width: 190 });

const benchRows = [
  ['Beban CPU Host (i7-14700F)', '21% Rata-rata (4 Kamera Live)', 'Sangat dingin, tidak memerlukan pendingin khusus'],
  ['Penggunaan Memori RAM', '8.04 GB / 15.11 GB (53%)', 'Alokasi memori stabil, bebas memory leak'],
  ['Latensi Inferensi YOLOv8', '4.2 milidetik per frame', 'Akselerasi hardware NVIDIA CUDA TensorRT']
];
benchRows.forEach((br, idx) => {
  const rowY = bTableY + 18 + idx * 19;
  doc.moveTo(40, rowY).lineTo(555, rowY).strokeColor('#E2E8F0').lineWidth(0.5).stroke();
  doc.fontSize(7.5).fillColor('#334155').font('Helvetica')
     .text(br[0], 48, rowY + 5, { width: 140 })
     .text(br[1], 195, rowY + 5, { width: 150, bold: true })
     .text(br[2], 355, rowY + 5, { width: 190 });
});

// ==============================================================================
// ==============================================================================
// PAGE 4: BAB 03: KEMAMPUAN DETEKSI OBJEK (OBJECT DETECTION)
// ==============================================================================
doc.addPage();
drawHeaderFooter(doc, 4, 10, 'Bab 03: Kemampuan Deteksi');

doc.fontSize(16).fillColor('#1E40AF').font('Helvetica-Bold').text('BAB 03: KEMAMPUAN DETEKSI OBJEK (AI DETECTION)', 40, 48);
doc.fontSize(9).fillColor('#475569').font('Helvetica').text('Mendeteksi berbagai objek dan kejadian penting dengan akurasi tinggi menggunakan teknologi AI.', 40, 68);

// 6 Core Detection Cards Matching Reference Flyer Exactly
const detCards = [
  { t: 'Person Detection', badge: 'PEOPLE', d: 'Deteksi orang dengan akurasi tinggi dan pelacakan Track ID unik.', col: '#0284C7', bg: '#F0F9FF', bdr: '#BAE6FD' },
  { t: 'Vehicle Detection', badge: 'VEHICLE', d: 'Deteksi kendaraan (mobil, motor, truk, bus) untuk logistik dan parkir.', col: '#2563EB', bg: '#EFF6FF', bdr: '#BFDBFE' },
  { t: 'PPE Detection', badge: 'SAFETY', d: 'Deteksi kepatuhan penggunaan APD keselamatan kerja (helm, rompi, dll).', col: '#D97706', bg: '#FFFBEB', bdr: '#FDE68A' },
  { t: 'Fire & Smoke Detection', badge: 'HAZARD', d: 'Deteksi asap dan api secara real-time untuk pencegahan dini kebakaran.', col: '#DC2626', bg: '#FEF2F2', bdr: '#FECACA' },
  { t: 'Intrusion Detection', badge: 'SECURITY', d: 'Deteksi penyusup melintasi garis batas terlarang atau perimeter pagar.', col: '#E11D48', bg: '#FFF1F2', bdr: '#FECDD3' },
  { t: 'Crowd Detection', badge: 'MONITOR', d: 'Deteksi kerumunan orang melebihi batas aman untuk ketertiban fasilitas.', col: '#4F46E5', bg: '#EEF2FF', bdr: '#C7D2FE' }
];

detCards.forEach((dc, idx) => {
  const col = idx % 2;
  const row = Math.floor(idx / 2);
  const x = 40 + col * 262;
  const y = 88 + row * 66;

  doc.roundedRect(x, y, 253, 58, 4).fillColor(dc.bg).strokeColor(dc.bdr).lineWidth(0.75).fillAndStroke();
  
  // Badge
  doc.roundedRect(x + 10, y + 8, 55, 13, 3).fillColor(dc.col).fill();
  doc.fontSize(6.5).fillColor('#FFFFFF').font('Helvetica-Bold').text(dc.badge, x + 10, y + 11, { width: 55, align: 'center' });
  
  doc.fontSize(9).fillColor('#0F172A').font('Helvetica-Bold').text(dc.t, x + 72, y + 8);
  doc.fontSize(7.5).fillColor('#475569').font('Helvetica').lineGap(2).text(dc.d, x + 10, y + 26, { width: 233 });
});

// Operational Benefits Strip
doc.fontSize(10.5).fillColor('#0F172A').font('Helvetica-Bold').text('Indikator Kinerja & Dampak Positif Bagi Organisasi:', 40, 300);
const kpiBoxes = [
  { val: '94%', lbl: 'Penurunan False Alarm', d: 'Menghilangkan alarm palsu akibat hembusan angin atau hewan.' },
  { val: '10x', lbl: 'Lebih Cepat Temu Bukti', d: 'Audit insiden selesai dalam hitungan detik tanpa memutar video.' },
  { val: '0 Rp', lbl: 'Biaya Penggantian Kamera', d: 'Menggunakan kamera IP eksisting dengan protokol RTSP/ONVIF.' }
];
kpiBoxes.forEach((kp, idx) => {
  const x = 40 + idx * 175;
  doc.roundedRect(x, 385, 165, 80, 4).fillColor('#F8FAFC').strokeColor('#E2E8F0').lineWidth(0.75).fillAndStroke();
  doc.fontSize(16).fillColor('#1E40AF').font('Helvetica-Bold').text(kp.val, x + 10, 395);
  doc.fontSize(8.5).fillColor('#0F172A').font('Helvetica-Bold').text(kp.lbl, x + 10, 416);
  doc.fontSize(7.2).fillColor('#64748B').font('Helvetica').lineGap(1.5).text(kp.d, x + 10, 430, { width: 145 });
});

// Deployment Steps
doc.fontSize(10.5).fillColor('#0F172A').font('Helvetica-Bold').text('Alur Pemantauan Deteksi 5 Langkah Terpadu:', 40, 480);
const dSteps = [
  '1. Kamera CCTV mengirim aliran video via RTSP ke server lokal XTUR.',
  '2. Gateway MediaMTX menyaring aliran pada 5 FPS terukur agar server tetap dingin.',
  '3. Engine YOLOv8 mendeteksi objek dalam 4.2 ms dan mengunci nomor ID unik.',
  '4. Engine ALPR membaca plat nomor dan modul privasi memburamkan wajah orang.',
  '5. Alarm berbunyi di pos jaga dan foto bukti langsung tersimpan di buku log.'
];
dSteps.forEach((ds, idx) => {
  const y = 500 + idx * 18;
  doc.fontSize(7.8).fillColor('#1E40AF').font('Helvetica-Bold').text(`Langkah ${idx + 1}:`, 48, y);
  doc.fontSize(7.8).fillColor('#475569').font('Helvetica').text(ds.substring(3), 105, y, { width: 440 });
});

// Helper for Screenshot Showcase Pages
function renderShowcasePage(doc, pageNum, babTitle, heading, subtext, imgName, figCaption, cardsData, takeaway) {
  doc.addPage();
  drawHeaderFooter(doc, pageNum, 10, babTitle);

  doc.fontSize(16).fillColor('#1E40AF').font('Helvetica-Bold').text(heading.toUpperCase(), 40, 48);
  doc.fontSize(8.8).fillColor('#475569').font('Helvetica').text(subtext, 40, 68);

  // Centered Screenshot
  const imgP = getImgPath(imgName);
  if (fs.existsSync(imgP)) {
    doc.roundedRect(40, 86, 515, 270, 5).fillColor('#FFFFFF').strokeColor('#CBD5E1').lineWidth(0.75).fillAndStroke();
    doc.image(imgP, 48, 94, { width: 499, height: 242 });
    doc.fontSize(7.5).fillColor('#64748B').font('Helvetica-Bold')
       .text(figCaption, 40, 342, { align: 'center', width: 515 });
  }

  // 2 Structured Cards Below Screenshot
  const cardY = 368;
  cardsData.forEach((cd, idx) => {
    const x = 40 + idx * 262;
    doc.roundedRect(x, cardY, 253, 155, 4).fillColor('#F8FAFC').strokeColor('#E2E8F0').lineWidth(0.75).fillAndStroke();
    doc.fontSize(9.5).fillColor('#0F172A').font('Helvetica-Bold').text(cd.title, x + 10, cardY + 10);
    
    let curY = cardY + 28;
    cd.items.forEach(it => {
      doc.fontSize(7.8).fillColor('#1E40AF').font('Helvetica-Bold').text(`• ${it.h}:`, x + 10, curY, { width: 233 });
      curY += 12;
      doc.fontSize(7.5).fillColor('#475569').font('Helvetica').lineGap(1.5).text(it.d, x + 18, curY, { width: 225 });
      curY += 28;
    });
  });

  // Executive Takeaway Banner
  const takeY = 535;
  doc.roundedRect(40, takeY, 515, 48, 4).fillColor('#ECFDF5').strokeColor('#A7F3D0').lineWidth(0.75).fillAndStroke();
  doc.fontSize(8.5).fillColor('#059669').font('Helvetica-Bold').text('✓ KESIMPULAN EKSEKUTIF DARI MODUL INI:', 52, takeY + 8);
  doc.fontSize(7.8).fillColor('#334155').font('Helvetica').lineGap(2).text(takeaway, 52, takeY + 22, { width: 490 });
}

// ==============================================================================
// PAGE 5: SHOWCASE DASHBOARD OVERVIEW
// ==============================================================================
renderShowcasePage(
  doc, 5, 'Bab 04: Konsol Utama',
  'BAB 04: PUSAT PEMANTAUAN — DASHBOARD OVERVIEW',
  'Visibilitas menyeluruh kesehatan infrastruktur 4 kamera dan grafik deteksi objek harian.',
  '01-dashboard-overview.png',
  'Gambar 2: Antarmuka Dashboard Overview XTUR (xtur.exac.site/dashboard)',
  [
    {
      title: 'Fitur Utama & Metrik Operasional',
      items: [
        { h: 'Status Infrastruktur 4 Kamera', d: 'Kamera J30B, A5, Samping, dan Depan siaga online dengan status sistem Healthy (99.9%).' },
        { h: 'Grafik Deteksi Harian', d: 'Tren volume objek tercatat (6-9 Sep) dengan beban puncak sebanyak 868 objek pada 8 Sep.' },
        { h: 'Distribusi Kategori Objek', d: 'Pejalan Kaki (1.134 unit), Mobil (349 unit), Sepeda Motor (244 unit), Truk (6 unit), Bus (1 unit).' }
      ]
    },
    {
      title: 'Manfaat Nyata Bagi Petugas Jaga',
      items: [
        { h: 'Pembaruan Data Otomatis', d: 'Data statistik terus diperbarui tanpa operator perlu me-refresh halaman browser.' },
        { h: 'Filter Rentang Fleksibel', d: 'Evaluasi instan aktivitas dengan pilihan 1 Hari, 7 Hari, 1 Bulan, hingga rentang kustom.' },
        { h: 'Navigasi Satu Klik', d: 'Pintasan langsung ke log detail objek atau pengaturan kamera hanya dengan satu klik.' }
      ]
    }
  ],
  'Dashboard Overview menghadirkan visibilitas tingkat tinggi yang membebaskan pimpinan dan petugas jaga dari ketidakpastian. Hanya dalam 3 detik pertama membuka layar, Anda sudah mengetahui status operasional seluruh kamera fasilitas.'
);

// ==============================================================================
// PAGE 6: SHOWCASE DETECTION LOGS & MULTI-CAMERA
// ==============================================================================
renderShowcasePage(
  doc, 6, 'Bab 05: Audit Forensik',
  'BAB 05: BUKU LOG DETEKSI & AUDIT FORENSIK',
  'Pencatatan bukti visual tak terbantahkan dengan Track ID unik dan tingkat akurasi transparan.',
  '02-detection-logs.png',
  'Gambar 3: Log Deteksi Forensik — Thumbnail Foto Asli, Waktu, Kamera, Track ID & Nilai Akurasi',
  [
    {
      title: 'Kemampuan Forensik & Verifikasi',
      items: [
        { h: 'Snapshot Foto Detik Kejadian', d: 'Setiap baris log dilengkapi cuplikan foto asli tanpa perlu membongkar arsip video.' },
        { h: 'Track ID & Nilai Akurasi', d: 'Melacak mobil #1205 (89.5%), motor #1204 (77.5%), dan pejalan kaki #412 (78.7%).' },
        { h: 'Verifikasi Petugas (Incorrect)', d: 'Mekanisme koreksi oleh manusia untuk melatih AI agar semakin pintar dan presisi.' }
      ]
    },
    {
      title: 'Efisiensi Waktu & Nilai Hukum',
      items: [
        { h: 'Pencarian Cepat 1 Detik', d: 'Cari bukti insiden seketika berdasarkan nomor plat, tanggal, atau nama kamera.' },
        { h: 'Ekspor Resmi CSV & PDF', d: 'Unduh rekaman data siap cetak untuk lampiran laporan resmi kepada kepolisian.' },
        { h: 'Pencegahan Sengketa Parkir', d: 'Bukti foto jam masuk dan keluar kendaraan tersimpan rapi untuk mencegah kecurangan.' }
      ]
    }
  ],
  'Modul Detection Logs mengubah CCTV dari sekadar alat pasif menjadi bukti audit forensik yang valid. Waktu yang biasanya dihabiskan berjam-jam untuk mencari rekaman kini dipangkas menjadi hitungan detik.'
);

// ==============================================================================
// PAGE 7: SHOWCASE ANALITIK JAM SIBUK & WILAYAH
// ==============================================================================
renderShowcasePage(
  doc, 7, 'Bab 06: Analitik Fasilitas',
  'BAB 06: ANALISIS JAM SIBUK 24 JAM & ASAL WILAYAH',
  'Mengubah rekaman CCTV menjadi intelijen operasional untuk efisiensi penugasan personel.',
  '05-reports-analytics-bottom.png',
  'Gambar 4: Analisis Jam Sibuk 24 Jam, Peringkat Wilayah Asal Plat Nomor & Utilisasi Kamera',
  [
    {
      title: 'Wawasan Analitik Strategis',
      items: [
        { h: 'Grafik Jam Sibuk 24 Jam', d: 'Peta kepadatan aktivitas dari jam 00:00 s.d. 23:00 untuk penjadwalan patroli optimal.' },
        { h: 'Peringkat Asal Wilayah Kendaraan', d: 'Karawang/Purwakarta (11 unit), Banten (4 unit), Garut (2 unit), Semarang (1 unit).' },
        { h: 'Distribusi Beban Kamera', d: 'Kamera J30B (33%), Samping (27%), Depan (24%), dan A5 (16%).' }
      ]
    },
    {
      title: 'Aplikasi Rekayasa & Logistik',
      items: [
        { h: 'Optimalisasi Petugas Shift', d: 'Menempatkan lebih banyak personel pada jam puncak dan menghemat energi saat lengang.' },
        { h: 'Audit Akses Kendaraan Luar Kota', d: 'Sangat berguna bagi gerbang pelabuhan, jalan tol, dan kompleks pergudangan logistik.' },
        { h: 'Perencanaan Tata Kelola Ruang', d: 'Mengetahui jalur paling ramai untuk pemeliharaan aspal dan penerangan jalan.' }
      ]
    }
  ],
  'Data rekaman CCTV tidak lagi terbuang percuma. Analisis jam sibuk dan asal wilayah memberikan wawasan berharga bagi manajemen untuk mengambil keputusan operasional yang tepat berbasis data empiris.'
);

// ==============================================================================
// PAGE 8: SHOWCASE KESEHATAN ENGINE & DATABASE PLAT
// ==============================================================================
renderShowcasePage(
  doc, 8, 'Bab 07: Kinerja Server',
  'BAB 07: KESEHATAN SERVER & DATABASE PLAT INDONESIA',
  'Transparansi beban komputasi server dan katalog 57 kode wilayah plat nomor nasional.',
  '06-engine-health.png',
  'Gambar 5: Telemetri Beban CPU (21%), RAM (53%), Buffer Redis, dan Latensi 4.2 ms',
  [
    {
      title: 'Telemetri Hardware & Stabilitas',
      items: [
        { h: 'Beban CPU Host Hanya 21%', d: 'Diuji pada Intel Core i7-14700F (16 Cores) dengan temperatur stabil dan dingin.' },
        { h: 'Penggunaan Memori RAM 53%', d: 'Mengonsumsi 8.04 GB dari 15.11 GB, terbukti bebas dari kebocoran memori (leak-free).' },
        { h: 'Buffer Redis Terjaga 22 MB', d: 'Capped buffer memastikan sistem tidak pernah crash saat terjadi lonjakan trafik video.' }
      ]
    },
    {
      title: 'Database Plat Nomor Indonesia',
      items: [
        { h: 'Katalog 57 Kode Wilayah', d: 'Mencakup seluruh kode plat di Pulau Jawa (B, D, F, AB, dsb), Sumatera, dan Kalimantan.' },
        { h: 'Pengenalan Karesidenan Instan', d: 'Sistem langsung mengasosiasikan kode plat nomor dengan kota penerbit resmi.' },
        { h: 'Kompatibilitas Plat Hitam & Putih', d: 'Dilatih khusus untuk mengenali plat nomor hitam lama maupun plat nomor putih terbaru.' }
      ]
    }
  ],
  'XTUR Platform membuktikan bahwa teknologi AI Vision kelas dunia dapat berjalan stabil di atas server komersial yang terjangkau, tanpa menuntut superkomputer mahal dengan biaya perawatan tinggi.'
);

// ==============================================================================
// ==============================================================================
// PAGE 9: BAB 08: SPESIFIKASI SISTEM & ESTIMASI ROI
// ==============================================================================
doc.addPage();
drawHeaderFooter(doc, 9, 10, 'Bab 08: Spesifikasi & ROI');

doc.fontSize(16).fillColor('#1E40AF').font('Helvetica-Bold').text('BAB 08: SPESIFIKASI SISTEM (HARDWARE & SOFTWARE)', 40, 48);
doc.fontSize(9).fillColor('#475569').font('Helvetica').text('Performa Optimal untuk Keamanan Maksimal — Standar Rekomendasi Resmi Sistem XTUR AI.', 40, 68);

// 9 Specifications Grid matching flyer exactly
const posterSpecs = [
  { k: 'CCTV IP Camera', v: 'RTSP / ONVIF Compatible (2MP / 4MP / 8MP)' },
  { k: 'Server GPU', v: 'NVIDIA GPU (Minimal RTX 3060) atau setara' },
  { k: 'CPU Host', v: 'Intel i7 / AMD Ryzen 7 (Minimum)' },
  { k: 'RAM Memori', v: '16 GB (Minimum)' },
  { k: 'Storage SSD', v: 'SSD 512 GB (Minimum) (Disesuaikan kebutuhan)' },
  { k: 'Network Jaringan', v: 'LAN / Internet (Minimal 100 Mbps)' },
  { k: 'Sistem Operasi', v: 'Ubuntu 20.04+ / Windows 10/11' },
  { k: 'Database', v: 'PostgreSQL / MySQL' },
  { k: 'Web Browser', v: 'Chrome / Firefox / Edge (HTML5 Support)' }
];

posterSpecs.forEach((sp, idx) => {
  const col = idx % 3;
  const row = Math.floor(idx / 3);
  const x = 40 + col * 175;
  const y = 88 + row * 45;

  doc.roundedRect(x, y, 165, 38, 4).fillColor('#FFFFFF').strokeColor('#CBD5E1').lineWidth(0.75).fillAndStroke();
  doc.fontSize(8).fillColor('#1E40AF').font('Helvetica-Bold').text(sp.k, x + 8, y + 6, { width: 149 });
  doc.fontSize(7.2).fillColor('#334155').font('Helvetica').lineGap(1.5).text(sp.v, x + 8, y + 18, { width: 149 });
});

// Fast-Track Deployment Schedule
doc.fontSize(10.5).fillColor('#0F172A').font('Helvetica-Bold').text('Jadwal Penggelaran Cepat 10 Hari (Fast-Track Onboarding):', 40, 230);
const sched = [
  { d: 'Hari 1 – 3: Audit Jaringan & Kamera', c: 'Pemeriksaan alamat RTSP kamera eksisting tanpa mengubah tarikan kabel fisik fasilitas.' },
  { d: 'Hari 4 – 6: Instalasi Server & Tuning AI', c: 'Pemasangan server lokal, konfigurasi ambang batas 75%, dan katalog wilayah plat nomor.' },
  { d: 'Hari 7 – 8: Uji Coba Lapangan (UAT)', c: 'Simulasi penerobosan zona batas dan pengujian keandalan sirene alarm di pos jaga.' },
  { d: 'Hari 9 – 10: Edukasi Operator & Go-Live', c: 'Pelatihan praktis petugas pos pengamanan dan serah terima dokumen operasional.' }
];

sched.forEach((sc, idx) => {
  const y = 248 + idx * 34;
  doc.roundedRect(40, y, 515, 28, 4).fillColor('#F8FAFC').strokeColor('#E2E8F0').lineWidth(0.5).fillAndStroke();
  doc.fontSize(8).fillColor('#1E40AF').font('Helvetica-Bold').text(sc.d, 50, y + 5, { width: 160 });
  doc.fontSize(7.5).fillColor('#475569').font('Helvetica').text(sc.c, 215, y + 5, { width: 330 });
});

// ROI Simulation Table
doc.fontSize(10.5).fillColor('#0F172A').font('Helvetica-Bold').text('Tabel Estimasi Efisiensi Anggaran Tahunan (Simulasi ROI):', 40, 398);
const roiRows = [
  ['Usaha Menengah (4 – 8 Cam)', '4 Petugas Shift', '85% Lebih Cepat', 'Rp 45.000.000 – Rp 65.000.000 / thn'],
  ['Pabrik / Pergudangan (16 – 32 Cam)', '8 Petugas Shift', '92% Lebih Cepat', 'Rp 120.000.000 – Rp 240.000.000 / thn'],
  ['Kawasan Industri (64+ Cam)', '16+ Petugas', '96% Lebih Cepat', 'Rp 450.000.000+ / thn']
];

const rTableY = 416;
doc.roundedRect(40, rTableY, 515, 78, 4).strokeColor('#E2E8F0').lineWidth(0.75).stroke();
doc.rect(40, rTableY, 515, 18).fillColor('#ECFDF5').fill();
doc.fontSize(7.5).fillColor('#059669').font('Helvetica-Bold')
   .text('Skala Fasilitas Organisasi', 48, rTableY + 5, { width: 140 })
   .text('Jumlah Petugas', 195, rTableY + 5, { width: 95 })
   .text('Kecepatan Temu Bukti', 295, rTableY + 5, { width: 110 })
   .text('Potensi Efisiensi Biaya', 415, rTableY + 5, { width: 130 });

roiRows.forEach((r, idx) => {
  const y = rTableY + 18 + idx * 20;
  doc.moveTo(40, y).lineTo(555, y).strokeColor('#E2E8F0').lineWidth(0.5).stroke();
  doc.fontSize(7.5).fillColor('#334155').font('Helvetica')
     .text(r[0], 48, y + 5, { width: 140 })
     .text(r[1], 195, y + 5, { width: 95 })
     .text(r[2], 295, y + 5, { width: 110 })
     .text(r[3], 415, y + 5, { width: 130, bold: true });
});

// Implementation Guarantee Callout
doc.roundedRect(40, 506, 515, 52, 4).fillColor('#F8FAFC').strokeColor('#CBD5E1').lineWidth(0.5).fillAndStroke();
doc.fontSize(8.5).fillColor('#0F172A').font('Helvetica-Bold').text('Jaminan Kemitraan Maudy Network Komunikasi:', 52, 516);
doc.fontSize(7.5).fillColor('#475569').font('Helvetica').lineGap(2)
   .text('Setiap penggelaran XTUR didampingi oleh garansi pemeliharaan perangkat lunak selama 12 bulan penuh, pembaruan model deep learning secara berkala, dan pendampingan teknis onsite maupun remote.', 52, 530, { width: 490 });

// ==============================================================================
// PAGE 10: PENUTUP & INFORMASI KONTAK RESMI
// ==============================================================================
doc.addPage();
drawHeaderFooter(doc, 10, 10, 'Penutup & Kontak');

doc.roundedRect(40, 60, 515, 515, 8).fillColor('#0A192F').fill();

doc.fontSize(21).fillColor('#60A5FA').font('Helvetica-Bold').text('Wujudkan Keamanan Proaktif Bersama XTUR', 60, 95, { width: 475, align: 'center' });
doc.fontSize(10.5).fillColor('#93C5FD').font('Helvetica').text('Solusi Cerdas, Humanis, dan Berdaya Guna untuk Indonesia', 60, 125, { align: 'center', width: 475 });

doc.fontSize(9.2).fillColor('#CBD5E1').font('Helvetica').lineGap(4).text(
  'Jangan biarkan kamera CCTV Anda hanya menjadi saksi bisu setelah peristiwa musibah terjadi. Hadirkan asisten cerdas berkemampuan inferensi 4.2 milidetik yang aktif melindungi keselamatan karyawan, aset berharga, dan reputasi organisasi Anda 24 jam sehari non-stop.\n\n' +
  'Tim spesialis kami di Maudy Network Komunikasi siap mendampingi organisasi Anda melakukan uji coba langsung (Proof of Concept / POC) pada kamera CCTV eksisting Anda tanpa mengganggu operasional sistem keamanan yang sedang berjalan.',
  70, 160, { width: 455, align: 'center' }
);

// Structured Corporate Contact Box
doc.roundedRect(70, 280, 455, 160, 6).fillColor('#132247').strokeColor('#38BDF8').lineWidth(1).fillAndStroke();
doc.fontSize(12).fillColor('#FFFFFF').font('Helvetica-Bold').text('MAUDY NETWORK KOMUNIKASI', 90, 298);
doc.fontSize(8.5).fillColor('#93C5FD').font('Helvetica').text('Penyedia Solusi AI Vision Surveillance & Sistem Keamanan Terpadu Indonesia', 90, 316);

doc.moveTo(90, 332).lineTo(505, 332).strokeColor('#1E3A8A').lineWidth(0.75).stroke();

doc.fontSize(8.5).fillColor('#E2E8F0').font('Helvetica').lineGap(3.5)
   .text('• Portal Resmi Platform   : xtur.exac.site', 90, 340)
   .text('• Email Resmi Perusahaan  : admin@maudynetwork.id', 90, 356)
   .text('• WhatsApp & Hotline      : 0852-3319-5874 (Maudy Network Komunikasi)', 90, 372)
   .text('• Konsultasi & Layanan   : Uji Coba POC, Audit Kamera CCTV, & Onsite Deployment', 90, 388)
   .text('• Wilayah Cakupan        : Seluruh Wilayah Republik Indonesia', 90, 404);

// Closing signature footer
doc.fontSize(8).fillColor('#64748B').text('Dokumen ini disusun dan diterbitkan oleh Maudy Network Komunikasi. Seluruh hak cipta dilindungi.', 60, 535, { align: 'center', width: 475 });

doc.end();

writeStream.on('finish', () => {
  console.log(`Successfully generated Refined PDF at: ${outPdf} (${fs.statSync(outPdf).size} bytes)`);
});
