import InputFile from "@/components/ui/InputFile";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Skeleton,
  Spinner,
} from "@heroui/react";
import Image from "next/image";
import React, { useEffect } from "react";
import usePictureTab from "./usePictureTab";
import { Controller } from "react-hook-form";
import { IProfile } from "@/types/Auth";

interface PropTypes {
  currentPicture: string;
  onUpdate: (data: IProfile) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

export default function PictureTab(props: PropTypes) {
  const { currentPicture, onUpdate, isPendingUpdate, isSuccessUpdate } = props;

  const {
    handleDeletePicture,
    handleUploadPicture,
    isPendingMutateDeleteFile,
    isPendingMutateUploadFile,

    controlUpdatePicture,
    handleSubmitUpdatePicture,
    errorsUpdatePicture,
    resetUpdatePicture,

    preview,
  } = usePictureTab();

  useEffect(() => {
    if (isSuccessUpdate) {
      resetUpdatePicture();
    }
  }, [isSuccessUpdate]);

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">Profile Picture</h1>
        <p className="w-full text-sm text-default-400">
          Manage picture this event
        </p>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdatePicture(onUpdate)}
        >
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-default-700">
              Current Picture
            </p>
            <Skeleton
              isLoaded={!!currentPicture}
              className="aspect-square w-1/2 self-center rounded-lg"
            >
              {currentPicture && (
                <Avatar
                  src={currentPicture}
                  alt="Profile Picture"
                  showFallback
                  className="aspect-square h-full w-full"
                />
              )}
            </Skeleton>
          </div>
          <Controller
            name="profilePicture"
            control={controlUpdatePicture}
            render={({ field: { onChange, value, ...field } }) => (
              <InputFile
                {...field}
                name="picture"
                label={
                  <p className="mb-1 text-sm font-medium text-default-700">
                    Upload New Picture
                  </p>
                }
                isDropable
                onDelete={() => handleDeletePicture(onChange)}
                onUpload={(files: FileList) =>
                  handleUploadPicture(files, onChange)
                }
                isUploading={isPendingMutateUploadFile}
                isDeleting={isPendingMutateDeleteFile}
                isInvalid={errorsUpdatePicture?.profilePicture !== undefined}
                errorMessage={errorsUpdatePicture?.profilePicture?.message}
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
