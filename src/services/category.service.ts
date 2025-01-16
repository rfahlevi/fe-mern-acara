import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { ICategory } from "@/types/Category";

const categoryServices = {
  getCategories: (params?: string) =>
    instance.get(`${endpoint.CATEGORIES}?${params}`),
  getCategoryById: (id: string) => instance.get(`${endpoint.CATEGORIES}/${id}`),
  addCategory: (payload: ICategory) =>
    instance.post(`${endpoint.CATEGORIES}`, payload),
  deleteCategory: (id: string) =>
    instance.delete(`${endpoint.CATEGORIES}/${id}`),
  updateCategory: (id: string, payload: ICategory) =>
    instance.put(`${endpoint.CATEGORIES}/${id}`, payload),
};

export default categoryServices;
