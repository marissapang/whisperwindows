import { customAlphabet } from 'nanoid';
import { 
  generateEmptyExtension,
  calculateExtensionResults,
  type ExtensionConfig,
  type VerticalSplit,
  type HorizontalSplit,
  type WindowMeasurements,
  type CalculatedMeasurements,
  type FramePiece,
  type CutListItem,
  MATERIAL_THICKNESS
} from './comprehensiveExtensionSchema';

// helper functions
function generateWindowId(n=6){
	const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
	const window_id = customAlphabet(alphabet, 6)()
	console.log(`inside genWindowID: window id is ${window_id}`)
	return window_id; 
}

export function generateSplitId(n=6){
	const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
	const split_id = customAlphabet(alphabet, 6)()
	return split_id; 
}

// Re-export types from comprehensive schema
export type { ExtensionConfig, VerticalSplit, HorizontalSplit, WindowMeasurements, CalculatedMeasurements, FramePiece, CutListItem };

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
		configuration_used: string | null;
		transformation_applied: boolean;
		calculation_timestamp: Date | null;
		splits_recalculated: boolean;
	};
}

function generateEmptySingleOrDoubleHungWindow(): SingleOrDoubleHungWindow {
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

// Function to calculate and update window with extension results
export function calculateAndUpdateWindow(window: SingleOrDoubleHungWindow): SingleOrDoubleHungWindow {
	try {
		const results = calculateExtensionResults(
			window.original_measurements,
			window.original_vertical_splits,
			window.extension
		);
		
		return {
			...window,
			calculated_measurements: results.workingMeasurements,
			calculated_vertical_splits: results.calculatedSplits,
			effective_dimensions: results.effectiveDimensions,
			frame_pieces: {
				topPiece: results.framePieces.topPiece,
				bottomPiece: results.framePieces.bottomPiece,
				leftPiece: results.framePieces.leftPiece,
				rightPiece: results.framePieces.rightPiece
			},
			cut_list: results.cutList,
			thickness_vector: {
				top: results.thicknessVector.top,
				left: results.thicknessVector.left,
				bottom: results.thicknessVector.bottom,
				right: results.thicknessVector.right
			},
			calculation_summary: results.calculationSummary
		};
	} catch (error) {
		console.error('Extension calculation failed:', error);
		return window; // Return original window if calculation fails
	}
}

const singleOrDoubleHungWindowMeta = {
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
	
	// Original measurements - direct fields for form input
	'original_measurements.top': {
		'type': 'number_inches', 
		'label': "Top Width (inches)", 
		'omit': false
	},
	'original_measurements.bottom': {
		'type': 'number_inches', 
		'label': "Bottom Width (inches)", 
		'omit': false
	},
	'original_measurements.left': {
		'type': 'number_inches', 
		'label': "Left Height (inches)", 
		'omit': false
	},
	'original_measurements.right': {
		'type': 'number_inches', 
		'label': "Right Height (inches)", 
		'omit': false
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
}

export const createSingleOrDoubleHungWindow = () => generateEmptySingleOrDoubleHungWindow();

export { singleOrDoubleHungWindowMeta };
