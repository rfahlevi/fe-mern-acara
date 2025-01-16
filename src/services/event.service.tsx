import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";

const eventServices = {
  getEvents: (params?: string) => instance.get(`${endpoint.EVENTS}?${params}`),
};

export default eventServices;
