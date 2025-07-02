import prisma from "@/config/db.config";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){
  const searchParameter = req.nextUrl.searchParams.get('id');

  console.log("Search Parameter:", searchParameter);
  
  if (!searchParameter) {
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
    return NextResponse.json({
      "message": "All blogs fetched successfully",
      "success": true,
      "data": data
    }, { status: 200 });
  }

  try {
    const data = await prisma.blog.findMany({
      where: {
        OR: [
          { title: { contains: searchParameter} },
          { category: { contains: searchParameter} }
        ]
      }, 
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
  
    if(data.length !== 0){
      return NextResponse.json({
        "message": "Blogs fetched successfully",
        "success": true,
        "data": data
      }, { status: 200 });
    }
  
    const data1 = await prisma.blog.findMany({
      where: {
        author: {
          username: {
            contains: searchParameter
          }
        }
      },
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
    })
  
    if(data1.length !== 0){
      return NextResponse.json({
        "message": "Blogs fetched successfully",
        "success": true,
        "data": data1
      }, { status: 200 });
    }
  
    return NextResponse.json({
      "message": "No blogs found",
      "success": true,
      "data": []
    }, { status: 200 });
  } 
  catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json({
      "message": "An error occurred while fetching blogs",
      "success": false,
      "data": []
    }, { status: 500})
  }
}