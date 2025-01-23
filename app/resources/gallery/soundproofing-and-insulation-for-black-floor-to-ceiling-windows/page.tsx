import Image from "next/image";
import Head from 'next/head';

export default function Page() {
	return (
		<div className="font-mukta text-brown-900">
			<Head>
		        <title>Soundproofing and Insulation for Floor-to-Ceiling Bedroom in NYC</title>
		        <meta property="og:title" content="Soundproofing and Insulation for Floor-to-Ceiling Bedroom in NYC" key="title" />
		        <meta property="og:description" content="No-drill and noticeable solution to blocking out noise, cold, and UV in curtain wall building with large and modern windows" key="description" />

		      </Head>
			<div className="text-center pt-20 px-10">
				<span>GALLERY | COMPRESSION INSERTS</span>
				<h1 className="
					pb-16 m-auto font-ptserif font-bold 
					sm: text-2xl md:text-4xl max-w-2xl 
					
					">
					Noise Reduction & Insulation
					for Floor-To-Ceiling Windows
				</h1>
				<h2>
					Long Island City, Queens, NY
					<br/>
					Soundproofing bedroom at busy intersection for noise-sensitive Shibu Inu
				</h2>

			</div>
			<div className="p-6 md:p-14 lg:p-20 xl:p-28">
				<Image
					src="/gallery/compression-black-f2c/close.png" 
					width={1600} height={1600}
					style={{width:'100%', minHeight:'30vh', maxHeight:'80vh', objectFit:'cover'}}
					alt="photo of music studio"
				/>
				<p className="mb-4">
				No-drill compression inserts fits into existing window frame and doubles
				up with existing glass to provide superior acoustic and insulation performance
				</p>
				<Image
					src="/gallery/compression-black-f2c/far.png" 
					width={1600} height={1600}
					style={{width:'100%', minHeight:'30vh', maxHeight:'80vh', objectFit:'cover'}}
					alt="photo of music studio"
				/>
				<p className="mb-4">
				Post-installation, compression inserts are not visible from a distance.
				</p>
				<Image
					src="/gallery/compression-black-f2c/charlie.png" 
					width={1600} height={1600}
					style={{width:'100%', minHeight:'30vh', maxHeight:'80vh', objectFit:'cover'}}
					alt="photo of music studio"
				/>
			</div>

			

		</div>



	)
}