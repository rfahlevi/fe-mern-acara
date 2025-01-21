import ticketServices from "@/services/ticket.service";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const useDeleteTicketModal = () => {
  const deleteTicket = async (id: string) => {
    const res = await ticketServices.deleteTicket(id);
    return res;
  };

  const {
    mutate: mutateDeleteTicket,
    isPending: isPendingMutateDeleteTicket,
    isSuccess: isSuccessMutateDeleteTicket,
  } = useMutation({
    mutationFn: deleteTicket,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Success delete ticket!");
    },
  });

  return {
    mutateDeleteTicket,
    isPendingMutateDeleteTicket,
    isSuccessMutateDeleteTicket,
  };
};

export default useDeleteTicketModal;
