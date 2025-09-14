import { j as d } from './jsx-runtime-BjG_zV1W.js';
import { R as m, r as S } from './index-D_zSVikN.js';
import {
  f as U,
  t as Y,
  h as D,
  j as N,
  b as X,
  k as q,
  a as W,
  s as x,
  S as P,
  l as J,
  m as V,
  n as K,
} from './ThemeProvider-CPKCwPQ2.js';
import { T as z } from './Text-DBu9YOJb.js';
import { t as y } from './tamagui.config-DUnZTQxR.js';
import { s as I, V as C } from './index-DaADHxGU.js';
import {
  A as w,
  u as B,
  M as Q,
  a as Z,
  w as L,
} from './reanimated-BZ2Cpo5K.js';
import { T as F } from './index-CMWoXOLJ.js';
import { g as k, a as R, b as ee, c as re } from './helpers-dEnf9ZHf.js';
import { u as te } from './GorhomPortal-CbY2Y53n.js';
import './index-VT2245Mq.js';
import { T as oe } from './index-C4hRfBNc.js';
import { s as M } from './styled-BAAga49T.js';
import { X as ne, Y as ae } from './Stacks-CaMMwnuE.js';
import { c as T } from './colors-CDEvqoSB.js';
const A = (e, { tokens: o, props: r }) => {
    if (!e || r.circular) return;
    if (typeof e == 'number')
      return {
        paddingHorizontal: e * 0.25,
        height: e,
        borderRadius: r.circular ? 1e5 : e * 0.2,
      };
    const n = k(e),
      a = o.radius[e] ?? o.radius.$true;
    return {
      paddingHorizontal: n,
      height: e,
      borderRadius: r.circular ? 1e5 : a,
    };
  },
  ie = (e, o) => () => {};
function se({ isInput: e, props: o, ref: r }) {
  const { id: n, onChangeText: a, value: l, defaultValue: f } = o,
    b = m.useRef(l || f || ''),
    c = m.useRef(void 0),
    u = m.useCallback((s) => {
      s.focus(),
        s.setSelection &&
          typeof b.current == 'string' &&
          s.setSelection(0, b.current.length);
    }, []),
    t = m.useCallback(
      (s) => {
        var p;
        !n ||
          !s ||
          ((p = c.current) == null || p.call(c),
          (c.current = ie(n, { focus: s.focus })));
      },
      [n, e, u]
    ),
    h = m.useCallback(
      (s) => {
        s && t(s);
      },
      [t]
    ),
    i = te((s) => {
      (b.current = s), a == null || a(s);
    });
  return (
    m.useEffect(
      () => () => {
        var s;
        (s = c.current) == null || s.call(c);
      },
      []
    ),
    { ref: m.useMemo(() => U(r, h), [r, h]), onChangeText: i }
  );
}
var le = {};
const O = 'Label',
  [ce, De] = re(O, { id: void 0, controlRef: { current: null } }),
  _ = M(ee, {
    name: 'Label',
    tag: 'label',
    variants: {
      unstyled: {
        false: {
          size: '$true',
          color: '$color',
          backgroundColor: 'transparent',
          display: 'flex',
          alignItems: 'center',
          userSelect: 'none',
          cursor: 'default',
          pressStyle: { color: '$colorPress' },
        },
      },
      size: {
        '...size': (e, o) => {
          var n;
          const r = (n = A(e, o)) == null ? void 0 : n.height;
          return { ...R(e, o), lineHeight: r ? o.tokens.size[r] : void 0 };
        },
      },
    },
    defaultVariants: { unstyled: le.TAMAGUI_HEADLESS === '1' },
  }),
  v = S.forwardRef((e, o) => {
    const { htmlFor: r, id: n, ...a } = e,
      l = S.useRef(null),
      f = S.useRef(null),
      b = D(o, f),
      c = S.useId(),
      u = n ?? c;
    return (
      S.useEffect(() => {
        if (r) {
          const t = document.getElementById(r);
          if (f.current && t) {
            const h = () => t.getAttribute('aria-labelledby'),
              i = [u, h()].filter(Boolean).join(' ');
            return (
              t.setAttribute('aria-labelledby', i),
              (l.current = t),
              () => {
                var p;
                if (!u) return;
                const s = (p = h()) == null ? void 0 : p.replace(u, '');
                s === ''
                  ? t.removeAttribute('aria-labelledby')
                  : s && t.setAttribute('aria-labelledby', s);
              }
            );
          }
        }
      }, [u, r]),
      d.jsx(ce, {
        id: u,
        controlRef: l,
        children: d.jsx(_, {
          id: u,
          htmlFor: r,
          ...a,
          ref: b,
          onMouseDown: (t) => {
            var h;
            (h = e.onMouseDown) == null || h.call(e, t),
              !t.defaultPrevented && t.detail > 1 && t.preventDefault();
          },
          onPress: (t) => {
            var h;
            if (((h = e.onPress) == null || h.call(e, t), N)) {
              if (r || !l.current || t.defaultPrevented) return;
              const i = l.current.contains(t.target),
                s = t.isTrusted === !0;
              !i && s && (l.current.click(), l.current.focus());
            }
          },
        }),
      })
    );
  });
