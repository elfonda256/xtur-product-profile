const PptxGenJS = require('pptxgenjs');
const fs = require('fs');
const path = require('path');

const base = 'C:\\Users\\HP\\.gemini\\antigravity-ide\\scratch\\xtur-product-profile';
const exportDir = path.join(base, 'exports');
if (!fs.existsSync(exportDir)) fs.mkdirSync(exportDir, { recursive: true });

const pptx = new PptxGenJS();
pptx.layout = 'LAYOUT_16x9'; // 10 x 5.625 inches
pptx.title = 'XTUR AI Surveillance Platform — Product Profile';
pptx.company = 'Maudy Network Komunikasi';

// Elegant Corporate Palette
const C_DARK_NAVY = '0A1128';
const C_CARD_BG   = '132247';
const C_PRIMARY   = '1E40AF';
const C_ACCENT    = '0284C7';
const C_EMERALD   = '059669';
const C_LIGHT_BG  = 'F8FAFC';
const C_TEXT_DARK = '0F172A';
const C_TEXT_MUTED= '475569';
const C_BORDER    = 'CBD5E1';
const C_WHITE     = 'FFFFFF';

function getImgBase64(filename) {
  const p = path.join(base, 'assets', 'images', filename);
  if (fs.existsSync(p)) {
    const data = fs.readFileSync(p);
    const ext = path.extname(filename).toLowerCase();
    const mime = (ext === '.jpg' || ext === '.jpeg') ? 'image/jpeg' : 'image/png';
    return `data:${mime};base64,` + data.toString('base64');
  }
  return null;
}

function applySlideFrame(slide, categoryTitle) {
  // Top Banner
  slide.addShape(pptx.ShapeType.rect, { x: 0.8, y: 0.35, w: 2.8, h: 0.28, fill: { color: 'ECFDF5' }, line: { color: 'A7F3D0', width: 0.75 } });
  slide.addText(categoryTitle.toUpperCase(), { x: 0.8, y: 0.37, w: 2.8, h: 0.25, fontSize: 8, bold: true, color: C_EMERALD, align: 'center', fontFace: 'Calibri' });

  // Footer
  slide.addShape(pptx.ShapeType.line, { x: 0.8, y: 5.15, w: 8.4, h: 0, line: { color: 'CBD5E1', width: 0.5 } });
  slide.addText('XTUR VISION AI PLATFORM — SMARTER SURVEILLANCE FOR A SAFER TOMORROW', { x: 0.8, y: 5.22, fontSize: 7.5, color: '64748B', fontFace: 'Calibri' });
  slide.addText('MAUDY NETWORK KOMUNIKASI', { x: 6.0, y: 5.22, w: 3.2, fontSize: 7.5, color: '64748B', align: 'right', fontFace: 'Calibri' });
}

// ================= SLIDE 1: COVER (POSTER IDENTITY) =================
const s1 = pptx.addSlide();
s1.background = { color: C_DARK_NAVY };

// Top Brand Badge
s1.addShape(pptx.ShapeType.rect, { x: 0.8, y: 0.55, w: 3.8, h: 0.35, fill: { color: '132247' }, line: { color: '38BDF8', width: 0.75 } });
s1.addText('XTUR  |  AI SECURITY MONITORING SYSTEM', { x: 0.8, y: 0.58, w: 3.8, h: 0.3, fontSize: 9.5, bold: true, color: '38BDF8', align: 'center', fontFace: 'Calibri' });

s1.addText('Smarter Surveillance', { x: 0.8, y: 1.05, fontSize: 30, bold: true, color: 'FFFFFF', fontFace: 'Calibri' });
s1.addText('for a Safer Tomorrow', { x: 0.8, y: 1.55, fontSize: 30, bold: true, color: '38BDF8', fontFace: 'Calibri' });

s1.addText(
  'XTUR adalah software CCTV berbasis Artificial Intelligence yang menggunakan teknologi Object Detection untuk mendeteksi objek, menganalisis kejadian, dan memberikan notifikasi secara real-time. Solusi keamanan cerdas untuk berbagai kebutuhan industri, perusahaan, dan instansi.', 
  { x: 0.8, y: 2.25, w: 8.4, fontSize: 11, color: 'CBD5E1', fontFace: 'Calibri', lineSpacing: 18 }
);

