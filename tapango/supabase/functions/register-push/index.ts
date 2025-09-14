import { serve } from 'https://deno.land/std@0.224.0/http/server.ts';

// Register Expo push tokens sent from the mobile app
// Expects JSON: { token: string, platform: 'ios'|'android'|'web', externalId?: string }
// Stores/upserts into public.push_tokens

// Supabase server client
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.4';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY env vars');
}

const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!, {
  auth: { persistSession: false },
});

serve(async (req) => {
  try {
    if (req.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const body = await req.json().catch(() => ({}));
    const token = String(body?.token || '').trim();
    const platform = String(body?.platform || '').trim();
    const externalId = body?.externalId ? String(body.externalId) : null;

    if (!token || !platform) {
      return new Response(
        JSON.stringify({ error: 'token and platform required' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    if (!['ios', 'android', 'web'].includes(platform)) {
      return new Response(JSON.stringify({ error: 'invalid platform' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Upsert by token
    const { error } = await supabase.from('push_tokens').upsert(
      {
        token,
        platform,
        user_external_id: externalId,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'token' }
    );

    if (error) {
      console.error('Supabase upsert error', error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e) {
    console.error('register-push error', e);
    return new Response(JSON.stringify({ error: 'internal' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});
