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
import { getUserList, postEmployee } from '../services/api';
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
    const [imageData,setImageData] = useState();
    const [employeeDetails, setEmployeeDetails] = useState([])
    const [employeeDetail,setEmployeeDetail] = useState(
        {
            "userName": "",
            "isAdmin": false,
            "name": "",
            "designation": "",
            "dateOfJoining": "",
            "email": "",
            "contactDetails": "",
            "DOB": "",
            "highestEducation": "",
            "instituteName": "",
            "aadharCard": "2",
            "panCard": "",
            "bloodGroup": "",
            "totalLeave": 20,
            "address": "",
            "emergencyContact": "",
            "medicalHistory": "",
            "salaryAmount": 0,
            "totalApprovedWFH": 2,
            "password":'',
            "endDate":"2021-12-12"
          })
    useEffect(() => {
        const fetchUsers = async () => {
            if (!session) {
                console.log("User is not authenticated");
                // setLoading(false);
                return;
            }
            try {
                const response = await getUserList(session?.user?.accessToken); // Access the token from session
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

         const base64String = (imageData) => {
            if (!imageData) return '/RG.jpeg';
            
            try {
              // Convert object values to Uint8Array
              const uint8Array = new Uint8Array(Object.values(imageData));
              
              // Convert to base64
              const base64 = btoa(
                uint8Array.reduce((data, byte) => data + String.fromCharCode(byte), '')
              );
              
              return `data:image/jpeg;base64,${base64}`;
            } catch (err) {
              console.error('Error converting image data:', err);
              return '/RG.jpeg';
            }
          };
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageData(file)
          const reader = new FileReader();
          reader.onloadend = () => {
            setImagePreview(reader.result);
          };
          reader.readAsDataURL(file);
        }
      };
      

    const ChagePersonalDetails = (key, val) => {
            setEmployeeDetail(prev => ({...prev,[key]:val}))
    }
    const objectToFormData = (obj) => {
        const formData = new FormData();
        
        Object.entries(obj).forEach(([key, value]) => {
          formData.append(key, value);
        });
        
        return formData;
      };
    const handleSubmit =async (e) => {
        e.preventDefault()
        const formData = objectToFormData({...employeeDetail, photo:imageData})
        try{
            const data = await postEmployee(session?.user?.accessToken,formData)
        }catch(err){
            console.log(err)
        }
        setEditPersonal(false)
    }
    if (addEmployee) {
        return (
            <div className='p-2'>
                <div className='flex w-4/5 justify-between m-auto border-b p-2'>
                    <h1 className='text-2xl flex gap-1 items-center font-bold' onClick={() => setAddEmployee(false)}><MoveLeft /> <span>All Employees</span></h1>
                </div>
                <form onSubmit={handleSubmit} className=' w-4/5 m-auto grid  grid-cols-2 grid-rows-2 gap-2 mt-2 items-start justify-start'>
                    <div className='w-11/12 flex flex-col gap-2' >
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
                            <p>Username </p>
                            <Input name='name' onChange={(e) => ChagePersonalDetails('userName', e.target.value)} value={employeeDetail.userName} className=' col-span-3' />
                        </div>
                        <div className='grid grid-cols-4 items-center text-sm'>
                            <p>password </p>
                            <Input name='name' onChange={(e) => ChagePersonalDetails('password', e.target.value)} value={employeeDetail.password} className=' col-span-3' />
                        </div>
                        <div className='grid grid-cols-4 items-center text-sm'>
                            <p>Name </p>
                            <Input name='name' onChange={(e) => ChagePersonalDetails('name', e.target.value)} value={employeeDetail.name} className=' col-span-3' />
                        </div>
                        <div className='grid grid-cols-4 items-center text-sm'>
                            <p>Designation </p>
                            <Input name='designation' onChange={(e) => ChagePersonalDetails('designation', e.target.value)} value={employeeDetail.designation} className=' col-span-3' />
                        </div>
                        <div className='grid grid-cols-4 items-center text-sm'>
                            <p>Date of Joining </p>
                            <Input type='date' name='dateOfJoining' onChange={(e) => ChagePersonalDetails('dateOfJoining', e.target.value)} value={employeeDetail.dateOfJoining} className=' col-span-3' />
                        </div>
                        <div className='grid grid-cols-4 items-center text-sm'>
                            <p>Email ID </p>
                            <Input onChange={(e) => ChagePersonalDetails('email', e.target.value)} value={employeeDetail.email} className=' col-span-3' />
                        </div>
                        <div className='grid grid-cols-4 items-center text-sm'>
                            <p>Salary </p>
                            <Input type='number' min={0} onChange={(e) => ChagePersonalDetails('salaryAmount', Number(e.target.value))} value={employeeDetail.salaryAmount} className=' col-span-3' />
                        </div>
                        <div className='grid grid-cols-4 items-center text-sm'>
                            <p>Leaves </p>
                            <Input onChange={(e) => ChagePersonalDetails('totalLeave', e.target.value)} value={employeeDetail.totalLeave} className=' col-span-3' />
                        </div>

                    </div>
                    <div className='w-11/12 flex flex-col gap-2 '>
                        <p className='bg-rgtheme text-center py-1 px-2 text-lg font-bold text-white rounded flex items-center'>Additional Details <Pencil className='ms-auto w-5 h-5' /></p>
                        <div className='grid grid-cols-4 items-center text-sm'>
                            <p> Institute </p>
                            <Input value={employeeDetail.instituteName} onChange={(e) => ChagePersonalDetails("instituteName",e.target.value)} className=' col-span-3' />
                        </div>
                        <div className='grid grid-cols-4 items-center text-sm'>
                            <p> highestEducation </p>
                            <Input value={employeeDetail.highestEducation} onChange={(e) => ChagePersonalDetails("highestEducation",e.target.value)} className=' col-span-3' />
                        </div>
                        <div className='grid grid-cols-4 items-center text-sm'>
                            <p>Date of birth </p>
                            <Input type='date' value={employeeDetail.DOB} onChange={(e) => ChagePersonalDetails("DOB",e.target.value)} className=' col-span-3' />
                        </div>
                        <div className='grid grid-cols-4 items-center text-sm'>
                            <p> Aadhar Card No </p>
                            <Input value={employeeDetail.aadharCard} onChange={(e) => ChagePersonalDetails("aadharCard",e.target.value)} className=' col-span-3' />
                        </div>
                        <div className='grid grid-cols-4 items-center text-sm'>
                            <p>Pan No </p>
                            <Input value={employeeDetail.panCard} onChange={(e) => ChagePersonalDetails("panCard",e.target.value)} className=' col-span-3' />
                        </div>
                        <div className='grid grid-cols-4 items-center text-sm'>
                            <p> Blood group </p>
                            <Input value={employeeDetail.bloodGroup} onChange={(e) => ChagePersonalDetails("bloodGroup",e.target.value)} className=' col-span-3' />
                        </div>
                        <div className='grid grid-cols-4 items-center text-sm'>
                            <p> MedicalHistory </p>
                            <Input value={employeeDetail.medicalHistory} onChange={(e) => ChagePersonalDetails("medicalHistory",e.target.value)} className=' col-span-3' />
                        </div>
                    </div>

                    <div className='w-11/12 flex flex-col gap-2'>
                        <p className='bg-rgtheme text-center py-1 px-2 text-lg font-bold text-white rounded flex items-center'>Contact Details <Pencil className='ms-auto w-5 h-5' /></p>
                        <div className='grid grid-cols-4 items-center text-sm'>
                            <p>Address </p>
                            <Input value={employeeDetail.address} onChange={(e) => ChagePersonalDetails("address",e.target.value)} className=' col-span-3' />
                        </div>
                        <div className='grid grid-cols-4 items-center text-sm'>
                            <p>Phone No </p>
                            <Input value={employeeDetail.contactDetails} onChange={(e) => ChagePersonalDetails("contactDetails",e.target.value)} className=' col-span-3' />
                        </div>
                        <div className='flex w-11/12 mx-auto items-center'>
                            <p className='border border-gray-300 flex-grow'></p>
                            <p className='mx-2'>Emergency Contact</p>
                            <p className='border border-gray-300 flex-grow'></p>
                        </div>
                        <div className='grid grid-cols-4 items-center text-sm'>
                            <p>Phone No </p>
                            <Input value={employeeDetail.emergencyContact} onChange={(e) => ChagePersonalDetails("emergencyContact", e.target.value)} className=' col-span-3' />
                        </div>
                        <Button className='hover:border-rgtheme hover:text-rgtheme border-black' variant='outline'>Submit</Button>
                    </div>
                </form>
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
                        <Image alt={i.name} src={'/api/employeeList/profile/'+i.id} width={50} height={50} className='w-10 h-10 rounded-[50%]' />
                        <p className='text-lg'>{i.name}</p>
                    </CardContent>
                </Card></Link>)}
            </div>
        </div>
    )
}

export default Employees