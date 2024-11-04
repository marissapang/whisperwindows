'use client';
import Image from "next/image";

export default function IconWithLabel(props){

	return (
		<div className="w-[30%]">
			<div className="">
				<Image
					src={props.src}
					alt={props.alt}
					width={600} 
					height={600}
	            	style={{ width: '25%', height: 'auto', margin:'0 auto'}}
				/>
			</div>
			<div className="text-xs md:text-sm pt-2 px-0 md:px-4">{props.label}</div>
		</div>
	)
}