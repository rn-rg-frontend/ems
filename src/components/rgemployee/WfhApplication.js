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

const data = [
    { id: 1, employeeName: "Michael Davis", leaveType: "Maternity Leave", fromDate: "2023-04-22", toDate: "2023-04-26" },
    { id: 2, employeeName: "Michael Davis", leaveType: "Sick Leave", fromDate: "2023-05-23", toDate: "2023-05-30" },
    { id: 3, employeeName: "Jane Smith", leaveType: "Sick Leave", fromDate: "2023-09-17", toDate: "2023-09-20" },
    { id: 4, employeeName: "Chris Thomas", leaveType: "Paternity Leave", fromDate: "2024-12-29", toDate: "2025-01-04" },
]



export const columns = [
 {
        accessorKey: "fromDate",
        header: "WFH Date",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("fromDate")}</div>
        ),

    },
    {
        header: "Status",
        cell: ({ row }) => (
            <div className="flex gap-2">
                <Button variant='outline' className='border-green-500  hover:text-green-500'>Pending</Button>
            </div>
        ),
    },


]

export default function WFHApplication() {
    const [sorting, setSorting] = React.useState([])
    const [columnFilters, setColumnFilters] = React.useState(
        []
    )
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

    return (
        <div className="w-full max-w-4xl m-auto space-y-4 h-[92%] overflow-x-hidden overflow-y-auto">
            <h1 className='text-2xl font-bold m-auto p-2 mb-4  border-b-2 '>WFH Application</h1>
           
            <form className="flex flex-col gap-2">
                    <div className="flex gap-2 w-4/5 m-auto items-center">
                        <Label htmlFor="toDate w-1/4">WFH Date    </Label>
                        <Input type="date" id='toDate' className='border-black w-4/5' />
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
