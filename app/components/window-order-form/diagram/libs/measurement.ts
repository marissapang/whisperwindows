// app/components/window-order-form/diagram/libs/measurement.ts

import FourSidedMeasurements from '@/app/components/window-order-form/libs/type';
// Inches helpers, formatter, direction converters (pure & reusable)

export function windowInches(ms: FourSidedMeasurements) {
  return {
    widthIn: Math.max(0, Math.min(ms.top ?? 0, ms.bottom ?? 0)),
    heightIn: Math.max(0, Math.min(ms.left ?? 0, ms.right ?? 0)),
  };
}

/** Format inches as mixed fraction like 12 3/16" (precision = nearest 1/16 by default) */
export function formatInches(val: number, step: 2 | 4 | 8 | 16 = 16): string {
  if (!Number.isFinite(val)) return '0"';
  const sign = val < 0 ? '-' : '';
  const abs = Math.abs(val);
  const whole = Math.floor(abs);
  const frac = abs - whole;

  const den = step;
  let num = Math.round(frac * den);
  let w = whole;
  if (num === den) { w += 1; num = 0; }

  if (num === 0) return `${sign}${w}"`;

  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
  const g = gcd(num, den);
  const n = num / g;
  const d = den / g;

  return w === 0 ? `${sign}${n}/${d}"` : `${sign}${w} ${n}/${d}"`;
}

export type VertDir = 'left-to-right' | 'right-to-left';
export type HorzDir = 'bottom-to-top' | 'top-to-bottom';

export function displayFromAbsolute(abs: number, total: number, dir: VertDir | HorzDir) {
  if (!Number.isFinite(abs) || !Number.isFinite(total)) return 0;
  return (dir === 'left-to-right' || dir === 'bottom-to-top') ? abs : Math.max(0, total - abs);
}

export function absoluteFromDisplay(d: number, total: number, dir: VertDir | HorzDir) {
  const v = Number.isFinite(d) ? d : 0;
  return (dir === 'left-to-right' || dir === 'bottom-to-top') ? Math.max(0, v) : Math.max(0, total - v);
}
