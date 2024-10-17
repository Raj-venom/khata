import dbConnect from "@/db/dgConfig";
import PartyModel from "@/models/party.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { userid: string } }) {

    const userid = params.userid;
    await dbConnect()

    try {

        const party = await PartyModel.findById(userid)

        if (!party) {
            return NextResponse.json({ error: "Party not found" }, { status: 404 })
        }


        return NextResponse.json(party, { status: 200 })

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}