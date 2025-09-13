import React, { useState, useRef, useEffect } from 'react';
import { XStack, YStack, Text } from 'tamagui';
import { AnimatePresence } from '@tamagui/animate-presence';
import { Ionicons } from '@expo/vector-icons';
import { GlassCard, Input, Button, LoadingSpinner, FadeIn } from '../../ui';
import { useColors } from '../../styles/ThemeProvider';
import { Circle } from '../../ui';
import { t } from '../../i18n';

interface SearchCardProps {
  trackingNumber: string;
  onChangeTracking: (value: string) => void;
  error?: string | null;
  isLoading: boolean;
  onTrack: () => Promise<void>;
  minLoadingTime?: number; // Minimum time to show loading state in ms
}

interface LoadingButtonProps {
  isLoading: boolean;
  onPress: () => Promise<void>;
  disabled?: boolean;
  children: React.ReactNode;
}

function LoadingButton({ isLoading, onPress, disabled = false, children }: LoadingButtonProps) {
  const [loading, setLoading] = useState(false);
  const [loadingSince, setLoadingSince] = useState<number | null>(null);
  const loadingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (isLoading && !loadingSince) {
      setLoadingSince(Date.now());
      setLoading(true);
    } else if (!isLoading && loadingSince) {
      const elapsed = Date.now() - loadingSince;
      const remainingTime = Math.max(0, 500 - elapsed); // Minimum 500ms loading time
      
      if (remainingTime > 0) {
        if (loadingTimer.current) {
          clearTimeout(loadingTimer.current);
        }
        loadingTimer.current = setTimeout(() => {
          setLoadingSince(null);
          setLoading(false);
        }, remainingTime);
      } else {
        setLoadingSince(null);
        setLoading(false);
      }
    }
    return () => {
      if (loadingTimer.current) {
        clearTimeout(loadingTimer.current);
      }
    };
  }, [isLoading, loadingSince]);

  return (
    <AnimatePresence>
      {loading ? (
        <FadeIn key="loading">
          <Button fullWidth size="lg" disabled>
            <LoadingSpinner size="sm" />
            <Text marginLeft="$2" animation="quick">
              Searching...
            </Text>
          </Button>
        </FadeIn>
      ) : (
        <FadeIn key="default">
          <Button 
            fullWidth 
            size="lg" 
            onPress={onPress} 
            variant="primary" 
            disabled={disabled}
            animation="quick"
          >
            {children}
          </Button>
        </FadeIn>
      )}
    </AnimatePresence>
  );
}

export function SearchCard({
  trackingNumber,
  onChangeTracking,
  error,
  isLoading,
  onTrack,
  minLoadingTime = 500
}: SearchCardProps) {
  const errorId = useRef(`error-${Math.random().toString(36).slice(2)}`).current;
  const [validationError, setValidationError] = useState<string | null>(null);

  const validateTracking = (value: string) => {
    const cleanValue = value.trim();
    if (!cleanValue) {
      setValidationError('Please enter a tracking number');
      return false;
    }
    if (cleanValue.length < 8) {
      setValidationError('Tracking number must be at least 8 characters');
      return false;
    }
    if (!/^[A-Z0-9]+$/i.test(cleanValue)) {
      setValidationError('Tracking number can only contain letters and numbers');
      return false;
    }
    setValidationError(null);
    return true;
  };

  const handleChangeTracking = (value: string) => {
    onChangeTracking(value);
    if (value.trim()) {
      validateTracking(value);
    } else {
      setValidationError(null);
    }
  };

  const handleTrack = async () => {
    if (validateTracking(trackingNumber)) {
      await onTrack();
    }
  };
  const palette = useColors();

  return (
    <GlassCard variant="glass" animation="quick" role="region" aria-label="Track Shipment Form">
      <YStack space="$3">
        <XStack alignItems="center" space="$3">
          <Circle size={40} backgroundColor={palette.info + '20'} role="presentation">
            <Ionicons name="search" size={20} color={palette.info} accessibilityRole="image" accessibilityLabel="Search icon" />
          </Circle>
          <YStack>
            <Text fontSize="$section" fontWeight="700" color={palette.text} role="heading" aria-level={2}>
              Track Shipment
            </Text>
            <Text fontSize="$caption" color={palette.textSecondary} role="text">
              Enter tracking number or scan QR code
            </Text>
          </YStack>
        </XStack>
        
        <Input
          label="Tracking Number"
          value={trackingNumber}
          onChangeText={handleChangeTracking}
          placeholder="TPG123456789"
          error={(validationError ?? error) ?? undefined}
          aria-describedby={(validationError ?? error) ? errorId : undefined}
          aria-invalid={(validationError ?? error) ? "true" : "false"}
          variant="filled"
          rightIcon={
            <Ionicons 
              name="qr-code" 
              size={20} 
              color={palette.textSecondary} 
              accessibilityRole="button"
              accessibilityLabel="Open QR code scanner"
            />
          }
          accessibilityLabel="Enter your tracking number"
          accessibilityHint="Enter your tracking number to locate your shipment"
          returnKeyType="search"
          onSubmitEditing={handleTrack}
        />
        
        <AnimatePresence>
          {(validationError ?? error) && (
            <FadeIn>
              <XStack 
                backgroundColor={`${palette.error}15`}
                paddingHorizontal="$3"
                paddingVertical="$2"
                borderRadius="$2"
                role="alert"
                id={errorId}
                alignItems="center"
                space="$2"
              >
                <Ionicons name="alert-circle" size={16} color={palette.error} />
                <Text 
                  color={palette.error}
                  fontSize="$caption"
                >
                  {validationError ?? error}
                </Text>
              </XStack>
            </FadeIn>
          )}
        </AnimatePresence>
        
        <LoadingButton 
          isLoading={isLoading} 
          onPress={handleTrack} 
          disabled={!trackingNumber.trim()}
        >
          <Ionicons name="search" size={20} color="white" />
          <Text color="white" fontWeight="700" marginLeft="$2">
            Track Package
          </Text>
        </LoadingButton>
      </YStack>
    </GlassCard>
  );
}