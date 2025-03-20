import { promises as fs } from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { ImageFile, ProductImagesPayload } from "@/app/admin/products/page";
import { buffer } from "stream/consumers";

const uploadDir = path.join(process.cwd(), "public", "uploads");

async function writeArrayBufferToFile(
  arrayBuffer: ArrayBuffer,
  filePath: string
): Promise<void> {
  try {
    // Convert the ArrayBuffer to a Buffer
    const buffer = Buffer.from(arrayBuffer);

    // Use fs.promises.writeFile to asynchronously write the buffer to the file
    await fs.writeFile(filePath, buffer as any);

    console.log(`File successfully written to ${filePath}`);
  } catch (error) {
    console.error("Error writing file:", error);
    throw error; // Re-throw the error for handling elsewhere
  }
}

export const config = {
  api: {
    bodyParser: true,
  },
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const imageList: ProductImagesPayload[] = [];

    body.buffers.forEach(async (buffer: ArrayBuffer, index: number) => {
      const contentType = body.types[index];
      const isThumbnail = body.thumbnailList[index];
      const arrayBuffer = buffer;
      let fileExtension;

      if (contentType === "image/jpeg") {
        fileExtension = ".jpg";
      } else if (contentType === "image/png") {
        fileExtension = ".png";
      } else if (contentType === "image/gif") {
        fileExtension = ".gif";
      } else {
        return NextResponse.json(
          { error: "Unsupported content type." },
          { status: 400 }
        );
      }

      if (!fileExtension) {
        return NextResponse.json(
          { error: "Could not determine file extension." },
          { status: 400 }
        );
      }

      const uniqueFileName = `${uuidv4()}-${fileExtension}`;
      const filePath = path.join(uploadDir, uniqueFileName);
      const publicPath = `/uploads/${uniqueFileName}`;

      imageList.push({
        imageUrl: publicPath,
        isThumbnail,
      });

      if (arrayBuffer) {
        await writeArrayBufferToFile(arrayBuffer, filePath);
      }
    });

    return NextResponse.json(
      { message: "Image uploaded successfully.", filePathList: imageList },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error during upload:", error);
    return NextResponse.json(
      { error: "Failed to save the uploaded image." },
      { status: 500 }
    );
  }
}
