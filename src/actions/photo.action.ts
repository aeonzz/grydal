"use server";

import { pexelsClient } from "@/lib/pexels-client";
import { PageParamsType, PhotoResponse } from "@/lib/types";

export async function getPhotos(
  payload: PageParamsType
): Promise<PhotoResponse> {
  const { page } = payload;
  try {
    const response = await pexelsClient.photos.search({
      query: "black",
      per_page: 20,
      page: page,
    });

    return { data: response, error: null };
  } catch (error) {
    console.error(error);
    return { data: null, error: "Something went wrong." };
  }
}
