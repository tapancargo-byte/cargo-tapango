// INR-first currency utilities
// Centralizes currency formatting for the entire app

export const INR = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  // Keep two decimals for transparency in quotes/breakdowns
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatINR(value: number): string {
  if (!Number.isFinite(value)) return INR.format(0);
  return INR.format(value);
}

export function parseNumberSafe(input: string): number {
  // Removes non-numeric (except dot/comma) and parses
  const cleaned = (input || '').replace(/[^0-9.,-]/g, '').replace(/,/g, '');
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : 0;
}
