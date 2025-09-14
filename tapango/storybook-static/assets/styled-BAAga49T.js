import { e as I } from './ThemeProvider-CPKCwPQ2.js';
const w = (s, N, t = 0) => {
    const e = {};
    for (const a in N) {
      const l = s == null ? void 0 : s[a],
        u = N[a];
      !l || typeof u == 'function'
        ? (e[a] = u)
        : l && !u
          ? (e[a] = l[a])
          : t === 0
            ? (e[a] = w(l, u, t + 1))
            : (e[a] = { ...l, ...u });
    }
    return { ...s, ...e };
  },
  b = new WeakMap();
function z(s) {
  var N;
  if (s)
    return s.getSize && s.prefetch
      ? y.Image
      : s.displayName === 'Text' && s.render
        ? y.Text
        : s.render &&
            (s.displayName === 'ScrollView' || s.displayName === 'View')
          ? y.default
          : (N = s.State) != null && N.blurTextInput
            ? y.TextInput
            : b.get(s);
}
const y = {
  Image: {
    isReactNative: !0,
    inlineProps: new Set(['src', 'width', 'height']),
  },
  Text: { isReactNative: !0, isText: !0 },
  TextInput: { isReactNative: !0, isInput: !0, isText: !0 },
  default: { isReactNative: !0 },
};
function M(s, N, t) {
  const e = s.staticConfig,
    a = !!e && !(e.isReactNative || e.isHOC);
  let l =
    (e != null && e.isHOC && !(e != null && e.isStyledHOC)) || a
      ? s
      : (e == null ? void 0 : e.Component) || s;
  const u = e ? void 0 : z(l),
    H = !!(
      u ||
      (t != null && t.isReactNative) ||
      (e != null && e.isReactNative)
    ),
    k = (() => {
      let {
          variants: r,
          name: T,
          defaultVariants: d,
          acceptsClassName: V,
          context: O,
          ...c
        } = N || {},
        v,
        x;
      if (e && !(e.isHOC && !e.isStyledHOC)) {
        const R = e.defaultProps;
        for (const i in R) {
          const D = R[i];
          e.defaultVariants &&
            i in e.defaultVariants &&
            (!d || !(i in d)) &&
            (v || (v = {}), (v[i] = D)),
            !(i in c) && (!d || !(i in d)) && (x || (x = {}), (x[i] = R[i]));
        }
        e.variants && (r = w(e.variants, r));
      }
      (x || d || v) && (c = { ...x, ...v, ...c, ...d }),
        e != null && e.isHOC && T && (c.componentName = T);
      const p = !!((t != null && t.isText) || (e != null && e.isText)),
        P =
          (t == null ? void 0 : t.acceptsClassName) ??
          V ??
          (a ||
            H ||
            ((e == null ? void 0 : e.isHOC) &&
              (e == null ? void 0 : e.acceptsClassName))),
        h = {
          ...e,
          ...t,
          ...(!a && { Component: l }),
          variants: r,
          defaultProps: c,
          defaultVariants: d,
          componentName: T || (e == null ? void 0 : e.componentName),
          isReactNative: H,
          isText: p,
          acceptsClassName: P,
          context: O,
          ...u,
          isStyledHOC: !!(e != null && e.isHOC),
          parentStaticConfig: e,
        };
      return (c.children || !P || O) && (h.neverFlatten = !0), h;
    })(),
    m = I(k || {});
  for (const r in s) r !== 'propTypes' && (r in m || (m[r] = s[r]));
  return m;
}
export { M as s };
