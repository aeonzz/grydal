"use server";

import { Photo } from "pexels";
import { PhotosWithBase64 } from "./types";
import { getPlaiceholder } from "plaiceholder";

export async function getImages(data: Photo[]): Promise<PhotosWithBase64[]> {
  return Promise.all(
    data.map(async (photo) => {
      let base64 = "";
      try {
        // Fetch the image
        const buffer = await fetch(photo.src.large2x)
          .then(async (res) => {
            if (!res.ok) {
              throw new Error(`Failed to fetch image: ${res.statusText}`);
            }
            const arrayBuffer = await res.arrayBuffer();
            console.log("Image size:", arrayBuffer.byteLength);
            return Buffer.from(arrayBuffer);
          })
          .catch((error) => {
            console.error("Error fetching image:", error);
            return null;
          });

        // Generate the base64 placeholder
        if (buffer) {
          const { base64: placeholder } = await getPlaiceholder(buffer);
          base64 = placeholder;
        }
      } catch (error) {
        console.error("Error processing image:", error);
      }
      return { ...photo, base64 };
    })
  );
}
