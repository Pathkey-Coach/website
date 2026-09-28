/* Questions to answers: question marks drift in on the left and pass behind the
   headline. On the right, short answers appear one after another, typed out like an
   assistant's reply, each marked with a small blue dot. Older answers move up and fade. */
import { colors, canvasLayer, animate, heroSides } from './kit.js';

export default {
  mount() {
    const hero = document.querySelector('.hero');
    const heading = hero.querySelector('h1');
    const layer = canvasLayer(hero);
    const { ctx } = layer;
    const every = 0.45, answerEvery = 2.2, shown = 4, warmUp = 8;
    let sides, lastTime = 0, seed = 5;
    const random = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    const marks = Array.from({ length: 400 }, () => ({ y: random(), speed: 55 + random() * 40, size: 15 + random() * 14, tilt: (random() - 0.5) * 0.6, wobble: random() * 6 }));
    const answers = Array.from({ length: 40 }, () => [0.95, 0.6 + random() * 0.35, random() < 0.5 ? 0.35 + random() * 0.3 : 0]);

    function draw(elapsed, still) {
      if (!sides) sides = heroSides(layer, heading);
      lastTime = elapsed;
      const time = (still ? 0 : elapsed) + warmUp;
      const { width, height } = layer;
      const { top, bottom, left, right, narrow } = sides;
      ctx.clearRect(0, 0, width, height);

      // Question marks, each born at its own time and moving right until the text.
      ctx.fillStyle = colors.muted;
      ctx.textAlign = 'center';
      for (let i = Math.max(0, Math.floor((time - 12) / every)); i * every < time; i++) {
        const m = marks[i % marks.length];
        const age = time - i * every;
        const x = -20 + age * m.speed;
        if (x > left) continue;
        const alpha = Math.min(1, (x + 20) / 60) * Math.max(0, Math.min(1, (left - x) / 70));
        ctx.save();
        ctx.translate(x, top + m.y * (bottom - top) + Math.sin(age + m.wobble) * 5);
        ctx.rotate(m.tilt);
        ctx.globalAlpha = alpha * 0.7;
        ctx.font = `500 ${narrow ? m.size * 0.7 : m.size}px "DM Sans", sans-serif`;
        ctx.fillText('?', 0, 0);
        ctx.restore();
      }

      // Answers: a card every few seconds, lines typed in, older cards rise and fade.
      const cardW = Math.min(width - right - 64, 230), lineGap = narrow ? 6 : 11;
      const cardH = lineGap * 3 + 14, gap = narrow ? 4 : 14;
      const x0 = right + 24 + (width - right - 64 - cardW) / 2;
      const latest = Math.floor(time / answerEvery);
      const since = time - latest * answerEvery;
      const slide = Math.min(1, since / 0.5);
      for (let k = 0; k < shown + 1; k++) {
        const n = latest - k;
        if (n < 0) break;
        const rows = answers[n % answers.length];
        const age = time - n * answerEvery;
        const place = k - 1 + slide; // 0 = newest slot at the bottom
        // Phones have room for one card: the new one fades in where the old one was.
        if (narrow && k > 1) break;
        const y = narrow ? bottom - cardH : top + (shown - 1) * (cardH + gap) - place * (cardH + gap);
        const fade = narrow ? (k ? 1 - slide : slide) : k === shown ? 1 - slide : k === 0 ? slide : 1;
        ctx.globalAlpha = fade * (narrow ? 1 : 1 - Math.max(0, place - 1) * 0.22);
        ctx.strokeStyle = colors.line;
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.roundRect(x0, y, cardW, cardH, 6); ctx.stroke();
        ctx.fillStyle = colors.accent;
        ctx.beginPath(); ctx.arc(x0 + 12, y + 12, 3, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = colors.accent;
        ctx.lineCap = 'round';
        ctx.lineWidth = narrow ? 2 : 2.5;
        rows.forEach((w, r) => {
          if (!w) return;
          const typed = Math.max(0, Math.min(1, (age - 0.3 - r * 0.45) / 0.45));
          if (!typed) return;
          const lx = x0 + 24, ly = y + 12 + r * lineGap;
          ctx.globalAlpha *= 1;
          ctx.beginPath(); ctx.moveTo(lx, ly); ctx.lineTo(lx + (cardW - 36) * w * typed, ly); ctx.stroke();
        });
      }
      ctx.globalAlpha = 1;
    }

    layer.onResize = () => { sides = heroSides(layer, heading); draw(lastTime, false); };
    const stop = animate(hero, draw, { fps: 30 });
    return () => { stop(); layer.remove(); };
  }
};
