import { CustomError } from "@/types/CustomError";
import { signOut } from "next-auth/react";

const onErrorHandler = (error: Error) => {
  const { response } = error as CustomError;

  const status = response?.data?.meta?.status;
  if (response && status === 401) {
    signOut();
  }
};

export { onErrorHandler };
