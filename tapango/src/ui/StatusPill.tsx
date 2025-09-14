import React from 'react';
import { InlineBadge } from './InlineBadge';
import { t } from '../i18n';
import { Animated, Easing, Platform } from 'react-native';

export const StatusPill: React.FC<{
  status: 'in-transit' | 'delivered' | 'pending' | 'delayed';
  delayMs?: number;
}> = ({ status, delayMs = 0 }) => {
  const opacity = React.useRef(new Animated.Value(0)).current;
  const scale = React.useRef(new Animated.Value(0.95)).current;

  React.useEffect(() => {
    opacity.setValue(0);
    scale.setValue(0.95);
    const useDriver = Platform.OS !== 'web';
    const start = () =>
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 180,
          easing: Easing.out(Easing.ease),
          useNativeDriver: useDriver,
        }),
        Animated.spring(scale, {
          toValue: 1,
          useNativeDriver: useDriver,
          friction: 6,
          tension: 140,
        }),
      ]).start();
    if (delayMs > 0) {
      const id = setTimeout(start, delayMs);
      return () => {
        clearTimeout(id);
      };
    }
    start();
    return () => {};
  }, [status, opacity, scale, delayMs]);

  let node: React.ReactNode;
  if (status === 'in-transit') node = <InlineBadge text={t('inTransit')} tone='info' />;
  else if (status === 'delivered') node = <InlineBadge text={t('delivered')} tone='success' />;
  else if (status === 'delayed') node = <InlineBadge text={t('delayed')} tone='error' />;
  else node = <InlineBadge text={t('onSchedule')} tone='warning' />;

  return <Animated.View style={{ opacity, transform: [{ scale }] }}>{node}</Animated.View>;
};
