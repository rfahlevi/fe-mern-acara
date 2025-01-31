import CardEvent from "@/components/ui/CardEvent";
import { IEvent } from "@/types/Event";
import Link from "next/link";

interface PropTypes {
  events: IEvent[];
  isLoading: boolean;
  title: string;
  seeMoreUrl?: string;
}

export default function HomeEvents(props: PropTypes) {
  const { events, isLoading, title, seeMoreUrl = "/events" } = props;

  return (
    <section className="mb-16 px-4 lg:px-0">
      <div className="mb-2 flex items-center justify-between lg:px-0">
        <h2 className="text-lg font-bold text-danger lg:text-xl">{title}</h2>
        <Link
          href={seeMoreUrl}
          className="text-sm font-medium text-default-900 hover:text-foreground-500"
        >
          See More
        </Link>
      </div>
      <div className="grid auto-cols-[18rem] grid-flow-col gap-6 overflow-x-auto py-2 pb-4 lg:grid-cols-4 lg:px-1">
        {!isLoading
          ? events.map((event) => (
              <CardEvent
                key={`card-event-${event._id}`}
                event={event}
                className="first:ml-0.5 last:mr-0.5 lg:first:ml-0 lg:last:mr-0"
              />
            ))
          : Array.from({ length: 4 }, (_, index) => (
              <CardEvent
                key={`card-event-${index}`}
                isLoading={isLoading}
                className="first:ml-0.5 last:mr-0.5 lg:first:ml-0 lg:last:mr-0"
              />
            ))}
      </div>
    </section>
  );
}
