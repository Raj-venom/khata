import dbConnect from "@/db/dgConfig";
import CustomerModel from "@/models/customer.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    dbConnect()
    try {
        const customers = await CustomerModel.find()
        return NextResponse.json(customers, { status: 200 })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}