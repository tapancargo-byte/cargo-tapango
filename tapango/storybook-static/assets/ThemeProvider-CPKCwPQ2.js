var Na = Object.defineProperty;
var Fa = (e, t, n) =>
  t in e
    ? Na(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n })
    : (e[t] = n);
var gs = (e, t, n) => Fa(e, typeof t != 'symbol' ? t + '' : t, n);
import { r as _, R as re, g as Ia } from './index-D_zSVikN.js';
import { j } from './jsx-runtime-BjG_zV1W.js';
import { c as Wa, A as ps } from './async-storage-CbWkip1I.js';
function ja(e, t) {
  for (var n = 0; n < t.length; n++) {
    const r = t[n];
    if (typeof r != 'string' && !Array.isArray(r)) {
      for (const s in r)
        if (s !== 'default' && !(s in e)) {
          const o = Object.getOwnPropertyDescriptor(r, s);
          o &&
            Object.defineProperty(
              e,
              s,
              o.get ? o : { enumerable: !0, get: () => r[s] }
            );
        }
    }
  }
  return Object.freeze(
    Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' })
  );
}
var Be = {
  OS: 'web',
  select: (e) => ('web' in e ? e.web : e.default),
  get isTesting() {
    return !1;
  },
  get Version() {
    return '0.0.0';
  },
};
function La() {
  return Wa && window.matchMedia != null
    ? window.matchMedia('(prefers-color-scheme: dark)')
    : null;
}
var ut = La(),
  tn = new WeakMap(),
  Ss = {
    getColorScheme() {
      return ut && ut.matches ? 'dark' : 'light';
    },
    addChangeListener(e) {
      var t = tn.get(e);
      t ||
        ((t = (r) => {
          var s = r.matches;
          e({ colorScheme: s ? 'dark' : 'light' });
        }),
        tn.set(e, t)),
        ut && ut.addListener(t);
      function n() {
        var r = tn.get(e);
        ut && r && ut.removeListener(r), tn.delete(e);
      }
      return { remove: n };
    },
  };
function Ba() {
  var e = _.useState(Ss.getColorScheme()),
    t = e[0],
    n = e[1];
  return (
    _.useEffect(() => {
      function r(a) {
        n(a.colorScheme);
      }
      var s = Ss.addChangeListener(r),
        o = s.remove;
      return o;
    }),
    t
  );
}
var Va = {};
const bn = !!_.use,
  yn = !0,
  go = typeof window < 'u',
  Wr = !go,
  ot = go,
  _e = Wr ? _.useEffect : _.useLayoutEffect,
  za = ot && ('ontouchstart' in window || navigator.maxTouchPoints > 0),
  Eu = za,
  Da = !1,
  Ha = Va.TEST_NATIVE_PLATFORM === 'ios',
  Ka = 'web',
  nn = new Map();
let jn = 0;
const Bt = (e, t = 10) => {
    if (nn.has(e)) return nn.get(e);
    let n = e;
    n[0] === 'v' && n.startsWith('var(') && (n = n.slice(6, n.length - 1));
    let r = 0,
      s = '',
      o = 0;
    const a = n.length;
    for (let l = 0; l < a; l++) {
      if (t !== 'strict' && o <= t) {
        const i = n.charCodeAt(l);
        if (i === 46) {
          s += '--';
          continue;
        }
        if (Ua(i)) {
          o++, (s += n[l]);
          continue;
        }
      }
      r = Xa(r, n[l]);
    }
    const c = s + (r ? Math.abs(r) : '');
    return jn > 1e4 && (nn.clear(), (jn = 0)), nn.set(e, c), jn++, c;
  },
  Xa = (e, t) => (Math.imul(31, e) + t.charCodeAt(0)) | 0;
function Ua(e) {
  return (
    (e >= 65 && e <= 90) ||
    (e >= 97 && e <= 122) ||
    e === 95 ||
    e === 45 ||
    (e >= 48 && e <= 57)
  );
}
function po(e, t, { checkDefaultPrevented: n = !0 } = {}) {
  return !e || !t
    ? t || e || void 0
    : (r) => {
        if (
          (e == null || e(r),
          !r ||
            !(n && typeof r == 'object' && 'defaultPrevented' in r) ||
            ('defaultPrevented' in r && !r.defaultPrevented))
        )
          return t == null ? void 0 : t(r);
      };
}
const Ln = 0,
  Nt = 2,
  Ya = 3,
  jr = 4,
  So = { color: !0, textDecorationColor: !0, textShadowColor: !0 },
  st = {
    radius: {
      borderRadius: !0,
      borderTopLeftRadius: !0,
      borderTopRightRadius: !0,
      borderBottomLeftRadius: !0,
      borderBottomRightRadius: !0,
      borderStartStartRadius: !0,
      borderStartEndRadius: !0,
      borderEndStartRadius: !0,
      borderEndEndRadius: !0,
    },
    size: {
      width: !0,
      height: !0,
      minWidth: !0,
      minHeight: !0,
      maxWidth: !0,
      maxHeight: !0,
      blockSize: !0,
      minBlockSize: !0,
      maxBlockSize: !0,
      inlineSize: !0,
      minInlineSize: !0,
      maxInlineSize: !0,
    },
    zIndex: { zIndex: !0 },
    color: {
      backgroundColor: !0,
      borderColor: !0,
      borderBlockStartColor: !0,
      borderBlockEndColor: !0,
      borderBlockColor: !0,
      borderBottomColor: !0,
      borderInlineColor: !0,
      borderInlineStartColor: !0,
      borderInlineEndColor: !0,
      borderTopColor: !0,
      borderLeftColor: !0,
      borderRightColor: !0,
      borderEndColor: !0,
      borderStartColor: !0,
      shadowColor: !0,
      ...So,
      outlineColor: !0,
      caretColor: !0,
    },
  },
  bo = {
    WebkitLineClamp: !0,
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    columnCount: !0,
    flex: !0,
    flexGrow: !0,
    flexOrder: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    fontWeight: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowGap: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnGap: !0,
    gridColumnStart: !0,
    gridTemplateColumns: !0,
    gridTemplateAreas: !0,
    lineClamp: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    scale: !0,
    scaleX: !0,
    scaleY: !0,
    scaleZ: !0,
    shadowOpacity: !0,
  },
  An = {
    x: !0,
    y: !0,
    scale: !0,
    perspective: !0,
    scaleX: !0,
    scaleY: !0,
    skewX: !0,
    skewY: !0,
    matrix: !0,
    rotate: !0,
    rotateY: !0,
    rotateX: !0,
    rotateZ: !0,
  },
  yo = {
    backfaceVisibility: !0,
    borderBottomEndRadius: !0,
    borderBottomStartRadius: !0,
    borderBottomWidth: !0,
    borderLeftWidth: !0,
    borderRightWidth: !0,
    borderBlockWidth: !0,
    borderBlockEndWidth: !0,
    borderBlockStartWidth: !0,
    borderInlineWidth: !0,
    borderInlineEndWidth: !0,
    borderInlineStartWidth: !0,
    borderStyle: !0,
    borderBlockStyle: !0,
    borderBlockEndStyle: !0,
    borderBlockStartStyle: !0,
    borderInlineStyle: !0,
    borderInlineEndStyle: !0,
    borderInlineStartStyle: !0,
    borderTopEndRadius: !0,
    borderTopStartRadius: !0,
    borderTopWidth: !0,
    borderWidth: !0,
    transform: !0,
    transformOrigin: !0,
    alignContent: !0,
    alignItems: !0,
    alignSelf: !0,
    borderEndWidth: !0,
    borderStartWidth: !0,
    bottom: !0,
    display: !0,
    end: !0,
    flexBasis: !0,
    flexDirection: !0,
    flexWrap: !0,
    gap: !0,
    columnGap: !0,
    rowGap: !0,
    justifyContent: !0,
    left: !0,
    margin: !0,
    marginBlock: !0,
    marginBlockEnd: !0,
    marginBlockStart: !0,
    marginInline: !0,
    marginInlineStart: !0,
    marginInlineEnd: !0,
    marginBottom: !0,
    marginEnd: !0,
    marginHorizontal: !0,
    marginLeft: !0,
    marginRight: !0,
    marginStart: !0,
    marginTop: !0,
    marginVertical: !0,
    overflow: !0,
    padding: !0,
    paddingBottom: !0,
    paddingInline: !0,
    paddingBlock: !0,
    paddingBlockStart: !0,
    paddingInlineEnd: !0,
    paddingInlineStart: !0,
    paddingEnd: !0,
    paddingHorizontal: !0,
    paddingLeft: !0,
    paddingRight: !0,
    paddingStart: !0,
    paddingTop: !0,
    paddingVertical: !0,
    position: !0,
    right: !0,
    start: !0,
    top: !0,
    inset: !0,
    insetBlock: !0,
    insetBlockEnd: !0,
    insetBlockStart: !0,
    insetInline: !0,
    insetInlineEnd: !0,
    insetInlineStart: !0,
    direction: !0,
    shadowOffset: !0,
    shadowRadius: !0,
    ...st.color,
    ...st.radius,
    ...st.size,
    ...st.radius,
    ...An,
    ...bo,
    boxShadow: !0,
    filter: !0,
    transition: !0,
    textWrap: !0,
    backdropFilter: !0,
    WebkitBackdropFilter: !0,
    background: !0,
    backgroundAttachment: !0,
    backgroundBlendMode: !0,
    backgroundClip: !0,
    backgroundColor: !0,
    backgroundImage: !0,
    backgroundOrigin: !0,
    backgroundPosition: !0,
    backgroundRepeat: !0,
    backgroundSize: !0,
    borderBottomStyle: !0,
    borderImage: !0,
    borderLeftStyle: !0,
    borderRightStyle: !0,
    borderTopStyle: !0,
    boxSizing: !0,
    caretColor: !0,
    clipPath: !0,
    contain: !0,
    containerType: !0,
    content: !0,
    cursor: !0,
    float: !0,
    mask: !0,
    maskBorder: !0,
    maskBorderMode: !0,
    maskBorderOutset: !0,
    maskBorderRepeat: !0,
    maskBorderSlice: !0,
    maskBorderSource: !0,
    maskBorderWidth: !0,
    maskClip: !0,
    maskComposite: !0,
    maskImage: !0,
    maskMode: !0,
    maskOrigin: !0,
    maskPosition: !0,
    maskRepeat: !0,
    maskSize: !0,
    maskType: !0,
    mixBlendMode: !0,
    objectFit: !0,
    objectPosition: !0,
    outlineOffset: !0,
    outlineStyle: !0,
    outlineWidth: !0,
    overflowBlock: !0,
    overflowInline: !0,
    overflowX: !0,
    overflowY: !0,
    pointerEvents: !0,
    scrollbarWidth: !0,
    textEmphasis: !0,
    touchAction: !0,
    transformStyle: !0,
    userSelect: !0,
  },
  Ga = {
    fontFamily: !0,
    fontSize: !0,
    fontStyle: !0,
    fontWeight: !0,
    fontVariant: !0,
    letterSpacing: !0,
    lineHeight: !0,
    textTransform: !0,
  },
  xo = {
    ...Ga,
    textAlign: !0,
    textDecorationLine: !0,
    textDecorationStyle: !0,
    ...So,
    textShadowOffset: !0,
    textShadowRadius: !0,
    userSelect: !0,
    selectable: !0,
    verticalAlign: !0,
    whiteSpace: !0,
    wordWrap: !0,
    textOverflow: !0,
    textDecorationDistance: !0,
    cursor: !0,
    WebkitLineClamp: !0,
    WebkitBoxOrient: !0,
  },
  wo = { ...yo, ...xo },
  qa = wo,
  lr = {
    enterStyle: !0,
    exitStyle: !0,
    hoverStyle: !0,
    pressStyle: !0,
    focusStyle: !0,
    disabledStyle: !0,
    focusWithinStyle: !0,
    focusVisibleStyle: !0,
  },
  Vt = yo;
var Za = {};
const To = 't_',
  zt = {},
  $o = {
    display: 'flex',
    alignItems: 'stretch',
    flexDirection: 'column',
    flexBasis: 'auto',
    boxSizing: 'border-box',
    position: Za.TAMAGUI_POSITION_STATIC === '1' ? 'static' : 'relative',
    minHeight: 0,
    minWidth: 0,
    flexShrink: 0,
  };
Object.assign(zt, $o);
const Co = 'Missing theme.';
let Fe;
const he = (e) => Fe.settings[e] ?? Fe[e],
  Qa = (e) => {
    Fe = e;
  },
  ze = () => {
    if (!Fe) throw new Error('Err0');
    return Fe;
  },
  Ja = () => Fe;
let Lr;
function ei(e) {
  Lr = e;
}
const ku = ({ prefixed: e } = {}) => {
    const { tokens: t, tokensParsed: n } = Fe;
    return e === !1 ? t : e === !0 ? n : Lr;
  },
  ti = (e, t) => {
    var n;
    return Fe.specificTokens[e] ?? ((n = Lr[t]) == null ? void 0 : n[e]);
  },
  ni = (e, t, n = yn) => {
    const r = ti(e, t);
    return n ? (r == null ? void 0 : r.variable) : r == null ? void 0 : r.val;
  },
  Mu = (e, t) => {
    if (!(e === 'unset' || e === 'auto')) return ni(e, t, !1);
  },
  hn = new Set(),
  ri = (e) => {
    Fe ? e(Fe) : hn.add(e);
  };
var si = {};
function Ro(e) {
  return `var(--${si.TAMAGUI_CSS_VARIABLE_PREFIX || ''}${e})`;
}
const Ft = (e, t = !1) => {
  if (!t && Ae(e)) return e;
  const { key: n, name: r, val: s } = e;
  return {
    isVar: !0,
    key: n,
    name: t ? r : Bt(r, 40),
    val: s,
    variable: t ? Ro(r) : vo(r),
  };
};
function mt(e, t = !1) {
  return Ae(e)
    ? !t && yn && e.variable
      ? e.variable
      : `${e.val}`
    : `${e || ''}`;
}
function Ae(e) {
  return e && typeof e == 'object' && 'isVar' in e;
}
function oi(e, t = 'size') {
  var r;
  if (e != null && e.dynamic) return e;
  if ((Br(!0), Ae(e))) return mt(e);
  const n = ze().tokensParsed;
  return mt(((r = n[t]) == null ? void 0 : r[e]) ?? e);
}
let Ao = !1;
const Br = (e) => (Ao = e),
  ai = () => Ao;
function xn(e, t) {
  return Ae(e) ? (Br(!0), e.val) : e;
}
const vo = (e, t = !0) => {
  const n = Bt(e, 60);
  return t ? Ro(n) : n;
};
var St = {};
const bs = new WeakMap(),
  ur = new Map(),
  Po = {},
  ys = () => Object.values(Po);
let xs = null;
function ii(e = !1, t) {
  if (!ot) return;
  let n;
  const r = document.styleSheets || [],
    s = xs,
    o = new Set(r);
  for (const a of o)
    if (a) {
      const c = Ts(a, !1, e, t);
      c && (n = c);
    }
  if (((xs = o), s)) for (const a of s) a && !o.has(a) && Ts(a, !0);
  return n;
}
function ci(e) {
  const t = (ur.get(e) || 0) + 1;
  return ur.set(e, t), t;
}
const ws = St.TAMAGUI_BAIL_AFTER_SCANNING_X_CSS_RULES,
  li = ws ? +ws : 400;
function Ts(e, t = !1, n = !1, r) {
  var h, m;
  let s;
  try {
    if (((s = e.cssRules), !s)) return;
  } catch {
    return;
  }
  const o = (h = mn(s[0], n)) == null ? void 0 : h[0],
    a = (m = mn(s[s.length - 1], n)) == null ? void 0 : m[0],
    c = `${s.length}${o}${a}`,
    l = bs.get(e);
  if (!t && l === c) return;
  const i = s.length;
  let u = 0,
    d;
  const f = {};
  for (let x = 0; x < i; x++) {
    const b = s[x];
    if (!(b instanceof CSSStyleRule)) continue;
    const p = mn(b, n);
    if (p) u = 0;
    else {
      if ((u++, u > li)) return;
      continue;
    }
    const [y, S, v] = p;
    if (v) {
      const P = ui(S, r);
      if (P) {
        for (const E of P.names)
          f[E]
            ? (Object.apply(f[E], P.theme),
              (P.names = P.names.filter((g) => g !== E)))
            : (f[E] = P.theme);
        d || (d = []), d.push(P);
      }
      continue;
    }
  }
  return bs.set(e, c), d;
}
let rn,
  $s = null;
function ui(e, t) {
  const n = e.selectorText.split(',');
  if (!n.length) return;
  if (t != null && t.color && !rn) {
    rn = {};
    for (const a in t.color) {
      const c = t.color[a];
      rn[c.name] = c.val;
    }
  }
  const r = (e.cssText || '').slice(e.selectorText.length + 2, -1).split(';'),
    s = {};
  for (const a of r) {
    const c = a.indexOf(':');
    if (c === -1) continue;
    const l = a.indexOf('--');
    let i = a.slice(l === -1 ? 0 : l + 2, c);
    St.TAMAGUI_CSS_VARIABLE_PREFIX &&
      (i = i.replace(St.TAMAGUI_CSS_VARIABLE_PREFIX, ''));
    const u = a.slice(c + 2);
    let d;
    if (u[0] === 'v' && u.startsWith('var(')) {
      const f = u.slice(6, -1),
        h = rn[f];
      h
        ? (d = h)
        : ($s || ($s = getComputedStyle(document.body)),
          (d = $s.getPropertyValue('--' + f)));
    } else d = u;
    s[i] = Ft({ key: i, name: i, val: d }, !0);
  }
  const o = new Set();
  for (const a of n) {
    if (a === ' .tm_xxt') continue;
    const c = a.lastIndexOf('.t_'),
      l = a.slice(c).slice(3),
      [i] = a[c - 5],
      u = i === 'd' ? 'dark' : i === 'i' ? 'light' : '',
      d = u && u !== l ? `${u}_${l}` : l;
    !d || d === 'light_dark' || d === 'dark_light' || o.add(d);
  }
  return { names: [...o], theme: s };
}
const Cs = /\.tm_xxt/;
function mn(e, t = !1) {
  if (e instanceof CSSStyleRule) {
    const n = e.selectorText;
    if (n[0] === ':' && n[1] === 'r' && Cs.test(n)) {
      const r = fi(n.replace(Cs, ''));
      return t ? [r, e, !0] : [r, e];
    }
  } else if (e instanceof CSSMediaRule)
    return e.cssRules.length > 1 ? void 0 : mn(e.cssRules[0]);
}
const fi = (e) => {
  const t = e.indexOf(':');
  return t > -1 ? e.slice(7, t) : e.slice(7);
};
let Ct = null,
  _o = !0;
function di() {
  _o = !1;
}
function Eo(e, t) {
  return _o && (Po[e] = t.join(' ')), !0;
}
function hi(e) {
  if (ot) {
    if (!Ct && document.head) {
      const t = document.createElement('style');
      (t.id = '_tamagui-styles'), (Ct = document.head.appendChild(t).sheet);
    }
    if (Ct)
      for (const t in e) {
        const n = e[t],
          r = n[Nt];
        if (!ko(r)) continue;
        const s = n[jr];
        s.join(`
`),
          ci(r),
          Eo(r, s);
        try {
          for (const o of s)
            Ct.insertRule(o, Ct.cssRules.length),
              r === '_dsp-_groupframe-maxMd_none' && console.warn('INSERT', o);
        } catch {
          console.error('Error inserting style rule', s);
        }
      }
  }
}
const mi = St.TAMAGUI_INSERT_SELECTOR_TRIES
  ? +St.TAMAGUI_INSERT_SELECTOR_TRIES
  : 1;
function ko(e) {
  return St.IS_STATIC === 'is_static' ? !0 : (ur.get(e) || 0) < mi;
}
const gi = (typeof window < 'u' && window.matchMedia) || pi;
function pi(e) {
  return {
    match: (t, n) => !1,
    addListener() {},
    removeListener() {},
    matches: !1,
  };
}
const nt = {
    hoverStyle: { name: 'hover', priority: 2 },
    pressStyle: { name: 'active', stateKey: 'press', priority: 3 },
    focusVisibleStyle: {
      name: 'focus-visible',
      priority: 4,
      stateKey: 'focusVisible',
    },
    focusStyle: { name: 'focus', priority: 4 },
    focusWithinStyle: {
      name: 'focus-within',
      priority: 4,
      stateKey: 'focusWithin',
    },
    disabledStyle: { name: 'disabled', priority: 5, stateKey: 'disabled' },
  },
  Rs = {
    hover: nt.hoverStyle.priority,
    press: nt.pressStyle.priority,
    focus: nt.focusStyle.priority,
    focusVisible: nt.focusVisibleStyle.priority,
    focusWithin: nt.focusWithinStyle.priority,
    disabled: nt.disabledStyle.priority,
  },
  ye = {
    ...nt,
    enterStyle: { name: 'enter', selector: '.t_unmounted', priority: 4 },
    exitStyle: { name: 'exit', priority: 5 },
  };
var Si = {};
let be = {};
const It = {},
  bi = () => be,
  Vr = new Set(),
  yi = /\$(platform|theme|group)-/,
  fr = (e) => {
    if (Vr.has(e)) return !0;
    if (e[0] === '$') {
      const t = e.match(yi);
      if (t) return t[1];
    }
    return !1;
  };
let Mo;
const Oo = Object.keys(ye).length;
let No;
const xi = (e) => (ze().settings.mediaPropOrder ? Oo : No.indexOf(e) + 100),
  dr = new Set();
