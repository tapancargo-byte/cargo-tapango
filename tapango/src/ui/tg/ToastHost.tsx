import React, {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Animated, Easing, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { YStack, XStack, Text } from 'tamagui';
import { AppIcon } from '../../ui';
import { useColors } from '../../styles/ThemeProvider';

// In-app toast host (no native deps). Provides a minimal, theme-friendly toast.

export type ToastVariant = 'info' | 'success' | 'warning' | 'error';
export type ToastAPI = {
  show: (title: string, message?: string, opts?: { variant?: ToastVariant }) => void;
  hide: () => void;
};

type ToastItem = { id: string; title: string; message?: string | undefined; variant: ToastVariant };

const ToastCtx = createContext<ToastAPI>({ show: () => {}, hide: () => {} });

export const AppToastProvider = ({ children }: PropsWithChildren) => {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [queue, setQueue] = useState<ToastItem[]>([]);
  const [current, setCurrent] = useState<ToastItem | null>(null);
  const opacity = useRef(new Animated.Value(0)).current;
  const translate = useRef(new Animated.Value(16)).current;
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const playIn = useCallback(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 180,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(translate, {
        toValue: 0,
        duration: 180,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();
  }, [opacity, translate]);

  const playOut = useCallback(
    (onEnd?: () => void) => {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 160,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(translate, {
          toValue: 16,
          duration: 160,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start(({ finished }) => finished && onEnd?.());
    },
    [opacity, translate]
  );

  const next = useCallback(() => {
    setCurrent((cur) => {
      const rest = queue.slice(1);
      const nextItem = queue[0];
      if (nextItem) {
        // reset anim
        opacity.setValue(0);
        translate.setValue(16);
        setQueue(rest);
        setTimeout(playIn, 0);
        return nextItem;
      }
      return null;
    });
  }, [playIn, opacity, translate, queue]);

  useEffect(() => {
    if (!current && queue.length > 0) {
      setCurrent(queue[0] ?? null);
      setQueue((q) => q.slice(1));
      playIn();
    }
  }, [current, queue, playIn]);

  const api = useMemo<ToastAPI>(
    () => ({
      show: (title: string, message?: string, opts?: { variant?: ToastVariant }) => {
        const item: ToastItem = {
          id: String(Date.now() + Math.random()),
          title,
          message,
          variant: opts?.variant ?? 'info',
        };
        setQueue((q) => [...q, item]);
      },
      hide: () => {
        if (current) {
          playOut(() => setCurrent(null));
        }
      },
    }),
    [current, playOut]
  );

  // Auto-dismiss current
  useEffect(() => {
    if (!current) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      playOut(() => setCurrent(null));
    }, 3000);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [current, playOut]);

  return (
    <ToastCtx.Provider value={api}>
      {children}
      {current ? (
        <Animated.View
          pointerEvents='box-none'
          style={[
            styles.host,
            { bottom: insets.bottom + 16, opacity, transform: [{ translateY: translate }] },
          ]}
        >
          <YStack
            elevation={4}
            backgroundColor='$background'
            borderRadius='$4'
            padding='$3'
            borderColor={colors.border}
            borderWidth={1}
            maxWidth={360}
            alignSelf='center'
          >
            <XStack alignItems='center' space='$2'>
              {/* Left accent icon based on variant */}
              {current.variant === 'success' && (
                <AppIcon name='check-circle' size={18} color='#10B981' />
              )}
              {current.variant === 'warning' && (
                <AppIcon name='alert-triangle' size={18} color='#F59E0B' />
              )}
              {current.variant === 'error' && (
                <AppIcon name='alert-circle' size={18} color='#EF4444' />
              )}
              {current.variant === 'info' && <AppIcon name='info' size={18} color='#60A5FA' />}
              <YStack>
                <Text fontWeight='700'>{current.title}</Text>
                {current.message ? <Text opacity={0.8}>{current.message}</Text> : null}
              </YStack>
            </XStack>
          </YStack>
        </Animated.View>
      ) : null}
    </ToastCtx.Provider>
  );
};

const styles = StyleSheet.create({
  host: { position: 'absolute', left: 0, right: 0, alignItems: 'center' },
});

export const useAppToast = () => useContext(ToastCtx);
