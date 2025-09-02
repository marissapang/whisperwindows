import { customAlphabet } from 'nanoid';
import { FourSidedMeasurements, VerticalSplit, HorizontalSplit } from './types';

// helper functions
function generateOrderId(n=6){
	const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
	const order_id = customAlphabet(alphabet, 6)()
	console.log(`inside genOrderID: order id is ${order_id}`)
	return order_id; 
}

//-----------------------------------------
// address functions
//-----------------------------------------

function generateEmptyAddress(){
	return {
		Address_Line_1:'',
		Address_Line_2:'',
		City:'',
		State:'',
		Zip_Code:''
	}
}

export const createBlankOrder = () => ({
	Order_Id: generateOrderId(),
	Client_Name: "",
	Invoice_Number: "",
	Order_Created_Date: new Date().toISOString().split('T')[0],
	Order_Submitted_date: null,
	Order_Status: "created",
	Status: "Pre-Install",
	Next_Steps: "",
	Deposit_Date: null,
	Order_Details: "",
	Frame_Notes: "",
	Blinds_Notes: "",
	Payment_Stage: "Waiting on Deposit",
	QBO_Stage: "Estimate",
	Check_Config: "Not Started",
	Install_Stage: "Not Started",
	MFG_Stage: "Not Started",
	COI_Stage: "Not Started",
	COI_Link: "",
	Delivery_Address: generateEmptyAddress(),
	Delivery_Contact_Name: "",
	Window_Width: null,
	Windows: [] // Collection of window objects with ordering
}) 


export function createBlankWindowObject(): WindowObject {
	return {
		Window_Name: '',
		Window_Configuration: '',
		Order_Position: 1,
		
		// Original input data
		Window_Four_Sided_Measurements: createEmptyFourSidedMeasurements(),
		Window_Config_Dependent_Measurements: null,
		Panel_Configs: '',
		Panel_Config_Dependent_Parameters: null,
	
		
		// Extension configuration
		extension: generateEmptyExtension(),
	};
}

export function createEmptyFourSidedMeasurements(): FourSidedMeasurements {
  return ({
    top: null,
    bottom: null,
    left: null,
    right: null
  })  
};

export function createEmptyConfigSplits(): ConfigSplits {
	return ({
		config: { kind: 'Single Window', pieces: 1 },
		vertical_splits: [],
		vertical_configs: [{ kind: 'Single Piece', pieces: 1 }],
  		horizontal_splits: [[]],
	})
};


export function createEmptyVerticalSplit(): VerticalSplit {
	return {position: null, direction: 'left-to-right'}
}

export function createEmptyHorizontalSplit(): HorizontalSplit {
	return {position: null, direction: 'bottom-to-top'}
}

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
