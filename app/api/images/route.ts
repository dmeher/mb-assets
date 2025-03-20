import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { pool } from "@/app/database/db";

const uploadDir = path.join(process.cwd(), "public", "uploads");

interface ProductImagesPayload {
  productId?: number;
  imageUrl: string;
  isThumbnail?: boolean;
}

export async function GET(req: NextRequest) {
  const filename = req.nextUrl.searchParams.get("filename");
  const filePath = path.join(uploadDir, filename ?? "");

  try {
    await fs.access(filePath); // Check if the file exists
    return NextResponse.json([{ url: `/uploads/${filename}` }], {
      status: 200,
    });
  } catch (error: any) {
    if (error.code === "ENOENT") {
      return NextResponse.json({ error: "Image not found." }, { status: 404 });
    }
    console.error("Error accessing file:", error);
    return NextResponse.json(
      { error: "Failed to retrieve image." },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const filename = req.nextUrl.searchParams.get("filename");
  const filePath = path.join(uploadDir, filename ?? "");

  try {
    await fs.unlink(filePath);
    return NextResponse.json(
      { message: "Image deleted successfully." },
      { status: 200 }
    );
  } catch (error: any) {
    if (error.code === "ENOENT") {
      return NextResponse.json({ error: "Image not found." }, { status: 404 });
    }
    console.error("Error deleting file:", error);
    return NextResponse.json(
      { error: "Failed to delete image." },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  if (req.method === "POST") {
    // const isAuthorized = await isAuthenticated();
    const isAuthorized = true;

    if (isAuthorized) {
      const body = await req.json();
      const images = body as ProductImagesPayload[];

      try {
        // await connect();

        images.forEach(async (image) => {
          await pool.query(
            "INSERT INTO product_images (product_id, image_url, is_thumbnail) VALUES ($1, $2, $3)",
            [image.productId, image.imageUrl, image.isThumbnail]
          );
        });

        return new Response(
          JSON.stringify({ message: "Images uploaded successfully." }),
          {
            status: 200,
          }
        );
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
