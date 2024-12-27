import LeaveManagement from '@/components/leave_management'
import WFHManagement from '@/components/wfh_management'
import React from 'react'

function LeavePage() {
    return (
        <div className='flex-grow h-full'>
            <WFHManagement />
            <div className='text-center mt-2'>Note -  All employees are eligible for max of 2 WFH in a month</div>
        </div>
    )
}

export default LeavePage