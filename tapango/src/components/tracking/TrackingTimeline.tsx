import React, { memo } from 'react';
import { Stack, Text, XStack, YStack } from 'tamagui';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { font } from '../../ui/tokens';
import { Feather } from '@expo/vector-icons';
import { FlatList } from 'react-native';
import { Circle, ElevatedCard, AppIcon } from '../../ui';
import { useColors } from '../../styles/ThemeProvider';
import { StatusVariant } from '../../ui/StatusBadge';

/** A tracking event representing a point in the shipment's journey */
interface TrackingEvent {
  /** Unique identifier for the event */
  id: string;
  /** ISO timestamp string of when the event occurred */
  timestamp: string;
  /** Location where the event took place */
  location: string;
  /** Detailed description of the event */
  description: string;
  /** Current status of the shipment at this point */
  status: StatusVariant;
}

/** Props for the TimelineHeader component */
interface TimelineHeaderProps {
  /** The total number of tracking events */
  eventsCount: number;
}

/** Props for the TimelineItem component */
interface TimelineItemProps {
  /** The tracking event to display */
  event: TrackingEvent;
  /** Function to format timestamp into readable date/time */
  formatDateTime: (timestamp: string) => string;
  /** Whether this is the last item in the timeline */
  isLast: boolean;
  /** The index of this item in the timeline */
  index: number;
}

/** Props for the TrackingTimeline component */
interface TrackingTimelineProps {
  /** Array of tracking events to display in chronological order */
  events?: TrackingEvent[];
  /** Function to format timestamp strings into readable date/time */
  formatDateTime: (timestamp: string) => string;
}

/** Header component displaying the timeline title and event count */
const TimelineHeader = memo(function TimelineHeader({ eventsCount }: TimelineHeaderProps) {
  const palette = useColors();

  return (
    <XStack alignItems='center' space='$3'>
      <Circle size={40} backgroundColor={`${palette.secondary}20`}>
        <AppIcon name='time' size={20} color={palette.secondary} />
      </Circle>
      <YStack>
        <Text fontSize={font.section} fontWeight='700' color={palette.text}>
          Tracking Timeline
        </Text>
        <Text fontSize={font.caption} color={palette.textSecondary}>
          {eventsCount} tracking events
        </Text>
      </YStack>
    </XStack>
  );
});

/** Individual timeline item displaying event details */
const TimelineItem = memo(function TimelineItem({
  event,
  formatDateTime,
  isLast,
  index,
}: TimelineItemProps) {
  const palette = useColors();
  const { iconName, color } = mapStatusToIcon(event.status, palette);

  return (
    <Animated.View entering={FadeInUp.delay(index * 100).duration(400)}>
      <XStack space='$3'>
        <YStack alignItems='center'>
          <Circle size={20} backgroundColor={color}>
            <Feather name={iconName as any} size={10} color='white' />
          </Circle>
          {!isLast && (
            <Stack width={2} height={40} backgroundColor={palette.border} marginVertical='$1' />
          )}
        </YStack>

        <YStack flex={1} paddingBottom={!isLast ? '$3' : 0}>
          <XStack alignItems='center' justifyContent='space-between'>
            <Text fontSize={font.subtitle} fontWeight='600' color={palette.text}>
              {event.location}
            </Text>
            <Text fontSize={font.caption} color={palette.textSecondary}>
              {formatDateTime(event.timestamp)}
            </Text>
          </XStack>
          <Text fontSize={font.caption} color={palette.textSecondary} marginTop='$1'>
            {event.description}
          </Text>
        </YStack>
      </XStack>
    </Animated.View>
  );
});

/** Maps a status to its corresponding icon and color */
type Palette = ReturnType<typeof useColors>;
const mapStatusToIcon = (
  status: StatusVariant,
  palette: Palette
): { iconName: React.ComponentProps<typeof Feather>['name']; color: string } => {
  switch (status) {
    case 'confirmed': {
      return { iconName: 'check', color: palette.success };
    }
    case 'in-transit': {
      return { iconName: 'truck', color: palette.primary };
    }
    case 'delayed': {
      return { iconName: 'alert-triangle', color: palette.warning };
    }
    case 'cancelled': {
      return { iconName: 'x', color: palette.error };
    }
    case 'pending': {
      return { iconName: 'clock', color: palette.info };
    }
    case 'delivered': {
      return { iconName: 'check-circle', color: palette.success };
    }
    default: {
      return { iconName: 'circle', color: palette.border };
    }
  }
};

// We don't need PropTypes validation since we have TypeScript interfaces

/** A component displaying a chronological timeline of tracking events */
export const TrackingTimeline = memo(function TrackingTimeline({
  events = [], // Default to empty array to avoid undefined errors
  formatDateTime,
}: TrackingTimelineProps) {
  const palette = useColors();

  if (events.length === 0) {
    return (
      <ElevatedCard variant='elevated'>
        <YStack space='$3' alignItems='center' padding='$4'>
          <Circle
            size={40}
            backgroundColor={`${palette.info}20`}
            accessibilityRole='image'
            accessibilityLabel='Empty timeline illustration'
          >
            <AppIcon name='time' size={20} color={palette.info} />
          </Circle>
          <Text
            fontSize='$body'
            color={palette.textSecondary}
            textAlign='center'
            accessibilityRole='text'
          >
            No tracking events available yet.
            {'\n'}
            Check back later for updates.
          </Text>
        </YStack>
      </ElevatedCard>
    );
  }

  const renderItem = ({ item, index }: { item: TrackingEvent; index: number }) => (
    <TimelineItem
      event={item}
      formatDateTime={formatDateTime}
      isLast={index === events.length - 1}
      index={index}
    />
  );

  const Separator = () => <Stack height='$2' />;

  return (
    <ElevatedCard
      variant='elevated'
      accessibilityRole='text'
      accessibilityLabel='Tracking timeline'
    >
      <YStack space='$3'>
        <TimelineHeader eventsCount={events.length} />
        <YStack space='$3'>
          <FlatList
            data={events}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={Separator}
            initialNumToRender={10}
            maxToRenderPerBatch={5}
            windowSize={5}
          />
        </YStack>
      </YStack>
    </ElevatedCard>
  );
});
