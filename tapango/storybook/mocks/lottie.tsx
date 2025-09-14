// @ts-nocheck
// Minimal web stub for lottie-react-native used in Storybook
import React from 'react';

export default function LottieView(props) {
  const { style } = props;
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: style?.width || 120,
        height: style?.height || 120,
        background: 'radial-gradient(circle, rgba(240,245,255,0.4), rgba(200,210,230,0.2))',
        borderRadius: 12,
        color: '#667',
        fontSize: 12,
        fontFamily: 'sans-serif',
      }}
    >
      Lottie (web stub)
    </div>
  );
}
