import prisma from "@/config/db.config";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/option";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized", message: "You must be logged in." },
      { status: 401 }
    );
  }

  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({
        message: "Blog ID is required",
        success: false,
      }, { status: 400 });
    }

    const blog = await prisma.blog.findUnique({
      where: { id },
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
      }
    });

    if (!blog) {
      return NextResponse.json({
        message: "Blog not found",
        success: false,
      }, { status: 404 });
    }

    return NextResponse.json({
      message: "Blog fetched successfully",
      success: true,
      data: blog,
    }, { status: 200 });

  } 
  catch (error) {
    console.error("Error:", error);
    return NextResponse.json({
      message: "API request failed",
      success: false,
    }, { status: 500 });
  }
}
