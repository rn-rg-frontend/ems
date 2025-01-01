"use client"
import React from "react"

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
import { getWFHData, postWfhdata } from "../services/api"
import { useSession } from "next-auth/react"





export const columns = [
 {
        accessorKey: "date",
        header: "Date",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("date").split("T")[0]}</div>
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

export default function WFHApplication() {
    const [sorting, setSorting] = React.useState([])
    const [columnFilters, setColumnFilters] = React.useState(
        []
    )
    const {data:session} = useSession()
    const [data,setData] = React.useState([])
    const [date,setDate] = React.useState('')
    const [columnVisibility, setColumnVisibility] =
        React.useState({})
    const [rowSelection, setRowSelection] = React.useState({})

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
        React.useEffect(() => {
            if (session?.user?.accessToken) {
                (async () => {
                    try {
                        const data = await getWFHData(session?.user?.accessToken, session?.user?.id)
                        
                        if (!data.message) {
                            let approved = data.approved.map(i => ({ ...i, status: 'accepted' }))
                            let pending = data.pending.map(i => ({ ...i, status: 'pending' }))
                            let rejected = data.rejected.map(i => ({ ...i, status: 'rejected' }))
                            setData([...approved, ...pending, ...rejected])
                        }
                    } catch (err) {
                        console.log(err)
                    }
    
                })()
            }
        }, [session])
    const postWfh =async (e) => {
        e.preventDefault()
        try {
            const data = await postWfhdata(session?.user?.accessToken,{date,status: null,userProfileId:session?.user?.id})
            if(data.success){
                setData(prev => ([...prev, {date, status:'pending'}]))
            }
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div className="w-full max-w-4xl m-auto space-y-4 h-[92%] overflow-x-hidden overflow-y-auto">
            <h1 className='text-2xl font-bold m-auto p-2 mb-4  border-b-2 '>WFH Application</h1>
           
            <form className="flex flex-col gap-2" onSubmit={postWfh}>
                    <div className="flex gap-2 w-4/5 m-auto items-center">
                        <Label htmlFor="toDate w-1/4">WFH Date    </Label>
                        <Input type="date" value={date} onChange={(e)=> setDate(e.target.value)} id='toDate' className='border-black w-4/5' />
                    </div>
                <Button className='self-center'>Submit</Button>
            </form>
           
            <div className="rounded-md border !mt-3">
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
    )
}
