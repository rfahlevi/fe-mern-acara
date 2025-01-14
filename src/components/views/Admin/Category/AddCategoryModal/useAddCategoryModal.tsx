import useMediaHandling from "@/hooks/useMediaHandling";
import categoryServices from "@/services/category.service";
import { ICategory } from "@/types/Category";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Please input name"),
  description: yup.string().required("Please input category"),
  icon: yup.mixed<FileList | string>().required("Please input icon"),
});

const useAddCategoryModal = () => {
  const {
    mutateUploadFile,
    isPendingMutateUploadFile,
    mutateDeleteFile,
    isPendingMutateDeleteFile,
  } = useMediaHandling();

  const {
    control,
    handleSubmit: handleFormSubmit,
    formState: { errors },
    reset,
    watch,
    getValues,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const preview = watch("icon");

  const handleUploadIcon = (
    files: FileList,
    onChange: (files: FileList | undefined) => void,
  ) => {
    if (files.length !== 0) {
      onChange(files);
      mutateUploadFile({
        file: files[0],
        callback: (fileUrl: string) => {
          setValue("icon", fileUrl);
        },
      });
    }
  };

  const handleDeleteIcon = (
    onChange: (files: FileList | undefined) => void,
  ) => {
    const fileUrl = getValues("icon");

    if (typeof fileUrl === "string") {
      mutateDeleteFile({ fileUrl, callback: () => onChange(undefined) });
    }
  };

  const handleOnClose = (onClose: () => void) => {
    const fileUrl = getValues("icon");

    if (typeof fileUrl === "string") {
      mutateDeleteFile({
        fileUrl,
        callback: () => {
          reset();
          onClose();
        },
      });
    } else {
      reset();
      onClose();
    }
  };

  const addCategory = async (payload: ICategory) => {
    const res = await categoryServices.addCategory(payload);
    return res;
  };

  const {
    mutate: mutateAddCategory,
    isPending: isPendingMutateAddCategory,
    isSuccess: isSuccessMutateAddCategory,
  } = useMutation({
    mutationFn: addCategory,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Success add new category!");
      reset();
    },
  });

  const handleAddCategory = (data: ICategory) => mutateAddCategory(data);

  return {
    control,
    errors,
    reset,
    handleAddCategory,
    handleFormSubmit,
    isPendingMutateAddCategory,
    isSuccessMutateAddCategory,

    preview,
    handleUploadIcon,
    isPendingMutateUploadFile,
    handleDeleteIcon,
    isPendingMutateDeleteFile,

    handleOnClose,
  };
};

export default useAddCategoryModal;
