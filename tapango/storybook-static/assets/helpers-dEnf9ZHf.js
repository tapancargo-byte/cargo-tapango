import {
  o as ae,
  r as Ls,
  C as mo,
  v as ho,
  w as qn,
  x as _s,
  y as js,
  G as zs,
  z as Vs,
  A as Zn,
  B as pr,
  D as po,
  E as $s,
  F as Hs,
  H as Jn,
  i as go,
  I as vo,
  J as It,
  j as Yt,
  K as bo,
  L as Ws,
  h as _e,
  S as Qn,
  M as yo,
  N as mt,
  f as Us,
  V as Bs,
  O as Ks,
  P as Ys,
  k as Gs,
  Q as Xs,
  b as So,
  R as gr,
} from './ThemeProvider-CPKCwPQ2.js';
import { R as L, r as f, a as xo } from './index-D_zSVikN.js';
import {
  I as wo,
  a as qs,
  u as je,
  s as Co,
  Z as vr,
  b as Zs,
  c as Js,
  p as xn,
  d as Qs,
  e as ei,
  F as ti,
  r as ni,
  U as ri,
  f as oi,
} from './GorhomPortal-CbY2Y53n.js';
import { r as He } from './index-VT2245Mq.js';
import { j as S } from './jsx-runtime-BjG_zV1W.js';
import { s as me } from './styled-BAAga49T.js';
import { g as si, Y as At, f as ii, X as er } from './Stacks-CaMMwnuE.js';
import { D as br, V as li } from './index-DaADHxGU.js';
var Ae = {
    centroidDimension: function (t, n, r, o) {
      var s = t.touchBank,
        i = 0,
        l = 0,
        c =
          t.numberActiveTouches === 1
            ? t.touchBank[t.indexOfSingleActiveTouch]
            : null;
      if (c !== null)
        c.touchActive &&
          c.currentTimeStamp > n &&
          ((i +=
            o && r
              ? c.currentPageX
              : o && !r
                ? c.currentPageY
                : !o && r
                  ? c.previousPageX
                  : c.previousPageY),
          (l = 1));
      else
        for (var a = 0; a < s.length; a++) {
          var u = s[a];
          if (u != null && u.touchActive && u.currentTimeStamp >= n) {
            var d = void 0;
            o && r
              ? (d = u.currentPageX)
              : o && !r
                ? (d = u.currentPageY)
                : !o && r
                  ? (d = u.previousPageX)
                  : (d = u.previousPageY),
              (i += d),
              l++;
          }
        }
      return l > 0 ? i / l : Ae.noCentroid;
    },
    currentCentroidXOfTouchesChangedAfter: function (t, n) {
      return Ae.centroidDimension(t, n, !0, !0);
    },
    currentCentroidYOfTouchesChangedAfter: function (t, n) {
      return Ae.centroidDimension(t, n, !1, !0);
    },
    previousCentroidXOfTouchesChangedAfter: function (t, n) {
      return Ae.centroidDimension(t, n, !0, !1);
    },
    previousCentroidYOfTouchesChangedAfter: function (t, n) {
      return Ae.centroidDimension(t, n, !1, !1);
    },
    currentCentroidX: function (t) {
      return Ae.centroidDimension(t, 0, !0, !0);
    },
    currentCentroidY: function (t) {
      return Ae.centroidDimension(t, 0, !1, !0);
    },
    noCentroid: -1,
  },
  yr = Ae.currentCentroidXOfTouchesChangedAfter,
  Sr = Ae.currentCentroidYOfTouchesChangedAfter,
  ai = Ae.previousCentroidXOfTouchesChangedAfter,
  ci = Ae.previousCentroidYOfTouchesChangedAfter,
  ui = Ae.currentCentroidX,
  fi = Ae.currentCentroidY,
  st = {
    _initializeGestureState(e) {
      (e.moveX = 0),
        (e.moveY = 0),
        (e.x0 = 0),
        (e.y0 = 0),
        (e.dx = 0),
        (e.dy = 0),
        (e.vx = 0),
        (e.vy = 0),
        (e.numberActiveTouches = 0),
        (e._accountsForMovesUpTo = 0);
    },
    _updateGestureStateOnMove(e, t) {
      (e.numberActiveTouches = t.numberActiveTouches),
        (e.moveX = yr(t, e._accountsForMovesUpTo)),
        (e.moveY = Sr(t, e._accountsForMovesUpTo));
      var n = e._accountsForMovesUpTo,
        r = ai(t, n),
        o = yr(t, n),
        s = ci(t, n),
        i = Sr(t, n),
        l = e.dx + (o - r),
        c = e.dy + (i - s),
        a = t.mostRecentTimeStamp - e._accountsForMovesUpTo;
      (e.vx = (l - e.dx) / a),
        (e.vy = (c - e.dy) / a),
        (e.dx = l),
        (e.dy = c),
        (e._accountsForMovesUpTo = t.mostRecentTimeStamp);
    },
    create(e) {
      var t = { handle: null, shouldCancelClick: !1, timeout: null },
        n = {
          stateID: Math.random(),
          moveX: 0,
          moveY: 0,
          x0: 0,
          y0: 0,
          dx: 0,
          dy: 0,
          vx: 0,
          vy: 0,
          numberActiveTouches: 0,
          _accountsForMovesUpTo: 0,
        },
        r = {
          onStartShouldSetResponder(o) {
            return e.onStartShouldSetPanResponder == null
              ? !1
              : e.onStartShouldSetPanResponder(o, n);
          },
          onMoveShouldSetResponder(o) {
            return e.onMoveShouldSetPanResponder == null
              ? !1
              : e.onMoveShouldSetPanResponder(o, n);
          },
          onStartShouldSetResponderCapture(o) {
            return (
              o.nativeEvent.touches.length === 1 &&
                st._initializeGestureState(n),
              (n.numberActiveTouches = o.touchHistory.numberActiveTouches),
              e.onStartShouldSetPanResponderCapture != null
                ? e.onStartShouldSetPanResponderCapture(o, n)
                : !1
            );
          },
          onMoveShouldSetResponderCapture(o) {
            var s = o.touchHistory;
            return n._accountsForMovesUpTo === s.mostRecentTimeStamp
              ? !1
              : (st._updateGestureStateOnMove(n, s),
                e.onMoveShouldSetPanResponderCapture
                  ? e.onMoveShouldSetPanResponderCapture(o, n)
                  : !1);
          },
          onResponderGrant(o) {
            return (
              t.handle || (t.handle = wo.createInteractionHandle()),
              t.timeout && di(t),
              (t.shouldCancelClick = !0),
              (n.x0 = ui(o.touchHistory)),
              (n.y0 = fi(o.touchHistory)),
              (n.dx = 0),
              (n.dy = 0),
              e.onPanResponderGrant && e.onPanResponderGrant(o, n),
              e.onShouldBlockNativeResponder == null
                ? !0
                : e.onShouldBlockNativeResponder(o, n)
            );
          },
          onResponderReject(o) {
            Lt(t, e.onPanResponderReject, o, n);
          },
          onResponderRelease(o) {
            Lt(t, e.onPanResponderRelease, o, n),
              xr(t),
              st._initializeGestureState(n);
          },
          onResponderStart(o) {
            var s = o.touchHistory;
            (n.numberActiveTouches = s.numberActiveTouches),
              e.onPanResponderStart && e.onPanResponderStart(o, n);
          },
          onResponderMove(o) {
            var s = o.touchHistory;
            n._accountsForMovesUpTo !== s.mostRecentTimeStamp &&
              (st._updateGestureStateOnMove(n, s),
              e.onPanResponderMove && e.onPanResponderMove(o, n));
          },
          onResponderEnd(o) {
            var s = o.touchHistory;
            (n.numberActiveTouches = s.numberActiveTouches),
              Lt(t, e.onPanResponderEnd, o, n);
          },
          onResponderTerminate(o) {
            Lt(t, e.onPanResponderTerminate, o, n),
              xr(t),
              st._initializeGestureState(n);
          },
          onResponderTerminationRequest(o) {
            return e.onPanResponderTerminationRequest == null
              ? !0
              : e.onPanResponderTerminationRequest(o, n);
          },
          onClickCapture: (o) => {
            t.shouldCancelClick === !0 &&
              (o.stopPropagation(), o.preventDefault());
          },
        };
      return {
        panHandlers: r,
        getInteractionHandle() {
          return t.handle;
        },
      };
    },
  };
function Lt(e, t, n, r) {
  e.handle && (wo.clearInteractionHandle(e.handle), (e.handle = null)),
    t && t(n, r);
}
function di(e) {
  clearTimeout(e.timeout);
}
function xr(e) {
  e.timeout = setTimeout(() => {
    e.shouldCancelClick = !1;
  }, 250);
}
const mi = typeof window > 'u',
  hi = () => {};
function pi() {
  return mi ? hi : L.useReducer((e) => Math.random(), 0)[1];
}
const gi = L.createContext({});
function Ro(e) {
  if (typeof document > 'u') return f.useMemo(() => e(), []);
  const t = f.useRef(void 0);
  return t.current || (t.current = { v: e() }), t.current.v;
}
const wn = f.memo(
  ({
    children: e,
    initial: t,
    isPresent: n,
    onExitComplete: r,
    exitVariant: o,
    enterVariant: s,
    enterExitVariant: i,
    presenceAffectsLayout: l,
    custom: c,
  }) => {
    const a = Ro(vi),
      u = f.useId() || '',
      d = f.useMemo(
        () => ({
          id: u,
          initial: t,
          isPresent: n,
          custom: c,
          exitVariant: o,
          enterVariant: s,
          enterExitVariant: i,
          onExitComplete: () => {
            a.set(u, !0);
            for (const h of a.values()) if (!h) return;
            r == null || r();
          },
          register: () => (a.set(u, !1), () => a.delete(u)),
        }),
        l ? void 0 : [n, o, s]
      );
    return (
      f.useMemo(() => {
        a.forEach((h, m) => a.set(m, !1));
      }, [n]),
      f.useEffect(() => {
        !n && !a.size && (r == null || r());
      }, [n]),
      S.jsx(qs.Provider, { value: d, children: e })
    );
  }
);
function vi() {
  return new Map();
}
const it = (e) => e.key || '';
function bi(e, t) {
  e.forEach((n) => {
    const r = it(n);
    t.set(r, n);
  });
}
function yi(e) {
  const t = [];
  return (
    f.Children.forEach(e, (n) => {
      f.isValidElement(n) && t.push(n);
    }),
    t
  );
}
const tr = ({
  children: e,
  enterVariant: t,
  exitVariant: n,
  enterExitVariant: r,
  initial: o = !0,
  onExitComplete: s,
  exitBeforeEnter: i,
  presenceAffectsLayout: l = !0,
  custom: c,
  passThrough: a,
}) => {
  let u = f.useContext(gi).forceRender ?? pi();
  const d = yi(e),
    h = f.useRef(d),
    m = f.useRef(new Map()).current,
    g = f.useRef(new Set()).current;
  bi(d, m);
  const p = f.useRef(!0);
  if (a) return S.jsx(S.Fragment, { children: e });
  if (
    (ae(() => {
      p.current = !1;
    }, []),
    p.current)
  )
    return S.jsx(S.Fragment, {
      children: d.map((x) =>
        S.jsx(
          wn,
          {
            isPresent: !0,
            enterExitVariant: r,
            exitVariant: n,
            enterVariant: t,
            initial: o ? void 0 : !1,
            presenceAffectsLayout: l,
            custom: c,
            children: x,
          },
          it(x)
        )
      ),
    });
  let v = [...d];
  const w = h.current.map(it),
    y = d.map(it),
    C = w.length;
  for (let x = 0; x < C; x++) {
    const T = w[x];
    y.indexOf(T) === -1 ? g.add(T) : g.delete(T);
  }
  return (
    i && g.size && (v = []),
    g.forEach((x) => {
      if (y.indexOf(x) !== -1) return;
      const T = m.get(x);
      if (!T) return;
      const b = w.indexOf(x),
        I = S.jsx(
          wn,
          {
            isPresent: !1,
            onExitComplete: () => {
              m.delete(x), g.delete(x);
              const P = h.current.findIndex((O) => O.key === x);
              h.current.splice(P, 1),
                g.size || ((h.current = d), u(), s == null || s());
            },
            presenceAffectsLayout: l,
            enterExitVariant: r,
            enterVariant: t,
            exitVariant: n,
            custom: c,
            children: T,
          },
          it(T)
        );
      v.splice(b, 0, I);
    }),
    (v = v.map((x) => {
      const T = x.key;
      return g.has(T)
        ? x
        : S.jsx(
            wn,
            {
              isPresent: !0,
              exitVariant: n,
              enterVariant: t,
              enterExitVariant: r,
              presenceAffectsLayout: l,
              custom: c,
              children: x,
            },
            it(x)
          );
    })),
    (h.current = v),
    S.jsx(S.Fragment, {
      children: g.size ? v : v.map((x) => f.cloneElement(x)),
    })
  );
};
tr.displayName = 'AnimatePresence';
const wr = Symbol(),
  wt = (e, t) => {
    const n = (() => {
      if (e[wr]) {
        const r = L.forwardRef((o, s) => L.createElement(e, { ...o, ref: s }));
        for (const o in e) {
          const s = e[o];
          r[o] = s && typeof s == 'object' ? { ...s } : s;
        }
      }
      return e;
    })();
    return Object.assign(n, t), (n[wr] = !0), n;
  },
  Si = (e) => e();
function Ct({
  prop: e,
  defaultProp: t,
  onChange: n,
  strategy: r = 'prop-wins',
  preventUpdate: o,
  transition: s,
}) {
  const [i, l] = f.useState(e ?? t),
    c = f.useRef(i),
    a = r === 'prop-wins' && e !== void 0,
    u = a ? e : i,
    d = je(n || xi),
    h = s ? Co : Si;
  f.useEffect(() => {
    e !== void 0 &&
      ((c.current = e),
      h(() => {
        l(e);
      }));
  }, [e]),
    f.useEffect(() => {
      a || (i !== c.current && ((c.current = i), d(i)));
    }, [d, i, a]);
  const m = je((g) => {
    if (!o)
      if (a) {
        const p = typeof g == 'function' ? g(c.current) : g;
        d(p);
      } else
        h(() => {
          l(g);
        });
  });
  return [u, m];
}
const xi = () => {},
  wi = { forceClassName: !0, deopt: !0, needsUpdate: () => !0 },
  Ci = { current: new Set(['']) };
function Eo() {
  var e;
  return ((e = Ls(wi, !1, Ci)) == null ? void 0 : e.name) || '';
}
const To = () => L.useContext(mo),
  Io = () => (qn() ? ho : !1);
function Ri(e, t) {
  const [n, r] = Ei(e, {
    ...t,
    noExpand: !0,
    noNormalize: !0,
    resolveValues: 'none',
  });
  return { ...n, ...r };
}
function Ei(e, t) {
  var g;
  const n =
      ((g = t == null ? void 0 : t.forComponent) == null
        ? void 0
        : g.staticConfig) ?? _s.staticConfig,
    [r, o] = js({
      componentName: n.componentName,
      name: 'theme' in e ? e.theme : void 0,
      inverse: 'themeInverse' in e ? e.themeInverse : void 0,
      needsUpdate() {
        return !0;
      },
    }),
    s = L.useContext(mo),
    i = L.useContext(zs),
    {
      state: l,
      disabled: c,
      setStateShallow: a,
    } = Vs(e, s.animationDriver, n, Zn()),
    u = t != null && t.noMedia ? pr : po(),
    d = $s(
      e,
      n,
      r,
      (o == null ? void 0 : o.name) || '',
      l,
      {
        isAnimated: !1,
        mediaState: u,
        noSkip: !0,
        noMergeStyle: !0,
        noClass: !0,
        resolveValues: 'auto',
        ...t,
      },
      null,
      s,
      i
    ),
    { mediaGroups: h, pseudoGroups: m } = d || {};
  return (
    ae(() => {
      if (!c) {
        if (l.unmounted) {
          a({ unmounted: !1 });
          return;
        }
        if (i)
          return Hs({
            groupContext: i,
            setStateShallow: a,
            mediaGroups: h,
            pseudoGroups: m,
          });
      }
    }, [
      c,
      i,
      m ? Object.keys([...m]).join('') : 0,
      h ? Object.keys([...h]).join('') : 0,
    ]),
    [
      (d == null ? void 0 : d.viewProps) || {},
      (d == null ? void 0 : d.style) || {},
      r,
      pr,
    ]
  );
}
const Ti = { shift: 0, bounds: [0] },
  Ii = (e, t) => Po('size', e, t),
  Ao = (e, t) => Po('space', e, t),
  _t = {},
  Cn = {},
  Rn = {},
  En = {},
  Ai = (e, t, n = Ti) => {
    var h, m;
    const r = Jn({ prefixed: !0 })[e];
    if (!(e in _t)) {
      (Rn[e] = []), (_t[e] = []), (En[e] = []), (Cn[e] = []);
      const g = Object.keys(r)
        .map((v) => r[v])
        .sort((v, w) => v.val - w.val);
      for (const v of g) Rn[e].push(v.key), _t[e].push(v);
      const p = g.filter((v) => !v.key.endsWith('.5'));
      for (const v of p) En[e].push(v.key), Cn[e].push(v);
    }
    const o = typeof t == 'string',
      s = (n.excludeHalfSteps ? (o ? En : Cn) : o ? Rn : _t)[e],
      i = ((h = n.bounds) == null ? void 0 : h[0]) ?? 0,
      l = ((m = n.bounds) == null ? void 0 : m[1]) ?? s.length - 1,
      c = s.indexOf(t);
    let a = n.shift || 0;
    a &&
      (t === '$true' || (go(t) && t.name === 'true')) &&
      (a += a > 0 ? 1 : -1);
    const u = Math.min(l, Math.max(i, c + a)),
      d = s[u];
    return (typeof d == 'string' ? r[d] : d) || r.$true;
  },
  Po = Ai,
  Pi = { true: (e, t) => si(t.props.size, t) },
  Oi = (e, { props: t }) => ({
    borderWidth: typeof e == 'number' ? e : 1,
    borderColor: '$borderColor',
    ...(t.hoverTheme && { hoverStyle: { borderColor: '$borderColorHover' } }),
    ...(t.pressTheme && { pressStyle: { borderColor: '$borderColorPress' } }),
    ...(t.focusTheme && { focusStyle: { borderColor: '$borderColorFocus' } }),
  }),
  Mi = {
    true: (e, t) => {
      const { tokens: n, props: r } = t;
      return { padding: n.space[r.size] || n.space.$true };
    },
  },
  ki = {
    true: (e, t) => {
      const { tokens: n, props: r } = t;
      return { borderRadius: n.radius[r.size] || n.radius.$true };
    },
  },
  Cr = { borderRadius: 1e5, padding: 0 },
  Fi = {
    true: (e, { props: t, tokens: n }) => {
      if (!('size' in t)) return Cr;
      const r = typeof t.size == 'number' ? t.size : n.size[t.size];
      return {
        ...Cr,
        width: r,
        height: r,
        maxWidth: r,
        maxHeight: r,
        minWidth: r,
        minHeight: r,
      };
    },
  },
  Ni = {
    true: {
      hoverStyle: {
        backgroundColor: '$backgroundHover',
        borderColor: '$borderColorHover',
      },
    },
    false: {},
  },
  Di = {
    true: {
      cursor: 'pointer',
      pressStyle: {
        backgroundColor: '$backgroundPress',
        borderColor: '$borderColorPress',
      },
    },
    false: {},
  },
  Li = {
    true: {
      focusStyle: {
        backgroundColor: '$backgroundFocus',
        borderColor: '$borderColorFocus',
      },
    },
    false: {},
  },
  gt = {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    shadowColor: 'transparent',
    hoverStyle: { borderColor: 'transparent' },
  },
  _i = {
    backgrounded: { true: { backgroundColor: '$background' } },
    radiused: ki,
    hoverTheme: Ni,
    pressTheme: Di,
    focusTheme: Li,
    circular: Fi,
    padded: Mi,
    elevate: Pi,
    bordered: Oi,
    transparent: { true: { backgroundColor: 'transparent' } },
    chromeless: {
      true: gt,
      all: { ...gt, hoverStyle: gt, pressStyle: gt, focusStyle: gt },
    },
  },
  rn = me(At, { variants: _i }),
  on = (e = '$true', { font: t, fontFamily: n, props: r }) => {
    var m, g, p, v, w, y;
    if (!t) return { fontSize: e };
    const o = e === '$true' ? ji(t) : e,
      s = {},
      i = t.size[o],
      l = (m = t.lineHeight) == null ? void 0 : m[o],
      c = (g = t.weight) == null ? void 0 : g[o],
      a = (p = t.letterSpacing) == null ? void 0 : p[o],
      u = (v = t.transform) == null ? void 0 : v[o],
      d = r.fontStyle ?? ((w = t.style) == null ? void 0 : w[o]),
      h = r.color ?? ((y = t.color) == null ? void 0 : y[o]);
    return (
      d && (s.fontStyle = d),
      u && (s.textTransform = u),
      n && (s.fontFamily = n),
      c && (s.fontWeight = c),
      a && (s.letterSpacing = a),
      i && (s.fontSize = i),
      l && (s.lineHeight = l),
      h && (s.color = h),
      s
    );
  };
me(vo, {
  name: 'SizableText',
  fontFamily: '$body',
  variants: { size: { '...fontSize': on } },
  defaultVariants: { size: '$true' },
});
const Tn = new WeakMap();
function ji(e) {
  if (typeof e == 'object' && Tn.has(e)) return Tn.get(e);
  const t = '$true' in e.size ? e.size : Jn().size,
    n = t.$true,
    r = n
      ? Object.keys(t).find((o) => o !== '$true' && t[o].val === n.val)
      : null;
  return !n || !r ? Object.keys(e.size)[3] : (Tn.set(e, r), r);
}
var zi = {};
const ht = me(vo, {
  name: 'SizableText',
  fontFamily: '$body',
  variants: {
    unstyled: { false: { size: '$true', color: '$color' } },
    size: on,
  },
  defaultVariants: { unstyled: zi.TAMAGUI_HEADLESS === '1' },
});
ht.staticConfig.variants.fontFamily = {
  '...': (e, t) => {
    const n = t.props.size,
      r = t.props.fontSize,
      o = n === '$true' && r ? r : t.props.size || '$true';
    return on(o, t);
  },
};
const Vi = me(ht, {
  name: 'Paragraph',
  tag: 'p',
  userSelect: 'auto',
  color: '$color',
  size: '$true',
  whiteSpace: 'normal',
});
function $i(e, t, n) {
  const {
    children: r,
    textProps: o,
    size: s,
    noTextWrap: i,
    color: l,
    fontFamily: c,
    fontSize: a,
    fontWeight: u,
    letterSpacing: d,
    textAlign: h,
    fontStyle: m,
    maxFontSizeMultiplier: g,
  } = t;
  if (i || !r) return [r];
  const p = { ...n };
  return (
    l && (p.color = l),
    c && (p.fontFamily = c),
    a && (p.fontSize = a),
    u && (p.fontWeight = u),
    d && (p.letterSpacing = d),
    h && (p.textAlign = h),
    s && (p.size = s),
    m && (p.fontStyle = m),
    g && (p.maxFontSizeMultiplier = g),
    L.Children.toArray(r).map((v, w) =>
      typeof v == 'string' ? S.jsx(e, { ...p, ...o, children: v }, w) : v
    )
  );
}
const Oo = ({ children: e, zIndex: t }) => {
    const n = f.useContext(vr);
    let r = S.jsx(vr.Provider, { value: n + 1, children: e });
    return (
      typeof t < 'u' && (r = S.jsx(Zs.Provider, { value: t, children: r })), r
    );
  },
  Hi = (e) => {
    !e.hostName && !e.passThrough && console.warn('No hostName');
    const t = Js.get(e.hostName || ''),
      [n, r] = f.useState(t);
    return (
      !e.passThrough && t && n !== t && r(t),
      ae(() => {
        var s, i;
        if (!e.hostName || n) return;
        const o = (l) => {
          r(l);
        };
        return (
          (s = xn)[(i = e.hostName)] || (s[i] = new Set()),
          xn[e.hostName].add(o),
          () => {
            var l;
            (l = xn[e.hostName]) == null || l.delete(o);
          }
        );
      }, [n]),
      e.passThrough ? e.children : n ? He.createPortal(e.children, n) : null
    );
  },
  Mo = It({
    Contents: null,
    scopeName: '',
    portalName: '',
    platform: null,
    setPlatform: (e) => {},
    when: null,
    setChildren: null,
    setWhen: () => {},
  }),
  Gt = f.createContext(''),
  Wi = ({ children: e, ...t }) => {
    const n = t.scopeName || '',
      r = f.useContext(Gt);
    return S.jsx(Gt.Provider, {
      value: r || t.lastScope || '',
      children: S.jsx(Mo.Provider, {
        scope: n,
        lastScope: r || t.lastScope,
        ...t,
        children: e,
      }),
    });
  },
  sn = (e) => {
    const t = f.useContext(Gt),
      n = e ?? t;
    return Mo.useStyledContext(n);
  },
  vt = new Map(),
  Ui = ({ children: e, Contents: t, scope: n, portal: r }) => {
    const o = f.useId(),
      s = `AdaptPortal${n}${o}`,
      i = f.useMemo(() => {
        if (t) return t;
        if (vt.has(s)) return vt.get(s);
        const m = () =>
          S.jsx(
            Qs,
            {
              name: s,
              forwardProps:
                typeof r == 'boolean' || r == null ? void 0 : r.forwardProps,
            },
            o
          );
        return vt.set(s, m), m;
      }, [s, t]);
    ae(
      () => (
        vt.set(s, i),
        () => {
          vt.delete(s);
        }
      ),
      [s]
    );
    const [l, c] = L.useState(null),
      [a, u] = L.useState(null),
      [d, h] = L.useState(null);
    return S.jsx(Gt.Provider, {
      value: n,
      children: S.jsx(Wi, {
        Contents: i,
        when: l,
        platform: a,
        setPlatform: u,
        setWhen: c,
        setChildren: h,
        portalName: s,
        scopeName: n,
        children: e,
      }),
    });
  },
  ko = ({ scope: e, ...t }) => {
    const n = sn(e);
    if (!(n != null && n.Contents))
      throw new Error('tamagui.dev/docs/intro/errors#warning-002');
    return L.createElement(n.Contents, { ...t, key: 'stable' });
  };
