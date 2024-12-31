import HomeLayout from "@/components/layout/home-layout";
import SearchScreen from "@/components/screen/search-screen";
import SearchFilter from "@/components/search-filter";
import React from "react";

interface SearchPageProps {
  params: Promise<{ query: string }>;
}

export default async function SearchPage({ params }: SearchPageProps) {
  const slug = (await params).query;

  return (
    <HomeLayout>
      <div className="container min-h-screen px-4">
        <div className="py-8">
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
        <SearchScreen slug={slug} />
      </div>
    </HomeLayout>
  );
}
