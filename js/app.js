/* ==========================================================================
   YOUTUBE REIMAGINED - MAIN APP ENGINE
   ========================================================================== */

class MainAppController {
  constructor() {
    this.cwContainer = document.getElementById('cwScrollContainer');
    this.cwPrevBtn = document.getElementById('cwPrevBtn');
    this.cwNextBtn = document.getElementById('cwNextBtn');
    this.moodTabs = document.querySelectorAll('.mood-tab');
    this.moodCards = document.querySelectorAll('.mood-card');

    this.init();
  }

  init() {
    this.bindHorizontalScroll();
    this.bindMoodTabs();
    this.bindCardEvents();
    this.bindPremiumActions();
  }

  bindHorizontalScroll() {
    if (!this.cwContainer) return;

    if (this.cwNextBtn) {
      this.cwNextBtn.addEventListener('click', () => {
        this.cwContainer.scrollBy({ left: 300, behavior: 'smooth' });
      });
    }

    if (this.cwPrevBtn) {
      this.cwPrevBtn.addEventListener('click', () => {
        this.cwContainer.scrollBy({ left: -300, behavior: 'smooth' });
      });
    }
  }

  bindMoodTabs() {
    this.moodTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const mood = tab.getAttribute('data-mood');

        this.moodTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        this.moodCards.forEach(card => {
          const type = card.getAttribute('data-mood-type');
          if (mood === 'all' || type === mood) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  bindCardEvents() {
    // Continue Watching cards
    const cwCards = document.querySelectorAll('.cw-card');
    cwCards.forEach(card => {
      card.addEventListener('click', () => {
        const url = card.getAttribute('data-video-url');
        const title = card.getAttribute('data-title');
        const channel = card.getAttribute('data-channel');
        const views = card.getAttribute('data-views');

        if (window.videoPlayerModal) {
          window.videoPlayerModal.open(url, title, channel, views);
        }
      });
    });

    // Moments cards
    const momentCards = document.querySelectorAll('.moment-card');
    momentCards.forEach(card => {
      card.addEventListener('click', () => {
        const url = card.getAttribute('data-video-url');
        const title = card.querySelector('.moment-title')?.textContent || 'Short Moment';
        const creator = card.querySelector('.moment-creator')?.textContent || '@creator';

        if (window.videoPlayerModal) {
          window.videoPlayerModal.open(url, title, creator, 'Short Clip');
        }
      });
    });

    // Mood cards
    this.moodCards.forEach(card => {
      card.addEventListener('click', () => {
        const title = card.querySelector('h4')?.textContent || 'Vibe Video';
        const channel = card.querySelector('p')?.textContent || 'Channel';

        if (window.videoPlayerModal) {
          window.videoPlayerModal.open(
            'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1',
            title,
            channel,
            'Curated Vibe'
          );
        }
      });
    });
  }

  bindPremiumActions() {
    const trialBtn = document.getElementById('startTrialBtn');
    if (trialBtn) {
      trialBtn.addEventListener('click', () => {
        alert('Thank you for trying YouTube Premium! Enjoy ad-free streaming, offline downloads, and background play.');
      });
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.mainApp = new MainAppController();
});
