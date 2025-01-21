import ticketServices from "@/services/ticket.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useTicketTab = () => {
  const { query, isReady } = useRouter();

  const getTicketByEventId = async () => {
    const { data } = await ticketServices.getTicketByTicketId(`${query.id}`);

    return data.data;
  };

  const {
    data: dataTicket,
    isPending: isPendingTicket,
    isRefetching: isRefetchingTicket,
    refetch: refetchTicket,
  } = useQuery({
    queryKey: ["Tickets"],
    queryFn: getTicketByEventId,
    enabled: isReady,
  });

  return {
    dataTicket,
    isPendingTicket,
    isRefetchingTicket,
    refetchTicket,
  };
};

export default useTicketTab;
