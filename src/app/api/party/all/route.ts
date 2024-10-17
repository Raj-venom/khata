import dbConnect from "@/db/dgConfig";
import PartyModel from "@/models/party.model";
import { NextResponse } from "next/server";

export async function GET() {
    dbConnect()
    try {
        const party = await PartyModel.find()
        return NextResponse.json(party, { status: 200 })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}