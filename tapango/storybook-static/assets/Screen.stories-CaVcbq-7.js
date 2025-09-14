import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{S as s}from"./Screen-BQEPliQP.js";import"./helpers-1oZkv_34.js";import"./index-BjajBSh7.js";import{a as w,S as R}from"./ThemeProvider-D9J6blKF.js";import"./index-BpqH_MAA.js";import"./index-D2X6w8_q.js";import{T as n}from"./Text-ByT7FWjR.js";import{f as u}from"./AuthInput-Ck71U4Ms.js";import{Y as a,X as _}from"./Stacks-D13vZedA.js";import"./CountsContext-Bw8ENlWH.js";import"./safe-area-context-CkXQAMo9.js";import"./tamagui.config-DyWDXkOg.js";import"./index-I9HeoSGT.js";import"./async-storage-CbWkip1I.js";import"./index-DSP_w2Dc.js";import"./styled-mWt79f12.js";import"./index-kvkrzUxT.js";import"./reanimated-BQgZ-mHc.js";import"./index-DXO60C_r.js";import"./index-dXIajnYi.js";import"./index-K9F-JguH.js";import"./colors-DZ76hqBL.js";import"./iframe-Bgd7y2ez.js";const v=({title:r,subtitle:o,right:t,bottom:S})=>{const g=w();return e.jsxs(a,{padding:"$4",paddingBottom:"$2",backgroundColor:"$background",borderBottomWidth:1,borderColor:g.border,children:[e.jsxs(_,{justifyContent:"space-between",alignItems:"center",children:[e.jsxs(a,{children:[e.jsx(n,{fontSize:u.title,fontWeight:"700",children:r}),o?e.jsx(n,{color:g.textSecondary,fontSize:u.subtitle,children:o}):null]}),t]}),S?e.jsx(a,{marginTop:"$2",children:S}):null]})},se={title:"App/Layout/Screen",component:s,parameters:{layout:"fullscreen"},argTypes:{scroll:{control:"boolean"},headerSticky:{control:"boolean"},headerShadow:{control:"boolean"},safeTop:{control:"boolean"},safeBottom:{control:"boolean"},padding:{control:"text"},gap:{control:"text"}},args:{scroll:!0,headerSticky:!0,headerShadow:!0,safeTop:!0,safeBottom:!0,padding:"$4",gap:"$4"}},h=({title:r="Demo Header",subtitle:o="Sticky on scroll"})=>e.jsxs(a,{padding:"$4",paddingBottom:"$3",backgroundColor:"$background",borderBottomWidth:1,borderColor:"$borderColor",children:[e.jsx(n,{fontSize:20,fontWeight:"700",children:r}),e.jsx(n,{color:"$colorFocus",opacity:.8,children:o})]}),m=({i:r})=>e.jsxs(a,{padding:"$4",backgroundColor:"$color2",borderRadius:"$4",children:[e.jsxs(n,{children:["Item ",r]}),e.jsx(n,{opacity:.7,children:"Scrollable content line to demonstrate layout and spacing."})]}),i={render:r=>e.jsx(s,{...r,header:e.jsx(h,{title:"Feed",subtitle:"Sticky header + safe area"}),children:e.jsx(a,{space:"$4",children:Array.from({length:20}).map((o,t)=>e.jsx(m,{i:t+1},t))})})},c={args:{headerSticky:!1},render:r=>e.jsx(s,{...r,header:e.jsx(h,{title:"Inline Header",subtitle:"Header rendered within scroll"}),children:e.jsx(a,{space:"$4",children:Array.from({length:16}).map((o,t)=>e.jsx(m,{i:t+1},t))})})},l={args:{scroll:!0,refreshing:!1},render:r=>e.jsx(s,{...r,onRefresh:()=>{},header:e.jsx(h,{title:"Feed",subtitle:"RefreshControl (web disabled)"}),children:e.jsx(a,{space:"$4",children:Array.from({length:14}).map((o,t)=>e.jsx(m,{i:t+1},t))})})},d={args:{scroll:!1},render:r=>e.jsx(s,{...r,header:e.jsx(h,{title:"Static Screen",subtitle:"No scrolling"}),children:e.jsxs(a,{space:"$4",children:[e.jsx(n,{children:"This is a simple static screen. Safe-area padding is applied to the container when scroll is disabled."}),e.jsx(R,{height:160,backgroundColor:"$color2",borderRadius:"$4",alignItems:"center",justifyContent:"center",children:e.jsx(n,{children:"Content block"})})]})})},p={args:{scroll:!0,headerSticky:!0},render:r=>e.jsx(s,{...r,header:e.jsx(v,{title:"Orders",subtitle:"12 active shipments",right:e.jsx("div",{style:{fontSize:12,opacity:.7},children:"v1.0"})}),children:e.jsx(a,{space:"$4",children:Array.from({length:18}).map((o,t)=>e.jsx(m,{i:t+1},t))})})};var f,x,b;i.parameters={...i.parameters,docs:{...(f=i.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: args => <Screen {...args} header={<HeaderBar title='Feed' subtitle='Sticky header + safe area' />}>\r
      <YStack space='$4'>\r
        {Array.from({
        length: 20
      }).map((_, i) => <Item key={i} i={i + 1} />)}\r
      </YStack>\r
    </Screen>
}`,...(b=(x=i.parameters)==null?void 0:x.docs)==null?void 0:b.source}}};var j,k,y;c.parameters={...c.parameters,docs:{...(j=c.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    headerSticky: false
  },
  render: args => <Screen {...args} header={<HeaderBar title='Inline Header' subtitle='Header rendered within scroll' />}>\r
      <YStack space='$4'>\r
        {Array.from({
        length: 16
      }).map((_, i) => <Item key={i} i={i + 1} />)}\r
      </YStack>\r
    </Screen>
}`,...(y=(k=c.parameters)==null?void 0:k.docs)==null?void 0:y.source}}};var $,H,C;l.parameters={...l.parameters,docs:{...($=l.parameters)==null?void 0:$.docs,source:{originalSource:`{
  args: {
    scroll: true,
    refreshing: false
  },
  render: args => <Screen {...args} onRefresh={() => {
    /* no-op in web story */
  }} header={<HeaderBar title='Feed' subtitle='RefreshControl (web disabled)' />}>\r
      <YStack space='$4'>\r
        {Array.from({
        length: 14
      }).map((_, i) => <Item key={i} i={i + 1} />)}\r
      </YStack>\r
    </Screen>
}`,...(C=(H=l.parameters)==null?void 0:H.docs)==null?void 0:C.source}}};var A,I,T;d.parameters={...d.parameters,docs:{...(A=d.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    scroll: false
  },
  render: args => <Screen {...args} header={<HeaderBar title='Static Screen' subtitle='No scrolling' />}>\r
      <YStack space='$4'>\r
        <Text>\r
          This is a simple static screen. Safe-area padding is applied to the container when scroll\r
          is disabled.\r
        </Text>\r
        <Stack height={160} backgroundColor='$color2' borderRadius='$4' alignItems='center' justifyContent='center'>\r
          <Text>Content block</Text>\r
        </Stack>\r
      </YStack>\r
    </Screen>
}`,...(T=(I=d.parameters)==null?void 0:I.docs)==null?void 0:T.source}}};var W,Y,B;p.parameters={...p.parameters,docs:{...(W=p.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
    scroll: true,
    headerSticky: true
  },
  render: args => <Screen {...args} header={<AppHeader title='Orders' subtitle='12 active shipments' right={<div style={{
    fontSize: 12,
    opacity: 0.7
  }}>v1.0</div>} />}>\r
      <YStack space='$4'>\r
        {Array.from({
        length: 18
      }).map((_, i) => <Item key={i} i={i + 1} />)}\r
      </YStack>\r
    </Screen>
}`,...(B=(Y=p.parameters)==null?void 0:Y.docs)==null?void 0:B.source}}};const ie=["ScrollWithStickyHeader","ScrollWithInlineHeader","ScrollWithRefreshProp","StaticNoScroll","WithAppHeader"];export{c as ScrollWithInlineHeader,l as ScrollWithRefreshProp,i as ScrollWithStickyHeader,d as StaticNoScroll,p as WithAppHeader,ie as __namedExportsOrder,se as default};