// 6 Core Capability Pills from Reference Poster
const posterCaps = [
  'Real-time Detection',
  'AI Powered Analytics',
  'Multi Camera Support',
  'Instant Alert & Notif',
  'Easy to Use Dashboard',
  'Scalable Solution'
];
posterCaps.forEach((cap, idx) => {
  const col = idx % 3;
  const row = Math.floor(idx / 3);
  const x = 0.8 + col * 2.85;
  const y = 3.25 + row * 0.65;
  s1.addShape(pptx.ShapeType.roundRect, { x: x, y: y, w: 2.7, h: 0.52, rectRadius: 0.1, fill: { color: C_CARD_BG }, line: { color: '1E3A8A', width: 0.75 } });
  s1.addText(`✓  ${cap}`, { x: x + 0.15, y: y + 0.1, w: 2.4, h: 0.32, fontSize: 10, bold: true, color: '60A5FA', fontFace: 'Calibri' });
});

s1.addText('Diterbitkan Resmi Oleh: Maudy Network Komunikasi — Edisi Profil Produk 2026', { x: 0.8, y: 4.85, fontSize: 9.5, color: '94A3B8', fontFace: 'Calibri' });

// ================= SLIDE 2: LEMBAR IKHTISAR RESMI (EXECUTIVE POSTER) =================
const s2 = pptx.addSlide();
s2.background = { color: C_LIGHT_BG };
applySlideFrame(s2, 'Lembar Ikhtisar Resmi');

s2.addText('IKHTISAR RESMI: XTUR AI MONITORING SYSTEM', { x: 0.8, y: 0.72, fontSize: 20, bold: true, color: C_PRIMARY, fontFace: 'Calibri' });
s2.addText('Smarter Surveillance for a Safer Tomorrow — Arsitektur Visual & Spesifikasi Terpadu', { x: 0.8, y: 1.15, fontSize: 11, color: C_TEXT_MUTED, fontFace: 'Calibri' });

// Center Poster Showcase Image
const imgPosterData = getImgBase64('xtur-overview-poster.jpg');
if (imgPosterData) {
  s2.addShape(pptx.ShapeType.rect, { x: 0.78, y: 1.53, w: 5.44, h: 3.44, fill: { color: 'FFFFFF' }, line: { color: 'CBD5E1', width: 0.75 } });
  s2.addImage({ data: imgPosterData, x: 0.8, y: 1.55, w: 5.4, h: 3.4 });
}

// Right Summary Panel
s2.addShape(pptx.ShapeType.rect, { x: 6.4, y: 1.53, w: 2.8, h: 0.42, fill: { color: 'F1F5F9' }, line: { color: C_BORDER, width: 0.75 } });
s2.addText('NILAI STRATEGIS SISTEM', { x: 6.55, y: 1.62, w: 2.5, h: 0.25, fontSize: 9.5, bold: true, color: C_PRIMARY, fontFace: 'Calibri' });

s2.addShape(pptx.ShapeType.rect, { x: 6.4, y: 1.95, w: 2.8, h: 3.02, fill: { color: C_WHITE }, line: { color: C_BORDER, width: 0.75 } });
const posterPoints = 
  '• Object Detection Terpadu:\n   Mendeteksi orang, kendaraan, APD, kebakaran, penyusup, & kerumunan.\n\n' +
  '• Kompatibilitas CCTV Total:\n   Bekerja pada kamera RTSP/ONVIF eksisting tanpa beli kamera baru.\n\n' +
  '• Privasi Kepatuhan UU PDP:\n   Otomatis memburamkan wajah subjek sipil secara beretika.\n\n' +
  '• Respon Kilat Real-Time:\n   Latensi pemrosesan 4.2 ms langsung memicu alarm di pos jaga.';
s2.addText(posterPoints, { x: 6.55, y: 2.1, w: 2.5, h: 2.7, fontSize: 8.8, color: C_TEXT_MUTED, fontFace: 'Calibri', lineSpacing: 13 });

