'use client'
import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Input } from '../ui/input';
import { getExpense } from '../services/api';
import { getExpenseType } from '../services/api';
import { useSession } from 'next-auth/react';
import { useRef } from 'react';
import BeatLoader from 'react-spinners/BeatLoader'

const DataTableWithExport = ({ setAddExpence }) => {
  function formatDate(isoDateString) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(isoDateString).toLocaleDateString(undefined, options);
  }

  const [total, setTotal] = useState(200)
  const [minDate, setMinDate] = useState()
  const [maxDate, setMaxDate] = useState()
  const { data: session } = useSession();
  const apiCalled = useRef(false);
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [accountType, setAccountType] = useState([]);

  const fetchExpenseList = async (token) => {
    try {
      setIsLoading(true)
      const response = await getExpense(token)
      const typeOfExpense = await getExpenseType(token)
      setAccountType(typeOfExpense)
      console.log(typeOfExpense)
      setData(response.data)
      setFilterDate(response.data)
      console.log(data)
    } catch (error) {
      console.log("unable to get data", error)
    } finally{
      setIsLoading(false)
    }
  }


  useEffect(() => {
    if (session?.user?.accessToken && !apiCalled.current) {
      apiCalled.current = true;
      fetchExpenseList(session?.user?.accessToken);
    }
  }, [session])

  const [filterData, setFilterDate] = useState([...data])
  useEffect(() => {
    let t = 0;
    filterData.map(i => t += i.amount)
    setTotal(t);
  }, [filterData])

  useEffect(() => {
    if (!minDate && !maxDate) return
    if (minDate && maxDate) {
      setFilterDate(data.filter(record => new Date(record.date) >= new Date(minDate) && new Date(record.date) <= new Date(maxDate)))
    } else if (minDate) {
      setFilterDate(data.filter(record => new Date(record.date) >= new Date(minDate)))
    } else if (maxDate) {
      setFilterDate(data.filter(record => new Date(record.date) <= new Date(maxDate)))
    }

  }, [minDate, maxDate])

  const selectAccountType = (type) => {
    if (type) {
      if (type == 'all') {
        setFilterDate(data.filter(record => true))
      } else {
        setFilterDate(data.filter(record => record.typeOfExpenseName === type))
      }
    }
  }
  

  const exportToExcel = () => {
    // Create Excel-compatible XML
    const xmlHeader = '<?xml version="1.0"?><?mso-application progid="Excel.Sheet"?>';
    const worksheetHeader = '<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">' +
      '<Worksheet ss:Name="Sheet1"><Table>';

    // Add headers
    const headers = Object.keys(data[0]);
    const headerRow = '<Row>' + headers.map(header =>
      `<Cell><Data ss:Type="String">${header}</Data></Cell>`
    ).join('') + '</Row>';

    // Add data rows
    let rows = data.map(row => {
      const cells = Object.values(row).map(value => {
        const type = typeof value === 'number' ? 'Number' : 'String';
        return `<Cell><Data ss:Type="${type}">${value}</Data></Cell>`;
      });
      return '<Row>' + cells.join('') + '</Row>';
    }).join('');
    const bottomRow = `<Row><Cell ss:MergeAcross="${2}"><Data ss:Type="String">Total</Data></Cell><Cell><Data ss:Type="Number">${total}</Data></Cell></Row>`;
    rows += bottomRow
    const worksheetFooter = '</Table></Worksheet></Workbook>';
    const excelContent = xmlHeader + worksheetHeader + headerRow + rows + worksheetFooter;

    // Create and download the file
    const blob = new Blob([excelContent], { type: 'application/vnd.ms-excel' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'table-data.xls';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full  max-w-4xl m-auto space-y-4">
      <div className="flex justify-end flex-wrap space-x-2">
        <div className='flex gap-1'>
          <select className='border border-black rounded' onChange={(e) => selectAccountType(e.target.value)}>
            <option value="all">all</option>
            {accountType && accountType.length > 0 ? (
              accountType.map((type) => (
                <option key={type.id} value={type.name}>
                  {type.name}
                </option>
              ))
            ) : (
              <option disabled>Loading...</option>
            )}
          </select>
          <div className='flex items-center gap-1'>
            <Input type='date' className='border-black' onChange={(e) => setMinDate(e.target.value)}>
            </Input>
            <p>To</p>
            <Input type='date' className='border-black' onChange={(e) => setMaxDate(e.target.value)}>
            </Input>
          </div>
        </div>
        <Button
          onClick={exportToExcel}
          variant="outline"
          className="flex items-center gap-2 border-black"
        >
          <Download className="h-4 w-4" />
          Export
        </Button>
        <Button onClick={() => setAddExpence(true)}>
          Add Expense
        </Button>

      </div>

      <div className="rounded-md border !mt-1 relative">
        {isLoading && (
          <div className="absolute inset-0 h-96 bg-white/70 flex justify-center items-center z-10">
            <BeatLoader />
          </div>
        )}
        <Table>
          <TableHeader className="bg-rgtheme">
            <TableRow>
              <TableHead className="text-white font-bold">ID</TableHead>
              <TableHead className="text-white font-bold">Date</TableHead>
              <TableHead className="text-white font-bold">Account Type</TableHead>
              <TableHead className="text-white font-bold">Expense Reason</TableHead>
              <TableHead className="text-white font-bold">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filterData.length > 0 ? (
              filterData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{formatDate(row.date)}</TableCell>
                  <TableCell>{row.typeOfExpenseName}</TableCell>
                  <TableCell>{row.reason}</TableCell>
                  <TableCell>{row.amount}</TableCell>
                </TableRow>
              ))
            ) : (
              !isLoading && (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    No records.
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </div>

      <div className='grid grid-cols-4 sticky bottom-0 bg-rgtheme text-white font-bold  px-2 py-1'>
        <p colSpan={3} className='col-span-3'>Total</p>
        <p className='col-span-1 text-center'>{total}</p>
      </div>
    </div>
  );
};

export default DataTableWithExport;

