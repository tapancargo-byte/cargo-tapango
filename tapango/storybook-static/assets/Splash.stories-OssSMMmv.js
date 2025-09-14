import { j as a } from './jsx-runtime-BjG_zV1W.js';
import { r as o } from './index-D_zSVikN.js';
import { L as Q } from './expo-linear-gradient-C63kpUyb.js';
import { u as X } from './safe-area-context-CkXQAMo9.js';
import { A as p } from './async-storage-CbWkip1I.js';
import { c } from './colors-CDEvqoSB.js';
import {
  _ as U,
  V as n,
  r as K,
  s as I,
  e as t0,
  D as e0,
} from './index-DaADHxGU.js';
import { T as b } from './index-CMWoXOLJ.js';
import { u as a0 } from './index-CrNYAGWA.js';
var i0 = ['animating', 'color', 'hidesWhenStopped', 'size', 'style'],
  z = (t) =>
    o.createElement('circle', {
      cx: '16',
      cy: '16',
      fill: 'none',
      r: '14',
      strokeWidth: '4',
      style: t,
    }),
  J = o.forwardRef((t, e) => {
    var i = t.animating,
      l = i === void 0 ? !0 : i,
      m = t.color,
      f = m === void 0 ? '#1976D2' : m,
      k = t.hidesWhenStopped,
      v = k === void 0 ? !0 : k,
      g = t.size,
      d = g === void 0 ? 'small' : g,
      E = t.style,
      y = U(t, i0),
      h = o.createElement(
        'svg',
        { height: '100%', viewBox: '0 0 32 32', width: '100%' },
        z({ stroke: f, opacity: 0.2 }),
        z({ stroke: f, strokeDasharray: 80, strokeDashoffset: 60 })
      );
    return o.createElement(
      n,
      K({}, y, {
        'aria-valuemax': 1,
        'aria-valuemin': 0,
        ref: e,
        role: 'progressbar',
        style: [T.container, E],
      }),
      o.createElement(n, {
        children: h,
        style: [
          typeof d == 'number' ? { height: d, width: d } : r0[d],
          T.animation,
          !l && T.animationPause,
          !l && v && T.hidesWhenStopped,
        ],
      })
    );
  });
