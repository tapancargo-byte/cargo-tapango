// Minimal mock: export a simple View-like component
// @ts-nocheck
import React from 'react'
export const BlurView = ({ children, style }: any) => <div style={style}>{children}</div>
export default BlurView
