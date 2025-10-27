import React from 'react';
import { AccessibilityInfo, findNodeHandle, Platform } from 'react-native';

// Accessibility announcements
export const announceForAccessibility = (message: string) => {
  if (Platform.OS === 'ios') {
    AccessibilityInfo.announceForAccessibility(message);
  } else if (Platform.OS === 'android') {
    AccessibilityInfo.announceForAccessibilityWithOptions(message, {
      queue: false,
    });
  }
};

// Focus management
export const setAccessibilityFocus = (reactTag: number | null) => {
  if (reactTag && Platform.OS === 'ios') {
    AccessibilityInfo.setAccessibilityFocus(reactTag);
  } else if (reactTag && Platform.OS === 'android') {
    // Android fallback: announce focus change
    AccessibilityInfo.announceForAccessibility('Focused');
  }
};

// Screen reader detection
export const useScreenReader = () => {
  const [isScreenReaderEnabled, setIsScreenReaderEnabled] = React.useState(false);

  React.useEffect(() => {
    const checkScreenReader = async () => {
      const enabled = await AccessibilityInfo.isScreenReaderEnabled();
      setIsScreenReaderEnabled(enabled);
    };

    void checkScreenReader();

    const subscription = AccessibilityInfo.addEventListener(
      'screenReaderChanged',
      setIsScreenReaderEnabled
    );

    return () => {
      subscription?.remove();
    };
  }, []);

  return isScreenReaderEnabled;
};

// Accessibility labels and hints
export const createAccessibilityLabel = (
  label: string,
  value?: string | number,
  state?: string
): string => {
  let result = label;

  if (value !== undefined && value !== '') {
    result += `, ${value}`;
  }

  if (state) {
    result += `, ${state}`;
  }

  return result;
};

export const createAccessibilityHint = (action: string, result?: string): string => {
  let hint = `Double tap to ${action}`;

  if (result) {
    hint += `. This will ${result}`;
  }

  return hint;
};

// Common accessibility roles
export const AccessibilityRoles = {
  button: 'button' as const,
  link: 'link' as const,
  text: 'text' as const,
  image: 'image' as const,
  imagebutton: 'imagebutton' as const,
  header: 'header' as const,
  search: 'search' as const,
  tab: 'tab' as const,
  tablist: 'tablist' as const,
  menu: 'menu' as const,
  menuitem: 'menuitem' as const,
  progressbar: 'progressbar' as const,
  alert: 'alert' as const,
  checkbox: 'checkbox' as const,
  radio: 'radio' as const,
  spinbutton: 'spinbutton' as const,
  switch: 'switch' as const,
  textbox: 'textbox' as const,
};

// Common accessibility traits
export const AccessibilityTraits = Platform.select({
  ios: {
    adjustable: ['adjustable'] as const,
    allowsDirectInteraction: ['allowsDirectInteraction'] as const,
    button: ['button'] as const,
    disabled: ['disabled'] as const,
    header: ['header'] as const,
    image: ['image'] as const,
    keyboardKey: ['keyboardKey'] as const,
    link: ['link'] as const,
    none: ['none'] as const,
    plays: ['plays'] as const,
    search: ['search'] as const,
    selected: ['selected'] as const,
    startsMedia: ['startsMedia'] as const,
    summary: ['summary'] as const,
    text: ['text'] as const,
    updatesFrequently: ['updatesFrequently'] as const,
  },
  default: {},
});

// Accessibility states
export interface AccessibilityState {
  disabled?: boolean;
  selected?: boolean;
  checked?: boolean | 'mixed';
  busy?: boolean;
  expanded?: boolean;
}

// Enhanced accessibility props
export interface AccessibilityProps {
  accessible?: boolean;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  accessibilityRole?: keyof typeof AccessibilityRoles;
  accessibilityState?: AccessibilityState;
  accessibilityValue?: {
    min?: number;
    max?: number;
    now?: number;
    text?: string;
  };
  testID?: string;
}

// Focus trap for modals
export const useFocusTrap = (isActive: boolean) => {
  const firstElementRef = React.useRef<any>(null);
  const lastElementRef = React.useRef<any>(null);

  React.useEffect(() => {
    if (isActive && firstElementRef.current) {
      const nodeHandle = findNodeHandle(
        firstElementRef.current as unknown as number | React.Component<any, any> | null
      );
      if (nodeHandle) {
        setTimeout(() => setAccessibilityFocus(nodeHandle), 100);
      }
    }
  }, [isActive]);

  const handleKeyPress = (event: any) => {
    if (event.nativeEvent.key === 'Tab' && isActive) {
      const { target, shiftKey } = event.nativeEvent;

      if (shiftKey && target === firstElementRef.current) {
        event.preventDefault();
        lastElementRef.current?.focus();
      } else if (!shiftKey && target === lastElementRef.current) {
        event.preventDefault();
        firstElementRef.current?.focus();
      }
    }
  };

  return {
    firstElementRef,
    lastElementRef,
    handleKeyPress,
  };
};

