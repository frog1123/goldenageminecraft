import { db } from "@/lib/db";
import { compare } from "bcrypt";
import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt"
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "hello@example.com"
        },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;

        const user = await db.user.findUnique({
          where: {
            email: credentials.email
          }
        });
        if (!user) return null;
        if (!user.active) throw new Error("User os not active");

        const isPasswordValid = await compare(credentials.password, user.password);
        if (!isPasswordValid) return null;

        return {
          id: user.id + "",
          email: user.email,
          name: user.name
        };
      }
    })
  ],
  callbacks: {
    session: ({ session, token }) => {
      // console.log("session callback", { session, token });
      return session;
    },
    jwt: ({ token, user }) => {
      // console.log("jwt callback", { token, user });
      return token;
    }
  },
  pages: {
    signIn: "/sign-in"
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
