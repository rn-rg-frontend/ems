'use client'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { MoveLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { getUserData } from '../services/api'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from '../ui/label'
import { Input } from '../ui/input'

function CurretnEmployee() {
    const {data: session} = useSession()
    const [empData, setEmpData] = useState([]);
 
    // useEffect(() => {
    //         const fetchUsers = async () => {
    //             if (!session) {
    //                 console.log("User is not authenticated");
    //                 // setLoading(false);
    //                 return;
    //             }
    //             try {
    //                 const response = await getUserData(session.user.accessToken, id); // Access the token from session
    //                 setEmpData(response.data);
    //                 console.log(response.data)
    //             } catch (error) {
    //                 // setError(error.message);
    //                 console.log(error)
    //             } finally {
    //                 // setLoading(false);
    //             }
    //         };
    
    //         fetchUsers();
    //     }, [session]); 
    const router = useRouter()
    // const { id } = router.query; 
    const goToLeaves = () => {
        router.push('/admin/employees/1/leaves')
    }
    const goToWfh = () => {
        router.push('/admin/employees/1/wfh')
    }
    const goToProfile = () => {
        router.push('/admin/employees/1/profile')
    }

    return (
        <div className='w-4/5 m-auto'>
            <Link href='/admin/employees' className='text-2xl flex gap-1 items-center  border-b-2 p-2 border-gray-300 font-bold'>
                <MoveLeft /> <span>All Employees</span>
            </Link>
            <div className='mt-4 flex flex-col gap-6'>
                <p className='text-2xl font-semibold text-center'> Akshad Pardeshi </p>
                <div className='w-full flex flex-wrap justify-between m-auto '>
                    <Button onClick={goToLeaves} variant='outline' className='hover:shadow-lg h-24 text-xl shadow-md font-semibold w-1/4 border-gray-400'>Leaves</Button>
                    <Button onClick={goToWfh} variant='outline' className='hover:shadow-lg h-24 text-xl font-semibold shadow-md w-1/4 border-gray-400'>WFH</Button>
                    <Button onClick={goToProfile} variant='outline' className='hover:shadow-lg h-24 text-xl font-semibold shadow-md w-1/4 border-gray-400'>Profile</Button>
                </div>
                <div className='w-full flex flex-wrap justify-between  gap-2 mt-4'>
                    <Button className='border-black md:w-1/4 w-1/3 '> CV for Next.js</Button>
                    <Button className='border-black md:w-1/4 w-1/3 '>CV for Python</Button>
                    <Button className='border-black md:w-1/4 w-1/3 '> CV for JAVA</Button>
                    <Button className='border-black md:w-1/4 w-1/3 text-wrap '>CV for Full Stack</Button>
                </div>
                <div className='flex justify-center mt-4'>
                    <Dialog>
                        <DialogTrigger asChild>
                        <Button className='w-1/2 border-black text-black hover:bg-black hover:text-white' variant='outline'>Upload CV</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle className='text-center'>Upoad CV</DialogTitle>
                                
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="name" className="text-right">
                                        TechStack
                                    </Label>
                                    <select className='col-span-3 p-2 border rounded'>
                                        <option>Next Js</option>
                                        <option>Python</option>
                                        <option>Java</option>
                                        <option>Full Stack</option>
                                    </select>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="username" className="text-right">
                                        Username
                                    </Label>
                                    <input className="block w-full col-span-3 p-1 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file"/>
                                </div>
                            </div>
                            <DialogFooter className='!flex !justify-center'>
                                <Button type="submit">Submit</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

        </div>
    )
}

export default CurretnEmployee