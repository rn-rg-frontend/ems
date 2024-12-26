'use client'
import React, { useState } from 'react'
import DataTableWithExport from './ExpenceTable'
import Addexpence from './Addexpence';

function ExpenceContainer() {
    const [addExpence,setAddExpence] = useState(false);
  return (
    <div className='w-full max-w-4xl m-auto space-y-4 h-[95%] overflow-hidden overflow-y-auto'>
        <h1 className='text-2xl font-bold  m-auto p-2 mb-4  border-b-2 '>Expense Management</h1>
    {
        addExpence ? <Addexpence setAddExpence={setAddExpence}/> : <DataTableWithExport setAddExpence={setAddExpence}/>
    }
    </div>
  )
}

export default ExpenceContainer