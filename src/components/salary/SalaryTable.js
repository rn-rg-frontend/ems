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
import { getSalary } from '../services/api';
import { useSession } from 'next-auth/react';
import { BeatLoader } from 'react-spinners/BeatLoader';

const DataTableWithExport = ({setSelectedUser}) => {
  const {data: session} = useSession();
  // Sample data
  

  const [data, setdata] = useState([]);
  
    const fetchSalary = async (token) => {
      try {
        const response = await getSalary(token);
        console.log(response.formattedSalary)
        setdata(response.formattedSalary)
      } catch (error) {
        console.log("Unable to get Data")
      }
    }

    useEffect(() => {
      if(session?.user?.accessToken) {
        fetchSalary(session?.user?.accessToken);
      }
    }, [session])

    const selectEmployee = (row) => {
      console.log("employee id ",row.id)
      setSelectedUser(row.id)
    }
 


  return (
    <div className="w-full max-w-4xl m-auto space-y-4">
      <Table>
        <TableHeader className="bg-rgtheme">
          <TableRow>
            <TableHead className="text-white font-bold">Employee Name</TableHead>
            <TableHead className="text-white font-bold text-center">Current Salary Per Month</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.isArray(data) && data.length > 0 ? (
            data.map((row) => (
              <TableRow key={row.id} className="cursor-pointer" onClick={() => selectEmployee(row)}>
                <TableCell>{row.name}</TableCell>
                <TableCell className="text-center">{row.salary}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan="2" className="text-center">No data available</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default DataTableWithExport;