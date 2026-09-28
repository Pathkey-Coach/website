/* Graph paper: a faint dot grid behind the page's white sections (the navy and tinted
   sections cover it). Dots near the pointer lift and turn blue, and a slow sweep crosses
   the grid every so often. It only redraws while something is changing. */
(() => {
  'use strict';
  const canvas = document.createElement('canvas');
  let ctx;
  try { ctx = canvas.getContext('2d'); } catch (_) { return; }
  if (!ctx) return;
  canvas.className = 'graph-paper';
  canvas.setAttribute('aria-hidden', 'true');
  document.body.prepend(canvas);

  const css = getComputedStyle(document.documentElement);
  const ink = css.getPropertyValue('--ink').trim() || '#0a1931';
  const accent = css.getPropertyValue('--accent').trim() || '#3e66c6';
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const hover = matchMedia('(hover: hover) and (pointer: fine)');
  // Dots every 24px; the pointer lights dots within 150px; a sweep every 16s, lasting ~7s.
  const gap = 24, reach = 150, sweepEvery = 16000, sweepSpeed = 0.32;
  let width = 0, height = 0, frame = 0;
  let pointer = null, lens = null, lensAlpha = 0, sweepStart = -Infinity;

  function resize() {
    const ratio = Math.min(devicePixelRatio || 1, 2);
    width = innerWidth; height = innerHeight;
    canvas.width = Math.round(width * ratio); canvas.height = Math.round(height * ratio);
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    wake();
  }

  // Returns true while something is still moving and another frame is needed.
  function draw(now) {
    const still = reducedMotion.matches;
    let busy = false;
    if (!still && hover.matches) {
      if (pointer) lens = lens ? { x: lens.x + (pointer.x - lens.x) * 0.2, y: lens.y + (pointer.y - lens.y) * 0.2 } : { ...pointer };
      const target = pointer ? 1 : 0;
      lensAlpha += (target - lensAlpha) * 0.15;
      if (Math.abs(target - lensAlpha) < 0.01) lensAlpha = target;
      busy = lensAlpha !== target || (pointer && lens && Math.hypot(pointer.x - lens.x, pointer.y - lens.y) > 0.5);
    } else {
      lensAlpha = 0;
    }
    const sweepAge = now - sweepStart;
    const sweep = still ? -1 : sweepAge * sweepSpeed - 200;
    const sweeping = sweep >= -200 && sweep < width + height + 200;
    busy = busy || sweeping;

    ctx.clearRect(0, 0, width, height);
    const offset = scrollY % gap;
    for (let y = gap / 2 - offset; y < height + gap; y += gap) {
      for (let x = gap / 2; x < width; x += gap) {
        let glow = 0;
        if (lensAlpha && lens) {
          const d = Math.hypot(x - lens.x, y - lens.y);
          if (d < reach) glow = (1 - d / reach) ** 2 * lensAlpha;
        }
        if (sweeping) glow = Math.max(glow, Math.max(0, 1 - Math.abs(x + y - sweep) / 90) * 0.5);
        ctx.globalAlpha = 0.13 + glow * 0.6;
        ctx.fillStyle = glow > 0.05 ? accent : ink;
        const size = 1.3 + glow * 1.7;
        ctx.fillRect(x - size / 2, y - size / 2, size, size);
      }
    }
    ctx.globalAlpha = 1;
    return busy;
  }

  function tick(now) {
    frame = 0;
    if (document.hidden) return;
    if (draw(now)) frame = requestAnimationFrame(tick);
  }
  function wake() { if (!frame && !document.hidden) frame = requestAnimationFrame(tick); }

  addEventListener('resize', resize, { passive: true });
  addEventListener('scroll', wake, { passive: true });
  addEventListener('pointermove', event => {
    if (event.pointerType !== 'mouse') return;
    pointer = { x: event.clientX, y: event.clientY };
    wake();
  }, { passive: true });
  document.documentElement.addEventListener('pointerleave', () => { pointer = null; wake(); });
  document.addEventListener('visibilitychange', wake);
  reducedMotion.addEventListener('change', wake);
  setInterval(() => {
    if (document.hidden || reducedMotion.matches) return;
    sweepStart = performance.now();
    wake();
  }, sweepEvery);
  // A first sweep shortly after load, so the grid is noticed.
  setTimeout(() => { if (!reducedMotion.matches) { sweepStart = performance.now(); wake(); } }, 1200);
  resize();
})();
