import React, { useState } from 'react';
import { router } from 'expo-router';
import { useUser } from '@clerk/clerk-expo';
import { Linking, Alert, Platform } from 'react-native';
import * as Haptics from 'expo-haptics';
import { useTheme, useColors } from '../../src/styles/ThemeProvider';
import { StorageService } from '../../src/utils/storage';
import { KycProgress } from '../../src/components/KycProgress';
import { YStack, Text, XStack, Switch, Stack } from 'tamagui';
import { Circle } from '../../src/ui';
import {
  addSmsSubscription,
  removeSmsSubscription,
  addSmsTags,
  removeSmsTags,
} from '../../src/integrations/onesignal';
import { useAppToast } from '../../src/ui/tg/ToastHost';
import Constants from 'expo-constants';
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
import { Feather } from '@expo/vector-icons';

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
  const [smsPhone, setSmsPhone] = useState('');
  const [smsConsent, setSmsConsent] = useState(false);
  const [smsConsentAt, setSmsConsentAt] = useState<string | null>(null);
  const toast = useAppToast();

  const themeScale = useSharedValue(1);
  const themeOpacity = useSharedValue(1);

  const themeAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: themeScale.value }],
      opacity: themeOpacity.value,
    };
  });

  const handleEditProfile = async () => {
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      router.push('/(modals)/edit-profile');
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };

  React.useEffect(() => {
    (async () => {
      try {
        const storedPhone = await StorageService.getSmsPhoneE164();
        const storedConsent = await StorageService.getSmsConsentAt();
        if (storedPhone) setSmsPhone(storedPhone);
        if (storedConsent) {
          setSmsConsent(true);
          setSmsConsentAt(storedConsent);
        }
      } catch {}
    })();
  }, []);

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
    <Screen scroll padding='$0' safeTop={true} safeBottom={false}>
      <FadeIn>
        <YStack space='$5' paddingHorizontal='$4' paddingTop='$4' paddingBottom={24}>
          {/* Modern Profile Header */}
          <YStack space='$4' paddingTop='$4'>
            {/* Enhanced User Profile Section */}
            <ElevatedCard padding='$5' borderRadius={24} backgroundColor={colors.surface}>
              <YStack alignItems='center' space='$5'>
                {/* Enhanced Avatar with Modern Design */}
                <Stack position='relative'>
                  <Circle
                    size={120}
                    borderWidth={4}
                    borderColor={colors.primary + '40'}
                    backgroundColor={colors.surface}
                    style={
                      Platform.OS === 'web'
                        ? { boxShadow: '0px 12px 24px rgba(0,0,0,0.15)' }
                        : ({
                            shadowColor: colors.shadow,
                            shadowOffset: { width: 0, height: 12 },
                            shadowOpacity: 0.15,
                            shadowRadius: 24,
                            elevation: 12,
                          } as any)
                    }
                  >
                    <Circle
                      size={112}
                      backgroundColor={colors.primary}
                      alignItems='center'
                      justifyContent='center'
                    >
                      <Text color={'white'} fontSize={32} fontWeight='800'>
                        {getUserInitial()}
                      </Text>
                    </Circle>
                  </Circle>

                  {/* Enhanced Status Indicator */}
                  <Circle
                    size={28}
                    backgroundColor={colors.success}
                    borderWidth={4}
                    borderColor={colors.surface}
                    position='absolute'
                    bottom={8}
                    right={8}
                    style={
                      Platform.OS === 'web'
                        ? { boxShadow: '0px 4px 8px rgba(0,0,0,0.1)' }
                        : ({
                            shadowColor: colors.shadow,
                            shadowOffset: { width: 0, height: 4 },
                            shadowOpacity: 0.1,
                            shadowRadius: 8,
                            elevation: 4,
                          } as any)
                    }
                  >
                    <Circle size={16} backgroundColor={colors.success} />
                  </Circle>
                </Stack>

                {/* Enhanced User Information */}
                <YStack alignItems='center' space='$3'>
                  <Text fontSize={24} fontWeight='800' color={colors.text} textAlign='center'>
                    {getUserName()}
                  </Text>
                  <XStack alignItems='center' space='$3'>
                    <Circle size={24} backgroundColor={colors.success + '20'}>
                      <Feather name='shield' size={12} color={colors.success} />
                    </Circle>
                    <Text fontSize={16} color={colors.textSecondary} fontWeight='500'>
                      Verified Customer
                    </Text>
                  </XStack>

                  {/* User stats or quick info */}
                  <XStack space='$4' paddingTop='$2'>
                    <YStack alignItems='center' space='$1'>
                      <Text fontSize={18} fontWeight='700' color={colors.primary}>
                        12
                      </Text>
                      <Text fontSize={12} color={colors.textSecondary} textTransform='uppercase'>
                        Orders
                      </Text>
                    </YStack>
                    <YStack alignItems='center' space='$1'>
                      <Text fontSize={18} fontWeight='700' color={colors.success}>
                        5
                      </Text>
                      <Text fontSize={12} color={colors.textSecondary} textTransform='uppercase'>
                        Active
                      </Text>
                    </YStack>
                    <YStack alignItems='center' space='$1'>
                      <Text fontSize={18} fontWeight='700' color={colors.warning}>
                        89%
                      </Text>
                      <Text fontSize={12} color={colors.textSecondary} textTransform='uppercase'>
                        On-time
                      </Text>
                    </YStack>
                  </XStack>
                </YStack>

                {/* Enhanced Theme Toggle */}
                <AnimatedYStack style={themeAnimatedStyle}>
                  <ElevatedCard
                    padding='$4'
                    borderRadius={16}
                    backgroundColor={colors.surfaceVariant}
                  >
                    <XStack alignItems='center' justifyContent='space-between'>
                      <XStack alignItems='center' space='$4'>
                        <Circle size={40} backgroundColor={colors.primary + '20'}>
                          <Feather
                            name={colorScheme === 'dark' ? 'moon' : 'sun'}
                            size={20}
                            color={colors.primary}
                          />
                        </Circle>
                        <YStack>
                          <Text fontSize={16} fontWeight='700' color={colors.text}>
                            Theme Preference
                          </Text>
                          <Text fontSize={13} color={colors.textSecondary}>
                            {colorScheme === 'dark' ? 'Dark Mode Active' : 'Light Mode Active'}
                          </Text>
                        </YStack>
                      </XStack>

                      {isLoading ? (
                        <LoadingSpinner size='sm' />
                      ) : (
                        <Switch
                          size='$5'
                          backgroundColor={colorScheme === 'dark' ? colors.primary : colors.border}
                          checked={colorScheme === 'dark'}
                          onCheckedChange={handleThemeToggle}
                        >
                          <Switch.Thumb
                            backgroundColor={colors.surface}
                            style={
                              Platform.OS === 'web'
                                ? { boxShadow: '0px 3px 6px rgba(0,0,0,0.15)' }
                                : ({
                                    shadowColor: colors.shadow,
                                    shadowOffset: { width: 0, height: 3 },
                                    shadowOpacity: 0.15,
                                    shadowRadius: 6,
                                    elevation: 4,
                                  } as any)
                            }
                          />
                        </Switch>
                      )}
                    </XStack>
                  </ElevatedCard>
                </AnimatedYStack>
              </YStack>
            </ElevatedCard>
          </YStack>

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
                <Feather name='alert-triangle' size={20} color={colors.warning} />
              </Circle>
            </XStack>
            <KycProgress percent={30} />
            <Button
              variant='outline'
              size='sm'
              marginTop='$4'
              leftIcon={<Feather name='file-text' size={16} />}
              borderRadius={12}
            >
              Continue Verification
            </Button>
          </ElevatedCard>

          {/* Modern Settings Section */}
          <YStack space='$4'>
            <Text fontSize={20} fontWeight='700' color={colors.text}>
              Account Settings
            </Text>

            {/* SMS Alerts */}
            <ElevatedCard padding={16} borderRadius={16} backgroundColor={colors.surface}>
              <YStack space='$3'>
                <XStack alignItems='center' space='$3'>
                  <Circle size={36} backgroundColor={colors.primary + '15'}>
                    <Feather name='message-circle' size={16} color={colors.primary} />
                  </Circle>
                  <YStack>
                    <Text fontSize={16} fontWeight='700' color={colors.text}>
                      SMS Alerts
                    </Text>
                    <Text fontSize={13} color={colors.textSecondary}>
                      Get updates via text messages
                    </Text>
                  </YStack>
                </XStack>

                <Input
                  placeholder='+1 555 555 0000'
                  value={smsPhone}
                  onChangeText={setSmsPhone}
                  keyboardType='phone-pad'
                  autoCorrect={false}
                />
                <Text fontSize={12} color={colors.textSecondary}>
                  India only: By enabling SMS, you agree to receive text messages about your
                  shipments. Reply STOP to unsubscribe or START to re-subscribe. Message & data
                  rates may apply.
                </Text>
                {smsConsentAt ? (
                  <Text fontSize={12} color={colors.textSecondary}>
                    Consent recorded on {new Date(smsConsentAt).toLocaleString()}
                  </Text>
                ) : null}
                {(Constants as any)?.expoConfig?.extra?.privacyPolicyUrl ? (
                  <Text
                    fontSize={12}
                    color={colors.primary}
                    onPress={() =>
                      Linking.openURL((Constants as any)?.expoConfig?.extra?.privacyPolicyUrl)
                    }
                    style={{ textDecorationLine: 'underline' }}
                  >
                    Privacy Policy
                  </Text>
                ) : null}

                <XStack alignItems='center' justifyContent='space-between'>
                  <Text fontSize={13} color={colors.textSecondary}>
                    I agree to receive SMS and confirm I’m the owner of this number.
                  </Text>
                  <Switch
                    checked={smsConsent}
                    onCheckedChange={(v: boolean) => setSmsConsent(!!v)}
                  />
                </XStack>

                <XStack space='$2'>
                  <Button
                    variant='primary'
                    onPress={async () => {
                      if (!smsConsent) {
                        toast.show('Consent required', 'Please accept SMS consent');
                        return;
                      }
                      // India only (+91XXXXXXXXXX)
                      const digits = smsPhone.replace(/[^\d+]/g, '');
                      if (!/^\+91\d{10}$/.test(digits)) {
                        toast.show('Invalid phone', 'India only. Use +91 followed by 10 digits');
                        return;
                      }
                      try {
                        await addSmsSubscription(digits);
                        try {
                          await StorageService.setSmsPhoneE164(digits);
                          const ts = new Date().toISOString();
                          await StorageService.setSmsConsentAt(ts);
                          setSmsConsentAt(ts);
                          await addSmsTags('IN');
                        } catch {}
                        toast.show('SMS enabled', 'You will receive text alerts');
                      } catch {
                        toast.show('Failed to enable SMS');
                      }
                    }}
                  >
                    Enable SMS
                  </Button>
                  <Button
                    variant='outline'
                    onPress={async () => {
                      try {
                        await removeSmsSubscription();
                        try {
                          await StorageService.setSmsPhoneE164('');
                          await StorageService.setSmsConsentAt('');
                          setSmsConsentAt(null);
                          await removeSmsTags();
                        } catch {}
                        toast.show('SMS disabled', 'You will no longer receive texts');
                      } catch {
                        toast.show('Failed to disable SMS');
                      }
                    }}
                  >
                    Disable
                  </Button>
                </XStack>
              </YStack>
            </ElevatedCard>

            <YStack space='$3'>
              <ElevatedCard padding={16} borderRadius={16} backgroundColor={colors.surface} hover>
                <XStack alignItems='center' space='$4'>
                  <Circle size={48} backgroundColor={colors.primary + '15'}>
                    <Feather name='user' size={24} color={colors.primary} />
                  </Circle>
                  <YStack flex={1} space='$1'>
                    <Text fontSize={16} fontWeight='700' color={colors.text}>
                      Edit Profile
                    </Text>
                    <Text fontSize={13} color={colors.textSecondary}>
                      Personal information and preferences
                    </Text>
                  </YStack>
                  <Circle size={32} backgroundColor={colors.border + '50'}>
                    <Feather name='chevron-right' size={14} color={colors.textSecondary} />
                  </Circle>
                </XStack>
              </ElevatedCard>

              <ElevatedCard padding={16} borderRadius={16} backgroundColor={colors.surface} hover>
                <XStack alignItems='center' space='$4'>
                  <Circle size={48} backgroundColor={colors.warning + '15'}>
                    <Feather name='bell' size={24} color={colors.warning} />
                  </Circle>
                  <YStack flex={1} space='$1'>
                    <Text fontSize={16} fontWeight='700' color={colors.text}>
                      Notifications
                    </Text>
                    <Text fontSize={13} color={colors.textSecondary}>
                      Push notifications and email alerts
                    </Text>
                  </YStack>
                  <Circle size={32} backgroundColor={colors.border + '50'}>
                    <Feather name='chevron-right' size={14} color={colors.textSecondary} />
                  </Circle>
                </XStack>
              </ElevatedCard>

              <ElevatedCard padding={16} borderRadius={16} backgroundColor={colors.surface} hover>
                <XStack alignItems='center' space='$4'>
                  <Circle size={48} backgroundColor={colors.info + '15'}>
                    <Feather name='shield' size={24} color={colors.info} />
                  </Circle>
                  <YStack flex={1} space='$1'>
                    <Text fontSize={16} fontWeight='700' color={colors.text}>
                      Security & Privacy
                    </Text>
                    <Text fontSize={13} color={colors.textSecondary}>
                      Two-factor authentication and privacy
                    </Text>
                  </YStack>
                  <Circle size={32} backgroundColor={colors.border + '50'}>
                    <Feather name='chevron-right' size={14} color={colors.textSecondary} />
                  </Circle>
                </XStack>
              </ElevatedCard>
            </YStack>
          </YStack>

          {/* Premium Support Section */}
          <ElevatedCard variant='elevated'>
            <XStack alignItems='center' space='$3' marginBottom='$4'>
              <Circle size={40} backgroundColor={colors.info + '20'}>
                <Feather name='headphones' size={20} color={colors.info} />
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
                leftIcon={<Feather name='message-circle' size={18} color='#25D366' />}
                onPress={() => Linking.openURL('https://wa.me/919999999999')}
              >
                WhatsApp Support
              </Button>

              <Button
                variant='ghost'
                size='md'
                leftIcon={<Feather name='help-circle' size={18} />}
                onPress={() => console.log('Help pressed')}
              >
                Help Center
              </Button>

              <Button
                variant='ghost'
                size='md'
                leftIcon={<Feather name='mail' size={18} />}
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
                <Feather name='briefcase' size={20} color={colors.success} />
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
                leftIcon={<Feather name='file-text' size={16} />}
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
                  <Feather name='code' size={16} color={colors.warning} />
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
                leftIcon={<Feather name='tool' size={16} />}
                borderRadius={12}
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
                  <Feather name='log-out' size={16} color={colors.error} />
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
