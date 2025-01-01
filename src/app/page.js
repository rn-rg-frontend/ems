

import Navbar from '@/components/common/Navbar';
import Login from '@/components/Login';
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from './api/auth/[...nextauth]/route';

export default async function Home() {
  const session = await getServerSession(authOptions)
  console.log(session)
  console.log(session)
  if(session?.user?.isAdmin === true){
    redirect('/admin')
  }else if(session?.user?.isAdmin === false){
    redirect('/rgemployee')
  }
  return (
    <div className='flex-grow'>
      
      <Login />
    </div>
  );
}
