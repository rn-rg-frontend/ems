import CurretnEmployee from '@/components/Employees/CurretnEmployee'
import React from 'react'

async function SelectedEmployee({params}) {
  const {employeeid} = await params
  console.log(employeeid)
  return (
    <div className='flex-grow overflow-auto'>
        <CurretnEmployee employeeId={employeeid}/>
    </div>
  )
}

export default SelectedEmployee