(() => {
  'use strict';
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const menu = document.querySelector('.menu-button');
  const nav = document.querySelector('#navigation');
  function closeMenu(restoreFocus = false) {
    menu.setAttribute('aria-expanded', 'false');
    nav.classList.remove('is-open');
    if (restoreFocus) menu.focus();
  }
  menu.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => closeMenu()));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') closeMenu(true);
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('header') && menu.getAttribute('aria-expanded') === 'true') closeMenu();
  });

  // Work tabs exist only on the homepage.
  if (document.querySelector('.work-explorer')) {
    const explorer = document.querySelector('.work-explorer');
    const tablist = document.querySelector('.work-tabs');
    const tabs = Array.from(document.querySelectorAll('.work-tab'));
    const panels = Array.from(document.querySelectorAll('.work-panel'));
    let activeTab = 0;
    function selectTab(index, moveFocus = false, animate = true) {
      activeTab = index;
      tabs.forEach((tab, i) => {
        const active = i === index;
        tab.setAttribute('aria-selected', String(active));
        tab.tabIndex = active ? 0 : -1;
        panels[i].hidden = !active;
        panels[i].classList.remove('is-entering');
      });
      if (animate && !reducedMotion.matches) panels[index].classList.add('is-entering');
      if (moveFocus) tabs[index].focus({ preventScroll: true });
    }
    const narrow = window.matchMedia('(max-width: 580px)');
    function updateOrientation() {
      tablist.setAttribute('aria-orientation', narrow.matches ? 'horizontal' : 'vertical');
    }
    tablist.setAttribute('role', 'tablist');
    tabs.forEach((tab, i) => {
      tab.setAttribute('role', 'tab');
      tab.setAttribute('aria-controls', panels[i].id);
      panels[i].setAttribute('role', 'tabpanel');
      panels[i].setAttribute('aria-labelledby', tab.id);
      panels[i].tabIndex = 0;
      tab.addEventListener('click', () => selectTab(i));
      tab.addEventListener('keydown', event => {
        let next;
        if (event.key === 'Home') next = 0;
        else if (event.key === 'End') next = tabs.length - 1;
        else if ((narrow.matches && event.key === 'ArrowRight') || (!narrow.matches && event.key === 'ArrowDown')) next = (activeTab + 1) % tabs.length;
        else if ((narrow.matches && event.key === 'ArrowLeft') || (!narrow.matches && event.key === 'ArrowUp')) next = (activeTab + tabs.length - 1) % tabs.length;
        else return;
        event.preventDefault();
        selectTab(next, true);
      });
    });
    selectTab(0, false, false);
    updateOrientation();
    tablist.hidden = false;
    explorer.classList.add('enhanced');
    narrow.addEventListener('change', updateOrientation);
  }

  let observer;
  function revealAll() {
    document.querySelectorAll('.is-pending').forEach(el => {
      el.classList.remove('is-pending');
      el.classList.add('is-visible');
    });
    observer?.disconnect();
  }
  if ('IntersectionObserver' in window && !reducedMotion.matches) {
    observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('is-pending');
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.07, rootMargin: '0px 0px 10px 0px' });
    document.querySelectorAll('.reveal').forEach(el => {
      // Content already in view stays visible, including direct section links.
      if (el.getBoundingClientRect().top > window.innerHeight) el.classList.add('is-pending');
      observer.observe(el);
    });
  }
  reducedMotion.addEventListener('change', () => { if (reducedMotion.matches) revealAll(); });
  window.addEventListener('beforeprint', revealAll);

  const progress = document.querySelector('.reading-progress');
  const navLinks = Array.from(document.querySelectorAll('[data-section]'));
  const trackedSections = navLinks.map(link => document.getElementById(link.dataset.section));
  let scrollQueued = false;
  function updateScroll() {
    scrollQueued = false;
    const top = window.scrollY;
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = scrollable > 0 ? Math.min(1, Math.max(0, top / scrollable)) : 0;
    progress.style.transform = `scaleX(${ratio})`;
    document.body.classList.toggle('has-scrolled', top > 12);
    let current = -1;
    trackedSections.forEach((section, index) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 150 && rect.bottom > 150) current = index;
    });
    navLinks.forEach((link, index) => {
      if (index === current) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }
  function queueScroll() {
    if (!scrollQueued) { scrollQueued = true; window.requestAnimationFrame(updateScroll); }
  }
  window.addEventListener('scroll', queueScroll, { passive: true });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 580) closeMenu();
    queueScroll();
  });
  window.addEventListener('load', queueScroll);
  updateScroll();
})();
