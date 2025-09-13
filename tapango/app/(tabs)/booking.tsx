import React, { useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { YStack, XStack, Text, Tabs, ScrollView, Separator, Stack } from 'tamagui';
import { Circle } from '../../src/ui';
import { Button, Input, SectionHeader, Screen, AppHeader, InlineBadge, FadeIn, ElevatedCard, GlassCard, LoadingSpinner } from '../../src/ui';
import { t } from '../../src/i18n';
import { AddressAutocomplete, AddressSelection } from '../../src/components/AddressAutocomplete';
import { Select, SelectOption } from '../../src/ui';
import { formatINR } from '../../src/utils/currency';
import { useColors } from '../../src/styles/ThemeProvider';
import { Alert } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInLeft, FadeInRight, SlideInDown } from 'react-native-reanimated';

interface BookingForm {
  pickupAddress: string;
  deliveryAddress: string;
  cargoType: string;
  weight: string;
  dimensions: string;
  urgency: string;
  specialInstructions: string;
  contactPhone: string;
  pickupDate: string;
  deliveryDate: string;
}

// Premium Step Indicator Component
const PremiumStepIndicator = ({ currentStep, steps, colors }: { 
  currentStep: number; 
  steps: string[]; 
  colors: any;
}) => {
  return (
    <ElevatedCard variant="elevated">
      <XStack alignItems="center" justifyContent="space-between" paddingVertical="$2">
        {steps.map((step, index) => {
          const isActive = index === currentStep
          const isCompleted = index < currentStep
          const isUpcoming = index > currentStep
          
          return (
            <XStack key={step} alignItems="center" flex={1}>
              <XStack alignItems="center" space="$2">
                <Circle 
                  size={32} 
                  backgroundColor={
                    isCompleted ? colors.success : 
                    isActive ? colors.primary : 
                    colors.border
                  }
                  borderWidth={isActive ? 2 : 0}
                  borderColor={isActive ? colors.primary : 'transparent'}
                >
                  {isCompleted ? (
                    <Ionicons name="checkmark" size={16} color="white" />
                  ) : (
                    <Text 
                      color={isActive || isCompleted ? 'white' : colors.textSecondary} 
                      fontSize={14} 
                      fontWeight="600"
                    >
                      {index + 1}
                    </Text>
                  )}
                </Circle>
                
                <Text 
                  fontSize={12} 
                  color={
                    isActive ? colors.primary : 
                    isCompleted ? colors.success : 
                    colors.textSecondary
                  }
                  fontWeight={isActive ? '600' : '400'}
                >
                  {step}
                </Text>
              </XStack>
              
              {index < steps.length - 1 && (
                <Stack 
                  flex={1} 
                  height={2} 
                  backgroundColor={isCompleted ? colors.success : colors.border} 
                  marginHorizontal="$3" 
                />
              )}
            </XStack>
          )
        })}
      </XStack>
    </ElevatedCard>
  )
}

// Address preset for TAPANGO's operational cities
const TAPANGO_ADDRESSES = [
  { formatted: 'Imphal Hub, Kangla Road, Imphal, Manipur 795001', city: 'Imphal', type: 'hub' },
  { formatted: 'New Delhi Hub, Connaught Place, New Delhi, Delhi 110001', city: 'New Delhi', type: 'hub' },
  { formatted: 'Imphal Airport, Tulihal, Imphal, Manipur 795140', city: 'Imphal', type: 'airport' },
  { formatted: 'IGI Airport, New Delhi, Delhi 110037', city: 'New Delhi', type: 'airport' },
]

interface FormErrors {
  [key: string]: string | undefined;
}

/**
 * Cargo Booking Screen
 * 
 * Comprehensive form for booking cargo shipments
 */
