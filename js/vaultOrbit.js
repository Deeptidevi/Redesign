/* ==========================================================================
   YOUTUBE QUIET LUXURY - VAULT CORE 3D ORBITING CARDS ENGINE
   Handles 6 floating cinematic cards orbiting a soft glowing vault core orb.
   CHANGES CONTENT DYNAMICALLY UPON EVERY COMPLETE 3D ORBIT REVOLUTION!
   ========================================================================== */

class VaultOrbitEngine {
  constructor() {
    this.stage = document.getElementById('vaultOrbitStage');
    this.cards = document.querySelectorAll('.vault-orbit-card');
    this.orb = document.getElementById('vaultCoreOrb');
    
    this.angle = 0;
    this.speed = 0.0035; // Smooth 60fps orbit
    this.isHovered = false;
    this.hoveredCardIndex = -1;
    this.revolutionCount = 0;

    // Additional Masterpiece Datasets for Orbit Revolutions
    this.masterpieceSets = [
      [
        { title: "Interstellar Odyssey", badge: "4K HDR DOCUMENTARY", desc: "A deep-space cinematic journey exploring the farthest nebulae.", img: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=600&q=80", video: "https://assets.mixkit.co/videos/preview/mixkit-traveling-through-a-glowing-nebula-in-space-41584-large.mp4" },
        { title: "The Hidden Kingdom", badge: "EDITOR'S CHOICE", desc: "Five decades of legendary Japanese hand-drawn animation history.", img: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80", video: "https://assets.mixkit.co/videos/preview/mixkit-stars-in-the-night-sky-4010-large.mp4" },
        { title: "Hans Zimmer Orchestra", badge: "SPATIAL ATMOS", desc: "Live acoustic symphonic concert recorded in spatial 3D audio.", img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80", video: "https://assets.mixkit.co/videos/preview/mixkit-hands-holding-smartphones-at-a-concert-41566-large.mp4" },
        { title: "Norwegian Fjords 8K", badge: "NATURE CINEMA", desc: "High-frame rate aerial landscapes over pristine arctic waters.", img: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&q=80", video: "https://assets.mixkit.co/videos/preview/mixkit-waves-in-the-water-1164-large.mp4" },
        { title: "Tokyo Cyberpunk Walk", badge: "INDIE ESSAY", desc: "Midnight rain stroll through neon alleys and analog synth vibes.", img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80", video: "https://assets.mixkit.co/videos/preview/mixkit-abstract-fast-flowing-lines-of-light-31780-large.mp4" },
        { title: "Espresso Extraction Art", badge: "SLOW CINEMA", desc: "Macro slow-motion morning ritual with acoustic guitar ambience.", img: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=600&q=80", video: "https://assets.mixkit.co/videos/preview/mixkit-forest-stream-in-the-sunlight-529-large.mp4" }
      ],
      [
        { title: "Kyoto Autumn Leaves", badge: "TRAVEL CINEMA", desc: "Serene bamboo groves and golden temples in crisp 8K HDR.", img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80", video: "https://assets.mixkit.co/videos/preview/mixkit-forest-stream-in-the-sunlight-529-large.mp4" },
        { title: "Quantum Physics Visualized", badge: "SCIENCE ESSAY", desc: "A visual exploration into quantum entanglement and subatomic particles.", img: "https://images.unsplash.com/photo-1507499739999-097706ad8914?auto=format&fit=crop&w=600&q=80", video: "https://assets.mixkit.co/videos/preview/mixkit-abstract-fast-flowing-lines-of-light-31780-large.mp4" },
        { title: "Architectural Wonders", badge: "MINIMAL DESIGN", desc: "Modern brutalist and organic architecture across European capitals.", img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80", video: "https://assets.mixkit.co/videos/preview/mixkit-stars-in-the-night-sky-4010-large.mp4" },
        { title: "Deep Sea Bioluminescence", badge: "OCEAN DOCUMENTARY", desc: "Unseen glowing marine creatures 4,000 meters beneath the surface.", img: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80", video: "https://assets.mixkit.co/videos/preview/mixkit-waves-in-the-water-1164-large.mp4" },
        { title: "Analog Vinyl Crafting", badge: "ACOUSTIC VIBES", desc: "Inside the last remaining vinyl record pressing plant in Berlin.", img: "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=600&q=80", video: "https://assets.mixkit.co/videos/preview/mixkit-hands-holding-smartphones-at-a-concert-41566-large.mp4" },
        { title: "Iceland Aurora Borealis", badge: "NIGHT SKY 8K", desc: "Dancing northern lights over glacial lagoons and volcanic beaches.", img: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=600&q=80", video: "https://assets.mixkit.co/videos/preview/mixkit-traveling-through-a-glowing-nebula-in-space-41584-large.mp4" }
      ]
    ];

    this.init();
  }

  init() {
    if (!this.stage || !this.cards.length) return;
    this.bindHover();
    this.animate();
  }

  bindHover() {
    this.cards.forEach((card, index) => {
      card.addEventListener('mouseenter', () => {
        const videoSrc = card.getAttribute('data-bg-video');
        this.isHovered = true;
        this.hoveredCardIndex = index;
        
        this.cards.forEach((c, idx) => {
          if (idx !== index) {
            c.classList.add('dimmed');
          } else {
            c.classList.add('active-focus');
          }
        });

        if (window.bgVideoEngine && videoSrc) {
          window.bgVideoEngine.crossfadeTo(videoSrc);
        }
      });

      card.addEventListener('mouseleave', () => {
        this.isHovered = false;
        this.hoveredCardIndex = -1;

        this.cards.forEach(c => {
          c.classList.remove('dimmed', 'active-focus');
        });
      });

      card.addEventListener('click', () => {
        const title = card.getAttribute('data-title') || 'Featured Masterpiece';
        const channel = card.getAttribute('data-channel') || 'YouTube Cinema';
        const videoUrl = card.getAttribute('data-video-url') || 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1';

        if (window.videoPlayerModal) {
          window.videoPlayerModal.open(videoUrl, title, channel, 'Vault Masterpiece');
        }
      });
    });
  }

  updateCardContentForRevolution(setIndex) {
    const currentSet = this.masterpieceSets[setIndex % this.masterpieceSets.length];
    this.cards.forEach((card, idx) => {
      const data = currentSet[idx];
      if (!data) return;

      const img = card.querySelector('.voc-img-box img');
      const badge = card.querySelector('.voc-badge');
      const title = card.querySelector('.voc-title');
      const desc = card.querySelector('.voc-desc');

      card.style.transition = 'opacity 0.4s ease';
      card.style.opacity = '0.4';

      setTimeout(() => {
        if (img) img.src = data.img;
        if (badge) badge.textContent = data.badge;
        if (title) title.textContent = data.title;
        if (desc) desc.textContent = data.desc;

        card.setAttribute('data-title', data.title);
        card.setAttribute('data-bg-video', data.video);

        card.style.opacity = '1';
        card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease, filter 0.5s ease';
      }, 300);
    });
  }

  animate() {
    const previousAngle = this.angle;

    // Increment orbit angle
    if (!this.isHovered) {
      this.angle += this.speed;
    } else {
      this.angle += this.speed * 0.2;
    }

    // Check for complete 360 degree (2 * PI) revolution completion
    const previousRev = Math.floor(previousAngle / (Math.PI * 2));
    const currentRev = Math.floor(this.angle / (Math.PI * 2));

    if (currentRev > previousRev) {
      this.revolutionCount++;
      this.updateCardContentForRevolution(this.revolutionCount);
    }

    // Responsive dynamic radius based on viewport width
    const screenWidth = window.innerWidth;
    let radiusX = 410;
    let radiusY = 130;
    let baseScale = 0.96;

    if (screenWidth <= 480) {
      radiusX = 130;
      radiusY = 50;
      baseScale = 0.72;
    } else if (screenWidth <= 768) {
      radiusX = 220;
      radiusY = 80;
      baseScale = 0.82;
    } else if (screenWidth <= 1024) {
      radiusX = 310;
      radiusY = 100;
      baseScale = 0.9;
    }

    const totalCards = this.cards.length;

    this.cards.forEach((card, idx) => {
      const cardAngle = this.angle + (idx * (Math.PI * 2 / totalCards));

      const x = Math.cos(cardAngle) * radiusX;
      const y = Math.sin(cardAngle) * radiusY;
      const z = Math.sin(cardAngle) * 110;

      const depthScale = (z + 160) / 260;
      const zIndex = Math.floor(z + 200);

      if (idx !== this.hoveredCardIndex) {
        card.style.transform = `translate3d(${x}px, ${y}px, ${z}px) scale(${depthScale * baseScale})`;
        card.style.zIndex = zIndex;
      } else {
        card.style.transform = `translate3d(${x}px, ${y - 15}px, 160px) scale(${baseScale * 1.15})`;
        card.style.zIndex = 1000;
      }
    });

    requestAnimationFrame(() => this.animate());
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.vaultOrbitEngine = new VaultOrbitEngine();
});
