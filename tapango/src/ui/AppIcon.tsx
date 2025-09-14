import React from 'react';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useColors } from '../styles/ThemeProvider';

export interface AppIconProps {
  name: string; // generic name; mapped to Feather by default
  size?: number;
  color?: string;
  tintFallback?: keyof ReturnType<typeof useColors>;
  set?: 'feather' | 'ion' | 'mci'; // optional override
  style?: any; // pass-through for layout spacing when replacing direct icon usage
}

const ionToFeather: Record<string, string> = {
  home: 'home',
  'add-circle': 'plus-circle',
  add: 'plus',
  location: 'map-pin',
  list: 'list',
  person: 'user',
  settings: 'settings',
  search: 'search',
  alert: 'alert-circle',
  close: 'x',
  checkmark: 'check',
  'chevron-forward': 'chevron-right',
  'chevron-back': 'chevron-left',
  'chevron-down': 'chevron-down',
  'chevron-up': 'chevron-up',
  notifications: 'bell',
  'notifications-outline': 'bell',
  // Common alias names and Ionicons that we map to Feather equivalents
  cube: 'box',
  'cube-outline': 'box',
  document: 'file-text',
  'document-text': 'file-text',
  'document-text-outline': 'file-text',
  car: 'truck',
  'car-outline': 'truck',
  flag: 'flag',
  business: 'briefcase',
  'chatbubble-ellipses': 'message-circle',
  'chevron-forward-outline': 'chevron-right',
  flash: 'zap',
  navigate: 'navigation',
  time: 'clock',
  'qr-code': 'grid',
  'open-outline': 'external-link',
  'person-outline': 'user',
  'mail-outline': 'mail',
  'call-outline': 'phone',
  'location-outline': 'map-pin',
  'information-outline': 'info',
  'stats-chart-outline': 'bar-chart-2',
  'cash-outline': 'dollar-sign',
  'storefront-outline': 'shopping-bag',
  pricetag: 'tag',
  wallet: 'credit-card',
  'id-card': 'credit-card',
};

export const AppIcon: React.FC<AppIconProps> = ({
  name,
  size = 18,
  color,
  tintFallback,
  set,
  style,
}) => {
  const colors = useColors();
  const resolvedColor =
    color || (tintFallback ? (colors as any)[tintFallback] : colors.textSecondary);

  const family = set || 'feather';
  try {
    if (family === 'feather') {
      const mapped = (ionToFeather[name] || name) as React.ComponentProps<typeof Feather>['name'];
      return <Feather name={mapped} size={size} color={resolvedColor} style={style} />;
    }
    if (family === 'mci') {
      return (
        <MaterialCommunityIcons
          name={name as any}
          size={size}
          color={resolvedColor}
          style={style}
        />
      );
    }
    // default ion fall-through
    return <Ionicons name={name as any} size={size} color={resolvedColor} style={style} />;
  } catch {
    // Safe fallback in case of bad name
    return <Feather name={'circle' as any} size={size} color={resolvedColor} />;
  }
};
