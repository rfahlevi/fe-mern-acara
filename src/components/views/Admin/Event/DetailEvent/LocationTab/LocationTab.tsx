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
} from "@nextui-org/react";
import React, { useEffect } from "react";
import useLocationTab from "./useLocationTab";
import { Controller } from "react-hook-form";
import { IEventForm } from "@/types/Event";
import CustomAutoComplete from "@/components/ui/CustomAutoComplete";
import { ICategory } from "@/types/Category";

interface PropTypes {
  dataDefaultRegion: string;
  dataEvent: IEventForm;
  onUpdate: (data: IEventForm) => void;
  isPendingDefaultRegion: boolean;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

export default function LocationTab(props: PropTypes) {
  const {
    dataDefaultRegion,
    dataEvent,
    onUpdate,
    isPendingDefaultRegion,
    isPendingUpdate,
    isSuccessUpdate,
  } = props;
  const {
    controlUpdateLocation,
    dataRegion,
    errorsUpdateLocation,
    handleSearchRegency,
    handleSubmitUpdateLocation,
    isLoadingRegion,
    resetUpdateLocation,
    searchRegency,
    setValueUpdateLocation,
  } = useLocationTab();

  useEffect(() => {
    if (dataEvent) {
      setValueUpdateLocation("isOnline", `${dataEvent?.isOnline}`);
      setValueUpdateLocation("region", Number(`${dataEvent?.region}`));
      setValueUpdateLocation(
        "latitude",
        Number(`${dataEvent?.location?.coordinates[0]}`),
      );
      setValueUpdateLocation(
        "longitude",
        Number(`${dataEvent?.location?.coordinates[1]}`),
      );
      setValueUpdateLocation("address", `${dataEvent?.location?.address}`);
    }
  }, [dataEvent]);

  useEffect(() => {
    if (isSuccessUpdate) {
      resetUpdateLocation();
    }
  }, [isSuccessUpdate]);

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">Event Location</h1>
        <p className="w-full text-sm text-default-400">
          Manager location of this event
        </p>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdateLocation(onUpdate)}
        >
          <Skeleton isLoaded={!!dataEvent} className="rounded-lg">
            <Controller
              name="isOnline"
              control={controlUpdateLocation}
              render={({ field: { onChange, ...field } }) => (
                <CustomAutoComplete
                  {...field}
                  label="Online / Offline"
                  variant="bordered"
                  labelPlacement="outside"
                  placeholder="Select or search status"
                  defaultSelectedKey={dataEvent?.isPublished ? "true" : "false"}
                  onSelectionChange={(value) => onChange(value)}
                  isInvalid={errorsUpdateLocation.isOnline !== undefined}
                  errorMessage={errorsUpdateLocation.isOnline?.message}
                >
                  <AutocompleteItem key="true" value="true">
                    Online
                  </AutocompleteItem>
                  <AutocompleteItem key="false" value="false">
                    Offline
                  </AutocompleteItem>
                </CustomAutoComplete>
              )}
            />
          </Skeleton>
          <Skeleton
            isLoaded={!!dataEvent?.location?.region && !isPendingDefaultRegion}
            className="rounded-lg"
          >
            {!isPendingDefaultRegion ? (
              <Controller
                name="region"
                control={controlUpdateLocation}
                render={({ field: { onChange, ...field } }) => (
                  <CustomAutoComplete
                    {...field}
                    defaultItems={dataRegion?.data.data || []}
                    label="Region"
                    placeholder="Select or search region"
                    variant="bordered"
                    labelPlacement="outside"
                    isInvalid={errorsUpdateLocation.region !== undefined}
                    errorMessage={errorsUpdateLocation.region?.message}
                    onSelectionChange={(value) => onChange(value)}
                    onInputChange={(search) => handleSearchRegency(search)}
                    isLoading={isLoadingRegion}
                    disabled={isLoadingRegion}
                    defaultInputValue={`${dataDefaultRegion}`}
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
            ) : (
              <div className="h-16 w-full" />
            )}
          </Skeleton>
          <div className="grid grid-cols-2 gap-2">
            <Skeleton
              isLoaded={!!dataEvent?.location?.coordinates[0]}
              className="rounded-lg"
            >
              <Controller
                name="latitude"
                control={controlUpdateLocation}
                render={({ field }) => (
                  <CustomInput
                    {...field}
                    label="Latitude"
                    variant="bordered"
                    labelPlacement="outside"
                    type="text"
                    value={`${field.value}`}
                    isInvalid={errorsUpdateLocation.latitude !== undefined}
                    errorMessage={errorsUpdateLocation?.latitude?.message}
                    defaultValue={`${dataEvent?.latitude}`}
                  />
                )}
              />
            </Skeleton>
            <Skeleton
              isLoaded={!!dataEvent?.location?.coordinates[1]}
              className="rounded-lg"
            >
              <Controller
                name="longitude"
                control={controlUpdateLocation}
                render={({ field }) => (
                  <CustomInput
                    {...field}
                    label="Longlongitude"
                    variant="bordered"
                    labelPlacement="outside"
                    type="text"
                    value={`${field.value}`}
                    isInvalid={errorsUpdateLocation.longitude !== undefined}
                    errorMessage={errorsUpdateLocation?.longitude?.message}
                    defaultValue={`${dataEvent?.longitude}`}
                  />
                )}
              />
            </Skeleton>
          </div>
          <Skeleton isLoaded={!!dataEvent} className="rounded-lg">
            <Controller
              name="address"
              control={controlUpdateLocation}
              render={({ field }) => (
                <CustomTextArea
                  {...field}
                  label="Address"
                  variant="bordered"
                  labelPlacement="outside"
                  type="text"
                  isInvalid={errorsUpdateLocation.address !== undefined}
                  errorMessage={errorsUpdateLocation.address?.message}
                  defaultValue={dataEvent?.address}
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
