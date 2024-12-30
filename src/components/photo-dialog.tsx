"use client";

import React from "react";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Download, Info } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { Icons } from "./icons/icons";
import { PhotosWithBase64 } from "@/lib/types";

interface PhotoDialogProps {
  photo: PhotosWithBase64;
}

export default function PhotoDialog({ photo }: PhotoDialogProps) {
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
            {photo.url.split("/photo/")[1].split("-").slice(0, -1).join(" ")}
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="sm"
                variant="default"
                disabled={isDownloading}
                onClick={handleDownload}
              >
                {isDownloading ? <Icons.spinner /> : <Download />}
                Download
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Download photo</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <Popover>
              <TooltipTrigger asChild>
                <PopoverTrigger asChild>
                  <Button size="sm" variant="outline">
                    <Info />
                    More info
                  </Button>
                </PopoverTrigger>
              </TooltipTrigger>
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
            <TooltipContent>
              <p>View photo details</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
      <div className="relative flex-grow overflow-hidden">
        <div className=" flex h-full w-full items-center justify-center">
          <Image
            src={photo.src.large2x}
            alt={photo.photographer}
            className="max-h-full max-w-full object-contain"
            width={photo.width}
            // blurDataURL={photo.base64}
            // placeholder="blur"
            height={photo.height}
            priority
          />
        </div>
        <p className="absolute bottom-0 right-0 p-2 text-xs text-muted-foreground">
          Photo provided by Pexels
        </p>
      </div>
    </DialogContent>
  );
}