v.displayName = O;
const de = _.extractable(Y(v)),
  ue = (e = '$true', o) => {
    if (o.props.multiline || o.props.numberOfLines > 1) return ge(e, o);
    const r = A(e, o),
      n = k(e, { shift: -1, bounds: [2] });
    return { ...R(e, o), ...r, paddingHorizontal: n };
  },
  ge = (e = '$true', o) => {
    const { props: r } = o,
      n = A(e, o),
      a = R(e, o),
      l = r.rows ?? r.numberOfLines,
      f = typeof l == 'number' ? l * X(a.lineHeight) : 'auto',
      b = k(e, { shift: -2, bounds: [2] }),
      c = k(e, { shift: -1, bounds: [2] });
    return { ...n, ...a, paddingVertical: b, paddingHorizontal: c, height: f };
  };
var fe = {};
const be = {
    size: '$true',
    fontFamily: '$body',
    borderWidth: 1,
    outlineWidth: 0,
    color: '$color',
    tabIndex: 0,
    borderColor: '$borderColor',
    backgroundColor: '$background',
    minWidth: 0,
    hoverStyle: { borderColor: '$borderColorHover' },
    focusStyle: { borderColor: '$borderColorFocus' },
    focusVisibleStyle: {
      outlineColor: '$outlineColor',
      outlineWidth: 2,
      outlineStyle: 'solid',
    },
  },
  E = M(
    oe,
    {
      name: 'Input',
      variants: {
        unstyled: { false: be },
        size: { '...size': ue },
        disabled: { true: {} },
      },
      defaultVariants: { unstyled: fe.TAMAGUI_HEADLESS === '1' },
    },
    {
      isInput: !0,
      accept: { placeholderTextColor: 'color', selectionColor: 'color' },
    }
  ),
  he = E.styleable((e, o) => {
    const r = m.useRef(null),
      n = D(o, r),
      a = me(e, n);
    return d.jsx(E, { ...a });
  });
