import dbConnect from "@/db/dgConfig";
import CustomerModel from "@/models/customer.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, { params }: { params: { userid: string } }) {

    const userid = params.userid;
    await dbConnect()

    try {
        const reqBody = await request.json();

        const { name, phone, address, total_amount, remaining_amount, remark } = reqBody;

        if (!name || !phone || !total_amount) {
            return NextResponse.json({ error: "Please provide all required fields" }, { status: 400 })
        }

        const customer = await CustomerModel.findById(userid)

        if (!customer) {
            return NextResponse.json({ error: "Customer not found" }, { status: 404 })
        }

        customer.name = name || customer.name
        customer.phone = phone || customer.phone
        customer.address = address || customer.address
        customer.total_amount = total_amount || customer.total_amount
        customer.remaining_amount = remaining_amount || 0
        customer.remark = remark || customer.remark


        await customer.save()

        return NextResponse.json({
            message: "Amount Updated Successfully",
            customer,
            success: true
        }, { status: 200 })

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

}