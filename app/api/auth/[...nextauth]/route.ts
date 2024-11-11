import CredentialsProvider from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import prisma from "@/app/_utils/utils";
import brcypt from "bcrypt";
import NextAuth, { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { type: "text", label: "Email" },
        password: { type: "password", label: "Password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;
        try {
          const userExists = await prisma.user.findUnique({
            where: { email: credentials.email },
          });
          if (!userExists) return null;
          if (
            userExists.authProvider === "Credentials" &&
            userExists.password
          ) {
            const isPasswordValid = await brcypt.compare(
              credentials.password,
              userExists.password
            );
            if (!isPasswordValid) return null;
            return {
              email: userExists.email,
              username: userExists.username,
              id: userExists.id,
            };
          }
        } catch (error) {
          console.error(error);
        }
      },
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_SECRET_ID || "",
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  session: { strategy: "jwt" },
  secret: process.env.JWT_SECRET || "secret",
  callbacks: {
    async jwt({ user, token }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string;
      }

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
