"use client"

import PaymentChart from '@/components/BarChart'
import Navbar from '@/components/Navbar'
import { useRouter } from 'next/navigation'
import React, {  useEffect, useState } from 'react'
import axios from 'axios';


function Dashboard() {
    const router = useRouter()
    const [chartData, setChartData] = useState({ totalPartyAmount: 0, totalCustomerAmount: 0 });

    useEffect(() => {
        const fetchChartData = async () => {
            try {
                const response = await axios.get('/api/bar-chart');
                setChartData({
                    totalPartyAmount: response.data.totalPartyAmount,
                    totalCustomerAmount: response.data.totalCustomerAmount
                });
            } catch (error) {
                console.error('Error fetching chart data:', error);
            }
        };

        fetchChartData();
    }, []);

    return (
        <>
            <Navbar />

            <div className='flex mt-6 text-3xl justify-center'>
                <h2 className='' >Welcome to the dashboard</h2>
            </div>

            <div>
                <div className='flex w-1/2 h-1/2 ml-96  justify-center mt-24'>
            
                <PaymentChart customerTotal={chartData.totalCustomerAmount} wholesalerTotal={chartData.totalPartyAmount}/>

                </div>
            </div>
        </>
    )
}

export default Dashboard