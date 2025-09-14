import React from 'react';
import { Label, Select as TSelect, Adapt, Sheet, YStack, XStack, Text } from 'tamagui';
import { useColors } from '../../styles/ThemeProvider';

export type SelectOption = { label: string; value: string };

export interface AppSelectProps {
  label?: string;
  value?: string;
  options: SelectOption[];
  onValueChange: (value: string) => void;
  placeholder?: string;
  error?: string | undefined;
  helper?: string;
  required?: boolean;
}

export const Select = ({
  label,
  value,
  options,
  onValueChange,
  placeholder = 'Select…',
  error,
  helper,
  required,
}: AppSelectProps) => {
  const colors = useColors();
  return (
    <YStack space='$2'>
      {label ? (
        <Label>
          {label}
          {required ? <Text color={colors.error}> *</Text> : null}
        </Label>
      ) : null}

      <TSelect value={value} onValueChange={onValueChange}>
        <TSelect.Trigger borderRadius='$4'>
          <TSelect.Value placeholder={placeholder} />
        </TSelect.Trigger>
        <Adapt when='sm' platform='touch'>
          <Sheet modal dismissOnSnapToBottom>
            <Sheet.Frame>
              <Sheet.ScrollView>
                <Adapt.Contents />
              </Sheet.ScrollView>
            </Sheet.Frame>
            <Sheet.Overlay />
          </Sheet>
        </Adapt>
        <TSelect.Content>
          <TSelect.Viewport>
            {options.map((opt, idx) => (
              <TSelect.Item key={opt.value} value={opt.value} index={idx}>
                <TSelect.ItemText>{opt.label}</TSelect.ItemText>
              </TSelect.Item>
            ))}
          </TSelect.Viewport>
        </TSelect.Content>
      </TSelect>

      {error ? (
        <Label color={colors.error}>{error}</Label>
      ) : helper ? (
        <Label opacity={0.7}>{helper}</Label>
      ) : null}
    </YStack>
  );
};
