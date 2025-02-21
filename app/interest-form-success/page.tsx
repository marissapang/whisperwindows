import NavBar from "../components/NavBar";
import ContactForm from "../components/ContactForm";
import Image from "next/image";
import Head from 'next/head';

export default function Page() {
	return (
		<div className="font-mukta text-brown-900">
			<Head>
		        <title>Submission Success | Window Soundproofing NYC</title>
		        <meta property="og:title" content="Submission Success | Window Soundproofing NYC" key="title" />
		        <meta property="og:description" content="Learn more about our NYC-based window soundproofing company. We provide custom and no-drill noise-reduction solutions for homes and businesses across the tri-state area." key="description" />
		        <meta name="geo.region" content="US-NY" />
		        <meta name="geo.placename" content="New York" />
		      </Head>
			<div className="text-center py-20 px-10">
				<b>Submission Success!</b>
				<br/>
				Please look for a confirmation in your inbox or spam folder.
				One of our reps will reach out within the next 1-2 days.
			</div>

		</div>



	)
}