J.displayName = 'ActivityIndicator';
var T = I.create({
    container: { alignItems: 'center', justifyContent: 'center' },
    hidesWhenStopped: { visibility: 'hidden' },
    animation: {
      animationDuration: '0.75s',
      animationKeyframes: [
        {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      ],
      animationTimingFunction: 'linear',
      animationIterationCount: 'infinite',
    },
    animationPause: { animationPlayState: 'paused' },
  }),
  r0 = I.create({
    small: { width: 20, height: 20 },
    large: { width: 36, height: 36 },
  }),
  o0 = [
    'activeOpacity',
    'delayPressIn',
    'delayPressOut',
    'delayLongPress',
    'disabled',
    'focusable',
    'onLongPress',
    'onPress',
    'onPressIn',
    'onPressOut',
    'rejectResponderTermination',
    'style',
  ];
function s0(t, e) {
  var i = t.activeOpacity,
    l = t.delayPressIn,
    m = t.delayPressOut,
    f = t.delayLongPress,
    k = t.disabled,
    v = t.focusable,
    g = t.onLongPress,
    d = t.onPress,
    E = t.onPressIn,
    y = t.onPressOut,
    h = t.rejectResponderTermination,
    O = t.style,
    D = U(t, o0),
    u = o.useRef(null),
    A = t0(e, u),
    F = o.useState('0s'),
    C = F[0],
    G = F[1],
    B = o.useState(null),
    _ = B[0],
    R = B[1],
    P = o.useCallback(
      (x, V) => {
        R(x), G(V ? V / 1e3 + 's' : '0s');
      },
      [R, G]
    ),
    N = o.useCallback(
      (x) => {
        P(i ?? 0.2, x);
      },
      [i, P]
    ),
    L = o.useCallback(
      (x) => {
        P(null, x);
      },
      [P]
    ),
    Y = o.useMemo(
      () => ({
        cancelable: !h,
        disabled: k,
        delayLongPress: f,
        delayPressStart: l,
        delayPressEnd: m,
        onLongPress: g,
        onPress: d,
        onPressStart(x) {
          var V =
            x.dispatchConfig != null
              ? x.dispatchConfig.registrationName === 'onResponderGrant'
              : x.type === 'keydown';
          N(V ? 0 : 150), E != null && E(x);
        },
        onPressEnd(x) {
          L(250), y != null && y(x);
        },
      }),
      [f, l, m, k, g, d, E, y, h, N, L]
    ),
    q = a0(u, Y);
  return o.createElement(
    n,
    K({}, D, q, {
      accessibilityDisabled: k,
      focusable: !k && v !== !1,
      pointerEvents: k ? 'box-none' : void 0,
      ref: A,
      style: [
        $.root,
        !k && $.actionable,
        O,
        _ != null && { opacity: _ },
        { transitionDuration: C },
      ],
    })
  );
}
var $ = I.create({
    root: {
      transitionProperty: 'opacity',
      transitionDuration: '0.15s',
      userSelect: 'none',
    },
    actionable: { cursor: 'pointer', touchAction: 'manipulation' },
  }),
  Z = o.memo(o.forwardRef(s0));
Z.displayName = 'TouchableOpacity';
var w = () => {};
function S() {
  return null;
}
S.setBackgroundColor = w;
S.setBarStyle = w;
S.setHidden = w;
S.setNetworkActivityIndicatorVisible = w;
S.setTranslucent = w;
async function n0() {
  return !1;
}
async function c0() {}
function l0(t) {
  const { style: e } = t;
  return a.jsx('div', {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: (e == null ? void 0 : e.width) || 120,
      height: (e == null ? void 0 : e.height) || 120,
      background:
        'radial-gradient(circle, rgba(240,245,255,0.4), rgba(200,210,230,0.2))',
      borderRadius: 12,
      color: '#667',
      fontSize: 12,
      fontFamily: 'sans-serif',
    },
    children: 'Lottie (web stub)',
  });
}
const x0 = '4.8.0',
  m0 = { g: 'LottieFiles AE 3.5.3', a: '', k: '', d: '', tc: '' },
  k0 = 30,
  d0 = 0,
  y0 = 90,
  h0 = 500,
  p0 = 500,
  u0 = 'airplane',
  f0 = 0,
  g0 = [
    {
      id: 'comp_0',
      layers: [
        {
          ddd: 0,
          ind: 1,
          ty: 0,
          nm: 'Comp 1',
          refId: 'comp_1',
          sr: 1,
          ks: {
            o: { a: 0, k: 60, ix: 11 },
            r: { a: 0, k: 0, ix: 10 },
            p: {
              a: 1,
              k: [
                {
                  i: { x: 0, y: 1 },
                  o: { x: 0, y: 0 },
                  t: 0,
                  s: [156, 263.5, 0],
                  to: [-0.75, -0.417, 0],
                  ti: [0, 0, 0],
                },
                {
                  i: { x: 1, y: 1 },
                  o: { x: 1, y: 0 },
                  t: 30,
                  s: [151.5, 261, 0],
                  to: [0, 0, 0],
                  ti: [-3.167, -5.417, 0],
                },
                {
                  i: { x: 0, y: 1 },
                  o: { x: 0, y: 0 },
                  t: 45,
                  s: [156, 263.5, 0],
                  to: [3.167, 5.417, 0],
                  ti: [0, 0, 0],
                },
                {
                  i: { x: 1, y: 1 },
                  o: { x: 1, y: 0 },
                  t: 75,
                  s: [170.5, 293.5, 0],
                  to: [0, 0, 0],
                  ti: [2.417, 5, 0],
                },
                { t: 90, s: [156, 263.5, 0] },
              ],
              ix: 2,
            },
            a: { a: 0, k: [500, 250, 0], ix: 1 },
            s: { a: 0, k: [23.6, 23.6, 100], ix: 6 },
          },
          ao: 0,
          w: 500,
          h: 500,
          ip: 0,
          op: 90,
          st: 0,
          bm: 0,
        },
        {
          ddd: 0,
          ind: 2,
          ty: 0,
          nm: 'Comp 1',
          refId: 'comp_1',
          sr: 1,
          ks: {
            o: { a: 0, k: 60, ix: 11 },
            r: { a: 0, k: 0, ix: 10 },
            p: {
              a: 1,
              k: [
                {
                  i: { x: 0, y: 1 },
                  o: { x: 0, y: 0 },
                  t: 0,
                  s: [145, 285, 0],
                  to: [-0.25, 1.833, 0],
                  ti: [0, 0, 0],
                },
                {
                  i: { x: 1, y: 1 },
                  o: { x: 1, y: 0 },
                  t: 30,
                  s: [143.5, 296, 0],
                  to: [0, 0, 0],
                  ti: [-4.167, 6.583, 0],
                },
                {
                  i: { x: 0, y: 1 },
                  o: { x: 0, y: 0 },
                  t: 45,
                  s: [145, 285, 0],
                  to: [4.167, -6.583, 0],
                  ti: [0, 0, 0],
                },
                {
                  i: { x: 1, y: 1 },
                  o: { x: 1, y: 0 },
                  t: 75,
                  s: [168.5, 256.5, 0],
                  to: [0, 0, 0],
                  ti: [3.917, -4.75, 0],
                },
                { t: 90, s: [145, 285, 0] },
              ],
              ix: 2,
            },
            a: { a: 0, k: [500, 250, 0], ix: 1 },
            s: { a: 0, k: [23.6, 23.6, 100], ix: 6 },
          },
          ao: 0,
          w: 500,
          h: 500,
          ip: 0,
          op: 90,
          st: 0,
          bm: 0,
        },
        {
          ddd: 0,
          ind: 3,
          ty: 4,
          nm: 'propeller Outlines',
          sr: 1,
          ks: {
            o: { a: 0, k: 100, ix: 11 },
            r: { a: 0, k: 0, ix: 10 },
            p: { a: 0, k: [455.728, 261.475, 0], ix: 2 },
            a: { a: 0, k: [38.125, 33.22, 0], ix: 1 },
            s: { a: 0, k: [19.832, 100, 100], ix: 6 },
          },
          ao: 0,
          shapes: [
            {
              ty: 'gr',
              it: [
                {
                  ty: 'gr',
                  it: [
                    {
                      ind: 0,
                      ty: 'sh',
                      ix: 1,
                      ks: {
                        a: 0,
                        k: {
                          i: [
                            [7.276, 4.201],
                            [2.605, -4.512],
                            [-7.276, -4.201],
                            [-2.605, 4.512],
                          ],
                          o: [
                            [-7.276, -4.201],
                            [-2.605, 4.511],
                            [7.276, 4.201],
                            [2.604, -4.511],
                          ],
                          v: [
                            [9.102, -6.856],
                            [-13.773, -9.171],
                            [-0.331, 9.482],
                            [12.576, 6.041],
                          ],
                          c: !0,
                        },
                        ix: 2,
                      },
                      nm: 'Path 1',
                      mn: 'ADBE Vector Shape - Group',
                      hd: !1,
                    },
                    {
                      ty: 'st',
                      c: {
                        a: 0,
                        k: [0.219607858097, 0.219607858097, 0.219607858097, 1],
                        ix: 3,
                      },
                      o: { a: 0, k: 100, ix: 4 },
                      w: { a: 0, k: 2, ix: 5 },
                      lc: 2,
                      lj: 2,
                      bm: 0,
                      nm: 'Stroke 1',
                      mn: 'ADBE Vector Graphic - Stroke',
                      hd: !1,
                    },
                    {
                      ty: 'fl',
                      c: {
                        a: 0,
                        k: [0.698039215686, 0.560784313725, 0.435294147566, 1],
                        ix: 4,
                      },
                      o: { a: 0, k: 100, ix: 5 },
                      r: 1,
                      bm: 0,
                      nm: 'Fill 1',
                      mn: 'ADBE Vector Graphic - Fill',
                      hd: !1,
                    },
                    {
                      ty: 'tr',
                      p: { a: 0, k: [54.871, 47.758], ix: 2 },
                      a: { a: 0, k: [0, 0], ix: 1 },
                      s: { a: 0, k: [100, 100], ix: 3 },
                      r: { a: 0, k: 0, ix: 6 },
                      o: { a: 0, k: 100, ix: 7 },
                      sk: { a: 0, k: 0, ix: 4 },
                      sa: { a: 0, k: 0, ix: 5 },
                      nm: 'Transform',
                    },
                  ],
                  nm: 'Group 1',
                  np: 3,
                  cix: 2,
                  bm: 0,
                  ix: 1,
                  mn: 'ADBE Vector Group',
                  hd: !1,
                },
                {
                  ty: 'gr',
                  it: [
                    {
                      ind: 0,
                      ty: 'sh',
                      ix: 1,
                      ks: {
                        a: 0,
                        k: {
                          i: [
                            [-7.276, 4.201],
                            [-2.605, -4.512],
                            [7.276, -4.201],
                            [2.605, 4.512],
                          ],
                          o: [
                            [7.276, -4.201],
                            [2.605, 4.512],
                            [-7.276, 4.201],
                            [-2.604, -4.511],
                          ],
                          v: [
                            [-9.102, -6.856],
                            [13.773, -9.171],
                            [0.331, 9.482],
                            [-12.576, 6.041],
                          ],
                          c: !0,
                        },
                        ix: 2,
                      },
                      nm: 'Path 1',
                      mn: 'ADBE Vector Shape - Group',
                      hd: !1,
                    },
                    {
                      ty: 'st',
                      c: {
                        a: 0,
                        k: [0.219607858097, 0.219607858097, 0.219607858097, 1],
                        ix: 3,
                      },
                      o: { a: 0, k: 100, ix: 4 },
                      w: { a: 0, k: 2, ix: 5 },
                      lc: 2,
                      lj: 2,
                      bm: 0,
                      nm: 'Stroke 1',
                      mn: 'ADBE Vector Graphic - Stroke',
                      hd: !1,
                    },
                    {
                      ty: 'fl',
                      c: {
                        a: 0,
                        k: [0.698039215686, 0.560784313725, 0.435294147566, 1],
                        ix: 4,
                      },
                      o: { a: 0, k: 100, ix: 5 },
                      r: 1,
                      bm: 0,
                      nm: 'Fill 1',
                      mn: 'ADBE Vector Graphic - Fill',
                      hd: !1,
                    },
                    {
                      ty: 'tr',
                      p: { a: 0, k: [21.378, 47.758], ix: 2 },
                      a: { a: 0, k: [0, 0], ix: 1 },
                      s: { a: 0, k: [100, 100], ix: 3 },
                      r: { a: 0, k: 0, ix: 6 },
                      o: { a: 0, k: 100, ix: 7 },
                      sk: { a: 0, k: 0, ix: 4 },
                      sa: { a: 0, k: 0, ix: 5 },
                      nm: 'Transform',
                    },
                  ],
                  nm: 'Group 2',
                  np: 3,
                  cix: 2,
                  bm: 0,
                  ix: 2,
                  mn: 'ADBE Vector Group',
                  hd: !1,
                },
                {
                  ty: 'gr',
                  it: [
                    {
                      ind: 0,
                      ty: 'sh',
                      ix: 1,
                      ks: {
                        a: 0,
                        k: {
                          i: [
                            [0, -8.402],
                            [-5.21, 0],
                            [0, 8.402],
                            [5.209, 0],
                          ],
                          o: [
                            [0, 8.402],
                            [5.209, 0],
                            [0, -8.402],
                            [-5.21, 0],
                          ],
                          v: [
                            [-9.432, -5.756],
                            [0, 15.212],
                            [9.432, -5.756],
                            [0, -15.212],
                          ],
                          c: !0,
                        },
                        ix: 2,
                      },
                      nm: 'Path 1',
                      mn: 'ADBE Vector Shape - Group',
                      hd: !1,
                    },
                    {
                      ty: 'st',
                      c: {
                        a: 0,
                        k: [0.219607858097, 0.219607858097, 0.219607858097, 1],
                        ix: 3,
                      },
                      o: { a: 0, k: 100, ix: 4 },
                      w: { a: 0, k: 2, ix: 5 },
                      lc: 2,
                      lj: 2,
                      bm: 0,
                      nm: 'Stroke 1',
                      mn: 'ADBE Vector Graphic - Stroke',
                      hd: !1,
                    },
                    {
                      ty: 'fl',
                      c: {
                        a: 0,
                        k: [0.698039215686, 0.560784313725, 0.435294147566, 1],
                        ix: 4,
                      },
                      o: { a: 0, k: 100, ix: 5 },
                      r: 1,
                      bm: 0,
                      nm: 'Fill 1',
                      mn: 'ADBE Vector Graphic - Fill',
                      hd: !1,
                    },
                    {
                      ty: 'tr',
                      p: { a: 0, k: [38.124, 20.213], ix: 2 },
                      a: { a: 0, k: [0, 0], ix: 1 },
                      s: { a: 0, k: [100, 100], ix: 3 },
                      r: { a: 0, k: 0, ix: 6 },
                      o: { a: 0, k: 100, ix: 7 },
                      sk: { a: 0, k: 0, ix: 4 },
                      sa: { a: 0, k: 0, ix: 5 },
                      nm: 'Transform',
                    },
                  ],
                  nm: 'Group 3',
                  np: 3,
                  cix: 2,
                  bm: 0,
                  ix: 3,
                  mn: 'ADBE Vector Group',
                  hd: !1,
                },
                {
                  ty: 'tr',
                  p: { a: 0, k: [38, 38], ix: 2 },
                  a: { a: 0, k: [38, 38], ix: 1 },
                  s: { a: 0, k: [100, 100], ix: 3 },
                  r: {
                    a: 1,
                    k: [
                      {
                        i: { x: [0.833], y: [0.833] },
                        o: { x: [0.167], y: [0.167] },
                        t: 0,
                        s: [0],
                      },
                      { t: 90, s: [4320] },
                    ],
                    ix: 6,
                  },
                  o: { a: 0, k: 100, ix: 7 },
                  sk: { a: 0, k: 0, ix: 4 },
                  sa: { a: 0, k: 0, ix: 5 },
                  nm: 'Transform',
                },
              ],
              nm: 'Group 1',
              np: 3,
              cix: 2,
              bm: 0,
              ix: 1,
              mn: 'ADBE Vector Group',
              hd: !1,
            },
          ],
          ip: 0,
          op: 90,
          st: 0,
          bm: 0,
        },
        {
          ddd: 0,
          ind: 4,
          ty: 4,
          nm: 'propeller base Outlines',
          sr: 1,
          ks: {
            o: { a: 0, k: 100, ix: 11 },
            r: { a: 0, k: 0, ix: 10 },
            p: { a: 0, k: [443.406, 266.262, 0], ix: 2 },
            a: { a: 0, k: [20.191, 26.27, 0], ix: 1 },
            s: { a: 0, k: [100, 100, 100], ix: 6 },
          },
          ao: 0,
          shapes: [
            {
              ty: 'gr',
              it: [
                {
                  ind: 0,
                  ty: 'sh',
                  ix: 1,
                  ks: {
                    a: 0,
                    k: {
                      i: [
                        [0, 0],
                        [0, -10.71],
                        [0, 0],
                      ],
                      o: [
                        [0, 0],
                        [0, 10.71],
                        [0, 0],
                      ],
                      v: [
                        [-9.538, -21.27],
                        [9.651, 0],
                        [-9.651, 21.27],
                      ],
                      c: !0,
                    },
                    ix: 2,
                  },
                  nm: 'Path 1',
                  mn: 'ADBE Vector Shape - Group',
                  hd: !1,
                },
                {
                  ty: 'st',
                  c: {
                    a: 0,
                    k: [0.219607858097, 0.219607858097, 0.219607858097, 1],
                    ix: 3,
                  },
                  o: { a: 0, k: 100, ix: 4 },
                  w: { a: 0, k: 2, ix: 5 },
                  lc: 2,
                  lj: 2,
                  bm: 0,
                  nm: 'Stroke 1',
                  mn: 'ADBE Vector Graphic - Stroke',
                  hd: !1,
                },
                {
                  ty: 'fl',
                  c: {
                    a: 0,
                    k: [0.647058823529, 0.36862745098, 0.090196078431, 1],
                    ix: 4,
                  },
                  o: { a: 0, k: 100, ix: 5 },
                  r: 1,
                  bm: 0,
                  nm: 'Fill 1',
                  mn: 'ADBE Vector Graphic - Fill',
                  hd: !1,
                },
                {
                  ty: 'tr',
                  p: { a: 0, k: [14.65, 26.27], ix: 2 },
                  a: { a: 0, k: [0, 0], ix: 1 },
                  s: { a: 0, k: [100, 100], ix: 3 },
                  r: { a: 0, k: 0, ix: 6 },
                  o: { a: 0, k: 100, ix: 7 },
                  sk: { a: 0, k: 0, ix: 4 },
                  sa: { a: 0, k: 0, ix: 5 },
                  nm: 'Transform',
                },
              ],
              nm: 'Group 1',
              np: 3,
              cix: 2,
              bm: 0,
              ix: 1,
              mn: 'ADBE Vector Group',
              hd: !1,
            },
            {
              ty: 'gr',
              it: [
                {
                  ind: 0,
                  ty: 'sh',
                  ix: 1,
                  ks: {
                    a: 0,
                    k: {
                      i: [
                        [0, -2.053],
                        [-6.773, 0],
                        [0, 2.053],
                        [6.773, 0],
                      ],
                      o: [
                        [0, 2.053],
                        [6.773, 0],
                        [0, -2.053],
                        [-6.773, 0],
                      ],
                      v: [
                        [-12.263, 0],
                        [-0.001, 3.718],
                        [12.263, 0],
                        [-0.001, -3.718],
                      ],
                      c: !0,
                    },
                    ix: 2,
                  },
                  nm: 'Path 1',
                  mn: 'ADBE Vector Shape - Group',
                  hd: !1,
                },
                {
                  ty: 'st',
                  c: {
                    a: 0,
                    k: [0.219607858097, 0.219607858097, 0.219607858097, 1],
                    ix: 3,
                  },
                  o: { a: 0, k: 100, ix: 4 },
                  w: { a: 0, k: 2, ix: 5 },
                  lc: 2,
                  lj: 2,
                  bm: 0,
                  nm: 'Stroke 1',
                  mn: 'ADBE Vector Graphic - Stroke',
                  hd: !1,
                },
                {
                  ty: 'fl',
                  c: {
                    a: 0,
                    k: [0.698039215686, 0.560784313725, 0.435294147566, 1],
                    ix: 4,
                  },
                  o: { a: 0, k: 100, ix: 5 },
                  r: 1,
                  bm: 0,
                  nm: 'Fill 1',
                  mn: 'ADBE Vector Graphic - Fill',
                  hd: !1,
                },
                {
                  ty: 'tr',
                  p: { a: 0, k: [23.119, 26.27], ix: 2 },
                  a: { a: 0, k: [0, 0], ix: 1 },
                  s: { a: 0, k: [100, 100], ix: 3 },
                  r: { a: 0, k: 0, ix: 6 },
                  o: { a: 0, k: 100, ix: 7 },
                  sk: { a: 0, k: 0, ix: 4 },
                  sa: { a: 0, k: 0, ix: 5 },
                  nm: 'Transform',
                },
              ],
              nm: 'Group 2',
              np: 3,
              cix: 2,
              bm: 0,
              ix: 2,
              mn: 'ADBE Vector Group',
              hd: !1,
            },
          ],
          ip: 0,
          op: 90,
          st: 0,
          bm: 0,
        },
        {
          ddd: 0,
          ind: 5,
          ty: 4,
          nm: 'wing 1 Outlines',
          sr: 1,
          ks: {
            o: { a: 0, k: 100, ix: 11 },
            r: { a: 0, k: 0, ix: 10 },
            p: { a: 0, k: [252.615, 292.31, 0], ix: 2 },
            a: { a: 0, k: [128.732, 34.525, 0], ix: 1 },
            s: { a: 0, k: [100, 100, 100], ix: 6 },
          },
          ao: 0,
          shapes: [
            {
              ty: 'gr',
              it: [
                {
                  ind: 0,
                  ty: 'sh',
                  ix: 1,
                  ks: {
                    a: 1,
                    k: [
                      {
                        i: { x: 0, y: 1 },
                        o: { x: 0, y: 0 },
                        t: 0,
                        s: [
                          {
                            i: [
                              [0, 0],
                              [18.97, -1.065],
                              [0.611, 1.066],
                              [0, 0],
                            ],
                            o: [
                              [0, 0],
                              [-18.971, 1.066],
                              [-0.611, -1.066],
                              [0, 0],
                            ],
                            v: [
                              [28.159, -5.964],
                              [-1.088, 4.898],
                              [-27.548, 3.406],
                              [-7.773, -5.964],
                            ],
                            c: !1,
                          },
                        ],
                      },
                      {
                        i: { x: 1, y: 1 },
                        o: { x: 1, y: 0 },
                        t: 30,
                        s: [
                          {
                            i: [
                              [0, 0],
                              [18.97, -1.065],
                              [0.21, 1.211],
                              [0, 0],
                            ],
                            o: [
                              [0, 0],
                              [-18.971, 1.066],
                              [-0.649, -3.751],
                              [0, 0],
                            ],
                            v: [
                              [21.909, -2.464],
                              [-0.087, 13.398],
                              [-32.048, 11.656],
                              [-10.523, -3.964],
                            ],
                            c: !1,
                          },
                        ],
                      },
                      {
                        i: { x: 0, y: 1 },
                        o: { x: 0, y: 0 },
                        t: 45,
                        s: [
                          {
                            i: [
                              [0, 0],
                              [18.97, -1.065],
                              [0.611, 1.066],
                              [0, 0],
                            ],
                            o: [
                              [0, 0],
                              [-18.971, 1.066],
                              [-0.611, -1.066],
                              [0, 0],
                            ],
                            v: [
                              [28.159, -5.964],
                              [-1.088, 4.898],
                              [-27.548, 3.406],
                              [-7.773, -5.964],
                            ],
                            c: !1,
                          },
                        ],
                      },
                      {
                        i: { x: 1, y: 1 },
                        o: { x: 1, y: 0 },
                        t: 75,
                        s: [
                          {
                            i: [
                              [0, 0],
                              [8.515, 0.088],
                              [1.223, 0.121],
                              [0, 0],
                            ],
                            o: [
                              [0, 0],
                              [-11.359, -0.118],
                              [-1.274, -0.126],
                              [0, 0],
                            ],
                            v: [
                              [36.034, -27.839],
                              [18.288, -27.727],
                              [-2.173, -27.969],
                              [-12.022, -26.714],
                            ],
                            c: !1,
                          },
                        ],
                      },
                      {
                        t: 90,
                        s: [
                          {
                            i: [
                              [0, 0],
                              [18.97, -1.065],
                              [0.611, 1.066],
                              [0, 0],
                            ],
                            o: [
                              [0, 0],
                              [-18.971, 1.066],
                              [-0.611, -1.066],
                              [0, 0],
                            ],
                            v: [
                              [28.159, -5.964],
                              [-1.088, 4.898],
                              [-27.548, 3.406],
                              [-7.773, -5.964],
                            ],
                            c: !1,
                          },
                        ],
                      },
                    ],
                    ix: 2,
                  },
                  nm: 'Path 1',
                  mn: 'ADBE Vector Shape - Group',
                  hd: !1,
                },
                {
                  ty: 'st',
                  c: {
                    a: 0,
                    k: [0.219607858097, 0.219607858097, 0.219607858097, 1],
                    ix: 3,
                  },
                  o: { a: 0, k: 100, ix: 4 },
                  w: { a: 0, k: 2, ix: 5 },
                  lc: 2,
                  lj: 2,
                  bm: 0,
                  nm: 'Stroke 1',
                  mn: 'ADBE Vector Graphic - Stroke',
                  hd: !1,
                },
                {
                  ty: 'tr',
                  p: { a: 0, k: [47.814, 22.061], ix: 2 },
                  a: { a: 0, k: [0, 0], ix: 1 },
                  s: { a: 0, k: [100, 100], ix: 3 },
                  r: { a: 0, k: 0, ix: 6 },
                  o: { a: 0, k: 100, ix: 7 },
                  sk: { a: 0, k: 0, ix: 4 },
                  sa: { a: 0, k: 0, ix: 5 },
                  nm: 'Transform',
                },
              ],
              nm: 'Group 1',
              np: 2,
              cix: 2,
              bm: 0,
              ix: 1,
              mn: 'ADBE Vector Group',
              hd: !1,
            },
            {
              ty: 'gr',
              it: [
                {
                  ind: 0,
                  ty: 'sh',
                  ix: 1,
                  ks: {
                    a: 1,
                    k: [
                      {
                        i: { x: 0, y: 1 },
                        o: { x: 0, y: 0 },
                        t: 0,
                        s: [
                          {
                            i: [
                              [-18.889, 13.702],
                              [10.7, 0],
                              [10.538, -2.511],
                              [-2.046, -3.695],
                            ],
                            o: [
                              [4.676, -3.392],
                              [-19.992, 0],
                              [-8.794, 2.095],
                              [2.715, 4.899],
                            ],
                            v: [
                              [36.281, -2.288],
                              [20.633, -11.415],
                              [-21.189, -7.383],
                              [-38.911, 1.624],
                            ],
                            c: !0,
                          },
                        ],
                      },
                      {
                        i: { x: 1, y: 1 },
                        o: { x: 1, y: 0 },
                        t: 30,
                        s: [
                          {
                            i: [
                              [-18.889, 13.702],
                              [9.03, 2.803],
                              [12.099, -3.705],
                              [-2.046, -3.695],
                            ],
                            o: [
                              [4.676, -3.392],
                              [-17.473, -5.424],
                              [-8.644, 2.647],
                              [2.715, 4.899],
                            ],
                            v: [
                              [27.531, 8.212],
                              [31.634, -5.415],
                              [-21.938, -5.883],
                              [-40.411, 10.124],
                            ],
                            c: !0,
                          },
                        ],
                      },
                      {
                        i: { x: 0, y: 1 },
                        o: { x: 0, y: 0 },
                        t: 45,
                        s: [
                          {
                            i: [
                              [-18.889, 13.702],
                              [10.7, 0],
                              [10.538, -2.511],
                              [-2.046, -3.695],
                            ],
                            o: [
                              [4.676, -3.392],
                              [-19.992, 0],
                              [-8.794, 2.095],
                              [2.715, 4.899],
                            ],
                            v: [
                              [36.281, -2.288],
                              [20.633, -11.415],
                              [-21.189, -7.383],
                              [-38.911, 1.624],
                            ],
                            c: !0,
                          },
                        ],
                      },
                      {
                        i: { x: 1, y: 1 },
                        o: { x: 1, y: 0 },
                        t: 75,
                        s: [
                          {
                            i: [
                              [-21.87, 0.681],
                              [7.635, 0.346],
                              [11.599, -0.955],
                              [-4.222, -0.103],
                            ],
                            o: [
                              [1.63, -0.051],
                              [-19.428, -0.879],
                              [-9.01, 0.742],
                              [11.821, 0.287],
                            ],
                            v: [
                              [47.736, -20.082],
                              [38.089, -31.709],
                              [-13.439, -30.633],
                              [-7.66, -20.376],
                            ],
                            c: !0,
                          },
                        ],
                      },
                      {
                        t: 90,
                        s: [
                          {
                            i: [
                              [-18.889, 13.702],
                              [10.7, 0],
                              [10.538, -2.511],
                              [-2.046, -3.695],
                            ],
                            o: [
                              [4.676, -3.392],
                              [-19.992, 0],
                              [-8.794, 2.095],
                              [2.715, 4.899],
                            ],
                            v: [
                              [36.281, -2.288],
                              [20.633, -11.415],
                              [-21.189, -7.383],
                              [-38.911, 1.624],
                            ],
                            c: !0,
                          },
                        ],
                      },
                    ],
                    ix: 2,
                  },
                  nm: 'Path 1',
                  mn: 'ADBE Vector Shape - Group',
                  hd: !1,
                },
                {
                  ty: 'st',
                  c: {
                    a: 0,
                    k: [0.219607858097, 0.219607858097, 0.219607858097, 1],
                    ix: 3,
                  },
                  o: { a: 0, k: 100, ix: 4 },
                  w: { a: 0, k: 2, ix: 5 },
                  lc: 2,
                  lj: 2,
                  bm: 0,
                  nm: 'Stroke 1',
                  mn: 'ADBE Vector Graphic - Stroke',
                  hd: !1,
                },
                {
                  ty: 'fl',
                  c: {
                    a: 0,
                    k: [0.964705942191, 0.560784313725, 0.113725497676, 1],
                    ix: 4,
                  },
                  o: { a: 0, k: 100, ix: 5 },
                  r: 1,
                  bm: 0,
                  nm: 'Fill 1',
                  mn: 'ADBE Vector Graphic - Fill',
                  hd: !1,
                },
                {
                  ty: 'tr',
                  p: { a: 0, k: [45.956, 26.053], ix: 2 },
                  a: { a: 0, k: [0, 0], ix: 1 },
                  s: { a: 0, k: [100, 100], ix: 3 },
                  r: { a: 0, k: 0, ix: 6 },
                  o: { a: 0, k: 100, ix: 7 },
                  sk: { a: 0, k: 0, ix: 4 },
                  sa: { a: 0, k: 0, ix: 5 },
                  nm: 'Transform',
                },
              ],
              nm: 'Group 2',
              np: 3,
              cix: 2,
              bm: 0,
              ix: 2,
              mn: 'ADBE Vector Group',
              hd: !1,
            },
            {
              ty: 'gr',
              it: [
                {
                  ind: 0,
                  ty: 'sh',
                  ix: 1,
                  ks: {
                    a: 1,
                    k: [
                      {
                        i: { x: 0, y: 1 },
                        o: { x: 0, y: 0 },
                        t: 0,
                        s: [
                          {
                            i: [
                              [0, 0],
                              [7.401, -2.771],
                              [10.158, 5.116],
                              [0, 0],
                            ],
                            o: [
                              [0, 0],
                              [-7.401, 2.771],
                              [-10.159, -5.116],
                              [0, 0],
                            ],
                            v: [
                              [39.382, -16.73],
                              [20.899, 11.615],
                              [-26.864, 11.615],
                              [-39.382, -15.549],
                            ],
                            c: !1,
                          },
                        ],
                      },
                      {
                        i: { x: 1, y: 1 },
                        o: { x: 1, y: 0 },
                        t: 30,
                        s: [
                          {
                            i: [
                              [0, 0],
                              [7.401, -2.771],
                              [10.158, 5.116],
                              [0, 0],
                            ],
                            o: [
                              [0, 0],
                              [-7.401, 2.771],
                              [-10.159, -5.116],
                              [0, 0],
                            ],
                            v: [
                              [36.882, -11.73],
                              [24.649, 28.615],
                              [-23.114, 28.615],
                              [-39.882, -10.799],
                            ],
                            c: !1,
                          },
                        ],
                      },
                      {
                        i: { x: 0, y: 1 },
                        o: { x: 0, y: 0 },
                        t: 45,
                        s: [
                          {
                            i: [
                              [0, 0],
                              [7.401, -2.771],
                              [10.158, 5.116],
                              [0, 0],
                            ],
                            o: [
                              [0, 0],
                              [-7.401, 2.771],
                              [-10.159, -5.116],
                              [0, 0],
                            ],
                            v: [
                              [39.382, -16.73],
                              [20.899, 11.615],
                              [-26.864, 11.615],
                              [-39.382, -15.549],
                            ],
                            c: !1,
                          },
                        ],
                      },
                      {
                        i: { x: 1, y: 1 },
                        o: { x: 1, y: 0 },
                        t: 75,
                        s: [
                          {
                            i: [
                              [0, 0],
                              [12.776, 0.052],
                              [11.367, -0.384],
                              [0, 0],
                            ],
                            o: [
                              [0, 0],
                              [-7.903, -0.032],
                              [-8.962, 0.302],
                              [0, 0],
                            ],
                            v: [
                              [27.382, -49.605],
                              [3.774, -51.135],
                              [-30.864, -50.635],
                              [-52.757, -49.299],
                            ],
                            c: !1,
                          },
                        ],
                      },
                      {
                        t: 90,
                        s: [
                          {
                            i: [
                              [0, 0],
                              [7.401, -2.771],
                              [10.158, 5.116],
                              [0, 0],
                            ],
                            o: [
                              [0, 0],
                              [-7.401, 2.771],
                              [-10.159, -5.116],
                              [0, 0],
                            ],
                            v: [
                              [39.382, -16.73],
                              [20.899, 11.615],
                              [-26.864, 11.615],
                              [-39.382, -15.549],
                            ],
                            c: !1,
                          },
                        ],
                      },
                    ],
                    ix: 2,
                  },
                  nm: 'Path 1',
                  mn: 'ADBE Vector Shape - Group',
                  hd: !1,
                },
                {
                  ty: 'st',
                  c: {
                    a: 0,
                    k: [0.219607858097, 0.219607858097, 0.219607858097, 1],
                    ix: 3,
                  },
                  o: { a: 0, k: 100, ix: 4 },
                  w: { a: 0, k: 2, ix: 5 },
                  lc: 2,
                  lj: 2,
                  bm: 0,
                  nm: 'Stroke 1',
                  mn: 'ADBE Vector Graphic - Stroke',
                  hd: !1,
                },
                {
                  ty: 'tr',
                  p: { a: 0, k: [194.817, 34.673], ix: 2 },
                  a: { a: 0, k: [0, 0], ix: 1 },
                  s: { a: 0, k: [100, 100], ix: 3 },
                  r: { a: 0, k: 0, ix: 6 },
                  o: { a: 0, k: 100, ix: 7 },
                  sk: { a: 0, k: 0, ix: 4 },
                  sa: { a: 0, k: 0, ix: 5 },
                  nm: 'Transform',
                },
              ],
              nm: 'Group 3',
              np: 2,
              cix: 2,
              bm: 0,
              ix: 3,
              mn: 'ADBE Vector Group',
              hd: !1,
            },
            {
              ty: 'gr',
              it: [
                {
                  ind: 0,
                  ty: 'sh',
                  ix: 1,
                  ks: {
                    a: 1,
                    k: [
                      {
                        i: { x: 0, y: 1 },
                        o: { x: 0, y: 0 },
                        t: 0,
                        s: [
                          {
                            i: [
                              [-17.6, -19.991],
                              [13.328, -2.915],
                              [19.481, 16.483],
                              [-5.692, 3.599],
                            ],
                            o: [
                              [4.32, 4.907],
                              [-24.678, 5.399],
                              [-8.762, -7.413],
                              [5.691, -3.598],
                            ],
                            v: [
                              [60.621, -9.534],
                              [42.052, 24.126],
                              [-49.43, 11.763],
                              [-59.248, -9.784],
                            ],
                            c: !0,
                          },
                        ],
                      },
                      {
                        i: { x: 1, y: 1 },
                        o: { x: 1, y: 0 },
                        t: 30,
                        s: [
                          {
                            i: [
                              [-17.6, -19.991],
                              [13.328, -2.915],
                              [19.481, 16.483],
                              [-5.692, 3.599],
                            ],
                            o: [
                              [4.32, 4.907],
                              [-24.678, 5.399],
                              [-8.762, -7.413],
                              [5.691, -3.598],
                            ],
                            v: [
                              [67.371, -3.034],
                              [44.302, 45.626],
                              [-47.18, 33.263],
                              [-60.998, -6.034],
                            ],
                            c: !0,
                          },
                        ],
                      },
                      {
                        i: { x: 0, y: 1 },
                        o: { x: 0, y: 0 },
                        t: 45,
                        s: [
                          {
                            i: [
                              [-17.6, -19.991],
                              [13.328, -2.915],
                              [19.481, 16.483],
                              [-5.692, 3.599],
                            ],
                            o: [
                              [4.32, 4.907],
                              [-24.678, 5.399],
                              [-8.762, -7.413],
                              [5.691, -3.598],
                            ],
                            v: [
                              [60.621, -9.534],
                              [42.052, 24.126],
                              [-49.43, 11.763],
                              [-59.248, -9.784],
                            ],
                            c: !0,
                          },
                        ],
                      },
                      {
                        i: { x: 1, y: 1 },
                        o: { x: 1, y: 0 },
                        t: 75,
                        s: [
                          {
                            i: [
                              [-19.528, -7.776],
                              [8.34, -0.886],
                              [7.339, 3.177],
                              [-5.692, 3.599],
                            ],
                            o: [
                              [6.074, 2.419],
                              [-24.143, 2.564],
                              [-4.046, -1.752],
                              [5.691, -3.598],
                            ],
                            v: [
                              [43.121, -47.534],
                              [54.736, -29.874],
                              [-44.246, -29.737],
                              [-63.748, -46.534],
                            ],
                            c: !0,
                          },
                        ],
                      },
                      {
                        t: 90,
                        s: [
                          {
                            i: [
                              [-17.6, -19.991],
                              [13.328, -2.915],
                              [19.481, 16.483],
                              [-5.692, 3.599],
                            ],
                            o: [
                              [4.32, 4.907],
                              [-24.678, 5.399],
                              [-8.762, -7.413],
                              [5.691, -3.598],
                            ],
                            v: [
                              [60.621, -9.534],
                              [42.052, 24.126],
                              [-49.43, 11.763],
                              [-59.248, -9.784],
                            ],
                            c: !0,
                          },
                        ],
                      },
                    ],
                    ix: 2,
                  },
                  nm: 'Path 1',
                  mn: 'ADBE Vector Shape - Group',
                  hd: !1,
                },
                {
                  ty: 'st',
                  c: {
                    a: 0,
                    k: [0.219607858097, 0.219607858097, 0.219607858097, 1],
                    ix: 3,
                  },
                  o: { a: 0, k: 100, ix: 4 },
                  w: { a: 0, k: 2, ix: 5 },
                  lc: 2,
                  lj: 2,
                  bm: 0,
                  nm: 'Stroke 1',
                  mn: 'ADBE Vector Graphic - Stroke',
                  hd: !1,
                },
                {
                  ty: 'fl',
                  c: {
                    a: 0,
                    k: [0.964705942191, 0.560784313725, 0.113725497676, 1],
                    ix: 4,
                  },
                  o: { a: 0, k: 100, ix: 5 },
                  r: 1,
                  bm: 0,
                  nm: 'Fill 1',
                  mn: 'ADBE Vector Graphic - Fill',
                  hd: !1,
                },
                {
                  ty: 'tr',
                  p: { a: 0, k: [187.524, 34.525], ix: 2 },
                  a: { a: 0, k: [0, 0], ix: 1 },
                  s: { a: 0, k: [100, 100], ix: 3 },
                  r: { a: 0, k: 0, ix: 6 },
                  o: { a: 0, k: 100, ix: 7 },
                  sk: { a: 0, k: 0, ix: 4 },
                  sa: { a: 0, k: 0, ix: 5 },
                  nm: 'Transform',
                },
              ],
              nm: 'Group 4',
              np: 3,
              cix: 2,
              bm: 0,
              ix: 4,
              mn: 'ADBE Vector Group',
              hd: !1,
            },
          ],
          ip: 0,
          op: 90,
          st: 0,
          bm: 0,
        },
        {
          ddd: 0,
          ind: 6,
          ty: 4,
          nm: 'window Outlines',
          sr: 1,
          ks: {
            o: { a: 0, k: 100, ix: 11 },
            r: { a: 0, k: 0, ix: 10 },
            p: {
              a: 1,
              k: [
                {
                  i: { x: 0, y: 1 },
                  o: { x: 0, y: 0 },
                  t: 0,
                  s: [329.967, 257.529, 0],
                  to: [0, 2.125, 0],
                  ti: [0, 0, 0],
                },
                {
                  i: { x: 1, y: 1 },
                  o: { x: 1, y: 0 },
                  t: 30,
                  s: [329.967, 270.279, 0],
                  to: [0, 0, 0],
                  ti: [0, 3.292, 0],
                },
                {
                  i: { x: 0, y: 1 },
                  o: { x: 0, y: 0 },
                  t: 45,
                  s: [329.967, 257.529, 0],
                  to: [0, -3.292, 0],
                  ti: [0, 0, 0],
                },
                {
                  i: { x: 0.833, y: 0.833 },
                  o: { x: 1, y: 0 },
                  t: 75,
                  s: [329.967, 250.529, 0],
                  to: [0, 0, 0],
                  ti: [0, -1.167, 0],
                },
                { t: 90, s: [329.967, 257.529, 0] },
              ],
              ix: 2,
            },
            a: { a: 0, k: [75.852, 47.57, 0], ix: 1 },
            s: { a: 0, k: [100, 100, 100], ix: 6 },
          },
          ao: 0,
          shapes: [
            {
              ty: 'gr',
              it: [
                {
                  ind: 0,
                  ty: 'sh',
                  ix: 1,
                  ks: {
                    a: 1,
                    k: [
                      {
                        i: { x: 0, y: 1 },
                        o: { x: 0.079, y: 0 },
                        t: 45,
                        s: [
                          {
                            i: [
                              [-3.886, -0.957],
                              [1.296, -2.793],
                              [1.025, 2.395],
                              [-0.91, 2.598],
                            ],
                            o: [
                              [2.183, 0.538],
                              [-0.98, 2.11],
                              [-1.88, -4.392],
                              [0.906, -2.586],
                            ],
                            v: [
                              [14.808, -15.719],
                              [17.518, 14.566],
                              [-16.934, 8.271],
                              [-17.665, 0.471],
                            ],
                            c: !0,
                          },
                        ],
                      },
                      {
                        i: { x: 0.882, y: 1 },
                        o: { x: 1, y: 0 },
                        t: 75,
                        s: [
                          {
                            i: [
                              [-3.886, -0.957],
                              [-5.447, -10.539],
                              [1.025, 2.395],
                              [-0.91, 2.598],
                            ],
                            o: [
                              [2.183, 0.538],
                              [1.068, 2.067],
                              [-1.88, -4.392],
                              [0.906, -2.586],
                            ],
                            v: [
                              [17.308, -9.219],
                              [19.518, 14.566],
                              [-14.684, 11.771],
                              [-16.165, 5.721],
                            ],
                            c: !0,
                          },
                        ],
                      },
                      {
                        t: 90,
                        s: [
                          {
                            i: [
                              [-3.886, -0.957],
                              [1.296, -2.793],
                              [1.025, 2.395],
                              [-0.91, 2.598],
                            ],
                            o: [
                              [2.183, 0.538],
                              [-0.98, 2.11],
                              [-1.88, -4.392],
                              [0.906, -2.586],
                            ],
                            v: [
                              [14.808, -15.719],
                              [17.518, 14.566],
                              [-16.934, 8.271],
                              [-17.665, 0.471],
                            ],
                            c: !0,
                          },
                        ],
                      },
                    ],
                    ix: 2,
                  },
                  nm: 'Path 1',
                  mn: 'ADBE Vector Shape - Group',
                  hd: !1,
                },
                {
                  ty: 'st',
                  c: {
                    a: 0,
                    k: [0.219607858097, 0.219607858097, 0.219607858097, 1],
                    ix: 3,
                  },
                  o: { a: 0, k: 100, ix: 4 },
                  w: { a: 0, k: 2, ix: 5 },
                  lc: 2,
                  lj: 2,
                  bm: 0,
                  nm: 'Stroke 1',
                  mn: 'ADBE Vector Graphic - Stroke',
                  hd: !1,
                },
                {
                  ty: 'fl',
                  c: { a: 0, k: [0.882353001015, 0.952941236309, 1, 1], ix: 4 },
                  o: { a: 0, k: 100, ix: 5 },
                  r: 1,
                  bm: 0,
                  nm: 'Fill 1',
                  mn: 'ADBE Vector Graphic - Fill',
                  hd: !1,
                },
                {
                  ty: 'tr',
                  p: { a: 0, k: [42.064, 47.014], ix: 2 },
                  a: { a: 0, k: [18.25, 15.5], ix: 1 },
                  s: { a: 0, k: [100, 100], ix: 3 },
                  r: { a: 0, k: 0, ix: 6 },
                  o: { a: 0, k: 100, ix: 7 },
                  sk: { a: 0, k: 0, ix: 4 },
                  sa: { a: 0, k: 0, ix: 5 },
                  nm: 'Transform',
                },
              ],
              nm: 'Group 1',
              np: 3,
              cix: 2,
              bm: 0,
              ix: 1,
              mn: 'ADBE Vector Group',
              hd: !1,
            },
            {
              ty: 'gr',
              it: [
                {
                  ind: 0,
                  ty: 'sh',
                  ix: 1,
                  ks: {
                    a: 1,
                    k: [
                      {
                        i: { x: 0, y: 1 },
                        o: { x: 0.079, y: 0 },
                        t: 45,
                        s: [
                          {
                            i: [
                              [-2.743, -3.738],
                              [1.761, -1.906],
                              [2.835, 2.945],
                              [-1.789, 1.806],
                            ],
                            o: [
                              [2.451, 3.339],
                              [-4.905, 5.312],
                              [-3.658, -3.801],
                              [3.763, -3.8],
                            ],
                            v: [
                              [24.084, -18.061],
                              [25.498, 16.33],
                              [-23.218, 18.854],
                              [-25.47, -12.896],
                            ],
                            c: !0,
                          },
                        ],
                      },
                      {
                        i: { x: 0.882, y: 1 },
                        o: { x: 1, y: 0 },
                        t: 75,
                        s: [
                          {
                            i: [
                              [0.782, -4.57],
                              [-3.073, -4.088],
                              [2.835, 2.945],
                              [-1.789, 1.806],
                            ],
                            o: [
                              [-0.608, 3.553],
                              [4.345, 5.779],
                              [-3.658, -3.801],
                              [3.763, -3.8],
                            ],
                            v: [
                              [26.033, -10.811],
                              [27.248, 12.58],
                              [-23.468, 13.854],
                              [-23.521, -7.146],
                            ],
                            c: !0,
                          },
                        ],
                      },
                      {
                        t: 90,
                        s: [
                          {
                            i: [
                              [-2.743, -3.738],
                              [1.761, -1.906],
                              [2.835, 2.945],
                              [-1.789, 1.806],
                            ],
                            o: [
                              [2.451, 3.339],
                              [-4.905, 5.312],
                              [-3.658, -3.801],
                              [3.763, -3.8],
                            ],
                            v: [
                              [24.084, -18.061],
                              [25.498, 16.33],
                              [-23.218, 18.854],
                              [-25.47, -12.896],
                            ],
                            c: !0,
                          },
                        ],
                      },
                    ],
                    ix: 2,
                  },
                  nm: 'Path 1',
                  mn: 'ADBE Vector Shape - Group',
                  hd: !1,
                },
                {
                  ty: 'st',
                  c: {
                    a: 0,
                    k: [0.219607858097, 0.219607858097, 0.219607858097, 1],
                    ix: 3,
                  },
                  o: { a: 0, k: 100, ix: 4 },
                  w: { a: 0, k: 2, ix: 5 },
                  lc: 2,
                  lj: 2,
                  bm: 0,
                  nm: 'Stroke 1',
                  mn: 'ADBE Vector Graphic - Stroke',
                  hd: !1,
                },
                {
                  ty: 'fl',
                  c: { a: 0, k: [0.882353001015, 0.952941236309, 1, 1], ix: 4 },
                  o: { a: 0, k: 100, ix: 5 },
                  r: 1,
                  bm: 0,
                  nm: 'Fill 1',
                  mn: 'ADBE Vector Graphic - Fill',
                  hd: !1,
                },
                {
                  ty: 'tr',
                  p: { a: 0, k: [71.46, 47.549], ix: 2 },
                  a: { a: 0, k: [-0.25, 20.75], ix: 1 },
                  s: { a: 0, k: [100, 100], ix: 3 },
                  r: { a: 0, k: 0, ix: 6 },
                  o: { a: 0, k: 100, ix: 7 },
                  sk: { a: 0, k: 0, ix: 4 },
                  sa: { a: 0, k: 0, ix: 5 },
                  nm: 'Transform',
                },
              ],
              nm: 'Group 2',
              np: 3,
              cix: 2,
              bm: 0,
              ix: 2,
              mn: 'ADBE Vector Group',
              hd: !1,
            },
            {
              ty: 'gr',
              it: [
                {
                  ind: 0,
                  ty: 'sh',
                  ix: 1,
                  ks: {
                    a: 1,
                    k: [
                      {
                        i: { x: 0, y: 1 },
                        o: { x: 0.079, y: 0 },
                        t: 45,
                        s: [
                          {
                            i: [
                              [1.305, -1.358],
                              [-3.801, -0.122],
                              [0, 0],
                              [10.252, 9.331],
                            ],
                            o: [
                              [-2.183, 2.273],
                              [13.473, 0.435],
                              [0, 0],
                              [-11.985, -10.907],
                            ],
                            v: [
                              [-21.069, -16.704],
                              [-19.441, 17.626],
                              [21.207, 7.412],
                              [13, -5.299],
                            ],
                            c: !0,
                          },
                        ],
                      },
                      {
                        i: { x: 0.882, y: 1 },
                        o: { x: 1, y: 0 },
                        t: 75,
                        s: [
                          {
                            i: [
                              [1.305, -1.358],
                              [-3.801, -0.122],
                              [0, 0],
                              [10.811, 8.677],
                            ],
                            o: [
                              [-2.183, 2.273],
                              [13.473, 0.435],
                              [0, 0],
                              [-14.235, -11.426],
                            ],
                            v: [
                              [-20.819, -9.704],
                              [-19.441, 14.876],
                              [15.707, 8.912],
                              [10.5, -0.799],
                            ],
                            c: !0,
                          },
                        ],
                      },
                      {
                        t: 90,
                        s: [
                          {
                            i: [
                              [1.305, -1.358],
                              [-3.801, -0.122],
                              [0, 0],
                              [10.252, 9.331],
                            ],
                            o: [
                              [-2.183, 2.273],
                              [13.473, 0.435],
                              [0, 0],
                              [-11.985, -10.907],
                            ],
                            v: [
                              [-21.069, -16.704],
                              [-19.441, 17.626],
                              [21.207, 7.412],
                              [13, -5.299],
                            ],
                            c: !0,
                          },
                        ],
                      },
                    ],
                    ix: 2,
                  },
                  nm: 'Path 1',
                  mn: 'ADBE Vector Shape - Group',
                  hd: !1,
                },
                {
                  ty: 'st',
                  c: {
                    a: 0,
                    k: [0.219607858097, 0.219607858097, 0.219607858097, 1],
                    ix: 3,
                  },
                  o: { a: 0, k: 100, ix: 4 },
                  w: { a: 0, k: 2, ix: 5 },
                  lc: 2,
                  lj: 2,
                  bm: 0,
                  nm: 'Stroke 1',
                  mn: 'ADBE Vector Graphic - Stroke',
                  hd: !1,
                },
                {
                  ty: 'fl',
                  c: { a: 0, k: [0.882353001015, 0.952941236309, 1, 1], ix: 4 },
                  o: { a: 0, k: 100, ix: 5 },
                  r: 1,
                  bm: 0,
                  nm: 'Fill 1',
                  mn: 'ADBE Vector Graphic - Fill',
                  hd: !1,
                },
                {
                  ty: 'tr',
                  p: { a: 0, k: [102.12, 42.267], ix: 2 },
                  a: { a: 0, k: [-22.75, 17.5], ix: 1 },
                  s: { a: 0, k: [100, 100], ix: 3 },
                  r: { a: 0, k: 0, ix: 6 },
                  o: { a: 0, k: 100, ix: 7 },
                  sk: { a: 0, k: 0, ix: 4 },
                  sa: { a: 0, k: 0, ix: 5 },
                  nm: 'Transform',
                },
              ],
              nm: 'Group 3',
              np: 3,
              cix: 2,
              bm: 0,
              ix: 3,
              mn: 'ADBE Vector Group',
              hd: !1,
            },
          ],
          ip: 0,
          op: 90,
          st: 0,
          bm: 0,
        },
        {
          ddd: 0,
          ind: 7,
          ty: 4,
          nm: 'base body Outlines',
          sr: 1,
          ks: {
            o: { a: 0, k: 100, ix: 11 },
            r: { a: 0, k: 0, ix: 10 },
            p: { a: 0, k: [281.857, 241.856, 0], ix: 2 },
            a: { a: 0, k: [151.581, 67.216, 0], ix: 1 },
            s: { a: 0, k: [100, 100, 100], ix: 6 },
          },
          ao: 0,
          shapes: [
            {
              ty: 'gr',
              it: [
                {
                  ind: 0,
                  ty: 'sh',
                  ix: 1,
                  ks: {
                    a: 0,
                    k: {
                      i: [
                        [0, 0],
                        [-0.783, -13.058],
                        [0, 0],
                      ],
                      o: [
                        [0, 0],
                        [0.704, 11.735],
                        [0, 0],
                      ],
                      v: [
                        [-1.04, -26.622],
                        [-1.818, -2.061],
                        [2.601, 26.622],
                      ],
                      c: !1,
                    },
                    ix: 2,
                  },
                  nm: 'Path 1',
                  mn: 'ADBE Vector Shape - Group',
                  hd: !1,
                },
                {
                  ty: 'st',
                  c: {
                    a: 0,
                    k: [0.219607858097, 0.219607858097, 0.219607858097, 1],
                    ix: 3,
                  },
                  o: { a: 0, k: 100, ix: 4 },
                  w: { a: 0, k: 2, ix: 5 },
                  lc: 2,
                  lj: 2,
                  bm: 0,
                  nm: 'Stroke 1',
                  mn: 'ADBE Vector Graphic - Stroke',
                  hd: !1,
                },
                {
                  ty: 'tr',
                  p: { a: 0, k: [274.711, 93.684], ix: 2 },
                  a: { a: 0, k: [0, 0], ix: 1 },
                  s: { a: 0, k: [100, 100], ix: 3 },
                  r: { a: 0, k: 0, ix: 6 },
                  o: { a: 0, k: 100, ix: 7 },
                  sk: { a: 0, k: 0, ix: 4 },
                  sa: { a: 0, k: 0, ix: 5 },
                  nm: 'Transform',
                },
              ],
              nm: 'Group 1',
              np: 2,
              cix: 2,
              bm: 0,
              ix: 1,
              mn: 'ADBE Vector Group',
              hd: !1,
            },
            {
              ty: 'gr',
              it: [
                {
                  ind: 0,
                  ty: 'sh',
                  ix: 1,
                  ks: {
                    a: 1,
                    k: [
                      {
                        i: { x: 0, y: 1 },
                        o: { x: 0, y: 0 },
                        t: 0,
                        s: [
                          {
                            i: [
                              [0, 0],
                              [-2.987, 3.051],
                              [-20.624, 0.799],
                              [-37.091, 0.107],
                              [-5.025, 1.455],
                            ],
                            o: [
                              [-1.146, -3.746],
                              [0, 0],
                              [32.977, -1.279],
                              [5.996, -0.017],
                              [0, 0],
                            ],
                            v: [
                              [-51.065, 46.106],
                              [-47.544, 36.709],
                              [-32.455, -44.827],
                              [38.13, 19.496],
                              [53.079, 17.764],
                            ],
                            c: !0,
                          },
                        ],
                      },
                      {
                        i: { x: 1, y: 1 },
                        o: { x: 1, y: 0 },
                        t: 30,
                        s: [
                          {
                            i: [
                              [0, 0],
                              [-2.987, 3.051],
                              [-18.92, 1.259],
                              [-37.091, 0.107],
                              [-5.025, 1.455],
                            ],
                            o: [
                              [-1.146, -3.746],
                              [0, 0],
                              [32.028, -2.132],
                              [5.996, -0.017],
                              [0, 0],
                            ],
                            v: [
                              [-51.065, 46.106],
                              [-47.544, 36.709],
                              [-37.205, -38.452],
                              [38.13, 19.496],
                              [53.079, 17.764],
                            ],
                            c: !0,
                          },
                        ],
                      },
                      {
                        i: { x: 0, y: 1 },
                        o: { x: 0, y: 0 },
                        t: 45,
                        s: [
                          {
                            i: [
                              [0, 0],
                              [-2.987, 3.051],
                              [-20.624, 0.799],
                              [-37.091, 0.107],
                              [-5.025, 1.455],
                            ],
                            o: [
                              [-1.146, -3.746],
                              [0, 0],
                              [32.977, -1.279],
                              [5.996, -0.017],
                              [0, 0],
                            ],
                            v: [
                              [-51.065, 46.106],
                              [-47.544, 36.709],
                              [-32.455, -44.827],
                              [38.13, 19.496],
                              [53.079, 17.764],
                            ],
                            c: !0,
                          },
                        ],
                      },
                      {
                        i: { x: 1, y: 1 },
                        o: { x: 1, y: 0 },
                        t: 75,
                        s: [
                          {
                            i: [
                              [0, 0],
                              [-2.987, 3.051],
                              [-20.624, 0.799],
                              [-37.091, 0.107],
                              [-5.025, 1.455],
                            ],
                            o: [
                              [-1.146, -3.746],
                              [0, 0],
                              [32.977, -1.279],
                              [5.996, -0.017],
                              [0, 0],
                            ],
                            v: [
                              [-51.065, 46.106],
                              [-47.544, 36.709],
                              [-16.384, -39.827],
                              [38.13, 19.496],
                              [53.079, 17.764],
                            ],
                            c: !0,
                          },
                        ],
                      },
                      {
                        t: 90,
                        s: [
                          {
                            i: [
                              [0, 0],
                              [-2.987, 3.051],
                              [-20.624, 0.799],
                              [-37.091, 0.107],
                              [-5.025, 1.455],
                            ],
                            o: [
                              [-1.146, -3.746],
                              [0, 0],
                              [32.977, -1.279],
                              [5.996, -0.017],
                              [0, 0],
                            ],
                            v: [
                              [-51.065, 46.106],
                              [-47.544, 36.709],
                              [-32.455, -44.827],
                              [38.13, 19.496],
                              [53.079, 17.764],
                            ],
                            c: !0,
                          },
                        ],
                      },
                    ],
                    ix: 2,
                  },
                  nm: 'Path 1',
                  mn: 'ADBE Vector Shape - Group',
                  hd: !1,
                },
                {
                  ty: 'fl',
                  c: {
                    a: 0,
                    k: [0.823529471603, 0.176470588235, 0.172549019608, 1],
                    ix: 4,
                  },
                  o: { a: 0, k: 100, ix: 5 },
                  r: 1,
                  bm: 0,
                  nm: 'Fill 1',
                  mn: 'ADBE Vector Graphic - Fill',
                  hd: !1,
                },
                {
                  ty: 'tr',
                  p: { a: 0, k: [59.599, 51.678], ix: 2 },
                  a: { a: 0, k: [0, 0], ix: 1 },
                  s: { a: 0, k: [100, 100], ix: 3 },
                  r: { a: 0, k: 0, ix: 6 },
                  o: { a: 0, k: 100, ix: 7 },
                  sk: { a: 0, k: 0, ix: 4 },
                  sa: { a: 0, k: 0, ix: 5 },
                  nm: 'Transform',
                },
              ],
              nm: 'Group 2',
              np: 2,
              cix: 2,
              bm: 0,
              ix: 2,
              mn: 'ADBE Vector Group',
              hd: !1,
            },
            {
              ty: 'gr',
              it: [
                {
                  ind: 0,
                  ty: 'sh',
                  ix: 1,
                  ks: {
                    a: 1,
                    k: [
                      {
                        i: { x: 0, y: 1 },
                        o: { x: 0, y: 0 },
                        t: 0,
                        s: [
                          {
                            i: [
                              [0, 0],
                              [-3.146, -2.75],
                              [-81.722, 0],
                              [0, 0],
                              [0, 0],
                              [84.667, 0],
                            ],
                            o: [
                              [0.194, 2.501],
                              [17.047, 14.902],
                              [81.723, 0],
                              [0, 0],
                              [0, 0],
                              [-129.141, 0],
                            ],
                            v: [
                              [-144.514, -16.174],
                              [-139.584, -8.553],
                              [37.904, 16.174],
                              [144.354, 0.339],
                              [144.515, -11.911],
                              [39.577, 9.463],
                            ],
                            c: !0,
                          },
                        ],
                      },
                      {
                        i: { x: 1, y: 1 },
                        o: { x: 1, y: 0 },
                        t: 30,
                        s: [
                          {
                            i: [
                              [0, 0],
                              [-3.146, -2.75],
                              [-81.722, 0],
                              [0, 0],
                              [0, 0],
                              [84.667, 0],
                            ],
                            o: [
                              [0.194, 2.501],
                              [17.047, 14.902],
                              [81.723, 0],
                              [0, 0],
                              [0, 0],
                              [-129.141, 0],
                            ],
                            v: [
                              [-143.639, -13.924],
                              [-139.584, -8.553],
                              [37.904, 16.174],
                              [144.354, 0.339],
                              [144.555, -6.786],
                              [38.201, 12.838],
                            ],
                            c: !0,
                          },
                        ],
                      },
                      {
                        i: { x: 0, y: 1 },
                        o: { x: 0, y: 0 },
                        t: 45,
                        s: [
                          {
                            i: [
                              [0, 0],
                              [-3.146, -2.75],
                              [-81.722, 0],
                              [0, 0],
                              [0, 0],
                              [84.667, 0],
                            ],
                            o: [
                              [0.194, 2.501],
                              [17.047, 14.902],
                              [81.723, 0],
                              [0, 0],
                              [0, 0],
                              [-129.141, 0],
                            ],
                            v: [
                              [-144.514, -16.174],
                              [-139.584, -8.553],
                              [37.904, 16.174],
                              [144.354, 0.339],
                              [144.515, -11.911],
                              [39.577, 9.463],
                            ],
                            c: !0,
                          },
                        ],
                      },
                      {
                        i: { x: 1, y: 1 },
                        o: { x: 1, y: 0 },
                        t: 75,
                        s: [
                          {
                            i: [
                              [0, 0],
                              [-3.146, -2.75],
                              [-81.722, 0],
                              [0, 0],
                              [0, 0],
                              [84.667, 0],
                            ],
                            o: [
                              [0.194, 2.501],
                              [17.047, 14.902],
                              [81.723, 0],
                              [0, 0],
                              [0, 0],
                              [-129.141, 0],
                            ],
                            v: [
                              [-144.514, -16.174],
                              [-139.584, -8.553],
                              [37.903, 16.174],
                              [144.354, 0.339],
                              [144.055, -27.161],
                              [39.429, -5.038],
                            ],
                            c: !0,
                          },
                        ],
                      },
                      {
                        t: 90,
                        s: [
                          {
                            i: [
                              [0, 0],
                              [-3.146, -2.75],
                              [-81.722, 0],
                              [0, 0],
                              [0, 0],
                              [84.667, 0],
                            ],
                            o: [
                              [0.194, 2.501],
                              [17.047, 14.902],
                              [81.723, 0],
                              [0, 0],
                              [0, 0],
                              [-129.141, 0],
                            ],
                            v: [
                              [-144.514, -16.174],
                              [-139.584, -8.553],
                              [37.904, 16.174],
                              [144.354, 0.339],
                              [144.515, -11.911],
                              [39.577, 9.463],
                            ],
                            c: !0,
                          },
                        ],
                      },
                    ],
                    ix: 2,
                  },
                  nm: 'Path 1',
                  mn: 'ADBE Vector Shape - Group',
                  hd: !1,
                },
                {
                  ty: 'fl',
                  c: {
                    a: 0,
                    k: [0.698039215686, 0.403921598547, 0.133333333333, 1],
                    ix: 4,
                  },
                  o: { a: 0, k: 100, ix: 5 },
                  r: 1,
                  bm: 0,
                  nm: 'Fill 1',
                  mn: 'ADBE Vector Graphic - Fill',
                  hd: !1,
                },
                {
                  ty: 'tr',
                  p: { a: 0, k: [152.794, 112.583], ix: 2 },
                  a: { a: 0, k: [0, 0], ix: 1 },
                  s: { a: 0, k: [100, 100], ix: 3 },
                  r: { a: 0, k: 0, ix: 6 },
                  o: { a: 0, k: 100, ix: 7 },
                  sk: { a: 0, k: 0, ix: 4 },
                  sa: { a: 0, k: 0, ix: 5 },
                  nm: 'Transform',
                },
              ],
              nm: 'Group 3',
              np: 2,
              cix: 2,
              bm: 0,
              ix: 3,
              mn: 'ADBE Vector Group',
              hd: !1,
            },
            {
              ty: 'gr',
              it: [
                {
                  ind: 0,
                  ty: 'sh',
                  ix: 1,
                  ks: {
                    a: 1,
                    k: [
                      {
                        i: { x: 0, y: 1 },
                        o: { x: 0, y: 0 },
                        t: 0,
                        s: [
                          {
                            i: [
                              [-23.035, -1.078],
                              [-36.595, 0],
                              [-67.664, 0],
                              [0, 0],
                              [0, 0],
                              [0, 0],
                              [81.722, 0],
                              [17.048, 14.903],
                              [-4.561, 4.657],
                            ],
                            o: [
                              [33.621, 1.573],
                              [36.594, 0],
                              [56.805, 0],
                              [11.26, 0],
                              [0, 0],
                              [0, 0],
                              [-81.722, 0],
                              [-7.013, -6.131],
                              [0, 0],
                            ],
                            v: [
                              [-123.546, -61.139],
                              [-53.691, 3.324],
                              [62.489, -29.087],
                              [122.09, -0.155],
                              [146.47, 3.219],
                              [146.581, 45.753],
                              [39.222, 62.216],
                              [-139.193, 37.088],
                              [-140.062, 20.691],
                            ],
                            c: !0,
                          },
                        ],
                      },
                      {
                        i: { x: 1, y: 1 },
                        o: { x: 1, y: 0 },
                        t: 30,
                        s: [
                          {
                            i: [
                              [-20.061, 0.408],
                              [-36.595, 0],
                              [-67.664, 0],
                              [0, 0],
                              [0, 0],
                              [0, 0],
                              [81.722, 0],
                              [17.048, 14.903],
                              [-4.561, 4.657],
                            ],
                            o: [
                              [31.311, -0.636],
                              [36.594, 0],
                              [56.805, 0],
                              [11.26, 0],
                              [0, 0],
                              [0, 0],
                              [-81.722, 0],
                              [-7.013, -6.131],
                              [0, 0],
                            ],
                            v: [
                              [-129.296, -54.764],
                              [-53.691, 3.324],
                              [62.989, -24.087],
                              [122.09, -0.155],
                              [146.47, 3.219],
                              [146.581, 45.753],
                              [39.222, 62.216],
                              [-139.193, 37.088],
                              [-140.062, 20.691],
                            ],
                            c: !0,
                          },
                        ],
                      },
                      {
                        i: { x: 0, y: 1 },
                        o: { x: 0, y: 0 },
                        t: 45,
                        s: [
                          {
                            i: [
                              [-23.035, -1.078],
                              [-36.595, 0],
                              [-67.664, 0],
                              [0, 0],
                              [0, 0],
                              [0, 0],
                              [81.722, 0],
                              [17.048, 14.903],
                              [-4.561, 4.657],
                            ],
                            o: [
                              [33.621, 1.573],
                              [36.594, 0],
                              [56.805, 0],
                              [11.26, 0],
                              [0, 0],
                              [0, 0],
                              [-81.722, 0],
                              [-7.013, -6.131],
                              [0, 0],
                            ],
                            v: [
                              [-123.546, -61.139],
                              [-53.691, 3.324],
                              [62.489, -29.087],
                              [122.09, -0.155],
                              [146.47, 3.219],
                              [146.581, 45.753],
                              [39.222, 62.216],
                              [-139.193, 37.088],
                              [-140.062, 20.691],
                            ],
                            c: !0,
                          },
                        ],
                      },
                      {
                        i: { x: 1, y: 1 },
                        o: { x: 1, y: 0 },
                        t: 75,
                        s: [
                          {
                            i: [
                              [-23.035, -1.078],
                              [-36.595, 0],
                              [-73.096, -0.018],
                              [0, 0],
                              [0, 0],
                              [0, 0],
                              [81.722, 0],
                              [17.048, 14.903],
                              [-4.561, 4.657],
                            ],
                            o: [
                              [33.621, 1.573],
                              [36.594, 0],
                              [56.805, 0.014],
                              [11.26, 0],
                              [0, 0],
                              [0, 0],
                              [-81.722, 0],
                              [-7.013, -6.131],
                              [0, 0],
                            ],
                            v: [
                              [-107.475, -56.138],
                              [-53.691, 3.324],
                              [62.739, -29.337],
                              [122.09, -0.155],
                              [146.47, 3.219],
                              [146.581, 45.753],
                              [39.222, 62.216],
                              [-139.193, 37.088],
                              [-140.062, 20.691],
                            ],
                            c: !0,
                          },
                        ],
                      },
                      {
                        t: 90,
                        s: [
                          {
                            i: [
                              [-23.035, -1.078],
                              [-36.595, 0],
                              [-67.664, 0],
                              [0, 0],
                              [0, 0],
                              [0, 0],
                              [81.722, 0],
                              [17.048, 14.903],
                              [-4.561, 4.657],
                            ],
                            o: [
                              [33.621, 1.573],
                              [36.594, 0],
                              [56.805, 0],
                              [11.26, 0],
                              [0, 0],
                              [0, 0],
                              [-81.722, 0],
                              [-7.013, -6.131],
                              [0, 0],
                            ],
                            v: [
                              [-123.546, -61.139],
                              [-53.691, 3.324],
                              [62.489, -29.087],
                              [122.09, -0.155],
                              [146.47, 3.219],
                              [146.581, 45.753],
                              [39.222, 62.216],
                              [-139.193, 37.088],
                              [-140.062, 20.691],
                            ],
                            c: !0,
                          },
                        ],
                      },
                    ],
                    ix: 2,
                  },
                  nm: 'Path 1',
                  mn: 'ADBE Vector Shape - Group',
                  hd: !1,
                },
                {
                  ty: 'st',
                  c: {
                    a: 0,
                    k: [0.219607858097, 0.219607858097, 0.219607858097, 1],
                    ix: 3,
                  },
                  o: { a: 0, k: 100, ix: 4 },
                  w: { a: 0, k: 2, ix: 5 },
                  lc: 2,
                  lj: 2,
                  bm: 0,
                  nm: 'Stroke 1',
                  mn: 'ADBE Vector Graphic - Stroke',
                  hd: !1,
                },
                {
                  ty: 'fl',
                  c: {
                    a: 0,
                    k: [0.964705942191, 0.560784313725, 0.113725497676, 1],
                    ix: 4,
                  },
                  o: { a: 0, k: 100, ix: 5 },
                  r: 1,
                  bm: 0,
                  nm: 'Fill 1',
                  mn: 'ADBE Vector Graphic - Fill',
                  hd: !1,
                },
                {
                  ty: 'tr',
                  p: { a: 0, k: [151.581, 67.217], ix: 2 },
                  a: { a: 0, k: [0, 0], ix: 1 },
                  s: { a: 0, k: [100, 100], ix: 3 },
                  r: { a: 0, k: 0, ix: 6 },
                  o: { a: 0, k: 100, ix: 7 },
                  sk: { a: 0, k: 0, ix: 4 },
                  sa: { a: 0, k: 0, ix: 5 },
                  nm: 'Transform',
                },
              ],
              nm: 'Group 4',
              np: 3,
              cix: 2,
              bm: 0,
              ix: 4,
              mn: 'ADBE Vector Group',
              hd: !1,
            },
          ],
          ip: 0,
          op: 90,
          st: 0,
          bm: 0,
        },
        {
          ddd: 0,
          ind: 8,
          ty: 4,
          nm: 'wing 2 Outlines',
          sr: 1,
          ks: {
            o: { a: 0, k: 100, ix: 11 },
            r: { a: 0, k: 0, ix: 10 },
            p: { a: 0, k: [252.494, 261.569, 0], ix: 2 },
            a: { a: 0, k: [118.688, 34.525, 0], ix: 1 },
            s: { a: 0, k: [100, 100, 100], ix: 6 },
          },
          ao: 0,
          shapes: [
            {
              ty: 'gr',
              it: [
                {
                  ind: 0,
                  ty: 'sh',
                  ix: 1,
                  ks: {
                    a: 0,
                    k: {
                      i: [
                        [0, 0],
                        [18.97, 1.065],
                        [0.611, -1.066],
                        [0, 0],
                      ],
                      o: [
                        [0, 0],
                        [-18.971, -1.066],
                        [-0.611, 1.066],
                        [0, 0],
                      ],
                      v: [
                        [28.159, 5.964],
                        [-1.088, -4.898],
                        [-27.548, -3.406],
                        [-7.773, 5.964],
                      ],
                      c: !1,
                    },
                    ix: 2,
                  },
                  nm: 'Path 1',
                  mn: 'ADBE Vector Shape - Group',
                  hd: !1,
                },
                {
                  ty: 'st',
                  c: {
                    a: 0,
                    k: [0.219607858097, 0.219607858097, 0.219607858097, 1],
                    ix: 3,
                  },
                  o: { a: 0, k: 100, ix: 4 },
                  w: { a: 0, k: 2, ix: 5 },
                  lc: 2,
                  lj: 2,
                  bm: 0,
                  nm: 'Stroke 1',
                  mn: 'ADBE Vector Graphic - Stroke',
                  hd: !1,
                },
                {
                  ty: 'tr',
                  p: { a: 0, k: [47.813, 46.99], ix: 2 },
                  a: { a: 0, k: [0, 0], ix: 1 },
                  s: { a: 0, k: [100, 100], ix: 3 },
                  r: { a: 0, k: 0, ix: 6 },
                  o: { a: 0, k: 100, ix: 7 },
                  sk: { a: 0, k: 0, ix: 4 },
                  sa: { a: 0, k: 0, ix: 5 },
                  nm: 'Transform',
                },
              ],
              nm: 'Group 1',
              np: 2,
              cix: 2,
              bm: 0,
              ix: 1,
              mn: 'ADBE Vector Group',
              hd: !1,
            },
            {
              ty: 'gr',
              it: [
                {
                  ind: 0,
                  ty: 'sh',
                  ix: 1,
                  ks: {
                    a: 1,
                    k: [
                      {
                        i: { x: 0, y: 1 },
                        o: { x: 0, y: 0 },
                        t: 0,
                        s: [
                          {
                            i: [
                              [-18.889, -13.702],
                              [10.7, 0],
                              [10.538, 2.511],
                              [-2.046, 3.695],
                            ],
                            o: [
                              [4.676, 3.392],
                              [-19.992, 0],
                              [-8.794, -2.095],
                              [2.715, -4.899],
                            ],
                            v: [
                              [36.281, 2.287],
                              [20.633, 11.415],
                              [-21.189, 7.383],
                              [-38.911, -1.624],
                            ],
                            c: !0,
                          },
                        ],
                      },
                      {
                        i: { x: 1, y: 1 },
                        o: { x: 1, y: 0 },
                        t: 30,
                        s: [
                          {
                            i: [
                              [-18.889, -13.702],
                              [10.7, 0],
                              [10.538, 2.511],
                              [-2.046, 3.695],
                            ],
                            o: [
                              [4.676, 3.392],
                              [-19.992, 0],
                              [-8.794, -2.095],
                              [2.715, -4.899],
                            ],
                            v: [
                              [30.281, -2.213],
                              [20.633, 11.415],
                              [-21.188, 7.383],
                              [-45.411, -11.124],
                            ],
                            c: !0,
                          },
                        ],
                      },
                      {
                        i: { x: 0, y: 1 },
                        o: { x: 0, y: 0 },
                        t: 45,
                        s: [
                          {
                            i: [
                              [-18.889, -13.702],
                              [10.7, 0],
                              [10.538, 2.511],
                              [-2.046, 3.695],
                            ],
                            o: [
                              [4.676, 3.392],
                              [-19.992, 0],
                              [-8.794, -2.095],
                              [2.715, -4.899],
                            ],
                            v: [
                              [36.281, 2.287],
                              [20.633, 11.415],
                              [-21.189, 7.383],
                              [-38.911, -1.624],
                            ],
                            c: !0,
                          },
                        ],
                      },
                      {
                        i: { x: 1, y: 1 },
                        o: { x: 1, y: 0 },
                        t: 75,
                        s: [
                          {
                            i: [
                              [-18.889, -13.702],
                              [10.7, 0],
                              [10.538, 2.511],
                              [-2.046, 3.695],
                            ],
                            o: [
                              [4.676, 3.392],
                              [-19.992, 0],
                              [-8.794, -2.095],
                              [2.715, -4.899],
                            ],
                            v: [
                              [37.781, 22.787],
                              [22.133, 31.915],
                              [-26.689, 26.383],
                              [-19.411, 15.876],
                            ],
                            c: !0,
                          },
                        ],
                      },
                      {
                        t: 90,
                        s: [
                          {
                            i: [
                              [-18.889, -13.702],
                              [10.7, 0],
                              [10.538, 2.511],
                              [-2.046, 3.695],
                            ],
                            o: [
                              [4.676, 3.392],
                              [-19.992, 0],
                              [-8.794, -2.095],
                              [2.715, -4.899],
                            ],
                            v: [
                              [36.281, 2.287],
                              [20.633, 11.415],
                              [-21.189, 7.383],
                              [-38.911, -1.624],
                            ],
                            c: !0,
                          },
                        ],
                      },
                    ],
                    ix: 2,
                  },
                  nm: 'Path 1',
                  mn: 'ADBE Vector Shape - Group',
                  hd: !1,
                },
                {
                  ty: 'st',
                  c: {
                    a: 0,
                    k: [0.219607858097, 0.219607858097, 0.219607858097, 1],
                    ix: 3,
                  },
                  o: { a: 0, k: 100, ix: 4 },
                  w: { a: 0, k: 2, ix: 5 },
                  lc: 2,
                  lj: 2,
                  bm: 0,
                  nm: 'Stroke 1',
                  mn: 'ADBE Vector Graphic - Stroke',
                  hd: !1,
                },
                {
                  ty: 'fl',
                  c: {
                    a: 0,
                    k: [0.964705942191, 0.560784313725, 0.113725497676, 1],
                    ix: 4,
                  },
                  o: { a: 0, k: 100, ix: 5 },
                  r: 1,
                  bm: 0,
                  nm: 'Fill 1',
                  mn: 'ADBE Vector Graphic - Fill',
                  hd: !1,
                },
                {
                  ty: 'tr',
                  p: { a: 0, k: [45.956, 42.997], ix: 2 },
                  a: { a: 0, k: [0, 0], ix: 1 },
                  s: { a: 0, k: [100, 100], ix: 3 },
                  r: { a: 0, k: 0, ix: 6 },
                  o: { a: 0, k: 100, ix: 7 },
                  sk: { a: 0, k: 0, ix: 4 },
                  sa: { a: 0, k: 0, ix: 5 },
                  nm: 'Transform',
                },
              ],
              nm: 'Group 2',
              np: 3,
              cix: 2,
              bm: 0,
              ix: 2,
              mn: 'ADBE Vector Group',
              hd: !1,
            },
            {
              ty: 'gr',
              it: [
                {
                  ind: 0,
                  ty: 'sh',
                  ix: 1,
                  ks: {
                    a: 1,
                    k: [
                      {
                        i: { x: 0, y: 1 },
                        o: { x: 0, y: 0 },
                        t: 0,
                        s: [
                          {
                            i: [
                              [0, 0],
                              [7.401, 2.771],
                              [10.158, -5.116],
                              [0, 0],
                            ],
                            o: [
                              [0, 0],
                              [-7.401, -2.771],
                              [-10.159, 5.116],
                              [0, 0],
                            ],
                            v: [
                              [39.382, 16.73],
                              [20.899, -11.614],
                              [-26.864, -11.614],
                              [-39.382, 15.549],
                            ],
                            c: !1,
                          },
                        ],
                      },
                      {
                        i: { x: 1, y: 1 },
                        o: { x: 1, y: 0 },
                        t: 30,
                        s: [
                          {
                            i: [
                              [0, 0],
                              [7.401, 2.771],
                              [10.158, -5.116],
                              [0, 0],
                            ],
                            o: [
                              [0, 0],
                              [-7.401, -2.771],
                              [-10.159, 5.116],
                              [0, 0],
                            ],
                            v: [
                              [39.382, 16.73],
                              [2.899, -42.614],
                              [-43.864, -34.614],
                              [-39.382, 15.549],
                            ],
                            c: !1,
                          },
                        ],
                      },
                      {
                        i: { x: 0.833, y: 0.833 },
                        o: { x: 0, y: 0 },
                        t: 45,
                        s: [
                          {
                            i: [
                              [0, 0],
                              [7.401, 2.771],
                              [10.158, -5.116],
                              [0, 0],
                            ],
                            o: [
                              [0, 0],
                              [-7.401, -2.771],
                              [-10.159, 5.116],
                              [0, 0],
                            ],
                            v: [
                              [39.382, 16.73],
                              [20.899, -11.614],
                              [-26.864, -11.614],
                              [-39.382, 15.549],
                            ],
                            c: !1,
                          },
                        ],
                      },
                      {
                        t: 90,
                        s: [
                          {
                            i: [
                              [0, 0],
                              [7.401, 2.771],
                              [10.158, -5.116],
                              [0, 0],
                            ],
                            o: [
                              [0, 0],
                              [-7.401, -2.771],
                              [-10.159, 5.116],
                              [0, 0],
                            ],
                            v: [
                              [39.382, 16.73],
                              [20.899, -11.614],
                              [-26.864, -11.614],
                              [-39.382, 15.549],
                            ],
                            c: !1,
                          },
                        ],
                      },
                    ],
                    ix: 2,
                  },
                  nm: 'Path 1',
                  mn: 'ADBE Vector Shape - Group',
                  hd: !1,
                },
                {
                  ty: 'st',
                  c: {
                    a: 0,
                    k: [0.219607858097, 0.219607858097, 0.219607858097, 1],
                    ix: 3,
                  },
                  o: { a: 0, k: 100, ix: 4 },
                  w: { a: 0, k: 2, ix: 5 },
                  lc: 2,
                  lj: 2,
                  bm: 0,
                  nm: 'Stroke 1',
                  mn: 'ADBE Vector Graphic - Stroke',
                  hd: !1,
                },
                {
                  ty: 'tr',
                  p: { a: 0, k: [174.728, 34.377], ix: 2 },
                  a: { a: 0, k: [0, 0], ix: 1 },
                  s: { a: 0, k: [100, 100], ix: 3 },
                  r: { a: 0, k: 0, ix: 6 },
                  o: { a: 0, k: 100, ix: 7 },
                  sk: { a: 0, k: 0, ix: 4 },
                  sa: { a: 0, k: 0, ix: 5 },
                  nm: 'Transform',
                },
              ],
              nm: 'Group 3',
              np: 2,
              cix: 2,
              bm: 0,
              ix: 3,
              mn: 'ADBE Vector Group',
              hd: !1,
            },
            {
              ty: 'gr',
              it: [
                {
                  ind: 0,
                  ty: 'sh',
                  ix: 1,
                  ks: {
                    a: 1,
                    k: [
                      {
                        i: { x: 0, y: 1 },
                        o: { x: 0, y: 0 },
                        t: 0,
                        s: [
                          {
                            i: [
                              [-17.6, 19.991],
                              [13.328, 2.915],
                              [19.481, -16.483],
                              [-5.692, -3.599],
                            ],
                            o: [
                              [4.32, -4.907],
                              [-24.678, -5.399],
                              [-8.762, 7.413],
                              [5.691, 3.598],
                            ],
                            v: [
                              [60.621, 9.534],
                              [42.052, -24.126],
                              [-49.43, -11.763],
                              [-59.248, 9.784],
                            ],
                            c: !0,
                          },
                        ],
                      },
                      {
                        i: { x: 1, y: 1 },
                        o: { x: 1, y: 0 },
                        t: 30,
                        s: [
                          {
                            i: [
                              [-17.6, 19.991],
                              [13.328, 2.915],
                              [19.481, -16.483],
                              [-5.692, -3.599],
                            ],
                            o: [
                              [4.32, -4.907],
                              [-24.678, -5.399],
                              [-8.762, 7.413],
                              [5.691, 3.598],
                            ],
                            v: [
                              [60.621, 9.534],
                              [29.052, -50.126],
                              [-56.43, -37.763],
                              [-59.248, 9.784],
                            ],
                            c: !0,
                          },
                        ],
                      },
                      {
                        i: { x: 0, y: 1 },
                        o: { x: 0, y: 0 },
                        t: 45,
                        s: [
                          {
                            i: [
                              [-17.6, 19.991],
                              [13.328, 2.915],
                              [19.481, -16.483],
                              [-5.692, -3.599],
                            ],
                            o: [
                              [4.32, -4.907],
                              [-24.678, -5.399],
                              [-8.762, 7.413],
                              [5.691, 3.598],
                            ],
                            v: [
                              [60.621, 9.534],
                              [42.052, -24.126],
                              [-49.43, -11.763],
                              [-59.248, 9.784],
                            ],
                            c: !0,
                          },
                        ],
                      },
                      {
                        i: { x: 1, y: 1 },
                        o: { x: 1, y: 0 },
                        t: 75,
                        s: [
                          {
                            i: [
                              [-21.362, 15.897],
                              [13.328, 2.915],
                              [19.481, -16.483],
                              [-5.692, -3.599],
                            ],
                            o: [
                              [5.245, -3.903],
                              [-24.678, -5.399],
                              [-8.762, 7.413],
                              [5.691, 3.598],
                            ],
                            v: [
                              [44.121, 45.034],
                              [47.552, 12.874],
                              [-37.43, 24.987],
                              [-47.248, 48.784],
                            ],
                            c: !0,
                          },
                        ],
                      },
                      {
                        t: 90,
                        s: [
                          {
                            i: [
                              [-17.6, 19.991],
                              [13.328, 2.915],
                              [19.481, -16.483],
                              [-5.692, -3.599],
                            ],
                            o: [
                              [4.32, -4.907],
                              [-24.678, -5.399],
                              [-8.762, 7.413],
                              [5.691, 3.598],
                            ],
                            v: [
                              [60.621, 9.534],
                              [42.052, -24.126],
                              [-49.43, -11.763],
                              [-59.248, 9.784],
                            ],
                            c: !0,
                          },
                        ],
                      },
                    ],
                    ix: 2,
                  },
                  nm: 'Path 1',
                  mn: 'ADBE Vector Shape - Group',
                  hd: !1,
                },
                {
                  ty: 'st',
                  c: {
                    a: 0,
                    k: [0.219607858097, 0.219607858097, 0.219607858097, 1],
                    ix: 3,
                  },
                  o: { a: 0, k: 100, ix: 4 },
                  w: { a: 0, k: 2, ix: 5 },
                  lc: 2,
                  lj: 2,
                  bm: 0,
                  nm: 'Stroke 1',
                  mn: 'ADBE Vector Graphic - Stroke',
                  hd: !1,
                },
                {
                  ty: 'fl',
                  c: {
                    a: 0,
                    k: [0.964705942191, 0.560784313725, 0.113725497676, 1],
                    ix: 4,
                  },
                  o: { a: 0, k: 100, ix: 5 },
                  r: 1,
                  bm: 0,
                  nm: 'Fill 1',
                  mn: 'ADBE Vector Graphic - Fill',
                  hd: !1,
                },
                {
                  ty: 'tr',
                  p: { a: 0, k: [167.435, 34.525], ix: 2 },
                  a: { a: 0, k: [0, 0], ix: 1 },
                  s: { a: 0, k: [100, 100], ix: 3 },
                  r: { a: 0, k: 0, ix: 6 },
                  o: { a: 0, k: 100, ix: 7 },
                  sk: { a: 0, k: 0, ix: 4 },
                  sa: { a: 0, k: 0, ix: 5 },
                  nm: 'Transform',
                },
              ],
              nm: 'Group 4',
              np: 3,
              cix: 2,
              bm: 0,
              ix: 4,
              mn: 'ADBE Vector Group',
              hd: !1,
            },
          ],
          ip: 0,
          op: 90,
          st: 0,
          bm: 0,
        },
      ],
    },
    {
      id: 'comp_1',
      layers: [
        {
          ddd: 0,
          ind: 1,
          ty: 4,
          nm: 'Shape Layer 1',
          sr: 1,
          ks: {
            o: { a: 0, k: 100, ix: 11 },
            r: { a: 0, k: 0, ix: 10 },
            p: { a: 0, k: [250, 250, 0], ix: 2 },
            a: { a: 0, k: [0, 0, 0], ix: 1 },
            s: { a: 0, k: [91, 91, 100], ix: 6 },
          },
          ao: 0,
          shapes: [
            {
              ty: 'gr',
              it: [
                {
                  ind: 0,
                  ty: 'sh',
                  ix: 1,
                  ks: {
                    a: 0,
                    k: {
                      i: [
                        [0, 0],
                        [0, 0],
                      ],
                      o: [
                        [0, 0],
                        [0, 0],
                      ],
                      v: [
                        [273.352, -1.802],
                        [-221, 1],
                      ],
                      c: !1,
                    },
                    ix: 2,
                  },
                  nm: 'Path 1',
                  mn: 'ADBE Vector Shape - Group',
                  hd: !1,
                },
                {
                  ty: 'zz',
                  nm: 'Zig Zag 1',
                  s: { a: 0, k: 5, ix: 1 },
                  r: { a: 0, k: 10, ix: 2 },
                  pt: { a: 0, k: 2, ix: 3 },
                  ix: 2,
                  mn: 'ADBE Vector Filter - Zigzag',
                  hd: !1,
                },
                {
                  ty: 'tm',
                  s: { a: 0, k: 18, ix: 1 },
                  e: { a: 0, k: 100, ix: 2 },
                  o: {
                    a: 1,
                    k: [
                      {
                        i: { x: [0.833], y: [0.833] },
                        o: { x: [0.167], y: [0.167] },
                        t: 0,
                        s: [0],
                      },
                      { t: 5, s: [-67] },
                    ],
                    ix: 3,
                    x: `var $bm_rt;
$bm_rt = loopOut('cycle');`,
                  },
                  m: 1,
                  ix: 3,
                  nm: 'Trim Paths 1',
                  mn: 'ADBE Vector Filter - Trim',
                  hd: !1,
                },
                {
                  ty: 'st',
                  c: {
                    a: 0,
                    k: [0.219607858097, 0.219607858097, 0.219607858097, 1],
                    ix: 3,
                  },
                  o: { a: 0, k: 100, ix: 4 },
                  w: { a: 0, k: 46, ix: 5 },
                  lc: 2,
                  lj: 2,
                  bm: 0,
                  nm: 'Stroke 1',
                  mn: 'ADBE Vector Graphic - Stroke',
                  hd: !1,
                },
                {
                  ty: 'tr',
                  p: {
                    a: 1,
                    k: [
                      {
                        i: { x: 0.833, y: 0.833 },
                        o: { x: 0.167, y: 0.167 },
                        t: 0,
                        s: [0, 0],
                        to: [-15, 0],
                        ti: [15, 0],
                      },
                      { t: 5, s: [-90, 0] },
                    ],
                    ix: 2,
                    x: `var $bm_rt;
$bm_rt = loopOut('cycle');`,
                  },
                  a: { a: 0, k: [0, 0], ix: 1 },
                  s: { a: 0, k: [100, 100], ix: 3 },
                  r: { a: 0, k: 0, ix: 6 },
                  o: { a: 0, k: 100, ix: 7 },
                  sk: { a: 0, k: 0, ix: 4 },
                  sa: { a: 0, k: 0, ix: 5 },
                  nm: 'Transform',
                },
              ],
              nm: 'Shape 1',
              np: 4,
              cix: 2,
              bm: 0,
              ix: 1,
              mn: 'ADBE Vector Group',
              hd: !1,
            },
          ],
          ip: 0,
          op: 90,
          st: 0,
          bm: 0,
        },
      ],
    },
  ],
  E0 = [
    {
      ddd: 0,
      ind: 1,
      ty: 0,
      nm: 'aircraft',
      refId: 'comp_0',
      sr: 1,
      ks: {
        o: { a: 0, k: 100, ix: 11 },
        r: { a: 0, k: 0, ix: 10 },
        p: { a: 0, k: [250, 250, 0], ix: 2 },
        a: { a: 0, k: [250, 250, 0], ix: 1 },
        s: {
          a: 1,
          k: [
            {
              i: { x: [0, 0, 0.667], y: [1, 1, 1] },
              o: { x: [0.167, 0.167, 0.167], y: [0.167, 0.167, 0] },
              t: 0,
              s: [87, 87, 100],
            },
            {
              i: { x: [1, 1, 0.667], y: [1, 1, 1] },
              o: { x: [1, 1, 0.333], y: [0, 0, 0] },
              t: 30,
              s: [97, 97, 100],
            },
            {
              i: { x: [0, 0, 0.667], y: [1, 1, 1] },
              o: { x: [0, 0, 0.167], y: [0, 0, -1.667] },
              t: 45,
              s: [87, 87, 100],
            },
            {
              i: { x: [0.833, 0.833, 0.833], y: [0.833, 0.833, 1] },
              o: { x: [1, 1, 0.333], y: [0, 0, 0] },
              t: 75,
              s: [82, 82, 100],
            },
            { t: 90, s: [87, 87, 100] },
          ],
          ix: 6,
        },
      },
      ao: 0,
      w: 500,
      h: 500,
      ip: 0,
      op: 90,
      st: 0,
      bm: 0,
    },
  ],
  b0 = [],
  S0 = {
    v: x0,
    meta: m0,
    fr: k0,
    ip: d0,
    op: y0,
    w: h0,
    h: p0,
    nm: u0,
    ddd: f0,
    assets: g0,
    layers: E0,
    markers: b0,
  },
  s = {
    ONBOARDING_COMPLETED: 'onboarding_completed',
    FIRST_LAUNCH: 'first_launch',
    USER_PREFERENCES: 'user_preferences',
    THEME_PREFERENCE: 'theme_preference',
    LANGUAGE_PREFERENCE: 'language_preference',
    LAST_APP_VERSION: 'last_app_version',
  },
  v0 = {
    async setItem(t, e) {
      try {
        const i = JSON.stringify(e);
        await p.setItem(t, i);
      } catch (i) {
        throw (
          (console.error(`Error saving ${t}:`, i),
          new Error(`Failed to save ${t}`))
        );
      }
    },
    async getItem(t, e) {
      try {
        const i = await p.getItem(t);
        return i === null ? e || null : JSON.parse(i);
      } catch (i) {
        return console.error(`Error reading ${t}:`, i), e || null;
      }
    },
    async removeItem(t) {
      try {
        await p.removeItem(t);
      } catch (e) {
        throw (
          (console.error(`Error removing ${t}:`, e),
          new Error(`Failed to remove ${t}`))
        );
      }
    },
    async clear() {
      try {
        await p.clear();
      } catch (t) {
        throw (
          (console.error('Error clearing storage:', t),
          new Error('Failed to clear storage'))
        );
      }
    },
    async setOnboardingCompleted(t) {
      await this.setItem(s.ONBOARDING_COMPLETED, t);
    },
    async getOnboardingCompleted() {
      try {
        const t = await p.getItem(s.ONBOARDING_COMPLETED);
        if ((console.log('Onboarding completed raw value:', t), t === null))
          return (
            console.log('No onboarding data found - onboarding not completed'),
            !1
          );
        const e = JSON.parse(t);
        return console.log('Onboarding completed parsed value:', e), e;
      } catch (t) {
        return console.error('Error checking onboarding completion:', t), !1;
      }
    },
    async setFirstLaunch(t) {
      await this.setItem(s.FIRST_LAUNCH, t);
    },
    async isFirstLaunch() {
      try {
        const t = await p.getItem(s.FIRST_LAUNCH);
        if ((console.log('First launch raw value:', t), t === null))
          return (
            console.log('No first launch data found - this is first launch'), !0
          );
        const e = JSON.parse(t);
        return console.log('First launch parsed value:', e), e;
      } catch (t) {
        return console.error('Error checking first launch:', t), !0;
      }
    },
    async setUserPreferences(t) {
      const i = { ...(await this.getUserPreferences()), ...t };
      await this.setItem(s.USER_PREFERENCES, i);
    },
    async getUserPreferences() {
      const t = {
        reduceMotion: !1,
        notifications: !0,
        theme: 'system',
        language: 'en',
      };
      return (await this.getItem(s.USER_PREFERENCES, t)) ?? t;
    },
    async setThemePreference(t) {
      await this.setItem(s.THEME_PREFERENCE, t);
    },
    async getThemePreference() {
      return (await this.getItem(s.THEME_PREFERENCE, 'system')) ?? 'system';
    },
    async setLanguagePreference(t) {
      await this.setItem(s.LANGUAGE_PREFERENCE, t);
    },
    async getLanguagePreference() {
      return (await this.getItem(s.LANGUAGE_PREFERENCE, 'en')) ?? 'en';
    },
    async setLastAppVersion(t) {
      await this.setItem(s.LAST_APP_VERSION, t);
    },
    async getLastAppVersion() {
      return await this.getItem(s.LAST_APP_VERSION);
    },
    async migrateData(t, e) {
      console.log(`Migrating data from ${t} to ${e}`),
        await this.setLastAppVersion(e);
    },
    async clearOnboardingState() {
      try {
        await p.multiRemove([s.ONBOARDING_COMPLETED, s.FIRST_LAUNCH]),
          console.log(
            'Onboarding state cleared - app will show onboarding on next launch'
          );
      } catch (t) {
        console.error('Error clearing onboarding state:', t);
      }
    },
    async getAllKeys() {
      try {
        return await p.getAllKeys();
      } catch (t) {
        return console.error('Error getting all keys:', t), [];
      }
    },
    async getAllData() {
      try {
        const t = await p.getAllKeys(),
          e = await p.multiGet(t),
          i = {};
        return (
          e.forEach(([l, m]) => {
            try {
              i[l] = m ? JSON.parse(m) : null;
            } catch {
              i[l] = m;
            }
          }),
          i
        );
      } catch (t) {
        return console.error('Error getting all data:', t), {};
      }
    },
    async resetOnboardingForTesting() {
      try {
        await this.clearOnboardingState(),
          console.log('✅ Onboarding state reset for testing');
      } catch (t) {
        console.error('❌ Error resetting onboarding state:', t);
      }
    },
  };
