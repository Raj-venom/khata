import dbConnect from "@/db/dgConfig";
import CustomerModel from "@/models/customer.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { userid: string } }) {

    const userid = params.userid;
    await dbConnect()

    try {

        const customer = await CustomerModel.findById(userid)

        if (!customer) {
            return NextResponse.json({ error: "Customer not found" }, { status: 404 })
        }


        return NextResponse.json(customer, { status: 200 })

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}