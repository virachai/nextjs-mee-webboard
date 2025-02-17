import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/authOptions";

const baseApiUrl = process.env.NEXT_PUBLIC_BASE_API || "http://localhost:4000";

export async function GET() {
  const session = await getServerSession(authOptions);

  // Check if the user is authenticated
  if (!session) {
    return new Response("Unauthorized: No session found", { status: 401 });
  }

  const username = session?.user?.name as string;
  console.log("User ", username);
  try {
    const res = await fetch(`${baseApiUrl}/aboard/user/${username}/posts/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { tags: ["api-user-posts"] },
    });

    if (!res.ok) {
      const errorData = await res.json();
      return new Response(
        `Failed to fetch posts: ${errorData.message || "Unknown error"}`,
        { status: res.status }
      );
    }

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
