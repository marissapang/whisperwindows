// Extension Schema - Active Code Only

// 1. Data Structures + Interfaces

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
export interface FourSidedValues {
  top: number;     // Width measurement at top
  bottom: number;  // Width measurement at bottom
  left: number;    // Height measurement on left
  right: number;   // Height measurement on right
}

export interface CalculatedMeasurements extends FourSidedValues {
  transformation_applied: boolean;
  transformation_type: 'interior' | 'exterior' | null;
}

// Split system interfaces
export interface VerticalSplit {
  position: number;                           // Position in inches from LEFT edge
  direction: 'left-to-right' | 'right-to-left';
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

// New interface for horizontal splits organized by window subsections
export interface HorizontalSplitSubsection {
  subsection_label: string;                   // "Left to Split 1", "Split 1 to Split 2", "Split 2 to Right"
  left_boundary: number;                      // Left boundary position (in left-to-right coordinates)
  right_boundary: number;                     // Right boundary position (in left-to-right coordinates)
  horizontal_splits: HorizontalSplit[];       // Horizontal splits within this subsection
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

// 2. Window Schema Interface

export interface SingleOrDoubleHungWindow {
  Window_Id: string;
  Window_Type: 'Single/Double Hung Window';
  Order_Position: number;
  
  original_measurements: FourSidedValues;
  original_vertical_splits: VerticalSplit[];
  original_horizontal_subsections: HorizontalSplitSubsection[];
  vertical_splits_saved: boolean;
  
  extension: ExtensionConfig;
  
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
  
  calculation_summary: {
    extension_applied: boolean;
    extension_type: 'interior' | 'exterior' | null;
    configuration_used: ExtensionConfigurationType | null;
    transformation_applied: boolean;
    calculation_timestamp: Date | null;
    splits_recalculated: boolean;
  };
}

// 3. Material Constants

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


// 4. Generation Functions

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

function generateWindowId(): string {
  return 'WIN_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
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
    
    // Horizontal splits by subsection
    original_horizontal_subsections: [],
    vertical_splits_saved: false,
    
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
    calculated_horizontal_subsections: [],
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

// 5. Validation Functions

export function validateWindowMeasurements(measurements: FourSidedValues): { isValid: boolean; errors: string[] } {
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
    
  });
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

// 6. Calculating Adjusted Measurements

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
  originalMeasurements: FourSidedValues,
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
    // Normalize original_position to left-to-right for consistent database storage
    let normalizedOriginalPosition = split.position;
    if (split.direction === 'right-to-left') {
      normalizedOriginalPosition = workingMeasurements.top - split.position;
    }
    
    const adjustedSplit: VerticalSplit = {
      ...split,
      original_position: normalizedOriginalPosition,
      position_adjustment: 0,
      direction: 'left-to-right' // Always store as left-to-right in database
    };
    
    if (extensionConfig.Type === 'interior') {
      if (split.direction === 'left-to-right') {
        adjustedSplit.position = split.position - thicknessVector.left;
        adjustedSplit.position_adjustment = -thicknessVector.left;
      } else { // right-to-left
        // Convert to left-reference first, then adjust
        const leftReference = workingMeasurements.top - split.position;
        adjustedSplit.position = leftReference - thicknessVector.right;
        adjustedSplit.position_adjustment = -thicknessVector.right;
      }
    } else { // exterior
      if (split.direction === 'right-to-left') {
        // Convert to left-reference for consistent output
        adjustedSplit.position = workingMeasurements.top - split.position;
      }
      // No position adjustment for exterior
    }
        
    return adjustedSplit;
  });
}

