/* Scraps to steady flow: what comes out on the right is identical short dashes moving
   in three straight lanes at an even spacing. Chaos in, a calm steady rhythm out. */
import { colors } from './kit.js';
import { scrapsTo, smooth } from './scraps.js';

export default scrapsTo((ctx, sides, gap) => {
  const lanes = 3, laneGap = sides.narrow ? 9 : 16, speed = 45, spacing = sides.narrow ? 22 : 34;
  const x0 = sides.right + gap;
  const width = Math.min(sides.width - x0 - (sides.narrow ? 8 : 32), 260);
  const every = spacing / speed; // seconds between dashes in one lane
  const next = Array(lanes).fill(-Infinity);
  let dashes = [], lastArrival = -Infinity, lane = 0;

  return {
    width,
    draw(time, arrivals, still) {
      if (still) {
        dashes = [];
        for (let l = 0; l < lanes; l++) for (let k = 0; k < width / spacing; k++) dashes.push({ lane: l, start: -k * every - l * every / 3 });
      }
      // Each arrival takes the next free slot, lanes in turn, so spacing stays even.
      for (const a of arrivals) {
        if (a <= lastArrival) continue;
        lastArrival = a;
        const start = Math.max(a, next[lane] + every);
        next[lane] = start;
        dashes.push({ lane, start });
        lane = (lane + 1) % lanes;
      }
      const t = still ? 0 : time;
      dashes = dashes.filter(d => (t - d.start) * speed < width + 20);
      ctx.strokeStyle = colors.accent;
      ctx.lineCap = 'round';
      ctx.lineWidth = sides.narrow ? 2 : 2.5;
      for (const d of dashes) {
        const x = x0 + (t - d.start) * speed;
        if (x < x0) continue;
        const y = sides.mid + (d.lane - (lanes - 1) / 2) * laneGap;
        ctx.globalAlpha = 0.65 * smooth((x - x0) / 24) * smooth((x0 + width - x) / 50);
        ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + (sides.narrow ? 10 : 16), y); ctx.stroke();
      }
    }
  };
});
