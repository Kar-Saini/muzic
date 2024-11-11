"use server";

import { getSession } from "next-auth/react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import prisma from "../_utils/utils";

export async function getAllSpaces() {
  try {
    const session = await getSession(authOptions);
    if (!session?.user) {
      return null;
    }
    const spaces = await prisma.space.findMany();
    return spaces;
  } catch (error) {
    console.log("Error");
  }
}
