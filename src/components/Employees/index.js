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
import { addEmployees } from '../services/api';

function Employees() {
    const [userList, setUserList] = useState([])
    const {data: session}= useSession()
    const { setSelectedEmployee } = useProvider();
    const [addEmployee, setAddEmployee] = useState(false)
    const [editPersonal, setEditPersonal] = useState(false);
    const [editContact, setEditContact] = useState(false)
    const [imagePreview, setImagePreview] = useState(null);
  

    const [employeeDetails, setEmployeeDetails] = useState({})
    
    const handleDetailsChange = (field, value) => {
        setEmployeeDetails((prev) => ({
            ...prev,
            [field]: value,
        }));
    };
    

    useEffect(() => {
        const fetchUsers = async () => {
            if (!session) {
                console.log("User is not authenticated");
                // setLoading(false);
                return;
            }
            try {
                const response = await getUserList(session.user.accessToken); 
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


    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = () => reject("Error converting file to base64");
            reader.readAsDataURL(file);
        });
    };
    
    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const base64Image = await convertToBase64(file);
                setImagePreview(base64Image); // Save to state or use as needed
            } catch (error) {
                console.error("Error converting image to base64:", error);
            }
        }
    };

    const ChagePersonalDetails = (key, val) => {
        if (editPersonal) {
            setEmployeeDetails(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, [key]: val } }))
        }
    }
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     console.log(empDetails);
    //     // Handle form submission
    // };
    // const [empDetails, setEmpDetails] = useState({
    //     photo: '',
    //     name: '',
    //     designation: '',
    //     dateOfJoining: '',
    //     emailID: '',
    //     salary: '',
    //     institute: '',
    //     dateOfBirth: '',
    //     aadharCard: '',
    //     pan: '',
    //     bloodGroup: '',
    //     homeAddress: '',
    //     phone: '',
    //     emergencyPhone: '',
    //     userName: '',
    //     password: '',
    //     highestEducation: '',
    //     medicalHistory: ''
    // });
    const [empDetails, setEmpDetails] = useState({
        photo: '', // Replace with actual base64 or a placeholder
        name: '',
        designation: '',
        dateOfJoining: '',
        emailID: '',
        salary: '',
        institute: '',
        dateOfBirth: '',
        aadharCard: '',
        pan: '',
        bloodGroup: '',
        homeAddress: '123 Main Street, City, State, Country',
        phone: '',
        emergencyPhone: '',
        userName: '',
        password: '',
        highestEducation: '',
        medicalHistory: '',
        endDate: ''
    });
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const employeeData = {
            userName: empDetails.userName,
            password: empDetails.password,
            isAdmin: false,
            name: empDetails.name,
            photo: imagePreview || '', // Base64-encoded photo or fallback
            designation: empDetails.designation,
            dateOfJoining: empDetails.dateOfJoining,
            email: empDetails.emailID,
            contactDetails: empDetails.phone,
            DOB: empDetails.dateOfBirth,
            highestEducation: empDetails.highestEducation,
            instituteName: empDetails.institute,
            aadharCard: empDetails.aadharCard,
            panCard: empDetails.pan,
            bloodGroup: empDetails.bloodGroup,
            totalLeave: 20, // Default or dynamic value
            address: empDetails.homeAddress,
            endDate: empDetails.endDate,
            emergencyContact: empDetails.emergencyPhone,
            medicalHistory: empDetails.medicalHistory,
            salaryAmount: empDetails.salary,
        };
    
        try {
            const response = await addEmployees(session.user.accessToken, employeeData);
            console.log('Employee added successfully:', response);
            setEditPersonal(false); 
        } catch (error) {
            console.error('Error adding employee:', error);
        }
    };
    
    
    if (addEmployee) {
        return (
            <div className='p-2'>
                <div className='flex w-4/5 justify-between m-auto border-b p-2'>
                    <h1 className='text-2xl flex gap-1 items-center font-bold' onClick={() => setAddEmployee(false)}><MoveLeft /> <span>All Employees</span></h1>
                </div>
                <form onSubmit={handleSubmit} className=' w-4/5 m-auto grid  grid-cols-2 grid-rows-2 gap-2 mt-2 items-start justify-start'>
            <div className='w-11/12 flex flex-col gap-2'>
                <p className='bg-rgtheme text-center py-1 px-2 text-lg font-bold text-white rounded flex items-center'>Personal Details <Pencil onClick={() => setEditPersonal(true)} className='ms-auto w-5 h-5' /></p>
                <div className="flex flex-col items-center gap-4">
                    <div className="relative w-32 h-32 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                        {imagePreview ? (
                            <img src={imagePreview} alt="Profile Preview" className="w-full h-full object-cover" />
                        ) : (
                            <Camera className="w-12 h-12 text-gray-400" />
                        )}
                    </div>
                    <div>
                        <Input type="file" accept="image/*" onChange={handleImageChange} className="hidden" id="profile-image" />
                        <Label htmlFor="profile-image" className="cursor-pointer inline-flex items-center px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-700">
                            Upload Photo
                        </Label>
                    </div>
                </div>

                <div className='grid grid-cols-4 items-center text-sm'>
                    <p>Name </p>
                    <Input name='name' onChange={(e) => handleDetailsChange('name', e.target.value)} value={employeeDetails.name} className=' col-span-3' />
                </div>
                <div className='grid grid-cols-4 items-center text-sm'>
                    <p>Designation </p>
                    <Input name='designation' onChange={(e) => handleDetailsChange('designation', e.target.value)} value={employeeDetails.designation} className=' col-span-3' />
                </div>
                <div className='grid grid-cols-4 items-center text-sm'>
                    <p>Date of Joining </p>
                    <Input type='date' name='dateOfJoining' onChange={(e) => handleDetailsChange('dateOfJoining', e.target.value)} value={employeeDetails.dateOfJoining} className=' col-span-3' />
                </div>
                <div className='grid grid-cols-4 items-center text-sm'>
                    <p>Email ID </p>
                    <Input type="email" onChange={(e) => handleDetailsChange('emailID', e.target.value)} value={employeeDetails.emailID} className=' col-span-3' />
                </div>
                <div className='grid grid-cols-4 items-center text-sm'>
                    <p>Salary </p>
                    <Input onChange={(e) => handleDetailsChange('salary', e.target.value)} value={employeeDetails.salary} className=' col-span-3' />
                </div>
            </div>

            <div className='w-11/12 flex flex-col gap-2'>
                <p className='bg-rgtheme text-center py-1 px-2 text-lg font-bold text-white rounded flex items-center'>Additional Details <Pencil className='ms-auto w-5 h-5' /></p>
                <div className='grid grid-cols-4 items-center text-sm'>
                    <p>Highest Education </p>
                    <Input onChange={(e) => handleDetailsChange('highestEducation', e.target.value)} value={employeeDetails.highestEducation} className=' col-span-3' />
                </div>
                <div className='grid grid-cols-4 items-center text-sm'>
                    <p>Institute </p>
                    <Input onChange={(e) => handleDetailsChange('institute', e.target.value)} value={employeeDetails.institute} className=' col-span-3' />
                </div>
                <div className='grid grid-cols-4 items-center text-sm'>
                    <p>Date of birth </p>
                    <Input type="date" onChange={(e) => handleDetailsChange('dateOfBirth', e.target.value)} value={employeeDetails.dateOfBirth} className=' col-span-3' />
                </div>
                <div className='grid grid-cols-4 items-center text-sm'>
                    <p>Aadhar Card No </p>
                    <Input onChange={(e) => handleDetailsChange('aadharCard', e.target.value)} value={employeeDetails.aadharCard} className=' col-span-3' />
                </div>
                <div className='grid grid-cols-4 items-center text-sm'>
                    <p>Pan No </p>
                    <Input onChange={(e) => handleDetailsChange('pan', e.target.value)} value={employeeDetails.pan} className=' col-span-3' />
                </div>
                <div className='grid grid-cols-4 items-center text-sm'>
                    <p>Blood group </p>
                    <Input onChange={(e) => handleDetailsChange('bloodGroup', e.target.value)} value={employeeDetails.bloodGroup} className=' col-span-3' />
                </div>
                <div className='grid grid-cols-4 items-center text-sm'>
                    <p>Medical history</p>
                    <Input onChange={(e) => handleDetailsChange('medicalHistory', e.target.value)} value={employeeDetails.medicalHistory} className=' col-span-3' />
                </div>
                <div className='grid grid-cols-4 items-center text-sm'>
                    <p>End Date</p>
                    <Input type="date" onChange={(e) => handleDetailsChange('endDate', e.target.value)} value={employeeDetails.endDate} className=' col-span-3' />
                </div>
            </div>

            <div className='w-11/12 flex flex-col gap-2'>
                <p className='bg-rgtheme text-center py-1 px-2 text-lg font-bold text-white rounded flex items-center'>Contact Details <Pencil className='ms-auto w-5 h-5' /></p>
                <div className='grid grid-cols-4 items-center text-sm'>
                    <p>Address </p>
                    <Input onChange={(e) => handleDetailsChange('homeAddress', e.target.value)} value={employeeDetails.homeAddress} className=' col-span-3' />
                </div>
                <div className='grid grid-cols-4 items-center text-sm'>
                    <p>Phone No </p>
                    <Input onChange={(e) => handleDetailsChange('phone', e.target.value)} value={employeeDetails.phone} className=' col-span-3' />
                </div>
                <div className='flex w-11/12 mx-auto items-center'>
                    <p className='border border-gray-300 flex-grow'></p>
                    <p className='mx-2'>Emergency Contact</p>
                    <p className='border border-gray-300 flex-grow'></p>
                </div>
                <div className='grid grid-cols-4 items-center text-sm'>
                    <p>Phone No </p>
                    <Input onChange={(e) => handleDetailsChange('emergencyPhone', e.target.value)} value={employeeDetails.emergencyPhone} className=' col-span-3' />
                </div>
            </div>

            <div className='w-11/12 flex flex-col gap-2'>
                <p className='bg-rgtheme text-center py-1 px-2 text-lg font-bold text-white rounded flex items-center'>Login Details <Pencil className='ms-auto w-5 h-5' /></p>
                <div className='grid grid-cols-4 items-center text-sm'>
                    <p>Username </p>
                    <Input onChange={(e) => handleDetailsChange('userName', e.target.value)} value={employeeDetails.userName} className=' col-span-3' />
                </div>
                <div className='grid grid-cols-4 items-center text-sm'>
                    <p>Password</p>
                    <Input onChange={(e) => handleDetailsChange('password', e.target.value)} value={employeeDetails.password} className=' col-span-3' type="password" />
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
                        <Image alt={i.name} src={'/image.png'} width={50} height={50} className='w-10 h-10 rounded-[50%]' />
                        <p className='text-lg'>{i.name}</p>
                    </CardContent>
                </Card></Link>)}
            </div>
        </div>
    )
}

export default Employees