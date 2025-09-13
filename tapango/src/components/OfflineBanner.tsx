import React, { useEffect, useState } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { YStack, Text } from 'tamagui';
import { useColors as useAppColors } from '../styles/ThemeProvider';

// Compact inline offline banner using Tamagui
export const OfflineBanner: React.FC<{ inline?: boolean }> = ({ inline = true }) => {
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    let unsub: (() => void) | undefined;

    unsub = NetInfo.addEventListener((state) => {
      setOffline(!(state?.isConnected && state?.isInternetReachable !== false));
    });

    NetInfo.fetch().then((state) => {
      setOffline(!(state?.isConnected && state?.isInternetReachable !== false));
    });

    return () => { unsub?.(); };
  }, []);

  useEffect(() => {
    if (!offline) {
      import('../utils/offlineQueue').then(m => m.drainPendingBookings?.()).catch(() => {});
      import('../services/driverOffers').then(m => m.drainDriverOffers?.()).catch(() => {});
      import('../services/kyc').then(m => m.drainKycUploads?.()).catch(() => {});
    }
  }, [offline]);

  if (!offline) return null;

  // Inline banner: shows as a rounded bar that can be placed under headers
  const palette = useAppColors();
  return (
    <YStack
      accessibilityRole="alert"
      backgroundColor={palette.warning}
      borderRadius="$4"
      paddingVertical={8}
      paddingHorizontal={12}
      marginHorizontal={16}
      marginTop={8}
    >
      <Text color={palette.text} fontWeight="700" textAlign="center">
        You’re offline. Actions will be queued and retried.
      </Text>
    </YStack>
  );
};
