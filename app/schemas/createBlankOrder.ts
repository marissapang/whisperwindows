import { customAlphabet } from 'nanoid';

// helper fun functions
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

const addressMeta = {
  Address_Line_1: {'type':'string', 'label': "Address Line 1", 'omit':false},
  Address_Line_2:{'type':'string', 'label': "Address Line 2", 'omit':false},
  City:{'type':'string', 'label': "City", 'omit':false},
  State:{'type':'string', 'label': "State", 'omit':false},
  Zip_Code:{'type':'string', 'label': "Zip Code", 'omit':false},
}

//-----------------------------------------
// extension functions
//-----------------------------------------

function generateEmptyExtension(){
	return {
	  Extension: true,
	  Depth: 0,
	  Type: 'interior',
	  Support_Notes: '',
	  General_Notes: ''
	}
}

const extensionMeta = {
  Extension: {'type':'bool', 'label': "Frame Extension?", 'omit':false},
  Depth: {'type':'number_inches', 'label': "Extension Depth", 'omit':false},
  Type: {'type':'string', 'label': "Extension Type", 'omit':false},
  Support_Notes: {'type':'longtext', 'label': "Frame Support Notes", 'omit':true},
  General_Notes: {'type':'longtext', 'label': "General Notes", 'omit':false},
}


//-----------------------------------------
// window functions
//-----------------------------------------
export const createBlankWindow = () => ({
	Room_Name:'',
	Window_Name:'',
	Window_Material_Notes:'',
	Window_Depth: 0,
	Window_Depth_Notes:'',
	Extension: generateEmptyExtension(),
	Products:[]
})

export const windowMeta = {
	Room_Name:{'type':'string', 'label': "Room Name", 'omit':false},
	Window_Name:{'type':'string', 'label': "Window Name", 'omit':false},
	Window_Material_Notes:{'type':'longtext', 'label': "Window Material Notes", 'omit':false},
	Window_Depth: {'type':'number_inches', 'label': "Current Window Frame Depth", 'omit':false},
	Window_Depth_Notes:{'type':'longtext', 'label': "Window Material Notes", 'omit':false},
	Extension: generateEmptyExtension(),
	Products:{product_id:{"type":'string','label':'product id', 'omit':false}}
}

//-----------------------------------------
// order functions
//-----------------------------------------
export const createBlankOrder = () => ({
	Order_Id: generateOrderId(),
	Client_Id: '',
	Locked: false,
	Delivery_Address: generateEmptyAddress(),
	Windows:[]
}) 

export const orderMeta = {
  Order_Id: {'type':'string', 'label': "Order ID", 'omit':false},
  Client_Id: {'type':'string', 'label': "Client ID", 'omit':false},
  Locked: {'type':'bool', 'label': "Order Locked?", 'omit':false},
  Delivery_Address: {'type': 'group', 'label': 'Delivery Address', fields: addressMeta},
  Windows:windowMeta
}



