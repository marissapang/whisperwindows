// ===================================================================
// COMPREHENSIVE EXTENSION SCHEMA DESIGN
// Complete data structures, interfaces, and calculation logic
// ===================================================================

// Generate a unique window ID
function generateWindowId(): string {
  return 'WIN_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

// ===================================================================
// 1. CORE DATA STRUCTURES & INTERFACES
// ===================================================================

// Material and configuration types
export type MaterialType = 
  | 'primed_pine1x2'
  | 'primed_pine1x6' 
  | 'primed_pine1x8'
  | 'primed_pine1x10'
  | 'primed_pine1x12'
  | 'pvc_1x2'
  | 'wood_2x2';

export type ExtensionConfigurationType = 
  | 'full-top' 
  | 'full-top-bottom' 
  | 'full-sides' 
  | 'full-bottom';

// Window measurements interface
export interface WindowMeasurements {
  top: number;     // Width measurement at top
  bottom: number;  // Width measurement at bottom
  left: number;    // Height measurement on left
  right: number;   // Height measurement on right
}

export interface CalculatedMeasurements extends WindowMeasurements {
  transformation_applied: boolean;
  transformation_type: 'interior' | 'exterior' | null;
}

// Split system interfaces
export interface VerticalSplit {
  position: number;                           // Position in inches from LEFT edge
  direction: 'left-to-right' | 'right-to-left';
  horizontal_splits: HorizontalSplit[];
  // Calculation tracking
  original_position?: number;
  position_adjustment?: number;
}

export interface HorizontalSplit {
  position: number;                           // Position in inches from TOP edge
  direction: 'top-to-bottom' | 'bottom-to-top';
  // Calculation tracking
  original_position?: number;
  position_adjustment?: number;
}

// Extension configuration interface
export interface ExtensionConfig {
  Extension: boolean;                    // Whether extension is enabled
  Configuration: ExtensionConfigurationType;
  Materials: {
    Top: MaterialType;
    Left: MaterialType; 
    Bottom: MaterialType;
    Right: MaterialType;
  };
  Type: 'interior' | 'exterior';        // Interior = base case, Exterior = transformation
  Support_Notes: string;
  General_Notes: string;
  Current_Frame_Depth: number;          // Existing frame depth in inches
}

// Frame piece and cut list interfaces
export interface FramePiece {
  length: number;
  material_side: 'top' | 'left' | 'bottom' | 'right';
  material_type: MaterialType;
  thickness: number;
  description: string;
}

export interface CutListItem {
  piece_name: string;
  description: string;
  length: number;
  material_type: MaterialType;
  thickness: number;
  quantity: number;
  side: string;
  notes: string;
}

// ===================================================================
// 2. COMPLETE WINDOW SCHEMA WITH EXTENSION INTEGRATION
// ===================================================================

export interface SingleOrDoubleHungWindow {
  // Core identification
  Window_Id: string;
  Window_Type: 'Single/Double Hung Window';
  Order_Position: number;
  
  // === ORIGINAL INPUT DATA (Never Modified) ===
  original_measurements: WindowMeasurements;
  original_vertical_splits: VerticalSplit[];
  
  // === EXTENSION CONFIGURATION ===
  extension: ExtensionConfig;
  
  // === CALCULATED VALUES (Auto-populated, Read-only in UI) ===
  calculated_measurements: CalculatedMeasurements;
  calculated_vertical_splits: VerticalSplit[];
  effective_dimensions: {
    width: number;
    height: number;
  };
  frame_pieces: {
    topPiece: FramePiece;
    bottomPiece: FramePiece;
    leftPiece: FramePiece;
    rightPiece: FramePiece;
  };
  cut_list: CutListItem[];
  thickness_vector: {
    top: number;
    left: number;
    bottom: number;
    right: number;
  };
  
  // === CALCULATION METADATA ===
  calculation_summary: {
    extension_applied: boolean;
    extension_type: 'interior' | 'exterior' | null;
    configuration_used: ExtensionConfigurationType | null;
    transformation_applied: boolean;
    calculation_timestamp: Date | null;
    splits_recalculated: boolean;
  };
}

// ===================================================================
// 3. MATERIAL CONSTANTS & CONFIGURATION
// ===================================================================

export const MATERIAL_THICKNESS: Record<MaterialType, number> = {
  // Pine materials - all 0.75" thickness
  "primed_pine1x2": 0.75,
  "primed_pine1x6": 0.75,
  "primed_pine1x8": 0.75,
  "primed_pine1x10": 0.75,
  "primed_pine1x12": 0.75,
  
  // PVC materials
  "pvc_1x2": 5/8,        // 0.625 inches
  
  // Wood materials
  "wood_2x2": 0.5        // 0.5 inches
};

export const EXTENSION_CONFIGURATIONS: Record<ExtensionConfigurationType, string> = {
  "full-top": "Top panel spans full width, sides below top, bottom between sides",
  "full-top-bottom": "Top and bottom span full width, sides wedged between",
  "full-sides": "Left and right span full height, top and bottom wedged between", 
  "full-bottom": "Bottom panel spans full width, sides above bottom, top between sides"
};

export const EXTENSION_TYPES: Array<'interior' | 'exterior'> = ["interior", "exterior"];

// ===================================================================
// 4. SCHEMA GENERATION FUNCTIONS
// ===================================================================

export function generateEmptyExtension(): ExtensionConfig {
  return {
    Extension: false,                     // Default: NO extension
    Configuration: "full-top",
    Materials: {
      Top: "pvc_1x2",
      Left: "pvc_1x2", 
      Bottom: "pvc_1x2",
      Right: "pvc_1x2"
    },
    Type: 'interior',                     // Interior = base case
    Support_Notes: '',
    General_Notes: '',
    Current_Frame_Depth: 0
  };
}

export function generateEmptySingleOrDoubleHungWindow(): SingleOrDoubleHungWindow {
  return {
    Window_Id: generateWindowId(),
    Window_Type: 'Single/Double Hung Window',
    Order_Position: 1,
    
    // Original input data
    original_measurements: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
    },
    original_vertical_splits: [],
    
    // Extension configuration
    extension: generateEmptyExtension(),
    
    // Calculated values (populated by calculation engine)
    calculated_measurements: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      transformation_applied: false,
      transformation_type: null
    },
    calculated_vertical_splits: [],
    effective_dimensions: {
      width: 0,
      height: 0
    },
    frame_pieces: {
      topPiece: {
        length: 0,
        material_side: 'top',
        material_type: 'pvc_1x2',
        thickness: MATERIAL_THICKNESS['pvc_1x2'],
        description: 'Top frame piece'
      },
      bottomPiece: {
        length: 0,
        material_side: 'bottom',
        material_type: 'pvc_1x2',
        thickness: MATERIAL_THICKNESS['pvc_1x2'],
        description: 'Bottom frame piece'
      },
      leftPiece: {
        length: 0,
        material_side: 'left',
        material_type: 'pvc_1x2',
        thickness: MATERIAL_THICKNESS['pvc_1x2'],
        description: 'Left frame piece'
      },
      rightPiece: {
        length: 0,
        material_side: 'right',
        material_type: 'pvc_1x2',
        thickness: MATERIAL_THICKNESS['pvc_1x2'],
        description: 'Right frame piece'
      }
    },
    cut_list: [],
    thickness_vector: {
      top: 0,
      left: 0,
      bottom: 0,
      right: 0
    },
    calculation_summary: {
      extension_applied: false,
      extension_type: null,
      configuration_used: null,
      transformation_applied: false,
      calculation_timestamp: null,
      splits_recalculated: false
    }
  };
}

