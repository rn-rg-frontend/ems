'use client'
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import {  MoveLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { getEmployeeProfile, getLeavesData } from '../services/api'
import { useSession } from 'next-auth/react'
const data = [
    { id: 1, employeeName: "Michael Davis", leaveType: "Maternity Leave", fromDate: "2023-04-22", toDate: "2023-04-26" },
    { id: 5, employeeName: "Michael Thomas", leaveType: "Annual Leave", fromDate: "2023-11-21", toDate: "2023-11-27" },
    { id: 6, employeeName: "Jane Anderson", leaveType: "Maternity Leave", fromDate: "2023-06-20", toDate: "2023-06-25" },
    { id: 7, employeeName: "Alex Miller", leaveType: "Paternity Leave", fromDate: "2023-12-09", toDate: "2023-12-11" },
    { id: 10, employeeName: "Michael Taylor", leaveType: "Casual Leave", fromDate: "2023-05-21", toDate: "2023-05-23" }
]
    ;
function EmployeeLeaves({employeeId}) {
    const router = useRouter()
    const [leaves,setLeaves] = useState([])
    const [employeeName,setEmployeeName] = useState()
    const {data:session} = useSession();
    
    useEffect(()=>{
        if(session?.user?.accessToken)
        (async()=>{
            const leaveData = await getLeavesData(session?.user?.accessToken,employeeId)
            setLeaves(leaveData.approved)
            
            const res = await getEmployeeProfile(session?.user?.accessToken, employeeId)
            setEmployeeName(res.name)

        })()
    },[session])
    const goToLeaves = () => {
        router.push('/employees/1/leaves')
    }
    const goToWfh = () => {
        router.push('/employees/1/wfh')
    }
    return (
        <div className='w-4/5 m-auto max-w-4xl  space-y-4 h-[92%] overflow-x-hidden overflow-y-auto'>
            <Link href={'/admin/employees'} className='text-2xl flex gap-1 items-center  border-b-2 p-2 border-gray-300 font-bold'>
                <MoveLeft /> <span>All Employees</span>
            </Link >
            <div className='mt-4 flex flex-col gap-6'>
                <Link href={'/admin/1/profile'} className='text-2xl font-semibold text-center'> {employeeName} </Link>
                <div className=' w-2/3 text-center m-auto '>
                    {employeeName} has {20 - leaves.length} leaves pending in the year of 2025
                </div>
                <Table>
                    <TableHeader className='bg-rgtheme hover:bg-rgtheme'>
                        <TableRow>
                            <TableHead className='text-white font-bold'>Leave From</TableHead>
                            <TableHead className='text-white font-bold'>Leave To</TableHead>
                            <TableHead className='text-white font-bold'>Leave Type</TableHead>
                            <TableHead className='text-white font-bold'>Total</TableHead>

                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {leaves.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>{row.startDate}</TableCell>
                                <TableCell>{row.endDate}</TableCell>
                                <TableCell>{row.leaveType}</TableCell>
                                <TableCell>{row.totalLeaves}</TableCell>
                            </TableRow>
                        ))}
                        

                    </TableBody>
                </Table>
            </div>

        </div>
    )
}

export default EmployeeLeaves