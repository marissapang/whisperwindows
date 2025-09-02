'use client';

import { useState, useEffect } from 'react';
import { fieldComponentMap } from './index';
import { NumberInchesField } from './fields-generic/NumberInchesField.tsx';
import { FourSidedMeasurementsField } from './fields-window/FourSidedMeasurementsField';
import { ConfigSplitsField } from './fields-window/ConfigSplitsField';
import { createEmptyConfigSplits } from './libs/constructors';



interface WindowProps {
  value: WindowData;
  editable: boolean;
  onChange: (field: string, newValue: unknown) => void;
  onUpdateWindow?: (updatedWindow: WindowData) => void;
}

export function Window({ 
  value, 
  editable, 
  onChange, 
  onUpdateWindow
}: WindowProps) {



  return (
    <div className="space-y-4">      
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="space-y-4">

        <input 
          type="text" 
          value={value.Window_Name} 
          onChange={(e) => onChange("Window_Name", e.target.value)}
          placeholder="Window Name"
          className="w-flex border"
        />
        -
        <input 
          type="text" 
          value={value.Window_Configuration} 
          onChange={(e) => onChange("Window_Configuration", e.target.value)}
          placeholder="Window Area Configuration"
          className="w-flex border"
        />

        {/*<StringField 
          value={value?.Window_Name} editable={editable} label="Window Name"
          onChange={(newValue: unknown) => onChange("Window_Name", newValue)}
        />*/}
        <br/>
        Window Dimensions: 
        <br/>
        <FourSidedMeasurementsField
          value={value?.Window_Four_Sided_Measurements}
          editable={editable}
          onChange={(newValue) => onChange('Window_Four_Sided_Measurements', newValue)}
        />
        <br/>
        <h3 className="text-xl font-semibold">Window Configuration</h3>
        <ConfigSplitsField
          value={value?.Window_Config_Dependent_Measurements ?? createEmptyConfigSplits()}
          editable={editable}
          onChange={(newValue) => onChange('Window_Config_Dependent_Measurements', newValue)}
        />

        <h3 className="text-xl font-semibold">Panel Configuration</h3>
        <ConfigSplitsField
          value={value?.Panel_Config_Dependent_Parameters ?? createEmptyConfigSplits()}
          editable={editable}
          onChange={(newValue) => onChange('Panel_Config_Dependent_Parameters', newValue)}
        />


      </div>
      </div>
    </div>
  );
}
