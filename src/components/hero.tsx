import React from "react";
import { Input } from "./ui/input";
import { SearchIcon } from "./icons/search";

export default function Hero() {
  return (
    <main className="container mx-auto flex h-[75vh] flex-col items-center justify-center gap-5 px-4">
      <h1 className="text-center text-5xl font-extrabold tracking-tight">
        Find the Perfect Image for Every Moment.
      </h1>
      <p className="max-w-2xl text-center text-xl text-muted-foreground">
        Powered by Pexels API, explore a vast collection of stunning,
        free-to-use images for every project.
      </p>
      <div className="flex w-full max-w-md items-center gap-2 rounded-lg border bg-background p-2">
        <Input placeholder="Search images" className="" />
        <SearchIcon />
      </div>
    </main>
  );
}
