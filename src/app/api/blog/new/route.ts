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
    const data = await req.json();
    const { title, description, category, imageUrl, content, email } = data;
    if (!title || !description || !category || !imageUrl || !content || !email) {
      return NextResponse.json({
        message: "All fields are required.",
        success: false
      }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email }
    })

    if( !user ) {
      return NextResponse.json({
        message: "User not found.",
        success: false
      }, { status: 404 });
    }

    const newBlog = await prisma.blog.create({
      data: {
        title,
        description,
        category,
        imageURL: imageUrl,
        content,
        authorID: user.id
      }
    });

    if (!newBlog) {
      return NextResponse.json({
        message: "Failed to create blog.",
        success: false
      }, { status: 500 });
    }

    console.log(newBlog.content);

    return NextResponse.json({
      message: "Blog created successfully.",
      success: true,
      data: newBlog
    }, { status: 201 });

  } 
  catch (error) {
    console.error("Error in POST /api/blog/new:", error);
    return NextResponse.json({
      message: "An error occurred while processing your request.",
      success: false
    }, { status: 500 })
  }
}