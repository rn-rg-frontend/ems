import EmployeeWfh from '@/components/Employees/EmployeeWfh'
import React from 'react'

async function WFH({params}) {
  const {employeeid} = await params
  return (
    <div className='flex-grow'>
        <EmployeeWfh employeeId={employeeid}/>
    </div>
  )
}

export default WFH