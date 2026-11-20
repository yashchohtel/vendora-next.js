import connectDb from "@/app/lib/connectDB";
import User from "@/app/models/user.model";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

// POST request handler for user registration - http://localhost:3000/api/auth/register
export async function POST(req: NextRequest) {

    try {

        // connect to the database
        await connectDb() 

        // parse the request body to get user details
        const { name, email, password } = await req.json()

        // check if the user already exists in the database
        const existUser = await User.findOne({ email })

        // if the user already exists, return a 400 response with an error message
        if (existUser) {
            return NextResponse.json(
                { message: "User already exist" },
                { status: 400 }
            )
        }

        // check if the password length is less than 6 characters
        if (password.length < 6) {
            return NextResponse.json(
                { message: "Password must be atleast six characters" },
                { status: 400 }
            )
        }

        // hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10)

        // create a new user in the database with the provided details and hashed password
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        })

        // return a 200 response with the newly created user details
        return NextResponse.json(
            { user },
            { status: 200 }
        )

    } catch (error) {

        // return error response
        return NextResponse.json(
            { message: `register error ${error}` },
            { status: 500 }
        )

    }

}