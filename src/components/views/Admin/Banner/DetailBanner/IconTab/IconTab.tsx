import InputFile from "@/components/ui/InputFile";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Skeleton,
  Spinner,
} from "@nextui-org/react";
import Image from "next/image";
import React, { useEffect } from "react";
import useIconTab from "./useIconTab";
import { Controller } from "react-hook-form";
import { ICategory } from "@/types/Category";

interface PropTypes {
  currentIcon: string;
  onUpdate: (data: ICategory) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

export default function IconTab(props: PropTypes) {
  const { currentIcon, onUpdate, isPendingUpdate, isSuccessUpdate } = props;

  const {
    handleDeleteIcon,
    handleUploadIcon,
    isPendingMutateDeleteFile,
    isPendingMutateUploadFile,

    controlUpdateIcon,
    handleSubmitUpdateIcon,
    errorsUpdateIcon,
    resetUpdateIcon,

    preview,
  } = useIconTab();

  useEffect(() => {
    if (isSuccessUpdate) {
      resetUpdateIcon();
    }
  }, [isSuccessUpdate]);

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">Category Icon</h1>
        <p className="w-full text-sm text-default-400">
          Manager icon this category
        </p>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdateIcon(onUpdate)}
        >
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-default-700">Current Icon</p>
            <Skeleton
              isLoaded={!!currentIcon}
              className="aspect-square rounded-lg"
            >
              <Image
                src={currentIcon}
                alt="Category Icon"
                fill
                className="!relative"
              />
            </Skeleton>
          </div>
          <Controller
            name="icon"
            control={controlUpdateIcon}
            render={({ field: { onChange, value, ...field } }) => (
              <InputFile
                {...field}
                name="icon"
                label={
                  <p className="mb-1 text-sm font-medium text-default-700">
                    Upload New Icon
                  </p>
                }
                isDropable
                onDelete={() => handleDeleteIcon(onChange)}
                onUpload={(files: FileList) =>
                  handleUploadIcon(files, onChange)
                }
                isUploading={isPendingMutateUploadFile}
                isDeleting={isPendingMutateDeleteFile}
                isInvalid={errorsUpdateIcon?.icon !== undefined}
                errorMessage={errorsUpdateIcon?.icon?.message}
                preview={typeof preview === "string" ? preview : ""}
              />
            )}
          />
          <Button
            type="submit"
            color="danger"
            className="mt-2 disabled:bg-default-500"
            disabled={isPendingMutateUploadFile || isPendingUpdate || !preview}
          >
            {isPendingUpdate ? (
              <div className="flex gap-2">
                <Spinner color="white" size="sm" />
                Loading...
              </div>
            ) : (
              "Save Changes"
            )}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}
