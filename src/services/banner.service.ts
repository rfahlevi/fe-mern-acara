import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IBanner } from "@/types/Banner";

const bannerServices = {
  getBanners: (params?: string) =>
    instance.get(`${endpoint.BANNERS}?${params}`),
  getBannerById: (id: string) => instance.get(`${endpoint.BANNERS}/${id}`),
  addBanner: (payload: IBanner) =>
    instance.post(`${endpoint.BANNERS}`, payload),
  deleteBanner: (id: string) => instance.delete(`${endpoint.BANNERS}/${id}`),
  updateBanner: (id: string, payload: IBanner) =>
    instance.put(`${endpoint.BANNERS}/${id}`, payload),
};

export default bannerServices;
