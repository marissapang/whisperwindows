'use client';

import { useState } from 'react';
import { fieldComponentMap } from './index';

interface ArrayFieldProps {
  value: any[];
  editable: boolean;
  label: string;
  itemMeta: any;
  onChange: (newArray: any[]) => void;
  createNewItem: () => any;
}

export function ArrayField({ 
  value = [], 
  editable, 
  label, 
  itemMeta, 
  onChange, 
  createNewItem 
}: ArrayFieldProps) {
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

  const addItem = () => {
    const newItem = createNewItem();
    // Update Order_Position for new items
    newItem.Order_Position = value.length + 1;
    onChange([...value, newItem]);
    // Auto-expand the new item
    setExpandedItems(prev => new Set([...prev, value.length]));
  };

  const removeItem = (index: number) => {
    const newArray = value.filter((_, i) => i !== index);
    // Update Order_Position for remaining items
    newArray.forEach((item, i) => {
      if (item.Order_Position !== undefined) {
        item.Order_Position = i + 1;
      }
    });
    onChange(newArray);
    // Remove from expanded items
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      newSet.delete(index);
      return newSet;
    });
  };

  const updateItem = (index: number, field: string, newValue: any) => {
    const newArray = [...value];
    newArray[index] = { ...newArray[index], [field]: newValue };
    onChange(newArray);
  };

  const toggleExpanded = (index: number) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const renderItemField = (item: any, itemIndex: number, fieldKey: string, fieldConfig: any) => {
    const FieldComponent = fieldComponentMap[fieldConfig.type];
    
    if (!FieldComponent) {
      console.warn(`No field component for type: ${fieldConfig.type}`);
      return null;
    }

    return (
      <div key={`${itemIndex}-${fieldKey}`} className="mb-2">
        <FieldComponent
          value={item[fieldKey]}
          editable={editable}
          label={fieldConfig.label || fieldKey}
          onChange={(newValue: any) => updateItem(itemIndex, fieldKey, newValue)}
        />
      </div>
    );
  };

  return (
    <div className="border rounded-lg p-4 mb-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">{label}</h3>
        {editable && (
          <button
            type="button"
            onClick={addItem}
            className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
          >
            Add Windows Collection
          </button>
        )}
      </div>

      {value.length === 0 ? (
        <p className="text-gray-500 italic">No {label.toLowerCase()} added yet.</p>
      ) : (
        <div className="space-y-3">
          {value.map((item, index) => (
            <div key={index} className="border rounded p-3 bg-gray-50">
              <div className="flex justify-between items-center mb-2">
                <button
                  type="button"
                  onClick={() => toggleExpanded(index)}
                  className="text-left font-medium text-blue-600 hover:text-blue-800"
                >
                  {item.Window_Type || `Item ${index + 1}`} 
                  {item.Order_Position && ` (Position ${item.Order_Position})`}
                  <span className="ml-2">
                    {expandedItems.has(index) ? '▼' : '▶'}
                  </span>
                </button>
                {editable && (
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    className="bg-red-600 text-white px-2 py-1 rounded text-xs hover:bg-red-700"
                  >
                    Remove
                  </button>
                )}
              </div>
              
              {expandedItems.has(index) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                  {Object.entries(itemMeta).map(([fieldKey, fieldConfig]: [string, any]) => 
                    renderItemField(item, index, fieldKey, fieldConfig)
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
