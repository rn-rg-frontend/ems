'use client'
import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { signOut, useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Users, CircleDollarSign, HandCoins, Home, CalendarDays, MenuIcon } from 'lucide-react'

import Link from 'next/link'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
function Navbar() {
  const { data: session } = useSession()
   const pathname = usePathname()
  console.log(session)
  const logout = async () => {
    try {
      await signOut({callbackUrl:'/'});
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className="flex justify-between flex-wrap m-2 px-2 py-2 items-center">
      <div className='flex md:flex-row flex-col items-center  flex-shrink-0'>
        <Image src={'/RG.jpeg'} width={50} height={50} alt="rglogo" className='md:w-10 md:h-10 w-8 h-8' />
        <div className='flex flex-col items-center justify-center'>
          <p><span className='text-rgtheme md:text-xl md:font-bold font-semibold text-base'>Rotten </span><span className='text-rgtheme2  md:text-xl md:font-bold font-semibold text-bas'>Grapes</span></p>
          <p className='text-sm text-gray-500 font-bold relative w-full text-center'><span>Pvt.Ltd</span><span className='w-4/5 absolute border-1 border-gray-500 top-1/2'></span></p>
        </div>
      </div>
      <p className='md:text-2xl md:font-bold sm:text-xl text-base font-semibold'>Admin Panel</p>
      {
        session?.user &&
        <Button onClick={logout}>
          Logout
        </Button>
      }

<Sheet >
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>

        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle className='hidden'></SheetTitle>
            <SheetDescription className='hidden'> 
            </SheetDescription>
          </SheetHeader>
          <div className="grid w-11/12 p-1">
          <Link href='/admin' className={`flex items-center gap-2 cursor-pointer p-2 border hover:border-rgtheme hover:text-rgtheme ${pathname === '/admin' && 'border-rgtheme text-rgtheme'}  rounded`}><LayoutDashboard className='' /> <span>Company Profile and Annocements</span></Link>
        <Link href='/admin/employees' className={`flex items-center gap-2 cursor-pointer p-2 border hover:border-rgtheme hover:text-rgtheme ${pathname === '/admin/employees' && 'border-rgtheme text-rgtheme'}  rounded`}><Users /><span>All Employees</span></Link>
        <Link href='/admin/leavemanagement' className={`flex items-center gap-2 cursor-pointer p-2 border hover:border-rgtheme hover:text-rgtheme ${pathname === '/admin/leavemanagement' && 'border-rgtheme text-rgtheme'}  rounded`}><CalendarDays /><span>Leave Management</span></Link>
        <Link href='/admin/wfhmanagement' className={`flex items-center gap-2 cursor-pointer p-2 border hover:border-rgtheme hover:text-rgtheme ${pathname === '/admin/wfhmanagement' && 'border-rgtheme text-rgtheme'}  rounded`}><Home /><span>WFH Management</span></Link>
        <Link href='/admin/expencemanagement' className={`flex items-center gap-2 cursor-pointer p-2 border hover:border-rgtheme hover:text-rgtheme ${pathname === '/admin/expencemanagement' && 'border-rgtheme text-rgtheme'}  rounded`}><HandCoins /><span>Expense Management</span></Link>
        <Link href='/admin/salarymanagement' className={`flex items-center gap-2 cursor-pointer p-2 border hover:border-rgtheme hover:text-rgtheme ${pathname === '/admin/salarymanagementP' && 'border-rgtheme text-rgtheme'}  rounded`}><CircleDollarSign /><span>Salary</span></Link>


          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default Navbar