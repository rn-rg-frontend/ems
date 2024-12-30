'use client'
import React, { useState } from 'react'
import { Input } from '../ui/input'
import { Search } from 'lucide-react'
import Image from 'next/image';
import { useEffect } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Label } from '@/components/ui/label';
import axios from 'axios';
import { useSession } from "next-auth/react";
import { getUserList } from '../services/api';
import { useProvider } from '@/provider/Provider';
import Link from 'next/link';
import { Button } from '../ui/button';
import { MoveLeft, Pencil } from 'lucide-react';
import { Camera } from 'lucide-react';
const randomArray = [
    { name: "Fiona Taylor", id: 1, profile_pic: "https://randomuser.me/api/portraits/men/44.jpg" },
    { name: "Bob Harris", id: 2, profile_pic: "https://randomuser.me/api/portraits/men/44.jpg" },
    { name: "Jack Martin", id: 3, profile_pic: "https://randomuser.me/api/portraits/men/44.jpg" },
    { name: "George Anderson", id: 4, profile_pic: "https://randomuser.me/api/portraits/men/44.jpg" },
    { name: "Charlie Smith", id: 5, profile_pic: "https://randomuser.me/api/portraits/men/44.jpg" },
    { name: "Ethan Brown", id: 6, profile_pic: "https://randomuser.me/api/portraits/men/44.jpg" },
    { name: "George Anderson", id: 7, profile_pic: "https://randomuser.me/api/portraits/men/44.jpg" },
    { name: "Jack Johnson", id: 8, profile_pic: "https://randomuser.me/api/portraits/men/44.jpg" },
    { name: "Hannah Martin", id: 9, profile_pic: "https://randomuser.me/api/portraits/men/44.jpg" },
    { name: "Diana Harris", id: 10, profile_pic: "https://randomuser.me/api/portraits/men/44.jpg" }
];


