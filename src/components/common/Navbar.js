import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
function Navbar() {
  return (
    <div className="flex justify-between m-2 px-2 py-2 items-center ">
      <div className='flex items-center'>
        <Image src={'/RG.jpeg'} width={50} height={50} alt="rglogo" className='w-10 h-10' />
        <p className='text-xl font-bold'><span className='text-rgtheme'>Rotten </span><span className='text-rgtheme2'>Grapes</span></p>
      </div>
      <p className='text-2xl font-bold'>Admin Pannel</p>
      <Button>
                Login
            </Button>
    </div>
  )
}

export default Navbar