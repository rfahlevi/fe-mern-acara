import bannerServices from "@/services/banner.service";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const useDeleteBannerModal = () => {
  const deleteBanner = async (id: string) => {
    const res = await bannerServices.deleteBanner(id);
    return res;
  };

  const {
    mutate: mutateDeleteBanner,
    isPending: isPendingMutateDeleteBanner,
    isSuccess: isSuccessMutateDeleteBanner,
  } = useMutation({
    mutationFn: deleteBanner,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Success delete banner!");
    },
  });

  return {
    mutateDeleteBanner,
    isPendingMutateDeleteBanner,
    isSuccessMutateDeleteBanner,
  };
};

export default useDeleteBannerModal;
