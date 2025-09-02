'use client';

import { useEffect, useState } from 'react';

const FRACTIONS = [
  { label: '0', value: 0 },
  { label: '1/16', value: 1 / 16 },
  { label: '1/8', value: 1 / 8 },
  { label: '3/16', value: 3 / 16 },
  { label: '1/4', value: 1 / 4 },
  { label: '5/16', value: 5 / 16 },
  { label: '3/8', value: 3 / 8 },
  { label: '7/16', value: 7 / 16 },
  { label: '1/2', value: 1 / 2 },
  { label: '9/16', value: 9 / 16 },
  { label: '5/8', value: 5 / 8 },
  { label: '11/16', value: 11 / 16 },
  { label: '3/4', value: 3 / 4 },
  { label: '13/16', value: 13 / 16 },
  { label: '7/8', value: 7 / 8 },
  { label: '15/16', value: 15 / 16 },
];

export function NumberInchesField({
  value,
  editable,
  label,
  onChange,
}: {
  value: number;
  editable: boolean;
  label: string;
  onChange: (v: number) => void;
}) {
  const [fullInches, setFullInches] = useState<number>(0);
  const [fraction, setFraction] = useState<number>(0);

  useEffect(() => {
    if (typeof value !== 'number' || isNaN(value)) {
      setFullInches(0);
      setFraction(0);
    } else {
      const whole = Math.floor(value);
      const frac = Math.round((value - whole) * 16) / 16;
      setFullInches(whole);
      setFraction(frac);
    }
  }, [value]);

  const updateInches = (newInches: number, newFraction: number) => {
    const combined = newInches + newFraction;
    onChange(Number.isFinite(combined) ? combined : 0);
  };

  const handleWholeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const newVal = input === '' ? 0 : parseInt(input, 10);
    const safeVal = isNaN(newVal) ? 0 : newVal;

    setFullInches(safeVal);
    updateInches(safeVal, fraction);
  };

  const handleFractionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newFrac = parseFloat(e.target.value);
    const safeFrac = isNaN(newFrac) ? 0 : newFrac;

    setFraction(safeFrac);
    updateInches(fullInches, safeFrac);
  };

  function formatInchesAsMixedFraction(val: number): string {
  const whole = Math.floor(val);
  const frac = val - whole;

  const nearestSixteenth = Math.round(frac * 16);
  const simplified = simplifyFraction(nearestSixteenth, 16);

  if (nearestSixteenth === 0) return `${whole}"`;
  if (whole === 0) return `${simplified.numerator}/${simplified.denominator}"`;

  return `${whole} ${simplified.numerator}/${simplified.denominator}"`;
}

function simplifyFraction(numerator: number, denominator: number): {
  numerator: number;
  denominator: number;
} {
  function gcd(a: number, b: number): number {
    return b === 0 ? a : gcd(b, a % b);
  }

  const divisor = gcd(numerator, denominator);
  return {
    numerator: numerator / divisor,
    denominator: denominator / divisor,
  };
}

  return editable ? (
    <div className="mb-3">
      <label className="block font-medium text-sm text-gray-700 mb-1">{label}</label>
      <div className="flex gap-2 items-center">
        <input
          type='text'
          className="flex-1 p-2 border rounded"
          value={fullInches === 0 ? '' : fullInches}
          onChange={handleWholeChange}
          placeholder="0"
        />
        <select
          className="w-20 p-2 border rounded text-sm"
          value={fraction}
          onChange={handleFractionChange}
        >
          {FRACTIONS.map((f) => (
            <option key={f.value} value={f.value}>
              {f.label}
            </option>
          ))}
        </select>
        <span className="text-gray-500 text-sm">"</span>
      </div>
    </div>
  ) : (
    <div className="mb-3">
      <div className="text-xs text-gray-500 mb-1">{label}</div>
      <div className="text-sm text-gray-800">{formatInchesAsMixedFraction(value ?? 0)}</div>
    </div>
  );
}
