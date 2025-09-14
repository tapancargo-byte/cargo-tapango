import { j as o } from './jsx-runtime-BjG_zV1W.js';
import { g as i, u as f } from './ThemeProvider-CPKCwPQ2.js';
import { Y as c } from './Stacks-CaMMwnuE.js';
const b = ({ children: r, style: e }) =>
    o.jsx('div', { style: e, children: r }),
  u = (r) => {
    if (r) return r;
    try {
      return f() ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  },
  m = (r) => {
    const { variant: e = 'default', mode: t } = r,
      s = u(t),
      n = i(s);
    return e === 'glass'
      ? o.jsx(k, { ...r })
      : e === 'elevated'
        ? o.jsx(x, { ...r })
        : e === 'outlined'
          ? o.jsx(g, { ...r })
          : e === 'flat'
            ? o.jsx(j, { ...r })
            : o.jsx(c, {
                backgroundColor: n.colors.surface,
                borderRadius: 12,
                padding: r.padding ?? 12,
                style: r.style,
                children: r.children,
              });
  },
  k = ({ children: r, style: e, padding: t = 12, mode: s, ...n }) => {
    const a = u(s),
      d = i(a);
    return o.jsx(c, {
      borderRadius: 12,
      overflow: 'hidden',
      ...n,
      children: o.jsx(b, {
        intensity: 50,
        tint: a === 'dark' ? 'dark' : 'light',
        style: { borderRadius: 12 },
        children: o.jsx(c, {
          padding: t,
          backgroundColor:
            d.mode === 'light' ? 'rgba(255,255,255,0.6)' : 'rgba(26,31,46,0.4)',
          style: e,
          children: r,
        }),
      }),
    });
  },
  x = ({ children: r, style: e, padding: t = 12, mode: s, ...n }) => {
    const a = u(s),
      d = i(a),
      l = { boxShadow: '0px 8px 16px rgba(0,0,0,0.15)' };
    return o.jsx(c, {
      backgroundColor: d.colors.surface,
      borderRadius: 12,
      padding: t,
      style: [l, e],
      ...n,
      children: r,
    });
  },
  g = ({ children: r, style: e, padding: t = 12, mode: s, ...n }) => {
    const a = u(s),
      d = i(a);
    return o.jsx(c, {
      backgroundColor: d.colors.surface,
      borderRadius: 12,
      padding: t,
      borderWidth: 1,
      borderColor: d.colors.border,
      style: e,
      ...n,
      children: r,
    });
  },
  j = ({ children: r, style: e, padding: t = 12, mode: s, ...n }) => {
    const a = u(s),
      d = i(a);
    return o.jsx(c, {
      backgroundColor: d.colors.surfaceVariant,
      borderRadius: 12,
      padding: t,
      style: e,
      ...n,
      children: r,
    });
  };
export { m as C, x as E, j as F, k as G, g as O };
