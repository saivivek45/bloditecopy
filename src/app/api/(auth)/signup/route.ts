import prisma from "@/config/db.config";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
  try {
    const {username, email, password} = await req.json();

    if(!username || !email || !password){
      return NextResponse.json({
        message: "All fields are required",
        success: false
      }, {status: 400})
    }

    const user = await prisma.user.findUnique({
      where:{
        email
      }
    })

    if(user){
      return NextResponse.json({
        message: "User already exists",
        success: false
      }, {status: 400})
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    if(!hashedPassword){
      return NextResponse.json({
        message: "Error while hashing password",
        success: false
      }, {status: 500})
    }

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword
      }
    })

    if(!newUser){
      return NextResponse.json({
        message: "Error while creating user",
        success: false
      }, {status: 500})
    }

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      data: newUser
    }, {status: 201})
  } 
  catch (error) {
    console.error(error);
    return NextResponse.json({
      message: "Error while signing up",
      success: false
    }, {status: 500})
  }
}