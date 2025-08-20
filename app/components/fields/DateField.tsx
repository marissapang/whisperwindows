'use client';

interface DateFieldProps {
  value: string | null;
  editable: boolean;
  label: string;
  onChange: (newValue: string | null) => void;
}

export function DateField({ value, editable, label, onChange }: DateFieldProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <input
        type="date"
        value={value || ''}
        onChange={(e) => onChange(e.target.value || null)}
        disabled={!editable}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
      />
    </div>
  );
}
