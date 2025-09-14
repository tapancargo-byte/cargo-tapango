import React from 'react';
import { ScrollView } from 'react-native';
import { YStack, XStack, Text, Separator } from 'tamagui';
import {
  Button,
  Card,
  GlassCard,
  ElevatedCard,
  OutlinedCard,
  FlatCard,
  Input,
  Screen,
  SectionTitle,
  Title,
  Subtitle,
  Caption,
  Circle,
  LoadingSpinner,
} from '../ui';
import { getTokens } from '../design-system/tokens';
import { useIsDark } from '../styles/ThemeProvider';

/**
 * Design System Demo Component
 *
 * Showcases the enhanced design system with:
 * - Color palette demonstration
 * - Typography hierarchy
 * - Component variants
 * - Spacing scale examples
 * - Interactive elements
 */
export const DesignSystemDemo: React.FC = () => {
  const isDark = useIsDark();
  const tokens = getTokens(isDark ? 'dark' : 'light');
  const colors = tokens.colors;

  return (
    <Screen scroll={false} padding='$0'>
      <ScrollView showsVerticalScrollIndicator={false}>
        <YStack space='$6' padding='$4' paddingBottom='$20'>
          {/* Header */}
          <ElevatedCard>
            <YStack space='$3' alignItems='center'>
              <Title color={colors.text}>TAPANGO Design System</Title>
              <Subtitle color={colors.textSecondary}>Enhanced UI Components & Tokens</Subtitle>
              <XStack space='$2' alignItems='center'>
                <Circle size={12} backgroundColor={colors.primary} />
                <Caption color={colors.textSecondary}>Theme: {isDark ? 'Dark' : 'Light'}</Caption>
              </XStack>
            </YStack>
          </ElevatedCard>

          {/* Color Palette */}
          <YStack space='$4'>
            <SectionTitle color={colors.text}>Color Palette</SectionTitle>

            {/* Brand Colors */}
            <Card>
              <YStack space='$3'>
                <Subtitle color={colors.text}>Brand Colors</Subtitle>
                <XStack space='$2' flexWrap='wrap'>
                  <ColorSwatch color={colors.primary} label='Primary' />
                  <ColorSwatch color={colors.primaryContainer} label='Primary Container' />
                  <ColorSwatch color={colors.secondary} label='Secondary' />
                  <ColorSwatch color={colors.accent} label='Accent' />
                </XStack>
              </YStack>
            </Card>

            {/* Semantic Colors */}
            <Card>
              <YStack space='$3'>
                <Subtitle color={colors.text}>Semantic Colors</Subtitle>
                <XStack space='$2' flexWrap='wrap'>
                  <ColorSwatch color={colors.success} label='Success' />
                  <ColorSwatch color={colors.warning} label='Warning' />
                  <ColorSwatch color={colors.danger} label='Danger' />
                  <ColorSwatch color={colors.info} label='Info' />
                </XStack>
              </YStack>
            </Card>
          </YStack>

          {/* Typography */}
          <YStack space='$4'>
            <SectionTitle color={colors.text}>Typography Hierarchy</SectionTitle>
            <Card>
              <YStack space='$3'>
                <Text fontSize={tokens.typography.display} fontWeight='800' color={colors.text}>
                  Display Text (40px)
                </Text>
                <Text fontSize={tokens.typography.headline} fontWeight='700' color={colors.text}>
                  Headline Text (32px)
                </Text>
                <Text fontSize={tokens.typography.title} fontWeight='600' color={colors.text}>
                  Title Text (24px)
                </Text>
                <Text fontSize={tokens.typography.section} fontWeight='600' color={colors.text}>
                  Section Text (18px)
                </Text>
                <Text fontSize={tokens.typography.body} fontWeight='400' color={colors.text}>
                  Body Text (16px) - Optimal for readability
                </Text>
                <Text
                  fontSize={tokens.typography.subtitle}
                  fontWeight='400'
                  color={colors.textSecondary}
                >
                  Subtitle Text (14px) - Secondary information
                </Text>
                <Text
                  fontSize={tokens.typography.caption}
                  fontWeight='400'
                  color={colors.textTertiary}
                >
                  Caption Text (12px) - Small supporting text
                </Text>
              </YStack>
            </Card>
          </YStack>

          {/* Button Components */}
          <YStack space='$4'>
            <SectionTitle color={colors.text}>Button Components</SectionTitle>
            <Card>
              <YStack space='$3'>
                <XStack space='$2' flexWrap='wrap'>
                  <Button variant='primary' size='md'>
                    Primary
                  </Button>
                  <Button variant='secondary' size='md'>
                    Secondary
                  </Button>
                  <Button variant='outline' size='md'>
                    Outline
                  </Button>
                  <Button variant='ghost' size='md'>
                    Ghost
                  </Button>
                </XStack>
                <XStack space='$2' flexWrap='wrap'>
                  <Button variant='success' size='md'>
                    Success
                  </Button>
                  <Button variant='danger' size='md'>
                    Danger
                  </Button>
                  <Button variant='gradient' size='md'>
                    Gradient
                  </Button>
                  <Button variant='primary' size='md' disabled>
                    Disabled
                  </Button>
                </XStack>
                <XStack space='$2' flexWrap='wrap'>
                  <Button variant='primary' size='xs'>
                    XS
                  </Button>
                  <Button variant='primary' size='sm'>
                    SM
                  </Button>
                  <Button variant='primary' size='md'>
                    MD
                  </Button>
                  <Button variant='primary' size='lg'>
                    LG
                  </Button>
                  <Button variant='primary' size='xl'>
                    XL
                  </Button>
                </XStack>
              </YStack>
            </Card>
          </YStack>

          {/* Card Components */}
          <YStack space='$4'>
            <SectionTitle color={colors.text}>Card Components</SectionTitle>
            <XStack space='$2' flexWrap='wrap'>
              <YStack flex={1} minWidth={140} space='$2'>
                <Card>
                  <Caption color={colors.textSecondary}>Default Card</Caption>
                  <Text fontSize={tokens.typography.body} color={colors.text}>
                    Standard surface
                  </Text>
                </Card>
              </YStack>
              <YStack flex={1} minWidth={140} space='$2'>
                <ElevatedCard>
                  <Caption color={colors.textSecondary}>Elevated Card</Caption>
                  <Text fontSize={tokens.typography.body} color={colors.text}>
                    With shadow
                  </Text>
                </ElevatedCard>
              </YStack>
            </XStack>
            <XStack space='$2' flexWrap='wrap'>
              <YStack flex={1} minWidth={140} space='$2'>
                <OutlinedCard>
                  <Caption color={colors.textSecondary}>Outlined Card</Caption>
                  <Text fontSize={tokens.typography.body} color={colors.text}>
                    With border
                  </Text>
                </OutlinedCard>
              </YStack>
              <YStack flex={1} minWidth={140} space='$2'>
                <FlatCard>
                  <Caption color={colors.textSecondary}>Flat Card</Caption>
                  <Text fontSize={tokens.typography.body} color={colors.text}>
                    Surface variant
                  </Text>
                </FlatCard>
              </YStack>
            </XStack>
            <GlassCard>
              <Caption color={colors.textSecondary}>Glass Card</Caption>
              <Text fontSize={tokens.typography.body} color={colors.text}>
                Glassmorphism effect with blur
              </Text>
            </GlassCard>
          </YStack>

          {/* Input Components */}
          <YStack space='$4'>
            <SectionTitle color={colors.text}>Input Components</SectionTitle>
            <Card>
              <YStack space='$3'>
                <Input label='Default Input' placeholder='Enter text...' />
                <Input label='Filled Input' placeholder='Enter text...' variant='filled' />
                <Input label='Outlined Input' placeholder='Enter text...' variant='outlined' />
                <Input
                  label='Error State'
                  placeholder='Enter text...'
                  error='This field is required'
                />
              </YStack>
            </Card>
          </YStack>

          {/* Spacing Examples */}
          <YStack space='$4'>
            <SectionTitle color={colors.text}>Spacing Scale</SectionTitle>
            <Card>
              <YStack space='$3'>
                <Caption color={colors.textSecondary}>Base unit: 4px</Caption>
                {[1, 2, 3, 4, 6, 8, 12, 16, 20].map((size) => (
                  <XStack key={size} space='$2' alignItems='center'>
                    <Circle
                      size={tokens.spacing[size] as number}
                      backgroundColor={colors.primary}
                    />
                    <Caption color={colors.textSecondary}>
                      ${size} = {tokens.spacing[size]}px
                    </Caption>
                  </XStack>
                ))}
              </YStack>
            </Card>
          </YStack>

          {/* Interactive Elements */}
          <YStack space='$4'>
            <SectionTitle color={colors.text}>Interactive Elements</SectionTitle>
            <Card>
              <YStack space='$3' alignItems='center'>
                <LoadingSpinner size='sm' />
                <LoadingSpinner size='md' />
                <LoadingSpinner size='lg' />
                <Caption color={colors.textSecondary}>Loading states</Caption>
              </YStack>
            </Card>
          </YStack>
        </YStack>
      </ScrollView>
    </Screen>
  );
};

// Helper component for color swatches
const ColorSwatch: React.FC<{ color: string; label: string }> = ({ color, label }) => {
  const isDark = useIsDark();
  const tokens = getTokens(isDark ? 'dark' : 'light');

  return (
    <YStack alignItems='center' space='$1'>
      <Circle size={40} backgroundColor={color} />
      <Caption color={tokens.colors.textSecondary}>{label}</Caption>
    </YStack>
  );
};
