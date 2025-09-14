import { j as o } from './jsx-runtime-BjG_zV1W.js';
import { u as b } from './safe-area-context-CkXQAMo9.js';
import { u as B } from './ThemeProvider-CPKCwPQ2.js';
import { R as D } from './tamagui.config-DUnZTQxR.js';
import { Y as n } from './Stacks-CaMMwnuE.js';
import { S as I } from './helpers-dEnf9ZHf.js';
const E = ({
  children: m,
  scroll: f = !1,
  padding: x = '$4',
  safeTop: d = !0,
  safeBottom: j = !0,
  gap: g,
  header: t,
  headerSticky: s = !0,
  headerShadow: r = !0,
  refreshing: v = !1,
  onRefresh: e,
  edgeToEdge: l = !1,
  statusBarPadding: S = !0,
  navigationBarPadding: k = !0,
}) => {
  const i = b(),
    C = B(),
    a = r ? (C ? 1 : 3) : 0,
    c = o.jsx(n, {
      flex: 1,
      backgroundColor: '$background',
      padding: x,
      space: g,
      children: m,
    }),
    p = d && (!l || S) ? i.top : 0,
    u = j && (!l || k) ? i.bottom : 0;
  return f
    ? o.jsxs(n, {
        flex: 1,
        children: [
          t && s ? o.jsx(n, { elevation: a, children: t }) : null,
          o.jsxs(I, {
            contentContainerStyle: { paddingTop: p, paddingBottom: u },
            refreshControl: e
              ? o.jsx(D, { refreshing: !!v, onRefresh: e })
              : void 0,
            children: [
              !s && t ? o.jsx(n, { elevation: r ? 2 : 0, children: t }) : null,
              c,
            ],
          }),
        ],
      })
    : o.jsxs(n, {
        flex: 1,
        paddingTop: p,
        paddingBottom: u,
        children: [t ? o.jsx(n, { elevation: a, children: t }) : null, c],
      });
};
export { E as S };
