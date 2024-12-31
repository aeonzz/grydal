"use client";

import React from "react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import { Camera } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import PhotoDialog from "./photo-dialog";
import { Photo } from "pexels";
import { cn } from "@/lib/utils";

interface GalleryPhotoProps {
  photo: Photo;
}

export default function GalleryPhoto({ photo }: GalleryPhotoProps) {
  const [isLoading, setLoading] = React.useState(true);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="group relative cursor-pointer break-inside-avoid overflow-hidden rounded-lg">
          <Image
            src={photo.src.large2x}
            alt={photo.photographer}
            className={cn(
              "h-auto w-full bg-secondary object-cover transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:brightness-75",
              isLoading ? "blur-md" : "blur-0"
            )}
            width={photo.width}
            height={photo.height}
            onLoad={() => setLoading(false)}
            priority
            sizes="(min-width: 1480px) 447px, (min-width: 780px) 30.44vw, (min-width: 640px) calc(50vw - 23px), calc(100vw - 30px)"
          />
          <div className="absolute -bottom-28 left-0 right-0 p-2 transition-all duration-300 ease-in-out group-hover:bottom-0">
            <Card className="border-none bg-black bg-opacity-50 shadow-none">
              <CardHeader>
                <CardTitle className="flex items-center gap-1 text-white">
                  <div className="grid size-8 place-items-center rounded-full border">
                    <Camera className="mb-[1px] size-4" />
                  </div>
                  {photo.photographer}
                </CardTitle>
                <CardDescription className="capitalize">
                  {photo.url
                    .split("/photo/")[1]
                    .split("-")
                    .slice(0, -1)
                    .join(" ")}
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </DialogTrigger>
      <PhotoDialog photo={photo} />
    </Dialog>
  );
}
