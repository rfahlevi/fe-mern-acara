import bannerServices from "@/services/banner.service";
import {
  LIMIT_BANNER,
  LIMIT_CATEGORY,
  LIMIT_EVENT,
  PAGE_DEFAULT,
} from "@/constants/list.constants";
import { useQuery } from "@tanstack/react-query";
import eventServices from "@/services/event.service";
import categoryServices from "@/services/category.service";

const useHome = () => {
  const getBanners = async () => {
    let params = `limit=${LIMIT_BANNER}&page=${PAGE_DEFAULT}`;

    const res = await bannerServices.getBanners(params);
    const data = res.data?.data;

    return data;
  };

  const { data: dataBanners, isLoading: isLoadingBanner } = useQuery({
    queryKey: ["Banners"],
    queryFn: getBanners,
    enabled: true,
  });

  const eventQuery = `limit=${LIMIT_EVENT}&page=${PAGE_DEFAULT}&isPublished=true`;

  const getFeaturedEvents = async (params: string) => {
    const res = await eventServices.getEvents(params);
    const data = res.data?.data;

    return data;
  };

  const { data: dataFeaturedEvents, isLoading: isLoadingFeaturedEvents } =
    useQuery({
      queryKey: ["FeaturedEvents"],
      queryFn: () => getFeaturedEvents(`${eventQuery}&isFeatured=true`),
      enabled: true,
    });

  const getLatestEvents = async (params: string) => {
    const res = await eventServices.getEvents(params);
    const data = res.data?.data;

    return data;
  };

  const { data: dataLatestEvents, isLoading: isLoadingLatestEvents } = useQuery(
    {
      queryKey: ["LatestEvents"],
      queryFn: () => getLatestEvents(`${eventQuery}`),
      enabled: true,
    },
  );

  const getCategories = async () => {
    let params = `limit=${LIMIT_CATEGORY}&page=${PAGE_DEFAULT}`;

    const res = await categoryServices.getCategories(params);
    const data = res;

    return data;
  };

  const { data: dataCategories, isLoading: isLoadingCategories } = useQuery({
    queryKey: ["Categories"],
    queryFn: getCategories,
    enabled: true,
  });

  return {
    dataBanners,
    dataCategories,
    dataFeaturedEvents,
    dataLatestEvents,
    isLoadingBanner,
    isLoadingCategories,
    isLoadingFeaturedEvents,
    isLoadingLatestEvents,
  };
};

export default useHome;
