import prisma from "@/app/_utils/utils";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { authOptions } from "../../auth/[...nextauth]/route";
const upvoteData = z
  .object({
    streamId: z.string(),
  })
  .strict();
export async function POST(req: NextRequest) {
  const data = await req.json();
  const parsedData = upvoteData.safeParse(data);
  if (!parsedData.success)
    return NextResponse.json({ message: "Invalid stream ID" }, { status: 400 });
  const streamExists = await prisma.stream.findUnique({
    where: { id: parsedData.data.streamId },
  });
  if (!streamExists)
    return NextResponse.json({ message: "Invalid stream ID" }, { status: 400 });
  const session = await getServerSession(authOptions);
  if (!session?.user)
    return NextResponse.json({ message: "Unauthenticated" }, { status: 400 });
  const user = await prisma.user.findUnique({
    where: { email: session?.user?.email || "" },
  });
  await prisma.upvotes.create({
    data: {
      streamId: parsedData.data.streamId,
      userId: user?.id as string,
    },
  });
  return NextResponse.json({ message: "Upvoted" }, { status: 200 });
}
