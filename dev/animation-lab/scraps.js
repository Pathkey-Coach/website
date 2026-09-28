/* Shared left half for the "scraps to ..." options: loose scraps drift in from the
   left and disappear just before the headline. Each option supplies what comes out on
   the right: output(ctx, sides, gap) returns { width, draw(time, arrivals, still) }. */
import { colors, canvasLayer, animate, heroSides } from './kit.js';

export function scrapsTo(output) {
  return {
    mount() {
      const hero = document.querySelector('.hero');
      const heading = hero.querySelector('h1');
      const layer = canvasLayer(hero);
      const { ctx } = layer;
      const spawnEvery = 0.28, gap = 20, warmUp = 10;
      let sides, right, field = 0, scraps = [], arrivals = [], spawned = 0, lastTime = 0, seed = 7;
      const random = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
      const ease = v => { v = Math.max(0, Math.min(1, v)); return v * v * (3 - 2 * v); };

      function measure() {
        sides = heroSides(layer, heading);
        right = output(ctx, { ...sides, width: layer.width, height: layer.height }, gap);
        // Scraps use a field as wide as the right side's artwork, so both carry the same weight.
        field = Math.max(0, sides.left - gap - right.width - (sides.narrow ? 8 : 40));
      }

      function spawn(time) {
        const { top, bottom } = sides;
        scraps.push({ born: time, y: top + random() * (bottom - top), speed: 60 + random() * 45,
          len: 10 + random() * 40, angle: (random() - 0.5) * 0.9, spin: (random() - 0.5) * 0.25,
          doc: random() < 0.2, wobble: random() * 6 });
      }

      function drawScrap(s, time) {
        const age = time - s.born;
        const x = field - 50 + age * s.speed;
        const alpha = Math.min(1, (x - field + 50) / 80) * ease((sides.left - gap - x) / 60);
        if (alpha <= 0) return;
        // Scraps narrow towards the headline's height as they travel, as if drawn in.
        const inward = ease((x - field) / (sides.left - gap - field));
        const y = sides.mid + (s.y - sides.mid) * (1 - 0.6 * inward);
        ctx.save();
        ctx.translate(x, y + Math.sin(age * 0.8 + s.wobble) * 5 * (1 - inward));
        ctx.rotate(s.angle + s.spin * age);
        ctx.globalAlpha = alpha * 0.42;
        ctx.strokeStyle = colors.muted;
        ctx.lineWidth = 1;
        if (s.doc) {
          ctx.strokeRect(-6, -8, 12, 16);
          ctx.beginPath(); ctx.moveTo(-3, -3); ctx.lineTo(3, -3); ctx.moveTo(-3, 1); ctx.lineTo(2, 1); ctx.stroke();
        } else {
          ctx.lineWidth = 2; ctx.lineCap = 'round';
          ctx.beginPath(); ctx.moveTo(-s.len / 2, 0); ctx.lineTo(s.len / 2, 0); ctx.stroke();
        }
        ctx.restore();
      }

      function draw(elapsed, still) {
        if (!sides) measure();
        lastTime = elapsed;
        // Start as if it had already been running, so the first frame is mid-flow.
        let time = elapsed + warmUp;
        if (still) {
          scraps = [];
          for (let i = 0; i < 18; i++) spawn(-i * 0.7);
          time = 0;
        } else {
          while (spawned * spawnEvery < time) { spawn(spawned * spawnEvery); spawned++; }
          // Each scrap that disappears behind the text arrives on the right, a beat later.
          const crossing = s => (sides.left - gap - field + 50) / s.speed + 0.4;
          scraps = scraps.filter(s => {
            if (!s.done && time - s.born > crossing(s)) { s.done = true; arrivals.push(s.born + crossing(s)); }
            return time - s.born < crossing(s) + 0.1;
          });
          arrivals.sort((a, b) => a - b);
          if (arrivals.length > 400) arrivals.splice(0, arrivals.length - 200);
        }
        ctx.clearRect(0, 0, layer.width, layer.height);
        for (const s of scraps) drawScrap(s, time);
        right.draw(time, arrivals, still);
        ctx.globalAlpha = 1;
      }

      layer.onResize = () => { measure(); draw(lastTime, false); };
      const stop = animate(hero, draw, { fps: 30 });
      return () => { stop(); layer.remove(); };
    }
  };
}

export const smooth = v => { v = Math.max(0, Math.min(1, v)); return v * v * (3 - 2 * v); };
