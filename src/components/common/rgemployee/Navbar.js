import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
function Navbar() {
  return (
    <div className="flex justify-between flex-wrap m-2 px-2 py-2 items-center ">
      <div className='flex items-center  flex-shrink-0'>
        <Image src={'/RG.jpeg'} width={50} height={50} alt="rglogo" className='md:w-10 md:h-10 w-8 h-8' />
        <div className='flex flex-col items-center justify-center'>
          <p><span className='text-rgtheme md:text-xl md:font-bold font-semibold text-base'>Rotten </span><span className='text-rgtheme2  md:text-xl md:font-bold font-semibold text-bas'>Grapes</span></p>
          <p className='text-sm text-gray-500 font-bold relative w-full text-center'><span>Pvt.Ltd</span><span className='w-4/5 absolute border-1 border-gray-500 top-1/2'></span></p>
        </div>
      </div>
      <p className='md:text-2xl md:font-bold text-lg font-semibold'>Hello Rohan</p>
      <Button>
        Login
      </Button>

    </div>
  )
}

export default Navbar