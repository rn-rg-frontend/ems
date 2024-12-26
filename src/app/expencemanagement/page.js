import ExpenceContainer from '@/components/expence'
import DataTableWithExport from '@/components/expence/ExpenceTable'
import React from 'react'

function ExpencePage() {
  return (
    <div className='flex-grow h-full overflow-auto'>
        <ExpenceContainer/>
    </div>
  )
}

export default ExpencePage