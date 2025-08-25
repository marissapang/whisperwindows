'use client';

import { useState, useEffect } from 'react';
import { fieldComponentMap } from './index';

interface WindowMeasurementInterfaceProps {
  value: any;
  editable: boolean;
  onChange: (field: string, newValue: any) => void;
  itemMeta: any;
}

export function WindowMeasurementInterface({ 
  value, 
  editable, 
  onChange, 
  itemMeta 
}: WindowMeasurementInterfaceProps) {
  const [mode, setMode] = useState<'manual' | 'visual'>('visual');
  
  // Static diagram dimensions (clean, no defaults)
  const staticWidth = 300;
  const staticHeight = 400;
  
  // Applied measurements (used for diagram rendering when measurements exist)
  const [appliedMeasurements, setAppliedMeasurements] = useState({
    width_top_outside: value?.width_top_outside || null,
    width_top_inside: value?.width_top_inside || null,
    width_bottom_outside: value?.width_bottom_outside || null,
    width_bottom_inside: value?.width_bottom_inside || null,
    height_left_outside: value?.height_left_outside || null,
    height_left_inside: value?.height_left_inside || null,
    height_right_outside: value?.height_right_outside || null,
    height_right_inside: value?.height_right_inside || null,
    height_middle: value?.height_middle || null
  });

  // Pending measurements (temporary state before applying)
  const [pendingMeasurements, setPendingMeasurements] = useState({
    width_top_outside: value?.width_top_outside || null,
    width_top_inside: value?.width_top_inside || null,
    width_bottom_outside: value?.width_bottom_outside || null,
    width_bottom_inside: value?.width_bottom_inside || null,
    height_left_outside: value?.height_left_outside || null,
    height_left_inside: value?.height_left_inside || null,
    height_right_outside: value?.height_right_outside || null,
    height_right_inside: value?.height_right_inside || null,
    height_middle: value?.height_middle || null
  });

  // Track if there are pending changes
  const hasPendingChanges = JSON.stringify(appliedMeasurements) !== JSON.stringify(pendingMeasurements);

  // Check if we have any measurements to scale the diagram
  const hasMeasurements = Object.values(appliedMeasurements).some(val => val !== null && val !== undefined);

  // Update pending measurements when value prop changes
  useEffect(() => {
    const newMeasurements = {
      width_top_outside: value?.width_top_outside || null,
      width_top_inside: value?.width_top_inside || null,
      width_bottom_outside: value?.width_bottom_outside || null,
      width_bottom_inside: value?.width_bottom_inside || null,
      height_left_outside: value?.height_left_outside || null,
      height_left_inside: value?.height_left_inside || null,
      height_right_outside: value?.height_right_outside || null,
      height_right_inside: value?.height_right_inside || null,
      height_middle: value?.height_middle || null
    };
    setPendingMeasurements(newMeasurements);
    setAppliedMeasurements(newMeasurements);
  }, [value]);

  // Calculate dynamic dimensions only if we have measurements
  const getDiagramDimensions = () => {
    if (!hasMeasurements) {
      // Return static clean diagram
      return {
        svgWidth: staticWidth + 160,
        svgHeight: staticHeight + 160,
        scale: 1,
        padding: 80,
        outerFrame: { x: 80, y: 80, width: staticWidth, height: staticHeight },
        upperSash: { x: 95, y: 95, width: staticWidth - 30, height: (staticHeight / 2) - 20 },
        lowerSash: { x: 95, y: staticHeight / 2 + 80, width: staticWidth - 30, height: (staticHeight / 2) - 20 },
        frameThickness: 15
      };
    }

    // Dynamic scaling when measurements exist
    const maxWidth = Math.max(
      appliedMeasurements.width_top_outside || 48,
      appliedMeasurements.width_bottom_outside || 48
    );
    const maxHeight = Math.max(
      appliedMeasurements.height_left_outside || 96,
      appliedMeasurements.height_right_outside || 96
    );
    
    const scale = Math.min(300 / maxWidth, 400 / maxHeight) * 3;
    const padding = 80;
    const frameThickness = Math.max(2, scale * 0.5);
    
    const outerFrame = {
      x: padding,
      y: padding,
      width: (appliedMeasurements.width_top_outside || 48) * scale,
      height: (appliedMeasurements.height_left_outside || 96) * scale
    };
    
    const upperSash = {
      x: outerFrame.x + frameThickness,
      y: outerFrame.y + frameThickness,
      width: (appliedMeasurements.width_top_inside || 42) * scale,
      height: ((appliedMeasurements.height_middle || 48) - frameThickness * 2) * scale
    };
    
    const lowerSash = {
      x: outerFrame.x + frameThickness,
      y: outerFrame.y + (appliedMeasurements.height_middle || 48) * scale,
      width: (appliedMeasurements.width_bottom_inside || 42) * scale,
      height: ((appliedMeasurements.height_left_outside || 96) - (appliedMeasurements.height_middle || 48) - frameThickness) * scale
    };

    return {
      svgWidth: maxWidth * scale + padding * 2,
      svgHeight: maxHeight * scale + padding * 2,
      scale,
      padding,
      outerFrame,
      upperSash,
      lowerSash,
      frameThickness
    };
  };

  const dimensions = getDiagramDimensions();

  const handlePendingMeasurementChange = (field: string, newValue: number) => {
    setPendingMeasurements(prev => ({
      ...prev,
      [field]: newValue || null
    }));
  };

  const applyChanges = () => {
    // Apply pending measurements to the diagram
    setAppliedMeasurements({ ...pendingMeasurements });
    
    // Update the actual form values
    Object.entries(pendingMeasurements).forEach(([field, value]) => {
      onChange(field, value);
    });
  };

  const resetChanges = () => {
    setPendingMeasurements({ ...appliedMeasurements });
  };

  const MeasurementInput = ({ field, label, x, y, orientation = 'horizontal' }: {
    field: string;
    label: string;
    x: number;
    y: number;
    orientation?: 'horizontal' | 'vertical';
  }) => {
    const currentValue = pendingMeasurements[field as keyof typeof pendingMeasurements];
    
    return (
      <g>
        {/* Input field */}
        <foreignObject 
          x={x - 35} 
          y={y - 12} 
          width="70" 
          height="24"
        >
          <input
            type="number"
            value={currentValue || ''}
            onChange={(e) => handlePendingMeasurementChange(field, parseFloat(e.target.value) || 0)}
            disabled={!editable}
            className={`w-full h-full text-xs text-center border rounded shadow-sm ${
              hasPendingChanges ? 'border-orange-300 bg-orange-50' : 'border-gray-300 bg-white'
            }`}
            placeholder="0"
            step="0.1"
          />
        </foreignObject>
        
        {/* Label */}
        <text
          x={x}
          y={y + 30}
          textAnchor="middle"
          className="text-xs fill-gray-700 font-medium"
        >
          {label}
        </text>
        
        {/* Dimension line */}
        {orientation === 'horizontal' ? (
          <g>
            <line x1={x - 30} y1={y + 18} x2={x + 30} y2={y + 18} stroke="#6b7280" strokeWidth="1" />
            <line x1={x - 30} y1={y + 15} x2={x - 30} y2={y + 21} stroke="#6b7280" strokeWidth="1" />
            <line x1={x + 30} y1={y + 15} x2={x + 30} y2={y + 21} stroke="#6b7280" strokeWidth="1" />
          </g>
        ) : (
          <g>
            <line x1={x - 18} y1={y - 30} x2={x - 18} y2={y + 30} stroke="#6b7280" strokeWidth="1" />
            <line x1={x - 21} y1={y - 30} x2={x - 15} y2={y - 30} stroke="#6b7280" strokeWidth="1" />
            <line x1={x - 21} y1={y + 30} x2={x - 15} y2={y + 30} stroke="#6b7280" strokeWidth="1" />
          </g>
        )}
      </g>
    );
  };

  const renderManualMode = () => {
    if (!itemMeta || typeof itemMeta !== 'object') {
      console.error('itemMeta is invalid in WindowMeasurementInterface:', itemMeta);
      return <div className="text-red-500">Error: Window metadata not available</div>;
    }

    const fields: JSX.Element[] = [];
    
    try {
      for (const [key, config] of Object.entries(itemMeta)) {
        const fieldConfig = config as any;
        if (fieldConfig?.omit) continue;
        
        const FieldComponent = fieldComponentMap[fieldConfig?.type];
        if (!FieldComponent) {
          console.warn(`No field component registered for type: ${fieldConfig?.type}`);
          continue;
        }

        // Pass window data context for extension_config fields
        const fieldProps = fieldConfig?.type === 'extension_config' ? {
          windowData: {
            original_measurements: {
              top: value?.['original_measurements.top'] || value?.original_measurements?.top || 0,
              bottom: value?.['original_measurements.bottom'] || value?.original_measurements?.bottom || 0,
              left: value?.['original_measurements.left'] || value?.original_measurements?.left || 0,
              right: value?.['original_measurements.right'] || value?.original_measurements?.right || 0
            },
            original_vertical_splits: value?.original_vertical_splits || []
          }
        } : {};
        

        fields.push(
          <div key={key} className="mb-4">
            <FieldComponent
              value={value?.[key]}
              editable={editable}
              label={fieldConfig.label || key}
              onChange={(newValue: any) => onChange(key, newValue)}
              {...fieldProps}
            />
          </div>
        );
      }
    } catch (error) {
      console.error('Error rendering manual mode fields:', error);
      return <div className="text-red-500">Error rendering window fields</div>;
    }

    return (
      <div className="space-y-4">
        {fields}
      </div>
    );
  };

  const renderVisualMode = () => {
    return (
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <svg 
            width={dimensions.svgWidth} 
            height={dimensions.svgHeight}
            className="border border-gray-200 rounded-lg bg-white"
          >
            {/* Outer frame - clean black lines like reference */}
            <rect
              x={dimensions.outerFrame.x}
              y={dimensions.outerFrame.y}
              width={dimensions.outerFrame.width}
              height={dimensions.outerFrame.height}
              fill="none"
              stroke="#000000"
              strokeWidth="2"
            />
            
            {/* Upper sash */}
            <rect
              x={dimensions.upperSash.x}
              y={dimensions.upperSash.y}
              width={dimensions.upperSash.width}
              height={dimensions.upperSash.height}
              fill="none"
              stroke="#000000"
              strokeWidth="1"
            />
            
            {/* Lower sash */}
            <rect
              x={dimensions.lowerSash.x}
              y={dimensions.lowerSash.y}
              width={dimensions.lowerSash.width}
              height={dimensions.lowerSash.height}
              fill="none"
              stroke="#000000"
              strokeWidth="1"
            />
            
            {/* Middle divider - horizontal line between sashes */}
            <line
              x1={dimensions.outerFrame.x}
              y1={dimensions.upperSash.y + dimensions.upperSash.height + dimensions.frameThickness}
              x2={dimensions.outerFrame.x + dimensions.outerFrame.width}
              y2={dimensions.upperSash.y + dimensions.upperSash.height + dimensions.frameThickness}
              stroke="#000000"
              strokeWidth="2"
            />

            {/* Measurement inputs positioned around the diagram */}
            
            {/* Top width measurements */}
            <MeasurementInput
              field="width_top_outside"
              label="Width Top Outside"
              x={dimensions.outerFrame.x + dimensions.outerFrame.width / 2}
              y={dimensions.outerFrame.y - 45}
              orientation="horizontal"
            />
            
            <MeasurementInput
              field="width_top_inside"
              label="Width Top Inside"
              x={dimensions.upperSash.x + dimensions.upperSash.width / 2}
              y={dimensions.upperSash.y + dimensions.upperSash.height / 2 - 25}
              orientation="horizontal"
            />
            
            {/* Bottom width measurements */}
            <MeasurementInput
              field="width_bottom_inside"
              label="Width Bottom Inside"
              x={dimensions.lowerSash.x + dimensions.lowerSash.width / 2}
              y={dimensions.lowerSash.y + dimensions.lowerSash.height / 2 + 25}
              orientation="horizontal"
            />
            
            <MeasurementInput
              field="width_bottom_outside"
              label="Width Bottom Outside"
              x={dimensions.outerFrame.x + dimensions.outerFrame.width / 2}
              y={dimensions.outerFrame.y + dimensions.outerFrame.height + 45}
              orientation="horizontal"
            />

            {/* Left height measurements */}
            <MeasurementInput
              field="height_left_outside"
              label="Height Left Outside"
              x={dimensions.outerFrame.x - 45}
              y={dimensions.outerFrame.y + dimensions.outerFrame.height / 2}
              orientation="vertical"
            />
            
            <MeasurementInput
              field="height_left_inside"
              label="Height Left Inside"
              x={dimensions.upperSash.x - 25}
              y={dimensions.upperSash.y + dimensions.upperSash.height / 2}
              orientation="vertical"
            />
            
            {/* Right height measurements */}
            <MeasurementInput
              field="height_right_inside"
              label="Height Right Inside"
              x={dimensions.lowerSash.x + dimensions.lowerSash.width + 25}
              y={dimensions.lowerSash.y + dimensions.lowerSash.height / 2}
              orientation="vertical"
            />
            
            <MeasurementInput
              field="height_right_outside"
              label="Height Right Outside"
              x={dimensions.outerFrame.x + dimensions.outerFrame.width + 45}
              y={dimensions.outerFrame.y + dimensions.outerFrame.height / 2}
              orientation="vertical"
            />
            
            {/* Middle height measurement */}
            <MeasurementInput
              field="height_middle"
              label="Height Middle"
              x={dimensions.outerFrame.x + dimensions.outerFrame.width / 2}
              y={dimensions.upperSash.y + dimensions.upperSash.height + dimensions.frameThickness - 35}
              orientation="horizontal"
            />
          </svg>
        </div>
        
        {/* Apply/Reset buttons */}
        {hasPendingChanges && (
          <div className="flex items-center gap-3 p-3 bg-orange-50 border border-orange-200 rounded-lg">
            <div className="text-sm text-orange-700">
              You have unsaved measurement changes
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={applyChanges}
                disabled={!editable}
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Apply Changes
              </button>
              <button
                type="button"
                onClick={resetChanges}
                className="px-4 py-2 bg-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-400"
              >
                Reset
              </button>
            </div>
          </div>
        )}
        
        <div className="text-sm text-gray-600 max-w-md text-center">
          {hasMeasurements 
            ? "Enter measurements in the input fields. Click 'Apply Changes' to update the diagram scale."
            : "Enter measurements in the input fields above. The diagram will scale when you apply changes."
          }
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Mode toggle */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">Window Measurements</h3>
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            type="button"
            onClick={() => setMode('visual')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              mode === 'visual'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Visual Diagram
          </button>
          <button
            type="button"
            onClick={() => setMode('manual')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              mode === 'manual'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Manual Input
          </button>
        </div>
      </div>

      {/* Content based on mode */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        {mode === 'visual' ? renderVisualMode() : renderManualMode()}
      </div>
    </div>
  );
}
