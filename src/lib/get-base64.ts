import { Photo } from "pexels";
import { getPlaiceholder } from "plaiceholder";

export const getImage = async (data: Photo) => {
  try {
    const res = await fetch(data.src.large2x);
    if (!res.ok) {
      throw new Error(`Failed to fetch image: ${res.statusText}`);
    }
    const buffer = Buffer.from(await res.arrayBuffer());

    const { base64 } = await getPlaiceholder(buffer, { size: 10 });

    return {
      ...data,
      base64: base64,
    };
  } catch (error) {
    console.error("Error fetching image:", error);
    return {
      ...data,
      base64: undefined,
    };
  }
};
