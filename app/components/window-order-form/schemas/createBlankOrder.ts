import { customAlphabet } from 'nanoid';
import { windowMeta, calculateAndUpdateWindow } from './createWindowObject';

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
// 	  Configuration: "",
// 	  Material: "",
// 	  Bottom_Material_Override: "",
// 	  Type: 'interior',
// 	  Support_Notes: '',
// 	  General_Notes: ''
// 	}
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
	sales: ['Sales'],
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
			Invoice_Number: {
				'type': 'string',
				'label': 'Invoice #',
				fields_permissions: {
					'visibleTo': permissions.all,
					'editableBy': permissions.all,
				},	
				'readOnlyStages': orderStages.none
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
	Order_Management: {
		type: "group",
		label: "ORDER MANAGEMENT",
		style: styles.Group_Header_L1,
		fields_permissions: {
			'visibleTo': permissions.all,
			'editableBy': permissions.all,
			'readOnlyStages': orderStages.none
		},
		fields: {
			Status: {
				'type': 'select',
				'label': 'Status',
				'options': ['Pre-Install', 'Installing', 'Post-Install', 'Finished', 'Waiting for Blinds']
			},
			Next_Steps: {
				'type': 'longtext',
				'label': 'Next Steps'
			},
			Deposit_Date: {
				'type': 'date',
				'label': 'Deposit Date'
			},
			Order_Details: {
				'type': 'longtext',
				'label': 'Order Details'
			},
			Frame_Notes: {
				'type': 'longtext',
				'label': 'Frame Notes'
			},
			Blinds_Notes: {
				'type': 'longtext',
				'label': 'Blinds Notes'
			}
		}
	},
	Process_Tracking: {
		type: "group",
		label: "PROCESS TRACKING",
		style: styles.Group_Header_L1,
		fields_permissions: {
			'visibleTo': permissions.all,
			'editableBy': permissions.all,
			'readOnlyStages': orderStages.none
		},
		fields: {
			Payment_Stage: {
				'type': 'select',
				'label': 'Payment Stage',
				'options': ['Waiting on Deposit', 'Partial Deposit', 'Full Deposit', 'Partial Final Payment', 'Full Payment']
			},
			QBO_Stage: {
				'type': 'select',
				'label': 'QBO Stage',
				'options': ['Estimate', 'Invoice', 'Deposit Confirmation', 'Full Payment Confirmation']
			},
			Check_Config: {
				'type': 'select',
				'label': 'Check Config',
				'options': ['Not Started', 'Not Needed', 'Waiting for Sample', 'Sample Received', 'Waiting on Heather', 'COI Received', 'Waiting on Building', 'COI Approved']
			},
			Install_Stage: {
				'type': 'select',
				'label': 'Install Stage',
				'options': ['Not Started', 'Started', 'Frame Done', 'Panel Done', 'Shades Done', 'Misc Tasks Done', 'Fully Completed']
			},
			MFG_Stage: {
				'type': 'select',
				'label': 'MFG Stage',
				'options': ['Not Started', 'Started', 'Frame Complete', 'Panels Complete', 'Waiting for Shades', 'Shades Arrived', 'Misc Items Prepped', 'Packed']
			},
			COI_Stage: {
				'type': 'select',
				'label': 'COI Stage',
				'options': ['Not Started', 'Not Needed', 'Waiting for Sample', 'Sample Recieved', 'Waiting on Heather', 'COI Received', 'Waiting on Building', 'COI approved']
			},
			COI_Link: {
				'type': 'string',
				'label': 'COI Link'
			}
		}
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
	},
	Windows: {
		type: "group",
		label: "WINDOWS",
		style: styles.Group_Header_L1,
		fields_permissions: {
			'visibleTo': permissions.all,
			'editableBy': permissions.all,
			'readOnlyStages': orderStages.none
		},
		fields: {
			Windows: {
				'type': 'window_object_array',
				'label': 'Window Collection',
				'itemMeta': windowMeta
			}
		}
	}

}



