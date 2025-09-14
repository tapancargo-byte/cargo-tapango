// @ts-nocheck
import React from 'react';

export const LinearGradient = ({ children, style }) => (
  <div
    style={{
      ...(style || {}),
      background: 'linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.05))',
    }}
  >
    {children}
  </div>
);
export default { LinearGradient };
