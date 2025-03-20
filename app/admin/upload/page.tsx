"use client";
import { Input } from "@heroui/input";
import React, { useState, useEffect } from "react";

interface ImageResponse {
  url: string;
}

const HomePage: React.FC = () => {
  const [imageUrls, setImageUrls] = useState<ImageResponse[]>();
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    fetchImages();
  });

  const fetchImages = async () => {
    try {
      const response = await fetch(
        "/api/images?filename=21b7bd8b-bada-41fc-856a-38fdf37e28c4-to_serve_you-Photoroom.png"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setImageUrls(data);
      setFetchError(null);
    } catch (error: any) {
      console.error("Error fetching images:", error);
      setFetchError("Failed to load images.");
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setImagePreviewUrls(URL.createObjectURL(event.target.files[0]));
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadError("Please select an image file.");
      return;
    }

    setUploading(true);
    setUploadError(null);

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const arrayBuffer = await selectedFile.arrayBuffer();
      const contentType = selectedFile.type;

      const response = await fetch("/api/images/upload", {
        method: "POST",
        headers: {
          "Content-Type": contentType,
        },
        body: arrayBuffer,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || `HTTP error! status: ${response.status}`
        );
      }

      await response.json();
      setSelectedFile(null);
      fetchImages(); // Refresh the image list
    } catch (error: any) {
      console.error("Error uploading image:", error);
      setUploadError(error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (imageUrl: string) => {
    if (window.confirm("Are you sure you want to delete this image?")) {
      const filename = imageUrl.split("/").pop();
      if (filename) {
        try {
          const response = await fetch(`/api/images/${filename}`, {
            method: "DELETE",
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
              errorData.error || `HTTP error! status: ${response.status}`
            );
          }

          fetchImages(); // Refresh the image list
        } catch (error: any) {
          console.error("Error deleting image:", error);
          alert(error.message);
        }
      }
    }
  };

  return (
    <div>
      <h1>Image Upload (No Database)</h1>

      <div>
        <Input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          color="primary"
        />
        <button onClick={handleUpload} disabled={uploading}>
          {uploading ? "Uploading..." : "Upload Image"}
        </button>
        {uploadError && <p style={{ color: "red" }}>{uploadError}</p>}
      </div>

      <h2>Preview</h2>
      {imagePreviewUrls && (
        <img
          src={imagePreviewUrls}
          alt={`Uploaded Image`}
          style={{ maxWidth: "200px" }}
        />
      )}

      <h2>Uploaded Images</h2>
      {fetchError && <p style={{ color: "red" }}>{fetchError}</p>}
      {imageUrls ? (
        imageUrls.length > 0 ? (
          <ul>
            {imageUrls?.map((image) => (
              <li key={image.url}>
                <img
                  src={image.url}
                  alt={`Uploaded Image`}
                  style={{ maxWidth: "200px" }}
                />
                <button onClick={() => handleDelete(image.url)}>Delete</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No images uploaded yet.</p>
        )
      ) : (
        <p>No images uploaded yet.</p>
      )}
    </div>
  );
};

export default HomePage;
