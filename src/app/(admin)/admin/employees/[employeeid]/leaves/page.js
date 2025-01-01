
import EmployeeLeaves from '@/components/Employees/EmployeeLeaves'
import EmployeeWfh from '@/components/Employees/EmployeeWfh'
import React from 'react'

async function Leaves({params}) {
  const {employeeid}  = await params;
  return (
    <div className='flex-grow'>
        <EmployeeLeaves employeeId={employeeid}/>
    </div>
  )
}

export default Leaves