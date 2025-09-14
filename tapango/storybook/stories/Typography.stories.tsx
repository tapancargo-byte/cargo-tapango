// @ts-nocheck
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Title,
  Section,
  Subtitle,
  Caption,
  Overline,
  Headline,
} from '../../src/design-system/components/Typography';

const meta: Meta = {
  title: 'Design System/Typography',
};
export default meta;

export const Headers: StoryObj = {
  render: (_args, { globals }) => (
    <div style={{ display: 'grid', gap: 12 }}>
      <Overline mode={globals.mode}>Overline</Overline>
      <Headline mode={globals.mode}>Headline</Headline>
      <Title mode={globals.mode}>Title</Title>
      <Section mode={globals.mode}>Section</Section>
      <Subtitle mode={globals.mode}>Subtitle</Subtitle>
      <Caption mode={globals.mode}>Caption</Caption>
    </div>
  ),
};
