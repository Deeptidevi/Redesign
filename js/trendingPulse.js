/* ==========================================================================
   YOUTUBE REIMAGINED - TRENDING PULSE CANVAS ENGINE
   Renders real-time audio/waveform pulse graph with animated data spikes.
   ========================================================================== */

class TrendingPulseEngine {
  constructor() {
    this.canvas = document.getElementById('trendingWaveCanvas');
    if (!this.canvas) return;
    
    this.ctx = this.canvas.getContext('2d');
    this.step = 0;
    this.creators = [
      { name: 'MrBeast', views: '2.1M watching', xPercent: 0.20, spike: 45 },
      { name: 'Music', views: '1.2M watching', xPercent: 0.40, spike: 25 },
      { name: 'News', views: '850K watching', xPercent: 0.60, spike: 55 },
      { name: 'Live Event', views: '4.8M watching', xPercent: 0.80, spike: 35 }
    ];

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.animate();
  }

  resize() {
    const parent = this.canvas.parentElement;
    if (!parent) return;
    this.width = parent.clientWidth;
    this.height = parent.clientHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    this.step += 0.04;

    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.width, this.height);

    const centerY = this.height / 2;

    // Draw background glowing area under wave
    ctx.beginPath();
    ctx.moveTo(0, this.height);

    for (let x = 0; x <= this.width; x += 4) {
      const normX = x / this.width;
      
      // Base sine wave
      let y = Math.sin(normX * 10 + this.step) * 15 + Math.cos(normX * 6 - this.step) * 10;

      // Add spikes at creator locations
      this.creators.forEach(c => {
        const dist = Math.abs(normX - c.xPercent);
        if (dist < 0.08) {
          const spikeFactor = (1 - dist / 0.08);
          y -= Math.sin(this.step * 3) * c.spike * spikeFactor;
        }
      });

      ctx.lineTo(x, centerY + y);
    }

    ctx.lineTo(this.width, this.height);
    ctx.closePath();

    // Gradient fill under wave
    const grad = ctx.createLinearGradient(0, 0, 0, this.height);
    grad.addColorStop(0, 'rgba(255, 0, 51, 0.35)');
    grad.addColorStop(1, 'rgba(255, 0, 51, 0.0)');
    ctx.fillStyle = grad;
    ctx.fill();

    // Draw main wave line
    ctx.beginPath();
    for (let x = 0; x <= this.width; x += 4) {
      const normX = x / this.width;
      let y = Math.sin(normX * 10 + this.step) * 15 + Math.cos(normX * 6 - this.step) * 10;

      this.creators.forEach(c => {
        const dist = Math.abs(normX - c.xPercent);
        if (dist < 0.08) {
          const spikeFactor = (1 - dist / 0.08);
          y -= Math.sin(this.step * 3) * c.spike * spikeFactor;
        }
      });

      if (x === 0) ctx.moveTo(x, centerY + y);
      else ctx.lineTo(x, centerY + y);
    }

    ctx.strokeStyle = '#ff0033';
    ctx.lineWidth = 3;
    ctx.shadowColor = '#ff0033';
    ctx.shadowBlur = 15;
    ctx.stroke();
    ctx.shadowBlur = 0; // reset
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.pulseEngine = new TrendingPulseEngine();
});
