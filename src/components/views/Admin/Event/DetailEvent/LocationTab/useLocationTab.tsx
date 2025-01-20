import { DELAY } from "@/constants/list.constants";
import useDebounce from "@/hooks/useDebounce";
import eventServices from "@/services/event.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schemaUpdateLocation = yup.object().shape({
  isOnline: yup.string().required("Please select online or offline"),
  region: yup.number().required("Please select region"),
  latitude: yup.number().required("Please input latitude coordinate"),
  longitude: yup.number().required("Please input longitude coordinate"),
  address: yup.string().required("Please input address"),
});

const useLocationTab = () => {
  const debounce = useDebounce();

  const {
    control: controlUpdateLocation,
    handleSubmit: handleSubmitUpdateLocation,
    formState: { errors: errorsUpdateLocation },
    reset: resetUpdateLocation,
    setValue: setValueUpdateLocation,
  } = useForm({
    resolver: yupResolver(schemaUpdateLocation),
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

  return {
    controlUpdateLocation,
    dataRegion,
    errorsUpdateLocation,
    handleSearchRegency,
    handleSubmitUpdateLocation,
    isLoadingRegion,
    resetUpdateLocation,
    searchRegency,
    setValueUpdateLocation,
  };
};

export default useLocationTab;
