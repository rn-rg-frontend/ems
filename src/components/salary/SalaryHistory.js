'use client'
import React, { use, useEffect, useState } from 'react';
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
import { getSalaryHistory } from '../services/api';
import { useSession } from 'next-auth/react';

const SelectedEmployee = ({ selectedUser, setSelectedUser }) => {
  const { data: session } = useSession();
  const [data, setData] = useState([]);

  const fetchSalaryHistory = async (token) => {
    try {
      const response = await getSalaryHistory(token, selectedUser);
      setData(response.data);
    } catch (error) {
      console.log(error || "Unable to get data")
    }
  }

  useEffect(() => {
    if (session?.user?.accessToken) {
      fetchSalaryHistory(session?.user?.accessToken);
    }
  }, [session])

  return (
    <div className="w-full max-w-4xl m-auto space-y-4">
      <div className='text-lg font-bold flex justify-between'>
        <p>{selectedUser.employeeName} Salary History</p>
        <MoveLeft onClick={() => setSelectedUser()} />
      </div>
      <Table>
        <TableHeader className="bg-rgtheme">
          <TableRow>
            <TableHead className="text-white font-bold">{selectedUser?.employeeName}</TableHead>
            <TableHead className="text-white font-bold text-center">Salary History</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.isArray(data) && data.length > 0 ? (
            data.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.year}</TableCell>
                <TableCell className="text-center">{row.previousSalary}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan="2" className="text-center">
                No records
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

    </div>
  );
};

export default SelectedEmployee;