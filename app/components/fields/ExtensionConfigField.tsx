import React, { useState, useEffect } from 'react';
import { 
  MATERIAL_THICKNESS, 
  EXTENSION_CONFIGURATIONS, 
  type ExtensionConfig, 
  type MaterialType, 
  type ExtensionConfigurationType 
} from '../../schemas/comprehensiveExtensionSchema';

interface ExtensionConfigFieldProps {
  value: ExtensionConfig;
  onChange: (value: ExtensionConfig) => void;
  label: string;
  name: string;
}

export function ExtensionConfigField({ value, onChange, label, name }: ExtensionConfigFieldProps) {
  const [config, setConfig] = useState<ExtensionConfig>(value);

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
        </div>
      )}
    </div>
  );
}

export default ExtensionConfigField;
