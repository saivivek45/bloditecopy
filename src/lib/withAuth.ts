// lib/withAuth.ts
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/option";
import { NextResponse } from "next/server";

export function withAuth(handler: (req: Request, session: any) => Promise<Response>) {
  return async function (req: Request) {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        {
          error: "Unauthorized",
          message: "You must be logged in to access this resource.",
        },
        { status: 401 }
      );
    }

    return handler(req, session);
  };
}
