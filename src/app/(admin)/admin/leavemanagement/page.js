import LeaveManagement from '@/components/leave_management'
import React from 'react'

function LeavePage() {
    return (
        <div className='flex-grow h-full '>
            <LeaveManagement />
            <div className='text-center mt-2'>Note - All employees are eligible for 20 leaves including public, casual and sick leaves</div>
        </div>
    )
}

export default LeavePage