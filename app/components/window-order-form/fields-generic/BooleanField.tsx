'use client';

export function BooleanField({
  value,
  editable,
  label,
  onChange,
  onBlur,
  onFocus,
}: {
  value: boolean;
  editable: boolean;
  label: string;
  onChange: (v: boolean) => void;
  onBlur?: () => void;
  onFocus?: () => void;
}) {
  return editable ? (
    <div className="flex items-center mb-3">
      <input
        type="checkbox"
        className="mr-2"
        checked={value ?? false}
        onChange={(e) => onChange(e.target.checked)}
        onBlur={onBlur}
        onFocus={onFocus}
      />
      <label className="text-sm font-medium text-gray-700">{label}</label>
    </div>
  ) : (
    <div className="mb-3">
      <div className="text-xs text-gray-500 mb-1">{label}</div>
      <div className="text-sm text-gray-800">{value ? 'Yes' : 'No'}</div>
    </div>
  );
}
