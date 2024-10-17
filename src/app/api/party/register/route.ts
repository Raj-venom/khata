import dbConnect from "@/db/dgConfig";
import PartyModel from "@/models/party.model";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    await dbConnect()
    try {

        const reqBody = await request.json();

        const { name, phone, address, total_amount, remaining_amount, remark, alternate_phone } = reqBody;

        if (!name || !phone || !total_amount || !remaining_amount) {
            return NextResponse.json({ error: "Please provide all the fields" }, { status: 400 })
        }

        if (remaining_amount > total_amount) {
            return NextResponse.json({ error: "Remaining amount can't be greater than total amount" }, { status: 400 })
        }

        const existingParty = await PartyModel.findOne({ phone: phone.trim() })

        if (existingParty) {
            return NextResponse.json({ error: "Party with this phone number already exists" }, { status: 400 })
        }

        const newParty = await PartyModel.create({
            name: name.trim(),
            phone: phone.trim(),
            alternate_phone: alternate_phone.trim(),
            address: address.trim(),
            total_amount,
            remaining_amount,
            remark: remark.trim()
        })

        if (!newParty) {
            return NextResponse.json({ error: "Party Registration Failed" }, { status: 500 })
        }

        return NextResponse.json({
            message: "Party Registered Successfully",
            newParty,
            success: true
        }, { status: 201 })



    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

}