export default function BookingScreen() {
  const colors = useColors();
  const [form, setForm] = useState<BookingForm>({
    pickupAddress: '',
    deliveryAddress: '',
    cargoType: '',
    weight: '',
    dimensions: '',
    urgency: '',
    specialInstructions: '',
    contactPhone: '',
    pickupDate: '',
    deliveryDate: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const params = useLocalSearchParams<{ resumeDraft?: string }>();
  const [pickupSel, setPickupSel] = useState<AddressSelection | null>(null);
  const [deliverySel, setDeliverySel] = useState<AddressSelection | null>(null);
  const [lastQuoteAmount, setLastQuoteAmount] = useState<number | undefined>(undefined);
  const usePlaces = (process.env.EXPO_PUBLIC_FEATURE_PLACES === '1') || !!process.env.EXPO_PUBLIC_GOOGLE_MAPS_KEY;
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<'addresses' | 'cargo' | 'review'>('addresses');

  // Resume draft if requested
  React.useEffect(() => {
    (async () => {
      if (params?.resumeDraft === '1') {
        const draft = await require('../../src/utils/drafts').loadBookingDraft();
        if (draft) {
          setForm(draft.form as any);
          setPickupSel(draft.pickupSel ?? null);
          setDeliverySel(draft.deliverySel ?? null);
        }
      }
    })();
  }, [params?.resumeDraft]);

  const cargoTypeOptions: SelectOption[] = [
    { label: 'Electronics & IT Equipment', value: 'electronics' },
    { label: 'Documents & Legal Papers', value: 'documents' },
    { label: 'Medical Supplies & Equipment', value: 'medical' },
    { label: 'Textiles & Handicrafts', value: 'textiles' },
    { label: 'General Merchandise', value: 'general' },
    { label: 'Perishable Goods', value: 'perishable' },
    { label: 'Fragile & Valuable Items', value: 'fragile' },
    { label: 'Industrial Components', value: 'industrial' },
  ];

  const urgencyOptions: SelectOption[] = [
    { label: 'Standard (3-4 days) - Imphal ⟷ Delhi', value: 'standard' },
    { label: 'Express (1-2 days) - Priority Route', value: 'express' },
    { label: 'Urgent (Same Day) - Emergency', value: 'urgent' },
    { label: 'Scheduled Delivery', value: 'scheduled' },
  ];
  
  const steps = ['Route', 'Cargo', 'Review']
  const getStepNumber = (step: string) => {
    switch (step) {
      case 'addresses': return 0
      case 'cargo': return 1
      case 'review': return 2
      default: return 0
    }
  }

  const updateForm = (field: keyof BookingForm, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!form.pickupAddress.trim()) {
      newErrors.pickupAddress = t('validationPickupRequired');
    }
    if (!form.deliveryAddress.trim()) {
      newErrors.deliveryAddress = t('validationDeliveryRequired');
    }
    if (!form.cargoType) {
      newErrors.cargoType = t('validationCargoTypeRequired');
    }
    if (!form.weight.trim()) {
      newErrors.weight = t('validationWeightRequired');
    } else if (isNaN(Number(form.weight))) {
      newErrors.weight = t('validationWeightNumber');
    }
    if (!form.urgency) {
      newErrors.urgency = t('validationUrgencyRequired');
    }
    if (!form.contactPhone.trim()) {
      newErrors.contactPhone = t('validationContactPhoneRequired');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      // TODO: Implement actual booking API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      Alert.alert(
        t('bookingSuccessTitle'),
        t('bookingSuccessBody'),
        [
          {
            text: t('viewOrders'),
            onPress: () => router.push('/(tabs)/orders'),
          },
          {
            text: t('bookAnother'),
            onPress: () => {
              setForm({
        pickupAddress: '',
        deliveryAddress: '',
        cargoType: '',
        weight: '',
        dimensions: '',
        urgency: '',
        specialInstructions: '',
        contactPhone: '',
        pickupDate: '',
        deliveryDate: '',
              });
            },
          },
        ]
      );
    } catch (error) {
      try {
        const { enqueueBooking } = require('../../src/utils/offlineQueue');
        await enqueueBooking({ form, pickupSel, deliverySel });
        Alert.alert(t('offlineTitle'), t('offlineBody'))
      } catch {}
    } finally {
      setIsLoading(false);
    }
  };

  const calculateEstimatedCost = (): number => {
    const weight = Number(form.weight) || 0;
    const baseRateINR = 50; // ₹50 per kg (demo rate)
    let multiplier = 1;

    if (form.urgency === 'express') multiplier = 1.5;
    if (form.urgency === 'same-day') multiplier = 2.5;

    return weight * baseRateINR * multiplier;
  };

  const handleStepChange = async (newStep: string) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    setStep(newStep as any)
  }
  
  const stepTitle = step === 'addresses' ? 'Route Selection' : step === 'cargo' ? 'Cargo Details' : 'Review & Book'
  
  return (
<Screen scroll={false} padding="$0">
      <FadeIn>
        <YStack flex={1} space="$4">
          {/* Premium Header */}
          <YStack space="$3" paddingHorizontal="$4" paddingTop="$4">
            <XStack alignItems="center" justifyContent="space-between">
              <YStack>
                <Text fontSize={22} fontWeight="700" color={colors.text}>
                  Book Shipment
                </Text>
                <Text fontSize={14} color={colors.textSecondary}>
                  Imphal ⟷ New Delhi Express Corridor
                </Text>
              </YStack>
              <Circle size={48} backgroundColor={colors.primary + '20'}>
                <Ionicons name="cube" size={20} color={colors.primary} />
              </Circle>
            </XStack>
            
            {/* Premium Step Indicator */}
            <PremiumStepIndicator 
              currentStep={getStepNumber(step)} 
              steps={steps} 
              colors={colors} 
            />
          </YStack>
          
          {/* Content Area */}
          <Tabs value={step} onValueChange={handleStepChange} flex={1}>
            {/* Hidden Tabs List */}
            <Tabs.List display="none">
              <Tabs.Tab value="addresses" />
              <Tabs.Tab value="cargo" />
              <Tabs.Tab value="review" />
            </Tabs.List>

            <Tabs.Content value="addresses">
              <Animated.View entering={FadeInLeft.duration(400)} style={{ flex: 1 }}>
                <ScrollView padding="$4" space="$4">
                  <ElevatedCard variant="elevated" animation="slide">
                    <YStack space="$4">
                      <XStack alignItems="center" space="$3">
                        <Circle size={40} backgroundColor={colors.primary + '20'}>
                          <Ionicons name="location" size={20} color={colors.primary} />
                        </Circle>
                        <YStack>
                          <Text fontSize={18} fontWeight="700" color={colors.text}>
                            Route Selection
                          </Text>
                          <Text fontSize={12} color={colors.textSecondary}>
                            Choose pickup and delivery locations
                          </Text>
                        </YStack>
                      </XStack>
                      
                      {/* Quick Address Selection */}
                      <YStack space="$3">
                        <Text fontSize={16} fontWeight="600" color={colors.text}>
                          Quick Select (TAPANGO Hubs)
                        </Text>
                        <XStack space="$2" flexWrap="wrap">
                          {TAPANGO_ADDRESSES.map((addr) => (
                            <Button
                              key={addr.formatted}
                              size="sm"
                              variant={form.pickupAddress === addr.formatted || form.deliveryAddress === addr.formatted ? 'primary' : 'outline'}
                              onPress={() => {
                                if (!form.pickupAddress) {
                                  updateForm('pickupAddress', addr.formatted)
                                } else if (!form.deliveryAddress && form.pickupAddress !== addr.formatted) {
                                  updateForm('deliveryAddress', addr.formatted)
                                }
                              }}
                              leftIcon={<Ionicons name={addr.type === 'hub' ? 'business' : 'airplane'} size={14} />}
                            >
                              {addr.city}
                            </Button>
                          ))}
                        </XStack>
                      </YStack>
                      
                      {/* Address Input Fields */}
                      {usePlaces ? (
                        <YStack space="$3">
                          <AddressAutocomplete
                            label="Pickup Location"
                            required
                            kind="pickup"
                            initialValue={form.pickupAddress}
                            onSelect={(sel) => {
                              setPickupSel(sel);
                              updateForm('pickupAddress', sel.formatted);
                            }}
                          />
                          <AddressAutocomplete
                            label="Delivery Location"
                            required
                            kind="delivery"
                            initialValue={form.deliveryAddress}
                            onSelect={(sel) => {
                              setDeliverySel(sel);
                              updateForm('deliveryAddress', sel.formatted);
                            }}
                          />
                        </YStack>
                      ) : (
                        <YStack space="$3">
                          <Input
                            label="Pickup Location"
                            value={form.pickupAddress}
                            onChangeText={(text: string) => updateForm('pickupAddress', text)}
                            placeholder="Enter pickup address in Imphal or Delhi"
                            error={errors.pickupAddress}
                            required
                            leftIcon={<Ionicons name="location" size={16} color={colors.primary} />}
                          />
                          <Input
                            label="Delivery Location"
                            value={form.deliveryAddress}
                            onChangeText={(text: string) => updateForm('deliveryAddress', text)}
                            placeholder="Enter delivery address in Delhi or Imphal"
                            error={errors.deliveryAddress}
                            required
                            leftIcon={<Ionicons name="flag" size={16} color={colors.success} />}
                          />
                        </YStack>
                      )}
                      
                      {/* Route Preview */}
                      {form.pickupAddress && form.deliveryAddress && (
                        <ElevatedCard variant="flat">
                          <XStack alignItems="center" space="$3">
                            <Circle size={32} backgroundColor={colors.success + '20'}>
                              <Ionicons name="checkmark" size={16} color={colors.success} />
                            </Circle>
                            <YStack flex={1}>
                              <Text fontSize={14} fontWeight="600" color={colors.text}>
                                Route Confirmed
                              </Text>
                              <Text fontSize={12} color={colors.textSecondary}>
                                {form.pickupAddress.split(',')[0]} → {form.deliveryAddress.split(',')[0]}
                              </Text>
                            </YStack>
                            {usePlaces && (
                              <Button size="sm" variant="ghost" onPress={() => {
                                const temp = form.pickupAddress;
                                updateForm('pickupAddress', form.deliveryAddress);
                                updateForm('deliveryAddress', temp);
                                const tempSel = pickupSel;
                                setPickupSel(deliverySel);
                                setDeliverySel(tempSel);
                              }}>
                                <Ionicons name="swap-horizontal" size={16} />
                              </Button>
                            )}
                          </XStack>
                        </ElevatedCard>
                      )}
                    </YStack>
                  </ElevatedCard>
                </ScrollView>
              </Animated.View>
            </Tabs.Content>
            
            <Tabs.Content value="cargo">
              <Animated.View entering={FadeInRight.duration(400)} style={{ flex: 1 }}>
                <ScrollView padding="$4" space="$4">
                  <ElevatedCard variant="elevated" animation="slide">
                    <YStack space="$4">
                      <XStack alignItems="center" space="$3">
                        <Circle size={40} backgroundColor={colors.secondary + '20'}>
                          <Ionicons name="cube" size={20} color={colors.secondary} />
                        </Circle>
                        <YStack>
                          <Text fontSize={18} fontWeight="700" color={colors.text}>
                            Cargo Details
                          </Text>
                          <Text fontSize={12} color={colors.textSecondary}>
                            Specify your shipment requirements
                          </Text>
                        </YStack>
                      </XStack>
                      
                      {/* Cargo Type Selection */}
                      <YStack space="$3">
                        <Text fontSize={16} fontWeight="600" color={colors.text}>
                          Cargo Type
                        </Text>
                        <XStack flexWrap="wrap" gap={8}>
                          {cargoTypeOptions.slice(0, 4).map(opt => (
                            <Button
                              key={opt.value}
                              size="sm"
                              variant={form.cargoType === opt.value ? 'primary' : 'outline'}
                              onPress={() => updateForm('cargoType', opt.value)}
                            >
                              {opt.label.split(' ')[0]}
                            </Button>
                          ))}
                        </XStack>
                        <Select
                          label="Select Cargo Type"
                          value={form.cargoType}
                          onValueChange={(value) => updateForm('cargoType', value)}
                          options={cargoTypeOptions}
                          error={errors.cargoType}
                          required
                        />
                      </YStack>
                      
                      {/* Weight and Dimensions */}
                      <XStack space="$3">
                        <YStack flex={1} space="$2">
                          <Input
                            label="Weight (kg)"
                            value={form.weight}
                            onChangeText={(text: string) => updateForm('weight', text)}
                            placeholder="0.0"
                            keyboardType="numeric"
                            error={errors.weight}
                            required
                            leftIcon={<Ionicons name="barbell" size={16} color={colors.warning} />}
                          />
                          <XStack space="$2">
                            <Button variant="outline" size="sm" onPress={() => updateForm('weight', String(Math.max(0, (Number(form.weight)||0)-1)))}>
                              <Ionicons name="remove" size={14} />
                            </Button>
                            <Button variant="outline" size="sm" onPress={() => updateForm('weight', String((Number(form.weight)||0)+1))}>
                              <Ionicons name="add" size={14} />
                            </Button>
                          </XStack>
                        </YStack>
                        
                        <YStack flex={1}>
                          <Input
                            label="Dimensions (cm)"
                            value={form.dimensions}
                            onChangeText={(text: string) => updateForm('dimensions', text)}
                            placeholder="L x W x H"
                            leftIcon={<Ionicons name="resize" size={16} color={colors.info} />}
                          />
                        </YStack>
                      </XStack>
                      
                      {/* Priority Selection */}
                      <Select
                        label="Delivery Priority"
                        value={form.urgency}
                        onValueChange={(value) => updateForm('urgency', value)}
                        options={urgencyOptions}
                        error={errors.urgency}
                        required
                      />
                      
                      {/* Contact and Instructions */}
                      <YStack space="$3">
                        <Input
                          label="Contact Phone"
                          value={form.contactPhone}
                          onChangeText={(text: string) => updateForm('contactPhone', text)}
                          placeholder="+91 98765 43210"
                          keyboardType="phone-pad"
                          error={errors.contactPhone}
                          required
                          leftIcon={<Ionicons name="call" size={16} color={colors.success} />}
                        />
                        
                        <Input
                          label="Special Instructions"
                          value={form.specialInstructions}
                          onChangeText={(text: string) => updateForm('specialInstructions', text)}
                          placeholder="Fragile, handle with care..."
                          multiline
                          numberOfLines={3}
                          leftIcon={<Ionicons name="information-circle" size={16} color={colors.textSecondary} />}
                        />
                      </YStack>
                    </YStack>
                  </ElevatedCard>
                </ScrollView>
              </Animated.View>
            </Tabs.Content>
            
            <Tabs.Content value="review">
              <Animated.View entering={SlideInDown.duration(500)} style={{ flex: 1 }}>
                <ScrollView padding="$4" space="$4">
                  <ElevatedCard variant="elevated" animation="slide">
                    <YStack space="$4">
                      <XStack alignItems="center" space="$3">
                        <Circle size={40} backgroundColor={colors.success + '20'}>
                          <Ionicons name="checkmark-circle" size={20} color={colors.success} />
                        </Circle>
                        <YStack>
                          <Text fontSize={18} fontWeight="700" color={colors.text}>
                            Review & Confirm
                          </Text>
                          <Text fontSize={12} color={colors.textSecondary}>
                            Verify details before booking
                          </Text>
                        </YStack>
                      </XStack>
                      
                      {/* Route Summary */}
                      <GlassCard variant="glass">
                        <YStack space="$2">
                          <Text fontSize={16} fontWeight="600" color={colors.text}>
                            Route Information
                          </Text>
                          <XStack alignItems="center" space="$2">
                            <Ionicons name="location" size={16} color={colors.primary} />
                            <Text fontSize={14} color={colors.textSecondary} flex={1} numberOfLines={1}>
                              {form.pickupAddress || 'Not selected'}
                            </Text>
                          </XStack>
                          <XStack alignItems="center" space="$2">
                            <Ionicons name="flag" size={16} color={colors.success} />
                            <Text fontSize={14} color={colors.textSecondary} flex={1} numberOfLines={1}>
                              {form.deliveryAddress || 'Not selected'}
                            </Text>
                          </XStack>
                        </YStack>
                      </GlassCard>
                      
                      {/* Cargo Summary */}
                      <GlassCard variant="glass">
                        <YStack space="$2">
                          <Text fontSize={16} fontWeight="600" color={colors.text}>
                            Cargo Information
                          </Text>
                          <XStack alignItems="center" justifyContent="space-between">
                            <Text fontSize={14} color={colors.textSecondary}>Type:</Text>
                            <Text fontSize={14} color={colors.text} fontWeight="600">
                              {cargoTypeOptions.find(opt => opt.value === form.cargoType)?.label || 'Not selected'}
                            </Text>
                          </XStack>
                          <XStack alignItems="center" justifyContent="space-between">
                            <Text fontSize={14} color={colors.textSecondary}>Weight:</Text>
                            <Text fontSize={14} color={colors.text} fontWeight="600">{form.weight || '0'} kg</Text>
                          </XStack>
                          <XStack alignItems="center" justifyContent="space-between">
                            <Text fontSize={14} color={colors.textSecondary}>Priority:</Text>
                            <Text fontSize={14} color={colors.text} fontWeight="600">
                              {urgencyOptions.find(opt => opt.value === form.urgency)?.label.split(' ')[0] || 'Not selected'}
                            </Text>
                          </XStack>
                        </YStack>
                      </GlassCard>
                      
                      {/* Estimated Cost */}
                      {form.weight && form.urgency && (
                        <ElevatedCard variant="elevated">
                          <XStack alignItems="center" justifyContent="space-between">
                            <YStack>
                              <Text fontSize={16} fontWeight="600" color={colors.text}>
                                Estimated Cost
                              </Text>
                              <Text fontSize={12} color={colors.textSecondary}>
                                Final price may vary
                              </Text>
                            </YStack>
                            <Text fontSize={22} fontWeight="800" color={colors.primary}>
                              {formatINR(calculateEstimatedCost())}
                            </Text>
                          </XStack>
                        </ElevatedCard>
                      )}
                      
                      {/* Save Draft Option */}
                      <Button 
                        variant="outline" 
                        onPress={async () => {
                          const { saveBookingDraft } = require('../../src/utils/drafts');
                          await saveBookingDraft({ form, pickupSel, deliverySel, savedAt: Date.now() });
                          Alert.alert('Draft Saved', 'Your booking has been saved as draft')
                        }}
                        leftIcon={<Ionicons name="save" size={16} />}
                      >
                        Save as Draft
                      </Button>
                    </YStack>
                  </ElevatedCard>
                </ScrollView>
              </Animated.View>
            </Tabs.Content>
          </Tabs>
          
          {/* Premium Navigation Footer */}
          <GlassCard variant="glass">
            <XStack space="$3" padding="$3">
              <Button 
                flex={1}
                variant="secondary" 
                onPress={() => {
                  const prevStep = step === 'addresses' ? 'addresses' : step === 'cargo' ? 'addresses' : 'cargo'
                  handleStepChange(prevStep)
                }}
                disabled={step === 'addresses'}
                leftIcon={<Ionicons name="chevron-back" size={16} />}
              >
                Back
              </Button>
              <Button 
                flex={2}
                variant="primary"
                onPress={() => {
                  if (step === 'review') {
                    handleSubmit()
                  } else {
                    const nextStep = step === 'addresses' ? 'cargo' : 'review'
                    handleStepChange(nextStep)
                  }
                }}
                loading={isLoading}
                rightIcon={step === 'review' ? <Ionicons name="checkmark" size={16} /> : <Ionicons name="chevron-forward" size={16} />}
              >
                {step === 'review' ? 'Book Shipment' : 'Continue'}
              </Button>
            </XStack>
          </GlassCard>
        </YStack>
      </FadeIn>
    </Screen>
  );
}
