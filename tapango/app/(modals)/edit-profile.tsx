import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { router } from 'expo-router';
import { useUser } from '@clerk/clerk-expo';
import { YStack, XStack, Text, ScrollView } from 'tamagui';
import * as Haptics from 'expo-haptics';
import { AppIcon } from '../../src/ui';
import {
  Screen,
  Button,
  Input,
  ElevatedCard,
  GlassCard,
  FadeIn,
  LoadingSpinner,
  SectionTitle,
  Circle,
} from '../../src/ui';
import { useColors } from '../../src/styles/ThemeProvider';

interface ProfileFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gstin: string;
  companyName: string;
  address: string;
}

interface FormErrors {
  [key: string]: string | undefined;
}

/**
 * EditProfile Modal
 *
 * Allows users to edit their profile information including:
 * - Personal details (name, email, phone)
 * - Business information (GSTIN, company)
 * - Address information
 */
export default function EditProfileModal() {
  const { user } = useUser();
  const colors = useColors();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  // Initialize form with current user data
  const [form, setForm] = useState<ProfileFormData>({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.emailAddresses?.[0]?.emailAddress || '',
    phone: user?.phoneNumbers?.[0]?.phoneNumber || '',
    gstin: (user?.publicMetadata?.gstin as string) || '',
    companyName: (user?.publicMetadata?.companyName as string) || '',
    address: (user?.publicMetadata?.address as string) || '',
  });

  const updateForm = (field: keyof ProfileFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!form.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!form.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (form.phone && !/^[\+]?[1-9][\d]{0,15}$/.test(form.phone.replace(/[\s\-\(\)]/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (
      form.gstin &&
      !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(form.gstin)
    ) {
      newErrors.gstin = 'Please enter a valid GSTIN (e.g., 22AAAAA0000A1Z5)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      return;
    }

    setIsLoading(true);

    try {
      // Update user profile using Clerk
      await user?.update({
        firstName: form.firstName,
        lastName: form.lastName,
      });

      // Update email if changed (requires verification)
      const currentEmail = user?.emailAddresses?.[0]?.emailAddress;
      if (form.email !== currentEmail && form.email) {
        try {
          await user?.createEmailAddress({ email: form.email });
        } catch (emailError) {
          console.warn('Email update failed:', emailError);
          // Continue with other updates even if email fails
        }
      }

      // Update phone if changed
      const currentPhone = user?.phoneNumbers?.[0]?.phoneNumber;
      if (form.phone !== currentPhone && form.phone) {
        try {
          await user?.createPhoneNumber({ phoneNumber: form.phone });
        } catch (phoneError) {
          console.warn('Phone update failed:', phoneError);
          // Continue with other updates even if phone fails
        }
      }

      // Update metadata (business info)
      // Note: publicMetadata update might require different approach based on Clerk setup
      try {
        await user?.update({
          unsafeMetadata: {
            ...user.unsafeMetadata,
            gstin: form.gstin,
            companyName: form.companyName,
            address: form.address,
          },
        });
      } catch (metadataError) {
        console.warn('Metadata update failed:', metadataError);
        // Continue with success since basic profile was updated
      }

      // Success feedback
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

      Alert.alert('Profile Updated ✓', 'Your profile information has been updated successfully.', [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ]);
    } catch (error) {
      console.error('Profile update error:', error);
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);

      Alert.alert(
        'Update Failed',
        error instanceof Error ? error.message : 'Failed to update profile. Please try again.',
        [{ text: 'OK', style: 'default' }]
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.back();
  };

  return (
    <Screen scroll={false} padding='$0'>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <FadeIn>
          <YStack flex={1} space='$4'>
            {/* Header */}
            <GlassCard variant='glass' padding={16}>
              <XStack alignItems='center' justifyContent='space-between'>
                <Button
                  variant='ghost'
                  size='sm'
                  onPress={handleCancel}
                  leftIcon={<AppIcon name='close' size={20} color={colors.textSecondary} />}
                />

                <XStack alignItems='center' space='$3'>
                  <Circle size={40} backgroundColor={colors.primary + '20'}>
                    <AppIcon name='person' size={20} color={colors.primary} />
                  </Circle>
                  <YStack>
                    <SectionTitle color={colors.text}>Edit Profile</SectionTitle>
                    <Text fontSize={12} color={colors.textSecondary}>
                      Update your personal and business information
                    </Text>
                  </YStack>
                </XStack>

                <Button variant='primary' size='sm' onPress={handleSave} disabled={isLoading}>
                  {isLoading ? <LoadingSpinner size='sm' /> : 'Save'}
                </Button>
              </XStack>
            </GlassCard>

            {/* Form Content */}
            <ScrollView padding='$4' showsVerticalScrollIndicator={false}>
              <YStack space='$5'>
                {/* Personal Information */}
                <ElevatedCard variant='elevated'>
                  <YStack space='$4'>
                    <XStack alignItems='center' space='$3'>
                      <Circle size={32} backgroundColor={colors.info + '20'}>
                        <AppIcon name='person-outline' size={16} color={colors.info} />
                      </Circle>
                      <SectionTitle color={colors.text}>Personal Information</SectionTitle>
                    </XStack>

                    <YStack space='$3'>
                      <XStack space='$3'>
                        <YStack flex={1}>
                          <Input
                            label='First Name'
                            value={form.firstName}
                            onChangeText={(text) => updateForm('firstName', text)}
                            placeholder='Enter first name'
                            error={errors.firstName}
                            required
                          />
                        </YStack>
                        <YStack flex={1}>
                          <Input
                            label='Last Name'
                            value={form.lastName}
                            onChangeText={(text) => updateForm('lastName', text)}
                            placeholder='Enter last name'
                            error={errors.lastName}
                            required
                          />
                        </YStack>
                      </XStack>

                      <Input
                        label='Email Address'
                        value={form.email}
                        onChangeText={(text) => updateForm('email', text)}
                        placeholder='your.email@example.com'
                        keyboardType='email-address'
                        error={errors.email}
                        required
                        leftIcon={
                          <AppIcon name='mail-outline' size={16} color={colors.textSecondary} />
                        }
                      />

                      <Input
                        label='Phone Number'
                        value={form.phone}
                        onChangeText={(text) => updateForm('phone', text)}
                        placeholder='+91 98765 43210'
                        keyboardType='phone-pad'
                        error={errors.phone}
                        leftIcon={
                          <AppIcon name='call-outline' size={16} color={colors.textSecondary} />
                        }
                      />
                    </YStack>
                  </YStack>
                </ElevatedCard>

                {/* Business Information */}
                <ElevatedCard variant='elevated'>
                  <YStack space='$4'>
                    <XStack alignItems='center' space='$3'>
                      <Circle size={32} backgroundColor={colors.warning + '20'}>
                        <AppIcon name='business-outline' size={16} color={colors.warning} />
                      </Circle>
                      <SectionTitle color={colors.text}>Business Information</SectionTitle>
                    </XStack>

                    <YStack space='$3'>
                      <Input
                        label='Company Name'
                        value={form.companyName}
                        onChangeText={(text) => updateForm('companyName', text)}
                        placeholder='Your Company Ltd.'
                        leftIcon={
                          <AppIcon
                            name='storefront-outline'
                            size={16}
                            color={colors.textSecondary}
                          />
                        }
                      />

                      <Input
                        label='GSTIN'
                        value={form.gstin}
                        onChangeText={(text) => updateForm('gstin', text.toUpperCase())}
                        placeholder='22AAAAA0000A1Z5'
                        error={errors.gstin}
                        leftIcon={
                          <AppIcon
                            name='document-text-outline'
                            size={16}
                            color={colors.textSecondary}
                          />
                        }
                      />

                      <Input
                        label='Business Address'
                        value={form.address}
                        onChangeText={(text) => updateForm('address', text)}
                        placeholder='Complete business address'
                        leftIcon={
                          <AppIcon name='location-outline' size={16} color={colors.textSecondary} />
                        }
                      />
                    </YStack>
                  </YStack>
                </ElevatedCard>

                {/* Info Card */}
                <GlassCard variant='glass' padding={12}>
                  <XStack alignItems='center' space='$3'>
                    <Circle size={24} backgroundColor={colors.info + '20'}>
                      <AppIcon name='information-outline' size={12} color={colors.info} />
                    </Circle>
                    <Text fontSize={12} color={colors.textSecondary} flex={1}>
                      Changes to email and phone may require verification. GSTIN is used for
                      business customers and invoicing.
                    </Text>
                  </XStack>
                </GlassCard>

                {/* Bottom padding for keyboard */}
                <YStack height={120} />
              </YStack>
            </ScrollView>
          </YStack>
        </FadeIn>
      </KeyboardAvoidingView>
    </Screen>
  );
}
