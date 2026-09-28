/* Firms are listed once (clients.items in content/home/home.md). The loop adapts to any number of logos.
   No pause button: the logos stop on hover, keyboard focus and touch, and stay still for reduced motion. */
(() => {
  'use strict';
  const carousel = document.querySelector('.client-carousel');
  if (!carousel) return;
  const viewport = carousel.querySelector('.client-viewport');
  const track = carousel.querySelector('.client-track');
  const originals = track.querySelector('.client-logos');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let userPaused = reducedMotion.matches;
  let hovered = false, focused = false, touched = false, inView = true;
  let period = 0, offset = 0, frame = 0, lastTime = 0, resumeTimer = 0;
  const pixelsPerSecond = 22;

  function canAnimate() {
    return period > 0 && !userPaused && !hovered && !focused && !touched && inView && !document.hidden;
  }
  function tick(now) {
    frame = 0;
    if (!canAnimate()) { lastTime = 0; return; }
    if (lastTime) offset = (offset + Math.min(now - lastTime, 64) * pixelsPerSecond / 1000) % period;
    lastTime = now;
    viewport.scrollLeft = offset;
    frame = requestAnimationFrame(tick);
  }
  function sync() {
    if (canAnimate()) {
      if (!frame) {
        offset = Math.max(0, viewport.scrollLeft) % period;
        lastTime = 0;
        frame = requestAnimationFrame(tick);
      }
    } else {
      cancelAnimationFrame(frame);
      frame = 0;
      lastTime = 0;
    }
  }
  function rebuild() {
    track.querySelectorAll('[data-carousel-copy]').forEach(copy => copy.remove());
    period = originals.getBoundingClientRect().width;
    if (!period || !originals.children.length) { period = 0; sync(); return; }
    // Enough copies to fill even a wide screen with a short client list.
    const copies = Math.ceil(viewport.clientWidth / period) + 1;
    for (let i = 0; i < copies; i++) {
      const copy = originals.cloneNode(true);
      copy.setAttribute('data-carousel-copy', '');
      copy.setAttribute('aria-hidden', 'true');
      copy.removeAttribute('id');
      copy.querySelectorAll('[id]').forEach(node => node.removeAttribute('id'));
      copy.querySelectorAll('a, button, [tabindex]').forEach(node => node.setAttribute('tabindex', '-1'));
      copy.querySelectorAll('img').forEach(img => { img.loading = 'eager'; });
      track.append(copy);
    }
    offset = Math.max(0, viewport.scrollLeft) % period;
    viewport.scrollLeft = offset;
    sync();
  }
  // After a swipe, give the visitor a few seconds before the loop carries on.
  function releaseTouch() {
    clearTimeout(resumeTimer);
    resumeTimer = setTimeout(() => { touched = false; sync(); }, 4000);
  }

  viewport.addEventListener('pointerenter', event => { if (event.pointerType === 'mouse') { hovered = true; sync(); } });
  viewport.addEventListener('pointerleave', () => { hovered = false; sync(); });
  viewport.addEventListener('pointerdown', event => {
    if (event.pointerType !== 'mouse') { clearTimeout(resumeTimer); touched = true; sync(); }
  }, { passive: true });
  viewport.addEventListener('pointerup', event => { if (event.pointerType !== 'mouse') releaseTouch(); }, { passive: true });
  viewport.addEventListener('pointercancel', releaseTouch, { passive: true });
  viewport.addEventListener('wheel', event => {
    if (event.deltaX || event.shiftKey) { touched = true; sync(); releaseTouch(); }
  }, { passive: true });
  viewport.addEventListener('focusin', () => { focused = true; sync(); });
  viewport.addEventListener('focusout', event => { if (!viewport.contains(event.relatedTarget)) { focused = false; sync(); } });
  reducedMotion.addEventListener('change', () => { userPaused = reducedMotion.matches; sync(); });
  document.addEventListener('visibilitychange', sync);
  window.addEventListener('pagehide', () => { inView = false; sync(); });
  window.addEventListener('pageshow', () => { inView = true; sync(); });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => { inView = entries[0].isIntersecting; sync(); }, { threshold: 0 }).observe(carousel);
  }
  if ('ResizeObserver' in window) {
    const observer = new ResizeObserver(rebuild);
    observer.observe(viewport);
    observer.observe(originals);
  } else window.addEventListener('resize', rebuild, { passive: true });
  rebuild();
})();
