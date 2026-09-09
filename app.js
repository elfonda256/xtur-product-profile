/* ==========================================================================
   XTUR AI SURVEILLANCE PLATFORM — APP CONTROLLER
   Features: Light/Dark Theme, Slide Deck (PPT Mode), PptxGenJS Native Export,
             Clean PDF Print, Interactive ROI, and Screenshot Lightbox.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // --------------------------------------------------------------------------
  // 2. THEME CONTROLLER (LIGHT / DARK)
  // --------------------------------------------------------------------------
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');
  const themeLabel = document.getElementById('themeLabel');

  // Load saved theme or default to 'light'
  const savedTheme = localStorage.getItem('xtur_theme') || 'light';
  applyTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const isDark = document.body.classList.contains('theme-dark');
      applyTheme(isDark ? 'light' : 'dark');
    });
  }

  function applyTheme(theme) {
    if (theme === 'dark') {
      document.body.classList.remove('theme-light');
      document.body.classList.add('theme-dark');
      if (themeLabel) themeLabel.textContent = 'Mode Terang';
      if (themeToggleBtn) {
        themeToggleBtn.innerHTML = '<i data-lucide="sun"></i>';
        themeToggleBtn.setAttribute('title', 'Ganti ke Mode Terang');
      }
    } else {
      document.body.classList.remove('theme-dark');
      document.body.classList.add('theme-light');
      if (themeLabel) themeLabel.textContent = 'Mode Gelap';
      if (themeToggleBtn) {
        themeToggleBtn.innerHTML = '<i data-lucide="moon"></i>';
        themeToggleBtn.setAttribute('title', 'Ganti ke Mode Gelap');
      }
    }
    localStorage.setItem('xtur_theme', theme);
    if (window.lucide) window.lucide.createIcons();
  }

  // --------------------------------------------------------------------------
  // 3. DUAL-MODE CONTROLLER: DOCUMENT vs PPT SLIDE DECK
  // --------------------------------------------------------------------------
  let currentMode = 'document'; // 'document' | 'deck'
  let currentSlideIndex = 0;
  const slides = Array.from(document.querySelectorAll('.presentation-slide'));
  const totalSlides = slides.length;

  const btnDocView = document.getElementById('btnDocView');
  const btnDeckView = document.getElementById('btnDeckView');
  const slideControls = document.getElementById('slideControls');
  const currentSlideNumEl = document.getElementById('currentSlideNum');
  const totalSlideNumEl = document.getElementById('totalSlideNum');
  const currentSlideTitleEl = document.getElementById('currentSlideTitle');
  const prevSlideBtn = document.getElementById('prevSlideBtn');
  const nextSlideBtn = document.getElementById('nextSlideBtn');
  const fullscreenBtn = document.getElementById('fullscreenBtn');
  const exitDeckBtn = document.getElementById('exitDeckBtn');
  const deckPptxBtn = document.getElementById('deckPptxBtn');

  if (totalSlideNumEl) {
    totalSlideNumEl.textContent = totalSlides;
  }

  window.switchMode = function(mode) {
    currentMode = mode;

    if (mode === 'deck') {
      document.body.classList.remove('mode-document');
      document.body.classList.add('mode-deck');
      btnDocView.classList.remove('active');
      btnDeckView.classList.add('active');
      slideControls.classList.remove('hidden');
      goToSlide(currentSlideIndex);
      showToast('Mode Slide Presentasi aktif. Gunakan panah kiri/kanan untuk navigasi.');
    } else {
      document.body.classList.remove('mode-deck');
      document.body.classList.add('mode-document');
      btnDeckView.classList.remove('active');
      btnDocView.classList.add('active');
      slideControls.classList.add('hidden');
      slides.forEach(slide => slide.classList.remove('active-slide'));
    }
  };

  if (btnDocView) btnDocView.addEventListener('click', () => switchMode('document'));
  if (btnDeckView) btnDeckView.addEventListener('click', () => switchMode('deck'));
  if (exitDeckBtn) exitDeckBtn.addEventListener('click', () => switchMode('document'));

  function goToSlide(index) {
    if (index < 0) index = 0;
    if (index >= totalSlides) index = totalSlides - 1;
    currentSlideIndex = index;

    slides.forEach((slide, i) => {
      if (i === currentSlideIndex) {
        slide.classList.add('active-slide');
        slide.scrollTop = 0;
      } else {
        slide.classList.remove('active-slide');
      }
    });

    if (currentSlideNumEl) {
      currentSlideNumEl.textContent = currentSlideIndex + 1;
    }

    const activeSlide = slides[currentSlideIndex];
    let title = activeSlide.getAttribute('data-slide-title') || 'Slide ' + (currentSlideIndex + 1);
    if (currentSlideTitleEl) {
      currentSlideTitleEl.textContent = title;
    }
  }

  if (prevSlideBtn) prevSlideBtn.addEventListener('click', () => goToSlide(currentSlideIndex - 1));
  if (nextSlideBtn) nextSlideBtn.addEventListener('click', () => goToSlide(currentSlideIndex + 1));

  if (fullscreenBtn) {
    fullscreenBtn.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => console.log(err));
      } else {
        document.exitFullscreen();
      }
    });
  }

  // Keyboard navigation
  window.addEventListener('keydown', (e) => {
    const lightbox = document.getElementById('imageLightbox');
    if (!lightbox.classList.contains('hidden') && e.key === 'Escape') {
      closeLightbox();
      return;
    }

    if (currentMode === 'deck') {
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        goToSlide(currentSlideIndex + 1);
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        goToSlide(currentSlideIndex - 1);
      } else if (e.key === 'Escape') {
        switchMode('document');
      }
    }
  });

  // --------------------------------------------------------------------------
  // 4. PRINT / PDF EXPORT CONTROLLER (DIRECT DOWNLOAD & BROWSER PRINT)
  // --------------------------------------------------------------------------
  const btnPrintPDF = document.getElementById('btnPrintPDF');
  if (btnPrintPDF) {
    btnPrintPDF.addEventListener('click', () => {
      showToast('Mengunduh dokumen resmi PDF rapi...');
      
      // Trigger direct download of the pre-generated, perfectly formatted 10-page A4 PDF
      const link = document.createElement('a');
      link.href = '/exports/XTUR-AI-Surveillance-Product-Profile.pdf';
      link.download = 'XTUR-AI-Surveillance-Product-Profile.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Also trigger print dialog after small delay if user wishes to print directly
      setTimeout(() => {
        if (confirm('Berkas PDF resmi telah diunduh. Apakah Anda juga ingin membuka dialog cetak (Print) sekarang?')) {
          if (currentMode === 'deck') switchMode('document');
          window.print();
        }
      }, 800);
    });
  }

  // --------------------------------------------------------------------------
  // 5. POWERPOINT (.PPTX) DIRECT DOWNLOAD & CLIENT FALLBACK
  // --------------------------------------------------------------------------
  const btnDownloadPPTX = document.getElementById('btnDownloadPPTX');
  if (btnDownloadPPTX) btnDownloadPPTX.addEventListener('click', downloadPPTXFile);
  if (deckPptxBtn) deckPptxBtn.addEventListener('click', downloadPPTXFile);

  function downloadPPTXFile() {
    showToast('Mengunduh presentasi PowerPoint (.pptx)...');
    const link = document.createElement('a');
    link.href = '/exports/XTUR-AI-Surveillance-Product-Profile.pptx';
    link.download = 'XTUR-AI-Surveillance-Product-Profile.pptx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  window.exportToPowerPoint = downloadPPTXFile;



  // --------------------------------------------------------------------------
  // 6. DASHBOARD SHOWCASE TABS
  // --------------------------------------------------------------------------
  const tabButtons = document.querySelectorAll('.dash-tab-btn');
  const tabContents = document.querySelectorAll('.dash-tab-content');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const targetId = btn.getAttribute('data-target');
      const targetContent = document.getElementById(targetId);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });

  // --------------------------------------------------------------------------
  // 7. SCREENSHOT LIGHTBOX MODAL
  // --------------------------------------------------------------------------
  const zoomableItems = document.querySelectorAll('.image-zoomable');
  const lightboxModal = document.getElementById('imageLightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');

  zoomableItems.forEach(item => {
    item.addEventListener('click', () => {
      const imgSrc = item.getAttribute('data-img');
      const caption = item.getAttribute('data-caption') || 'Screenshot Hasil Tangkapan XTUR Platform';
      
      if (lightboxImg && lightboxCaption && lightboxModal) {
        lightboxImg.src = imgSrc;
        lightboxCaption.innerHTML = `<strong>Tinjauan Forensik:</strong> ${caption}`;
        lightboxModal.classList.remove('hidden');
      }
    });
  });

  window.closeLightbox = function() {
    if (lightboxModal) {
      lightboxModal.classList.add('hidden');
    }
  };

  // --------------------------------------------------------------------------
  // 8. INTERACTIVE ROI CALCULATOR
  // --------------------------------------------------------------------------
  window.updateROI = function() {
    const camsInput = document.getElementById('calcCams');
    const staffInput = document.getElementById('calcStaff');
    const camsValEl = document.getElementById('calcCamsVal');
    const staffValEl = document.getElementById('calcStaffVal');
    const savingsEl = document.getElementById('calcSavings');

    if (!camsInput || !staffInput) return;

    const cams = parseInt(camsInput.value, 10);
    const staff = parseInt(staffInput.value, 10);

    camsValEl.textContent = `${cams} Titik Kamera`;
    staffValEl.textContent = `${staff} Orang Petugas`;

    // Formula manusiawi: efisiensi waktu investigasi dan pengalihan shift jaga
    const estimatedStaffSaved = Math.max(1, Math.floor(staff * 0.5));
    const annualSavings = (estimatedStaffSaved * 4500000 * 12) + (cams * 1500000);

    const formatted = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(annualSavings);

    savingsEl.textContent = `${formatted} / tahun`;
  };

  window.updateROI();

  // --------------------------------------------------------------------------
  // 9. TOAST NOTIFICATION HELPER
  // --------------------------------------------------------------------------
  function showToast(msg) {
    const toast = document.getElementById('toastNotification');
    const toastMsg = document.getElementById('toastMsg');
    if (!toast || !toastMsg) return;

    toastMsg.textContent = msg;
    toast.classList.remove('hidden');

    setTimeout(() => {
      toast.classList.add('hidden');
    }, 3200);
  }

  // --------------------------------------------------------------------------
  // 10. SCROLL REVEAL OBSERVER WITH STAGGER
  // --------------------------------------------------------------------------
  const revealTargets = document.querySelectorAll(
    '.det-card, .p-spec-card, .p-feat-item, .f-box, .card-soft, .sector-card, .showcase-box, .timeline-node'
  );

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry, idx) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('is-revealed');
        }, (idx % 4) * 80);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -30px 0px'
  });

  revealTargets.forEach(el => {
    el.classList.add('reveal-card');
    revealObserver.observe(el);
  });

  // --------------------------------------------------------------------------
  // 11. INTERACTIVE MOUSE SPOTLIGHT ON CARDS
  // --------------------------------------------------------------------------
  const glowCards = document.querySelectorAll('.det-card, .p-spec-card, .hero-card-showcase');
  glowCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // --------------------------------------------------------------------------
  // 12. DYNAMIC CYBER NETWORK CANVAS (AI SURVEILLANCE MESH)
  // --------------------------------------------------------------------------
  const bgCanvas = document.getElementById('cyberNetworkCanvas');
  if (bgCanvas) {
    const ctx = bgCanvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    let particles = [];
    const mouse = { x: -1000, y: -1000, active: false };

    function resizeCanvas() {
      width = window.innerWidth;
      height = window.innerHeight;
      bgCanvas.width = width;
      bgCanvas.height = height;
      initParticles();
    }

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = (Math.random() - 0.5) * 0.6;
        this.radius = Math.random() * 1.8 + 1.2;
        this.baseAlpha = Math.random() * 0.35 + 0.25;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;

        if (mouse.active) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            const force = (140 - dist) / 140;
            this.x -= (dx / dist) * force * 1.2;
            this.y -= (dy / dist) * force * 1.2;
          }
        }
      }

      draw(isDark) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        if (isDark) {
          ctx.fillStyle = `rgba(56, 189, 248, ${this.baseAlpha})`;
          ctx.shadowColor = '#38bdf8';
          ctx.shadowBlur = 6;
        } else {
          ctx.fillStyle = `rgba(2, 132, 199, ${this.baseAlpha * 0.75})`;
          ctx.shadowColor = 'transparent';
          ctx.shadowBlur = 0;
        }
        ctx.fill();
      }
    }

    function initParticles() {
      particles = [];
      const count = Math.min(Math.floor((width * height) / 28000), 55);
      for (let i = 0; i < count; i++) {
        particles.push(new Particle());
      }
    }

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    });
    window.addEventListener('mouseleave', () => {
      mouse.active = false;
    });

    resizeCanvas();

    function renderLoop() {
      ctx.clearRect(0, 0, width, height);
      const isDark = document.body.classList.contains('theme-dark');
      const maxDistance = 125;

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.update();
        p1.draw(isDark);

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * (isDark ? 0.22 : 0.12);
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = isDark ? `rgba(56, 189, 248, ${alpha})` : `rgba(2, 132, 199, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        if (mouse.active) {
          const mdx = p1.x - mouse.x;
          const mdy = p1.y - mouse.y;
          const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mDist < 140) {
            const mAlpha = (1 - mDist / 140) * (isDark ? 0.35 : 0.2);
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = isDark ? `rgba(56, 189, 248, ${mAlpha})` : `rgba(2, 132, 199, ${mAlpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(renderLoop);
    }

    renderLoop();
  }
});


