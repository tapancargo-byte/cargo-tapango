import{j as t}from"./jsx-runtime-D_zvdyIk.js";import{E as i,G as o}from"./Card-Ba261Cte.js";import{g as l}from"./ThemeProvider-D9J6blKF.js";import"./types-DJ5WtwRU.js";import"./Stacks-D13vZedA.js";import"./styled-mWt79f12.js";import"./index-BjajBSh7.js";import"./async-storage-CbWkip1I.js";const b={title:"Design System/Card Examples"},e={render:(p,{globals:s})=>{const r=l(s.mode||"light");return t.jsxs("div",{style:{display:"grid",gap:16,maxWidth:420,color:r.colors.text},children:[t.jsx(i,{mode:s.mode,children:t.jsxs("div",{style:{display:"grid",gap:8},children:[t.jsx("strong",{"data-testid":"example-elevated-title",children:"Elevated Card"}),t.jsx("span",{"data-testid":"example-elevated-body",children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit."}),t.jsx("button",{style:{padding:8},children:"Action"})]})}),t.jsx(o,{mode:s.mode,children:t.jsxs("div",{style:{display:"grid",gap:8},children:[t.jsx("strong",{"data-testid":"example-glass-title",children:"Glass Card"}),t.jsx("span",{"data-testid":"example-glass-body",children:"Frosted glass visual with translucent background."}),t.jsx("button",{style:{padding:8},children:"Action"})]})})]})}};var a,d,n;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`{
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
            <strong data-testid='example-elevated-title'>Elevated Card</strong>\r
            <span data-testid='example-elevated-body'>\r
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.\r
            </span>\r
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
            <strong data-testid='example-glass-title'>Glass Card</strong>\r
            <span data-testid='example-glass-body'>\r
              Frosted glass visual with translucent background.\r
            </span>\r
            <button style={{
            padding: 8
          }}>Action</button>\r
          </div>\r
        </GlassCard>\r
      </div>;
  }
}`,...(n=(d=e.parameters)==null?void 0:d.docs)==null?void 0:n.source}}};const j=["WithContent"];export{e as WithContent,j as __namedExportsOrder,b as default};
