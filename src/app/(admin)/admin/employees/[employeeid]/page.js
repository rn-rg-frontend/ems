import CurretnEmployee from '@/components/Employees/CurretnEmployee'
import React from 'react'

function SelectedEmployee() {
  return (
    <div className='flex-grow overflow-auto'>
        <CurretnEmployee/>
    </div>
  )
}

export default SelectedEmployee