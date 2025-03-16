import jwt, { JwtPayload } from "jsonwebtoken";
import { headers } from "next/headers";

export async function isAuthenticated() {
  const authorization = (await headers()).get("authorization");

  if (!authorization?.startsWith("Bearer ")) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  const token = authorization.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET ?? "your_default_secret"
    ) as JwtPayload;

    // You can now access decoded.userId, decoded.username, etc.

    return !!decoded.userId;
  } catch {
    return false;
  }
}
