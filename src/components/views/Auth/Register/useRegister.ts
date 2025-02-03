import authServices from "@/services/auth.service";
import { IRegister } from "@/types/Auth";
import { CustomError } from "@/types/CustomError";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as yup from "yup";

const registerSchema = yup.object().shape({
  fullName: yup.string().required("Please enter your full name"),
  username: yup.string().required("Please enter your username"),
  email: yup
    .string()
    .required("Please enter your email")
    .email("Email format is invalid"),
  password: yup
    .string()
    .required("Please enter your password")
    .min(8, "Password must be at least 8 characters"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), ""], "Passwords not match")
    .required("Please enter your password confirmation"),
});

const useRegister = () => {
  const router = useRouter();
  const [visiblePassword, setVisiblePassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const handleVisiblePassword = (key: "password" | "confirmPassword") => {
    setVisiblePassword({
      ...visiblePassword,
      [key]: !visiblePassword[key],
    });
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const registerService = async (payload: IRegister) => {
    const result = await authServices.register(payload);
    return result;
  };

  const { mutate: mutateRegister, isPending: isPendingRegister } = useMutation({
    mutationFn: registerService,
    onMutate(variables) {
      console.log("Mutate", variables);
    },
    onError(error) {
      const customError = error as CustomError;
      toast.error(customError.response?.data?.meta?.message ?? error.message);
      //   setError("root", {
      //     message:
      //       customError.response?.data?.meta?.message ?? error.message,
      //   });
    },

    onSuccess: () => {
      router.push("/auth/register/success");
      reset();
    },
  });

  const handleRegister = (data: IRegister) => mutateRegister(data);

  return {
    visiblePassword,
    handleVisiblePassword,
    control,
    handleSubmit,
    handleRegister,
    isPendingRegister,
    errors,
  };
};

export default useRegister;
