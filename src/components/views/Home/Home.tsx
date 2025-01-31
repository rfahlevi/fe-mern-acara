import React from "react";
import HomeSlider from "./HomeSlider";
import useHome from "./useHome";
import HomeList from "./HomeList";
import { Skeleton } from "@heroui/react";
import Image from "next/image";

export default function Home() {
  const {
    dataBanners,
    dataFeaturedEvents,
    dataLatestEvents,
    isLoadingBanner,
    isLoadingFeaturedEvents,
    isLoadingLatestEvents,
  } = useHome();

  return (
    <div>
      <HomeSlider banners={dataBanners} isLoadingBanners={isLoadingBanner} />
      <HomeList
        title={"Featured Events"}
        events={dataFeaturedEvents}
        isLoading={isLoadingFeaturedEvents}
      />
      <Skeleton
        isLoaded={!isLoadingBanner}
        className="mb-16 h-[20vw] w-full rounded-lg"
      >
        <Image
          src={dataBanners && dataBanners[1]?.image}
          alt="single-banner"
          width={1920}
          height={500}
          className="h-[20vw] rounded-lg object-cover object-center"
        />
      </Skeleton>
      <HomeList
        title={"Latest Events"}
        events={dataLatestEvents}
        isLoading={isLoadingLatestEvents}
      />
    </div>
  );
}
