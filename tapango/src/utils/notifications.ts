import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

let notifiedNoProjectId = false;
let initDone = false;

const TOKEN_KEY = 'expo_push_token_v1';

// Foreground behavior: show alerts by default
Notifications.setNotificationHandler({
  handleNotification: async () =>
    ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
      // SDK 54: include banner/list flags to satisfy NotificationBehavior type
      shouldShowBanner: true,
      shouldShowList: true,
    }) as any,
});

async function ensureAndroidChannel() {
  if (Platform.OS !== 'android') {
    return;
  }
  await Notifications.setNotificationChannelAsync('default', {
    name: 'General',
    importance: Notifications.AndroidImportance.DEFAULT,
    vibrationPattern: [0, 250, 250, 250],
    lightColor: '#1E40AF',
    lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC,
    showBadge: true,
  });
}

export async function requestNotificationPermissions(): Promise<boolean> {
  const cur = await Notifications.getPermissionsAsync();
  if (cur.status === 'granted') {
    return true;
  }
  const res = await Notifications.requestPermissionsAsync();
  return res.status === 'granted';
}

export async function getExpoProjectId(): Promise<string | undefined> {
  // EAS projects expose projectId via Constants in dev builds
  // In Expo Go, this will be undefined
  // @ts-ignore
  const easId =
    (Constants as any)?.easConfig?.projectId ||
    (Constants as any)?.expoConfig?.extra?.eas?.projectId;
  return easId;
}

export async function getPushToken(force = false): Promise<string | null> {
  try {
    // Skip in Expo Go: remote tokens require a dev build with projectId
    if ((Constants as any)?.appOwnership === 'expo') {
      if (!notifiedNoProjectId) {
        console.warn(
          'Push token not available in Expo Go. Use a development build (expo-dev-client).'
        );
        notifiedNoProjectId = true;
      }
      return null;
    }

    if (!force) {
      const cached = await AsyncStorage.getItem(TOKEN_KEY);
      if (cached) {
        return cached;
      }
    }
    const granted = await requestNotificationPermissions();
    if (!granted) {
      return null;
    }

    await ensureAndroidChannel();

    const projectId = await getExpoProjectId();
    if (!projectId) {
      if (!notifiedNoProjectId) {
        console.warn(
          'No projectId found. Set up an EAS project or pass projectId to getExpoPushTokenAsync using a development build.'
        );
        notifiedNoProjectId = true;
      }
      return null;
    }

    const token = (await Notifications.getExpoPushTokenAsync({ projectId }))
      .data;

    await AsyncStorage.setItem(TOKEN_KEY, token);
    return token;
  } catch (e) {
    console.warn('Failed to get push token', e);
    return null;
  }
}

export type NotifyOptions = {
  title: string;
  body?: string;
  data?: Record<string, any>;
};

export async function presentLocal(opts: NotifyOptions) {
  await ensureAndroidChannel();
  await Notifications.scheduleNotificationAsync({
    content: {
      title: opts.title,
      body: opts.body ?? null,
      data: opts.data ?? {},
    },
    trigger: null, // immediate
  } as any);
}

// High-level helpers for common app events
export async function notifyLoginSuccess(userEmail?: string) {
  await presentLocal({
    title: 'Signed in',
    body: userEmail ? `Welcome back, ${userEmail}` : 'Welcome back to TAPANGO',
    data: { type: 'auth_login' },
  });
}

export async function notifyLogoutSuccess() {
  await presentLocal({
    title: 'Signed out',
    body: 'You have been signed out of TAPANGO',
    data: { type: 'auth_logout' },
  });
}

export async function notifyBookingCreated(trackingNumber?: string) {
  await presentLocal({
    title: 'Booking created',
    body: trackingNumber
      ? `Tracking #${trackingNumber}`
      : 'Your shipment has been created',
    data: { type: 'booking_created', trackingNumber },
  });
}

export async function notifyOrderStatusChanged(id: string, status: string) {
  await presentLocal({
    title: 'Order update',
    body: `${id} is now ${status}`,
    data: { type: 'order_update', id, status },
  });
}

// Initialization to be called once at app start
async function maybeRegisterToken(token: string) {
  try {
    // @ts-ignore
    const url: string | null | undefined =
      Constants?.expoConfig?.extra?.api?.pushRegisterUrl;
    if (!url) {
      return;
    }
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, platform: Platform.OS }),
    });
  } catch (e) {
    // Silent fail; dev may not have a backend yet
  }
}

export async function initNotifications() {
  if (initDone) {
    return;
  }
  initDone = true;
  try {
    const granted = await requestNotificationPermissions();
    if (granted) {
      const token = await getPushToken();
      if (token) {
        console.log('Expo push token:', token);
        await maybeRegisterToken(token);
      }
    }

    // Optional listeners (kept minimal for now)
    Notifications.addNotificationReceivedListener((n) => {
      // console.log('Notification received in foreground', n);
    });
    Notifications.addNotificationResponseReceivedListener((resp) => {
      // console.log('User interacted with notification', resp);
    });
  } catch (e) {
    console.warn('initNotifications failed', e);
  }
}
