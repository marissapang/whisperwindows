import { customAlphabet } from 'nanoid';

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

// Type definitions for splits
export interface VerticalSplit {
	id: string;
	position: number; // Position in inches from left edge
	direction: 'left-to-right' | 'right-to-left';
	horizontal_splits: HorizontalSplit[];
}

export interface HorizontalSplit {
	id: string;
	position: number; // Position in inches from top edge
	direction: 'top-to-bottom' | 'bottom-to-top';
}

function generateEmptySingleOrDoubleHungWindow(){
	return {
		Window_Id: generateWindowId(),
		Window_Type: 'Single/Double Hung Window',
		Order_Position: 1, // Position in the order sequence
		// Four main measurements
		Top: null,
		Left: null, 
		Bottom: null,
		Right: null,
		// Split system
		vertical_splits: [] as VerticalSplit[]
	}
}

const singleOrDoubleHungWindowMeta = {
	Window_Id: {
		'type': 'string', 
		'label': "Window ID", 
		'omit': false
	},
	Window_Type: {
		'type': 'string', 
		'label': "Window Type", 
		'omit': false
	},
	Order_Position: {
		'type': 'integer', 
		'label': "Position in Order", 
		'omit': false
	},
	Top: {
		'type': 'number', 
		'label': "Top Measurement (inches)", 
		'omit': false
	},
	Left: {
		'type': 'number', 
		'label': "Left Measurement (inches)", 
		'omit': false
	},
	Bottom: {
		'type': 'number', 
		'label': "Bottom Measurement (inches)", 
		'omit': false
	},
	Right: {
		'type': 'number', 
		'label': "Right Measurement (inches)", 
		'omit': false
	},
	vertical_splits: {
		'type': 'vertical_splits_array',
		'label': "Vertical Splits",
		'omit': false
	}
}

export const createSingleOrDoubleHungWindow = () => generateEmptySingleOrDoubleHungWindow();

export { singleOrDoubleHungWindowMeta };
