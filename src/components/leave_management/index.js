

'use client'
import React from 'react';
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

const LeaveManagement = ({setAddExpence}) => {
  // Sample data
  const data =[
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
  ;

 

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
    <div className="w-full max-w-4xl m-auto space-y-4 h-[92%] overflow-x-hidden overflow-y-auto">

            <h1 className='text-2xl font-bold m-auto p-2 mb-4  border-b-2 '>Leave Management</h1>

      <Table className=''>
        <TableHeader className='bg-rgtheme hover:bg-rgtheme'>
          <TableRow>
            <TableHead className='text-white font-bold'>ID</TableHead>
            <TableHead  className='text-white font-bold'>Employee Name</TableHead>
            <TableHead className='text-white font-bold'>Leave From</TableHead>
            <TableHead className='text-white font-bold'>Leave To</TableHead>
            <TableHead className='text-white font-bold'>Status</TableHead>
            
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.employeeName}</TableCell>
              <TableCell>{row.fromDate}</TableCell>
              <TableCell>{row.toDate}</TableCell>
                <TableCell className='flex justify-around'>
                        <Button variant='success'>Accept</Button>
                        <Button variant='destructive'>Reject</Button>

                </TableCell>
            </TableRow>
          ))}

        </TableBody>
      </Table>

    </div>
  );
};

export default LeaveManagement;