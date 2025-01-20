import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IEvent } from "@/types/Event";

const eventServices = {
  getEvents: (params?: string) => instance.get(`${endpoint.EVENTS}?${params}`),
  getEventById: (id: string) => instance.get(`${endpoint.EVENTS}/${id}`),
  deleteEvent: (id: string) => instance.delete(`${endpoint.EVENTS}/${id}`),
  updateEvent: (id: string, payload: IEvent) =>
    instance.put(`${endpoint.EVENTS}/${id}`, payload),
  addEvent: (payload: IEvent) => instance.post(`${endpoint.EVENTS}`, payload),
  searchLocationByRegency: (name: string) =>
    instance.get(`${endpoint.REGIONS}-search?name=${name}`),
  getRegencyById: (id: string) =>
    instance.get(`${endpoint.REGIONS}/${id}/regency`),
};

export default eventServices;
