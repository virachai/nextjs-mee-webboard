// app/api/posts/[pid]/comments/route.ts
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/authOptions";
import { CustomSession } from "@/app/lib/authOptions";

interface Comment {
  id: string;
  title?: string;
  username: string;
  content: string;
  createdAt: string;
}

const baseApiUrl = process.env.NEXT_PUBLIC_BASE_API || "http://localhost:4000";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response("Unauthorized: No session found", { status: 401 });
  }

  const customSession = session as CustomSession;

  const slug = (await params).slug;

  if (!slug) {
    return new Response("Bad Request: Missing post ID", { status: 400 });
  }

  try {
    const { username, content } = await request.json();

    if (!username || !content) {
      return new Response("Bad Request: Missing username or content", {
        status: 400,
      });
    }

    const res = await fetch(`${baseApiUrl}/aboard/posts/${slug}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${customSession.accessToken}`,
      },
      body: JSON.stringify({
        username,
        content,
        title: session?.user?.image || slug,
      }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      return new Response(
        `Failed to create comment: ${errorData.message || "Unknown error"}`,
        { status: res.status }
      );
    }

    const comment: Comment = await res.json();
    return Response.json({ comment });
  } catch (error) {
    console.error("Error creating comment:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const slug = (await params).slug;
  if (!slug) {
    return new Response("Bad Request: Missing post ID", { status: 400 });
  }
  try {
    const res = await fetch(`${baseApiUrl}/aboard/posts/${slug}/comments`);

    if (!res.ok) {
      const errorData = await res.json();
      return new Response(
        `Failed to fetch comments: ${errorData.message || "Unknown error"}`,
        { status: res.status }
      );
    }

    // Parse and return the comments
    const comments: Comment[] = await res.json();
    return Response.json({ comments });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
