import { getSession } from "next-auth/react";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import prisma from "@/app/_utils/utils";
import { getServerSession } from "next-auth";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { spaceName, active }: { spaceName: string; active: boolean } =
      await req.json();
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ message: "Unauthenticated" }, { status: 411 });
    }
    const space = await prisma.space.create({
      data: { spaceName, creatorId: session.user.id, active },
    });
    return NextResponse.json({ message: "Space created", spaceId: space.id });
  } catch (e) {
    console.log(e);
  }
}
