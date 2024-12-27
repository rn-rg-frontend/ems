

import Navbar from '@/components/common/Navbar';
import Login from '@/components/Login';
import Image from 'next/image'
import { Button } from '@/components/ui/button'
export default function Home() {
  return (
    <div className='flex-grow'>
      
      <Login />
    </div>
  );
}
