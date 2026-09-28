/* Tangle to clarity: five lines knot and cross on the left, pass behind the
   headline and come out on the right calm, parallel and evenly spaced. Clarity first. */
import { colors, canvasLayer, animate, heroSides } from './kit.js';

export default {
  mount() {
    const hero = document.querySelector('.hero');
    const heading = hero.querySelector('h1');
    const layer = canvasLayer(hero);
    const { ctx } = layer;
    const count = 5;
    let sides, lastTime = 0;
    const smooth = v => { v = Math.max(0, Math.min(1, v)); return v * v * (3 - 2 * v); };

    function y(line, x, time) {
      const { left, right, mid, narrow } = sides;
      const spread = narrow ? 7 : 15;
      const neat = mid + (line - (count - 1) / 2) * spread + Math.sin(x * 0.008 - time * 0.9) * (narrow ? 2 : 5);
      // Tangle grows towards the left edge and is gone by the time the line reaches the text.
      const knot = (narrow ? 14 : 80) * (1 - smooth(x / left)) + (narrow ? 4 : 18);
      const messy = mid + knot * (Math.sin(x * 0.021 + time * 1.3 + line * 2.1) +
        0.6 * Math.sin(x * 0.047 - time * 1.9 + line * 4.3));
      const k = smooth((x - left) / (right - left));
      return messy + (neat - messy) * k;
    }

    function draw(elapsed, still) {
      if (!sides) sides = heroSides(layer, heading);
      lastTime = elapsed;
      const time = still ? 4 : elapsed;
      const { width, height } = layer;
      const { left, right } = sides;
      ctx.clearRect(0, 0, width, height);
      ctx.lineWidth = 1.4;
      ctx.lineCap = 'round';
      for (let line = 0; line < count; line++) {
        // Two passes: grey on the tangled side, blue on the clear side; both fade out behind the text.
        for (const [from, to, color, alpha] of [[0, left + 40, colors.muted, 0.5], [right - 40, width, colors.accent, 0.7]]) {
          const fade = ctx.createLinearGradient(from, 0, to, 0);
          const edge = 80 / (to - from);
          fade.addColorStop(0, from === 0 ? color : 'transparent');
          fade.addColorStop(from === 0 ? 1 - edge : edge, color);
          fade.addColorStop(1, from === 0 ? 'transparent' : color);
          ctx.strokeStyle = fade;
          ctx.globalAlpha = alpha;
          ctx.beginPath();
          for (let x = from; x <= to; x += 4) {
            const py = y(line, x, time);
            x === from ? ctx.moveTo(x, py) : ctx.lineTo(x, py);
          }
          ctx.stroke();
        }
      }
      ctx.globalAlpha = 1;
    }

    layer.onResize = () => { sides = heroSides(layer, heading); draw(lastTime, false); };
    const stop = animate(hero, draw, { fps: 30 });
    return () => { stop(); layer.remove(); };
  }
};
