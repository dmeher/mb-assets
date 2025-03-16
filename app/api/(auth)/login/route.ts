import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { client, connect } from "@/app/database/db";

interface User {
  user_id: number;
  username: string;
  password_hash: string;
  // ... other user properties
}

interface LoginPayload {
  username: string;
  password: string;
}

export async function POST(req: Request) {
  if (req.method === "POST") {
    const body = await req.json();
    const { username, password } = body as LoginPayload;
    try {
      await connect();
      const result = await client.query<User>(
        "SELECT * FROM users WHERE username = $1",
        [username]
      );

      if (result.rows.length === 0) {
        return new Response(JSON.stringify({ error: "Invalid credentials" }), {
          status: 401,
        });
      }

      const user = result.rows[0];

      const passwordMatch = await bcrypt.compare(password, user.password_hash);

      if (!passwordMatch) {
        return new Response(JSON.stringify({ error: "Invalid credentials" }), {
          status: 401,
        });
      }

      const token = jwt.sign(
        { userId: user.user_id, username: user.username },
        process.env.JWT_SECRET || "your_default_secret", // Important: Use a strong secret
        { expiresIn: "1h" } // Token expiration time
      );

      return new Response(JSON.stringify({ token }), {
        status: 200,
      });
    } catch (error) {
      console.error("Login error:", error);
      return new Response(JSON.stringify({ error: "Internal Server Error" }), {
        status: 500,
      });
    } finally {
      // Do not close the client.
    }
  } else {
    return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
      status: 405,
    });
  }
}
