'use client';

import { useState } from 'react';
import { fieldComponentMap } from './index';
import { WindowMeasurementInterface } from './WindowMeasurementInterface';

// Basic item structure that all array items should have
interface ArrayItem {
  Order_Position?: number;
  Window_Type?: string;
  [key: string]: unknown;
}

// Field configuration structure
interface FieldConfig {
  type: string;
  label?: string;
  [key: string]: unknown;
}

interface ArrayFieldProps {
  value: ArrayItem[];
  editable: boolean;
  label: string;
  itemMeta: Record<string, FieldConfig>;
  onChange: (newArray: ArrayItem[]) => void;
  createNewItem: () => ArrayItem;
}

export function WindowObjectArrayContainer({ 
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

  const updateItem = (index: number, field: string, newValue: unknown) => {
    const newArray = [...value];
    newArray[index] = { ...newArray[index], [field]: newValue };
    onChange(newArray);
  };

  const updateEntireItem = (index: number, updatedItem: ArrayItem) => {
    const newArray = [...value];
    newArray[index] = updatedItem;
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

  const renderItemFields = (item: ArrayItem, index: number) => {
    const fields: JSX.Element[] = [];
    
    // Check if this is a window item and use the special interface
    if (item.Window_Type === 'Window' || label.toLowerCase().includes('window')) {
      return (
        <WindowMeasurementInterface
          value={item}
          editable={editable}
          onChange={(field: string, newValue: unknown) => updateItem(index, field, newValue)}
          onUpdateWindow={(updatedWindow: ArrayItem) => updateEntireItem(index, updatedWindow)}
          itemMeta={itemMeta}
        />
      );
    }
    
    // Default rendering for non-window items
    for (const [key, config] of Object.entries(itemMeta)) {
      const fieldConfig = config as FieldConfig;
      const FieldComponent = fieldComponentMap[fieldConfig.type];
      
      if (!FieldComponent) continue;
      
      fields.push(
        <div key={key} className="mb-3">
          <FieldComponent
            value={item[key]}
            editable={editable}
            label={fieldConfig.label || key}
            onChange={(newValue: unknown) => updateItem(index, key, newValue)}
          />
        </div>
      );
    }
    
    return <div className="space-y-3">{fields}</div>;
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
                renderItemFields(item, index)
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
