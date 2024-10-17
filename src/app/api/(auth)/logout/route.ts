import dbConnect from "@/db/dgConfig";
import { NextResponse } from "next/server";


export async function POST() {
    dbConnect()
    try {

        const response = NextResponse.json({
            message: "Logout Successful",
            success: true
        }, { status: 200 })
        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)
        })
        return response

    } catch (error: any) {
        // console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 })

    }
}