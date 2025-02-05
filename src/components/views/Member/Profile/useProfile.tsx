import authServices from "@/services/auth.service";
import { IProfile } from "@/types/Auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { toast } from "sonner";

const useProfile = () => {
  const { isReady } = useRouter();

  const getProfile = async () => {
    const { data } = await authServices.getProfile();

    return data.data;
  };

  const { data: dataProfile, refetch: refetchProfile } = useQuery({
    queryKey: ["DashboardProfile"],
    queryFn: getProfile,
    enabled: isReady,
  });

  const updateProfile = async (payload: IProfile) => {
    const { data } = await authServices.updateProfile(payload);
    return data.data;
  };

  const {
    mutate: mutateUpdateProfile,
    isPending: isPendingMutateUpdateProfile,
    isSuccess: isSuccessMutateUpdateProfile,
  } = useMutation({
    mutationFn: (payload: IProfile) => updateProfile(payload),
    onError: (error) => {
      toast.error(error.message);
    },

    onSuccess: () => {
      refetchProfile();
      toast.success("Success update profile!");
    },
  });

  const handleUpdateProfile = (data: IProfile) => mutateUpdateProfile(data);

  return {
    dataProfile,
    handleUpdateProfile,
    isPendingMutateUpdateProfile,
    isSuccessMutateUpdateProfile,
  };
};

export default useProfile;
