'use client';

export function NumberDollarsField({
  value,
  editable,
  label,
  onChange,
  onBlur,
  onFocus,
}: {
  value: number;
  editable: boolean;
  label: string;
  onChange: (v: number) => void;
  onBlur?: () => void;
  onFocus?: () => void;
}) {
  return editable ? (
    <div>
      <label className="block font-medium text-sm text-gray-700 mb-1">{label}</label>
      <input
        type="number"
        className="w-full p-2 border rounded mb-3"
        value={value ?? ''}
        onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
        onBlur={onBlur}
        onFocus={onFocus}
        step="0.01"
        min="0"
      />
    </div>
  ) : (
    <div className="mb-3">
      <div className="text-xs text-gray-500 mb-1">{label}</div>
      <div className="text-sm text-gray-800">${(value ?? 0).toFixed(2)}</div>
    </div>
  );
}
