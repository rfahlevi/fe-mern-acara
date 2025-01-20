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
} from "@nextui-org/react";
import React, { useEffect } from "react";
import { Controller } from "react-hook-form";
import InputFile from "@/components/ui/InputFile";
import useAddEventModal from "./useAddEventModal";
import { ICategory } from "@/types/Category";
import CustomAutoComplete from "@/components/ui/CustomAutoComplete";
import CustomDatePicker from "@/components/ui/CustomDatePicker";
import { IRegency } from "@/types/Event";
import { getLocalTimeZone, now } from "@internationalized/date";
import CustomTextArea from "@/components/ui/CustomTextArea";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refectEvents: () => void;
}

export default function AddEventModal(props: PropTypes) {
  const { isOpen, onClose, onOpenChange, refectEvents } = props;
  const {
    control,
    errors,
    handleFormSubmit,
    handleAddEvent,
    isPendingMutateAddEvent,
    isSuccessMutateAddEvent,

    handleDeleteBanner,
    handleOnClose,
    handleUploadBanner,
    isPendingMutateDeleteFile,
    isPendingMutateUploadFile,
    preview,

    dataCategory,

    handleSearchRegency,
    isLoadingRegion,
    dataRegion,
    searchRegency,
  } = useAddEventModal();

  useEffect(() => {
    if (isSuccessMutateAddEvent) {
      onClose();
      refectEvents();
    }
  }, [isSuccessMutateAddEvent]);

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
      <form onSubmit={handleFormSubmit(handleAddEvent)}>
        <ModalContent className="m-4">
          <ModalHeader>Add Event</ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
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
                      isInvalid={errors.name !== undefined}
                      errorMessage={errors.name?.message}
                    />
                  )}
                />
                {/* <Controller
                  name="slug"
                  control={control}
                  render={({ field }) => (
                    <CustomInput
                      {...field}
                      label="Slug"
                      variant="bordered"
                      labelPlacement="inside"
                      isInvalid={errors.slug !== undefined}
                      errorMessage={errors.slug?.message}
                    />
                  )}
                /> */}
                <Controller
                  name="category"
                  control={control}
                  render={({ field: { onChange, ...field } }) => (
                    <CustomAutoComplete
                      {...field}
                      defaultItems={dataCategory?.data.data || []}
                      label="Category"
                      placeholder="Select or search category"
                      variant="bordered"
                      labelPlacement="inside"
                      isInvalid={errors.category !== undefined}
                      errorMessage={errors.category?.message}
                      onSelectionChange={(value) => onChange(value)}
                    >
                      {(category: ICategory) => (
                        <AutocompleteItem key={category._id}>
                          {category.name}
                        </AutocompleteItem>
                      )}
                    </CustomAutoComplete>
                  )}
                />
                <Controller
                  name="startDate"
                  control={control}
                  render={({ field }) => (
                    <CustomDatePicker
                      {...field}
                      label="Start Date"
                      variant="bordered"
                      labelPlacement="inside"
                      hideTimeZone
                      defaultValue={now(getLocalTimeZone())}
                      showMonthAndYearPickers
                      isInvalid={errors.startDate !== undefined}
                      errorMessage={errors.startDate?.message}
                    />
                  )}
                />
                <Controller
                  name="endDate"
                  control={control}
                  render={({ field }) => (
                    <CustomDatePicker
                      {...field}
                      label="End Date"
                      variant="bordered"
                      labelPlacement="inside"
                      hideTimeZone
                      defaultValue={now(getLocalTimeZone())}
                      showMonthAndYearPickers
                      isInvalid={errors.endDate !== undefined}
                      errorMessage={errors.endDate?.message}
                    />
                  )}
                />
                <div className="flex items-start justify-between gap-2">
                  <Controller
                    name="isPublished"
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
                        isInvalid={errors.isPublished !== undefined}
                        errorMessage={errors.isPublished?.message}
                      >
                        <AutocompleteItem key="true" value="true">
                          Publish
                        </AutocompleteItem>
                        <AutocompleteItem key="false" value="false">
                          Draft
                        </AutocompleteItem>
                      </CustomAutoComplete>
                    )}
                  />
                  <Controller
                    name="isFeatured"
                    control={control}
                    render={({ field: { onChange, ...field } }) => (
                      <CustomAutoComplete
                        {...field}
                        label="Fatured"
                        variant="bordered"
                        labelPlacement="inside"
                        placeholder="Select or search status"
                        defaultSelectedKey="false"
                        onSelectionChange={(value) => onChange(value)}
                        isInvalid={errors.isFeatured !== undefined}
                        errorMessage={errors.isFeatured?.message}
                      >
                        <AutocompleteItem key="true" value="true">
                          Yes
                        </AutocompleteItem>
                        <AutocompleteItem key="false" value="false">
                          No
                        </AutocompleteItem>
                      </CustomAutoComplete>
                    )}
                  />
                </div>
                <Controller
                  name="isOnline"
                  control={control}
                  render={({ field: { onChange, ...field } }) => (
                    <CustomAutoComplete
                      {...field}
                      label="Online / Offline"
                      variant="bordered"
                      labelPlacement="inside"
                      placeholder="Select or search status"
                      defaultSelectedKey="false"
                      onSelectionChange={(value) => onChange(value)}
                      isInvalid={errors.isOnline !== undefined}
                      errorMessage={errors.isOnline?.message}
                    >
                      <AutocompleteItem key="true" value="true">
                        Yes
                      </AutocompleteItem>
                      <AutocompleteItem key="false" value="false">
                        No
                      </AutocompleteItem>
                    </CustomAutoComplete>
                  )}
                />
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <CustomTextArea
                      {...field}
                      label="Description"
                      variant="bordered"
                      labelPlacement="inside"
                      type="text"
                      isInvalid={errors.description !== undefined}
                      errorMessage={errors.description?.message}
                    />
                  )}
                />
              </div>

              <div className="flex flex-col gap-2">
                <p className="font-semibold">Location</p>
                <Controller
                  name="region"
                  control={control}
                  render={({ field: { onChange, ...field } }) => (
                    <CustomAutoComplete
                      {...field}
                      defaultItems={
                        (dataRegion?.data.data && searchRegency !== ""
                          ? dataRegion?.data.data
                          : []) || []
                      }
                      label="City"
                      placeholder="Search city"
                      variant="bordered"
                      labelPlacement="inside"
                      isLoading={isLoadingRegion}
                      onInputChange={(search) => handleSearchRegency(search)}
                      isInvalid={errors.region !== undefined}
                      errorMessage={errors.region?.message}
                      onSelectionChange={(value) => onChange(value)}
                    >
                      {(regency: IRegency) => (
                        <AutocompleteItem key={regency.id}>
                          {regency.name}
                        </AutocompleteItem>
                      )}
                    </CustomAutoComplete>
                  )}
                />
                <div className="flex items-start justify-between gap-2">
                  <Controller
                    name="latitude"
                    control={control}
                    render={({ field }) => (
                      <CustomInput
                        {...field}
                        label="Latitude"
                        variant="bordered"
                        labelPlacement="inside"
                        value={String(field.value ?? "")}
                        isInvalid={errors.latitude !== undefined}
                        errorMessage={errors.latitude?.message}
                      />
                    )}
                  />
                  <Controller
                    name="longitude"
                    control={control}
                    render={({ field }) => (
                      <CustomInput
                        {...field}
                        label="Longitude"
                        variant="bordered"
                        labelPlacement="inside"
                        value={String(field.value ?? "")}
                        isInvalid={errors.longitude !== undefined}
                        errorMessage={errors.longitude?.message}
                      />
                    )}
                  />
                </div>
                <Controller
                  name="address"
                  control={control}
                  render={({ field }) => (
                    <CustomTextArea
                      {...field}
                      label="Address"
                      variant="bordered"
                      labelPlacement="inside"
                      type="text"
                      isInvalid={errors.address !== undefined}
                      errorMessage={errors.address?.message}
                    />
                  )}
                />
              </div>

              <div className="flex flex-col gap-2">
                <p className="font-semibold">Cover</p>
                <Controller
                  name="banner"
                  control={control}
                  render={({ field: { onChange, value, ...field } }) => (
                    <InputFile
                      {...field}
                      name="banner"
                      isDropable
                      onDelete={() => handleDeleteBanner(onChange)}
                      onUpload={(files: FileList) =>
                        handleUploadBanner(files, onChange)
                      }
                      isUploading={isPendingMutateUploadFile}
                      isDeleting={isPendingMutateDeleteFile}
                      isInvalid={errors.banner !== undefined}
                      errorMessage={errors.banner?.message}
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
              {isPendingMutateAddEvent ? (
                <div className="flex gap-2">
                  <Spinner color="white" size="sm" />
                  Loading...
                </div>
              ) : (
                "Create Event"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
}
