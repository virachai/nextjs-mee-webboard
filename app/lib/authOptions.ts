import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { Session } from "next-auth";
import { DefaultUser } from "next-auth";

export interface ExtendedUser extends DefaultUser {
  username: string;
  accessToken: string;
}

interface CustomSession extends Session {
  accessToken: string;
  refreshToken?: string;
  user: ExtendedUser;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<ExtendedUser> {
        try {
          const baseApiUrl =
            process.env.NEXT_PUBLIC_BASE_API || "http://localhost:4000";
          const res = await fetch(`${baseApiUrl}/aboard/auth`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: credentials?.username,
              password: credentials?.password,
            }),
          });

          const data = await res.json();

          if (res.ok && data?.accessToken) {
            // Return user data with accessToken
            return {
              id: data.id,
              accessToken: data.accessToken,
              username: data.username,
              email: data.email,
              image: data.image,
              name: data.username,
            };
          } else {
            throw new Error("Authentication failed. Please try again.");
          }
        } catch (error) {
          console.error(error);
          throw new Error("An error occurred during authentication.");
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 30,
  },
  callbacks: {
    async jwt({ token, user }) {
      const userData = user as ExtendedUser;
      if (user) {
        token.accessToken = userData.accessToken;
        token.username = userData.username;
      }
      return token;
    },
    async session({ session, token }) {
      const customSession = session as CustomSession;
      customSession.accessToken = token.accessToken as string;
      return customSession;
    },
  },
  pages: {
    signIn: "/sign-in",
  },
};

export default authOptions;
