import CustomInput from "@/components/ui/CustomInput";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Skeleton,
  Spinner,
} from "@heroui/react";
import React, { useEffect } from "react";
import { Controller } from "react-hook-form";
import useInfoTab from "./useInfoTab";
import { IProfile } from "@/types/Auth";

interface PropTypes {
  dataProfile: IProfile;
  onUpdate: (data: IProfile) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

export default function InfoTab(props: PropTypes) {
  const { dataProfile, onUpdate, isPendingUpdate, isSuccessUpdate } = props;

  const {
    controlUpdateInfo,
    errorsUpdateInfo,
    handleSubmitUpdateInfo,
    resetUpdateInfo,
    setValueUpdateInfo,
  } = useInfoTab();

  useEffect(() => {
    if (dataProfile) {
      setValueUpdateInfo("fullName", `${dataProfile?.fullName}`);
    }
  }, [dataProfile]);

  useEffect(() => {
    if (isSuccessUpdate) {
      resetUpdateInfo();
    }
  }, [isSuccessUpdate]);

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">User Information</h1>
        <p className="w-full text-sm text-default-400">
          Manager information of this account
        </p>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdateInfo(onUpdate)}
        >
          <Skeleton isLoaded={!!dataProfile?.username} className="rounded-lg">
            <CustomInput
              label="Username"
              variant="flat"
              labelPlacement="outside"
              value={`${dataProfile?.username}`}
              disabled
            />
          </Skeleton>
          <Skeleton isLoaded={!!dataProfile?.email} className="rounded-lg">
            <CustomInput
              label="Email"
              variant="flat"
              labelPlacement="outside"
              value={`${dataProfile?.email}`}
              disabled
            />
          </Skeleton>
          <Skeleton isLoaded={!!dataProfile?.role} className="rounded-lg">
            <CustomInput
              label="Role"
              variant="flat"
              labelPlacement="outside"
              value={`${dataProfile?.role?.substring(0, 1).toUpperCase()}${dataProfile?.role?.substring(1)}`}
              disabled
            />
          </Skeleton>
          <Skeleton isLoaded={!!dataProfile?.fullName} className="rounded-lg">
            <Controller
              name="fullName"
              control={controlUpdateInfo}
              render={({ field }) => (
                <CustomInput
                  {...field}
                  label="Fullname"
                  variant="bordered"
                  labelPlacement="outside"
                  placeholder="Input your fullname"
                  value={`${field.value}`}
                  isInvalid={errorsUpdateInfo.fullName !== undefined}
                  errorMessage={errorsUpdateInfo?.fullName?.message}
                  defaultValue={`${dataProfile?.fullName}`}
                />
              )}
            />
          </Skeleton>
          <Button
            type="submit"
            color="danger"
            className="mt-2 disabled:bg-default-500"
            disabled={isPendingUpdate || !dataProfile?._id}
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
