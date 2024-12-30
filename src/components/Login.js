
// "use client";

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import Link from "next/link";
// import { signIn } from "next-auth/react";
// import Image from "next/image";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { Label } from "./ui/label";
// export default function Login() {
//   const [globalError, setGlobalError] = useState()
//   const router = useRouter()
//   // form.sub
//   const handleLogin = async (e) => {
//     e.preventDefault(); // Ensure the form submission is prevented

//     const username = e.target.username.value;  // Get the value from the username input
//     const password = e.target.password.value;  // Get the value from the password input

//     const result = await signIn('credentials', {
//       redirect: false, // Set to false for manual handling
//       username: username,
//       password: password,
//     });

//     if (result?.error) {
//       setGlobalError('Invalid username or password');
//     } else {
//       router.push('/'); // Navigate to the homepage or another page
//     }
//   };

//   return (
//     <div className="flex bg-gray-500 items-center justify-center min-h-screen w-full -ms-1 -me-1 bg-cover bg-no-repeat login_bg p-0">

//       <Card  className="md:w-1/3 w-10/12 my-4 border  tracking-widest  z-10  text-black md:px-16 md:py-10 px-6 py-4">
//         <CardHeader>
//           <CardTitle className="text-3xl flex font-bold justify-around items-center w-fit m-auto text-cente ">
//           <div className='flex items-center  flex-shrink-0'>
//           <Image src={'/RG.jpeg'} width={100} height={100} alt="rglogo" className='md:w-14 md:h-14 w-8 h-8' />
//           <div className='flex flex-col items-center justify-center'>
//             <p><span className='text-rgtheme md:text-xl md:font-bold font-semibold text-base'>Rotten </span><span className='text-rgtheme2  md:text-xl md:font-bold font-semibold text-bas'>Grapes</span></p>
//             <p className='text-sm text-gray-500 font-bold relative w-full text-center'><span>Pvt.Ltd</span><span className='w-4/5 absolute border-1 border-gray-500 top-1/2'></span></p>
//           </div>
//         </div>
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleLogin}>
//             {globalError && <p className="text-red-600  font-bold">{globalError}</p>}
//             <div className="mb-6">
//               <Label className='mb-2'>Username</Label>
//               <Input autoComplete="off" className='bg-white border-black text-black' placeholder="username"  />
//             </div>
//             <div className="mb-3">
             
//                     <Label>Password</Label>
//                       <Input autoComplete="off" className='bg-white border-black text-black' placeholder='****' type="password"  />

//             </div>
//             <p className="underline text-sm my-3 cursor-pointer text-white tracking-wider">
//               Forget password ?
//             </p>
//             <Button className='w-full'>
//               Submit
//             </Button>
//           </form>



//         </CardContent>
//       </Card>
//     </div>
//   );
// }



"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Label } from "./ui/label";
// import { useSession } from "next-auth/react";

export default function Login() {
  const [globalError, setGlobalError] = useState();
  const router = useRouter();

  // const {data: session} = useSession()
  const handleLogin = async (e) => {
    e.preventDefault();
    
    const username = e.target.username.value;
    const password = e.target.password.value;

    const result = await signIn('credentials', {
      redirect: false,
      username,
      password,
    });

    if (result?.error) {
      console.log('Invalid username or password');
    } else {
      console.log("login succesfully")
      // Get the session data to check isAdmin
      // const response = await fetch('/api/auth/session');
      // const session = await response.json();

      router.push('/admin')
      // if (session.user.isAdmin) {
      //   router.push('/admin');
      // } else {
      //   router.push('/rgemployee');
      // }
    }
  };

  return (
    <div className="flex bg-gray-500 items-center justify-center min-h-screen w-full -ms-1 -me-1 bg-cover bg-no-repeat login_bg p-0">
      <Card className="md:w-1/3 w-10/12 my-4 border tracking-widest z-10 text-black md:px-16 md:py-10 px-6 py-4">
        <CardHeader>
          <CardTitle className="text-3xl flex font-bold justify-around items-center w-fit m-auto text-center">
            <div className='flex items-center flex-shrink-0'>
              <Image src={'/RG.jpeg'} width={100} height={100} alt="rglogo" className='md:w-14 md:h-14 w-8 h-8' />
              <div className='flex flex-col items-center justify-center'>
                <p><span className='text-rgtheme md:text-xl md:font-bold font-semibold text-base'>Rotten </span><span className='text-rgtheme2 md:text-xl md:font-bold font-semibold text-bas'>Grapes</span></p>
                <p className='text-sm text-gray-500 font-bold relative w-full text-center'><span>Pvt.Ltd</span><span className='w-4/5 absolute border-1 border-gray-500 top-1/2'></span></p>
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            {globalError && <p className="text-red-600 font-bold">{globalError}</p>}
            <div className="mb-6">
              <Label className='mb-2'>Username</Label>
              <Input name="username" autoComplete="off" className='bg-white border-black text-black' placeholder="username" />
            </div>
            <div className="mb-3">
              <Label>Password</Label>
              <Input name="password" autoComplete="off" className='bg-white border-black text-black' placeholder='****' type="password" />
            </div>
            <p className="underline text-sm my-3 cursor-pointer text-white tracking-wider">
              Forget password ?
            </p>
            <Button className='w-full'>
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}