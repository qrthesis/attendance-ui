'use client'
import React, { useEffect } from "react";
import { useRouter } from 'next/navigation'

const LogoutPage: React.FC = () => {
    const router = useRouter();

    useEffect(() => { 
        router.replace('/login')
    }, [])
    return <></>
}

export default LogoutPage