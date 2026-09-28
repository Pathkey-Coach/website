/* Options to a plan: faint, wandering paths on the left (the options on the table)
   meet behind the headline. One clear route leaves on the right and passes three
   milestones. Some options fade as they are ruled out. Advice narrows, then we build. */
import { colors, canvasLayer, animate, heroSides } from './kit.js';

export default {
  mount() {
    const hero = document.querySelector('.hero');
    const heading = hero.querySelector('h1');
    const layer = canvasLayer(hero);
    const { ctx } = layer;
    const cycle = 4.5; // seconds for the pulse to travel the route
    let sides, options = [], lastTime = 0;

    function measure() {
      sides = heroSides(layer, heading);
      const { top, bottom, left, mid } = sides;
      let seed = 11;
      const random = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
      const count = sides.narrow ? 5 : 9;
      options = Array.from({ length: count }, (_, i) => {
        const y = top + (bottom - top) * (i + 0.5) / count;
        return { y, c1: [left * (0.2 + random() * 0.3), y + (random() - 0.5) * 160],
          c2: [left * (0.55 + random() * 0.3), mid + (random() - 0.5) * 180], phase: random() * 10 };
      });
    }

    // The route: from the headline's right edge, a gentle S towards the far margin.
    function routePoint(u) {
      const { right, mid, narrow } = sides;
      const end = layer.width - (narrow ? 12 : 40);
      const rise = narrow ? 0 : 110;
      return { x: right + (end - right) * u, y: mid - Math.sin(u * Math.PI) * rise * 0.5 - u * rise * 0.4 };
    }

    function draw(elapsed, still) {
      if (!sides) measure();
      lastTime = elapsed;
      const time = still ? 3.2 : elapsed + 2;
      const { width, height } = layer;
      ctx.clearRect(0, 0, width, height);
      ctx.lineCap = 'round';

      // Options: dashed curves flowing towards the headline; each dims in turn.
      ctx.setLineDash([2, 7]);
      ctx.lineDashOffset = -time * 22;
      ctx.lineWidth = 1.2;
      ctx.strokeStyle = colors.muted;
      for (const o of options) {
        const ruled = 0.5 + 0.5 * Math.sin(time * 0.5 + o.phase);
        ctx.globalAlpha = 0.12 + ruled * 0.38;
        ctx.beginPath();
        ctx.moveTo(-10, o.y);
        ctx.bezierCurveTo(o.c1[0], o.c1[1], o.c2[0], o.c2[1], sides.left - 20, sides.mid);
        ctx.stroke();
      }
      ctx.setLineDash([]);

      // The chosen route, drawn solid, with a pulse and three milestones.
      ctx.globalAlpha = 0.55;
      ctx.strokeStyle = colors.accent;
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let i = 0; i <= 60; i++) {
        const p = routePoint(i / 60);
        i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y);
      }
      ctx.stroke();
      const at = still ? 0.72 : (time % cycle) / cycle;
      for (const stop of [0.3, 0.6, 0.9]) {
        const p = routePoint(stop);
        const reached = at >= stop;
        ctx.globalAlpha = reached ? 0.9 : 0.5;
        ctx.fillStyle = reached ? colors.accent : '#fff';
        ctx.lineWidth = 1.4;
        ctx.beginPath(); ctx.arc(p.x, p.y, sides.narrow ? 4 : 6, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      }
      const head = routePoint(at);
      const tail = routePoint(Math.max(0, at - 0.12));
      const trail = ctx.createLinearGradient(tail.x, tail.y, head.x, head.y);
      trail.addColorStop(0, 'transparent');
      trail.addColorStop(1, colors.accent);
      ctx.strokeStyle = trail;
      ctx.globalAlpha = 0.9;
      ctx.lineWidth = 3;
      ctx.beginPath();
      for (let u = Math.max(0, at - 0.12), first = true; u <= at; u += 0.01, first = false) {
        const p = routePoint(u);
        first ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
      }
      ctx.stroke();
      ctx.fillStyle = colors.accent;
      ctx.beginPath(); ctx.arc(head.x, head.y, 3, 0, Math.PI * 2); ctx.fill();
      ctx.globalAlpha = 1;
    }

    layer.onResize = () => { measure(); draw(lastTime, false); };
    const stop = animate(hero, draw, { fps: 30 });
    return () => { stop(); layer.remove(); };
  }
};