function me(e, o) {
  const r = q(),
    n = se({ props: e, ref: o, isInput: !0 }),
    a = m.useMemo(() => {
      var f, b;
      const l = e.placeholderTextColor;
      return (
        ((f = r[l]) == null ? void 0 : f.get()) ??
        l ??
        ((b = r.placeholderColor) == null ? void 0 : b.get())
      );
    }, [e.placeholderTextColor, r]);
  return m.useMemo(
    () => ({
      ref: n.ref,
      readOnly: e.disabled,
      ...e,
      placeholderTextColor: a,
      onChangeText: n.onChangeText,
    }),
    [n.ref, n.onChangeText, e.disabled, e, a]
  );
}
const pe = (e) => {
    switch (e) {
      case 'display':
        return { fontSize: 40, lineHeight: 48, letterSpacing: -1 };
      case 'headline':
        return { fontSize: 32, lineHeight: 40, letterSpacing: -0.5 };
      case 'title':
        return { fontSize: 24, lineHeight: 32, letterSpacing: 0 };
      case 'section':
        return { fontSize: 18, lineHeight: 24, letterSpacing: 0 };
      case 'body':
        return { fontSize: 16, lineHeight: 24, letterSpacing: 0.15 };
      case 'subtitle':
        return { fontSize: 14, lineHeight: 20, letterSpacing: 0.1 };
      case 'caption':
        return { fontSize: 12, lineHeight: 16, letterSpacing: 0.4 };
      case 'overline':
        return {
          fontSize: 12,
          lineHeight: 16,
          letterSpacing: 1,
          textTransform: 'uppercase',
        };
      default:
        return {};
    }
  },
  xe = (e) => {
    switch (e) {
      case 'light':
        return '300';
      case 'regular':
        return '400';
      case 'medium':
        return '500';
      case 'semibold':
        return '600';
      case 'bold':
        return '700';
      case 'extrabold':
        return '800';
      default:
        return '400';
    }
  },
  Se = (e) => {
    switch (e) {
      case 'tight':
        return 1.2;
      case 'normal':
        return 1.5;
      case 'relaxed':
        return 1.6;
      case 'loose':
        return 1.8;
      default:
        return 1.5;
    }
  };
