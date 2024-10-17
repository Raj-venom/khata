import dbConnect from "@/db/dgConfig";
import CustomerModel from "@/models/customer.model";
import { NextResponse } from "next/server";

export async function GET() {
    await dbConnect()
    try {
        const customers = await CustomerModel.find()
        return NextResponse.json(customers, { status: 200 })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}