import { j as t } from './jsx-runtime-BjG_zV1W.js';
import { E as l, G as o } from './Card-CjMSoBpJ.js';
import { g as n } from './ThemeProvider-CPKCwPQ2.js';
import './Stacks-CaMMwnuE.js';
import './styled-BAAga49T.js';
import './index-D_zSVikN.js';
import './async-storage-CbWkip1I.js';
const h = { title: 'Design System/Card Examples' },
  e = {
    render: (p, { globals: s }) => {
      const i = n(s.mode || 'light');
      return t.jsxs('div', {
        style: {
          display: 'grid',
          gap: 16,
          maxWidth: 420,
          color: i.colors.text,
        },
        children: [
          t.jsx(l, {
            mode: s.mode,
            children: t.jsxs('div', {
              style: { display: 'grid', gap: 8 },
              children: [
                t.jsx('strong', {
                  'data-testid': 'example-elevated-title',
                  children: 'Elevated Card',
                }),
                t.jsx('span', {
                  'data-testid': 'example-elevated-body',
                  children:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                }),
                t.jsx('button', { style: { padding: 8 }, children: 'Action' }),
              ],
            }),
          }),
          t.jsx(o, {
            mode: s.mode,
            children: t.jsxs('div', {
              style: { display: 'grid', gap: 8 },
              children: [
                t.jsx('strong', {
                  'data-testid': 'example-glass-title',
                  children: 'Glass Card',
                }),
                t.jsx('span', {
                  'data-testid': 'example-glass-body',
                  children: 'Frosted glass visual with translucent background.',
                }),
                t.jsx('button', { style: { padding: 8 }, children: 'Action' }),
              ],
            }),
          }),
        ],
      });
    },
  };
var a, d, r;
e.parameters = {
  ...e.parameters,
  docs: {
    ...((a = e.parameters) == null ? void 0 : a.docs),
    source: {
      originalSource: `{
  render: (_args, {
    globals
  }) => {
    const t = getTokens(globals.mode || 'light');
    return <div style={{
      display: 'grid',
      gap: 16,
      maxWidth: 420,
      color: t.colors.text
    }}>\r
        <ElevatedCard mode={globals.mode}>\r
          <div style={{
          display: 'grid',
          gap: 8
        }}>\r
            <strong data-testid="example-elevated-title">Elevated Card</strong>\r
            <span data-testid="example-elevated-body">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>\r
            <button style={{
            padding: 8
          }}>Action</button>\r
          </div>\r
        </ElevatedCard>\r
        <GlassCard mode={globals.mode}>\r
          <div style={{
          display: 'grid',
          gap: 8
        }}>\r
            <strong data-testid="example-glass-title">Glass Card</strong>\r
            <span data-testid="example-glass-body">Frosted glass visual with translucent background.</span>\r
            <button style={{
            padding: 8
          }}>Action</button>\r
          </div>\r
        </GlassCard>\r
      </div>;
  }
}`,
      ...((r = (d = e.parameters) == null ? void 0 : d.docs) == null
        ? void 0
        : r.source),
    },
  },
};
const b = ['WithContent'];
export { e as WithContent, b as __namedExportsOrder, h as default };
