import { j as e } from './jsx-runtime-BjG_zV1W.js';
import { S as g } from './Screen-CtoA21lC.js';
import './index-D_zSVikN.js';
import { a as S, u as j } from './ThemeProvider-CPKCwPQ2.js';
import { f as c } from './AuthInput-cxwUew5-.js';
import { Y as l, X as p } from './Stacks-CaMMwnuE.js';
import { T as d } from './Text-DBu9YOJb.js';
import './safe-area-context-CkXQAMo9.js';
import './tamagui.config-DUnZTQxR.js';
import './GorhomPortal-CbY2Y53n.js';
import './index-DaADHxGU.js';
import './async-storage-CbWkip1I.js';
import './index-VT2245Mq.js';
import './index-CMWoXOLJ.js';
import './helpers-dEnf9ZHf.js';
import './styled-BAAga49T.js';
import './reanimated-BZ2Cpo5K.js';
import './index-CrNYAGWA.js';
import './index-C4hRfBNc.js';
import './colors-CDEvqoSB.js';
const b = ({
    title: i,
    subtitle: t,
    right: o,
    paddingHorizontal: r = '$4',
    withShadow: n = !1,
  }) => {
    const s = S(),
      x = j(),
      f = n ? (x ? 1 : 2) : 0;
    return e.jsx(l, {
      elevation: f,
      backgroundColor: n ? '$background' : void 0,
      children: e.jsxs(p, {
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: r,
        paddingVertical: '$2',
        children: [
          e.jsxs(l, {
            children: [
              e.jsx(d, { fontSize: c.section, fontWeight: '700', children: i }),
              t
                ? e.jsx(d, {
                    color: s.textSecondary,
                    fontSize: c.caption,
                    children: t,
                  })
                : null,
            ],
          }),
          o,
        ],
      }),
    });
  },
  y = ({ left: i, title: t, subtitle: o, right: r, onPress: n }) => {
    const s = S();
    return e.jsxs(p, {
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '$3',
      borderRadius: '$4',
      backgroundColor: s.surface,
      borderWidth: 1,
      borderColor: s.border,
      onPress: n,
      children: [
        e.jsxs(p, {
          alignItems: 'center',
          space: '$3',
          children: [
            i,
            e.jsxs(l, {
              children: [
                e.jsx(d, { fontSize: c.body, fontWeight: '600', children: t }),
                o
                  ? e.jsx(d, {
                      fontSize: c.caption,
                      color: s.textSecondary,
                      children: o,
                    })
                  : null,
              ],
            }),
          ],
        }),
        r,
      ],
    });
  },
  q = { title: 'App/Layout/List Screen' },
  a = {
    render: (i, { globals: t }) =>
      e.jsx(g, {
        scroll: !0,
        header: e.jsx(b, {
          title: 'Shipments',
          subtitle: 'Recent',
          withShadow: !0,
        }),
        children: e.jsx(l, {
          space: '$3',
          children: Array.from({ length: 12 }).map((o, r) =>
            e.jsx(
              y,
              {
                title: `Order #${1e3 + r}`,
                subtitle: r % 2 ? 'On Schedule' : 'In Transit',
                right: e.jsx('span', {
                  style: { opacity: 0.7 },
                  children: 'View',
                }),
              },
              r
            )
          ),
        }),
      }),
  };
var m, h, u;
a.parameters = {
  ...a.parameters,
  docs: {
    ...((m = a.parameters) == null ? void 0 : m.docs),
    source: {
      originalSource: `{
  render: (_args, {
    globals
  }) => <Screen scroll header={<SectionHeader title="Shipments" subtitle="Recent" withShadow />}>\r
      <YStack space="$3">\r
        {Array.from({
        length: 12
      }).map((_, i) => <ListRow key={i} title={\`Order #\${1000 + i}\`} subtitle={i % 2 ? 'On Schedule' : 'In Transit'} right={<span style={{
        opacity: 0.7
      }}>View</span>} />)}\r
      </YStack>\r
    </Screen>
}`,
      ...((u = (h = a.parameters) == null ? void 0 : h.docs) == null
        ? void 0
        : u.source),
    },
  },
};
const B = ['DenseList'];
export { a as DenseList, B as __namedExportsOrder, q as default };
