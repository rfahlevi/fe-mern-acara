import { Button, button, Card, CardBody, Input, Spinner } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import useRegister from "./useRegister";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import CustomInput from "@/components/ui/CustomInput";
import { Controller } from "react-hook-form";

const Register = () => {
  const {
    visiblePassword,
    handleVisiblePassword,
    control,
    handleSubmit,
    handleRegister,
    isPendingRegister,
    errors,
  } = useRegister();

  return (
    <div className="flex w-full flex-col items-center justify-center gap-6 lg:flex-row lg:gap-20">
      <div className="flex w-1/3 flex-col items-center justify-center gap-10">
        <Image
          priority
          src="/images/general/logo.svg"
          alt="Logo"
          width={180}
          height={180}
        />
        <Image
          src="/images/illustrations/login.svg"
          alt="Login"
          className="hidden lg:block"
          width={1024}
          height={1024}
        />
      </div>
      <Card>
        <CardBody className="p-8">
          <h2 className="text-2xl font-bold text-danger">Create Account</h2>
          <p className="mb-4 mt-1 text-sm">
            Have an account?{" "}
            <Link
              href="/auth/login"
              className="font-semibold text-danger-500 hover:text-danger-600"
            >
              Login
            </Link>
          </p>
          <form
            className="flex w-80 flex-col gap-2"
            onSubmit={handleSubmit(handleRegister)}
          >
            <Controller
              name="fullName"
              control={control}
              render={({ field }) => (
                <CustomInput
                  {...field}
                  type="text"
                  label="Fullname"
                  placeholder="Enter your fullname"
                  isInvalid={errors.fullName !== undefined}
                  errorMessage={errors.fullName?.message}
                />
              )}
            />
            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <CustomInput
                  {...field}
                  type="text"
                  label="Username"
                  placeholder="Enter your username"
                  isInvalid={errors.username !== undefined}
                  errorMessage={errors.username?.message}
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <CustomInput
                  {...field}
                  type="email"
                  label="Email"
                  placeholder="member@acara.com"
                  isInvalid={errors.email !== undefined}
                  errorMessage={errors.email?.message}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <CustomInput
                  {...field}
                  type={visiblePassword.password ? "text" : "password"}
                  label="Password"
                  placeholder="********"
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={() => handleVisiblePassword("password")}
                    >
                      {visiblePassword.password ? (
                        <FaEye className="pointer-events-none text-lg text-default-400" />
                      ) : (
                        <FaEyeSlash className="pointer-events-none text-lg text-default-400" />
                      )}
                    </button>
                  }
                  isInvalid={errors.password !== undefined}
                  errorMessage={errors.password?.message}
                />
              )}
            />
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <CustomInput
                  {...field}
                  type={visiblePassword.confirmPassword ? "text" : "password"}
                  label="Password Confirmation"
                  placeholder="********"
                  isInvalid={errors.confirmPassword !== undefined}
                  errorMessage={errors.confirmPassword?.message}
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={() => handleVisiblePassword("confirmPassword")}
                    >
                      {visiblePassword.confirmPassword ? (
                        <FaEye className="pointer-events-none text-lg text-default-400" />
                      ) : (
                        <FaEyeSlash className="pointer-events-none text-lg text-default-400" />
                      )}
                    </button>
                  }
                />
              )}
            />
            <Button color="danger" type="submit" className="mt-4 rounded-md">
              {isPendingRegister ? (
                <div className="flex gap-2">
                  <Spinner color="white" size="sm" />
                  Loading...
                </div>
              ) : (
                "Register"
              )}
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default Register;
