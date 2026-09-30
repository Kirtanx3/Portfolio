document.addEventListener('DOMContentLoaded', () => {
  // =========================================================================
  // 1. TYPING ANIMATION (ORIGINAL PORTFOLIO PHRASES)
  // =========================================================================
  const phrases = [
    'bridging hardware & software',
    'designing IoT systems',
    'building software that feels right',
    'turning complexity into clarity'
  ];
  const typedEl = document.getElementById('typedText');
  let phraseIdx = 0, charIdx = 0, deleting = false;

  function typeTick() {
    if (!typedEl) return;
    const current = phrases[phraseIdx];
    if (!deleting) {
      typedEl.textContent = current.slice(0, ++charIdx);
      if (charIdx === current.length) {
        deleting = true;
        setTimeout(typeTick, 2000);
        return;
      }
    } else {
      typedEl.textContent = current.slice(0, --charIdx);
      if (charIdx === 0) {
        deleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
      }
    }
    setTimeout(typeTick, deleting ? 35 : 75);
  }
  setTimeout(typeTick, 600);

  // =========================================================================
  // 2. TOAST NOTIFICATION UTILITY
  // =========================================================================
  const toast = document.getElementById('toastNotice');
  let toastTimer;
  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2400);
  }

  // =========================================================================
  // 4. COPY EMAIL ACTIONS
  // =========================================================================
  const copyEmailAction = document.getElementById('copyEmailAction');
  const copyEmailLabel = document.getElementById('copyEmailLabel');
  if (copyEmailAction) {
    copyEmailAction.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText('kirtangayathri1214@gmail.com');
        showToast('Email copied to clipboard!');
        if (copyEmailLabel) copyEmailLabel.textContent = 'Copied!';
        setTimeout(() => {
          if (copyEmailLabel) copyEmailLabel.textContent = 'Copy Email';
        }, 1800);
      } catch (err) {
        window.location.href = 'mailto:kirtangayathri1214@gmail.com';
      }
    });
  }

  // =========================================================================
  // 5. PINNED NAVBAR & SCROLL-DRIVEN PARALLAX DRIFT (--py-img)
  // =========================================================================
  const pinnedNav = document.getElementById('pinnedNav');
  const heroPlate = document.getElementById('heroArtBox');

  let ticking = false;

  function updateScrollEffects() {
    const scrollY = window.scrollY;

    if (pinnedNav) {
      if (scrollY > 300) {
        pinnedNav.classList.add('visible');
      } else {
        pinnedNav.classList.remove('visible');
      }
    }

    if (heroPlate) {
      const rect = heroPlate.getBoundingClientRect();
      const viewCenter = window.innerHeight / 2;
      const plateCenter = rect.top + rect.height / 2;
      const drift = (viewCenter - plateCenter) * 0.12;
      document.documentElement.style.setProperty('--py-img', `${drift.toFixed(2)}px`);
    }

    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateScrollEffects);
      ticking = true;
    }
  }, { passive: true });

  

  
  // =========================================================================
  // MOBILE NAVIGATION DRAWER CONTROLLER
  // =========================================================================
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const mobileDrawer = document.getElementById('mobileNavDrawer');
  const mobileOverlay = document.getElementById('mobileNavOverlay');
  const mobileClose = document.getElementById('mobileDrawerClose');
  const mobileLinks = document.querySelectorAll('[data-mobile-nav]');

  function openDrawer() {
    if (mobileDrawer && mobileOverlay) {
      mobileDrawer.classList.add('active');
      mobileOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeDrawer() {
    if (mobileDrawer && mobileOverlay) {
      mobileDrawer.classList.remove('active');
      mobileOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (mobileToggle) mobileToggle.addEventListener('click', openDrawer);
  if (mobileClose) mobileClose.addEventListener('click', closeDrawer);
  if (mobileOverlay) mobileOverlay.addEventListener('click', closeDrawer);

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

  console.log('KIRTAN DEVS // SYSTEM ONLINE');
});
