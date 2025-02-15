// app/api/auth/login/route.ts
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { username, password } = req.body;

  // Check if the username and password are provided in the request body
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  try {
    // Make an authentication request to the external API (dummyjson)
    const response = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
        expiresInMins: 30, // optional, defaults to 60
      }),
      credentials: "include", // Include cookies (e.g., accessToken) in the request
    });

    if (!response.ok) {
      // If the response is not ok (non-2xx status), return error
      const errorData = await response.json();
      return res
        .status(response.status)
        .json({ message: errorData.message || "Authentication failed" });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
