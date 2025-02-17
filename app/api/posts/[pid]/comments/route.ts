// app/api/posts/[pid]/comments/route.ts
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/authOptions";
import { NextResponse } from "next/server";

interface Comment {
  id: string;
  username: string;
  content: string;
  createdAt: string;
}

interface Params {
  pid: string;
}

const baseApiUrl = process.env.NEXT_PUBLIC_BASE_API || "http://localhost:4000";

// POST method
export async function POST(request: Request, { params }: { params: Params }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response("Unauthorized: No session found", { status: 401 });
  }

  const { pid } = params;

  if (!pid) {
    return new Response("Bad Request: Missing post ID", { status: 400 });
  }

  try {
    const { username, content } = await request.json();

    if (!username || !content) {
      return new Response("Bad Request: Missing username or content", {
        status: 400,
      });
    }

    const res = await fetch(`${baseApiUrl}/aboard/posts/${pid}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        content,
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
    return NextResponse.json({ comment });
  } catch (error) {
    console.error("Error creating comment:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

// GET method to retrieve comments
export async function GET(_: Request, { params }: { params: Params }) {
  const { pid } = params;

  if (!pid) {
    return new Response("Bad Request: Missing post ID", { status: 400 });
  }
  try {
    // Fetch comments for the post
    const res = await fetch(`${baseApiUrl}/aboard/posts/${pid}/comments`);

    if (!res.ok) {
      const errorData = await res.json();
      return new Response(
        `Failed to fetch comments: ${errorData.message || "Unknown error"}`,
        { status: res.status }
      );
    }

    // Parse and return the comments
    const comments: Comment[] = await res.json();
    return NextResponse.json({ comments });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
