import { DateValue } from "@nextui-org/react";

interface IEvent {
  name: string;
  // slug: string;
  category: string;
  isFeatured: boolean | string;
  isPublished: boolean | string;
  isOnline: boolean | string;
  description: string;
  startDate: string;
  endDate: string;
  location?: {
    region: number;
    coordinates: number[];
    address: string;
  };
  banner: string | FileList;
}

interface IEventForm extends IEvent {
  region: number;
  startDate: DateValue;
  endDate: DateValue;
  latitude: number;
  longitude: number;
  address: string;
}

interface IRegency {
  id: string;
  name: string;
}

export type { IEvent, IEventForm, IRegency };
