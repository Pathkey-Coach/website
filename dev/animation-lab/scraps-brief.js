/* Scraps to a brief: one card on the right writes itself a line at a time. The last
   line, in blue, is the recommendation; a tick follows, then the card lifts away and
   the next one begins. Advice as the output. */
import { colors } from './kit.js';
import { scrapsTo, smooth } from './scraps.js';

export default scrapsTo((ctx, sides, gap) => {
  const narrow = sides.narrow;
  const x0 = sides.right + gap;
  const width = Math.min(sides.width - x0 - (narrow ? 8 : 32), narrow ? 150 : 220);
  const lineGap = narrow ? 7 : 14, pad = narrow ? 8 : 16;
  const lines = [0.45, 0.92, 0.78, 0.86, 0.62]; // title, three notes, recommendation
  const height = pad * 2 + lineGap * (lines.length - 1) + (narrow ? 4 : 10);
  const cycle = 6.5;

  function card(age, alpha, lift) {
    const top = (narrow ? sides.bottom - height : sides.mid - height / 2) - lift;
    ctx.globalAlpha = alpha;
    ctx.fillStyle = '#fff'; ctx.strokeStyle = colors.line; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.roundRect(x0, top, width, height, 6); ctx.fill(); ctx.stroke();
    ctx.lineCap = 'round';
    lines.forEach((w, i) => {
      const k = smooth((age - 0.3 - i * 0.45) / 0.4);
      if (!k) return;
      const y = top + pad + i * lineGap + (i ? (narrow ? 4 : 10) : 0);
      const last = i === lines.length - 1;
      ctx.strokeStyle = i === 0 ? colors.ink : last ? colors.accent : colors.light;
      ctx.lineWidth = i === 0 || last ? (narrow ? 2 : 3) : (narrow ? 1.5 : 2);
      ctx.globalAlpha = alpha * (i === 0 ? 0.6 : last ? 0.9 : 0.45);
      ctx.beginPath(); ctx.moveTo(x0 + pad, y); ctx.lineTo(x0 + pad + (width - pad * 2 - (last ? 22 : 0)) * w * k, y); ctx.stroke();
    });
    const tick = smooth((age - 3) / 0.35);
    if (tick) {
      const x = x0 + width - pad - 8, y = top + pad + (lines.length - 1) * lineGap + (narrow ? 4 : 10);
      ctx.globalAlpha = alpha * tick; ctx.strokeStyle = colors.accent; ctx.lineWidth = 1.6;
      ctx.beginPath(); ctx.moveTo(x - 4, y); ctx.lineTo(x - 1, y + 3); ctx.lineTo(x + 5, y - 4); ctx.stroke();
    }
  }

  return {
    width,
    draw(time, arrivals, still) {
      const age = still ? 4 : time % cycle;
      // Each new card fades in while the finished one lifts and fades above it.
      const handover = still ? 1 : smooth(age / 0.8);
      if (!still && time > cycle && handover < 1) card(5, 1 - handover, handover * 14);
      card(age, handover, 0);
    }
  };
});
