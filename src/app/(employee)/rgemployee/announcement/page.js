'use client'
import React, { useEffect, useState } from 'react'
import parse from 'html-react-parser';
import { useSession } from 'next-auth/react';
import { getAnnouncement } from '@/components/services/api';
function page() {
    const [announcements, setAnnouncements] = useState([])
    const { data: session } = useSession()
    console.log(session)
    const downloadFile = () => {
        const a = document.createElement('a');
        a.href = '/policy.pdf';
        a.download = 'policy.pdf';
        a.click();
    }
    useEffect(() => {
        if (session?.user?.accessToken)
            (async () => {
                const data = await getAnnouncement(session?.user?.accessToken)
                if (data)
                    setAnnouncements(data.data)
            })()
    }, [session])
    return (
        <div className='flex-grow overflow-auto'>
            <div className=" w-11/12 md:w-4/5  m-auto space-y-4 h-[92%] overflow-x-hidden overflow-y-auto">
                <h1 className='text-2xl font-bold m-auto p-2 mb-4  border-b-2 '>Company profile and Announcement</h1>
                {
                    announcements.map(i => <div key={i.id} className='w-full  p-2 border border-gray-400 shadow rounded-lg m-auto' >
                        {parse(i.description)}
                    </div>)
                }

            </div>


            <div variant='outline' className='cursor-pointer w-4/5 left-1/2 mt-1 m-auto border p-1 rounded text-center' onClick={downloadFile}>
                Company Policy Document

            </div>
        </div>
    )
}

export default page