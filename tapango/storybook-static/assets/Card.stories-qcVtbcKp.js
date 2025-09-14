import{j as d}from"./jsx-runtime-D_zvdyIk.js";import{C as o,E as n,G as l,O as c,F as m}from"./Card-Ba261Cte.js";import{g as p}from"./ThemeProvider-D9J6blKF.js";import"./types-DJ5WtwRU.js";import"./Stacks-D13vZedA.js";import"./styled-mWt79f12.js";import"./index-BjajBSh7.js";import"./async-storage-CbWkip1I.js";const E={title:"Design System/Card",component:o,argTypes:{mode:{control:{type:"inline-radio"},options:["light","dark"]}},args:{mode:"light"}},r={render:a=>{const s=p(a.mode);return d.jsxs("div",{style:{display:"grid",gap:16,color:s.colors.text},children:[d.jsx(o,{mode:a.mode,children:d.jsx("div",{"data-testid":"card-caption-default",children:"Default Card"})}),d.jsx(n,{mode:a.mode,children:d.jsx("div",{"data-testid":"card-caption-elevated",children:"Elevated Card"})}),d.jsx(l,{mode:a.mode,children:d.jsx("div",{"data-testid":"card-caption-glass",children:"Glass Card"})}),d.jsx(c,{mode:a.mode,children:d.jsx("div",{"data-testid":"card-caption-outlined",children:"Outlined Card"})}),d.jsx(m,{mode:a.mode,children:d.jsx("div",{"data-testid":"card-caption-flat",children:"Flat Card"})})]})}};var t,e,i;r.parameters={...r.parameters,docs:{...(t=r.parameters)==null?void 0:t.docs,source:{originalSource:`{
  render: args => {
    const t = getTokens(args.mode);
    return <div style={{
      display: 'grid',
      gap: 16,
      color: t.colors.text
    }}>\r
        <Card mode={args.mode}>\r
          <div data-testid='card-caption-default'>Default Card</div>\r
        </Card>\r
        <ElevatedCard mode={args.mode}>\r
          <div data-testid='card-caption-elevated'>Elevated Card</div>\r
        </ElevatedCard>\r
        <GlassCard mode={args.mode}>\r
          <div data-testid='card-caption-glass'>Glass Card</div>\r
        </GlassCard>\r
        <OutlinedCard mode={args.mode}>\r
          <div data-testid='card-caption-outlined'>Outlined Card</div>\r
        </OutlinedCard>\r
        <FlatCard mode={args.mode}>\r
          <div data-testid='card-caption-flat'>Flat Card</div>\r
        </FlatCard>\r
      </div>;
  }
}`,...(i=(e=r.parameters)==null?void 0:e.docs)==null?void 0:i.source}}};const y=["Variants"];export{r as Variants,y as __namedExportsOrder,E as default};