// ===================================================================
// 5. CALCULATION LOGIC SPECIFICATION (CORRECTED)
// ===================================================================

export interface CalculationEngine {
  calculateExtensionResults(
    originalMeasurements: WindowMeasurements,
    originalSplits: VerticalSplit[],
    extensionConfig: ExtensionConfig
  ): {
    workingMeasurements: WindowMeasurements;
    calculatedSplits: VerticalSplit[];
    effectiveDimensions: { width: number; height: number };
    framePieces: Record<string, FramePiece>;
    cutList: CutListItem[];
    thicknessVector: Record<string, number>;
    calculationSummary: any;
  };
}

// CORRECTED CALCULATION STEPS based on image analysis
export const CALCULATION_STEPS = {
  // Step 1: Measurement Transformation (Interior vs Exterior)
  step1_measurement_transformation: {
    interior: "Use original measurements as-is (BASE CASE)",
    exterior: "Add 2*thickness to each dimension (TRANSFORMATION)",
    formulas: {
      interior: {
        top: "original.top",
        bottom: "original.bottom", 
        left: "original.left",
        right: "original.right"
      },
      exterior: {
        top: "original.top + (2 * thickness.top)",
        bottom: "original.bottom + (2 * thickness.bottom)",
        left: "original.left + (2 * thickness.left)", 
        right: "original.right + (2 * thickness.right)"
      }
    }
  },
  
  // Step 2: Frame Piece Calculation (Configuration-Based)
  step2_frame_pieces: {
    input: "workingMeasurements from step1",
    logic: "Independent of interior/exterior - just how pieces fit together",
    configurations: {
      "full-top": {
        topPiece: "working.top (full width)",
        bottomPiece: "working.bottom - (thickness.left + thickness.right)",
        leftPiece: "working.left - thickness.top", 
        rightPiece: "working.right - thickness.top"
      },
      "full-top-bottom": {
        topPiece: "working.top (full width)",
        bottomPiece: "working.bottom (full width)",
        leftPiece: "working.left - (thickness.top + thickness.bottom)",
        rightPiece: "working.right - (thickness.top + thickness.bottom)"
      },
      "full-sides": {
        topPiece: "working.top - (thickness.left + thickness.right)",
        bottomPiece: "working.bottom - (thickness.left + thickness.right)",
        leftPiece: "working.left (full height)",
        rightPiece: "working.right (full height)"
      },
      "full-bottom": {
        topPiece: "working.top - (thickness.left + thickness.right)",
        bottomPiece: "working.bottom (full width)",
        leftPiece: "working.left - thickness.bottom",
        rightPiece: "working.right - thickness.bottom"
      }
    }
  },
  
  // Step 3: Effective Dimensions Calculation  
  step3_effective_dimensions: {
    purpose: "Final internal opening after frame installation",
    formula: {
      effectiveWidth: "working.top - (thickness.left + thickness.right)",
      effectiveHeight: "working.left - (thickness.top + thickness.bottom)"
    }
  },
  
  // Step 4: Split Position Recalculation (CORRECTED BASED ON IMAGE)
  step4_split_recalculation: {
    CRITICAL_CORRECTION: "Image shows INTERIOR changes splits, EXTERIOR keeps them same",
    
    // Directional split calculation logic
    directional_logic: {
      vertical_splits: {
        "left-to-right": {
          description: "Position measured from LEFT edge",
          interior_adjustment: "position -= thickness.left",
          exterior_adjustment: "position unchanged"
        },
        "right-to-left": {
          description: "Position measured from RIGHT edge", 
          interior_adjustment: "position -= thickness.right",
          exterior_adjustment: "position unchanged",
          note: "Must convert to left-reference for consistent output"
        }
      },
      horizontal_splits: {
        "top-to-bottom": {
          description: "Position measured from TOP edge",
          interior_adjustment: "position -= thickness.top",
          exterior_adjustment: "position unchanged"
        },
        "bottom-to-top": {
          description: "Position measured from BOTTOM edge",
          interior_adjustment: "position -= thickness.bottom", 
          exterior_adjustment: "position unchanged",
          note: "Must convert to top-reference for consistent output"
        }
      }
    },
    
    // Calculation algorithm
    calculation_steps: {
      step1: "Store original position and direction for tracking",
      step2: "Apply directional adjustment based on interior/exterior type",
      step3: "Convert all positions to left-reference (vertical) or top-reference (horizontal)",
      step4: "Update position while preserving original_position for audit trail"
    },
    
    // Conversion formulas for consistent output
    position_conversion: {
      vertical_to_left_reference: {
        "left-to-right": "position (already left-reference)",
        "right-to-left": "windowWidth - position (convert to left-reference)"
      },
      horizontal_to_top_reference: {
        "top-to-bottom": "position (already top-reference)", 
        "bottom-to-top": "windowHeight - position (convert to top-reference)"
      }
    },
    
    explanation: {
      interior_logic: "Frame takes up space INSIDE opening, so splits move inward by thickness",
      exterior_logic: "Frame extends BEYOND opening, splits stay at original positions",
      bidirectional_example: {
        scenario: "Window 100″ wide, split at [20, 80], thickness.left=1, thickness.right=1",
        left_to_right_20: "20″ from left → Interior: 19″, Exterior: 20″",
        right_to_left_20: "20″ from right (=80″ from left) → Interior: 79″, Exterior: 80″",
        output_format: "Always convert to left-reference: [19, 79] or [20, 80]"
      }
    },
    
    notation: "[20, 80] means splits at 20″ and 80″ from LEFT edge (standardized output)"
  }
};

