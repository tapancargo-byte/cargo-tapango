export function parseDims(
  input: string
): { l: number; w: number; h: number } | null {
  if (!input) {
    return null;
  }
  const nums = input
    .toLowerCase()
    .replace(/x/gi, 'x')
    .split(/[^0-9.]+/)
    .map((n) => Number(n))
    .filter((n) => Number.isFinite(n));
  if (nums.length < 3) {
    return null;
  }
  const [l, w, h] = nums.slice(0, 3) as [number, number, number];
  return { l, w, h };
}

// IATA standard divisor 5000 for cm → kg volumetric
export function volumetricKg(
  dims: { l: number; w: number; h: number } | null
): number {
  if (!dims) {
    return 0;
  }
  return (dims.l * dims.w * dims.h) / 5000;
}

export function billableWeightKg(actualKg: number, volKg: number): number {
  return Math.max(actualKg, volKg);
}
