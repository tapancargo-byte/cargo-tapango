import { R as o } from './index-D_zSVikN.js';
import { t as d } from './tamagui.config-DUnZTQxR.js';
import { c as m, d as l } from './ThemeProvider-CPKCwPQ2.js';
import { Z as s, P as c } from './GorhomPortal-CbY2Y53n.js';
import './index-VT2245Mq.js';
import { j as r } from './jsx-runtime-BjG_zV1W.js';
import './index-DaADHxGU.js';
import './async-storage-CbWkip1I.js';
import './index-CMWoXOLJ.js';
const u = ({ children: t, ...e }) =>
  r.jsx(m, {
    ...e,
    children: r.jsx(s.Provider, {
      value: 1,
      children: r.jsx(c, { shouldAddRootHost: !0, children: t }),
    }),
  });
if (typeof document < 'u' && !document.querySelector('link[rel="icon"]')) {
  const e = document.createElement('link');
  (e.rel = 'icon'), (e.href = '/favicon.svg'), document.head.appendChild(e);
}
const j = {
  parameters: { docs: { disable: !0 }, controls: { expanded: !0 } },
  globalTypes: {
    mode: {
      name: 'Mode',
      description: 'Theme mode',
      defaultValue: 'light',
      toolbar: {
        icon: 'mirror',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        dynamicTitle: !0,
      },
    },
  },
  decorators: [
    (t, e) => {
      const a = e.globals.mode || 'light',
        i = a === 'dark' ? 'tapango_dark' : 'tapango_light',
        n = { ...e, args: { ...(e.args || {}), mode: a } };
      return o.createElement(
        u,
        { config: d, defaultTheme: i },
        o.createElement(l, null, o.createElement(t, n))
      );
    },
  ],
};
export { j as default };
