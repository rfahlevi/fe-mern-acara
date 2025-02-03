import { Button } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import usePayment from "./usePayment";
import { useEffect } from "react";

const Payment = () => {
  const router = useRouter();
  const { order_id, status } = router.query;
  const { mutateUpdateOrderStatus } = usePayment();

  useEffect(() => {
    if (router.isReady) {
      mutateUpdateOrderStatus();
    }
  }, [router.isReady]);

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
          <h1 className="text-2xl font-bold capitalize text-danger">
            Payment <span className="capitalize">{status ?? "Failed"}</span>
          </h1>

          <Button
            variant="bordered"
            radius="sm"
            size="sm"
            color="danger"
            className="mt-4"
            onPress={() => router.push(`/member/transactions/${order_id}`)}
          >
            Check your transaction here
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
