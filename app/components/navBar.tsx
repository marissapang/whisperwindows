"use client";
import { useState, useEffect } from "react";
import { math } from "mathjs";
import Image from "next/image";


export default function NavBar(){
	const [navTop, setNavTop] = useState(true);

	useEffect(() => {
		window.addEventListener('scroll', () => {
			if (Math.round(window.scrollY) >= window.innerHeight * 1){
				setNavTop(false)
			} else if (Math.round(window.scrollY) <= window.innerHeight * 0.4) {
				setNavTop(true)
			}
		})
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
				<div className="font-ptserif text-lg drop-shadow">
					Whisper Window
					</div>
				<div className="hidden md:flex">
					<div className="pr-8 text-white/85 hover:text-white/100 hover:cursor-pointer">
						Product
					</div>
					<div className="pr-8 text-white/85 hover:text-white/100 hover:cursor-pointer">
						Use Cases
					</div>
					<div className="pr-8 text-white/85 hover:text-white/100 hover:cursor-pointer">
						About
					</div>
					<div className="text-white/85 hover:text-white/100 hover:cursor-pointer">
						Resources
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
					<div className="md:hidden">Burger</div>
				</div>
			</div>

		</div>
	)
}