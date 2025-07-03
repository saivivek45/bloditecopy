import { authOptions } from "@/app/api/auth/[...nextauth]/option";
import prisma from "@/config/db.config";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {

  const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized", message: "You must be logged in." },
        { status: 401 }
      );
    }

  const { id } = await context.params; 

  try {
    if (!id) {
      return NextResponse.json({
        message: "Blog ID is required",
        success: false,
      }, { status: 400 });
    }
    
    const existingBlog = await prisma.blog.findUnique({
      where: { id },
    });

    if (!existingBlog) {
      return NextResponse.json({
        message: "Blog not found",
        success: false,
      }, { status: 404 });
    }

    await prisma.blog.delete({
      where: { id },
    });

    return NextResponse.json({
      message: "Blog deleted successfully",
      success: true,
    }, { status: 200 });
  }
  catch (error) {
    console.error("Error during deletion:", error);
    return NextResponse.json({
      message: "Failed to delete blog",
      success: false,
    }, { status: 500 });
  }
}
