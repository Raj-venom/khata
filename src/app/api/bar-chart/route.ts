import dbConnect from "@/db/dgConfig";
import PartyModel from "@/models/party.model";
import CustomerModel from "@/models/customer.model";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {
    await dbConnect()

    try {
        // const parties = await PartyModel.find();
        // const customers = await CustomerModel.find();
        const totalPartyAmount = await PartyModel.aggregate([
            { $group: { _id: null, total: { $sum: "$remaining_amount" } } }
        ]);

        const totalCustomerAmount = await CustomerModel.aggregate([
            { $group: { _id: null, total: { $sum: "$remaining_amount" } } }
        ]);

        return NextResponse.json({
            // parties,
            // customers,
            totalPartyAmount: totalPartyAmount[0]?.total || 0,
            totalCustomerAmount: totalCustomerAmount[0]?.total || 0
        }, { status: 200 })

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}