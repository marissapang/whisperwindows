import { customAlphabet } from 'nanoid';

// helper functions
function generateWindowId(n=6){
	const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
	const window_id = customAlphabet(alphabet, 6)()
	console.log(`inside genWindowID: window id is ${window_id}`)
	return window_id; 
}

function generateEmptySingleOrDoubleHungWindow(){
	return {
		Window_Id: generateWindowId(),
		Window_Type: 'Single/Double Hung Window',
		Order_Position: 1, // Position in the order sequence
		width_top_inside: null,
		width_top_outside: null,
		height_left_inside: null,
		height_left_outside: null,
		width_bottom_inside: null,
		width_bottom_outside: null,
		height_right_inside: null,
		height_right_outside: null,
		height_middle: null
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
		'type': 'number', 
		'label': "Position in Order", 
		'omit': false
	},
	width_top_inside: {
		'type': 'number_inches', 
		'label': "Width Top Inside", 
		'omit': false
	},
	width_top_outside: {
		'type': 'number_inches', 
		'label': "Width Top Outside", 
		'omit': false
	},
	height_left_inside: {
		'type': 'number_inches', 
		'label': "Height Left Inside", 
		'omit': false
	},
	height_left_outside: {
		'type': 'number_inches', 
		'label': "Height Left Outside", 
		'omit': false
	},
	width_bottom_inside: {
		'type': 'number_inches', 
		'label': "Width Bottom Inside", 
		'omit': false
	},
	width_bottom_outside: {
		'type': 'number_inches', 
		'label': "Width Bottom Outside", 
		'omit': false
	},
	height_right_inside: {
		'type': 'number_inches', 
		'label': "Height Right Inside", 
		'omit': false
	},
	height_right_outside: {
		'type': 'number_inches', 
		'label': "Height Right Outside", 
		'omit': false
	},
	height_middle: {
		'type': 'number_inches', 
		'label': "Height Middle", 
		'omit': false
	}
}

export const createSingleOrDoubleHungWindow = () => generateEmptySingleOrDoubleHungWindow();

export { singleOrDoubleHungWindowMeta };