let hr = 0;
const wi = (e) => {
  const { media: t } = e,
    n = he('mediaQueryDefaultActive');
  if (t) {
    hr++;
    for (const r in t)
      (be[r] = (n == null ? void 0 : n[r]) || !1), Vr.add(`$${r}`);
    Object.assign(It, t), (Mo = { ...be }), (No = Object.keys(t)), $i();
  }
};
function Ti() {
  dr.forEach((e) => e()), dr.clear();
}
let As = -1;
function $i() {
  if (!Wr && !Si.IS_STATIC && As !== hr) {
    (As = hr), Ti();
    for (const e in It) {
      let t = function () {
        const o = !!r().matches;
        o !== be[e] && ((be = { ...be, [e]: o }), Fo());
      };
      const n = Wo(It[e]),
        r = () => gi(n),
        s = r();
      if (!s) throw new Error('⚠️ No match');
      s.addListener(t),
        dr.add(() => {
          s.removeListener(t);
        }),
        t();
    }
  }
}
const mr = new Set();
function Fo() {
  mr.forEach((e) => e(be));
}
const gr = new WeakMap();
function Ci(e, t, n) {
  const r = gr.get(e);
  (!r || r.enabled !== t || n) && gr.set(e, { ...r, enabled: t, keys: n });
}
function Ri(e) {
  return (
    mr.add(e),
    () => {
      mr.delete(e);
    }
  );
}
function Ai(e, t) {
  const n = e ? gr.get(e) : null,
    r = _.useRef(null);
  r.current || (r.current = { keys: new Set(), lastState: be }),
    r.current.pendingState &&
      ((r.current.lastState = r.current.pendingState),
      (r.current.pendingState = void 0));
  const { keys: s } = r.current;
  s.size && s.clear();
  const o = _.useSyncExternalStore(
    Ri,
    () => {
      const a = (n == null ? void 0 : n.keys) || s,
        { lastState: c, pendingState: l } = r.current;
      if (!a.size) return c;
      for (const i of a)
        if (be[i] !== (l || c)[i])
          return e != null && e.mediaEmit
            ? (e.mediaEmit(be), (r.current.pendingState = be), c)
            : ((r.current.lastState = be), be);
      return c;
    },
    vi
  );
  return new Proxy(o, {
    get(a, c) {
      return !pr && typeof c == 'string' && s.add(c), Reflect.get(o, c);
    },
  });
}
const vi = () => Mo;
let pr = !1;
function Pi(e, t) {
  pr = !0;
  let n;
  try {
    n = Object.fromEntries([...e].map((r) => [r, jo(r, t)]));
  } finally {
    pr = !1;
  }
  return n;
}
const Io = (e, t, n, r) => {
  const s = r && !he('mediaPropOrder') ? xi(e) : Oo,
    o = n.usedKeys;
  return !o[t] || s > o[t] ? s : null;
};
function _i(e) {
  return e.replace(/[A-Z]/g, (t) => `-${t.toLowerCase()}`).toLowerCase();
}
const Bn = new WeakMap();
function Wo(e, t) {
  if (typeof e == 'string') return e;
  if (Bn.has(e)) return Bn.get(e);
  const n = Object.entries(e)
    .map(
      ([r, s]) => (
        (r = _i(r)),
        typeof s == 'string'
          ? `(${r}: ${s})`
          : (typeof s == 'number' &&
              /[height|width]$/.test(r) &&
              (s = `${s}px`),
            `(${r}: ${s})`)
      )
    )
    .join(' and ');
  return Bn.set(e, n), n;
}
function jo(e, t) {
  const n = It[e];
  return Object.keys(n).every((r) => {
    const s = +n[r],
      o = r.startsWith('max'),
      a = r.endsWith('Width'),
      c = t[a ? 'width' : 'height'];
    return o ? c < s : c > s;
  });
}
function Ei(e, t) {
  typeof e == 'function' ? e(t) : e && (e.current = t);
}
function zr(...e) {
  return (t) => e.forEach((n) => Ei(n, t));
}
function Ou(...e) {
  return _.useCallback(zr(...e), e);
}
function ki(e, t) {
  return _.useCallback(
    (n) => {
      e((r) => {
        const s = typeof n == 'function' ? n(r) : n;
        return Sr(r, s);
      });
    },
    [e, t]
  );
}
function Sr(e, t) {
  return !e || !t || wn(e, t) ? e || t : { ...e, ...t };
}
function wn(e, t) {
  for (const n in t) if (e[n] !== t[n]) return !1;
  return !0;
}
function br(e) {
  let t = '';
  for (const n in e) {
    t += n;
    const r = e[n];
    let s = typeof r;
    if (!r || (s !== 'object' && s !== 'function')) t += s + r;
    else if (Vn.has(r)) t += Vn.get(r);
    else {
      let o = Math.random();
      Vn.set(r, o), (t += o);
    }
  }
  return t;
}
const Vn = new WeakMap(),
  zn = re.createContext;
function Mi(e, t = '') {
  const n = zn(e),
    r = n.Provider,
    s = n,
    o = new Map(),
    a = zn(t);
  function c(d) {
    let f = o.get(d);
    return f || ((f = zn(e)), o.set(d, f)), f;
  }
  const l = (d) => (t ? `${t}--${d}` : d),
    i = ({ children: d, scope: f, ...h }) => {
      const m = l(f),
        x = re.useMemo(() => ({ ...e, ...h }), [br(h)]);
      let b = r;
      return (
        m && (b = c(m).Provider),
        j.jsx(a.Provider, {
          value: m,
          children: j.jsx(b, { value: x, children: d }),
        })
      );
    },
    u = (d = '') => {
      const f = _.useContext(a),
        h = t ? (d ? l(d) : f) : d,
        m = h ? c(h) : n;
      return re.useContext(m);
    };
  return (
    (s.Provider = i),
    (s.props = e),
    (s.context = n),
    (s.useStyledContext = u),
    s
  );
}
const yr = Mi({
    disableSSR: void 0,
    inText: !1,
    language: null,
    animationDriver: null,
    setParentFocusState: null,
  }),
  vs = _.createContext(null),
  Dr = {
    hover: !1,
    press: !1,
    pressIn: !1,
    focus: !1,
    focusVisible: !1,
    focusWithin: !1,
    unmounted: !0,
    disabled: !1,
  },
  xr = { ...Dr, unmounted: !1 },
  Oi = { ...Dr, unmounted: 'should-enter' };
let Dn = null;
const Ni = (e, t) => (
  Dn || (Dn = ze().inverseShorthands), e[t] ?? (Dn ? e[Dn[t]] : void 0)
);
function Lo(e) {
  return e === 'dark' ? 'light' : 'dark';
}
function Fi({ scheme: e, val: t, oppositeVal: n }) {
  const r = Lo(e);
  return { dynamic: { [e]: t, [r]: n } };
}
function Ps(e, t) {
  return e != null && e.dynamic ? e.dynamic[t] : e;
}
const gn = {};
{
  const e = {
    Hidden: !0,
    ActiveDescendant: !0,
    Atomic: !0,
    AutoComplete: !0,
    Busy: !0,
    Checked: !0,
    ColumnCount: 'colcount',
    ColumnIndex: 'colindex',
    ColumnSpan: 'colspan',
    Current: !0,
    Details: !0,
    ErrorMessage: !0,
    Expanded: !0,
    HasPopup: !0,
    Invalid: !0,
    Label: !0,
    Level: !0,
    Modal: !0,
    Multiline: !0,
    MultiSelectable: !0,
    Orientation: !0,
    Owns: !0,
    Placeholder: !0,
    PosInSet: !0,
    Pressed: !0,
    RoleDescription: !0,
    RowCount: !0,
    RowIndex: !0,
    RowSpan: !0,
    Selected: !0,
    SetSize: !0,
    Sort: !0,
    ValueMax: !0,
    ValueMin: !0,
    ValueNow: !0,
    ValueText: !0,
  };
  for (const t in e) {
    let n = e[t];
    n === !0 && (n = t.toLowerCase()), (gn[`accessibility${t}`] = `aria-${n}`);
  }
}
function Bo(e) {
  const t = bi(),
    [n, r, s, o] = e.split('-');
  let a;
  const c = s in t ? s : void 0;
  return c ? (a = o) : (a = s), { name: r, pseudo: a, media: c };
}
const _s = '_';
let Es = null,
  Hn = null;
const Ii = {
    press: 'active',
    focusVisible: 'focus-visible',
    focusWithin: 'focus-within',
  },
  Kn = new Array(5).fill(0).map((e, t) => new Array(t).fill(':root').join(''));
function Wi(e, t, n, r, s = !1, o = '') {
  const a = t.lastIndexOf(':root') + 5,
    c = t.lastIndexOf('{'),
    l = t.slice(a, c),
    i = he('themeClassNameOnRoot') && s ? '' : ' ',
    u = r.pseudo ? Ii[r.pseudo] || r.pseudo : void 0,
    d = u ? `:${u}` : '',
    f = `:root${o}${i}`,
    h = `.t_${n ? 'group_' : ''}${e}${d}`;
  return [l, `${f}${h} ${l.replaceAll(':root', '')}`];
}
const ji = (e, t, n, r, s, o) => {
    const [a, , c, l, i] = e;
    let u = a;
    const d = he('mediaPropOrder'),
      f = r === 'theme',
      h = r === 'platform',
      m = r === 'group',
      x = f || h || m,
      b = '',
      p = c.slice(0, c.indexOf('-') + 1),
      y = `${p}${_s}${t.replace('-', '')}${b}${_s}`;
    let S = '',
      v = '',
      P,
      E,
      g = c.replace(p, y),
      B = i.map((N) => N.replace(c, g)).join(';'),
      C = !1;
    if (x) {
      let N = (o || 0) + (m || h ? 1 : 0);
      if (f || m) {
        const A = Bo(f ? 'theme-' + t : t),
          { name: F, media: Y, pseudo: W } = A;
        (P = Y),
          m && (E = F),
          (W === 'press' || l === 'active') && (N += 2),
          W === 'hover' && (C = !0);
        const [G, X] = Wi(F, B, m, A, f, Kn[N]);
        S = B.replace(G, X);
      } else S = `${Kn[N]}${B}`;
    }
    if (!x || P) {
      if (!Hn) {
        const G = Object.keys(n);
        (Hn = Object.fromEntries(G.map((X) => [X, Wo(n[X])]))),
          d ||
            (Es = Object.fromEntries(
              G.map((X, ue) => [X, new Array(ue + 1).fill(':root').join('')])
            ));
      }
      const N = P || t,
        A = Hn[N],
        F = `${A}`,
        Y = P ? v : d && o ? Kn[o] : Es[N],
        W = P ? `@container ${E}` : '@media';
      P && (B = S),
        B.includes(W)
          ? (S = B.replace('{', ` and ${F} {`).replace('and screen and', 'and'))
          : (S = `${W} ${F}{${Y}${B}}`),
        P &&
          (S = `@supports (contain: ${he('webContainerType') || 'inline-size'}) {${S}}`);
    }
    return C && (S = `@media (hover:hover){${S}}`), [u, void 0, g, void 0, [S]];
  },
  wr = { height: 0, width: 0 };
function Li(e) {
  if (typeof e == 'number')
    return e >>> 0 === e && e >= 0 && e <= 4294967295 ? e : null;
  if (typeof e != 'string') return null;
  const t = Vi();
  let n;
  if ((n = t.hex6.exec(e))) return parseInt(n[1] + 'ff', 16) >>> 0;
  const r = zi(e);
  return (
    r ??
    ((n = t.rgb.exec(e))
      ? ((Le(n[1]) << 24) | (Le(n[2]) << 16) | (Le(n[3]) << 8) | 255) >>> 0
      : (n = t.rgba.exec(e))
        ? n[6] !== void 0
          ? ((Le(n[6]) << 24) |
              (Le(n[7]) << 16) |
              (Le(n[8]) << 8) |
              on(n[9])) >>>
            0
          : ((Le(n[2]) << 24) |
              (Le(n[3]) << 16) |
              (Le(n[4]) << 8) |
              on(n[5])) >>>
            0
        : (n = t.hex3.exec(e))
          ? parseInt(n[1] + n[1] + n[2] + n[2] + n[3] + n[3] + 'ff', 16) >>> 0
          : (n = t.hex8.exec(e))
            ? parseInt(n[1], 16) >>> 0
            : (n = t.hex4.exec(e))
              ? parseInt(
                  n[1] + n[1] + n[2] + n[2] + n[3] + n[3] + n[4] + n[4],
                  16
                ) >>> 0
              : (n = t.hsl.exec(e))
                ? (Xn(sn(n[1]), Ge(n[2]), Ge(n[3])) | 255) >>> 0
                : (n = t.hsla.exec(e))
                  ? n[6] !== void 0
                    ? (Xn(sn(n[6]), Ge(n[7]), Ge(n[8])) | on(n[9])) >>> 0
                    : (Xn(sn(n[2]), Ge(n[3]), Ge(n[4])) | on(n[5])) >>> 0
                  : (n = t.hwb.exec(e))
                    ? (Bi(sn(n[1]), Ge(n[2]), Ge(n[3])) | 255) >>> 0
                    : null)
  );
}
function gt(e, t, n) {
  return (
    n < 0 && (n += 1),
    n > 1 && (n -= 1),
    n < 1 / 6
      ? e + (t - e) * 6 * n
      : n < 1 / 2
        ? t
        : n < 2 / 3
          ? e + (t - e) * (2 / 3 - n) * 6
          : e
  );
}
function Xn(e, t, n) {
  const r = n < 0.5 ? n * (1 + t) : n + t - n * t,
    s = 2 * n - r,
    o = gt(s, r, e + 1 / 3),
    a = gt(s, r, e),
    c = gt(s, r, e - 1 / 3);
  return (
    (Math.round(o * 255) << 24) |
    (Math.round(a * 255) << 16) |
    (Math.round(c * 255) << 8)
  );
}
function Bi(e, t, n) {
  if (t + n >= 1) {
    const a = Math.round((t * 255) / (t + n));
    return (a << 24) | (a << 16) | (a << 8);
  }
  const r = gt(0, 1, e + 1 / 3) * (1 - t - n) + t,
    s = gt(0, 1, e) * (1 - t - n) + t,
    o = gt(0, 1, e - 1 / 3) * (1 - t - n) + t;
  return (
    (Math.round(r * 255) << 24) |
    (Math.round(s * 255) << 16) |
    (Math.round(o * 255) << 8)
  );
}
const fe = '[-+]?\\d*\\.?\\d+',
  Ye = fe + '%';
function Un(...e) {
  return '\\(\\s*(' + e.join(')\\s*,?\\s*(') + ')\\s*\\)';
}
function ks(...e) {
  return (
    '\\(\\s*(' +
    e.slice(0, e.length - 1).join(')\\s*,?\\s*(') +
    ')\\s*/\\s*(' +
    e[e.length - 1] +
    ')\\s*\\)'
  );
}
function Ms(...e) {
  return '\\(\\s*(' + e.join(')\\s*,\\s*(') + ')\\s*\\)';
}
let Yn;
function Vi() {
  return (
    Yn === void 0 &&
      (Yn = {
        rgb: new RegExp('rgb' + Un(fe, fe, fe)),
        rgba: new RegExp(
          'rgba(' + Ms(fe, fe, fe, fe) + '|' + ks(fe, fe, fe, fe) + ')'
        ),
        hsl: new RegExp('hsl' + Un(fe, Ye, Ye)),
        hsla: new RegExp(
          'hsla(' + Ms(fe, Ye, Ye, fe) + '|' + ks(fe, Ye, Ye, fe) + ')'
        ),
        hwb: new RegExp('hwb' + Un(fe, Ye, Ye)),
        hex3: /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
        hex4: /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
        hex6: /^#([0-9a-fA-F]{6})$/,
        hex8: /^#([0-9a-fA-F]{8})$/,
      }),
    Yn
  );
}
function Le(e) {
  const t = parseInt(e, 10);
  return t < 0 ? 0 : t > 255 ? 255 : t;
}
function sn(e) {
  return (((parseFloat(e) % 360) + 360) % 360) / 360;
}
function on(e) {
  const t = parseFloat(e);
  return t < 0 ? 0 : t > 1 ? 255 : Math.round(t * 255);
}
function Ge(e) {
  const t = parseFloat(e);
  return t < 0 ? 0 : t > 100 ? 1 : t / 100;
}
function zi(e) {
  switch (e) {
    case 'transparent':
      return 0;
    case 'aliceblue':
      return 4042850303;
    case 'antiquewhite':
      return 4209760255;
    case 'aqua':
      return 16777215;
    case 'aquamarine':
      return 2147472639;
    case 'azure':
      return 4043309055;
    case 'beige':
      return 4126530815;
    case 'bisque':
      return 4293182719;
    case 'black':
      return 255;
    case 'blanchedalmond':
      return 4293643775;
    case 'blue':
      return 65535;
    case 'blueviolet':
      return 2318131967;
    case 'brown':
      return 2771004159;
    case 'burlywood':
      return 3736635391;
    case 'burntsienna':
      return 3934150143;
    case 'cadetblue':
      return 1604231423;
    case 'chartreuse':
      return 2147418367;
    case 'chocolate':
      return 3530104575;
    case 'coral':
      return 4286533887;
    case 'cornflowerblue':
      return 1687547391;
    case 'cornsilk':
      return 4294499583;
    case 'crimson':
      return 3692313855;
    case 'cyan':
      return 16777215;
    case 'darkblue':
      return 35839;
    case 'darkcyan':
      return 9145343;
    case 'darkgoldenrod':
      return 3095792639;
    case 'darkgray':
      return 2846468607;
    case 'darkgreen':
      return 6553855;
    case 'darkgrey':
      return 2846468607;
    case 'darkkhaki':
      return 3182914559;
    case 'darkmagenta':
      return 2332068863;
    case 'darkolivegreen':
      return 1433087999;
    case 'darkorange':
      return 4287365375;
    case 'darkorchid':
      return 2570243327;
    case 'darkred':
      return 2332033279;
    case 'darksalmon':
      return 3918953215;
    case 'darkseagreen':
      return 2411499519;
    case 'darkslateblue':
      return 1211993087;
    case 'darkslategray':
      return 793726975;
    case 'darkslategrey':
      return 793726975;
    case 'darkturquoise':
      return 13554175;
    case 'darkviolet':
      return 2483082239;
    case 'deeppink':
      return 4279538687;
    case 'deepskyblue':
      return 12582911;
    case 'dimgray':
      return 1768516095;
    case 'dimgrey':
      return 1768516095;
    case 'dodgerblue':
      return 512819199;
    case 'firebrick':
      return 2988581631;
    case 'floralwhite':
      return 4294635775;
    case 'forestgreen':
      return 579543807;
    case 'fuchsia':
      return 4278255615;
    case 'gainsboro':
      return 3705462015;
    case 'ghostwhite':
      return 4177068031;
    case 'gold':
      return 4292280575;
    case 'goldenrod':
      return 3668254975;
    case 'gray':
      return 2155905279;
    case 'green':
      return 8388863;
    case 'greenyellow':
      return 2919182335;
    case 'grey':
      return 2155905279;
    case 'honeydew':
      return 4043305215;
    case 'hotpink':
      return 4285117695;
    case 'indianred':
      return 3445382399;
    case 'indigo':
      return 1258324735;
    case 'ivory':
      return 4294963455;
    case 'khaki':
      return 4041641215;
    case 'lavender':
      return 3873897215;
    case 'lavenderblush':
      return 4293981695;
    case 'lawngreen':
      return 2096890111;
    case 'lemonchiffon':
      return 4294626815;
    case 'lightblue':
      return 2916673279;
    case 'lightcoral':
      return 4034953471;
    case 'lightcyan':
      return 3774873599;
    case 'lightgoldenrodyellow':
      return 4210742015;
    case 'lightgray':
      return 3553874943;
    case 'lightgreen':
      return 2431553791;
    case 'lightgrey':
      return 3553874943;
    case 'lightpink':
      return 4290167295;
    case 'lightsalmon':
      return 4288707327;
    case 'lightseagreen':
      return 548580095;
    case 'lightskyblue':
      return 2278488831;
    case 'lightslategray':
      return 2005441023;
    case 'lightslategrey':
      return 2005441023;
    case 'lightsteelblue':
      return 2965692159;
    case 'lightyellow':
      return 4294959359;
    case 'lime':
      return 16711935;
    case 'limegreen':
      return 852308735;
    case 'linen':
      return 4210091775;
    case 'magenta':
      return 4278255615;
    case 'maroon':
      return 2147483903;
    case 'mediumaquamarine':
      return 1724754687;
    case 'mediumblue':
      return 52735;
    case 'mediumorchid':
      return 3126187007;
    case 'mediumpurple':
      return 2473647103;
    case 'mediumseagreen':
      return 1018393087;
    case 'mediumslateblue':
      return 2070474495;
    case 'mediumspringgreen':
      return 16423679;
    case 'mediumturquoise':
      return 1221709055;
    case 'mediumvioletred':
      return 3340076543;
    case 'midnightblue':
      return 421097727;
    case 'mintcream':
      return 4127193855;
    case 'mistyrose':
      return 4293190143;
    case 'moccasin':
      return 4293178879;
    case 'navajowhite':
      return 4292783615;
    case 'navy':
      return 33023;
    case 'oldlace':
      return 4260751103;
    case 'olive':
      return 2155872511;
    case 'olivedrab':
      return 1804477439;
    case 'orange':
      return 4289003775;
    case 'orangered':
      return 4282712319;
    case 'orchid':
      return 3664828159;
    case 'palegoldenrod':
      return 4008225535;
    case 'palegreen':
      return 2566625535;
    case 'paleturquoise':
      return 2951671551;
    case 'palevioletred':
      return 3681588223;
    case 'papayawhip':
      return 4293907967;
    case 'peachpuff':
      return 4292524543;
    case 'peru':
      return 3448061951;
    case 'pink':
      return 4290825215;
    case 'plum':
      return 3718307327;
    case 'powderblue':
      return 2967529215;
    case 'purple':
      return 2147516671;
    case 'rebeccapurple':
      return 1714657791;
    case 'red':
      return 4278190335;
    case 'rosybrown':
      return 3163525119;
    case 'royalblue':
      return 1097458175;
    case 'saddlebrown':
      return 2336560127;
    case 'salmon':
      return 4202722047;
    case 'sandybrown':
      return 4104413439;
    case 'seagreen':
      return 780883967;
    case 'seashell':
      return 4294307583;
    case 'sienna':
      return 2689740287;
    case 'silver':
      return 3233857791;
    case 'skyblue':
      return 2278484991;
    case 'slateblue':
      return 1784335871;
    case 'slategray':
      return 1887473919;
    case 'slategrey':
      return 1887473919;
    case 'snow':
      return 4294638335;
    case 'springgreen':
      return 16744447;
    case 'steelblue':
      return 1182971135;
    case 'tan':
      return 3535047935;
    case 'teal':
      return 8421631;
    case 'thistle':
      return 3636451583;
    case 'tomato':
      return 4284696575;
    case 'turquoise':
      return 1088475391;
    case 'violet':
      return 4001558271;
    case 'wheat':
      return 4125012991;
    case 'white':
      return 4294967295;
    case 'whitesmoke':
      return 4126537215;
    case 'yellow':
      return 4294902015;
    case 'yellowgreen':
      return 2597139199;
  }
  return null;
}
var Vo = Li;
const zo = Ia(Vo),
  Di = ja({ __proto__: null, default: zo }, [Vo]),
  Hi = zo || Di,
  Ki = Hi;
