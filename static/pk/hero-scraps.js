/* Hero animation: loose scraps drift in from the left, narrow towards the headline and
   disappear behind it. Each one comes out on the right as an identical short dash, in
   three straight lanes at an even spacing: a messy input, a calm steady rhythm out. */
(() => {
  'use strict';
  const hero = document.querySelector('.hero');
  const canvas = hero?.querySelector('.hero-canvas');
  const heading = hero?.querySelector('h1');
  if (!canvas || !heading) return;
  let ctx;
  try { ctx = canvas.getContext('2d'); } catch (_) { return; }
  if (!ctx) return;

  const css = getComputedStyle(document.documentElement);
  const token = (name, fallback) => css.getPropertyValue(name).trim() || fallback;
  const ink = token('--ink', '#0a1931'), accent = token('--accent', '#3e66c6');
  const light = token('--blue-light', '#6f93dc'), rule = token('--line', '#e1e7f3');
  const muted = token('--muted', '#55617c');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const ease = v => { v = Math.max(0, Math.min(1, v)); return v * v * (3 - 2 * v); };

  // Scraps: one every 0.45s. The first frame starts 10s in, so nothing builds up from empty.
  const spawnEvery = 0.45, gap = 20, warmUp = 10;
  // Flow: three lanes of dashes moving at 45px/s, each dash 60px behind the one before.
  // Three lanes at that spacing take one dash every 0.44s, matching the scrap rate.
  const lanes = 3, speed = 45;
  let width = 0, height = 0, sides, flow, field = 0, band = 0;
  let scraps = [], spawned = 0, seed = 7, dashes = [], laneFree = [], lane = 0;
  let frame = 0, lastNow = 0, elapsed = 0, inView = true;
  const random = () => (seed = (seed * 16807) % 2147483647) / 2147483647;

  function measure() {
    const box = canvas.getBoundingClientRect();
    width = box.width; height = box.height;
    const ratio = Math.min(devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * ratio); canvas.height = Math.round(height * ratio);
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    // Wide screens use the margins beside the headline; narrow ones a strip under the buttons.
    const text = heading.getBoundingClientRect();
    const half = Math.min(width / 2 - 60, Math.max(text.width / 2 + 24, 300));
    const narrow = width / 2 - half < 150;
    sides = narrow
      ? { narrow, top: height - 62, bottom: height - 12, left: width / 2 - 16, right: width / 2 + 16, mid: height - 37 }
      : { narrow, top: 90, bottom: height - 70, left: width / 2 - half, right: width / 2 + half, mid: text.top - box.top + text.height / 2 };
    const x = sides.right + gap, spacing = narrow ? 36 : 60;
    const w = Math.max(0, Math.min(width - x - (narrow ? 8 : 32), 260));
    flow = { x, w, spacing, every: spacing / speed, laneGap: narrow ? 9 : 16, dash: narrow ? 10 : 16 };
    // The scraps use a field as wide as the flow, so both sides carry the same weight.
    field = Math.max(0, sides.left - gap - w);
    // Scraps start in a band around the headline, not the whole hero, and narrow to the
    // height of the three lanes by the time they reach the text.
    band = narrow ? 22 : 56;
  }

  function spawn(time) {
    scraps.push({ born: time, y: sides.mid + (random() * 2 - 1) * band, speed: 60 + random() * 45,
      len: 8 + random() * 22, angle: (random() - 0.5) * 0.6, spin: (random() - 0.5) * 0.2,
      doc: random() < 0.15, wobble: random() * 6 });
  }

  function drawScrap(s, time) {
    const age = time - s.born;
    const x = field + age * s.speed;
    const alpha = ease((x - field) / 60) * ease((sides.left - gap - x) / 60);
    if (alpha <= 0) return;
    // Scraps narrow towards the headline's height as they travel, as if drawn in.
    const inward = ease((x - field) / (sides.left - gap - field));
    const y = sides.mid + (s.y - sides.mid) * (1 - 0.7 * inward);
    ctx.save();
    ctx.translate(x, y + Math.sin(age * 0.8 + s.wobble) * 3 * (1 - inward));
    ctx.rotate(s.angle + s.spin * age);
    ctx.globalAlpha = alpha * 0.3;
    ctx.strokeStyle = muted;
    ctx.lineWidth = 1;
    if (s.doc) {
      ctx.strokeRect(-6, -8, 12, 16);
      ctx.beginPath(); ctx.moveTo(-3, -3); ctx.lineTo(3, -3); ctx.moveTo(-3, 1); ctx.lineTo(2, 1); ctx.stroke();
    } else {
      ctx.lineWidth = 1.5; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(-s.len / 2, 0); ctx.lineTo(s.len / 2, 0); ctx.stroke();
    }
    ctx.restore();
  }

  // A scrap that has passed behind the text takes the next free slot, lanes in turn,
  // so the dashes stay evenly spaced however unevenly the scraps arrive.
  function arrive(time) {
    const start = Math.max(time, (laneFree[lane] ?? -Infinity) + flow.every);
    laneFree[lane] = start;
    dashes.push({ lane, start });
    lane = (lane + 1) % lanes;
  }

  function drawFlow(time) {
    const { x, w, laneGap, dash } = flow;
    if (w < 60) return;
    dashes = dashes.filter(d => (time - d.start) * speed < w + 20);
    ctx.strokeStyle = accent;
    ctx.lineCap = 'round';
    ctx.lineWidth = sides.narrow ? 1.5 : 2;
    for (const d of dashes) {
      const dx = x + (time - d.start) * speed;
      if (dx < x) continue;
      const y = sides.mid + (d.lane - (lanes - 1) / 2) * laneGap;
      ctx.globalAlpha = 0.45 * ease((dx - x) / 24) * ease((x + w - dx) / 50);
      ctx.beginPath(); ctx.moveTo(dx, y); ctx.lineTo(dx + dash, y); ctx.stroke();
    }
  }

  function draw(still) {
    if (!width || !height) return;
    let time = elapsed + warmUp;
    if (still) {
      // A composed still: scraps spread across the left, full evenly spaced lanes on the right.
      scraps = []; spawned = 0; dashes = [];
      for (let i = 0; i < 24; i++) spawn(-i * spawnEvery);
      for (let l = 0; l < lanes; l++) {
        for (let k = 0; k < flow.w / flow.spacing; k++) dashes.push({ lane: l, start: -k * flow.every - l * flow.every / 3 });
      }
      time = 0;
    } else {
      while (spawned * spawnEvery < time) { spawn(spawned * spawnEvery); spawned++; }
      // Each scrap arrives on the right a beat after it disappears behind the text,
      // at the moment it crossed, so the warm-up builds a real history.
      const crossing = s => (sides.left - gap - field) / s.speed + 0.4;
      for (const s of scraps) if (!s.done && time - s.born > crossing(s)) { s.done = true; arrive(s.born + crossing(s)); }
      scraps = scraps.filter(s => !s.done);
    }
    ctx.clearRect(0, 0, width, height);
    for (const s of scraps) drawScrap(s, time);
    drawFlow(time);
    ctx.globalAlpha = 1;
  }

  const canAnimate = () => !reducedMotion.matches && inView && !document.hidden && width > 0;
  function tick(now) {
    frame = 0;
    if (!canAnimate()) { lastNow = 0; return; }
    if (!lastNow) lastNow = now;
    if (now - lastNow >= 1000 / 30 - 1) {
      elapsed += Math.min(now - lastNow, 100) / 1000;
      lastNow = now;
      draw(false);
    }
    frame = requestAnimationFrame(tick);
  }
  function sync() {
    if (canAnimate()) { if (!frame) frame = requestAnimationFrame(tick); return; }
    cancelAnimationFrame(frame); frame = 0; lastNow = 0;
  }
  function resize() {
    measure();
    // Rebuild both sides in the new geometry from the same point in time.
    scraps = []; spawned = 0; dashes = []; laneFree = []; lane = 0;
    draw(reducedMotion.matches);
    sync();
  }

  reducedMotion.addEventListener('change', () => { draw(reducedMotion.matches); sync(); });
  document.addEventListener('visibilitychange', sync);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => { inView = entries[0].isIntersecting; sync(); }).observe(hero);
  }
  if ('ResizeObserver' in window) new ResizeObserver(resize).observe(canvas);
  else addEventListener('resize', resize, { passive: true });
  resize();
})();
