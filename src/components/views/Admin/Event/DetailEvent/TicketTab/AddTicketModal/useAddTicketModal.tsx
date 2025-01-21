import useMediaHandling from "@/hooks/useMediaHandling";
import ticketServices from "@/services/ticket.service";
import { ITicket } from "@/types/Ticket";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as yup from "yup";

const schema = yup.object().shape({
  price: yup.string().required("Please input price"),
  name: yup.string().required("Please input name"),
  quantity: yup.string().required("Please input quantity"),
  description: yup.string().required("Please input description"),
});

const useAddTicketModal = () => {
  const router = useRouter();

  const {
    control,
    handleSubmit: handleFormSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const addTicket = async (payload: ITicket) => {
    const res = await ticketServices.addTicket(payload);
    return res;
  };

  const {
    mutate: mutateAddTicket,
    isPending: isPendingMutateAddTicket,
    isSuccess: isSuccessMutateAddTicket,
  } = useMutation({
    mutationFn: addTicket,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Success add new ticket!");
      reset();
    },
  });

  const handleAddTicket = (data: ITicket) => {
    data.events = `${router.query.id}`;
    data.price = Number(data.price);
    data.quantity = Number(data.quantity);

    mutateAddTicket(data);
  };

  return {
    control,
    errors,
    reset,
    handleAddTicket,
    handleFormSubmit,
    isPendingMutateAddTicket,
    isSuccessMutateAddTicket,
  };
};

export default useAddTicketModal;
