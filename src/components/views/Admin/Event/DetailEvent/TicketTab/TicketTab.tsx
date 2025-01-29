import DropdownAction from "@/components/commons/DropdownAction";
import Datatable from "@/components/ui/Datatable";
import convertIDR from "@/utils/currency";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  select,
  useDisclosure,
} from "@heroui/react";
import React, { Key, ReactNode, useCallback, useState } from "react";
import { COLUMN_LISTS_TICKET } from "./TicketTab.constant";
import useTicketTab from "./useTicketTab";
import AddTicketModal from "./AddTicketModal";
import DeleteTicketModal from "./DeleteTicketModal";
import { ITicket } from "@/types/Ticket";
import UpdateTicketModal from "./UpdateTicketModal";

export default function TicketTab() {
  const addTicketModal = useDisclosure();
  const deleteTicketModal = useDisclosure();
  const updateTicketModal = useDisclosure();

  const [selectedDataTicket, setSelectedDataTicket] = useState<ITicket | null>(
    null,
  );

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
                setSelectedDataTicket(ticket as ITicket);
                updateTicketModal.onOpen();
              }}
              onPressDelete={() => {
                setSelectedDataTicket(ticket as ITicket);
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
    <>
      <Card className="w-full p-4">
        <CardHeader className="flex justify-between">
          <div className="flex flex-col items-center">
            <h1 className="w-full text-xl font-bold">Event Ticket</h1>
            <p className="w-full text-sm text-default-400">
              Manager ticket of this event
            </p>
          </div>
          <Button color="danger" size="sm" onPress={addTicketModal.onOpen}>
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
      <AddTicketModal {...addTicketModal} refectTicket={refetchTicket} />
      <DeleteTicketModal
        {...deleteTicketModal}
        refectTicket={refetchTicket}
        selectedDataTicket={selectedDataTicket}
        setSelectedDataTicket={setSelectedDataTicket}
      />
      <UpdateTicketModal
        {...updateTicketModal}
        refectTicket={refetchTicket}
        selectedDataTicket={selectedDataTicket}
        setSelectedDataTicket={setSelectedDataTicket}
      />
    </>
  );
}
