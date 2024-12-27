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
import { MoveLeft } from "lucide-react";

const SelectedEmployee = ({ selectedUser,setSelectedUser }) => {
  // Sample data
  const data = [
    { id: 1, employeeName: "Michael Davis", leaveType: "Maternity Leave", selectedUser: "2023-04-22", toDate: "2023-04-26", salary: 200 },
    { id: 2, employeeName: "Michael Davis", leaveType: "Sick Leave", fromDate: "2023-05-23", toDate: "2023-05-30", salary: 200 },
    { id: 3, employeeName: "Jane Smith", leaveType: "Sick Leave", fromDate: "2023-09-17", toDate: "2023-09-20", salary: 200 },
    { id: 4, employeeName: "Chris Thomas", leaveType: "Paternity Leave", fromDate: "2024-12-29", toDate: "2025-01-04", salary: 200 },
    { id: 5, employeeName: "Michael Thomas", leaveType: "Annual Leave", fromDate: "2023-11-21", toDate: "2023-11-27", salary: 200 },
    { id: 6, employeeName: "Jane Anderson", leaveType: "Maternity Leave", fromDate: "2023-06-20", toDate: "2023-06-25", salary: 200 },
    { id: 7, employeeName: "Alex Miller", leaveType: "Paternity Leave", fromDate: "2023-12-09", toDate: "2023-12-11", salary: 200 },
    { id: 8, employeeName: "Laura Wilson", leaveType: "Annual Leave", fromDate: "2023-10-23", toDate: "2023-10-28", salary: 200 },
    { id: 9, employeeName: "Michael Moore", leaveType: "Annual Leave", fromDate: "2024-12-27", toDate: "2025-01-05", salary: 200 },
    { id: 10, employeeName: "Michael Taylor", leaveType: "Casual Leave", fromDate: "2023-05-21", toDate: "2023-05-23", salary: 400 }
  ]
    ;




  return (
    <div className="w-full max-w-4xl m-auto space-y-4">
      <div className='text-lg font-bold flex justify-between'>
        <p>{selectedUser.employeeName} Salary History</p>
        <MoveLeft onClick={()=>setSelectedUser()}/>
      </div>
      <Table>
        <TableHeader className='bg-rgtheme '>
          <TableRow>
            <TableHead className='text-white font-bold'>{selectedUser?.employeeName}</TableHead>
            <TableHead className='text-white font-bold text-center'>Salary History</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id} >
              <TableCell>{row.toDate}</TableCell>
              <TableCell className='text-center'>{row.salary}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SelectedEmployee;