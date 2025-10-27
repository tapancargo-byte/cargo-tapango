import { Sheet, SheetProps, YStack } from 'tamagui';
import { PropsWithChildren, useState } from 'react';

export const ActionSheet = ({ children, ...props }: PropsWithChildren<SheetProps>) => {
  const [open, setOpen] = useState(false);
  return (
    <Sheet modal open={open} onOpenChange={setOpen} snapPoints={[90]} {...props}>
      <Sheet.Overlay />
      <Sheet.Frame>
        <YStack padding='$4'>{children}</YStack>
      </Sheet.Frame>
    </Sheet>
  );
};
