/* ==========================================================================
   YOUTUBE 4K CRISP PLAY LOGO - QUIET LUXURY DECENT RED PARTICLE ENGINE
   Uses deep muted burgundy crimson (#c9184a), zero harsh neon red glow,
   larger size, high-DPI razor sharp vector play button.
   ========================================================================== */

class LogoParticleEngine {
  constructor() {
    this.canvas = document.getElementById('logoParticleCanvas');
    this.container = document.getElementById('floatingHeroLogo');
    if (!this.canvas || !this.container) return;

    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.isHovered = false;

    // Larger 4K Canvas dimensions (420px x 280px)
    this.width = 420;
    this.height = 280;

    this.init();
  }

  init() {
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;
    this.ctx.scale(dpr, dpr);

    this.createLogoShapeParticles();
    this.bindEvents();
    this.animate();
  }

  createLogoShapeParticles() {
    this.particles = [];
    const centerX = this.width / 2;
    const centerY = this.height / 2;

    // Enlarged crisp play button shape dimensions
    const rectW = 260;
    const rectH = 175;
    const radius = 48;
    const step = 3;

    const left = centerX - rectW / 2;
    const right = centerX + rectW / 2;
    const top = centerY - rectH / 2;
    const bottom = centerY + rectH / 2;

    // Inner White Triangle
    const triX1 = centerX - 28;
    const triY1 = centerY - 40;
    const triX2 = centerX - 28;
    const triY2 = centerY + 40;
    const triX3 = centerX + 40;
    const triY3 = centerY;

    function isPointInTriangle(px, py) {
      const area = 0.5 * (-triY2 * triX3 + triY1 * (-triX2 + triX3) + triX1 * (triY2 - triY3) + triX2 * triY3);
      const s = 1 / (2 * area) * (triY1 * triX3 - triX1 * triY3 + (triY3 - triY1) * px + (triX1 - triX3) * py);
      const t = 1 / (2 * area) * (triX1 * triY2 - triY1 * triX2 + (triY1 - triY2) * px + (triX2 - triX1) * py);
      return s > 0 && t > 0 && (1 - s - t) > 0;
    }

    for (let x = left; x <= right; x += step) {
      for (let y = top; y <= bottom; y += step) {
        let valid = true;
        if (x < left + radius && y < top + radius) {
          valid = Math.hypot(x - (left + radius), y - (top + radius)) <= radius;
        } else if (x > right - radius && y < top + radius) {
          valid = Math.hypot(x - (right - radius), y - (top + radius)) <= radius;
        } else if (x < left + radius && y > bottom - radius) {
          valid = Math.hypot(x - (left + radius), y - (bottom - radius)) <= radius;
        } else if (x > right - radius && y > bottom - radius) {
          valid = Math.hypot(x - (right - radius), y - (bottom - radius)) <= radius;
        }

        if (valid) {
          const inTriangle = isPointInTriangle(x, y);
          this.particles.push({
            originX: x,
            originY: y,
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 10,
            vy: (Math.random() - 0.5) * 10,
            size: inTriangle ? 2.0 : 2.2,
            color: inTriangle ? '#ffffff' : '#c9184a', // Decent muted burgundy red
            orbitAngle: Math.random() * Math.PI * 2,
            orbitSpeed: (Math.random() - 0.5) * 0.06
          });
        }
      }
    }
  }

  bindEvents() {
    const fanVideos = document.querySelectorAll('.fan-video');

    this.container.addEventListener('mouseenter', () => {
      this.isHovered = true;
      this.particles.forEach(p => {
        p.vx = (Math.random() - 0.5) * 18;
        p.vy = (Math.random() - 0.5) * 18;
      });

      // Explicitly trigger play on all live preview videos on hover
      fanVideos.forEach(v => {
        v.muted = true;
        v.play().catch(() => {});
      });
    });

    this.container.addEventListener('mouseleave', () => {
      this.isHovered = false;
    });
  }

  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    if (!this.isHovered) {
      const centerX = this.width / 2;
      const centerY = this.height / 2;
      const rectW = 260;
      const rectH = 175;
      const radius = 48;

      // Draw crisp decent muted burgundy play button base
      this.ctx.save();
      this.ctx.fillStyle = '#c9184a';
      this.ctx.shadowColor = 'rgba(201, 24, 74, 0.4)';
      this.ctx.shadowBlur = 25;

      this.ctx.beginPath();
      this.ctx.roundRect(centerX - rectW / 2, centerY - rectH / 2, rectW, rectH, radius);
      this.ctx.fill();

      // Draw crisp white center play triangle
      this.ctx.fillStyle = '#ffffff';
      this.ctx.shadowBlur = 0;
      this.ctx.beginPath();
      this.ctx.moveTo(centerX - 28, centerY - 40);
      this.ctx.lineTo(centerX - 28, centerY + 40);
      this.ctx.lineTo(centerX + 40, centerY);
      this.ctx.closePath();
      this.ctx.fill();
      this.ctx.restore();
    } else {
      // Draw exploding orbiting particles
      this.particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.94;
        p.vy *= 0.94;

        p.orbitAngle += p.orbitSpeed;
        p.x += Math.cos(p.orbitAngle) * 1.2;
        p.y += Math.sin(p.orbitAngle) * 1.2;

        this.ctx.save();
        this.ctx.fillStyle = p.color;
        this.ctx.shadowBlur = p.color === '#c9184a' ? 10 : 0;
        this.ctx.shadowColor = 'rgba(201, 24, 74, 0.5)';
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.restore();
      });
    }

    requestAnimationFrame(() => this.animate());
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.logoParticleEngine = new LogoParticleEngine();
});
