import prisma from "@/config/db.config";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/option";

export async function POST(req: NextRequest){
  const session = await getServerSession(authOptions);
  if(!session){
    return NextResponse.json({
      success: false,
      message: "You are not authenticated"
    }, { status: 401 });
  }

  try {
    const { category } = await req.json();
    if(!category){
      return NextResponse.json({
        success: false,
        message: "category is required"
      }, { status: 400 });
    }
  
    const blog = await prisma.blog.findMany({
      where: {
        category: category,
      }
    })
  
    if(!blog || blog.length === 0){
      return NextResponse.json({
        success: true,
        message: "No blogs found for this category",
        data: []
      }, { status: 200 });
    }
  
    return NextResponse.json({
      success: true,
      message: "Blogs fetched successfully",
      data: blog
    }, { status: 200 });
  } 
  catch (error) {
    return NextResponse.json({
      success: false,
      message: "Failed to fetch blogs",
    }, { status: 500 });
  }
}