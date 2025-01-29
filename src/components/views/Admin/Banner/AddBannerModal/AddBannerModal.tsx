import CustomInput from "@/components/ui/CustomInput";
import {
  AutocompleteItem,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "@heroui/react";
import React, { useEffect } from "react";
import { Controller } from "react-hook-form";
import InputFile from "@/components/ui/InputFile";
import CustomTextArea from "@/components/ui/CustomTextArea";
import useAddBannerModal from "./useAddBannerModal";
import CustomAutoComplete from "@/components/ui/CustomAutoComplete";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refectBanner: () => void;
}

export default function AddBannerModal(props: PropTypes) {
  const { isOpen, onClose, onOpenChange, refectBanner } = props;
  const {
    control,
    errors,
    handleFormSubmit,
    handleAddBanner,
    isPendingMutateAddBanner,
    isSuccessMutateAddBanner,
    handleUploadImage,
    isPendingMutateUploadFile,
    preview,
    handleDeleteImage,
    isPendingMutateDeleteFile,
    handleOnClose,
  } = useAddBannerModal();

  useEffect(() => {
    if (isSuccessMutateAddBanner) {
      onClose();
      refectBanner();
    }
  }, [isSuccessMutateAddBanner]);

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
      <form onSubmit={handleFormSubmit(handleAddBanner)}>
        <ModalContent className="m-4">
          <ModalHeader>Add Banner</ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <p className="font-semibold">Information</p>
                <Controller
                  name="title"
                  control={control}
                  render={({ field }) => (
                    <CustomInput
                      {...field}
                      autoFocus
                      label="Title"
                      variant="bordered"
                      labelPlacement="inside"
                      type="text"
                      isInvalid={errors.title !== undefined}
                      errorMessage={errors.title?.message}
                    />
                  )}
                />
                <Controller
                  name="isShow"
                  control={control}
                  render={({ field: { onChange, ...field } }) => (
                    <CustomAutoComplete
                      {...field}
                      label="Status"
                      variant="bordered"
                      labelPlacement="inside"
                      placeholder="Select or search status"
                      defaultSelectedKey="false"
                      onSelectionChange={(value) => onChange(value)}
                      isInvalid={errors.isShow !== undefined}
                      errorMessage={errors.isShow?.message}
                    >
                      <AutocompleteItem key="true" value="true">
                        Show
                      </AutocompleteItem>
                      <AutocompleteItem key="false" value="false">
                        Hide
                      </AutocompleteItem>
                    </CustomAutoComplete>
                  )}
                />
              </div>

              <div className="flex flex-col gap-2">
                <p className="font-semibold">Image</p>
                <Controller
                  name="image"
                  control={control}
                  render={({ field: { onChange, value, ...field } }) => (
                    <InputFile
                      {...field}
                      name="image"
                      isDropable
                      onDelete={() => handleDeleteImage(onChange)}
                      onUpload={(files: FileList) =>
                        handleUploadImage(files, onChange)
                      }
                      isUploading={isPendingMutateUploadFile}
                      isDeleting={isPendingMutateDeleteFile}
                      isInvalid={errors.image !== undefined}
                      errorMessage={errors.image?.message}
                      preview={typeof preview === "string" ? preview : ""}
                    />
                  )}
                />
              </div>
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
              {isPendingMutateAddBanner ? (
                <div className="flex gap-2">
                  <Spinner color="white" size="sm" />
                  Loading...
                </div>
              ) : (
                "Create Banner"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
}
