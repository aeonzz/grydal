"use client";

import Image from "next/image";
import Link from "next/link";
import { Photo } from "pexels";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { parseAsBoolean, useQueryState } from "nuqs";
import { Session } from "@/lib/auth-type";

interface GalleryProps {
  session: Session | null;
  data: Photo[];
}

export default function Gallery({ session, data }: GalleryProps) {
  const [open, setOpen] = useQueryState(
    "sign-in",
    parseAsBoolean.withDefault(false).withOptions({ history: "replace" })
  );
  return (
    <div
      className={cn(
        "container relative mx-auto px-4",
        !session && "h-screen overflow-hidden"
      )}
    >
      {!session && (
        <div className="absolute top-0 flex h-screen w-full flex-col justify-end rounded-lg bg-gradient-to-t from-background to-transparent p-4 text-center">
          <p className="mb-20 text-lg font-semibold">
            You need to{" "}
            <Button
              variant="link"
              onClick={() => setOpen(true)}
              className="p-0 text-lg text-blue-600 hover:underline"
            >
              sign in
            </Button>{" "}
            to view more details about the photos.
          </p>
        </div>
      )}
      <div className="columns-1 gap-4 space-y-4 sm:columns-2 md:columns-3">
        {session ? (
          <React.Fragment>
            {data.map((photo) => (
              <Dialog key={photo.id}>
                <DialogTrigger asChild>
                  <div className="group relative cursor-pointer break-inside-avoid overflow-hidden rounded-lg">
                    <Image
                      src={photo.src.large2x}
                      alt={photo.photographer}
                      className="h-auto w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:brightness-75"
                      width={photo.width}
                      height={photo.height}
                      priority
                      unoptimized
                    />
                    <div className="absolute -bottom-20 left-0 right-0 bg-black bg-opacity-50 p-4 text-foreground transition-all duration-300 ease-in-out group-hover:bottom-0">
                      <p className="text-sm">{photo.alt ? photo.alt : "---"}</p>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="flex h-[97vh] max-w-[90vw] flex-col">
                  <div className="flex items-start justify-between">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-1">
                        Photo by
                        <Link
                          href={photo.photographer_url}
                          target="_blank"
                          className="flex items-center gap-1 hover:underline"
                        >
                          {photo.photographer}
                        </Link>
                        on Pexels
                      </DialogTitle>
                      <DialogDescription>
                        {photo.alt ? photo.alt : "---"}
                      </DialogDescription>
                    </DialogHeader>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button size="sm" variant="outline">
                          <Info />
                          More info
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent align="end">
                        <h4 className="text-lg font-semibold">Photo details</h4>
                        <div className="mt-1 space-y-2">
                          <p className="text-xs text-muted-foreground">
                            <strong>Dimensions:</strong> {photo.width} x{" "}
                            {photo.height}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            <strong>Average color:</strong> {photo.avg_color}
                          </p>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="flex-grow overflow-hidden">
                    <div className="flex h-full w-full items-center justify-center">
                      <Image
                        src={photo.src.large2x}
                        alt={photo.photographer}
                        className="max-h-full max-w-full object-contain"
                        width={photo.width}
                        height={photo.height}
                        priority
                      />
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </React.Fragment>
        ) : (
          <React.Fragment>
            {data.slice(0, 6).map((photo) => (
              <Image
                key={photo.id}
                src={photo.src.large2x}
                alt={photo.photographer}
                className="h-auto w-full object-cover"
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
