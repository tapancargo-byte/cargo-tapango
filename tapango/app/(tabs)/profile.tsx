import React, { useState } from 'react';
import { router } from 'expo-router';
import { useUser } from '@clerk/clerk-expo';
import { Linking, Alert, Platform } from 'react-native';
import * as Haptics from 'expo-haptics';
import { useTheme, useColors } from '../../src/styles/ThemeProvider';
import { StorageService } from '../../src/utils/storage';
import { KycProgress } from '../../src/components/KycProgress';
import { YStack, Text, ListItem, Separator, XStack, Switch, Stack } from 'tamagui';
import { Circle } from '../../src/ui';
import {
  Button,
  Card,
  AppIcon,
  Screen,
  FadeIn,
  ElevatedCard,
  GlassCard,
  Input,
  Title,
  SectionTitle,
  Subtitle,
} from '../../src/ui';
import { font } from '../../src/ui/tokens';
import { LoadingSpinner } from '../../src/ui/LoadingSpinner';
import { SignOutButton } from '../components/SignOutButton';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

/**
 * Profile Screen
 *
 * Shows user profile and settings
 */
const AnimatedYStack = Animated.createAnimatedComponent(YStack) as any;

export default function ProfileScreen() {
  const { user } = useUser();
  const { colorScheme, toggleColorScheme } = useTheme();
  const colors = useColors();
  const [isLoading, setIsLoading] = useState(false);
  const [gstin, setGstin] = useState('');

  const themeScale = useSharedValue(1);
  const themeOpacity = useSharedValue(1);

  const themeAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: themeScale.value }],
      opacity: themeOpacity.value,
    };
  });

  const handleEditProfile = () => {
    console.log('Edit profile pressed');
    // TODO: Navigate to edit profile
  };

  const handleThemeToggle = async (isDark: boolean) => {
    try {
      setIsLoading(true);

      // Haptic feedback
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

      // Animation feedback
      themeScale.value = withSpring(0.95, { damping: 15 });
      themeOpacity.value = withTiming(0.7, { duration: 150 });

      const newScheme = isDark ? 'dark' : 'light';
      await toggleColorScheme(newScheme);
      await StorageService.setThemePreference(newScheme);

      // Reset animation
      setTimeout(() => {
        themeScale.value = withSpring(1, { damping: 15 });
        themeOpacity.value = withTiming(1, { duration: 150 });
      }, 200);
    } catch (error) {
      console.error('Failed to toggle theme:', error);
      Alert.alert('Error', 'Failed to change theme');
    } finally {
      setTimeout(() => setIsLoading(false), 300);
    }
  };

  const getUserInitial = () => {
    return (
      user?.firstName?.[0] || user?.emailAddresses?.[0]?.emailAddress?.[0]?.toUpperCase() || 'U'
    );
  };

  const getUserName = () => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    return user?.emailAddresses?.[0]?.emailAddress || 'User';
  };

  return (
    <Screen scroll padding='$0'>
      <FadeIn>
        <YStack space='$4' paddingHorizontal='$4' paddingBottom={120}>
          {/* Premium Header with Glassmorphism */}
          <GlassCard variant='glass' animation='slide' hover>
            <YStack alignItems='center' space='$4'>
              {/* Premium Avatar with Gradient Border */}
              <Stack position='relative'>
                <Circle
                  size={100}
                  borderWidth={3}
                  borderColor={colors.primary}
                  backgroundColor={colors.primaryContainer}
                  style={
                    Platform.OS === 'web'
                      ? { boxShadow: '0px 8px 16px rgba(0,0,0,0.2)' }
                      : ({
                          shadowColor: colors.shadow,
                          shadowOffset: { width: 0, height: 8 },
                          shadowOpacity: 0.2,
                          shadowRadius: 16,
                          elevation: 8,
                        } as any)
                  }
                >
                  <Stack
                    width={94}
                    height={94}
                    borderRadius={47}
                    backgroundColor={colors.primary}
                    alignItems='center'
                    justifyContent='center'
                  >
                    <Text color={colors.textOnPrimary} fontSize={font.headline} fontWeight='800'>
                      {getUserInitial()}
                    </Text>
                  </Stack>
                </Circle>

                {/* Online Status Indicator */}
                <Circle
                  size={20}
                  backgroundColor={colors.success}
                  borderWidth={2}
                  borderColor={colors.surface}
                  position='absolute'
                  bottom={5}
                  right={5}
                />
              </Stack>

              <YStack alignItems='center' space='$2'>
                <Title color={colors.text} weight='bold'>
                  {getUserName()}
                </Title>
                <XStack alignItems='center' space='$2'>
                  <Ionicons name='shield-checkmark' size={16} color={colors.success} />
                  <Text fontSize={font.subtitle} color={colors.textSecondary}>
                    {require('../../src/i18n').t('profileRoleCustomer')}
                  </Text>
                </XStack>
              </YStack>

              {/* Premium Theme Toggle */}
              <AnimatedYStack style={themeAnimatedStyle}>
                <ElevatedCard variant='elevated'>
                  <XStack alignItems='center' justifyContent='space-between' width={240}>
                    <XStack alignItems='center' space='$3'>
                      <Circle size={32} backgroundColor={colors.primaryContainer}>
                        <Ionicons
                          name={colorScheme === 'dark' ? 'moon' : 'sunny'}
                          size={16}
                          color={colors.primary}
                        />
                      </Circle>
                      <YStack>
                        <Text fontSize={font.body} fontWeight='600' color={colors.text}>
                          Theme
                        </Text>
                        <Text fontSize={font.caption} color={colors.textSecondary}>
                          {colorScheme === 'dark' ? 'Dark Mode' : 'Light Mode'}
                        </Text>
                      </YStack>
                    </XStack>

                    {isLoading ? (
                      <LoadingSpinner size='sm' />
                    ) : (
                      <Switch
                        size='$4'
                        backgroundColor={colorScheme === 'dark' ? colors.primary : colors.border}
                        checked={colorScheme === 'dark'}
                        onCheckedChange={handleThemeToggle}
                      >
                        <Switch.Thumb
                          backgroundColor={colors.surface}
                          style={
                            Platform.OS === 'web'
                              ? { boxShadow: '0px 2px 4px rgba(0,0,0,0.2)' }
                              : ({
                                  shadowColor: colors.shadow,
                                  shadowOffset: { width: 0, height: 2 },
                                  shadowOpacity: 0.2,
                                  shadowRadius: 4,
                                  elevation: 3,
                                } as any)
                          }
                        />
                      </Switch>
                    )}
                  </XStack>
                </ElevatedCard>
              </AnimatedYStack>
            </YStack>
          </GlassCard>

          {/* Premium KYC Progress */}
          <ElevatedCard variant='elevated' animation='fade'>
            <XStack alignItems='center' justifyContent='space-between'>
              <YStack flex={1}>
                <Text fontSize={font.section} fontWeight='700' color={colors.text}>
                  {require('../../src/i18n').t('kycProgress')}
                </Text>
                <Subtitle color={colors.textSecondary}>
                  Complete verification for full access
                </Subtitle>
              </YStack>
              <Circle size={48} backgroundColor={colors.warning} opacity={0.2}>
                <Ionicons name='warning' size={20} color={colors.warning} />
              </Circle>
            </XStack>
            <KycProgress percent={30} />
            <Button
              variant='outline'
              size='sm'
              marginTop='$3'
              leftIcon={<Ionicons name='document-text' size={16} />}
            >
              Continue Verification
            </Button>
          </ElevatedCard>

          {/* Premium Settings Grid */}
          <YStack space='$3'>
            <SectionTitle color={colors.text}>Settings</SectionTitle>

            <XStack space='$3'>
              <Card flex={1} hover>
                <XStack alignItems='center' space='$3'>
                  <Circle size={40} backgroundColor={colors.primaryContainer}>
                    <Ionicons name='person-circle' size={20} color={colors.primary} />
                  </Circle>
                  <YStack flex={1}>
                    <Subtitle color={colors.text} weight='semibold'>
                      Profile
                    </Subtitle>
                    <Subtitle color={colors.textSecondary}>Edit details</Subtitle>
                  </YStack>
                  <Ionicons name='chevron-forward' size={16} color={colors.textSecondary} />
                </XStack>
              </Card>

              <Card flex={1} hover>
                <XStack alignItems='center' space='$3'>
                  <Circle size={40} backgroundColor={colors.secondaryContainer}>
                    <Ionicons name='notifications' size={20} color={colors.secondary} />
                  </Circle>
                  <YStack flex={1}>
                    <Subtitle color={colors.text} weight='semibold'>
                      Alerts
                    </Subtitle>
                    <Subtitle color={colors.textSecondary}>Push & Email</Subtitle>
                  </YStack>
                  <Ionicons name='chevron-forward' size={16} color={colors.textSecondary} />
                </XStack>
              </Card>
            </XStack>
          </YStack>

          {/* Premium Support Section */}
          <ElevatedCard variant='elevated'>
            <XStack alignItems='center' space='$3' marginBottom='$4'>
              <Circle size={40} backgroundColor={colors.info + '20'}>
                <Ionicons name='headset' size={20} color={colors.info} />
              </Circle>
              <YStack>
                <SectionTitle color={colors.text}>Support & Help</SectionTitle>
                <Subtitle color={colors.textSecondary}>Get assistance 24/7</Subtitle>
              </YStack>
            </XStack>

            <YStack space='$2'>
              <Button
                variant='secondary'
                size='md'
                leftIcon={<Ionicons name='logo-whatsapp' size={18} color='#25D366' />}
                onPress={() => Linking.openURL('https://wa.me/919999999999')}
              >
                WhatsApp Support
              </Button>

              <Button
                variant='ghost'
                size='md'
                leftIcon={<Ionicons name='help-circle' size={18} />}
                onPress={() => console.log('Help pressed')}
              >
                Help Center
              </Button>

              <Button
                variant='ghost'
                size='md'
                leftIcon={<Ionicons name='mail' size={18} />}
                onPress={() => Linking.openURL('mailto:support@tapango.app')}
              >
                Email Support
              </Button>
            </YStack>
          </ElevatedCard>

          {/* Premium Business Section */}
          <ElevatedCard variant='elevated'>
            <XStack alignItems='center' space='$3' marginBottom='$4'>
              <Circle size={40} backgroundColor={colors.success + '20'}>
                <Ionicons name='business' size={20} color={colors.success} />
              </Circle>
              <YStack>
                <SectionTitle color={colors.text}>Business Details</SectionTitle>
                <Text fontSize={font.caption} color={colors.textSecondary}>
                  Tax and compliance information
                </Text>
              </YStack>
            </XStack>

            <YStack space='$3'>
              <Input
                label='GSTIN'
                placeholder='27ABCDE1234F1Z5'
                autoCapitalize='characters'
                value={gstin}
                onChangeText={setGstin}
                onBlur={async () => {
                  if (gstin.trim()) {
                    await StorageService.setItem?.('gstin', gstin.trim());
                    Alert.alert('Saved', 'GSTIN saved locally');
                  }
                }}
                leftIcon={<Ionicons name='document-text' size={16} />}
                variant='outlined'
              />
              <Subtitle color={colors.textSecondary}>Enter your GSTIN for tax compliance</Subtitle>
            </YStack>
          </ElevatedCard>

          {/* Developer Tools (Dev Only) */}
          {__DEV__ && (
            <Card variant='outlined'>
              <XStack alignItems='center' space='$3'>
                <Circle size={32} backgroundColor={colors.warning + '20'}>
                  <Ionicons name='code' size={16} color={colors.warning} />
                </Circle>
                <Subtitle color={colors.warning} weight='semibold'>
                  Developer Tools
                </Subtitle>
              </XStack>
              <Button
                variant='outline'
                size='sm'
                marginTop='$3'
                onPress={() => router.push('/developer' as any)}
                leftIcon={<Ionicons name='build' size={16} />}
              >
                Open Developer Panel
              </Button>
            </Card>
          )}

          {/* Premium Sign Out */}
          <ElevatedCard variant='elevated'>
            <YStack space='$3'>
              <XStack alignItems='center' space='$3'>
                <Circle size={32} backgroundColor={colors.error + '20'}>
                  <Ionicons name='log-out' size={16} color={colors.error} />
                </Circle>
                <YStack>
                  <Subtitle color={colors.text} weight='semibold'>
                    Sign Out
                  </Subtitle>
                  <Text fontSize={font.caption} color={colors.textSecondary}>
                    You'll need to sign in again
                  </Text>
                </YStack>
              </XStack>
              <SignOutButton />
            </YStack>
          </ElevatedCard>
        </YStack>
      </FadeIn>
    </Screen>
  );
}
