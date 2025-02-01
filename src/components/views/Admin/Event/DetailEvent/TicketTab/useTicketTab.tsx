import ticketServices from "@/services/ticket.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";

const useTicketTab = () => {
  const { query, isReady } = useRouter();

  const getTicketByEventId = async () => {
    const { data } = await ticketServices.getTicketsByEventId(`${query.id}`);

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
