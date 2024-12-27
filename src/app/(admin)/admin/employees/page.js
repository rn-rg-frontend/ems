'use client'
import Employees from '@/components/Employees'
import EmployeeProvider from '@/provider/Provider'
import React from 'react'

function EmployeesPage() {
  return (
    <div className='flex-grow overflow-auto'>
      <EmployeeProvider>
        <Employees />
      </EmployeeProvider>
    </div>
  )
}

export default EmployeesPage