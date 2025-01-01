import Gallery from "@/components/gallery";
import Hero from "@/components/hero";
import HomeLayout from "@/components/layout/home-layout";

export default function Home() {
  return (
    <HomeLayout>
      <Hero />
      <Gallery />
    </HomeLayout>
  );
}
