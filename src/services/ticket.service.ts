import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { ITicket } from "@/types/Ticket";

const ticketServices = {
  addTicket: (payload: ITicket) =>
    instance.post(`${endpoint.TICKETS}`, payload),
  getTicketsByEventId: (ticketId: string) =>
    instance.get(`${endpoint.TICKETS}/${ticketId}/events`),
  deleteTicket: (id: string) => instance.delete(`${endpoint.TICKETS}/${id}`),
  updateTicket: (id: string, payload: ITicket) =>
    instance.put(`${endpoint.TICKETS}/${id}`, payload),
};

export default ticketServices;
