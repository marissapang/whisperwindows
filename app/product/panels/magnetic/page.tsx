import NavBar from "../../../components/NavBar";
import ContactForm from "../../../components/ContactForm";

import Image from "next/image";
import Head from 'next/head';


export default function Page() {
	return (
		<div className="font-mukta text-brown-900 bg-white">
            <Head>
                <title>WhisperQuiet Magnetic Panel | Modular Soundproofing for Every Window</title>
                <meta property="og:title" content="WhisperQuiet Magnetic Panel | Modular Soundproofing for Every Window" key="title" />
                <meta property="og:description" content="WhisperQuiet panel magnetically snaps on and off, reducing noise while preserving easy window access. Modular and no-drill options available. Perfect for renters and owners alike." key="description" />

              </Head>
			<NavBar/>
			<div className="relative -mt-20 w-full">
				<Image
					src="/page_photos/bowen_wql_crop.jpg" 
					width={1600} height={1600}
					style={{width:'100%', minHeight:'70vh', maxHeight:'100vh', objectFit:'cover'}}
					alt="photo of music studio"
				/>
				<div className="
					absolute bg-lake-950 bg-opacity-90
					w-full md:w-[80%] md:mx-[10%] lg:w-[70%] lg:mx-[15%]
					h-[45%] bottom-0 md:bottom-[27.5%]
					text-white text-center font-ptserif
					flex items-center
				">
						<div className="w-full">
							<div className="
								font-bold text-4xl md:text-5xl lg:text-6xl
							">
								Whisper Quiet
							</div>
							{<div className="mt-4 md:mt-8 lg:mt-12 text-xs md:text-base lg:text-lg">
								Snap-On Magnetic Panels
							</div>}
						</div>
				</div>
			</div>
			<div className="p-6 md:p-14 lg:p-20 xl:p-28">
		        <h1 className="
		          font-ptserif font-bold 
		          text-2xl/tight md:text-4xl/normal lg:text-5xl/tight xl:text-6xl/tight
		        "
		        >
      				Versatile, easily removable panels that work with every home, every need
    			</h1>

    			<h3 className="
    			  pt-6 md:pt-14 lg:pt-20 xl:pt-28
		          text-neutral-500 font-light
		          text-base/normal md:text-2xl/normal xl:text-4xl/normal
		        ">
		         THE HIGHLIGHTS
		        </h3>
		        <ul className="list-disc pl-8">
		        	<li>Magnetic panel snaps easily on and off in seconds</li>
		        	<li>Easy window access</li>
		        	<li>Modular rental option available</li>
		        	<li>No-drill option available</li>
		        	<li>Compatible with modular blackout, UV, and privacy treatments</li>
		        </ul>

		        <h3 className="
    			  pt-6 pb-4 md:pt-14 lg:pt-20 xl:pt-28
		          text-neutral-500 font-light
		          text-base/normal md:text-2xl/normal xl:text-4xl/normal
		        ">
		         SEE IT IN ACTION
		        </h3>
		        <div className="flex overflow-x-scroll">
        			<div className="
        				ml-1 mr-4 p-2 md:p-4 mb-6 bg-white
        				min-w-[300px] w-[60%] max-w-[600px] shrink-0
        				drop-shadow-[1px_1px_2px_rgba(0,0,0,0.2)]
        				hover:drop-shadow-[1px_1px_3px_rgba(0,0,0,0.25)]
        				hover:cursor-pointer text-sm md:text-base
        				leading-tight
        				"
        			>
        				<Image
							src="/product_pages/bowen.png" 
							width={1600} height={1600}
							style={{width:'100%', height:'40vh', objectFit:'cover'}}
							alt="photo of music studio"
						/>
        				<h1 className="
        					font-bold text-xl md:text-3xl pt-4 pb-6 leading-tight
        				">
        					BLOCKING OUT TRUCK NOISES
        					<br/>
        					<span className="font-normal">
        						IN BROWNSTONES
        					</span>
        				</h1>
        				<h3 className="font-semibold">ISSUE</h3>
        				<p className="pb-6">
        					Loud, echoing second floor rental apartment near Prospect Park. 
        					Given the lease timeline, renter needed a soundproofing solution that 
        					would be quick, 
        					non-structural, and effective.
        				</p>
        				<h3 className="font-semibold">WHERE WE COME IN</h3>
        				<p className="pb-6">
        					Our WhisperQuiet magnetic panels were delivered and installed 
        					within a week of the order. All our products can be installed no-drill.

        				</p>
        				<h3 className="font-semibold">SOLUTION HIGHLIGHTS</h3>
        				<ul className="pb-6 ml-5 list-disc">
        					<li>No-drill option available for renters</li>
        					<li>Window panels blend in with wall and window trimmings</li>
        					<li>Full installation removable within minutes for a smooth move out</li>
        				</ul>
        				<div className="font-bold italic text-brown-700 hover:text-brown-600 underline">
        					See full case study &rarr;
        				</div>
        			</div>
        			<div className="
        				ml-1 mr-4 p-2 md:p-4 mb-6 bg-white
        				min-w-[300px] w-[60%] max-w-[600px] shrink-0
        				drop-shadow-[1px_1px_2px_rgba(0,0,0,0.2)]
        				hover:drop-shadow-[1px_1px_3px_rgba(0,0,0,0.25)]
        				hover:cursor-pointer text-sm md:text-base
        				leading-tight
        				"
        			>
        				<Image
							src="/product_pages/ajay.png" 
							width={1600} height={1600}
							style={{width:'100%', height:'40vh', objectFit:'cover'}}
							alt="photo of music studio"
						/>
        				<h1 className="
        					font-bold text-xl md:text-3xl pt-4 pb-6 leading-tight
        				">
        					SIDE-BY-SIDE PANELS
        					<br/>
        					<span className="font-normal">
        						FOR EXTRA LARGE WINDOWS
        					</span>
        				</h1>
        				<h3 className="font-semibold">ISSUE</h3>
        				<p className="pb-6">
        					Third floor apartment next to the NJ lightrail tracks consistently 
        					exposed to loud train noises. Even multi-pane acoustic grade window replacements
        					do not have large enough air gaps between panes to effectively block out deep, 
        					low-frequency engine sounds.
        				</p>
        				<h3 className="font-semibold">WHERE WE COME IN</h3>
        				<p className="pb-6">
        					Our WhisperQuiet magnetic panels can be installed far away from the existing 
        					window panes, creating a large air gap that is particularly effective 
        					against deeper sounds like trains and engines.
        				</p>
        				<h3 className="font-semibold">SOLUTION HIGHLIGHTS</h3>
        				<ul className="pb-6 ml-5 list-disc">
        					<li>Creates large air gap that effectively reduces low frequency sounds</li>
        					<li>Cut to match existing window frames</li>
        					<li>Each piece can be individually removed for easy window acccess</li>

        				</ul>
        				<div className="font-bold italic text-brown-700 hover:text-brown-600 underline">
        					See full case study &rarr;
        				</div>
        			</div>
        			<div className="
        				ml-1 mr-4 p-2 md:p-4 mb-6 bg-white
        				min-w-[300px] w-[60%] max-w-[600px] shrink-0
        				drop-shadow-[1px_1px_2px_rgba(0,0,0,0.2)]
        				hover:drop-shadow-[1px_1px_3px_rgba(0,0,0,0.25)]
        				hover:cursor-pointer text-sm md:text-base
        				leading-tight
        				"
        			>
        				<Image
							src="/product_pages/mike_s.png" 
							width={1600} height={1600}
							style={{width:'100%', height:'40vh', objectFit:'cover'}}
							alt="photo of music studio"
						/>
        				<h1 className="
        					font-bold text-xl md:text-3xl pt-4 pb-6 leading-tight
        				">
        					SUPERIOR SOUNDPROOFING
        					<br/>
        					<span className="font-normal">
        						AROUND WINDOW AC UNITS
        					</span>
        				</h1>
        				<h3 className="font-semibold">ISSUE</h3>
        				<p className="pb-6">
        					Second floor bedroom outside of busy Brooklyn street with many trucks
        					and sirens. In particular, the window AC lets in a lot of noise.
        				</p>
        				<h3 className="font-semibold">WHERE WE COME IN</h3>
        				<p className="pb-6">
        					Our WhisperQuiet magnetic panel can be custom cut around existing window
        					AC units. Reduced noise by 10dBs even while the AC is running and AC flap is opened.  
        					Closing the AC flap when AC is not in use reduced noise by 20dBs.
        				</p>
        				<h3 className="font-semibold">SOLUTION HIGHLIGHTS</h3>
        				<ul className="pb-6 ml-5 list-disc">
        					<li>No-drill option available for renters</li>
        					<li>Works with all types of window ACs</li>
        					<li>Soundproofs even when AC is in use</li>
        					<li>Magnetic panel is easily removable for window cleaning</li>
        				</ul>
        				<div className="font-bold italic text-brown-700 hover:text-brown-600 underline">
        					See full case study &rarr;
        				</div>
        			</div> 
        			
        			<div className="
        				ml-1 mr-4 p-2 md:p-4 mb-6 bg-white
        				min-w-[300px] w-[60%] max-w-[600px] shrink-0
        				drop-shadow-[1px_1px_2px_rgba(0,0,0,0.2)]
        				hover:drop-shadow-[1px_1px_3px_rgba(0,0,0,0.25)]
        				hover:cursor-pointer text-sm md:text-base
        				leading-tight
        				"
        			>
        				<Image
							src="/product_pages/sonal.png" 
							width={1600} height={1600}
							style={{width:'100%', height:'40vh', objectFit:'cover'}}
							alt="photo of music studio"
						/>
        				<h1 className="
        					font-bold text-xl md:text-3xl pt-4 pb-6 leading-tight
        				">
        					BLOCKING OUT CONSTRUCTION
        					<br/>
        					<span className="font-normal">
        						IN BEDROOM WITH FLOOR-TO-CEILING WINDOWS
        					</span>
        				</h1>
        				<h3 className="font-semibold">ISSUE</h3>
        				<p className="pb-6">
        					Extra large windows are poorly insulated against noise 
        					and temperature, but are also incredibly costly to replace or reinforce.
        				</p>
        				<h3 className="font-semibold">WHERE WE COME IN</h3>
        				<p className="pb-6">
        					By building an extra frame (easily removable) around the window, we are 
        					able to offer a modular setup for large windows that provides superior 
        					soundproofing at a fraction of the price of competing solutions.
        				</p>
        				<h3 className="font-semibold">SOLUTION HIGHLIGHTS</h3>
        				<ul className="pb-6 ml-5 list-disc">
        					<li>Can be cut to fit existing window framing</li>
        					<li>Added frame is easily removable and patchable if needed</li>
        					<li>Easily coupled with our window blinds automation service</li>
        				</ul>
        				<div className="font-bold italic text-brown-700 hover:text-brown-600 underline">
        					See full case study &rarr;
        				</div>
        			</div>
        			<div className="
        				ml-1 mr-4 p-2 md:p-4 mb-6 bg-white
        				min-w-[300px] w-[60%] max-w-[600px] shrink-0
        				drop-shadow-[1px_1px_2px_rgba(0,0,0,0.2)]
        				hover:drop-shadow-[1px_1px_3px_rgba(0,0,0,0.25)]
        				hover:cursor-pointer text-sm md:text-base
        				leading-tight
        				"
        			>
        				<Image
							src="/product_pages/steve_hart.png" 
							width={1600} height={1600}
							style={{width:'100%', height:'40vh', objectFit:'cover'}}
							alt="photo of music studio"
						/>
        				<h1 className="
        					font-bold text-xl md:text-3xl pt-4 pb-6 leading-tight
        				">
        					CUSTOM DESIGNS
        					<br/>
        					<span className="font-normal">
        						FOR TIGHT SPACES AND WINDOW CRANKS
        					</span>
        				</h1>
        				<h3 className="font-semibold">ISSUE</h3>
        				<p className="pb-6">
        					Shallow window frames with multiple curtains and blinds installed make it 
        					difficult to reinforce and soundproof home.
        				</p>
        				<h3 className="font-semibold">WHERE WE COME IN</h3>
        				<p className="pb-6">
        					Our custom-cut magnetic panels can work with just 1" of space and 
        					can be cut around handles and crank to fit any space.
        				</p>
        				<h3 className="font-semibold">SOLUTION HIGHLIGHTS</h3>
        				<ul className="pb-6 ml-5 list-disc">
        					<li>Only needs 1" of space to be installed</li>
        					<li>Can be installed no-drill in historic homes</li>
        					<li>Fits around handles while providing a tight seal</li>
        				</ul>
        				<div className="font-bold italic text-brown-700 hover:text-brown-600 underline">
        					See full case study &rarr;
        				</div>
        			</div>       			
        		</div>

     
    		</div>
    		<div className="bg-lake-50 p-6 md:p-14 lg:p-20 xl:p-28">
    			<h3 className="
    			  pt-6 pb-4 md:pt-14 lg:pt-20 xl:pt-28
		          text-neutral-500 font-light
		          text-base/normal md:text-2xl/normal xl:text-4xl/normal
		        ">
		        	HOW IT WORKS
		        </h3>
		        <h2 className="
		          font-ptserif font-bold 
		          text-2xl/tight md:text-4xl/normal lg:text-5xl/tight xl:text-6xl/tight
		        "
		        >
      				SIMPLE. PRECISE. <br/>
      				FULL PROCESS TAKES 10 DAYS.
    			</h2>
    			<ol className="list-decimal pl-4 pt-8 pb-6 md:pb-14 lg:pb-20 xl:pb-28">
    				<li>Text us a picture of your window + rough measurements to 929-565-2726</li>
    				<li>We give you a quote</li>
    				<li>We come measure your windows</li>
    				<li>Custom window insert made in our warehouse in Queens, NY</li>
    				<li>We come install</li>
    				<li>Enjoy your home with more calm and quiet!</li>
    			</ol>
        	</div>
        	<div className="p-6 md:p-14 lg:p-20 xl:p-28">
        		<h3 className="
    			  pt-6 pb-4 md:pt-14 lg:pt-20 xl:pt-28
		          text-neutral-500 font-light
		          text-base/normal md:text-2xl/normal xl:text-4xl/normal
		        ">
		        	PERFORMANCE SPECS
		        </h3>
		        <table className="mt-2 mb-2 w-full max-w-[500px] leading-relaxed">
		        	<tbody>

		        	<tr className="border-b border-brown-950">
		        		<th className="text-left border-r border-brown-950 font-medium">Panel Grades</th>
		        		<th>STC</th>
		        		<th>LB/FT<sup>2</sup></th>
		        	</tr>
		        	<tr className="font-light">
		        		<th className="text-left border-r border-brown-950 font-normal">1/8"</th>
		        		<th className="font-normal">25</th>
		        		<th className="font-normal">0.8</th>
		        	</tr>
		        	<tr className="font-light">
		        		<th className="text-left border-r border-brown-950 font-normal">1/4"</th>
		        		<th className="font-normal">29</th>
		        		<th className="font-normal">1.5</th>
		        	</tr>
		        	<tr className="font-light">
		        		<th className="text-left border-r border-brown-950 font-normal">3/8"</th>
		        		<th className="font-normal">32</th>
		        		<th className="font-normal">2.3</th>
		        	</tr>
		        	<tr className="font-light">
		        		<th className="text-left border-r border-brown-950 font-normal">1/2"</th>
		        		<th className="font-normal">33</th>
		        		<th className="font-normal">3.1</th>
		        	</tr>
		        	</tbody>
		        </table>
		        <div className="mb-8 text-sm text-brown-700 underline font-medium hover:cursor-pointer">
		        	<a href="/resources/whisper_window_product_specs.pdf" target="_blank">
		        		Full Spec Sheet
		        	</a>
		        </div>
		        <div className="mb-3">
		        	<span className="font-medium">Suitable window types: </span>
		        	Suitable for all window types and allows easy window access. Particularly well-suited for 
		        	double-hung windows, casement windows, 
		        	sliding windows, side-by-side windows, and uneven windows
		        </div>
		        <div className="mb-3">
		        	<span className="font-medium">Minimum window frame depth required: </span>
		        	1" 
		        </div>
		        <div className="mb-3">
		        	<span className="font-medium">Recommended distance from existing window panes: </span>
		        	&gt;6" 
		        </div>
		        <div className="mb-3">
		        	<span className="font-medium">Installation methods: </span>
		        	No-drill and drill-in options
		        </div>
		        <div className="mb-3">
		        	<span className="font-medium">Material: </span>
		        	Acrylic (plexiglass)
		        </div>
		        <div className="mb-3">
		        	<span className="font-medium">Removal: </span>
		        	Easy removal and reinsertion with no tool needed
		        </div>

		        <div className="mb-3">
		        	<span className="font-medium">Window & Blinds Access: </span>
		        	Multiple configurations to support easy window opening. Product requires no change 
		        	to most existing blind/curtain setups
		        </div>

		        <h3 className="
    			  pt-6 pb-4 md:pt-14 lg:pt-20 xl:pt-28
		          text-neutral-500 font-light
		          text-base/normal md:text-2xl/normal xl:text-4xl/normal
		        ">
		        	PRICING GUIDELINE
		        </h3>
		        <div className="flex flex-wrap">
		        	<div className="w-[50%] lg:w-[25%]">
		        		<Image
							src="/window_diagrams/window_sketch_3x3.png" 
							width={960} height={960}
							style={{width:'100%', height:'auto', objectFit:'cover'}}
							alt="photo of music studio"
						/>
						<div className="
							text-center text-brown-800
							mt-2 mb-6 leading-tight 
							text-sm md:text-base
						">
							<div className="font-bold ">
								Small Window
							</div>
							<div>3' x 3'</div>
							<div>1/4": $420"</div>
							<div>3/8": $600"</div>
						</div>
		        	</div>
		        	<div className="w-[50%] lg:w-[25%]">
		        		<Image
							src="/window_diagrams/window_sketch_3x5.5.png" 
							width={960} height={960}
							style={{width:'100%', height:'auto', objectFit:'cover'}}
							alt="photo of music studio"
						/>
						<div className="
							text-center text-brown-800
							mt-2 mb-6 leading-tight 
							text-sm md:text-base
						">
							<div className="font-bold ">
								Average Window
							</div>
							<div>3' x 5.5'</div>
							<div>1/4": $725"</div>
							<div>3/8": $995"</div>
						</div>
		        	</div>
		        	<div className="w-[50%] lg:w-[25%]">
		        		<Image
							src="/window_diagrams/window_sketch_4x8.png" 
							width={960} height={960}
							style={{width:'100%', height:'auto', objectFit:'cover'}}
							alt="photo of music studio"
						/>
						<div className="
							text-center text-brown-800
							mt-2 mb-6 leading-tight 
							text-sm md:text-base
						">
							<div className="font-bold ">
								Large Window
							</div>
							<div>4' x 8'</div>
							<div>1/4": $1200"</div>
							<div>3/8": $1650"</div>
						</div>
		        	</div>
		        	<div className="w-[50%] lg:w-[25%]">
		        		<Image
							src="/window_diagrams/window_sketch_8x8.png" 
							width={960} height={960}
							style={{width:'100%', height:'auto', objectFit:'cover'}}
							alt="photo of music studio"
						/>
						<div className="
							text-center text-brown-800
							mt-2 mb-6 leading-tight 
							text-sm md:text-base
						">
							<div className="font-bold ">
								Floor-To-Ceiling / Full Wall
							</div>
							<div>8' x 8'</div>
							<div>1/4": $1950"</div>
							<div>3/8": $2650"</div>
						</div>
		        	</div>
		        </div>

		        
		    </div>
		    <ContactForm/>

			

		</div>



	)
}