import React from 'react';
import { router, usePathname } from 'expo-router';
import { Text, XStack, YStack } from 'tamagui';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppIcon, Button } from '../ui';

/**
 * Floating Action Hub (FAB hub)
 * - Primary action: Book (center)
 * - Fan actions: Track, Orders, Profile
 * - Appears on all tabs screens; hidden on auth/onboarding stacks
 */
type FabActionProps = { label: string; onPress: () => void; onClose: () => void };
const FabAction: React.FC<FabActionProps> = ({ label, onPress, onClose }) => (
  <Button
    variant='secondary'
    size='md'
    borderRadius={24}
    onPress={() => {
      onClose();
      onPress();
    }}
    accessibilityLabel={label}
  >
    {label}
  </Button>
);

const FabHub: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const insets = useSafeAreaInsets();
  const pathname = usePathname();

  // Only show inside the tabs segment
  const show = pathname?.startsWith('/(tabs)');
  if (!show) {
    return null;
  }

  const bottom = Math.max(16, insets.bottom) + 12;

  return (
    <YStack
      position='absolute'
      bottom={bottom}
      left={0}
      right={0}
      alignItems='center'
      pointerEvents='box-none'
    >
      {/* Fan actions */}
      {open && (
        <XStack space='$3' marginBottom='$3' pointerEvents='box-none'>
          <FabAction
            label='Track'
            onClose={() => setOpen(false)}
            onPress={() => router.push('/tracking')}
          />
          <FabAction
            label='Orders'
            onClose={() => setOpen(false)}
            onPress={() => router.push('/orders')}
          />
          <FabAction
            label='Profile'
            onClose={() => setOpen(false)}
            onPress={() => router.push('/profile')}
          />
        </XStack>
      )}

      {/* Main FAB */}
      <Button
        variant='primary'
        size='lg'
        borderRadius={28}
        onPress={() => (open ? setOpen(false) : router.push('/booking'))}
        onLongPress={() => setOpen((s) => !s)}
        fullWidth={false}
        accessibilityLabel={open ? 'Close actions' : 'Book new shipment'}
      >
        <XStack alignItems='center' space='$2'>
          <AppIcon name='add' size={20} color='#fff' />
          <Text color='#fff' fontWeight='700'>
            Book
          </Text>
        </XStack>
      </Button>
    </YStack>
  );
};

export default FabHub;
