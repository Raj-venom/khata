import dbConnect from "@/db/dgConfig";
import CustomerModel from "@/models/customer.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {

    dbConnect()

    try {
        const reqBody = await request.json();

        const { phone, total_amount, remaining_amount, remark } = reqBody;

        if (!phone || !total_amount || !remaining_amount) {
            return NextResponse.json({ error: "Please provide all the fields" }, { status: 400 })
        }

        const customer = await CustomerModel.findOne({ phone })

        if (!customer) {
            return NextResponse.json({ error: "Customer not found" }, { status: 404 })
        }

        customer.total_amount = total_amount
        customer.remaining_amount = remaining_amount
        customer.remark = remark || ""

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