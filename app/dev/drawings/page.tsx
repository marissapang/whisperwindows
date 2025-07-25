'use client';
import { useState } from 'react';
import NavBar from "../../components/NavBar";
import Image from "next/image";
import Head from 'next/head';

export default function Page() {
	const [ customerName, setCustomerName ] = useState("");
	const [ orderNo, setOrderNo ] = useState("");
	const [ windowName, setWindowName] = useState("");
	const [ panelType, setPanelType ] = useState("");
	const [ panelThickness, setPanelThickness ] = useState("");
	const compression = "compression";
	const magnetic = "magnetic";

	

	return (
		<div className="font-mukta text-brown-900 bg-white">
			<Head>
		        <title>make drawings</title>
		      </Head>
			<NavBar/>
			<div className="text-center py-20 px-10">
			<b>Customer Name</b>
			<br/>
			<input 
				type="text" value={customerName}
				className="border p-1 text-center" 
				onChange={(e) => setCustomerName(e.target.value)}/>
			<br/><br/>
			<b>Order Number</b>
			<br/>
			<input 
				type="text" value={orderNo}
				className="border p-1 text-center" 
				onChange={(e) => setOrderNo(e.target.value)}/>
			<br/><br/>
			<b>Window Name</b>
			<br/>
			<input 
				type="text" value={windowName}
				className="border p-1 text-center" 
				onChange={(e) => setWindowName(e.target.value)}/>
			<br/><br/>
			<b>Panel Type</b>
			<br/>
			<select value={panelType} onChange={(e)=>{setPanelType(e.target.value)}}>
				<option value=""></option>
				<option value={compression}>Compression</option>
				<option value={magnetic}>Magnetic</option>
			</select>
			<br/><br/>
			<b>Thickness</b>
			<br/>
			<select value={panelThickness} onChange={(e)=>{setPanelThickness(e.target.value)}}>
				<option value=""></option>
				<option value={"1/4"}>1/4"</option>
				<option value={"3/8"}>3/8"</option>
			</select>
			
			

			</div>

			

		</div>



	)
}