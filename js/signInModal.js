/* ==========================================================================
   YOUTUBE CINEMA - CINEMATIC SIGN IN EXPERIENCE
   Soft blur backdrop, glassmorphism panel, keyboard ESC support & feedback
   ========================================================================== */

class SignInModalManager {
  constructor() {
    this.modal = document.getElementById('signInModal');
    this.backdrop = document.getElementById('signInBackdrop');
    this.panel = document.getElementById('signInPanel');
    this.closeBtn = document.getElementById('closeSignInBtn');
    this.form = document.getElementById('signInForm');
    this.togglePwdBtn = document.getElementById('togglePwdBtn');
    this.pwdInput = document.getElementById('signinPassword');
    this.googleAuthBtn = document.getElementById('googleAuthBtn');
    this.switchToSignUp = document.getElementById('switchToSignUp');
    this.titleEl = this.panel ? this.panel.querySelector('.signin-title') : null;
    this.subtitleEl = this.panel ? this.panel.querySelector('.signin-subtitle') : null;
    this.submitBtn = document.getElementById('submitSignInBtn');

    this.isSignUpMode = false;

    this.init();
  }

  init() {
    this.bindTriggers();
    this.bindCloseEvents();
    this.bindPasswordToggle();
    this.bindFormSubmit();
    this.bindGoogleAuth();
    this.bindModeToggle();
  }

  bindTriggers() {
    // Top Nav Sign In button
    const navSignInBtn = document.getElementById('signInBtn');
    if (navSignInBtn) {
      navSignInBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.open(false);
      });
    }

    // Horizon section buttons
    const horizonSignInBtn = document.getElementById('horizonSignInBtn');
    if (horizonSignInBtn) {
      horizonSignInBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.open(false);
      });
    }

    const horizonCreateAccountBtn = document.getElementById('horizonCreateAccountBtn');
    if (horizonCreateAccountBtn) {
      horizonCreateAccountBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.open(true);
      });
    }
  }

  bindCloseEvents() {
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.close());
    }

    if (this.backdrop) {
      this.backdrop.addEventListener('click', () => this.close());
    }

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen()) {
        this.close();
      }
    });
  }

  bindPasswordToggle() {
    if (this.togglePwdBtn && this.pwdInput) {
      this.togglePwdBtn.addEventListener('click', () => {
        const isPassword = this.pwdInput.type === 'password';
        this.pwdInput.type = isPassword ? 'text' : 'password';
        const icon = this.togglePwdBtn.querySelector('i');
        if (icon) {
          icon.className = isPassword ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye';
        }
      });
    }
  }

  bindFormSubmit() {
    if (this.form) {
      this.form.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = document.getElementById('signinEmail');
        const email = emailInput ? emailInput.value : '';

        if (this.submitBtn) {
          const originalText = this.submitBtn.innerHTML;
          this.submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Authenticating...`;
          this.submitBtn.disabled = true;

          setTimeout(() => {
            this.submitBtn.innerHTML = `<i class="fa-solid fa-check"></i> Welcome Back!`;
            setTimeout(() => {
              this.close();
              this.submitBtn.innerHTML = originalText;
              this.submitBtn.disabled = false;
              if (emailInput) emailInput.value = '';
              if (this.pwdInput) this.pwdInput.value = '';
              this.showToast(this.isSignUpMode ? 'Account created! Welcome to YouTube Cinema.' : `Signed in as ${email || 'Cinema Member'}`);
            }, 800);
          }, 900);
        }
      });
    }
  }

  bindGoogleAuth() {
    if (this.googleAuthBtn) {
      this.googleAuthBtn.addEventListener('click', () => {
        const originalText = this.googleAuthBtn.innerHTML;
        this.googleAuthBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Connecting to Google...`;
        this.googleAuthBtn.disabled = true;

        setTimeout(() => {
          this.close();
          this.googleAuthBtn.innerHTML = originalText;
          this.googleAuthBtn.disabled = false;
          this.showToast('Successfully authenticated with Google account');
        }, 1100);
      });
    }
  }

  bindModeToggle() {
    if (this.switchToSignUp) {
      this.switchToSignUp.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggleMode();
      });
    }
  }

  toggleMode() {
    this.isSignUpMode = !this.isSignUpMode;
    if (this.isSignUpMode) {
      if (this.titleEl) this.titleEl.textContent = 'Create Cinema Account';
      if (this.subtitleEl) this.subtitleEl.textContent = 'Join millions of film lovers and curate your personal cinema universe.';
      if (this.submitBtn) this.submitBtn.innerHTML = `<span>Create Free Account</span> <i class="fa-solid fa-arrow-right"></i>`;
      if (this.switchToSignUp) {
        this.switchToSignUp.parentElement.innerHTML = `Already have an account? <a href="#" class="signup-link" id="switchToSignUp">Sign In</a>`;
        document.getElementById('switchToSignUp').addEventListener('click', (e) => {
          e.preventDefault();
          this.toggleMode();
        });
      }
    } else {
      if (this.titleEl) this.titleEl.textContent = 'Welcome Back';
      if (this.subtitleEl) this.subtitleEl.textContent = 'Enter your details to access your curated streams and saved worlds.';
      if (this.submitBtn) this.submitBtn.innerHTML = `<span>Sign In to Cinema</span> <i class="fa-solid fa-arrow-right"></i>`;
      if (this.switchToSignUp) {
        this.switchToSignUp.parentElement.innerHTML = `Don't have an account? <a href="#" class="signup-link" id="switchToSignUp">Create account</a>`;
        document.getElementById('switchToSignUp').addEventListener('click', (e) => {
          e.preventDefault();
          this.toggleMode();
        });
      }
    }
  }

  open(signUpMode = false) {
    if (!this.modal) return;
    this.isSignUpMode = !signUpMode; // Will flip inside toggleMode
    this.toggleMode();

    this.modal.classList.add('active');
    this.modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('signin-open');

    const emailInput = document.getElementById('signinEmail');
    if (emailInput) {
      setTimeout(() => emailInput.focus(), 350);
    }
  }

  close() {
    if (!this.modal) return;
    this.modal.classList.remove('active');
    this.modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('signin-open');
  }

  isOpen() {
    return this.modal && this.modal.classList.contains('active');
  }

  showToast(message) {
    let toast = document.getElementById('cinemaToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'cinemaToast';
      toast.className = 'cinema-toast';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>${message}</span>`;
    toast.classList.add('visible');
    setTimeout(() => toast.classList.remove('visible'), 3600);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.signInModalManager = new SignInModalManager();
});
