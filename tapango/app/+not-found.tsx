import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

/**
 * Global Not Found screen
 *
 * Catches any unmatched route and redirects to a safe destination:
 * - If the path is under the driver route group => go to driver sign-in
 * - Otherwise => go to splash (which routes to onboarding or tabs as needed)
 */
export default function NotFoundScreen() {
  const router = useRouter();
  const pathname = usePathname() || '';
  const insets = useSafeAreaInsets();

  React.useEffect(() => {
    const target = pathname.startsWith('/(driver)') ? '/(driver)/sign-in' : '/splash';
    // Use a microtask to allow the current frame to commit before navigate
    const t = setTimeout(() => router.replace(target as any), 0);
    return () => clearTimeout(t);
  }, [pathname, router]);

  const onGoHome = () => {
    const target = pathname.startsWith('/(driver)') ? '/(driver)/sign-in' : '/splash';
    router.replace(target as any);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <Text style={styles.title}>Unmatched Route</Text>
      <Text style={styles.subtitle}>We couldn't find that page. Redirecting…</Text>
      <TouchableOpacity accessibilityRole='button' onPress={onGoHome} style={styles.btn}>
        <Text style={styles.btnText}>Go Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001A36',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 8,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
  btn: {
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 20,
  },
  btnText: {
    color: '#001A36',
    fontSize: 16,
    fontWeight: '700',
  },
});
