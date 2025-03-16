import { Pool } from "pg";

export const pool = new Pool({
  connectionString: process.env.MB_NEON_POSTGRES_URL,
});
