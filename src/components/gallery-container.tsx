import React from "react";
import { getPhotos } from "@/actions/photo.action";
import Gallery from "./gallery";
import { PageParamsType } from "@/lib/types";

interface GalleryContainerProps {
  params: PageParamsType;
}

export default async function GalleryContainer({
  params,
}: GalleryContainerProps) {
  const photosPromise = getPhotos(params);

  return <Gallery photosPromise={photosPromise} page={params.page} />;
}
