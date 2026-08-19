/* ==========================================================================
   YOUTUBE REIMAGINED - HERO & SPOTLIGHT 3D ENGINE (PREMIUM UPGRADE)
   ========================================================================== */

class HeroSpotlightEngine {
  constructor() {
    this.heroPlayerCard = document.getElementById('heroPlayerCard');
    this.heroStartWatchBtn = document.getElementById('heroStartWatchBtn');
    this.spotlight3D = document.getElementById('spotlightCard3D');
    this.spotlightReflection = document.getElementById('spotlightReflection');

    this.init();
  }

  init() {
    this.bindHeroPlayer();
    this.bind3DTilt();
  }

  bindHeroPlayer() {
    const triggerVideo = () => {
      if (window.videoPlayerModal) {
        window.videoPlayerModal.open(
          'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1',
          'Interstellar Odyssey: Journey to the Deep Cosmos',
          'NASA Media Lab',
          '4.8M views • 4K HDR'
        );
      }
    };

    if (this.heroPlayerCard) {
      this.heroPlayerCard.addEventListener('click', triggerVideo);
    }

    if (this.heroStartWatchBtn) {
      this.heroStartWatchBtn.addEventListener('click', triggerVideo);
    }
  }

  bind3DTilt() {
    if (!this.spotlight3D) return;
    const frame = this.spotlight3D.querySelector('.spotlight-glass-frame');
    if (!frame) return;

    // Attach mousemove listener to container & window
    const handleMove = (e) => {
      const rect = frame.getBoundingClientRect();
      // Check if mouse is hovering over or near frame
      if (
        e.clientX >= rect.left - 50 &&
        e.clientX <= rect.right + 50 &&
        e.clientY >= rect.top - 50 &&
        e.clientY <= rect.bottom + 50
      ) {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Calculate 3D rotation angle
        const rotateX = Math.max(-15, Math.min(15, ((y - centerY) / centerY) * -16));
        const rotateY = Math.max(-15, Math.min(15, ((x - centerX) / centerX) * 16));

        frame.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;

        if (this.spotlightReflection) {
          const percentX = (x / rect.width) * 100;
          const percentY = (y / rect.height) * 100;
          this.spotlightReflection.style.opacity = '1';
          this.spotlightReflection.style.background = `radial-gradient(circle at ${percentX}% ${percentY}%, rgba(255, 255, 255, 0.3) 0%, transparent 60%)`;
        }
      } else {
        frame.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
        if (this.spotlightReflection) {
          this.spotlightReflection.style.opacity = '0';
        }
      }
    };

    window.addEventListener('mousemove', handleMove);

    const playBtn = document.getElementById('spotlightPlayBtn');
    if (playBtn) {
      playBtn.addEventListener('click', () => {
        if (window.videoPlayerModal) {
          window.videoPlayerModal.open(
            'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1',
            'The Hidden Kingdom: Story of Anime Animation',
            'Editor\'s Choice',
            'Documentary Film • 4K'
          );
        }
      });
    }

    const likeBtn = document.getElementById('spotlightLikeBtn');
    if (likeBtn) {
      likeBtn.addEventListener('click', () => {
        likeBtn.innerHTML = '<i class="fa-solid fa-heart text-crimson"></i> Added to Watchlist';
        likeBtn.style.borderColor = '#FF2D55';
        likeBtn.style.boxShadow = '0 0 20px rgba(255, 45, 85, 0.4)';
      });
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.heroSpotlight = new HeroSpotlightEngine();
});
