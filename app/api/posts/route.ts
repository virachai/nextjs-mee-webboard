// app/api/posts/[pid]/route.ts
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/authOptions";
import { revalidateTag } from "next/cache";
import { CustomSession } from "@/app/lib/authOptions";

interface PostPayload {
  title: string;
  content: string;
  tags: string[];
  username: string;
}

const baseApiUrl = process.env.NEXT_PUBLIC_BASE_API || "http://localhost:4000";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response("Unauthorized: No session found", { status: 401 });
  }

  const customSession = session as CustomSession;
  const { title, content, tags, username }: PostPayload = await request.json();

  if (!title || !content || !tags || !username) {
    return new Response("Bad Request: Missing required fields", {
      status: 400,
    });
  }

  try {
    const res = await fetch(`${baseApiUrl}/aboard/posts/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${customSession}`,
      },
      body: JSON.stringify({ title, content, tags, username }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      return new Response(
        `Failed to create post: ${errorData.message || "Unknown error"}`,
        { status: res.status }
      );
    }

    const data = await res.json();

    revalidateTag("api-posts");
    revalidateTag("api-user-posts");
    return Response.json({ ...data });
  } catch (error) {
    console.error("Error creating post:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function GET() {
  try {
    const res = await fetch(`${baseApiUrl}/aboard/posts/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { tags: ["api-posts"] },
    });

    if (!res.ok) {
      const errorData = await res.json();
      return new Response(
        `Failed to fetch posts: ${errorData.message || "Unknown error"}`,
        { status: res.status }
      );
    }

    // Return the response data
    const data = await res.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
