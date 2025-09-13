// @ts-nocheck
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import Splash from '../../src/screens/SplashScreen'

const meta: Meta = {
  title: 'App/Splash',
}
export default meta

export const Preview: StoryObj = {
  render: () => (
    <div style={{ height: 640 }}>
      <Splash onAnimationComplete={() => {}} minimumDisplayTime={300} />
    </div>
  ),
}
