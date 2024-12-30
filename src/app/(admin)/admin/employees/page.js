'use client'
import Employees from '@/components/Employees'
import React from 'react'

function EmployeesPage() {
  return (
    <div className='flex-grow overflow-auto'>
        <Employees />
    </div>
  )
}

export default EmployeesPage