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
  // 5B. DETECTION MATRIX CATEGORY FILTER CHIPS
  // --------------------------------------------------------------------------
  const detFilterChips = document.querySelectorAll('.det-chip-btn');
  const detCards = document.querySelectorAll('.det-card');

  detFilterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      detFilterChips.forEach(b => b.classList.remove('active'));
      chip.classList.add('active');

      const selectedCat = chip.getAttribute('data-cat');

      detCards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (selectedCat === 'all' || cardCat === selectedCat) {
          card.classList.remove('is-filtered-out');
        } else {
          card.classList.add('is-filtered-out');
        }
      });
    });
  });

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
  // 6B. KATALOG CATEGORY FILTER SWITCHER
  // --------------------------------------------------------------------------
  const katalogFilterBtns = document.querySelectorAll('.katalog-filter-btn');
  const katalogGroupBlocks = document.querySelectorAll('.katalog-subgroup-block');

  katalogFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      katalogFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');
      katalogGroupBlocks.forEach(block => {
        const groupType = block.getAttribute('data-category-group');
        if (filterVal === 'all' || filterVal === groupType) {
          block.style.display = 'block';
          block.style.animation = 'fadeIn 0.3s ease forwards';
        } else {
          block.style.display = 'none';
        }
      });
    });
  });

  // --------------------------------------------------------------------------
  // 7. SCREENSHOT & CATALOG LIGHTBOX MODAL (UNIVERSAL DELEGATION)
  // --------------------------------------------------------------------------
  const lightboxModal = document.getElementById('imageLightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');

  document.addEventListener('click', (e) => {
    const zoomable = e.target.closest('.image-zoomable');
    if (zoomable) {
      const imgSrc = zoomable.getAttribute('data-img') || zoomable.querySelector('img')?.src;
      const caption = zoomable.getAttribute('data-caption') || zoomable.querySelector('img')?.alt || 'Pratinjau Katalog XTUR';
      
      if (lightboxImg && lightboxCaption && lightboxModal && imgSrc) {
        lightboxImg.src = imgSrc;
        lightboxCaption.innerHTML = `<strong>Tinjauan Forensik & Perangkat:</strong> ${caption}`;
        lightboxModal.classList.remove('hidden');
      }
    }
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
  // 12. NEXT-GEN CYBER AI SURVEILLANCE BACKGROUND ENGINE
  // Features: Neural Mesh, Travelling Data Packets, Interactive Sonar Ripples,
  //           and AI Vision Tracking Bounding Boxes.
  // --------------------------------------------------------------------------
  const bgCanvas = document.getElementById('cyberNetworkCanvas');
  if (bgCanvas) {
    const ctx = bgCanvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let particles = [];
    let dataPackets = [];
    let sonarRipples = [];
    const mouse = { x: -1000, y: -1000, active: false };

    function resizeCanvas() {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      bgCanvas.width = width * dpr;
      bgCanvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      initParticles();
    }

    class Particle {
      constructor(id) {
        this.id = id;
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.45;
        this.vy = (Math.random() - 0.5) * 0.45;
        this.radius = Math.random() * 2 + 1.2;
        this.baseAlpha = Math.random() * 0.4 + 0.35;
        this.pulse = Math.random() * Math.PI * 2;
        this.pulseSpeed = 0.03 + Math.random() * 0.02;
        this.haloAlpha = 0;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.pulse += this.pulseSpeed;

        if (this.haloAlpha > 0) {
          this.haloAlpha -= 0.02;
          if (this.haloAlpha < 0) this.haloAlpha = 0;
        }

        // Screen wrap
        if (this.x < -20) this.x = width + 20;
        if (this.x > width + 20) this.x = -20;
        if (this.y < -20) this.y = height + 20;
        if (this.y > height + 20) this.y = -20;

        // Subtle mouse repulsion
        if (mouse.active) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150 && dist > 0) {
            const force = (150 - dist) / 150;
            this.x -= (dx / dist) * force * 1.5;
            this.y -= (dy / dist) * force * 1.5;
          }
        }
      }

      draw(isDark) {
        const dynamicAlpha = Math.min(1, Math.max(0.15, this.baseAlpha + Math.sin(this.pulse) * 0.15));

        // Pulsing halo when receiving packet
        if (this.haloAlpha > 0.05) {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius * 3.5, 0, Math.PI * 2);
          ctx.fillStyle = isDark
            ? `rgba(56, 189, 248, ${this.haloAlpha * 0.45})`
            : `rgba(2, 132, 199, ${this.haloAlpha * 0.35})`;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        if (isDark) {
          ctx.fillStyle = `rgba(56, 189, 248, ${dynamicAlpha})`;
          ctx.shadowColor = '#38bdf8';
          ctx.shadowBlur = 8;
        } else {
          ctx.fillStyle = `rgba(2, 132, 199, ${dynamicAlpha * 0.85})`;
          ctx.shadowColor = 'transparent';
          ctx.shadowBlur = 0;
        }
        ctx.fill();
      }
    }

    // Packet that travels between connected nodes
    class DataPacket {
      constructor(p1, p2) {
        this.from = p1;
        this.to = p2;
        this.progress = 0;
        this.speed = 0.012 + Math.random() * 0.016;
        this.alive = true;
      }

      update() {
        this.progress += this.speed;
        if (this.progress >= 1) {
          this.alive = false;
          this.to.haloAlpha = 0.8; // Trigger pulse on target node
        }
      }

      draw(isDark) {
        if (!this.alive) return;
        const curX = this.from.x + (this.to.x - this.from.x) * this.progress;
        const curY = this.from.y + (this.to.y - this.from.y) * this.progress;

        ctx.beginPath();
        ctx.arc(curX, curY, 2.5, 0, Math.PI * 2);
        if (isDark) {
          ctx.fillStyle = '#ffffff';
          ctx.shadowColor = '#00d2ff';
          ctx.shadowBlur = 10;
        } else {
          ctx.fillStyle = '#0284c7';
          ctx.shadowColor = '#38bdf8';
          ctx.shadowBlur = 4;
        }
        ctx.fill();
      }
    }

    // Interactive Sonar Ripple on Click/Touch
    class SonarRipple {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 4;
        this.maxRadius = width < 600 ? 140 : 220;
        this.alpha = 0.85;
        this.speed = 3.5;
        this.alive = true;
      }

      update() {
        this.radius += this.speed;
        this.alpha = (1 - this.radius / this.maxRadius) * 0.85;
        if (this.radius >= this.maxRadius) {
          this.alive = false;
        }

        // Push nearby particles with shockwave
        particles.forEach(p => {
          const dx = p.x - this.x;
          const dy = p.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (Math.abs(dist - this.radius) < 20 && dist > 0) {
            p.x += (dx / dist) * 1.8;
            p.y += (dy / dist) * 1.8;
            p.haloAlpha = 0.7;
          }
        });
      }

      draw(isDark) {
        if (!this.alive || this.alpha <= 0) return;
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.strokeStyle = isDark
          ? `rgba(56, 189, 248, ${this.alpha})`
          : `rgba(2, 132, 199, ${this.alpha})`;
        ctx.lineWidth = 1.8;
        ctx.shadowColor = isDark ? '#38bdf8' : 'transparent';
        ctx.shadowBlur = isDark ? 8 : 0;
        ctx.stroke();

        // Inner echo ring
        if (this.radius > 30) {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius * 0.6, 0, Math.PI * 2);
          ctx.strokeStyle = isDark
            ? `rgba(0, 210, 255, ${this.alpha * 0.4})`
            : `rgba(2, 132, 199, ${this.alpha * 0.3})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Small origin crosshair
        if (this.radius < 50) {
          const crossSize = 8;
          ctx.beginPath();
          ctx.moveTo(this.x - crossSize, this.y);
          ctx.lineTo(this.x + crossSize, this.y);
          ctx.moveTo(this.x, this.y - crossSize);
          ctx.lineTo(this.x, this.y + crossSize);
          ctx.strokeStyle = isDark ? `rgba(255, 255, 255, ${this.alpha})` : `rgba(2, 132, 199, ${this.alpha})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
        ctx.restore();
      }
    }

    function initParticles() {
      particles = [];
      dataPackets = [];

      const isMobile = width < 600;
      const count = isMobile ? 24 : Math.min(Math.floor((width * height) / 24000), 52);
      for (let i = 0; i < count; i++) {
        particles.push(new Particle(i));
      }
    }

    // Spawn ripples on click or touch
    function createRippleAt(clientX, clientY) {
      const rect = bgCanvas.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      sonarRipples.push(new SonarRipple(x, y));
      if (sonarRipples.length > 8) sonarRipples.shift();
    }

    window.addEventListener('click', (e) => {
      createRippleAt(e.clientX, e.clientY);
    });

    window.addEventListener('touchstart', (e) => {
      if (e.touches && e.touches[0]) {
        createRippleAt(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    });
    window.addEventListener('mouseleave', () => {
      mouse.active = false;
    });

    window.addEventListener('touchmove', (e) => {
      if (e.touches && e.touches[0]) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
        mouse.active = true;
      }
    }, { passive: true });

    window.addEventListener('touchend', () => {
      mouse.active = false;
    });

    resizeCanvas();

    let frameCount = 0;

    function renderLoop() {
      ctx.clearRect(0, 0, width, height);
      const isDark = document.body.classList.contains('theme-dark');
      const maxDistance = width < 600 ? 100 : 135;
      frameCount++;

      // 1. Draw Mesh Connections
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
            const alpha = (1 - dist / maxDistance) * (isDark ? 0.24 : 0.13);
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = isDark ? `rgba(56, 189, 248, ${alpha})` : `rgba(2, 132, 199, ${alpha})`;
            ctx.lineWidth = 0.85;
            ctx.stroke();

            // Randomly spawn data packet along active connection
            if (frameCount % 45 === 0 && Math.random() < 0.18 && dataPackets.length < 12) {
              dataPackets.push(new DataPacket(p1, p2));
            }
          }
        }

        // Mouse link
        if (mouse.active) {
          const mdx = p1.x - mouse.x;
          const mdy = p1.y - mouse.y;
          const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mDist < 140) {
            const mAlpha = (1 - mDist / 140) * (isDark ? 0.38 : 0.22);
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = isDark ? `rgba(56, 189, 248, ${mAlpha})` : `rgba(2, 132, 199, ${mAlpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // 2. Update & Draw Travelling Data Packets
      for (let i = dataPackets.length - 1; i >= 0; i--) {
        const packet = dataPackets[i];
        packet.update();
        packet.draw(isDark);
        if (!packet.alive) {
          dataPackets.splice(i, 1);
        }
      }

      // 3. Update & Draw Sonar Ripples
      for (let i = sonarRipples.length - 1; i >= 0; i--) {
        const ripple = sonarRipples[i];
        ripple.update();
        ripple.draw(isDark);
        if (!ripple.alive) {
          sonarRipples.splice(i, 1);
        }
      }



      requestAnimationFrame(renderLoop);
    }

    renderLoop();
  }
});


