"use client"

import * as React from "react"
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"

import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Label } from "@radix-ui/react-label"
import { useSession } from "next-auth/react"
import { getLeavesData, postLeavesData } from "../services/api"

const data = [
    { id: 1, employeeName: "Michael Davis", leaveType: "Maternity Leave", fromDate: "2023-04-22", toDate: "2023-04-26" },
    { id: 2, employeeName: "Michael Davis", leaveType: "Sick Leave", fromDate: "2023-05-23", toDate: "2023-05-30" },
    { id: 3, employeeName: "Jane Smith", leaveType: "Sick Leave", fromDate: "2023-09-17", toDate: "2023-09-20" },
    { id: 4, employeeName: "Chris Thomas", leaveType: "Paternity Leave", fromDate: "2024-12-29", toDate: "2025-01-04" },
    { id: 1, employeeName: "Michael Davis", leaveType: "Maternity Leave", fromDate: "2023-04-22", toDate: "2023-04-26" },
    { id: 2, employeeName: "Michael Davis", leaveType: "Sick Leave", fromDate: "2023-05-23", toDate: "2023-05-30" },
    { id: 3, employeeName: "Jane Smith", leaveType: "Sick Leave", fromDate: "2023-09-17", toDate: "2023-09-20" },
    { id: 4, employeeName: "Chris Thomas", leaveType: "Paternity Leave", fromDate: "2024-12-29", toDate: "2025-01-04" },
    { id: 1, employeeName: "Michael Davis", leaveType: "Maternity Leave", fromDate: "2023-04-22", toDate: "2023-04-26" },
    { id: 2, employeeName: "Michael Davis", leaveType: "Sick Leave", fromDate: "2023-05-23", toDate: "2023-05-30" },
    { id: 3, employeeName: "Jane Smith", leaveType: "Sick Leave", fromDate: "2023-09-17", toDate: "2023-09-20" },
    { id: 4, employeeName: "Chris Thomas", leaveType: "Paternity Leave", fromDate: "2024-12-29", toDate: "2025-01-04" },
]



export const columns = [

    {
        accessorKey: "leaveType",
        header: "Leave Type",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("leaveType")}</div>
        ),
    }, {
        accessorKey: "startDate",
        header: "Leave From",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("startDate").split("T")[0]}</div>
        ),

    }, {
        accessorKey: "endDate",
        header: "Leave To",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("endDate").split("T")[0]}</div>
        ),
    },
    {
        header: "Status",
        accessorKey: "status",
        cell: ({ row }) => (
            <div className="flex gap-2">
                <Button variant='outline' className='border-green-500  hover:text-green-500'>{row.getValue("status")}</Button>
            </div>
        ),
    },


]

export default function LeaveApplication() {
    const [sorting, setSorting] = React.useState([])
    const [columnFilters, setColumnFilters] = React.useState([])
    const [columnVisibility, setColumnVisibility] =
        React.useState({})
    const [data, setData] = React.useState([])
    const [rowSelection, setRowSelection] = React.useState({})
    const { data: session } = useSession()
    const [leave,setLeave] = React.useState({
        leaveType: "",
        startDate: "",
        endDate: "",
        userProfileId: 2,
        status: null,
        totalLeaves: 0
      })
    React.useEffect(() => {
        if (session?.user?.accessToken) {
            (async () => {
                try {
                    const data = await getLeavesData(session?.user?.accessToken, session?.user?.id)
                    
                    if (!data.message) {
                        let approved = data.approved.map(i => ({ ...i, status: 'accepted' }))
                        let pending = data.pending.map(i => ({ ...i, status: 'pending' }))
                        let rejected = data.cancelled.map(i => ({ ...i, status: 'rejected' }))
                        setData([...approved, ...pending, ...rejected])
                    }
                } catch (err) {
                    console.log(err)
                }

            })()
        }
    }, [session])

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })
    const leaveApplication =async (e) => {
        e.preventDefault()
        try {
            const data = await postLeavesData(session?.user?.accessToken,{...leave,userProfileId:session?.user?.id})
            if(data.success){
                setData(prev => ([...prev, {...leave, status:'pending'}]))
                setLeave({
                    leaveType: "",
                    startDate: "",
                    endDate: "",
                    status: null,
                    totalLeaves: 0
                  })
            }
        } catch (err) {
            console.log(err)
        }


    }
    return (
        <>
      
        <div className="w-full max-w-4xl m-auto space-y-4 h-[92%] overflow-x-hidden overflow-y-auto">
            <h1 className='text-2xl font-bold m-auto p-2 mb-4  border-b-2 '>Leave Management</h1>
            <h1 className='text-lg text-center font-bold m-auto p-2 mb-4  border-b-2 '>You Have {session?.user?.totalLeave} Active leaves pending for year 2025</h1>
            <form className="flex flex-col gap-2" onSubmit={leaveApplication}>
                <div className="grid md:grid-cols-4 grid-cols-2 gap-2">
                  
                    <select value={leave.leaveType} className="border border-black rounded" onChange={(e)=> setLeave(prev => ({...prev,leaveType:e.target.value}))} >
                        <option value="">select leave type</option>
                        <option>Sick Leave</option>
                        <option>Casual Leave</option>
                        <option>Half Day</option>
                    </select>
                    <div className="relative">
                       
                        <Input value={leave.startDate} onChange={(e)=> setLeave(prev => ({...prev,startDate:e.target.value}))} type="date" id='toDate'  className='border-black' />
                    </div>
                    <div className="relative">
                        
                        <Input value={leave.endDate} type="date" id='fromDate' onChange={(e)=> setLeave(prev => ({...prev,endDate:e.target.value}))} className='border-black' />
                    </div>
                    <Input type='number' min={0} steps={0.5} value={leave.totalLeaves} onChange={(e)=> setLeave(prev => ({...prev,totalLeaves:Number(e.target.value)}))}  className='border-black' placeholder='Toal leave' />
                </div>
                <Button className='self-center'>Submit</Button>
            </form>

            <div className="rounded-md border !mt-2">
                <Table>
                    <TableHeader className='bg-rgtheme hover:bg-rgtheme'>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead className='text-white font-bold' key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            
        </div>
        <div className="text-center">
        Note - All employees are eligible for 20 leaves including public, casual and sick leaves in a year

        </div>
        </>
    )
}
