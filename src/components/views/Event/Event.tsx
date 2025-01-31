import { IEvent } from "@/types/Event";
import useEvent from "./useEvent";
import CardEvent from "@/components/ui/CardEvent";
import { useRouter } from "next/router";
import { useEffect } from "react";
import EventFooter from "./EventFooter";

export default function Event() {
  const { dataEvents, isLoadingEvents, isRefetchingEvents, refetchEvents } =
    useEvent();

  return (
    <div className="flex w-full flex-col justify-center gap-6 px-4 lg:flex-row lg:px-0">
      <div className="w-full lg:w-80">Filter</div>
      <div className="min-h-[70vh] w-fit flex-1">
        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {!isLoadingEvents && !isRefetchingEvents
            ? dataEvents?.data?.map((event: IEvent) => (
                <CardEvent
                  key={`card-event-${event._id}`}
                  isLoading={isLoadingEvents}
                  event={event}
                />
              ))
            : Array.from({ length: 4 }, (_, index) => (
                <CardEvent key={`card-event-${index}`} isLoading={true} />
              ))}
        </div>
        {!isLoadingEvents && dataEvents?.data.length > 0 && (
          <EventFooter totalPages={dataEvents?.pagination?.totalPages} />
        )}
      </div>
    </div>
  );
}
