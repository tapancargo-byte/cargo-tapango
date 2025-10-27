import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { BottomTabBar } from '../../src/ui/BottomTabBar';
import { type BottomTabBarProps } from '@react-navigation/bottom-tabs';

const meta: Meta = {
  title: 'Navigation/BottomTabBar',
};
export default meta;

type Story = StoryObj;

const routes = [
  { key: 'home', name: 'index' },
  { key: 'book', name: 'booking' },
  { key: 'track', name: 'tracking' },
  { key: 'orders', name: 'orders' },
  { key: 'profile', name: 'profile' },
];

const baseProps: BottomTabBarProps = {
  state: {
    index: 0,
    key: 'tabs-key',
    routeNames: routes.map((r) => r.name as string),
    routes: routes as any,
    stale: false,
    type: 'tab',
    history: [],
  },
  descriptors: Object.fromEntries(
    routes.map((r) => [
      r.key,
      { key: r.key, navigation: {} as any, route: r as any, options: { title: r.name } },
    ])
  ) as any,
  navigation: {
    navigate: () => {},
    emit: () => ({ defaultPrevented: false }) as any,
  } as any,
  insets: { top: 0, right: 0, bottom: 0, left: 0 },
};

export const Light: Story = {
  render: () => <BottomTabBar {...baseProps} />,
};

export const OrdersBadge: Story = {
  render: () => {
    const props: BottomTabBarProps = {
      ...baseProps,
      descriptors: {
        ...baseProps.descriptors,
        orders: {
          ...(baseProps.descriptors as any).orders,
          options: { title: 'orders', tabBarBadge: 3 },
        } as any,
      } as any,
      state: { ...baseProps.state, index: 3 },
    };
    return <BottomTabBar {...props} />;
  },
};

// Dark variants force the global toolbar "mode" to dark for visual QA
export const Dark: Story = {
  // @ts-ignore - allow story-level globals override
  globals: { mode: 'dark' },
  render: () => <BottomTabBar {...baseProps} />,
};

export const OrdersBadgeDark: Story = {
  // @ts-ignore - allow story-level globals override
  globals: { mode: 'dark' },
  render: () => {
    const props: BottomTabBarProps = {
      ...baseProps,
      descriptors: {
        ...baseProps.descriptors,
        orders: {
          ...(baseProps.descriptors as any).orders,
          options: { title: 'orders', tabBarBadge: 7 },
        } as any,
      } as any,
      state: { ...baseProps.state, index: 3 },
    };
    return <BottomTabBar {...props} />;
  },
};
