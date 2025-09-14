import { useEffect, useMemo, useRef, useState } from 'react';

export type PlacePrediction = {
  place_id: string;
  description: string;
  structured_formatting?: { main_text: string; secondary_text: string };
};

export type UsePlacesOptions = {
  country?: string; // default IN
  language?: string; // default en-IN
  debounceMs?: number; // default 400
};

const GOOGLE_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_KEY;

function randomSession(): string {
  // lightweight UUID-ish token; good enough for session billing grouping
  return `sess_${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`;
}

export function usePlacesAutocomplete(
  query: string,
  opts: UsePlacesOptions = {}
) {
  const [predictions, setPredictions] = useState<PlacePrediction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const country = opts.country ?? 'IN';
  const language = opts.language ?? 'en-IN';
  const debounceMs = opts.debounceMs ?? 400;
  const sessionRef = useRef<string>(randomSession());
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fetchPredictions = async (q: string) => {
    if (!GOOGLE_KEY) {
      // No key configured – behave as empty; caller can fallback to simple input
      setPredictions([]);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const url =
        'https://maps.googleapis.com/maps/api/place/autocomplete/json' +
        `?input=${encodeURIComponent(q)}` +
        `&key=${GOOGLE_KEY}` +
        `&sessiontoken=${sessionRef.current}` +
        `&components=country:${country}` +
        '&types=address' +
        `&language=${language}`;

      const res = await fetch(url);
      const json: any = await res.json();
      if (json.status === 'OK' && Array.isArray(json.predictions)) {
        setPredictions(json.predictions as PlacePrediction[]);
      } else {
        setPredictions([]);
        if (json.status && json.status !== 'ZERO_RESULTS') {
          setError(String(json.status));
        }
      }
    } catch (e: any) {
      setError(String(e?.message ?? 'Unknown error'));
      setPredictions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!query) {
      setPredictions([]);
      return;
    }
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => fetchPredictions(query), debounceMs);
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [query, country, language, debounceMs]);

  return { predictions, loading, error };
}

export type GeocodeResult = {
  lat: number;
  lng: number;
  formatted: string;
  pin?: string;
  city?: string;
  state?: string;
};

export async function geocodePlace(
  placeId: string
): Promise<GeocodeResult | null> {
  if (!GOOGLE_KEY) {
    return null;
  }
  const url =
    'https://maps.googleapis.com/maps/api/geocode/json' +
    `?place_id=${encodeURIComponent(placeId)}` +
    `&key=${GOOGLE_KEY}` +
    '&language=en-IN';
  const res = await fetch(url);
  const json: any = await res.json();
  const result = json.results?.[0];
  if (!result) {
    return null;
  }
  const { geometry, address_components } = result;
  const get = (type: string) =>
    address_components?.find((c: any) => c.types?.includes(type))?.long_name;
  return {
    lat: geometry.location.lat,
    lng: geometry.location.lng,
    formatted: result.formatted_address,
    pin: get('postal_code'),
    city: get('locality') || get('administrative_area_level_2'),
    state: get('administrative_area_level_1'),
  };
}
