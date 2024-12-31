"use server";

import { pexelsClient } from "@/lib/pexels-client";
import { PhotoResponse } from "@/lib/types";

export async function getPhotos(): Promise<PhotoResponse> {
  try {
    const response = await pexelsClient.photos.search({
      query: "black",
      per_page: 10,
    });

    return { data: response, error: null };
  } catch (error) {
    console.error(error);
    return { data: null, error: "Something went wrong." };
  }
}