// Live region announcer
export const useLiveRegion = () => {
  const announce = React.useCallback(
    (message: string, priority: 'polite' | 'assertive' = 'polite') => {
      if (Platform.OS === 'ios') {
        AccessibilityInfo.announceForAccessibility(message);
      } else if (Platform.OS === 'android') {
        AccessibilityInfo.announceForAccessibilityWithOptions(message, {
          queue: priority === 'polite',
        });
      }
    },
    []
  );

  return { announce };
};

// Accessible navigation helpers
export const NavigationAnnouncements = {
  screenEntered: (screenName: string) => `${screenName} screen`,
  tabSelected: (tabName: string) => `${tabName} tab selected`,
  modalOpened: (modalName: string) => `${modalName} modal opened`,
  modalClosed: (modalName: string) => `${modalName} modal closed`,
  formValidationError: (errors: string[]) =>
    `Form has ${errors.length} errors: ${errors.join(', ')}`,
  actionCompleted: (action: string) => `${action} completed successfully`,
  actionFailed: (action: string, reason?: string) =>
    `${action} failed${reason ? `: ${reason}` : ''}`,
};

// Form accessibility helpers
export const FormAccessibility = {
  createFieldLabel: (label: string, required: boolean = false) =>
    `${label}${required ? ', required' : ''}`,

  createFieldHint: (hint: string) => hint,

  createValidationMessage: (field: string, error: string) => `${field} error: ${error}`,

  createSuccessMessage: (message: string) => `Success: ${message}`,

  createProgressLabel: (current: number, total: number, step?: string) =>
    `Step ${current} of ${total}${step ? `: ${step}` : ''}`,
};

// Button accessibility helpers
export const ButtonAccessibility = {
  loading: (action: string) => ({
    accessibilityLabel: `${action}, loading`,
    accessibilityHint: 'Please wait',
    accessibilityState: { busy: true },
  }),

  disabled: (action: string, reason?: string) => ({
    accessibilityLabel: `${action}, disabled`,
    accessibilityHint: reason || 'Not available',
    accessibilityState: { disabled: true },
  }),

  toggle: (action: string, isOn: boolean) => ({
    accessibilityLabel: `${action}, ${isOn ? 'on' : 'off'}`,
    accessibilityHint: `Double tap to turn ${isOn ? 'off' : 'on'}`,
    accessibilityRole: 'switch' as const,
    accessibilityState: { checked: isOn },
  }),

  counter: (label: string, count: number, action: string) => ({
    accessibilityLabel: `${label}, ${count} items`,
    accessibilityHint: `Double tap to ${action}`,
    accessibilityValue: { now: count },
  }),
};

// List accessibility helpers
export const ListAccessibility = {
  item: (index: number, total: number, label: string) => ({
    accessibilityLabel: `${label}, item ${index + 1} of ${total}`,
  }),

  emptyList: (listName: string) => ({
    accessibilityLabel: `${listName} list is empty`,
    accessibilityRole: 'text' as const,
  }),

  loadingList: (listName: string) => ({
    accessibilityLabel: `Loading ${listName}`,
    accessibilityState: { busy: true },
  }),
};

// Input accessibility helpers
export const InputAccessibility = {
  textField: (label: string, value: string, required: boolean = false, error?: string) => ({
    accessibilityLabel: createAccessibilityLabel(label, value, error ? 'invalid' : undefined),
    accessibilityHint: error || (required ? 'Required field' : undefined),
    accessibilityRole: 'textbox' as const,
    accessibilityState: {
      disabled: false,
      ...(error ? { invalid: true } : {}),
    },
  }),

  searchField: (placeholder: string, value?: string) => ({
    accessibilityLabel: createAccessibilityLabel('Search', value),
    accessibilityHint: placeholder,
    accessibilityRole: 'search' as const,
  }),

  secureField: (label: string, isSecure: boolean) => ({
    accessibilityLabel: `${label}, ${isSecure ? 'secure text entry' : 'text entry'}`,
    accessibilityHint: `Double tap to ${isSecure ? 'show' : 'hide'} text`,
  }),
};

// Custom hook for enhanced accessibility
export const useAccessibilityProps = (
  baseProps: AccessibilityProps,
  dynamicState?: Partial<AccessibilityState>
): AccessibilityProps => {
  return React.useMemo(
    () => ({
      ...baseProps,
      accessibilityState: {
        ...baseProps.accessibilityState,
        ...dynamicState,
      },
    }),
    [baseProps, dynamicState]
  );
};

// Focus management hook
export const useFocusManagement = () => {
  const focusedElementRef = React.useRef<any>(null);

  const setFocus = React.useCallback((element: any) => {
    focusedElementRef.current = element;
    const nodeHandle = findNodeHandle(
      element as unknown as number | React.Component<any, any> | null
    );
    if (nodeHandle) {
      setAccessibilityFocus(nodeHandle);
    }
  }, []);

  const getFocusedElement = React.useCallback(() => {
    return focusedElementRef.current;
  }, []);

  return {
    setFocus,
    getFocusedElement,
  };
};
