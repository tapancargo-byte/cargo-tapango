// @ts-nocheck
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { GlassCard, ElevatedCard } from '../../src/design-system/components/Card';
import { getTokens } from '../../src/design-system/tokens';

const meta: Meta = {
  title: 'Design System/Card Examples',
};
export default meta;

export const WithContent: StoryObj = {
  render: (_args, { globals }) => {
    const t = getTokens(globals.mode || 'light');
    return (
      <div style={{ display: 'grid', gap: 16, maxWidth: 420, color: t.colors.text }}>
        <ElevatedCard mode={globals.mode}>
          <div style={{ display: 'grid', gap: 8 }}>
            <strong data-testid='example-elevated-title'>Elevated Card</strong>
            <span data-testid='example-elevated-body'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </span>
            <button style={{ padding: 8 }}>Action</button>
          </div>
        </ElevatedCard>
        <GlassCard mode={globals.mode}>
          <div style={{ display: 'grid', gap: 8 }}>
            <strong data-testid='example-glass-title'>Glass Card</strong>
            <span data-testid='example-glass-body'>
              Frosted glass visual with translucent background.
            </span>
            <button style={{ padding: 8 }}>Action</button>
          </div>
        </GlassCard>
      </div>
    );
  },
};
