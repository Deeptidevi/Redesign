/* ==========================================================================
   YOUTUBE CHILI RED HERO LOGO - 3s RANDOM BACKGROUND VIDEO MOSAIC ENGINE
   Crossfades random YouTube vlogs, videos, and shorts every 3 seconds behind logo
   ========================================================================== */

class HeroMosaicEngine {
  constructor() {
    this.vidA = document.getElementById('mosaicVid1');
    this.vidB = document.getElementById('mosaicVid2');
    this.activeVid = 'A';

    this.videoList = [
      'https://assets.mixkit.co/videos/preview/mixkit-stars-in-the-night-sky-4010-large.mp4',
      'https://assets.mixkit.co/videos/preview/mixkit-hands-holding-smartphones-at-a-concert-41566-large.mp4',
      'https://assets.mixkit.co/videos/preview/mixkit-abstract-fast-flowing-lines-of-light-31780-large.mp4',
      'https://assets.mixkit.co/videos/preview/mixkit-waves-in-the-water-1164-large.mp4',
      'https://assets.mixkit.co/videos/preview/mixkit-traveling-through-a-glowing-nebula-in-space-41584-large.mp4',
      'https://assets.mixkit.co/videos/preview/mixkit-forest-stream-in-the-sunlight-529-large.mp4'
    ];

    this.currentIndex = 0;
    this.init();
  }

  init() {
    if (!this.vidA || !this.vidB) return;
    this.startRandomLoop();
  }

  startRandomLoop() {
    setInterval(() => {
      let randomIndex = Math.floor(Math.random() * this.videoList.length);
      while (randomIndex === this.currentIndex) {
        randomIndex = Math.floor(Math.random() * this.videoList.length);
      }
      this.currentIndex = randomIndex;
      const nextSrc = this.videoList[this.currentIndex];

      if (this.activeVid === 'A') {
        this.vidB.src = nextSrc;
        this.vidB.play().catch(() => {});
        this.vidB.classList.add('active');
        this.vidA.classList.remove('active');
        this.activeVid = 'B';
      } else {
        this.vidA.src = nextSrc;
        this.vidA.play().catch(() => {});
        this.vidA.classList.add('active');
        this.vidB.classList.remove('active');
        this.activeVid = 'A';
      }
    }, 3000); // 3-second random crossfade interval
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.heroMosaicEngine = new HeroMosaicEngine();
});
