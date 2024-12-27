'use client'
import { Input } from '../ui/input'
import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import Tiptap from './Tiptap'


function Announcement() {

    const downloadFile = () => {
        const a = document.createElement('a');
        a.href = '/policy.pdf';
        a.download = 'policy.pdf';
        a.click();
    }

    return (
        <>
            <div className=' h-[93%] overflow-x-hidden overflow-y-auto relative'>
                <h1 className='text-2xl mb-4  m-auto w-4/5 font-bold border-b-2   p-2'>
                    Announcements
                </h1>
                <div className='mb-4'>
                    <div className='w-4/5 m-auto  '>

                        <Tiptap rows="5" placeholder='Add and announcement to show in dashboard' className='p-1 w-full border rounded border-gray-400'>
                        </Tiptap>
                    </div>
                    <div className='flex mt-2 w-4/5 justify-between m-auto gap-2'>
                        <div className='flex w-1/2 items-center gap-1'>
                            <span>From </span>
                            <Input type='date' className=' border rounded border-gray-400' />
                        </div>
                        <div className='flex w-1/2 items-center gap-1'>
                            <span>To </span>
                            <Input type='date' className=' border rounded border-gray-400' />
                        </div>
                    </div>
                    <div className='m-auto w-4/5 mt-2 flex justify-center'>

                        <Button>Done</Button>
                    </div>

                </div>
            </div>
            <div variant='outline' className='w-4/5 left-1/2 mt-1 m-auto border p-1 rounded text-center' onClick={downloadFile}>
                Company Policy Document

            </div>
        </>
    )
}

export default Announcement