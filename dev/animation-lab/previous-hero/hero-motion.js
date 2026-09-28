/* Fine paths and small points, each travelling and arriving on its own rhythm. */
(() => {
  'use strict';
  const canvas = document.querySelector('#hero-canvas');
  const hero = document.querySelector('.hero');
  const control = hero?.querySelector('.motion-toggle');
  if (!canvas || !hero) return; // The pause control is optional; without it the motion still honours reduced motion.
  let context;
  try { context = canvas.getContext('2d'); } catch (_) { return; }
  if (!context) return; // Keep the static artwork if canvas is unavailable.

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const colors = getComputedStyle(hero);
  const blue = colors.getPropertyValue('--accent').trim() || '#3e66c6';
  const navy = colors.getPropertyValue('--ink').trim() || '#0a1931';
  let width = 0, height = 0, frame = 0, lastTime = 0, elapsed = 0;
  let inView = true, userPaused = reducedMotion.matches;
  let initialStill = reducedMotion.matches;
  const lineCount = 28;
  // Distinct durations and offsets prevent the points from moving as a group.
  const routes = [
    { start: 0.10, end: 0.66, line: 3, period: 14.8, offset: 0.9, travel: 8.1 },
    { start: 0.14, end: 0.78, line: 13.5, period: 17.3, offset: 5.0, travel: 10.6 },
    { start: 0.18, end: 0.90, line: 24, period: 20.2, offset: 10.1, travel: 13.5 },
    { start: 0.06, end: 0.52, line: 8, period: 12.6, offset: 7.4, travel: 6.8 },
    { start: 0.30, end: 0.94, line: 19, period: 16.1, offset: 2.6, travel: 9.4 }
  ];
  const clamp = value => Math.max(0, Math.min(1, value));
  function ease(start, end, time) {
    const value = clamp((time - start) / (end - start));
    return value * value * (3 - 2 * value);
  }

  // Each line follows the same gentle sweep, with a little depth between paths.
  function point(u, line, time) {
    const depth = line / (lineCount - 1);
    const wave = Math.sin(u * Math.PI * 2 - 0.65 + time * 0.13);
    const bend = Math.sin(u * Math.PI * 3 + depth * 1.2 + time * 0.09);
    return {
      x: u * width,
      y: height * (0.55 + wave * 0.13 + bend * 0.055 + (depth - 0.5) * (0.22 + 0.38 * Math.pow(Math.sin(u * Math.PI + 0.4), 2)))
    };
  }

  function draw() {
    context.clearRect(0, 0, width, height);
    const flowTime = initialStill ? 1.4 : 1.4 + elapsed * 0.5;
    const fade = context.createLinearGradient(0, 0, width, 0);
    fade.addColorStop(0, 'transparent');
    fade.addColorStop(0.14, blue);
    fade.addColorStop(0.60, blue);
    fade.addColorStop(0.90, navy);
    fade.addColorStop(1, 'transparent');
    context.lineWidth = 0.7;
    context.lineCap = 'round';
    context.strokeStyle = fade;
    const steps = width < 600 ? 64 : 112;
    for (let line = 0; line < lineCount; line++) {
      const depth = line / (lineCount - 1);
      context.globalAlpha = 0.12 + Math.sin(depth * Math.PI) * 0.16;
      context.beginPath();
      for (let step = 0; step <= steps; step++) {
        const p = point(step / steps, line, flowTime);
        if (step === 0) context.moveTo(p.x, p.y);
        else context.lineTo(p.x, p.y);
      }
      context.stroke();
    }
    function trace(route, start, end) {
      context.beginPath();
      for (let step = 0; step <= steps; step++) {
        const u = start + (end - start) * step / steps;
        const p = point(u, route.line, flowTime);
        if (step === 0) context.moveTo(p.x, p.y);
        else context.lineTo(p.x, p.y);
      }
      context.stroke();
    }
    context.strokeStyle = blue;
    context.fillStyle = blue;
    for (const route of routes) {
      const arrival = 1.2 + route.travel;
      const phase = initialStill ? arrival + 1.8 : (elapsed + route.offset) % route.period;
      const focus = ease(0, 1.2, phase) * (1 - ease(route.period - 2.2, route.period - 0.15, phase));
      if (focus <= 0) continue;
      const progress = ease(1.2, arrival, phase);
      const unlocked = ease(arrival, arrival + 1, phase);
      const destination = point(route.end, route.line, flowTime);
      const passThrough = Math.min(9, width * 0.02) / width;
      const current = route.start + (route.end - route.start) * progress + passThrough * unlocked;

      const moving = point(current, route.line, flowTime);

      // A fine guide, and a trail that fades out behind the point.
      context.lineWidth = 0.6;
      context.globalAlpha = focus * 0.22;
      trace(route, route.start, route.end);
      if (progress > 0) {
        const trailStart = Math.max(route.start, current - Math.min(160, width * 0.2) / width);
        const tail = point(trailStart, route.line, flowTime);
        const trail = context.createLinearGradient(tail.x, tail.y, moving.x, moving.y);
        trail.addColorStop(0, 'transparent');
        trail.addColorStop(1, blue);
        context.strokeStyle = trail;
        context.lineWidth = 1.4;
        context.globalAlpha = focus * 0.7;
        trace(route, trailStart, current);
        context.strokeStyle = blue;
      }

      // The ring opens to let the point through, and a soft pulse marks the arrival.
      const gap = unlocked * 0.7;
      context.lineWidth = 0.9;
      context.globalAlpha = focus * (0.65 - unlocked * 0.15);
      context.beginPath();
      context.arc(destination.x, destination.y, 5, gap, Math.PI * 2 - gap);
      context.stroke();
      if (unlocked > 0 && unlocked < 1) {
        context.lineWidth = 0.8;
        context.globalAlpha = focus * 0.4 * (1 - unlocked);
        context.beginPath();
        context.arc(destination.x, destination.y, 5 + unlocked * 14, 0, Math.PI * 2);
        context.stroke();
      }

      const shown = focus * ease(0.4, 1.2, phase);
      context.globalAlpha = shown * 0.14;
      context.beginPath();
      context.arc(moving.x, moving.y, 7, 0, Math.PI * 2);
      context.fill();
      context.globalAlpha = shown * 0.95;
      context.beginPath();
      context.arc(moving.x, moving.y, 2.2, 0, Math.PI * 2);
      context.fill();
    }

    context.globalAlpha = 1;
  }

  function canAnimate() {
    return !userPaused && inView && !document.hidden && width > 0;
  }
  function tick(now) {
    frame = 0;
    if (!canAnimate()) { lastTime = 0; return; }
    if (!lastTime) lastTime = now;
    const delta = now - lastTime;
    if (delta >= 1000 / 30) {
      elapsed += Math.min(delta, 100) / 1000;
      lastTime = now;
      draw();
    }
    frame = requestAnimationFrame(tick);
  }
  function sync() {
    const paused = userPaused;
    if (control) {
      control.hidden = false;
      control.classList.toggle('is-paused', paused);
      control.setAttribute('aria-label', paused ? 'Play background animation' : 'Pause background animation');
      control.title = paused ? 'Play animation' : 'Pause animation';
      control.querySelector('.motion-label').textContent = paused ? 'Play motion' : 'Pause motion';
    }
    if (canAnimate()) {
      if (!frame) { lastTime = 0; frame = requestAnimationFrame(tick); }
    } else {
      cancelAnimationFrame(frame);
      frame = 0;
      lastTime = 0;
    }
  }
  function resize() {
    const bounds = canvas.getBoundingClientRect();
    width = bounds.width;
    height = bounds.height;
    if (!width || !height) { sync(); return; }
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    draw();
    hero.classList.add('motion-ready');
    sync();
  }

  control?.addEventListener('click', () => {
    userPaused = !userPaused;
    if (!userPaused) initialStill = false;
    sync();
  });
  reducedMotion.addEventListener('change', () => {
    // Stop when the preference changes; an explicit Play click can opt in.
    if (reducedMotion.matches) userPaused = true;
    draw();
    sync();
  });
  document.addEventListener('visibilitychange', sync);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => {
      inView = entries[0].isIntersecting;
      sync();
    }, { threshold: 0 }).observe(hero);
  }
  if ('ResizeObserver' in window) new ResizeObserver(resize).observe(canvas);
  else window.addEventListener('resize', resize, { passive: true });
  window.addEventListener('pagehide', () => { inView = false; sync(); });
  window.addEventListener('pageshow', () => { inView = true; sync(); });
  resize();
})();