// Function to generate horizontal subsections from vertical splits
export function generateHorizontalSubsections(
  verticalSplits: VerticalSplit[],
  windowWidth?: number
): HorizontalSplitSubsection[] {
  if (!verticalSplits || verticalSplits.length === 0) {
    // No vertical splits (single subsection for entire window)
    return [{
      subsection_label: "Full Window",
      left_boundary: 0,
      right_boundary: windowWidth || 100, // 100 as default placeholder
      horizontal_splits: []
    }];
  }

  // Normalize all vertical splits to left-to-right reference and sort by position
  const sortedSplits = [...verticalSplits]
    .map((split, index) => {
      let normalizedPosition = split.position;
      if (split.direction === 'right-to-left') {
        if (windowWidth) {
          normalizedPosition = windowWidth - split.position;
        } else {
          // If no window width, we need to find the maximum position to normalize
          const maxPosition = Math.max(...verticalSplits.map(s => s.position));
          normalizedPosition = maxPosition - split.position;
        }
      }
      
      return {
        ...split,
        position: normalizedPosition,
        direction: 'left-to-right' as const, // Normalize direction for consistent processing
        originalIndex: index // Keep track of original order for labeling
      };
    })
    .sort((a, b) => {
      // First sort by position
      if (a.position !== b.position) {
        return a.position - b.position;
      }
      // If positions are equal, sort by original index to maintain consistent ordering
      return a.originalIndex - b.originalIndex;
    });

  const subsections: HorizontalSplitSubsection[] = [];
  
  // Create subsection from left edge to first split
  const firstSplitLabel = `Split ${sortedSplits[0].originalIndex + 1}`;
  subsections.push({
    subsection_label: `Left to ${firstSplitLabel}`,
    left_boundary: 0,
    right_boundary: sortedSplits[0].position,
    horizontal_splits: []
  });
  
  // Create subsections between splits
  for (let i = 0; i < sortedSplits.length - 1; i++) {
    const currentSplitLabel = `Split ${sortedSplits[i].originalIndex + 1}`;
    const nextSplitLabel = `Split ${sortedSplits[i + 1].originalIndex + 1}`;
    subsections.push({
      subsection_label: `${currentSplitLabel} to ${nextSplitLabel}`,
      left_boundary: sortedSplits[i].position,
      right_boundary: sortedSplits[i + 1].position,
      horizontal_splits: []
    });
  }
  
  // Create subsection from last split to right edge
  const rightEdge = windowWidth || (sortedSplits[sortedSplits.length - 1].position + 20);
  const lastSplitLabel = `Split ${sortedSplits[sortedSplits.length - 1].originalIndex + 1}`;
  subsections.push({
    subsection_label: `${lastSplitLabel} to Right`,
    left_boundary: sortedSplits[sortedSplits.length - 1].position,
    right_boundary: rightEdge,
    horizontal_splits: []
  });
  
  return subsections;
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

// 7. Complete Calculation Code

// Function to calculate adjusted horizontal splits within subsections
export function calculateAdjustedHorizontalSubsections(
  originalSubsections: HorizontalSplitSubsection[],
  extensionConfig: ExtensionConfig,
  thicknessVector: Record<string, number>,
  workingMeasurements: CalculatedMeasurements,
  calculatedVerticalSplits: VerticalSplit[]
): HorizontalSplitSubsection[] {
  if (!extensionConfig.Extension) {
    return originalSubsections;
  }

  // Create updated subsections with calculated vertical split boundaries
  const updatedSubsections = generateHorizontalSubsections(
    calculatedVerticalSplits,
    workingMeasurements.top
  );

  // Map original subsections to updated ones and adjust horizontal splits
  return originalSubsections.map((originalSubsection, index) => {
    const updatedSubsection = updatedSubsections[index] || originalSubsection;
    
    return {
      ...updatedSubsection, // Use updated boundaries from calculated vertical splits
      horizontal_splits: originalSubsection.horizontal_splits.map(split => {
        // Normalize to top-to-bottom reference first using window height (left measurement)
        let normalizedPosition = split.position;
        if (split.direction === 'bottom-to-top') {
          normalizedPosition = workingMeasurements.left - split.position;
        }

        const adjustedSplit: HorizontalSplit = {
          position: normalizedPosition,
          direction: 'top-to-bottom', // Always store as top-to-bottom in database
          original_position: split.position,
          position_adjustment: 0
        };

        // Apply directional adjustment based on interior/exterior type
        // For horizontal splits, use the top/bottom thickness adjustments
        if (extensionConfig.Type === 'interior') {
          adjustedSplit.position = normalizedPosition - thicknessVector.top;
          adjustedSplit.position_adjustment = -thicknessVector.top;
        }
        // For exterior extensions, no position adjustment needed - splits stay in same position

        return adjustedSplit;
      })
    };
  });
}

export function calculateExtensionResults(
  originalMeasurements: FourSidedValues,
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

// 8. Exports

export default {
  // Core functions
  generateEmptySingleOrDoubleHungWindow,
  generateEmptyExtension,
  
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
  calculateAdjustedHorizontalSubsections,
  generateCutList,
  calculateExtensionResults,
  generateHorizontalSubsections,
  
  // Constants
  MATERIAL_THICKNESS,
  EXTENSION_CONFIGURATIONS,
  EXTENSION_TYPES
};
