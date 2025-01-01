'use client'
import Image from 'next/image'
import React, { useEffect, useState ,useMemo} from 'react'
import { Input } from '../ui/input'
import { Pencil } from 'lucide-react'
import { Button } from '../ui/button'
import { useSession } from 'next-auth/react'
import { getEmployeeProfile } from '../services/api'
import { BeatLoader } from 'react-spinners'

function RGEmployeeProfile() {
    const [editPersonal, setEditPersonal] = useState(false)
    const [editContact, setEditContact] = useState(false)
    const {data:session} = useSession()
    const [employeeDetails, setEmployeeDetails] = useState()
    const [imageData,setImageData] = useState()
    const [laoding,setLoading] = useState(true)
    useEffect(()=>{
        if(session?.user?.accessToken){
            (async()=>{
                try{
                    setLoading(true)
                    const profile = await getEmployeeProfile(session?.user?.accessToken,session?.user?.id)
                    setImageData(profile?.photo)
                    setEmployeeDetails(profile)
                }catch(err){
                    console.log(err)
                }finally{
                    setLoading(false)
                }
               
            })()
        }
    },[session])
    const ChagePersonalDetails = (key, val) => {
        if (editPersonal) {
            setEmployeeDetails(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, [key]: val } }))
        }
    }
    const calculateDateDiff = (date) => {
        const year = new Date().getFullYear() - new Date(date).getFullYear()
        const month =  new Date().getMonth() - new Date(date).getMonth()
        const days =  new Date().getDate() - new Date(date).getDate()
        let fullDiff = "";
        if(year) fullDiff+=`${year} Year`
        if(month) fullDiff+=`${month} Month`
        if(days) fullDiff+=`${days} Days`
        return fullDiff
      }


      const base64String = useMemo(() => {
        if (!imageData) return '';
        
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
          return '';
        }
      }, [imageData]);

    return (
        <>
        {
            laoding ? <BeatLoader className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'/> : <> <h1 className='text-2xl font-bold border-b-2 mb-2 w-4/5 m-auto overflow-auto'>Profile</h1>
            <div className='w-11/12 m-auto grid md:grid-cols-3 grid-cols-2 gap-2'>
                <div className='flex flex-col items-center justify-self-center gap-2'>
                    
                    <Image src={'/api/employeeList/profile/'+employeeDetails?.id} alt='profile' width='200' height='200' className='rounded' />
                    
                    
                    <p className='px-2 text-lg py-1 rounded-lg w-fit   border text-center' >{employeeDetails?.name}</p>
                    <p className='px-2  py-1 rounded-lg w-fit   border text-center' >{employeeDetails?.designation}</p>
                    <div className=' p-2  rounded'>
                        AT Work From : {calculateDateDiff(employeeDetails?.dateOfJoining)}
                    </div>
                    <div className=' w-4/5  p-2 flex flex-wrap justify-between  rounded'>
                        <div className='flex text-center items-center gap-1'>
                            <p className='font-bold '>Leaves :</p>
                            <p className=' font-semibold'>{employeeDetails?.totalLeave}</p>
                        </div>

                    </div>
                </div>
                
                    <form className='w-11/12 flex flex-col gap-2'>
                        <p className='bg-rgtheme text-center py-1 px-2 text-lg font-bold text-white rounded flex items-center'>Personal Details </p>
                        <div className='grid md:grid-cols-4 grid-cols-1 items-center text-sm'>
                            <p>Name </p>
                            <p name='name' className=' border rounded p-2 col-span-3' >{employeeDetails?.name}</p>
                        </div>
                        <div className='grid md:grid-cols-4 grid-cols-1 items-center text-sm'>
                            <p>Designation </p>
                            <p name='designation' className='border rounded p-2 col-span-3' >{employeeDetails?.designation}</p>
                        </div>
                        <div className='grid md:grid-cols-4 grid-cols-1 items-center text-sm'>
                            <p>Date of Joining </p>
                            <p name='designation' className='border rounded p-2 col-span-3' >{employeeDetails?.dateOfJoining.split('T')[0]}</p>
                        </div>
                        <div className='grid md:grid-cols-4 grid-cols-1 items-center text-sm'>
                            <p>Email ID </p>
                            <p name='designation' className='border rounded p-2 col-span-3' >{employeeDetails?.email}</p>
                        </div>
                        <div className='grid md:grid-cols-4 grid-cols-1 items-center text-sm'>
                            <p>Salary </p>
                            <p name='designation' className='border rounded p-2 col-span-3' >{employeeDetails?.salary}</p>
                        </div>

                    </form>
                    <div className='w-11/12 flex flex-col gap-2 '>
                        <p className='bg-rgtheme text-center py-1 px-2 text-lg font-bold text-white rounded flex items-center'>Additional Details</p>
                        <div className='grid md:grid-cols-4 grid-cols-1 items-center text-sm'>
                            <p> Institute </p>
                            <p name='designation' className='border rounded p-2 col-span-3' >{employeeDetails?.instituteName}</p>
                        </div>
                        <div className='grid md:grid-cols-4 grid-cols-1 items-center text-sm'>
                            <p>Date of birth </p>
                            <p name='designation' className='border rounded p-2 col-span-3' >{employeeDetails?.DOB}</p>
                        </div>
                        <div className='grid md:grid-cols-4 grid-cols-1 items-center text-sm'>
                            <p> Aadhar Card No </p>
                            <p name='designation' className='border rounded p-2 col-span-3' >{employeeDetails?.aadharCard}</p>
                        </div>
                        <div className='grid md:grid-cols-4 grid-cols-1 items-center text-sm'>
                            <p>Pan No </p>
                            <p name='designation' className='border rounded p-2 col-span-3' >{employeeDetails?.panCard}</p>
                        </div>
                        <div className='grid md:grid-cols-4 grid-cols-1 items-center text-sm'>
                            <p> Blood group </p>
                            <p name='designation' className='border rounded p-2 col-span-3' >{employeeDetails?.bloodGroup}</p>
                        </div>
                    </div>
                
                <div className='w-11/12 flex flex-col gap-2'>
                    <p className='bg-rgtheme text-center py-1 px-2 text-lg font-bold text-white rounded flex items-center'>Contact Details </p>
                    <div className='grid md:grid-cols-4 grid-cols-1 items-center text-sm'>
                        <p>Address </p>
                        <p name='designation' className='border rounded p-2 col-span-3' >{employeeDetails?.address}</p>
                    </div>
                    <div className='grid md:grid-cols-4 grid-cols-1 items-center text-sm'>
                        <p>Phone No </p>
                        <p className='border rounded p-2 col-span-3' >{employeeDetails?.contactDetails}</p>
                    </div>
                    <div className='flex w-11/12 mx-auto items-center'>
                        <p className='border border-gray-300 flex-grow'></p>
                        <p className='mx-2'>Emergency Contact</p>
                        <p className='border border-gray-300 flex-grow'></p>
                    </div>
                    <div className='grid md:grid-cols-4 grid-cols-1 items-center text-sm'>
                        <p>Phone </p>
                        <p name='designation' className='border rounded p-2 col-span-3' >{employeeDetails?.emergencyContact}</p>
                    </div>
                </div>
            </div>
            </>
        }
            
        </>
    )
}

export default RGEmployeeProfile