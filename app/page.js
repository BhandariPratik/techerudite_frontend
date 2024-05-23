'use client'
import React from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleUser =()=>{
    router.push('/user_registration')
  }

  const handleAdmin =()=>{
    router.push('/admin_registration')
  }

  const handleAdminLogin =()=>{
    router.push('/admin_login')
  }
  return (
    <>
      <div className="Main">
        <div className="flex justify-center px-5">
          <p className="text-center text-6xl text-gray-700 font-extrabold px-5 ">Main Screen</p>
        </div>
      
        <div className="registration flex justify-center items-center space-x-4 mt-5 ">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
          onClick={()=> handleUser()}>
            User Registration
          </button>
         
          <button onClick={()=> handleAdmin()} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Admin Registration
          </button>

          <button onClick={()=> handleAdminLogin()} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
            Admin Login
          </button>
        </div>
       
      </div>
    </>
  );
}
