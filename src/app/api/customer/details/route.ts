import dbConnect from "@/db/dgConfig";
import CustomerModel from "@/models/customer.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    dbConnect()
    try {
        const reqBody = await request.json();
        const { phone } = reqBody;
        if (!phone) {
            return NextResponse.json({ error: "Please provide phone number" }, { status: 400 })
        }

        const customer = await CustomerModel.findOne({ phone })
        if (!customer) {
            return NextResponse.json({ error: "Customer not found" }, { status: 404 })
        }

        return NextResponse.json(customer, { status: 200 })

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}