// @ts-nocheck
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Screen } from '../../src/ui/Screen';
import { YStack, Text, Stack } from 'tamagui';
import { AppHeader } from '../../src/ui';

const meta: Meta<typeof Screen> = {
  title: 'App/Layout/Screen',
  component: Screen,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    scroll: { control: 'boolean' },
    headerSticky: { control: 'boolean' },
    headerShadow: { control: 'boolean' },
    safeTop: { control: 'boolean' },
    safeBottom: { control: 'boolean' },
    padding: { control: 'text' },
    gap: { control: 'text' },
  },
  args: {
    scroll: true,
    headerSticky: true,
    headerShadow: true,
    safeTop: true,
    safeBottom: true,
    padding: '$4',
    gap: '$4',
  },
};
export default meta;

const HeaderBar = ({ title = 'Demo Header', subtitle = 'Sticky on scroll' }) => (
  <YStack
    padding='$4'
    paddingBottom='$3'
    backgroundColor='$background'
    borderBottomWidth={1}
    borderColor='$borderColor'
  >
    <Text fontSize={20} fontWeight='700'>
      {title}
    </Text>
    <Text color='$colorFocus' opacity={0.8}>
      {subtitle}
    </Text>
  </YStack>
);

const Item = ({ i }: { i: number }) => (
  <YStack padding='$4' backgroundColor='$color2' borderRadius='$4'>
    <Text>Item {i}</Text>
    <Text opacity={0.7}>Scrollable content line to demonstrate layout and spacing.</Text>
  </YStack>
);

export const ScrollWithStickyHeader: StoryObj<typeof Screen> = {
  render: (args) => (
    <Screen {...args} header={<HeaderBar title='Feed' subtitle='Sticky header + safe area' />}>
      <YStack space='$4'>
        {Array.from({ length: 20 }).map((_, i) => (
          <Item key={i} i={i + 1} />
        ))}
      </YStack>
    </Screen>
  ),
};

export const ScrollWithInlineHeader: StoryObj<typeof Screen> = {
  args: { headerSticky: false },
  render: (args) => (
    <Screen
      {...args}
      header={<HeaderBar title='Inline Header' subtitle='Header rendered within scroll' />}
    >
      <YStack space='$4'>
        {Array.from({ length: 16 }).map((_, i) => (
          <Item key={i} i={i + 1} />
        ))}
      </YStack>
    </Screen>
  ),
};

// Web-safe demo: pull-to-refresh disabled in web; we just show the prop wiring visually
export const ScrollWithRefreshProp: StoryObj<typeof Screen> = {
  args: { scroll: true, refreshing: false },
  render: (args) => (
    <Screen
      {...args}
      onRefresh={() => {
        /* no-op in web story */
      }}
      header={<HeaderBar title='Feed' subtitle='RefreshControl (web disabled)' />}
    >
      <YStack space='$4'>
        {Array.from({ length: 14 }).map((_, i) => (
          <Item key={i} i={i + 1} />
        ))}
      </YStack>
    </Screen>
  ),
};

export const StaticNoScroll: StoryObj<typeof Screen> = {
  args: { scroll: false },
  render: (args) => (
    <Screen {...args} header={<HeaderBar title='Static Screen' subtitle='No scrolling' />}>
      <YStack space='$4'>
        <Text>
          This is a simple static screen. Safe-area padding is applied to the container when scroll
          is disabled.
        </Text>
        <Stack
          height={160}
          backgroundColor='$color2'
          borderRadius='$4'
          alignItems='center'
          justifyContent='center'
        >
          <Text>Content block</Text>
        </Stack>
      </YStack>
    </Screen>
  ),
};

export const WithAppHeader: StoryObj<typeof Screen> = {
  args: { scroll: true, headerSticky: true },
  render: (args) => (
    <Screen
      {...args}
      header={
        <AppHeader
          title='Orders'
          subtitle='12 active shipments'
          right={<div style={{ fontSize: 12, opacity: 0.7 }}>v1.0</div>}
        />
      }
    >
      <YStack space='$4'>
        {Array.from({ length: 18 }).map((_, i) => (
          <Item key={i} i={i + 1} />
        ))}
      </YStack>
    </Screen>
  ),
};
