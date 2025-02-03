import {
  BreadcrumbItem,
  Breadcrumbs,
  Skeleton,
  Tab,
  Tabs,
} from "@heroui/react";
import useDetailEvent from "./useDetailEvent";
import { FaClock } from "react-icons/fa";
import { toConvertTime } from "@/utils/date";
import { FaLocationDot } from "react-icons/fa6";
import Image from "next/image";
import { ITicket } from "@/types/Ticket";
import DetailEventTicket from "./DetailEventTicket";
import DetailEventCart from "./DetailEventCart";
import Script from "next/script";
import environment from "@/config/environment";

export default function DetailEvent() {
  const {
    cart,
    dataEvent,
    dataTicket,
    dataTicketInCart,
    handleAddToCart,
    handleChangeQuantity,
    mutateCreateOrder,
    isPendingCreateOrder,
  } = useDetailEvent();

  return (
    <div className="px-8 md:px-0">
      <Breadcrumbs>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem href="/events">Event</BreadcrumbItem>
        <BreadcrumbItem className="font-medium">
          <Skeleton isLoaded={!!dataEvent} className="rounded-md">
            {dataEvent?.name}
          </Skeleton>
        </BreadcrumbItem>
      </Breadcrumbs>

      <section className="mt-8 flex flex-col gap-10 lg:flex-row">
        <div className="w-full lg:w-4/6">
          <Script
            src={environment.MIDTRANS_SNAP_URL}
            data-client-key={environment.MITRANS_CLIENT_KEY}
            strategy="lazyOnload"
          />
          <Skeleton isLoaded={!!dataEvent} className="mb-2 h-8 rounded-md">
            <h1 className="mb-2 text-xl font-semibold text-danger">
              {dataEvent?.name}
            </h1>
          </Skeleton>
          <div className="mb-2 flex items-center gap-2 text-foreground-500">
            <Skeleton
              isLoaded={!!dataEvent}
              className="h-5 w-[20px] rounded-md"
            >
              <FaClock width={16} />
            </Skeleton>
            <Skeleton isLoaded={!!dataEvent} className="h-5 rounded-md">
              <p className="text-sm">
                {toConvertTime(dataEvent?.startDate)} -{" "}
                {toConvertTime(dataEvent?.endDate)}
              </p>
            </Skeleton>
          </div>
          <div className="mb-4 flex items-center gap-2 text-foreground-500">
            <Skeleton
              isLoaded={!!dataEvent}
              className="h-5 w-[20px] rounded-md"
            >
              <FaLocationDot width={16} />
            </Skeleton>
            <Skeleton isLoaded={!!dataEvent} className="h-5 rounded-md">
              <p className="text-sm">
                {dataEvent?.isOnline === true
                  ? "Online"
                  : dataEvent?.location?.address}
              </p>
            </Skeleton>
          </div>
          <Skeleton
            className="mb-4 aspect-video w-full rounded-lg"
            isLoaded={!!dataEvent}
          >
            <Image
              src={dataEvent && dataEvent?.banner}
              alt="Banner"
              width={1980}
              height={1080}
              className="aspect-video w-full rounded-lg object-cover"
            />
          </Skeleton>
          <Tabs aria-label="Tab Detail Event" fullWidth>
            <Tab key="description" title="Description">
              <h2 className="text-lg font-semibold text-foreground-700">
                About Event
              </h2>
              <Skeleton className="min-h-8 rounded-md" isLoaded={!!dataEvent}>
                <p className="text-foreground-500">{dataEvent?.description}</p>
              </Skeleton>
            </Tab>
            <Tab key="ticket" title="Ticket">
              <h2 className="text-lg font-semibold text-foreground-700">
                Ticket
              </h2>
              <div className="mt-2 flex flex-col gap-8">
                {dataTicket?.map((ticket: ITicket) => (
                  <DetailEventTicket
                    key={`ticket-${ticket._id}`}
                    ticket={ticket}
                    cart={cart}
                    handleAddToCart={() => handleAddToCart(`${ticket._id}`)}
                  />
                ))}
              </div>
            </Tab>
          </Tabs>
        </div>
        <div className="w-full lg:w-2/6">
          <DetailEventCart
            cart={cart}
            dataTicketInCart={dataTicketInCart}
            onChangeQuantity={handleChangeQuantity}
            onCreateOrder={mutateCreateOrder}
            isLoading={isPendingCreateOrder}
          />
        </div>
      </section>
    </div>
  );
}
