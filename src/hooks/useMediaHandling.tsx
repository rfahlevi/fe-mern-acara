import uploadServices from "@/services/upload.service";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const useMediaHandling = () => {
  const uploadIcon = async (
    file: File,
    callback: (fileUrl: string) => void,
  ) => {
    const formData = new FormData();
    formData.append("file", file);

    const {
      data: {
        data: { secure_url: icon },
      },
    } = await uploadServices.uploadFile(formData);

    callback(icon);
  };

  const { mutate: mutateDeleteFile, isPending: isPendingMutateDeleteFile } =
    useMutation({
      mutationFn: (variables: { fileUrl: string; callback: () => void }) =>
        deleteIcon(variables.fileUrl, variables.callback),
      onError: (error) => {
        toast.error(error.message);
      },
    });

  const deleteIcon = async (fileUrl: string, callback: () => void) => {
    const res = await uploadServices.deleteFile({ fileUrl });

    if (res.data.meta.status === 200) {
      callback();
    }
  };

  const { mutate: mutateUploadFile, isPending: isPendingMutateUploadFile } =
    useMutation({
      mutationFn: (variables: {
        file: File;
        callback: (fileUrl: string) => void;
      }) => uploadIcon(variables.file, variables.callback),
      onError: (error) => {
        toast.error(error.message);
      },
    });

  return {
    mutateUploadFile,
    isPendingMutateUploadFile,
    mutateDeleteFile,
    isPendingMutateDeleteFile,
  };
};

export default useMediaHandling;
