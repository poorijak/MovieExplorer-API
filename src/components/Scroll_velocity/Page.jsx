import React from 'react'
import { VelocityScroll } from "../../../components/ui/scroll-based-velocity";



function VelocityScrollItem() {
    return (
        <div>
            <VelocityScroll className={'text-8xl font-bold'}>MovieExplorer</VelocityScroll>
        </div>
    )
}


const Page = () => {
  return (
    <div className='w-full overflow-hidden mt-20'>
        <VelocityScrollItem/>
    </div>
    
  )
}

export default Page
