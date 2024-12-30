"use client"

import React from "react"
import { useState, useEffect } from "react"
import { useSession } from "next-auth/react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"
import { getLeaveRequest } from "../services/api"
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
import { approveRejectLeave } from "../services/api";
import { toast } from "react-toastify";

// const data = [
//   { id: 1, employeeName: "Michael Davis", leaveType: "Maternity Leave", fromDate: "2023-04-22", toDate: "2023-04-26" },
//   { id: 2, employeeName: "Michael Davis", leaveType: "Sick Leave", fromDate: "2023-05-23", toDate: "2023-05-30" },
//   { id: 3, employeeName: "Jane Smith", leaveType: "Sick Leave", fromDate: "2023-09-17", toDate: "2023-09-20" },
//   { id: 4, employeeName: "Chris Thomas", leaveType: "Paternity Leave", fromDate: "2024-12-29", toDate: "2025-01-04" },
//   { id: 5, employeeName: "Michael Thomas", leaveType: "Annual Leave", fromDate: "2023-11-21", toDate: "2023-11-27" },
//   { id: 6, employeeName: "Jane Anderson", leaveType: "Maternity Leave", fromDate: "2023-06-20", toDate: "2023-06-25" },
//   { id: 7, employeeName: "Alex Miller", leaveType: "Paternity Leave", fromDate: "2023-12-09", toDate: "2023-12-11" },
//   { id: 8, employeeName: "Laura Wilson", leaveType: "Annual Leave", fromDate: "2023-10-23", toDate: "2023-10-28" },
//   { id: 9, employeeName: "Michael Moore", leaveType: "Annual Leave", fromDate: "2024-12-27", toDate: "2025-01-05" },
//   { id: 10, employeeName: "Michael Taylor", leaveType: "Casual Leave", fromDate: "2023-05-21", toDate: "2023-05-23" }
// ]

function formatDate(isoDateString) {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' }; // Customize format as needed
  return new Date(isoDateString).toLocaleDateString(undefined, options);
}


export default function DataTableDemo() {
  const [data, setData] = useState([])
  const { data: session } = useSession();
  const fetchLeaveData = async () => {
    try {
      const response = await getLeaveRequest(session?.user?.accessToken);
      console.log("Leave Request Data:", response);
      setData(response);
      return;
    } catch (error) {
      
        console.error("Error details:", error);
      
    }
  };
  
  useEffect(() => {
    if(session?.user?.accessToken){
      fetchLeaveData();
    }
  }, [session]);
  

  const columns = [
    {
      accessorKey: "name",
      header: "Employee Name",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("name")}</div>
      ),
    },
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
        <div className="capitalize">{formatDate(row.getValue("startDate"))}</div>
      ),

    }, {
      accessorKey: "endDate",
      header: "Leave To",
      cell: ({ row }) => (
        <div className="capitalize">{formatDate(row.getValue("endDate"))}</div>
      ),
    },
    {
      accessorKey: "leaveId",
      header: "Request",
      cell: ({ row }) => {

        const handleAction = async (status) => {
          try {
            const data = { status };
            const response = await approveRejectLeave(session?.user?.accessToken, data, row.getValue("leaveId"));
         
            console.log(response.data.status)

            toast.success(response.message)
            fetchLeaveData();
          } catch (error) {
            console.error("Error approving/rejecting", error);
          }
        };

        return (
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="border-green-500 hover:text-green-500"
              onClick={() => handleAction(true)}
            >
              Accept
            </Button>
            <Button
              variant="outline"
              className="border-red-500 hover:text-red-500"
              onClick={() => handleAction(false)}
            >
              Reject
            </Button>
          </div>
        );
      },
    },


  ]


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
    <div className="md:w-full w-11/12 max-w-4xl m-auto space-y-4 h-[92%] overflow-x-hidden overflow-y-auto">
      <h1 className='text-2xl font-bold m-auto p-2 mb-4  border-b-2 '>Leave Management</h1>
      <div className="flex items-center p-2">
        <Input
          placeholder="Filter Name..."
          value={(table.getColumn("name")?.getFilterValue()) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm ms-1"
        />
        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu> */}
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
      {/* <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div> */}
    </div>
  )
}
