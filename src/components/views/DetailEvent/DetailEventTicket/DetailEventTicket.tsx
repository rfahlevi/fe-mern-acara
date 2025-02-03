import { ICart, ITicket } from "@/types/Ticket";
import { cn } from "@/utils/cn";
import convertIDR from "@/utils/currency";
import { Accordion, AccordionItem, Button, Card, Chip } from "@heroui/react";
import { useSession } from "next-auth/react";

interface PropTypes {
  cart: ICart;
  handleAddToCart: (ticket: string) => void;
  ticket: ITicket;
}

export default function DetailEventTicket(props: PropTypes) {
  const { cart, handleAddToCart, ticket } = props;
  const session = useSession();

  return (
    <Card className="px-4 pb-4">
      <Accordion>
        <AccordionItem
          className="border-b-2 border-dashed"
          key={ticket?._id}
          aria-label={ticket?.name}
          title={
            <div className="flex items-center gap-2 pb-0">
              <h2 className="text-lg font-bold text-foreground-700">
                {ticket?.name}
              </h2>
              <Chip
                size="sm"
                color={Number(ticket?.quantity) > 0 ? "success" : "danger"}
                variant="bordered"
              >
                {Number(ticket?.quantity) > 0 ? "Available" : "Sold Out"}
              </Chip>
            </div>
          }
        >
          <p>{ticket?.description}</p>
        </AccordionItem>
      </Accordion>
      <div className="mt-2 flex items-center justify-between p-2">
        <h2
          className={cn("font-semibold text-danger", {
            "text-default-400 line-through": Number(ticket?.quantity) === 0,
          })}
        >
          {convertIDR(Number(ticket?.price))}
        </h2>
        {session.status === "authenticated" && Number(ticket?.quantity) > 0 && (
          <Button
            className="rounded-lg font-bold disabled:cursor-not-allowed"
            variant={cart?.ticket === ticket?._id ? "flat" : "bordered"}
            color={cart?.ticket === ticket?._id ? "default" : "warning"}
            size="sm"
            disabled={cart?.ticket === ticket?._id}
            onPress={() => handleAddToCart(`${ticket?._id}`)}
          >
            Add to Cart
          </Button>
        )}
      </div>
    </Card>
  );
}
