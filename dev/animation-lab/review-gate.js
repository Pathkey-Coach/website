/* The review gate: three tokens wait at a firm boundary in Work's bottom margin.
   They approach, hold, and retreat; nothing crosses without a human decision. */
import { colors, canvasLayer, animate, addStyle, reducedMotion } from './kit.js';

export default {
  mount() {
    const work = document.querySelector('section.work');
    const content = work?.querySelector('.wrap');
    if (!content) return () => {};
    const removeStyle = addStyle(`
      section.work { position:relative; isolation:isolate; }
      section.work > .wrap { position:relative; z-index:1; }
    `);
    const layer = canvasLayer(work);
    const { ctx } = layer;
    let lastTime = 0, lastStill = reducedMotion();
    const ease = n => n * n * (3 - 2 * n);

    function draw(time, still) {
      lastTime = time; lastStill = still;
      const { width, height } = layer;
      ctx.clearRect(0, 0, width, height);
      if (width < 700) return;
      const host = work.getBoundingClientRect();
      const box = content.getBoundingClientRect();
      const bottom = box.bottom - host.top;
      if (height - bottom < 52) return;
      const y = bottom + (height - bottom) / 2;
      const gate = width / 2 + 92;
      const phase = time % 20;
      const progress = still ? 1 : phase < 4 ? ease(phase / 4)
        : phase < 14 ? 1 : phase < 18 ? 1 - ease((phase - 14) / 4) : 0;
      ctx.strokeStyle = colors.light;
      ctx.fillStyle = colors.light;
      ctx.lineWidth = 1;
      for (let i = 0; i < 3; i++) {
        const track = y + (i - 1) * 11;
        ctx.globalAlpha = 0.16;
        ctx.beginPath();
        ctx.moveTo(gate - 184, track);
        ctx.lineTo(gate, track);
        ctx.stroke();
        const x = gate - 24 - (i === 2 ? 12 : 0) - 40 * (1 - progress);
        ctx.globalAlpha = 0.12;
        ctx.fillRect(x, track - 3.5, 18, 7);
        ctx.globalAlpha = 0.65;
        ctx.strokeRect(x, track - 3.5, 18, 7);
      }
      ctx.globalAlpha = 0.75;
      ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(gate, y - 19); ctx.lineTo(gate, y + 19); ctx.stroke();
      ctx.globalAlpha = 1;
    }

    layer.onResize = () => draw(lastTime, lastStill);
    const stop = animate(work, draw, { fps: 24 });
    return () => { stop(); layer.remove(); removeStyle(); };
  }
};
