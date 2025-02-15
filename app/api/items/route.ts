// app/api/items/route.ts
export const dynamic = "force-static";

interface PostPayload {
  title: string;
  content: string;
  tags: string[];
  username: string;
}

export async function POST(request: Request) {
  const { title, content, tags, username }: PostPayload = await request.json();

  // Assuming you have some API endpoint to handle creating posts
  const res = await fetch(
    "https://nestjs-movie-api-tmdb.vercel.app/aboard/posts",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content, tags, username }),
    }
  );

  if (!res.ok) {
    return new Response("Failed to create post", { status: 500 });
  }

  const data = await res.json();
  return Response.json({ data });
}
