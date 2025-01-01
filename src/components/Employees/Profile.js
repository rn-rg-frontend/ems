'use client'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import { Input } from '../ui/input'
import { Pencil } from 'lucide-react'
import { Button } from '../ui/button'
import { useSession } from 'next-auth/react'
import { getEmployeeProfile } from '../services/api'
import { editUser } from '../services/api'

function EmployeeProfile({ employeeId }) {
  const [editPersonal, setEditPersonal] = useState(false)
  const [editAdditional, setEditAdditional] = useState(false)
  const [editContact, setEditContact] = useState(false)
  const [editLeaves, setEditLeaves] = useState(false)
  const { data: session } = useSession()

  const [employeeDetails, setEmployeeDetails] = useState()
  useEffect(() => {
    if (session?.user?.accessToken)
      (async () => {
        const leaveData = await getEmployeeProfile(session?.user?.accessToken, employeeId)
        setEmployeeDetails(leaveData);
      })()
  }, [session])
  const [editedFields, setEditedFields] = useState({}); 

const ChagePersonalDetails = (key, val) => {
  if (editPersonal || editAdditional || editContact || editLeaves) {
    setEmployeeDetails((prev) => {
      if (prev[key] !== val) {
        setEditedFields((fields) => ({ ...fields, [key]: val }));
        return { ...prev, [key]: val };
      }
      return prev; 
    });
  }
};

  const handleSubmit = async(e) => {
    e.preventDefault()
    
    console.log(editedFields)
    try {
      const data = await editUser(session?.user?.accessToken, employeeId, editedFields)
      console.log(data)
    } catch (error) {
      console.log(error)      
    }
    setEditPersonal(false)
    setEditAdditional(false)
    setEditContact(false)
    setEditLeaves(false)
  }
  function getDateDifference(startDate, endDate) {
    // Convert string dates to Date objects if needed
    const date1 = startDate instanceof Date ? startDate : new Date(startDate);
    const date2 = endDate instanceof Date ? endDate : new Date(endDate);

    // Get the time difference in milliseconds
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());

    // Convert to days
    let days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    // Calculate years
    const years = Math.floor(days / 365);
    days = days % 365;

    // Calculate months (approximate)
    const months = Math.floor(days / 30);
    days = days % 30;

    // Create the output string
    const parts = [];
    if (years > 0) parts.push(`${years} year${years !== 1 ? 's' : ''}`);
    if (months > 0) parts.push(`${months} month${months !== 1 ? 's' : ''}`);
    if (days > 0) parts.push(`${days} day${days !== 1 ? 's' : ''}`);

    return parts.join('-');
}

  function formatDate(isoDateString) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' }; 
    return new Date(isoDateString).toLocaleDateString(undefined, options);
  }
  return (
    employeeDetails &&
    <>
      <h1 className='text-2xl font-bold border-b-2 mb-2 w-4/5 m-auto'>Profile</h1>
      <div className='w-11/12 m-auto grid md:grid-cols-3 grid-cols-2 gap-2'>
        <div className='flex flex-col items-center gap-2'>
          <Image src={'/api/employeeList/profile/'+employeeDetails.id} alt='profile' width='200' height='200' className='rounded' />
          <p className='px-2 text-lg py-1 rounded-lg w-fit   border text-center' >{employeeDetails.name}</p>
          <p className='px-2  py-1 rounded-lg w-fit   border text-center' >{employeeDetails.designation}</p>
          <div className=' p-2  rounded'>
            AT Work From : {getDateDifference(new Date() ,employeeDetails.dateOfJoining)}
          </div>
          <div className=' w-4/5  p-2 flex flex-wrap justify-between  rounded'>
            <div className='flex text-center items-center gap-1'>
              <p className=' font-semibold'>{employeeDetails.totalLeave} :</p>
              <p className='font-bold '>Remaining leaves</p>
            </div>
            <div className='flex text-center items-center gap-1'>
              <p className=' font-semibold'>{employeeDetails.totalApprovedWFH} :</p>
              <p className='font-bold '>WFH taken</p>
            </div>
          </div>
        </div>
        <div>
          <form className='w-11/12 flex flex-col gap-2' onSubmit={handleSubmit}>
            <p className='bg-rgtheme text-center py-1 px-2 text-lg font-bold text-white rounded flex items-center'>Personal Details <Pencil onClick={() => setEditPersonal(p => !p)} className='ms-auto w-5 h-5' /></p>
            <div className='grid grid-cols-4 items-center text-sm'>
              <p>Username </p>
              <Input name='userName' onChange={(e) => ChagePersonalDetails('userName', e.target.value)} value={employeeDetails.userName} className=' col-span-3' />
            </div>
            <div className='grid grid-cols-4 items-center text-sm'>
              <p>Name </p>
              <Input name='name' onChange={(e) => ChagePersonalDetails('name', e.target.value)} value={employeeDetails.name} className=' col-span-3' />
            </div>
            <div className='grid grid-cols-4 items-center text-sm'>
              <p>Designation </p>
              <Input name='designation' onChange={(e) => ChagePersonalDetails('designation', e.target.value)} value={employeeDetails.designation} className=' col-span-3' />
            </div>
            <div className='grid grid-cols-4 items-center text-sm'>
              <p>Date of Joining </p>
              <Input name='dateOfJoining' type={editPersonal ? "date" : "text"} onChange={(e) => ChagePersonalDetails('dateOfJoining', e.target.value)} value={new Date(employeeDetails.dateOfJoining).toISOString().split("T")[0]}  className=' col-span-3' />
            </div>
            <div className='grid grid-cols-4 items-center text-sm'>
              <p>End date  </p>
              <Input name='endDate' type={editPersonal ? "date" : "text"}  onChange={(e) => ChagePersonalDetails('endDate', e.target.value)} value={new Date(employeeDetails.endDate).toISOString().split("T")[0]} className=' col-span-3' />
            </div>
            <div className='grid grid-cols-4 items-center text-sm'>
              <p>Email ID </p>
              <Input onChange={(e) => ChagePersonalDetails('emailID', e.target.value)} value={employeeDetails.email} className=' col-span-3' />
            </div>
            <div className='grid grid-cols-4 items-center text-sm'>
              <p>Salary </p>
              <Input onChange={(e) => ChagePersonalDetails('salary', Number(e.target.value))} value={employeeDetails.salary} className=' col-span-3' />
            </div>
            {
              editPersonal && <Button className='border-rgtheme text-rgtheme' variant='outline'>Submit</Button>
            }
          </form>
          <form className='w-11/12 flex flex-col gap-2 mt-2' onSubmit={handleSubmit}>
            <p className='bg-rgtheme text-center py-1 px-2 text-lg font-bold text-white rounded flex items-center'>Additional Details <Pencil onClick={() => setEditAdditional(p => !p)} className='ms-auto w-5 h-5' /></p>
            <div className='grid grid-cols-4 items-center text-sm'>
              <p>highest Education</p>
              <Input onChange={(e) => ChagePersonalDetails('highestEducation', e.target.value)} value={employeeDetails.highestEducation} className=' col-span-3' />
            </div>
            <div className='grid grid-cols-4 items-center text-sm'>
              <p> Institute </p>
              <Input onChange={(e) => ChagePersonalDetails('instituteName', e.target.value)} value={employeeDetails.instituteName} className=' col-span-3' />
            </div>
            <div className='grid grid-cols-4 items-center text-sm'>
              <p>Date of birth </p>
              <Input type={editAdditional ? "date" : "text"} onChange={(e) => ChagePersonalDetails('DOB', e.target.value)} value={new Date(employeeDetails.DOB).toISOString().split("T")[0]} className=' col-span-3' />
            </div>
            <div className='grid grid-cols-4 items-center text-sm'>
              <p> Aadhar Card No </p>
              <Input onChange={(e) => ChagePersonalDetails('aadharCard', e.target.value)} value={employeeDetails.aadharCard} className=' col-span-3' />
            </div>
            <div className='grid grid-cols-4 items-center text-sm'>
              <p>Pan No </p>
              <Input onChange={(e) => ChagePersonalDetails('panCard', e.target.value)} value={employeeDetails.panCard} className=' col-span-3' />
            </div>
            <div className='grid grid-cols-4 items-center text-sm'>
              <p> Blood group </p>
              <Input onChange={(e) => ChagePersonalDetails('bloodGroup', e.target.value)} value={employeeDetails.bloodGroup} className=' col-span-3' />
            </div>
            {
              editAdditional && <Button className='border-rgtheme text-rgtheme' variant='outline'>Submit</Button>
            }
          </form>
        </div>
        <div>
          <form className='w-11/12 flex flex-col gap-2' onSubmit={handleSubmit}>
            <p className='bg-rgtheme text-center py-1 px-2 text-lg font-bold text-white rounded flex items-center'>Contact Details <Pencil onClick={() => setEditContact(p => !p)} className='ms-auto w-5 h-5' /></p>
            <div className='grid grid-cols-4 items-center text-sm'>
              <p>Address </p>
              <Input onChange={(e) => ChagePersonalDetails('address', e.target.value)} value={employeeDetails.address} className=' col-span-3' />
            </div>
            <div className='grid grid-cols-4 items-center text-sm'>
              <p>Phone No </p>
              <Input onChange={(e) => ChagePersonalDetails('contactDetails', e.target.value)} value={employeeDetails.contactDetails} className=' col-span-3' />
            </div>
            <div className='flex w-11/12 mx-auto items-center'>
              <p className='border border-gray-300 flex-grow'></p>
              <p className='mx-2'>Emergency Contact</p>
              <p className='border border-gray-300 flex-grow'></p>
            </div>

            <div className='grid grid-cols-4 items-center text-sm'>
              <p>Medical History</p>
              <Input onChange={(e) => ChagePersonalDetails('medicalHistory', e.target.value)} value={employeeDetails.medicalHistory} className=' col-span-3' />
            </div>
            <div className='grid grid-cols-4 items-center text-sm'>
              <p>Phone No </p>
              <Input onChange={(e) => ChagePersonalDetails('emergencyContact', e.target.value)} value={employeeDetails.emergencyContact} className=' col-span-3' />
            </div>
            {
              editContact && <Button className='border-rgtheme text-rgtheme' variant='outline'>Submit</Button>
            }

          </form>
          <form className='w-11/12 flex flex-col gap-2 mt-2' onSubmit={handleSubmit}>
            <p className='bg-rgtheme text-center py-1 px-2 text-lg font-bold text-white rounded flex items-center'>Update total leaves<Pencil onClick={() => setEditLeaves(p => !p)} className='ms-auto w-5 h-5' /></p>
            <div className='grid grid-cols-4 items-center text-sm'>
              <p>Leave</p>
              <Input  onChange={(e) => ChagePersonalDetails('totalLeave',
              Number(e.target.value))} value={employeeDetails.totalLeave} className='col-span-3' />
            </div>
            {
              editLeaves && <Button className='border-rgtheme text-rgtheme' variant='outline'>Submit</Button>
            }
          </form>
        </div>
      </div>
    </>
  )
}

export default EmployeeProfile