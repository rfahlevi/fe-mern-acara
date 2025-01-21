import DropdownAction from "@/components/commons/DropdownAction";
import Datatable from "@/components/ui/Datatable";
import convertIDR from "@/utils/currency";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  useDisclosure,
} from "@nextui-org/react";
import React, { Key, ReactNode, useCallback } from "react";
import { COLUMN_LISTS_TICKET } from "./TicketTab.constant";
import useTicketTab from "./useTicketTab";

export default function TicketTab() {
  const addTicketModal = useDisclosure();
  const deleteTicketModal = useDisclosure();
  const updateTicketModal = useDisclosure();

  const { dataTicket, isPendingTicket, isRefetchingTicket, refetchTicket } =
    useTicketTab();

  const renderCell = useCallback(
    (ticket: Record<string, unknown>, columnKey: Key) => {
      const cellValue = ticket[columnKey as keyof typeof ticket];

      switch (columnKey) {
        case "price":
          return `${convertIDR(cellValue as number)}`;
        case "actions":
          return (
            <DropdownAction
              detailKey="ticket"
              onPressDetail={() => {
                updateTicketModal.onOpen();
              }}
              onPressDelete={() => {
                deleteTicketModal.onOpen();
              }}
            />
          );
        default:
          return cellValue as ReactNode;
      }
    },
    [],
  );

  return (
    <Card className="w-full p-4">
      <CardHeader className="flex justify-between">
        <div className="flex flex-col items-center">
          <h1 className="w-full text-xl font-bold">Event Ticket</h1>
          <p className="w-full text-sm text-default-400">
            Manager ticket of this event
          </p>
        </div>
        <Button color="danger" size="sm">
          Add New Ticket
        </Button>
      </CardHeader>
      <CardBody className="w-full pt-0">
        <Datatable
          columns={COLUMN_LISTS_TICKET}
          data={dataTicket || []}
          emptyContent="Ticket is Empty"
          isLoading={isPendingTicket || isRefetchingTicket}
          renderCell={renderCell}
          totalPages={1}
          showLimit={false}
          showSearch={false}
        />
      </CardBody>
    </Card>
  );
}
