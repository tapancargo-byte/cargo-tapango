// @ts-nocheck
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Input } from '../../src/design-system/components/Input'
// Using simple spans for icons to avoid native icon dependencies in Storybook web

const meta: Meta<typeof Input> = {
  title: 'Design System/Input',
  component: Input,
  argTypes: {
    mode: { control: { type: 'inline-radio' }, options: ['light','dark'] },
    variant: { control: { type: 'select' }, options: ['default','filled','outlined','ghost'] },
  },
  args: {
    mode: 'light',
    variant: 'default',
    label: 'Label',
    placeholder: 'Placeholder',
  }
}
export default meta

export const Playground: StoryObj<typeof Input> = {
  render: (args) => <Input {...args} />,
}

export const WithError: StoryObj<typeof Input> = {
  render: (args) => <Input {...args} error="This field is required" />,
}

export const WithIcons: StoryObj<typeof Input> = {
  render: (args) => (
    <Input 
      {...args} 
      leftIcon={<span style={{ display: 'inline-block', width: 16, textAlign: 'center' }}>🔎</span>} 
      rightIcon={<span style={{ display: 'inline-block', width: 16, textAlign: 'center' }}>▦</span>} 
    />
  ),
}

export const Multiline: StoryObj<typeof Input> = {
  render: (args) => (
    <Input {...args} multiline numberOfLines={3} placeholder="Multiline input..." />
  ),
}