function Xi(e) {
  const t = Math.round((e & 4278190080) >>> 24),
    n = Math.round((e & 16711680) >>> 16),
    r = Math.round((e & 65280) >>> 8),
    s = ((e & 255) >>> 0) / 255;
  return { r: t, g: n, b: r, a: s };
}
const Do = (e, t) => {
    if (e) {
      if (e[0] === '$') return e;
      if (e.startsWith('var(')) {
        if (typeof t == 'number' && t < 1)
          return `color-mix(in srgb, ${e} ${t * 100}%, transparent)`;
      } else {
        const n = Ho(e);
        if (n) {
          const r = `${n.r},${n.g},${n.b}`;
          return t === 1 ? `rgb(${r})` : `rgba(${r},${t ?? n.a ?? 1})`;
        }
      }
      return e;
    }
  },
  Ho = (e) => {
    const t = Ki(e);
    if (t != null) return Xi(t);
  };
function Ui({
  shadowColor: e,
  shadowOffset: t,
  shadowOpacity: n,
  shadowRadius: r,
}) {
  var a;
  const { height: s, width: o } = t || wr;
  return {
    shadowOffset: { width: o || 0, height: s || 0 },
    shadowRadius: r || 0,
    shadowColor: Do(e, 1),
    shadowOpacity: n ?? (e ? ((a = Ho(e)) == null ? void 0 : a.a) : 1),
  };
}
function vn(e) {
  var t;
  (e.shadowRadius != null ||
    e.shadowColor ||
    e.shadowOpacity != null ||
    e.shadowOffset) &&
    Object.assign(e, Ui(e));
  for (const n in Os) n in e && (e[(t = Os[n])] || (e[t] = 'solid'));
}
const Os = {
    borderWidth: 'borderStyle',
    borderBottomWidth: 'borderBottomStyle',
    borderTopWidth: 'borderTopStyle',
    borderLeftWidth: 'borderLeftStyle',
    borderRightWidth: 'borderRightStyle',
  },
  Yi = { ...qa, translateX: !0, translateY: !0 };
function xe(e, t = '') {
  if (bo[t] || (t && !Yi[t]) || typeof e == 'boolean') return e;
  let n = e;
  return e && typeof e == 'object'
    ? e
    : (typeof e == 'number' ? (n = `${e}px`) : t && (n = `${n}`), n);
}
function Hr(e) {
  return e
    .map((t) => {
      const n = Object.keys(t)[0],
        r = t[n];
      return n === 'matrix' || n === 'matrix3d'
        ? `${n}(${r.join(',')})`
        : `${n}(${xe(r, n)})`;
    })
    .join(' ');
}
function Ns(e) {
  Kr(e);
  const t = [];
  for (const n in e) {
    if (n === '$$css') continue;
    const r = e[n];
    if (n in ye) r && t.push(...Ko(r, ye[n]));
    else if (fr(n))
      for (const s in r) {
        const o = Tr(r, s);
        o && ((o[0] = n), t.push(o));
      }
    else {
      const s = Tr(e, n);
      s && t.push(s);
    }
  }
  return t;
}
const Ko = (e, t) => {
  Kr(e);
  const n = [];
  for (const r in e) {
    const s = Tr(e, r, t);
    s && n.push(s);
  }
  return n;
};
let an = null;
const Tr = (e, t, n) => {
  let r = e[t];
  if (r == null) return;
  t === 'transform' && Array.isArray(e.transform) && (r = Hr(r));
  const s = xe(r, t),
    o = Bt(typeof s == 'string' ? s : `${s}`),
    a = n ? `0${n.name}-` : '';
  an || (an = Ja());
  const c = `_${(an == null ? void 0 : an.inverseShorthands[t]) || t}-${a}${o}`,
    l = Qi(c, t, s, n);
  return [t, s, c, n == null ? void 0 : n.name, l];
};
function Kr(e) {
  const {
    shadowOffset: t,
    shadowRadius: n,
    shadowColor: r,
    shadowOpacity: s,
  } = e;
  if (n != null || r || t != null || s != null) {
    const l = t || wr,
      i = xe(l.width),
      u = xe(l.height),
      d = xe(n),
      f = Do(r, s);
    if (f) {
      const h = `${i} ${u} ${d} ${f}`;
      e.boxShadow = e.boxShadow ? `${e.boxShadow}, ${h}` : h;
    }
    delete e.shadowOffset,
      delete e.shadowRadius,
      delete e.shadowColor,
      delete e.shadowOpacity;
  }
  const { textShadowColor: o, textShadowOffset: a, textShadowRadius: c } = e;
  if (o || a || c) {
    const { height: l, width: i } = a || wr,
      u = c || 0,
      d = xe(o, 'textShadowColor');
    if (d && (l !== 0 || i !== 0 || u !== 0)) {
      const f = xe(u),
        h = xe(i),
        m = xe(l);
      e.textShadow = `${h} ${m} ${f} ${d}`;
    }
    delete e.textShadowColor,
      delete e.textShadowOffset,
      delete e.textShadowRadius;
  }
}
function dt(e, t = !1) {
  let n = '';
  for (const [r, s] of e) n += `${qi(r)}:${s}${t ? ' !important' : ''};`;
  return `{${n}}`;
}
const Gn = {},
  Gi = (e) => `-${e.toLowerCase()}`,
  qi = (e) => {
    if (e in Gn) return Gn[e];
    const t = e.replace(/[A-Z]/g, Gi);
    return (Gn[e] = t), t;
  },
  Zi = (() => {
    const e = {};
    for (const t in ye) {
      const n = ye[t];
      e[n.name] = `${[...Array(n.priority)].map(() => ':root').join('')} `;
    }
    return e;
  })();
function Qi(e, t, n, r) {
  const s = r ? (r.name === 'disabled' ? '[aria-disabled]' : `:${r.name}`) : '',
    o = r == null ? void 0 : r.selector;
  let a = r ? (o ? `${o} .${e}` : `${Zi[r.name]} .${e}${s}`) : `:root .${e}`;
  o === ye.enterStyle.selector && (a = `${a}, .${e}${o}`);
  const c = !!r;
  let l = [];
  switch (t) {
    case 'placeholderTextColor': {
      const i = dt(
        [
          ['color', n],
          ['opacity', 1],
        ],
        c
      );
      l.push(`${a}::placeholder${i}`);
      break;
    }
    case 'backgroundClip':
    case 'userSelect': {
      const i = `Webkit${`${t[0].toUpperCase()}${t.slice(1)}`}`,
        u = dt(
          [
            [t, n],
            [i, n],
          ],
          c
        );
      l.push(`${a}${u}`);
      break;
    }
    case 'pointerEvents': {
      let i = n;
      n === 'auto' || n === 'box-only'
        ? ((i = 'auto'), n === 'box-only' && l.push(`${a}>*${ec}`))
        : (n === 'none' || n === 'box-none') &&
          ((i = 'none'), n === 'box-none' && l.push(`${a}>*${Ji}`));
      const u = dt([['pointerEvents', i]], !0);
      l.push(`${a}${u}`);
      break;
    }
    default: {
      const i = dt([[t, n]], c);
      l.push(`${a}${i}`);
      break;
    }
  }
  return (
    (r == null ? void 0 : r.name) === 'hover' &&
      (l = l.map((i) => `@media (hover) {${i}}`)),
    l
  );
}
const Ji = dt([['pointerEvents', 'auto']], !0),
  ec = dt([['pointerEvents', 'none']], !0);
function qn(e) {
  if (!e.startsWith('$platform')) return !0;
  const t = e.slice(10);
  return t === Ka || t === 'web';
}
function tc(e, t) {
  if (e.startsWith('$theme-')) return e.slice(7).startsWith(t);
}
const Fs = {},
  Is = {},
  nc = [
    ['flexGrow', 0],
    ['flexShrink', 1],
    ['flexBasis', 'auto'],
  ];
function Xo(e, t) {
  if (e === 'flex')
    return t === -1
      ? nc
      : [
          ['flexGrow', t],
          ['flexShrink', 1],
          ['flexBasis', he('styleCompat') === 'react-native' ? 0 : 'auto'],
        ];
  switch (e) {
    case 'textAlignVertical':
      return [['verticalAlign', t === 'center' ? 'middle' : t]];
    case 'writingDirection':
      return [['direction', t]];
    case 'backdropFilter':
      return [
        ['backdropFilter', t],
        ['WebkitBackdropFilter', t],
      ];
  }
  if (e in Pt) return Pt[e].map((n) => [n, t]);
  if (e in Is) return Is[e].map((n) => [n, t]);
  if (e in Fs) return Fs[e](t);
}
const Ws = ['Top', 'Right', 'Bottom', 'Left'],
  js = ['Right', 'Left'],
  Ls = ['Top', 'Bottom'],
  Bs = ['X', 'Y'],
  Pt = {
    borderColor: ['TopColor', 'RightColor', 'BottomColor', 'LeftColor'],
    borderRadius: [
      'TopLeftRadius',
      'TopRightRadius',
      'BottomRightRadius',
      'BottomLeftRadius',
    ],
    borderWidth: ['TopWidth', 'RightWidth', 'BottomWidth', 'LeftWidth'],
    margin: Ws,
    marginHorizontal: js,
    marginVertical: Ls,
    overscrollBehavior: Bs,
    padding: Ws,
    paddingHorizontal: js,
    paddingVertical: Ls,
    borderStyle: ['TopStyle', 'RightStyle', 'BottomStyle', 'LeftStyle'],
    overflow: Bs,
  };
var mo;
for (const e in Pt) {
  const t = e.slice(
    0,
    ((mo = /[A-Z]/.exec(e)) == null ? void 0 : mo.index) ?? e.length
  );
  Pt[e] = Pt[e].map((n) => `${t}${n}`);
}
const Zn = new WeakMap(),
  rc = (e) => {
    if (Zn.has(e)) return Zn.get(e);
    const { props: t, conf: n, context: r, theme: s } = e;
    let o = n.fontsParsed;
    r != null && r.language && (o = $r(n.fontsParsed, r.language));
    const a = {
      fonts: o,
      tokens: n.tokensParsed,
      theme: s,
      get fontFamily() {
        return (
          xn(e.fontFamily || e.props.fontFamily) ||
          t.fontFamily ||
          xn(e.conf.defaultFont)
        );
      },
      get font() {
        return (
          o[this.fontFamily] ||
          (!t.fontFamily || t.fontFamily[0] === '$'
            ? o[e.conf.defaultFont]
            : void 0)
        );
      },
      props: t,
    };
    return Zn.set(e, a), a;
  },
  Qn = new WeakMap();
function $r(e, t) {
  if (Qn.has(t)) return Qn.get(t);
  const n = {
    ...e,
    ...Object.fromEntries(
      Object.entries(t).map(([r, s]) => {
        if (s === 'default') return [];
        const o = `$${r}_${s}`;
        return [`$${r}`, e[o]];
      })
    ),
  };
  return Qn.set(t, n), n;
}
const Pn = (e) => e && !Array.isArray(e) && typeof e == 'object';
function Uo(e, t = !1) {
  const n = {};
  for (let r in e) {
    const s = e[r];
    if (s == null) continue;
    if (r in ye || (r[0] === '$' && Pn(s))) {
      n[r] = Uo(s, t);
      continue;
    }
    const o = t ? s : xe(s, r),
      a = Xo(r, o);
    a ? Object.assign(n, Object.fromEntries(a)) : (n[r] = o);
  }
  return vn(n), n;
}
const _t = {
  untilMeasured: 1,
  animation: 1,
  space: 1,
  animateOnly: 1,
  disableClassName: 1,
  debug: 1,
  componentName: 1,
  disableOptimization: 1,
  tag: 1,
  style: 1,
  group: 1,
  themeInverse: 1,
  animatePresence: 1,
};
var sc = {};
const Yo = (e, t, n, r, s) => {
    var i;
    if (r) return s(e, t);
    if (((Et = null), e === 'elevationAndroid')) return;
    const { conf: o, styleProps: a, staticConfig: c } = n;
    if (t === 'unset') {
      const u = (i = o.unset) == null ? void 0 : i[e];
      if (u != null) t = u;
      else return;
    }
    const { variants: l } = c;
    if (!a.noExpand && l && e in l) {
      const u = Go(e, t, a, n, '');
      if (u) {
        u.forEach(([d, f]) => s(d, f));
        return;
      }
    }
    if (
      (a.disableExpandShorthands ||
        (e in o.shorthands && (e = o.shorthands[e])),
      t != null &&
        (t[0] === '$'
          ? (t = Cr(e, t, a, n))
          : Ae(t) && (t = Xr(e, t, a.resolveValues))),
      t != null)
    ) {
      e === 'fontFamily' && Et && (n.fontFamily = Et);
      const u = a.noExpand ? null : Xo(e, t);
      if (u) {
        const d = u.length;
        for (let f = 0; f < d; f++) {
          const [h, m] = u[f];
          s(h, m);
        }
      } else s(e, t);
    }
  },
  Go = (e, t, n, r, s) => {
    const { staticConfig: o, conf: a, debug: c } = r,
      { variants: l } = o;
    if (!l) return;
    let i = ic(l[e], t, a);
    if (!i) {
      if (sc.TAMAGUI_WARN_ON_MISSING_VARIANT === '1' && typeof t != 'boolean') {
        const d = o.componentName || '[UnnamedComponent]';
        console.warn(
          `No variant found: ${d} has variant "${e}", but no matching value "${t}"`
        );
      }
      return;
    }
    if (typeof i == 'function') {
      const d = i,
        f = rc(r);
      i = d(t, f);
    }
    let u;
    if (Pn(i)) {
      const d = i.fontFamily || i[a.inverseShorthands.fontFamily];
      d && ((u = oc(d, a)), (r.fontFamily = u)), (i = qo(e, i, n, r, s));
    }
    if (i) {
      const d = Uo(i, !!n.noNormalize),
        f = Object.entries(d);
      return u && u[0] === '$' && (Et = xn(u)), f;
    }
  };
function oc(e, t) {
  if (Ae(e)) {
    const n = Vs.get(e);
    if (n) return n;
    for (const r in t.fontsParsed) {
      const s = t.fontsParsed[r].family;
      if (Ae(s) && (Vs.set(s, r), s === e)) return r;
    }
  } else if (typeof e == 'string' && e[0] === '$') return e;
}
const Vs = new WeakMap(),
  qo = (e, t, n, r, s) => {
    const { conf: o, staticConfig: a, debug: c, theme: l } = r,
      { variants: i } = a,
      u = {};
    for (const d in t) {
      const f = o.shorthands[d] || d,
        h = t[d];
      if (!(!n.noSkip && f in _t)) {
        if (n.noExpand) u[f] = h;
        else if (i && f in i) {
          if (s && s === e) u[f] = h[0] === '$' ? Cr(f, h, n, r) : h;
          else {
            const m = Go(f, h, n, r, e);
            if (m)
              for (const [x, b] of m)
                b != null &&
                  (x in ye
                    ? (u[x] ?? (u[x] = {}), Object.assign(u[x], b))
                    : (u[x] = b));
          }
          continue;
        }
        if (Ae(h)) {
          u[f] = Xr(f, h, n.resolveValues);
          continue;
        }
        if (typeof h == 'string') {
          const m = h[0] === '$' ? Cr(f, h, n, r) : h;
          u[f] = m;
          continue;
        }
        if (Pn(h)) {
          const m = qo(f, h, n, r, e);
          u[f] ?? (u[f] = {}), Object.assign(u[f], m);
        } else u[f] = h;
      }
    }
    return u;
  },
  ac = ['size', 'color', 'radius', 'space', 'zIndex'].map((e) => ({
    name: e,
    spreadName: `...${e}`,
  }));
