import React from "react";
import HeroCta from "./hero-cta";

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
      <HeroCta />
    </main>
  );
}
