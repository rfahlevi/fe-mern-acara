import bannerServices from "@/services/banner.service";
import React from "react";
import { LIMIT_BANNER, PAGE_DEFAULT } from "@/constants/list.constants";
import { useQuery } from "@tanstack/react-query";

const useHome = () => {
  const getBanners = async () => {
    let params = `limit=${LIMIT_BANNER}&page=${PAGE_DEFAULT}`;

    const res = await bannerServices.getBanners(params);
    const data = res.data?.data;

    return data;
  };

  const { data: dataBanner, isLoading: isLoadingBanner } = useQuery({
    queryKey: ["Banners"],
    queryFn: () => getBanners(),
    enabled: true,
  });

  return {
    dataBanner,
    isLoadingBanner,
  };
};

export default useHome;
