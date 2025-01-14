import { cn } from "@/utils/cn";
import { Button, Spinner } from "@nextui-org/react";
import { div } from "framer-motion/client";
import Image from "next/image";
import React, { ChangeEvent, useEffect, useId, useRef, useState } from "react";
import { CiTrash } from "react-icons/ci";
import { FaImage } from "react-icons/fa";

interface PropTypes {
  className?: string;
  errorMessage?: string;
  isDropable?: boolean;
  isDeleting?: boolean;
  isInvalid?: boolean;
  isUploading?: boolean;
  name: string;
  onDelete?: () => void;
  onUpload?: (files: FileList) => void;
  preview?: string;
}

export default function InputFile(props: PropTypes) {
  const {
    errorMessage,
    className,
    isDeleting,
    isDropable = false,
    isUploading,
    isInvalid,
    name,
    onDelete,
    onUpload,
    preview,
  } = props;
  const drop = useRef<HTMLLabelElement>(null);
  const dropzoneId = useId();

  const handleDragOver = (e: DragEvent) => {
    if (isDropable) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer?.files;

    if (files && onUpload) {
      onUpload(files);
    }
  };

  useEffect(() => {
    const dropCurrent = drop.current;
    if (dropCurrent) {
      dropCurrent.addEventListener("dragover", handleDragOver);
      dropCurrent.addEventListener("drop", handleDrop);

      return () => {
        dropCurrent.removeEventListener("dragover", handleDragOver);
        dropCurrent.removeEventListener("drop", handleDrop);
      };
    }
  }, []);

  const handleOnUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget?.files;

    if (files && onUpload) {
      onUpload(files);
    }
  };

  return (
    <div>
      <label
        ref={drop}
        htmlFor={`dropzone-file-${dropzoneId}`}
        className={cn(
          "flex min-h-24 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 transition-colors duration-200 hover:bg-gray-100",
          {
            "border-danger-500": isInvalid,
          },
          className,
        )}
      >
        {preview && (
          <div className="relative flex w-full flex-col items-center justify-center p-5">
            <Image
              src={preview}
              alt="image"
              width={100}
              height={100}
              className="!relative rounded-md"
            />
            <Button
              isIconOnly
              onPress={onDelete}
              disabled={isDeleting}
              className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded bg-danger-100"
            >
              {isDeleting ? (
                <Spinner size="sm" color="danger" />
              ) : (
                <CiTrash className="h-5 w-5 text-danger-500" />
              )}
            </Button>
          </div>
        )}

        {!preview && !isUploading && (
          <div className="flex flex-col items-center justify-center p-5">
            <FaImage className="mb-2 h-10 w-10 text-gray-400" />
            <p className="text-center text-sm font-semibold text-gray-500">
              {isDropable
                ? "Drag & drop or click to upload image here"
                : "Click to upload image here"}
            </p>
          </div>
        )}

        {isUploading && (
          <div className="flex flex-col items-center justify-center p-5">
            <Spinner color="danger" />
          </div>
        )}
        <input
          type="file"
          className="hidden"
          accept="image/*"
          id={`dropzone-file-${dropzoneId}`}
          name={name}
          onChange={handleOnUpload}
          disabled={preview !== ""}
          onClick={(e) => {
            e.currentTarget.value = "";
            e.target.dispatchEvent(new Event("change", { bubbles: true }));
          }}
        />
      </label>
      {isInvalid && (
        <p className="p-1 text-xs text-danger-500">{errorMessage}</p>
      )}
    </div>
  );
}
