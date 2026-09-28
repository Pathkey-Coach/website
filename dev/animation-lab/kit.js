/* Shared helpers for the animation lab. Each option imports these so they all
   pause off-screen, stop when the tab is hidden and honour reduced motion. */

const css = getComputedStyle(document.documentElement);
const token = (name, fallback) => css.getPropertyValue(name).trim() || fallback;

export const colors = {
  ink: token('--ink', '#0a1931'),
  accent: token('--accent', '#3e66c6'),
  light: token('--blue-light', '#6f93dc'),
  tint: token('--tint', '#f0f4fd'),
  line: token('--line', '#e1e7f3'),
  muted: token('--muted', '#55617c')
};

// The lab can force the still frame so reduced-motion versions can be judged too.
export const reducedMotion = () =>
  document.documentElement.classList.contains('lab-still') ||
  matchMedia('(prefers-reduced-motion: reduce)').matches;

// Adds an absolutely positioned canvas behind the host's content and keeps it sized.
export function canvasLayer(host, { className = '', style = '' } = {}) {
  if (getComputedStyle(host).position === 'static') host.style.position = 'relative';
  const canvas = document.createElement('canvas');
  canvas.className = 'lab-layer ' + className;
  canvas.setAttribute('aria-hidden', 'true');
  canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:0;' + style;
  host.prepend(canvas);
  const layer = { canvas, ctx: canvas.getContext('2d'), width: 0, height: 0, onResize: null };
  const resize = () => {
    const box = canvas.getBoundingClientRect();
    const ratio = Math.min(devicePixelRatio || 1, 2);
    layer.width = box.width;
    layer.height = box.height;
    canvas.width = Math.round(box.width * ratio);
    canvas.height = Math.round(box.height * ratio);
    layer.ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    layer.onResize?.();
  };
  const observer = new ResizeObserver(resize);
  observer.observe(canvas);
  resize();
  layer.remove = () => { observer.disconnect(); canvas.remove(); };
  return layer;
}

// Runs draw(seconds) while target is visible, capped at `fps`. With reduced motion,
// draws a single still frame at `stillTime`. Returns a stop function.
export function animate(target, draw, { fps = 30, stillTime = 6 } = {}) {
  let frame = 0, last = 0, elapsed = 0, inView = true, stopped = false;
  if (reducedMotion()) { draw(stillTime, true); return () => {}; }
  const canRun = () => !stopped && inView && !document.hidden;
  const tick = now => {
    frame = 0;
    if (!canRun()) { last = 0; return; }
    if (!last) last = now;
    const delta = now - last;
    if (delta >= 1000 / fps - 1) {
      elapsed += Math.min(delta, 100) / 1000;
      last = now;
      draw(elapsed, false);
    }
    frame = requestAnimationFrame(tick);
  };
  const sync = () => {
    if (canRun() && !frame) frame = requestAnimationFrame(tick);
    if (!canRun() && frame) { cancelAnimationFrame(frame); frame = 0; last = 0; }
  };
  const io = new IntersectionObserver(entries => { inView = entries[0].isIntersecting; sync(); });
  io.observe(target);
  document.addEventListener('visibilitychange', sync);
  // For checking frames in a background tab: labAdvance(5) steps five seconds.
  const advance = seconds => { for (let i = 0; i < seconds * fps; i++) { elapsed += 1 / fps; draw(elapsed, false); } };
  window.labAdvance = advance;
  draw(0, false);
  sync();
  return () => {
    if (window.labAdvance === advance) delete window.labAdvance;
    stopped = true;
    cancelAnimationFrame(frame);
    io.disconnect();
    document.removeEventListener('visibilitychange', sync);
  };
}

// The hero's usable side margins: `left`/`right` are the edges of the text column,
// `mid` is the headline's vertical centre. On narrow screens it falls back to a strip
// under the buttons (`narrow: true`).
export function heroSides(layer, heading) {
  const { width, height } = layer;
  const host = layer.canvas.getBoundingClientRect();
  const text = heading.getBoundingClientRect();
  const half = Math.min(width / 2 - 60, Math.max(text.width / 2 + 24, 300));
  if (width / 2 - half >= 150) {
    return { narrow: false, top: 90, bottom: height - 70, left: width / 2 - half, right: width / 2 + half,
      mid: text.top - host.top + text.height / 2 };
  }
  return { narrow: true, top: height - 62, bottom: height - 12, left: width / 2 - 16, right: width / 2 + 16, mid: height - 37 };
}

// Adds a scoped <style> block and returns a remover.
export function addStyle(text) {
  const style = document.createElement('style');
  style.textContent = text;
  document.head.append(style);
  return () => style.remove();
}
