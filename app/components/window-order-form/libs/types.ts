// Window measurements interface
export interface FourSidedMeasurements {
  top: number | null;     // Width measurement at top
  bottom: number | null;  // Width measurement at bottom
  left: number | null;    // Height measurement on left
  right: number  | null;   // Height measurement on right
}

export type WindowConfig =
  | { kind: 'Single Window'; pieces: 1 }
  | { kind: '2Pc Side-by-Side'; pieces: 2 }
  | { kind: '3Pc Side-by-Side'; pieces: 3 }
  | { kind: 'Multi-Pc Side by Side'; pieces: number }; // n >= 1

// Split system interfaces
export interface VerticalSplit {
  position: number;                           // Position in inches from LEFT edge
  direction: 'left-to-right' | 'right-to-left';
  // // Calculation tracking
  // original_position?: number;
  // position_adjustment?: number;
}

export interface WindowObject {
	Window_Name: string;
	Window_Configuration: WindowConfig;
	Order_Position: number;
	
	// === ORIGINAL INPUT DATA (Not modified by calculations) ===
	Window_Four_Sided_Measurements: FourSidedMeasurements;
	Window_Vertical_Splits: VerticalSplit[];
	
	// === HORIZONTAL SPLITS BY SUBSECTION ===
	Window_Subsection_Horizontal_Splits: HorizontalSplit[];
	vertical_splits_saved: boolean; // Tracks if vertical splits have been saved to enable horizontal input
	
	extension: ExtensionConfig;
}




export interface HorizontalSplit {
  position: number;                           // Position in inches from TOP edge
  direction: 'bottom-to-top' | 'top-to-bottom';
  // // Calculation tracking
  // original_position?: number;
  // position_adjustment?: number;
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
