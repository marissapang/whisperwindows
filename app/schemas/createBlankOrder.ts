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

// //-----------------------------------------
// // extension functions
// //-----------------------------------------

// function generateEmptyExtension(){
// 	return {
// 	  Extension: true,
// 	  Depth: 0,
// 	  Type: 'interior',
// 	  Support_Notes: '',
// 	  General_Notes: ''
// 	}
// }

// const extensionMeta = {
//   Extension: {'type':'bool', 'label': "Frame Extension?", 'omit':false},
//   Depth: {'type':'number_inches', 'label': "Extension Depth", 'omit':false},
//   Type: {'type':'string', 'label': "Extension Type", 'omit':false},
//   Support_Notes: {'type':'longtext', 'label': "Frame Support Notes", 'omit':true},
//   General_Notes: {'type':'longtext', 'label': "General Notes", 'omit':false},
// }


// //-----------------------------------------
// // window functions
// //-----------------------------------------
// export const createBlankWindow = () => ({
// 	Room_Name:'',
// 	Window_Name:'',
// 	Window_Material_Notes:'',
// 	Window_Depth: 0,
// 	Window_Depth_Notes:'',
// 	Extension: generateEmptyExtension(),
// 	Products:[]
// })

// export const windowMeta = {
// 	Room_Name:{'type':'string', 'label': "Room Name", 'omit':false},
// 	Window_Name:{'type':'string', 'label': "Window Name", 'omit':false},
// 	Window_Material_Notes:{'type':'longtext', 'label': "Window Material Notes", 'omit':false},
// 	Window_Depth: {'type':'number_inches', 'label': "Current Window Frame Depth", 'omit':false},
// 	Window_Depth_Notes:{'type':'longtext', 'label': "Window Material Notes", 'omit':false},
// 	Extension: generateEmptyExtension(),
// 	Products:{product_id:{"type":'string','label':'product id', 'omit':false}}
// }

//-----------------------------------------
// order functions
//-----------------------------------------

const styles = {
	Group_Header_L1: "font-semibold text-xl text-lake-700"
}

const permissions = {
	all: ['Client', 'Sales', 'Manufacturer', 'Installer'],
	client_sales: ['Client', 'Sales'],
	mfg_only: ['Manufacturer'],
	excl_mfg: ['Client', 'Sales', 'Installer'],
	none: []
}


const orderStages = {
	all: ['created', 'submitted', 'sales_confirmed', 'client_confirmed', 'mfg_locked', 'install_locked'],
	post_sales_review: ['sales_confirmed', 'client_confirmed', 'mfg_locked', 'install_locked'],
	none: []
}


export const createBlankOrder = () => ({
	Order_Id: generateOrderId(),
	Client_Name: "",
	Order_Created_Date: new Date().toISOString().split('T')[0],
	Order_Submitted_date: null,
	Order_Status: "created",
	Delivery_Address: generateEmptyAddress(),
	Delivery_Contact_Name: "",
	Window_Width: null
}) 

export const orderMeta = {
	Order_Info: {
		type: "group",
		label: "ORDER INFO",
		style: styles.Group_Header_L1,
		fields_permissions: {
			'visibleTo': permissions.all,
			'editableBy': permissions.none,
			'readOnlyStages': orderStages.all
		},
		fields: {
			Order_Id: {
				'type': 'string',
				'label': "Order ID",
			},
			Client_Name: {
				'type': 'string',
				'label': 'Client Name',
				fields_permissions: {
					'visibleTo': permissions.all,
					'editableBy': permissions.all,
				},	
				'readOnlyStages': orderStages.post_sales_review
			},
			Order_Created_Date: {
				'type': 'string',
				'label': "Order Created",
			},
			Order_Submitted_Date: {
				'type': 'string',
				'label': "Order Submitted",
			},
			Order_Status: {
				'type': 'string',
				'label': 'Order Status',
			}
		},
	}, 
	Delivery_Info: {
		type: "group",
		label: "DELIVERY INFO",
		style: styles.Group_Header_L1,
		fields_permissions: {
			'visibleTo': permissions.excl_mfg,
			'editableBy': permissions.client_sales,
			'readOnlyStages': orderStages.post_sales_review
		},
		fields: {
			Delivery_Address: {
				'type': 'nested_object',
				'label': 'Delivery Address',
				'fields': addressMeta
			},
			Delivery_Contact_Name: {
				'type': 'string',
				'label': 'Delivery Contact',
			}
		}
	},
	Payment_Info: {
		type: "group",
		label: "PAYMENT INFO",
		style: styles.Group_Header_L1,
		fields_permissions: {
			'visibleTo': permissions.client_sales,
			'editableBy': permissions.sales,
			'readOnlyStages': orderStages.none
		},
		fields: {
			total_invoice: {
				'type': 'number_dollars',
				'label': 'Total Invoice'
			},
			deposit_paid: {
				'type': 'bool',
				'label': 'Deposit Received',
				'visibleTo': permissions.all,
			}
		}
	},
	Order_Summary: {
		type: "group",
		label: "ORDER SUMMARY",
		style: styles.Group_Header_L1,
		fields_permissions: {
			'visibleTo': permissions.all,
			'editableBy': permissions.all,
			'readOnlyStages': orderStages.post_sales_review
		},
		fields: {
			Window_Width: {
				'type': 'number_inches',
				'label': 'Window Width'
			}
		}
	}

}



