import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { supabase } from '../services/supabaseClient';
import { supaOrders } from '../services/api';

export type CountsContextValue = {
  ordersTotal: number;
  ordersActive: number;
  ordersPast: number;
  shipmentsActive: number; // alias of ordersActive for UI naming
  savedAmountInr: number | null;
  onTimePercent: number | null;
  loading: boolean;
  refresh: () => Promise<void>;
};

const CountsContext = createContext<CountsContextValue>({
  ordersTotal: 0,
  ordersActive: 0,
  ordersPast: 0,
  shipmentsActive: 0,
  savedAmountInr: null,
  onTimePercent: null,
  loading: false,
  refresh: async () => {},
});

export function CountsProvider({ children }: { children: React.ReactNode }) {
  const [ordersTotal, setOrdersTotal] = useState(0);
  const [ordersActive, setOrdersActive] = useState(0);
  const [ordersPast, setOrdersPast] = useState(0);
  const [shipmentsActive, setShipmentsActive] = useState(0);
  const [savedAmountInr, setSavedAmountInr] = useState<number | null>(null);
  const [onTimePercent, setOnTimePercent] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      let userId: string | undefined = undefined;
      try {
        if (supabase) {
          const { data } = await supabase.auth.getUser();
          userId = (data as any)?.user?.id ?? undefined;
        }
      } catch {}

      const orders = await supaOrders(userId);

      if (orders && Array.isArray(orders)) {
        setOrdersTotal(orders.length);
        // Treat 'Active' or 'in-transit' as active
        const active = orders.filter((o: any) => {
          const s = (o?.status ?? '').toString().toLowerCase();
          return s === 'active' || s === 'in-transit' || s === 'in_transit';
        }).length;
        // Treat 'Past' or 'delivered' as past/delivered
        const past = orders.filter((o: any) => {
          const s = (o?.status ?? '').toString().toLowerCase();
          return s === 'past' || s === 'delivered' || s === 'completed';
        }).length;
        setOrdersActive(active);
        setOrdersPast(past);
        setShipmentsActive(active);
        // Try fetching additional metrics via RPC if available
        try {
          const rpcNames = ['get_dashboard_metrics_public', 'get_dashboard_metrics', 'dashboard_metrics'];
          for (const rpcName of rpcNames) {
            try {
              const res = await (supabase as any).rpc?.(rpcName, { p_user_id: userId ?? null });
              if (res && !res.error && res.data) {
                const d: any = Array.isArray(res.data) ? (res.data[0] || res.data) : res.data;
                const saved = Number(d.saved_amount_inr ?? d.total_savings_inr ?? d.savings_inr ?? d.savings ?? d.total_savings ?? NaN);
                const onTime = Number(d.on_time_percent ?? d.ontime_percent ?? d.on_time ?? d.ontime ?? d.on_time_rate ?? NaN);
                if (!Number.isNaN(saved)) setSavedAmountInr(saved);
                if (!Number.isNaN(onTime)) setOnTimePercent(Math.round(onTime));
                break;
              }
            } catch {}
          }
        } catch {}
      } else {
        setOrdersTotal(0);
        setOrdersActive(0);
        setOrdersPast(0);
        setShipmentsActive(0);
        setSavedAmountInr(null);
        setOnTimePercent(null);
      }
    } catch {
      setOrdersTotal(0);
      setOrdersActive(0);
      setOrdersPast(0);
      setShipmentsActive(0);
      setSavedAmountInr(null);
      setOnTimePercent(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
    const id = setInterval(refresh, 60_000);
    return () => clearInterval(id);
  }, [refresh]);

  const value = useMemo(
    () => ({ ordersTotal, ordersActive, ordersPast, shipmentsActive, savedAmountInr, onTimePercent, loading, refresh }),
    [ordersTotal, ordersActive, ordersPast, shipmentsActive, savedAmountInr, onTimePercent, loading, refresh]
  );

  return <CountsContext.Provider value={value}>{children}</CountsContext.Provider>;
}

export function useCounts(): CountsContextValue {
  return useContext(CountsContext);
}

