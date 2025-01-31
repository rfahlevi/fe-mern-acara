import { IEvent } from "@/types/Event";
import { cn } from "@/utils/cn";
import { toConvertTime } from "@/utils/date";
import { Card, CardBody, CardFooter, Skeleton } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment } from "react";

interface PropTypes {
  className?: string;
  event?: IEvent;
  isLoading?: boolean;
}

export default function CardEvent(props: PropTypes) {
  const { className, event, isLoading } = props;

  return (
    <Card
      shadow="sm"
      isPressable
      as={Link}
      href={`/events/${event?.slug}`}
      className={cn("cursor-pointer rounded-md", className)}
    >
      <CardBody>
        {isLoading ? (
          <Skeleton className="aspect-video w-full rounded-md"></Skeleton>
        ) : (
          <Image
            src={`${event?.banner}`}
            alt={`${event?.name}`}
            width={1920}
            height={1080}
            className="aspect-video w-full rounded-md object-cover"
          />
        )}
      </CardBody>
      <CardFooter
        className={cn("flex-col items-start pt-0 text-left", {
          "gap-2": isLoading,
        })}
      >
        {isLoading ? (
          <Fragment>
            <Skeleton className="aspect-video h-4 w-full rounded-md"></Skeleton>
            <Skeleton className="aspect-video h-4 w-full rounded-md"></Skeleton>
            <Skeleton className="aspect-video h-4 w-1/2 rounded-md"></Skeleton>
          </Fragment>
        ) : (
          <Fragment>
            <h2 className="line-clamp-1 font-semibold text-danger">
              {event?.name}
            </h2>
            <p className="mb-2 line-clamp-2 text-sm">{event?.description}</p>
            <p className="text-sm text-foreground-500">
              {toConvertTime(event?.startDate)}
            </p>
          </Fragment>
        )}
      </CardFooter>
    </Card>
  );
}
