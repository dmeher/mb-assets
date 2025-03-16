import { Pool } from "pg";

// export const pool = new Pool({
//   user: (process.env.DB_USER ?? process.env.POSTGRES_USER),
//   host: (process.env.DB_HOST ?? process.env.POSTGRES_HOST),
//   database: (process.env.DB_DATABASE ?? process.env.POSTGRES_DATABASE),
//   password: (process.env.DB_PASSWORD ?? process.env.POSTGRES_PASSWORD),
//   port: parseInt(process.env.DB_PORT ?? "5432", 10),
//   ssl: true,
// });

export const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DATABASE,
  password: process.env.POSTGRES_PASSWORD,
  port: parseInt(process.env.DB_PORT ?? "5432", 10),
  ssl: true,
});
