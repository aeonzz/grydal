"use client";

import React from "react";
import GalleryPhoto from "./gallery-photo";
import { ImageOff } from "lucide-react";
import { Photo } from "pexels";
import { useSearchParams } from "next/navigation";

interface SearchGalleryProps {
  data: Photo[];
}

export default function SearchGallery({ data }: SearchGalleryProps) {
  const searchParams = useSearchParams();

  const orientation = searchParams.get("orientation");

  const filteredPhotos = React.useMemo(() => {
    return data.filter((photo) => {
      if (orientation === "landscape") {
        return photo.width > photo.height;
      } else if (orientation === "portrait") {
        return photo.height > photo.width;
      } else {
        return true;
      }
    });
  }, [data, orientation]);

  return (
    <React.Fragment>
      {filteredPhotos.length === 0 ? (
        <div className="flex h-[50vh] w-full flex-col items-center justify-center gap-5">
          <div className="grid place-items-center rounded-full border bg-background p-4">
            <ImageOff className="text-muted-foreground" />
          </div>
          <h3 className="max-w-2xl text-center text-lg font-semibold tracking-tight">
            No photos found for your selected orientation. <br />
            Try adjusting your search or exploring different keywords.
          </h3>
        </div>
      ) : (
        <div className="columns-1 gap-4 space-y-4 pb-5 sm:columns-2 md:columns-3">
          {filteredPhotos.map((photo) => (
            <GalleryPhoto key={photo.id} photo={photo} />
          ))}
        </div>
      )}
    </React.Fragment>
  );
}
