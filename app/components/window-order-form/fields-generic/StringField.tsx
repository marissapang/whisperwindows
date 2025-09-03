'use client';

export function StringField({
  value,
  editable,
  label,
  onChange,
  onBlur,
  onFocus,
}: {
  value: string;
  editable: boolean;
  label: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
}) {
  return editable ? (
    <div>
      <label className="block font-medium text-sm text-gray-700 mb-1">{label}</label>
      <input
        type="text"
        className="w-full p-2 border rounded mb-3"
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        onFocus={onFocus}
      />
    </div>
  ) : (
    <div className="">
      {label}: {value} 
    </div>
  );
}
