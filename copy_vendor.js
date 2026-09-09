const fs = require('fs');
const path = require('path');

const base = 'C:\\Users\\HP\\.gemini\\antigravity-ide\\scratch\\xtur-product-profile';
const vendorDir = path.join(base, 'assets', 'vendor');
const exportDir = path.join(base, 'exports');

if (!fs.existsSync(vendorDir)) fs.mkdirSync(vendorDir, { recursive: true });
if (!fs.existsSync(exportDir)) fs.mkdirSync(exportDir, { recursive: true });

const filesToCopy = [
  ['node_modules/pptxgenjs/dist/pptxgen.bundle.js', 'assets/vendor/pptxgen.bundle.js'],
  ['node_modules/jspdf/dist/jspdf.umd.min.js', 'assets/vendor/jspdf.umd.min.js'],
  ['node_modules/html2canvas/dist/html2canvas.min.js', 'assets/vendor/html2canvas.min.js']
];

for (const [src, dst] of filesToCopy) {
  const s = path.join(base, src);
  const d = path.join(base, dst);
  if (fs.existsSync(s)) {
    fs.copyFileSync(s, d);
    console.log(`Copied ${src} -> ${dst} (${fs.statSync(d).size} bytes)`);
  } else {
    console.warn(`Missing: ${s}`);
  }
}
