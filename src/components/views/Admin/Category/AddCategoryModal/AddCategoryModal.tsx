import CustomInput from "@/components/ui/CustomInput";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  Textarea,
} from "@nextui-org/react";
import React, { useEffect } from "react";
import useAddCategoryModal from "./useAddCategoryModal";
import { Controller } from "react-hook-form";
import InputFile from "@/components/ui/InputFile";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refectCategory: () => void;
}

export default function AddCategoryModal(props: PropTypes) {
  const { isOpen, onClose, onOpenChange, refectCategory } = props;
  const {
    control,
    errors,
    handleFormSubmit,
    handleAddCategory,
    isPendingMutateAddCategory,
    isSuccessMutateAddCategory,
    handleUploadIcon,
    isPendingMutateUploadFile,
    preview,
    handleDeleteIcon,
    isPendingMutateDeleteFile,
    handleOnClose,
  } = useAddCategoryModal();

  useEffect(() => {
    if (isSuccessMutateAddCategory) {
      onClose();
      refectCategory();
    }
  }, [isSuccessMutateAddCategory]);

  const disabledSubmit =
    isPendingMutateUploadFile ||
    isPendingMutateUploadFile ||
    isPendingMutateDeleteFile;

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="center"
      scrollBehavior="inside"
      onClose={() => handleOnClose(onClose)}
    >
      <form onSubmit={handleFormSubmit(handleAddCategory)}>
        <ModalContent className="m-4">
          <ModalHeader>Add Category</ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-4">
              <p className="font-semibold">Information</p>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <CustomInput
                    {...field}
                    autoFocus
                    label="Name"
                    variant="bordered"
                    labelPlacement="inside"
                    type="text"
                    isInvalid={errors.name !== undefined}
                    errorMessage={errors.name?.message}
                  />
                )}
              />
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    label="Description"
                    variant="bordered"
                    type="text"
                    isInvalid={errors.description !== undefined}
                    errorMessage={errors.description?.message}
                  />
                )}
              />
              <p className="text-sm font-bold">Icon</p>
              <Controller
                name="icon"
                control={control}
                render={({ field: { onChange, value, ...field } }) => (
                  <InputFile
                    {...field}
                    name="icon"
                    isDropable
                    onDelete={() => handleDeleteIcon(onChange)}
                    onUpload={(files: FileList) =>
                      handleUploadIcon(files, onChange)
                    }
                    isUploading={isPendingMutateUploadFile}
                    isDeleting={isPendingMutateDeleteFile}
                    isInvalid={errors.icon !== undefined}
                    errorMessage={errors.icon?.message}
                    preview={typeof preview === "string" ? preview : ""}
                  />
                )}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              variant="flat"
              onPress={() => handleOnClose(onClose)}
              disabled={disabledSubmit}
            >
              Cancel
            </Button>
            <Button color="danger" type="submit" disabled={disabledSubmit}>
              {isPendingMutateAddCategory ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Create Category"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
}
