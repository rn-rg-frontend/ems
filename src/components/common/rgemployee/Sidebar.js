'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { LayoutDashboard, Users, CircleDollarSign, HandCoins, Home, CalendarDays, MenuIcon } from 'lucide-react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
function Sidebar() {
  const pathname = usePathname()

  return (
    <div className='md:w-1/5  flex   px-5 py-2 gap-1 md:border-e border-gray-300 text-gray-600'>
      <div className='w-full hidden md:flex flex-col gap-2'>
        <Link href='/rgemployee/announcement' className={`flex items-center gap-2 cursor-pointer p-2 border hover:border-rgtheme hover:text-rgtheme ${pathname === '/rgemployee/announcement' && 'border-rgtheme text-rgtheme'}  rounded`}><LayoutDashboard className='' /> <span> Company Profile and
          Annocements</span></Link>
        <Link href='/rgemployee' className={`flex items-center gap-2 cursor-pointer p-2 border hover:border-rgtheme hover:text-rgtheme ${pathname === '/rgemployee' && 'border-rgtheme text-rgtheme'}  rounded`}><Users /><span>My Profile</span></Link>
        <Link href='/rgemployee/leaveapplication' className={`flex items-center gap-2 cursor-pointer p-2 border hover:border-rgtheme hover:text-rgtheme ${pathname === '/rgemployee/leaveapplication' && 'border-rgtheme text-rgtheme'}  rounded`}><CalendarDays /><span> Leave Application</span></Link>
        <Link href='/rgemployee/wfhapplication' className={`flex items-center gap-2 cursor-pointer p-2 border hover:border-rgtheme hover:text-rgtheme ${pathname === '/rgemployee/wfhapplicationt' && 'border-rgtheme text-rgtheme'}  rounded`}><Home /><span>WFH Application</span></Link>

      </div>
      
    </div>
  )
}

export default Sidebar