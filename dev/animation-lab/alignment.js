/* The alignment window: two incomplete frames briefly agree around the headline,
   then drift apart. Clear space around every text block protects the copy. */
import { colors, canvasLayer, animate, addStyle, reducedMotion } from './kit.js';

export default {
  mount() {
    const hero = document.querySelector('.hero');
    const heading = hero?.querySelector('h1');
    if (!heading) return () => {};
    const removeStyle = addStyle(`
      .hero { position:relative; }
      .hero-content { position:relative; z-index:1; }
    `);
    const layer = canvasLayer(hero);
    const { ctx } = layer;
    const copy = [...hero.querySelector('.hero-content').children];
    let lastTime = 0, lastStill = reducedMotion();
    const ease = n => n * n * (3 - 2 * n);

    function draw(time, still) {
      lastTime = time; lastStill = still;
      const { width, height } = layer;
      ctx.clearRect(0, 0, width, height);
      if (width < 700) return;
      const host = hero.getBoundingClientRect();
      const text = heading.getBoundingClientRect();
      const left = Math.max(22, text.left - host.left - 32);
      const right = Math.min(width - 22, text.right - host.left + 32);
      const top = text.top - host.top - 20;
      const bottom = text.bottom - host.top + 12;
      const middle = (left + right) / 2;
      const phase = time % 12;
      const drift = still ? 0 : phase < 5 ? 1 - ease(phase / 5)
        : phase < 7 ? 0 : ease((phase - 7) / 5);
      ctx.strokeStyle = colors.light;
      ctx.globalAlpha = 0.32;
      ctx.lineWidth = 1.5;
      for (const side of [-1, 1]) {
        const edge = side < 0 ? left : right;
        ctx.save();
        ctx.translate(side * 12 * drift, side * 8 * drift);
        ctx.beginPath();
        ctx.moveTo(middle, top);
        ctx.lineTo(edge, top);
        ctx.lineTo(edge, bottom);
        ctx.lineTo(middle, bottom);
        ctx.stroke();
        ctx.restore();
      }
      // Erase even faint strokes beneath copy, links and their focus outlines.
      for (const item of copy) {
        const box = item.getBoundingClientRect();
        ctx.clearRect(box.left - host.left - 10, box.top - host.top - 10,
          box.width + 20, box.height + 20);
      }
      ctx.globalAlpha = 1;
    }

    layer.onResize = () => draw(lastTime, lastStill);
    const stop = animate(hero, draw, { fps: 24 });
    return () => { stop(); layer.remove(); removeStyle(); };
  }
};
