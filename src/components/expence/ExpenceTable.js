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

const data1 = []

const DataTableWithExport = ({ setAddExpence }) => {
  // Sample data
  const [total, setTotal] = useState(200)
  const [minDate, setMinDate] = useState()
  const [maxDate, setMaxDate] = useState()

  const [data, setDate] = useState([
    {
      id: 1,
      date: "2024-03-15T14:32:00.000Z",
      expenseReason: "Office Supplies",
      amount: 123.45,
      accountType: "icici"
    },
    {
      id: 2,
      date: "2024-07-09T09:10:00.000Z",
      expenseReason: "Travel",
      amount: 89.99,
      accountType: "icici"
    },
    {
      id: 3,
      date: "2023-12-25T18:45:00.000Z",
      expenseReason: "Entertainment",
      amount: 250.00,
      accountType: "icici"
    },
    {
      id: 4,
      date: "2024-02-03T11:25:00.000Z",
      expenseReason: "Meals",
      amount: 45.67,
      accountType: "icici"
    },
    {
      id: 5,
      date: "2024-05-18T08:15:00.000Z",
      expenseReason: "Transportation",
      amount: 75.80,
      accountType: "icici"
    },
    {
      id: 6,
      date: "2024-01-12T20:05:00.000Z",
      expenseReason: "Utilities",
      amount: 110.50,
      accountType: "icici"
    },
    {
      id: 7,
      date: "2024-09-29T14:50:00.000Z",
      expenseReason: "Miscellaneous",
      amount: 39.99,
      accountType: "hdfc"
    },
    {
      id: 8,
      date: "2024-06-14T10:30:00.000Z",
      expenseReason: "Meals",
      amount: 120.75,
      accountType: "hdfc"
    },
    {
      id: 9,
      date: "2023-11-22T22:10:00.000Z",
      expenseReason: "Travel",
      amount: 200.00,
      accountType: "hdfc"
    },
    {
      id: 10,
      date: "2024-08-01T16:45:00.000Z",
      expenseReason: "Office Supplies",
      amount: 67.89,
      accountType: "icici"
    }
  ])
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
        setFilterDate(data.filter(record => record.accountType === type))
      }
    }
  }
  // const minDate = (date) => {
  //   setFilterDate(data.filter(record => new Date(record.date) >= new Date(date)))
  // }
  // const maxDate = (date) => {
  //   setFilterDate(data.filter(record => new Date(record.date) <= new Date(date)))
  // }

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
    const bottomRow = `<Row><Cell ss:MergeAcross="${2}"><Data ss:Type="String">Total</Data></Cell><Cell><Data ss:Type="Number">200</Data></Cell></Row>`;
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
            <option>all</option>
            <option>icici</option>
            <option>hdfc</option>
            <option>kotak</option>
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

      <Table>
        <TableHeader className='bg-rgtheme '>
          <TableRow>
            <TableHead className='text-white font-bold'>ID</TableHead>
            <TableHead className='text-white font-bold'>Date</TableHead>
            <TableHead className='text-white font-bold'>Account Type</TableHead>
            <TableHead className='text-white font-bold'>Expense Reason</TableHead>
            <TableHead className='text-white font-bold'>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className='h-4/5 overflow-scroll'>
          {filterData.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.accountType}</TableCell>
              <TableCell>{row.expenseReason}</TableCell>
              <TableCell>{row.amount}</TableCell>
            </TableRow>
          ))}

        </TableBody>
      </Table>
      <div className='grid grid-cols-4 sticky bottom-0 bg-rgtheme text-white font-bold  px-2 py-1'>
        <p colSpan={3} className='col-span-3'>Total</p>
        <p className='col-span-1 text-center'>{total}</p>
      </div>
    </div>
  );
};

export default DataTableWithExport;

