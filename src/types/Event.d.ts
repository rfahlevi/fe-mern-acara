import { DateValue } from "@nextui-org/react";

interface IEvent {
  _id?: string;
  name?: string;
  // slug: string;
  category?: string;
  isFeatured?: boolean | string;
  isPublished?: boolean | string;
  isOnline?: boolean | string;
  description?: string;
  startDate?: string | DateValue;
  endDate?: string | DateValue;
  location?: {
    region: number | string;
    coordinates: number[];
    address: string;
  };
  banner?: string | FileList;
}

interface IEventForm extends IEvent {
  region?: number;
  latitude?: number;
  longitude?: number;
  address?: string;
}

interface IRegency {
  id: string;
  name: string;
}

export type { IEvent, IEventForm, IRegency };
