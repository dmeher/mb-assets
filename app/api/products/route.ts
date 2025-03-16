import { client, connect } from "@/app/database/db";
import { QueryResult } from "pg";
import { isAuthenticated } from "../_utils/util";

export interface Product {
  product_id: number;
  product_name: string;
  description: string;
  base_price: string; // or number if you want to parse it
  stock_quantity: number;
  category: string | null;
  brand: string | null;
  sku: string | null;
  image_url: string | null;
  created_at: string; // or Date if you parse it
  updated_at: string; // or Date if you parse it
  price_per_quantity: { [index: string]: number }; // or a more specific type if you know the JSON structure
}

interface ProductPayload {
  productName: string;
  description: string;
  basePrice: string; // or number if you want to parse it
  stockQuantity: number;
  category: string | null;
  brand: string | null;
  sku: string | null;
  imageUrl: string | null;
  pricePerQuantity: { [index: string]: number }; // or a more specific type if you know the JSON structure
}

export async function GET(req: Request) {
  if (req.method === "GET") {
    const isAuthorized = true;
    if (isAuthorized) {
      try {
        await connect();
        const result: QueryResult<Product> = await client.query(
          "SELECT * FROM products"
        );
        return new Response(JSON.stringify(result.rows), {
          status: 200,
        });
      } catch (error) {
        console.error("Error fetching products:", error);
        return new Response(
          JSON.stringify({ error: "Internal Server Error" }),
          {
            status: 500,
          }
        );
      } finally {
        //Do not close the client.
      }
    } else {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }
  } else {
    return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
      status: 405,
    });
  }
}

export async function POST(req: Request) {
  if (req.method === "POST") {
    const isAuthorized = await isAuthenticated();

    if (isAuthorized) {
      const body = await req.json();
      const {
        productName,
        description,
        basePrice,
        stockQuantity,
        category,
        brand,
        sku,
        imageUrl,
        pricePerQuantity,
      } = body as ProductPayload;

      try {
        await connect();

        const result = await client.query(
          "INSERT INTO products (product_name, description, base_price, stock_quantity, category, brand, sku, image_url, price_per_quantity) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
          [
            productName,
            description,
            basePrice,
            stockQuantity,
            category,
            brand,
            sku,
            imageUrl,
            pricePerQuantity,
          ]
        );

        if (result.rowCount) {
          return new Response(
            JSON.stringify({ message: "Product inserted successfully" }),
            {
              status: 200,
            }
          );
        }
      } catch (error) {
        console.error("Error adding product:", error);
        return new Response(
          JSON.stringify({ error: "Internal Server Error" }),
          {
            status: 500,
          }
        );
      } finally {
        //Do not close the client.
      }
    } else {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }
  } else {
    return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
      status: 405,
    });
  }
}
