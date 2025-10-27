import { supabase } from './supabaseClient';
import { QuotePayload, QuoteResponse } from './quote';

export async function supaQuote(
  payload: QuotePayload
): Promise<QuoteResponse | null> {
  if (!supabase) {
    return null;
  }
  try {
    // Prefer an RPC if available
    // @ts-ignore - RPC may not exist in every project
    const { data, error } = await (supabase as any).rpc('get_quote', {
      p_pickup: payload.pickup,
      p_delivery: payload.delivery,
      p_weightkg: payload.weightKg,
      p_dims: payload.dimsCm,
      p_cargotype: payload.cargoType ?? null,
    });
    if (error) {
      return null;
    }
    if (data) {
      return data as QuoteResponse;
    }
  } catch {}
  return null;
}

export type TrackingEvent = {
  id: string;
  timestamp: string;
  location: string;
  description: string;
  status: string;
};
export async function supaTracking(
  trackingId: string
): Promise<TrackingEvent[] | null> {
  if (!supabase) {
    return null;
  }
  try {
    // Prefer secure RPC if available (works with tightened RLS)
    // @ts-ignore rpc may not exist yet in some environments
    const rpc = await (supabase as any).rpc('get_tracking_events_public', {
      p_tracking_id: trackingId,
    });
    if (!rpc.error && rpc.data) {
      return (rpc.data ?? []) as TrackingEvent[];
    }
  } catch {}
  try {
    const { data, error } = await supabase
      .from('tracking_events')
      .select('*')
      .eq('tracking_id', trackingId)
      .order('timestamp', { ascending: false });
    if (error) {
      return null;
    }
    return (data ?? []) as TrackingEvent[];
  } catch {
    return null;
  }
}

export type BookingPayload = {
  pickupAddress: string;
  deliveryAddress: string;
  cargoType: string;
  weight: string;
  dimensions: string;
  urgency: string;
  specialInstructions: string;
  contactPhone: string;
  pickupDate: string;
  deliveryDate: string;
  userId?: string | undefined;
  pickupCoordinates?: { lat: number; lng: number };
  deliveryCoordinates?: { lat: number; lng: number };
};

export type BookingResponse = {
  success: boolean;
  bookingId?: string;
  trackingNumber?: string;
  estimatedCost?: number;
  message?: string;
};

export async function supaBooking(
  payload: BookingPayload
): Promise<BookingResponse | null> {
  if (!supabase) {
    return null;
  }

  try {
    // Generate tracking number
    const trackingNumber = `TPG${Date.now()}${Math.random().toString(36).substr(2, 4).toUpperCase()}`;

    // Calculate estimated cost (can be enhanced with proper pricing logic)
    const weight = parseFloat(payload.weight) || 1;
    const baseRate = 50; // ₹50 per kg base rate
    let multiplier = 1;

    switch (payload.urgency) {
      case 'express':
        multiplier = 1.5;
        break;
      case 'urgent':
        multiplier = 2.5;
        break;
      case 'scheduled':
        multiplier = 1.2;
        break;
      default:
        multiplier = 1;
    }

    const estimatedCost = Math.round(weight * baseRate * multiplier);

    // Try RPC for booking creation first
    try {
      // @ts-ignore - RPC may not exist in every project
      const { data, error } = await (supabase as any).rpc('create_booking', {
        p_pickup_address: payload.pickupAddress,
        p_delivery_address: payload.deliveryAddress,
        p_cargo_type: payload.cargoType,
        p_weight: payload.weight,
        p_dimensions: payload.dimensions,
        p_urgency: payload.urgency,
        p_special_instructions: payload.specialInstructions,
        p_contact_phone: payload.contactPhone,
        p_pickup_date: payload.pickupDate,
        p_delivery_date: payload.deliveryDate,
        p_tracking_number: trackingNumber,
        p_estimated_cost: estimatedCost,
        p_user_id: payload.userId,
      });

      if (!error && data) {
        return {
          success: true,
          bookingId: data.booking_id || data.id,
          trackingNumber,
          estimatedCost,
          message: 'Booking created successfully',
        };
      }
    } catch (rpcError) {
      console.warn('RPC booking failed, trying direct insert:', rpcError);
    }

    // Fallback to direct table insert
    const { data, error } = await supabase
      .from('bookings')
      .insert({
        pickup_address: payload.pickupAddress,
        delivery_address: payload.deliveryAddress,
        cargo_type: payload.cargoType,
        weight: payload.weight,
        dimensions: payload.dimensions,
        urgency: payload.urgency,
        special_instructions: payload.specialInstructions,
        contact_phone: payload.contactPhone,
        pickup_date: payload.pickupDate,
        delivery_date: payload.deliveryDate,
        tracking_number: trackingNumber,
        estimated_cost: estimatedCost,
        user_id: payload.userId,
        status: 'pending',
        created_at: new Date().toISOString(),
      })
      .select('id')
      .single();

    if (error) {
      console.error('Booking insert error:', error);
      return {
        success: false,
        message: `Booking failed: ${error.message}`,
      };
    }

    return {
      success: true,
      bookingId: data?.id,
      trackingNumber,
      estimatedCost,
      message: 'Booking created successfully',
    };
  } catch (error) {
    console.error('Booking error:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown booking error',
    };
  }
}

export type OrderRow = {
  id: string;
  route: string;
  price: number;
  updated_at: string;
  status: 'Active' | 'Past';
};
export async function supaOrders(userId?: string): Promise<OrderRow[] | null> {
  if (!supabase) {
    return null;
  }
  try {
    let q = supabase
      .from('orders')
      .select('id, route, price, updated_at, status');
    if (userId) {
      q = q.eq('user_id', userId);
    }
    const { data, error } = await q.order('updated_at', { ascending: false });
    if (error) {
      return null;
    }
    return (data ?? []) as OrderRow[];
  } catch {
    return null;
  }
}
