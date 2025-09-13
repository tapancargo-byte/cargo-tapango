import{j as e}from"./jsx-runtime-BjG_zV1W.js";import"./index-D_zSVikN.js";import{a as v}from"./ThemeProvider-BSGpWKhi.js";import"./AuthInput-ngg3XBvv.js";import{Y as n}from"./Stacks-DVCO43Vr.js";import"./async-storage-C2wsiYfb.js";import"./Text-BQtNj3ta.js";import"./styled-mACW7C1C.js";import"./tamagui.config-DwOb2zQE.js";import"./GorhomPortal-ChvPQWWZ.js";import"./index-VT2245Mq.js";import"./index-CwZLkw8e.js";import"./reanimated-BM04k8ie.js";import"./index-CrNYAGWA.js";import"./colors-LbdoWu_K.js";import"./helpers-Ds-U8hIE.js";import"./index-CvLpGnpU.js";const t=({value:r,height:a=6,backgroundColor:u,testID:h,...y})=>{const i=v();return e.jsx(n,{height:a,backgroundColor:u??i.border,borderRadius:9999,overflow:"hidden",role:"progressbar",testID:h,...y,children:e.jsx(n,{height:a,width:`${Math.max(0,Math.min(100,r))}%`,backgroundColor:i.primary})})},O={title:"Design System/ProgressBar",component:t,argTypes:{value:{control:{type:"number",min:0,max:100}},height:{control:{type:"number",min:2,max:24}}},args:{value:60,height:8}},o={render:r=>e.jsx("div",{style:{width:320},children:e.jsx(t,{...r})})},s={render:()=>e.jsx("div",{style:{display:"grid",gap:8,width:320},children:[0,10,25,50,75,100].map(r=>e.jsx(t,{value:r,height:8},r))})};var m,d,p;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`{
  render: args => <div style={{
    width: 320
  }}>\r
      <ProgressBar {...args} />\r
    </div>
}`,...(p=(d=o.parameters)==null?void 0:d.docs)==null?void 0:p.source}}};var l,c,g;s.parameters={...s.parameters,docs:{...(l=s.parameters)==null?void 0:l.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'grid',
    gap: 8,
    width: 320
  }}>\r
      {[0, 10, 25, 50, 75, 100].map(v => <ProgressBar key={v} value={v} height={8} />)}\r
    </div>
}`,...(g=(c=s.parameters)==null?void 0:c.docs)==null?void 0:g.source}}};const T=["Playground","Values"];export{o as Playground,s as Values,T as __namedExportsOrder,O as default};
