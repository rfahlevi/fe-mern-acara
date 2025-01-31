import { IEvent } from "@/types/Event";
import useEvent from "./useEvent";
import CardEvent from "@/components/ui/CardEvent";
import EventFooter from "./EventFooter";
import EventFilter from "./EventFilter";
import Image from "next/image";

export default function Event() {
  const { dataEvents, isLoadingEvents, isRefetchingEvents } = useEvent();

  return (
    <div className="flex w-full flex-col justify-center gap-6 px-4 lg:flex-row lg:px-0">
      <EventFilter />
      <div className="min-h-[70vh] w-full flex-1">
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

        {/* Pagination */}
        {!isLoadingEvents && dataEvents?.data.length > 0 && (
          <EventFooter totalPages={dataEvents?.pagination?.totalPages} />
        )}

        {/* If event is empty */}
        {!isLoadingEvents &&
          !isRefetchingEvents &&
          dataEvents?.data?.length === 0 && (
            <div className="flex h-full w-full flex-col items-center justify-center gap-4">
              <Image
                src="/images/illustrations/no-data.svg"
                alt="empty"
                width={800}
                height={800}
                className="aspect-square w-40"
              />
              <h2 className="text-lg font-semibold text-foreground-500">
                Oopss, event is empty...
              </h2>
            </div>
          )}
      </div>
    </div>
  );
}
