import{j as o}from"./jsx-runtime-D_zvdyIk.js";import"./index-BjajBSh7.js";import{a as v}from"./ThemeProvider-D9J6blKF.js";import"./AuthInput-Ck71U4Ms.js";import{Y as m}from"./Stacks-D13vZedA.js";import"./CountsContext-Bw8ENlWH.js";import"./async-storage-CbWkip1I.js";import"./Text-ByT7FWjR.js";import"./styled-mWt79f12.js";import"./tamagui.config-DyWDXkOg.js";import"./index-BpqH_MAA.js";import"./index-D2X6w8_q.js";import"./index-kvkrzUxT.js";import"./index-I9HeoSGT.js";import"./index-DSP_w2Dc.js";import"./reanimated-BQgZ-mHc.js";import"./index-DXO60C_r.js";import"./index-dXIajnYi.js";import"./helpers-1oZkv_34.js";import"./index-K9F-JguH.js";import"./colors-DZ76hqBL.js";import"./iframe-Bgd7y2ez.js";const s=({value:r,height:a=6,backgroundColor:u,testID:h,...y})=>{const i=v();return o.jsx(m,{height:a,backgroundColor:u??i.border,borderRadius:9999,overflow:"hidden",role:"progressbar",testID:h,...y,children:o.jsx(m,{height:a,width:`${Math.max(0,Math.min(100,r))}%`,backgroundColor:i.primary})})},A={title:"Design System/ProgressBar",component:s,argTypes:{value:{control:{type:"number",min:0,max:100}},height:{control:{type:"number",min:2,max:24}}},args:{value:60,height:8}},e={render:r=>o.jsx("div",{style:{width:320},children:o.jsx(s,{...r})})},t={render:()=>o.jsx("div",{style:{display:"grid",gap:8,width:320},children:[0,10,25,50,75,100].map(r=>o.jsx(s,{value:r,height:8},r))})};var n,p,d;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`{
  render: args => <div style={{
    width: 320
  }}>\r
      <ProgressBar {...args} />\r
    </div>
}`,...(d=(p=e.parameters)==null?void 0:p.docs)==null?void 0:d.source}}};var l,c,g;t.parameters={...t.parameters,docs:{...(l=t.parameters)==null?void 0:l.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'grid',
    gap: 8,
    width: 320
  }}>\r
      {[0, 10, 25, 50, 75, 100].map(v => <ProgressBar key={v} value={v} height={8} />)}\r
    </div>
}`,...(g=(c=t.parameters)==null?void 0:c.docs)==null?void 0:g.source}}};const F=["Playground","Values"];export{e as Playground,t as Values,F as __namedExportsOrder,A as default};
