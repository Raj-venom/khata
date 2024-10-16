"use client"

import { useRouter } from 'next/navigation'
import React from 'react'

function Dashboard() {
    const router = useRouter()
    return (
        <>
            <nav>
                <div className='flex justify-between bg-gray-800 p-4'>
                    <div className='flex justify-between items-center '>
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
                        <button className='text-white inline-bock px-6 py-2 duration-200 hover:text-black hover:bg-blue-100 rounded-full'>Logout</button>
                    </div>

                </div>
            </nav>

            <div className='flex mt-6 text-3xl justify-center'>
                <h2 className='' >Welcome to the dashboard</h2>
            </div>

            <div>
                <div className='flex justify-center mt-6'>

                </div>
            </div>
        </>
    )
}

export default Dashboard