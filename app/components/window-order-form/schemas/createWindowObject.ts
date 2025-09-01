import { customAlphabet } from 'nanoid';
import { 
  generateEmptyExtension,
  calculateExtensionResults,
  generateHorizontalSubsections,
  calculateAdjustedHorizontalSubsections,
  type ExtensionConfig,
  type VerticalSplit,
  type HorizontalSplit,
  // type HorizontalSplitSubsection,
  type FourSidedMeasurements,
  createEmptyFourSidedMeasurements,
  type CalculatedMeasurements,
  type FramePiece,
  type CutListItem,
  MATERIAL_THICKNESS
} from './comprehensiveExtensionSchema';


// Re-export types from comprehensive schema
export type { ExtensionConfig, VerticalSplit, HorizontalSplit, FourSidedMeasurements, CalculatedMeasurements, FramePiece, CutListItem };

export type WindowConfig =
  | { kind: 'Single Window'; pieces: 1 }
  | { kind: '2Pc Side-by-Side'; pieces: 2 }
  | { kind: '3Pc Side-by-Side'; pieces: 3 }
  | { kind: 'Multi-Pc Side by Side'; pieces: number }; // n >= 1

export const getWindowConfigPieceCount = (config: WindowConfig) => config.pieces;

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

export function createBlankWindowObject(): WindowObject {
	return {
		Window_Name: '',
		Window_Configuration: '',
		Order_Position: 1,
		
		// Original input data
		Window_Four_Sided_Measurements: createEmptyFourSidedMeasurements(),
		Window_Vertical_Splits: [],
	
		// Horizontal splits by subsection
		Window_Subsection_Horizontal_Splits: [],
		vertical_splits_saved: false,
		
		// Extension configuration
		extension: generateEmptyExtension(),
		
	};
}


