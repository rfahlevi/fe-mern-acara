import React from "react";
import HomeSlider from "./HomeSlider";
import useHome from "./useHome";

export default function Home() {
  const { dataBanner, isLoadingBanner } = useHome();

  return (
    <div>
      <HomeSlider banners={dataBanner} isLoadingBanners={isLoadingBanner} />
    </div>
  );
}
