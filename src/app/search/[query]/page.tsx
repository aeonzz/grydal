import GalleryPhoto from "@/components/gallery-photo";
import HomeLayout from "@/components/layout/home-layout";
import SearchFilter from "@/components/search-filter";
import { pexelsClient } from "@/lib/pexels-client";
import { Photos } from "pexels";
import React from "react";

interface SearchPageProps {
  params: Promise<{ query: string }>;
}

export default async function SearchPage({ params }: SearchPageProps) {
  const slug = (await params).query;
  const photos = await pexelsClient.photos.search({
    query: slug,
    per_page: 50,
  });

  if (!photos) {
    return <div>Error</div>;
  }

  console.log(photos);

  const data = (photos as Photos).photos;

  return (
    <HomeLayout>
      <div className="container min-h-screen px-4">
        <div className="py-8">
          {data.length === 0 ? (
            <h3 className="max-w-5xl text-3xl font-semibold tracking-tight">
              We couldn&apos;t find any photos matching &quot;
              <span className="text-muted-foreground">{slug}</span>&quot;. Try
              adjusting your search term or exploring different keywords.
            </h3>
          ) : (
            <h1 className="text-3xl font-semibold tracking-tight">
              Search: {slug.split("%20").join(" ")}
            </h1>
          )}
        </div>
        <div className="flex items-center justify-between pb-4">
          <p className="text-xs text-muted-foreground">
            Photos provided by Pexels
          </p>
          <SearchFilter />
        </div>
        <div className="columns-1 gap-4 space-y-4 pb-5 sm:columns-2 md:columns-3">
          {data.length !== 0 &&
            data.map((photo) => <GalleryPhoto key={photo.id} photo={photo} />)}
        </div>
      </div>
    </HomeLayout>
  );
}
