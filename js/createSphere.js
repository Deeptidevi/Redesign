/* ==========================================================================
   YOUTUBE REIMAGINED - CREATE SPHERE CONTROLLER
   Handles satellite menu expansions & creation modal actions.
   ========================================================================== */

class CreateSphereController {
  constructor() {
    this.wrapper = document.getElementById('createSphereWrapper');
    this.satellites = document.querySelectorAll('.satellite-btn');
    this.init();
  }

  init() {
    if (!this.wrapper) return;

    this.satellites.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const action = btn.getAttribute('data-action');
        this.handleAction(action);
      });
    });
  }

  handleAction(action) {
    const titles = {
      upload: 'Upload Video',
      live: 'Go Live Broadcast',
      short: 'Create YouTube Short',
      post: 'Create Community Post'
    };

    const title = titles[action] || 'Action';
    
    // Create floating toast notification
    const toast = document.createElement('div');
    toast.className = 'create-toast';
    toast.style.cssText = `
      position: fixed;
      bottom: 30px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(18, 20, 29, 0.95);
      border: 1px solid #ff0033;
      box-shadow: 0 0 25px rgba(255,0,51,0.5);
      color: white;
      padding: 12px 24px;
      border-radius: 20px;
      font-size: 0.88rem;
      font-weight: 700;
      z-index: 2000;
      display: flex;
      align-items: center;
      gap: 10px;
      animation: toastIn 0.3s ease;
    `;
    toast.innerHTML = `<i class="fa-solid fa-wand-magic-sparkles" style="color:#ff0033"></i> Studio Launcher: Starting <strong>${title}</strong>...`;

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.4s ease';
      setTimeout(() => toast.remove(), 400);
    }, 2500);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.createSphere = new CreateSphereController();
});
