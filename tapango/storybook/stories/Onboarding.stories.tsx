// @ts-nocheck
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { YStack } from 'tamagui';
import { Display, Title, Body } from '../../src/design-system/components/Typography';

const meta: Meta = {
  title: 'App/Onboarding/Welcome',
};
export default meta;

export const Welcome: StoryObj = {
  render: () => (
    <div
      style={{
        height: 640,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0D47A1 0%, #42A5F5 100%)',
      }}
    >
      <YStack alignItems='center' space='$3'>
        <Body color='#FFFFFF' align='center'>
          Northeast India's Premier Cargo Network
        </Body>
        <Display color='#FFFFFF' align='center' weight='bold'>
          Welcome to TAPANGO
        </Display>
        <Body color='#FFFFFF' align='center' style={{ maxWidth: 520 }}>
          Connecting Imphal to New Delhi with professional logistics services. Experience seamless
          cargo transportation with real-time tracking and trusted drivers.
        </Body>
      </YStack>
    </div>
  ),
};
