"use client";
import { useState, useEffect } from "react";

import { math } from "mathjs";
import Image from "next/image";


export default function NavBar(){
	const [navTop, setNavTop] = useState(true);
	const [navSelection, setNavSelection] = useState("");
	const [mobileMenu, setMobileMenu] = useState("hidden")

	const handleNavClick= (e) => {
		if (e.target.id !== navSelection){
			setNavSelection(e.target.id)
		} else {
			setNavSelection("")
		}
	}

	useEffect(() => {
		window.addEventListener('scroll', () => {
			if (Math.round(window.scrollY) >= window.innerHeight * 1){
				setNavTop(false)
			} else if (Math.round(window.scrollY) <= window.innerHeight * 0.4) {
				setNavTop(true)
			}
		});

		window.addEventListener('click', (e) => {
			const id = e.target.id
			if ((id !== "product") && (id !== "usecases") && (id !== "about") && (id !== "resources")){
				setNavSelection("")
			}
		})

		if (mobileMenu==="hidden"){
			document.body.classList.remove("overflow-y-hidden")
		} else {
			document.body.classList.add("overflow-y-hidden")
		}
	})
	return (
		<div className={
			navTop ? 
				"z-50 sticky top-0 transition duration-1000 ease-in-out h-20 bg-gradient-to-b from-lake-900 from-5% text-white text-sm font-medium"
			: 
				"z-50 sticky top-0 transition duration-100 ease-out h-11 bg-[#283546] opacity-[.99] text-white text-sm font-medium"
			}>
			<div className={
				navTop ?
					"w-full flex items-center justify-between mx-auto p-4"
				:
					"w-full flex items-center justify-between px-4 py-2"
				}
			>
				<div className="font-ptserif text-lg drop-shadow select-none">
					Whisper Window
					</div>
				<div className="hidden md:flex select-none">
					<div className="pr-8">
						<div id="product" onClick={handleNavClick} 
							className={(navSelection==="product"? "text-white/100 underline hover:cursor-pointer" : "text-white/80 hover:text-white/100 hover:cursor-pointer")}>
							Product
						</div>
						<div 
							className={(navSelection==="product" ? "absolute":"hidden") + " bg-brown-900 bg-opacity-75 p-4 mt-4 -ml-4 min-w-[250px] leading-8"}
						>
							<div className="text-white/80 hover:text-white/100 hover:cursor-pointer">
								Product Picker
							</div>
							<div className="text-white/80 hover:text-white/100 hover:cursor-pointer">
								Magnetic Panels
							</div>
							<div className="text-white/80 hover:text-white/100 hover:cursor-pointer">
								Compression Inserts
							</div>
							<div className="text-white/80 hover:text-white/100 hover:cursor-pointer">
								Blackout & Privacy Add-Ons
							</div>
						</div>
					</div>
					<div className="pr-8">
						<div id="usecases" onClick={handleNavClick} 
							className={(navSelection==="usecases"? "text-white/100 underline hover:cursor-pointer" : "text-white/80 hover:text-white/100 hover:cursor-pointer")}>
							Use Cases
						</div>
						<div 
							className={(navSelection==="usecases" ? "absolute":"hidden") + " bg-brown-900 bg-opacity-75 p-4 mt-4 -ml-4 min-w-[250px] leading-8"}
						>
							<div className="text-white/80 hover:text-white/100 hover:cursor-pointer">
								Double-Hung Windows
							</div>
							<div className="text-white/80 hover:text-white/100 hover:cursor-pointer">
								Temperature Insulation
							</div>
						</div>
					</div>
					<div className="pr-8">
						<div id="about" onClick={handleNavClick}
							className={(navSelection==="about"? "text-white/100 underline hover:cursor-pointer" : "text-white/80 hover:text-white/100 hover:cursor-pointer")}>
							About
						</div>
					</div>
					<div className="pr-8">
						<div id="resources" onClick={handleNavClick}
							className={(navSelection==="resources"? "text-white/100 underline hover:cursor-pointer" : "text-white/80 hover:text-white/100 hover:cursor-pointer")}>
							Resources
						</div>
					</div>
				</div>
				<div className="flex">
					<div className="
						hidden md:block 
						bg-white/95 text-brown-950 px-2 py-0.5 rounded-3xl
						hover:bg-white/100 hover:cursor-pointer hover:drop-shadow-md"
					>
						Instant Quote
					</div>
					<div className="
						md:block hidden ml-4
						opacity-90 hover:opacity-100 hover:cursor-pointer
						"
					>
						<Image
							src="/icons/phone-white-120px.png" 
							width={20} height={20}
							alt="phone icon"
						/>
					</div>
					<div className="md:hidden">
						<div onClick={()=>{setMobileMenu("block")}} className="hover:cursor-pointer">
							<Image 
								src="/icons/burger-240px.png" 
								width={20} height={20} alt="burger menu"
							/>
						</div>	
					</div>
					
				</div>
				
			</div>
			<div 
				className={mobileMenu +
				" fixed top-0 left-0 w-full h-[100vh]" +
				" text-3xl text-brown-800 bg-brown-50 bg-opacity-[.99]" + 
				" p-4"
			}>
				<div className="text-right">
					<span 
						onClick={()=>{setMobileMenu("hidden")}}
						className="p-2 hover:cursor-pointer hover:text-brown-600"
					>
						X
					</span>
				</div>
				<div className="mt-20 hover:cursor-pointer hover:text-brown-600">
					Product
				</div>
				<hr className="mt-4 mb-4 bg-brown-500"/>
				<div className="hover:cursor-pointer hover:text-brown-600">
					Use Cases
				</div>
				<hr className="mt-4 mb-4 bg-brown-500"/>
				<div className="hover:cursor-pointer hover:text-brown-600">
					About
				</div>
				<hr className="mt-4 mb-4 bg-brown-500"/>
				<div className="hover:cursor-pointer hover:text-brown-600">
					Resources
				</div>
				<hr className="mt-4 mb-4 bg-brown-500"/>
				<div className="hover:cursor-pointer hover:text-brown-600">
					Instant Quote
				</div>
				<hr className="mt-4 mb-4 bg-brown-500"/>
				<div className="hover:cursor-pointer hover:text-brown-600">
					Contact
				</div>
			</div>

		</div>
	)
}