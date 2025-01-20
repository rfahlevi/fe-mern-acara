import { DELAY } from "@/constants/list.constants";
import useDebounce from "@/hooks/useDebounce";
import useMediaHandling from "@/hooks/useMediaHandling";
import categoryServices from "@/services/category.service";
import eventServices from "@/services/event.service";
import { IEvent, IEventForm } from "@/types/Event";
import { toStandardDate } from "@/utils/date";
import { yupResolver } from "@hookform/resolvers/yup";
import { getLocalTimeZone, now } from "@internationalized/date";
import { DateValue } from "@nextui-org/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Please input name"),
  // slug: yup.string().required("Please input slug"),
  category: yup.string().required("Please select category"),
  startDate: yup.mixed<DateValue>().required("Please select start date"),
  endDate: yup.mixed<DateValue>().required("Please select end date"),
  isPublished: yup.string().required("Please select status"),
  isFeatured: yup.string().required("Please select featured"),
  description: yup.string().required("Please input description"),
  isOnline: yup.string().required("Please select online or offline"),
  region: yup.number().required("Please select region"),
  latitude: yup.number().required("Please input latitude coordinate"),
  longitude: yup.number().required("Please input longitude coordinate"),
  address: yup.string().required("Please input address"),
  banner: yup.mixed<FileList | string>().required("Please input banner"),
});

const useAddEventModal = () => {
  const {
    isPendingMutateUploadFile,
    isPendingMutateDeleteFile,
    handleUploadFile,
    handleDeleteFile,
  } = useMediaHandling();
  const router = useRouter();
  const debounce = useDebounce();

  const {
    control,
    handleSubmit: handleFormSubmit,
    formState: { errors },
    reset,
    watch,
    getValues,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const preview = watch("banner");
  const fileUrl = getValues("banner");

  setValue("startDate", now(getLocalTimeZone()));
  setValue("endDate", now(getLocalTimeZone()));
  setValue("isPublished", "false");
  setValue("isFeatured", "false");
  setValue("isOnline", "false");

  const handleUploadBanner = (
    files: FileList,
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleUploadFile(files, onChange, (fileUrl: string | undefined) => {
      if (fileUrl) {
        setValue("banner", fileUrl);
      }
    });
  };

  const handleDeleteBanner = (
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleDeleteFile(fileUrl, () => onChange(undefined));
  };

  const handleOnClose = (onClose: () => void) => {
    handleDeleteFile(fileUrl, () => {
      reset();
      onClose();
    });
  };

  const { data: dataCategory, isLoading: isLoadingCategory } = useQuery({
    queryKey: ["category"],
    queryFn: () => categoryServices.getCategories(),
    enabled: router.isReady,
  });

  const [searchRegency, setSearchRegency] = useState("");

  const { data: dataRegion, isLoading: isLoadingRegion } = useQuery({
    queryKey: ["region", searchRegency],
    queryFn: () => eventServices.searchLocationByRegency(`${searchRegency}`),
    enabled: searchRegency !== "",
  });

  const handleSearchRegency = (region: string) => {
    debounce(() => setSearchRegency(region), DELAY);
  };

  const addEvent = async (payload: IEvent) => {
    const res = await eventServices.addEvent(payload);
    return res;
  };

  const {
    mutate: mutateAddEvent,
    isPending: isPendingMutateAddEvent,
    isSuccess: isSuccessMutateAddEvent,
  } = useMutation({
    mutationFn: addEvent,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Success add new event!");
      reset();
    },
  });

  const handleAddEvent = (data: IEventForm) => {
    const payload = {
      ...data,
      isFeatured: data.isFeatured === "true" ? true : false,
      isPublished: data.isPublished === "true" ? true : false,
      isOnline: data.isOnline === "true" ? true : false,
      startDate: toStandardDate(data.startDate),
      endDate: toStandardDate(data.endDate),
      location: {
        region: data.region,
        coordinates: [Number(data.latitude), Number(data.longitude)],
        address: data.address,
      },
      banner: data.banner,
    };

    mutateAddEvent(payload);
  };

  return {
    control,
    errors,
    reset,
    handleAddEvent,
    handleFormSubmit,
    isPendingMutateAddEvent,
    isSuccessMutateAddEvent,

    preview,
    handleUploadBanner,
    isPendingMutateUploadFile,
    handleDeleteBanner,
    isPendingMutateDeleteFile,

    handleOnClose,

    dataCategory,
    isLoadingCategory,

    handleSearchRegency,
    isLoadingRegion,
    dataRegion,
    searchRegency,
  };
};

export default useAddEventModal;
