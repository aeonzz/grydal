import HomeLayout from "@/components/layout/home-layout";
import SearchGallery from "@/components/search-gallery";
import React from "react";

interface SearchPageProps {
  params: Promise<{ query: string }>;
}

export default async function SearchPage({ params }: SearchPageProps) {
  const slug = (await params).query;

  return (
    <HomeLayout>
      <div className="container px-4 pb-4">
        <SearchGallery slug={slug} />
      </div>
    </HomeLayout>
  );
}
