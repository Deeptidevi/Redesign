/* ==========================================================================
   YOUTUBE HERO - LOCAL UPLOADED VIDEO BACKGROUND ENGINE
   Plays the user's uploaded hero background video (video/hero background video.mp4)
   with translucent soft blur effect. Simple, clean, no rotation needed.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const heroVideo = document.getElementById('heroLocalVideo');

  if (heroVideo) {
    // Ensure video plays muted & looped
    heroVideo.muted = true;
    heroVideo.loop = true;
    heroVideo.playsInline = true;

    // Force autoplay
    heroVideo.play().catch(() => {
      // Retry on user interaction if autoplay blocked
      document.addEventListener('click', () => {
        heroVideo.play().catch(() => {});
      }, { once: true });
    });
  }
});
