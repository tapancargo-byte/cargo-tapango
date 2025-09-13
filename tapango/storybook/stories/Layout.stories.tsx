// @ts-nocheck
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Screen } from '../../src/ui/Screen'
import { SectionHeader, ListRow } from '../../src/ui'
import { YStack } from 'tamagui'

const meta: Meta = {
  title: 'App/Layout/List Screen',
}
export default meta

export const DenseList: StoryObj = {
  render: (_args, { globals }) => (
    <Screen scroll header={<SectionHeader title="Shipments" subtitle="Recent" withShadow />}>
      <YStack space="$3">
        {Array.from({ length: 12 }).map((_, i) => (
          <ListRow
            key={i}
            title={`Order #${1000 + i}`}
            subtitle={i % 2 ? 'On Schedule' : 'In Transit'}
            right={<span style={{ opacity: 0.7 }}>View</span>}
          />
        ))}
      </YStack>
    </Screen>
  ),
}