// ===================================================================
// 6. ORDER FORM INTEGRATION FLOW
// ===================================================================

export interface OrderFormFlow {
  // Step 1: Basic Window Input
  step1_basic_measurements: {
    user_inputs: ['top', 'bottom', 'left', 'right'];
    validation: 'all_positive_numbers';
    storage: 'original_measurements';
  };
  
  // Step 2: Split Configuration
  step2_split_configuration: {
    user_inputs: 'vertical_splits_with_nested_horizontal';
    validation: 'positions_within_window_bounds';
    storage: 'original_vertical_splits';
  };
  
  // Step 3: Extension Decision Point
  step3_extension_decision: {
    question: "Do you want an extension for this window?";
    options: ['Yes', 'No'];
    if_no: 'proceed_to_step6_save';
    if_yes: 'proceed_to_step4';
  };
  
  // Step 4: Extension Type Selection
  step4_extension_type: {
    question: "Interior or Exterior extension?";
    options: ['interior', 'exterior'];
    explanation: {
      interior: "Frame goes inside window opening (splits adjust inward)";
      exterior: "Frame extends beyond window opening (splits stay same)";
    };
  };
  
  // Step 5: Material & Configuration Selection
  step5_materials_and_config: {
    material_selection: {
      for_each_side: ['Top', 'Left', 'Bottom', 'Right'];
      options: 'MATERIAL_THICKNESS keys';
      show_thickness: true;
    };
    configuration_selection: {
      options: 'EXTENSION_CONFIGURATIONS keys';
      show_descriptions: true;
    };
    optional_fields: ['Current_Frame_Depth', 'Support_Notes', 'General_Notes'];
  };
  