function ic(e, t, n) {
  if (!e) return;
  if (typeof e == 'function') return e;
  const r = e[t];
  if (r) return r;
  if (t != null) {
    const { tokensParsed: s } = n;
    for (const { name: a, spreadName: c } of ac)
      if (c in e && a in s && t in s[a]) return e[c];
    const o = e['...fontSize'];
    if (o && n.fontSizeTokens.has(t)) return o;
  }
  return e[`:${typeof t}`] || e['...'];
}
const cc = { fontSize: 'size', fontWeight: 'weight' };
let Et = null;
const Cr = (e, t, n, r) => {
  var x, b, p, y;
  let s = n.resolveValues || 'none';
  if (s === 'none') return t;
  const {
      theme: o,
      conf: a = ze(),
      context: c,
      fontFamily: l,
      staticConfig: i,
    } = r,
    u = o ? o[t] || o[t.slice(1)] : void 0,
    d = a.tokensParsed;
  let f,
    h = !1;
  const m = (x = i == null ? void 0 : i.accept) == null ? void 0 : x[e];
  if (m) {
    const S = u ?? d[m][t];
    S != null && ((s = 'value'), (f = S), (h = !0));
  }
  if (u) {
    if (s === 'except-theme') return t;
    (f = u), (h = !0);
  } else {
    if (t in a.specificTokens) (h = !0), (f = a.specificTokens[t]);
    else {
      switch (e) {
        case 'fontFamily': {
          (f =
            ((b = (
              c != null && c.language
                ? $r(a.fontsParsed, c.language)
                : a.fontsParsed
            )[t]) == null
              ? void 0
              : b.family) || t),
            (Et = t),
            (h = !0);
          break;
        }
        case 'fontSize':
        case 'lineHeight':
        case 'letterSpacing':
        case 'fontWeight': {
          const S = l || a.defaultFontToken;
          if (S) {
            const v =
              c != null && c.language
                ? $r(a.fontsParsed, c.language)
                : a.fontsParsed;
            (f =
              ((y =
                (p = v[S] || v[a.defaultFontToken]) == null
                  ? void 0
                  : p[cc[e] || e]) == null
                ? void 0
                : y[t]) || t),
              (h = !0);
          }
          break;
        }
      }
      for (const S in st)
        if (e in st[S]) {
          const v = d[S][t];
          v != null && ((f = v), (h = !0));
        }
    }
    if (!h) {
      const S = d.space[t];
      S != null && ((f = S), (h = !0));
    }
  }
  if (h) return Xr(e, f, s);
};
function Xr(e, t, n) {
  if (n === 'none') return t;
  if (Ae(t)) {
    if (n === 'value') return t.val;
    const r = t == null ? void 0 : t.get;
    return typeof r == 'function'
      ? r(n === 'web' ? 'web' : void 0)
      : t.variable;
  }
  return t;
}
const Zo = (e, t) => (e < t ? -1 : e > t ? 1 : 0);
var qe = {};
let tt;
const zs = '-';
function Ds(e, t, n) {
  return e in t ? !0 : n && e in n;
}
const Qo = (e, t, n, r, s, o, a, c, l, i, u, d) => {
  var we, ce, Ht, yt;
  tt = tt || ze();
  const f = (c == null ? void 0 : c.animationDriver) || tt.animations;
  if (e.passThrough) return null;
  o.isAnimated &&
    f.isReactNative &&
    !o.noNormalize &&
    (o.noNormalize = 'values');
  const { shorthands: h } = tt,
    {
      isHOC: m,
      isText: x,
      isInput: b,
      variants: p,
      isReactNative: y,
      inlineProps: S,
      inlineWhenUnflattened: v,
      parentStaticConfig: P,
      acceptsClassName: E,
    } = t,
    g = {},
    B = o.mediaState || be,
    C = E && yn && !o.noClass,
    N = {},
    A = {};
  let F = null,
    Y = e.space,
    W = !1,
    G,
    X,
    ue;
  e.className;
  let pe = 0;
  const Qe = t.validStyles || (t.isText || t.isInput ? wo : Vt),
    T = {
      classNames: A,
      conf: tt,
      props: e,
      styleProps: o,
      componentState: s,
      staticConfig: t,
      style: null,
      theme: n,
      usedKeys: {},
      viewProps: g,
      context: c,
      debug: d,
    };
  if (qe.IS_STATIC === 'is_static') {
    const { fallbackProps: L } = o;
    L &&
      (T.props = new Proxy(e, {
        get(w, k, le) {
          return Reflect.has(e, k) ? Reflect.get(e, k) : Reflect.get(L, k);
        },
      }));
  }
  const { asChild: ve } = e,
    { accept: at } = t,
    { noSkip: it, disableExpandShorthands: De, noExpand: me } = o,
    { webContainerType: M } = tt.settings,
    He = P == null ? void 0 : P.variants;
  for (const L in e) {
    let w = L,
      k = e[w];
    if (w === 'children') {
      g[w] = k;
      continue;
    }
    if (at) {
      const $ = at[w];
      if (($ === 'style' || $ === 'textStyle') && k && typeof k == 'object') {
        g[w] = vt(T, w, k, o.noClass);
        continue;
      }
    }
    if (
      (De || (w in h && (w = h[w])), w === 'className' || (ve && $o[w] === k))
    )
      continue;
    if (w in _t && !it && !m) {
      if (w === 'group') {
        const $ = `t_group_${k}`,
          Q = [
            'continer',
            void 0,
            $,
            void 0,
            [
              `.${$} { container-name: ${k}; container-type: ${M || 'inline-size'}; }`,
            ],
          ];
        cn(N, Q);
      }
      continue;
    }
    let le = Ds(w, Qe, at);
    if (t.isReactNative && w.startsWith('data-')) {
      (w = w.replace('data-', '')),
        g.dataSet || (g.dataSet = {}),
        (g.dataSet[w] = k);
      continue;
    }
    if (w === 'dataSet') {
      for (const $ in k) g[`data-${gc($)}`] = k[$];
      continue;
    }
    if (!me) {
      if (
        w === 'disabled' &&
        k === !0 &&
        ((g['aria-disabled'] = !0),
        (i === 'button' ||
          i === 'form' ||
          i === 'input' ||
          i === 'select' ||
          i === 'textarea') &&
          (g.disabled = !0),
        !(p != null && p.disabled))
      )
        continue;
      if (w === 'testID') {
        g[y ? w : 'data-testid'] = k;
        continue;
      }
      if (w === 'id' || w === 'nativeID') {
        g.id = k;
        continue;
      }
      let $ = !1;
      if (y) {
        if (w in gn || w.startsWith('accessibility')) {
          g[w] = k;
          continue;
        }
      } else {
        if ((($ = !0), w in gn)) {
          g[gn[w]] = k;
          continue;
        }
        switch (w) {
          case 'accessibilityRole': {
            k === 'none' ? (g.role = 'presentation') : (g.role = Sc[k] || k);
            continue;
          }
          case 'accessibilityLabelledBy':
          case 'accessibilityFlowTo':
          case 'accessibilityControls':
          case 'accessibilityDescribedBy': {
            g[`aria-${w.replace('accessibility', '').toLowerCase()}`] = fc(k);
            continue;
          }
          case 'accessibilityKeyShortcuts': {
            Array.isArray(k) && (g['aria-keyshortcuts'] = k.join(' '));
            continue;
          }
          case 'accessibilityLiveRegion': {
            g['aria-live'] = k === 'none' ? 'off' : k;
            continue;
          }
          case 'accessibilityReadOnly': {
            (g['aria-readonly'] = k),
              (i === 'input' || i === 'select' || i === 'textarea') &&
                (g.readOnly = !0);
            continue;
          }
          case 'accessibilityRequired': {
            (g['aria-required'] = k),
              (i === 'input' || i === 'select' || i === 'textarea') &&
                (g.required = k);
            continue;
          }
          default:
            $ = !1;
        }
      }
      if ($) continue;
    }
    let V = !le && p && w in p;
    const ke = le || V;
    let q = w in lr,
      Z = !ke && !q && fr(w),
      se = !!(Z || q);
    if (se && w.startsWith('$group-')) {
      const $ = w.split('-'),
        Q = $.length;
      if (Q === 2 || (Q === 3 && Rs[$[$.length - 1]])) {
        const lt = $[1];
        l &&
          !(l != null && l[lt]) &&
          (w = w.replace('$group-', '$group-true-'));
      }
    }
    const Je = le || se || (V && !me);
    if (Je && (ve === 'except-style' || ve === 'except-style-web')) continue;
    const kn =
        (!Je && m) || (m && He && w in He) || (S == null ? void 0 : S.has(w)),
      ct = He == null ? void 0 : He[w],
      Kt = !!(m && (le || se || ct || w in _t));
    if (((kn || Kt) && (Hs(g, w, k, se), !V)) || (!it && w in _t)) continue;
    (x || b) &&
      k &&
      (w === 'fontFamily' || w === h.fontFamily) &&
      k in tt.fontsParsed &&
      (T.fontFamily = k);
    const Ie = se || !ke;
    Yo(w, k, T, Ie, ($, Q) => {
      var Xt, Ut, J, Yt;
      const lt = o.styledContextProps && $ in o.styledContextProps;
      if (!m && Ie && !lt && !se) {
        g[$] = Q;
        return;
      }
      if (Q != null) {
        if (!m && Ds($, Qe, at)) {
          pt(T, $, Q, 1);
          return;
        }
        if (
          ((q = $ in lr),
          (Z = !q && fr($)),
          (se = !!(Z || q)),
          (V = p && $ in p),
          ((S != null && S.has($)) ||
            (qe.IS_STATIC === 'is_static' && v != null && v.has($))) &&
            (g[$] = e[$] ?? Q),
          (o.noExpand && q) ||
            (m &&
              (se ||
                ((Xt = P == null ? void 0 : P.variants) == null
                  ? void 0
                  : Xt[w]))))
        ) {
          Hs(g, $, Q, se);
          return;
        }
        if (q) {
          if (!Q) return;
          const Ke = vt(T, $, Q, o.noClass && qe.IS_STATIC !== 'is_static');
          if (
            (!C || qe.IS_STATIC === 'is_static') &&
            (F || (F = {}), F[$] || (F[$] = {}), qe.IS_STATIC === 'is_static')
          ) {
            Object.assign(F[$], Ke);
            return;
          }
          const ee = ye[$],
            Me = $ === 'enterStyle',
            Se = $ === 'exitStyle';
          if (!ee) return;
          if (C && !Se) {
            const Oe = Ko(Ke, ee);
            for (const H of Oe) {
              const U = `${H[Ln]}${zs}${ee.name}`;
              cn(N, H), (A[U] = H[Nt]);
            }
          }
          if (!C || Se || Me) {
            const Oe = ee.stateKey || ee.name;
            let H = s[Oe] === !1;
            Se && (H = !o.isExiting), Me && s.unmounted === !1 && (H = !0);
            const U = ee.priority;
            for (const ge in Ke) {
              const D = Ke[ge];
              if (H) Jn(ge, T);
              else {
                const oe = T.usedKeys[ge] || 0;
                U >= oe &&
                  (qe.IS_STATIC === 'is_static' &&
                    (F || (F = {}), F[$] || (F[$] = {}), (F[$][ge] = D)),
                  pt(T, ge, D, U));
              }
            }
            if (!H)
              for (const ge in Q) {
                const D = h[ge] || ge;
                T.usedKeys[D] = Math.max(U, T.usedKeys[D] || 0);
              }
          }
          return;
        }
        if (Z) {
          if (!Q) return;
          const Ke = Q.space,
            ee = $.slice(Z == 'theme' ? 7 : 1);
          if (
            (W || (W = !0),
            (Ke || !C || o.willBeAnimated) &&
              ((!W || typeof W == 'boolean') && (W = new Set()), W.add(ee)),
            Z === 'platform' && !qn($))
          )
            return;
          const Me = pe;
          if (((pe += 1), C)) {
            const Se = vt(T, $, Q, !1);
            if (Ke && (delete Se.space, B[ee])) {
              const H = Io(ee, 'space', T, !0);
              H && ((Y = Q.space), (T.usedKeys.space = H));
            }
            const Oe = Ns(Se);
            for (const H of Oe) {
              const U = H[Ln],
                ge = U[0] === '$';
              if (ge && !qn(U)) continue;
              const D = ji(H, ee, It, Z, !1, Me),
                oe = ge ? H[2] : '',
                de = `${H[Ln]}${oe}${zs}${ee}${H[Ya] || ''}`;
              cn(N, D), (A[de] = D[Nt]);
            }
          } else {
            let Se = function (D, oe) {
              T.style || (T.style = {}),
                bc(T, ee, D, oe, B[ee], ge) &&
                  D === 'fontFamily' &&
                  (T.fontFamily = U.fontFamily);
            };
            const Oe = Z === 'theme',
              H = Z === 'group';
            if (!Oe && Z !== 'platform' && !H && !B[ee]) return;
            const U = vt(T, $, Q, !0);
            let ge = 0;
            if (Oe) {
              if (((G = !0), Ha && he('fastSchemeChange'))) {
                T.style || (T.style = {});
                const D = ee,
                  oe = Lo(ee);
                for (const de in U) {
                  let Pe = Ps(U[de], D);
                  const Te = Ps(T.style[de], oe);
                  (U[de] = Fi({ scheme: D, val: Pe, oppositeVal: Te })),
                    pt(T, de, U[de], Me);
                }
              } else if (!(r === ee || r.startsWith(ee))) return;
            } else if (H) {
              const D = Bo(ee),
                oe = D.name,
                de =
                  (Ut = l == null ? void 0 : l[oe]) == null ? void 0 : Ut.state,
                Pe = D.pseudo,
                Te = D.media;
              if (!de) {
                X || (X = new Set());
                return;
              }
              const Xe = (J = s.group) == null ? void 0 : J[oe];
              if (Te) {
                ue || (ue = new Set()), ue.add(Te);
                const $e = Xe == null ? void 0 : Xe.media;
                let We = $e == null ? void 0 : $e[Te];
                if ((!$e && de.layout && (We = jo(Te, de.layout)), !We)) {
                  for (const Ue in U) Jn(Ue, T);
                  return;
                }
                ge = 2;
              }
              if (Pe) {
                X || (X = new Set()), X.add(oe);
                const $e =
                    (Yt = Xe || (l == null ? void 0 : l[oe].state)) == null
                      ? void 0
                      : Yt.pseudo,
                  We = $e == null ? void 0 : $e[Pe],
                  Ue = Rs[Pe];
                if (!We) {
                  for (const et in U) Jn(et, T);
                  return;
                }
                ge = Ue;
              }
            }
            for (const D in U) {
              if (D === 'space') {
                Y = k.space;
                continue;
              }
              if (D[0] === '$') {
                if (!qn(D) || !tc(D, r)) continue;
                for (const oe in U[D]) Se(oe, U[D][oe]);
              } else Se(D, U[D]);
            }
          }
          return;
        }
        if (!V) {
          if (lt) return;
          g[$] = Q;
        }
      }
    });
  }
  if (
    (o.noNormalize !== !1 &&
      (T.style &&
        (vn(T.style),
        !o.noExpand &&
          !o.noMergeStyle &&
          yn &&
          (!y || !f.supportsCSS) &&
          Kr(T.style)),
      T.flatTransforms &&
        (T.style || (T.style = {}), Jo(T.style, T.flatTransforms))),
    !o.noNormalize &&
      !t.isReactNative &&
      !t.isHOC &&
      (!o.isAnimated || f.supportsCSS) &&
      Array.isArray((we = T.style) == null ? void 0 : we.transform) &&
      (T.style.transform = Hr(T.style.transform)),
    !o.noMergeStyle && T.style && C)
  ) {
    let L,
      w = !1;
    if (!T.style.$$css) {
      const k = Ns(T.style);
      for (const le of k) {
        const [V, ke, q] = le,
          Z =
            o.isAnimated &&
            o.noClass &&
            ((ce = e.animateOnly) == null ? void 0 : ce.includes(V)),
          se =
            !Z &&
            !o.isAnimated &&
            ((Ht = e.animateOnly) == null ? void 0 : Ht.includes(V));
        Z
          ? (L || (L = {}), (L[V] = T.style[V]))
          : se
            ? (L || (L = {}), (L[V] = ke), (w = !0))
            : (cn(N, le), (A[V] = q));
      }
      (w || qe.IS_STATIC !== 'is_static') && (T.style = L || {});
    }
  }
  if (y) g.tabIndex === 0 && (g.accessible ?? (g.accessible = !0));
  else if (g.tabIndex == null) {
    const L = g.focusable ?? g.accessible;
    g.focusable && delete g.focusable;
    const w = g.role;
    L === !1 && (g.tabIndex = '-1'),
      i === 'a' ||
      i === 'button' ||
      i === 'input' ||
      i === 'select' ||
      i === 'textarea'
        ? (L === !1 || e.accessibilityDisabled === !0) && (g.tabIndex = '-1')
        : (w === 'button' ||
            w === 'checkbox' ||
            w === 'link' ||
            w === 'radio' ||
            w === 'textbox' ||
            w === 'switch') &&
          L !== !1 &&
          (g.tabIndex = '0'),
      L && ((g.tabIndex = '0'), delete g.focusable);
  }
  const Ee = e.style;
  if (!o.noMergeStyle && Ee)
    if (m) g.style = Ks(Ee);
    else {
      const L = Array.isArray(Ee),
        w = L ? Ee.length : 1;
      for (let k = 0; k < w; k++) {
        const le = L ? Ee[k] : Ee;
        le &&
          (le.$$css
            ? Object.assign(T.classNames, le)
            : (T.style || (T.style = {}), Object.assign(T.style, Ks(le))));
      }
    }
  const En = {
      space: Y,
      hasMedia: W,
      fontFamily: T.fontFamily,
      viewProps: g,
      style: T.style,
      pseudos: F,
      classNames: A,
      rulesToInsert: N,
      dynamicThemeAccess: G,
      pseudoGroups: X,
      mediaGroups: ue,
    },
    bt = ve === 'except-style' || ve === 'except-style-web';
  if (!o.noMergeStyle && !bt) {
    const L = T.style;
    {
      let w =
        x || b
          ? T.fontFamily ||
            ((yt = t.defaultProps) == null ? void 0 : yt.fontFamily)
          : null;
      w && w[0] === '$' && (w = w.slice(1));
      const k = w ? `font_${w}` : '',
        le = e.group ? `t_group_${e.group}` : '',
        V = e.componentName || t.componentName,
        ke = e.asChild || !V ? '' : `is_${V}`;
      let q = [];
      ke && q.push(ke),
        k && q.push(k),
        A && q.push(Object.values(A).join(' ')),
        le && q.push(le),
        e.className && q.push(e.className);
      const Z = q.join(' ');
      if (o.isAnimated && y)
        L && (g.style = L), f != null && f.supportsCSS && (g.className = Z);
      else if (y) {
        let se;
        for (const Je of Z.split(' '))
          se || (se = { $$css: !0 }), (se[Je] = Je);
        g.style = se ? [...(Array.isArray(L) ? L : [L]), se] : [L];
      } else Z && (g.className = Z), L && (g.style = L);
    }
  }
  return En;
};
function Jo(e, t) {
  Object.entries(t)
    .sort(([n], [r]) => Zo(n, r))
    .forEach(([n, r]) => {
      Ur(e, n, r, !0);
    });
}
function pt(e, t, n, r, s = !1) {
  const { viewProps: o, styleProps: a, staticConfig: c, usedKeys: l } = e;
  if (!((l[t] || 0) > r))
    if (t in An)
      e.flatTransforms || (e.flatTransforms = {}),
        (l[t] = r),
        (e.flatTransforms[t] = n);
    else {
      const i = !s && !a.noNormalize ? xe(n, t) : n;
      c.accept && t in c.accept
        ? (o[t] = i)
        : (e.style || (e.style = {}),
          (l[t] = r),
          (e.style[t] = t === 'transform' && Array.isArray(i) ? [...i] : i));
    }
}
const vt = (e, t, n, r) => {
    var l;
    const { staticConfig: s, conf: o, styleProps: a } = e,
      c = {};
    for (let i in n) {
      const u = n[i];
      (i = o.shorthands[i] || i),
        !(!s.isHOC && i in _t && !a.noSkip) &&
          Yo(i, u, e, !1, (d, f) => {
            d in lr && (f = vt(e, d, f, r)),
              !r && d in An
                ? Ur(c, d, f)
                : (c[d] = a.noNormalize ? f : xe(f, i));
          });
    }
    if (!r) {
      if (Array.isArray(c.transform)) {
        const i = (l = e.style) == null ? void 0 : l.transform;
        i && (c.transform = [...i, ...c.transform]);
      }
      e.flatTransforms && Jo(c, e.flatTransforms);
    }
    return a.noNormalize || vn(c), c;
  },
  lc = re.useInsertionEffect || _e,
  uc = (e, t, n, r, s, o, a, c, l, i, u, d) => {
    const f = Qo(e, t, n, r, s, o, a, c, l, i, u, d);
    return (
      lc(() => {
        f && hi(f.rulesToInsert);
      }, [f == null ? void 0 : f.rulesToInsert]),
      f
    );
  };
function cn(e, t) {
  {
    const n = t[Nt];
    ko(n) && (Eo(n, t[jr]), (e[n] = t));
  }
}
function fc(e) {
  return Array.isArray(e) ? e.join(' ') : e;
}
const dc = qe.TAMAGUI_DEFAULT_COLOR || 'rgba(0,0,0,0)',
  hc = {
    ...Object.fromEntries(Object.entries(st.color).map(([e, t]) => [e, dc])),
    opacity: 1,
    scale: 1,
    rotate: '0deg',
    rotateY: '0deg',
    rotateX: '0deg',
    x: 0,
    y: 0,
    borderRadius: 0,
  },
  mc = (e) => `-${e.toLowerCase()}`,
  gc = (e) => e.replace(/[A-Z]/g, mc),
  Ur = (e, t, n, r = !1) => {
    typeof e.transform != 'string' &&
      (e.transform || (e.transform = []),
      e.transform[r ? 'unshift' : 'push']({ [pc[t] || t]: n }));
  },
  pc = { x: 'translateX', y: 'translateY' },
  Sc = {
    adjustable: 'slider',
    header: 'heading',
    image: 'img',
    link: 'link',
    none: 'presentation',
    summary: 'region',
  };
function Hs(e, t, n, r = !1) {
  if (r) {
    const s = { ...e[t], ...n };
    delete e[t], (e[t] = s);
  } else e[t] = n;
}
function bc(e, t, n, r, s, o, a) {
  e.usedKeys;
  let c = Io(t, n, e, s);
  if ((o && (c = (c || 0) + o), c === null)) return !1;
  if (n in ye) {
    const l = ye[n],
      i = l.stateKey || l.name;
    if (e.componentState[i] === !1) return !1;
    for (const u in r) pt(e, u, r[u], c);
  } else pt(e, n, r, c);
  return !0;
}
function Ks(e) {
  const t = {};
  for (const n in e) {
    const r = e[n];
    n in An ? Ur(t, n, r) : (t[n] = xe(r, n));
  }
  return (
    Array.isArray(t.transform) && (t.transform = Hr(t.transform)), vn(t), t
  );
}
function Jn(e, t) {
  const n = hc[e];
  n != null &&
    !(e in t.usedKeys) &&
    (!t.style || !(e in t.style)) &&
    pt(t, e, n, 1);
}
const yc = (e, t, n) => {
  const r = {};
  for (const s in e) Xs(r, e, t, s);
  if (t) for (const s in t) Xs(r, t, void 0, s);
  if (
    t &&
    Object.keys(t).length > 0 &&
    Object.keys(t).some(
      (s) => (s in ye || s === 'variant') && e && s in e && s in r
    )
  ) {
    const s = {};
    for (const o in t) (o in ye || o === 'variant') && o in r && (s[o] = r[o]);
    for (const o in r) o in s || (s[o] = r[o]);
    return s;
  }
  return r;
};
function Xs(e, t, n, r, s) {
  const a = t[r];
  if (r in ye || Vr.has(r)) {
    e[r] = { ...e[r], ...a };
    return;
  }
  (n && r in n) || (e[r] = a);
}
const Ce = {};
function xc(e) {
  Object.assign(Ce, e);
}
const wc = (e) => {
    var t;
    (t = Ce.setElementProps) == null || t.call(Ce, e);
  },
  Tc = (e) => {
    const { pseudoGroups: t, mediaGroups: n, groupContext: r } = e;
    if (t || n) {
      const s = new Set();
      if (t) for (const o of [...t]) s.add(Us(o, e));
      if (n) for (const o of [...n]) s.add(Us(o, e));
      return () => {
        s.forEach((o) => o());
      };
    }
  },
  Us = (
    e,
    { setStateShallow: t, pseudoGroups: n, mediaGroups: r, groupContext: s }
  ) => {
    const o = s == null ? void 0 : s[e];
    if (!o) return () => {};
    const a = o.subscribe(({ layout: c, pseudo: l }) => {
      t((i) => {
        var f;
        let u = !1;
        const d = ((f = i.group) == null ? void 0 : f[e]) || {
          pseudo: {},
          media: {},
        };
        if (l && n != null && n.has(e))
          d.pseudo || (d.pseudo = {}),
            Sr(d.pseudo, l) !== d.pseudo &&
              (Object.assign(d.pseudo, l), (u = !0));
        else if (c && r) {
          d.media || (d.media = {});
          const h = Pi(r, c),
            m = Sr(d.media, h);
          m !== d.media && (Object.assign(d.media, m), (u = !0));
        }
        return u ? { group: { ...i.group, [e]: d } } : i;
      });
    });
    return () => {
      a(), t({ group: {} });
    };
  },
  er = new Map();
let Rt, At;
const $c = {};
function Cc(e, t, n) {
  if (!(t != null && t.theme)) return $c;
  if (((Rt = n), (At = t), er.has(At.theme))) return er.get(At.theme);
  ze();
  function r(o) {
    Rt && (Rt.current || (Rt.current = new Set()), Rt.current.add(o));
  }
  const s = Object.fromEntries(
    Object.entries(t.theme).flatMap(([o, a]) => {
      const c = {
        ...a,
        get val() {
          return globalThis.tamaguiAvoidTracking || r(o), a.val;
        },
        get(l) {
          if (!At) return;
          const i = oi(a),
            { name: u, scheme: d, inverses: f } = At;
          return i;
        },
      };
      return [
        [o, c],
        [`$${o}`, c],
      ];
    })
  );
  return er.set(t.theme, s), s;
}
const ea = _.createContext(''),
  Rr = new Map(),
  ft = {},
  tr = new WeakMap(),
  nr = new WeakMap(),
  ln = new Map(),
  kt = new Map(),
  rr = new Map(),
  Rc = (e) => kt.get(e);
