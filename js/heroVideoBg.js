/* ==========================================================================
   YOUTUBE HERO - LOCAL & CLOUD CDN VIDEO BACKGROUND ENGINE
   Plays the user's local video (video/hero background video.mp4) locally,
   and automatically falls back to high-res cloud CDN video on Vercel/live hosting.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const heroVideo = document.getElementById('heroLocalVideo');

  if (heroVideo) {
    heroVideo.muted = true;
    heroVideo.loop = true;
    heroVideo.playsInline = true;

    // Automatic cloud fallback for online Vercel deployment
    heroVideo.addEventListener('error', () => {
      console.log('Local video not hosted on server; switching to high-res cinematic cloud stream.');
      heroVideo.src = 'https://assets.mixkit.co/videos/preview/mixkit-forest-stream-in-the-sunlight-529-large.mp4';
      heroVideo.play().catch(() => {});
    });

    // Force autoplay
    heroVideo.play().catch(() => {
      document.addEventListener('click', () => {
        heroVideo.play().catch(() => {});
      }, { once: true });
    });
  }
});
