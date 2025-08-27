'use client';

import { VerticalSplit } from '@/app/schemas/comprehensiveExtensionSchema';

interface VerticalSplitsArrayFieldProps {
  value: VerticalSplit[];
  editable: boolean;
  label: string;
  onChange: (splits: VerticalSplit[]) => void;
  onSaveVerticalSplits?: () => void;
  showSaveButton?: boolean;
}

export function VerticalSplitsArrayField({ 
  value = [], 
  editable, 
  label, 
  onChange,
  onSaveVerticalSplits,
  showSaveButton = false
}: VerticalSplitsArrayFieldProps) {

  // Debug logging
  console.log('VerticalSplitsArrayField props:', {
    editable,
    showSaveButton,
    onSaveVerticalSplits: !!onSaveVerticalSplits,
    valueLength: value?.length || 0
  });

  const addVerticalSplit = () => {
    if (!Array.isArray(value)) {
      console.error('Invalid value array in VerticalSplitsArrayField:', value);
      return;
    }
    const newSplit: VerticalSplit = {
      position: 12, // Default position in inches
      direction: 'left-to-right'
    };
    onChange([...value, newSplit]);
  };

  const removeVerticalSplit = (index: number) => {
    if (!Array.isArray(value)) {
      console.error('Invalid value array in VerticalSplitsArrayField:', value);
      return;
    }
    onChange(value.filter((_, i) => i !== index));
  };

  const updateVerticalSplit = (index: number, field: keyof VerticalSplit, newValue: any) => {
    if (!Array.isArray(value)) {
      console.error('Invalid value array in VerticalSplitsArrayField:', value);
      return;
    }
    onChange(value.map((split, i) => 
      i === index ? { ...split, [field]: newValue } : split
    ));
  };

  if (!editable) {
    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
        
        {!Array.isArray(value) || value.length === 0 ? (
          <div className="text-sm text-gray-500 italic">No vertical splits defined</div>
        ) : (
          <div className="space-y-4">
            {value.map((split, index) => (
              <div key={index} className="border rounded-lg p-4 bg-gray-50">
                <div className="mb-2">
                  <strong>Vertical Split {index + 1}:</strong> {split.position}" ({split.direction})
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      
      {(!Array.isArray(value) || value.length === 0) && (
        <div className="text-center py-4 text-gray-500 text-sm">
          No vertical splits defined
        </div>
      )}
      
      {Array.isArray(value) && value.length > 0 && (
        <div className="space-y-4 mb-4">
          {value.map((split, index) => (
            <div key={index} className="border rounded-lg p-4 bg-white">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium text-gray-800">Vertical Split {index + 1}</h4>
                {editable && (
                  <button
                    type="button"
                    onClick={() => removeVerticalSplit(index)}
                    className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                  >
                    Remove
                  </button>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Position (inches)
                  </label>
                  <input
                    type="number"
                    step="0.125"
                    value={split.position}
                    onChange={(e) => updateVerticalSplit(index, 'position', parseFloat(e.target.value) || 0)}
                    disabled={!editable}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Direction
                  </label>
                  <select
                    value={split.direction}
                    onChange={(e) => updateVerticalSplit(index, 'direction', e.target.value)}
                    disabled={!editable}
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option value="left-to-right">Left to Right</option>
                    <option value="right-to-left">Right to Left</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {editable && (
        <div className="flex gap-3 justify-center">
          <button
            type="button"
            onClick={addVerticalSplit}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add Vertical Split
          </button>
          
          {showSaveButton && onSaveVerticalSplits && (
            <button
              type="button"
              onClick={onSaveVerticalSplits}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Save Vertical Splits
            </button>
          )}
        </div>
      )}
    </div>
  );
}

