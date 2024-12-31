import GalleryContainer from "@/components/gallery-container";
import Hero from "@/components/hero";
import HomeLayout from "@/components/layout/home-layout";
import { PageParamsType, QueryParams } from "@/lib/types";

interface HomeProps {
  searchParams?: QueryParams;
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const pageParams: PageParamsType = {
    page: Number(params?.page) || 1,
  };

  return (
    <HomeLayout>
      <Hero />
      <GalleryContainer params={pageParams} />
    </HomeLayout>
  );
}
