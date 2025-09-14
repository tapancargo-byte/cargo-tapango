import { AppState, AppStateStatus, Platform } from 'react-native';
import * as Updates from 'expo-updates';
import Constants from 'expo-constants';

/**
 * OTA Updates helper for SDK 54
 * - Uses expo-updates to check on app start and when returning to foreground
 * - Shows optional lifecycle hooks so callers can present UI (toasts, banners)
 */
export type UpdateEvents = {
  onChecking?: () => void;
  onDownloading?: () => void;
  onDownloaded?: () => void;
  onUpToDate?: () => void;
  onError?: (err: Error) => void;
  onReloading?: () => void;
};

export async function checkForOTAUpdate(lifecycle?: UpdateEvents) {
  try {
    if (!Updates.isEnabled) {
      lifecycle?.onUpToDate?.();
      return;
    }

    lifecycle?.onChecking?.();

    const result = await Updates.checkForUpdateAsync();
    if (result.isAvailable) {
      lifecycle?.onDownloading?.();
      await Updates.fetchUpdateAsync();
      lifecycle?.onDownloaded?.();
      // Reload to the new update. SDK 54 supports a nicer reload screen, but default is fine.
      lifecycle?.onReloading?.();
      await Updates.reloadAsync();
    } else {
      lifecycle?.onUpToDate?.();
    }
  } catch (e: any) {
    lifecycle?.onError?.(e instanceof Error ? e : new Error(String(e)));
  }
}

/**
 * Starts listening for app foreground events to check for updates.
 * Returns an unsubscribe function.
 */
export function startUpdateListener(lifecycle?: UpdateEvents) {
  let appState: AppStateStatus = AppState.currentState;
  const sub = AppState.addEventListener('change', async (next) => {
    if (appState.match(/inactive|background/) && next === 'active') {
      // Skip checks in development / Expo Go reloads
      if (__DEV__ || Constants.executionEnvironment !== 'standalone') return;
      await checkForOTAUpdate(lifecycle);
    }
    appState = next;
  });
  return () => sub.remove();
}
