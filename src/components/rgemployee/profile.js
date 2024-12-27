'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import { Input } from '../ui/input'
import { Pencil } from 'lucide-react'
import { Button } from '../ui/button'

function RGEmployeeProfile() {
    const [editPersonal, setEditPersonal] = useState(false)
    const [editContact, setEditContact] = useState(false)
    const [employeeDetails, setEmployeeDetails] = useState({
        personalInfo: {
            name: "John Doe",
            designation: "Software Engineer",
            dateOfJoining: "2021-06-15",
            emailID: "john.doe@example.com",
            salary: "75000",
        },
        additionalDetails: {
            contactDetails: "+1-234-567-890",
            dateOfBirth: "1990-04-25",
            highestEducation: "Master's Degree in Computer Science",
            institute: "XYZ University",
            aadharCard: "1234-5678-9012",
            pan: "ABCDE1234F",
            bloodGroup: "O+",
        },
        otherDetails: {
            homeAddress: "123 Main Street, Springfield, IL, USA",
            medicalHistoryAndAllergy: "None",
            endDate: "N/A",
            emergencyContact: {
                name: "Jane Doe",
                contact: "+1-345-678-901",
                relationship: "Spouse",
            },
        },
    }
    )
    const ChagePersonalDetails = (key, val) => {
        if (editPersonal) {
            setEmployeeDetails(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, [key]: val } }))
        }
    }

    return (
        <>
            <h1 className='text-2xl font-bold border-b-2 mb-2 w-4/5 m-auto overflow-auto'>Profile</h1>
            <div className='w-11/12 m-auto grid md:grid-cols-3 grid-cols-2 gap-2'>
                <div className='flex flex-col items-center justify-self-center gap-2'>
                    <Image src={'/image.png'} alt='profile' width='200' height='200' className='rounded' />
                    <p className='px-2 text-lg py-1 rounded-lg w-fit   border text-center' >{employeeDetails.personalInfo.name}</p>
                    <p className='px-2  py-1 rounded-lg w-fit   border text-center' >{employeeDetails.personalInfo.designation}</p>
                    <div className=' p-2  rounded'>
                        AT Work From : 3 months
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
                
                    <form className='w-11/12 flex flex-col gap-2'>
                        <p className='bg-rgtheme text-center py-1 px-2 text-lg font-bold text-white rounded flex items-center'>Personal Details </p>
                        <div className='grid md:grid-cols-4 grid-cols-1 items-center text-sm'>
                            <p>Name </p>
                            <p name='name' className=' col-span-3' >{employeeDetails.personalInfo.name}</p>
                        </div>
                        <div className='grid md:grid-cols-4 grid-cols-1 items-center text-sm'>
                            <p>Designation </p>
                            <p name='designation' className='border rounded p-2 col-span-3' >{employeeDetails.personalInfo.designation}</p>
                        </div>
                        <div className='grid md:grid-cols-4 grid-cols-1 items-center text-sm'>
                            <p>Date of Joining </p>
                            <p name='designation' className='border rounded p-2 col-span-3' >{employeeDetails.personalInfo.dateOfJoining}</p>
                        </div>
                        <div className='grid gmd:grid-cols-4 grid-cols-1 items-center text-sm'>
                            <p>Email ID </p>
                            <p name='designation' className='border rounded p-2 col-span-3' >{employeeDetails.personalInfo.emailID}</p>
                        </div>
                        <div className='grid md:grid-cols-4 grid-cols-1 items-center text-sm'>
                            <p>Salary </p>
                            <p name='designation' className='border rounded p-2 col-span-3' >{employeeDetails.personalInfo.salary}</p>
                        </div>

                    </form>
                    <div className='w-11/12 flex flex-col gap-2 mt-2'>
                        <p className='bg-rgtheme text-center py-1 px-2 text-lg font-bold text-white rounded flex items-center'>Additional Details</p>
                        <div className='grid md:grid-cols-4 grid-cols-1 items-center text-sm'>
                            <p> Institute </p>
                            <p name='designation' className='border rounded p-2 col-span-3' >{employeeDetails.additionalDetails.institute}</p>
                        </div>
                        <div className='grid md:grid-cols-4 grid-cols-1 items-center text-sm'>
                            <p>Date of birth </p>
                            <p name='designation' className='border rounded p-2 col-span-3' >{employeeDetails.additionalDetails.dateOfBirth}</p>
                        </div>
                        <div className='grid md:grid-cols-4 grid-cols-1 items-center text-sm'>
                            <p> Aadhar Card No </p>
                            <p name='designation' className='border rounded p-2 col-span-3' >{employeeDetails.additionalDetails.aadharCard}</p>
                        </div>
                        <div className='grid md:grid-cols-4 grid-cols-1 items-center text-sm'>
                            <p>Pan No </p>
                            <p name='designation' className='border rounded p-2 col-span-3' >{employeeDetails.additionalDetails.pan}</p>
                        </div>
                        <div className='grid md:grid-cols-4 grid-cols-1 items-center text-sm'>
                            <p> Blood group </p>
                            <p name='designation' className='border rounded p-2 col-span-3' >{employeeDetails.additionalDetails.bloodGroup}</p>
                        </div>
                    </div>
                
                <div className='w-11/12 flex flex-col gap-2'>
                    <p className='bg-rgtheme text-center py-1 px-2 text-lg font-bold text-white rounded flex items-center'>Contact Details </p>
                    <div className='grid md:grid-cols-4 grid-cols-1 items-center text-sm'>
                        <p>Address </p>
                        <p name='designation' className='border rounded p-2 col-span-3' >{employeeDetails.otherDetails.homeAddress}</p>
                    </div>
                    <div className='grid md:grid-cols-4 grid-cols-1 items-center text-sm'>
                        <p>Phone No </p>
                        <Input defaultValue={'9172778344'} className=' col-span-3' />
                    </div>
                    <div className='flex w-11/12 mx-auto items-center'>
                        <p className='border border-gray-300 flex-grow'></p>
                        <p className='mx-2'>Emergency Contact</p>
                        <p className='border border-gray-300 flex-grow'></p>
                    </div>
                    <div className='grid md:grid-cols-4 grid-cols-1 items-center text-sm'>
                        <p>Name </p>
                        <Input className=' col-span-3' />
                    </div>
                    <div className='grid md:grid-cols-4 grid-cols-1 items-center text-sm'>
                        <p>Phone No </p>
                        <Input className=' col-span-3' />
                    </div>
                    <div className='grid md:grid-cols-4 grid-cols-1 items-center text-sm'>
                        <p>Relationship </p>
                        <Input className=' col-span-3' />
                    </div>
                </div>
            </div>
        </>
    )
}

export default RGEmployeeProfile