import prisma from "@/config/db.config";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/option";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized", message: "You must be logged in." },
        { status: 401 }
      );
    }

  try {
    const data = await prisma.blog.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        category: true,
        content: true,
        imageURL: true,
        createdAt: true, 
        author: {
          select: {
            username: true,
            id: true,
          }
        }
      }, 
      orderBy: {
        createdAt: 'desc'
      }
    });

    if(data.length === 0) {
      return NextResponse.json({
        "message": "No blogs found",
        "success": true,
        "data": []
      }, { status: 202 });
    }

    return NextResponse.json({
      "message": "All blogs fetched successfully",
      "success": true,
      "data": data
    }, { status: 200 });
  } 
  catch (error) {
    return NextResponse.json({
      "message": "An error occurred while fetching blogs",
      "success": false
    }, { status: 500 });
  }
}