import Image from "next/image";

export default function HomepageTile(props) {
	return (
		<div className='pt-6 pr-2 min-w-[300px] w-[30%]'>
			<Image 
	            src={props.src} 
	            width={480} height={720}
	            style={{ width: '100%', height: 'auto', objectFit:'cover', borderRadius:'5px'}}
	            alt={props.caption}
          	/>
          <div className='pt-1 pb-6 text-lg font-medium'>
          	{props.caption}
          </div>
		</div>
	)
}