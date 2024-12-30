import React from "react";
import { Skeleton } from "./ui/skeleton";

const heights = [250, 400, 280, 420, 270, 290, 310, 250, 300] as const;

export default function GallerySkeleton() {
  return (
    <div className="container mx-auto h-auto columns-1 gap-4 space-y-4 px-4 pb-4 sm:columns-2 md:columns-3">
      {new Array(9).fill(null).map((_, index) => (
        <Skeleton
          key={index}
          className="break-inside-avoid"
          style={{ height: `${heights[index]}px` }}
        />
      ))}
    </div>
  );
}
