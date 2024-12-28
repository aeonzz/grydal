import Gallery from "@/components/gallery";
import Hero from "@/components/hero";
import HomeLayout from "@/components/layout/home-layout";
import { pexelsClient } from "@/lib/pexels-client";
import { getServerSession } from "@/lib/server-session";
import { Photos } from "pexels";

export default async function Home() {
  const photos = await pexelsClient.photos.curated({ per_page: 50 });

  if (!photos) {
    return <div>Error</div>;
  }

  const session = await getServerSession();

  return (
    <HomeLayout>
      <Hero />
      <Gallery data={(photos as Photos).photos} session={session} />
    </HomeLayout>
  );
}
