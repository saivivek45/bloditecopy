import prisma from "@/config/db.config";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/option";
import { getServerSession } from "next-auth";

export async function POST(req: NextRequest){
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized", message: "You must be logged in." },
      { status: 401 }
    );
  }

  const { id } = await req.json();
  try {
    if(!id) {
      return NextResponse.json({
        "message": "ID is required",
        "success": false
      }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: {
        id,
      }, 
      select: {
        email: true,
        username: true,
        createdAt: true,
        blogs: {
          select: {
            id: true,
            title: true,
            description: true,
            category: true,
            content: true,
            imageURL: true,
            createdAt: true,
            author: {
              select:{
                username: true,
              }
            }
          }
        }
      }
    })

    if(!user) {
      return NextResponse.json({
        "message": "User not found",
        "success": false
      }, { status: 404 });
    }

    return NextResponse.json({
      "message": "User profile fetched successfully",
      "success": true,
      "data": user
    }, { status: 200 });    
  } 
  catch (error) {
    return NextResponse.json({
      "message": "Internal server error",
      "success": false
    }, { status: 500  });
  }
}