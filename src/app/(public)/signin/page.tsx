"use client"

import React from "react";
import { TextInput } from '@mantine/core';
import { useState } from 'react';
import { Button } from '@mantine/core';
import Link from 'next/link';
import { useMCQ } from '@/store/MCQProvider';

const About = () => {
  const [err, setErr] = useState<string>('')
  const [value, setValue] = useState<string>('')
  const { loading, fetchStudentData } = useMCQ()


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const text = value?.trim();
    if (text?.length != 6) {
      setErr("The code must be 6 characters long.");
      return;
    }
    if (/\s/.test(text)) {
      setErr("Value must not contain spaces.");
      return;
    }
    setErr("");
    console.log(text)
    await fetchStudentData(text, true)



  };
  if (loading) return <div>Loading</div>
  return (
    <>
      <div className=" bg-[url('/assets/background.svg')] bg-repeat bg-contain flex flex-col items-center justify-center min-h-screen p-4 bg-white dark:bg-black text-gray-800 dark:text-gray-200">
        <section className="flex flex-wrap justify-center items-center
          
          max-w-3xl w-full p-8 space-y-8 text-center bg-gray-200 dark:bg-gray-800 rounded-2xl shadow-xl 
        ">
          <div className='m-5 flex flex-col justify-center items-center'>

            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-black  dark:text-white text-center">
              Welcome!
            </h1>

            <p className="text-lg sm:text-xl font-medium text-gray-900 dark:text-gray-400 text-center">
              Sign in to continue
            </p>

          </div>
          <div className='m-5 flex flex-col justify-center items-center gap-5'>

            <TextInput
              variant="filled"
              size="xl"
              radius="xl"
              label="Enter your Class Code"
              withAsterisk
              description="(Provided by your teacher)"
              value={value}
              onChange={(event) => setValue(event.currentTarget.value)}
              error={err}
              placeholder="abcd"
            />
            <Button variant="filled" color="indigo" radius="xl"
              onClick={handleSubmit}

            >Button</Button>
            {/* Social Links */}
            <Link href={'/teacherSignin'}
              className='text-blue-400 underline'>I'm Teacher</Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;
