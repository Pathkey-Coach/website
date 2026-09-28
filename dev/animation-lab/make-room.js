/* Make room: five overlapping task slips gather into an offset stack on Contact's
   open right side. Every outline remains visible, leaving room to breathe. */
import { colors, canvasLayer, animate, addStyle, reducedMotion } from './kit.js';

export default {
  mount() {
    const contact = document.querySelector('section.contact');
    const copy = contact?.querySelector('.contact-layout > div');
    const wrap = contact?.querySelector('.wrap');
    const email = contact?.querySelector('.email');
    if (!copy || !wrap || !email) return () => {};
    const removeStyle = addStyle(`
      section.contact { position:relative; isolation:isolate; }
      section.contact > .wrap { position:relative; z-index:1; }
    `);
    const layer = canvasLayer(contact);
    const { ctx } = layer;
    const loose = [[0, 50], [65, 0], [136, 38], [35, 108], [150, 104]];
    let lastTime = 0, lastStill = reducedMotion();
    const ease = n => n * n * (3 - 2 * n);

    function draw(time, still) {
      lastTime = time; lastStill = still;
      const { width, height } = layer;
      ctx.clearRect(0, 0, width, height);
      if (width < 850) return;
      const host = contact.getBoundingClientRect();
      const text = copy.getBoundingClientRect();
      const box = wrap.getBoundingClientRect();
      const link = email.getBoundingClientRect();
      const left = Math.max(text.right - host.left + 48, width * 0.55);
      const right = box.right - host.left - 12;
      const top = text.top - host.top + 12;
      const room = Math.min(text.bottom, link.top - 16) - host.top - top;
      const scale = Math.min(1.15, (right - left) / 260, room / 180);
      if (scale < 0.8) return;
      const phase = time % 18;
      const progress = still ? 1 : phase < 4 ? ease(phase / 4)
        : phase < 12 ? 1 : phase < 16 ? 1 - ease((phase - 12) / 4) : 0;
      ctx.save();
      ctx.translate(right - 260 * scale, top);
      ctx.scale(scale, scale);
      ctx.strokeStyle = colors.accent;
      ctx.globalAlpha = 0.42;
      ctx.lineWidth = 1.25;
      for (let i = 0; i < 5; i++) {
        const [x, y] = loose[i];
        const stackedX = 112 + i * 10, stackedY = 48 + i * 10;
        // Transparent interiors preserve all five complete outlines in the stack.
        ctx.strokeRect(x + (stackedX - x) * progress,
          y + (stackedY - y) * progress, 104, 64);
      }
      ctx.restore();
    }

    layer.onResize = () => draw(lastTime, lastStill);
    const stop = animate(contact, draw, { fps: 24 });
    return () => { stop(); layer.remove(); removeStyle(); };
  }
};
