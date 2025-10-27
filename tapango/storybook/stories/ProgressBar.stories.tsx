// @ts-nocheck
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ProgressBar } from '../../src/ui';

const meta: Meta<typeof ProgressBar> = {
  title: 'Design System/ProgressBar',
  component: ProgressBar as any,
  argTypes: {
    value: { control: { type: 'number', min: 0, max: 100 } },
    height: { control: { type: 'number', min: 2, max: 24 } },
  },
  args: {
    value: 60,
    height: 8,
  },
};
export default meta;

export const Playground: StoryObj<typeof ProgressBar> = {
  render: (args) => (
    <div style={{ width: 320 }}>
      <ProgressBar {...args} />
    </div>
  ),
};

export const Values: StoryObj<typeof ProgressBar> = {
  render: () => (
    <div style={{ display: 'grid', gap: 8, width: 320 }}>
      {[0, 10, 25, 50, 75, 100].map((v) => (
        <ProgressBar key={v} value={v} height={8} />
      ))}
    </div>
  ),
};
