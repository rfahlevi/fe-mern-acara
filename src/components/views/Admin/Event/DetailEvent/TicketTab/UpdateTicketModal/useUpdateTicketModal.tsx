import { onErrorHandler } from "@/libs/axios/responseHandler";
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

const useUpdateTicketModal = (id: string) => {
  const router = useRouter();

  const {
    control,
    handleSubmit: handleFormSubmit,
    formState: { errors },
    reset,
    setValue: setValueUpdateTicket,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const updateTicket = async (payload: ITicket) => {
    const res = await ticketServices.updateTicket(id, payload);
    return res;
  };

  const {
    mutate: mutateUpdateTicket,
    isPending: isPendingMutateUpdateTicket,
    isSuccess: isSuccessMutateUpdateTicket,
  } = useMutation({
    mutationFn: updateTicket,
    onError: (error) => {
      onErrorHandler(error);
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Success update new ticket!");
      reset();
    },
  });

  const handleUpdateTicket = (data: ITicket) => {
    data.events = `${router.query.id}`;
    data.price = Number(data.price);
    data.quantity = Number(data.quantity);

    mutateUpdateTicket(data);
  };

  return {
    control,
    errors,
    reset,
    handleUpdateTicket,
    handleFormSubmit,
    isPendingMutateUpdateTicket,
    isSuccessMutateUpdateTicket,
    setValueUpdateTicket,
  };
};

export default useUpdateTicketModal;
