import eventServices from "@/services/event.service";
import { IEvent, IEventForm } from "@/types/Event";
import { toStandardDate } from "@/utils/date";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { toast } from "sonner";

const useDetailEvent = () => {
  const { query, isReady } = useRouter();

  const getEventById = async () => {
    const { data } = await eventServices.getEventById(`${query.id}`);

    return data.data;
  };

  const { data: dataEvent, refetch: refetchEvent } = useQuery({
    queryKey: ["Event"],
    queryFn: getEventById,
    enabled: isReady,
  });

  const getRegencyById = async (id: string) => {
    const { data } = await eventServices.getRegencyById(id);

    return data.data;
  };

  const { data: dataDefaultRegion, isPending: isPendingDefaultRegion } =
    useQuery({
      queryKey: ["defaultRegion"],
      queryFn: () => getRegencyById(`${dataEvent?.location?.region}`),
      enabled: !!dataEvent?.location?.region,
    });

  const updateEvent = async (payload: IEvent) => {
    const { data } = await eventServices.updateEvent(`${query.id}`, payload);
    return data.data;
  };

  const {
    mutate: mutateUpdateEvent,
    isPending: isPendingMutateUpdateEvent,
    isSuccess: isSuccessMutateUpdateEvent,
  } = useMutation({
    mutationFn: (payload: IEvent) => updateEvent(payload),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      refetchEvent();
      toast.success("Success update event!");
    },
  });

  const handleUpdateInfo = (data: IEventForm) => {
    const payload = {
      ...data,
      isFeatured: data.isFeatured === "true" ? true : false,
      isPublished: data.isPublished === "true" ? true : false,
      startDate: data.startDate ? toStandardDate(data.startDate) : "",
      endDate: data.endDate ? toStandardDate(data.endDate) : "",
    };

    // console.log("Payload", payload);

    mutateUpdateEvent(payload);
  };

  const handleUpdateLocation = (data: IEventForm) => {
    const payload = {
      isOnline: data.isOnline === "true" ? true : false,
      location: {
        region: `${data.region}`,
        coordinates: [Number(`${data.latitude}`), Number(`${data.longitude}`)],
        address: `${data.address}`,
      },
      banner: `${data.banner}`,
    };

    // console.log("Payload", payload);

    mutateUpdateEvent(payload);
  };

  const handleUpdateEvent = (data: IEvent) => mutateUpdateEvent(data);

  return {
    dataEvent,
    dataDefaultRegion,
    handleUpdateEvent,
    handleUpdateInfo,
    handleUpdateLocation,
    isPendingDefaultRegion,
    isPendingMutateUpdateEvent,
    isSuccessMutateUpdateEvent,
  };
};

export default useDetailEvent;
