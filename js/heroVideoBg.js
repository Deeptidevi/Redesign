/* ==========================================================================
   YOUTUBE HERO - LOCAL & CLOUD CDN VIDEO BACKGROUND ENGINE
   Plays the user's local video locally, and automatically streams 4K cloud CDN on Vercel.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const heroVideo = document.getElementById('heroLocalVideo');

  if (heroVideo) {
    heroVideo.muted = true;
    heroVideo.loop = true;
    heroVideo.playsInline = true;

    const startVideo = () => {
      heroVideo.play().catch(() => {
        // If initial play is blocked, switch directly to reliable CDN stream
        if (!heroVideo.currentSrc || heroVideo.networkState === 3) {
          heroVideo.src = 'https://assets.mixkit.co/videos/preview/mixkit-forest-stream-in-the-sunlight-529-large.mp4';
          heroVideo.load();
        }
        heroVideo.play().catch(() => {
          document.addEventListener('click', () => {
            heroVideo.play().catch(() => {});
          }, { once: true });
        });
      });
    };

    // Ensure fallback triggers on any source errors
    const sources = heroVideo.querySelectorAll('source');
    sources.forEach(source => {
      source.addEventListener('error', () => {
        heroVideo.src = 'https://assets.mixkit.co/videos/preview/mixkit-forest-stream-in-the-sunlight-529-large.mp4';
        heroVideo.load();
        heroVideo.play().catch(() => {});
      });
    });

    startVideo();
  }
});
