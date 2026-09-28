/* The current flowing lines, moved from a strip under the buttons to the whole hero,
   with a clear oval around the copy. Tests whether placement was the real problem. */
import { addStyle } from './kit.js';

export default {
  mount() {
    return addStyle(`
      .hero-art { inset: 0 !important; height: auto !important;
        -webkit-mask-image: radial-gradient(ellipse 34% 44% at 50% 45%, transparent 0 62%, #000 100%);
        mask-image: radial-gradient(ellipse 34% 44% at 50% 45%, transparent 0 62%, #000 100%); }
      @media (max-width: 580px) {
        .hero-art { -webkit-mask-image: linear-gradient(to bottom, transparent 55%, #000 85%);
          mask-image: linear-gradient(to bottom, transparent 55%, #000 85%); }
      }`);
  }
};