let sr = null;
const Ac = (e, t = !1, n) => {
    const { disable: r } = e,
      s = _.useContext(ea);
    if (!s && !t) throw new Error(Co);
    if (r)
      return (
        kt.get(s) || {
          id: '',
          name: 'light',
          theme: ze().themes.light,
          inverses: 0,
        }
      );
    const o = _.useId(),
      a = _.useCallback(
        (u) => (
          ft[s] || (ft[s] = new Set()),
          ft[s].add(o),
          Rr.set(o, () => {
            ln.set(o, !0), u();
          }),
          () => {
            Rr.delete(o),
              ft[s].delete(o),
              rr.delete(o),
              kt.delete(o),
              ln.delete(o);
          }
        ),
        [o, s]
      ),
      c = Ec(e),
      l = () => {
        var m, x;
        let u = rr.get(o);
        const d = e.passThrough
            ? !1
            : t || e.name === 'light' || e.name === 'dark' || e.name === null
              ? !0
              : tr.get(n)
                ? (m = n == null ? void 0 : n.current) != null && m.size
                  ? !0
                  : (x = e.needsUpdate) == null
                    ? void 0
                    : x.call(e)
                : !0,
          [f, h] = vc(u, e, c, t, o, s, d, ln.get(o));
        return (
          ln.delete(o),
          (!u || f) && ((u = { ...h }), rr.set(o, u)),
          Object.assign(u, h),
          (u.id = o),
          kt.set(o, h),
          u
        );
      },
      i = _.useSyncExternalStore(a, l, l);
    return (
      _e(() => {
        if (!tr.get(n)) {
          tr.set(n, !0);
          return;
        }
        if (!c) {
          nr.get(n) && Ys(o), nr.set(n, !1);
          return;
        }
        Ys(o), nr.set(n, !0);
      }, [n, c]),
      i
    );
  },
  vc = (e, t, n, r = !1, s, o, a, c) => {
    const { debug: l } = t,
      i = kt.get(o);
    if (t.passThrough) return [!1, e || i || { name: '' }];
    sr || (sr = ze().themes);
    const u =
        !n && (!e || !(e != null && e.isNew))
          ? null
          : _c(i == null ? void 0 : i.name, t, c === 'force' ? !0 : !!a),
      d = i && (!u || u === i.name),
      f = !!(
        a &&
        (c || (e == null ? void 0 : e.name) !== (i == null ? void 0 : i.name))
      );
    if (d) return [f, { ...i, isNew: !1 }];
    if (!u) {
      const S = e ?? i;
      if (!S) throw new Error(Co);
      return f ? [!0, { ...(i || e) }] : [!1, S];
    }
    const h = Pc(u),
      m = (i == null ? void 0 : i.inverses) ?? 0,
      x = i && h !== i.scheme,
      b = m + (x ? 1 : 0),
      p = {
        id: s,
        name: u,
        theme: sr[u],
        scheme: h,
        parentId: o,
        parentName: i == null ? void 0 : i.name,
        inverses: b,
        isInverse: x,
        isNew: !0,
      };
    return c !== 'force' && e && e.name === u
      ? [!1, p]
      : c !== 'force' && e && !a && p.name === e.name
        ? [!1, p]
        : [!0, p];
  };
function Ys(e) {
  const t = [e],
    n = new Set();
  for (; t.length; ) {
    const r = t.shift(),
      s = ft[r];
    if (s) for (const o of s) n.has(o) || (n.add(o), t.push(o));
  }
  n.forEach((r) => {
    var s;
    (s = Rr.get(r)) == null || s();
  });
}
const ta = { light: 'light', dark: 'dark' };
function Pc(e) {
  return ta[e.split('_')[0]];
}
function _c(
  e = '',
  { name: t, reset: n, componentName: r, inverse: s, debug: o },
  a = !1
) {
  if (t && n) throw new Error('❌004');
  const { themes: c } = ze();
  if (n) {
    if (e === 'light' || e === 'dark') return e === 'light' ? 'dark' : 'light';
    const h = e.lastIndexOf('_'),
      m = h <= 0 ? e : e.slice(h),
      x = e.slice(0, h);
    return c[m] ? m : x;
  }
  const l = e.split('_'),
    i = l[l.length - 1];
  i && i[0].toLowerCase() !== i[0] && l.pop();
  const u = [t && r ? `${t}_${r}` : void 0, t, r].filter(Boolean);
  let d = null;
  const f = l.length;
  for (let h = 0; h <= f; h++) {
    const m = (h === 0 ? l : l.slice(0, -h)).join('_');
    for (const x of u) {
      const b = m ? `${m}_${x}` : x;
      if (b in c) {
        d = b;
        break;
      }
    }
    if (d) break;
  }
  if (s) {
    d || (d = e);
    const h = d.split('_')[0];
    d = d.replace(new RegExp(`^${h}`), h === 'light' ? 'dark' : 'light');
  }
  return !a && d === e && !ta[d] ? null : d;
}
const Ec = ({
    name: e,
    reset: t,
    inverse: n,
    forceClassName: r,
    componentName: s,
  }) => `${e || ''}${n || ''}${t || ''}${r || ''}${s || ''}`,
  kc = (e) =>
    'inverse' in e || 'name' in e || 'reset' in e || 'forceClassName' in e,
  Nu = (e = {}) => {
    const [t] = Yr(e);
    return t;
  },
  Yr = (e, t = !1) => {
    const n = _.useRef(null),
      r = Ac(e, t, n);
    return [e.passThrough ? {} : Cc(e, r, n), r];
  },
  Tn = _.createContext(!1),
  Mc = ({ children: e, enabled: t }) => {
    const n = _.useContext(Tn);
    return j.jsx(Tn.Provider, { value: t ?? n, children: e });
  },
  Oc = () => _.useContext(Tn);
function Nc() {
  return _.useContext(Tn)
    ? !0
    : _.useSyncExternalStore(
        Fc,
        () => !0,
        () => !1
      );
}
const Fc = () => () => {},
  _n = _.forwardRef(function (e, t) {
    if (e.disable) return e.children;
    const { passThrough: n } = e,
      r = !!e._isRoot,
      [s, o] = Yr(e, r);
    let a = e['disable-child-theme']
      ? _.Children.map(e.children, (l) =>
          n ? l : _.cloneElement(l, { 'data-disable-theme': !0 })
        )
      : e.children;
    if (t)
      try {
        re.Children.only(a), (a = _.cloneElement(a, { ref: t }));
      } catch {}
    const c = _.useRef({ hasEverThemed: !1 });
    return na(o, a, e, r, c, n);
  });
_n.avoidForwardRef = !0;
function na(e, t, n, r = !1, s, o = !1) {
  const { shallow: a, forceClassName: c } = n,
    l = s.current;
  if (!(l.hasEverThemed || e.isNew || r || kc(n))) return t;
  t = j.jsx(ea.Provider, { value: e.id, children: t });
  const { isInverse: u, name: d } = e,
    f = u || c;
  if (
    (l.hasEverThemed || (l.hasEverThemed = !0),
    (f || e.name === 'dark' || e.name === 'light') &&
      (l.hasEverThemed = 'wrapped'),
    a && e.parentId)
  ) {
    const h = Rc(e.isNew ? e.id : e.parentId);
    if (!h) throw new Error('‼️010');
    t = _.Children.toArray(t).map((m) =>
      _.isValidElement(m)
        ? o
          ? m
          : _.cloneElement(
              m,
              void 0,
              j.jsx(_n, { name: h.name, children: m.props.children })
            )
        : m
    );
  }
  if (c === !1) return t;
  {
    const h = n.contain ? Wc : Ic,
      { className: m = '', color: x } = o ? {} : Lc(e, n, r);
    if (
      ((t = j.jsx('span', {
        className: `${m} is_Theme`,
        style: o ? h : { color: x, ...h },
        children: t,
      })),
      l.hasEverThemed === 'wrapped')
    ) {
      const b =
        !o && f
          ? `${u ? (d.startsWith('light') ? 't_light is_inversed' : d.startsWith('dark') ? 't_dark is_inversed' : '') : ''} `
          : '';
      t = j.jsx('span', { style: h, className: b, children: t });
    }
    return t;
  }
}
const Ic = { display: 'contents' },
  Wc = { display: 'contents', contain: 'strict' },
  jc = { className: '', color: void 0 };
function Lc(e, t, n = !1) {
  if (!e.isNew && !t.forceClassName) return jc;
  const r = e != null && e.theme && e.isNew ? mt(e.theme.color) : '',
    s = he('maxDarkLightNesting') || 3,
    o = e.inverses >= s ? e.name : e.name.replace(Bc, ''),
    a = `${n ? '' : 't_sub_theme'} t_${o}`;
  return { color: r, className: a };
}
const Bc = /^(dark|light)_/;
function Vc(e, t, n = !1) {
  const r = re.forwardRef(function (s, o) {
    const {
      themeInverse: a,
      theme: c,
      componentName: l,
      themeReset: i,
      ...u
    } = s;
    let d;
    const f = t == null ? void 0 : t.context;
    if (f)
      for (const p in f.props) {
        const y = s[p];
        y !== void 0 && (d || (d = {}), (d[p] = y));
      }
    const h = j.jsx(e, { ref: o, ...u, 'data-disable-theme': !0 });
    let m = null;
    const x = l || (t == null ? void 0 : t.componentName);
    if (
      (x && (m || (m = {}), (m.componentName = x)),
      'debug' in s && (m || (m = {}), (m.debug = s.debug)),
      'theme' in s && (m || (m = {}), (m.name = s.theme)),
      'themeInverse' in s && (m || (m = {}), (m.inverse = s.themeInverse)),
      'themeReset' in s && (m || (m = {}), (m.reset = i)),
      n && !m)
    )
      return h;
    let b = j.jsx(_n, { 'disable-child-theme': !0, ...m, children: h });
    if (f) {
      const p = f.Provider,
        y = re.useContext(f);
      b = j.jsx(p, { ...y, ...d, children: b });
    }
    return b;
  });
  return (
    (r.displayName = `Themed(${(e == null ? void 0 : e.displayName) || (e == null ? void 0 : e.name) || 'Anonymous'})`),
    r
  );
}
function zc(e) {
  if (bn && e.length)
    return j.jsx(j.Fragment, {
      children: e.map((t) => {
        const n = t[Nt];
        return j.jsx(
          'style',
          {
            href: `t_${n}`,
            precedence: 'default',
            children: t[jr].join(`
`),
          },
          n
        );
      }),
    });
}
const Dc = (e, t, n, r) => {
  var G;
  const s = Nc(),
    o = !Oc(),
    [a] = _.useState(o && !s),
    c = t == null ? void 0 : t.useAnimations,
    { isHOC: l } = n,
    i = _.useRef({}),
    u = !!((!l && 'animation' in e) || (e.style && Hc(e.style))),
    d = t == null ? void 0 : t.supportsCSS,
    f = i.current;
  !o && u && (f.hasAnimated = !0);
  const h = !!((u && !l && c) || f.hasAnimated),
    m = !Wr && h;
  m && !f.hasAnimated && (f.hasAnimated = !0);
  const { disableClassName: x } = e,
    b =
      (!l &&
        m &&
        e.animatePresence !== !1 &&
        ((G = t == null ? void 0 : t.usePresence) == null
          ? void 0
          : G.call(t))) ||
      null,
    p = b == null ? void 0 : b[2],
    y = (p == null ? void 0 : p.isPresent) === !1,
    S = (p == null ? void 0 : p.isPresent) === !0 && p.initial !== !1,
    v = !!e.enterStyle,
    P = u && !s && ((t == null ? void 0 : t.isReactNative) || !d),
    E = !l && (v || S || P || x) ? (v || S ? Oi : Dr) : xr,
    g = Kc(e);
  g != null && (E.disabled = g);
  const B = _.useState(E),
    C = e.forceStyle ? { ...B[0], [e.forceStyle]: !0 } : B[0],
    N = B[1];
  let A = m;
  P && !n.isHOC && !s && ((A = !1), (f.willHydrate = !0)),
    g !== C.disabled &&
      (g && Object.assign(C, xr), (C.disabled = g), N((X) => ({ ...C })));
  const F = e.group,
    Y = ki(N, e.debug);
  if (p && A && s && n.variants) {
    const {
      enterVariant: X,
      exitVariant: ue,
      enterExitVariant: pe,
      custom: Qe,
    } = p;
    Pn(Qe) && Object.assign(e, Qe);
    const T = ue ?? pe,
      ve = X ?? pe;
    C.unmounted && ve && n.variants[ve]
      ? (e[ve] = !0)
      : y && T && (e[T] = ue !== pe);
  }
  let W = !!e.forceStyle;
  if (!s) W = !1;
  else if (s) {
    const X = A && s,
      ue = !n.acceptsClassName && (r.disableSSR || !C.unmounted),
      pe = x && !C.unmounted;
    (X || pe || ue) && (W = !0);
  }
  return {
    startedUnhydrated: a,
    curStateRef: f,
    disabled: g,
    groupName: F,
    hasAnimationProp: u,
    hasEnterStyle: v,
    isAnimated: A,
    isExiting: y,
    isHydrated: s,
    presence: b,
    presenceState: p,
    setState: N,
    setStateShallow: Y,
    noClass: W,
    state: C,
    stateRef: i,
    supportsCSS: d,
    willBeAnimated: m,
    willBeAnimatedClient: h,
  };
};
function Hc(e) {
  return Object.keys(e).some((t) => {
    const n = e[t];
    return n && typeof n == 'object' && '_animation' in n;
  });
}
const Kc = (e) => {
    var t;
    return (
      e.disabled ||
      e.passThrough ||
      ((t = e.accessibilityState) == null ? void 0 : t.disabled) ||
      e['aria-disabled'] ||
      e.accessibilityDisabled ||
      !1
    );
  },
  Xc = _.version.startsWith('19.'),
  Uc = _.memo(
    _.forwardRef(function (e, t) {
      const { children: n, ...r } = e;
      if (_.isValidElement(n)) {
        const s = Yc(n, r);
        return _.cloneElement(
          n,
          n.type.avoidForwardRef
            ? s
            : { ...s, ref: zr(t, Xc ? n.props.ref : n.ref) }
        );
      }
      return _.Children.count(n) > 1 ? _.Children.only(null) : null;
    })
  ),
  un = {
    onPress: 'onClick',
    onPressOut: 'onMouseUp',
    onPressIn: 'onMouseDown',
  };
function Yc(e, t) {
  const n = e.props,
    r = { ...n },
    s = typeof e.type == 'string';
  if (s) for (const o in un) o in t && ((t[un[o]] = t[o]), delete t[o]);
  for (let o in n) {
    const a = t[o],
      c = n[o];
    s && o in un && ((o = un[o]), delete r[o]),
      Gc.test(o)
        ? (r[o] = po(c, a))
        : o === 'style'
          ? (r[o] = { ...a, ...c })
          : o === 'className' && (r[o] = [a, c].filter(Boolean).join(' '));
  }
  return { ...t, ...r };
}
const Gc = /^on[A-Z]/;
var Gs = {};
const $n = new Set(),
  qc = new Set([
    'hover',
    'press',
    'pressIn',
    'group',
    'focus',
    'focusWithin',
    'media',
    'group',
  ]);
if (typeof window < 'u') {
  const e = () => {
    $n.forEach((t) =>
      t((n) => (n.press || n.pressIn ? { ...n, press: !1, pressIn: !1 } : n))
    ),
      $n.clear();
  };
  addEventListener('mouseup', e),
    addEventListener('touchend', e),
    addEventListener('touchcancel', e);
}
const rt = { value: !1 };
typeof document < 'u' &&
  (document.addEventListener('keydown', () => {
    rt.value || (rt.value = !0);
  }),
  document.addEventListener('mousedown', () => {
    rt.value && (rt.value = !1);
  }),
  document.addEventListener('mousemove', () => {
    rt.value && (rt.value = !1);
  }));
