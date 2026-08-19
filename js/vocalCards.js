/* ==========================================================================
   YOUTUBE QUIET LUXURY - PARALLEL OPPOSITE SCROLL & CARDS ENGINE
   Handles parallel sliding tracks in opposite directions on scroll down + bg video crossfade
   ========================================================================== */

class VocalCardsEngine {
  constructor() {
    this.stage = document.getElementById('parallelScrollStage');
    this.trackLeft = document.getElementById('trackLeft');
    this.trackRight = document.getElementById('trackRight');
    this.cards = document.querySelectorAll('.vocal-card');

    this.init();
  }

  init() {
    if (!this.stage || !this.trackLeft || !this.trackRight) return;
    this.bindParallelScroll();
    this.bindHoverAndClick();
  }

  bindParallelScroll() {
    const onScroll = () => {
      const rect = this.stage.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Check if section is within viewport range
      if (rect.top < windowHeight && rect.bottom > 0) {
        // Calculate scroll progress through the section (0 to 1)
        const progress = (windowHeight - rect.top) / (windowHeight + rect.height);
        const shiftAmount = (progress - 0.5) * 450; // Max horizontal movement in px

        // Track 1 moves LEFT (-shiftAmount)
        this.trackLeft.style.transform = `translate3d(${-shiftAmount}px, 0px, 0px)`;
        
        // Track 2 moves RIGHT (+shiftAmount) (Opposite direction)
        this.trackRight.style.transform = `translate3d(${shiftAmount}px, 0px, 0px)`;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // initial trigger
  }

  bindHoverAndClick() {
    this.cards.forEach(card => {
      const videoSrc = card.getAttribute('data-bg-video');

      card.addEventListener('mouseenter', () => {
        if (window.bgVideoEngine && videoSrc) {
          window.bgVideoEngine.crossfadeTo(videoSrc);
        }
      });

      card.addEventListener('click', () => {
        const title = card.getAttribute('data-title') || card.querySelector('.vocal-title')?.textContent;
        const channel = card.getAttribute('data-channel') || 'Featured Creator';
        
        if (window.videoPlayerModal) {
          window.videoPlayerModal.open(
            'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1',
            title,
            channel,
            'Explore World'
          );
        }
      });
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.vocalCardsEngine = new VocalCardsEngine();
});