S.memo(
  ({
    variant: e = 'body',
    weight: o = 'regular',
    color: r,
    align: n,
    transform: a,
    lineHeight: l,
    children: f,
    ...b
  }) => {
    const c = W(),
      u = () => {
        if (!r) return c.text;
        switch (r) {
          case 'primary':
            return c.primary;
          case 'secondary':
            return c.textSecondary;
          case 'tertiary':
            return c.textSecondary;
          case 'error':
            return c.error;
          case 'success':
            return c.success;
          case 'warning':
            return c.warning;
          case 'info':
            return c.info;
          default:
            return r;
        }
      },
      t = pe(e);
    return d.jsx(z, {
      ...t,
      fontWeight: xe(o),
      color: u(),
      textAlign: n,
      textTransform: a,
      lineHeight: l ? Se(l) : t.lineHeight,
      ...b,
      children: f,
    });
  }
);
const Be = {
  caption: y.tokens.size.caption,
  subtitle: y.tokens.size.subtitle,
  body: y.tokens.size.body,
  section: y.tokens.size.section,
  title: y.tokens.size.title,
  headline: y.tokens.size.headline,
};
I.create({
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    marginVertical: 2,
  },
  small: { minWidth: 60, height: 24 },
  medium: { minWidth: 80, height: 28 },
  large: { minWidth: 100, height: 32 },
  text: { fontWeight: 'bold', letterSpacing: 0.2 },
  smallText: { fontSize: 12 },
  mediumText: { fontSize: 14 },
  largeText: { fontSize: 16 },
});
const ye = w.createAnimatedComponent(Q);
S.memo(
  ({
    variant: e = 'primary',
    size: o = 'md',
    fullWidth: r,
    borderRadius: n = '$3',
    loading: a = !1,
    leftIcon: l,
    rightIcon: f,
    gradient: b = !1,
    children: c,
    onPress: u,
    disabled: t,
    ...h
  }) => {
    const i = W(),
      s = B(),
      p = () => {},
      $ = () => {},
      H = () => {
        switch (e) {
          case 'primary':
            return {
              backgroundColor: i.primary,
              color: i.textOnPrimary,
              borderColor: i.primary,
              borderWidth: 0,
              elevation: 3,
            };
          case 'secondary':
            return {
              backgroundColor: i.surfaceVariant,
              color: i.text,
              borderColor: i.border,
              borderWidth: 1,
              elevation: 1,
            };
          case 'outline':
            return {
              backgroundColor: 'transparent',
              color: i.primary,
              borderColor: i.primary,
              borderWidth: 1.5,
            };
          case 'ghost':
            return {
              backgroundColor: 'transparent',
              color: i.primary,
              borderColor: 'transparent',
              borderWidth: 0,
            };
          case 'gradient':
            return {
              backgroundColor: i.primary,
              color: i.textOnPrimary,
              borderWidth: 0,
              elevation: 6,
            };
          case 'danger':
            return {
              backgroundColor: i.error,
              color: i.textOnPrimary,
              borderColor: i.error,
              borderWidth: 0,
            };
          case 'success':
            return {
              backgroundColor: i.success,
              color: i.textOnPrimary,
              borderColor: i.success,
              borderWidth: 0,
            };
          default:
            return {};
        }
      },
      j = () => {
        switch (o) {
          case 'xs':
            return { height: 32, paddingHorizontal: 12, fontSize: 14 };
          case 'sm':
            return { height: 36, paddingHorizontal: 16, fontSize: 14 };
          case 'md':
            return { height: 44, paddingHorizontal: 20, fontSize: 16 };
          case 'lg':
            return { height: 52, paddingHorizontal: 24, fontSize: 18 };
          case 'xl':
            return { height: 60, paddingHorizontal: 32, fontSize: 20 };
          default:
            return { height: 44, paddingHorizontal: 20, fontSize: 16 };
        }
      },
      g = {
        ...H(),
        ...j(),
        borderRadius: typeof n == 'string' && n.startsWith('$') ? 8 : n,
        width: r ? '100%' : void 0,
        opacity: t ? 0.6 : 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
      },
      G = () => {
        switch (e) {
          case 'primary':
            return { boxShadow: '0px 2px 8px rgba(0,0,0,0.15)' };
          case 'secondary':
            return { boxShadow: '0px 1px 3px rgba(0,0,0,0.10)' };
          case 'gradient':
            return { boxShadow: '0px 4px 12px rgba(0,0,0,0.20)' };
          case 'danger':
            return { boxShadow: '0px 4px 12px rgba(211, 47, 47, 0.35)' };
          case 'success':
            return { boxShadow: '0px 4px 12px rgba(56, 142, 60, 0.30)' };
          default:
            return { boxShadow: '0px 1px 2px rgba(0,0,0,0.10)' };
        }
      };
    return d.jsx(ye, {
      style: s,
      onPressIn: p,
      onPressOut: $,
      onPress: t || a ? void 0 : u,
      disabled: t || a,
      children: d.jsx(C, {
        style: {
          backgroundColor: g.backgroundColor,
          borderColor: g.borderColor,
          borderWidth: g.borderWidth,
          borderRadius: g.borderRadius,
          height: g.height,
          paddingHorizontal: g.paddingHorizontal,
          width: g.width,
          opacity: g.opacity,
          flexDirection: g.flexDirection,
          alignItems: g.alignItems,
          justifyContent: g.justifyContent,
          gap: g.gap,
          ...G(),
        },
        children: a
          ? d.jsx(F, {
              style: { color: g.color, fontSize: g.fontSize },
              children: 'Loading...',
            })
          : d.jsxs(C, {
              style: { flexDirection: 'row', alignItems: 'center', gap: 8 },
              children: [
                l && d.jsx(C, { children: l }),
                d.jsx(F, {
                  style: { color: g.color, fontSize: g.fontSize },
                  children: c,
                }),
                f && d.jsx(C, { children: f }),
              ],
            }),
      }),
    });
  }
);
I.create({ buttonIcon: { marginRight: x.sm } });
const Ce = w.createAnimatedComponent(ae),
  ze = w.createAnimatedComponent(he);
