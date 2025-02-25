"use client";

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation'
import emailjs from '@emailjs/browser';
import { useFormFields } from '../libs/hooksLib';


export default function ContactForm() {
	const [formError, setFormError] = useState(" ")
     const [formSuccess, setFormSuccess] = useState(false)

     const emptyFormFields = { 
          mingzi: "", 
          youjian: "", 
          dianhua: "",
          youbian:"",
          additional_info:"",
          preferred_contact_method:"default",
          name:"", // honeypot
          email:"", // honeypot
     }

	const [fields, handleFieldChange, resetFields] = useFormFields(emptyFormFields);

	const handleSubmit = async () => {

		// check name 
	    if (fields.mingzi == '' && fields.name == ''){
	      setFormError("Please enter your name");
	    } else if (fields.youjian == '' && fields.email == ''){
	      setFormError("Please enter an email address");
	    } else if (fields.dianhua == ''){
	      setFormError("Please enter a phone number");
	    } else if (
	      (!(fields.email.includes("@") && fields.email.includes("."))) && 
	      (!(fields.youjian.includes("@") && fields.youjian.includes(".")))
	      ){
	      setFormError("Please enter a valid email address")
	    } else if (fields.youbian==''){
	    	setFormError("Please enter a zip code")
	    } else {
	      setFormError("Form successfully submitted! If you do not receive a confirmation within 5 minutes, please check your spam folder")
           resetFields(emptyFormFields)
           setFormSuccess(true)

           

	      emailjs.send(
	      'service_whisperwindowllc', // service ID 
	      'WW_Interest_Form', // template ID
	      fields, 
	      'egb1SvF1WohXdGWd-'// public key
	      )
	      .then((results)=>{
	      	console.log("seeing results!")
	          console.log(results);
               window.open("/interest-form-success", "Success","width=400,height=400,toolbar=0,menubar=0")
	      },(error)=>{
	      	console.log("there is an error...")
	          console.log(error);
	      });

           // window.open("/interest-form-success", "Success","width=400,height=400,toolbar=0,menubar=0")
           const router = useRouter()
           router.push('/interest-form-success')
	    }


	}


	return (
		<div className='bg-brown-50'>
			
          <h1 className="
          	font-ptserif text-center font-bold
          	text-4xl
          	pt-20
          ">Request A Quote
          </h1>
          <h2 className="
               font-ptserif text-center font-bold text-md
               pt-8
          ">
               Or, call/text us at 646-397-4655
          </h2>
          <div className="
          	w-[90%] sm:w-[65%] md:w-1/2 lg:w-1/3 mx-auto
          	text-brown-700 font-light text-sm
          	pt-12 pb-20
          ">
          	<div className="py-2">
          		NAME
          		<input className="
          			w-full p-2 pb-1 
          			bg-opacity-0 bg-white
          			border-brown-700 border-solid border-[0.5px]
          		"
          			id="mingzi" value={fields.mingzi}
          			onChange={handleFieldChange}
          		/>
                    <input className="hidden" id="name" value={fields.name} onChange={handleFieldChange}/>
               </div>
          	<div className="py-2">
          		EMAIL
          		<input className="
          			w-full p-2 pb-1 
          			bg-opacity-0 bg-white
          			border-brown-700 border-solid border-[0.5px]
          			"
          			id="youjian" value={fields.youjian}
          			onChange={handleFieldChange}
          		/>
                    <input className="hidden" id="email" value={fields.email} onChange={handleFieldChange}/>
          	</div>
          	<div className="">
          		<div className="pt-2 pb-4 float-left w-2/3">
		          	PHONE <br/>
		          	<input className="
          				w-[90%] p-2 pb-1 
          				bg-opacity-0 bg-white
          				border-brown-700 border-solid border-[0.5px]
          				"
          				id="dianhua" value={fields.dianhua}
          				onChange={handleFieldChange}
          			/>

		        </div>
		        <div className="pt-2 pb-4 float-right w-1/3">
		          	ZIP CODE <br/>
		          	<input className="
          				w-full p-2 pb-1 
          				bg-opacity-0 bg-white
          				border-brown-700 border-solid border-[0.5px]
          				"
          				id="youbian" value={fields.youbian}
          				onChange={handleFieldChange}
          			/>
		        </div>
		    </div>
          	<div className="py-2">
          		# WINDOWS & APPROXIMATE DIMENSIONS
          		<textarea className="
          			w-full p-2 pb-1 
          			bg-opacity-0 bg-white
          			border-brown-700 border-solid border-[0.5px]
          			"
          			id="additional_info" value={fields.additional_info}
          			onChange={handleFieldChange}
          		/>
          	</div>
          	<div className="py-2">
          		WHAT'S THE BEST WAY TO REACH YOU?
          		<select 
          			id="preferred_contact_method" 
          			onChange={handleFieldChange} 
                         defaultValue="default"
          			className="block pt-2 pb-0 px-0 w-full text-sm text-brown-500 bg-transparent border-0 border-b-[0.5px] border-brown-700 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
          			<option id="default">Please Select</option>
                         <option id="call">Call</option>
          			<option id="text">Text</option>
          			<option id="email">Email</option>
          		</select>
          	</div>
          	<div className={" " + (formSuccess ? 
                    "text-lime-800 text-md italic font-semibold" 
                    :
                    "text-orange-700 text-lg italic font-semibold"
               )}>
                    <br/>
          		{formError}
          	</div>
          	<button 
          		className="
          			mt-6 p-2 px-4 bg-brown-900 text-white font-semibold
          			hover:bg-brown-700
          		"
          		onClick={handleSubmit}
          	>
          		SUBMIT
          	</button>


          </div>
		</div>
	)
}