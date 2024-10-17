"use client"

import axios from 'axios'
import { useRouter } from 'next/navigation'
import React from 'react'

function Navbar() {
    const router = useRouter()
    const handlelogout = async () => {
        try {
            const response = await axios.post('/api/logout')
            console.log(response.data)
            router.push('/login')
        } catch (error) {
            console.error('Error logging out:', error)
        }
    }
    return (
        <nav>
            <div className='flex justify-between bg-gray-800 p-4'>
                <div className='flex justify-between items-center '>

                    <div>
                        <button
                            onClick={() => router.push('/dashboard')}
                            className='text-white inline-bock px-6 py-2 duration-200 hover:text-black hover:bg-blue-100 rounded-full'>
                            Dashboard
                        </button>
                    </div>

                    <div>
                        <button
                            onClick={() => router.push('/customer')}
                            className='text-white inline-bock px-6 py-2 duration-200 hover:text-black hover:bg-blue-100 rounded-full'>
                            Customer
                        </button>
                    </div>
                    <div>
                        <button
                            onClick={() => router.push('/party')}
                            className='text-white inline-bock px-6 py-2 duration-200 hover:text-black hover:bg-blue-100 rounded-full'>
                            Party
                        </button>
                    </div>
                </div>
                <div>
                    <button
                        onClick={() => handlelogout()}
                        className='text-white inline-bock px-6 py-2 duration-200 hover:text-black hover:bg-blue-100 rounded-full'>
                        Logout</button>
                </div>

            </div>
        </nav>
    )
}

export default Navbar