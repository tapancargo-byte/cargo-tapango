import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import { supabase } from './supabaseClient';

const QUEUE_KEY = 'kyc_upload_queue_v1';

type KycPayload = {
  rcUri?: string | null;
  licenseUri?: string | null;
  userId?: string | null;
  createdAt?: string;
};

async function uploadToSupabase(uri: string, path: string): Promise<string> {
  const base64 = await FileSystem.readAsStringAsync(uri, {
    encoding: 'base64' as any,
  });
  const bytes = Buffer.from(base64, 'base64');
  // @ts-ignore - RN polyfilled fetch File not available; Supabase accepts arrayBuffer
  const { data, error } = await supabase!.storage
    .from('kyc')
    .upload(path, bytes, { contentType: 'image/jpeg', upsert: true });
  if (error) throw error;
  return data?.path ?? path;
}

export async function submitKyc(
  payload: KycPayload
): Promise<{ queued: boolean; paths?: string[] }> {
  const timestamp = Date.now();
  let authUserId: string | null = null;
  try {
    if (supabase) {
      const { data } = await supabase.auth.getUser();
      authUserId = (data as any)?.user?.id ?? null;
    }
  } catch {}
  const user = authUserId ?? payload.userId ?? 'anon';
  if (supabase) {
    try {
      const uploaded: string[] = [];
      if (payload.rcUri)
        uploaded.push(
          await uploadToSupabase(payload.rcUri, `${user}/rc-${timestamp}.jpg`)
        );
      if (payload.licenseUri)
        uploaded.push(
          await uploadToSupabase(
            payload.licenseUri,
            `${user}/license-${timestamp}.jpg`
          )
        );
      return { queued: false, paths: uploaded };
    } catch {}
  }
  const listRaw = await AsyncStorage.getItem(QUEUE_KEY);
  const list: KycPayload[] = listRaw ? JSON.parse(listRaw) : [];
  list.push({ ...payload, createdAt: new Date().toISOString() });
  await AsyncStorage.setItem(QUEUE_KEY, JSON.stringify(list));
  try {
    (await import('../stores/queueStore')).useQueueStore
      .getState()
      .setKyc(list.length);
  } catch {}
  return { queued: true };
}

export async function drainKycUploads(): Promise<number> {
  if (!supabase) return 0;
  const listRaw = await AsyncStorage.getItem(QUEUE_KEY);
  const list: KycPayload[] = listRaw ? JSON.parse(listRaw) : [];
  if (list.length === 0) return 0;
  let success = 0;
  for (const item of list) {
    try {
      if (item.rcUri)
        await uploadToSupabase(
          item.rcUri,
          `${item.userId ?? 'anon'}/rc-${Date.now()}.jpg`
        );
      if (item.licenseUri)
        await uploadToSupabase(
          item.licenseUri,
          `${item.userId ?? 'anon'}/license-${Date.now()}.jpg`
        );
      success++;
    } catch {}
  }
  if (success) {
    await AsyncStorage.removeItem(QUEUE_KEY);
    try {
      (await import('../stores/queueStore')).useQueueStore.getState().setKyc(0);
    } catch {}
  }
  return success;
}
