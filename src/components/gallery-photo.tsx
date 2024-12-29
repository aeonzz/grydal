"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import { Photo } from "pexels";
import Link from "next/link";
import { Button } from "./ui/button";
import { Download, Info } from "lucide-react";
import { toast } from "sonner";
import { Icons } from "./icons/icons";

interface GalleryPhotoProps {
  photo: Photo;
}

export default function GalleryPhoto({ photo }: GalleryPhotoProps) {
  const [isDownloading, setIsDownloading] = React.useState(false);
  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      const response = await fetch(photo.src.original);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${photo.photographer}-${photo.id}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      setIsDownloading(false);
    } catch (error) {
      setIsDownloading(false);
      console.error("Error downloading image:", error);
      toast.error("Error downloading image");
    }
  };
  return (
    <Dialog>
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
          <div className="absolute -bottom-20 left-0 right-0 text-white bg-black bg-opacity-50 p-4 text-foreground transition-all duration-300 ease-in-out group-hover:bottom-0">
            <p className="text-sm">{photo.alt ? photo.alt : "---"}</p>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent
        className="flex h-[97vh] max-w-[90vw] flex-col"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <div className="flex items-start justify-between">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-1">
              <Link
                href={photo.url}
                target="_blank"
                className="flex items-center gap-1 hover:underline"
              >
                Photo by {photo.photographer} on Pexels
              </Link>
            </DialogTitle>
            <DialogDescription>
              {photo.alt ? photo.alt : "---"}
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="default"
              disabled={isDownloading}
              onClick={handleDownload}
            >
              {isDownloading ? <Icons.spinner /> : <Download />}
              Download
            </Button>
            <Popover>
              <PopoverTrigger asChild>
                <Button size="sm" variant="outline">
                  <Info />
                  More info
                </Button>
              </PopoverTrigger>
              <PopoverContent
                align="end"
                onOpenAutoFocus={(e) => {
                  e.preventDefault();
                }}
              >
                <h4 className="text-lg font-semibold">Photo details</h4>
                <div className="mt-1 space-y-2">
                  <p className="text-xs text-muted-foreground">
                    <strong>Dimensions:</strong> {photo.width} x {photo.height}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    <strong>Average color:</strong> {photo.avg_color}
                  </p>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="relative flex-grow overflow-hidden">
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
          <p className="absolute text-xs text-muted-foreground right-0 bottom-0 p-2">
            Photo provided by Pexels
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
