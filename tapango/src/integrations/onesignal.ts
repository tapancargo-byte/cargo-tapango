import Constants from 'expo-constants';
import { Platform } from 'react-native';

// Guarded dynamic access to OneSignal to avoid crashing in Expo Go or on web
async function getOneSignal() {
  // In Expo Go, native modules like OneSignal aren't available
  if ((Constants as any)?.appOwnership === 'expo') {
    return undefined;
  }
  if (Platform.OS === 'web') {
    return undefined;
  }
  try {
    const mod = await import('react-native-onesignal');
    // Some bundlers attach under default
    // @ts-ignore
    return mod?.OneSignal ?? (mod as any)?.default?.OneSignal ?? mod;
  } catch {
    return undefined;
  }
}

export async function initOneSignal() {
  const appId = (Constants as any)?.expoConfig?.extra?.oneSignalAppId as
    | string
    | null
    | undefined;
  if (!appId) {
    console.warn(
      'OneSignal app ID missing: set EXPO_PUBLIC_ONESIGNAL_APP_ID to enable OneSignal'
    );
    return;
  }
  const OneSignal = await getOneSignal();
  if (!OneSignal) {
    return;
  } // skip in Expo Go / web
  try {
    OneSignal.initialize(appId);
  } catch (e) {
    console.warn('OneSignal initialize failed', e);
  }
}

export async function loginOneSignal(externalId: string | null | undefined) {
  const OneSignal = await getOneSignal();
  if (!OneSignal) {
    return;
  }
  try {
    if (externalId) {
      OneSignal.login(String(externalId));
    }
  } catch (e) {
    console.warn('OneSignal login failed', e);
  }
}

export async function logoutOneSignal() {
  const OneSignal = await getOneSignal();
  if (!OneSignal) {
    return;
  }
  try {
    OneSignal.logout();
  } catch (e) {
    console.warn('OneSignal logout failed', e);
  }
}

export async function addSmsSubscription(e164Phone: string) {
  const OneSignal = await getOneSignal();
  if (!OneSignal) {
    return;
  }
  try {
    OneSignal.User.addSms(e164Phone);
  } catch (e) {
    console.warn('OneSignal addSms failed', e);
    throw e;
  }
}

export async function removeSmsSubscription(phoneNumber?: string) {
  const OneSignal = await getOneSignal();
  if (!OneSignal) {
    return;
  }
  try {
    OneSignal.User.removeSms(phoneNumber ?? '');
  } catch (e) {
    console.warn('OneSignal removeSms failed', e);
    throw e;
  }
}

export async function addSmsTags(region: string = 'IN') {
  const OneSignal = await getOneSignal();
  if (!OneSignal) {
    return;
  }
  try {
    OneSignal.User.addTags({ sms_opt_in: 'true', sms_region: region });
  } catch (e) {
    console.warn('OneSignal addTags failed', e);
  }
}

export async function removeSmsTags() {
  const OneSignal = await getOneSignal();
  if (!OneSignal) {
    return;
  }
  try {
    OneSignal.User.removeTags(['sms_opt_in', 'sms_region']);
  } catch (e) {
    console.warn('OneSignal removeTags failed', e);
  }
}
