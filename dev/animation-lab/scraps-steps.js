/* Scraps to a workflow: three small steps on the right (input, AI, review) joined by a
   fine line. Some of the scraps come through as single points that travel the line;
   the review step lights up with a tick as each one arrives. */
import { colors } from './kit.js';
import { scrapsTo, smooth } from './scraps.js';

export default scrapsTo((ctx, sides, gap) => {
  const narrow = sides.narrow;
  const x0 = sides.right + gap + (narrow ? 6 : 10);
  const width = Math.min(sides.width - x0 - (narrow ? 14 : 44), 240);
  const nodes = [x0, x0 + width / 2, x0 + width];
  const r = narrow ? 6 : 10, speed = 70, y = sides.mid;
  let points = [], lastArrival = -Infinity, lastAccepted = -Infinity;
  ctx.font = '500 11px "DM Sans", sans-serif';

  function spark(x, cy, size) {
    // A small four-pointed star marks the AI step.
    ctx.beginPath();
    for (let i = 0; i < 8; i++) {
      const a = i * Math.PI / 4, d = i % 2 ? size * 0.28 : size;
      ctx.lineTo(x + Math.sin(a) * d, cy - Math.cos(a) * d);
    }
    ctx.closePath(); ctx.fill();
  }

  return {
    width: width + 20,
    draw(time, arrivals, still) {
      // One point every 1.2s at most, so the line never gets busy.
      for (const a of arrivals) {
        if (a <= lastArrival) continue;
        lastArrival = a;
        if (a - lastAccepted >= 1.2) { points.push(a); lastAccepted = a; }
      }
      const t = still ? 0 : time;
      if (still) points = [-1.4, -2.6];
      const travel = (nodes[2] - nodes[0] + 30) / speed;
      points = points.filter(p => t - p < travel + 1);

      ctx.globalAlpha = 1; ctx.strokeStyle = colors.line; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(nodes[0] - 30, y); ctx.lineTo(nodes[2], y); ctx.stroke();

      // The latest arrival at the review step, for its tick.
      let lit = 0;
      ctx.fillStyle = colors.accent;
      for (const p of points) {
        const x = nodes[0] - 30 + (t - p) * speed;
        if (x >= nodes[2]) { lit = Math.max(lit, 1 - (x - nodes[2]) / speed / 0.9); continue; }
        ctx.globalAlpha = 0.85 * smooth((x - nodes[0] + 30) / 20);
        ctx.beginPath(); ctx.arc(x, y, narrow ? 2 : 2.5, 0, Math.PI * 2); ctx.fill();
      }

      ctx.lineWidth = 1.2;
      nodes.forEach((x, i) => {
        const on = i === 2 ? smooth(lit) : 0;
        ctx.globalAlpha = 1;
        ctx.fillStyle = '#fff';
        ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = colors.accent;
        ctx.globalAlpha = on;
        ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
        ctx.globalAlpha = 0.7; ctx.strokeStyle = colors.accent;
        ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.stroke();
        ctx.globalAlpha = 0.8;
        if (i === 0) { ctx.beginPath(); ctx.arc(x, y, r * 0.3, 0, Math.PI * 2); ctx.fill(); }
        if (i === 1) spark(x, y, r * 0.6);
        if (i === 2) {
          ctx.strokeStyle = on > 0.5 ? '#fff' : colors.accent;
          ctx.beginPath(); ctx.moveTo(x - r * 0.4, y); ctx.lineTo(x - r * 0.1, y + r * 0.3); ctx.lineTo(x + r * 0.45, y - r * 0.35); ctx.stroke();
        }
        if (!narrow) {
          ctx.globalAlpha = 0.85; ctx.fillStyle = colors.muted; ctx.textAlign = 'center';
          ctx.fillText(['Input', 'AI', 'Review'][i], x, y + r + 18);
        }
      });
    }
  };
});
