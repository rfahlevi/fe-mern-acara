import { DELAY, LIMIT_EVENT, PAGE_DEFAULT } from "@/constants/list.constants";
import useDebounce from "@/hooks/useDebounce";
import authServices from "@/services/auth.service";
import eventServices from "@/services/event.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";

const useLandingPageLayoutNavbar = () => {
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      setIsReady(true);
    }
  }, [router.isReady]);

  const getProfile = async () => {
    const { data } = await authServices.getProfile();

    return data.data;
  };

  const { data: dataProfile } = useQuery({
    queryKey: ["Profile"],
    queryFn: getProfile,
    enabled: isReady,
  });

  const [search, setSearch] = useState<string>("");
  const debounce = useDebounce();
  const getEventsSearch = async () => {
    const params = `limit=${LIMIT_EVENT}&page=${PAGE_DEFAULT}&isPublish=true&search=${search}`;

    const res = await eventServices.getEvents(params);
    const data = res.data?.data;

    return data;
  };

  const {
    data: dataEventsSearch,
    isRefetching: isRefecthingEventSearch,
    isLoading: isLoadingEventsSearch,
  } = useQuery({
    queryKey: ["EventsSearch", search],
    queryFn: getEventsSearch,
    enabled: !!search,
  });

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    debounce(() => setSearch(e.target.value), DELAY);
  };

  return {
    dataEventsSearch,
    dataProfile,
    isRefecthingEventSearch,
    isLoadingEventsSearch,
    handleSearch,
    search,
    setSearch,
  };
};

export default useLandingPageLayoutNavbar;
