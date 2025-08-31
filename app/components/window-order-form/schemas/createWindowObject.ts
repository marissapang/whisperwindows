import { customAlphabet } from 'nanoid';
import { 
  generateEmptyExtension,
  calculateExtensionResults,
  generateHorizontalSubsections,
  calculateAdjustedHorizontalSubsections,
  type ExtensionConfig,
  type VerticalSplit,
  type HorizontalSplit,
  type HorizontalSplitSubsection,
  type WindowMeasurements,
  type CalculatedMeasurements,
  type FramePiece,
  type CutListItem,
  MATERIAL_THICKNESS
} from './comprehensiveExtensionSchema';


// Re-export types from comprehensive schema
export type { ExtensionConfig, VerticalSplit, HorizontalSplit, WindowMeasurements, CalculatedMeasurements, FramePiece, CutListItem };


export interface WindowObject {
	Window_Name: string;
	Window_Configuration: string;
	Order_Position: number;
	
	// === ORIGINAL INPUT DATA (Never Modified) ===
	original_measurements: WindowMeasurements;
	original_vertical_splits: VerticalSplit[];
	
	// === HORIZONTAL SPLITS BY SUBSECTION ===
	original_horizontal_subsections: HorizontalSplitSubsection[];
	vertical_splits_saved: boolean; // Tracks if vertical splits have been saved to enable horizontal input
	
	extension: ExtensionConfig;
	
	// === CALCULATED VALUES ===
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
		configuration_used: string | null;
		transformation_applied: boolean;
		calculation_timestamp: Date | null;
		splits_recalculated: boolean;
	};
}

export function createBlankWindowObject(): WindowObject {
	return {
		Window_Name: '',
		Window_Configuration: '',
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

// Function to calculate and update window with extension results
export function calculateAndUpdateWindow(window: WindowObject): WindowObject {
	try {
		// Check if we have valid measurements for extension calculations
		// Access measurements using both dot notation and nested object notation
		const getmeasurement = (field: string) => {
			return (window as any)[`original_measurements.${field}`] || window.original_measurements?.[field] || 0;
		};
		
		const topMeasurement = getmeasurement('top');
		const bottomMeasurement = getmeasurement('bottom');
		const leftMeasurement = getmeasurement('left');
		const rightMeasurement = getmeasurement('right');
		
		const hasValidMeasurements = topMeasurement > 0 && bottomMeasurement > 0 && 
			leftMeasurement > 0 && rightMeasurement > 0;

		// Generate horizontal subsections if vertical splits are saved
		let updatedOriginalHorizontalSubsections = window.original_horizontal_subsections;
		let calculatedHorizontalSubsections: HorizontalSplitSubsection[] = [];
		
		if (window.vertical_splits_saved) {
			// First, generate the subsection structure from vertical splits
			// Pass window width if available for proper boundary calculations
			// Use top measurement as window width, or fallback to bottom if top is zero
			let windowWidth: number | undefined;
			if (topMeasurement > 0) {
				windowWidth = topMeasurement;
			} else if (bottomMeasurement > 0) {
				windowWidth = bottomMeasurement;
			}
			let baseSubsections = generateHorizontalSubsections(
				window.original_vertical_splits,
				windowWidth
			);
			
			// Copy over any existing horizontal splits from original subsections
			// Normalize all horizontal splits to top-to-bottom reference
			if (window.original_horizontal_subsections.length > 0) {
				baseSubsections = baseSubsections.map(calcSubsection => {
					const matchingOriginal = window.original_horizontal_subsections.find(
						orig => orig.subsection_label === calcSubsection.subsection_label
					);
					if (matchingOriginal) {
						// Normalize horizontal splits to top-to-bottom reference
						const normalizedSplits = matchingOriginal.horizontal_splits.map(split => {
							if (split.direction === 'bottom-to-top' && windowWidth) {
								return {
									...split,
									position: windowWidth - split.position,
									direction: 'top-to-bottom' as const
								};
							}
							return {
								...split,
								direction: 'top-to-bottom' as const
							};
						});
						
						return {
							...calcSubsection,
							horizontal_splits: normalizedSplits
						};
					}
					return calcSubsection;
				});
			}
			
			// Update original horizontal subsections for user input
			updatedOriginalHorizontalSubsections = baseSubsections;
			
			if (hasValidMeasurements) {
				const measurementsForCalculation = {
					top: topMeasurement,
					bottom: bottomMeasurement,
					left: leftMeasurement,
					right: rightMeasurement
				};
				
				const results = calculateExtensionResults(
					measurementsForCalculation,
					window.original_vertical_splits,
					window.extension
				);
				
				calculatedHorizontalSubsections = calculateAdjustedHorizontalSubsections(
					baseSubsections,
					window.extension,
					results.thicknessVector,
					results.workingMeasurements,
					results.calculatedSplits
				);
				
				// Return window with full calculations
				return {
					...window,
					original_horizontal_subsections: updatedOriginalHorizontalSubsections,
					calculated_measurements: results.workingMeasurements,
					calculated_vertical_splits: results.calculatedSplits,
					calculated_horizontal_subsections: calculatedHorizontalSubsections,
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
			}
		}
		
		// Return window with only horizontal subsections updated (no extension calculations)
		return {
			...window,
			original_horizontal_subsections: updatedOriginalHorizontalSubsections
		};
	} catch (error) {
		console.error('Extension calculation failed:', error);
		return window; // Return original window if calculation fails
	}
}

const windowMeta = {

	Window_Name: {
		'type': 'string',
		'label': "Window Name", 
		'omit': false 
	},
	Window_Configuration: {
		'type': 'string',
		'label': "Window Configuration", 
		'omit': false 
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
	
	// Horizontal splits by subsection
	original_horizontal_subsections: {
		'type': 'horizontal_subsections_array',
		'label': "Horizontal Splits by Subsection",
		'omit': false
	},
	vertical_splits_saved: {
		'type': 'boolean',
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
}


export { windowMeta };
