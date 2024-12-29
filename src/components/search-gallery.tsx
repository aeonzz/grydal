"use client";

import React from "react";
import { useOrientation } from "@/app/hooks/use-orientation";
import SearchFilter from "./search-filter";
import { Photo } from "pexels";
import GalleryPhoto from "./gallery-photo";

interface SearchGalleryProps {
  data: Photo[];
}

export default function SearchGallery({ data }: SearchGalleryProps) {
  const { orientation } = useOrientation();

  const filteredPhotos = data.filter((photo) => {
    if (orientation === "landscape") {
      return photo.width > photo.height;
    } else if (orientation === "portrait") {
      return photo.height > photo.width;
    } else {
      return true;
    }
  });
  return (
    <React.Fragment>
      <div className="flex items-center justify-between pb-4">
        <p className="text-xs text-muted-foreground">
          Photos provided by Pexels
        </p>
        <SearchFilter />
      </div>
      <div className="columns-1 gap-4 space-y-4 pb-5 sm:columns-2 md:columns-3">
        {filteredPhotos.length !== 0 &&
          filteredPhotos.map((photo) => (
            <GalleryPhoto key={photo.id} photo={photo} />
          ))}
      </div>
    </React.Fragment>
  );
}
