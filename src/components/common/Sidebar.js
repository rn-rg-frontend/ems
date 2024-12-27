'use client'
import React from 'react'
import { Button } from '../ui/button'
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
        <Link href='/admin' className={`flex items-center gap-2 cursor-pointer p-2 border hover:border-rgtheme hover:text-rgtheme ${pathname === '/admin' && 'border-rgtheme text-rgtheme'}  rounded`}><LayoutDashboard className='' /> <span>Company Profile and Annocements</span></Link>
        <Link href='/admin/employees' className={`flex items-center gap-2 cursor-pointer p-2 border hover:border-rgtheme hover:text-rgtheme ${pathname === '/admin/employees' && 'border-rgtheme text-rgtheme'}  rounded`}><Users /><span>All Employees</span></Link>
        <Link href='/admin/leavemanagement' className={`flex items-center gap-2 cursor-pointer p-2 border hover:border-rgtheme hover:text-rgtheme ${pathname === '/admin/leavemanagement' && 'border-rgtheme text-rgtheme'}  rounded`}><CalendarDays /><span>Leave Management</span></Link>
        <Link href='/admin/wfhmanagement' className={`flex items-center gap-2 cursor-pointer p-2 border hover:border-rgtheme hover:text-rgtheme ${pathname === '/admin/wfhmanagement' && 'border-rgtheme text-rgtheme'}  rounded`}><Home /><span>WFH Management</span></Link>
        <Link href='/admin/expencemanagement' className={`flex items-center gap-2 cursor-pointer p-2 border hover:border-rgtheme hover:text-rgtheme ${pathname === '/admin/expencemanagement' && 'border-rgtheme text-rgtheme'}  rounded`}><HandCoins /><span>Expense Management</span></Link>
        <Link href='/admin/salarymanagement' className={`flex items-center gap-2 cursor-pointer p-2 border hover:border-rgtheme hover:text-rgtheme ${pathname === '/admin/salarymanagement' && 'border-rgtheme text-rgtheme'}  rounded`}><CircleDollarSign /><span>Salary</span></Link>
      </div>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="lg:hidden">
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
          <div className="grid w-[200px] p-4">
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

export default Sidebar