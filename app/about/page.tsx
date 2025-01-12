import NavBar from "../components/NavBar";
import ContactForm from "../components/ContactForm";
import Image from "next/image";
import Head from 'next/head';

export default function Page() {
	return (
		<div className="font-mukta text-brown-900">
			<Head>
		        <title>About Us | Window Soundproofing Experts in NYC & Tri-State Area</title>
		        <meta property="og:title" content="About Us | Window Soundproofing Experts in NYC & Tri-State Area" key="title" />
		        <meta property="og:description" content="Learn more about our NYC-based window soundproofing company. We provide custom and no-drill noise-reduction solutions for homes and businesses across the tri-state area." key="description" />
		        <meta name="geo.region" content="US-NY" />
		        <meta name="geo.placename" content="New York" />
		      </Head>
			<NavBar/>
			<div className="text-center py-20 px-10">
				<h1 className="pb-16 font-ptserif font-bold text-4xl">
					About Us
				</h1>
				<p>
					We are based in Queens, NYC and serve the tri-state area. 
					We offer shipping across the country for a subset of our products.
				</p>
				<p className="font-bold pt-8">
					Learn more about us!

				</p>
				<ul>
					<li className="text-brown-700 hover:underline">
						<a href="https://maps.app.goo.gl/C8VPmvbFpxrpBZ898" target="_blank">
							Google Reviews
						</a>
					</li>
					<li className="text-brown-700 hover:underline">
						<a href="https://www.youtube.com/@WhisperWindow" target="_blank">
							Youtube
						</a>
					</li>
					<li className="text-brown-700 hover:underline">
						<a href="https://www.instagram.com/whisperwindows/" target="_blank">
							Instagram
						</a>
					</li>
					<li className="text-brown-700 hover:underline">
						<a href="https://www.tiktok.com/@whisperwindownyc" target="_blank">
							TikTok
						</a>
					</li>
					
				</ul> 

			</div>

		    <ContactForm/>

			

		</div>



	)
}