import { Button, button, Card, CardBody, Input, Spinner } from "@nextui-org/react"
import Image from "next/image"
import Link from "next/link"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import CustomInput from "@/components/ui/CustomInput"
import { Controller } from "react-hook-form"
import useLogin from "./useLogin"

const Login = () => {
    const {
        isVisible,
        toggleVisibility,
        control,
        handleSubmit,
        handleLogin,
        isPendingLogin,
        errors,
    } = useLogin()

    return (
        <div className="flex items-center flex-col lg:flex-row justify-center w-full gap-6 lg:gap-20">
            <div className="w-1/3 flex flex-col gap-10 items-center justify-center">
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
                    <h2 className="text-2xl font-bold text-danger">Login</h2>
                    <p className="text-sm mb-4 mt-1">Dont&apos;t have an account?{" "}
                        <Link href="/auth/register" className="font-semibold text-danger-500 hover:text-danger-600">Register Here</Link>
                    </p>
                    <form className="w-80 flex flex-col gap-2"
                        onSubmit={handleSubmit(handleLogin)}
                    >
                        <Controller
                            name="identifier"
                            control={control}
                            render={({ field }) => (
                                <CustomInput
                                    {...field}
                                    isRequired
                                    type="text"
                                    label="Username or Email"
                                    placeholder="Enter your valid username or email"
                                    isInvalid={errors.identifier !== undefined}
                                    errorMessage={errors.identifier?.message}
                                />
                            )}
                        />
                        <Controller
                            name="password"
                            control={control}
                            render={({ field }) => (
                                <CustomInput
                                    {...field}
                                    type={isVisible ? "text" : "password"}
                                    isRequired
                                    label="Password"
                                    placeholder="********"
                                    endContent={
                                        <button
                                            className="focus:outline-none"
                                            type="button"
                                            onClick={toggleVisibility}
                                        >
                                            {isVisible ? (
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
                        <Button
                            color="danger"
                            type="submit"
                            className="rounded-md mt-4"
                        >
                            {isPendingLogin ? (
                                <div className="flex gap-2">
                                    <Spinner color="white" size="sm" />
                                    Loading...
                                </div>
                            ) : "Login"}
                        </Button>
                    </form>
                </CardBody>
            </Card>
        </div>
    )
}

export default Login