// ================= SLIDE 3: BAB 01: PENDEKATAN MANUSIAWI =================
const s3 = pptx.addSlide();
s3.background = { color: C_LIGHT_BG };
applySlideFrame(s3, 'Bab 01: Pendekatan Solusi');

s3.addText('MENGAPA CCTV BIASA TAK LAGI CUKUP?', { x: 0.8, y: 0.75, fontSize: 22, bold: true, color: C_PRIMARY, fontFace: 'Calibri' });
s3.addText('Meringankan beban kelelahan petugas pengawas dengan asisten cerdas 24 jam', { x: 0.8, y: 1.25, fontSize: 12, color: C_TEXT_MUTED, fontFace: 'Calibri' });

// Left Box: Masalah
s3.addShape(pptx.ShapeType.rect, { x: 0.8, y: 1.65, w: 4.1, h: 3.25, fill: { color: 'FEF2F2' }, line: { color: 'FECACA', width: 0.75 } });
s3.addText('Kelemahan CCTV Biasa (Legacy):', { x: 1.0, y: 1.8, fontSize: 13, bold: true, color: 'DC2626', fontFace: 'Calibri' });
s3.addText('• Kelelahan Fisik Operator:\n   Setelah 20 menit menatap layar monitor, fokus mata merosot hingga 45%. Kejadian kritis rawan terlewat.\n\n• Selalu Terlambat Menolong (Reaktif):\n   Hanya merekam setelah musibah terjadi (post-mortem), tidak mampu mencegah tindak kejahatan.\n\n• Pencarian Bukti Melelahkan:\n   Memutar rekaman video biner berjam-jam untuk mencari satu peristiwa kecil.',
  { x: 1.0, y: 2.15, w: 3.7, fontSize: 10, color: C_TEXT_MUTED, fontFace: 'Calibri', lineSpacing: 16 });

// Right Box: Solusi
s3.addShape(pptx.ShapeType.rect, { x: 5.1, y: 1.65, w: 4.1, h: 3.25, fill: { color: 'ECFDF5' }, line: { color: 'A7F3D0', width: 0.75 } });
s3.addText('Solusi Cerdas XTUR AI Platform:', { x: 5.3, y: 1.8, fontSize: 13, bold: true, color: C_EMERALD, fontFace: 'Calibri' });
s3.addText('• Asisten Setia 24 Jam Non-Stop:\n   Menganalisis objek dalam 4.2 ms dan membunyikan alarm pada detik penerobosan perimeter.\n\n• Menghormati Hak Privasi (Privacy Face Blur):\n   Secara otomatis mengaburkan wajah manusia demi kepatuhan terhadap UU Perlindungan Data Pribadi (UU PDP).\n\n• Temukan Bukti dalam 1 Detik:\n   Pencarian instan berdasarkan nomor plat, jenis kendaraan, waktu, dan nama kamera.',
  { x: 5.3, y: 2.15, w: 3.7, fontSize: 10, color: C_TEXT_MUTED, fontFace: 'Calibri', lineSpacing: 16 });

// ================= SLIDE 4: BAB 02: PONDASI TEKNOLOGI =================
const s4 = pptx.addSlide();
s4.background = { color: C_LIGHT_BG };
applySlideFrame(s4, 'Bab 02: Pondasi Teknologi');

s4.addText('ARSITEKTUR TEKNOLOGI COMPUTER VISION', { x: 0.8, y: 0.75, fontSize: 22, bold: true, color: C_PRIMARY, fontFace: 'Calibri' });
s4.addText('Kombinasi model deep learning mutakhir dengan efisiensi pemrosesan hardware', { x: 0.8, y: 1.25, fontSize: 12, color: C_TEXT_MUTED, fontFace: 'Calibri' });

const techCards = [
  { t: 'YOLOv8 Detection (640x640)', d: 'Inferensi neural network secepat 4.2 ms / frame dengan akselerasi NVIDIA CUDA TensorRT. Deteksi akurat siang & malam.' },
  { t: 'DeepSORT Tracking Engine', d: 'Mengunci Track ID unik (#1205) melintasi frame tanpa duplikasi penghitungan saat objek berpindah atau tertutup sejenak.' },
  { t: 'EasyOCR & DeepFace Pipeline', d: 'Membaca plat nomor kendaraan secara otomatis dan mengestimasi demografi usia pejalan kaki secara etis tanpa lemot.' },
  { t: 'MediaMTX & Redis Buffer', d: 'Menyaring video RTSP pada 5 FPS terukur dengan buffer Redis (22 MB) untuk jaminan sistem dingin dan bebas crash.' }
];

