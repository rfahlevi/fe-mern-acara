import CustomInput from "@/components/ui/CustomInput";
import CustomTextArea from "@/components/ui/CustomTextArea";
import {
  AutocompleteItem,
  Button,
  Card,
  CardBody,
  CardHeader,
  Skeleton,
  Spinner,
} from "@heroui/react";
import React, { useEffect } from "react";
import useInfoTab from "./useInfoTab";
import { Controller } from "react-hook-form";
import { IEventForm } from "@/types/Event";
import CustomAutoComplete from "@/components/ui/CustomAutoComplete";
import { ICategory } from "@/types/Category";
import CustomDatePicker from "@/components/ui/CustomDatePicker";
import { toInputDate } from "@/utils/date";

interface PropTypes {
  dataEvent: IEventForm;
  onUpdate: (data: IEventForm) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

export default function InfoTab(props: PropTypes) {
  const { dataEvent, onUpdate, isPendingUpdate, isSuccessUpdate } = props;
  const {
    controlUpdateInfo,
    dataCategory,
    errorsUpdateInfo,
    handleSubmitUpdateInfo,
    isLoadingCategory,
    resetUpdateInfo,
    setValueUpdateInfo,
  } = useInfoTab();

  useEffect(() => {
    if (dataEvent && dataCategory) {
      setValueUpdateInfo("name", `${dataEvent?.name}`);
      setValueUpdateInfo("description", `${dataEvent?.description}`);
      setValueUpdateInfo("category", `${dataEvent?.category}`);
      setValueUpdateInfo("startDate", toInputDate(`${dataEvent?.startDate}`));
      setValueUpdateInfo("endDate", toInputDate(`${dataEvent?.endDate}`));
      setValueUpdateInfo("isPublished", `${dataEvent?.isPublished}`);
      setValueUpdateInfo("isFeatured", `${dataEvent?.isFeatured}`);
    }
  }, [dataEvent, dataCategory]);

  useEffect(() => {
    if (isSuccessUpdate) {
      resetUpdateInfo();
    }
  }, [isSuccessUpdate]);

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">Event Information</h1>
        <p className="w-full text-sm text-default-400">
          Manager information of this event
        </p>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdateInfo(onUpdate)}
        >
          <Skeleton isLoaded={!!dataEvent?.name} className="rounded-lg">
            <Controller
              name="name"
              control={controlUpdateInfo}
              render={({ field }) => (
                <CustomInput
                  {...field}
                  label="Name"
                  variant="bordered"
                  labelPlacement="outside"
                  type="text"
                  isInvalid={errorsUpdateInfo.name !== undefined}
                  errorMessage={errorsUpdateInfo?.name?.message}
                  defaultValue={dataEvent?.name}
                />
              )}
            />
          </Skeleton>
          <Skeleton isLoaded={!!dataEvent?.category} className="rounded-lg">
            <Controller
              name="category"
              control={controlUpdateInfo}
              render={({ field: { onChange, ...field } }) => (
                <CustomAutoComplete
                  {...field}
                  defaultItems={dataCategory?.data.data || []}
                  label="Category"
                  placeholder="Select or search category"
                  variant="bordered"
                  labelPlacement="outside"
                  isInvalid={errorsUpdateInfo.category !== undefined}
                  errorMessage={errorsUpdateInfo.category?.message}
                  onSelectionChange={(value) => onChange(value)}
                  isLoading={isLoadingCategory}
                  disabled={isLoadingCategory}
                  defaultSelectedKey={dataEvent?.category}
                  onChange={(value) => onChange(value)}
                >
                  {(category: ICategory) => (
                    <AutocompleteItem key={category._id}>
                      {category.name}
                    </AutocompleteItem>
                  )}
                </CustomAutoComplete>
              )}
            />
          </Skeleton>
          <Skeleton isLoaded={!!dataEvent?.startDate} className="rounded-lg">
            <Controller
              name="startDate"
              control={controlUpdateInfo}
              render={({ field }) => (
                <CustomDatePicker
                  {...field}
                  label="Start Date"
                  variant="bordered"
                  labelPlacement="outside"
                  hideTimeZone
                  // defaultValue={}
                  showMonthAndYearPickers
                  isInvalid={errorsUpdateInfo.startDate !== undefined}
                  errorMessage={errorsUpdateInfo.startDate?.message}
                />
              )}
            />
          </Skeleton>
          <Skeleton isLoaded={!!dataEvent?.endDate} className="rounded-lg">
            <Controller
              name="endDate"
              control={controlUpdateInfo}
              render={({ field }) => (
                <CustomDatePicker
                  {...field}
                  label="End Date"
                  variant="bordered"
                  labelPlacement="outside"
                  hideTimeZone
                  // defaultValue={}
                  showMonthAndYearPickers
                  isInvalid={errorsUpdateInfo.endDate !== undefined}
                  errorMessage={errorsUpdateInfo.endDate?.message}
                />
              )}
            />
          </Skeleton>
          <div className="flex items-start justify-between gap-2">
            <Skeleton isLoaded={!!dataEvent} className="rounded-lg">
              <Controller
                name="isPublished"
                control={controlUpdateInfo}
                render={({ field: { onChange, ...field } }) => (
                  <CustomAutoComplete
                    {...field}
                    label="Status"
                    variant="bordered"
                    labelPlacement="outside"
                    placeholder="Select or search status"
                    defaultSelectedKey={
                      dataEvent?.isPublished ? "true" : "false"
                    }
                    onSelectionChange={(value) => onChange(value)}
                    isInvalid={errorsUpdateInfo.isPublished !== undefined}
                    errorMessage={errorsUpdateInfo.isPublished?.message}
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
            </Skeleton>
            <Skeleton isLoaded={!!dataEvent} className="rounded-lg">
              <Controller
                name="isFeatured"
                control={controlUpdateInfo}
                render={({ field: { onChange, ...field } }) => (
                  <CustomAutoComplete
                    {...field}
                    label="Fatured"
                    variant="bordered"
                    labelPlacement="outside"
                    placeholder="Select or search status"
                    defaultSelectedKey={
                      dataEvent?.isFeatured ? "true" : "false"
                    }
                    onSelectionChange={(value) => onChange(value)}
                    isInvalid={errorsUpdateInfo.isFeatured !== undefined}
                    errorMessage={errorsUpdateInfo.isFeatured?.message}
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
            </Skeleton>
          </div>
          <Skeleton isLoaded={!!dataEvent?.description} className="rounded-lg">
            <Controller
              name="description"
              control={controlUpdateInfo}
              render={({ field }) => (
                <CustomTextArea
                  {...field}
                  label="Description"
                  variant="bordered"
                  labelPlacement="outside"
                  type="text"
                  isInvalid={errorsUpdateInfo.description !== undefined}
                  errorMessage={errorsUpdateInfo.description?.message}
                  defaultValue={dataEvent?.description}
                />
              )}
            />
          </Skeleton>

          <Button
            type="submit"
            color="danger"
            className="mt-2 disabled:bg-default-500"
            disabled={isPendingUpdate || !dataEvent?._id}
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
