import React from 'react';
import { Image } from 'react-native';
import { XStack, YStack, Text } from 'tamagui';
import { Button } from '../../design-system/components/Button';
import { useColors } from '../../styles/ThemeProvider';

export interface KycUploaderProps {
  label: string;
  value?: string | null;
  onPick: (uri: string) => void;
}

export const KycUploader: React.FC<KycUploaderProps> = ({ label, value, onPick }) => {
  const c = useColors();
  const pick = async () => {
    const picker = await import('expo-image-picker');
    const res = await picker.launchImageLibraryAsync({
      mediaTypes: picker.MediaTypeOptions.Images,
      quality: 0.8,
    });
    if (!res.canceled && res.assets?.[0]?.uri) onPick(res.assets[0].uri);
  };
  return (
    <YStack space={'$2' as any}>
      <Text fontWeight='700' color={c.text}>
        {label}
      </Text>
      <XStack alignItems='center' space={'$3' as any}>
        <Button variant='secondary' size='sm' onPress={pick}>
          {value ? 'Replace' : 'Upload'}
        </Button>
        {value ? (
          <Image source={{ uri: value }} style={{ width: 60, height: 60, borderRadius: 8 }} />
        ) : null}
      </XStack>
    </YStack>
  );
};
