"use server";

import { pexelsClient } from "@/lib/pexels-client";
import {  PhotoResponse } from "@/lib/types";

export async function getPhotos(
  payload: number
): Promise<PhotoResponse> {
  try {
    const response = await pexelsClient.photos.search({
      query: "black",
      per_page: 20,
      page: payload,
    });

    return { data: response, error: null };
  } catch (error) {
    console.error(error);
    return { data: null, error: "Something went wrong." };
  }
}
