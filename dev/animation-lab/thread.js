/* The thread: one fine line in the left margin runs from the hero to the contact
   section, filling in as you scroll. A small square marks each section and turns solid
   when you reach it. Reads as a single engagement, from first question to handover. */
import { colors, addStyle, reducedMotion } from './kit.js';

export default {
  mount() {
    const main = document.querySelector('main');
    const marks = [...document.querySelectorAll('main section .section-head, main .client-heading, main .contact .eyebrow')];
    const removeStyle = addStyle(`
      main { position: relative; }
      .lab-thread { position: absolute; top: 0; width: 1px; pointer-events: none; z-index: 2; }
      .lab-thread-track, .lab-thread-fill { position: absolute; inset: 0; background: ${colors.line}; }
      .lab-thread-fill { background: ${colors.accent}; transform-origin: top; transform: scaleY(0); }
      .lab-thread i { position: absolute; left: -3.5px; width: 8px; height: 8px; box-sizing: border-box;
        border: 1px solid ${colors.accent}; background: #fff; transition: background .4s, transform .4s; }
      .lab-thread i.is-reached { background: ${colors.accent}; transform: rotate(45deg); }
      @media (max-width: 1100px) { .lab-thread { display: none; } }`);
    const thread = document.createElement('div');
    thread.className = 'lab-thread';
    thread.setAttribute('aria-hidden', 'true');
    thread.innerHTML = '<div class="lab-thread-track"></div><div class="lab-thread-fill"></div>';
    const fill = thread.lastChild;
    const dots = marks.map(() => thread.appendChild(document.createElement('i')));
    main.append(thread);

    let start = 0, end = 0, stops = [], frame = 0;
    function layout() {
      const base = main.getBoundingClientRect().top + scrollY;
      const wrap = document.querySelector('.wrap').getBoundingClientRect();
      stops = marks.map(m => m.getBoundingClientRect().top + scrollY - base + 12);
      start = stops[0] - 60;
      end = stops[stops.length - 1];
      thread.style.left = Math.max(24, wrap.left - 36) + 'px';
      thread.style.top = start + 'px';
      thread.style.height = end - start + 'px';
      dots.forEach((d, i) => { d.style.top = stops[i] - start - 4 + 'px'; });
      update();
    }
    function update() {
      frame = 0;
      // The line is filled up to the point 60% down the screen.
      const base = main.getBoundingClientRect().top + scrollY;
      const reach = reducedMotion() ? end : scrollY + innerHeight * 0.6 - base;
      const progress = Math.max(0, Math.min(1, (reach - start) / (end - start)));
      fill.style.transform = `scaleY(${progress})`;
      dots.forEach((d, i) => d.classList.toggle('is-reached', reach >= stops[i]));
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', layout);
    layout();
    // Fonts and images can shift the sections after load.
    const late = setTimeout(layout, 800);
    return () => {
      clearTimeout(late);
      cancelAnimationFrame(frame);
      removeEventListener('scroll', onScroll);
      removeEventListener('resize', layout);
      thread.remove();
      removeStyle();
    };
  }
};
