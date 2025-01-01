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
import BeatLoader from 'react-spinners/BeatLoader'


function formatDate(isoDateString) {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return new Date(isoDateString).toLocaleDateString(undefined, options);
}

export default function DataTableDemo() {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState([])
  const { data: session } = useSession();
  const [text, setText] = useState("");
  const fetchLeaveData = async () => {
    try {
      setIsLoading(true)
      const response = await getLeaveRequest(session?.user?.accessToken);
      console.log("Leave Request Data:", response);
      setData(response);
      if(response.length == 0 ){
        setText("No records")
      }
      return;
    } catch (error) {
      console.error("Error details:", error);
    } finally {
      setIsLoading(false)
    }
  };

  useEffect(() => {
    if (session?.user?.accessToken) {
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

      </div>
      <div className="rounded-md border !mt-1 relative">
    {isLoading && (
      <div className="absolute inset-0 h-96 bg-white/70 flex justify-center items-center z-10">
        <BeatLoader />
      </div>
    )}
    <Table>
      <TableHeader className="bg-rgtheme hover:bg-rgtheme">
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead className="text-white font-bold" key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              );
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
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="h-24 text-center">
              {text}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  </div>
    </div>
  )
}
