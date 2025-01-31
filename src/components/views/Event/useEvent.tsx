import useChangeUrl from "@/hooks/useChangeUrl";
import eventServices from "@/services/event.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect } from "react";

const useEvent = () => {
  const router = useRouter();
  const { currentLimit, currentPage } = useChangeUrl();
  const { setUrl } = useChangeUrl();

  useEffect(() => {
    if (router.isReady) {
      setUrl();
    }
  }, [router.isReady]);

  const getEvents = async () => {
    let params = `limit=${currentLimit}&page=${currentPage}`;

    const res = await eventServices.getEvents(params);
    const data = res?.data;
    return data;
  };

  const {
    data: dataEvents,
    isLoading: isLoadingEvents,
    isRefetching: isRefetchingEvents,
    refetch: refetchEvents,
  } = useQuery({
    queryKey: ["ExploreEvents", currentPage, currentLimit],
    queryFn: () => getEvents(),
    enabled: router.isReady && !!currentPage && !!currentLimit,
  });

  return {
    dataEvents,
    isLoadingEvents,
    isRefetchingEvents,
    refetchEvents,
  };
};

export default useEvent;
