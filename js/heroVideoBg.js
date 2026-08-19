/* ==========================================================================
   YOUTUBE HERO - LOCAL VIDEO BACKGROUND ENGINE
   Plays the user's uploaded hero background video (video/hero background video.mp4)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const heroVideo = document.getElementById('heroLocalVideo');

  if (heroVideo) {
    heroVideo.muted = true;
    heroVideo.loop = true;
    heroVideo.playsInline = true;

    // Autoplay execution with interaction fallback
    heroVideo.play().catch(() => {
      document.addEventListener('click', () => {
        heroVideo.play().catch(() => {});
      }, { once: true });
    });
  }
});