ko.shouldForwardSpace = !0;
const Bi = wt(
    function (e) {
      const { platform: t, when: n, children: r, scope: o } = e,
        s = sn(o),
        i = Fo(e);
      ae(() => {
        var c, a;
        (c = s == null ? void 0 : s.setWhen) == null || c.call(s, n || i),
          (a = s == null ? void 0 : s.setPlatform) == null ||
            a.call(s, t || null);
      }, [n, t, i, s.setWhen, s.setPlatform]),
        ae(
          () => () => {
            var c, a;
            (c = s == null ? void 0 : s.setWhen) == null || c.call(s, null),
              (a = s == null ? void 0 : s.setPlatform) == null ||
                a.call(s, null);
          },
          []
        );
      let l;
      if (typeof r == 'function') {
        const c = s == null ? void 0 : s.Contents;
        l = r(c ? S.jsx(c, {}) : null);
      } else l = r;
      return (
        ae(() => {
          typeof r == 'function' &&
            l !== void 0 &&
            (s == null || s.setChildren(l));
        }, [l]),
        S.jsx(Oo, { children: i ? l : null })
      );
    },
    { Contents: ko }
  ),
  Ki = (e) => {
    const t = Pt(e.scope),
      { portalName: n } = sn(e.scope);
    return S.jsx(Hi, { passThrough: !t, hostName: n, children: e.children });
  },
  Fo = ({ when: e, platform: t }) => {
    const n = po();
    if (e == null && t == null) return !1;
    if (e === !0) return !0;
    let r = !1;
    return (
      t === 'touch'
        ? (r = ho)
        : t === 'native'
          ? (r = !Yt)
          : t === 'web'
            ? (r = Yt)
            : t === 'ios'
              ? (r = bo)
              : t === 'android' && (r = Ws),
      t && r == !1 ? !1 : (e && typeof e == 'string' && (r = n[e]), r)
    );
  },
  Pt = (e) => {
    const t = sn(e);
    return Fo(t);
  };
function Mu(e, t) {
  const n = f.createContext(t);
  function r(s) {
    const { children: i, ...l } = s,
      c = f.useMemo(() => l, Object.values(l));
    return S.jsx(n.Provider, { value: c, children: i });
  }
  function o(s) {
    const i = f.useContext(n);
    if (i) return i;
    if (t !== void 0) return t;
    throw new Error(`\`${s}\` must be used within \`${e}\``);
  }
  return [r, o];
}
function No(e, t = []) {
  let n = [];
  function r(s, i) {
    const l = f.createContext(i),
      c = n.length;
    n = [...n, i];
    function a(d) {
      var w;
      const { scope: h, children: m, ...g } = d,
        p = ((w = h == null ? void 0 : h[e]) == null ? void 0 : w[c]) || l,
        v = f.useMemo(() => g, Object.values(g));
      return S.jsx(p.Provider, { value: v, children: m });
    }
    function u(d, h, m) {
      var w;
      const g = ((w = h == null ? void 0 : h[e]) == null ? void 0 : w[c]) || l,
        p = f.useContext(g);
      if (p) return p;
      if (i !== void 0) return i;
      const v = `\`${d}\` must be used within \`${s}\``;
      if (m != null && m.fallback)
        return (
          (m == null ? void 0 : m.warn) !== !1 && console.warn(v), m.fallback
        );
      throw new Error(v);
    }
    return [a, u];
  }
  const o = () => {
    const s = n.map((i) => f.createContext(i));
    return function (i) {
      const l = (i == null ? void 0 : i[e]) || s;
      return f.useMemo(() => ({ [`__scope${e}`]: { ...i, [e]: l } }), [i, l]);
    };
  };
  return (o.scopeName = e), [r, Yi(o, ...t)];
}
function Yi(...e) {
  const t = e[0];
  if (e.length === 1) return t;
  const n = () => {
    const r = e.map((o) => ({ useScope: o(), scopeName: o.scopeName }));
    return function (o) {
      const s = r.reduce((i, { useScope: l, scopeName: c }) => {
        const a = l(o)[`__scope${c}`];
        return { ...i, ...a };
      }, {});
      return f.useMemo(() => ({ [`__scope${t.scopeName}`]: s }), [s]);
    };
  };
  return (n.scopeName = t.scopeName), n;
}
class nr extends Error {
  constructor(t = '') {
    super(t), (this.name = 'AbortError');
  }
}
function Gi(e, t = []) {
  Xi(f.useEffect, e, t);
}
function Xi(e, t, n = []) {
  e(() => {
    const r = new AbortController(),
      o = r.signal;
    try {
      const i = t(o, ...n);
      Promise.resolve(i)
        .then(async (l) => {
          if (l && typeof l == 'function') {
            if (o.aborted) return l();
            o.addEventListener('abort', l);
          }
        })
        .catch(s);
    } catch (i) {
      s(i);
    }
    function s(i) {
      if (i instanceof nr || (typeof i == 'object' && i.name === 'AbortError'))
        return null;
      throw i;
    }
    return () => {
      o.aborted || r.abort();
    };
  }, n);
}
const jt = async (e, t) => {
    await new Promise((n) => setTimeout(n, e)), t == null || t.aborted;
  },
  qi =
    typeof requestIdleCallback > 'u'
      ? (e) => setTimeout(e, 1)
      : requestIdleCallback,
  Zi = () =>
    new Promise((e) => {
      qi(e);
    }),
  Do = async (e, t) => {
    const { max: n, min: r, fully: o } = t || {},
      s = o ? Ji : Zi;
    if (
      (n && r && r < n
        ? await Promise.race([Promise.all([s(), jt(r)]), jt(n)])
        : n
          ? await Promise.race([s(), jt(n)])
          : r
            ? await Promise.all([s(), jt(r)])
            : await s(),
      e == null ? void 0 : e.aborted)
    )
      throw new nr();
  },
  Ji = async (e) => {
    for (;;) {
      const t = Date.now();
      if ((await Do(e), Date.now() - t < 15)) break;
      if (e != null && e.aborted) throw new nr();
    }
  },
  Lo = 'FocusScopeController',
  [Qi, ku] = No(Lo),
  [el, tl] = Qi(Lo);
function nl(e) {
  const {
      __scopeFocusScope: t,
      children: n,
      enabled: r,
      loop: o,
      trapped: s,
      onMountAutoFocus: i,
      onUnmountAutoFocus: l,
      forceUnmount: c,
      focusOnIdle: a,
    } = e,
    u = je(i),
    d = je(l),
    h = f.useMemo(
      () => ({
        enabled: r,
        loop: o,
        trapped: s,
        onMountAutoFocus: u,
        onUnmountAutoFocus: d,
        forceUnmount: c,
        focusOnIdle: a,
      }),
      [r, o, s, u, d, c, a]
    );
  return S.jsx(el, { scope: t, ...h, children: n });
}
const rl = nl,
  In = 'focusScope.autoFocusOnMount',
  An = 'focusScope.autoFocusOnUnmount',
  Rr = { bubbles: !1, cancelable: !0 },
  ol = f.forwardRef(function ({ __scopeFocusScope: e, ...t }, n) {
    const r = tl('FocusScope', e, { warn: !1, fallback: {} }),
      o = {
        ...t,
        enabled: r.enabled ?? t.enabled,
        loop: r.loop ?? t.loop,
        trapped: r.trapped ?? t.trapped,
        onMountAutoFocus: r.onMountAutoFocus ?? t.onMountAutoFocus,
        onUnmountAutoFocus: r.onUnmountAutoFocus ?? t.onUnmountAutoFocus,
        forceUnmount: r.forceUnmount ?? t.forceUnmount,
        focusOnIdle: r.focusOnIdle ?? t.focusOnIdle,
      },
      s = sl(o, n);
    return typeof o.children == 'function'
      ? S.jsx(S.Fragment, { children: o.children(s) })
      : f.cloneElement(f.Children.only(o.children), s);
  });
function sl(e, t) {
  const {
      loop: n = !1,
      enabled: r = !0,
      trapped: o = !1,
      onMountAutoFocus: s,
      onUnmountAutoFocus: i,
      forceUnmount: l,
      focusOnIdle: c = !0,
      children: a,
      ...u
    } = e,
    [d, h] = f.useState(null),
    m = je(s),
    g = je(i),
    p = f.useRef(null),
    v = f.useCallback(
      (b) => {
        Co(() => {
          h(b);
        });
      },
      [h]
    ),
    w = _e(t, v),
    y = f.useRef({
      paused: !1,
      pause() {
        this.paused = !0;
      },
      resume() {
        this.paused = !1;
      },
    }).current;
  f.useEffect(() => {
    if (!r || !o) return;
    const b = new AbortController();
    function I(E) {
      if (y.paused || !d) return;
      const N = E.target;
      d.contains(N)
        ? (N == null || N.addEventListener('blur', O, { signal: b.signal }),
          (p.current = N))
        : Je(p.current, { select: !0 });
    }
    function P(E) {
      b.abort(),
        !(y.paused || !d) &&
          (d.contains(E.relatedTarget) || Je(p.current, { select: !0 }));
    }
    function O() {
      p.current = d;
    }
    return (
      document.addEventListener('focusin', I),
      document.addEventListener('focusout', P),
      () => {
        b.abort(),
          document.removeEventListener('focusin', I),
          document.removeEventListener('focusout', P);
      }
    );
  }, [o, l, d, y.paused]),
    Gi(
      async (b) => {
        if (!r || !d || l) return;
        Tr.add(y);
        const I = document.activeElement;
        if (!d.contains(I)) {
          const P = new CustomEvent(In, Rr);
          if (
            (d.addEventListener(In, m), d.dispatchEvent(P), !P.defaultPrevented)
          ) {
            c &&
              (await Do(
                b,
                typeof c == 'object'
                  ? c
                  : { max: 200, min: typeof c == 'number' ? c : 16 }
              ));
            const O = _o(d),
              E = ul(O).filter((N) => !jo(N, { upTo: d }));
            il(E, { select: !0 }),
              E.length > 0 ? (p.current = E[0]) : (p.current = d),
              document.activeElement === I && E.length === 0 && Je(d);
          }
        }
        return () => {
          d.removeEventListener(In, m);
          const P = new CustomEvent(An, Rr);
          d.addEventListener(An, g),
            d.dispatchEvent(P),
            P.defaultPrevented || Je(I ?? document.body, { select: !0 }),
            d.removeEventListener(An, g),
            Tr.remove(y);
        };
      },
      [r, d, l, m, g, y, c]
    );
  const C = f.useCallback(
    (b) => {
      if (!o || !n || y.paused || !r || !d) return;
      const I = b.key === 'Tab' && !b.altKey && !b.ctrlKey && !b.metaKey,
        P = document.activeElement;
      if (I && P) {
        const [O, E] = ll(d);
        O && E
          ? !b.shiftKey && P === E
            ? (b.preventDefault(), n && Je(O, { select: !0 }))
            : b.shiftKey &&
              P === O &&
              (b.preventDefault(), n && Je(E, { select: !0 }))
          : P === d && b.preventDefault();
      }
    },
    [n, o, y.paused, r, d]
  );
  f.useEffect(() => {
    if (!d || !o || !n || !r) return;
    const b = (I) => {
      I.key === 'Tab' && C(I);
    };
    return (
      d.addEventListener('keydown', b, !0),
      () => {
        d.removeEventListener('keydown', b, !0);
      }
    );
  }, [d, o, n, r, C]);
  const x = u.onKeyDown,
    T = f.useCallback(
      (b) => {
        x == null || x(b);
      },
      [x]
    );
  return { ...u, ref: w, onKeyDown: T };
}
function il(e, { select: t = !1 } = {}) {
  const n = document.activeElement;
  for (const r of e)
    if ((Je(r, { select: t }), document.activeElement !== n)) return;
}
function ll(e) {
  const t = _o(e),
    n = Er(t, e),
    r = Er(t.reverse(), e);
  return [n, r];
}
function _o(e) {
  const t = [],
    n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
      acceptNode: (r) => {
        const o = r.tagName === 'INPUT' && r.type === 'hidden';
        return r.disabled || r.hidden || o
          ? NodeFilter.FILTER_SKIP
          : r.tabIndex >= 0
            ? NodeFilter.FILTER_ACCEPT
            : NodeFilter.FILTER_SKIP;
      },
    });
  for (; n.nextNode(); ) t.push(n.currentNode);
  return t;
}
function Er(e, t) {
  for (const n of e) if (!jo(n, { upTo: t })) return n;
}
function jo(e, { upTo: t }) {
  if (getComputedStyle(e).visibility === 'hidden') return !0;
  for (; e; ) {
    if (t !== void 0 && e === t) return !1;
    if (getComputedStyle(e).display === 'none') return !0;
    e = e.parentElement;
  }
  return !1;
}
function al(e) {
  return e instanceof HTMLInputElement && 'select' in e;
}
function Je(e, { select: t = !1 } = {}) {
  if (e != null && e.focus) {
    const n = document.activeElement;
    try {
      e.focus({ preventScroll: !0 }), e !== n && al(e) && t && e.select();
    } catch {}
  }
}
const Tr = cl();
function cl() {
  let e = [];
  return {
    add(t) {
      const n = e[0];
      t !== n && (n == null || n.pause()), (e = Ir(e, t)), e.unshift(t);
    },
    remove(t) {
      var n;
      (e = Ir(e, t)), (n = e[0]) == null || n.resume();
    },
  };
}
function Ir(e, t) {
  const n = [...e],
    r = n.indexOf(t);
  return r !== -1 && n.splice(r, 1), n;
}
function ul(e) {
  return e.filter((t) => t.tagName !== 'A');
}
const fl = () =>
    typeof window < 'u' && !!window.document && !!window.document.createElement,
  dl = (e) => {
    f.useEffect(() => {
      if (!e || !fl()) return;
      const t = document.documentElement,
        n = {
          scrollbarGutter: t.style.scrollbarGutter,
          overflow: t.style.overflow,
        };
      return (
        (t.style.scrollbarGutter = 'stable'),
        (t.style.overflow = 'hidden'),
        () => {
          Object.assign(t.style, n);
        }
      );
    }, [e]);
  },
  ml = (e) => (dl(!!e.enabled), e.children),
  ln = 'Sheet',
  zo = 'SheetHandle',
  Vo = 'SheetOverlay',
  [hl, Fu] = No(ln),
  [pl, Ut] = hl(ln, {}),
  Ar = L.createContext({ zIndex: 1e5 }),
  gl = L.createContext(null);
function Pr(e, t, n = 25) {
  if (e >= t) return e;
  const r = t - e,
    o = Math.sqrt(r) * 2;
  return t - o;
}
const $o = () => {
    const e = L.useContext(Ho),
      t = e == null ? void 0 : e.hidden,
      n = t && (e == null ? void 0 : e.open);
    return {
      controller: e,
      isHidden: t,
      isShowingNonSheet: n,
      disableDrag: e == null ? void 0 : e.disableDrag,
    };
  },
  Ho = L.createContext(null),
  vl = (e) => {
    const { isHidden: t, controller: n } = $o(),
      r = (l) => {
        var c, a;
        (c = n == null ? void 0 : n.onOpenChange) == null || c.call(n, l),
          (a = e.onOpenChange) == null || a.call(e, l);
      },
      o = e.preferAdaptParentOpenState
        ? ((n == null ? void 0 : n.open) ?? e.open)
        : (e.open ?? (n == null ? void 0 : n.open)),
      [s, i] = Ct({
        prop: o,
        defaultProp: e.defaultOpen ?? !1,
        onChange: r,
        strategy: 'most-recent-wins',
      });
    return { open: s, setOpen: i, isHidden: t, controller: n };
  };
function bl(e, t, n = {}) {
  const r = L.useRef(null),
    o = L.useRef(null),
    [s, i] = L.useState(0),
    [l, c] = L.useState(0),
    a = e.snapPointsMode ?? 'percent',
    u =
      e.snapPoints ??
      (a === 'percent' ? [80] : a === 'constant' ? [256] : ['fit']),
    d = u[0] === 'fit',
    h = L.useMemo(
      () => (e.dismissOnSnapToBottom ? [...u, 0] : u),
      [JSON.stringify(u), e.dismissOnSnapToBottom]
    ),
    [m, g] = Ct({
      prop: e.position,
      defaultProp: e.defaultPosition || (t.open ? 0 : -1),
      onChange: e.onPositionChange,
      strategy: 'most-recent-wins',
    }),
    p = t.open === !1 ? -1 : m,
    { open: v } = t,
    w = L.useCallback(
      (I) => {
        e.dismissOnSnapToBottom && I === h.length - 1 ? t.setOpen(!1) : g(I);
      },
      [e.dismissOnSnapToBottom, h.length, g, t.setOpen]
    );
  v && e.dismissOnSnapToBottom && p === h.length - 1 && g(0);
  const y = v && p < 0;
  L.useEffect(() => {
    y && w(0);
  }, [w, y]);
  const { animationDriver: C } = To();
  if (!C) throw new Error('❌ 008');
  const x = Ro(() => {
      const I = new Set(),
        P = {
          hasScrollableContent: !1,
          enabled: !1,
          y: 0,
          paneY: 0,
          paneMinY: 0,
          scrollStartY: -1,
          drag: () => {},
          release: () => {},
          scrollLock: !1,
          isParentDragging: !1,
          onParentDragging: (O) => (
            I.add(O),
            () => {
              I.delete(O);
            }
          ),
          setParentDragging: (O) => {
            O !== P.isParentDragging &&
              ((P.isParentDragging = O), I.forEach((E) => E(O)));
          },
        };
      return P;
    }),
    T = e.forceRemoveScrollEnabled ?? (v && e.modal),
    b = h[0];
  return {
    screenSize:
      a === 'percent' ? s / ((typeof b == 'number' ? b : 100) / 100) : l,
    maxSnapPoint: b,
    removeScrollEnabled: T,
    scrollBridge: x,
    modal: !!e.modal,
    open: t.open,
    setOpen: t.setOpen,
    hidden: !!t.isHidden,
    contentRef: o,
    handleRef: r,
    frameSize: s,
    setFrameSize: i,
    dismissOnOverlayPress: e.dismissOnOverlayPress ?? !0,
    dismissOnSnapToBottom: e.dismissOnSnapToBottom ?? !1,
    onOverlayComponent: n.onOverlayComponent,
    scope: e.__scopeSheet,
    hasFit: d,
    position: p,
    snapPoints: h,
    snapPointsMode: a,
    setMaxContentSize: c,
    setPosition: w,
    setPositionImmediate: g,
    onlyShowFrame: !1,
  };
}
const Pn = 10000.1;
let bt = null;
const Or = 'window',
  yl = L.forwardRef(function (e, t) {
    const n = L.useContext(Ar),
      {
        animation: r,
        animationConfig: o,
        modal: s = !1,
        zIndex: i = n.zIndex + 1,
        moveOnKeyboardChange: l = !1,
        unmountChildrenWhenHidden: c = !1,
        portalProps: a,
        containerComponent: u = L.Fragment,
      } = e,
      d = vl(e),
      [h, m] = L.useState(null),
      g = bl(e, d, { onOverlayComponent: m }),
      {
        frameSize: p,
        setFrameSize: v,
        snapPoints: w,
        snapPointsMode: y,
        hasFit: C,
        position: x,
        setPosition: T,
        scrollBridge: b,
        screenSize: I,
        setMaxContentSize: P,
        maxSnapPoint: O,
      } = g,
      { open: E, controller: N, isHidden: U } = d,
      B = L.useRef(void 0),
      F = _e(t, B, g.contentRef),
      { animationDriver: R } = To();
    if (!R) throw new Error('Sheet reqiures an animation driver to be set');
    const $ = (() => {
        if (R.supportsCSS) return {};
        const [G, Q] = r ? (Array.isArray(r) ? r : [r]) : [];
        return o ?? (G ? { ...R.animations[G], ...Q } : null);
      })(),
      [D, A] = L.useState(!1),
      M = L.useContext(gl);
    L.useCallback((G) => {
      A(G);
    }, []);
    const k = L.useMemo(() => w.map((G) => Sl(y, G, I, p)), [I, p, w, y]),
      {
        useAnimatedNumber: X,
        useAnimatedNumberStyle: _,
        useAnimatedNumberReaction: q,
      } = R,
      ee = R.View ?? Qn;
    ae(() => {
      if (M && E)
        return (
          M(!0),
          () => {
            M(!1);
          }
        );
    }, [M, E]);
    const Ce = L.useMemo(() => ({ zIndex: i }), [i]),
      ne = qn() && I ? I : Pn,
      se = X(ne),
      ce = L.useRef(ne),
      Re = ce.current === Pn,
      [K, V] = f.useState(Re),
      Y = L.useRef(!1);
    q(
      { value: se, hostRef: B },
      L.useCallback(
        (G) => {
          (ce.current = G), (b.paneY = G);
        },
        [R]
      )
    );
    function W() {
      se.stop(),
        b.onFinishAnimate &&
          (b.onFinishAnimate(), (b.onFinishAnimate = void 0));
    }
    const H = je((G) => {
        if (p === 0) return;
        let Q = U || G === -1 ? I : k[G];
        ce.current !== Q &&
          ((ce.current = Q), W(), se.setValue(Q, { type: 'spring', ...$ }));
      }),
      ie = !(K || !p || !I || U || (Re && !E));
    ae(() => {
      Re &&
        I &&
        p &&
        ((ce.current = I),
        se.setValue(I, { type: 'timing', duration: 0 }, () => {
          setTimeout(() => {
            V(!1);
          }, 10);
        }));
    }, [Re, I, p]),
      ae(() => {
        ie && (H(x), x === -1 && ((b.scrollLock = !1), (b.scrollStartY = -1)));
      }, [ie, x]);
    const le = e.disableDrag ?? (N == null ? void 0 : N.disableDrag),
      ge = Eo(),
      [ve, J] = L.useState(!1),
      te = L.useMemo(() => {
        if (le || !p || D) return;
        const G = k[0];
        b.paneMinY = G;
        let Q = ce.current;
        function ye(xe) {
          J(xe),
            mt &&
              (bt ||
                ((bt = document.createElement('style')),
                typeof document.head < 'u' && document.head.appendChild(bt)),
              xe
                ? (bt.innerText =
                    ':root * { user-select: none !important; -webkit-user-select: none !important; }')
                : (bt.innerText = ''));
        }
        const qe = ({ vy: xe, dragAt: Ie }) => {
            if ((b.setParentDragging(!1), b.scrollLock)) return;
            (Oe = !1), ye(!1);
            const Ne = Ie + Q + p * xe * 0.2;
            let Me = 0,
              Dt = Number.POSITIVE_INFINITY;
            for (let ot = 0; ot < k.length; ot++) {
              const pt = k[ot],
                hr = Ne > pt ? Ne - pt : pt - Ne;
              hr < Dt && ((Dt = hr), (Me = ot));
            }
            T(Me), H(Me);
          },
          rt = (xe, Ie) => {
            qe({ vy: Ie.vy, dragAt: Ie.dy });
          },
          Nt = (xe, { dy: Ie }) => {
            function Ne() {
              if (xe.target === g.handleRef.current) return !0;
              if (b.hasScrollableContent === !0) {
                if (b.scrollLock) return !1;
                const Dt = b.y !== 0,
                  ot = Ie < 0,
                  pt = b.paneY - 5 <= b.paneMinY;
                if (Dt || (pt && Y.current && ot)) return !1;
              }
              return Math.abs(Ie) > 10;
            }
            const Me = Ne();
            return Me && b.setParentDragging(!0), Me;
          },
          Ze = () => {
            ye(!0), W(), (Q = ce.current);
          };
        let Oe = !1;
        return (
          (b.drag = (xe) => {
            Oe || ((Oe = !0), Ze());
            const Ie = xe + Q;
            se.setValue(Pr(Ie, G), { type: 'direct' });
          }),
          (b.release = qe),
          st.create({
            onMoveShouldSetPanResponder: Nt,
            onPanResponderGrant: Ze,
            onPanResponderMove: (xe, { dy: Ie }) => {
              const Ne = Ie + Q,
                Me = Pr(Ne, G);
              Me <= G ? b.setParentDragging(!1) : b.setParentDragging(!0),
                se.setValue(Me, { type: 'direct' });
            },
            onPanResponderEnd: rt,
            onPanResponderTerminate: rt,
            onPanResponderRelease: rt,
          })
        );
      }, [le, D, H, p, k, T]),
      Te = L.useCallback((G) => {
        var ye;
        const Q = Math.min(
          (ye = G.nativeEvent) == null ? void 0 : ye.layout.height,
          br.get(Or).height
        );
        Q && v(Q);
      }, []),
      j = L.useCallback((G) => {
        var ye;
        const Q = Math.min(
          (ye = G.nativeEvent) == null ? void 0 : ye.layout.height,
          br.get(Or).height
        );
        Q && P(Q);
      }, []),
      Z = _(se, (G) => {
        'worklet';
        return { transform: [{ translateY: p === 0 ? Pn : G }] };
      });
    L.useRef(null), L.useEffect(() => {}, [l, k, x, U]);
    const [z, re] = L.useState(E ? 1 : 0);
    E && z === 0 && re(1),
      L.useEffect(() => {
        if (!E) {
          const G = setTimeout(() => {
            re(0);
          }, 400);
          return () => {
            clearTimeout(G);
          };
        }
      }, [E]);
    const oe = C ? void 0 : y === 'percent' ? `${O}dvh` : O,
      ue = L.useCallback((G) => {
        Y.current = G;
      }, []);
    let Be = S.jsx(Ar.Provider, {
      value: Ce,
      children: S.jsxs(pl, {
        ...g,
        setHasScrollView: ue,
        children: [
          S.jsx(tr, { custom: { open: E }, children: E ? h : null }),
          y !== 'percent' &&
            S.jsx(li, {
              style: {
                opacity: 0,
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                pointerEvents: 'none',
              },
              onLayout: j,
            }),
          S.jsx(ee, {
            ref: F,
            ...(te == null ? void 0 : te.panHandlers),
            onLayout: Te,
            animation: ve || K ? null : r,
            disableClassName: !0,
            style: [
              {
                position: 'absolute',
                zIndex: i,
                width: '100%',
                height: oe,
                minHeight: oe,
                opacity: z,
                ...(!E && { pointerEvents: 'none' }),
              },
              Z,
            ],
            children: e.children,
          }),
        ],
      }),
    });
    const nt = c ? !!z : !0;
    return s
      ? S.jsx(ei, {
          stackZIndex: i,
          ...a,
          children:
            nt &&
            S.jsx(u, {
              children: S.jsx(yo, {
                contain: !0,
                forceClassName: !0,
                name: ge,
                children: Be,
              }),
            }),
        })
      : Be;
  });