techCards.forEach((tc, idx) => {
  const col = idx % 2;
  const row = Math.floor(idx / 2);
  const x = 0.8 + col * 4.3;
  const y = 1.7 + row * 1.55;

  s4.addShape(pptx.ShapeType.rect, { x: x, y: y, w: 4.1, h: 1.35, fill: { color: C_WHITE }, line: { color: C_BORDER, width: 0.75 } });
  s4.addText(tc.t, { x: x + 0.2, y: y + 0.15, w: 3.7, fontSize: 12, bold: true, color: C_PRIMARY, fontFace: 'Calibri' });
  s4.addText(tc.d, { x: x + 0.2, y: y + 0.45, w: 3.7, fontSize: 9.5, color: C_TEXT_MUTED, fontFace: 'Calibri', lineSpacing: 15 });
});

// ================= SLIDE 5: BAB 03: KEMAMPUAN DETEKSI OBJEK (FLYER MATRIX) =================
const s5 = pptx.addSlide();
s5.background = { color: C_LIGHT_BG };
applySlideFrame(s5, 'Bab 03: Kemampuan Deteksi');

s5.addText('KEMAMPUAN DETEKSI OBJEK (OBJECT DETECTION)', { x: 0.8, y: 0.72, fontSize: 20, bold: true, color: C_PRIMARY, fontFace: 'Calibri' });
s5.addText('Mendeteksi berbagai objek dan kejadian penting dengan akurasi tinggi menggunakan teknologi AI', { x: 0.8, y: 1.15, fontSize: 11, color: C_TEXT_MUTED, fontFace: 'Calibri' });

const detList = [
  { t: 'Person Detection', badge: 'PEOPLE', d: 'Deteksi orang dengan akurasi tinggi dan pelacakan Track ID.', bdr: '0284C7', bg: 'F0F9FF' },
  { t: 'Vehicle Detection', badge: 'VEHICLE', d: 'Deteksi kendaraan (mobil, motor, truk, bus) untuk logistik.', bdr: '2563EB', bg: 'EFF6FF' },
  { t: 'PPE Detection', badge: 'SAFETY', d: 'Deteksi penggunaan APD keselamatan kerja (helm, rompi, dll).', bdr: 'D97706', bg: 'FFFBEB' },
  { t: 'Fire & Smoke Detection', badge: 'HAZARD', d: 'Deteksi asap dan api secara real-time untuk cegah kebakaran.', bdr: 'DC2626', bg: 'FEF2F2' },
  { t: 'Intrusion Detection', badge: 'SECURITY', d: 'Deteksi penyusup melintasi garis batas terlarang perimeter.', bdr: 'E11D48', bg: 'FFF1F2' },
  { t: 'Crowd Detection', badge: 'MONITOR', d: 'Deteksi kerumunan orang melebihi batas aman fasilitas publik.', bdr: '4F46E5', bg: 'EEF2FF' }
];

detList.forEach((dt, idx) => {
  const col = idx % 3;
  const row = Math.floor(idx / 3);
  const x = 0.8 + col * 2.85;
  const y = 1.65 + row * 1.65;

  s5.addShape(pptx.ShapeType.rect, { x: x, y: y, w: 2.7, h: 1.45, fill: { color: dt.bg }, line: { color: dt.bdr, width: 0.75 } });
  
  // Badge
  s5.addShape(pptx.ShapeType.roundRect, { x: x + 0.15, y: y + 0.15, w: 0.85, h: 0.22, rectRadius: 0.05, fill: { color: dt.bdr } });
  s5.addText(dt.badge, { x: x + 0.15, y: y + 0.17, w: 0.85, h: 0.18, fontSize: 7, bold: true, color: 'FFFFFF', align: 'center', fontFace: 'Calibri' });
  
  s5.addText(dt.t, { x: x + 0.15, y: y + 0.45, w: 2.4, fontSize: 11, bold: true, color: C_TEXT_DARK, fontFace: 'Calibri' });
  s5.addText(dt.d, { x: x + 0.15, y: y + 0.75, w: 2.4, fontSize: 8.8, color: C_TEXT_MUTED, fontFace: 'Calibri', lineSpacing: 13 });
});

