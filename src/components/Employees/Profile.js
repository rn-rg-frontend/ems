'use client'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import { Input } from '../ui/input'
import { Pencil } from 'lucide-react'
import { Button } from '../ui/button'
import { useSession } from 'next-auth/react'
import { getEmployeeProfile } from '../services/api'
import { BeatLoader } from 'react-spinners'
function EmployeeProfile({ employeeId }) {
  const [editPersonal, setEditPersonal] = useState(false)
  const [editContact, setEditContact] = useState(false)
  const { data: session } = useSession()
  const [loading,setLoading] = useState()
  const [employeeDetails, setEmployeeDetails] = useState()
  useEffect(() => {
    if (session?.user?.accessToken)
      (async () => {
        const leaveData = await getEmployeeProfile(session?.user?.accessToken, employeeId)
        setEmployeeDetails(leaveData);
      })()
  }, [session])
  const ChagePersonalDetails = (key, val) => {
    console.log(key, val)
    if (editPersonal) {
      setEmployeeDetails(prev => ({ ...prev,  ...prev.personalInfo, [key]: val  }))
      console.log(employeeDetails)
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(employeeDetails)
    setEditPersonal(false)
  }
  const calculateDate = (date) => {
    const year = new Date().getFullYear() - new Date(date).getFullYear()
    const month = new Date().getMonth() - new Date(date).getMonth()
    return `${year} Year ${month} Month`
  }
  return (
    employeeDetails ?
    <>
      <h1 className='text-2xl font-bold border-b-2 mb-2 w-4/5 m-auto'>Profile</h1>
      <div className='w-11/12 m-auto grid md:grid-cols-3 grid-cols-2 gap-2'>
        <div className='flex flex-col items-center gap-2'>
          <Image src={'/image.png'} alt='profile' width='200' height='200' className='rounded' />
          <p className='px-2 text-lg py-1 rounded-lg w-fit   border text-center' >{employeeDetails.name}</p>
          <p className='px-2  py-1 rounded-lg w-fit   border text-center' >{employeeDetails.designation}</p>
          <div className=' p-2  rounded'>
            AT Work From : {calculateDate(employeeDetails.dateOfJoining)}
          </div>
          <div className=' w-4/5  p-2 flex flex-wrap justify-between  rounded'>
            <div className='flex text-center items-center gap-1'>
              <p className=' font-semibold'>12 :</p>
              <p className='font-bold '>Leaves</p>
            </div>
            <div className='flex text-center items-center gap-1'>
              <p className=' font-semibold'>10 :</p>
              <p className='font-bold '>WFH</p>
            </div>
          </div>
        </div>
       
          <form className='w-11/12 flex flex-col gap-2' onSubmit={handleSubmit}>
            <p className='bg-rgtheme text-center py-1 px-2 text-lg font-bold text-white rounded flex items-center'>Personal Details <Pencil onClick={() => setEditPersonal(true)} className='ms-auto w-5 h-5' /></p>
            <div className='grid md:grid-cols-4 items-center grid-cols-1'>
              <p className='text-sm'>Name </p>
              <Input name='name' onChange={(e) => ChagePersonalDetails('name', e.target.value)} value={employeeDetails.name} className=' col-span-3' />
            </div>
            <div className='grid md:grid-cols-4 items-center grid-cols-1'>
              <p className='text-sm'>Designation </p>
              <Input name='designation' onChange={(e) => ChagePersonalDetails('designation', e.target.value)} value={employeeDetails.designation} className=' col-span-3' />
            </div>
            <div className='grid md:grid-cols-4 items-center grid-cols-1'>
              <p className='text-sm'>Date of Joining </p>
              <Input name='dateOfJoining' onChange={(e) => ChagePersonalDetails('dateOfJoining', e.target.value)} value={employeeDetails.dateOfJoining} className=' col-span-3' />
            </div>
            <div className='grid md:grid-cols-4 items-center grid-cols-1'>
              <p className='text-sm'>Email ID </p>
              <Input onChange={(e) => ChagePersonalDetails('emailID', e.target.value)} value={employeeDetails.email} className=' col-span-3' />
            </div>
            <div className='grid md:grid-cols-4 items-center grid-cols-1'>
              <p className='text-sm'>Salary </p>
              <Input onChange={(e) => ChagePersonalDetails('salary', e.target.value)} value={employeeDetails.salary.salary} className=' col-span-3' />
            </div>
            {
              editPersonal && <Button className='border-rgtheme text-rgtheme' variant='outline'>Submit</Button>
            }
          </form>
          <div className='w-11/12 flex flex-col gap-2 mt-2'>
            <p className='bg-rgtheme text-center py-1 items-center px-2 text-lg font-bold text-white rounded flex'>Additional Details <Pencil className='ms-auto w-5 h-5' /></p>
            <div className='grid md:grid-cols-4 items-center  grid-cols-1'>
              <p className='text-sm'> Institute </p>
              <Input defaultValue={employeeDetails.instituteName} className=' col-span-3' />
            </div>
            <div className='grid md:grid-cols-4 items-center grid-cols-1'>
              <p className='text-sm'>Date of birth </p>
              <Input defaultValue={employeeDetails.DOB} className=' col-span-3' />
            </div>
            <div className='grid md:grid-cols-4 items-center grid-cols-1'>
              <p className='text-sm'> Aadhar Card No </p>
              <Input defaultValue={employeeDetails.aadharCard} className=' col-span-3' />
            </div>
            <div className='grid md:grid-cols-4 items-center grid-cols-1'>
              <p className='text-sm'>Pan No </p>
              <Input defaultValue={employeeDetails.panCard} className=' col-span-3' />
            </div>
            <div className='grid md:grid-cols-4 items-center grid-cols-1'>
              <p className='text-sm'> Blood group </p>
              <Input defaultValue={employeeDetails.bloodGroup} className=' col-span-3' />
            </div>
          
        </div>
        <div className='w-11/12 flex flex-col gap-2'>
          <p className='bg-rgtheme text-center py-1 px-2 text-lg font-bold text-white rounded flex items-center'>Contact Details <Pencil className='ms-auto w-5 h-5' /></p>
          <div className='grid md:grid-cols-4 items-center grid-cols-1'>
            <p className='text-sm'>Address </p>
            <Input defaultValue={employeeDetails.address} className=' col-span-3' />
          </div>
          <div className='grid md:grid-cols-4 items-center grid-cols-1'>
            <p className='text-sm'>Phone No </p>
            <Input defaultValue={'9172778344'} className=' col-span-3' />
          </div>
          <div className='flex w-11/12 mx-auto items-center'>
            <p className='border border-gray-300 flex-grow'></p>
            <p className='mx-2'>Emergency Contact</p>
            <p className='border border-gray-300 flex-grow'></p>
          </div>
          <div className='grid md:grid-cols-4 items-center grid-cols-1'>
            <p className='text-sm'>Phone No </p>
            <Input value={employeeDetails.emergencyContact} className=' col-span-3' />
          </div>
        </div>
      </div>
    </>
    : <BeatLoader className='absolute top-1/2 left-1/2 -translate-x-1/2'/>
  )
}

export default EmployeeProfile