function Sl(e, t, n, r) {
  if (!n || !r) return 0;
  if (e === 'mixed') {
    if (typeof t == 'number') return n - Math.min(n, Math.max(0, t));
    if (t === 'fit') return n - Math.min(n, r);
    if (t.endsWith('%')) {
      const s = Math.min(100, Math.max(0, Number(t.slice(0, -1)))) / 100;
      return Number.isNaN(s)
        ? (console.warn('Invalid snapPoint percentage string'), 0)
        : Math.round(n - s * n);
    }
    return console.warn('Invalid snapPoint unknown value'), 0;
  }
  if (e === 'fit') return t === 0 ? n : n - Math.min(n, r);
  if (e === 'constant' && typeof t == 'number')
    return n - Math.min(n, Math.max(0, t));
  const o = Math.min(100, Math.max(0, Number(t))) / 100;
  return Number.isNaN(o)
    ? (console.warn('Invalid snapPoint percentage'), 0)
    : Math.round(n - o * n);
}
const xl = me(
    ti,
    {
      name: 'ScrollView',
      scrollEnabled: !0,
      variants: { fullscreen: { true: ii } },
    },
    { accept: { contentContainerStyle: 'style' } }
  ),
  wl = 'SheetScrollView',
  Cl = L.forwardRef(
    (
      { __scopeSheet: e, children: t, onScroll: n, scrollEnabled: r, ...o },
      s
    ) => {
      const i = Ut(wl, e),
        { scrollBridge: l, setHasScrollView: c } = i,
        [a, u] = Ct({ prop: r, defaultProp: !0 }),
        d = L.useRef(null),
        h = (T) => {
          var b, I;
          (I = (b = d.current) == null ? void 0 : b.setNativeProps) == null ||
            I.call(b, { scrollEnabled: T }),
            u(T);
        },
        m = L.useRef({
          lastPageY: 0,
          dragAt: 0,
          dys: [],
          isScrolling: !1,
          isDraggingScrollArea: !1,
        });
      f.useEffect(
        () => (
          c(!0),
          () => {
            c(!1);
          }
        ),
        []
      );
      const g = () => {
          if (!m.current.isDraggingScrollArea) return;
          (m.current.isDraggingScrollArea = !1),
            (l.scrollStartY = -1),
            (l.scrollLock = !1),
            (m.current.isScrolling = !1),
            h(!0);
          let T = 0;
          if (m.current.dys.length) {
            const b = m.current.dys.slice(-10);
            T =
              ((b.length ? b.reduce((I, P) => I + P, 0) : 0) / b.length) * 0.04;
          }
          (m.current.dys = []), l.release({ dragAt: m.current.dragAt, vy: T });
        },
        p = a;
      f.useEffect(() => {
        var P;
        if (!mt || !d.current) return;
        const T = new AbortController(),
          b = (P = d.current) == null ? void 0 : P.getScrollableNode();
        if (!b) return;
        b.addEventListener(
          'touchmove',
          (O) => {
            l.isParentDragging && b.scrollTo({ top: l.y, behavior: 'instant' });
          },
          { signal: T.signal, passive: !1 }
        );
        const I = l.onParentDragging((O) => {});
        return () => {
          I(), T.abort();
        };
      }, [d]);
      const [v, w] = f.useState(!0),
        y = f.useRef(0),
        C = f.useRef(0),
        x = () => {
          y.current && C.current && w(C.current > y.current);
        };
      return (
        f.useEffect(() => {
          l.hasScrollableContent = v;
        }, [v]),
        S.jsxs(xl, {
          onLayout: (T) => {
            (y.current = Math.ceil(T.nativeEvent.layout.height)), x();
          },
          ref: Us(d, s),
          flex: 1,
          scrollEventThrottle: 8,
          onResponderRelease: g,
          className: '_ovs-contain',
          scrollEnabled: p,
          onScroll: (T) => {
            const { y: b } = T.nativeEvent.contentOffset;
            (l.y = b),
              (l.scrollLock = b > 0),
              b > 0 && (l.scrollStartY = -1),
              n == null || n(T);
          },
          onStartShouldSetResponder: () => (
            (l.scrollStartY = -1), (m.current.isDraggingScrollArea = !0), p
          ),
          onMoveShouldSetResponder: (T) => p,
          contentContainerStyle: { minHeight: '100%' },
          onResponderMove: (T) => {
            {
              const { pageY: b } = T.nativeEvent;
              m.current.isScrolling ||
                (l.scrollStartY === -1 &&
                  ((l.scrollStartY = b), (m.current.lastPageY = b)));
              const I = b - l.scrollStartY,
                P = b - m.current.lastPageY;
              m.current.lastPageY = b;
              const O = P < 0,
                E = l.paneY <= l.paneMinY;
              if (v && (P === 0 || O) && E && !m.current.isScrolling) {
                (m.current.isScrolling = !0), (l.scrollLock = !0), h(!0);
                return;
              }
              if (!(!m.current.isScrolling && P > 0 && l.y === 0) && l.y >= 0)
                return;
              h(!1),
                l.drag(I),
                (m.current.dragAt = I),
                m.current.dys.push(P),
                m.current.dys.length > 100 &&
                  (m.current.dys = m.current.dys.slice(-10));
            }
          },
          ...o,
          children: [
            S.jsx(Bs, {
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              zIndex: -1,
              onLayout: (T) => {
                (C.current = Math.floor(T.nativeEvent.layout.height)), x();
              },
            }),
            t,
          ],
        })
      );
    }
  ),
  Rl = ({
    snapPoints: e,
    position: t,
    screenSize: n,
    frameSize: r,
    snapPointsMode: o,
  }) => {
    if (o === 'fit') return 0;
    if (o === 'constant') {
      const u = Number(e[0]),
        d = Number(e[t] ?? 0);
      return u - d;
    }
    if (o === 'percent') {
      const u = Number(e[0]) / 100,
        d = Number(e[t] ?? 0) / 100;
      return (u - d) * n;
    }
    const s = e[0];
    if (s === 'fit') return 0;
    const i = typeof s == 'string' ? (Number(s.slice(0, -1)) / 100) * n : s,
      l = e[t] ?? 0,
      c = typeof l == 'string' ? (Number(l.slice(0, -1)) / 100) * n : l,
      a = i - c;
    return Number.isNaN(a) ? 0 : a;
  };
function El({ Handle: e, Frame: t, Overlay: n }) {
  const r = e.styleable(({ __scopeSheet: a, ...u }, d) => {
      const h = Ut(zo, a),
        m = _e(h.handleRef, d);
      return h.onlyShowFrame
        ? null
        : S.jsx(e, {
            ref: m,
            onPress: () => {
              const g =
                  h.snapPoints.length + (h.dismissOnSnapToBottom ? -1 : 0),
                p = (h.position + 1) % g;
              h.setPosition(p);
            },
            open: h.open,
            ...u,
          });
    }),
    o = n.extractable(
      f.memo((a) => {
        const { __scopeSheet: u, ...d } = a,
          h = Ut(Vo, u),
          m = f.useMemo(
            () =>
              S.jsx(n, {
                ...d,
                onPress: Ks(
                  d.onPress,
                  h.dismissOnOverlayPress
                    ? () => {
                        h.setOpen(!1);
                      }
                    : void 0
                ),
              }),
            [d.onPress, d.opacity, h.dismissOnOverlayPress]
          );
        return (
          ae(() => {
            var g;
            (g = h.onOverlayComponent) == null || g.call(h, m);
          }, [m]),
          h.onlyShowFrame,
          null
        );
      })
    ),
    s = t.extractable(
      f.forwardRef(
        (
          {
            __scopeSheet: a,
            adjustPaddingForOffscreenContent: u,
            disableHideBottomOverflow: d,
            children: h,
            ...m
          },
          g
        ) => {
          const p = Ut(ln, a),
            {
              hasFit: v,
              removeScrollEnabled: w = !0,
              frameSize: y,
              contentRef: C,
              open: x,
            } = p,
            T = _e(g, C),
            b = Rl(p),
            I = f.useMemo(
              () =>
                S.jsxs(t, {
                  ref: T,
                  flex: v ? 0 : 1,
                  height: v ? void 0 : y,
                  pointerEvents: x ? 'auto' : 'none',
                  ...m,
                  children: [
                    S.jsx(Oo, { zIndex: ni(m.zIndex), children: h }),
                    u &&
                      S.jsx(Qn, {
                        'data-sheet-offscreen-pad': !0,
                        height: b,
                        width: '100%',
                      }),
                  ],
                }),
              [x, m, y, b, u, v]
            );
          return S.jsxs(S.Fragment, {
            children: [
              S.jsx(ml, { enabled: w && p.open, children: I }),
              !d &&
                S.jsx(t, {
                  ...m,
                  'data-testid': 'ensure-sheet-cover-not-overlapping',
                  componentName: 'SheetCover',
                  children: null,
                  position: 'absolute',
                  bottom: '-100%',
                  zIndex: -1,
                  height: p.frameSize,
                  left: 0,
                  right: 0,
                  borderWidth: 0,
                  borderRadius: 0,
                  shadowOpacity: 0,
                }),
            ],
          });
        }
      )
    ),
    i = f.forwardRef(function (a, u) {
      const d = qn(),
        { isShowingNonSheet: h } = $o();
      let m = yl;
      return a.native && Ys.OS, h || !d ? null : S.jsx(m, { ref: u, ...a });
    }),
    l = { Frame: s, Overlay: o, Handle: r, ScrollView: Cl },
    c = wt(i, l);
  return wt(i, { ...l, Controlled: c });
}
var rr = {};
const Tl = me(er, {
    name: zo,
    variants: {
      open: {
        true: { opacity: 1, pointerEvents: 'auto' },
        false: { opacity: 0, pointerEvents: 'none' },
      },
      unstyled: {
        false: {
          height: 10,
          borderRadius: 100,
          backgroundColor: '$background',
          zIndex: 10,
          marginHorizontal: '35%',
          marginBottom: '$2',
          opacity: 0.5,
          hoverStyle: { opacity: 0.7 },
        },
      },
    },
    defaultVariants: { unstyled: rr.TAMAGUI_HEADLESS === '1' },
  }),
  Il = me(rn, {
    name: Vo,
    variants: {
      open: {
        true: { pointerEvents: 'auto' },
        false: { pointerEvents: 'none' },
      },
      unstyled: {
        false: {
          fullscreen: !0,
          position: 'absolute',
          backgrounded: !0,
          zIndex: 99999,
          pointerEvents: 'auto',
        },
      },
    },
    defaultVariants: { unstyled: rr.TAMAGUI_HEADLESS === '1' },
  }),
  Al = me(At, {
    name: ln,
    variants: {
      unstyled: {
        false: {
          flex: 1,
          backgroundColor: '$background',
          borderTopLeftRadius: '$true',
          borderTopRightRadius: '$true',
          width: '100%',
          maxHeight: '100%',
          overflow: 'hidden',
        },
      },
    },
    defaultVariants: { unstyled: rr.TAMAGUI_HEADLESS === '1' },
  }),
  Pl = El({ Frame: Al, Handle: Tl, Overlay: Il }),
  Ol = ({
    children: e,
    onOpenChange: t,
    open: n,
    hidden: r,
    disableDrag: o,
  }) => {
    const s = je(t),
      i = f.useId(),
      l = L.useMemo(
        () => ({ id: i, open: n, hidden: r, disableDrag: o, onOpenChange: s }),
        [i, s, n, r, o]
      );
    return S.jsx(Ho.Provider, { value: l, children: e });
  },
  Ml = (e, t) => {
    const n = kl(e);
    return go(n) ? +n.val : n ? +n : 16;
  },
  kl = (e, t) => {
    var o;
    const n = Fl(e);
    if (!n) return e;
    const r = Zn();
    return (o = r.fontsParsed[r.defaultFontToken]) == null ? void 0 : o.size[n];
  },
  Fl = (e, t) => {
    var a;
    if (typeof e == 'number') return null;
    const n = 0,
      r = Zn(),
      o =
        ((a = r.fontsParsed[r.defaultFontToken]) == null ? void 0 : a.size) ||
        r.tokensParsed.size,
      s = e === '$true' && !('$true' in o) ? '$4' : e,
      i = Object.keys(o);
    let l = i.indexOf(s);
    l === -1 && s.endsWith('.5') && (l = i.indexOf(s.replace('.5', '')));
    const c = Math.min(Math.max(0, l + n), i.length - 1);
    return i[c] ?? s;
  },
  Nl = (e) => {
    var n, r;
    const t = Gs();
    return e
      ? Xs(e)
      : ((n = t[e]) == null ? void 0 : n.get()) ||
          ((r = t.color) == null ? void 0 : r.get());
  },
  Dl = (e) => {
    const t = Nl(e.color);
    return (n) =>
      n &&
      (L.isValidElement(n)
        ? L.cloneElement(n, { ...e, color: t, ...n.props })
        : L.createElement(n, e));
  };
var or = {};
const Ll = 'ListItem',
  Xt = me(rn, {
    name: Ll,
    tag: 'li',
    variants: {
      unstyled: {
        false: {
          size: '$true',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'nowrap',
          width: '100%',
          borderColor: '$borderColor',
          maxWidth: '100%',
          overflow: 'hidden',
          flexDirection: 'row',
          backgroundColor: '$background',
          cursor: 'default',
        },
      },
      size: {
        '...size': (e, { tokens: t }) => ({
          minHeight: t.size[e],
          paddingHorizontal: t.space[e],
          paddingVertical: Ao(t.space[e], { shift: -4 }),
        }),
      },
      active: { true: { hoverStyle: { backgroundColor: '$background' } } },
      disabled: { true: { opacity: 0.5, pointerEvents: 'none' } },
    },
    defaultVariants: { unstyled: or.TAMAGUI_HEADLESS === '1' },
  }),
  Rt = me(ht, {
    name: 'ListItemText',
    variants: {
      unstyled: {
        false: {
          color: '$color',
          size: '$true',
          flexGrow: 1,
          flexShrink: 1,
          ellipse: !0,
          cursor: 'inherit',
        },
      },
    },
    defaultVariants: { unstyled: or.TAMAGUI_HEADLESS === '1' },
  }),
  $n = me(Rt, {
    name: 'ListItemSubtitle',
    variants: {
      unstyled: { false: { opacity: 0.6, maxWidth: '100%', color: '$color' } },
      size: {
        '...size': (e, t) => {
          const n = Ii(e, { shift: -1, excludeHalfSteps: !0 });
          return on(n.key, t);
        },
      },
    },
    defaultVariants: { unstyled: or.TAMAGUI_HEADLESS === '1' },
  }),
  Hn = me(Rt, { name: 'ListItemTitle' }),
  Wo = (
    e,
    { Text: t = Rt, Subtitle: n = $n, Title: r = Hn } = {
      Text: Rt,
      Subtitle: $n,
      Title: Hn,
    }
  ) => {
    const o = Ri(e, { resolveValues: 'none' }),
      {
        children: s,
        icon: i,
        iconAfter: l,
        noTextWrap: c,
        theme: a,
        space: u,
        spaceFlex: d,
        scaleIcon: h = 1,
        scaleSpace: m = 1,
        unstyled: g = !1,
        subTitle: p,
        title: v,
        color: w,
        fontWeight: y,
        fontSize: C,
        fontFamily: x,
        letterSpacing: T,
        textAlign: b,
        ellipse: I,
        ...P
      } = o,
      O = {
        color: w,
        fontWeight: y,
        fontSize: C,
        fontFamily: x,
        letterSpacing: T,
        textAlign: b,
        children: s,
      },
      E = o.size || '$true',
      N = Ml(E) * h,
      U = Dl({ size: N, color: w }),
      [B, F] = [i, l].map(U),
      R = Jn().space[o.space] ?? N,
      $ = So(R) * m,
      D = $i(t, O);
    return {
      props: {
        ...P,
        children: S.jsxs(S.Fragment, {
          children: [
            B
              ? S.jsxs(S.Fragment, { children: [B, S.jsx(gr, { size: $ })] })
              : null,
            v || p
              ? S.jsxs(At, {
                  flex: 1,
                  children: [
                    c === 'all' ? v : S.jsx(r, { size: E, children: v }),
                    p
                      ? S.jsx(S.Fragment, {
                          children:
                            typeof p == 'string' && c !== 'all'
                              ? S.jsx(n, { unstyled: g, size: E, children: p })
                              : p,
                        })
                      : null,
                    D,
                  ],
                })
              : D,
            F
              ? S.jsxs(S.Fragment, { children: [S.jsx(gr, { size: $ }), F] })
              : null,
          ],
        }),
      },
    };
  },
  _l = Xt.styleable(function (e, t) {
    const { props: n } = Wo(e);
    return S.jsx(Xt, { ref: t, ...n });
  }),
  Uo = wt(_l, { Text: Rt, Subtitle: $n, Title: Hn }),
  ft = Math.min,
  we = Math.max,
  Et = Math.round,
  lt = Math.floor,
  Le = (e) => ({ x: e, y: e });
function an(e, t) {
  return typeof e == 'function' ? e(t) : e;
}
function cn(e) {
  return e.split('-')[0];
}
function sr(e) {
  return e.split('-')[1];
}
function jl(e) {
  return e === 'x' ? 'y' : 'x';
}
function zl(e) {
  return e === 'y' ? 'height' : 'width';
}
const Vl = new Set(['top', 'bottom']);
function un(e) {
  return Vl.has(cn(e)) ? 'y' : 'x';
}
function $l(e) {
  return jl(un(e));
}
function Hl(e) {
  return { top: 0, right: 0, bottom: 0, left: 0, ...e };
}
function Wl(e) {
  return typeof e != 'number'
    ? Hl(e)
    : { top: e, right: e, bottom: e, left: e };
}
function qt(e) {
  const { x: t, y: n, width: r, height: o } = e;
  return {
    width: r,
    height: o,
    top: n,
    left: t,
    right: t + r,
    bottom: n + o,
    x: t,
    y: n,
  };
}
function Mr(e, t, n) {
  let { reference: r, floating: o } = e;
  const s = un(t),
    i = $l(t),
    l = zl(i),
    c = cn(t),
    a = s === 'y',
    u = r.x + r.width / 2 - o.width / 2,
    d = r.y + r.height / 2 - o.height / 2,
    h = r[l] / 2 - o[l] / 2;
  let m;
  switch (c) {
    case 'top':
      m = { x: u, y: r.y - o.height };
      break;
    case 'bottom':
      m = { x: u, y: r.y + r.height };
      break;
    case 'right':
      m = { x: r.x + r.width, y: d };
      break;
    case 'left':
      m = { x: r.x - o.width, y: d };
      break;
    default:
      m = { x: r.x, y: r.y };
  }
  switch (sr(t)) {
    case 'start':
      m[i] -= h * (n && a ? -1 : 1);
      break;
    case 'end':
      m[i] += h * (n && a ? -1 : 1);
      break;
  }
  return m;
}
const Ul = async (e, t, n) => {
  const {
      placement: r = 'bottom',
      strategy: o = 'absolute',
      middleware: s = [],
      platform: i,
    } = n,
    l = s.filter(Boolean),
    c = await (i.isRTL == null ? void 0 : i.isRTL(t));
  let a = await i.getElementRects({ reference: e, floating: t, strategy: o }),
    { x: u, y: d } = Mr(a, r, c),
    h = r,
    m = {},
    g = 0;
  for (let p = 0; p < l.length; p++) {
    const { name: v, fn: w } = l[p],
      {
        x: y,
        y: C,
        data: x,
        reset: T,
      } = await w({
        x: u,
        y: d,
        initialPlacement: r,
        placement: h,
        strategy: o,
        middlewareData: m,
        rects: a,
        platform: i,
        elements: { reference: e, floating: t },
      });
    (u = y ?? u),
      (d = C ?? d),
      (m = { ...m, [v]: { ...m[v], ...x } }),
      T &&
        g <= 50 &&
        (g++,
        typeof T == 'object' &&
          (T.placement && (h = T.placement),
          T.rects &&
            (a =
              T.rects === !0
                ? await i.getElementRects({
                    reference: e,
                    floating: t,
                    strategy: o,
                  })
                : T.rects),
          ({ x: u, y: d } = Mr(a, h, c))),
        (p = -1));
  }
  return { x: u, y: d, placement: h, strategy: o, middlewareData: m };
};
async function Bo(e, t) {
  var n;
  t === void 0 && (t = {});
  const { x: r, y: o, platform: s, rects: i, elements: l, strategy: c } = e,
    {
      boundary: a = 'clippingAncestors',
      rootBoundary: u = 'viewport',
      elementContext: d = 'floating',
      altBoundary: h = !1,
      padding: m = 0,
    } = an(t, e),
    g = Wl(m),
    v = l[h ? (d === 'floating' ? 'reference' : 'floating') : d],
    w = qt(
      await s.getClippingRect({
        element:
          (n = await (s.isElement == null ? void 0 : s.isElement(v))) == null ||
          n
            ? v
            : v.contextElement ||
              (await (s.getDocumentElement == null
                ? void 0
                : s.getDocumentElement(l.floating))),
        boundary: a,
        rootBoundary: u,
        strategy: c,
      })
    ),
    y =
      d === 'floating'
        ? { x: r, y: o, width: i.floating.width, height: i.floating.height }
        : i.reference,
    C = await (s.getOffsetParent == null
      ? void 0
      : s.getOffsetParent(l.floating)),
    x = (await (s.isElement == null ? void 0 : s.isElement(C)))
      ? (await (s.getScale == null ? void 0 : s.getScale(C))) || { x: 1, y: 1 }
      : { x: 1, y: 1 },
    T = qt(
      s.convertOffsetParentRelativeRectToViewportRelativeRect
        ? await s.convertOffsetParentRelativeRectToViewportRelativeRect({
            elements: l,
            rect: y,
            offsetParent: C,
            strategy: c,
          })
        : y
    );
  return {
    top: (w.top - T.top + g.top) / x.y,
    bottom: (T.bottom - w.bottom + g.bottom) / x.y,
    left: (w.left - T.left + g.left) / x.x,
    right: (T.right - w.right + g.right) / x.x,
  };
}
const Bl = new Set(['left', 'top']);
async function Kl(e, t) {
  const { placement: n, platform: r, elements: o } = e,
    s = await (r.isRTL == null ? void 0 : r.isRTL(o.floating)),
    i = cn(n),
    l = sr(n),
    c = un(n) === 'y',
    a = Bl.has(i) ? -1 : 1,
    u = s && c ? -1 : 1,
    d = an(t, e);
  let {
    mainAxis: h,
    crossAxis: m,
    alignmentAxis: g,
  } = typeof d == 'number'
    ? { mainAxis: d, crossAxis: 0, alignmentAxis: null }
    : {
        mainAxis: d.mainAxis || 0,
        crossAxis: d.crossAxis || 0,
        alignmentAxis: d.alignmentAxis,
      };
  return (
    l && typeof g == 'number' && (m = l === 'end' ? g * -1 : g),
    c ? { x: m * u, y: h * a } : { x: h * a, y: m * u }
  );
}
const Yl = function (e) {
    return (
      e === void 0 && (e = 0),
      {
        name: 'offset',
        options: e,
        async fn(t) {
          var n, r;
          const { x: o, y: s, placement: i, middlewareData: l } = t,
            c = await Kl(t, e);
          return i === ((n = l.offset) == null ? void 0 : n.placement) &&
            (r = l.arrow) != null &&
            r.alignmentOffset
            ? {}
            : { x: o + c.x, y: s + c.y, data: { ...c, placement: i } };
        },
      }
    );
  },
  Gl = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: 'size',
        options: e,
        async fn(t) {
          var n, r;
          const { placement: o, rects: s, platform: i, elements: l } = t,
            { apply: c = () => {}, ...a } = an(e, t),
            u = await Bo(t, a),
            d = cn(o),
            h = sr(o),
            m = un(o) === 'y',
            { width: g, height: p } = s.floating;
          let v, w;
          d === 'top' || d === 'bottom'
            ? ((v = d),
              (w =
                h ===
                ((await (i.isRTL == null ? void 0 : i.isRTL(l.floating)))
                  ? 'start'
                  : 'end')
                  ? 'left'
                  : 'right'))
            : ((w = d), (v = h === 'end' ? 'top' : 'bottom'));
          const y = p - u.top - u.bottom,
            C = g - u.left - u.right,
            x = ft(p - u[v], y),
            T = ft(g - u[w], C),
            b = !t.middlewareData.shift;
          let I = x,
            P = T;
          if (
            ((n = t.middlewareData.shift) != null && n.enabled.x && (P = C),
            (r = t.middlewareData.shift) != null && r.enabled.y && (I = y),
            b && !h)
          ) {
            const E = we(u.left, 0),
              N = we(u.right, 0),
              U = we(u.top, 0),
              B = we(u.bottom, 0);
            m
              ? (P = g - 2 * (E !== 0 || N !== 0 ? E + N : we(u.left, u.right)))
              : (I =
                  p - 2 * (U !== 0 || B !== 0 ? U + B : we(u.top, u.bottom)));
          }
          await c({ ...t, availableWidth: P, availableHeight: I });
          const O = await i.getDimensions(l.floating);
          return g !== O.width || p !== O.height
            ? { reset: { rects: !0 } }
            : {};
        },
      }
    );
  };
