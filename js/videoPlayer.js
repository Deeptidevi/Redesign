/* ==========================================================================
   YOUTUBE REIMAGINED - VIDEO PLAYER MODAL CONTROLLER
   ========================================================================== */

class VideoPlayerModal {
  constructor() {
    this.modal = document.getElementById('videoModal');
    this.backdrop = document.getElementById('modalBackdrop');
    this.closeBtn = document.getElementById('closeModalBtn');
    this.iframe = document.getElementById('videoIframe');
    this.titleEl = document.getElementById('modalTitle');
    this.channelEl = document.getElementById('modalChannel');
    this.viewsEl = document.getElementById('modalViews');

    this.init();
  }

  init() {
    if (!this.modal) return;

    if (this.backdrop) {
      this.backdrop.addEventListener('click', () => this.close());
    }

    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.close());
    }

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal.classList.contains('active')) {
        this.close();
      }
    });

    // Bind video cards in "Made For You" grid
    const cards = document.querySelectorAll('.video-card');
    cards.forEach(card => {
      card.addEventListener('click', () => {
        const title = card.querySelector('.video-title')?.textContent || 'Featured Video';
        const channel = card.querySelector('.channel-name')?.textContent || 'Creator';
        const stats = card.querySelector('.video-stats')?.textContent || '1.2M views';
        
        // Sample embed video
        const sampleUrl = 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1';
        this.open(sampleUrl, title, channel, stats);
      });
    });
  }

  open(url, title, channel, views) {
    if (this.iframe) this.iframe.src = url;
    if (this.titleEl) this.titleEl.textContent = title;
    if (this.channelEl) this.channelEl.textContent = channel;
    if (this.viewsEl) this.viewsEl.textContent = views;

    this.modal.classList.add('active');
  }

  close() {
    if (this.iframe) this.iframe.src = '';
    this.modal.classList.remove('active');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.videoPlayerModal = new VideoPlayerModal();
});
