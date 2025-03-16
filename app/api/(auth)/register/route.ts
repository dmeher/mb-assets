import { pool } from "@/app/database/db";
import bcrypt from "bcrypt";

interface User {
  user_id: number;
  username: string;
  password_hash: string;
  email: string | null;
  full_name: string | null;
  role: string;
  created_at: string;
  updated_at: string;
}

interface RegisterPayload {
  username: string;
  password: string;
  email: string;
  fullName: string;
}

export async function POST(req: Request) {
  if (req.method === "POST") {
    const body = await req.json();
    const { username, password, email, fullName } = body as RegisterPayload;
    const saltRounds = 10; // Adjust as needed

    try {
      // await connect();

      // Check if username or email already exists
      const existingUser = await pool.query<User>(
        "SELECT * FROM users WHERE username = $1 OR email = $2",
        [username, email]
      );

      if (existingUser.rows.length > 0) {
        return new Response(
          JSON.stringify({ error: "Username or email already exists" }),
          {
            status: 400,
          }
        );
      }

      const passwordHash = await bcrypt.hash(password, saltRounds);

      await pool.query(
        "INSERT INTO users (username, password_hash, email, full_name) VALUES ($1, $2, $3, $4)",
        [username, passwordHash, email, fullName]
      );
      return new Response(
        JSON.stringify({ message: "User registered successfully" }),
        {
          status: 201,
        }
      );
    } catch (error) {
      console.error("Registration error:", error);
      return new Response(JSON.stringify({ error: "Internal Server Error" }), {
        status: 500,
      });
    } finally {
      //Do not close the client.
    }
  } else {
    return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
      status: 405,
    });
  }
}
