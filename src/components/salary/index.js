'use client'
import React, { useState } from 'react'
import DataTableWithExport from './ExpenceTable'
import Addexpence from './Addexpence';

function SalaryComponent() {
    const [selectedUser,setSelectedUser] = useState(false);
  return (
    <div className='w-full max-w-4xl m-auto space-y-4 h-[96%] overflow-x-hidden overflow-y-auto'>
        <h1 className='text-2xl font-bold  m-auto p-2 mb-4  border-b-2 '>Salary</h1>
    {
      selectedUser ? <Addexpence selectedUser={selectedUser} setSelectedUser={setSelectedUser}/> :
       <DataTableWithExport setSelectedUser={setSelectedUser}/>
    }
    </div>
  )
}

export default SalaryComponent