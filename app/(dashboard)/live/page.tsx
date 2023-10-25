'use client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const page = () => {

    const [link, setLink] = useState('')
    const router = useRouter()

    async function fetchLink() {
        const res = await axios.get('/api/getlive')
        console.log(res.data);
        setLink(res.data)
    }

    useEffect(() => {
        fetchLink()
    }, [])

    return (
        <div className="flex bg-white p-8 w-full rounded-[35px] h-full flex-col ">
            <h1 className='font-semibold text-lg' >Live link: </h1>
            {link}
        </div>
    )
}

export default page