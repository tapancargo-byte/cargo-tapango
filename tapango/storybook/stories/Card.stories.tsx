// @ts-nocheck
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Card,
  ElevatedCard,
  GlassCard,
  OutlinedCard,
  FlatCard,
} from '../../src/design-system/components/Card';
import { getTokens } from '../../src/design-system/tokens';

const meta: Meta<typeof Card> = {
  title: 'Design System/Card',
  component: Card,
  argTypes: {
    mode: { control: { type: 'inline-radio' }, options: ['light', 'dark'] },
  },
  args: { mode: 'light' },
};
export default meta;

export const Variants: StoryObj<typeof Card> = {
  render: (args) => {
    const t = getTokens(args.mode);
    return (
      <div style={{ display: 'grid', gap: 16, color: t.colors.text }}>
        <Card mode={args.mode}>
          <div data-testid='card-caption-default'>Default Card</div>
        </Card>
        <ElevatedCard mode={args.mode}>
          <div data-testid='card-caption-elevated'>Elevated Card</div>
        </ElevatedCard>
        <GlassCard mode={args.mode}>
          <div data-testid='card-caption-glass'>Glass Card</div>
        </GlassCard>
        <OutlinedCard mode={args.mode}>
          <div data-testid='card-caption-outlined'>Outlined Card</div>
        </OutlinedCard>
        <FlatCard mode={args.mode}>
          <div data-testid='card-caption-flat'>Flat Card</div>
        </FlatCard>
      </div>
    );
  },
};
