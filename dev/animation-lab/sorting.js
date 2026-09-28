/* Scraps to ledger: loose scraps drift in from the left, pass behind the headline,
   and come out on the right as entries in a tidy ledger. A tick marks each completed
   row (human review). When the ledger is full it scrolls up a row at a time. */
import { colors, canvasLayer, animate, heroSides } from './kit.js';

export default {
  mount() {
    const hero = document.querySelector('.hero');
    const heading = hero.querySelector('h1');
    const layer = canvasLayer(hero);
    const { ctx } = layer;
    const cols = 3, spawnEvery = 0.28, gap = 20;
    // Start as if it had already been running, so the first frame is mid-flow.
    const warmUp = 10;
    let sides, table, field = 0, scraps = [], fills = [], spawned = 0, lastTime = 0, seed = 7;
    const random = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    const ease = v => { v = Math.max(0, Math.min(1, v)); return v * v * (3 - 2 * v); };
    // Fixed widths per cell so a row never changes once written.
    const widths = Array.from({ length: 64 }, () => [0.55 + random() * 0.4, 0.4 + random() * 0.25, 0.45 + random() * 0.3]);

    function measure() {
      sides = heroSides(layer, heading);
      const { top, bottom, right, narrow } = sides;
      // The ledger starts as far from the text as the scraps stop on the other side.
      const x = right + gap, tick = narrow ? 10 : 18;
      const width = Math.min(layer.width - x - (narrow ? 8 : 32) - tick, narrow ? 150 : 280);
      const rowH = narrow ? 12 : 26, head = narrow ? 0 : 30;
      const rows = Math.max(2, Math.floor((bottom - top - head) / rowH));
      table = { x, width, tick, rowH, head, rows, top: top + head,
        col: [0, width * 0.46, width * 0.73], colW: [width * 0.4, width * 0.22, width * 0.27] };
      // Scraps use a field as wide as the ledger, so both sides carry the same weight.
      field = Math.max(0, sides.left - gap - width - tick - (narrow ? 8 : 40));
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
      // Scraps finish fading just before the text column, mirroring the ledger's gap.
      const alpha = Math.min(1, (x - field + 50) / 80) * ease((sides.left - gap - x) / 60);
      if (alpha <= 0) return;
      ctx.save();
      ctx.translate(x, s.y + Math.sin(age * 0.8 + s.wobble) * 5);
      ctx.rotate(s.angle + s.spin * age);
      ctx.globalAlpha = alpha * 0.55;
      ctx.strokeStyle = colors.muted;
      ctx.lineWidth = 1;
      if (s.doc) {
        ctx.strokeRect(-6, -8, 12, 16);
        ctx.beginPath(); ctx.moveTo(-3, -3); ctx.lineTo(3, -3); ctx.moveTo(-3, 1); ctx.lineTo(2, 1); ctx.stroke();
      } else {
        ctx.lineWidth = 2.5; ctx.lineCap = 'round';
        ctx.beginPath(); ctx.moveTo(-s.len / 2, 0); ctx.lineTo(s.len / 2, 0); ctx.stroke();
      }
      ctx.restore();
    }

    function line(x1, x2, y) { ctx.beginPath(); ctx.moveTo(x1, y); ctx.lineTo(x2, y); ctx.stroke(); }

    function drawLedger(time) {
      const t = table, end = t.x + t.width;
      ctx.lineCap = 'round';
      if (t.head) {
        // Header: short navy labels over a firm rule.
        ctx.globalAlpha = 0.55; ctx.strokeStyle = colors.ink; ctx.lineWidth = 2.5;
        t.col.forEach((c, i) => {
          const w = i ? t.colW[i] * 0.6 : t.colW[i] * 0.45;
          i ? line(t.x + c + t.colW[i] - w, t.x + c + t.colW[i], t.top - 16) : line(t.x, t.x + w, t.top - 16);
        });
        ctx.globalAlpha = 0.9; ctx.strokeStyle = colors.line; ctx.lineWidth = 1;
        line(t.x, end + t.tick, t.top - 4);
      }
      const written = fills.filter(f => f <= time).length;
      if (!written) return;
      const current = Math.floor((written - 1) / cols);
      const first = Math.max(0, current - t.rows + 1);
      // A new row past the bottom slides everything up one row.
      const scrolling = current >= t.rows;
      const slide = scrolling ? ease((time - fills[current * cols]) / 0.45) : 1;
      for (let r = scrolling ? first - 1 : first; r <= current; r++) {
        const y = t.top + (r - first + 1 - slide) * t.rowH + t.rowH / 2;
        const fade = r < first ? 1 - slide : 1;
        if (fade <= 0) continue;
        if (t.head) {
          ctx.globalAlpha = 0.9 * fade; ctx.strokeStyle = colors.line; ctx.lineWidth = 1;
          line(t.x, end + t.tick, y + t.rowH / 2);
        }
        ctx.strokeStyle = colors.accent; ctx.lineWidth = t.head ? 2.5 : 2;
        for (let c = 0; c < cols; c++) {
          const born = fills[r * cols + c];
          if (born === undefined || born > time) continue;
          const grow = ease((time - born) / 0.4);
          const w = t.colW[c] * widths[(r * cols + c) % widths.length][c];
          const x0 = t.x + t.col[c];
          ctx.globalAlpha = 0.6 * fade;
          // Labels align left; amounts align right, like a ledger.
          c ? line(x0 + t.colW[c] - w * grow, x0 + t.colW[c], y) : line(x0, x0 + w * grow, y);
        }
        const last = fills[r * cols + cols - 1];
        if (last !== undefined && time - last > 0.5) {
          const x = end + t.tick - 9, k = ease((time - last - 0.5) / 0.3);
          ctx.globalAlpha = 0.8 * k * fade; ctx.strokeStyle = colors.ink; ctx.lineWidth = 1.5;
          ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 3, y + 3); ctx.lineTo(x + 8, y - 4); ctx.stroke();
        }
      }
    }

    function draw(elapsed, still) {
      if (!sides) measure();
      lastTime = elapsed;
      let time = elapsed + warmUp;
      if (still) {
        // A fixed frame: scattered scraps on the left, the ledger two-thirds full.
        scraps = []; fills = [];
        for (let i = 0; i < 18; i++) spawn(-i * 0.7);
        for (let i = 0; i < Math.floor(table.rows * cols * 0.66); i++) fills.push(-10);
        time = 0;
      } else {
        while (spawned * spawnEvery < time) { spawn(spawned * spawnEvery); spawned++; }
        // Each scrap that disappears behind the text becomes the next entry, a beat later.
        // Entries take the time the scrap crossed, so the warm-up builds a real history.
        const crossing = s => (sides.left - gap - field + 50) / s.speed + 0.4;
        scraps = scraps.filter(s => {
          if (!s.done && time - s.born > crossing(s)) { s.done = true; fills.push(s.born + crossing(s)); }
          return time - s.born < crossing(s) + 0.1;
        });
        fills.sort((a, b) => a - b);
        // Forget rows long scrolled away, 64 rows at a time so each row keeps its widths.
        if (fills.length - (table.rows + 2) * cols >= 192) fills.splice(0, 192);
      }
      ctx.clearRect(0, 0, layer.width, layer.height);
      for (const s of scraps) drawScrap(s, time);
      drawLedger(time);
      ctx.globalAlpha = 1;
    }

    layer.onResize = () => { measure(); draw(lastTime, false); };
    const stop = animate(hero, draw, { fps: 30 });
    return () => { stop(); layer.remove(); };
  }
};
