"use client"
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation';
const API = () => {
    const router = useRouter();
    useEffect(() => {
        alert("This route isn't meant for accessing with GET.")
        router.push('/')
    }, [router])

    return (
        <div></div>
    )
}

export default API