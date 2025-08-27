'use client';

import React from 'react';
import { HorizontalSplitSubsection, HorizontalSplit } from '@/app/schemas/comprehensiveExtensionSchema';

interface HorizontalSubsectionsArrayFieldProps {
  value: HorizontalSplitSubsection[];
  editable: boolean;
  label: string;
  onChange: (value: HorizontalSplitSubsection[]) => void;
}

export function HorizontalSubsectionsArrayField({
  value = [],
  editable,
  label,
  onChange
}: HorizontalSubsectionsArrayFieldProps) {
  
  
  const addHorizontalSplit = (subsectionIndex: number) => {
    const newSplit: HorizontalSplit = {
      position: 0,
      direction: 'top-to-bottom'
    };
    
    const updatedValue = [...value];
    updatedValue[subsectionIndex] = {
      ...updatedValue[subsectionIndex],
      horizontal_splits: [...updatedValue[subsectionIndex].horizontal_splits, newSplit]
    };
    
    onChange(updatedValue);
  };

  const removeHorizontalSplit = (subsectionIndex: number, splitIndex: number) => {
    const updatedValue = [...value];
    updatedValue[subsectionIndex] = {
      ...updatedValue[subsectionIndex],
      horizontal_splits: updatedValue[subsectionIndex].horizontal_splits.filter((_, i) => i !== splitIndex)
    };
    
    onChange(updatedValue);
  };

  const updateHorizontalSplit = (subsectionIndex: number, splitIndex: number, field: keyof HorizontalSplit, newValue: any) => {
    const updatedValue = [...value];
    updatedValue[subsectionIndex] = {
      ...updatedValue[subsectionIndex],
      horizontal_splits: updatedValue[subsectionIndex].horizontal_splits.map((split, i) => 
        i === splitIndex ? { ...split, [field]: newValue } : split
      )
    };
    
    onChange(updatedValue);
  };

  if (!editable) {
    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
        <div className="space-y-4">
          {value.map((subsection, subsectionIndex) => (
            <div key={subsectionIndex} className="border rounded-lg p-4 bg-gray-50">
              <h4 className="font-medium text-gray-800 mb-2">
                {subsection.subsection_label} ({subsection.left_boundary}" - {subsection.right_boundary}")
              </h4>
              {subsection.horizontal_splits.length > 0 ? (
                <div className="space-y-2">
                  {subsection.horizontal_splits.map((split, splitIndex) => (
                    <div key={splitIndex} className="text-sm text-gray-600">
                      Split at {split.position}" ({split.direction})
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-gray-500 italic">No horizontal splits</div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      
      {value.length === 0 ? (
        <div className="text-sm text-gray-500 italic p-4 border rounded-lg bg-gray-50">
          Save vertical splits first to enable horizontal split input
        </div>
      ) : (
        <div className="space-y-4">
          {value.map((subsection, subsectionIndex) => (
            <div key={subsectionIndex} className="border rounded-lg p-4 bg-white">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-medium text-gray-800">
                  {subsection.subsection_label}
                </h4>
              </div>
              
              <div className="space-y-2">
                {subsection.horizontal_splits.map((split, splitIndex) => (
                  <div key={splitIndex} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                    <div className="flex-1">
                      <label className="block text-xs text-gray-600 mb-1">Position (inches)</label>
                      <input
                        type="number"
                        step="0.125"
                        value={split.position}
                        onChange={(e) => updateHorizontalSplit(subsectionIndex, splitIndex, 'position', parseFloat(e.target.value) || 0)}
                        className="w-full px-2 py-1 border rounded text-sm"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <label className="block text-xs text-gray-600 mb-1">Direction</label>
                      <select
                        value={split.direction}
                        onChange={(e) => updateHorizontalSplit(subsectionIndex, splitIndex, 'direction', e.target.value)}
                        className="w-full px-2 py-1 border rounded text-sm"
                      >
                        <option value="top-to-bottom">Top to Bottom</option>
                        <option value="bottom-to-top">Bottom to Top</option>
                      </select>
                    </div>
                    
                    <button
                      type="button"
                      onClick={() => removeHorizontalSplit(subsectionIndex, splitIndex)}
                      className="px-2 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                
                <button
                  type="button"
                  onClick={() => addHorizontalSplit(subsectionIndex)}
                  className="w-full px-3 py-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
                >
                  Add Horizontal Split
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
