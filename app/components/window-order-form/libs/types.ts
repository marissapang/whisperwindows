// Window measurements interface
export interface FourSidedMeasurements {
  top: number | null;     // Width measurement at top
  bottom: number | null;  // Width measurement at bottom
  left: number | null;    // Height measurement on left
  right: number  | null;   // Height measurement on right
}

export type HorizontalConfigOptions =
  | { kind: 'Single Window'; pieces: 1 }
  | { kind: '2Pc Side-by-Side'; pieces: 2 }
  | { kind: '3Pc Side-by-Side'; pieces: 3 }
  | { kind: 'Multi-Pc Side by Side'; pieces: number }; // n >= 1

export type VerticalConfigOptions = 
  | { kind: 'Single Piece'; pieces: 1}
  | { kind: 'Up-Down'; pieces: 2}
  | { kind: 'Up-Middle-Down'; pieces: 3}


// Split system interfaces
export interface VerticalSplit {
  position: number;                           // Position in inches from LEFT edge
  direction: 'left-to-right' | 'right-to-left';
}

export interface HorizontalSplit {
  position: number;                           // Position in inches from BOTTOM edge
  direction: 'bottom-to-top' | 'top-to-bottom';
}

export interface ConfigSplits {
  config: HorizontalConfigOptions;        // decides n panes
  vertical_splits: VerticalSplit[];       // length n - 1
  vertical_configs: VerticalConfigOptions[]; // length n (one per pane)
  horizontal_splits: HorizontalSplit[][]; // outer length n; inner length (per pane) = vertical_configs[i].pieces - 1
}

export interface WindowObject {
	Window_Name: string;
	Window_Configuration: string;
	Order_Position: number;
	
	// === ORIGINAL INPUT DATA (Not modified by calculations) ===
	Window_Four_Sided_Measurements: FourSidedMeasurements;
	Window_Config_Dependent_Measurements: ConfigSplits;
  Panel_Configs: string;
  Panel_Config_Dependent_Parameters: ConfigSplits;
	
  Window_Extension?: ExtensionConfigModel | null;
  Panel_Frame_Config?: PanelFrameConfig | null;
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

// --- New shared material id and spec (optional if you already have a catalog elsewhere) ---
export type MaterialId =
  | 'primed_pine1x2'
  | 'primed_pine1x6'
  | 'primed_pine1x8'
  | 'primed_pine1x10'
  | 'primed_pine1x12'
  | 'pvc_1x2'
  | 'wood_2x2'
  | 'composite_2x1_pvc'
  | 'composite_u_channel';

export interface MaterialSpec {
  id: MaterialId;
  label: string;
  width: number;     // face width / effective frame thickness (in)
  thickness: number; // secondary dimension (in)
  depth?: number;
  components?: MaterialId[];
}

// --- Feature 1: Extension + Padding + Panel Frame ---
export type MountSide = 'interior' | 'exterior';

export interface SidePadding {
  material: MaterialId;
  amount: number; // inches to inset that side; if 0, use material width
}

export type ExtensionConfigurationType = 
  | 'full-top' 
  | 'full-top-bottom' 
  | 'full-sides' 
  | 'full-bottom';

export interface ExtensionConfigModel {
  enabled: boolean;
  mount: MountSide;  // interior vs exterior
  materials: {
    top: MaterialId;
    left: MaterialId;
    bottom: MaterialId;
    right: MaterialId;
  };
  // override effective “width” per side if needed (inches)
  thicknessOverride?: {
    top?: number;
    left?: number;
    bottom?: number;
    right?: number;
  };
  // optional paddings per side
  paddings?: {
    top?: SidePadding;
    left?: SidePadding;
    bottom?: SidePadding;
    right?: SidePadding;
  };
}

export interface PanelFrameConfig {
  mount: MountSide;       // where the frame sits relative to its working box
  railMaterial: MaterialId;
  splitMaterial?: MaterialId; // for mullions if needed later
}

// // Frame piece and cut list interfaces
// export interface FramePiece {
//   length: number;
//   material_side: 'top' | 'left' | 'bottom' | 'right';
//   material_type: MaterialType;
//   thickness: number;
//   description: string;
// }

// export interface CutListItem {
//   piece_name: string;
//   description: string;
//   length: number;
//   material_type: MaterialType;
//   thickness: number;
//   quantity: number;
//   side: string;
//   notes: string;
// }

// // Material and configuration types
// export type MaterialType = 
//   | 'primed_pine1x2'
//   | 'primed_pine1x6' 
//   | 'primed_pine1x8'
//   | 'primed_pine1x10'
//   | 'primed_pine1x12'
//   | 'pvc_1x2'
//   | 'wood_2x2';


