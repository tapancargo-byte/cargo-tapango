// @ts-nocheck
import React from 'react'

const mergeStyle = (style: any) => Array.isArray(style) ? Object.assign({}, ...style) : style

export const Easing = { in: (e:any)=>e, out:(e:any)=>e, inOut:(e:any)=>e, cubic: (t:any)=>t }
export const useSharedValue = (v:any)=>({ value:v })
export const withTiming = (v:any)=>v
export const withSpring = (v:any)=>v
export const useAnimatedStyle = (fn:any)=>({})
export const interpolate = (v:any, _a:any, _b:any)=>v

export const View = ({ style, children, ...rest }: any) =>
  React.createElement('div', { ...rest, style: mergeStyle(style) }, children)
export const Text = ({ style, children, ...rest }: any) =>
  React.createElement('span', { ...rest, style: mergeStyle(style) }, children)
export const createAnimatedComponent = (Comp: any) => (props: any) => {
  const { style, ...rest } = props || {}
  return React.createElement(Comp, { ...rest, style: mergeStyle(style) })
}

const Animated = { View, Text, createAnimatedComponent }
export default Animated
