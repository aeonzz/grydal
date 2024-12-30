import Image from "next/image";
import { Photos } from "pexels";
import React from "react";
import { cn } from "@/lib/utils";
import GalleryPhoto from "./gallery-photo";
import SignInInfo from "./sign-in-info";
import { getServerSession } from "@/lib/server-session";
import { pexelsClient } from "@/lib/pexels-client";
import { getImages } from "@/lib/get-base64";

export default async function Gallery() {
  const photos = await pexelsClient.photos.search({
    query: "black",
    per_page: 27,
  });

  if (!photos) {
    return <div>Error</div>;
  }

  const data = await getImages((photos as Photos).photos);

  const session = await getServerSession();

  return (
    <div
      className={cn(
        "container relative mx-auto px-4 pb-4",
        !session && "h-screen overflow-hidden"
      )}
    >
      <SignInInfo session={session} />
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
    </div>
  );
}
