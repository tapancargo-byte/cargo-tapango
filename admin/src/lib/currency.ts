export const INR = {
  locale: 'en-IN',
  currency: 'INR',
} as const;

export function formatINR(amount: number, options: Intl.NumberFormatOptions = {}) {
  return new Intl.NumberFormat(INR.locale, {
    style: 'currency',
    currency: INR.currency,
    maximumFractionDigits: 2,
    ...options,
  }).format(Number.isFinite(amount) ? amount : 0);
}

export const rupeesToPaise = (r: number) => Math.round((Number.isFinite(r) ? r : 0) * 100);
export const paiseToRupees = (p: number) => (Number.isFinite(p) ? p : 0) / 100;