// Helper for Screenshot Slides
function addScreenshotSlide(catTitle, heading, subtext, imgName, highlights) {
  const s = pptx.addSlide();
  s.background = { color: C_LIGHT_BG };
  applySlideFrame(s, catTitle);

  s.addText(heading.toUpperCase(), { x: 0.8, y: 0.72, fontSize: 20, bold: true, color: C_PRIMARY, fontFace: 'Calibri' });
  s.addText(subtext, { x: 0.8, y: 1.15, fontSize: 11, color: C_TEXT_MUTED, fontFace: 'Calibri' });

  // Screenshot with frame
  s.addShape(pptx.ShapeType.rect, { x: 0.78, y: 1.53, w: 5.24, h: 2.99, fill: { color: 'FFFFFF' }, line: { color: 'CBD5E1', width: 0.75 } });
  const imgData = getImgBase64(imgName);
  if (imgData) {
    s.addImage({ data: imgData, x: 0.8, y: 1.55, w: 5.2, h: 2.95 });
  }

  // Right Card Header
  s.addShape(pptx.ShapeType.rect, { x: 6.2, y: 1.53, w: 3.0, h: 0.42, fill: { color: 'F1F5F9' }, line: { color: C_BORDER, width: 0.75 } });
  s.addText('POIN KUNCI & OPERASIONAL', { x: 6.35, y: 1.62, w: 2.7, h: 0.25, fontSize: 9.5, bold: true, color: C_PRIMARY, fontFace: 'Calibri' });

  // Right Card Body
  s.addShape(pptx.ShapeType.rect, { x: 6.2, y: 1.95, w: 3.0, h: 2.57, fill: { color: C_WHITE }, line: { color: C_BORDER, width: 0.75 } });
  
  let bulletText = '';
  highlights.forEach(h => {
    bulletText += `• ${h}\n\n`;
  });

  s.addText(bulletText.trim(), { x: 6.35, y: 2.08, w: 2.7, h: 1.95, fontSize: 8.8, color: C_TEXT_MUTED, fontFace: 'Calibri', lineSpacing: 14 });

  // Right Card Footer Tag
  s.addShape(pptx.ShapeType.rect, { x: 6.35, y: 4.15, w: 2.7, h: 0.26, fill: { color: 'ECFDF5' }, line: { color: 'A7F3D0', width: 0.5 } });
  s.addText('✓ Teruji Stabil di Lingkungan Produksi', { x: 6.35, y: 4.18, w: 2.7, h: 0.22, fontSize: 7.5, bold: true, color: C_EMERALD, align: 'center', fontFace: 'Calibri' });

  return s;
}

// ================= SLIDE 6: DASHBOARD OVERVIEW =================
addScreenshotSlide(
  'Bab 04: Pusat Pemantauan',
  'Dashboard Overview — Visibilitas 360 Derajat',
  'Pusat kendali terpadu untuk memantau aktivitas multi-kamera dan metrik harian',
  '01-dashboard-overview.png',
  [
    '4 Kamera Online & Siaga Penuh (Status Healthy 99.9%).',
    '1.734 Deteksi Objek Terverifikasi dengan puncak trafik 868 objek (8 Sep).',
    'Agregasi Kategori: Pejalan Kaki (1.134), Mobil (349), Motor (244), Truk (6).',
    'Filter fleksibel: 1 Hari, 7 Hari, 1 Bulan, hingga kustom.'
  ]
);