  // Step 6: Auto-Calculation & Review
  step6_calculation_and_review: {
    trigger: 'automatic_on_complete_config';
    calculations_performed: [
      'transform_measurements_if_exterior',
      'calculate_frame_pieces',
      'calculate_effective_dimensions', 
      'recalculate_split_positions',
      'generate_cut_list'
    ];
    display_results: {
      show_original_vs_calculated: true;
      show_split_adjustments: true;
      show_cut_list_preview: true;
      allow_edit_return: true;
    };
  };
  
  // Step 7: Database Save
  step7_save_to_database: {
    save_complete_window_object: true;
    update_order_totals: true;
    generate_calculation_timestamp: true;
  };
}

// ===================================================================
// 7. UI COMPONENT ARCHITECTURE
// ===================================================================

export interface UIComponentStructure {
  WindowForm: {
    BasicMeasurementsSection: {
      fields: ['top', 'bottom', 'left', 'right'];
      validation: 'real_time';
      storage: 'original_measurements';
    };
    
    SplitsSection: {
      component: 'VerticalSplitsArrayField';
      nested: 'HorizontalSplitsArrayField';
      storage: 'original_vertical_splits';
    };
    
    ExtensionSection: {
      component: 'ExtensionConfigField';
      conditional_display: 'based_on_extension_enabled';
      auto_calculation: 'on_config_complete';
      results_preview: 'real_time_updates';
    };
    
    CalculatedResultsSection: {
      display_only: true;
      sections: [
        'MeasurementComparison',
        'SplitAdjustments', 
        'CutListPreview',
        'EffectiveDimensions'
      ];
    };
  };
}

// ===================================================================
// 8. DATABASE SCHEMA CHANGES
// ===================================================================

export const DATABASE_VALIDATION = {
  extension_config: {
    required_when: "Extension = true",
    materials_validation: "all four sides must have valid material types",
    type_validation: "must be 'interior' or 'exterior'",
    configuration_validation: "must be valid configuration key"
  },
  calculated_fields: {
    auto_populated: true,
    read_only: true,
    recalculate_trigger: "extension_config changes"
  },
  original_vs_calculated: {
    preservation: "original measurements never modified",
    tracking: "all transformations logged in calculation_summary"
  }
};

// ===================================================================
// 9. FORM FIELD METADATA FOR DYNAMIC FORMS
// ===================================================================

