import { GeocodeResult } from '../hooks/usePlacesAutocomplete';

export type QuotePayload = {
  pickup?: GeocodeResult | null;
  delivery?: GeocodeResult | null;
  weightKg: number;
  dimsCm?: { l: number; w: number; h: number } | null;
  cargoType?: string;
};

export type QuoteResponse = {
  quoteId: string;
  amount: number;
  currency: 'INR';
  breakdown?: { label: string; amount: number }[];
};

const API_URL = process.env.EXPO_PUBLIC_QUOTE_URL;

export async function fetchQuote(
  payload: QuotePayload
): Promise<QuoteResponse> {
  // Try Supabase RPC first
  try {
    const { supaQuote } = await import('./api');
    const supa = await supaQuote(payload);
    if (supa) return supa;
  } catch {}

  if (API_URL) {
    const res = await fetch(`${API_URL}/api/v1/quote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        pickup: payload.pickup,
        delivery: payload.delivery,
        weight: payload.weightKg,
        dims: payload.dimsCm,
        cargoType: payload.cargoType,
      }),
    });
    if (!res.ok) throw new Error(`Quote failed: ${res.status}`);
    return (await res.json()) as QuoteResponse;
  }
  // Mock quote: base ₹50/kg + distance factor (placeholder)
  const base = Math.max(1, payload.weightKg) * 50;
  const distanceFactor = payload.pickup && payload.delivery ? 1.4 : 1.0;
  const amount = Math.round(base * distanceFactor * 100) / 100;
  await new Promise((r) => setTimeout(r, 600));
  return {
    quoteId: 'Q' + Math.random().toString(36).slice(2, 8).toUpperCase(),
    amount,
    currency: 'INR',
    breakdown: [
      { label: 'Base (₹50/kg)', amount: Math.round(base * 100) / 100 },
      {
        label: 'Distance factor',
        amount: Math.round((amount - base) * 100) / 100,
      },
    ],
  };
}
