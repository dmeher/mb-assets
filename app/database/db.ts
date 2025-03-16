import { Client } from "pg";

export const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT ?? "5432", 10),
  ssl: false
});

async function connectDB() {
  try {
    await client.connect();
    console.log("Database connected successfully");
    return true; // Connection successful
  } catch (error) {
    console.error("Error connecting to database:", error);
    return false; // Connection failed
  }
}

async function isDatabaseConnected() {
  console.log('Hi8');
  try {
    // A simple query to check if the connection is alive
    const now = await client.query("SELECT NOW()");
    console.log('Hi9', now);
    return true;
  } catch (error) {
    console.log('Hi10');
    console.error("Database is not connected:", error);
    return false;
  }
}

export async function connect() {
  console.log('Hi7');
  const isDBConnected = await isDatabaseConnected();
  console.log("isDBConnected", isDBConnected);
  
  if (!isDBConnected) {
    await connectDB();
  }

  // try {
  //   await client.connect();
  // } catch (error) {
  //   console.error("Database is not connected:", error);
  // }
}
