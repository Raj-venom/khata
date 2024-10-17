import dbConnect from "@/db/dgConfig";
import PartyModel from "@/models/party.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, { params }: { params: { userid: string } }) {

    const userid = params.userid;
    await dbConnect()

    try {
        const reqBody = await request.json();

        const { name, phone, address, total_amount, remaining_amount, remark, alternate_phone } = reqBody;

        if(!name || !phone || !total_amount){
            return NextResponse.json({ error: "Please provide all required fields" }, { status: 400 })
        }

        const party = await PartyModel.findById(userid)

        if (!party) {
            return NextResponse.json({ error: "Party not found" }, { status: 404 })
        }

        party.name = name || party.name
        party.phone = phone || party.phone
        party.address = address || party.address
        party.total_amount = total_amount || party.total_amount
        party.remaining_amount = remaining_amount || 0
        party.remark = remark || party.remark
        party.alternate_phone = alternate_phone || party.alternate_phone



        await party.save()

        return NextResponse.json({
            message: "Amount Updated Successfully",
            party,
            success: true
        }, { status: 200 })

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

}