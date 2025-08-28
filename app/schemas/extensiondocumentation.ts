// ===================================================================
// EXTENSION SYSTEM DOCUMENTATION
// Complete documentation, specifications, and design patterns
// ===================================================================

// Import types from the main schema for type references
import type { 
  WindowMeasurements, 
  VerticalSplit, 
  ExtensionConfig, 
  CalculatedMeasurements,
  HorizontalSplitSubsection,
  FramePiece,
  CutListItem,
  ExtensionConfigurationType
} from './comprehensiveExtensionSchema';

// ===================================================================
// 1. ORDER FORM INTEGRATION FLOW SPECIFICATION
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
// 2. UI COMPONENT ARCHITECTURE SPECIFICATION
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
// 3. CALCULATION LOGIC SPECIFICATION (CORRECTED)
// ===================================================================

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
// 4. DATABASE SCHEMA VALIDATION RULES
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
    transformation_tracking: "all transformations logged in calculation_summary"
  }
};

// ===================================================================
// 5. FORM FIELD METADATA FOR DYNAMIC FORMS
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
  
  original_horizontal_subsections: {
    'type': 'horizontal_subsections_array',
    'label': "Horizontal Splits by Subsection",
    'omit': false
  },
  
  vertical_splits_saved: {
    'type': 'bool',
    'label': "Vertical Splits Saved",
    'omit': true 
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
    'omit': true 
  },
  calculated_vertical_splits: {
    'type': 'vertical_splits_array',
    'label': "Calculated Splits",
    'omit': true 
  },
  calculated_horizontal_subsections: {
    'type': 'horizontal_subsections_array',
    'label': "Calculated Horizontal Subsections",
    'omit': true 
  },
  effective_dimensions: {
    'type': 'nested_object',
    'label': "Effective Dimensions",
    'omit': true 
  },
  frame_pieces: {
    'type': 'nested_object',
    'label': "Frame Pieces",
    'omit': true 
  },
  cut_list: {
    'type': 'array',
    'label': "Cut List",
    'omit': true 
  },
  thickness_vector: {
    'type': 'nested_object',
    'label': "Thickness Vector",
    'omit': true 
  },
  calculation_summary: {
    'type': 'nested_object',
    'label': "Calculation Summary",
    'omit': true 
  }
};

// ===================================================================
// 6. CALCULATION ENGINE INTERFACE SPECIFICATION
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

// ===================================================================
// 7. COMPLETE WINDOW SCHEMA DOCUMENTATION
// ===================================================================

export interface SingleOrDoubleHungWindowDocumentation {
  // Core identification
  Window_Id: string;
  Window_Type: 'Single/Double Hung Window';
  Order_Position: number;
  
  // === ORIGINAL INPUT DATA (Never Modified) ===
  original_measurements: WindowMeasurements;
  original_vertical_splits: VerticalSplit[];
  
  // === HORIZONTAL SPLITS BY SUBSECTION ===
  original_horizontal_subsections: HorizontalSplitSubsection[];
  vertical_splits_saved: boolean; // Tracks if vertical splits have been saved to enable horizontal input
  
  // === EXTENSION CONFIGURATION ===
  extension: ExtensionConfig;
  
  // === CALCULATED VALUES (Auto-populated, Read-only in UI) ===
  calculated_measurements: CalculatedMeasurements;
  calculated_vertical_splits: VerticalSplit[];
  calculated_horizontal_subsections: HorizontalSplitSubsection[];
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
