"use client"

import  React from "react"
import { useEffect, useState } from "react"
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"
import { useSession } from "next-auth/react"
import { getWFHRequest } from "../services/api"
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
import { toast } from "react-toastify"
import { approveRejectWfh } from "../services/api"
import BeatLoader from 'react-spinners/BeatLoader'

export default function WFHManagement() {
  function formatDate(isoDateString) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' }; // Customize format as needed
    return new Date(isoDateString).toLocaleDateString(undefined, options);
  }
  
  const {data: session} = useSession()
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [text, setText] = useState("")

  const fetchWFHRequest = async () => {
    try {
      setIsLoading(true)
      const response = await getWFHRequest(session?.user?.accessToken);
      console.log(response.data)
      setData(response.data)
      if(response.data.length == 0 ){
        setText("No records")
      }
    } catch (error) {
      toast.error(error)
    } finally{
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if(session?.user?.accessToken){
      fetchWFHRequest()
    }
  },[session])

  const columns = [
    {
      accessorKey: "name",
      header: "Employee Name",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("name")}</div>
      ),
    },
   {
      accessorKey: "date",
      header: "WFH Date",
      cell: ({ row }) => (
        <div className="capitalize">{formatDate(row.getValue("date"))}</div>
      ),
  
    }, 
    {
          accessorKey: "id",
          header: "Request",
          cell: ({ row }) => {
    
            const handleAction = async (status) => {
              try {
                const data = { status };
                const response = await approveRejectWfh(session?.user?.accessToken, data, row.getValue("id"));
             
                console.log(response.data.status)
    
                toast.success(response.message)
                fetchWFHRequest();
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
  const [sorting, setSorting] = useState([])
  const [columnFilters, setColumnFilters] = useState(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    useState({})
  const [rowSelection, setRowSelection] = useState({})

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
          {headerGroup.headers.map((header) => (
            <TableHead className="text-white font-bold" key={header.id}>
              {header.isPlaceholder
                ? null
                : flexRender(header.column.columnDef.header, header.getContext())}
            </TableHead>
          ))}
        </TableRow>
      ))}
    </TableHeader>
    <TableBody>
      {data && data.length ? (
        table.getRowModel().rows.map((row) => (
          <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
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
