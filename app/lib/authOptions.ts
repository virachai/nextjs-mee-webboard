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
      async authorize(credentials) {
        try {
          // Call your custom /api/auth/login API route
          const res = await fetch(`https://dummyjson.com/auth/login`, {
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

          // If the login is successful and we have the access token, return the user data
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
            };
          } else {
            // Throw an error if authentication fails
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
      if (account) {
        token.accessToken = account.accessToken;
        token.refreshToken = account.refreshToken;
        token.user = {
          id: account.id,
          username: account.username,
          email: account.email,
          firstName: account.firstName,
          lastName: account.lastName,
          gender: account.gender,
          image: account.image,
        };
      }
      return token;
    },
    async session({ session, token }) {
      // Add the accessToken, refreshToken, and user details to the session object
      const customSession = session as CustomSession;
      customSession.accessToken = token.accessToken as string;
      customSession.refreshToken = token.refreshToken as string;
      customSession.user = token.user as {
        id: number;
        username: string;
        email: string;
        firstName: string;
        lastName: string;
        gender: string;
        image: string;
      };
      return customSession;
    },
  },
  pages: {
    signIn: "/sign-in", // Optional: Define the path to your custom sign-in page
  },
};

export default authOptions;
