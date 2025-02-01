import HomeSlider from "./HomeSlider";
import useHome from "./useHome";
import HomeList from "./HomeEvents";
import HomeEvents from "./HomeEvents";
import HomeCategories from "./HomeCategories";
import HomeBanner from "./HomeBanner";

export default function Home() {
  const {
    dataBanners,
    dataCategories,
    dataFeaturedEvents,
    dataLatestEvents,
    isLoadingBanner,
    isLoadingCategories,
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
        seeMoreUrl="/events?isFeatured=true"
      />
      <HomeBanner
        bannerUrl={dataBanners && dataBanners[1]?.image}
        isLoadingBanner={isLoadingBanner}
      />
      <HomeEvents
        title={"Latest Events"}
        events={dataLatestEvents}
        isLoading={isLoadingLatestEvents}
      />
      <HomeCategories
        categories={dataCategories?.data?.data}
        isLoading={isLoadingCategories}
      />
    </div>
  );
}
