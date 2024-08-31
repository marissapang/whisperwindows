import Image from "next/image";
import NavBar from "./components/navBar";
import IconWithLabel from "./components/IconWithLabel";

export default function Home() {
  return (
    <main className="font-mukta text-brown-900">
      <NavBar/>
      <div className="relative -mt-20 max-w-100vw">
        <div className="">
          <Image 
            src="/page_photos/home_banner.jpg" 
            width={1600} height={1200}
            style={{ width: '100%', minHeight:'80vh', maxHeight: '100vh', objectFit:'cover'}}
            alt="man inserting whisper window soundproof panel into window"
          />
        </div>
        <div className="
          absolute
          bg-gradient-to-t from-lake-950 via-lake-900 via-20% to-transparent
          opacity-85
          w-full h-[40%] top-[60%] md:h-[60%] md:top-[40%]
        "/>

        <div className="
          absolute m-0 m-auto
          text-center text-white font-ptserif 
          xs: top-[63%] sm:top-[65%] w-[70%] left-[15%]
          md:top-[60%] md:w-[50%] md:left-[25%]
          lg:top-[55%]
        ">
          <h2 className="
            text-2xl md:text-4xl/tight lg:text-5xl/tight xl:text-6xl/tight
            lg:max-w-[650px] lg:m-auto
          ">
            Block out 90% of noise in 7 days
          </h2>
          <div className="
            flex justify-around max-w-[500px] m-0 m-auto
            py-8 lg:py-14

          ">
            <IconWithLabel 
              label="Blocks UV, dust, draft"
              src="/icons/block_wind-white-240px.png" 
              alt="placeholder"
            />
            <IconWithLabel 
              label="Temperature Control"
              src="/icons/meter-white-240px.png" 
              alt="placeholder"
            />
            <IconWithLabel 
              label="Easy No-Drill Options"
              src="/icons/checkmark-white-240px.png" 
              alt="placeholder"
            />
          </div>
        </div>
      </div>

      <div className="p-6 md:p-14 lg:p-20 xl:p-28">
        <h1 className="
          font-ptserif font-bold 
          text-2xl/tight md:text-4xl/normal lg:text-5xl/tight xl:text-6xl/tight
        "
        >
          Quiet homes, warm winters, and more with your Whisper Window Panel
        </h1>
        <div className="
          text-sm/tight 
          md:my-6 md:text-lg/tight
          lg:text-2xl/tight"
        >
          <p className="my-4 lg:my-8 w-[95%] md:w-[85%]">
            Our scientifically designed panels excel at blocking noise, heat, cold, dust, 
            and UV — way more than regular window glass
          </p>
          <button className="
            p-2 md:p-4 lg:px-6 rounded-sm
            border-2 border-brown-800 text-brown-800 
            font-semibold
            hover:border-brown-600 hover:text-brown-600 hover:drop-shadow-md
          ">
            Material & Specs
          </button>
        </div>
      </div>

      <div className="flex pb-20 px-6 md:px-14 lg:px-20 xl:px-28">
        <div className="w-[55%] mr-2 md:mr-4">
          <Image
              src="/page_photos/kyra_wql_crop.jpg" 
              width={1000} height={1000}
              alt="phone icon"
              style={{width:"100%", height:"100%"}}
            />
        </div>
        <div className="w-[45%] max-h-[100%]">
          <div className="">
            <Image
                src="/page_photos/ajay_sbs_crop.jpg" 
                width={1000} height={1000}
                alt="phone icon"  
                style={{width:"100%", height:"100%"}}
            />
          </div>
          <div className="mt-2 md:mt-4">
            <Image
                src="/page_photos/bowen_wql_crop.jpg"
                width={1000} height={1000}
                alt="phone icon"
                style={{width:"100%", height:"100%"}}
            />
          </div>
        </div>
      </div>
      
      <div className="
        bg-[#DFE3E5]
        p-6 md:p-14 lg:p-20 xl:p-28
        ">
        <h3 className="
          text-neutral-500 font-light
          text-base/normal md:text-2xl/normal xl:text-4xl/normal
        ">
          HOW IT WORKS
        </h3>
        <h2 className="
          font-ptserif font-bold 
          text-2xl/tight md:text-4xl/normal lg:text-5xl/tight xl:text-6xl/tight"
        >
          More Effective, More Aesthetic, Less Work
        </h2>
        <div className="">
          <Image 
            src="/page_photos/panel_rendering_w_overlay_text.png" 
            width={2400} height={2400}
            style={{ width: '100%', maxWidth:'1024',height:'auto', minHeight:'35vh', margin:'0 auto',objectFit:'cover'}}
            alt="man inserting whisper window soundproof panel into window"
          />
        </div>
      </div>

      <div className="
        mt-6
        p-6 md:p-14 lg:p-20 xl:p-28
        ">
        <h3 className="
          text-neutral-500 font-light
          text-base/normal md:text-2xl/normal xl:text-4xl/normal
        ">
          PRICING & PROCESS
        </h3>
        <h2 className="
          font-ptserif font-bold 
          text-2xl/tight md:text-4xl/normal lg:text-5xl/tight xl:text-6xl/tight"
        >
          Configure online, get it next week
        </h2>
        <div className="w-[95%] md:w-[85%]">
          <p className="mt-6 font-medium">
           Our best pricing is online!
          </p>
          <p className="mt-4 text-base/tight">
           Go through our online questionnaire to select the product 
           option that works best for you. We provide a full fit and satisfaction 
           guarantee for all our orders placed online.
          </p>
          <button className="
              rounded-full
              my-4
              pl-1.5 pr-10
              border-2 border-brown-800 text-brown-800 
              font-semibold
              hover:border-brown-600 hover:text-brown-600 hover:drop-shadow-md 
              hover:cursor-pointer
            ">
            Get a quote now
          </button>
        </div>
      </div>
      <div className="z-10 w-full max-w-5xl items-center font-mukta text-sm bg-brown-50">
        <h1 className="font-ptserif font-bold text-lake-900 " >
          Testing
        </h1>
        <p>Bleh regular</p>
        <p className="font-medium">Belh medium</p>
        <p className="font-bold">Belh medium</p>
        <p className="font-bold">
          dTrying to put a lot of text in here, a lot of text in here, 
          a lot of text in here. Trying to put a lot of text in here, a lot of text in here, 
          a lot of text in here. Trying to put a lot of text in here, a lot of text in here, 
          a lot of text in here. Trying to put a lot of text in here, a lot of text in here, 
          a lot of text in here. Trying to put a lot of text in here, a lot of text in here, 
          a lot of text in here. Trying to put a lot of text in here, a lot of text in here, 
          a lot of text in here. Trying to put a lot of text in here, a lot of text in here, 
          a lot of text in here. Trying to put a lot of text in here, a lot of text in here, 
          a lot of text in here. Trying to put a lot of text in here, a lot of text in here, 
          a lot of text in here. 
        </p>
        <p className="font-bold">
          Trying to put a lot of text in here, a lot of text in here, 
          a lot of text in here. Trying to put a lot of text in here, a lot of text in here, 
          a lot of text in here. Trying to put a lot of text in here, a lot of text in here, 
          a lot of text in here. Trying to put a lot of text in here, a lot of text in here, 
          a lot of text in here. Trying to put a lot of text in here, a lot of text in here, 
          a lot of text in here. Trying to put a lot of text in here, a lot of text in here, 
          a lot of text in here. Trying to put a lot of text in here, a lot of text in here, 
          a lot of text in here. Trying to put a lot of text in here, a lot of text in here, 
          a lot of text in here. Trying to put a lot of text in here, a lot of text in here, 
          a lot of text in here. 
        </p><p className="font-bold">
          Trying to put a lot of text in here, a lot of text in here, 
          a lot of text in here. Trying to put a lot of text in here, a lot of text in here, 
          a lot of text in here. Trying to put a lot of text in here, a lot of text in here, 
          a lot of text in here. Trying to put a lot of text in here, a lot of text in here, 
          a lot of text in here. Trying to put a lot of text in here, a lot of text in here, 
          a lot of text in here. Trying to put a lot of text in here, a lot of text in here, 
          a lot of text in here. Trying to put a lot of text in here, a lot of text in here, 
          a lot of text in here. Trying to put a lot of text in here, a lot of text in here, 
          a lot of text in here. Trying to put a lot of text in here, a lot of text in here, 
          a lot of text in here. 
        </p><p className="font-bold">
          Trying to put a lot of text in here, a lot of text in here, 
          a lot of text in here. Trying to put a lot of text in here, a lot of text in here, 
          a lot of text in here. Trying to put a lot of text in here, a lot of text in here, 
          a lot of text in here. Trying to put a lot of text in here, a lot of text in here, 
          a lot of text in here. Trying to put a lot of text in here, a lot of text in here, 
          a lot of text in here. Trying to put a lot of text in here, a lot of text in here, 
          a lot of text in here. Trying to put a lot of text in here, a lot of text in here, 
          a lot of text in here. Trying to put a lot of text in here, a lot of text in here, 
          a lot of text in here. Trying to put a lot of text in here, a lot of text in here, 
          a lot of text in here. 
        </p><p className="font-bold">
          Trying to put a lot of text in here, a lot of text in here, 
          a lot of text in here. Trying to put a lot of text in here, a lot of text in here, 
          a lot of text in here. Trying to put a lot of text in here, a lot of text in here, 
          a lot of text in here. Trying to put a lot of text in here, a lot of text in here, 
          a lot of text in here. Trying to put a lot of text in here, a lot of text in here, 
          a lot of text in here. Trying to put a lot of text in here, a lot of text in here, 
          a lot of text in here. Trying to put a lot of text in here, a lot of text in here, 
          a lot of text in here. Trying to put a lot of text in here, a lot of text in here, 
          a lot of text in here. Trying to put a lot of text in here, a lot of text in here, 
          a lot of text in here. 
        </p>
      </div>

      
      <div className="bg-accent-mint h-[800px]">
        place holder for another color
      </div>
    </main>
  );
}
