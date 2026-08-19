/* ==========================================================================
   NOTIFICATION POPOVER CONTROLLER
   Cinematic notification panel for the bell icon in the header.
   ========================================================================== */

class NotificationPopover {
  constructor() {
    this.btn       = document.getElementById('notifBtn');
    this.popover   = document.getElementById('notifPopover');
    this.closeBtn  = document.getElementById('closeNotifBtn');
    this.notifDot  = document.getElementById('notifDot');

    if (!this.btn || !this.popover) return;
    this.init();
  }

  init() {
    // Toggle popover on bell click
    this.btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = this.popover.classList.contains('active');
      if (isOpen) {
        this.close();
      } else {
        this.open();
      }
    });

    // Close on X button
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.close();
      });
    }

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!this.popover.contains(e.target) && e.target !== this.btn) {
        this.close();
      }
    });

    // Close on ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.close();
    });
  }

  open() {
    this.popover.classList.add('active');
    this.popover.setAttribute('aria-hidden', 'false');
    this.btn.classList.add('active');

    // Clear notification dot once opened
    if (this.notifDot) {
      this.notifDot.classList.add('cleared');
    }
  }

  close() {
    this.popover.classList.remove('active');
    this.popover.setAttribute('aria-hidden', 'true');
    this.btn.classList.remove('active');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.notificationPopover = new NotificationPopover();
});
