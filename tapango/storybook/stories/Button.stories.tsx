// @ts-nocheck
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../../src/design-system/components/Button';

const meta: Meta<typeof Button> = {
  title: 'Design System/Button',
  component: Button,
  argTypes: {
    mode: { control: { type: 'inline-radio' }, options: ['light', 'dark'] },
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'outline', 'ghost', 'danger', 'success', 'gradient'],
    },
    size: { control: { type: 'select' }, options: ['xs', 'sm', 'md', 'lg', 'xl'] },
  },
  args: {
    mode: 'light',
    variant: 'primary',
    size: 'md',
    children: 'Button',
  },
};
export default meta;

export const Playground: StoryObj<typeof Button> = {
  args: {
    mode: 'light',
  },

  render: (args) => <Button {...args} />,
};

export const AllVariants: StoryObj<typeof Button> = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 12 }}>
      {['primary', 'secondary', 'outline', 'ghost', 'danger', 'success'].map((v) => (
        <Button key={v} variant={v as any} mode={args.mode} accessibilityLabel={`button-${v}`}>
          {v}
        </Button>
      ))}
    </div>
  ),
};

export const Sizes: StoryObj<typeof Button> = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((s) => (
        <Button key={s} size={s} mode={args.mode}>
          {s}
        </Button>
      ))}
    </div>
  ),
};
