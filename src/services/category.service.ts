import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { ICategory } from "@/types/Category";

const categoryServices = {
  getCategories: (params?: string) =>
    instance.get(`${endpoint.CATEGORIES}?${params}`),
  addCategory: (payload: ICategory) =>
    instance.post(`${endpoint.CATEGORIES}`, payload),
};

export default categoryServices;
