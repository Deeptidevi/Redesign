/* ==========================================================================
   YOUTUBE QUIET LUXURY - LIVING BACKGROUND VIDEO ENGINE
   Handles smooth crossfading between background videos based on selected mood
   ========================================================================== */

class BackgroundVideoEngine {
  constructor() {
    this.videoA = document.getElementById('bgVideoA');
    this.videoB = document.getElementById('bgVideoB');
    this.activeVideo = 'A';
    this.currentSrc = '';

    this.init();
  }

  init() {
    if (!this.videoA || !this.videoB) return;
    this.currentSrc = this.videoA.getAttribute('src');
  }

  crossfadeTo(newSrc) {
    if (!newSrc || newSrc === this.currentSrc) return;
    this.currentSrc = newSrc;

    if (this.activeVideo === 'A') {
      // Load into B and fade B in, fade A out
      this.videoB.src = newSrc;
      this.videoB.play().catch(() => {});
      this.videoB.classList.add('active');
      this.videoA.classList.remove('active');
      this.activeVideo = 'B';
    } else {
      // Load into A and fade A in, fade B out
      this.videoA.src = newSrc;
      this.videoA.play().catch(() => {});
      this.videoA.classList.add('active');
      this.videoB.classList.remove('active');
      this.activeVideo = 'A';
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.bgVideoEngine = new BackgroundVideoEngine();
});
