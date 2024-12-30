import Gallery from "@/components/gallery";
import GallerySkeleton from "@/components/gallery-skeleton";
import Hero from "@/components/hero";
import HomeLayout from "@/components/layout/home-layout";
import { Suspense } from "react";

export default function Home() {
  return (
    <HomeLayout>
      <Hero />
      <Suspense fallback={<GallerySkeleton />}>
        <Gallery />
      </Suspense>
    </HomeLayout>
  );
}
