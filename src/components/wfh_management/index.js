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
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const data = [
  { id: 1, employeeName: "Michael Davis", leaveType: "Maternity Leave", fromDate: "2023-04-22", toDate: "2023-04-26" },
  { id: 2, employeeName: "Michael Davis", leaveType: "Sick Leave", fromDate: "2023-05-23", toDate: "2023-05-30" },
  { id: 3, employeeName: "Jane Smith", leaveType: "Sick Leave", fromDate: "2023-09-17", toDate: "2023-09-20" },
  { id: 4, employeeName: "Chris Thomas", leaveType: "Paternity Leave", fromDate: "2024-12-29", toDate: "2025-01-04" },
  { id: 5, employeeName: "Michael Thomas", leaveType: "Annual Leave", fromDate: "2023-11-21", toDate: "2023-11-27" },
  { id: 6, employeeName: "Jane Anderson", leaveType: "Maternity Leave", fromDate: "2023-06-20", toDate: "2023-06-25" },
  { id: 7, employeeName: "Alex Miller", leaveType: "Paternity Leave", fromDate: "2023-12-09", toDate: "2023-12-11" },
  { id: 8, employeeName: "Laura Wilson", leaveType: "Annual Leave", fromDate: "2023-10-23", toDate: "2023-10-28" },
  { id: 9, employeeName: "Michael Moore", leaveType: "Annual Leave", fromDate: "2024-12-27", toDate: "2025-01-05" },
  { id: 10, employeeName: "Michael Taylor", leaveType: "Casual Leave", fromDate: "2023-05-21", toDate: "2023-05-23" }
]

export const columns = [
  {
    accessorKey: "employeeName",
    header: "Employee Name",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("employeeName")}</div>
    ),
  },
 {
    accessorKey: "fromDate",
    header: "WFH Date",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("fromDate")}</div>
    ),

  }, 
  {
    header: "Accept/Reject",
    cell: ({ row }) => (
      <div className="flex gap-2">
        <Button variant='outline' className='border-green-500  hover:text-green-500'>Accept</Button>
        <Button variant='outline' className='border-red-500  hover:text-red-500'>Reject</Button>
      </div>
    ),
  },


]

export default function WFHManagement() {
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
      <h1 className='text-2xl font-bold m-auto p-2 mb-4  border-b-2 '>Leave Management</h1>
      <div className="flex items-center p-2">
        <Input
          placeholder="Filter Name..."
          value={(table.getColumn("employeeName")?.getFilterValue()) ?? ""}
          onChange={(event) =>
            table.getColumn("employeeName")?.setFilterValue(event.target.value)
          }
          className="max-w-sm ms-1"
        />

      </div>
      <div className="rounded-md border !mt-1">
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