export const singleOrDoubleHungWindowMeta = {
  Window_Id: {
    'type': 'string',
    'label': "Window ID", 
    'omit': true // Auto-generated
  },
  Window_Type: {
    'type': 'string',
    'label': "Window Type", 
    'omit': true // Fixed value
  },
  Order_Position: {
    'type': 'integer',
    'label': "Position in Order", 
    'omit': false
  },
  
  // Original input data section
  original_measurements: {
    'type': 'nested_object',
    'label': "Window Measurements",
    'omit': false,
    'fields': {
      top: {
        'type': 'number_inches', 
        'label': "Top Width (inches)", 
        'omit': false
      },
      bottom: {
        'type': 'number_inches', 
        'label': "Bottom Width (inches)", 
        'omit': false
      },
      left: {
        'type': 'number_inches', 
        'label': "Left Height (inches)", 
        'omit': false
      },
      right: {
        'type': 'number_inches', 
        'label': "Right Height (inches)", 
        'omit': false
      }
    }
  },
  
  original_vertical_splits: {
    'type': 'vertical_splits_array',
    'label': "Vertical Splits",
    'omit': false
  },
  
  // Extension configuration
  extension: {
    'type': 'extension_config',
    'label': "Extension Configuration",
    'omit': false
  },
  
  // Calculated fields (hidden from form)
  calculated_measurements: {
    'type': 'nested_object',
    'label': "Calculated Measurements",
    'omit': true // Hidden from form, calculated automatically
  },
  calculated_vertical_splits: {
    'type': 'vertical_splits_array',
    'label': "Calculated Splits",
    'omit': true // Hidden from form, calculated automatically
  },
  effective_dimensions: {
    'type': 'nested_object',
    'label': "Effective Dimensions",
    'omit': true // Hidden from form, calculated automatically
  },
  frame_pieces: {
    'type': 'nested_object',
    'label': "Frame Pieces",
    'omit': true // Hidden from form, calculated automatically
  },
  cut_list: {
    'type': 'array',
    'label': "Cut List",
    'omit': true // Hidden from form, calculated automatically
  },
  thickness_vector: {
    'type': 'nested_object',
    'label': "Thickness Vector",
    'omit': true // Hidden from form, calculated automatically
  },
  calculation_summary: {
    'type': 'nested_object',
    'label': "Calculation Summary",
    'omit': true // Hidden from form, calculated automatically
  }
};

// ===================================================================
// 10. VALIDATION FUNCTIONS
// ===================================================================

