import dbConnect from "@/db/dgConfig";
import CustomerModel from "@/models/customer.model";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    dbConnect()
    try {

        const reqBody = await request.json();

        const { name, phone, address, total_amount, remaining_amount, remark } = reqBody;

        if (!name || !phone || !total_amount || !remaining_amount) {
            return NextResponse.json({ error: "Please provide all the fields" }, { status: 400 })
        }

        if (remaining_amount > total_amount) {
            return NextResponse.json({ error: "Remaining amount can't be greater than total amount" }, { status: 400 })
        }

        const existingCustomer = await CustomerModel.findOne({ phone: phone.trim() })

        if (existingCustomer) {
            return NextResponse.json({ error: "Customer with this phone number already exists" }, { status: 400 })
        }

        const newCustomer = await CustomerModel.create({
            name: name.trim(),
            phone: phone.trim(),
            address: address.trim(),
            total_amount,
            remaining_amount,
            remark: remark.trim()
        })

        if (!newCustomer) {
            return NextResponse.json({ error: "Customer Registration Failed" }, { status: 500 })
        }

        return NextResponse.json({
            message: "Customer Registered Successfully",
            newCustomer,
            success: true
        }, { status: 201 })



    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

}