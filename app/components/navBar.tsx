"use client";
import { useState, useEffect } from "react";
import { math } from "mathjs";

export default function NavBar(){
	const [navTop, setNavTop] = useState(true);

	useEffect(() => {
		window.addEventListener('scroll', () => {
			console.log("scroll event logged")
			console.log(`scroll position Y: ${Math.round(window.scrollY)}`)
			if (Math.round(window.scrollY) >= 150){
				setNavTop(false)
			} else if (Math.round(window.scrollY) <= 70) {
				setNavTop(true)
			}
		})
	})
	return (
		<div className={
			navTop ? 
				"h-16 sticky top-0 bg-gradient-to-b from-lake-900 text-white"
			: 
				"h-10 sticky top-0 bg-lake-900 text-white"
			}>
			<div className="w-full flex items-center justify-between mx-auto p-4">
				<div className="font-ptserif text-lg drop-shadow">
					Whisper Window
					</div>
				<div className="hidden font-medium text-sm md:flex">
					<div className="pr-8">Product</div>
					<div className="pr-8">Use Cases</div>
					<div className="pr-8">About</div>
					<div className="">Reesources</div>
				</div>
				<div className="flex">
					<div className="md:block hidden bg-white">Instant Quote</div>
					<div className="md:block hidden ml-4">Contact</div>
					<div className="md:hidden">Burger</div>
				</div>
			</div>

		</div>
	)
}