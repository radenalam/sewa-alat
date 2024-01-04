import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/prisma/client";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Username",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "masukan username",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "masukan password",
        },
      },
      async authorize(credentials) {
        try {
          // Check if credentials and its properties are not undefined
          if (!credentials || !credentials.username || !credentials.password) {
            return null; // Return null if credentials are not properly provided
          }

          const user: any = await prisma.user.findUnique({
            where: {
              username: credentials.username,
            },
          });

          // if (user && bcrypt.compareSync(credentials.password, user.password)) { // password hashed
          if (user && credentials.password === user.password) {
            // Return user data if valid
            return {
              id: user.id,
              name: user.name,
              email: user.username,
              isAdmin: user.isAdmin,
            };
          } else {
            // Return null if user is not found or password is incorrect
            return null;
          }
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
