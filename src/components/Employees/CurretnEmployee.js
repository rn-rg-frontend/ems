'use client'
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { MoveLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
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
import { getCV, getEmployeeProfile, uploadCv } from '../services/api'
import { useSession } from 'next-auth/react'

function CurretnEmployee({ employeeId }) {
    const router = useRouter()
    const [employeeName, setEmployeeName] = useState()
    const { data: session } = useSession();
    const [cvType,setCvType] = useState('');
    const [file,setFile] = useState('');
    const goToLeaves = () => {
        router.push(`/admin/employees/${ employeeId }/leaves`)
    }
    const goToWfh = () => {
        router.push(`/admin/employees/${employeeId}/wfh`)
    }
    const goToProfile = () => {
        router.push(`/admin/employees/${employeeId}/profile`)
    }
    const FILE_SIGNATURES = {
        // PDF
        '%PDF': { ext: 'pdf', mime: 'application/pdf' },
        // PNG
        '89504E47': { ext: 'png', mime: 'image/png' },
        // JPEG
        'FFD8FF': { ext: 'jpg', mime: 'image/jpeg' },
        // ZIP
        '504B0304': { ext: 'zip', mime: 'application/zip' },
        // DOC
        'D0CF11E0': { ext: 'doc', mime: 'application/msword' },
        // DOCX
        '504B0304': { ext: 'docx', mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' }
    };

    const handleUploadCv =async (e) =>{
        e.preventDefault();
        if(!file || !cvType) return
        try{
            const formData = new FormData()
            formData.append('file',file)
            formData.append('name',cvType)
            const res = await uploadCv(session?.user?.accessToke,employeeId,formData)
            alert("cv uploaded")
        }catch(err){
            console.log("error")
        }
       
        
    }
    const detectFileType = (uint8Array) => {
        // Convert first few bytes to hex string for comparison
        const header = Array.from(uint8Array.slice(0, 8))
            .map(byte => byte.toString(16).padStart(2, '0'))
            .join('')
            .toUpperCase();

        // Check for PDF (magic number: %PDF)
        if (uint8Array[0] === 0x25 && uint8Array[1] === 0x50 &&
            uint8Array[2] === 0x44 && uint8Array[3] === 0x46) {
            return FILE_SIGNATURES['%PDF'];
        }

        // Check for PNG
        if (header.startsWith('89504E47')) {
            return FILE_SIGNATURES['89504E47'];
        }

        // Check for JPEG
        if (header.startsWith('FFD8FF')) {
            return FILE_SIGNATURES['FFD8FF'];
        }

        // Check for ZIP or DOCX (both use the same signature)
        if (header.startsWith('504B0304')) {
            return FILE_SIGNATURES['504B0304'];
        }

        // Default to binary file if type cannot be detected
        return { ext: 'bin', mime: 'application/octet-stream' };
    };

    const handleCvDownload = async (cvName) => {
        try {

            // Convert the file object to Uint8Array
            const CVData = await getCV(session?.user?.accessToke, employeeId);
            console.log(CVData)
            const fileData = CVData.find(i => i.name === cvName);
            console.log(fileData)
            if (!fileData) return;
            const fileLength = Object.keys(fileData.file).length;
            const uint8Array = new Uint8Array(fileLength);

            for (let i = 0; i < fileLength; i++) {
                uint8Array[i] = fileData.file[i];
            }

            // Detect file type
            const { ext, mime } = detectFileType(uint8Array);

            // Create blob with correct MIME type
            const blob = new Blob([uint8Array], { type: mime });

            // Create download URL
            const url = window.URL.createObjectURL(blob);

            // Create and trigger download
            const link = document.createElement('a');
            link.href = url;
            link.download = `downloaded-file.${ext}`;

            document.body.appendChild(link);
            link.click();
            link.parentNode?.removeChild(link);

            // Cleanup
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Download error:', error);
            alert('Failed to download file. Please try again.');
        }
    };



    useEffect(() => {
        if(session?.user?.accessToken)
        (async () => {
            console.log(employeeId)
            const result = await getEmployeeProfile(session?.user?.accessToken, employeeId)
            setEmployeeName(result.name)
        })()
    },[session])


    return (
        <div className='w-4/5 m-auto'>
            <Link href='/admin/employees' className='text-2xl flex gap-1 items-center  border-b-2 p-2 border-gray-300 font-bold'>
                <MoveLeft /> <span>All Employees</span>
            </Link>
            <div className='mt-4 flex flex-col gap-6'>
                <p className='text-2xl font-semibold text-center'> {employeeName} </p>
                <div className='w-full flex flex-wrap justify-between m-auto '>
                    <Button onClick={goToLeaves} variant='outline' className='hover:shadow-lg h-24 text-xl shadow-md font-semibold w-1/4 border-gray-400'>Leaves</Button>
                    <Button onClick={goToWfh} variant='outline' className='hover:shadow-lg h-24 text-xl font-semibold shadow-md w-1/4 border-gray-400'>WFH</Button>
                    <Button onClick={goToProfile} variant='outline' className='hover:shadow-lg h-24 text-xl font-semibold shadow-md w-1/4 border-gray-400'>Profile</Button>
                </div>
                <div className='w-full flex flex-wrap justify-between  gap-2 mt-4'>
                    <Button className='border-black md:w-1/4 w-1/3 ' onClick={() => handleCvDownload("Next js")} > CV for Next.js</Button>
                    <Button className='border-black md:w-1/4 w-1/3 ' onClick={() => handleCvDownload("Python")} >CV for Python</Button>
                    <Button className='border-black md:w-1/4 w-1/3 ' onClick={() => handleCvDownload("Java")}> CV for JAVA</Button>
                    <Button className='border-black md:w-1/4 w-1/3 text-wrap ' onClick={() => handleCvDownload("Full Stack")}>CV for Full Stack</Button>
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
                                <form onSubmit={handleUploadCv}>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="name" className="text-right">
                                            TechStack
                                        </Label>
                                        <select  onChange={e => setCvType(e.target.value)} className='col-span-3 p-2 border rounded'>
                                            <option>Next js</option>
                                            <option>Python</option>
                                            <option>Java</option>
                                            <option>Full Stack</option>
                                        </select>
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="username" className="text-right">
                                            File
                                        </Label>
                                        <input  onChange={e => setFile(e.target.files[0])} className="block w-full col-span-3 p-1 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" />
                                    </div>
                                    <Button type="submit">Submit</Button>
                                </form>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

        </div>
    )
}

export default CurretnEmployee