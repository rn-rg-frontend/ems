import ExpenceContainer from '@/components/expence'
import DataTableWithExport from '@/components/expence/ExpenceTable'
import SalaryComponent from '@/components/salary'
import React from 'react'

function ExpencePage() {
  return (
    <div className='flex-grow h-full overflow-auto'>
        <SalaryComponent/>
    </div>
  )
}

export default ExpencePage