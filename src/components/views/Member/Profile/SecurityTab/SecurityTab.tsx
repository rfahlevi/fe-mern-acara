import CustomInput from "@/components/ui/CustomInput";
import { Button, Card, CardBody, CardHeader, Spinner } from "@heroui/react";
import React from "react";
import { Controller } from "react-hook-form";
import useInfoTab from "./useSecurityTab";

export default function SecurityTab() {
  const {
    controlUpdatePassword,
    errorsUpdatePassword,
    isPendingMutateUpdatePassword,
    handleSubmitUpdatePassword,
    handleUpdatePassword,
  } = useInfoTab();

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">Security</h1>
        <p className="w-full text-sm text-default-400">
          Update your account security
        </p>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdatePassword(handleUpdatePassword)}
        >
          <Controller
            name="oldPassword"
            control={controlUpdatePassword}
            render={({ field }) => (
              <CustomInput
                {...field}
                label="Old Password"
                variant="bordered"
                labelPlacement="outside"
                type="password"
                placeholder="Input your old password"
                isInvalid={errorsUpdatePassword?.oldPassword !== undefined}
                errorMessage={errorsUpdatePassword?.oldPassword?.message}
              />
            )}
          />
          <Controller
            name="password"
            control={controlUpdatePassword}
            render={({ field }) => (
              <CustomInput
                {...field}
                label="New Password"
                variant="bordered"
                type="password"
                labelPlacement="outside"
                placeholder="Input your new password"
                isInvalid={errorsUpdatePassword?.password !== undefined}
                errorMessage={errorsUpdatePassword?.password?.message}
              />
            )}
          />
          <Controller
            name="confirmPassword"
            control={controlUpdatePassword}
            render={({ field }) => (
              <CustomInput
                {...field}
                label="Confirm New Password"
                variant="bordered"
                type="password"
                labelPlacement="outside"
                placeholder="Input your confirm new password"
                isInvalid={errorsUpdatePassword?.confirmPassword !== undefined}
                errorMessage={errorsUpdatePassword?.confirmPassword?.message}
              />
            )}
          />
          <Button
            type="submit"
            color="danger"
            className="mt-2 disabled:bg-default-500"
            disabled={isPendingMutateUpdatePassword}
          >
            {isPendingMutateUpdatePassword ? (
              <div className="flex gap-2">
                <Spinner color="white" size="sm" />
                Loading...
              </div>
            ) : (
              "Update Password"
            )}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}
