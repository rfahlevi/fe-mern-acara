import { useRouter } from "next/router";
import React, { Key, ReactNode, useCallback, useEffect } from "react";
import useEvent from "./useEvent";
import { Chip, useDisclosure } from "@heroui/react";
import useChangeUrl from "@/hooks/useChangeUrl";
import Image from "next/image";
import Datatable from "@/components/ui/Datatable";
import { COLUMN_LISTS_EVENT } from "./Event.constant";
import DropdownAction from "@/components/commons/DropdownAction";
import AddEventModal from "./AddEventModal";
import DeleteEventModal from "./DeleteEventModal";

export default function Event() {
  const { push, query, isReady } = useRouter();
  const {
    dataEvents,
    isLoadingEvents,
    isRefetchingEvents,
    refetchEvents,

    selectedId,
    setSelectedId,
  } = useEvent();

  const addEventModal = useDisclosure();
  const deleteEventModal = useDisclosure();
  const { setUrl } = useChangeUrl();

  useEffect(() => {
    if (isReady) {
      setUrl();
    }
  }, [isReady]);

  const renderCell = useCallback(
    (event: Record<string, unknown>, columnKey: Key) => {
      const cellValue = event[columnKey as keyof typeof event];

      switch (columnKey) {
        case "banner":
          return (
            <Image
              src={`${cellValue}`}
              alt="banner"
              width={200}
              height={100}
              className="aspect-video w-36 rounded-lg object-cover"
            />
          );
        case "isPublished":
          return (
            <Chip
              color={cellValue === true ? "success" : "warning"}
              size="sm"
              variant="flat"
            >
              {cellValue === true ? "Published" : "Not Published"}
            </Chip>
          );
        case "actions":
          return (
            <DropdownAction
              detailKey="event"
              onPressDetail={() => push(`/admin/events/${event._id}`)}
              onPressDelete={() => {
                setSelectedId(`${event._id}`);
                deleteEventModal.onOpen();
              }}
            />
          );
        default:
          return cellValue as ReactNode;
      }
    },
    [push],
  );
  return (
    <section>
      {Object.keys(query).length > 0 && (
        <Datatable
          buttonTopContentLabel="Create Event"
          columns={COLUMN_LISTS_EVENT}
          data={dataEvents?.data.data || []}
          emptyContent="Event is Empty"
          isLoading={isLoadingEvents || isRefetchingEvents}
          onClickButtonTopContent={addEventModal.onOpen}
          renderCell={renderCell}
          totalPages={dataEvents?.data.pagination.totalPages}
        />
      )}
      <AddEventModal {...addEventModal} refectEvents={refetchEvents} />
      <DeleteEventModal
        {...deleteEventModal}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        refectEvents={refetchEvents}
      />
    </section>
  );
}
