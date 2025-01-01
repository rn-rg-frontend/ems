'use client'
import { Input } from '../ui/input'
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import Tiptap from './Tiptap'
import { postAnnouncement } from '../services/api'
import { useSession } from 'next-auth/react'
import { toast } from 'react-toastify'


function Announcement() {

    const [description,setDescription] = useState()
    const [startDate,setStartDate] = useState()
    const [endDate,setEndDate] = useState()
    const {data:session} = useSession()

    useEffect(()=>{
        console.log(startDate,endDate)
    },[startDate,endDate])
    function getCurrentDateInDDMMYYYY() {
        const today = new Date();
      
        // Extract day, month, and year
        const day = String(today.getDate()).padStart(2, '0'); // Ensure 2 digits
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
        const year = today.getFullYear();
      
        // Format as dd-mm-yyyy
        return `${year}-${month}-${day}`;
      }
    const downloadFile = () => {
        const a = document.createElement('a');
        a.href = '/policy.pdf';
        a.download = 'policy.pdf';
        a.click();
    }
    const submitAnnouncement =async (e) =>{
        e.preventDefault()
        console.log(session)
        try{
            const res =await postAnnouncement(session?.user?.accessToken,{
                description,
                startDate,
                endDate,
                title:'title'
            })
            console.log(res)
            if(res){
                setDescription('')
                setStartDate()
                setEndDate()
                toast.success("Announcement Posted Successfully")
            }
        }catch(err){
            console.log(err)
        }
       
    }
    return (
        <>
            <div className=' h-[93%] overflow-x-hidden overflow-y-auto relative'>
                <h1 className='text-2xl mb-4  m-auto w-4/5 font-bold border-b-2   p-2'>
                    Announcements
                </h1>
                <form className='mb-4' onSubmit={submitAnnouncement}>
                    <div className='w-4/5 m-auto  '>

                        <Tiptap rows="5" content={description} setContent={setDescription}  placeholder='Add and announcement to show in dashboard' className='p-1 w-full border rounded border-gray-400'>
                        </Tiptap>
                    </div>
                    <div className='flex mt-2 w-4/5 justify-between m-auto gap-2'>
                        <div className='flex w-1/2 items-center gap-1'>
                            <span>From </span>
                            <Input required={true} value={startDate || getCurrentDateInDDMMYYYY()} onChange={(e)=> setStartDate(e.target.value)}  type='date' className=' border rounded border-gray-400' />
                        </div>
                        <div className='flex w-1/2 items-center gap-1'>
                            <span>To </span>
                            <Input required={true} value={endDate || getCurrentDateInDDMMYYYY()} onChange={(e)=> setEndDate(e.target.value)} type='date' className=' border rounded border-gray-400' />
                        </div>
                    </div>
                    <div className='m-auto w-4/5 mt-2 flex justify-center'>

                        <Button>Done</Button>
                    </div>

                </form>
            </div>
            <div variant='outline' className='cursor-pointer w-4/5 left-1/2 mt-1 m-auto border p-1 rounded text-center' onClick={downloadFile}>
                Company Policy Document

            </div>
        </>
    )
}

export default Announcement