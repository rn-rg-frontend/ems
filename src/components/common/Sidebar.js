'use client'
import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { LayoutDashboard,Users,CircleDollarSign,HandCoins, Home,CalendarDays } from 'lucide-react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
function Sidebar() {
  const pathname = usePathname()

  return (
    <div className='w-1/5 flex  flex-col px-5 py-2 gap-1 border-e border-gray-300 text-gray-600'>
        <Link href='/' className={`flex items-center gap-2 cursor-pointer p-2 border hover:border-rgtheme hover:text-rgtheme ${pathname === '/' && 'border-rgtheme text-rgtheme'}  rounded`}><LayoutDashboard className=''/> <span>Company Profile and Annocements</span></Link>
        <Link href='/employees' className={`flex items-center gap-2 cursor-pointer p-2 border hover:border-rgtheme hover:text-rgtheme ${pathname === '/employees' && 'border-rgtheme text-rgtheme'}  rounded`}><Users /><span>All Employees</span></Link>
        <Link href='/leavemanagement' className={`flex items-center gap-2 cursor-pointer p-2 border hover:border-rgtheme hover:text-rgtheme ${pathname === '/leavemanagement' && 'border-rgtheme text-rgtheme'}  rounded`}><CalendarDays /><span>Leave Management</span></Link>
        <Link href='/wfhmanagement' className={`flex items-center gap-2 cursor-pointer p-2 border hover:border-rgtheme hover:text-rgtheme ${pathname === '/wfhmanagement' && 'border-rgtheme text-rgtheme'}  rounded`}><Home/><span>WFH Management</span></Link>
        <Link href='/expencemanagement' className={`flex items-center gap-2 cursor-pointer p-2 border hover:border-rgtheme hover:text-rgtheme ${pathname === '/expencemanagement' && 'border-rgtheme text-rgtheme'}  rounded`}><HandCoins /><span>Expense Management</span></Link>
        <Link href='/salarymanagement' className={`flex items-center gap-2 cursor-pointer p-2 border hover:border-rgtheme hover:text-rgtheme ${pathname === '/salarymanagement' && 'border-rgtheme text-rgtheme'}  rounded`}><CircleDollarSign/><span>Salary</span></Link>
    </div>
  )
}

export default Sidebar