import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";

const categoryServices = {
  getCategories: (params?: string) =>
    instance.get(`${endpoint.CATEGORIES}?${params}`),
};

export default categoryServices;
