import orderServices from "@/services/order.service";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const useDeleteTransactionModal = () => {
  const deleteTransaction = async (id: string) => {
    const res = await orderServices.deleteOrderById(id);
    return res;
  };

  const {
    mutate: mutateDeleteTransaction,
    isPending: isPendingMutateDeleteTransaction,
    isSuccess: isSuccessMutateDeleteTransaction,
  } = useMutation({
    mutationFn: deleteTransaction,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Success delete transaction!");
    },
  });

  return {
    mutateDeleteTransaction,
    isPendingMutateDeleteTransaction,
    isSuccessMutateDeleteTransaction,
  };
};

export default useDeleteTransactionModal;
