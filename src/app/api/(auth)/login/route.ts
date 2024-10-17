import dbConnect from "@/db/dgConfig";
import UserModel from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"


export async function POST(request: NextRequest) {
    dbConnect()

    try {
        const reqBody = await request.json();

        const { username, password } = reqBody;

        if (!username || !password) {
            return NextResponse.json({ error: "Please provide username and password" }, { status: 400 })
        }
        console.log(username, password);

        const user = await UserModel.findOne({ username });
        console.log(user);

        if (!user) {
            return NextResponse.json({ error: "Invalid Username" }, { status: 401 })
        }

        const validateUser = user.password === password;

        if (!validateUser) {
            return NextResponse.json({ error: "Invalid Password" }, { status: 401 })
        }

        const token = jwt.sign({ id: user._id }, process.env.SECRETE_KEY!, {
            expiresIn: "10d"
        });

        user.password = "";

        const response = NextResponse.json({
            message: "Login Successful",
            user,
            token,
            success: true
        }, { status: 200 })

        response.cookies.set("token", token, {
            httpOnly: true,
            expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000) 
        })

        return response

    } catch (error: any) {
        // console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}