import { Pool } from "pg";

export const pool = new Pool({
  // user: process.env.DB_USER,
  // host: process.env.DB_HOST,
  // database: process.env.DB_DATABASE,
  // password: process.env.DB_PASSWORD,
  // port: parseInt(process.env.DB_PORT ?? "5432", 10)
  connectionString: process.env.MB_NEON_POSTGRES_URL
});

// export const pool = new Pool({
//   user: process.env.POSTGRES_USER,
//   host: process.env.POSTGRES_HOST,
//   database: process.env.POSTGRES_DATABASE,
//   password: process.env.POSTGRES_PASSWORD,
//   port: parseInt(process.env.DB_PORT ?? "5432", 10),
//   ssl: false,
// });
