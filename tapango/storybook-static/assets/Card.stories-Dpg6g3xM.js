import { j as d } from './jsx-runtime-BjG_zV1W.js';
import { C as o, E as l, G as n, O as c, F as m } from './Card-CjMSoBpJ.js';
import { g as p } from './ThemeProvider-CPKCwPQ2.js';
import './Stacks-CaMMwnuE.js';
import './styled-BAAga49T.js';
import './index-D_zSVikN.js';
import './async-storage-CbWkip1I.js';
const f = {
    title: 'Design System/Card',
    component: o,
    argTypes: {
      mode: { control: { type: 'inline-radio' }, options: ['light', 'dark'] },
    },
    args: { mode: 'light' },
  },
  t = {
    render: (a) => {
      const s = p(a.mode);
      return d.jsxs('div', {
        style: { display: 'grid', gap: 16, color: s.colors.text },
        children: [
          d.jsx(o, {
            mode: a.mode,
            children: d.jsx('div', {
              'data-testid': 'card-caption-default',
              children: 'Default Card',
            }),
          }),
          d.jsx(l, {
            mode: a.mode,
            children: d.jsx('div', {
              'data-testid': 'card-caption-elevated',
              children: 'Elevated Card',
            }),
          }),
          d.jsx(n, {
            mode: a.mode,
            children: d.jsx('div', {
              'data-testid': 'card-caption-glass',
              children: 'Glass Card',
            }),
          }),
          d.jsx(c, {
            mode: a.mode,
            children: d.jsx('div', {
              'data-testid': 'card-caption-outlined',
              children: 'Outlined Card',
            }),
          }),
          d.jsx(m, {
            mode: a.mode,
            children: d.jsx('div', {
              'data-testid': 'card-caption-flat',
              children: 'Flat Card',
            }),
          }),
        ],
      });
    },
  };
var e, r, i;
t.parameters = {
  ...t.parameters,
  docs: {
    ...((e = t.parameters) == null ? void 0 : e.docs),
    source: {
      originalSource: `{
  render: args => {
    const t = getTokens(args.mode);
    return <div style={{
      display: 'grid',
      gap: 16,
      color: t.colors.text
    }}>\r
        <Card mode={args.mode}><div data-testid="card-caption-default">Default Card</div></Card>\r
        <ElevatedCard mode={args.mode}><div data-testid="card-caption-elevated">Elevated Card</div></ElevatedCard>\r
        <GlassCard mode={args.mode}><div data-testid="card-caption-glass">Glass Card</div></GlassCard>\r
        <OutlinedCard mode={args.mode}><div data-testid="card-caption-outlined">Outlined Card</div></OutlinedCard>\r
        <FlatCard mode={args.mode}><div data-testid="card-caption-flat">Flat Card</div></FlatCard>\r
      </div>;
  }
}`,
      ...((i = (r = t.parameters) == null ? void 0 : r.docs) == null
        ? void 0
        : i.source),
    },
  },
};
const E = ['Variants'];
export { t as Variants, E as __namedExportsOrder, f as default };
