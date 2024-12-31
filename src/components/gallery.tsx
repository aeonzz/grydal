"use client";

import { getPhotos } from "@/actions/photo.action";
import { useSession } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import React from "react";
import SignInInfo from "./sign-in-info";
import GalleryPhoto from "./gallery-photo";
import { Photos } from "pexels";
import Image from "next/image";
import GalleryPagination from "./gallery-pagination";

interface GalleryProps {
  photosPromise: ReturnType<typeof getPhotos>;
  page: number;
}

export default function Gallery({
  photosPromise,
  page: currentPage,
}: GalleryProps) {
  const { data: photos } = React.use(photosPromise);
  const session = useSession();

  if (!photos) return null;

  const data = (photos as Photos).photos;

  return (
    <div
      className={cn(
        "container relative mx-auto flex flex-col px-4 pb-4",
        !session && "h-screen overflow-hidden"
      )}
    >
      <SignInInfo session={session.data} />
      <div className="columns-1 gap-4 space-y-4 sm:columns-2 md:columns-3">
        {session ? (
          <React.Fragment>
            {data.map((photo) => (
              <GalleryPhoto key={photo.id} photo={photo} />
            ))}
          </React.Fragment>
        ) : (
          <React.Fragment>
            {data.slice(0, 6).map((photo) => (
              <Image
                key={photo.id}
                src={photo.src.large2x}
                alt={photo.photographer}
                className="h-auto w-full rounded-lg object-cover"
                width={photo.width}
                height={photo.height}
                priority
                unoptimized
              />
            ))}
          </React.Fragment>
        )}
      </div>
      {session && <GalleryPagination currentPage={currentPage} />}
    </div>
  );
}
