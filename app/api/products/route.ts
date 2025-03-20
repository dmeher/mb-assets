import { pool } from "@/app/database/db";
import { QueryResult } from "pg";
import { isAuthenticated } from "../_utils/util";
import { result } from "lodash";

export interface Product {
  product_id: number;
  product_name: string;
  description: string;
  base_price: string; // or number if you want to parse it
  stock_quantity: number;
  category: string | null;
  brand: string | null;
  sku: string | null;
  thumbnail_image?: string | null;
  images: Image[] | null;
  created_at: string; // or Date if you parse it
  updated_at: string; // or Date if you parse it
  price_per_quantity: { [index: string]: number }; // or a more specific type if you know the JSON structure
}

interface Image {
  imageUrl: string;
  isThumbnail: boolean;
}

interface ProductPayload {
  productName: string;
  description: string;
  basePrice: string; // or number if you want to parse it
  stockQuantity: number;
  category: string | null;
  brand: string | null;
  sku: string | null;
  images: Image[] | null;
  pricePerQuantity: { [index: string]: number }; // or a more specific type if you know the JSON structure
}

export async function GET(req: Request) {
  if (req.method === "GET") {
    // const isAuthorized = await isAuthenticated();
    const isAuthorized = true;

    if (isAuthorized) {
      try {
        // await connect();

        const result: QueryResult<Product> = await pool.query(
          "SELECT p.*, COALESCE(array_agg(json_build_object('imageUrl', pi.image_url, 'isThumbnail', pi.is_thumbnail)) FILTER (WHERE pi.image_url IS NOT NULL), '{}'::JSON[]) AS images FROM products p LEFT JOIN product_images pi ON p.product_id = pi.product_id GROUP BY p.product_id ORDER BY created_at DESC"
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
    // const isAuthorized = await isAuthenticated();
    const isAuthorized = true;

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
        pricePerQuantity,
      } = body as ProductPayload;

      try {
        // await connect();

        const result = await pool.query(
          "INSERT INTO products (product_name, description, base_price, stock_quantity, category, brand, sku, price_per_quantity) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING product_id",
          [
            productName,
            description,
            basePrice,
            stockQuantity,
            category,
            brand,
            sku,
            pricePerQuantity,
          ]
        );

        if (result.rowCount) {
          return new Response(
            JSON.stringify({
              message: "Product inserted successfully",
              productId: result.rows[0].product_id,
            }),
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
