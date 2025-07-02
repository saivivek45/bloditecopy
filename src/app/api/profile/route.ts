import prisma from "@/config/db.config";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
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