n0();
const { width: A0, height: F0 } = e0.get('window'),
  G0 = ({ onAnimationComplete: t, minimumDisplayTime: e = 3e3 }) => {
    const i = X(),
      [l, m] = o.useState(!1),
      [f, k] = o.useState(0),
      [v, g] = o.useState('Initializing...'),
      d = [
        { text: 'Starting logistics engine...', duration: 800 },
        { text: 'Connecting to driver network...', duration: 600 },
        { text: 'Loading real-time tracking...', duration: 700 },
        { text: 'Preparing your dashboard...', duration: 500 },
        { text: 'Ready for delivery!', duration: 400 },
      ];
    o.useEffect(() => {
      async function y() {
        try {
          let h = 0;
          for (let u = 0; u < d.length; u++) {
            const A = d[u];
            if (A) {
              g(A.text);
              const C = (((u + 1) / d.length) * 100 - h) / 20;
              for (let G = 0; G < 20; G++)
                (h += C),
                  k(Math.min(h, 100)),
                  await new Promise((B) => setTimeout(B, A.duration / 20));
            }
          }
          const O = Date.now(),
            D = e - O;
          D > 0 && (await new Promise((u) => setTimeout(u, D)));
        } catch (h) {
          console.warn('Splash screen preparation error:', h);
        } finally {
          m(!0);
        }
      }
      y();
    }, [e]);
    const E = o.useCallback(async () => {
      if (l)
        try {
          await c0(),
            setTimeout(() => {
              t();
            }, 500);
        } catch (y) {
          console.warn('Error hiding splash screen:', y), t();
        }
    }, [l, t]);
    return l
      ? a.jsxs(n, {
          style: r.container,
          onLayout: E,
          children: [
            a.jsx(S, {
              barStyle: 'light-content',
              backgroundColor: c.primary.blue,
              translucent: !1,
            }),
            a.jsx(Q, {
              colors: c.gradients.primary,
              style: r.backgroundGradient,
              start: { x: 0, y: 0 },
              end: { x: 1, y: 1 },
              children: a.jsxs(n, {
                style: [r.content, { paddingTop: i.top }],
                children: [
                  a.jsx(n, {
                    style: r.logoSection,
                    children: a.jsxs(n, {
                      style: r.logoContainer,
                      children: [
                        a.jsx(n, {
                          style: r.logoIconContainer,
                          children: a.jsx(l0, {
                            source: S0,
                            autoPlay: !0,
                            loop: !0,
                            style: r.logoIcon,
                            resizeMode: 'contain',
                            colorFilters: [
                              { keypath: '**', color: c.neutral.white },
                            ],
                          }),
                        }),
                        a.jsx(b, { style: r.brandTitle, children: 'TAPANGO' }),
                        a.jsx(b, {
                          style: r.brandTagline,
                          children: "Northeast India's Cargo Network",
                        }),
                      ],
                    }),
                  }),
                  a.jsxs(n, {
                    style: r.loadingSection,
                    children: [
                      a.jsxs(n, {
                        style: r.progressContainer,
                        children: [
                          a.jsx(n, {
                            style: r.progressTrack,
                            children: a.jsx(n, {
                              style: [r.progressBar, { width: `${f}%` }],
                            }),
                          }),
                          a.jsxs(b, {
                            style: r.progressText,
                            children: [Math.round(f), '%'],
                          }),
                        ],
                      }),
                      a.jsxs(n, {
                        style: r.statusContainer,
                        children: [
                          a.jsx(J, {
                            size: 'small',
                            color: c.neutral.white,
                            style: r.loadingIndicator,
                          }),
                          a.jsx(b, { style: r.loadingText, children: v }),
                        ],
                      }),
                    ],
                  }),
                  a.jsxs(n, {
                    style: [r.bottomSection, { paddingBottom: i.bottom + 16 }],
                    children: [
                      a.jsx(b, {
                        style: r.versionText,
                        children: 'Version 1.0.0',
                      }),
                      a.jsx(b, {
                        style: r.poweredByText,
                        children: 'Powered by Expo SDK 53',
                      }),
                      __DEV__ &&
                        a.jsx(Z, {
                          style: r.devButton,
                          onPress: async () => {
                            try {
                              await v0.clearOnboardingState(),
                                console.log('🔄 Onboarding state cleared!');
                            } catch (y) {
                              console.error(
                                'Failed to clear onboarding state:',
                                y
                              );
                            }
                          },
                          children: a.jsx(b, {
                            style: r.devButtonText,
                            children: 'Reset Onboarding',
                          }),
                        }),
                    ],
                  }),
                ],
              }),
            }),
          ],
        })
      : null;
  },
  r = I.create({
    container: { flex: 1, backgroundColor: c.primary.blue },
    backgroundGradient: { flex: 1 },
    content: { flex: 1, paddingHorizontal: 24, paddingVertical: 32 },
    logoSection: {
      flex: 3,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 40,
    },
    logoContainer: { alignItems: 'center', justifyContent: 'center' },
    logoIconContainer: {
      width: 140,
      height: 140,
      marginBottom: 32,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.12)',
      borderRadius: 70,
      borderWidth: 2,
      borderColor: 'rgba(255, 255, 255, 0.2)',
      boxShadow: '0px 12px 20px rgba(15, 23, 42, 0.2)',
    },
    logoIcon: { width: 90, height: 90 },
    brandTitle: {
      fontSize: 48,
      fontWeight: '800',
      color: c.neutral.white,
      textAlign: 'center',
      marginBottom: 12,
      letterSpacing: 3,
    },
    brandTagline: {
      fontSize: 18,
      color: c.neutral.white,
      textAlign: 'center',
      fontWeight: '400',
      opacity: 0.9,
      letterSpacing: 1,
    },
    loadingSection: { flex: 1, justifyContent: 'center', paddingVertical: 24 },
    progressContainer: { alignItems: 'center', marginBottom: 24 },
    progressTrack: {
      width: A0 * 0.7,
      height: 6,
      backgroundColor: 'rgba(255, 255, 255, 0.25)',
      borderRadius: 3,
      overflow: 'hidden',
      marginBottom: 12,
      boxShadow: '0px 2px 4px rgba(15, 23, 42, 0.1)',
    },
    progressBar: {
      height: '100%',
      backgroundColor: c.neutral.white,
      borderRadius: 3,
      boxShadow: '0 0 6px rgba(255,255,255,0.6)',
    },
    progressText: {
      fontSize: 16,
      color: c.neutral.white,
      fontWeight: '600',
      opacity: 0.9,
    },
    statusContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 24,
    },
    loadingIndicator: { marginRight: 12 },
    loadingText: {
      fontSize: 16,
      color: c.neutral.white,
      textAlign: 'center',
      fontWeight: '500',
      opacity: 0.85,
    },
    bottomSection: {
      alignItems: 'center',
      justifyContent: 'flex-end',
      gap: 8,
      paddingTop: 16,
    },
    versionText: {
      fontSize: 13,
      color: c.neutral.white,
      opacity: 0.7,
      textAlign: 'center',
      fontWeight: '500',
    },
    poweredByText: {
      fontSize: 11,
      color: c.neutral.white,
      opacity: 0.6,
      textAlign: 'center',
      fontWeight: '400',
      marginBottom: 8,
    },
    devButton: {
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 25,
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.25)',
      marginTop: 8,
    },
    devButtonText: {
      fontSize: 13,
      color: c.neutral.white,
      opacity: 0.9,
      fontWeight: '600',
      textAlign: 'center',
    },
  }),
  C0 = { title: 'App/Splash' },
  j = {
    render: () =>
      a.jsx('div', {
        style: { height: 640 },
        children: a.jsx(G0, {
          onAnimationComplete: () => {},
          minimumDisplayTime: 300,
        }),
      }),
  };
var W, M, H;
j.parameters = {
  ...j.parameters,
  docs: {
    ...((W = j.parameters) == null ? void 0 : W.docs),
    source: {
      originalSource: `{
  render: () => <div style={{
    height: 640
  }}>\r
      <Splash onAnimationComplete={() => {}} minimumDisplayTime={300} />\r
    </div>
}`,
      ...((H = (M = j.parameters) == null ? void 0 : M.docs) == null
        ? void 0
        : H.source),
    },
  },
};
const _0 = ['Preview'];
export { j as Preview, _0 as __namedExportsOrder, C0 as default };