function Dt(e) {
  const { componentName: t } = e;
  let n = null,
    r = e.defaultProps;
  ri((m) => {
    var x;
    if (((n = m), t)) {
      const b = (x = m.defaultProps) == null ? void 0 : x[t];
      b && (r = { ...b, ...r });
    }
  });
  const { Component: s, isText: o, isZStack: a, isHOC: c } = e,
    l = re.forwardRef((m, x) => {
      var is, cs, ls, us, fs, ds;
      let b, p, y;
      const { context: S, isReactNative: v } = e;
      if (S && ((y = re.useContext(S)), y))
        for (const R in S.props) {
          const I = Ni(m, R);
          if (I === void 0) {
            const K = y == null ? void 0 : y[R];
            K !== void 0 && (b || (b = {}), (b[R] = K));
          }
          const te = I ?? (r == null ? void 0 : r[R]);
          te !== void 0 && (p || (p = {}), (p[R] = te));
        }
      const P = m.debug,
        E = b ? { ...r, ...b } : r;
      let g = m;
      E && (g = yc(E, m));
      const B = g.componentName || e.componentName,
        C = re.useContext(yr),
        N = re.useContext(vs),
        A = C.animationDriver,
        F = A == null ? void 0 : A.useAnimations,
        Y = Dc(g, A, e, n),
        {
          disabled: W,
          groupName: G,
          hasAnimationProp: X,
          hasEnterStyle: ue,
          isAnimated: pe,
          isExiting: Qe,
          isHydrated: T,
          presence: ve,
          presenceState: at,
          setState: it,
          noClass: De,
          state: me,
          stateRef: M,
          supportsCSS: He,
          willBeAnimated: Ee,
          willBeAnimatedClient: En,
          startedUnhydrated: bt,
        } = Y;
      X &&
        A != null &&
        A.avoidReRenders &&
        _e(() => {
          const R = M.current.nextState;
          R && ((M.current.nextState = void 0), Y.setStateShallow(R));
        });
      const we = _.useMemo(() => {
        var I, te;
        if (!G || g.passThrough) return N;
        const R = new Set();
        return (
          (te = (I = M.current.group) == null ? void 0 : I.listeners) == null ||
            te.clear(),
          (M.current.group = {
            listeners: R,
            emit(K) {
              R.forEach((ne) => ne(K));
            },
            subscribe(K) {
              return (
                R.add(K),
                R.size === 1 && ce({ hasDynGroupChildren: !0 }),
                () => {
                  R.delete(K), R.size === 0 && ce({ hasDynGroupChildren: !1 });
                }
              );
            },
          }),
          {
            ...N,
            [G]: {
              state: { pseudo: xr },
              subscribe: (K) => {
                var je;
                const ne =
                  (je = M.current.group) == null ? void 0 : je.subscribe(K);
                return () => {
                  ne == null || ne();
                };
              },
            },
          }
        );
      }, [M, G, N]);
      let ce = Y.setStateShallow;
      const Ht = !!(o && C.inText),
        yt = !s || typeof s == 'string',
        L = g.tag,
        w = (yt && L) || s,
        k = w || 'span',
        le = w || (Ht ? 'span' : 'div');
      let V = o ? k : le;
      A && pe && !A.needsWebStyles && (V = A[o ? 'Text' : 'View'] || V);
      const ke = g['data-disable-theme'] || c;
      g.themeShallow && (M.current.themeShallow = !0);
      const q = {
        componentName: B,
        disable: ke,
        shallow: M.current.themeShallow,
        debug: P,
      };
      'themeInverse' in g && (q.inverse = g.themeInverse),
        'theme' in g && (q.name = g.theme),
        typeof M.current.isListeningToTheme == 'boolean' &&
          (q.needsUpdate = () => !!M.current.isListeningToTheme);
      const [Z, se] = Yr(q);
      V = s || V;
      const Je = Ai(C);
      Br(!1);
      const kn =
          (pe && !He) || (c && me.unmounted == !1 && X) ? 'value' : 'auto',
        ct = {
          mediaState: Je,
          noClass: De,
          resolveValues: kn,
          isExiting: Qe,
          isAnimated: pe,
          willBeAnimated: Ee,
          styledContextProps: b,
        },
        Kt = (se == null ? void 0 : se.name) || '',
        z = uc(g, e, Z, Kt, me, ct, null, C, we, V, bt, P),
        Ie = !z,
        $ = (G && (we == null ? void 0 : we[G])) || null;
      if (!Ie && $ && g.containerType !== 'normal') {
        const R = $ == null ? void 0 : $.state;
        R &&
          R.layout === void 0 &&
          (((is = z.style) != null && is.width) ||
            ((cs = z.style) != null && cs.height)) &&
          (R.layout = { width: Zs(z.style.width), height: Zs(z.style.height) });
      }
      if (!Ie && (X || G) && A != null && A.avoidReRenders) {
        let R = function () {
          const te = M.current.nextState;
          if ($) {
            const {
              group: K,
              hasDynGroupChildren: ne,
              unmounted: je,
              animation: hs,
              ...en
            } = te;
            i($, M.current.group || null, en);
          }
        };
        const I = ce;
        (M.current.updateStyleListener = () => {
          const te = M.current.nextState || me,
            K = M.current.nextMedia,
            ne = Qo(
              g,
              e,
              Z,
              Kt,
              te,
              K ? { ...ct, mediaState: K } : ct,
              null,
              C,
              we,
              V,
              bt,
              P
            ),
            je = M.current.useStyleListener;
          je == null || je((ne == null ? void 0 : ne.style) || {});
        }),
          C.mediaEmit ||
            (C.mediaEmit = (te) => {
              var K, ne;
              (M.current.nextMedia = te),
                (ne = (K = M.current).updateStyleListener) == null ||
                  ne.call(K);
            }),
          (M.current.setStateShallow = (te) => {
            var en, ms;
            const K = M.current.nextState || me,
              ne = typeof te == 'function' ? te(K) : te;
            if (ne === K || wn(K, ne)) return;
            const je = Object.keys(ne).every((Oa) => qc.has(Oa)),
              hs = { ...K, ...ne };
            (M.current.nextState = hs),
              je
                ? (R(),
                  (ms = (en = M.current).updateStyleListener) == null ||
                    ms.call(en))
                : I(ne);
          }),
          (ce = (te) => {
            var K, ne;
            (ne = (K = M.current).setStateShallow) == null || ne.call(K, te);
          });
      }
      z &&
        (g.group &&
          g.untilMeasured === 'hide' &&
          !M.current.hasMeasured &&
          (z.style || (z.style = {}), (z.style.opacity = 0)),
        z.dynamicThemeAccess != null &&
          (M.current.isListeningToTheme = z.dynamicThemeAccess));
      const Q = (z == null ? void 0 : z.hasMedia) && z.hasMedia !== !0,
        lt = ai() || Q || (De && (z == null ? void 0 : z.hasMedia) === !0),
        Xt = Q ? z.hasMedia : null;
      Ci(C, lt, Xt);
      const {
          viewProps: Ut,
          pseudos: J,
          style: Yt,
          classNames: Ke,
          space: ee,
          pseudoGroups: Me,
          mediaGroups: Se,
        } = z || {},
        Oe = g,
        {
          asChild: H,
          children: U,
          themeShallow: ge,
          spaceDirection: D,
          onPress: oe,
          onLongPress: de,
          onPressIn: Pe,
          onPressOut: Te,
          onHoverIn: Xe,
          onHoverOut: $e,
          onMouseUp: We,
          onMouseDown: Ue,
          onMouseEnter: et,
          onMouseLeave: xt,
          onFocus: Gt,
          onBlur: qt,
          separator: Pa,
          passThrough: Zr,
          forceStyle: Ru,
          onClick: Zt,
          theme: Qr,
          ...wt
        } = Ut || {};
      let ie = wt;
      !yt && g.forceStyle && (ie.forceStyle = g.forceStyle),
        c &&
          (typeof Qr < 'u' && (ie.theme = Qr),
          typeof Zr < 'u' && (ie.passThrough = Zr)),
        L && V.acceptTagProp && (ie.tag = L);
      let Jr;
      const _a = (He ? En : Ee) && F && !c;
      let es;
      if (_a) {
        const R =
            A != null && A.avoidReRenders
              ? (te) => {
                  M.current.useStyleListener = te;
                }
              : void 0,
          I = F({
            props: Oe,
            style: Yt || {},
            styleState: z,
            useStyleEmitter: R,
            presence: ve,
            componentState: me,
            styleProps: ct,
            theme: Z,
            pseudos: J || null,
            staticConfig: e,
            stateRef: M,
          });
        I &&
          (I.ref && (es = I.ref),
          T &&
            I &&
            ((Jr = I.style),
            (ie.style = Jr),
            I.className &&
              (ie.className = `${me.unmounted === 'should-enter' ? 't_unmounted ' : ''}${ie.className || ''} ${I.className}`)));
      }
      !Ie &&
        $ &&
        g.containerType !== 'normal' &&
        (wt.onLayout = po(wt.onLayout, (R) => {
          var te;
          const I = R.nativeEvent.layout;
          ($.state.layout = I),
            (te = M.current.group) == null || te.emit({ layout: I }),
            !M.current.hasMeasured &&
              g.untilMeasured === 'hide' &&
              it((K) => ({ ...K })),
            (M.current.hasMeasured = !0);
        })),
        (ie =
          ((ls = Ce.usePropsTransform) == null
            ? void 0
            : ls.call(Ce, V, wt, M, M.current.willHydrate)) || wt),
        M.current.composedRef ||
          (M.current.composedRef = zr((R) => (M.current.host = R), x, wc, es)),
        (ie.ref = M.current.composedRef);
      const ts = () => {
        ce({ press: !1, pressIn: !1 });
      };
      _e(() => {
        if (me.unmounted === !0 && ue) {
          ce({ unmounted: 'should-enter' });
          return;
        }
        let R;
        if (me.unmounted) {
          if ((A != null && A.supportsCSS) || Da)
            return (
              (R = setTimeout(() => {
                ce({ unmounted: !1 });
              })),
              () => clearTimeout(R)
            );
          ce({ unmounted: !1 });
          return;
        }
        return () => {
          $n.delete(it);
        };
      }, [me.unmounted, W]),
        _e(() => {
          if (!W && !(!Me && !Se) && we)
            return Tc({
              groupContext: we,
              setStateShallow: ce,
              mediaGroups: Se,
              pseudoGroups: Me,
            });
        }, [we, W, Me ? br(Me) : 0, Se ? br(Se) : 0]);
      const Mn = M.current.group;
      _e(() => {
        !$ || !Mn || i($, Mn, me);
      }, [$, Mn, me]);
      const Qt = !W && De && (J == null ? void 0 : J.pressStyle),
        ns = !W && De && (J == null ? void 0 : J.focusStyle),
        Ea = !W && De && (J == null ? void 0 : J.focusVisibleStyle),
        rs = !!(Qt || ns || Ea || Gt || qt || C.setParentFocusState),
        Jt = !!(G && me.hasDynGroupChildren),
        Tt = !!(
          Jt ||
          Qt ||
          oe ||
          Te ||
          Pe ||
          Ue ||
          We ||
          de ||
          Zt ||
          (J != null && J.focusVisibleStyle)
        ),
        ss = !W && De && (J == null ? void 0 : J.hoverStyle),
        On = !!(Jt || ss),
        os = !!(Jt || On || et || xt),
        ka = !W && !g.asChild && !!(rs || Tt || os || Qt || ss || ns),
        Nn = !!(Jt || Qt),
        $t = ka
          ? {
              onPressOut: Tt
                ? (R) => {
                    ts(), Te == null || Te(R), We == null || We(R);
                  }
                : void 0,
              ...((os || Tt) && {
                onMouseEnter: (R) => {
                  const I = {};
                  On && (I.hover = !0),
                    Nn && me.pressIn && (I.press = !0),
                    ce(I),
                    Xe == null || Xe(R),
                    et == null || et(R);
                },
                onMouseLeave: (R) => {
                  const I = {};
                  On && (I.hover = !1),
                    Nn && ((I.press = !1), (I.pressIn = !1)),
                    ce(I),
                    $e == null || $e(R),
                    xt == null || xt(R);
                },
              }),
              onPressIn: Tt
                ? (R) => {
                    Nn && ce({ press: !0, pressIn: !0 }),
                      Pe == null || Pe(R),
                      Ue == null || Ue(R),
                      $n.add(it);
                  }
                : void 0,
              onPress: Tt
                ? (R) => {
                    ts(),
                      Zt == null || Zt(R),
                      oe == null || oe(R),
                      de == null || de(R);
                  }
                : void 0,
              ...(rs && {
                onFocus: (R) => {
                  const I = {};
                  C.setParentFocusState && (I.focusWithin = !0),
                    J != null && J.focusVisibleStyle && rt.value
                      ? (I.focusVisible = !0)
                      : (I.focus = !0),
                    ce(I),
                    Gt == null || Gt(R);
                },
                onBlur: (R) => {
                  C.setParentFocusState &&
                    C.setParentFocusState({ focusWithin: !1 }),
                    ce({ focus: !1, focusVisible: !1, focusWithin: !1 }),
                    qt == null || qt(R);
                },
              }),
            }
          : null;
      $t && !v && Object.assign(ie, or($t)),
        (us = Ce.useEvents) == null || us.call(Ce, ie, $t, z, ce, e);
      const Ma = g.spaceDirection || 'both';
      let ae =
        !U || H || !z
          ? U
          : Jc({
              separator: Pa,
              children: U,
              space: ee,
              direction: Ma,
              isZStack: a,
            });
      if (H) {
        V = Uc;
        {
          const R = or(
            {
              onPress: oe,
              onPressIn: Pe,
              onPressOut: Te,
              onMouseEnter: et,
              onMouseLeave: xt,
            },
            H === 'web' || H === 'except-style-web'
          );
          Object.assign(ie, R);
        }
      }
      Ie &&
        ((ae = m.children),
        (V = le),
        (ie = { style: { display: 'contents' } }));
      let Fn;
      Ce.useChildren && (Fn = Ce.useChildren(V, ae, ie)),
        Fn ? (ae = Fn) : (ae = re.createElement(V, ie, ae));
      const In =
          (fs = n == null ? void 0 : n.animations) == null
            ? void 0
            : fs.ResetPresence,
        Wn = !!(!H && z && !c && In && Ee && (ue || at)),
        as = M.current.hasEverResetPresence;
      if (
        (Wn && !as && (M.current.hasEverResetPresence = !0),
        (Wn || as) && In && (ae = j.jsx(In, { disabled: !Wn, children: ae })),
        'focusWithinStyle' in m &&
          (ae = j.jsx(yr.Provider, {
            ...C,
            setParentFocusState: ce,
            children: ae,
          })),
        'group' in g && (ae = j.jsx(vs.Provider, { value: we, children: ae })),
        (ae = ke || !z ? ae : na(se, ae, q, !1, M)),
        v &&
          !H &&
          (ae = j.jsx('span', {
            className: '_dsp_contents',
            ...(!Ie && T && $t && or($t)),
            children: ae,
          })),
        e.context)
      ) {
        const R = e.context.props;
        for (const I in R)
          ((ie.style && I in ie.style) || I in ie) &&
            (p || (p = {}),
            (p[I] = ((ds = ie.style) == null ? void 0 : ds[I]) ?? ie[I]));
      }
      if (p) {
        const R = e.context.Provider;
        ae = j.jsx(R, { ...y, ...p, children: ae });
      }
      if (bt) {
        const R = _.useMemo(() => {
          if (!Ie) return zc(Object.values(z.rulesToInsert));
        }, []);
        ae = j.jsxs(j.Fragment, { children: [ae, R] });
      }
      return ae;
    });
  function i(m, x, b) {
    if (!m || !x) return;
    const p = { ...m.state, pseudo: b };
    x.emit(p), (m.state = p);
  }
  e.componentName && (l.displayName = e.componentName);
  let u = l;
  (Gs.TAMAGUI_FORCE_MEMO || e.memo) && (u = re.memo(u)), (u.staticConfig = e);
  function d(m) {
    return { ...e, ...m, neverFlatten: !0, isHOC: !0, isStyledHOC: !1 };
  }
  function f(m, x) {
    return (m.staticConfig = d(x)), (m.styleable = h), m;
  }
  function h(m, x) {
    var y;
    let b =
      (bn && typeof m == 'function' && m.length === 1) ||
      ((y = m.render) == null ? void 0 : y.length) === 2
        ? m
        : re.forwardRef(m);
    const p = d(x == null ? void 0 : x.staticConfig);
    return (
      (b = x != null && x.disableTheme ? b : Vc(b, p, !0)),
      (p.memo || Gs.TAMAGUI_MEMOIZE_STYLEABLE) && (b = re.memo(b)),
      (b.staticConfig = p),
      (b.styleable = h),
      b
    );
  }
  return (u.extractable = f), (u.styleable = h), u;
}
function or(e, t = !0) {
  return {
    onMouseEnter: e.onMouseEnter,
    onMouseLeave: e.onMouseLeave,
    [t ? 'onClick' : 'onPress']: e.onPress,
    onMouseDown: e.onPressIn,
    onMouseUp: e.onPressOut,
    onTouchStart: e.onPressIn,
    onTouchEnd: e.onPressOut,
    onFocus: e.onFocus,
    onBlur: e.onBlur,
  };
}
const Zc = (e, { tokens: t }) => {
    e = e === !1 ? 0 : e === !0 ? '$true' : e;
    const n = t.space[e] ?? e;
    return { width: n, height: n, minWidth: n, minHeight: n };
  },
  Qc = Dt({
    acceptsClassName: !0,
    memo: !0,
    componentName: 'Spacer',
    validStyles: Vt,
    defaultProps: { ...zt, tag: 'span', size: !0, pointerEvents: 'none' },
    variants: {
      size: { '...': Zc },
      flex: { true: { flexGrow: 1 } },
      direction: {
        horizontal: { height: 0, minHeight: 0 },
        vertical: { width: 0, minWidth: 0 },
        both: {},
      },
    },
  });
function Jc(e) {
  var h, m, x;
  const {
      isZStack: t,
      children: n,
      space: r,
      direction: s,
      spaceFlex: o,
      separator: a,
      ensureKeys: c,
    } = e,
    l = !!(r || o),
    i = a != null,
    u = Array.isArray(n);
  if (!c && !(l || i || t)) return n;
  const d = u ? n : re.Children.toArray(n);
  if (
    d.length <= 1 &&
    !t &&
    !(
      (m = (h = d[0]) == null ? void 0 : h.type) != null && m.shouldForwardSpace
    )
  )
    return n;
  const f = [];
  for (let [b, p] of d.entries()) {
    const y = p == null || (Array.isArray(p) && p.length === 0);
    if (
      (!y &&
        re.isValidElement(p) &&
        (x = p.type) != null &&
        x.shouldForwardSpace &&
        (p = re.cloneElement(p, {
          space: r,
          spaceFlex: o,
          separator: a,
          key: p.key,
        })),
      y || !p || (p.key && !t)
        ? f.push(p)
        : f.push(
            j.jsx(
              re.Fragment,
              { children: t ? j.jsx(el, { children: p }) : p },
              `${b}0t`
            )
          ),
      (qs(p) && b === 0) || t)
    )
      continue;
    const S = d[b + 1];
    S &&
      !y &&
      !qs(S) &&
      (a
        ? (l &&
            f.push(
              ar({ key: `_${b}_00t`, direction: s, space: r, spaceFlex: o })
            ),
          f.push(j.jsx(re.Fragment, { children: a }, `${b}03t`)),
          l &&
            f.push(
              ar({ key: `_${b}01t`, direction: s, space: r, spaceFlex: o })
            ))
        : f.push(
            ar({ key: `_${b}02t`, direction: s, space: r, spaceFlex: o })
          ));
  }
  return f;
}
function ar({ key: e, direction: t, space: n, spaceFlex: r }) {
  return j.jsx(
    Qc,
    {
      size: n,
      direction: t,
      ...(typeof r < 'u' && { flex: r === !0 ? 1 : r === !1 ? 0 : r }),
    },
    e
  );
}
function qs(e) {
  const t = e == null ? void 0 : e.type;
  return (
    (t == null ? void 0 : t.isVisuallyHidden) ||
    (t == null ? void 0 : t.isUnspaced)
  );
}
const el = Dt({
    defaultProps: {
      ...zt,
      flexDirection: 'column',
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      pointerEvents: 'box-none',
    },
  }),
  Zs = (e) =>
    typeof e == 'number' ? e : typeof e == 'string' ? +e.replace('px', '') : 0,
  Qs = new WeakMap(),
  Ar = (e, t = '', n = !1) => {
    if (Qs.has(e)) return e;
    const r = {};
    for (let s in e) {
      const o = e[s],
        a = s[0] === '$',
        c = a ? s : `$${s}`,
        l = a ? c.slice(1) : s;
      if (Ae(o)) {
        r[l] = o;
        continue;
      }
      const i = Bt(l, 1e3),
        u = t && t !== 't-color' ? `${t}-${i}` : `c-${i}`;
      if (o && typeof o == 'object' && 'needsPx' in o && 'val' in o) {
        const f = Ft({ val: o.val, name: u, key: c });
        (f.needsPx = o.needsPx), (r[l] = f);
        continue;
      }
      if (o && typeof o == 'object') {
        r[l] = Ar(e[l], u, !1);
        continue;
      }
      const d = Ae(o) ? o : Ft({ val: o, name: u, key: c });
      r[l] = d;
    }
    return Qs.set(r, !0), r;
  };
var tl = {};
const vr = (e) => {
    _r.set(xn(e), e);
  },
  Pr = (e, t = !1) =>
    `--${tl.TAMAGUI_CSS_VARIABLE_PREFIX || ''}${vo(e.name, !1)}:${!t && typeof e.val == 'number' ? `${e.val}px` : e.val}`,
  _r = new Map();
var fn = {};
const nl = ['dark', 'light'],
  rl = ['light', 'dark'];
function sl(e) {
  const t = [];
  if (
    !fn.TAMAGUI_DOES_SSR_CSS ||
    fn.TAMAGUI_DOES_SSR_CSS === 'mutates-themes' ||
    fn.TAMAGUI_DOES_SSR_CSS === 'false'
  ) {
    const { config: n, themeName: r, theme: s, names: o } = e,
      a =
        e.hasDarkLight ??
        (n.themes && ('light' in n.themes || 'dark' in n.themes)),
      c = `.${To}`;
    let l = '';
    for (const b in s) {
      const p = s[b];
      let y = null;
      _r.has(p.val) ? (y = _r.get(p.val).variable) : (y = p.val),
        (l += `--${fn.TAMAGUI_CSS_VARIABLE_PREFIX || ''}${Bt(b, 40)}:${y};`);
    }
    const i = r === 'dark',
      u = r === 'light',
      d = o.map((b) => `${c}${b}`),
      f = new Set(i || u ? d : []);
    if (a) {
      const b = he('maxDarkLightNesting') ?? 3;
      for (const p of o) {
        const y = i || p.startsWith('dark_'),
          S = !y && (u || p.startsWith('light_'));
        if (!(y || S)) {
          f.add(`${c}${p}`);
          continue;
        }
        const v = `${c}${p.replace(/^(dark|light)_/, '')}`,
          P = y ? nl : rl,
          [E, g] = P,
          B = Math.round(b * 1.5);
        for (let C = 0; C < B; C++) {
          const N = C % 2 === 1;
          if (N && C < 3) continue;
          const A = new Array(C + 1)
            .fill(0)
            .map((X, ue) => `${c}${ue % 2 === 0 ? E : g}`);
          let F = A.length > 1 ? A.slice(1) : A;
          if (N) {
            const [X, ue, ...pe] = F;
            F = [ue, ...pe, ue];
          }
          const Y = F[F.length - 1],
            W = v === Y ? '' : v,
            G = F.join(' ');
          f.add(`${G} ${W}`);
        }
      }
    }
    const h = [...f].sort(Zo),
      m = `${h.map((b) => `:root${ol(b) && he('themeClassNameOnRoot') ? '' : ' '}${b}`).join(', ') + ', .tm_xxt'} {${l}}`;
    if ((t.push(m), he('shouldAddPrefersColorThemes'))) {
      const b = s.background ? `background:${mt(s.background)};` : '',
        p = s.color ? `color:${mt(s.color)}` : '',
        y = `body{${b}${p}}`,
        S = r.startsWith('dark'),
        v = S ? 'dark' : 'light',
        P = `${h
          .map((g) => {
            if (g == Er || g === kr) return ':root';
            if (!((S && g.startsWith(kr)) || (!S && g.startsWith(Er))))
              return g.replace(/^\.t_(dark|light) /, '').trim();
          })
          .filter(Boolean)
          .join(', ')} {${l}}`,
        E = `@media(prefers-color-scheme:${v}){
    ${y}
    ${P}
  }`;
      t.push(E);
    }
    const x = he('selectionStyles');
    if (x) {
      const b = x(s);
      if (b) {
        const p = d.map((S) => `${S} ::selection`).join(', '),
          y = Object.entries(b)
            .flatMap(([S, v]) =>
              v ? `${S === 'backgroundColor' ? 'background' : S}:${mt(v)}` : []
            )
            .join(';');
        if (y) {
          const S = `${p}{${y}}`;
          t.push(S);
        }
      }
    }
  }
  return t;
}
const Er = '.t_dark',
  kr = '.t_light',
  ol = (e) =>
    e === Er ||
    e === kr ||
    e.startsWith('.t_dark ') ||
    e.startsWith('.t_light '),
  ra = {};
