import { Button } from "@nextui-org/react"
import Image from "next/image"
import { useRouter } from "next/router"

const RegisterSuccess = () => {
    const router = useRouter()
    return (
        <div className="flex max-w-screen flex-col">
            <div className="flex flex-col items-center justify-center gap-10 p-4">
                <Image
                    priority
                    src="/images/general/logo.svg"
                    alt="Logo"
                    width={120}
                    height={120}
                />
                <Image
                    src="/images/illustrations/email-send.svg"
                    alt="Success"
                    width={300}
                    height={300}
                    priority
                />
                <div className="flex flex-col items-center gap-2 text-center">
                    <h1 className="text-2xl font-bold text-danger">Create Account Success</h1>
                    <p className="text-default-500">Check your email for account activation</p>
                    <Button
                        variant="bordered"
                        radius="sm"
                        size="sm"
                        color="danger"
                        className="mt-4"
                        onClick={() => router.push("/")}
                    >
                        Back to Home
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default RegisterSuccess