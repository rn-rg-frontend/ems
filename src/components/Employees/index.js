'use client'
import React from 'react'
import { Input } from '../ui/input'
import { Search } from 'lucide-react'
import Image from 'next/image';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

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
    return (
        <div className='p-2'>
            <div className='flex w-4/5 justify-between m-auto border-b p-2'>
                <h1 className='text-2xl font-bold'>Employees</h1>
                <form className='w-96 relative'>
                    <Input className='w-full' placeholder='search..' />
                    <button className='absolute w-8 top-0 right-0 bottom-0 flex items-center'>
                        <Search className='w-5 h-5' />
                    </button>
                </form>
            </div>
            <div className='mt-4 grid grid-cols-3 w-4/5 m-auto gap-2'>
                {randomArray.map(i => <Card key={i.id} className=' border w-[95%] h-24 flex justify-center border-gray-300 rounded'>
                    <CardContent className='flex gap-2 p-2  items-center'>
                        <Image alt={i.name} src={'/image.png'} width={50} height={50} className='w-10 h-10 rounded-[50%]' />
                        <p className='text-lg'>{i.name}</p>
                    </CardContent>
                </Card>)}
            </div>
        </div>
    )
}

export default Employees