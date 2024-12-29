import Gallery from "@/components/gallery";
import Hero from "@/components/hero";
import HomeLayout from "@/components/layout/home-layout";
import { Photos } from "pexels";

export default function Home() {

  return (
    <HomeLayout>
      <Hero />
      <Gallery />
    </HomeLayout>
  );
}