// ================= SLIDE 7: DETECTION LOGS =================
addScreenshotSlide(
  'Bab 05: Audit Forensik',
  'Buku Log Deteksi (CRUD Logs & Anotasi)',
  'Setiap milidetik peristiwa terekam lengkap dengan foto bukti asli & confidence bar',
  '02-detection-logs.png',
  [
    'Snapshot Foto Asli: Bukti visual langsung tanpa perlu memutar video rekaman.',
    'Track ID Unik & Akurasi: Mobil #1205 (89.5%), Motor #1204 (77.5%).',
    'Human-in-the-Loop: Tombol "Incorrect" untuk koreksi deteksi oleh petugas jaga.',
    'Ekspor Cepat: Sekali klik untuk mengunduh rekapitulasi ke CSV & PDF.'
  ]
);

// ================= SLIDE 8: MULTI-CAMERA STREAMING =================
addScreenshotSlide(
  'Bab 06: Manajemen Kamera',
  'Pemantauan Multi-Kamera Dual-Stream',
  'Pantau kamera J30B, A5, Samping, dan Depan tanpa membebani jaringan internet',
  '03-cameras-monitor.png',
  [
    'Arsitektur Dual-Stream: Aliran HD untuk AI Engine, sub-stream ringan untuk browser.',
    'Pengaturan Kelas Terpisah: Kamera gerbang untuk mobil/plat; kamera lobi untuk orang.',
    'Multi-Tenant Ready: Isolasi hak akses kamera per divisi atau cabang perusahaan.'
  ]
);

// ================= SLIDE 9: ANALISIS JAM SIBUK & WILAYAH =================
addScreenshotSlide(
  'Bab 07: Analitik Fasilitas',
  'Analisis Jam Sibuk 24 Jam & Asal Wilayah',
  'Mengubah rekaman video CCTV menjadi wawasan operasional dan tata kelola lalu lintas',
  '05-reports-analytics-bottom.png',
  [
    'Grafik Jam Sibuk 24 Jam: Pola kepadatan jam 00:00 s.d. 23:00 untuk efisiensi personel.',
    'Peringkat Asal Wilayah Plat: Karawang/Purwakarta (11 unit), Banten (4 unit), Garut (2 unit).',
    'Beban Kamera: J30B (33%), Samping (27%), Depan (24%), A5 (16%).'
  ]
);

// ================= SLIDE 10: TELEMETRI & KESEHATAN ENGINE =================
addScreenshotSlide(
  'Bab 08: Kinerja Server',
  'Engine Health & Efisiensi Hardware',
  'Transparansi beban kerja teruji pada komputer komersial non-superkomputer',
  '06-engine-health.png',
  [
    'Beban CPU Host: Hanya 21% pada prosesor Intel Core i7-14700F (16 Cores).',
    'Penggunaan Memori RAM: 8.04 GB / 15.11 GB (53%), bebas memory leak.',
    'Latensi Inferensi: 4.2 ms / frame dengan akselerasi NVIDIA CUDA.',
    'Buffer Redis: Capped 22.36 MB, menjamin sistem tidak pernah crash.'
  ]
);

// ================= SLIDE 11: SPESIFIKASI SISTEM (FLYER SPECIFICATIONS) =================
const s11 = pptx.addSlide();
s11.background = { color: C_LIGHT_BG };
applySlideFrame(s11, 'Bab 09: Spesifikasi Sistem');

s11.addText('SPESIFIKASI SISTEM (HARDWARE & SOFTWARE)', { x: 0.8, y: 0.72, fontSize: 20, bold: true, color: C_PRIMARY, fontFace: 'Calibri' });
s11.addText('Performa Optimal untuk Keamanan Maksimal — Standar Kompatibilitas Sistem XTUR', { x: 0.8, y: 1.15, fontSize: 11, color: C_TEXT_MUTED, fontFace: 'Calibri' });

const posterSpecsPpt = [
  { k: 'CCTV IP Camera', v: 'RTSP / ONVIF Compatible (2MP / 4MP / 8MP)' },
  { k: 'Server GPU', v: 'NVIDIA GPU (Minimal RTX 3060) atau setara' },
  { k: 'CPU Host', v: 'Intel i7 / AMD Ryzen 7 (Minimum)' },
  { k: 'RAM Memori', v: '16 GB (Minimum)' },
  { k: 'Storage SSD', v: 'SSD 512 GB (Minimum) (Disesuaikan kebutuhan)' },
  { k: 'Network Jaringan', v: 'LAN / Internet (Minimal 100 Mbps)' },
  { k: 'Sistem Operasi', v: 'Ubuntu 20.04+ / Windows 10/11' },
  { k: 'Database', v: 'PostgreSQL / MySQL' },
  { k: 'Web Browser', v: 'Chrome / Firefox / Edge' }
];

