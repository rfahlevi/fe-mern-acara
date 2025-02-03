import { ICart, ITicket } from "@/types/Ticket";
import convertIDR from "@/utils/currency";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Spinner,
} from "@heroui/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

interface PropTypes {
  cart: ICart;
  dataTicketInCart: ITicket;
  onChangeQuantity: (type: "increment" | "decrement") => void;
  onCreateOrder: () => void;
  isLoading: boolean;
}

export default function DefaultEventCart(props: PropTypes) {
  const { cart, dataTicketInCart, onChangeQuantity, onCreateOrder, isLoading } =
    props;

  const session = useSession();
  const router = useRouter();

  return (
    <Card radius="md" className="border-none px-2 lg:sticky lg:top-[80px]">
      <CardBody className="gap-2">
        {session.status === "authenticated" ? (
          <>
            <h2 className="text-lg font-semibold text-foreground-700">Cart</h2>
            {cart.ticket === "" ? (
              <p className="text-sm text-foreground-400">Your cart is empty</p>
            ) : (
              <div className="flex flex-col">
                <div className="flex w-full items-center justify-between">
                  <h5 className="text-default-500">{dataTicketInCart?.name}</h5>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="bordered"
                      className="h-8 w-8 min-w-0 scale-80 rounded-lg text-xl font-semibold text-foreground-500"
                      onPress={() => onChangeQuantity("decrement")}
                    >
                      -
                    </Button>
                    <span className="mx-1 font-semibold text-default-600">
                      {cart?.quantity}
                    </span>
                    <Button
                      size="sm"
                      variant="solid"
                      color="warning"
                      className="h-8 w-8 min-w-0 scale-80 rounded-lg text-xl font-semibold"
                      onPress={() => onChangeQuantity("increment")}
                    >
                      +
                    </Button>
                  </div>
                </div>
                <p className="font-semibold">
                  {convertIDR(Number(dataTicketInCart?.price) * cart?.quantity)}
                </p>
              </div>
            )}
            <Divider className="mt-2 bg-default-200" />
          </>
        ) : (
          <Button
            size="sm"
            color="danger"
            as={Link}
            className="my-4"
            href={`/auth/login?callbackUrl=/events/${router.query.slug}`}
          >
            Login for Book Ticket
          </Button>
        )}
      </CardBody>
      {session.status === "authenticated" && (
        <CardFooter>
          <Button
            fullWidth
            color="danger"
            size="sm"
            disabled={cart?.quantity === 0 || isLoading}
            className="disabled:bg-danger-200"
            onPress={onCreateOrder}
          >
            {isLoading ? (
              <div className="flex gap-2">
                <Spinner color="white" size="sm" />
                Loading...
              </div>
            ) : (
              "Checkout"
            )}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
