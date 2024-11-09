import { NextRequest } from "next/server";
import prisma from "@/app/utils/utils";
import { z } from "zod";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
const streamInput = z
  .object({
    url: z.string(),
  })
  .strict();
export async function POST(req: NextRequest) {
  const data = await req.json();
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthenticated" }, { status: 400 });
  }
  const parsedData = streamInput.safeParse(data);
  if (!parsedData.success)
    return NextResponse.json({ message: "Invalid inputs" }, { status: 403 });
  try {
    const streamExists = await prisma.stream.findMany({
      where: { url: parsedData.data.url },
    });
    if (streamExists)
      return NextResponse.json(
        { message: "Stream already exists" },
        { status: 400 }
      );
    const user = await prisma.user.findUnique({
      where: { email: session.user?.email || "" },
    });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 400 });
    }
    const extractedId = parsedData.data.url.split("?v=")[1];
    const stream = await prisma.stream.create({
      data: {
        url: parsedData.data.url,
        userId: user?.id,
        type: "Youtube",
        extractedId,
      },
    });
    return NextResponse.json(
      { message: "Stream added", streamId: stream.id },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong", error },
      { status: 400 }
    );
  }
}

export async function GET(req: NextRequest) {
  const creatorId = req.nextUrl.searchParams.get("creatorId");
  const streams = await prisma.stream.findMany({
    where: { userId: creatorId as string },
  });
  return NextResponse.json({ streams });
}
