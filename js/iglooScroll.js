/* ==========================================================================
   YOUTUBE IGLOO.INC - ATMOSPHERIC SCROLL & LOGO ORBIT FAN ENGINE
   Handles scroll-driven 4-layer cloud descent & central logo video fan out
   Hardware-accelerated 60fps smooth scrolling performance.
   ========================================================================== */

class IglooScrollEngine {
  constructor() {
    this.layerSky = document.getElementById('layerSky');
    this.layerWorlds = document.getElementById('layerWorlds');
    this.layerVault = document.getElementById('layerVault');
    this.layerHorizon = document.getElementById('layerHorizon');

    this.ticking = false;
    this.init();
  }

  init() {
    this.bindAtmosphericScroll();
  }

  bindAtmosphericScroll() {
    const onScroll = () => {
      if (!this.ticking) {
        requestAnimationFrame(() => {
          this.updateScroll();
          this.ticking = false;
        });
        this.ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    this.updateScroll();
  }

  updateScroll() {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;

    // Layer 1 Sky Parallax & Zoom Out
    if (this.layerSky) {
      const progress1 = Math.min(1, scrollY / windowHeight);
      const scaleVal = 1 + progress1 * 0.35;
      const opacityVal = 1 - progress1 * 1.25;

      const skyContent = this.layerSky.querySelector('.sky-center-stage');
      if (skyContent) {
        skyContent.style.transform = `translate3d(0, ${scrollY * 0.25}px, 0) scale(${scaleVal})`;
        skyContent.style.opacity = Math.max(0, opacityVal);
      }
    }

    // Layer 2 Worlds Parallax Fade
    if (this.layerWorlds) {
      const rect = this.layerWorlds.getBoundingClientRect();
      if (rect.top < windowHeight && rect.bottom > 0) {
        const progress2 = (windowHeight - rect.top) / (windowHeight + rect.height);
        this.layerWorlds.style.opacity = Math.min(1, Math.max(0.3, progress2 * 1.5));
      }
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.iglooEngine = new IglooScrollEngine();
});