function al(e) {
  for (const { names: n, theme: r } of e) for (const s of n) ra[s] = r;
  const t = {};
  for (const { names: n, theme: r } of e)
    for (const s of n) {
      const o = il(s, r);
      t[s] = o;
    }
  return t;
}
function il(e, t) {
  const n = {},
    r = [],
    s = e
      .split('_')
      .slice(0, -1)
      .map((o) => (r.push(o), r.join('_')));
  for (const o of s) Object.assign(n, ra[o]);
  return Object.assign(n, t), n;
}
function cl(e, t) {
  const n = e[t];
  Ae(n)
    ? n.name !== t && (e[t] = Ft({ key: n.name, name: t, val: n.val }))
    : (e[t] = Ft({ key: t, name: t, val: n }));
}
function ll(e) {
  var n;
  const t = {};
  for (const r in e) {
    const s = e[r];
    if (r === 'family' || r === 'face') t[r] = s;
    else {
      t[r] = {};
      for (const o in s) {
        let a = s[o];
        ((n = a.val) == null ? void 0 : n[0]) === '$' && (a = a.val),
          (t[r][`$${o}`] = a);
      }
    }
  }
  return t;
}
function ul(e) {
  const t = [];
  for (const n in e)
    if (n !== 'face') {
      if (n === 'family') {
        const r = e[n];
        vr(r), t.push(Pr(r));
      } else
        for (const r in e[n])
          if (typeof e[n][r] != 'string') {
            const s = e[n][r];
            vr(s), t.push(Pr(s));
          }
    }
  return t;
}
function fl(e) {
  return new Set(['size', 'space', 'radius']).has(e);
}
function dl(e) {
  var p;
  const t = {},
    n = Ar(e.tokens || {});
  if (e.tokens) {
    const y = {};
    for (const S in n) {
      (t[S] = {}), (y[S] = {});
      const v = n[S];
      for (const P in v) {
        const E = v[P],
          g = `$${P}`;
        (t[S][g] = E), (y[S][g] = E), (y[S][P] = E);
      }
    }
    ei(y);
  }
  let r;
  if (e.themes) {
    const y = Object.keys(e.themes).length === 0;
    y && (r = ii(y, t));
  }
  let s = null,
    o;
  if (e.fonts) {
    const y = Object.fromEntries(
      Object.entries(e.fonts).map(([S, v]) => [S, Ar(v, 'f', !0)])
    );
    o = (() => {
      const S = {};
      for (const v in y) {
        const P = y[v],
          E = ll(P);
        (S[`$${v}`] = E), !s && E.size && (s = new Set(Object.keys(E.size)));
      }
      return S;
    })();
  }
  const a = {},
    c = (() => {
      const y = [],
        S = [],
        v = {};
      for (const g in n)
        for (const B in n[g]) {
          const C = n[g][B];
          a[`$${g}.${B}`] = C;
          {
            vr(C);
            const N = C.needsPx === !0,
              A = fl(g),
              F = !(N || A);
            S.push(Pr(C, F));
          }
        }
      {
        let g = function (C, N = '') {
          return `:root${N} {${B}${[...C].join(`;${B}`)}${B}}`;
        };
        for (const C in o) {
          const N = o[C],
            [A, F] = C.includes('_') ? C.split('_') : [C],
            Y = ul(N);
          v[C] = { name: A.slice(1), declarations: Y, language: F };
        }
        const B = e.cssStyleSeparator || '';
        if ((y.push(g(S)), v))
          for (const C in v) {
            const { name: N, declarations: A, language: F = 'default' } = v[C],
              Y = `.font_${N}`,
              W = `:root .t_lang-${N}-${F} ${Y}`,
              G = F === 'default' ? ` ${Y}, ${W}` : W,
              X = g(A, G);
            y.push(X);
          }
      }
      const P = e.themes,
        E = r ?? hl(P, n.color);
      return {
        themes: al(E),
        cssRuleSets: y,
        getThemeRulesSets() {
          let g = [];
          for (const { names: B, theme: C } of E) {
            const N = sl({ config: e, themeName: B[0], names: B, theme: C });
            g = [...g, ...N];
          }
          return g;
        },
      };
    })(),
    l = e.shorthands || {};
  let i = -1;
  const u = (y = {}) => {
      {
        const {
          separator: S = `
`,
          sinceLastCall: v,
          exclude: P,
        } = y;
        if (v && i >= 0) {
          const g = ys();
          return (i = g.length), g.slice(i).join(S);
        }
        i = 0;
        const E = ys().join(S);
        return P === 'design-system'
          ? E
          : `${`._ovs-contain {overscroll-behavior:contain;}
  .is_Text .is_Text {display:inline-flex;}
  ._dsp_contents {display:contents;}
  ._no_backdrop::backdrop {display: none;}
  ${c.cssRuleSets.join(S)}`}
  ${P ? '' : c.getThemeRulesSets().join(S)}
  ${E}`;
      }
    },
    d = (y) => u({ ...y, sinceLastCall: !0 }),
    f = ((p = e.settings) == null ? void 0 : p.defaultFont) ?? e.defaultFont,
    h = (() => {
      let y = f;
      return (y == null ? void 0 : y[0]) === '$' && (y = y.slice(1)), y;
    })(),
    m = h ? `$${h}` : '',
    x = { ...e.unset };
  !x.fontFamily && h && (x.fontFamily = m);
  const b = {
    fonts: {},
    onlyAllowShorthands: !1,
    fontLanguages: [],
    animations: {},
    media: {},
    ...e,
    unset: x,
    settings: {
      disableSSR: e.disableSSR,
      defaultFont: e.defaultFont,
      disableRootThemeClass: e.disableRootThemeClass,
      onlyAllowShorthands: e.onlyAllowShorthands,
      mediaQueryDefaultActive: e.mediaQueryDefaultActive,
      themeClassNameOnRoot: e.themeClassNameOnRoot,
      cssStyleSeparator: e.cssStyleSeparator,
      webContainerType: 'inline-size',
      ...e.settings,
    },
    tokens: n,
    shorthands: l,
    inverseShorthands: l
      ? Object.fromEntries(Object.entries(l).map(([y, S]) => [S, y]))
      : {},
    themes: c.themes,
    fontsParsed: o || {},
    themeConfig: c,
    tokensParsed: t,
    parsed: !0,
    getNewCSS: d,
    getCSS: u,
    defaultFont: h,
    fontSizeTokens: s || new Set(),
    specificTokens: a,
    defaultFontToken: m,
  };
  return Qa(b), wi(b), hn.size && (hn.forEach((y) => y(b)), hn.clear()), b;
}
function hl(e, t) {
  const n = [],
    r = new Map();
  for (const s in e) {
    const o = s.startsWith('dark')
        ? 'dark'
        : s.startsWith('light')
          ? 'light'
          : '',
      a = e[s],
      c = o + JSON.stringify(a);
    if (r.has(c)) {
      r.get(c).names.push(s);
      continue;
    }
    const l = { ...a };
    t && Object.assign(l, t);
    for (const u in l) cl(l, u);
    const i = { names: [s], theme: l };
    n.push(i), r.set(c, i);
  }
  return n;
}
const sa = Dt({ acceptsClassName: !0, defaultProps: zt, validStyles: Vt });
sa.displayName = 'Stack';
const ml = Dt({ acceptsClassName: !0, defaultProps: zt, validStyles: Vt }),
  oa = {
    maxWidth: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  gl = {
    display: 'inline',
    boxSizing: 'border-box',
    wordWrap: 'break-word',
    whiteSpace: 'pre-wrap',
    margin: 0,
  },
  Js = oa,
  aa = Dt({
    acceptsClassName: !0,
    isText: !0,
    defaultProps: { fontFamily: 'unset', ...gl },
    inlineWhenUnflattened: new Set(['fontFamily']),
    variants: {
      numberOfLines: {
        1: oa,
        ':number': (e) =>
          e >= 1
            ? {
                WebkitLineClamp: e,
                WebkitBoxOrient: 'vertical',
                display: '-webkit-box',
                overflow: 'hidden',
              }
            : null,
      },
      selectable: {
        true: { userSelect: 'text', cursor: 'text' },
        false: { userSelect: 'none', cursor: 'default' },
      },
      ellipse: { true: Js },
      ellipsis: { true: Js },
    },
    validStyles: { ...Vt, ...xo },
  });
aa.displayName = 'Text';
const pl = (e) => {
  const t = e.disableRootThemeClass ?? he('disableRootThemeClass'),
    n = e.themeClassNameOnRoot ?? he('themeClassNameOnRoot');
  return (
    ot &&
      _e(() => {
        if (t) return;
        const r = `${To}${e.defaultTheme}`,
          s = n ? document.documentElement : document.body;
        return (
          s.classList.add(r),
          () => {
            s.classList.remove(r);
          }
        );
      }, [e.defaultTheme, t, n]),
    j.jsx(_n, {
      className: e.className,
      name: e.defaultTheme,
      forceClassName: !t && !n,
      _isRoot: _.useId,
      children: e.children,
    })
  );
};
function ia({
  children: e,
  disableInjectCSS: t,
  config: n,
  className: r,
  defaultTheme: s,
  disableRootThemeClass: o,
  reset: a,
  themeClassNameOnRoot: c,
}) {
  bn ||
    (ot &&
      _e(() => {
        if (n && !t) {
          const i = document.createElement('style');
          return (
            i.appendChild(document.createTextNode(n.getCSS())),
            document.head.appendChild(i),
            () => {
              document.head.removeChild(i);
            }
          );
        }
      }, [n, t])),
    _e(() => {
      di(), Fo();
    }, []);
  let l = j.jsx(Sl, {
    children: j.jsx(yr.Provider, {
      animationDriver: n == null ? void 0 : n.animations,
      children: j.jsx(pl, {
        themeClassNameOnRoot: c ?? he('themeClassNameOnRoot'),
        disableRootThemeClass: o ?? he('disableRootThemeClass'),
        defaultTheme: s ?? (n ? Object.keys(n.themes)[0] : ''),
        reset: a,
        className: r,
        children: e,
      }),
    }),
  });
  return (
    he('disableSSR') && (l = j.jsx(Mc, { enabled: !0, children: l })),
    j.jsxs(j.Fragment, {
      children: [
        l,
        bn &&
          n &&
          !t &&
          j.jsx(
            'style',
            {
              precedence: 'default',
              href: 'tamagui-css',
              children: n.getCSS(),
            },
            'tamagui-css'
          ),
      ],
    })
  );
}
function Sl(e) {
  const [t, n] = re.useState(!1);
  return (
    re.useEffect(() => {
      n(!0);
    }, []),
    j.jsx('span', {
      style: { display: 'contents' },
      className: t ? '' : 't_unmounted',
      children: e.children,
    })
  );
}
ia.displayName = 'TamaguiProvider';
const ca = '__reactResponderId',
  bl = !!(
    typeof window < 'u' &&
    window.document &&
    window.document.createElement
  ),
  eo = (e) => {
    if (e && e.nodeType === 1 && e.getBoundingClientRect)
      return e.getBoundingClientRect();
  };
function yl(e) {
  var t;
  if (e.type === 'selectionchange') {
    const n = (t = window.getSelection()) == null ? void 0 : t.anchorNode;
    return to(n);
  }
  return e.composedPath != null ? e.composedPath() : to(e.target);
}
function to(e) {
  const t = [];
  for (; e != null && e !== document.body; ) t.push(e), (e = e.parentNode);
  return t;
}
function xl(e) {
  return e != null ? e[ca] : null;
}
function wl(e, t) {
  e != null && (e[ca] = t);
}
function Tl(e) {
  const t = [],
    n = [],
    r = yl(e);
  for (let s = 0; s < r.length; s++) {
    const o = r[s],
      a = xl(o);
    a != null && (t.push(a), n.push(o));
  }
  return { idPath: t, nodePath: n };
}
function $l(e, t) {
  let n = e.length,
    r = t.length;
  if (n === 0 || r === 0 || e[n - 1] !== t[r - 1]) return null;
  let s = e[0],
    o = 0,
    a = t[0],
    c = 0;
  n - r > 0 && ((o = n - r), (s = e[o]), (n = r)),
    r - n > 0 && ((c = r - n), (a = t[c]), (r = n));
  let l = n;
  for (; l--; ) {
    if (s === a) return s;
    (s = e[o++]), (a = t[c++]);
  }
  return null;
}
function Cl(e, t) {
  if (!t || t.length === 0) return !1;
  for (let n = 0; n < t.length; n++) {
    const r = t[n].target;
    if (r != null && e.contains(r)) return !0;
  }
  return !1;
}
function Rl(e) {
  return e.type === 'selectionchange' ? vl() : e.type === 'select';
}
function Al(e) {
  const { altKey: t, button: n, buttons: r, ctrlKey: s, type: o } = e,
    a = o === 'touchstart' || o === 'touchmove',
    c = o === 'mousedown' && (n === 0 || r === 1),
    l = o === 'mousemove' && r === 1,
    i = t === !1 && s === !1;
  return !!(a || (c && i) || (l && i));
}
function vl() {
  const e = window.getSelection();
  if (!e) return !1;
  const t = e.toString(),
    n = e.anchorNode,
    r = e.focusNode,
    s =
      (n && n.nodeType === window.Node.TEXT_NODE) ||
      (r && r.nodeType === window.Node.TEXT_NODE);
  return (
    t.length >= 1 &&
    t !==
      `
` &&
    !!s
  );
}
const no = () => {},
  Pl = {},
  _l = [];
function ro(e) {
  return e > 20 ? e % 20 : e;
}
function la(e, t) {
  let n,
    r = !1,
    s,
    o;
  const a = e.changedTouches,
    c = e.type,
    l = e.metaKey === !0,
    i = e.shiftKey === !0,
    u = (a == null ? void 0 : a[0].force) || 0,
    d = ro((a == null ? void 0 : a[0].identifier) || 0),
    f = (a == null ? void 0 : a[0].clientX) || e.clientX,
    h = (a == null ? void 0 : a[0].clientY) || e.clientY,
    m = (a == null ? void 0 : a[0].pageX) || e.pageX,
    x = (a == null ? void 0 : a[0].pageY) || e.pageY,
    b = typeof e.preventDefault == 'function' ? e.preventDefault.bind(e) : no,
    p = e.timeStamp;
  function y(E) {
    return Array.prototype.slice.call(E).map((g) => ({
      force: g.force,
      identifier: ro(g.identifier),
      get locationX() {
        return v(g.clientX);
      },
      get locationY() {
        return P(g.clientY);
      },
      pageX: g.pageX,
      pageY: g.pageY,
      target: g.target,
      timestamp: p,
    }));
  }
  if (a != null) (s = y(a)), (o = y(e.touches));
  else {
    const E = [
      {
        force: u,
        identifier: d,
        get locationX() {
          return v(f);
        },
        get locationY() {
          return P(h);
        },
        pageX: m,
        pageY: x,
        target: e.target,
        timestamp: p,
      },
    ];
    (s = E), (o = c === 'mouseup' || c === 'dragstart' ? _l : E);
  }
  const S = {
    bubbles: !0,
    cancelable: !0,
    currentTarget: null,
    defaultPrevented: e.defaultPrevented,
    dispatchConfig: Pl,
    eventPhase: e.eventPhase,
    isDefaultPrevented() {
      return e.defaultPrevented;
    },
    isPropagationStopped() {
      return r;
    },
    isTrusted: e.isTrusted,
    nativeEvent: {
      altKey: !1,
      ctrlKey: !1,
      metaKey: l,
      shiftKey: i,
      changedTouches: s,
      force: u,
      identifier: d,
      get locationX() {
        return v(f);
      },
      get locationY() {
        return P(h);
      },
      pageX: m,
      pageY: x,
      target: e.target,
      timestamp: p,
      touches: o,
      type: c,
    },
    persist: no,
    preventDefault: b,
    stopPropagation() {
      r = !0;
    },
    target: e.target,
    timeStamp: p,
    touchHistory: t.touchHistory,
  };
  function v(E) {
    if (((n = n || eo(S.currentTarget)), n)) return E - n.left;
  }
  function P(E) {
    if (((n = n || eo(S.currentTarget)), n)) return E - n.top;
  }
  return S;
}
const El = 'mousedown',
  kl = 'mousemove',
  Ml = 'mouseup',
  Ol = 'dragstart',
  Nl = 'touchstart',
  Fl = 'touchmove',
  Il = 'touchend',
  Wl = 'touchcancel',
  jl = 'scroll',
  Ll = 'select',
  Bl = 'selectionchange';
function ua(e) {
  return e === Nl || e === El;
}
function fa(e) {
  return e === Fl || e === kl;
}
function da(e) {
  return e === Il || e === Ml || ha(e);
}
function ha(e) {
  return e === Wl || e === Ol;
}
function Vl(e) {
  return e === jl;
}
function zl(e) {
  return e === Ll || e === Bl;
}
class Dl {
  constructor() {
    gs(this, '_touchHistory', {
      touchBank: [],
      numberActiveTouches: 0,
      indexOfSingleActiveTouch: -1,
      mostRecentTimeStamp: 0,
    });
  }
  recordTouchTrack(t, n) {
    var s;
    const r = this._touchHistory;
    if (fa(t)) n.changedTouches.forEach((o) => Ul(o, r));
    else if (ua(t))
      n.changedTouches.forEach((o) => Xl(o, r)),
        (r.numberActiveTouches = n.touches.length),
        r.numberActiveTouches === 1 &&
          (r.indexOfSingleActiveTouch = n.touches[0].identifier);
    else if (
      da(t) &&
      (n.changedTouches.forEach((o) => Yl(o, r)),
      (r.numberActiveTouches = n.touches.length),
      r.numberActiveTouches === 1)
    ) {
      const { touchBank: o } = r;
      for (let a = 0; a < o.length; a++)
        if ((s = o[a]) != null && s.touchActive) {
          r.indexOfSingleActiveTouch = a;
          break;
        }
    }
  }
  get touchHistory() {
    return this._touchHistory;
  }
}
const so = 20;
function Re(e) {
  return e.timeStamp || e.timestamp;
}
function Hl(e) {
  return {
    touchActive: !0,
    startPageX: e.pageX,
    startPageY: e.pageY,
    startTimeStamp: Re(e),
    currentPageX: e.pageX,
    currentPageY: e.pageY,
    currentTimeStamp: Re(e),
    previousPageX: e.pageX,
    previousPageY: e.pageY,
    previousTimeStamp: Re(e),
  };
}
function Kl(e, t) {
  (e.touchActive = !0),
    (e.startPageX = t.pageX),
    (e.startPageY = t.pageY),
    (e.startTimeStamp = Re(t)),
    (e.currentPageX = t.pageX),
    (e.currentPageY = t.pageY),
    (e.currentTimeStamp = Re(t)),
    (e.previousPageX = t.pageX),
    (e.previousPageY = t.pageY),
    (e.previousTimeStamp = Re(t));
}
function Gr({ identifier: e }) {
  return e == null && console.error('Touch object is missing identifier.'), e;
}
function Xl(e, t) {
  const n = Gr(e),
    r = t.touchBank[n];
  r ? Kl(r, e) : (t.touchBank[n] = Hl(e)), (t.mostRecentTimeStamp = Re(e));
}
function Ul(e, t) {
  const n = t.touchBank[Gr(e)];
  n
    ? ((n.touchActive = !0),
      (n.previousPageX = n.currentPageX),
      (n.previousPageY = n.currentPageY),
      (n.previousTimeStamp = n.currentTimeStamp),
      (n.currentPageX = e.pageX),
      (n.currentPageY = e.pageY),
      (n.currentTimeStamp = Re(e)),
      (t.mostRecentTimeStamp = Re(e)))
    : console.warn(
        `Cannot record touch move without a touch start.
`,
        `Touch Move: ${ma(e)}
`,
        `Touch Bank: ${ga(t)}`
      );
}
function Yl(e, t) {
  const n = t.touchBank[Gr(e)];
  n
    ? ((n.touchActive = !1),
      (n.previousPageX = n.currentPageX),
      (n.previousPageY = n.currentPageY),
      (n.previousTimeStamp = n.currentTimeStamp),
      (n.currentPageX = e.pageX),
      (n.currentPageY = e.pageY),
      (n.currentTimeStamp = Re(e)),
      (t.mostRecentTimeStamp = Re(e)))
    : console.warn(
        `Cannot record touch end without a touch start.
`,
        `Touch End: ${ma(e)}
`,
        `Touch Bank: ${ga(t)}`
      );
}
function ma(e) {
  return JSON.stringify({
    identifier: e.identifier,
    pageX: e.pageX,
    pageY: e.pageY,
    timestamp: Re(e),
  });
}
function ga(e) {
  const { touchBank: t } = e;
  let n = JSON.stringify(t.slice(0, so));
  return t.length > so && (n += ` (original size: ${t.length})`), n;
}
const Gl = {},
  oo = [
    'onStartShouldSetResponderCapture',
    'onStartShouldSetResponder',
    { bubbles: !0 },
  ],
  ao = [
    'onMoveShouldSetResponderCapture',
    'onMoveShouldSetResponder',
    { bubbles: !0 },
  ],
  ql = [
    'onScrollShouldSetResponderCapture',
    'onScrollShouldSetResponder',
    { bubbles: !1 },
  ],
  Zl = {
    touchstart: oo,
    mousedown: oo,
    touchmove: ao,
    mousemove: ao,
    scroll: ql,
  },
  Mr = { id: null, idPath: null, node: null },
  Cn = new Map();
let Ze = !1,
  Ne = 0,
  Ve = { id: null, node: null, idPath: null };
const Or = new Dl();
function Wt(e) {
  Ve = e;
}
function jt(e) {
  return Cn.get(e) ?? Gl;
}
function ir(e) {
  const t = e.type,
    n = e.target;
  if (
    (t === 'touchstart' && (Ze = !0),
    (t === 'touchmove' || Ne > 1) && (Ze = !1),
    (t === 'mousedown' && Ze) ||
      (t === 'mousemove' && Ze) ||
      (t === 'mousemove' && Ne < 1))
  )
    return;
  if (Ze && t === 'mouseup') {
    Ne === 0 && (Ze = !1);
    return;
  }
  const r = ua(t) && Al(e),
    s = fa(t),
    o = da(t),
    a = Vl(t),
    c = zl(t),
    l = la(e, Or);
  (r || s || o) &&
    (e.touches ? (Ne = e.touches.length) : r ? (Ne = 1) : o && (Ne = 0),
    Or.recordTouchTrack(t, l.nativeEvent));
  let i = Tl(e),
    u = !1,
    d;
  if (r || s || (a && Ne > 0)) {
    const f = Ve.idPath,
      h = i.idPath;
    if (f != null && h != null) {
      const m = $l(f, h);
      if (m != null) {
        const x = h.indexOf(m) + (m === Ve.id ? 1 : 0);
        i = { idPath: h.slice(x), nodePath: i.nodePath.slice(x) };
      } else i = null;
    }
    i != null && ((d = Ql(i, e, l)), d != null && (Jl(l, d), (u = !0)));
  }
  if (Ve.id != null && Ve.node != null) {
    const { id: f, node: h } = Ve,
      {
        onResponderStart: m,
        onResponderMove: x,
        onResponderEnd: b,
        onResponderRelease: p,
        onResponderTerminate: y,
        onResponderTerminationRequest: S,
      } = jt(f);
    if (((l.bubbles = !1), (l.cancelable = !1), (l.currentTarget = h), r))
      m != null &&
        ((l.dispatchConfig.registrationName = 'onResponderStart'), m(l));
    else if (s)
      x != null &&
        ((l.dispatchConfig.registrationName = 'onResponderMove'), x(l));
    else {
      const v =
          ha(t) ||
          t === 'contextmenu' ||
          (t === 'blur' && n === window) ||
          (t === 'blur' && n.contains(h) && e.relatedTarget !== h) ||
          (a && Ne === 0) ||
          (a && n.contains(h) && n !== h) ||
          (c && Rl(e)),
        P = o && !v && !Cl(h, e.touches);
      if (
        (o &&
          b != null &&
          ((l.dispatchConfig.registrationName = 'onResponderEnd'), b(l)),
        P &&
          (p != null &&
            ((l.dispatchConfig.registrationName = 'onResponderRelease'), p(l)),
          Wt(Mr)),
        v)
      ) {
        let E = !0;
        (t === 'contextmenu' || t === 'scroll' || t === 'selectionchange') &&
          (u
            ? (E = !1)
            : S != null &&
              ((l.dispatchConfig.registrationName =
                'onResponderTerminationRequest'),
              S(l) === !1 && (E = !1))),
          E &&
            (y != null &&
              ((l.dispatchConfig.registrationName = 'onResponderTerminate'),
              y(l)),
            Wt(Mr),
            (Ze = !1),
            (Ne = 0));
      }
    }
  }
}
function Ql(e, t, n) {
  const r = Zl[t.type];
  if (r != null) {
    const { idPath: s, nodePath: o } = e,
      a = r[0],
      c = r[1],
      { bubbles: l } = r[2],
      i = (u, d, f) => {
        const h = jt(u)[f];
        if (h != null && ((n.currentTarget = d), h(n) === !0)) {
          const m = s.slice(s.indexOf(u));
          return { id: u, node: d, idPath: m };
        }
      };
    for (let u = s.length - 1; u >= 0; u--) {
      const d = s[u],
        f = o[u],
        h = i(d, f, a);
      if (h != null) return h;
      if (n.isPropagationStopped() === !0) return;
    }
    if (l)
      for (let u = 0; u < s.length; u++) {
        const d = s[u],
          f = o[u],
          h = i(d, f, c);
        if (h != null) return h;
        if (n.isPropagationStopped() === !0) return;
      }
    else {
      const u = s[0],
        d = o[0];
      if (t.target === d) return i(u, d, c);
    }
  }
}
function Jl(e, t) {
  const { id: n, node: r } = Ve,
    { id: s, node: o } = t,
    { onResponderGrant: a, onResponderReject: c } = jt(s);
  if (((e.bubbles = !1), (e.cancelable = !1), (e.currentTarget = o), n == null))
    a != null &&
      ((e.currentTarget = o),
      (e.dispatchConfig.registrationName = 'onResponderGrant'),
      a(e)),
      Wt(t);
  else {
    const { onResponderTerminate: l, onResponderTerminationRequest: i } = jt(n);
    let u = !0;
    i != null &&
      ((e.currentTarget = r),
      (e.dispatchConfig.registrationName = 'onResponderTerminationRequest'),
      i(e) === !1 && (u = !1)),
      u
        ? (l != null &&
            ((e.currentTarget = r),
            (e.dispatchConfig.registrationName = 'onResponderTerminate'),
            l(e)),
          a != null &&
            ((e.currentTarget = o),
            (e.dispatchConfig.registrationName = 'onResponderGrant'),
            a(e)),
          Wt(t))
        : c != null &&
          ((e.currentTarget = o),
          (e.dispatchConfig.registrationName = 'onResponderReject'),
          c(e));
  }
}
const eu = ['blur', 'scroll'],
  tu = [
    'mousedown',
    'mousemove',
    'mouseup',
    'dragstart',
    'touchstart',
    'touchmove',
    'touchend',
    'touchcancel',
    'contextmenu',
    'select',
    'selectionchange',
  ],
  io = Symbol();
function nu() {
  bl &&
    !window[io] &&
    (window.addEventListener('blur', ir),
    tu.forEach((e) => {
      document.addEventListener(e, ir);
    }),
    eu.forEach((e) => {
      document.addEventListener(e, ir, !0);
    }),
    (window[io] = !0));
}
function ru(e, t, n) {
  wl(t, e), Cn.set(e, n);
}
function su(e) {
  Ve.id === e && ou(), Cn.has(e) && Cn.delete(e);
}
function ou() {
  const { id: e, node: t } = Ve;
  if (e != null && t != null) {
    const { onResponderTerminate: n } = jt(e);
    if (n != null) {
      const r = la({}, Or);
      (r.currentTarget = t), n(r);
    }
    Wt(Mr);
  }
  (Ze = !1), (Ne = 0);
}
const Nr = {},
  co = new WeakMap(),
  cr = new WeakMap();
function au(e, t = Nr) {
  var s;
  const n = iu(t),
    r =
      ((s = e == null ? void 0 : e.current) == null ? void 0 : s.host) ||
      (e == null ? void 0 : e.current);
  _.useEffect(() => {
    if (n === Nr) return;
    nu(), cr.has(e) || cr.set(e, `${Math.random()}`);
    const o = cr.get(e);
    return (
      ru(o, r, n),
      co.set(e, !0),
      () => {
        su(r), co.set(e, !1);
      }
    );
  }, [n, e]);
}
function iu({
  onMoveShouldSetResponder: e,
  onMoveShouldSetResponderCapture: t,
  onResponderEnd: n,
  onResponderGrant: r,
  onResponderMove: s,
  onResponderReject: o,
  onResponderRelease: a,
  onResponderStart: c,
  onResponderTerminate: l,
  onResponderTerminationRequest: i,
  onScrollShouldSetResponder: u,
  onScrollShouldSetResponderCapture: d,
  onSelectionChangeShouldSetResponder: f,
  onSelectionChangeShouldSetResponderCapture: h,
  onStartShouldSetResponder: m,
  onStartShouldSetResponderCapture: x,
}) {
  return e ||
    t ||
    n ||
    r ||
    s ||
    o ||
    a ||
    c ||
    l ||
    i ||
    u ||
    d ||
    f ||
    h ||
    m ||
    x
    ? {
        onMoveShouldSetResponder: e,
        onMoveShouldSetResponderCapture: t,
        onResponderEnd: n,
        onResponderGrant: r,
        onResponderMove: s,
        onResponderReject: o,
        onResponderRelease: a,
        onResponderStart: c,
        onResponderTerminate: l,
        onResponderTerminationRequest: i,
        onScrollShouldSetResponder: u,
        onScrollShouldSetResponderCapture: d,
        onSelectionChangeShouldSetResponder: f,
        onSelectionChangeShouldSetResponderCapture: h,
        onStartShouldSetResponder: m,
        onStartShouldSetResponderCapture: x,
      }
    : Nr;
}
var lo = {};
const Fr = new WeakMap(),
  Mt = new Set(),
  Lt = new WeakMap();
let ht = null;
const pn = new WeakMap(),
  cu = new WeakMap(),
  lu = new WeakMap(),
  dn = typeof window < 'u' ? window.requestAnimationFrame : void 0;
let Ir = !0;
const Sn = new Map();
function uu() {
  Ir && ((Ir = !1), Sn && (Sn.forEach((e) => e()), Sn.clear()));
}
function fu() {
  !ot ||
    ht ||
    (ht = new IntersectionObserver(
      (e) => {
        e.forEach((t) => {
          const n = t.target;
          Lt.get(n) !== t.isIntersecting && Lt.set(n, t.isIntersecting);
        });
      },
      { threshold: 0 }
    ));
}
if (ot && dn) {
  const e = 'checkVisibility' in document.body,
    t = new WeakMap();
  async function n(c) {
    if (
      Lt.get(c) === !1 ||
      (lo.TAMAGUI_ONLAYOUT_VISIBILITY_CHECK === '1' &&
        e &&
        !c.checkVisibility())
    )
      return;
    const l = Fr.get(c);
    if (typeof l != 'function') return;
    const i = c.parentElement;
    if (!i) return;
    let u, d;
    {
      const [m, x] = await Promise.all([t.get(c) || Rn(c), t.get(i) || Rn(i)]);
      if (m === !1 || x === !1) return;
      (u = m), (d = x);
    }
    const f = pn.get(c),
      h = pn.get(i);
    if (!f || (!wn(f, u) && (!h || !wn(h, d)))) {
      pn.set(c, u), cu.set(i, d);
      const m = pa(u, d);
      Ir ? Sn.set(c, () => l(m)) : l(m);
    }
  }
  dn(a);
  let r = 0;
  const s = lo.TAMAGUI_LAYOUT_FRAME_SKIP,
    o = s ? +s : 10;
  async function a() {
    {
      if (!Mt.size || r++ % o !== 0) {
        dn(a);
        return;
      }
      r === Number.MAX_SAFE_INTEGER && (r = 0),
        await new Promise((c) => {
          const l = new IntersectionObserver(
            (i) => {
              l.disconnect();
              for (const u of i) t.set(u.target, u.boundingClientRect);
              c();
            },
            { threshold: 0 }
          );
          for (const i of Mt)
            i.parentElement instanceof HTMLElement &&
              (l.observe(i), l.observe(i.parentElement));
        }),
        Mt.forEach((c) => {
          n(c);
        });
    }
    dn(a);
  }
}
const pa = (e, t) => ({
    nativeEvent: { layout: Sa(e, t), target: e },
    timeStamp: Date.now(),
  }),
  Sa = (e, t) => {
    const { height: n, left: r, top: s, width: o } = e,
      a = r - t.left,
      c = s - t.top;
    return { x: a, y: c, width: o, height: n, pageX: e.left, pageY: e.top };
  };
function du(e, t) {
  var r;
  const n = hu((r = e.current) == null ? void 0 : r.host);
  n && t && Fr.set(n, t),
    _e(() => {
      var a;
      if (!t) return;
      const s = (a = e.current) == null ? void 0 : a.host;
      if (!s) return;
      Mt.add(s), fu(), ht && (ht.observe(s), Lt.set(s, !0));
      const o = s.parentNode;
      return (
        o && t(pa(s.getBoundingClientRect(), o.getBoundingClientRect())),
        () => {
          Mt.delete(s),
            Fr.delete(s),
            pn.delete(s),
            lu.delete(s),
            Lt.delete(s),
            ht && ht.unobserve(s);
        }
      );
    }, [e, !!t]);
}
function hu(e) {
  if (!(typeof HTMLElement > 'u')) return e instanceof HTMLElement ? e : void 0;
}
const Rn = (e) =>
    new Promise((t) => {
      if (!e || e.nodeType !== 1) return t(!1);
      const n = new IntersectionObserver(
        (r) => (n.disconnect(), t(r[0].boundingClientRect)),
        { threshold: 0 }
      );
      n.observe(e);
    }),
  qr = async (e, t) => {
    const n = t || (e == null ? void 0 : e.parentElement);
    if (n instanceof HTMLElement) {
      const [r, s] = await Promise.all([Rn(e), Rn(n)]);
      if (s && r) return Sa(r, s);
    }
    return null;
  },
  mu = async (e, t) => {
    const n = await qr(
      e,
      e.parentNode instanceof HTMLElement ? e.parentNode : null
    );
    return (
      n && (t == null || t(n.x, n.y, n.width, n.height, n.pageX, n.pageY)), n
    );
  };
function gu(e) {
  return (t) => mu(e, t);
}
const pu = async (e, t) => {
    const n = await qr(e, null);
    return n && (t == null || t(n.pageX, n.pageY, n.width, n.height)), n;
  },
  Su = (e) => (t) => pu(e, t),
  bu = async (e, t, n) => {
    const r = await qr(e, t);
    return (
      r && (n == null || n(r.x, r.y, r.width, r.height, r.pageX, r.pageY)), r
    );
  };
function yu(e) {
  return (t, n) => bu(e, t, n);
}
function xu() {
  return null;
}
const Fu = (e) => (
    _e(() => {
      uu();
    }, []),
    j.jsx(ia, { ...e })
  ),
  Iu = (e) => dl(e);
xc({
  getBaseViews: xu,
  setElementProps: (e) => {
    e &&
      !e.measure &&
      (e.measure || (e.measure = gu(e)),
      e.measureInWindow || (e.measureInWindow = Su(e)),
      e.measureLayout || (e.measureLayout = yu(e)));
  },
  usePropsTransform(e, t, n, r) {
    {
      const s = typeof e == 'string',
        {
          onMoveShouldSetResponder: o,
          onMoveShouldSetResponderCapture: a,
          onResponderEnd: c,
          onResponderGrant: l,
          onResponderMove: i,
          onResponderReject: u,
          onResponderRelease: d,
          onResponderStart: f,
          onResponderTerminate: h,
          onResponderTerminationRequest: m,
          onScrollShouldSetResponder: x,
          onScrollShouldSetResponderCapture: b,
          onSelectionChangeShouldSetResponder: p,
          onSelectionChangeShouldSetResponderCapture: y,
          onStartShouldSetResponder: S,
          onStartShouldSetResponderCapture: v,
          collapsable: P,
          focusable: E,
          accessible: g,
          accessibilityDisabled: B,
          onLayout: C,
          hrefAttrs: N,
          ...A
        } = t;
      if (((r || s) && (du(n, s ? C : void 0), au(n, s ? t : void 0)), s)) {
        if (A.href && N) {
          const { download: F, rel: Y, target: W } = N;
          F != null && (A.download = F),
            Y && (A.rel = Y),
            typeof W == 'string' &&
              (A.target = W.charAt(0) !== '_' ? `_${W}` : W);
        }
        return A;
      }
    }
  },
  useEvents(e, t, n, r, s) {},
});
const Wu = ml,
  ju = sa,
  Lu = aa,
  ba = {
    caption: 12,
    subtitle: 14,
    body: 16,
    section: 18,
    title: 24,
    headline: 32,
    display: 40,
    weightRegular: Be.select({ ios: '400', android: '400', default: '400' }),
    weightMedium: Be.select({ ios: '500', android: '500', default: '500' }),
    weightSemibold: Be.select({ ios: '600', android: '600', default: '600' }),
    weightBold: Be.select({ ios: '700', android: '700', default: '700' }),
    weightExtraBold: Be.select({ ios: '800', android: '800', default: '800' }),
  },
  ya = {
    0: 0,
    0.5: 2,
    1: 4,
    1.5: 6,
    2: 8,
    2.5: 10,
    3: 12,
    3.5: 14,
    4: 16,
    5: 20,
    6: 24,
    7: 28,
    8: 32,
    9: 36,
    10: 40,
    11: 44,
    12: 48,
    14: 56,
    16: 64,
    20: 80,
    24: 96,
    28: 112,
    32: 128,
  },
  xa = {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    '2xl': 24,
    '3xl': 32,
    full: 9999,
  },
  wa = { durations: { fast: 150, base: 250, slow: 350 } },
  wu = {
    mode: 'light',
    colors: {
      background: '#FAFBFF',
      surface: '#FFFFFF',
      surfaceVariant: '#F1F5FF',
      primary: '#0D47A1',
      primaryContainer: '#E3F2FD',
      secondary: '#5E35B1',
      secondaryContainer: '#EDE7F6',
      accent: '#FF8F00',
      info: '#1976D2',
      success: '#388E3C',
      warning: '#F57C00',
      danger: '#D32F2F',
      text: '#1A1C1E',
      textSecondary: '#5F6368',
      textOnPrimary: '#FFFFFF',
      border: '#E8EAF6',
      borderFocus: '#0D47A1',
      overlay: 'rgba(26, 28, 30, 0.6)',
      shadow: 'rgba(26, 28, 30, 0.08)',
    },
    typography: ba,
    spacing: ya,
    radius: xa,
    shadows: {
      level1: 'rgba(26, 28, 30, 0.08)',
      level2: 'rgba(26, 28, 30, 0.16)',
    },
    motion: wa,
  },
  Tu = {
    mode: 'dark',
    colors: {
      background: '#0A0E1A',
      surface: '#1A1F2E',
      surfaceVariant: '#252D3F',
      primary: '#4FC3F7',
      primaryContainer: '#0D47A1',
      secondary: '#B39DDB',
      secondaryContainer: '#4527A0',
      accent: '#FFD93D',
      info: '#4FC3F7',
      success: '#4ECDC4',
      warning: '#FFD93D',
      danger: '#FF6B6B',
      text: '#F8FAFF',
      textSecondary: '#B3C5EF',
      textOnPrimary: '#0A0E1A',
      border: '#37415A',
      borderFocus: '#4FC3F7',
      overlay: 'rgba(10, 14, 26, 0.8)',
      shadow: 'rgba(0, 0, 0, 0.4)',
    },
    typography: ba,
    spacing: ya,
    radius: xa,
    shadows: { level1: 'rgba(0, 0, 0, 0.3)', level2: 'rgba(0, 0, 0, 0.5)' },
    motion: wa,
  },
  Ta = (e) => (e === 'dark' ? Tu : wu),
  O = {
    fontFamily: {
      regular: Be.select({
        ios: 'SF Pro Text',
        android: 'Roboto',
        default: 'System',
      }),
      medium: Be.select({
        ios: 'SF Pro Text Medium',
        android: 'Roboto Medium',
        default: 'System',
      }),
      bold: Be.select({
        ios: 'SF Pro Display Bold',
        android: 'Roboto Bold',
        default: 'System',
      }),
      semibold: Be.select({
        ios: 'SF Pro Display Semibold',
        android: 'Roboto Medium',
        default: 'System',
      }),
    },
    fontSize: {
      xs: 10,
      sm: 12,
      base: 14,
      lg: 16,
      xl: 18,
      '2xl': 20,
      '3xl': 24,
      '4xl': 28,
      '5xl': 32,
      '6xl': 36,
    },
    lineHeight: {
      xs: 14,
      sm: 16,
      base: 20,
      lg: 24,
      xl: 26,
      '2xl': 28,
      '3xl': 32,
      '4xl': 36,
      '5xl': 40,
      '6xl': 44,
    },
    fontWeight: { normal: '400', medium: '500', semibold: '600', bold: '700' },
    letterSpacing: { tight: -0.5, normal: 0, wide: 0.5, wider: 1, widest: 2 },
  },
  $a = {
    largeTitle: {
      fontFamily: O.fontFamily.bold,
      fontSize: O.fontSize['5xl'],
      lineHeight: O.lineHeight['5xl'],
      fontWeight: O.fontWeight.bold,
      letterSpacing: O.letterSpacing.wide,
    },
    title: {
      fontFamily: O.fontFamily.bold,
      fontSize: O.fontSize['4xl'],
      lineHeight: O.lineHeight['4xl'],
      fontWeight: O.fontWeight.bold,
      letterSpacing: O.letterSpacing.normal,
    },
    heading: {
      fontFamily: O.fontFamily.semibold,
      fontSize: O.fontSize['3xl'],
      lineHeight: O.lineHeight['3xl'],
      fontWeight: O.fontWeight.semibold,
      letterSpacing: O.letterSpacing.normal,
    },
    subheading: {
      fontFamily: O.fontFamily.medium,
      fontSize: O.fontSize.xl,
      lineHeight: O.lineHeight.xl,
      fontWeight: O.fontWeight.medium,
      letterSpacing: O.letterSpacing.normal,
    },
    body: {
      fontFamily: O.fontFamily.regular,
      fontSize: O.fontSize.base,
      lineHeight: O.lineHeight.base,
      fontWeight: O.fontWeight.normal,
      letterSpacing: O.letterSpacing.normal,
    },
    bodyLarge: {
      fontFamily: O.fontFamily.regular,
      fontSize: O.fontSize.lg,
      lineHeight: O.lineHeight.lg,
      fontWeight: O.fontWeight.normal,
      letterSpacing: O.letterSpacing.normal,
    },
    caption: {
      fontFamily: O.fontFamily.regular,
      fontSize: O.fontSize.sm,
      lineHeight: O.lineHeight.sm,
      fontWeight: O.fontWeight.normal,
      letterSpacing: O.letterSpacing.normal,
    },
    button: {
      fontFamily: O.fontFamily.semibold,
      fontSize: O.fontSize.lg,
      lineHeight: O.lineHeight.lg,
      fontWeight: O.fontWeight.semibold,
      letterSpacing: O.letterSpacing.normal,
    },
  },
  Ot = {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    '2xl': 24,
    '3xl': 32,
    '4xl': 40,
    '5xl': 48,
    '6xl': 64,
    '7xl': 80,
    '8xl': 96,
  },
  Ca = {
    none: 0,
    xs: 2,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    '2xl': 20,
    '3xl': 24,
    full: 9999,
  },
  Ra = {
    none: {
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0,
      shadowRadius: 0,
      elevation: 0,
    },
    sm: {
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.18,
      shadowRadius: 1,
      elevation: 1,
    },
    md: {
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
    },
    lg: {
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 4.65,
      elevation: 8,
    },
    xl: {
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.37,
      shadowRadius: 7.49,
      elevation: 12,
    },
  };
Ot.lg, Ot['4xl'], Ot.xl;
const uo = Ta('light'),
  fo = Ta('dark'),
  $u = {
    tokens: uo,
    colors: uo.colors,
    typography: O,
    textStyles: $a,
    spacing: Ot,
    borderRadius: Ca,
    shadows: Ra,
    isDark: !1,
  },
  Cu = {
    tokens: fo,
    colors: fo.colors,
    typography: O,
    textStyles: $a,
    spacing: Ot,
    borderRadius: Ca,
    shadows: Ra,
    isDark: !0,
  },
  Aa = _.createContext(void 0),
  ho = '@tapango_color_scheme',
  Bu = ({ children: e }) => {
    const t = Ba(),
      [n, r] = _.useState('light');
    _.useEffect(() => {
      (async () => {
        try {
          const u = await ps.getItem(ho);
          u && ['light', 'dark', 'system'].includes(u) ? r(u) : r('light');
        } catch (u) {
          console.warn('Failed to load color scheme preference:', u);
        }
      })();
    }, []);
    const s = async (i) => {
        try {
          await ps.setItem(ho, i), r(i);
        } catch (u) {
          console.warn('Failed to save color scheme preference:', u), r(i);
        }
      },
      a = (n === 'system' ? t : n) === 'dark',
      l = {
        theme: a ? Cu : $u,
        colorScheme: n,
        toggleColorScheme: s,
        isDark: a,
      };
    return j.jsx(Aa.Provider, { value: l, children: e });
  },
  va = () => {
    const e = _.useContext(Aa);
    if (e === void 0)
      throw new Error('useTheme must be used within a ThemeProvider');
    return e;
  },
  Vu = () => {
    const { theme: e } = va();
    return e.colors;
  },
  zu = () => {
    const { isDark: e } = va();
    return e;
  };
export {
  ze as A,
  be as B,
  yr as C,
  Ai as D,
  uc as E,
  Tc as F,
  vs as G,
  ku as H,
  aa as I,
  Mi as J,
  Ha as K,
  Da as L,
  _n as M,
  ot as N,
  po as O,
  Be as P,
  oi as Q,
  Qc as R,
  ju as S,
  Lu as T,
  Iu as U,
  Wu as V,
  Hr as W,
  Vu as a,
  xn as b,
  Fu as c,
  Bu as d,
  Dt as e,
  zr as f,
  Ta as g,
  Ou as h,
  Ae as i,
  yn as j,
  Nu as k,
  $a as l,
  O as m,
  Ca as n,
  _e as o,
  Mu as p,
  Wr as q,
  Ac as r,
  Ot as s,
  Vc as t,
  zu as u,
  Eu as v,
  Nc as w,
  sa as x,
  Yr as y,
  Dc as z,
};
