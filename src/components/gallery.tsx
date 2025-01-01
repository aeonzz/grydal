"use client";

import React from "react";
import useSWR from "swr";
import { ReturnType } from "@/lib/types";
import GalleryPhoto from "./gallery-photo";
import GalleryPagination from "./gallery-pagination";
import { Icons } from "./icons/icons";
import { fetcher } from "@/lib/api";

export default function Gallery() {
  const [page, setPage] = React.useState(1);
  const focusRef = React.useRef<HTMLDivElement>(null);
  const { data, isLoading } = useSWR<ReturnType, Error>(
    `/api/photos/get-photos?page=${page}&search=black`,
    fetcher
  );

  React.useEffect(() => {
    if (focusRef.current && page !== 1) {
      focusRef.current.scrollIntoView();
    }
  }, [page, data]);

  return (
    <div className="container relative mx-auto flex flex-col px-4 pb-4">
      <div ref={focusRef} className="mb-20"></div>
      {!isLoading && !data && <div className="mt-4 text-center">Error</div>}
      {!isLoading && data && (
        <React.Fragment>
          <div className="columns-1 gap-4 space-y-4 sm:columns-2 md:columns-3">
            {data.data.photos.map((photo) => (
              <GalleryPhoto key={photo.id} photo={photo} />
            ))}
          </div>
        </React.Fragment>
      )}
      {isLoading && (
        <div className="mt-4 flex min-h-[75vh] flex-col items-center justify-center gap-3">
          <Icons.spinner className="opacity-60" />
          <p className="ml-2 text-xs text-muted-foreground">Loading...</p>
        </div>
      )}
      <GalleryPagination page={page} setPage={setPage} isLoading={isLoading} />
    </div>
  );
}