S.memo(
  ({
    label: e,
    helper: o,
    error: r,
    required: n,
    leftIcon: a,
    rightIcon: l,
    variant: f = 'default',
    size: b = 'md',
    ...c
  }) => {
    const u = W(),
      [t, h] = S.useState(!1);
    Z(u.border);
    const i = B(),
      s = () => {
        h(!0), L(r ? u.error : u.borderFocus);
      },
      p = () => {
        h(!1), L(r ? u.error : u.border);
      },
      $ = () => {
        switch (f) {
          case 'filled':
            return {
              backgroundColor: '$surfaceVariant',
              borderWidth: 0,
              borderColor: 'transparent',
            };
          case 'outlined':
            return {
              backgroundColor: 'transparent',
              borderWidth: 1.5,
              borderColor: r
                ? '$danger'
                : t
                  ? '$borderColorFocus'
                  : '$borderColor',
            };
          case 'ghost':
            return {
              backgroundColor: 'transparent',
              borderWidth: 0,
              borderColor: 'transparent',
            };
          default:
            return {
              backgroundColor: '$backgroundStrong',
              borderWidth: 1,
              borderColor: r
                ? '$danger'
                : t
                  ? '$borderColorFocus'
                  : '$borderColor',
            };
        }
      },
      H = () => {
        switch (b) {
          case 'sm':
            return { height: 36, paddingHorizontal: 12, fontSize: 14 };
          case 'lg':
            return { height: 52, paddingHorizontal: 20, fontSize: 18 };
          default:
            return { height: 44, paddingHorizontal: 16, fontSize: 16 };
        }
      },
      j = { borderRadius: '$3', ...$(), ...H() },
      g = {
        boxShadow: t
          ? '0px 2px 8px rgba(0,0,0,0.12)'
          : '0px 1px 4px rgba(0,0,0,0.08)',
      };
    return d.jsxs(Ce, {
      space: '$2',
      asChild: !1,
      children: [
        e &&
          d.jsxs(de, {
            fontSize: 14,
            fontWeight: '600',
            color: r ? '$danger' : t ? '$primary' : '$color',
            children: [e, n && d.jsx(z, { color: '$danger', children: ' *' })],
          }),
        d.jsxs(ne, {
          alignItems: 'center',
          position: 'relative',
          children: [
            a &&
              d.jsx(P, {
                position: 'absolute',
                left: '$3',
                zIndex: 1,
                opacity: t ? 1 : 0.6,
                children: a,
              }),
            d.jsx(ze, {
              style: [i, g],
              ...j,
              paddingLeft: a ? '$10' : 0,
              paddingRight: l ? '$10' : 0,
              onFocus: s,
              onBlur: p,
              placeholderTextColor: u.textSecondary,
              ...c,
            }),
            l &&
              d.jsx(P, {
                position: 'absolute',
                right: '$3',
                zIndex: 1,
                opacity: t ? 1 : 0.6,
                children: l,
              }),
          ],
        }),
        r
          ? d.jsx(w.View, {
              children: d.jsx(z, {
                fontSize: 12,
                color: '$danger',
                fontWeight: '500',
                children: r,
              }),
            })
          : o
            ? d.jsx(z, {
                fontSize: 12,
                color: '$colorPress',
                opacity: 0.8,
                children: o,
              })
            : null,
      ],
    });
  }
);
I.create({
  container: { marginBottom: x.lg },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: K.lg,
    paddingHorizontal: x.md,
    minHeight: 60,
    position: 'relative',
  },
  inputError: {
    borderColor: T.status.error,
    backgroundColor: 'rgba(255, 245, 245, 0.95)',
  },
  iconContainer: {
    marginRight: x.sm,
    justifyContent: 'center',
    alignItems: 'center',
    width: 24,
    height: 24,
  },
  input: {
    flex: 1,
    fontSize: V.fontSize.lg,
    fontFamily: V.fontFamily.regular,
    color: T.neutral.darkGray,
    paddingBottom: 8,
    paddingLeft: x.xs,
  },
  passwordToggle: {
    padding: x.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: x.xs,
    paddingHorizontal: x.sm,
  },
  errorText: { ...J.caption, color: T.status.error, marginLeft: x.xs, flex: 1 },
});
export { Be as f };
