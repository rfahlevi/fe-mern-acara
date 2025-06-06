import categoryServices from "@/services/category.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { DateValue } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schemaUpdateInfo = yup.object().shape({
  name: yup.string().required("Please input name"),
  category: yup.string().required("Please select category"),
  startDate: yup.mixed<DateValue>().required("Please select start date"),
  endDate: yup.mixed<DateValue>().required("Please select end date"),
  isPublished: yup.string().required("Please select status"),
  isFeatured: yup.string().required("Please select featured"),
  description: yup.string().required("Please input description"),
});

const useInfoTab = () => {
  const router = useRouter();

  const {
    control: controlUpdateInfo,
    handleSubmit: handleSubmitUpdateInfo,
    formState: { errors: errorsUpdateInfo },
    reset: resetUpdateInfo,
    setValue: setValueUpdateInfo,
  } = useForm({
    resolver: yupResolver(schemaUpdateInfo),
  });

  const { data: dataCategory, isLoading: isLoadingCategory } = useQuery({
    queryKey: ["category"],
    queryFn: () => categoryServices.getCategories(),
    enabled: router.isReady,
  });

  return {
    controlUpdateInfo,
    dataCategory,
    errorsUpdateInfo,
    handleSubmitUpdateInfo,
    isLoadingCategory,
    resetUpdateInfo,
    setValueUpdateInfo,
  };
};

export default useInfoTab;