function fn() {
  return typeof window < 'u';
}
function Xe(e) {
  return Ko(e) ? (e.nodeName || '').toLowerCase() : '#document';
}
function Pe(e) {
  var t;
  return (
    (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) ||
    window
  );
}
function ze(e) {
  var t;
  return (t = (Ko(e) ? e.ownerDocument : e.document) || window.document) == null
    ? void 0
    : t.documentElement;
}
function Ko(e) {
  return fn() ? e instanceof Node || e instanceof Pe(e).Node : !1;
}
function de(e) {
  return fn() ? e instanceof Element || e instanceof Pe(e).Element : !1;
}
function he(e) {
  return fn() ? e instanceof HTMLElement || e instanceof Pe(e).HTMLElement : !1;
}
function Wn(e) {
  return !fn() || typeof ShadowRoot > 'u'
    ? !1
    : e instanceof ShadowRoot || e instanceof Pe(e).ShadowRoot;
}
const Xl = new Set(['inline', 'contents']);
function Ot(e) {
  const { overflow: t, overflowX: n, overflowY: r, display: o } = Fe(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && !Xl.has(o);
}
const ql = new Set(['table', 'td', 'th']);
function Zl(e) {
  return ql.has(Xe(e));
}
const Jl = [':popover-open', ':modal'];
function dn(e) {
  return Jl.some((t) => {
    try {
      return e.matches(t);
    } catch {
      return !1;
    }
  });
}
const Ql = ['transform', 'translate', 'scale', 'rotate', 'perspective'],
  ea = ['transform', 'translate', 'scale', 'rotate', 'perspective', 'filter'],
  ta = ['paint', 'layout', 'strict', 'content'];
function ir(e) {
  const t = mn(),
    n = de(e) ? Fe(e) : e;
  return (
    Ql.some((r) => (n[r] ? n[r] !== 'none' : !1)) ||
    (n.containerType ? n.containerType !== 'normal' : !1) ||
    (!t && (n.backdropFilter ? n.backdropFilter !== 'none' : !1)) ||
    (!t && (n.filter ? n.filter !== 'none' : !1)) ||
    ea.some((r) => (n.willChange || '').includes(r)) ||
    ta.some((r) => (n.contain || '').includes(r))
  );
}
function na(e) {
  let t = We(e);
  for (; he(t) && !$e(t); ) {
    if (ir(t)) return t;
    if (dn(t)) return null;
    t = We(t);
  }
  return null;
}
function mn() {
  return typeof CSS > 'u' || !CSS.supports
    ? !1
    : CSS.supports('-webkit-backdrop-filter', 'none');
}
const ra = new Set(['html', 'body', '#document']);
function $e(e) {
  return ra.has(Xe(e));
}
function Fe(e) {
  return Pe(e).getComputedStyle(e);
}
function hn(e) {
  return de(e)
    ? { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop }
    : { scrollLeft: e.scrollX, scrollTop: e.scrollY };
}
function We(e) {
  if (Xe(e) === 'html') return e;
  const t = e.assignedSlot || e.parentNode || (Wn(e) && e.host) || ze(e);
  return Wn(t) ? t.host : t;
}
function Yo(e) {
  const t = We(e);
  return $e(t)
    ? e.ownerDocument
      ? e.ownerDocument.body
      : e.body
    : he(t) && Ot(t)
      ? t
      : Yo(t);
}
function Ge(e, t, n) {
  var r;
  t === void 0 && (t = []), n === void 0 && (n = !0);
  const o = Yo(e),
    s = o === ((r = e.ownerDocument) == null ? void 0 : r.body),
    i = Pe(o);
  if (s) {
    const l = Un(i);
    return t.concat(
      i,
      i.visualViewport || [],
      Ot(o) ? o : [],
      l && n ? Ge(l) : []
    );
  }
  return t.concat(o, Ge(o, [], n));
}
function Un(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function Go(e) {
  const t = Fe(e);
  let n = parseFloat(t.width) || 0,
    r = parseFloat(t.height) || 0;
  const o = he(e),
    s = o ? e.offsetWidth : n,
    i = o ? e.offsetHeight : r,
    l = Et(n) !== s || Et(r) !== i;
  return l && ((n = s), (r = i)), { width: n, height: r, $: l };
}
function lr(e) {
  return de(e) ? e : e.contextElement;
}
function at(e) {
  const t = lr(e);
  if (!he(t)) return Le(1);
  const n = t.getBoundingClientRect(),
    { width: r, height: o, $: s } = Go(t);
  let i = (s ? Et(n.width) : n.width) / r,
    l = (s ? Et(n.height) : n.height) / o;
  return (
    (!i || !Number.isFinite(i)) && (i = 1),
    (!l || !Number.isFinite(l)) && (l = 1),
    { x: i, y: l }
  );
}
const oa = Le(0);
function Xo(e) {
  const t = Pe(e);
  return !mn() || !t.visualViewport
    ? oa
    : { x: t.visualViewport.offsetLeft, y: t.visualViewport.offsetTop };
}
function sa(e, t, n) {
  return t === void 0 && (t = !1), !n || (t && n !== Pe(e)) ? !1 : t;
}
function tt(e, t, n, r) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const o = e.getBoundingClientRect(),
    s = lr(e);
  let i = Le(1);
  t && (r ? de(r) && (i = at(r)) : (i = at(e)));
  const l = sa(s, n, r) ? Xo(s) : Le(0);
  let c = (o.left + l.x) / i.x,
    a = (o.top + l.y) / i.y,
    u = o.width / i.x,
    d = o.height / i.y;
  if (s) {
    const h = Pe(s),
      m = r && de(r) ? Pe(r) : r;
    let g = h,
      p = Un(g);
    for (; p && r && m !== g; ) {
      const v = at(p),
        w = p.getBoundingClientRect(),
        y = Fe(p),
        C = w.left + (p.clientLeft + parseFloat(y.paddingLeft)) * v.x,
        x = w.top + (p.clientTop + parseFloat(y.paddingTop)) * v.y;
      (c *= v.x),
        (a *= v.y),
        (u *= v.x),
        (d *= v.y),
        (c += C),
        (a += x),
        (g = Pe(p)),
        (p = Un(g));
    }
  }
  return qt({ width: u, height: d, x: c, y: a });
}
function pn(e, t) {
  const n = hn(e).scrollLeft;
  return t ? t.left + n : tt(ze(e)).left + n;
}
function qo(e, t) {
  const n = e.getBoundingClientRect(),
    r = n.left + t.scrollLeft - pn(e, n),
    o = n.top + t.scrollTop;
  return { x: r, y: o };
}
function ia(e) {
  let { elements: t, rect: n, offsetParent: r, strategy: o } = e;
  const s = o === 'fixed',
    i = ze(r),
    l = t ? dn(t.floating) : !1;
  if (r === i || (l && s)) return n;
  let c = { scrollLeft: 0, scrollTop: 0 },
    a = Le(1);
  const u = Le(0),
    d = he(r);
  if (
    (d || (!d && !s)) &&
    ((Xe(r) !== 'body' || Ot(i)) && (c = hn(r)), he(r))
  ) {
    const m = tt(r);
    (a = at(r)), (u.x = m.x + r.clientLeft), (u.y = m.y + r.clientTop);
  }
  const h = i && !d && !s ? qo(i, c) : Le(0);
  return {
    width: n.width * a.x,
    height: n.height * a.y,
    x: n.x * a.x - c.scrollLeft * a.x + u.x + h.x,
    y: n.y * a.y - c.scrollTop * a.y + u.y + h.y,
  };
}
function la(e) {
  return Array.from(e.getClientRects());
}
function aa(e) {
  const t = ze(e),
    n = hn(e),
    r = e.ownerDocument.body,
    o = we(t.scrollWidth, t.clientWidth, r.scrollWidth, r.clientWidth),
    s = we(t.scrollHeight, t.clientHeight, r.scrollHeight, r.clientHeight);
  let i = -n.scrollLeft + pn(e);
  const l = -n.scrollTop;
  return (
    Fe(r).direction === 'rtl' && (i += we(t.clientWidth, r.clientWidth) - o),
    { width: o, height: s, x: i, y: l }
  );
}
const kr = 25;
function ca(e, t) {
  const n = Pe(e),
    r = ze(e),
    o = n.visualViewport;
  let s = r.clientWidth,
    i = r.clientHeight,
    l = 0,
    c = 0;
  if (o) {
    (s = o.width), (i = o.height);
    const u = mn();
    (!u || (u && t === 'fixed')) && ((l = o.offsetLeft), (c = o.offsetTop));
  }
  const a = pn(r);
  if (a <= 0) {
    const u = r.ownerDocument,
      d = u.body,
      h = getComputedStyle(d),
      m =
        (u.compatMode === 'CSS1Compat' &&
          parseFloat(h.marginLeft) + parseFloat(h.marginRight)) ||
        0,
      g = Math.abs(r.clientWidth - d.clientWidth - m);
    g <= kr && (s -= g);
  } else a <= kr && (s += a);
  return { width: s, height: i, x: l, y: c };
}
const ua = new Set(['absolute', 'fixed']);
function fa(e, t) {
  const n = tt(e, !0, t === 'fixed'),
    r = n.top + e.clientTop,
    o = n.left + e.clientLeft,
    s = he(e) ? at(e) : Le(1),
    i = e.clientWidth * s.x,
    l = e.clientHeight * s.y,
    c = o * s.x,
    a = r * s.y;
  return { width: i, height: l, x: c, y: a };
}
function Fr(e, t, n) {
  let r;
  if (t === 'viewport') r = ca(e, n);
  else if (t === 'document') r = aa(ze(e));
  else if (de(t)) r = fa(t, n);
  else {
    const o = Xo(e);
    r = { x: t.x - o.x, y: t.y - o.y, width: t.width, height: t.height };
  }
  return qt(r);
}
function Zo(e, t) {
  const n = We(e);
  return n === t || !de(n) || $e(n)
    ? !1
    : Fe(n).position === 'fixed' || Zo(n, t);
}
function da(e, t) {
  const n = t.get(e);
  if (n) return n;
  let r = Ge(e, [], !1).filter((l) => de(l) && Xe(l) !== 'body'),
    o = null;
  const s = Fe(e).position === 'fixed';
  let i = s ? We(e) : e;
  for (; de(i) && !$e(i); ) {
    const l = Fe(i),
      c = ir(i);
    !c && l.position === 'fixed' && (o = null),
      (
        s
          ? !c && !o
          : (!c && l.position === 'static' && !!o && ua.has(o.position)) ||
            (Ot(i) && !c && Zo(e, i))
      )
        ? (r = r.filter((u) => u !== i))
        : (o = l),
      (i = We(i));
  }
  return t.set(e, r), r;
}
function ma(e) {
  let { element: t, boundary: n, rootBoundary: r, strategy: o } = e;
  const i = [
      ...(n === 'clippingAncestors'
        ? dn(t)
          ? []
          : da(t, this._c)
        : [].concat(n)),
      r,
    ],
    l = i[0],
    c = i.reduce(
      (a, u) => {
        const d = Fr(t, u, o);
        return (
          (a.top = we(d.top, a.top)),
          (a.right = ft(d.right, a.right)),
          (a.bottom = ft(d.bottom, a.bottom)),
          (a.left = we(d.left, a.left)),
          a
        );
      },
      Fr(t, l, o)
    );
  return {
    width: c.right - c.left,
    height: c.bottom - c.top,
    x: c.left,
    y: c.top,
  };
}
function ha(e) {
  const { width: t, height: n } = Go(e);
  return { width: t, height: n };
}
function pa(e, t, n) {
  const r = he(t),
    o = ze(t),
    s = n === 'fixed',
    i = tt(e, !0, s, t);
  let l = { scrollLeft: 0, scrollTop: 0 };
  const c = Le(0);
  function a() {
    c.x = pn(o);
  }
  if (r || (!r && !s))
    if (((Xe(t) !== 'body' || Ot(o)) && (l = hn(t)), r)) {
      const m = tt(t, !0, s, t);
      (c.x = m.x + t.clientLeft), (c.y = m.y + t.clientTop);
    } else o && a();
  s && !r && o && a();
  const u = o && !r && !s ? qo(o, l) : Le(0),
    d = i.left + l.scrollLeft - c.x - u.x,
    h = i.top + l.scrollTop - c.y - u.y;
  return { x: d, y: h, width: i.width, height: i.height };
}
function On(e) {
  return Fe(e).position === 'static';
}
function Nr(e, t) {
  if (!he(e) || Fe(e).position === 'fixed') return null;
  if (t) return t(e);
  let n = e.offsetParent;
  return ze(e) === n && (n = n.ownerDocument.body), n;
}
function Jo(e, t) {
  const n = Pe(e);
  if (dn(e)) return n;
  if (!he(e)) {
    let o = We(e);
    for (; o && !$e(o); ) {
      if (de(o) && !On(o)) return o;
      o = We(o);
    }
    return n;
  }
  let r = Nr(e, t);
  for (; r && Zl(r) && On(r); ) r = Nr(r, t);
  return r && $e(r) && On(r) && !ir(r) ? n : r || na(e) || n;
}
const ga = async function (e) {
  const t = this.getOffsetParent || Jo,
    n = this.getDimensions,
    r = await n(e.floating);
  return {
    reference: pa(e.reference, await t(e.floating), e.strategy),
    floating: { x: 0, y: 0, width: r.width, height: r.height },
  };
};
function va(e) {
  return Fe(e).direction === 'rtl';
}
const ba = {
  convertOffsetParentRelativeRectToViewportRelativeRect: ia,
  getDocumentElement: ze,
  getClippingRect: ma,
  getOffsetParent: Jo,
  getElementRects: ga,
  getClientRects: la,
  getDimensions: ha,
  getScale: at,
  isElement: de,
  isRTL: va,
};
function Qo(e, t) {
  return (
    e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height
  );
}
function ya(e, t) {
  let n = null,
    r;
  const o = ze(e);
  function s() {
    var l;
    clearTimeout(r), (l = n) == null || l.disconnect(), (n = null);
  }
  function i(l, c) {
    l === void 0 && (l = !1), c === void 0 && (c = 1), s();
    const a = e.getBoundingClientRect(),
      { left: u, top: d, width: h, height: m } = a;
    if ((l || t(), !h || !m)) return;
    const g = lt(d),
      p = lt(o.clientWidth - (u + h)),
      v = lt(o.clientHeight - (d + m)),
      w = lt(u),
      C = {
        rootMargin: -g + 'px ' + -p + 'px ' + -v + 'px ' + -w + 'px',
        threshold: we(0, ft(1, c)) || 1,
      };
    let x = !0;
    function T(b) {
      const I = b[0].intersectionRatio;
      if (I !== c) {
        if (!x) return i();
        I
          ? i(!1, I)
          : (r = setTimeout(() => {
              i(!1, 1e-7);
            }, 1e3));
      }
      I === 1 && !Qo(a, e.getBoundingClientRect()) && i(), (x = !1);
    }
    try {
      n = new IntersectionObserver(T, { ...C, root: o.ownerDocument });
    } catch {
      n = new IntersectionObserver(T, C);
    }
    n.observe(e);
  }
  return i(!0), s;
}
function es(e, t, n, r) {
  r === void 0 && (r = {});
  const {
      ancestorScroll: o = !0,
      ancestorResize: s = !0,
      elementResize: i = typeof ResizeObserver == 'function',
      layoutShift: l = typeof IntersectionObserver == 'function',
      animationFrame: c = !1,
    } = r,
    a = lr(e),
    u = o || s ? [...(a ? Ge(a) : []), ...Ge(t)] : [];
  u.forEach((w) => {
    o && w.addEventListener('scroll', n, { passive: !0 }),
      s && w.addEventListener('resize', n);
  });
  const d = a && l ? ya(a, n) : null;
  let h = -1,
    m = null;
  i &&
    ((m = new ResizeObserver((w) => {
      let [y] = w;
      y &&
        y.target === a &&
        m &&
        (m.unobserve(t),
        cancelAnimationFrame(h),
        (h = requestAnimationFrame(() => {
          var C;
          (C = m) == null || C.observe(t);
        }))),
        n();
    })),
    a && !c && m.observe(a),
    m.observe(t));
  let g,
    p = c ? tt(e) : null;
  c && v();
  function v() {
    const w = tt(e);
    p && !Qo(p, w) && n(), (p = w), (g = requestAnimationFrame(v));
  }
  return (
    n(),
    () => {
      var w;
      u.forEach((y) => {
        o && y.removeEventListener('scroll', n),
          s && y.removeEventListener('resize', n);
      }),
        d == null || d(),
        (w = m) == null || w.disconnect(),
        (m = null),
        c && cancelAnimationFrame(g);
    }
  );
}
const Mn = Bo,
  Sa = Yl,
  xa = Gl,
  wa = (e, t, n) => {
    const r = new Map(),
      o = { platform: ba, ...n },
      s = { ...o.platform, _c: r };
    return Ul(e, t, { ...o, platform: s });
  };
var Ca = typeof document < 'u',
  Ra = function () {},
  Bt = Ca ? f.useLayoutEffect : Ra;
function Zt(e, t) {
  if (e === t) return !0;
  if (typeof e != typeof t) return !1;
  if (typeof e == 'function' && e.toString() === t.toString()) return !0;
  let n, r, o;
  if (e && t && typeof e == 'object') {
    if (Array.isArray(e)) {
      if (((n = e.length), n !== t.length)) return !1;
      for (r = n; r-- !== 0; ) if (!Zt(e[r], t[r])) return !1;
      return !0;
    }
    if (((o = Object.keys(e)), (n = o.length), n !== Object.keys(t).length))
      return !1;
    for (r = n; r-- !== 0; ) if (!{}.hasOwnProperty.call(t, o[r])) return !1;
    for (r = n; r-- !== 0; ) {
      const s = o[r];
      if (!(s === '_owner' && e.$$typeof) && !Zt(e[s], t[s])) return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
}
function ts(e) {
  return typeof window > 'u'
    ? 1
    : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function Dr(e, t) {
  const n = ts(e);
  return Math.round(t * n) / n;
}
function kn(e) {
  const t = f.useRef(e);
  return (
    Bt(() => {
      t.current = e;
    }),
    t
  );
}
function Ea(e) {
  e === void 0 && (e = {});
  const {
      placement: t = 'bottom',
      strategy: n = 'absolute',
      middleware: r = [],
      platform: o,
      elements: { reference: s, floating: i } = {},
      transform: l = !0,
      whileElementsMounted: c,
      open: a,
    } = e,
    [u, d] = f.useState({
      x: 0,
      y: 0,
      strategy: n,
      placement: t,
      middlewareData: {},
      isPositioned: !1,
    }),
    [h, m] = f.useState(r);
  Zt(h, r) || m(r);
  const [g, p] = f.useState(null),
    [v, w] = f.useState(null),
    y = f.useCallback((A) => {
      A !== b.current && ((b.current = A), p(A));
    }, []),
    C = f.useCallback((A) => {
      A !== I.current && ((I.current = A), w(A));
    }, []),
    x = s || g,
    T = i || v,
    b = f.useRef(null),
    I = f.useRef(null),
    P = f.useRef(u),
    O = c != null,
    E = kn(c),
    N = kn(o),
    U = kn(a),
    B = f.useCallback(() => {
      if (!b.current || !I.current) return;
      const A = { placement: t, strategy: n, middleware: h };
      N.current && (A.platform = N.current),
        wa(b.current, I.current, A).then((M) => {
          const k = { ...M, isPositioned: U.current !== !1 };
          F.current &&
            !Zt(P.current, k) &&
            ((P.current = k),
            He.flushSync(() => {
              d(k);
            }));
        });
    }, [h, t, n, N, U]);
  Bt(() => {
    a === !1 &&
      P.current.isPositioned &&
      ((P.current.isPositioned = !1), d((A) => ({ ...A, isPositioned: !1 })));
  }, [a]);
  const F = f.useRef(!1);
  Bt(
    () => (
      (F.current = !0),
      () => {
        F.current = !1;
      }
    ),
    []
  ),
    Bt(() => {
      if ((x && (b.current = x), T && (I.current = T), x && T)) {
        if (E.current) return E.current(x, T, B);
        B();
      }
    }, [x, T, B, E, O]);
  const R = f.useMemo(
      () => ({ reference: b, floating: I, setReference: y, setFloating: C }),
      [y, C]
    ),
    $ = f.useMemo(() => ({ reference: x, floating: T }), [x, T]),
    D = f.useMemo(() => {
      const A = { position: n, left: 0, top: 0 };
      if (!$.floating) return A;
      const M = Dr($.floating, u.x),
        k = Dr($.floating, u.y);
      return l
        ? {
            ...A,
            transform: 'translate(' + M + 'px, ' + k + 'px)',
            ...(ts($.floating) >= 1.5 && { willChange: 'transform' }),
          }
        : { position: n, left: M, top: k };
    }, [n, l, $.floating, u.x, u.y]);
  return f.useMemo(
    () => ({ ...u, update: B, refs: R, elements: $, floatingStyles: D }),
    [u, B, R, $, D]
  );
}
const ar = (e, t) => ({ ...Sa(e), options: [e, t] }),
  Ta = (e, t) => ({ ...xa(e), options: [e, t] });
/*!
 * tabbable 6.2.0
 * @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
 */ var Ia = [
    'input:not([inert])',
    'select:not([inert])',
    'textarea:not([inert])',
    'a[href]:not([inert])',
    'button:not([inert])',
    '[tabindex]:not(slot):not([inert])',
    'audio[controls]:not([inert])',
    'video[controls]:not([inert])',
    '[contenteditable]:not([contenteditable="false"]):not([inert])',
    'details>summary:first-of-type:not([inert])',
    'details:not([inert])',
  ],
  Jt = Ia.join(','),
  ns = typeof Element > 'u',
  dt = ns
    ? function () {}
    : Element.prototype.matches ||
      Element.prototype.msMatchesSelector ||
      Element.prototype.webkitMatchesSelector,
  Qt =
    !ns && Element.prototype.getRootNode
      ? function (e) {
          var t;
          return e == null || (t = e.getRootNode) === null || t === void 0
            ? void 0
            : t.call(e);
        }
      : function (e) {
          return e == null ? void 0 : e.ownerDocument;
        },
  en = function e(t, n) {
    var r;
    n === void 0 && (n = !0);
    var o =
        t == null || (r = t.getAttribute) === null || r === void 0
          ? void 0
          : r.call(t, 'inert'),
      s = o === '' || o === 'true',
      i = s || (n && t && e(t.parentNode));
    return i;
  },
  Aa = function (t) {
    var n,
      r =
        t == null || (n = t.getAttribute) === null || n === void 0
          ? void 0
          : n.call(t, 'contenteditable');
    return r === '' || r === 'true';
  },
  rs = function (t, n, r) {
    if (en(t)) return [];
    var o = Array.prototype.slice.apply(t.querySelectorAll(Jt));
    return n && dt.call(t, Jt) && o.unshift(t), (o = o.filter(r)), o;
  },
  os = function e(t, n, r) {
    for (var o = [], s = Array.from(t); s.length; ) {
      var i = s.shift();
      if (!en(i, !1))
        if (i.tagName === 'SLOT') {
          var l = i.assignedElements(),
            c = l.length ? l : i.children,
            a = e(c, !0, r);
          r.flatten
            ? o.push.apply(o, a)
            : o.push({ scopeParent: i, candidates: a });
        } else {
          var u = dt.call(i, Jt);
          u && r.filter(i) && (n || !t.includes(i)) && o.push(i);
          var d =
              i.shadowRoot ||
              (typeof r.getShadowRoot == 'function' && r.getShadowRoot(i)),
            h = !en(d, !1) && (!r.shadowRootFilter || r.shadowRootFilter(i));
          if (d && h) {
            var m = e(d === !0 ? i.children : d.children, !0, r);
            r.flatten
              ? o.push.apply(o, m)
              : o.push({ scopeParent: i, candidates: m });
          } else s.unshift.apply(s, i.children);
        }
    }
    return o;
  },
  ss = function (t) {
    return !isNaN(parseInt(t.getAttribute('tabindex'), 10));
  },
  is = function (t) {
    if (!t) throw new Error('No node provided');
    return t.tabIndex < 0 &&
      (/^(AUDIO|VIDEO|DETAILS)$/.test(t.tagName) || Aa(t)) &&
      !ss(t)
      ? 0
      : t.tabIndex;
  },
  Pa = function (t, n) {
    var r = is(t);
    return r < 0 && n && !ss(t) ? 0 : r;
  },
  Oa = function (t, n) {
    return t.tabIndex === n.tabIndex
      ? t.documentOrder - n.documentOrder
      : t.tabIndex - n.tabIndex;
  },
  ls = function (t) {
    return t.tagName === 'INPUT';
  },
  Ma = function (t) {
    return ls(t) && t.type === 'hidden';
  },
  ka = function (t) {
    var n =
      t.tagName === 'DETAILS' &&
      Array.prototype.slice.apply(t.children).some(function (r) {
        return r.tagName === 'SUMMARY';
      });
    return n;
  },
  Fa = function (t, n) {
    for (var r = 0; r < t.length; r++)
      if (t[r].checked && t[r].form === n) return t[r];
  },
  Na = function (t) {
    if (!t.name) return !0;
    var n = t.form || Qt(t),
      r = function (l) {
        return n.querySelectorAll('input[type="radio"][name="' + l + '"]');
      },
      o;
    if (
      typeof window < 'u' &&
      typeof window.CSS < 'u' &&
      typeof window.CSS.escape == 'function'
    )
      o = r(window.CSS.escape(t.name));
    else
      try {
        o = r(t.name);
      } catch (i) {
        return (
          console.error(
            'Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s',
            i.message
          ),
          !1
        );
      }
    var s = Fa(o, t.form);
    return !s || s === t;
  },
  Da = function (t) {
    return ls(t) && t.type === 'radio';
  },
  La = function (t) {
    return Da(t) && !Na(t);
  },
  _a = function (t) {
    var n,
      r = t && Qt(t),
      o = (n = r) === null || n === void 0 ? void 0 : n.host,
      s = !1;
    if (r && r !== t) {
      var i, l, c;
      for (
        s = !!(
          ((i = o) !== null &&
            i !== void 0 &&
            (l = i.ownerDocument) !== null &&
            l !== void 0 &&
            l.contains(o)) ||
          (t != null &&
            (c = t.ownerDocument) !== null &&
            c !== void 0 &&
            c.contains(t))
        );
        !s && o;

      ) {
        var a, u, d;
        (r = Qt(o)),
          (o = (a = r) === null || a === void 0 ? void 0 : a.host),
          (s = !!(
            (u = o) !== null &&
            u !== void 0 &&
            (d = u.ownerDocument) !== null &&
            d !== void 0 &&
            d.contains(o)
          ));
      }
    }
    return s;
  },
  Lr = function (t) {
    var n = t.getBoundingClientRect(),
      r = n.width,
      o = n.height;
    return r === 0 && o === 0;
  },
  ja = function (t, n) {
    var r = n.displayCheck,
      o = n.getShadowRoot;
    if (getComputedStyle(t).visibility === 'hidden') return !0;
    var s = dt.call(t, 'details>summary:first-of-type'),
      i = s ? t.parentElement : t;
    if (dt.call(i, 'details:not([open]) *')) return !0;
    if (!r || r === 'full' || r === 'legacy-full') {
      if (typeof o == 'function') {
        for (var l = t; t; ) {
          var c = t.parentElement,
            a = Qt(t);
          if (c && !c.shadowRoot && o(c) === !0) return Lr(t);
          t.assignedSlot
            ? (t = t.assignedSlot)
            : !c && a !== t.ownerDocument
              ? (t = a.host)
              : (t = c);
        }
        t = l;
      }
      if (_a(t)) return !t.getClientRects().length;
      if (r !== 'legacy-full') return !0;
    } else if (r === 'non-zero-area') return Lr(t);
    return !1;
  },
  za = function (t) {
    if (/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(t.tagName))
      for (var n = t.parentElement; n; ) {
        if (n.tagName === 'FIELDSET' && n.disabled) {
          for (var r = 0; r < n.children.length; r++) {
            var o = n.children.item(r);
            if (o.tagName === 'LEGEND')
              return dt.call(n, 'fieldset[disabled] *') ? !0 : !o.contains(t);
          }
          return !0;
        }
        n = n.parentElement;
      }
    return !1;
  },
  Bn = function (t, n) {
    return !(n.disabled || en(n) || Ma(n) || ja(n, t) || ka(n) || za(n));
  },
  Kn = function (t, n) {
    return !(La(n) || is(n) < 0 || !Bn(t, n));
  },
  Va = function (t) {
    var n = parseInt(t.getAttribute('tabindex'), 10);
    return !!(isNaN(n) || n >= 0);
  },
  $a = function e(t) {
    var n = [],
      r = [];
    return (
      t.forEach(function (o, s) {
        var i = !!o.scopeParent,
          l = i ? o.scopeParent : o,
          c = Pa(l, i),
          a = i ? e(o.candidates) : l;
        c === 0
          ? i
            ? n.push.apply(n, a)
            : n.push(l)
          : r.push({
              documentOrder: s,
              tabIndex: c,
              item: o,
              isScope: i,
              content: a,
            });
      }),
      r
        .sort(Oa)
        .reduce(function (o, s) {
          return s.isScope ? o.push.apply(o, s.content) : o.push(s.content), o;
        }, [])
        .concat(n)
    );
  },
  gn = function (t, n) {
    n = n || {};
    var r;
    return (
      n.getShadowRoot
        ? (r = os([t], n.includeContainer, {
            filter: Kn.bind(null, n),
            flatten: !1,
            getShadowRoot: n.getShadowRoot,
            shadowRootFilter: Va,
          }))
        : (r = rs(t, n.includeContainer, Kn.bind(null, n))),
      $a(r)
    );
  },
  Ha = function (t, n) {
    n = n || {};
    var r;
    return (
      n.getShadowRoot
        ? (r = os([t], n.includeContainer, {
            filter: Bn.bind(null, n),
            flatten: !0,
            getShadowRoot: n.getShadowRoot,
          }))
        : (r = rs(t, n.includeContainer, Bn.bind(null, n))),
      r
    );
  },
  as = function (t, n) {
    if (((n = n || {}), !t)) throw new Error('No node provided');
    return dt.call(t, Jt) === !1 ? !1 : Kn(n, t);
  };
function cs() {
  const e = navigator.userAgentData;
  return e != null && e.platform ? e.platform : navigator.platform;
}
function cr() {
  const e = navigator.userAgentData;
  return e && Array.isArray(e.brands)
    ? e.brands
        .map((t) => {
          let { brand: n, version: r } = t;
          return n + '/' + r;
        })
        .join(' ')
    : navigator.userAgent;
}
function Wa() {
  return /apple/i.test(navigator.vendor);
}
function Yn() {
  const e = /android/i;
  return e.test(cs()) || e.test(cr());
}
function Ua() {
  return cr().includes('jsdom/');
}
const _r = 'data-floating-ui-focusable',
  Ba =
    "input:not([type='hidden']):not([disabled]),[contenteditable]:not([contenteditable='false']),textarea:not([disabled])",
  Fn = 'ArrowLeft',
  Nn = 'ArrowRight',
  Ka = 'ArrowUp',
  Ya = 'ArrowDown';
function Ke(e) {
  let t = e.activeElement;
  for (
    ;
    ((n = t) == null || (n = n.shadowRoot) == null
      ? void 0
      : n.activeElement) != null;

  ) {
    var n;
    t = t.shadowRoot.activeElement;
  }
  return t;
}
function Ee(e, t) {
  if (!e || !t) return !1;
  const n = t.getRootNode == null ? void 0 : t.getRootNode();
  if (e.contains(t)) return !0;
  if (n && Wn(n)) {
    let r = t;
    for (; r; ) {
      if (e === r) return !0;
      r = r.parentNode || r.host;
    }
  }
  return !1;
}
function Ye(e) {
  return 'composedPath' in e ? e.composedPath()[0] : e.target;
}
function Dn(e, t) {
  if (t == null) return !1;
  if ('composedPath' in e) return e.composedPath().includes(t);
  const n = e;
  return n.target != null && t.contains(n.target);
}
function Ga(e) {
  return e.matches('html,body');
}
function ke(e) {
  return (e == null ? void 0 : e.ownerDocument) || document;
}
function us(e) {
  return he(e) && e.matches(Ba);
}
function Gn(e) {
  return e ? e.getAttribute('role') === 'combobox' && us(e) : !1;
}
function tn(e) {
  return e
    ? e.hasAttribute(_r)
      ? e
      : e.querySelector('[' + _r + ']') || e
    : null;
}
function ct(e, t) {
  let n = e.filter((o) => {
      var s;
      return o.parentId === t && ((s = o.context) == null ? void 0 : s.open);
    }),
    r = n;
  for (; r.length; )
    (r = e.filter((o) => {
      var s;
      return (s = r) == null
        ? void 0
        : s.some((i) => {
            var l;
            return (
              o.parentId === i.id && ((l = o.context) == null ? void 0 : l.open)
            );
          });
    })),
      (n = n.concat(r));
  return n;
}
function Xa(e, t) {
  let n,
    r = -1;
  function o(s, i) {
    i > r && ((n = s), (r = i)),
      ct(e, s).forEach((c) => {
        o(c.id, i + 1);
      });
  }
  return o(t, 0), e.find((s) => s.id === n);
}
function jr(e, t) {
  var n;
  let r = [],
    o = (n = e.find((s) => s.id === t)) == null ? void 0 : n.parentId;
  for (; o; ) {
    const s = e.find((i) => i.id === o);
    (o = s == null ? void 0 : s.parentId), s && (r = r.concat(s));
  }
  return r;
}
function be(e) {
  e.preventDefault(), e.stopPropagation();
}
function qa(e) {
  return 'nativeEvent' in e;
}
function fs(e) {
  return e.mozInputSource === 0 && e.isTrusted
    ? !0
    : Yn() && e.pointerType
      ? e.type === 'click' && e.buttons === 1
      : e.detail === 0 && !e.pointerType;
}
function ds(e) {
  return Ua()
    ? !1
    : (!Yn() && e.width === 0 && e.height === 0) ||
        (Yn() &&
          e.width === 1 &&
          e.height === 1 &&
          e.pressure === 0 &&
          e.detail === 0 &&
          e.pointerType === 'mouse') ||
        (e.width < 1 &&
          e.height < 1 &&
          e.pressure === 0 &&
          e.detail === 0 &&
          e.pointerType === 'touch');
}
function zr(e, t) {
  return ['mouse', 'pen'].includes(e);
}
var Za = typeof document < 'u',
  Ja = function () {},
  fe = Za ? f.useLayoutEffect : Ja;
const Qa = { ...xo };
function De(e) {
  const t = f.useRef(e);
  return (
    fe(() => {
      t.current = e;
    }),
    t
  );
}
const ec = Qa.useInsertionEffect,
  tc = ec || ((e) => e());
function pe(e) {
  const t = f.useRef(() => {});
  return (
    tc(() => {
      t.current = e;
    }),
    f.useCallback(function () {
      for (var n = arguments.length, r = new Array(n), o = 0; o < n; o++)
        r[o] = arguments[o];
      return t.current == null ? void 0 : t.current(...r);
    }, [])
  );
}
function zt(e, t, n) {
  return Math.floor(e / t) !== n;
}
function St(e, t) {
  return t < 0 || t >= e.current.length;
}
function Ln(e, t) {
  return Se(e, { disabledIndices: t });
}
function Vr(e, t) {
  return Se(e, {
    decrement: !0,
    startingIndex: e.current.length,
    disabledIndices: t,
  });
}
function Se(e, t) {
  let {
      startingIndex: n = -1,
      decrement: r = !1,
      disabledIndices: o,
      amount: s = 1,
    } = t === void 0 ? {} : t,
    i = n;
  do i += r ? -s : s;
  while (i >= 0 && i <= e.current.length - 1 && Kt(e, i, o));
  return i;
}
function nc(e, t) {
  let {
      event: n,
      orientation: r,
      loop: o,
      rtl: s,
      cols: i,
      disabledIndices: l,
      minIndex: c,
      maxIndex: a,
      prevIndex: u,
      stopEvent: d = !1,
    } = t,
    h = u;
  if (n.key === Ka) {
    if ((d && be(n), u === -1)) h = a;
    else if (
      ((h = Se(e, {
        startingIndex: h,
        amount: i,
        decrement: !0,
        disabledIndices: l,
      })),
      o && (u - i < c || h < 0))
    ) {
      const m = u % i,
        g = a % i,
        p = a - (g - m);
      g === m ? (h = a) : (h = g > m ? p : p - i);
    }
    St(e, h) && (h = u);
  }
  if (
    (n.key === Ya &&
      (d && be(n),
      u === -1
        ? (h = c)
        : ((h = Se(e, { startingIndex: u, amount: i, disabledIndices: l })),
          o &&
            u + i > a &&
            (h = Se(e, {
              startingIndex: (u % i) - i,
              amount: i,
              disabledIndices: l,
            }))),
      St(e, h) && (h = u)),
    r === 'both')
  ) {
    const m = lt(u / i);
    n.key === (s ? Fn : Nn) &&
      (d && be(n),
      u % i !== i - 1
        ? ((h = Se(e, { startingIndex: u, disabledIndices: l })),
          o &&
            zt(h, i, m) &&
            (h = Se(e, { startingIndex: u - (u % i) - 1, disabledIndices: l })))
        : o &&
          (h = Se(e, { startingIndex: u - (u % i) - 1, disabledIndices: l })),
      zt(h, i, m) && (h = u)),
      n.key === (s ? Nn : Fn) &&
        (d && be(n),
        u % i !== 0
          ? ((h = Se(e, {
              startingIndex: u,
              decrement: !0,
              disabledIndices: l,
            })),
            o &&
              zt(h, i, m) &&
              (h = Se(e, {
                startingIndex: u + (i - (u % i)),
                decrement: !0,
                disabledIndices: l,
              })))
          : o &&
            (h = Se(e, {
              startingIndex: u + (i - (u % i)),
              decrement: !0,
              disabledIndices: l,
            })),
        zt(h, i, m) && (h = u));
    const g = lt(a / i) === m;
    St(e, h) &&
      (o && g
        ? (h =
            n.key === (s ? Nn : Fn)
              ? a
              : Se(e, { startingIndex: u - (u % i) - 1, disabledIndices: l }))
        : (h = u));
  }
  return h;
}
function rc(e, t, n) {
  const r = [];
  let o = 0;
  return (
    e.forEach((s, i) => {
      let { width: l, height: c } = s,
        a = !1;
      for (n && (o = 0); !a; ) {
        const u = [];
        for (let d = 0; d < l; d++)
          for (let h = 0; h < c; h++) u.push(o + d + h * t);
        (o % t) + l <= t && u.every((d) => r[d] == null)
          ? (u.forEach((d) => {
              r[d] = i;
            }),
            (a = !0))
          : o++;
      }
    }),
    [...r]
  );
}
function oc(e, t, n, r, o) {
  if (e === -1) return -1;
  const s = n.indexOf(e),
    i = t[e];
  switch (o) {
    case 'tl':
      return s;
    case 'tr':
      return i ? s + i.width - 1 : s;
    case 'bl':
      return i ? s + (i.height - 1) * r : s;
    case 'br':
      return n.lastIndexOf(e);
  }
}
function sc(e, t) {
  return t.flatMap((n, r) => (e.includes(n) ? [r] : []));
}
function Kt(e, t, n) {
  if (typeof n == 'function') return n(t);
  if (n) return n.includes(t);
  const r = e.current[t];
  return (
    r == null ||
    r.hasAttribute('disabled') ||
    r.getAttribute('aria-disabled') === 'true'
  );
}
const Mt = () => ({
  getShadowRoot: !0,
  displayCheck:
    typeof ResizeObserver == 'function' &&
    ResizeObserver.toString().includes('[native code]')
      ? 'full'
      : 'none',
});
function ms(e, t) {
  const n = gn(e, Mt()),
    r = n.length;
  if (r === 0) return;
  const o = Ke(ke(e)),
    s = n.indexOf(o),
    i = s === -1 ? (t === 1 ? 0 : r - 1) : s + t;
  return n[i];
}
function hs(e) {
  return ms(ke(e).body, 1) || e;
}
function ps(e) {
  return ms(ke(e).body, -1) || e;
}
function xt(e, t) {
  const n = t || e.currentTarget,
    r = e.relatedTarget;
  return !r || !Ee(n, r);
}
function ic(e) {
  gn(e, Mt()).forEach((n) => {
    (n.dataset.tabindex = n.getAttribute('tabindex') || ''),
      n.setAttribute('tabindex', '-1');
  });
}
function $r(e) {
  e.querySelectorAll('[data-tabindex]').forEach((n) => {
    const r = n.dataset.tabindex;
    delete n.dataset.tabindex,
      r ? n.setAttribute('tabindex', r) : n.removeAttribute('tabindex');
  });
}
const lc = 'data-floating-ui-focusable',
  Hr = 'active',
  Wr = 'selected',
  kt = 'ArrowLeft',
  Ft = 'ArrowRight',
  gs = 'ArrowUp',
  vn = 'ArrowDown',
  ac = { ...xo };
let Ur = !1,
  cc = 0;
const Br = () => 'floating-ui-' + Math.random().toString(36).slice(2, 6) + cc++;
function uc() {
  const [e, t] = f.useState(() => (Ur ? Br() : void 0));
  return (
    fe(() => {
      e == null && t(Br());
    }, []),
    f.useEffect(() => {
      Ur = !0;
    }, []),
    e
  );
}
const fc = ac.useId,
  ur = fc || uc;
function dc() {
  const e = new Map();
  return {
    emit(t, n) {
      var r;
      (r = e.get(t)) == null || r.forEach((o) => o(n));
    },
    on(t, n) {
      e.has(t) || e.set(t, new Set()), e.get(t).add(n);
    },
    off(t, n) {
      var r;
      (r = e.get(t)) == null || r.delete(n);
    },
  };
}
const mc = f.createContext(null),
  hc = f.createContext(null),
  fr = () => {
    var e;
    return ((e = f.useContext(mc)) == null ? void 0 : e.id) || null;
  },
  bn = () => f.useContext(hc);
function Tt(e) {
  return 'data-floating-ui-' + e;
}
function Xn(e) {
  e.current !== -1 && (clearTimeout(e.current), (e.current = -1));
}
let Kr = 0;
function Qe(e, t) {
  t === void 0 && (t = {});
  const { preventScroll: n = !1, cancelPrevious: r = !0, sync: o = !1 } = t;
  r && cancelAnimationFrame(Kr);
  const s = () => (e == null ? void 0 : e.focus({ preventScroll: n }));
  o ? s() : (Kr = requestAnimationFrame(s));
}
function pc(e) {
  return (e == null ? void 0 : e.ownerDocument) || document;
}
const ut = {
  inert: new WeakMap(),
  'aria-hidden': new WeakMap(),
  none: new WeakMap(),
};
function Yr(e) {
  return e === 'inert'
    ? ut.inert
    : e === 'aria-hidden'
      ? ut['aria-hidden']
      : ut.none;
}
let Vt = new WeakSet(),
  $t = {},
  _n = 0;
const gc = () => typeof HTMLElement < 'u' && 'inert' in HTMLElement.prototype,
  vs = (e) => e && (e.host || vs(e.parentNode)),
  vc = (e, t) =>
    t
      .map((n) => {
        if (e.contains(n)) return n;
        const r = vs(n);
        return e.contains(r) ? r : null;
      })
      .filter((n) => n != null);
function bc(e, t, n, r) {
  const o = 'data-floating-ui-inert',
    s = r ? 'inert' : n ? 'aria-hidden' : null,
    i = vc(t, e),
    l = new Set(),
    c = new Set(i),
    a = [];
  $t[o] || ($t[o] = new WeakMap());
  const u = $t[o];
  i.forEach(d), h(t), l.clear();
  function d(m) {
    !m || l.has(m) || (l.add(m), m.parentNode && d(m.parentNode));
  }
  function h(m) {
    !m ||
      c.has(m) ||
      [].forEach.call(m.children, (g) => {
        if (Xe(g) !== 'script')
          if (l.has(g)) h(g);
          else {
            const p = s ? g.getAttribute(s) : null,
              v = p !== null && p !== 'false',
              w = Yr(s),
              y = (w.get(g) || 0) + 1,
              C = (u.get(g) || 0) + 1;
            w.set(g, y),
              u.set(g, C),
              a.push(g),
              y === 1 && v && Vt.add(g),
              C === 1 && g.setAttribute(o, ''),
              !v && s && g.setAttribute(s, s === 'inert' ? '' : 'true');
          }
      });
  }
  return (
    _n++,
    () => {
      a.forEach((m) => {
        const g = Yr(s),
          v = (g.get(m) || 0) - 1,
          w = (u.get(m) || 0) - 1;
        g.set(m, v),
          u.set(m, w),
          v || (!Vt.has(m) && s && m.removeAttribute(s), Vt.delete(m)),
          w || m.removeAttribute(o);
      }),
        _n--,
        _n ||
          ((ut.inert = new WeakMap()),
          (ut['aria-hidden'] = new WeakMap()),
          (ut.none = new WeakMap()),
          (Vt = new WeakSet()),
          ($t = {}));
    }
  );
}
function Gr(e, t, n) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const r = pc(e[0]).body;
  return bc(e.concat(Array.from(r.querySelectorAll('[aria-live]'))), r, t, n);
}
const yn = {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: '1px',
    margin: '-1px',
    overflow: 'hidden',
    padding: 0,
    position: 'fixed',
    whiteSpace: 'nowrap',
    width: '1px',
    top: 0,
    left: 0,
  },
  nn = f.forwardRef(function (t, n) {
    const [r, o] = f.useState();
    fe(() => {
      Wa() && o('button');
    }, []);
    const s = {
      ref: n,
      tabIndex: 0,
      role: r,
      'aria-hidden': r ? void 0 : !0,
      [Tt('focus-guard')]: '',
      style: yn,
    };
    return S.jsx('span', { ...t, ...s });
  }),
  bs = f.createContext(null),
  Xr = Tt('portal');
function yc(e) {
  e === void 0 && (e = {});
  const { id: t, root: n } = e,
    r = ur(),
    o = ys(),
    [s, i] = f.useState(null),
    l = f.useRef(null);
  return (
    fe(
      () => () => {
        s == null || s.remove(),
          queueMicrotask(() => {
            l.current = null;
          });
      },
      [s]
    ),
    fe(() => {
      if (!r || l.current) return;
      const c = t ? document.getElementById(t) : null;
      if (!c) return;
      const a = document.createElement('div');
      (a.id = r),
        a.setAttribute(Xr, ''),
        c.appendChild(a),
        (l.current = a),
        i(a);
    }, [t, r]),
    fe(() => {
      if (n === null || !r || l.current) return;
      let c = n || (o == null ? void 0 : o.portalNode);
      c && !de(c) && (c = c.current), (c = c || document.body);
      let a = null;
      t && ((a = document.createElement('div')), (a.id = t), c.appendChild(a));
      const u = document.createElement('div');
      (u.id = r),
        u.setAttribute(Xr, ''),
        (c = a || c),
        c.appendChild(u),
        (l.current = u),
        i(u);
    }, [t, n, r, o]),
    s
  );
}
function Sc(e) {
  const { children: t, id: n, root: r, preserveTabOrder: o = !0 } = e,
    s = yc({ id: n, root: r }),
    [i, l] = f.useState(null),
    c = f.useRef(null),
    a = f.useRef(null),
    u = f.useRef(null),
    d = f.useRef(null),
    h = i == null ? void 0 : i.modal,
    m = i == null ? void 0 : i.open,
    g = !!i && !i.modal && i.open && o && !!(r || s);
  return (
    f.useEffect(() => {
      if (!s || !o || h) return;
      function p(v) {
        s && xt(v) && (v.type === 'focusin' ? $r : ic)(s);
      }
      return (
        s.addEventListener('focusin', p, !0),
        s.addEventListener('focusout', p, !0),
        () => {
          s.removeEventListener('focusin', p, !0),
            s.removeEventListener('focusout', p, !0);
        }
      );
    }, [s, o, h]),
    f.useEffect(() => {
      s && (m || $r(s));
    }, [m, s]),
    S.jsxs(bs.Provider, {
      value: f.useMemo(
        () => ({
          preserveTabOrder: o,
          beforeOutsideRef: c,
          afterOutsideRef: a,
          beforeInsideRef: u,
          afterInsideRef: d,
          portalNode: s,
          setFocusManagerState: l,
        }),
        [o, s]
      ),
      children: [
        g &&
          s &&
          S.jsx(nn, {
            'data-type': 'outside',
            ref: c,
            onFocus: (p) => {
              if (xt(p, s)) {
                var v;
                (v = u.current) == null || v.focus();
              } else {
                const w = i ? i.domReference : null,
                  y = ps(w);
                y == null || y.focus();
              }
            },
          }),
        g && s && S.jsx('span', { 'aria-owns': s.id, style: yn }),
        s && He.createPortal(t, s),
        g &&
          s &&
          S.jsx(nn, {
            'data-type': 'outside',
            ref: a,
            onFocus: (p) => {
              if (xt(p, s)) {
                var v;
                (v = d.current) == null || v.focus();
              } else {
                const w = i ? i.domReference : null,
                  y = hs(w);
                y == null || y.focus(),
                  i != null &&
                    i.closeOnFocusOut &&
                    (i == null ||
                      i.onOpenChange(!1, p.nativeEvent, 'focus-out'));
              }
            },
          }),
      ],
    })
  );
}
const ys = () => f.useContext(bs);
function qr(e) {
  return f.useMemo(
    () => (t) => {
      e.forEach((n) => {
        n && (n.current = t);
      });
    },
    e
  );
}
const xc = 20;
let et = [];
function wc(e) {
  (et = et.filter((t) => t.isConnected)),
    e &&
      Xe(e) !== 'body' &&
      (et.push(e), et.length > xc && (et = et.slice(-20)));
}
function Zr() {
  return et
    .slice()
    .reverse()
    .find((e) => e.isConnected);
}
function Cc(e) {
  const t = Mt();
  return as(e, t) ? e : gn(e, t)[0] || e;
}
function Jr(e, t) {
  var n;
  if (
    !t.current.includes('floating') &&
    !((n = e.getAttribute('role')) != null && n.includes('dialog'))
  )
    return;
  const r = Mt(),
    s = Ha(e, r).filter((l) => {
      const c = l.getAttribute('data-tabindex') || '';
      return (
        as(l, r) || (l.hasAttribute('data-tabindex') && !c.startsWith('-'))
      );
    }),
    i = e.getAttribute('tabindex');
  t.current.includes('floating') || s.length === 0
    ? i !== '0' && e.setAttribute('tabindex', '0')
    : (i !== '-1' ||
        (e.hasAttribute('data-tabindex') &&
          e.getAttribute('data-tabindex') !== '-1')) &&
      (e.setAttribute('tabindex', '-1'), e.setAttribute('data-tabindex', '-1'));
}
const Rc = f.forwardRef(function (t, n) {
  return S.jsx('button', {
    ...t,
    type: 'button',
    ref: n,
    tabIndex: -1,
    style: yn,
  });
});
function Ec(e) {
  const {
      context: t,
      children: n,
      disabled: r = !1,
      order: o = ['content'],
      guards: s = !0,
      initialFocus: i = 0,
      returnFocus: l = !0,
      restoreFocus: c = !1,
      modal: a = !0,
      visuallyHiddenDismiss: u = !1,
      closeOnFocusOut: d = !0,
      outsideElementsInert: h = !1,
      getInsideElements: m = () => [],
    } = e,
    {
      open: g,
      onOpenChange: p,
      events: v,
      dataRef: w,
      elements: { domReference: y, floating: C },
    } = t,
    x = pe(() => {
      var V;
      return (V = w.current.floatingContext) == null ? void 0 : V.nodeId;
    }),
    T = pe(m),
    b = typeof i == 'number' && i < 0,
    I = Gn(y) && b,
    P = gc(),
    O = P ? s : !0,
    E = !O || (P && h),
    N = De(o),
    U = De(i),
    B = De(l),
    F = bn(),
    R = ys(),
    $ = f.useRef(null),
    D = f.useRef(null),
    A = f.useRef(!1),
    M = f.useRef(!1),
    k = f.useRef(-1),
    X = R != null,
    _ = tn(C),
    q = pe(function (V) {
      return V === void 0 && (V = _), V ? gn(V, Mt()) : [];
    }),
    ee = pe((V) => {
      const Y = q(V);
      return N.current
        .map((W) =>
          y && W === 'reference' ? y : _ && W === 'floating' ? _ : Y
        )
        .filter(Boolean)
        .flat();
    });
  f.useEffect(() => {
    if (r || !a) return;
    function V(W) {
      if (W.key === 'Tab') {
        Ee(_, Ke(ke(_))) && q().length === 0 && !I && be(W);
        const H = ee(),
          ie = Ye(W);
        N.current[0] === 'reference' &&
          ie === y &&
          (be(W), W.shiftKey ? Qe(H[H.length - 1]) : Qe(H[1])),
          N.current[1] === 'floating' &&
            ie === _ &&
            W.shiftKey &&
            (be(W), Qe(H[0]));
      }
    }
    const Y = ke(_);
    return (
      Y.addEventListener('keydown', V),
      () => {
        Y.removeEventListener('keydown', V);
      }
    );
  }, [r, y, _, a, N, I, q, ee]),
    f.useEffect(() => {
      if (r || !C) return;
      function V(Y) {
        const W = Ye(Y),
          ie = q().indexOf(W);
        ie !== -1 && (k.current = ie);
      }
      return (
        C.addEventListener('focusin', V),
        () => {
          C.removeEventListener('focusin', V);
        }
      );
    }, [r, C, q]),
    f.useEffect(() => {
      if (r || !d) return;
      function V() {
        (M.current = !0),
          setTimeout(() => {
            M.current = !1;
          });
      }
      function Y(W) {
        const H = W.relatedTarget,
          ie = W.currentTarget,
          le = Ye(W);
        queueMicrotask(() => {
          const ge = x(),
            ve = !(
              Ee(y, H) ||
              Ee(C, H) ||
              Ee(H, C) ||
              Ee(R == null ? void 0 : R.portalNode, H) ||
              (H != null && H.hasAttribute(Tt('focus-guard'))) ||
              (F &&
                (ct(F.nodesRef.current, ge).find((J) => {
                  var te, Te;
                  return (
                    Ee(
                      (te = J.context) == null ? void 0 : te.elements.floating,
                      H
                    ) ||
                    Ee(
                      (Te = J.context) == null
                        ? void 0
                        : Te.elements.domReference,
                      H
                    )
                  );
                }) ||
                  jr(F.nodesRef.current, ge).find((J) => {
                    var te, Te, j;
                    return (
                      [
                        (te = J.context) == null
                          ? void 0
                          : te.elements.floating,
                        tn(
                          (Te = J.context) == null
                            ? void 0
                            : Te.elements.floating
                        ),
                      ].includes(H) ||
                      ((j = J.context) == null
                        ? void 0
                        : j.elements.domReference) === H
                    );
                  })))
            );
          if (
            (ie === y && _ && Jr(_, N),
            c &&
              ie !== y &&
              !(le != null && le.isConnected) &&
              Ke(ke(_)) === ke(_).body)
          ) {
            he(_) && _.focus();
            const J = k.current,
              te = q(),
              Te = te[J] || te[te.length - 1] || _;
            he(Te) && Te.focus();
          }
          if (w.current.insideReactTree) {
            w.current.insideReactTree = !1;
            return;
          }
          (I || !a) &&
            H &&
            ve &&
            !M.current &&
            H !== Zr() &&
            ((A.current = !0), p(!1, W, 'focus-out'));
        });
      }
      if (C && he(y))
        return (
          y.addEventListener('focusout', Y),
          y.addEventListener('pointerdown', V),
          C.addEventListener('focusout', Y),
          () => {
            y.removeEventListener('focusout', Y),
              y.removeEventListener('pointerdown', V),
              C.removeEventListener('focusout', Y);
          }
        );
    }, [r, y, C, _, a, F, R, p, d, c, q, I, x, N, w]);
  const Ce = f.useRef(null),
    ne = f.useRef(null),
    se = qr([Ce, R == null ? void 0 : R.beforeInsideRef]),
    ce = qr([ne, R == null ? void 0 : R.afterInsideRef]);
  f.useEffect(() => {
    var V, Y;
    if (r || !C) return;
    const W = Array.from(
        (R == null || (V = R.portalNode) == null
          ? void 0
          : V.querySelectorAll('[' + Tt('portal') + ']')) || []
      ),
      H = F ? jr(F.nodesRef.current, x()) : [],
      ie =
        F && !a
          ? H.map((J) => {
              var te;
              return (te = J.context) == null ? void 0 : te.elements.floating;
            })
          : [],
      le =
        (Y = H.find((J) => {
          var te;
          return Gn(
            ((te = J.context) == null ? void 0 : te.elements.domReference) ||
              null
          );
        })) == null || (Y = Y.context) == null
          ? void 0
          : Y.elements.domReference,
      ge = [
        C,
        le,
        ...W,
        ...ie,
        ...T(),
        $.current,
        D.current,
        Ce.current,
        ne.current,
        R == null ? void 0 : R.beforeOutsideRef.current,
        R == null ? void 0 : R.afterOutsideRef.current,
        N.current.includes('reference') || I ? y : null,
      ].filter((J) => J != null),
      ve = a || I ? Gr(ge, !E, E) : Gr(ge);
    return () => {
      ve();
    };
  }, [r, y, C, a, N, R, I, O, E, F, x, T]),
    fe(() => {
      if (r || !he(_)) return;
      const V = ke(_),
        Y = Ke(V);
      queueMicrotask(() => {
        const W = ee(_),
          H = U.current,
          ie = (typeof H == 'number' ? W[H] : H.current) || _,
          le = Ee(_, Y);
        !b && !le && g && Qe(ie, { preventScroll: ie === _ });
      });
    }, [r, g, _, b, ee, U]),
    fe(() => {
      if (r || !_) return;
      const V = ke(_),
        Y = Ke(V);
      wc(Y);
      function W(le) {
        let { reason: ge, event: ve, nested: J } = le;
        if (
          (['hover', 'safe-polygon'].includes(ge) &&
            ve.type === 'mouseleave' &&
            (A.current = !0),
          ge === 'outside-press')
        )
          if (J) A.current = !1;
          else if (fs(ve) || ds(ve)) A.current = !1;
          else {
            let te = !1;
            document.createElement('div').focus({
              get preventScroll() {
                return (te = !0), !1;
              },
            }),
              te ? (A.current = !1) : (A.current = !0);
          }
      }
      v.on('openchange', W);
      const H = V.createElement('span');
      H.setAttribute('tabindex', '-1'),
        H.setAttribute('aria-hidden', 'true'),
        Object.assign(H.style, yn),
        X && y && y.insertAdjacentElement('afterend', H);
      function ie() {
        if (typeof B.current == 'boolean') {
          const le = y || Zr();
          return le && le.isConnected ? le : H;
        }
        return B.current.current || H;
      }
      return () => {
        v.off('openchange', W);
        const le = Ke(V),
          ge =
            Ee(C, le) ||
            (F &&
              ct(F.nodesRef.current, x()).some((J) => {
                var te;
                return Ee(
                  (te = J.context) == null ? void 0 : te.elements.floating,
                  le
                );
              })),
          ve = ie();
        queueMicrotask(() => {
          const J = Cc(ve);
          B.current &&
            !A.current &&
            he(J) &&
            (!(J !== le && le !== V.body) || ge) &&
            J.focus({ preventScroll: !0 }),
            H.remove();
        });
      };
    }, [r, C, _, B, w, v, F, X, y, x]),
    f.useEffect(() => {
      queueMicrotask(() => {
        A.current = !1;
      });
    }, [r]),
    fe(() => {
      if (!r && R)
        return (
          R.setFocusManagerState({
            modal: a,
            closeOnFocusOut: d,
            open: g,
            onOpenChange: p,
            domReference: y,
          }),
          () => {
            R.setFocusManagerState(null);
          }
        );
    }, [r, R, a, g, p, d, y]),
    fe(() => {
      r || (_ && Jr(_, N));
    }, [r, _, N]);
  function Re(V) {
    return r || !u || !a
      ? null
      : S.jsx(Rc, {
          ref: V === 'start' ? $ : D,
          onClick: (Y) => p(!1, Y.nativeEvent),
          children: typeof u == 'string' ? u : 'Dismiss',
        });
  }
  const K = !r && O && (a ? !I : !0) && (X || a);
  return S.jsxs(S.Fragment, {
    children: [
      K &&
        S.jsx(nn, {
          'data-type': 'inside',
          ref: se,
          onFocus: (V) => {
            if (a) {
              const W = ee();
              Qe(o[0] === 'reference' ? W[0] : W[W.length - 1]);
            } else if (R != null && R.preserveTabOrder && R.portalNode)
              if (((A.current = !1), xt(V, R.portalNode))) {
                const W = hs(y);
                W == null || W.focus();
              } else {
                var Y;
                (Y = R.beforeOutsideRef.current) == null || Y.focus();
              }
          },
        }),
      !I && Re('start'),
      n,
      Re('end'),
      K &&
        S.jsx(nn, {
          'data-type': 'inside',
          ref: ce,
          onFocus: (V) => {
            if (a) Qe(ee()[0]);
            else if (R != null && R.preserveTabOrder && R.portalNode)
              if ((d && (A.current = !0), xt(V, R.portalNode))) {
                const W = ps(y);
                W == null || W.focus();
              } else {
                var Y;
                (Y = R.afterOutsideRef.current) == null || Y.focus();
              }
          },
        }),
    ],
  });
}
let Ht = 0;
const Qr = '--floating-ui-scrollbar-width';
function Tc() {
  const e = cs(),
    t =
      /iP(hone|ad|od)|iOS/.test(e) ||
      (e === 'MacIntel' && navigator.maxTouchPoints > 1),
    n = document.body.style,
    o =
      Math.round(document.documentElement.getBoundingClientRect().left) +
      document.documentElement.scrollLeft
        ? 'paddingLeft'
        : 'paddingRight',
    s = window.innerWidth - document.documentElement.clientWidth,
    i = n.left ? parseFloat(n.left) : window.scrollX,
    l = n.top ? parseFloat(n.top) : window.scrollY;
  if (
    ((n.overflow = 'hidden'),
    n.setProperty(Qr, s + 'px'),
    s && (n[o] = s + 'px'),
    t)
  ) {
    var c, a;
    const u =
        ((c = window.visualViewport) == null ? void 0 : c.offsetLeft) || 0,
      d = ((a = window.visualViewport) == null ? void 0 : a.offsetTop) || 0;
    Object.assign(n, {
      position: 'fixed',
      top: -(l - Math.floor(d)) + 'px',
      left: -(i - Math.floor(u)) + 'px',
      right: '0',
    });
  }
  return () => {
    Object.assign(n, { overflow: '', [o]: '' }),
      n.removeProperty(Qr),
      t &&
        (Object.assign(n, { position: '', top: '', left: '', right: '' }),
        window.scrollTo(i, l));
  };
}
let eo = () => {};
const Ic = f.forwardRef(function (t, n) {
  const { lockScroll: r = !1, ...o } = t;
  return (
    fe(() => {
      if (r)
        return (
          Ht++,
          Ht === 1 && (eo = Tc()),
          () => {
            Ht--, Ht === 0 && eo();
          }
        );
    }, [r]),
    S.jsx('div', {
      ref: n,
      ...o,
      style: {
        position: 'fixed',
        overflow: 'auto',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        ...o.style,
      },
    })
  );
});
function to(e) {
  return he(e.target) && e.target.tagName === 'BUTTON';
}
function Ac(e) {
  return he(e.target) && e.target.tagName === 'A';
}
function no(e) {
  return us(e);
}
function Pc(e, t) {
  t === void 0 && (t = {});
  const {
      open: n,
      onOpenChange: r,
      dataRef: o,
      elements: { domReference: s },
    } = e,
    {
      enabled: i = !0,
      event: l = 'click',
      toggle: c = !0,
      ignoreMouse: a = !1,
      keyboardHandlers: u = !0,
      stickIfOpen: d = !0,
    } = t,
    h = f.useRef(),
    m = f.useRef(!1),
    g = f.useMemo(
      () => ({
        onPointerDown(p) {
          h.current = p.pointerType;
        },
        onMouseDown(p) {
          const v = h.current;
          p.button === 0 &&
            l !== 'click' &&
            ((zr(v) && a) ||
              (n &&
              c &&
              (!(o.current.openEvent && d) ||
                o.current.openEvent.type === 'mousedown')
                ? r(!1, p.nativeEvent, 'click')
                : (p.preventDefault(), r(!0, p.nativeEvent, 'click'))));
        },
        onClick(p) {
          const v = h.current;
          if (l === 'mousedown' && h.current) {
            h.current = void 0;
            return;
          }
          (zr(v) && a) ||
            (n &&
            c &&
            (!(o.current.openEvent && d) ||
              o.current.openEvent.type === 'click')
              ? r(!1, p.nativeEvent, 'click')
              : r(!0, p.nativeEvent, 'click'));
        },
        onKeyDown(p) {
          (h.current = void 0),
            !(p.defaultPrevented || !u || to(p)) &&
              (p.key === ' ' &&
                !no(s) &&
                (p.preventDefault(), (m.current = !0)),
              !Ac(p) &&
                p.key === 'Enter' &&
                r(!(n && c), p.nativeEvent, 'click'));
        },
        onKeyUp(p) {
          p.defaultPrevented ||
            !u ||
            to(p) ||
            no(s) ||
            (p.key === ' ' &&
              m.current &&
              ((m.current = !1), r(!(n && c), p.nativeEvent, 'click')));
        },
      }),
      [o, s, l, a, u, r, n, d, c]
    );
  return f.useMemo(() => (i ? { reference: g } : {}), [i, g]);
}
const Oc = {
    pointerdown: 'onPointerDown',
    mousedown: 'onMouseDown',
    click: 'onClick',
  },
  Mc = {
    pointerdown: 'onPointerDownCapture',
    mousedown: 'onMouseDownCapture',
    click: 'onClickCapture',
  },
  ro = (e) => {
    var t, n;
    return {
      escapeKey:
        typeof e == 'boolean'
          ? e
          : (t = e == null ? void 0 : e.escapeKey) != null
            ? t
            : !1,
      outsidePress:
        typeof e == 'boolean'
          ? e
          : (n = e == null ? void 0 : e.outsidePress) != null
            ? n
            : !0,
    };
  };
function kc(e, t) {
  t === void 0 && (t = {});
  const { open: n, onOpenChange: r, elements: o, dataRef: s } = e,
    {
      enabled: i = !0,
      escapeKey: l = !0,
      outsidePress: c = !0,
      outsidePressEvent: a = 'pointerdown',
      referencePress: u = !1,
      referencePressEvent: d = 'pointerdown',
      ancestorScroll: h = !1,
      bubbles: m,
      capture: g,
    } = t,
    p = bn(),
    v = pe(typeof c == 'function' ? c : () => !1),
    w = typeof c == 'function' ? v : c,
    y = f.useRef(!1),
    { escapeKey: C, outsidePress: x } = ro(m),
    { escapeKey: T, outsidePress: b } = ro(g),
    I = f.useRef(!1),
    P = f.useRef(-1),
    O = pe((R) => {
      var $;
      if (!n || !i || !l || R.key !== 'Escape' || I.current) return;
      const D = ($ = s.current.floatingContext) == null ? void 0 : $.nodeId,
        A = p ? ct(p.nodesRef.current, D) : [];
      if (!C && (R.stopPropagation(), A.length > 0)) {
        let M = !0;
        if (
          (A.forEach((k) => {
            var X;
            if (
              (X = k.context) != null &&
              X.open &&
              !k.context.dataRef.current.__escapeKeyBubbles
            ) {
              M = !1;
              return;
            }
          }),
          !M)
        )
          return;
      }
      r(!1, qa(R) ? R.nativeEvent : R, 'escape-key');
    }),
    E = pe((R) => {
      var $;
      const D = () => {
        var A;
        O(R), (A = Ye(R)) == null || A.removeEventListener('keydown', D);
      };
      ($ = Ye(R)) == null || $.addEventListener('keydown', D);
    }),
    N = pe((R) => {
      var $;
      const D = s.current.insideReactTree;
      s.current.insideReactTree = !1;
      const A = y.current;
      if (
        ((y.current = !1),
        (a === 'click' && A) || D || (typeof w == 'function' && !w(R)))
      )
        return;
      const M = Ye(R),
        k = '[' + Tt('inert') + ']',
        X = ke(o.floating).querySelectorAll(k);
      let _ = de(M) ? M : null;
      for (; _ && !$e(_); ) {
        const ne = We(_);
        if ($e(ne) || !de(ne)) break;
        _ = ne;
      }
      if (
        X.length &&
        de(M) &&
        !Ga(M) &&
        !Ee(M, o.floating) &&
        Array.from(X).every((ne) => !Ee(_, ne))
      )
        return;
      if (he(M) && F) {
        const ne = $e(M),
          se = Fe(M),
          ce = /auto|scroll/,
          Re = ne || ce.test(se.overflowX),
          K = ne || ce.test(se.overflowY),
          V = Re && M.clientWidth > 0 && M.scrollWidth > M.clientWidth,
          Y = K && M.clientHeight > 0 && M.scrollHeight > M.clientHeight,
          W = se.direction === 'rtl',
          H =
            Y &&
            (W
              ? R.offsetX <= M.offsetWidth - M.clientWidth
              : R.offsetX > M.clientWidth),
          ie = V && R.offsetY > M.clientHeight;
        if (H || ie) return;
      }
      const q = ($ = s.current.floatingContext) == null ? void 0 : $.nodeId,
        ee =
          p &&
          ct(p.nodesRef.current, q).some((ne) => {
            var se;
            return Dn(
              R,
              (se = ne.context) == null ? void 0 : se.elements.floating
            );
          });
      if (Dn(R, o.floating) || Dn(R, o.domReference) || ee) return;
      const Ce = p ? ct(p.nodesRef.current, q) : [];
      if (Ce.length > 0) {
        let ne = !0;
        if (
          (Ce.forEach((se) => {
            var ce;
            if (
              (ce = se.context) != null &&
              ce.open &&
              !se.context.dataRef.current.__outsidePressBubbles
            ) {
              ne = !1;
              return;
            }
          }),
          !ne)
        )
          return;
      }
      r(!1, R, 'outside-press');
    }),
    U = pe((R) => {
      var $;
      const D = () => {
        var A;
        N(R), (A = Ye(R)) == null || A.removeEventListener(a, D);
      };
      ($ = Ye(R)) == null || $.addEventListener(a, D);
    });
  f.useEffect(() => {
    if (!n || !i) return;
    (s.current.__escapeKeyBubbles = C), (s.current.__outsidePressBubbles = x);
    let R = -1;
    function $(X) {
      r(!1, X, 'ancestor-scroll');
    }
    function D() {
      window.clearTimeout(R), (I.current = !0);
    }
    function A() {
      R = window.setTimeout(
        () => {
          I.current = !1;
        },
        mn() ? 5 : 0
      );
    }
    const M = ke(o.floating);
    l &&
      (M.addEventListener('keydown', T ? E : O, T),
      M.addEventListener('compositionstart', D),
      M.addEventListener('compositionend', A)),
      w && M.addEventListener(a, b ? U : N, b);
    let k = [];
    return (
      h &&
        (de(o.domReference) && (k = Ge(o.domReference)),
        de(o.floating) && (k = k.concat(Ge(o.floating))),
        !de(o.reference) &&
          o.reference &&
          o.reference.contextElement &&
          (k = k.concat(Ge(o.reference.contextElement)))),
      (k = k.filter((X) => {
        var _;
        return X !== ((_ = M.defaultView) == null ? void 0 : _.visualViewport);
      })),
      k.forEach((X) => {
        X.addEventListener('scroll', $, { passive: !0 });
      }),
      () => {
        l &&
          (M.removeEventListener('keydown', T ? E : O, T),
          M.removeEventListener('compositionstart', D),
          M.removeEventListener('compositionend', A)),
          w && M.removeEventListener(a, b ? U : N, b),
          k.forEach((X) => {
            X.removeEventListener('scroll', $);
          }),
          window.clearTimeout(R);
      }
    );
  }, [s, o, l, w, a, n, r, h, i, C, x, O, T, E, N, b, U]),
    f.useEffect(() => {
      s.current.insideReactTree = !1;
    }, [s, w, a]);
  const B = f.useMemo(
      () => ({
        onKeyDown: O,
        ...(u && {
          [Oc[d]]: (R) => {
            r(!1, R.nativeEvent, 'reference-press');
          },
          ...(d !== 'click' && {
            onClick(R) {
              r(!1, R.nativeEvent, 'reference-press');
            },
          }),
        }),
      }),
      [O, r, u, d]
    ),
    F = f.useMemo(
      () => ({
        onKeyDown: O,
        onMouseDown() {
          y.current = !0;
        },
        onMouseUp() {
          y.current = !0;
        },
        [Mc[a]]: () => {
          s.current.insideReactTree = !0;
        },
        onBlurCapture() {
          p ||
            (Xn(P),
            (s.current.insideReactTree = !0),
            (P.current = window.setTimeout(() => {
              s.current.insideReactTree = !1;
            })));
        },
      }),
      [O, a, s, p]
    );
  return f.useMemo(() => (i ? { reference: B, floating: F } : {}), [i, B, F]);
}
function Fc(e) {
  const { open: t = !1, onOpenChange: n, elements: r } = e,
    o = ur(),
    s = f.useRef({}),
    [i] = f.useState(() => dc()),
    l = fr() != null,
    [c, a] = f.useState(r.reference),
    u = pe((m, g, p) => {
      (s.current.openEvent = m ? g : void 0),
        i.emit('openchange', { open: m, event: g, reason: p, nested: l }),
        n == null || n(m, g, p);
    }),
    d = f.useMemo(() => ({ setPositionReference: a }), []),
    h = f.useMemo(
      () => ({
        reference: c || r.reference || null,
        floating: r.floating || null,
        domReference: r.reference,
      }),
      [c, r.reference, r.floating]
    );
  return f.useMemo(
    () => ({
      dataRef: s,
      open: t,
      onOpenChange: u,
      elements: h,
      events: i,
      floatingId: o,
      refs: d,
    }),
    [t, u, h, i, o, d]
  );
}
function Ss(e) {
  e === void 0 && (e = {});
  const { nodeId: t } = e,
    n = Fc({
      ...e,
      elements: { reference: null, floating: null, ...e.elements },
    }),
    r = e.rootContext || n,
    o = r.elements,
    [s, i] = f.useState(null),
    [l, c] = f.useState(null),
    u = (o == null ? void 0 : o.domReference) || s,
    d = f.useRef(null),
    h = bn();
  fe(() => {
    u && (d.current = u);
  }, [u]);
  const m = Ea({ ...e, elements: { ...o, ...(l && { reference: l }) } }),
    g = f.useCallback(
      (C) => {
        const x = de(C)
          ? {
              getBoundingClientRect: () => C.getBoundingClientRect(),
              getClientRects: () => C.getClientRects(),
              contextElement: C,
            }
          : C;
        c(x), m.refs.setReference(x);
      },
      [m.refs]
    ),
    p = f.useCallback(
      (C) => {
        (de(C) || C === null) && ((d.current = C), i(C)),
          (de(m.refs.reference.current) ||
            m.refs.reference.current === null ||
            (C !== null && !de(C))) &&
            m.refs.setReference(C);
      },
      [m.refs]
    ),
    v = f.useMemo(
      () => ({
        ...m.refs,
        setReference: p,
        setPositionReference: g,
        domReference: d,
      }),
      [m.refs, p, g]
    ),
    w = f.useMemo(() => ({ ...m.elements, domReference: u }), [m.elements, u]),
    y = f.useMemo(
      () => ({ ...m, ...r, refs: v, elements: w, nodeId: t }),
      [m, v, w, t, r]
    );
  return (
    fe(() => {
      r.dataRef.current.floatingContext = y;
      const C = h == null ? void 0 : h.nodesRef.current.find((x) => x.id === t);
      C && (C.context = y);
    }),
    f.useMemo(() => ({ ...m, context: y, refs: v, elements: w }), [m, v, w, y])
  );
}
function jn(e, t, n) {
  const r = new Map(),
    o = n === 'item';
  let s = e;
  if (o && e) {
    const { [Hr]: i, [Wr]: l, ...c } = e;
    s = c;
  }
  return {
    ...(n === 'floating' && { tabIndex: -1, [lc]: '' }),
    ...s,
    ...t
      .map((i) => {
        const l = i ? i[n] : null;
        return typeof l == 'function' ? (e ? l(e) : null) : l;
      })
      .concat(e)
      .reduce(
        (i, l) => (
          l &&
            Object.entries(l).forEach((c) => {
              let [a, u] = c;
              if (!(o && [Hr, Wr].includes(a)))
                if (a.indexOf('on') === 0) {
                  if ((r.has(a) || r.set(a, []), typeof u == 'function')) {
                    var d;
                    (d = r.get(a)) == null || d.push(u),
                      (i[a] = function () {
                        for (
                          var h, m = arguments.length, g = new Array(m), p = 0;
                          p < m;
                          p++
                        )
                          g[p] = arguments[p];
                        return (h = r.get(a)) == null
                          ? void 0
                          : h.map((v) => v(...g)).find((v) => v !== void 0);
                      });
                  }
                } else i[a] = u;
            }),
          i
        ),
        {}
      ),
  };
}
function Nc(e) {
  e === void 0 && (e = []);
  const t = e.map((l) => (l == null ? void 0 : l.reference)),
    n = e.map((l) => (l == null ? void 0 : l.floating)),
    r = e.map((l) => (l == null ? void 0 : l.item)),
    o = f.useCallback((l) => jn(l, e, 'reference'), t),
    s = f.useCallback((l) => jn(l, e, 'floating'), n),
    i = f.useCallback((l) => jn(l, e, 'item'), r);
  return f.useMemo(
    () => ({ getReferenceProps: o, getFloatingProps: s, getItemProps: i }),
    [o, s, i]
  );
}
const Dc = 'Escape';
function Sn(e, t, n) {
  switch (e) {
    case 'vertical':
      return t;
    case 'horizontal':
      return n;
    default:
      return t || n;
  }
}
function Wt(e, t) {
  return Sn(t, e === gs || e === vn, e === kt || e === Ft);
}
function zn(e, t, n) {
  return (
    Sn(t, e === vn, n ? e === kt : e === Ft) ||
    e === 'Enter' ||
    e === ' ' ||
    e === ''
  );
}
function oo(e, t, n) {
  return Sn(t, n ? e === kt : e === Ft, e === vn);
}
function so(e, t, n, r) {
  const o = n ? e === Ft : e === kt,
    s = e === gs;
  return t === 'both' || (t === 'horizontal' && r && r > 1)
    ? e === Dc
    : Sn(t, o, s);
}
function Lc(e, t) {
  const { open: n, onOpenChange: r, elements: o, floatingId: s } = e,
    {
      listRef: i,
      activeIndex: l,
      onNavigate: c = () => {},
      enabled: a = !0,
      selectedIndex: u = null,
      allowEscape: d = !1,
      loop: h = !1,
      nested: m = !1,
      rtl: g = !1,
      virtual: p = !1,
      focusItemOnOpen: v = 'auto',
      focusItemOnHover: w = !0,
      openOnArrowKeyDown: y = !0,
      disabledIndices: C = void 0,
      orientation: x = 'vertical',
      parentOrientation: T,
      cols: b = 1,
      scrollItemIntoView: I = !0,
      virtualItemRef: P,
      itemSizes: O,
      dense: E = !1,
    } = t,
    N = tn(o.floating),
    U = De(N),
    B = fr(),
    F = bn();
  fe(() => {
    e.dataRef.current.orientation = x;
  }, [e, x]);
  const R = pe(() => {
      c(A.current === -1 ? null : A.current);
    }),
    $ = Gn(o.domReference),
    D = f.useRef(v),
    A = f.useRef(u ?? -1),
    M = f.useRef(null),
    k = f.useRef(!0),
    X = f.useRef(R),
    _ = f.useRef(!!o.floating),
    q = f.useRef(n),
    ee = f.useRef(!1),
    Ce = f.useRef(!1),
    ne = De(C),
    se = De(n),
    ce = De(I),
    Re = De(u),
    [K, V] = f.useState(),
    [Y, W] = f.useState(),
    H = pe(() => {
      function j(oe) {
        if (p) {
          var ue;
          (ue = oe.id) != null &&
            ue.endsWith('-fui-option') &&
            (oe.id = s + '-' + Math.random().toString(16).slice(2, 10)),
            V(oe.id),
            F == null || F.events.emit('virtualfocus', oe),
            P && (P.current = oe);
        } else Qe(oe, { sync: ee.current, preventScroll: !0 });
      }
      const Z = i.current[A.current],
        z = Ce.current;
      Z && j(Z),
        (ee.current ? (oe) => oe() : requestAnimationFrame)(() => {
          const oe = i.current[A.current] || Z;
          if (!oe) return;
          Z || j(oe);
          const ue = ce.current;
          ue &&
            le &&
            (z || !k.current) &&
            (oe.scrollIntoView == null ||
              oe.scrollIntoView(
                typeof ue == 'boolean'
                  ? { block: 'nearest', inline: 'nearest' }
                  : ue
              ));
        });
    });
  fe(() => {
    a &&
      (n && o.floating
        ? D.current && u != null && ((Ce.current = !0), (A.current = u), R())
        : _.current && ((A.current = -1), X.current()));
  }, [a, n, o.floating, u, R]),
    fe(() => {
      if (a && n && o.floating)
        if (l == null) {
          if (((ee.current = !1), Re.current != null)) return;
          if (
            (_.current && ((A.current = -1), H()),
            (!q.current || !_.current) &&
              D.current &&
              (M.current != null || (D.current === !0 && M.current == null)))
          ) {
            let j = 0;
            const Z = () => {
              i.current[0] == null
                ? (j < 2 && (j ? requestAnimationFrame : queueMicrotask)(Z),
                  j++)
                : ((A.current =
                    M.current == null || zn(M.current, x, g) || m
                      ? Ln(i, ne.current)
                      : Vr(i, ne.current)),
                  (M.current = null),
                  R());
            };
            Z();
          }
        } else St(i, l) || ((A.current = l), H(), (Ce.current = !1));
    }, [a, n, o.floating, l, Re, m, i, x, g, R, H, ne]),
    fe(() => {
      var j;
      if (!a || o.floating || !F || p || !_.current) return;
      const Z = F.nodesRef.current,
        z =
          (j = Z.find((ue) => ue.id === B)) == null || (j = j.context) == null
            ? void 0
            : j.elements.floating,
        re = Ke(ke(o.floating)),
        oe = Z.some((ue) => ue.context && Ee(ue.context.elements.floating, re));
      z && !oe && k.current && z.focus({ preventScroll: !0 });
    }, [a, o.floating, F, B, p]),
    fe(() => {
      if (!a || !F || !p || B) return;
      function j(Z) {
        W(Z.id), P && (P.current = Z);
      }
      return (
        F.events.on('virtualfocus', j),
        () => {
          F.events.off('virtualfocus', j);
        }
      );
    }, [a, F, p, B, P]),
    fe(() => {
      (X.current = R), (q.current = n), (_.current = !!o.floating);
    }),
    fe(() => {
      n || ((M.current = null), (D.current = v));
    }, [n, v]);
  const ie = l != null,
    le = f.useMemo(() => {
      function j(z) {
        if (!se.current) return;
        const re = i.current.indexOf(z);
        re !== -1 && A.current !== re && ((A.current = re), R());
      }
      return {
        onFocus(z) {
          let { currentTarget: re } = z;
          (ee.current = !0), j(re);
        },
        onClick: (z) => {
          let { currentTarget: re } = z;
          return re.focus({ preventScroll: !0 });
        },
        ...(w && {
          onMouseMove(z) {
            let { currentTarget: re } = z;
            (ee.current = !0), (Ce.current = !1), j(re);
          },
          onPointerLeave(z) {
            let { pointerType: re } = z;
            if (
              !(!k.current || re === 'touch') &&
              ((ee.current = !0), (A.current = -1), R(), !p)
            ) {
              var oe;
              (oe = U.current) == null || oe.focus({ preventScroll: !0 });
            }
          },
        }),
      };
    }, [se, U, w, i, R, p]),
    ge = f.useCallback(() => {
      var j;
      return (
        T ??
        (F == null ||
        (j = F.nodesRef.current.find((Z) => Z.id === B)) == null ||
        (j = j.context) == null ||
        (j = j.dataRef) == null
          ? void 0
          : j.current.orientation)
      );
    }, [B, F, T]),
    ve = pe((j) => {
      if (
        ((k.current = !1),
        (ee.current = !0),
        j.which === 229 || (!se.current && j.currentTarget === U.current))
      )
        return;
      if (m && so(j.key, x, g, b)) {
        Wt(j.key, ge()) || be(j),
          r(!1, j.nativeEvent, 'list-navigation'),
          he(o.domReference) &&
            (p
              ? F == null || F.events.emit('virtualfocus', o.domReference)
              : o.domReference.focus());
        return;
      }
      const Z = A.current,
        z = Ln(i, C),
        re = Vr(i, C);
      if (
        ($ ||
          (j.key === 'Home' && (be(j), (A.current = z), R()),
          j.key === 'End' && (be(j), (A.current = re), R())),
        b > 1)
      ) {
        const oe =
            O ||
            Array.from({ length: i.current.length }, () => ({
              width: 1,
              height: 1,
            })),
          ue = rc(oe, b, E),
          Be = ue.findIndex((Q) => Q != null && !Kt(i, Q, C)),
          nt = ue.reduce(
            (Q, ye, qe) => (ye != null && !Kt(i, ye, C) ? qe : Q),
            -1
          ),
          G =
            ue[
              nc(
                { current: ue.map((Q) => (Q != null ? i.current[Q] : null)) },
                {
                  event: j,
                  orientation: x,
                  loop: h,
                  rtl: g,
                  cols: b,
                  disabledIndices: sc(
                    [
                      ...((typeof C != 'function' ? C : null) ||
                        i.current.map((Q, ye) => (Kt(i, ye, C) ? ye : void 0))),
                      void 0,
                    ],
                    ue
                  ),
                  minIndex: Be,
                  maxIndex: nt,
                  prevIndex: oc(
                    A.current > re ? z : A.current,
                    oe,
                    ue,
                    b,
                    j.key === vn ? 'bl' : j.key === (g ? kt : Ft) ? 'tr' : 'tl'
                  ),
                  stopEvent: !0,
                }
              )
            ];
        if ((G != null && ((A.current = G), R()), x === 'both')) return;
      }
      if (Wt(j.key, x)) {
        if (
          (be(j),
          n && !p && Ke(j.currentTarget.ownerDocument) === j.currentTarget)
        ) {
          (A.current = zn(j.key, x, g) ? z : re), R();
          return;
        }
        zn(j.key, x, g)
          ? h
            ? (A.current =
                Z >= re
                  ? d && Z !== i.current.length
                    ? -1
                    : z
                  : Se(i, { startingIndex: Z, disabledIndices: C }))
            : (A.current = Math.min(
                re,
                Se(i, { startingIndex: Z, disabledIndices: C })
              ))
          : h
            ? (A.current =
                Z <= z
                  ? d && Z !== -1
                    ? i.current.length
                    : re
                  : Se(i, {
                      startingIndex: Z,
                      decrement: !0,
                      disabledIndices: C,
                    }))
            : (A.current = Math.max(
                z,
                Se(i, { startingIndex: Z, decrement: !0, disabledIndices: C })
              )),
          St(i, A.current) && (A.current = -1),
          R();
      }
    }),
    J = f.useMemo(
      () => p && n && ie && { 'aria-activedescendant': Y || K },
      [p, n, ie, Y, K]
    ),
    te = f.useMemo(
      () => ({
        'aria-orientation': x === 'both' ? void 0 : x,
        ...($ ? {} : J),
        onKeyDown: ve,
        onPointerMove() {
          k.current = !0;
        },
      }),
      [J, ve, x, $]
    ),
    Te = f.useMemo(() => {
      function j(z) {
        v === 'auto' && fs(z.nativeEvent) && (D.current = !0);
      }
      function Z(z) {
        (D.current = v), v === 'auto' && ds(z.nativeEvent) && (D.current = !0);
      }
      return {
        ...J,
        onKeyDown(z) {
          k.current = !1;
          const re = z.key.startsWith('Arrow'),
            oe = ['Home', 'End'].includes(z.key),
            ue = re || oe,
            Be = oo(z.key, x, g),
            nt = so(z.key, x, g, b),
            G = oo(z.key, ge(), g),
            Q = Wt(z.key, x),
            ye = (m ? G : Q) || z.key === 'Enter' || z.key.trim() === '';
          if (p && n) {
            const Ze =
                F == null
                  ? void 0
                  : F.nodesRef.current.find((xe) => xe.parentId == null),
              Oe = F && Ze ? Xa(F.nodesRef.current, Ze.id) : null;
            if (ue && Oe && P) {
              const xe = new KeyboardEvent('keydown', {
                key: z.key,
                bubbles: !0,
              });
              if (Be || nt) {
                var qe, rt;
                const Ie =
                    ((qe = Oe.context) == null
                      ? void 0
                      : qe.elements.domReference) === z.currentTarget,
                  Ne =
                    nt && !Ie
                      ? (rt = Oe.context) == null
                        ? void 0
                        : rt.elements.domReference
                      : Be
                        ? i.current.find(
                            (Me) => (Me == null ? void 0 : Me.id) === K
                          )
                        : null;
                Ne && (be(z), Ne.dispatchEvent(xe), W(void 0));
              }
              if (
                (Q || oe) &&
                Oe.context &&
                Oe.context.open &&
                Oe.parentId &&
                z.currentTarget !== Oe.context.elements.domReference
              ) {
                var Nt;
                be(z),
                  (Nt = Oe.context.elements.domReference) == null ||
                    Nt.dispatchEvent(xe);
                return;
              }
            }
            return ve(z);
          }
          if (!(!n && !y && re)) {
            if (ye) {
              const Ze = Wt(z.key, ge());
              M.current = m && Ze ? null : z.key;
            }
            if (m) {
              G &&
                (be(z),
                n
                  ? ((A.current = Ln(i, ne.current)), R())
                  : r(!0, z.nativeEvent, 'list-navigation'));
              return;
            }
            Q &&
              (u != null && (A.current = u),
              be(z),
              !n && y ? r(!0, z.nativeEvent, 'list-navigation') : ve(z),
              n && R());
          }
        },
        onFocus() {
          n && !p && ((A.current = -1), R());
        },
        onPointerDown: Z,
        onPointerEnter: Z,
        onMouseDown: j,
        onClick: j,
      };
    }, [K, J, b, ve, ne, v, i, m, R, r, n, y, x, ge, g, u, F, p, P]);
  return f.useMemo(
    () => (a ? { reference: Te, floating: te, item: le } : {}),
    [a, Te, te, le]
  );
}
const _c = new Map([
  ['select', 'listbox'],
  ['combobox', 'listbox'],
  ['label', !1],
]);
function jc(e, t) {
  var n, r;
  t === void 0 && (t = {});
  const { open: o, elements: s, floatingId: i } = e,
    { enabled: l = !0, role: c = 'dialog' } = t,
    a = ur(),
    u = ((n = s.domReference) == null ? void 0 : n.id) || a,
    d = f.useMemo(() => {
      var y;
      return ((y = tn(s.floating)) == null ? void 0 : y.id) || i;
    }, [s.floating, i]),
    h = (r = _c.get(c)) != null ? r : c,
    g = fr() != null,
    p = f.useMemo(
      () =>
        h === 'tooltip' || c === 'label'
          ? {
              ['aria-' + (c === 'label' ? 'labelledby' : 'describedby')]: o
                ? d
                : void 0,
            }
          : {
              'aria-expanded': o ? 'true' : 'false',
              'aria-haspopup': h === 'alertdialog' ? 'dialog' : h,
              'aria-controls': o ? d : void 0,
              ...(h === 'listbox' && { role: 'combobox' }),
              ...(h === 'menu' && { id: u }),
              ...(h === 'menu' && g && { role: 'menuitem' }),
              ...(c === 'select' && { 'aria-autocomplete': 'none' }),
              ...(c === 'combobox' && { 'aria-autocomplete': 'list' }),
            },
      [h, d, g, o, u, c]
    ),
    v = f.useMemo(() => {
      const y = { id: d, ...(h && { role: h }) };
      return h === 'tooltip' || c === 'label'
        ? y
        : { ...y, ...(h === 'menu' && { 'aria-labelledby': u }) };
    }, [h, d, u, c]),
    w = f.useCallback(
      (y) => {
        let { active: C, selected: x } = y;
        const T = { role: 'option', ...(C && { id: d + '-fui-option' }) };
        switch (c) {
          case 'select':
            return { ...T, 'aria-selected': C && x };
          case 'combobox':
            return { ...T, 'aria-selected': x };
        }
        return {};
      },
      [d, c]
    );
  return f.useMemo(
    () => (l ? { reference: p, floating: v, item: w } : {}),
    [l, p, v, w]
  );
}
function zc(e, t) {
  var n;
  const { open: r, dataRef: o } = e,
    {
      listRef: s,
      activeIndex: i,
      onMatch: l,
      onTypingChange: c,
      enabled: a = !0,
      findMatch: u = null,
      resetMs: d = 750,
      ignoreKeys: h = [],
      selectedIndex: m = null,
    } = t,
    g = f.useRef(-1),
    p = f.useRef(''),
    v = f.useRef((n = m ?? i) != null ? n : -1),
    w = f.useRef(null),
    y = pe(l),
    C = pe(c),
    x = De(u),
    T = De(h);
  fe(() => {
    r && (Xn(g), (w.current = null), (p.current = ''));
  }, [r]),
    fe(() => {
      if (r && p.current === '') {
        var E;
        v.current = (E = m ?? i) != null ? E : -1;
      }
    }, [r, m, i]);
  const b = pe((E) => {
      E
        ? o.current.typing || ((o.current.typing = E), C(E))
        : o.current.typing && ((o.current.typing = E), C(E));
    }),
    I = pe((E) => {
      function N($, D, A) {
        const M = x.current
          ? x.current(D, A)
          : D.find(
              (k) =>
                (k == null
                  ? void 0
                  : k.toLocaleLowerCase().indexOf(A.toLocaleLowerCase())) === 0
            );
        return M ? $.indexOf(M) : -1;
      }
      const U = s.current;
      if (
        (p.current.length > 0 &&
          p.current[0] !== ' ' &&
          (N(U, U, p.current) === -1 ? b(!1) : E.key === ' ' && be(E)),
        U == null ||
          T.current.includes(E.key) ||
          E.key.length !== 1 ||
          E.ctrlKey ||
          E.metaKey ||
          E.altKey)
      )
        return;
      r && E.key !== ' ' && (be(E), b(!0)),
        U.every(($) => {
          var D, A;
          return $
            ? ((D = $[0]) == null ? void 0 : D.toLocaleLowerCase()) !==
                ((A = $[1]) == null ? void 0 : A.toLocaleLowerCase())
            : !0;
        }) &&
          p.current === E.key &&
          ((p.current = ''), (v.current = w.current)),
        (p.current += E.key),
        Xn(g),
        (g.current = window.setTimeout(() => {
          (p.current = ''), (v.current = w.current), b(!1);
        }, d));
      const F = v.current,
        R = N(
          U,
          [...U.slice((F || 0) + 1), ...U.slice(0, (F || 0) + 1)],
          p.current
        );
      R !== -1
        ? (y(R), (w.current = R))
        : E.key !== ' ' && ((p.current = ''), b(!1));
    }),
    P = f.useMemo(() => ({ onKeyDown: I }), [I]),
    O = f.useMemo(
      () => ({
        onKeyDown: I,
        onKeyUp(E) {
          E.key === ' ' && b(!1);
        },
      }),
      [I, b]
    );
  return f.useMemo(() => (a ? { reference: P, floating: O } : {}), [a, P, O]);
}
function io(e, t) {
  return {
    ...e,
    rects: { ...e.rects, floating: { ...e.rects.floating, height: t } },
  };
}
const Vc = (e) => ({
  name: 'inner',
  options: e,
  async fn(t) {
    const {
        listRef: n,
        overflowRef: r,
        onFallbackChange: o,
        offset: s = 0,
        index: i = 0,
        minItemsVisible: l = 4,
        referenceOverflowThreshold: c = 0,
        scrollRef: a,
        ...u
      } = an(e, t),
      {
        rects: d,
        elements: { floating: h },
      } = t,
      m = n.current[i],
      g = (a == null ? void 0 : a.current) || h,
      p = h.clientTop || g.clientTop,
      v = h.clientTop !== 0,
      w = g.clientTop !== 0,
      y = h === g;
    if (!m) return {};
    const C = {
        ...t,
        ...(await ar(
          -m.offsetTop -
            h.clientTop -
            d.reference.height / 2 -
            m.offsetHeight / 2 -
            s
        ).fn(t)),
      },
      x = await Mn(io(C, g.scrollHeight + p + h.clientTop), u),
      T = await Mn(C, { ...u, elementContext: 'reference' }),
      b = we(0, x.top),
      I = C.y + b,
      E = (g.scrollHeight > g.clientHeight ? (N) => N : Et)(
        we(
          0,
          g.scrollHeight + ((v && y) || w ? p * 2 : 0) - b - we(0, x.bottom)
        )
      );
    if (((g.style.maxHeight = E + 'px'), (g.scrollTop = b), o)) {
      const N =
        g.offsetHeight < m.offsetHeight * ft(l, n.current.length) - 1 ||
        T.top >= -c ||
        T.bottom >= -c;
      He.flushSync(() => o(N));
    }
    return (
      r &&
        (r.current = await Mn(
          io({ ...C, y: I }, g.offsetHeight + p + h.clientTop),
          u
        )),
      { y: I }
    );
  },
});
function $c(e, t) {
  const { open: n, elements: r } = e,
    { enabled: o = !0, overflowRef: s, scrollRef: i, onChange: l } = t,
    c = pe(l),
    a = f.useRef(!1),
    u = f.useRef(null),
    d = f.useRef(null);
  f.useEffect(() => {
    if (!o) return;
    function m(p) {
      if (p.ctrlKey || !g || s.current == null) return;
      const v = p.deltaY,
        w = s.current.top >= -0.5,
        y = s.current.bottom >= -0.5,
        C = g.scrollHeight - g.clientHeight,
        x = v < 0 ? -1 : 1,
        T = v < 0 ? 'max' : 'min';
      g.scrollHeight <= g.clientHeight ||
        ((!w && v > 0) || (!y && v < 0)
          ? (p.preventDefault(),
            He.flushSync(() => {
              c((b) => b + Math[T](v, C * x));
            }))
          : /firefox/i.test(cr()) && (g.scrollTop += v));
    }
    const g = (i == null ? void 0 : i.current) || r.floating;
    if (n && g)
      return (
        g.addEventListener('wheel', m),
        requestAnimationFrame(() => {
          (u.current = g.scrollTop),
            s.current != null && (d.current = { ...s.current });
        }),
        () => {
          (u.current = null),
            (d.current = null),
            g.removeEventListener('wheel', m);
        }
      );
  }, [o, n, r.floating, s, i, c]);
  const h = f.useMemo(
    () => ({
      onKeyDown() {
        a.current = !0;
      },
      onWheel() {
        a.current = !1;
      },
      onPointerMove() {
        a.current = !1;
      },
      onScroll() {
        const m = (i == null ? void 0 : i.current) || r.floating;
        if (!(!s.current || !m || !a.current)) {
          if (u.current !== null) {
            const g = m.scrollTop - u.current;
            ((s.current.bottom < -0.5 && g < -1) ||
              (s.current.top < -0.5 && g > 1)) &&
              He.flushSync(() => c((p) => p + g));
          }
          requestAnimationFrame(() => {
            u.current = m.scrollTop;
          });
        }
      },
    }),
    [r.floating, c, s, i]
  );
  return f.useMemo(() => (o ? { floating: h } : {}), [o, h]);
}
const Hc = me(Qn, {
  name: 'Separator',
  borderColor: '$borderColor',
  flexShrink: 0,
  borderWidth: 0,
  flex: 1,
  height: 0,
  maxHeight: 0,
  borderBottomWidth: 1,
  y: -0.5,
  variants: {
    vertical: {
      true: {
        y: 0,
        x: -0.5,
        height: 'initial',
        maxHeight: 'initial',
        width: 0,
        maxWidth: 0,
        borderBottomWidth: 0,
        borderRightWidth: 1,
      },
    },
  },
});
function Wc(e, t, n) {
  let r,
    o = !1;
  function s() {
    o = !1;
    const i = arguments;
    n && !r && e.apply(this, i),
      clearTimeout(r),
      (r = setTimeout(() => {
        (r = null), n || o || e.apply(this, i), (o = !1);
      }, t));
  }
  return (
    (s.cancel = () => {
      o = !0;
    }),
    s
  );
}
const Uc = { leading: !1 };
function Bc(e, t, n = Uc, r = [e]) {
  const o = f.useRef(null);
  return (
    f.useEffect(
      () => () => {
        var s;
        (s = o.current) == null || s.cancel();
      },
      []
    ),
    f.useMemo(
      () => ((o.current = Wc(e, t, n.leading)), o.current),
      [n.leading, ...r]
    )
  );
}
const { Provider: dr, useStyledContext: Ue } = It(null, 'Select'),
  { Provider: mr, useStyledContext: Ve } = It(null, 'SelectItem'),
  Kc = ({ context: e, itemContext: t, children: n }) =>
    S.jsx(dr, {
      isInSheet: !0,
      scope: e.scopeName,
      ...e,
      children: S.jsx(mr, { scope: e.scopeName, ...t, children: n }),
    }),
  xs = (e) => {
    const t = Pt(e.adaptScope);
    return e.open === !1 ? !1 : t;
  },
  Yc = ({ children: e, scope: t, zIndex: n = 1e3, ...r }) => {
    const o = Ue(t),
      s = Ve(t),
      i = Eo(),
      l = xs(o),
      c = S.jsx(yo, { forceClassName: !0, name: i, children: e }),
      a = Io(),
      u = L.useMemo(
        () => ({ zIndex: n, pointerEvents: o.open ? 'auto' : 'none' }),
        [o.open]
      );
    return s.shouldRenderWebNative
      ? S.jsx(S.Fragment, { children: e })
      : l
        ? o.open
          ? S.jsx(S.Fragment, { children: c })
          : null
        : S.jsx(Sc, {
            children: S.jsx(Ic, {
              style: u,
              lockScroll: !o.disablePreventBodyScroll && !!o.open && !a,
              children: S.jsx(ol, {
                loop: !0,
                enabled: !!o.open,
                trapped: !0,
                ...r,
                children: c,
              }),
            }),
          });
  },
  lo = 8,
  Gc = 'SelectViewport',
  Xc = (e) => {
    const { scope: t, children: n, open: r = !1, listContentRef: o } = e,
      s = Ue(t),
      i = Ve(t),
      { setActiveIndex: l, selectedIndex: c, activeIndex: a } = s,
      { setOpen: u, setSelectedIndex: d } = i,
      [h, m] = f.useState(0),
      g = Io(),
      p = f.useRef([]),
      v = f.useRef(null),
      w = f.useRef(null),
      y = f.useRef(null),
      C = f.useRef(!1),
      x = f.useRef(!0),
      T = f.useRef(null),
      b = f.useRef({ isMouseOutside: !1, isTyping: !1 }),
      [I, P] = f.useState(!1),
      [O, E] = f.useState(!1),
      [N, U] = f.useState(0),
      [B, F] = f.useState(!1),
      R = f.useRef({});
    ae(() => {
      queueMicrotask(() => {
        r || (m(0), E(!1), l(null), P(!1));
      });
    }, [r, l]),
      mt &&
        ae(() => {
          if (!r) return;
          const K = (V) => {
            b.current.isMouseOutside && u(!1);
          };
          return (
            document.addEventListener('mouseup', K),
            () => {
              document.removeEventListener('mouseup', K);
            }
          );
        }, [r]);
    const {
        x: $,
        y: D,
        strategy: A,
        context: M,
        refs: k,
        update: X,
      } = Ss({
        open: r,
        onOpenChange: u,
        placement: 'bottom-start',
        whileElementsMounted: es,
        middleware: [
          Ta({
            apply({
              rects: {
                reference: { width: K },
              },
            }) {
              Object.assign(R.current, { minWidth: K + 8 }),
                k.floating.current &&
                  Object.assign(k.floating.current.style, R.current);
            },
          }),
          Vc({
            listRef: p,
            overflowRef: v,
            index: c,
            offset: N,
            onFallbackChange: E,
            padding: 10,
            minItemsVisible: g ? 10 : 4,
            referenceOverflowThreshold: 20,
          }),
          ar({ crossAxis: -5 }),
        ],
      }),
      _ = k.floating,
      q = r && h > lo,
      ee =
        r &&
        _.current &&
        h < _.current.scrollHeight - _.current.clientHeight - lo,
      Ce = ee || q;
    ae(
      () => (
        window.addEventListener('resize', X),
        r && X(),
        () => window.removeEventListener('resize', X)
      ),
      [X, r]
    );
    const ne = je((K) => (r ? l : d)(K)),
      se = [
        Pc(M, { event: 'mousedown', keyboardHandlers: !1 }),
        kc(M, { outsidePress: !1 }),
        jc(M, { role: 'listbox' }),
        $c(M, {
          enabled: !O && Ce,
          onChange: U,
          overflowRef: v,
          scrollRef: k.floating,
        }),
        Lc(M, {
          listRef: p,
          activeIndex: a || 0,
          selectedIndex: c,
          onNavigate: l,
          scrollItemIntoView: !1,
        }),
        zc(M, {
          listRef: o,
          onMatch: ne,
          selectedIndex: c,
          activeIndex: a,
          onTypingChange: (K) => {
            b.current.isTyping = K;
          },
        }),
      ],
      ce = Nc(f.useMemo(() => se, se)),
      Re = f.useMemo(
        () => ({
          ...ce,
          getReferenceProps() {
            return ce.getReferenceProps({
              ref: k.reference,
              className: 'SelectTrigger',
              onKeyDown(K) {
                (K.key === 'Enter' ||
                  K.code === 'Space' ||
                  (K.key === ' ' && !b.current.isTyping)) &&
                  (K.preventDefault(), u(!0));
              },
            });
          },
          getFloatingProps(K) {
            return ce.getFloatingProps({
              ref: k.floating,
              className: 'Select',
              ...K,
              style: {
                position: A,
                top: D ?? '',
                left: $ ?? '',
                outline: 0,
                scrollbarWidth: 'none',
                ...R.current,
                ...(K == null ? void 0 : K.style),
              },
              onPointerEnter() {
                P(!1), (b.current.isMouseOutside = !1);
              },
              onPointerLeave() {
                b.current.isMouseOutside = !0;
              },
              onPointerMove() {
                (b.current.isMouseOutside = !1), P(!1);
              },
              onKeyDown() {
                P(!0);
              },
              onContextMenu(V) {
                V.preventDefault();
              },
              onScroll(V) {
                He.flushSync(() => {
                  m(V.currentTarget.scrollTop);
                });
              },
            });
          },
        }),
        [k.reference.current, $, D, k.floating.current, ce]
      );
    return (
      ae(() => {
        if (r)
          return (
            (T.current = setTimeout(() => {
              C.current = !0;
            }, 300)),
            () => {
              clearTimeout(T.current);
            }
          );
        (C.current = !1), (x.current = !0), U(0), E(!1), F(!1);
      }, [r]),
      ae(() => {
        !r && b.current.isMouseOutside && (b.current.isMouseOutside = !1);
      }, [r]),
      ae(() => {
        function K(V) {
          var W, H, ie;
          const Y = V.target;
          ((W = k.floating.current) != null && W.contains(Y)) ||
            ((H = w.current) != null && H.contains(Y)) ||
            ((ie = y.current) != null && ie.contains(Y)) ||
            (u(!1), P(!1));
        }
        if (r)
          return (
            document.addEventListener('pointerdown', K),
            () => {
              document.removeEventListener('pointerdown', K);
            }
          );
      }, [r, k, u]),
      f.useEffect(() => {
        var K, V;
        r &&
          I &&
          a != null &&
          ((K = p.current[a]) == null ||
            K.scrollIntoView({ block: 'nearest' })),
          m(((V = k.floating.current) == null ? void 0 : V.scrollTop) ?? 0);
      }, [r, k, I, a]),
      f.useEffect(() => {
        var K;
        r &&
          O &&
          c != null &&
          ((K = p.current[c]) == null ||
            K.scrollIntoView({ block: 'nearest' }));
      }, [r, O, c]),
      ae(() => {
        k.floating.current && O && (k.floating.current.style.maxHeight = '');
      }, [k, O]),
      S.jsx(dr, {
        scope: t,
        ...s,
        setScrollTop: m,
        setInnerOffset: U,
        fallback: O,
        floatingContext: M,
        activeIndex: a,
        canScrollDown: !!ee,
        canScrollUp: !!q,
        controlledScrolling: I,
        blockSelection: B,
        upArrowRef: w,
        downArrowRef: y,
        update: X,
        children: S.jsx(mr, {
          scope: t,
          ...i,
          allowMouseUpRef: x,
          allowSelectRef: C,
          dataRef: M.dataRef,
          interactions: Re,
          listRef: p,
          selectTimeoutRef: T,
          children: n,
        }),
      })
    );
  },
  ws = 'SelectItem',
  { Provider: qc, useStyledContext: Cs } = It(null, ws),
  Zc = Xt.styleable(
    function (e, t) {
      const {
          scope: n,
          value: r,
          disabled: o = !1,
          textValue: s,
          index: i,
          ...l
        } = e,
        { props: c } = Wo({ ...(!e.unstyled && { ellipse: !0 }), ...l }),
        a = Ve(n),
        {
          setSelectedIndex: u,
          listRef: d,
          setOpen: h,
          onChange: m,
          activeIndexSubscribe: g,
          valueSubscribe: p,
          allowMouseUpRef: v,
          allowSelectRef: w,
          setValueAtIndex: y,
          selectTimeoutRef: C,
          dataRef: x,
          interactions: T,
          shouldRenderWebNative: b,
          size: I,
          onActiveChange: P,
          initialValue: O,
        } = a,
        [E, N] = f.useState(O === r);
      f.useEffect(
        () =>
          g((D) => {
            var A;
            i === D &&
              (P(r, i),
              (A = d == null ? void 0 : d.current[i]) == null || A.focus());
          }),
        [i]
      ),
        f.useEffect(
          () =>
            p((D) => {
              N(D === r);
            }),
          [r]
        );
      const U = f.useId(),
        B = f.useCallback((D) => {
          D instanceof HTMLElement && d && (d.current[i] = D);
        }, []),
        F = _e(t, B);
      ae(() => {
        y(i, r);
      }, [i, y, r]);
      function R() {
        u(i), m(r), h(!1);
      }
      const $ = f.useMemo(
        () =>
          T
            ? T.getItemProps({
                onTouchMove() {
                  (w.current = !0), (v.current = !1);
                },
                onTouchEnd() {
                  (w.current = !1), (v.current = !0);
                },
                onKeyDown(D) {
                  D.key === 'Enter' ||
                  (D.key === ' ' && !(x != null && x.current.typing))
                    ? (D.preventDefault(), R())
                    : (w.current = !0);
                },
                onClick() {
                  w.current && R();
                },
                onMouseUp() {
                  v.current &&
                    (w.current && R(),
                    clearTimeout(C.current),
                    (C.current = setTimeout(() => {
                      w.current = !0;
                    })));
                },
              })
            : { onPress: R },
        [R]
      );
      return S.jsx(qc, {
        scope: n,
        value: r,
        textId: U || '',
        isSelected: E,
        children: b
          ? S.jsx('option', { value: r, children: e.children })
          : S.jsx(Xt, {
              tag: 'div',
              componentName: ws,
              ref: F,
              'aria-labelledby': U,
              'aria-selected': E,
              'data-state': E ? 'active' : 'inactive',
              'aria-disabled': o || void 0,
              'data-disabled': o ? '' : void 0,
              tabIndex: o ? void 0 : -1,
              ...(!e.unstyled && {
                backgrounded: !0,
                pressTheme: !0,
                hoverTheme: !0,
                focusTheme: !0,
                cursor: 'default',
                size: I,
                outlineOffset: -0.5,
                focusVisibleStyle: {
                  outlineColor: '$outlineColor',
                  outlineWidth: 1,
                  outlineStyle: 'solid',
                },
              }),
              ...c,
              ...$,
            }),
      });
    },
    { disableTheme: !0 }
  );
var Jc = {};
const Rs = 'SelectItemText',
  ao = me(ht, {
    name: Rs,
    variants: {
      unstyled: { false: { userSelect: 'none', color: '$color', ellipse: !0 } },
    },
    defaultVariants: { unstyled: Jc.TAMAGUI_HEADLESS === '1' },
  }),
  Qc = ao.styleable(function (e, t) {
    const { scope: n, className: r, ...o } = e,
      s = Ue(n),
      i = Ve(n),
      l = f.useRef(null),
      c = _e(t, l),
      a = Cs(n),
      u = f.useRef(null);
    return (
      (u.current = S.jsx(ao, {
        className: r,
        size: i.size,
        id: a.textId,
        ...o,
        ref: c,
      })),
      ae(() => {
        i.initialValue === a.value &&
          !s.selectedIndex &&
          s.setSelectedItem(u.current);
      }, []),
      ae(
        () =>
          i.valueSubscribe((d) => {
            d === a.value && s.setSelectedItem(u.current);
          }),
        [a.value]
      ),
      i.shouldRenderWebNative
        ? S.jsx(S.Fragment, { children: e.children })
        : S.jsx(S.Fragment, { children: u.current })
    );
  }),
  Es = 'SelectScrollUpButton',
  Ts = f.forwardRef((e, t) =>
    S.jsx(Ps, { componentName: Es, ...e, dir: 'up', ref: t })
  );
Ts.displayName = Es;
const Is = 'SelectScrollDownButton',
  As = f.forwardRef((e, t) =>
    S.jsx(Ps, { componentName: Is, ...e, dir: 'down', ref: t })
  );
As.displayName = Is;
const Ps = f.memo(
    f.forwardRef((e, t) => {
      var b, I;
      const { scope: n, dir: r, componentName: o, ...s } = e,
        {
          forceUpdate: i,
          open: l,
          fallback: c,
          setScrollTop: a,
          setInnerOffset: u,
          ...d
        } = Ue(n),
        h = (b = d.floatingContext) == null ? void 0 : b.refs.floating,
        m = f.useRef('idle'),
        g = d[r === 'down' ? 'canScrollDown' : 'canScrollUp'],
        p = f.useRef(null),
        {
          x: v,
          y: w,
          refs: y,
          strategy: C,
        } = Ss({
          open: l && g,
          strategy: 'fixed',
          elements: { reference: h == null ? void 0 : h.current },
          placement: r === 'up' ? 'top' : 'bottom',
          middleware: [ar(({ rects: P }) => -P.floating.height)],
          whileElementsMounted: (...P) => es(...P, { animationFrame: !0 }),
        }),
        x = _e(t, y.setFloating);
      if (!g) return null;
      const T = (P) => {
        const O = h;
        O &&
          (c
            ? O.current &&
              ((O.current.scrollTop -= P),
              He.flushSync(() => {
                var E;
                return a(((E = O.current) == null ? void 0 : E.scrollTop) ?? 0);
              }))
            : He.flushSync(() => u((E) => E - P)));
      };
      return S.jsx(At, {
        ref: x,
        componentName: o,
        'aria-hidden': !0,
        ...s,
        zIndex: 1e3,
        position: C,
        left: v || 0,
        top: w || 0,
        width: `calc(${(((I = h == null ? void 0 : h.current) == null ? void 0 : I.offsetWidth) ?? 0) - 2}px)`,
        onPointerEnter: () => {
          m.current = 'active';
          let P = Date.now();
          function O() {
            const E = h == null ? void 0 : h.current;
            if (E) {
              const N = Date.now(),
                U = N - P;
              P = N;
              const B = U / 2,
                F =
                  r === 'up'
                    ? E.scrollTop
                    : E.scrollHeight - E.clientHeight - E.scrollTop,
                R =
                  r === 'up'
                    ? E.scrollTop - B > 0
                    : E.scrollTop + B < E.scrollHeight - E.clientHeight;
              T(r === 'up' ? Math.min(B, F) : Math.max(-B, -F)),
                R && (p.current = requestAnimationFrame(O));
            }
          }
          cancelAnimationFrame(p.current),
            (p.current = requestAnimationFrame(O));
        },
        onPointerLeave: () => {
          (m.current = 'idle'), cancelAnimationFrame(p.current);
        },
      });
    })
  ),
  eu = 'SelectTrigger',
  tu = mt ? window.matchMedia('(pointer:coarse)').matches : !0,
  nu = f.forwardRef(function (e, t) {
    var a;
    const { scope: n, disabled: r = !1, unstyled: o = !1, ...s } = e,
      i = Ue(n),
      l = Ve(n),
      c = _e(t, (a = i.floatingContext) == null ? void 0 : a.refs.setReference);
    return l.shouldRenderWebNative
      ? null
      : S.jsx(Uo, {
          componentName: eu,
          unstyled: o,
          tag: 'button',
          type: 'button',
          id: l.id,
          ...(!o && {
            backgrounded: !0,
            radiused: !0,
            hoverTheme: !0,
            pressTheme: !0,
            focusable: !0,
            focusVisibleStyle: {
              outlineStyle: 'solid',
              outlineWidth: 2,
              outlineColor: '$outlineColor',
            },
            borderWidth: 1,
            size: l.size,
          }),
          'aria-expanded': i.open,
          'aria-autocomplete': 'none',
          dir: i.dir,
          disabled: r,
          'data-disabled': r ? '' : void 0,
          ...s,
          ref: c,
          ...(l.interactions
            ? {
                ...l.interactions.getReferenceProps(),
                ...(tu
                  ? {
                      onPress() {
                        l.setOpen(!i.open);
                      },
                    }
                  : {
                      onMouseDown() {
                        var u;
                        (u = i.floatingContext) == null || u.update(),
                          l.setOpen(!i.open);
                      },
                    }),
              }
            : {
                onPress() {
                  l.setOpen(!i.open);
                },
              }),
        });
  });
var ru = {};
const co = me(rn, {
    name: Gc,
    variants: {
      unstyled: {
        false: {
          size: '$2',
          backgroundColor: '$background',
          elevate: !0,
          bordered: !0,
          userSelect: 'none',
          outlineWidth: 0,
        },
      },
      size: {
        '...size': (e, { tokens: t }) => ({ borderRadius: t.radius[e] ?? e }),
      },
    },
    defaultVariants: { unstyled: ru.TAMAGUI_HEADLESS === '1' },
  }),
  ou = bo && !ri,
  su = co.styleable(function (e, t) {
    var m;
    const { scope: n, children: r, disableScroll: o, ...s } = e,
      i = Ue(n),
      l = Ve(n),
      c = Pt(i.adaptScope),
      a = _e(t, (m = i.floatingContext) == null ? void 0 : m.refs.setFloating);
    if (
      (ae(() => {
        i.update && i.update();
      }, [c]),
      l.shouldRenderWebNative)
    )
      return S.jsx(S.Fragment, { children: r });
    if (c || !Yt) {
      let g = r;
      return (
        ou && (g = S.jsx(Kc, { itemContext: l, context: i, children: g })),
        S.jsx(Ki, { scope: i.adaptScope, children: g })
      );
    }
    if (!l.interactions) return null;
    const { style: u, className: d, ...h } = l.interactions.getFloatingProps();
    return S.jsxs(S.Fragment, {
      children: [
        !o &&
          !e.unstyled &&
          S.jsx('style', { dangerouslySetInnerHTML: { __html: iu } }),
        S.jsx(tr, {
          children: i.open
            ? S.jsx(Ec, {
                context: i.floatingContext,
                modal: !1,
                children: S.jsx(
                  co,
                  {
                    size: l.size,
                    role: 'presentation',
                    ...s,
                    ...u,
                    ...h,
                    ...(!e.unstyled && {
                      overflowY: o ? void 0 : (u.overflow ?? 'auto'),
                    }),
                    ref: a,
                    children: r,
                  },
                  'select-viewport'
                ),
              })
            : null,
        }),
        !i.open &&
          S.jsx('div', { style: { display: 'none' }, children: e.children }),
      ],
    });
  }),
  iu = `
.is_SelectViewport {
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;
}

.is_SelectViewport::-webkit-scrollbar{
  display:none
}
`,
  lu = 'SelectValue',
  uo = me(ht, { name: lu, userSelect: 'none' }),
  au = uo.styleable(function (
    { scope: e, children: t, placeholder: n, ...r },
    o
  ) {
    const s = Ue(e),
      i = Ve(e),
      l = _e(o, s.onValueNodeChange),
      c = t ?? s.selectedItem,
      a = s.value == null || s.value === '' ? (n ?? c) : c;
    return S.jsx(uo, {
      ...(!r.unstyled && { size: i.size, ellipse: !0, pointerEvents: 'none' }),
      ref: l,
      ...r,
      children: Os(a),
    });
  });
function Os(e) {
  return f.Children.map(e, (t) => {
    var n, r, o;
    if (t) {
      if (
        ((r = (n = t.type) == null ? void 0 : n.staticConfig) == null
          ? void 0
          : r.componentName) === Rs
      )
        return t.props.children;
      if ((o = t.props) != null && o.children) return Os(t.props.children);
    }
    return t;
  });
}
const cu = me(er, {
    name: 'SelectIcon',
    'aria-hidden': !0,
    children: S.jsx(Vi, { children: '▼' }),
  }),
  uu = me(er, { name: 'SelectItemIndicator' }),
  fu = f.forwardRef(function (e, t) {
    const { scope: n, ...r } = e,
      o = Ve(n),
      s = Cs(n);
    return o.shouldRenderWebNative
      ? null
      : s.isSelected
        ? S.jsx(uu, { 'aria-hidden': !0, ...r, ref: t })
        : null;
  }),
  Ms = 'SelectGroup',
  { Provider: du, useStyledContext: mu } = It({ id: '' }, 'SelectGroup'),
  hu = me(At, { name: Ms, width: '100%' }),
  pu = me(ht, {
    tag: 'select',
    backgroundColor: '$background',
    borderColor: '$borderColor',
    hoverStyle: { backgroundColor: '$backgroundHover' },
  }),
  gu = me(rn, {
    name: 'NativeSelect',
    bordered: !0,
    userSelect: 'none',
    outlineWidth: 0,
    paddingRight: 10,
    variants: {
      size: {
        '...size': (e, t) => {
          const { tokens: n } = t,
            r = So(n.space[e]);
          return {
            borderRadius: n.radius[e] ?? e,
            minHeight: n.size[e],
            paddingRight: r + 20,
            paddingLeft: r,
            paddingVertical: Ao(e, { shift: -3 }),
          };
        },
      },
    },
    defaultVariants: { size: '$2' },
  }),
  ks = f.forwardRef((e, t) => {
    const { scope: n, ...r } = e,
      o = f.useId(),
      s = Ue(n),
      i = Ve(n),
      l = i.size ?? '$true',
      c = f.useRef(null),
      a = i.shouldRenderWebNative
        ? S.jsx(gu, {
            asChild: !0,
            size: l,
            value: s.value,
            id: i.id,
            children: S.jsx(pu, {
              onChange: (u) => {
                i.onChange(u.currentTarget.value);
              },
              size: l,
              ref: c,
              style: { color: 'var(--color)', appearance: 'none' },
              children: e.children,
            }),
          })
        : S.jsx(hu, { role: 'group', 'aria-labelledby': o, ...r, ref: t });
    return S.jsx(du, { scope: n, id: o || '', children: a });
  });
ks.displayName = Ms;
const Fs = 'SelectLabel',
  Ns = f.forwardRef((e, t) => {
    const { scope: n, ...r } = e,
      o = Ve(n),
      s = mu(n);
    return o.shouldRenderWebNative
      ? null
      : S.jsx(Uo, {
          tag: 'div',
          componentName: Fs,
          fontWeight: '800',
          id: s.id,
          size: o.size,
          ...r,
          ref: t,
        });
  });
Ns.displayName = Fs;
me(Hc, { name: 'SelectSeparator' });
const vu = (e) => {
    const t = Ue(e.scope),
      n = xs(t),
      r = Pt(t.adaptScope),
      o = oi(n);
    return S.jsx(Ol, {
      onOpenChange: (s) => {
        o() && e.onOpenChange(s);
      },
      open: t.open,
      hidden: !r,
      children: e.children,
    });
  },
  bu = (e) => S.jsx(S.Fragment, { children: e.children });
wt(
  function (e) {
    const t = `AdaptSelect${e.scope || ''}`;
    return S.jsx(Ui, {
      scope: t,
      portal: !0,
      children: S.jsx(yu, { scope: e.scope, adaptScope: t, ...e }),
    });
  },
  {
    Adapt: Bi,
    Content: Yc,
    Group: ks,
    Icon: cu,
    Item: Zc,
    ItemIndicator: fu,
    ItemText: Qc,
    Label: Ns,
    ScrollDownButton: As,
    ScrollUpButton: Ts,
    Trigger: nu,
    Value: au,
    Viewport: su,
    Sheet: Pl.Controlled,
    FocusScope: rl,
  }
);
function fo() {
  const e = f.useRef(null);
  e.current || (e.current = new Set());
  const t = (r) => {
      e.current.forEach((o) => o(r));
    },
    n = f.useCallback(
      (r) => (
        e.current.add(r),
        () => {
          e.current.delete(r);
        }
      ),
      []
    );
  return [t, n];
}
function yu(e) {
  const {
      scope: t = '',
      adaptScope: n,
      native: r,
      children: o,
      open: s,
      defaultOpen: i,
      onOpenChange: l,
      value: c,
      defaultValue: a,
      onValueChange: u,
      disablePreventBodyScroll: d,
      size: h = '$true',
      onActiveChange: m,
      dir: g,
      id: p,
    } = e,
    v = Pt(n) || !Yt ? bu : Xc,
    w = f.useReducer(() => ({}), {})[1],
    [y, C] = f.useState(null),
    [x, T] = Ct({ prop: s, defaultProp: i || !1, onChange: l }),
    [b, I] = Ct({ prop: c, defaultProp: a || '', onChange: u, transition: !0 });
  f.useEffect(() => {
    x && E(b);
  }, [x]),
    f.useEffect(() => {
      E(b);
    }, [b]);
  const [P, O] = f.useState(0),
    [E, N] = fo(),
    [U, B] = fo(),
    F = f.useRef(null),
    R = f.useRef(null),
    $ = f.useRef([]),
    [D, A] = f.useState(0),
    [M, k] = f.useState(null);
  ae(() => {
    (F.current = D), (R.current = P);
  });
  const X = r === !0 || r === 'web' || (Array.isArray(r) && r.includes('web')),
    _ = Bc(
      (q) => {
        O((ee) => (ee !== q ? (typeof q == 'number' && U(q), q) : ee));
      },
      1,
      {},
      []
    );
  return S.jsx(mr, {
    scopeName: t,
    scope: t,
    adaptScope: n,
    initialValue: f.useMemo(() => b, [x]),
    size: h,
    activeIndexSubscribe: B,
    valueSubscribe: N,
    setOpen: T,
    id: p,
    onChange: f.useCallback((q) => {
      I(q), E(q);
    }, []),
    onActiveChange: je((q, ee) => {
      m == null || m(q, ee);
    }),
    setSelectedIndex: A,
    setValueAtIndex: f.useCallback((q, ee) => {
      $.current[q] = ee;
    }, []),
    shouldRenderWebNative: X,
    children: S.jsx(dr, {
      scope: t,
      scopeName: t,
      adaptScope: n,
      disablePreventBodyScroll: d,
      dir: g,
      blockSelection: !1,
      fallback: !1,
      selectedItem: y,
      setSelectedItem: C,
      forceUpdate: w,
      valueNode: M,
      onValueNodeChange: k,
      activeIndex: P,
      selectedIndex: D,
      setActiveIndex: _,
      value: b,
      open: x,
      native: r,
      children: S.jsx(vu, {
        onOpenChange: T,
        scope: t,
        children: X
          ? o
          : S.jsx(v, {
              activeIndexRef: R,
              listContentRef: $,
              selectedIndexRef: F,
              ...e,
              open: x,
              value: b,
              children: o,
            }),
      }),
    }),
  });
}
const Ds = { width: 800, height: 600, scale: 1, fontScale: 1 };
var Su = {};
let yt = Ds,
  Vn = null;
function xu() {
  if (!mt) return Ds;
  Vn || (Vn = window.document.documentElement);
  const e = {
    fontScale: 1,
    height: Vn.clientHeight,
    scale: window.devicePixelRatio || 1,
    width: Vn.clientWidth,
  };
  return e.height !== yt.height || e.width !== yt.width || e.scale !== yt.scale
    ? ((yt = e), e)
    : yt;
}
const wu = new Set();
if (mt) {
  let e = function () {
      (t = Date.now()), wu.forEach((i) => i(xu()));
    },
    t = Date.now(),
    n;
  const r = Su.TAMAGUI_USE_WINDOW_DIMENSIONS_MAX_UPDATE_MS,
    o = r ? +r : 100,
    s = () => {
      clearTimeout(n);
      const i = Date.now() - t;
      i < o
        ? setTimeout(() => {
            e();
          }, o - i)
        : e();
    };
  window.addEventListener('resize', s);
}
export { xl as S, on as a, ht as b, Mu as c, Ao as g };
