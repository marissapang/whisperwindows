import NavBar from "../components/NavBar";
import ContactForm from "../components/ContactForm";
import Image from "next/image";
import Head from 'next/head';

export default function Page() {
	return (
		<div className="font-mukta text-brown-900">
			<Head>
		        <title>DIY Soundproofing Tips | Free Resources for Noise Reductio</title>
		        <meta property="og:title" content="DIY Soundproofing Tips | Free Resources for Noise Reductio" key="title" />
		        <meta property="og:description" content="Explore our free soundproofing resources and DIY noise-reduction tips. Learn simple, effective ways to reduce noise at home with expert guidance." key="description" />

		      </Head>
			<NavBar/>
			<div className="text-center py-20 px-10">
				<h1 className="pb-16 font-ptserif font-bold text-4xl">
					Our Resources Page is still under construction!
				</h1>
				<p>
					However, we do have many free PDF resources on soundproofing basics and DIY 
					options. If you are interested in any of our free resources please fill out our 
					contact form and add your questions in the notes section!
				</p>


			</div>

		    <ContactForm/>

			

		</div>



	)
}