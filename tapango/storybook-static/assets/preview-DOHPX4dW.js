const __vite__mapDeps = (
  i,
  m = __vite__mapDeps,
  d = m.f ||
    (m.f = [
      './DocsRenderer-CFRXHY34-C37_Z8hs.js',
      './iframe-DsfuI7Jb.js',
      './index-D_zSVikN.js',
      './jsx-runtime-BjG_zV1W.js',
      './index-VT2245Mq.js',
      './index-a2dmXB6W.js',
      './index-DrFu-skq.js',
      './react-18-LFjkN7sG.js',
    ])
) => i.map((i) => d[i]);
import { _ as o } from './iframe-DsfuI7Jb.js';
var s = Object.defineProperty,
  i = (e, r) => {
    for (var t in r) s(e, t, { get: r[t], enumerable: !0 });
  },
  n = {};
i(n, { parameters: () => d });
var _ = Object.entries(globalThis.TAGS_OPTIONS ?? {}).reduce((e, r) => {
    let [t, a] = r;
    return a.excludeFromDocsStories && (e[t] = !0), e;
  }, {}),
  d = {
    docs: {
      renderer: async () => {
        let { DocsRenderer: e } = await o(
          async () => {
            const { DocsRenderer: r } = await import(
              './DocsRenderer-CFRXHY34-C37_Z8hs.js'
            ).then((t) => t.D);
            return { DocsRenderer: r };
          },
          __vite__mapDeps([0, 1, 2, 3, 4, 5, 6, 7]),
          import.meta.url
        );
        return new e();
      },
      stories: {
        filter: (e) => {
          var r;
          return (
            (e.tags || []).filter((t) => _[t]).length === 0 &&
            !((r = e.parameters.docs) != null && r.disable)
          );
        },
      },
    },
  };
export { d as parameters };
