// app/api/auth/[...nextauth].ts
import NextAuth from "next-auth";
import { authOptions } from "@/app/lib/authOptions"; // Import your authOptions configuration

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
