// @ts-nocheck
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { StatusPill } from '../../src/ui'

const meta: Meta<typeof StatusPill> = {
  title: 'Design System/StatusPill',
  component: StatusPill as any,
  argTypes: {
    status: {
      control: { type: 'select' },
      options: ['pending','confirmed','in-transit','delivered','cancelled','delayed'],
    },
  },
  args: {
    status: 'in-transit',
  },
}
export default meta

export const Playground: StoryObj<typeof StatusPill> = {
  render: (args) => (
    <div data-testid="statuspill-playground">
      <StatusPill {...args} />
    </div>
  ),
}

export const AllStatuses: StoryObj<typeof StatusPill> = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
      {['pending','confirmed','in-transit','delivered','cancelled','delayed'].map(s => (
        <div key={s} data-testid={`statuspill-${s}`}><StatusPill status={s as any} /></div>
      ))}
    </div>
  ),
}
