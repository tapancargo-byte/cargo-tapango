import{j as e}from"./jsx-runtime-D_zvdyIk.js";import"./helpers-1oZkv_34.js";import"./index-BjajBSh7.js";import{a as _,u as A,S as V}from"./ThemeProvider-D9J6blKF.js";import"./index-BpqH_MAA.js";import"./index-D2X6w8_q.js";import{T as B}from"./Text-ByT7FWjR.js";import{u as X}from"./safe-area-context-CkXQAMo9.js";import{u as Y}from"./CountsContext-Bw8ENlWH.js";import{M as G}from"./index-DXO60C_r.js";import{Y as d,X as Z}from"./Stacks-D13vZedA.js";import"./styled-mWt79f12.js";import"./index-I9HeoSGT.js";import"./async-storage-CbWkip1I.js";import"./index-kvkrzUxT.js";import"./iframe-Bgd7y2ez.js";import"./index-dXIajnYi.js";function q({name:t,size:i,color:n}){const a=n||"#666",r=i||24;switch(t){case"home":return e.jsxs("svg",{width:r,height:r,viewBox:"0 0 24 24",fill:"none",stroke:a,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M3 12L12 3l9 9"}),e.jsx("path",{d:"M9 21V12h6v9"}),e.jsx("path",{d:"M3 12v9h6M21 12v9h-6"})]});case"plus-circle":return e.jsxs("svg",{width:r,height:r,viewBox:"0 0 24 24",fill:"none",stroke:a,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("circle",{cx:"12",cy:"12",r:"9"}),e.jsx("path",{d:"M12 8v8M8 12h8"})]});case"map-pin":return e.jsxs("svg",{width:r,height:r,viewBox:"0 0 24 24",fill:"none",stroke:a,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M12 21s7-4.35 7-10a7 7 0 1 0-14 0c0 5.65 7 10 7 10z"}),e.jsx("circle",{cx:"12",cy:"11",r:"2.5"})]});case"list":return e.jsxs("svg",{width:r,height:r,viewBox:"0 0 24 24",fill:"none",stroke:a,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M8 6h12M8 12h12M8 18h12"}),e.jsx("circle",{cx:"4",cy:"6",r:"1"}),e.jsx("circle",{cx:"4",cy:"12",r:"1"}),e.jsx("circle",{cx:"4",cy:"18",r:"1"})]});case"user":return e.jsxs("svg",{width:r,height:r,viewBox:"0 0 24 24",fill:"none",stroke:a,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("circle",{cx:"12",cy:"8",r:"4"}),e.jsx("path",{d:"M4 20c2.2-3 6-4 8-4s5.8 1 8 4"})]});default:return e.jsx("div",{title:t,style:{display:"inline-block",width:r,height:r,background:"linear-gradient(135deg, rgba(200,200,220,0.35), rgba(160,160,190,0.2))",borderRadius:4}})}}function J(t){const{name:i,size:n=24,color:a="#666",style:r}=t||{};return e.jsx("span",{title:i,style:{display:"inline-flex",alignItems:"center",justifyContent:"center",width:n,height:n,...r},children:e.jsx(q,{name:i,size:n,color:a})})}const K=J,Q=22;function U(t){switch(t){case"index":return"home";case"booking":return"plus-circle";case"tracking":return"map-pin";case"orders":return"list";case"profile":return"user";default:return"home"}}const x=({state:t,descriptors:i,navigation:n})=>{var f;const a=X(),r=_();A();const y=(f=Y)==null?void 0:f(),W=12,D=Math.max(a.bottom-10,0);return e.jsx(d,{position:"relative",paddingHorizontal:W,paddingBottom:D,children:e.jsxs(d,{position:"relative",overflow:"hidden",borderRadius:14,borderWidth:1,borderColor:r.border,elevation:2,style:{shadowColor:"#000",shadowOpacity:.12,shadowRadius:12,shadowOffset:{width:0,height:4}},children:[e.jsx(d,{position:"absolute",left:0,right:0,top:0,bottom:0,backgroundColor:r.surface,opacity:.98}),e.jsx(d,{paddingTop:4,paddingBottom:4,children:e.jsx(Z,{alignItems:"center",justifyContent:"space-between",paddingHorizontal:14,children:t.routes.filter(s=>s.name!=="developer").map((s,N)=>{const{options:c}=i[s.key],k=c.tabBarLabel!==void 0?c.tabBarLabel:c.title!==void 0?c.title:s.name,l=t.index===N,E=U(s.name),F=()=>{const m=n.emit({type:"tabPress",target:s.key,canPreventDefault:!0});!l&&!m.defaultPrevented&&n.navigate(s.name)},H=()=>{n.emit({type:"tabLongPress",target:s.key})};let p=c.tabBarBadge;if(p===void 0&&s.name==="orders"){const m=Number((y==null?void 0:y.ordersActive)??0);m>0&&(p=m)}return e.jsx(V,{alignItems:"center",justifyContent:"center",flex:1,children:e.jsxs(G,{accessibilityRole:"tab",accessibilityState:{selected:l},accessibilityLabel:k,onPress:F,onLongPress:H,hitSlop:{top:8,bottom:8,left:8,right:8},style:{alignItems:"center",justifyContent:"center",paddingVertical:6,minWidth:56},children:[e.jsx(K,{name:E,size:Q,color:l?r.primary:r.textSecondary}),p!==void 0?e.jsx(d,{position:"absolute",top:2,right:18,minWidth:16,height:16,borderRadius:8,backgroundColor:r.danger,alignItems:"center",justifyContent:"center",paddingHorizontal:4,children:e.jsx(B,{color:r.textOnPrimary,fontSize:10,numberOfLines:1,children:String(p)})}):null,e.jsx(B,{fontSize:11,color:l?r.primary:r.textSecondary,marginTop:4,accessibilityLabel:k,accessibilityRole:"text",children:k}),e.jsx(d,{height:3,width:18,borderRadius:2,backgroundColor:l?r.primary:"transparent",marginTop:4})]})},s.key)})})})]})})},xe={title:"Navigation/BottomTabBar"},j=[{key:"home",name:"index"},{key:"book",name:"booking"},{key:"track",name:"tracking"},{key:"orders",name:"orders"},{key:"profile",name:"profile"}],o={state:{index:0,key:"tabs-key",routeNames:j.map(t=>t.name),routes:j,stale:!1,type:"tab",history:[]},descriptors:Object.fromEntries(j.map(t=>[t.key,{key:t.key,navigation:{},route:t,options:{title:t.name}}])),navigation:{navigate:()=>{},emit:()=>({defaultPrevented:!1})},insets:{top:0,right:0,bottom:0,left:0}},h={render:()=>e.jsx(x,{...o})},u={render:()=>{const t={...o,descriptors:{...o.descriptors,orders:{...o.descriptors.orders,options:{title:"orders",tabBarBadge:3}}},state:{...o.state,index:3}};return e.jsx(x,{...t})}},g={globals:{mode:"dark"},render:()=>e.jsx(x,{...o})},b={globals:{mode:"dark"},render:()=>{const t={...o,descriptors:{...o.descriptors,orders:{...o.descriptors.orders,options:{title:"orders",tabBarBadge:7}}},state:{...o.state,index:3}};return e.jsx(x,{...t})}};var v,w,P;h.parameters={...h.parameters,docs:{...(v=h.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: () => <BottomTabBar {...baseProps} />
}`,...(P=(w=h.parameters)==null?void 0:w.docs)==null?void 0:P.source}}};var L,S,M;u.parameters={...u.parameters,docs:{...(L=u.parameters)==null?void 0:L.docs,source:{originalSource:`{
  render: () => {
    const props: BottomTabBarProps = {
      ...baseProps,
      descriptors: {
        ...baseProps.descriptors,
        orders: {
          ...(baseProps.descriptors as any).orders,
          options: {
            title: 'orders',
            tabBarBadge: 3
          }
        } as any
      } as any,
      state: {
        ...baseProps.state,
        index: 3
      }
    };
    return <BottomTabBar {...props} />;
  }
}`,...(M=(S=u.parameters)==null?void 0:S.docs)==null?void 0:M.source}}};var C,T,I;g.parameters={...g.parameters,docs:{...(C=g.parameters)==null?void 0:C.docs,source:{originalSource:`{
  // @ts-ignore - allow story-level globals override
  globals: {
    mode: 'dark'
  },
  render: () => <BottomTabBar {...baseProps} />
}`,...(I=(T=g.parameters)==null?void 0:T.docs)==null?void 0:I.source}}};var O,z,R;b.parameters={...b.parameters,docs:{...(O=b.parameters)==null?void 0:O.docs,source:{originalSource:`{
  // @ts-ignore - allow story-level globals override
  globals: {
    mode: 'dark'
  },
  render: () => {
    const props: BottomTabBarProps = {
      ...baseProps,
      descriptors: {
        ...baseProps.descriptors,
        orders: {
          ...(baseProps.descriptors as any).orders,
          options: {
            title: 'orders',
            tabBarBadge: 7
          }
        } as any
      } as any,
      state: {
        ...baseProps.state,
        index: 3
      }
    };
    return <BottomTabBar {...props} />;
  }
}`,...(R=(z=b.parameters)==null?void 0:z.docs)==null?void 0:R.source}}};const ye=["Light","OrdersBadge","Dark","OrdersBadgeDark"];export{g as Dark,h as Light,u as OrdersBadge,b as OrdersBadgeDark,ye as __namedExportsOrder,xe as default};
