/* ==========================================================================
   YOUTUBE REIMAGINED - SECRET EASTER EGG (KONAMI CODE & MATRIX MODE)
   ========================================================================== */

class EasterEggManager {
  constructor() {
    this.konamiCode = [
      'ArrowUp', 'ArrowUp', 
      'ArrowDown', 'ArrowDown', 
      'ArrowLeft', 'ArrowRight', 
      'ArrowLeft', 'ArrowRight', 
      'b', 'a'
    ];
    this.inputSequence = [];
    this.modal = document.getElementById('easterModal');
    this.closeBtn = document.getElementById('closeEasterBtn');
    this.toggleMatrixBtn = document.getElementById('toggleMatrixModeBtn');
    this.hintEl = document.getElementById('easterHint');
    this.logoClicks = 0;

    this.init();
  }

  init() {
    this.bindKeyboard();
    this.bindClicks();
  }

  bindKeyboard() {
    window.addEventListener('keydown', (e) => {
      this.inputSequence.push(e.key);
      if (this.inputSequence.length > this.konamiCode.length) {
        this.inputSequence.shift();
      }

      if (this.inputSequence.join('').toLowerCase() === this.konamiCode.join('').toLowerCase()) {
        this.triggerSecret();
      }
    });
  }

  bindClicks() {
    if (this.hintEl) {
      this.hintEl.addEventListener('click', () => this.triggerSecret());
    }

    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.close());
    }

    if (this.toggleMatrixBtn) {
      this.toggleMatrixBtn.addEventListener('click', () => {
        document.body.classList.toggle('matrix-mode');
        this.close();
      });
    }

    const headerLogo = document.getElementById('headerLogo');
    if (headerLogo) {
      headerLogo.addEventListener('click', () => {
        this.logoClicks++;
        if (this.logoClicks >= 5) {
          this.triggerSecret();
          this.logoClicks = 0;
        }
      });
    }
  }

  triggerSecret() {
    if (this.modal) {
      this.modal.classList.add('active');
    }
  }

  close() {
    if (this.modal) {
      this.modal.classList.remove('active');
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.easterEgg = new EasterEggManager();
});
