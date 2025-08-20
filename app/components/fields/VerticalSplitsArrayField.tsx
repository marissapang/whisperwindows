'use client';

import { useState } from 'react';
import { generateSplitId, VerticalSplit, HorizontalSplit } from '@/app/schemas/createSingleOrDoubleHungWindow';

interface VerticalSplitsArrayFieldProps {
  value: VerticalSplit[];
  editable: boolean;
  label: string;
  onChange: (splits: VerticalSplit[]) => void;
}

export function VerticalSplitsArrayField({ 
  value = [], 
  editable, 
  label, 
  onChange 
}: VerticalSplitsArrayFieldProps) {

  const addVerticalSplit = () => {
    if (!Array.isArray(value)) {
      console.error('Invalid value array in VerticalSplitsArrayField:', value);
      return;
    }
    const newSplit: VerticalSplit = {
      id: generateSplitId(),
      position: 12, // Default position in inches
      direction: 'left-to-right',
      horizontal_splits: []
    };
    onChange([...value, newSplit]);
  };

  const removeVerticalSplit = (id: string) => {
    if (!Array.isArray(value)) {
      console.error('Invalid value array in VerticalSplitsArrayField:', value);
      return;
    }
    onChange(value.filter(split => split.id !== id));
  };

  const updateVerticalSplit = (id: string, field: keyof VerticalSplit, newValue: any) => {
    if (!Array.isArray(value)) {
      console.error('Invalid value array in VerticalSplitsArrayField:', value);
      return;
    }
    onChange(value.map(split => 
      split.id === id ? { ...split, [field]: newValue } : split
    ));
  };

  const addHorizontalSplit = (verticalSplitId: string) => {
    if (!Array.isArray(value)) {
      console.error('Invalid value array in VerticalSplitsArrayField:', value);
      return;
    }
    const newHorizontalSplit: HorizontalSplit = {
      id: generateSplitId(),
      position: 12, // Default position in inches
      direction: 'top-to-bottom'
    };
    
    onChange(value.map(split => 
      split.id === verticalSplitId 
        ? { ...split, horizontal_splits: [...split.horizontal_splits, newHorizontalSplit] }
        : split
    ));
  };

  const removeHorizontalSplit = (verticalSplitId: string, horizontalSplitId: string) => {
    if (!Array.isArray(value)) {
      console.error('Invalid value array in VerticalSplitsArrayField:', value);
      return;
    }
    onChange(value.map(split => 
      split.id === verticalSplitId 
        ? { ...split, horizontal_splits: split.horizontal_splits.filter(h => h.id !== horizontalSplitId) }
        : split
    ));
  };

  const updateHorizontalSplit = (verticalSplitId: string, horizontalSplitId: string, field: keyof HorizontalSplit, newValue: any) => {
    if (!Array.isArray(value)) {
      console.error('Invalid value array in VerticalSplitsArrayField:', value);
      return;
    }
    onChange(value.map(split => 
      split.id === verticalSplitId 
        ? { 
            ...split, 
            horizontal_splits: split.horizontal_splits.map(h => 
              h.id === horizontalSplitId ? { ...h, [field]: newValue } : h
            )
          }
        : split
    ));
  };

  return (
    <div className="space-y-4 p-4 border rounded bg-gray-50">
      <h4 className="font-medium text-gray-700">{label}</h4>
      
      {/* Vertical splits */}
      {Array.isArray(value) && value.length > 0 && (
        <div className="space-y-4">
          {value.map((verticalSplit, vIndex) => (
            <div key={verticalSplit.id} className="p-3 bg-white rounded border">
              <div className="flex items-center justify-between mb-3">
                <h5 className="font-medium text-sm">Vertical Split {vIndex + 1}</h5>
                {editable && (
                  <button
                    type="button"
                    onClick={() => removeVerticalSplit(verticalSplit.id)}
                    className="px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
                  >
                    Remove
                  </button>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="text-xs font-medium">Position (inches):</label>
                  <input
                    type="number"
                    step="0.125"
                    value={verticalSplit.position || ''}
                    onChange={(e) => updateVerticalSplit(verticalSplit.id, 'position', Number(e.target.value))}
                    disabled={!editable}
                    className="w-full px-2 py-1 border rounded text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium">Direction:</label>
                  <select
                    value={verticalSplit.direction}
                    onChange={(e) => updateVerticalSplit(verticalSplit.id, 'direction', e.target.value)}
                    disabled={!editable}
                    className="w-full px-2 py-1 border rounded text-sm"
                  >
                    <option value="left-to-right">Left to Right</option>
                    <option value="right-to-left">Right to Left</option>
                  </select>
                </div>
              </div>

              {/* Horizontal splits for this vertical split */}
              <div className="ml-4 border-l-2 border-gray-200 pl-3">
                <div className="flex items-center justify-between mb-2">
                  <h6 className="text-xs font-medium text-gray-600">Horizontal Splits</h6>
                  {editable && (
                    <button
                      type="button"
                      onClick={() => addHorizontalSplit(verticalSplit.id)}
                      className="px-2 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600"
                    >
                      Add Horizontal
                    </button>
                  )}
                </div>

                {verticalSplit.horizontal_splits.length > 0 ? (
                  <div className="space-y-2">
                    {verticalSplit.horizontal_splits.map((horizontalSplit, hIndex) => (
                      <div key={horizontalSplit.id} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                        <span className="text-xs">H{hIndex + 1}:</span>
                        
                        <div className="flex items-center gap-1">
                          <label className="text-xs">Pos:</label>
                          <input
                            type="number"
                            step="0.125"
                            value={horizontalSplit.position || ''}
                            onChange={(e) => updateHorizontalSplit(verticalSplit.id, horizontalSplit.id, 'position', Number(e.target.value))}
                            disabled={!editable}
                            className="w-16 px-1 py-1 border rounded text-xs"
                          />
                        </div>

                        <div className="flex items-center gap-1">
                          <label className="text-xs">Dir:</label>
                          <select
                            value={horizontalSplit.direction}
                            onChange={(e) => updateHorizontalSplit(verticalSplit.id, horizontalSplit.id, 'direction', e.target.value)}
                            disabled={!editable}
                            className="px-1 py-1 border rounded text-xs"
                          >
                            <option value="top-to-bottom">Top→Bottom</option>
                            <option value="bottom-to-top">Bottom→Top</option>
                          </select>
                        </div>

                        {editable && (
                          <button
                            type="button"
                            onClick={() => removeHorizontalSplit(verticalSplit.id, horizontalSplit.id)}
                            className="px-1 py-1 bg-red-400 text-white rounded text-xs hover:bg-red-500"
                          >
                            ×
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-xs text-gray-500 italic">No horizontal splits</div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add vertical split button */}
      {editable && (
        <div className="text-center">
          <button
            type="button"
            onClick={addVerticalSplit}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add Vertical Split
          </button>
        </div>
      )}

      {(!Array.isArray(value) || value.length === 0) && (
        <div className="text-center py-4 text-gray-500 text-sm">
          No vertical splits defined
        </div>
      )}
    </div>
  );
}
