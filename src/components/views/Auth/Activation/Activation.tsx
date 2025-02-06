import { Button } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/router";

interface PropTypes {
  status: "success" | "failed";
}

const Activation = (props: PropTypes) => {
  const router = useRouter();
  const { status } = props;

  return (
    <div className="max-w-screen flex flex-col">
      <div className="flex flex-col items-center justify-center gap-10 p-4">
        <Image
          priority
          src="/images/general/logo.svg"
          alt="Logo"
          width={120}
          height={120}
        />
        <Image
          src={`/images/illustrations/${status === "success" ? "success" : "pending"}.svg`}
          alt="Success"
          width={300}
          height={300}
          priority
        />
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold text-danger">
            Activation <span className="capitalize">{status ?? "Failed"}</span>
          </h1>
          <p className="text-default-500">
            {status === "success"
              ? "Thank you for register account in Acara"
              : "Confirmation code is invalid"}
          </p>
          <Button
            variant="bordered"
            radius="sm"
            size="sm"
            color="danger"
            className="mt-4"
            onPress={() => router.push("/")}
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Activation;
