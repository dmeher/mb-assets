import { Client } from "pg";

export const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT ?? "5432", 10),
});

export async function connect() {
  await client.connect();
  // if (!client._connected) {
  //   await client.connect();
  // }
}
