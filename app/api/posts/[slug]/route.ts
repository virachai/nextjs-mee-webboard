import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/authOptions";
import { revalidateTag } from "next/cache";
import { CustomSession } from "@/app/lib/authOptions";

interface PostPayload {
  title: string;
  content: string;
  tags?: string[]; // Optional now as per the previous requirements
  username?: string; // Optional now
}

const baseApiUrl = process.env.NEXT_PUBLIC_BASE_API || "http://localhost:4000";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const session = await getServerSession(authOptions);

  // Check if the user is authenticated
  if (!session) {
    return new Response("Unauthorized: No session found", { status: 401 });
  }

  const customSession = session as CustomSession;
  const slug = (await params).slug;
  const { title, content, tags }: PostPayload = await request.json();

  if (!title || !content || !tags) {
    return new Response("Bad Request: Missing required fields", {
      status: 400,
    });
  }

  try {
    const res = await fetch(`${baseApiUrl}/aboard/posts/${slug}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${customSession?.accessToken}`,
      },
      body: JSON.stringify({ title, content, tags }),
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
  _: Request,
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
    const res = await fetch(`${baseApiUrl}/aboard/posts/${slug}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${customSession?.accessToken}`,
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

export async function GET(
  _: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const session = await getServerSession(authOptions);

  // Check if the user is authenticated
  if (!session) {
    return new Response("Unauthorized: No session found", { status: 401 });
  }

  const slug = (await params).slug;

  // Ensure that the slug is provided
  if (!slug) {
    return new Response("Bad Request: Missing post ID", { status: 400 });
  }

  try {
    const res = await fetch(`${baseApiUrl}/aboard/posts/${slug}`, {
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
