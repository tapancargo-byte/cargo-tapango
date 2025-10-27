import Constants from 'expo-constants';

function getFunctionUrl(): string | null {
  // Prefer config from app.config.js extra
  // @ts-ignore
  const fromExtra: string | null | undefined =
    Constants?.expoConfig?.extra?.api?.smsSendUrl;
  const env = process.env.EXPO_PUBLIC_SMS_SEND_URL;
  return fromExtra || env || null;
}

function getAnonKey(): string | undefined {
  return process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;
}

export type SmsResponse = {
  ok: boolean;
  status: number;
  data?: any;
  error?: any;
};

export function isSmsEnabled(): boolean {
  try {
    // @ts-ignore
    const flag = (Constants as any)?.expoConfig?.extra?.features
      ?.enableBookingSms;
    if (typeof flag === 'boolean') {
      return flag;
    }
  } catch {}
  const env = String(
    process.env.EXPO_PUBLIC_ENABLE_BOOKING_SMS || ''
  ).toLowerCase();
  return env === 'true' || env === '1' || env === 'yes';
}

async function post(body: Record<string, any>): Promise<SmsResponse> {
  const url = getFunctionUrl();
  if (!url) {
    return { ok: false, status: 0, error: 'SMS function URL not configured' };
  }
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(getAnonKey() ? { Authorization: `Bearer ${getAnonKey()}` } : {}),
      },
      body: JSON.stringify(body),
    });
    const data = await res.json().catch(() => ({}));
    return {
      ok: res.ok,
      status: res.status,
      data,
      error: res.ok ? undefined : (data as any)?.error,
    };
  } catch (e: any) {
    return { ok: false, status: 0, error: e?.message || String(e) };
  }
}

export async function sendSmsToPhone(
  phoneE164: string,
  message: string
): Promise<SmsResponse> {
  return post({ phone: phoneE164, message });
}

export async function sendSmsToExternalId(
  externalId: string,
  message: string
): Promise<SmsResponse> {
  return post({ externalId, message });
}
