import { j as t } from './jsx-runtime-BjG_zV1W.js';
import './helpers-dEnf9ZHf.js';
import './index-D_zSVikN.js';
import { u as G, g as q, S as b } from './ThemeProvider-CPKCwPQ2.js';
import './GorhomPortal-CbY2Y53n.js';
import './index-VT2245Mq.js';
import { T as F } from './Text-DBu9YOJb.js';
import { u as J, A as K, M as N } from './reanimated-BZ2Cpo5K.js';
import { L as Q } from './expo-linear-gradient-C63kpUyb.js';
import { X as U } from './Stacks-CaMMwnuE.js';
import './styled-BAAga49T.js';
import './index-DaADHxGU.js';
import './async-storage-CbWkip1I.js';
import './index-CrNYAGWA.js';
async function Y() {}
const Z = (r = 0.97) => {
    const e = () => {},
      d = () => {};
    return { animatedStyle: J(), onPressIn: e, onPressOut: d };
  },
  ee = {
    xs: { height: 28, paddingHorizontal: 10, fontSize: 12, icon: 12 },
    sm: { height: 36, paddingHorizontal: 12, fontSize: 14, icon: 14 },
    md: { height: 44, paddingHorizontal: 16, fontSize: 16, icon: 16 },
    lg: { height: 52, paddingHorizontal: 18, fontSize: 16, icon: 18 },
    xl: { height: 60, paddingHorizontal: 20, fontSize: 18, icon: 20 },
  },
  c = ({
    children: r,
    variant: e = 'primary',
    size: d = 'md',
    fullWidth: g,
    disabled: l,
    leftIcon: u,
    rightIcon: y,
    onPress: m,
    style: I,
    mode: L = 'light',
    flex: O,
    loading: te,
    animation: se,
    title: R,
    marginTop: n,
    borderRadius: $,
    ...h
  }) => {
    const x = (() => {
        try {
          return G();
        } catch {
          return L === 'dark';
        }
      })(),
      f = q(x ? 'dark' : 'light'),
      { animatedStyle: D, onPressIn: M, onPressOut: V } = Z(),
      p = ee[d],
      s = f.colors,
      S =
        e === 'primary'
          ? s.primary
          : e === 'secondary'
            ? s.secondary
            : e === 'danger'
              ? s.danger
              : e === 'success'
                ? s.success
                : s.primary,
      W = e === 'outline' || e === 'ghost' ? 'transparent' : S,
      E = e === 'outline' || e === 'ghost' ? s.text : s.textOnPrimary,
      z = e === 'outline' ? S : 'transparent',
      T = l ? 0.6 : 1,
      X = async () => {
        if (!l) {
          try {
            await Y();
          } catch {}
          await (m == null ? void 0 : m());
        }
      },
      _ =
        typeof n == 'string' && n.startsWith('$')
          ? (() => {
              try {
                return f.spacing[n.slice(1)] ?? 0;
              } catch {
                return 0;
              }
            })()
          : typeof n == 'number'
            ? n
            : void 0;
    return t.jsx(K.View, {
      style: [{ width: g ? '100%' : void 0, flex: O, marginTop: _ }, D],
      children: t.jsxs(N, {
        onPressIn: M,
        onPressOut: V,
        onPress: X,
        disabled: l,
        style: [
          {
            height: p.height,
            paddingHorizontal: p.paddingHorizontal,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: W,
            borderRadius: $ ?? 12,
            borderWidth: z === 'transparent' ? 0 : 1,
            borderColor: z,
            overflow: 'hidden',
            opacity: T,
          },
          I,
        ],
        accessibilityRole: h.accessibilityRole ?? 'button',
        ...h,
        children: [
          e === 'gradient'
            ? t.jsx(Q, {
                colors: [s.primary, s.secondary],
                start: { x: 0, y: 0 },
                end: { x: 1, y: 1 },
                style: { position: 'absolute', inset: 0 },
              })
            : null,
          t.jsxs(U, {
            alignItems: 'center',
            justifyContent: 'center',
            space: '$2',
            children: [
              u ? t.jsx(b, { children: u }) : null,
              t.jsx(F, {
                color: E,
                fontWeight: '700',
                fontSize: p.fontSize,
                children: r ?? R,
              }),
              y ? t.jsx(b, { children: y }) : null,
            ],
          }),
        ],
      }),
    });
  },
  xe = {
    title: 'Design System/Button',
    component: c,
    argTypes: {
      mode: { control: { type: 'inline-radio' }, options: ['light', 'dark'] },
      variant: {
        control: { type: 'select' },
        options: [
          'primary',
          'secondary',
          'outline',
          'ghost',
          'danger',
          'success',
          'gradient',
        ],
      },
      size: {
        control: { type: 'select' },
        options: ['xs', 'sm', 'md', 'lg', 'xl'],
      },
    },
    args: { mode: 'light', variant: 'primary', size: 'md', children: 'Button' },
  },
  o = { args: { mode: 'light' }, render: (r) => t.jsx(c, { ...r }) },
  i = {
    render: (r) =>
      t.jsx('div', {
        style: { display: 'grid', gap: 12 },
        children: [
          'primary',
          'secondary',
          'outline',
          'ghost',
          'danger',
          'success',
        ].map((e) =>
          t.jsx(
            c,
            {
              variant: e,
              mode: r.mode,
              accessibilityLabel: `button-${e}`,
              children: e,
            },
            e
          )
        ),
      }),
  },
  a = {
    render: (r) =>
      t.jsx('div', {
        style: { display: 'flex', gap: 8, alignItems: 'center' },
        children: ['xs', 'sm', 'md', 'lg', 'xl'].map((e) =>
          t.jsx(c, { size: e, mode: r.mode, children: e }, e)
        ),
      }),
  };
var j, k, B;
o.parameters = {
  ...o.parameters,
  docs: {
    ...((j = o.parameters) == null ? void 0 : j.docs),
    source: {
      originalSource: `{
  args: {
    mode: 'light'
  },
  render: args => <Button {...args} />
}`,
      ...((B = (k = o.parameters) == null ? void 0 : k.docs) == null
        ? void 0
        : B.source),
    },
  },
};
var v, H, P;
i.parameters = {
  ...i.parameters,
  docs: {
    ...((v = i.parameters) == null ? void 0 : v.docs),
    source: {
      originalSource: `{
  render: args => <div style={{
    display: 'grid',
    gap: 12
  }}>\r
      {['primary', 'secondary', 'outline', 'ghost', 'danger', 'success'].map(v => <Button key={v} variant={v as any} mode={args.mode} accessibilityLabel={\`button-\${v}\`}>\r
          {v}\r
        </Button>)}\r
    </div>
}`,
      ...((P = (H = i.parameters) == null ? void 0 : H.docs) == null
        ? void 0
        : P.source),
    },
  },
};
var A, C, w;
a.parameters = {
  ...a.parameters,
  docs: {
    ...((A = a.parameters) == null ? void 0 : A.docs),
    source: {
      originalSource: `{
  render: args => <div style={{
    display: 'flex',
    gap: 8,
    alignItems: 'center'
  }}>\r
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map(s => <Button key={s} size={s} mode={args.mode}>\r
          {s}\r
        </Button>)}\r
    </div>
}`,
      ...((w = (C = a.parameters) == null ? void 0 : C.docs) == null
        ? void 0
        : w.source),
    },
  },
};
const fe = ['Playground', 'AllVariants', 'Sizes'];
export {
  i as AllVariants,
  o as Playground,
  a as Sizes,
  fe as __namedExportsOrder,
  xe as default,
};
