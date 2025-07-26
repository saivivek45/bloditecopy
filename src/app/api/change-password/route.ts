import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/option"
import { updatePasswordSchema } from "@/schema/updatePasswordSchema"
import prisma from "@/config/db.config"
import bcrypt from "bcryptjs"

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await request.json()
    const validatedData = updatePasswordSchema.parse(body)

    // Check if new password and confirm password match
    if (validatedData.newPassword !== validatedData.confirmPassword) {
      return NextResponse.json(
        { message: "New password and confirm password do not match" },
        { status: 400 }
      )
    }

    // Get current user with password
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { password: true }
    })

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      )
    }

    // Verify current password
    const isCurrentPasswordValid = await bcrypt.compare(
      validatedData.currentPassword,
      user.password
    )

    if (!isCurrentPasswordValid) {
      return NextResponse.json(
        { message: "Current password is incorrect" },
        { status: 400 }
      )
    }

    // Hash new password
    const hashedNewPassword = await bcrypt.hash(validatedData.newPassword, 12)

    // Update password
    await prisma.user.update({
      where: { id: session.user.id },
      data: { password: hashedNewPassword }
    })

    return NextResponse.json(
      { message: "Password changed successfully" },
      { status: 200 }
    )

  } catch (error: any) {
    if (error.name === "ZodError") {
      return NextResponse.json(
        { message: "Validation error", errors: error.errors },
        { status: 400 }
      )
    }

    console.error("Change password error:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}