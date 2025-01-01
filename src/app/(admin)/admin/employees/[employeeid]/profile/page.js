import EmployeeProfile from '@/components/Employees/Profile'
import React from 'react'

async function Profile({params}) {
  const {employeeid} = await params
  return (
    <div className='flex-grow overflow-auto'>
        <EmployeeProfile employeeId={employeeid}/>  
    </div>
  )
}

export default Profile