posterSpecsPpt.forEach((sp, idx) => {
  const col = idx % 3;
  const row = Math.floor(idx / 3);
  const x = 0.8 + col * 2.85;
  const y = 1.65 + row * 1.05;

  s11.addShape(pptx.ShapeType.rect, { x: x, y: y, w: 2.7, h: 0.9, fill: { color: C_WHITE }, line: { color: C_BORDER, width: 0.75 } });
  s11.addText(sp.k, { x: x + 0.15, y: y + 0.12, w: 2.4, fontSize: 10.5, bold: true, color: C_PRIMARY, fontFace: 'Calibri' });
  s11.addText(sp.v, { x: x + 0.15, y: y + 0.38, w: 2.4, fontSize: 8.5, color: C_TEXT_MUTED, fontFace: 'Calibri', lineSpacing: 13 });
});

// Fast Track schedule note at bottom
s11.addShape(pptx.ShapeType.rect, { x: 0.8, y: 4.65, w: 8.4, h: 0.42, fill: { color: 'ECFDF5' }, line: { color: 'A7F3D0', width: 0.75 } });
s11.addText('✓ Fast-Track Onboarding: Implementasi & Pelatihan Selesai dalam 10 Hari Kerja Tanpa Henti Operasional', 
  { x: 0.9, y: 4.75, w: 8.2, fontSize: 9, bold: true, color: C_EMERALD, fontFace: 'Calibri' });

// ================= SLIDE 12: CLOSING & KONTAK RESMI =================
const s12 = pptx.addSlide();
s12.background = { color: C_DARK_NAVY };

s12.addText('Wujudkan Keamanan Proaktif Bersama XTUR', { x: 0.8, y: 1.2, fontSize: 26, bold: true, color: '60A5FA', fontFace: 'Calibri' });
s12.addText('Smarter Surveillance for a Safer Tomorrow — Solusi Cerdas untuk Berbagai Kebutuhan Industri', { x: 0.8, y: 1.8, fontSize: 12, color: 'CBD5E1', fontFace: 'Calibri' });

s12.addShape(pptx.ShapeType.rect, { x: 0.8, y: 2.4, w: 8.4, h: 2.1, fill: { color: C_CARD_BG }, line: { color: '38BDF8', width: 0.75 } });
s12.addText('MAUDY NETWORK KOMUNIKASI', { x: 1.1, y: 2.65, fontSize: 14, bold: true, color: C_WHITE, fontFace: 'Calibri' });
s12.addText('Penyedia Solusi AI Vision Surveillance & Sistem Keamanan Terpadu Indonesia\n\n' +
  '• Portal Resmi Platform : xtur.exac.site\n' +
  '• Email Resmi Perusahaan: admin@maudynetwork.id\n' +
  '• WhatsApp & Hotline    : 0852-3319-5874 (Maudy Network Komunikasi)\n' +
  '• Layanan Kemitraan     : Konsultasi Arsitektur, Proof of Concept (POC), & Onsite Deployment\n' +
  '• Cakupan Wilayah       : Seluruh Wilayah Republik Indonesia',
  { x: 1.1, y: 3.0, w: 7.8, fontSize: 9.5, color: '93C5FD', fontFace: 'Calibri', lineSpacing: 15 });

s12.addText('© 2026 Maudy Network Komunikasi. Seluruh hak cipta dilindungi undang-undang.', { x: 0.8, y: 4.85, fontSize: 9, color: '94A3B8', fontFace: 'Calibri' });

const outPath = path.join(exportDir, 'XTUR-AI-Surveillance-Product-Profile.pptx');
pptx.writeFile({ fileName: outPath })
  .then(() => {
    console.log(`Successfully generated Refined PPTX at: ${outPath} (${fs.statSync(outPath).size} bytes)`);
  })
  .catch(err => {
    console.error('Error generating PPTX:', err);
  });
