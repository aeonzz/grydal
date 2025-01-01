"use client";

import React from "react";
import { ImageOff } from "lucide-react";
import useSWR from "swr";
import { fetcher } from "@/lib/api";
import { ReturnType } from "@/lib/types";
import { Icons } from "./icons/icons";
import GalleryPagination from "./gallery-pagination";
import SearchGallerySection from "./ui/search-gallery-section";
import SearchFilter from "./search-filter";

interface SearchGalleryProps {
  slug: string;
}

export default function SearchGallery({ slug }: SearchGalleryProps) {
  const [page, setPage] = React.useState(1);
  const ref = React.useRef<HTMLDivElement>(null);
  const { data, isLoading } = useSWR<ReturnType, Error>(
    `/api/photos/get-photos?page=${page}&search=${slug}`,
    fetcher
  );

  React.useEffect(() => {
    if (ref.current && page !== 1) {
      const refPosition = ref.current.getBoundingClientRect().top;

      const offset = 100;
      const scrollPosition = window.scrollY + refPosition - offset;

      window.scrollTo({
        top: scrollPosition,
      });
    }
  }, [page]);

  return (
    <React.Fragment>
      <div ref={ref}></div>
      <div className="my-8">
        <h1 className="text-3xl font-semibold tracking-tight">
          Search: {slug.split("%20").join(" ")}
        </h1>
      </div>
      <div className="flex items-center justify-between pb-4">
        <p className="text-xs text-muted-foreground">
          Photos provided by Pexels
        </p>
        <SearchFilter />
      </div>
      {!isLoading && !data ? (
        <div className="mt-4 text-center">Error</div>
      ) : (
        <React.Fragment>
          {data && data.data.photos.length === 0 ? (
            <div className="flex h-[50vh] w-full flex-col items-center justify-center gap-5">
              <div className="grid place-items-center rounded-full border bg-background p-4">
                <ImageOff className="text-muted-foreground" />
              </div>
              <h3 className="max-w-2xl text-center text-lg font-semibold tracking-tight">
                We couldn&apos;t find any photos matching &quot;
                <span className="text-muted-foreground">{slug}</span>&quot;. Try
                adjusting your search term or exploring different keywords.
              </h3>
            </div>
          ) : (
            <SearchGallerySection data={data?.data.photos} />
          )}
        </React.Fragment>
      )}
      {isLoading && (
        <div className="flex min-h-[calc(100vh_-_296px)] flex-col items-center justify-center gap-3">
          <Icons.spinner className="opacity-60" />
          <p className="ml-2 text-xs text-muted-foreground">Loading...</p>
        </div>
      )}
      <GalleryPagination
        page={page}
        setPage={setPage}
        isLoading={isLoading || data?.data.photos.length === 0}
      />
    </React.Fragment>
  );
}
