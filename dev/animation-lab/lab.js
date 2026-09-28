/* Animation lab: a local-only switcher for comparing animation options on the real
   homepage. Loaded only by `hugo server`. Pick an option, or press [ and ] to cycle. */

// Each option lives in its own file and default-exports { mount() => cleanup }.
// `where` is the selector the "Go to it" link scrolls to.
const OPTIONS = [
  { id: 'current', label: 'Current: line band', place: 'Under hero', where: '.hero', idea: 'Today’s band of fine lines under the buttons.' },
  { id: 'none', label: 'No animation', place: '—', where: '.hero', idea: 'Baseline: the page with nothing moving.' }
];

const base = new URL('.', import.meta.url);
const root = document.documentElement;
let cleanup = null, current = null, loading = 0;

export function register(list) { OPTIONS.push(...list); render(); }

async function select(id) {
  const option = OPTIONS.find(o => o.id === id) || OPTIONS[0];
  const ticket = ++loading;
  cleanup?.();
  cleanup = null;
  current = option;
  const url = new URL(location.href);
  url.searchParams.set('anim', option.id);
  history.replaceState(null, '', url);
  render();
  if (option.id === 'current') return;
  // Options replace the current band unless they restyle it (`keepBand`).
  const hideBand = document.createElement('style');
  hideBand.textContent = (option.keepBand ? '' : '.hero-art{display:none!important}') +
    '.hero-content{padding-bottom:104px!important}@media(max-width:580px){.hero-content{padding-bottom:72px!important}}';
  document.head.append(hideBand);
  if (option.id === 'none') { cleanup = () => hideBand.remove(); return; }
  try {
    const module = await import(new URL(option.id + '.js', base).href + '?v=' + Date.now());
    if (ticket !== loading) { hideBand.remove(); return; }
    const undo = module.default.mount();
    cleanup = () => { try { undo?.(); } finally { hideBand.remove(); } };
  } catch (error) {
    hideBand.remove();
    status.textContent = 'Could not load ' + option.id + ': ' + error.message;
    console.error('[lab]', error);
  }
}

const panel = document.createElement('aside');
panel.className = 'lab-panel';
panel.setAttribute('aria-label', 'Animation lab');
panel.innerHTML = `
  <style>
    .lab-panel{position:fixed;left:16px;bottom:16px;z-index:1000;width:300px;max-height:calc(100vh - 32px);display:flex;flex-direction:column;background:#fff;color:#0a1931;border:1px solid #e1e7f3;border-radius:8px;box-shadow:0 12px 32px rgba(10,25,49,.14);font:13px/1.45 "DM Sans",system-ui,sans-serif}
    .lab-panel.is-closed .lab-body{display:none}
    .lab-head{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:10px 12px;border-bottom:1px solid #e1e7f3}
    .lab-head strong{font-size:13px}
    .lab-panel button{font:inherit;color:inherit;cursor:pointer}
    .lab-ghost{background:none;border:1px solid #e1e7f3;border-radius:4px;padding:3px 8px}
    .lab-ghost:hover{border-color:#3e66c6;color:#3e66c6}
    .lab-body{overflow:auto;padding:8px}
    .lab-list{list-style:none;margin:0;padding:0}
    .lab-list button{width:100%;display:grid;grid-template-columns:1fr auto;gap:8px;text-align:left;background:none;border:0;border-radius:4px;padding:6px 8px}
    .lab-list button:hover{background:#f0f4fd}
    .lab-list button[aria-pressed=true]{background:#3e66c6;color:#fff}
    .lab-list small{opacity:.7}
    .lab-note{margin:8px;padding-top:8px;border-top:1px solid #e1e7f3;color:#55617c}
    .lab-row{display:flex;align-items:center;justify-content:space-between;gap:8px;margin:8px}
    .lab-panel :focus-visible{outline:2px solid #3e66c6;outline-offset:2px}
  </style>
  <div class="lab-head"><strong>Animation lab</strong><span><button class="lab-ghost" data-step="-1" aria-label="Previous option">[</button> <button class="lab-ghost" data-step="1" aria-label="Next option">]</button> <button class="lab-ghost lab-toggle" aria-expanded="true">Hide</button></span></div>
  <div class="lab-body">
    <ul class="lab-list" role="list"></ul>
    <p class="lab-note" aria-live="polite"></p>
    <div class="lab-row"><label><input type="checkbox" class="lab-still"> Still frame (reduced motion)</label><button class="lab-ghost lab-go">Go to it</button></div>
  </div>`;
const list = panel.querySelector('.lab-list');
const status = panel.querySelector('.lab-note');

function render() {
  list.innerHTML = '';
  for (const option of OPTIONS) {
    const item = document.createElement('li');
    const button = document.createElement('button');
    button.type = 'button';
    button.setAttribute('aria-pressed', String(option === current));
    button.innerHTML = '<span></span><small></small>';
    button.firstChild.textContent = option.label;
    button.lastChild.textContent = option.place;
    button.addEventListener('click', () => select(option.id));
    item.append(button);
    list.append(item);
  }
  status.textContent = current ? current.idea : '';
}

function step(by) {
  const index = OPTIONS.indexOf(current);
  select(OPTIONS[(index + by + OPTIONS.length) % OPTIONS.length].id);
}

panel.querySelectorAll('[data-step]').forEach(b => b.addEventListener('click', () => step(Number(b.dataset.step))));
panel.querySelector('.lab-toggle').addEventListener('click', event => {
  const closed = panel.classList.toggle('is-closed');
  event.currentTarget.textContent = closed ? 'Show' : 'Hide';
  event.currentTarget.setAttribute('aria-expanded', String(!closed));
});
panel.querySelector('.lab-go').addEventListener('click', () => {
  document.querySelector(current?.where || '.hero')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
});
panel.querySelector('.lab-still').addEventListener('change', event => {
  root.classList.toggle('lab-still', event.target.checked);
  select(current.id);
});
addEventListener('keydown', event => {
  if (event.target.closest('input, textarea, select')) return;
  if (event.key === '[') step(-1);
  if (event.key === ']') step(1);
});

document.body.append(panel);
// Options written after this file register themselves in options.js.
import('./options.js?v=' + Date.now())
  .then(m => register(m.default))
  .catch(() => {})
  .finally(() => select(new URL(location.href).searchParams.get('anim') || 'current'));