function Employees() {
    const [userList, setUserList] = useState([])
    const {data: session}= useSession()
    const { setSelectedEmployee } = useProvider();
    const [addEmployee, setAddEmployee] = useState(false)
    const [editPersonal, setEditPersonal] = useState(false)
    const [editContact, setEditContact] = useState(false)
    const [imagePreview, setImagePreview] = useState(null);
    // const [employeeDetails, setEmployeeDetails] = useState({
    //     personalInfo: {
    //         name: "John Doe",
    //         designation: "Software Engineer",
    //         dateOfJoining: "2021-06-15",
    //         emailID: "john.doe@example.com",
    //         salary: "75000",
    //     },
    //     additionalDetails: {
    //         contactDetails: "+1-234-567-890",
    //         dateOfBirth: "1990-04-25",
    //         highestEducation: "Master's Degree in Computer Science",
    //         institute: "XYZ University",
    //         aadharCard: "1234-5678-9012",
    //         pan: "ABCDE1234F",
    //         bloodGroup: "O+",
    //     },
    //     otherDetails: {
    //         homeAddress: "123 Main Street, Springfield, IL, USA",
    //         medicalHistoryAndAllergy: "None",
    //         endDate: "N/A",
    //         emergencyContact: {
    //             name: "Jane Doe",
    //             contact: "+1-345-678-901",
    //             relationship: "Spouse",
    //         },
    //     },
    // }
    // )
    const [employeeDetails, setEmployeeDetails] = useState([])
    useEffect(() => {
        const fetchUsers = async () => {
            if (!session) {
                console.log("User is not authenticated");
                // setLoading(false);
                return;
            }
            try {
                const response = await getUserList(session.user.accessToken); // Access the token from session
                setUserList(response.data);
                setEmployeeDetails(response.data)
                console.log(response.data)
            } catch (error) {
                // setError(error.message);
                console.log(error)
            } finally {
                // setLoading(false);
            }
        };

        fetchUsers();
    }, [session]); 


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setImagePreview(reader.result);
          };
          reader.readAsDataURL(file);
        }
      };
      

    const ChagePersonalDetails = (key, val) => {
        if (editPersonal) {
            setEmployeeDetails(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, [key]: val } }))
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(employeeDetails)
        setEditPersonal(false)
    }
    if (addEmployee) {
        return (
            <div className='p-2'>
                <div className='flex w-4/5 justify-between m-auto border-b p-2'>
                    <h1 className='text-2xl flex gap-1 items-center font-bold' onClick={() => setAddEmployee(false)}><MoveLeft /> <span>All Employees</span></h1>
                </div>
                <div className=' w-4/5 m-auto grid  grid-cols-2 grid-rows-2 gap-2 mt-2 items-start justify-start'>
                    <form className='w-11/12 flex flex-col gap-2' >
                        <p className='bg-rgtheme text-center py-1 px-2 text-lg font-bold text-white rounded flex items-center'>Personal Details <Pencil onClick={() => setEditPersonal(true)} className='ms-auto w-5 h-5' /></p>
                        <div className="flex flex-col items-center gap-4">
                            <div className="relative w-32 h-32 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                                {imagePreview ? (
                                    <img
                                        src={imagePreview}
                                        alt="Profile Preview"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <Camera className="w-12 h-12 text-gray-400" />
                                )}
                            </div>
                            <div>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                    id="profile-image"
                                />
                                <Label
                                    htmlFor="profile-image"
                                    className="cursor-pointer inline-flex items-center px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-700"
                                >
                                    Upload Photo
                                </Label>
                            </div>
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
                            <Input name='dateOfJoining' onChange={(e) => ChagePersonalDetails('dateOfJoining', e.target.value)} value={employeeDetails.dateOfJoining} className=' col-span-3' />
                        </div>
                        <div className='grid grid-cols-4 items-center text-sm'>
                            <p>Email ID </p>
                            <Input onChange={(e) => ChagePersonalDetails('emailID', e.target.value)} value={employeeDetails.emailID} className=' col-span-3' />
                        </div>
                        <div className='grid grid-cols-4 items-center text-sm'>
                            <p>Salary </p>
                            <Input onChange={(e) => ChagePersonalDetails('salary', e.target.value)} value={employeeDetails.salary} className=' col-span-3' />
                        </div>

                        <Button className='hover:border-rgtheme hover:text-rgtheme border-black' variant='outline'>Submit</Button>

                    </form>
                    <div className='w-11/12 flex flex-col gap-2 '>
                        <p className='bg-rgtheme text-center py-1 px-2 text-lg font-bold text-white rounded flex items-center'>Additional Details <Pencil className='ms-auto w-5 h-5' /></p>
                        <div className='grid grid-cols-4 items-center text-sm'>
                            <p> Institute </p>
                            <Input defaultValue={employeeDetails.additionalDetails.institute} className=' col-span-3' />
                        </div>
                        <div className='grid grid-cols-4 items-center text-sm'>
                            <p>Date of birth </p>
                            <Input defaultValue={employeeDetails.additionalDetails.dateOfBirth} className=' col-span-3' />
                        </div>
                        <div className='grid grid-cols-4 items-center text-sm'>
                            <p> Aadhar Card No </p>
                            <Input defaultValue={employeeDetails.additionalDetails.aadharCard} className=' col-span-3' />
                        </div>
                        <div className='grid grid-cols-4 items-center text-sm'>
                            <p>Pan No </p>
                            <Input defaultValue={employeeDetails.additionalDetails.pan} className=' col-span-3' />
                        </div>
                        <div className='grid grid-cols-4 items-center text-sm'>
                            <p> Blood group </p>
                            <Input defaultValue={employeeDetails.additionalDetails.bloodGroup} className=' col-span-3' />
                        </div>
                        <Button className='hover:border-rgtheme hover:text-rgtheme border-black' variant='outline'>Submit</Button>
                    </div>

                    <div className='w-11/12 flex flex-col gap-2'>
                        <p className='bg-rgtheme text-center py-1 px-2 text-lg font-bold text-white rounded flex items-center'>Contact Details <Pencil className='ms-auto w-5 h-5' /></p>
                        <div className='grid grid-cols-4 items-center text-sm'>
                            <p>Address </p>
                            <Input defaultValue={employeeDetails.otherDetails.homeAddress} className=' col-span-3' />
                        </div>
                        <div className='grid grid-cols-4 items-center text-sm'>
                            <p>Phone No </p>
                            <Input defaultValue={'9172778344'} className=' col-span-3' />
                        </div>
                        <div className='flex w-11/12 mx-auto items-center'>
                            <p className='border border-gray-300 flex-grow'></p>
                            <p className='mx-2'>Emergency Contact</p>
                            <p className='border border-gray-300 flex-grow'></p>
                        </div>
                        <div className='grid grid-cols-4 items-center text-sm'>
                            <p>Name </p>
                            <Input className=' col-span-3' />
                        </div>
                        <div className='grid grid-cols-4 items-center text-sm'>
                            <p>Phone No </p>
                            <Input className=' col-span-3' />
                        </div>
                        <div className='grid grid-cols-4 items-center text-sm'>
                            <p>Relationship </p>
                            <Input className=' col-span-3' />
                        </div>
                        <Button className='hover:border-rgtheme hover:text-rgtheme border-black' variant='outline'>Submit</Button>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className='p-2'>
            <div className='flex w-4/5 justify-between m-auto border-b p-2'>
                <h1 className='text-2xl font-bold'>Employees</h1>
                <Button onClick={() => setAddEmployee(true)}>Add New Employee</Button>
            </div>
            <div className='w-4/5 m-auto flex justify-center mt-2'>
                <form className='w-96 relative'>
                    <Input className='w-full' placeholder='search..' />
                    <button className='absolute w-8 top-0 right-0 bottom-0 flex items-center'>
                        <Search className='w-5 h-5' />
                    </button>
                </form>
            </div>

            <div className='mt-4 grid md:grid-cols-3 grid-cols-2 w-4/5 m-auto gap-2'>
                {userList.map(i => <Link key={i.id} href={`/admin/employees/${i.id}`}> <Card className='cursor-pointer hover:shadow-lg border w-[95%] h-24 flex justify-center border-gray-300 rounded'>
                    <CardContent className='flex gap-2 p-2  items-center'>
                        <Image alt={i.name} src={'/image.png'} width={50} height={50} className='w-10 h-10 rounded-[50%]' />
                        <p className='text-lg'>{i.name}</p>
                    </CardContent>
                </Card></Link>)}
            </div>
        </div>
    )
}

export default Employees