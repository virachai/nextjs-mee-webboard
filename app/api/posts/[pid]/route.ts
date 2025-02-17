import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/authOptions";
import { revalidateTag } from "next/cache";

interface PostPayload {
  title: string;
  content: string;
  tags?: string[]; // Optional now as per the previous requirements
  username?: string; // Optional now
}

const baseApiUrl = process.env.NEXT_PUBLIC_BASE_API || "http://localhost:4000";

export async function PUT(
  request: Request,
  { params }: { params: { pid: string } }
) {
  const session = await getServerSession(authOptions);

  // Check if the user is authenticated
  if (!session) {
    return new Response("Unauthorized: No session found", { status: 401 });
  }

  const { pid } = params;
  const { title, content }: PostPayload = await request.json();

  // Validate the required fields
  if (!title || !content) {
    return new Response("Bad Request: Missing required fields", {
      status: 400,
    });
  }

  try {
    const res = await fetch(`${baseApiUrl}/aboard/posts/${pid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      return new Response(
        `Failed to update post: ${errorData.message || "Unknown error"}`,
        { status: res.status }
      );
    }

    const data = await res.json();

    revalidateTag("api-posts");
    revalidateTag("api-user-posts");

    return Response.json({ ...data });
  } catch (error) {
    console.error("Error updating post:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { pid: string } }
) {
  const session = await getServerSession(authOptions);

  // Check if the user is authenticated
  if (!session) {
    return new Response("Unauthorized: No session found", { status: 401 });
  }

  const { pid } = params;

  if (!pid) {
    return new Response("Bad Request: Missing post ID", { status: 400 });
  }

  try {
    const res = await fetch(`${baseApiUrl}/aboard/posts/${pid}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      return new Response(
        `Failed to delete post: ${errorData.message || "Unknown error"}`,
        { status: res.status }
      );
    }

    revalidateTag("api-posts");
    revalidateTag("api-user-posts");
    return new Response("Post deleted successfully", { status: 200 });
  } catch (error) {
    console.error("Error deleting post:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function GET(_: Request, { params }: { params: { pid: string } }) {
  const session = await getServerSession(authOptions);

  // Check if the user is authenticated
  if (!session) {
    return new Response("Unauthorized: No session found", { status: 401 });
  }

  const { pid } = params;

  // Ensure that the pid is provided
  if (!pid) {
    return new Response("Bad Request: Missing post ID", { status: 400 });
  }

  try {
    const res = await fetch(`${baseApiUrl}/aboard/posts/${pid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      return new Response(
        `Failed to fetch post: ${errorData.message || "Unknown error"}`,
        { status: res.status }
      );
    }

    const data = await res.json();

    return Response.json({ ...data });
  } catch (error) {
    console.error("Error fetching post:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
