import { j as e } from './jsx-runtime-BjG_zV1W.js';
import {
  O as t,
  H as s,
  T as a,
  S as m,
  a as l,
  C as p,
} from './Typography-B7n7iWty.js';
import './ThemeProvider-CPKCwPQ2.js';
import './index-D_zSVikN.js';
import './async-storage-CbWkip1I.js';
import './Text-DBu9YOJb.js';
import './styled-BAAga49T.js';
const H = { title: 'Design System/Typography' },
  i = {
    render: (c, { globals: o }) =>
      e.jsxs('div', {
        style: { display: 'grid', gap: 12 },
        children: [
          e.jsx(t, { mode: o.mode, children: 'Overline' }),
          e.jsx(s, { mode: o.mode, children: 'Headline' }),
          e.jsx(a, { mode: o.mode, children: 'Title' }),
          e.jsx(m, { mode: o.mode, children: 'Section' }),
          e.jsx(l, { mode: o.mode, children: 'Subtitle' }),
          e.jsx(p, { mode: o.mode, children: 'Caption' }),
        ],
      }),
  };
var r, d, n;
i.parameters = {
  ...i.parameters,
  docs: {
    ...((r = i.parameters) == null ? void 0 : r.docs),
    source: {
      originalSource: `{
  render: (_args, {
    globals
  }) => <div style={{
    display: 'grid',
    gap: 12
  }}>\r
      <Overline mode={globals.mode}>Overline</Overline>\r
      <Headline mode={globals.mode}>Headline</Headline>\r
      <Title mode={globals.mode}>Title</Title>\r
      <Section mode={globals.mode}>Section</Section>\r
      <Subtitle mode={globals.mode}>Subtitle</Subtitle>\r
      <Caption mode={globals.mode}>Caption</Caption>\r
    </div>
}`,
      ...((n = (d = i.parameters) == null ? void 0 : d.docs) == null
        ? void 0
        : n.source),
    },
  },
};
const b = ['Headers'];
export { i as Headers, b as __namedExportsOrder, H as default };
