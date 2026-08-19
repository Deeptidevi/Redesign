/* ==========================================================================
   YOUTUBE QUIET LUXURY - FINAL HORIZON GRAVITATIONAL PARTICLE ENGINE
   Handles thousands of soft floating particles reacting to cursor movement.
   When hovering primary CTA, particles gather & orbit around button like gravity!
   ========================================================================== */

class HorizonParticleEngine {
  constructor() {
    this.canvas = document.getElementById('horizonParticleCanvas');
    this.ctaBtn = document.getElementById('horizonCreateAccountBtn');
    this.section = document.getElementById('layerHorizon');

    if (!this.canvas || !this.section) return;

    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.particleCount = 220;

    this.mouse = { x: -1000, y: -1000, isHoveringCta: false };
    this.ctaCenter = { x: 0, y: 0 };

    this.init();
  }

  init() {
    this.resize();
    this.createParticles();
    this.bindEvents();
    this.animate();
  }

  resize() {
    const rect = this.section.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    this.width = rect.width || window.innerWidth;
    this.height = rect.height || 600;

    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;
    this.ctx.scale(dpr, dpr);
  }

  createParticles() {
    this.particles = [];
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 2.2 + 0.8,
        alpha: Math.random() * 0.5 + 0.2,
        color: Math.random() > 0.3 ? '#ffffff' : '#c9184a',
        orbitAngle: Math.random() * Math.PI * 2,
        orbitRadius: Math.random() * 100 + 40,
        orbitSpeed: (Math.random() - 0.5) * 0.04
      });
    }
  }

  bindEvents() {
    window.addEventListener('resize', () => this.resize());

    this.section.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = e.clientX - rect.left;
      this.mouse.y = e.clientY - rect.top;
    });

    this.section.addEventListener('mouseleave', () => {
      this.mouse.x = -1000;
      this.mouse.y = -1000;
      this.mouse.isHoveringCta = false;
    });

    if (this.ctaBtn) {
      this.ctaBtn.addEventListener('mouseenter', () => {
        this.mouse.isHoveringCta = true;
      });

      this.ctaBtn.addEventListener('mouseleave', () => {
        this.mouse.isHoveringCta = false;
      });
    }
  }

  updateCtaCenter() {
    if (!this.ctaBtn) return;
    const ctaRect = this.ctaBtn.getBoundingClientRect();
    const canvasRect = this.canvas.getBoundingClientRect();

    this.ctaCenter = {
      x: ctaRect.left - canvasRect.left + ctaRect.width / 2,
      y: ctaRect.top - canvasRect.top + ctaRect.height / 2
    };
  }

  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.updateCtaCenter();

    this.particles.forEach(p => {
      if (this.mouse.isHoveringCta) {
        // Gravitational Vortex Orbit around Primary Button
        p.orbitAngle += p.orbitSpeed * 2.5;
        const targetX = this.ctaCenter.x + Math.cos(p.orbitAngle) * p.orbitRadius;
        const targetY = this.ctaCenter.y + Math.sin(p.orbitAngle) * (p.orbitRadius * 0.5);

        p.x += (targetX - p.x) * 0.08;
        p.y += (targetY - p.y) * 0.08;
      } else {
        // Normal Floating Ambient Motion + Mouse Attraction/Repulsion
        p.x += p.vx;
        p.y += p.vy;

        // Boundary bounce
        if (p.x < 0 || p.x > this.width) p.vx *= -1;
        if (p.y < 0 || p.y > this.height) p.vy *= -1;

        // Subtle Mouse Attraction
        if (this.mouse.x > 0) {
          const dx = this.mouse.x - p.x;
          const dy = this.mouse.y - p.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 180) {
            const force = (180 - dist) / 180;
            p.x += (dx / dist) * force * 1.5;
            p.y += (dy / dist) * force * 1.5;
          }
        }
      }

      // Render Particle
      this.ctx.save();
      this.ctx.globalAlpha = p.alpha;
      this.ctx.fillStyle = p.color;
      this.ctx.shadowBlur = p.color === '#c9184a' ? 12 : 6;
      this.ctx.shadowColor = p.color;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    });

    requestAnimationFrame(() => this.animate());
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.horizonParticleEngine = new HorizonParticleEngine();
});
