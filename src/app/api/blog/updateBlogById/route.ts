import prisma from "@/config/db.config";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest){
  try {
    const data = await req.json();
    const { title, description, category, imageUrl, content, id } = data;
    if (!title || !description || !category || !imageUrl || !content || !id) {
      return NextResponse.json({
        message: "All fields are required.",
        success: false
      }, { status: 400 });
    }

    const blog = await prisma.blog.findUnique({
      where: { id }
    });

    if (!blog) {
      return NextResponse.json({
        message: "Blog not found.",
        success: false
      }, { status: 404 });
    }

    const updatedBlog = await prisma.blog.update({
      where: { id },
      data: {
        title,
        description,
        category,
        imageURL: imageUrl,
        content
      }
    });

    if (!updatedBlog) {
      return NextResponse.json({
        message: "Failed to update blog.",
        success: false
      }, { status: 500 });
    }

    return NextResponse.json({
      message: "Blog updated successfully.",
      success: true,
      data: updatedBlog
    }, { status: 200 });
  } 
  catch (error) {
    
  }
}