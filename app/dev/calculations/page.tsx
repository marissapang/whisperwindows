'use client';
import { useState } from 'react';
import NavBar from "../../components/NavBar";
import Image from "next/image";
import Head from 'next/head';

export default function Page() {
	
	const [ windowType, setWindowType ] = useState("");
	const [ panelThickness, setPanelThickness ] = useState("");

	

	return (
		<div className="font-mukta text-brown-900 bg-white">
			<Head>
		        <title>Calculations</title>
		      </Head>
			<NavBar/>
			<div className="text-center py-20 px-10">
			
			<b>Window Type</b>
			<br/>
			<select value={windowType} onChange={(e)=>{setWindowType(e.target.value)}}>
				<option value=""></option>
				<option value="SINGLE">Single</option>
				<option value="2P-SS">Magnetic</option>
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