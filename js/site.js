(function () {
  const header = document.querySelector('.site-header');
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');
  const navLinks = document.querySelectorAll('.site-nav__link');
  const yearEl = document.getElementById('year');
  const progressBar = document.querySelector('.scroll-progress__bar');
  const sections = Array.from(document.querySelectorAll('main section[id]'));
  const navLinkMap = new Map(
    Array.from(navLinks).map((link) => [link.getAttribute('href')?.replace('#', ''), link])
  );

  function closeNav() {
    if (!nav || !navToggle) return;
    nav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.removeEventListener('keydown', handleEscape);
  }

  function handleEscape(event) {
    if (event.key === 'Escape') {
      closeNav();
    }
  }

  const updateHeaderState = () => {
    if (!header) return;
    const isCondensed = window.scrollY > 12;
    header.classList.toggle('is-condensed', isCondensed);
  };

  const setActiveLink = (id) => {
    navLinks.forEach((link) => {
      const linkId = link.getAttribute('href')?.replace('#', '');
      const isActive = linkId === id;
      if (isActive) {
        link.setAttribute('aria-current', 'page');
        link.classList.add('is-active');
      } else {
        link.removeAttribute('aria-current');
        link.classList.remove('is-active');
      }
    });
  };

  const updateActiveSection = () => {
    if (!sections.length) return;
    const scrollPosition = window.scrollY + 160;
    let currentId = sections[0].id;
    for (const section of sections) {
      if (scrollPosition >= section.offsetTop) {
        currentId = section.id;
      }
    }
    setActiveLink(currentId);
  };

  const updateProgress = () => {
    if (!progressBar) return;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? Math.min(1, window.scrollY / docHeight) : 0;
    progressBar.style.transform = `scaleX(${progress})`;
  };

  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const shouldOpen = navToggle.getAttribute('aria-expanded') !== 'true';
      navToggle.setAttribute('aria-expanded', shouldOpen.toString());
      nav.classList.toggle('is-open', shouldOpen);
      document.removeEventListener('keydown', handleEscape);
      if (shouldOpen) {
        document.addEventListener('keydown', handleEscape);
      }
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      closeNav();
    });
  });

  const handleScroll = () => {
    updateHeaderState();
    updateActiveSection();
    updateProgress();
  };

  window.addEventListener('scroll', handleScroll);
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      closeNav();
    }
    updateProgress();
  });

  window.addEventListener('DOMContentLoaded', () => {
    handleScroll();
    if (yearEl) {
      yearEl.textContent = String(new Date().getFullYear());
    }
  });
})();
