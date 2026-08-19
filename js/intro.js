/* ==========================================================================
   YOUTUBE CINEMA - OPENING INTRO ENGINE
   Clean pitch-black intro overlay & 2.5s auto-dismissal
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const skipBtn = document.getElementById("skipIntroBtn");
  const overlay = document.getElementById("introOverlay");

  // Show skip button after 1 second
  if (skipBtn) {
    setTimeout(() => skipBtn.classList.add("visible"), 1000);
  }

  // Dismiss intro helper
  function dismissIntro() {
    if (!overlay) return;
    overlay.classList.add("dismissed");
  }

  // Click Skip Intro button
  if (skipBtn && overlay) {
    skipBtn.addEventListener("click", dismissIntro);
  }

  // Allow clicking anywhere on the overlay to dismiss immediately
  if (overlay) {
    overlay.addEventListener("click", (e) => {
      if (e.target === skipBtn || skipBtn.contains(e.target)) return;
      dismissIntro();
    });
  }

  // Auto-dismiss after 2.5 seconds
  setTimeout(dismissIntro, 2500);

  // Replay intro buttons
  const replayBtn = document.getElementById("replayIntroBtn");
  const footerReplayBtn = document.getElementById("footerReplayBtn");
  [replayBtn, footerReplayBtn].forEach(btn => {
    if (btn && overlay) {
      btn.addEventListener("click", () => {
        overlay.classList.remove("dismissed");
        window.scrollTo({ top: 0, behavior: "smooth" });
        if (skipBtn) {
          skipBtn.classList.remove("visible");
          setTimeout(() => skipBtn.classList.add("visible"), 1000);
        }
        setTimeout(dismissIntro, 2.500);
      });
    }
  });
});
