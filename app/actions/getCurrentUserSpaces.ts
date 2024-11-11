"use server";

import { authOptions } from "../api/auth/[...nextauth]/route";
import prisma from "../_utils/utils";
import { getServerSession } from "next-auth";

export async function getCurrentUserSpaces() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return null;
    }
    const spaces = await prisma.space.findMany({
      where: { creatorId: session.user.id },
      include: {
        creator: { select: { email: true, id: true, username: true } },
      },
      orderBy: { createdAt: "desc" },
    });
    return spaces;
  } catch (error) {
    console.log("Error");
  }
}
