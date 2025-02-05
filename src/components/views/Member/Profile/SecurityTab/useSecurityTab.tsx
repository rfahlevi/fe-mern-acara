import authServices from "@/services/auth.service";
import { IUpdatePassword } from "@/types/Auth";
import { CustomError } from "@/types/CustomError";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as yup from "yup";

const schemaUpdatePassword = yup.object().shape({
  oldPassword: yup.string().required("Please input your old password"),
  password: yup.string().required("Please input new password"),
  confirmPassword: yup.string().required("Please input confirm new password"),
});

const useSecurityTab = () => {
  const {
    control: controlUpdatePassword,
    handleSubmit: handleSubmitUpdatePassword,
    formState: { errors: errorsUpdatePassword },
    reset: resetUpdatePassword,
    setValue: setValueUpdatePassword,
  } = useForm({
    resolver: yupResolver(schemaUpdatePassword),
  });

  const updatePassword = async (payload: IUpdatePassword) => {
    const { data } = await authServices.updatePassword(payload);

    return data?.data;
  };

  const {
    mutate: mutateUpdatePassword,
    isPending: isPendingMutateUpdatePassword,
  } = useMutation({
    mutationFn: (payload: IUpdatePassword) => updatePassword(payload),
    onError: (error) => {
      const err = error as CustomError;
      toast.error(err?.response?.data?.meta?.message ?? error.message);
    },
    onSuccess: () => {
      resetUpdatePassword();
      setValueUpdatePassword("oldPassword", "");
      setValueUpdatePassword("password", "");
      setValueUpdatePassword("confirmPassword", "");
      signOut();
      toast.success(
        "Success update password!, please re-login using new password",
      );
    },
  });

  const handleUpdatePassword = (data: IUpdatePassword) =>
    mutateUpdatePassword(data);

  return {
    controlUpdatePassword,
    errorsUpdatePassword,
    isPendingMutateUpdatePassword,
    handleSubmitUpdatePassword,
    handleUpdatePassword,
  };
};

export default useSecurityTab;
