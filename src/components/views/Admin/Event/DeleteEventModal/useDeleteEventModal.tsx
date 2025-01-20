import eventServices from "@/services/event.service";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const useDeleteEventModal = () => {
  const deleteEvent = async (id: string) => {
    const res = await eventServices.deleteEvent(id);
    return res;
  };

  const {
    mutate: mutateDeleteEvent,
    isPending: isPendingMutateDeleteEvent,
    isSuccess: isSuccessMutateDeleteEvent,
  } = useMutation({
    mutationFn: deleteEvent,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Success delete event!");
    },
  });

  return {
    mutateDeleteEvent,
    isPendingMutateDeleteEvent,
    isSuccessMutateDeleteEvent,
  };
};

export default useDeleteEventModal;
