import { create } from 'zustand';

interface QueueState {
  bookingsQueued: number;
  driverOffersQueued: number;
  kycQueued: number;
  setBookings: (n: number) => void;
  setOffers: (n: number) => void;
  setKyc: (n: number) => void;
}

export const useQueueStore = create<QueueState>((set) => ({
  bookingsQueued: 0,
  driverOffersQueued: 0,
  kycQueued: 0,
  setBookings: (n: number) => set({ bookingsQueued: n }),
  setOffers: (n: number) => set({ driverOffersQueued: n }),
  setKyc: (n: number) => set({ kycQueued: n }),
}));
