import React from "react";
import { pexelsClient } from "@/lib/pexels-client";
import { Photos } from "pexels";
import SearchGallery from "../search-gallery";
import { ImageOff } from "lucide-react";

interface SearchScreenProps {
  slug: string;
}

export default async function SearchScreen({ slug }: SearchScreenProps) {
  const photos = await pexelsClient.photos.search({
    query: slug,
    per_page: 10,
  });

  if (!photos) {
    return <div>Error</div>;
  }

  const data = (photos as Photos).photos;

  return (
    <React.Fragment>
      {data.length === 0 ? (
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
        <SearchGallery data={data} />
      )}
    </React.Fragment>
  );
}
