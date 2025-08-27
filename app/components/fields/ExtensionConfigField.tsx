import React, { useState, useEffect } from 'react';
import { 
  MATERIAL_THICKNESS, 
  EXTENSION_CONFIGURATIONS, 
  type ExtensionConfig, 
  type MaterialType, 
  type ExtensionConfigurationType,
  calculateExtensionResults,
  type WindowMeasurements,
  type VerticalSplit
} from '../../schemas/comprehensiveExtensionSchema';

interface ExtensionConfigFieldProps {
  value: ExtensionConfig;
  onChange: (value: ExtensionConfig) => void;
  label: string;
  name: string;
  windowData?: {
    original_measurements: WindowMeasurements;
    original_vertical_splits: VerticalSplit[];
    original_horizontal_subsections?: any[];
    calculated_horizontal_subsections?: any[];
  };
}

export function ExtensionConfigField({ value, onChange, label, name, windowData }: ExtensionConfigFieldProps) {
  const [config, setConfig] = useState<ExtensionConfig>(value);
  const [showCalculations, setShowCalculations] = useState(false);
  const [calculationResults, setCalculationResults] = useState<any>(null);

  useEffect(() => {
    setConfig(value);
  }, [value]);

  const handleChange = (updates: Partial<ExtensionConfig>) => {
    const newConfig = { ...config, ...updates };
    setConfig(newConfig);
    onChange(newConfig);
  };

  const handleMaterialChange = (side: keyof ExtensionConfig['Materials'], material: MaterialType) => {
    const newMaterials = { ...config.Materials, [side]: material };
    handleChange({ Materials: newMaterials });
  };

  const handleCalculatePreview = () => {
    if (!config.Extension) {
      return;
    }

    const measurements = windowData?.original_measurements || { top: 0, bottom: 0, left: 0, right: 0 };
    
    // Check if measurements are valid (all greater than 0)
    const hasValidMeasurements = measurements.top > 0 && measurements.bottom > 0 && 
                                measurements.left > 0 && measurements.right > 0;
    
    if (!hasValidMeasurements) {
      setCalculationResults({ 
        error: 'Please enter valid window measurements (all values must be greater than 0) before calculating extensions.' 
      });
      setShowCalculations(true);
      return;
    }

    try {
      const results = calculateExtensionResults(
        measurements,
        windowData?.original_vertical_splits || [],
        config
      );
      
      setCalculationResults(results);
      setShowCalculations(true);
    } catch (error) {
      console.error('Extension calculation error:', error);
      setCalculationResults({ error: error instanceof Error ? error.message : 'Calculation failed' });
      setShowCalculations(true);
    }
  };

  const materialOptions = Object.keys(MATERIAL_THICKNESS) as MaterialType[];
  const configurationOptions = Object.keys(EXTENSION_CONFIGURATIONS) as ExtensionConfigurationType[];

  return (
    <div className="extension-config-field border rounded-lg p-4 bg-gray-50">
      <h3 className="text-lg font-semibold mb-4">{label}</h3>
      
      {/* Extension Enable/Disable */}
      <div className="mb-4">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={config.Extension}
            onChange={(e) => handleChange({ Extension: e.target.checked })}
            className="form-checkbox h-4 w-4 text-blue-600"
          />
          <span className="text-sm font-medium">Enable Extension</span>
        </label>
      </div>

      {config.Extension && (
        <div className="space-y-4">
          {/* Extension Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Extension Type
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="interior"
                  checked={config.Type === 'interior'}
                  onChange={(e) => handleChange({ Type: e.target.value as 'interior' | 'exterior' })}
                  className="form-radio h-4 w-4 text-blue-600"
                />
                <span className="ml-2 text-sm">Interior</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="exterior"
                  checked={config.Type === 'exterior'}
                  onChange={(e) => handleChange({ Type: e.target.value as 'interior' | 'exterior' })}
                  className="form-radio h-4 w-4 text-blue-600"
                />
                <span className="ml-2 text-sm">Exterior</span>
              </label>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {config.Type === 'interior' 
                ? 'Frame goes inside window opening (splits adjust inward)'
                : 'Frame extends beyond window opening (splits stay same)'
              }
            </p>
          </div>

          {/* Configuration Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Configuration
            </label>
            <select
              value={config.Configuration}
              onChange={(e) => handleChange({ Configuration: e.target.value as ExtensionConfigurationType })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              {configurationOptions.map(option => (
                <option key={option} value={option}>
                  {option.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">
              {EXTENSION_CONFIGURATIONS[config.Configuration]}
            </p>
          </div>

          {/* Materials Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Materials
            </label>
            <div className="grid grid-cols-2 gap-4">
              {(['Top', 'Left', 'Bottom', 'Right'] as const).map(side => (
                <div key={side}>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    {side}
                  </label>
                  <select
                    value={config.Materials[side]}
                    onChange={(e) => handleMaterialChange(side, e.target.value as MaterialType)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                  >
                    {materialOptions.map(material => (
                      <option key={material} value={material}>
                        {material.replace('_', ' ')} ({MATERIAL_THICKNESS[material]}″)
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>

          {/* Current Frame Depth */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Frame Depth (inches)
            </label>
            <input
              type="number"
              step="0.125"
              min="0"
              value={config.Current_Frame_Depth}
              onChange={(e) => handleChange({ Current_Frame_Depth: parseFloat(e.target.value) || 0 })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="0"
            />
          </div>

          {/* Support Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Support Notes
            </label>
            <textarea
              value={config.Support_Notes}
              onChange={(e) => handleChange({ Support_Notes: e.target.value })}
              rows={2}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="Any special support requirements..."
            />
          </div>

          {/* General Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              General Notes
            </label>
            <textarea
              value={config.General_Notes}
              onChange={(e) => handleChange({ General_Notes: e.target.value })}
              rows={2}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="Additional notes or specifications..."
            />
          </div>

          {/* Calculate Preview Button */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={handleCalculatePreview}
              disabled={!config.Extension}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
            >
              See Calculations Preview
            </button>
            {!config.Extension && (
              <p className="text-xs text-gray-500 mt-1 text-center">
                Enable extension to see calculations
              </p>
            )}
          </div>
        </div>
      )}

      {/* Calculation Results Modal/Panel */}
      {showCalculations && (
        <div className="mt-6 border rounded-lg bg-white shadow-sm">
          <div className="flex items-center justify-between p-4 border-b bg-gray-50 rounded-t-lg">
            <h4 className="text-lg font-semibold text-gray-900">Extension Calculations</h4>
            <button
              onClick={() => setShowCalculations(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              ✕
            </button>
          </div>
          
          <div className="p-4 space-y-4">
            {calculationResults?.error ? (
              <div className="bg-red-50 border border-red-200 rounded-md p-3">
                <p className="text-red-800 text-sm">{calculationResults.error}</p>
              </div>
            ) : calculationResults ? (
              <>
                {/* Panel Measurements */}
                <div className="bg-blue-50 rounded-md p-3">
                  <h5 className="font-medium text-blue-900 mb-2">Panel Measurements</h5>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>Top: <span>{calculationResults.workingMeasurements?.top}"</span></div>
                    <div>Bottom: <span>{calculationResults.workingMeasurements?.bottom}"</span></div>
                    <div>Left: <span>{calculationResults.workingMeasurements?.left}"</span></div>
                    <div>Right: <span>{calculationResults.workingMeasurements?.right}"</span></div>
                  </div>
                </div>

                {/* Effective Dimensions */}
                <div className="bg-green-50 rounded-md p-3">
                  <h5 className="font-medium text-green-900 mb-2">Interior Opening</h5>
                  <div className="text-sm">
                    <div>Width: <span>{calculationResults.effectiveDimensions?.width}"</span></div>
                    <div>Height: <span>{calculationResults.effectiveDimensions?.height}"</span></div>
                  </div>
                </div>

                {/* Frame Pieces */}
                <div className="bg-amber-50 rounded-md p-3">
                  <h5 className="font-medium text-amber-900 mb-2">Cut Lengths</h5>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {Object.entries(calculationResults.framePieces || {}).map(([key, piece]: [string, any]) => (
                      <div key={key}>
                        <span className="capitalize">{piece.material_side}: </span>
                        <span>{piece.length}"</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Material Thickness */}
                <div className="bg-purple-50 rounded-md p-3">
                  <h5 className="font-medium text-purple-900 mb-2">Material Thickness</h5>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {Object.entries(calculationResults.thicknessVector || {}).map(([side, thickness]) => (
                      <div key={side}>
                        <span className="capitalize">{side}: </span>
                        <span>{String(thickness)}"</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Vertical Split Recalculation */}
                {calculationResults.calculatedSplits && calculationResults.calculatedSplits.length > 0 && (
                  <div className="bg-indigo-50 rounded-md p-3">
                    <h5 className="font-medium text-indigo-900 mb-2">Vertical Split Positions</h5>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      {calculationResults.calculatedSplits.map((split: any, index: number) => (
                        <div key={index}>
                          Split {index + 1}: <span>{split.position}"</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}


                {/* Configuration Summary */}
                <div className="bg-gray-50 rounded-md p-3">
                  <h5 className="font-medium text-gray-900 mb-2">Configuration</h5>
                  <div className="text-sm space-y-1">
                    <div>Type: <span className="font-medium capitalize">{calculationResults.calculationSummary?.extension_type}</span></div>
                    <div>Pattern: <span className="font-medium">{calculationResults.calculationSummary?.configuration_used}</span></div>
                    <div>Transformation: <span className="font-medium">{calculationResults.calculationSummary?.transformation_applied ? 'Applied' : 'None'}</span></div>
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}

export default ExtensionConfigField;
