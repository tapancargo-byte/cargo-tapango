import{j as t}from"./jsx-runtime-BjG_zV1W.js";import"./helpers-Ds-U8hIE.js";import"./index-D_zSVikN.js";import{u as q,g as F,S as b}from"./ThemeProvider-BSGpWKhi.js";import"./GorhomPortal-ChvPQWWZ.js";import"./index-VT2245Mq.js";import{T as G}from"./Text-BQtNj3ta.js";import{u as J,A as K,M as N}from"./reanimated-BM04k8ie.js";import{X as Q}from"./Stacks-DVCO43Vr.js";import"./styled-mACW7C1C.js";import"./index-CwZLkw8e.js";import"./async-storage-C2wsiYfb.js";import"./index-CrNYAGWA.js";const U=(r=.97)=>{const e=()=>{},d=()=>{};return{animatedStyle:J(),onPressIn:e,onPressOut:d}},Y={xs:{height:28,paddingHorizontal:10,fontSize:12,icon:12},sm:{height:36,paddingHorizontal:12,fontSize:14,icon:14},md:{height:44,paddingHorizontal:16,fontSize:16,icon:16},lg:{height:52,paddingHorizontal:18,fontSize:16,icon:18},xl:{height:60,paddingHorizontal:20,fontSize:18,icon:20}},c=({children:r,variant:e="primary",size:d="md",fullWidth:g,disabled:l,leftIcon:u,rightIcon:y,onPress:m,style:w,mode:O="light",flex:R,loading:Z,animation:ee,title:$,marginTop:n,borderRadius:D,...h})=>{const x=(()=>{try{return q()}catch{return O==="dark"}})(),S=F(x?"dark":"light"),{animatedStyle:M,onPressIn:V,onPressOut:W}=U(),p=Y[d],s=S.colors,f=e==="primary"?s.primary:e==="secondary"?s.secondary:e==="danger"?s.danger:e==="success"?s.success:s.primary,E=e==="outline"||e==="ghost"?"transparent":f,L=e==="outline"||e==="ghost"?s.text:s.textOnPrimary,z=e==="outline"?f:"transparent",T=l?.6:1,X=async()=>{if(!l){try{await(void 0)()}catch{}await(m==null?void 0:m())}},_=typeof n=="string"&&n.startsWith("$")?(()=>{try{return S.spacing[n.slice(1)]??0}catch{return 0}})():typeof n=="number"?n:void 0;return t.jsx(K.View,{style:[{width:g?"100%":void 0,flex:R,marginTop:_},M],children:t.jsx(N,{onPressIn:V,onPressOut:W,onPress:X,disabled:l,style:[{height:p.height,paddingHorizontal:p.paddingHorizontal,alignItems:"center",justifyContent:"center",backgroundColor:E,borderRadius:D??12,borderWidth:z==="transparent"?0:1,borderColor:z,opacity:T},w],accessibilityRole:h.accessibilityRole??"button",...h,children:t.jsxs(Q,{alignItems:"center",justifyContent:"center",space:"$2",children:[u?t.jsx(b,{children:u}):null,t.jsx(G,{color:L,fontWeight:"700",fontSize:p.fontSize,children:r??$}),y?t.jsx(b,{children:y}):null]})})})},ue={title:"Design System/Button",component:c,argTypes:{mode:{control:{type:"inline-radio"},options:["light","dark"]},variant:{control:{type:"select"},options:["primary","secondary","outline","ghost","danger","success","gradient"]},size:{control:{type:"select"},options:["xs","sm","md","lg","xl"]}},args:{mode:"light",variant:"primary",size:"md",children:"Button"}},o={args:{mode:"light"},render:r=>t.jsx(c,{...r})},i={render:r=>t.jsx("div",{style:{display:"grid",gap:12},children:["primary","secondary","outline","ghost","danger","success"].map(e=>t.jsx(c,{variant:e,mode:r.mode,accessibilityLabel:`button-${e}`,children:e},e))})},a={render:r=>t.jsx("div",{style:{display:"flex",gap:8,alignItems:"center"},children:["xs","sm","md","lg","xl"].map(e=>t.jsx(c,{size:e,mode:r.mode,children:e},e))})};var j,k,B;o.parameters={...o.parameters,docs:{...(j=o.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    mode: 'light'
  },
  render: args => <Button {...args} />
}`,...(B=(k=o.parameters)==null?void 0:k.docs)==null?void 0:B.source}}};var v,H,P;i.parameters={...i.parameters,docs:{...(v=i.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: args => <div style={{
    display: 'grid',
    gap: 12
  }}>\r
      {['primary', 'secondary', 'outline', 'ghost', 'danger', 'success'].map(v => <Button key={v} variant={v as any} mode={args.mode} accessibilityLabel={\`button-\${v}\`}>\r
          {v}\r
        </Button>)}\r
    </div>
}`,...(P=(H=i.parameters)==null?void 0:H.docs)==null?void 0:P.source}}};var C,A,I;a.parameters={...a.parameters,docs:{...(C=a.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: args => <div style={{
    display: 'flex',
    gap: 8,
    alignItems: 'center'
  }}>\r
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map(s => <Button key={s} size={s} mode={args.mode}>\r
          {s}\r
        </Button>)}\r
    </div>
}`,...(I=(A=a.parameters)==null?void 0:A.docs)==null?void 0:I.source}}};const ye=["Playground","AllVariants","Sizes"];export{i as AllVariants,o as Playground,a as Sizes,ye as __namedExportsOrder,ue as default};
