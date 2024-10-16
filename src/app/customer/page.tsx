"use client"

import { useState, useEffect } from 'react';
import { Customer } from '@/models/customer.model';
import axios from 'axios';

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';


const CustomerPage = () => {
    const router = useRouter()
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await axios.get('/api/customer/all'); 
                const data: Customer[] = response.data;
                setCustomers(data);
            } catch (error) {
                console.error('Error fetching customers:', error);
            }
        };

        fetchCustomers();
    }, []);

    const filteredCustomers = customers.filter(customer =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleRowClick = (id: string) => {
        router.push(`/update-customer/${id}`);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Customer List</h1>
            <div className='flex justify-between'>
                <input
                    type="text"
                    placeholder="Search customers"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="mb-4 p-2 border border-gray-600 rounded"
                />

                <Button
                    onClick={() => router.push('/new-customer')}
                >Add Customer</Button>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Address</TableHead>
                        <TableHead>Total Amount</TableHead>
                        <TableHead>Remaining Amount</TableHead>
                        <TableHead>Remark</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredCustomers.map((customer, i) => (
                        <TableRow key={customer._id + i} onClick={() => handleRowClick(customer._id)} >
                            <TableCell>{customer.id}</TableCell>
                            <TableCell>{customer.name}</TableCell>
                            <TableCell>{customer.phone}</TableCell>
                            <TableCell>{customer.address}</TableCell>
                            <TableCell>{customer.total_amount}</TableCell>
                            <TableCell>{customer.remaining_amount}</TableCell>
                            <TableCell>{customer.remark}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

        </div>
    );
};

export default CustomerPage;