export function validateWindowMeasurements(measurements: WindowMeasurements): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (!measurements.top || measurements.top <= 0) {
    errors.push('Top measurement must be greater than 0');
  }
  if (!measurements.bottom || measurements.bottom <= 0) {
    errors.push('Bottom measurement must be greater than 0');
  }
  if (!measurements.left || measurements.left <= 0) {
    errors.push('Left measurement must be greater than 0');
  }
  if (!measurements.right || measurements.right <= 0) {
    errors.push('Right measurement must be greater than 0');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

export function validateExtensionConfig(config: ExtensionConfig): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (config.Extension) {
    // Validate materials
    const validMaterials = Object.keys(MATERIAL_THICKNESS) as MaterialType[];
    if (!validMaterials.includes(config.Materials.Top)) {
      errors.push(`Invalid top material: ${config.Materials.Top}`);
    }
    if (!validMaterials.includes(config.Materials.Left)) {
      errors.push(`Invalid left material: ${config.Materials.Left}`);
    }
    if (!validMaterials.includes(config.Materials.Bottom)) {
      errors.push(`Invalid bottom material: ${config.Materials.Bottom}`);
    }
    if (!validMaterials.includes(config.Materials.Right)) {
      errors.push(`Invalid right material: ${config.Materials.Right}`);
    }
    
    // Validate configuration type
    const validConfigs = Object.keys(EXTENSION_CONFIGURATIONS) as ExtensionConfigurationType[];
    if (!validConfigs.includes(config.Configuration)) {
      errors.push(`Invalid configuration: ${config.Configuration}`);
    }
    
    // Validate extension type
    if (!['interior', 'exterior'].includes(config.Type)) {
      errors.push(`Invalid extension type: ${config.Type}`);
    }
    
    // Validate frame depth
    if (config.Current_Frame_Depth < 0) {
      errors.push('Current frame depth cannot be negative');
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

export function validateVerticalSplits(splits: VerticalSplit[], windowWidth: number): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  splits.forEach((split, index) => {
    if (split.position <= 0 || split.position >= windowWidth) {
      errors.push(`Split ${index + 1}: Position must be between 0 and ${windowWidth}`);
    }
    
    if (!['left-to-right', 'right-to-left'].includes(split.direction)) {
      errors.push(`Split ${index + 1}: Invalid direction ${split.direction}`);
    }
    
    // Validate horizontal splits
    split.horizontal_splits.forEach((hSplit, hIndex) => {
      if (!['top-to-bottom', 'bottom-to-top'].includes(hSplit.direction)) {
        errors.push(`Split ${index + 1}, Horizontal ${hIndex + 1}: Invalid direction ${hSplit.direction}`);
      }
    });
  });
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

// ===================================================================
// 11. CALCULATION ENGINE IMPLEMENTATION
// ===================================================================

export function calculateThicknessVector(extensionConfig: ExtensionConfig): Record<string, number> {
  if (!extensionConfig.Extension) {
    return { top: 0, left: 0, bottom: 0, right: 0 };
  }
  
  return {
    top: MATERIAL_THICKNESS[extensionConfig.Materials.Top],
    left: MATERIAL_THICKNESS[extensionConfig.Materials.Left],
    bottom: MATERIAL_THICKNESS[extensionConfig.Materials.Bottom],
    right: MATERIAL_THICKNESS[extensionConfig.Materials.Right]
  };
}

export function calculateWorkingMeasurements(
  originalMeasurements: WindowMeasurements,
  extensionConfig: ExtensionConfig,
  thicknessVector: Record<string, number>
): CalculatedMeasurements {
  if (!extensionConfig.Extension) {
    return {
      ...originalMeasurements,
      transformation_applied: false,
      transformation_type: null
    };
  }
  
  if (extensionConfig.Type === 'interior') {
    // For interior extensions, panel dimensions remain the same as original measurements
    // The extension frame goes around the existing opening, not changing panel size
    return {
      top: originalMeasurements.top,
      bottom: originalMeasurements.bottom,
      left: originalMeasurements.left,
      right: originalMeasurements.right,
      transformation_applied: false,
      transformation_type: 'interior'
    };
  } else {
    return {
      top: originalMeasurements.top + (2 * thicknessVector.top),
      bottom: originalMeasurements.bottom + (2 * thicknessVector.bottom),
      left: originalMeasurements.left + (2 * thicknessVector.left),
      right: originalMeasurements.right + (2 * thicknessVector.right),
      transformation_applied: true,
      transformation_type: 'exterior'
    };
  }
}

export function calculateFramePieces(
  workingMeasurements: CalculatedMeasurements,
  extensionConfig: ExtensionConfig,
  thicknessVector: Record<string, number>
): Record<string, FramePiece> {
  if (!extensionConfig.Extension) {
    return {
      topPiece: { length: 0, material_side: 'top', material_type: 'pvc_1x2', thickness: 0, description: 'No extension' },
      bottomPiece: { length: 0, material_side: 'bottom', material_type: 'pvc_1x2', thickness: 0, description: 'No extension' },
      leftPiece: { length: 0, material_side: 'left', material_type: 'pvc_1x2', thickness: 0, description: 'No extension' },
      rightPiece: { length: 0, material_side: 'right', material_type: 'pvc_1x2', thickness: 0, description: 'No extension' }
    };
  }
  
  const config = extensionConfig.Configuration;
  
  switch (config) {
    case 'full-top':
      return {
        topPiece: {
          length: workingMeasurements.top,
          material_side: 'top',
          material_type: extensionConfig.Materials.Top,
          thickness: thicknessVector.top,
          description: 'Top piece spans full width'
        },
        bottomPiece: {
          length: workingMeasurements.bottom - (thicknessVector.left + thicknessVector.right),
          material_side: 'bottom',
          material_type: extensionConfig.Materials.Bottom,
          thickness: thicknessVector.bottom,
          description: 'Bottom piece between sides'
        },
        leftPiece: {
          length: workingMeasurements.left - thicknessVector.top,
          material_side: 'left',
          material_type: extensionConfig.Materials.Left,
          thickness: thicknessVector.left,
          description: 'Left piece below top'
        },
        rightPiece: {
          length: workingMeasurements.right - thicknessVector.top,
          material_side: 'right',
          material_type: extensionConfig.Materials.Right,
          thickness: thicknessVector.right,
          description: 'Right piece below top'
        }
      };
    
    case 'full-top-bottom':
      return {
        topPiece: {
          length: workingMeasurements.top,
          material_side: 'top',
          material_type: extensionConfig.Materials.Top,
          thickness: thicknessVector.top,
          description: 'Top piece spans full width'
        },
        bottomPiece: {
          length: workingMeasurements.bottom,
          material_side: 'bottom',
          material_type: extensionConfig.Materials.Bottom,
          thickness: thicknessVector.bottom,
          description: 'Bottom piece spans full width'
        },
        leftPiece: {
          length: workingMeasurements.left - (thicknessVector.top + thicknessVector.bottom),
          material_side: 'left',
          material_type: extensionConfig.Materials.Left,
          thickness: thicknessVector.left,
          description: 'Left piece between top and bottom'
        },
        rightPiece: {
          length: workingMeasurements.right - (thicknessVector.top + thicknessVector.bottom),
          material_side: 'right',
          material_type: extensionConfig.Materials.Right,
          thickness: thicknessVector.right,
          description: 'Right piece between top and bottom'
        }
      };
    
    case 'full-sides':
      return {
        topPiece: {
          length: workingMeasurements.top - (thicknessVector.left + thicknessVector.right),
          material_side: 'top',
          material_type: extensionConfig.Materials.Top,
          thickness: thicknessVector.top,
          description: 'Top piece between sides'
        },
        bottomPiece: {
          length: workingMeasurements.bottom - (thicknessVector.left + thicknessVector.right),
          material_side: 'bottom',
          material_type: extensionConfig.Materials.Bottom,
          thickness: thicknessVector.bottom,
          description: 'Bottom piece between sides'
        },
        leftPiece: {
          length: workingMeasurements.left,
          material_side: 'left',
          material_type: extensionConfig.Materials.Left,
          thickness: thicknessVector.left,
          description: 'Left piece spans full height'
        },
        rightPiece: {
          length: workingMeasurements.right,
          material_side: 'right',
          material_type: extensionConfig.Materials.Right,
          thickness: thicknessVector.right,
          description: 'Right piece spans full height'
        }
      };
    
    case 'full-bottom':
      return {
        topPiece: {
          length: workingMeasurements.top - (thicknessVector.left + thicknessVector.right),
          material_side: 'top',
          material_type: extensionConfig.Materials.Top,
          thickness: thicknessVector.top,
          description: 'Top piece between sides'
        },
        bottomPiece: {
          length: workingMeasurements.bottom,
          material_side: 'bottom',
          material_type: extensionConfig.Materials.Bottom,
          thickness: thicknessVector.bottom,
          description: 'Bottom piece spans full width'
        },
        leftPiece: {
          length: workingMeasurements.left - thicknessVector.bottom,
          material_side: 'left',
          material_type: extensionConfig.Materials.Left,
          thickness: thicknessVector.left,
          description: 'Left piece above bottom'
        },
        rightPiece: {
          length: workingMeasurements.right - thicknessVector.bottom,
          material_side: 'right',
          material_type: extensionConfig.Materials.Right,
          thickness: thicknessVector.right,
          description: 'Right piece above bottom'
        }
      };
    
    default:
      throw new Error(`Unknown configuration: ${config}`);
  }
}

export function calculateEffectiveDimensions(
  workingMeasurements: CalculatedMeasurements,
  thicknessVector: Record<string, number>
): { width: number; height: number } {
  return {
    width: workingMeasurements.top - (thicknessVector.left + thicknessVector.right),
    height: workingMeasurements.left - (thicknessVector.top + thicknessVector.bottom)
  };
}

export function calculateAdjustedSplits(
  originalSplits: VerticalSplit[],
  extensionConfig: ExtensionConfig,
  thicknessVector: Record<string, number>,
  workingMeasurements: CalculatedMeasurements
): VerticalSplit[] {
  if (!extensionConfig.Extension) {
    return originalSplits;
  }
  
  return originalSplits.map(split => {
    const adjustedSplit: VerticalSplit = {
      ...split,
      original_position: split.position,
      position_adjustment: 0
    };
    
    // Apply directional adjustment based on interior/exterior type
    if (extensionConfig.Type === 'interior') {
      if (split.direction === 'left-to-right') {
        adjustedSplit.position = split.position - thicknessVector.left;
        adjustedSplit.position_adjustment = -thicknessVector.left;
      } else { // right-to-left
        // Convert to left-reference first, then adjust
        const leftReference = workingMeasurements.top - split.position;
        adjustedSplit.position = leftReference - thicknessVector.right;
        adjustedSplit.position_adjustment = -thicknessVector.right;
        adjustedSplit.direction = 'left-to-right'; // Standardize to left-reference
      }
    } else { // exterior
      if (split.direction === 'right-to-left') {
        // Convert to left-reference for consistent output
        adjustedSplit.position = workingMeasurements.top - split.position;
        adjustedSplit.direction = 'left-to-right';
      }
      // No position adjustment for exterior
    }
    
    // Adjust horizontal splits
    adjustedSplit.horizontal_splits = split.horizontal_splits.map(hSplit => {
      const adjustedHSplit: HorizontalSplit = {
        ...hSplit,
        original_position: hSplit.position,
        position_adjustment: 0
      };
      
      if (extensionConfig.Type === 'interior') {
        if (hSplit.direction === 'top-to-bottom') {
          adjustedHSplit.position = hSplit.position - thicknessVector.top;
          adjustedHSplit.position_adjustment = -thicknessVector.top;
        } else { // bottom-to-top
          const topReference = workingMeasurements.left - hSplit.position;
          adjustedHSplit.position = topReference - thicknessVector.bottom;
          adjustedHSplit.position_adjustment = -thicknessVector.bottom;
          adjustedHSplit.direction = 'top-to-bottom';
        }
      } else { // exterior
        if (hSplit.direction === 'bottom-to-top') {
          adjustedHSplit.position = workingMeasurements.left - hSplit.position;
          adjustedHSplit.direction = 'top-to-bottom';
        }
      }
      
      return adjustedHSplit;
    });
    
    return adjustedSplit;
  });
}

export function generateCutList(
  framePieces: Record<string, FramePiece>,
  extensionConfig: ExtensionConfig
): CutListItem[] {
  if (!extensionConfig.Extension) {
    return [];
  }
  
  const cutList: CutListItem[] = [];
  
  Object.entries(framePieces).forEach(([key, piece]) => {
    if (piece.length > 0) {
      cutList.push({
        piece_name: `${piece.material_side.toUpperCase()}_PIECE`,
        description: piece.description,
        length: piece.length,
        material_type: piece.material_type,
        thickness: piece.thickness,
        quantity: 1,
        side: piece.material_side,
        notes: `${extensionConfig.Configuration} configuration`
      });
    }
  });
  
  return cutList;
}

// ===================================================================
// 12. COMPLETE CALCULATION ENGINE
// ===================================================================

export function calculateExtensionResults(
  originalMeasurements: WindowMeasurements,
  originalSplits: VerticalSplit[],
  extensionConfig: ExtensionConfig
): {
  workingMeasurements: CalculatedMeasurements;
  calculatedSplits: VerticalSplit[];
  effectiveDimensions: { width: number; height: number };
  framePieces: Record<string, FramePiece>;
  cutList: CutListItem[];
  thicknessVector: Record<string, number>;
  calculationSummary: any;
} {
  // Validate inputs
  const measurementValidation = validateWindowMeasurements(originalMeasurements);
  if (!measurementValidation.isValid) {
    throw new Error(`Invalid measurements: ${measurementValidation.errors.join(', ')}`);
  }
  
  const extensionValidation = validateExtensionConfig(extensionConfig);
  if (!extensionValidation.isValid) {
    throw new Error(`Invalid extension config: ${extensionValidation.errors.join(', ')}`);
  }
  
  // Calculate thickness vector
  const thicknessVector = calculateThicknessVector(extensionConfig);
  
  // Calculate working measurements
  const workingMeasurements = calculateWorkingMeasurements(
    originalMeasurements,
    extensionConfig,
    thicknessVector
  );
  
  // Calculate frame pieces
  const framePieces = calculateFramePieces(
    workingMeasurements,
    extensionConfig,
    thicknessVector
  );
  
  // Calculate effective dimensions
  const effectiveDimensions = calculateEffectiveDimensions(
    workingMeasurements,
    thicknessVector
  );
  
  // Calculate adjusted splits
  const calculatedSplits = calculateAdjustedSplits(
    originalSplits,
    extensionConfig,
    thicknessVector,
    workingMeasurements
  );
  
  // Generate cut list
  const cutList = generateCutList(framePieces, extensionConfig);
  
  // Create calculation summary
  const calculationSummary = {
    extension_applied: extensionConfig.Extension,
    extension_type: extensionConfig.Extension ? extensionConfig.Type : null,
    configuration_used: extensionConfig.Extension ? extensionConfig.Configuration : null,
    transformation_applied: workingMeasurements.transformation_applied,
    calculation_timestamp: new Date(),
    splits_recalculated: originalSplits.length > 0
  };
  
  return {
    workingMeasurements,
    calculatedSplits,
    effectiveDimensions,
    framePieces,
    cutList,
    thicknessVector,
    calculationSummary
  };
}

// ===================================================================
// 13. EXPORTS
// ===================================================================

export default {
  // Core functions
  generateEmptySingleOrDoubleHungWindow,
  generateEmptyExtension,
  generateWindowId,
  
  // Validation functions
  validateWindowMeasurements,
  validateExtensionConfig,
  validateVerticalSplits,
  
  // Calculation functions
  calculateThicknessVector,
  calculateWorkingMeasurements,
  calculateFramePieces,
  calculateEffectiveDimensions,
  calculateAdjustedSplits,
  generateCutList,
  calculateExtensionResults,
  
  // Constants and metadata
  singleOrDoubleHungWindowMeta,
  MATERIAL_THICKNESS,
  EXTENSION_CONFIGURATIONS,
  EXTENSION_TYPES,
  CALCULATION_STEPS,
  DATABASE_VALIDATION
};
