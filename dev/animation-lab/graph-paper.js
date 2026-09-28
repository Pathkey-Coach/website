/* Graph paper: a faint dot grid behind every white section of the page. Dots near the
   pointer lift and turn blue, and a slow sweep crosses the grid every few seconds.
   Suggests the structure under the work. The navy and tinted sections cover it. */
import { colors, animate } from './kit.js';

export default {
  mount() {
    const canvas = document.createElement('canvas');
    canvas.setAttribute('aria-hidden', 'true');
    canvas.style.cssText = 'position:fixed;inset:0;width:100vw;height:100vh;pointer-events:none;z-index:-1';
    document.body.prepend(canvas);
    const ctx = canvas.getContext('2d');
    const gap = 24, reach = 150;
    let width = 0, height = 0, pointer = null, eased = null;

    function resize() {
      const ratio = Math.min(devicePixelRatio || 1, 2);
      width = innerWidth; height = innerHeight;
      canvas.width = Math.round(width * ratio); canvas.height = Math.round(height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    }
    const move = event => { pointer = { x: event.clientX, y: event.clientY }; };
    const leave = () => { pointer = null; };

    function draw(time, still) {
      // The lens follows the pointer with a little lag so it feels soft, not attached.
      if (pointer) eased = eased ? { x: eased.x + (pointer.x - eased.x) * 0.18, y: eased.y + (pointer.y - eased.y) * 0.18 } : { ...pointer };
      else eased = null;
      const sweep = still ? -1 : ((time * 0.09) % 1.6) * (width + height) - height;
      ctx.clearRect(0, 0, width, height);
      const offset = still ? 0 : scrollY % gap;
      for (let y = gap / 2 - offset; y < height + gap; y += gap) {
        for (let x = gap / 2; x < width; x += gap) {
          let lift = 0;
          if (eased) {
            const d = Math.hypot(x - eased.x, y - eased.y);
            if (d < reach) lift = 1 - d / reach;
          }
          const band = sweep < 0 ? 0 : Math.max(0, 1 - Math.abs(x + y - sweep) / 90) * 0.5;
          const glow = Math.max(lift * lift, band);
          ctx.globalAlpha = 0.13 + glow * 0.6;
          ctx.fillStyle = glow > 0.05 ? colors.accent : colors.ink;
          const size = 1.3 + glow * 1.7;
          ctx.fillRect(x - size / 2, y - size / 2, size, size);
        }
      }
      ctx.globalAlpha = 1;
    }

    resize();
    addEventListener('resize', resize);
    addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerleave', leave);
    const stop = animate(document.body, draw, { fps: 30 });
    return () => {
      stop();
      removeEventListener('resize', resize);
      removeEventListener('pointermove', move);
      document.removeEventListener('pointerleave', leave);
      canvas.remove();
    };
  }
};
