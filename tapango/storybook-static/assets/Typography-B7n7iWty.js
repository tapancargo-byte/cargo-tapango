import { j as c } from './jsx-runtime-BjG_zV1W.js';
import { g as p, u as g } from './ThemeProvider-CPKCwPQ2.js';
import { T as f } from './Text-DBu9YOJb.js';
const y = {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },
  l = (s) => {
    if (s) return s;
    try {
      return g() ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  },
  t =
    (s) =>
    ({
      children: e,
      mode: o,
      color: n,
      weight: a = 'regular',
      align: r = 'left',
    }) => {
      const u = l(o),
        d = p(u).typography[s],
        m = y[a],
        i = { fontSize: d, fontWeight: m, textAlign: r };
      return n && (i.color = n), c.jsx(f, { ...i, children: e });
    },
  k = t('display'),
  D = t('headline'),
  S = t('title'),
  j = t('section'),
  v = t('body'),
  z = t('subtitle'),
  M = t('caption'),
  w = ({ children: s, mode: e, color: o }) => {
    const n = l(e),
      r = { fontSize: p(n).typography.caption, textTransform: 'uppercase' };
    return o && (r.color = o), c.jsx(f, { ...r, children: s });
  };
export { v as B, M as C, k as D, D as H, w as O, j as S, S as T, z as a };
