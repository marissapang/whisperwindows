import NavBar from "../../../components/NavBar.tsx";
import ContactForm from "../../../components/ContactForm";
import Image from "next/image";
import Head from 'next/head';


export default function Page() {
	return (
		<div className="font-mukta text-brown-900">
			<Head>
		        <title>WhisperInvisible Insert | Seamless No-Drill Soundproofing</title>
		        <meta property="og:title" content="WhisperInvisible Insert | Seamless No-Drill Soundproofing" key="title" />
		        <meta property="og:description" content="WhisperInvisible Window Inserts offer noise reduction and insulation that blends into modern and historic homes. No-drill, no-adhesive design ideal for rentals and preservations." key="description" />

		      </Head>
			<NavBar/>
			<div className="relative -mt-20 w-full">
				<Image
					src="/product_pages/young_piano_room.jpeg" 
					width={1600} height={1600}
					style={{width:'100%', minHeight:'70vh', maxHeight:'100vh', objectFit:'cover'}}
					alt="photo of music studio"
				/>
				<div className="
					absolute bg-brown-900 bg-opacity-90
					w-full md:w-[80%] md:mx-[10%] lg:w-[70%] lg:mx-[15%]
					h-[45%] bottom-0 md:bottom-[27.5%]
					text-white text-center font-ptserif
					flex items-center
				">
						<div className="w-full">
							<div className="
								font-bold text-4xl md:text-5xl lg:text-6xl
							">
								Whisper Invisible
							</div>
							{<div className="mt-4 md:mt-8 lg:mt-12 text-xs md:text-base lg:text-lg">
								No-Drill Compression Soundproof Inserts
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
      				Blocks out noise, heat, cold, dust, draft, and UV — installed in 5 minutes
    			</h1>

    			<h3 className="
    			  pt-6 md:pt-14 lg:pt-20 xl:pt-28
		          text-neutral-500 font-light
		          text-base/normal md:text-2xl/normal xl:text-4xl/normal
		        ">
		         THE HIGHLIGHTS
		        </h3>
		        <ul className="list-disc pl-8">
		        	<li>No drill, no adhesives</li>
		        	<li>Unnoticeable once installed</li>
		        	<li>High performing, up to 5x as thick as standard window glass </li>
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
							src="/product_pages/may_andres.jpeg" 
							width={1600} height={1600}
							style={{width:'100%', height:'40vh', objectFit:'cover'}}
							alt="photo of music studio"
						/>
        				<h1 className="
        					font-bold text-xl md:text-3xl pt-4 pb-6 leading-tight
        				">
        					NOISE AND TEMPERATURE INSULATION
        					<br/>
        					<span className="font-normal">
        						FOR FLOOR-TO-CEILING WINDOWS
        					</span>
        				</h1>
        				<h3 className="font-semibold">ISSUE</h3>
        				<p className="pb-6">
        					Large windows are poorly insulated against heat/cold and let in lots of noise. 
        					Window replacements are difficult in curtain-wall buildings. 
        				</p>
        				<h3 className="font-semibold">WHERE WE COME IN</h3>
        				<p className="pb-6">
        					Our WhisperInvisible compression inserts add an unnoticeable layer of thick paneling 
        					that achieves the impact of the highest-end acoustic windows without any of the hassle
        					of window replacement.
        				</p>
        				<h3 className="font-semibold">SOLUTION HIGHLIGHTS</h3>
        				<ul className="pb-6 ml-5 list-disc">
        					<li>No-drill, no-construction</li>
        					<li>Works with only 3/4" recess in window frame </li>
        					<li>Product unnoticeable post installation </li>
        					<li>Panels do not impact day-to-day use of windows </li>
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
							src="/page_photos/historic-tile-480.png" 
							width={1600} height={1600}
							style={{width:'100%', height:'40vh', objectFit:'cover'}}
							alt="photo of music studio"
						/>
        				<h1 className="
        					font-bold text-xl md:text-3xl pt-4 pb-6 leading-tight
        				">
        					NO-DRILL PROTECTION AND INSULATION
        					<br/>
        					<span className="font-normal">
        						FOR HISTORIC HOMES
        					</span>
        				</h1>
        				<h3 className="font-semibold">ISSUE</h3>
        				<p className="pb-6">
        					Single-paned historic windows offer poor insulation and are incredibly
        					difficult to replace or reinforce with storm windows from cost, regulatory, 
        					and aesthetic perspectives.
        				</p>
        				<h3 className="font-semibold">WHERE WE COME IN</h3>
        				<p className="pb-6">
        					Our custom-cut compression inserts achieve a tight fit and perfect seal even in uneven 
        					window frames, giving you an effective secondary glazing that's completely no-drill 
        					and easily removable in 30 seconds.
        				</p>
        				<h3 className="font-semibold">SOLUTION HIGHLIGHTS</h3>
        				<ul className="pb-6 ml-5 list-disc">
        					<li>No drillling, no permitting necessary</li>
        					<li>Product unnoticeable post installation </li>
        					<li>3x thicker, 20x stronger, and 5x more insulating than existing historic windows</li>
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
							src="/product_pages/inward_window_straightened.png" 
							width={1600} height={1600}
							style={{width:'100%', height:'40vh', objectFit:'cover'}}
							alt="photo of music studio"
						/>
        				<h1 className="
        					font-bold text-xl md:text-3xl pt-4 pb-6 leading-tight
        				">
        					INVISIBLE INSULATION 
        					<br/>
        					<span className="font-normal">
        						FOR PICTURE WINDOWS
        					</span>
        				</h1>
        				<h3 className="font-semibold">ISSUE</h3>
        				<p className="pb-6">
        					Picture windows do not open. They let in amazing natural light, 
        					but also opens up the home to more noise and less climate insulation. 
        				</p>
        				<h3 className="font-semibold">WHERE WE COME IN</h3>
        				<p className="pb-6">
        					When installed inside a deep window frame, 
        					our compression inserts are several times more effective than even
        					the highest-end acoustic window replacements. Best of all, it is 
        					barely noticeable post installation. 
        				</p>
        				<h3 className="font-semibold">SOLUTION HIGHLIGHTS</h3>
        				<ul className="pb-6 ml-5 list-disc">
        					<li>No-drill, no-construction</li>
        					<li>Preserves full view of picture window</li>
        					<li>Best for picture windows or windows that are not opened often</li>
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
    				<li>Text us a picture of your window + measurements to 929-565-2726</li>
    				<li>We give you a quote</li>
    				<li>We come measure your windows</li>
    				<li>Custom window insert made in our warehouse in Queens, New York City</li>
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
		        	Floor-to-ceiling, historic preservation, aluminum windows, curtain-wall buildings, 
		        	picture windows, windows opened infrequently 
		        </div>
		        <div className="mb-3">
		        	<span className="font-medium">Minimum window frame depth required: </span>
		        	3/4" 
		        </div>
		        <div className="mb-3">
		        	<span className="font-medium">Recommended distance from existing window panes: </span>
		        	>6" 
		        </div>
		        <div className="mb-3">
		        	<span className="font-medium">Installation methods: </span>
		        	No-drill and no-adhesive 
		        </div>
		        <div className="mb-3">
		        	<span className="font-medium">Material: </span>
		        	Acrylic / plexiglass (default), polycarbonate / lexan (upon request)
		        </div>
		        <div className="mb-3">
		        	<span className="font-medium">Removal: </span>
		        	Removal with suction cups included with your purchase
		        </div>
		        <div className="mb-3">
		        	<span className="font-medium">Recommended removal frequency: </span>
		        	&lt;10x per year 
		        </div>
		        <div className="mb-3">
		        	<span className="font-medium">Window & Blinds Access: </span>
		        	Insert must be removed for window access. Blinds must be placed outside of panel.
		        	<br/>
		        	<span className="font-medium underline italic text-brown-700 hover:cursor-pointer">
		        		For easier window and blinds access, please see our magnetic panels
		        	</span>
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
							<div>1/4": $350"</div>
							<div>3/8": $475"</div>
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
							<div>1/4": $650"</div>
							<div>3/8": $925"</div>
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
							<div>1/4": $950"</div>
							<div>3/8": $1300"</div>
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
							<div>1/4": $1375"</div>
							<div>3/8": $1950"</div>
						</div>
		        	</div>
		        </div>

		        
		    </div>
		    <ContactForm/>

			

		</div>



	)
}