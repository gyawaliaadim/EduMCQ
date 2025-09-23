"use client"

import { useSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import React, { useEffect } from "react";
import Image from "next/image";
import Link from 'next/link';

const TeacherSignIn = () => {
  const { data: session, status } = useSession()
  const router = useRouter();
  useEffect(() => {
    if (status == "authenticated" && session) {
      router.push("/teacher/profile")
    }
  }, [status, router])


  return (
    <>
      <div className=" bg-[url('/assets/background.svg')] bg-repeat bg-contain flex flex-col items-center justify-center min-h-screen p-4 bg-white dark:bg-black text-gray-800 dark:text-gray-200">
        <section className="flex-col justify-center items-center xs:justify-around xs:flex-row  flex max-w-3xl w-full p-8 space-y-8 text-center bg-gray-400 dark:bg-gray-800 rounded-2xl shadow-xl 
        ">
          <div className='flex flex-col'>

            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-black  dark:text-white">
              Welcome!
            </h1>

            <p className="text-lg sm:text-xl font-medium text-gray-900 dark:text-gray-400">
              Sign in to continue
            </p>

          </div>

          <div >
            <div className="relative w-[300px] h-[100px] flex justify-center items-center transition-transform duration-300 transform hover:scale-105">
              <Image
                className="drop-shadow-2xl
              cursor-pointer"
                alt="GitHub SignIn Button"
                src={`/assets/signIn_dark.png`}
                fill
                objectFit="contain" // preserve aspect ratio, no distortion
                sizes="100%"  // optional, helps optimize srcset
                onClick={() => signIn()}
              />
            </div>
            <Link href={'/signin'}
              className='text-blue-400 underline'>I'm Student</Link>

            {/* Social Links */}
          </div>
        </section>
      </div>
    </>
  );
};

export default TeacherSignIn;
