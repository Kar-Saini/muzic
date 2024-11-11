import { z } from "zod";
import prisma from "@/app/_utils/utils";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

const userInput = z
  .object({
    username: z.string(),
    email: z.string().email(),
    password: z
      .string()
      .min(6, { message: "Password must be atleast of 6 characters" }),
  })
  .strict();
export async function POST(req: NextRequest) {
  const data = await req.json();
  const parsedData = userInput.safeParse(data);
  if (!parsedData.success) {
    return NextResponse.json({ message: "Invalid inputs" }, { status: 403 });
  }
  try {
    const userExists = await prisma.user.findUnique({
      where: { email: parsedData.data.email },
    });
    if (userExists) {
      return NextResponse.json(
        {
          messsage: "Account with this email already exists",
        },
        { status: 411 }
      );
    }
    const hashedPassword = await bcrypt.hash(parsedData.data.password, 10);
    const user = await prisma.user.create({
      data: {
        email: parsedData.data.email,
        password: hashedPassword,
        username: parsedData.data.username,
        authProvider: "Credentials",
      },
    });
    return NextResponse.json(
      { message: "Account created", name: user.username },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong", error },
      { status: 400 }
    );
  }
}
