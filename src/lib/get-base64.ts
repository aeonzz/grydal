import { Photo } from "pexels";
import { PhotosWithBase64 } from "./types";
import { getPlaiceholder } from "plaiceholder";

export async function getImages(data: Photo[]): Promise<PhotosWithBase64[]> {
  return Promise.all(
    data.map(async (photo) => {
      const buffer = await fetch(photo.src.large2x).then(async (res) =>
        Buffer.from(await res.arrayBuffer())
      );
      const { base64 } = await getPlaiceholder(buffer);
      return { ...photo, base64 };
    })
  );
}
