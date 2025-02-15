import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { Session } from "next-auth";

// Extend the Session type to include accessToken and refreshToken
interface CustomSession extends Session {
  accessToken: string;
  refreshToken: string;
  user: {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    image: string;
    name: string;
  };
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
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
          if (1) console.log("dummyjson", data, req);
          if (res.ok && data?.accessToken) {
            return {
              id: data.id,
              accessToken: data.accessToken,
              refreshToken: data.refreshToken,
              username: data.username,
              email: data.email,
              firstName: data.firstName,
              lastName: data.lastName,
              gender: data.gender,
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
    async jwt({ token, account }) {
      if (0) {
        console.log("jwt account: ", account);
      }
      return token;
    },
    async session({ session, token }) {
      const customSession = session as CustomSession;
      customSession.accessToken = token.accessToken as string;
      customSession.refreshToken = token.refreshToken as string;

      return customSession;
    },
  },
  pages: {
    signIn: "/sign-in", // Optional: Define the path to your custom sign-in page
  },
};

export default authOptions;
