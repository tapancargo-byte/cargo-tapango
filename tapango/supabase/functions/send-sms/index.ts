import { serve } from 'https://deno.land/std@0.224.0/http/server.ts';

// Supabase Edge Function: send-sms
// Securely send SMS via OneSignal using server-side credentials.
// Request JSON:
//   { message: string, phone?: string | string[], externalId?: string | string[] }
// Either `phone` (E.164) or `externalId` must be provided.

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const ONE_API_BASE =
  Deno.env.get('ONESIGNAL_API_BASE') || 'https://api.onesignal.com';
const ONE_APP_ID = Deno.env.get('ONESIGNAL_APP_ID');
const ONE_API_KEY = Deno.env.get('ONESIGNAL_API_KEY');
const ONE_SMS_FROM = Deno.env.get('ONESIGNAL_SMS_FROM'); // optional default sender number (configured in OneSignal)

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...corsHeaders },
  });
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders, status: 204 });
  }

  if (req.method !== 'POST') {
    return json({ error: 'Method not allowed' }, 405);
  }

  // Require Authorization header (e.g., Bearer <anon_key>) to reduce abuse
  const auth =
    req.headers.get('authorization') || req.headers.get('Authorization');
  if (!auth) {
    return json({ error: 'Unauthorized' }, 401);
  }

  if (!ONE_APP_ID || !ONE_API_KEY) {
    return json(
      {
        error:
          'Server not configured: ONESIGNAL_APP_ID and ONESIGNAL_API_KEY are required',
      },
      500
    );
  }

  try {
    const body = await req.json().catch(() => ({}));
    const message = String(body?.message || '').trim();

    let phone: string[] | null = null;
    if (Array.isArray(body?.phone))
      phone = (body.phone as string[]).map(String);
    else if (body?.phone) phone = [String(body.phone)];

    let externalIds: string[] | null = null;
    if (Array.isArray(body?.externalId))
      externalIds = (body.externalId as string[]).map(String);
    else if (body?.externalId) externalIds = [String(body.externalId)];

    if (!message) return json({ error: "'message' is required" }, 400);
    if (!phone && !externalIds)
      return json({ error: "Provide 'phone' (E.164) or 'externalId'" }, 400);

    // Construct OneSignal payload. Using the classic Create Notification API endpoint.
    // - To target phone numbers directly: include_phone_numbers
    // - To target user identities: include_external_user_ids + channel_for_external_user_ids: 'sms'
    const payload: Record<string, unknown> = {
      app_id: ONE_APP_ID,
      contents: { en: message },
    };

    if (phone) payload['include_phone_numbers'] = phone;
    if (externalIds) {
      payload['include_external_user_ids'] = externalIds;
      payload['channel_for_external_user_ids'] = 'sms';
    }
    if (ONE_SMS_FROM) payload['sms_from'] = ONE_SMS_FROM;

    const res = await fetch(`${ONE_API_BASE}/notifications`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${ONE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      console.error('OneSignal error', res.status, data);
      return json(
        {
          error: 'OneSignal request failed',
          status: res.status,
          details: data,
        },
        res.status
      );
    }

    return json({ ok: true, data });
  } catch (e) {
    console.error('send-sms error', e);
    return json({ error: 'internal' }, 500);
  }
});
