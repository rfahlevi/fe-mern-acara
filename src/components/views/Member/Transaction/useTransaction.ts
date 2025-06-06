import useChangeUrl from "@/hooks/useChangeUrl";
import { onErrorHandler } from "@/libs/axios/responseHandler";
import orderServices from "@/services/order.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useTransaction = () => {
  const router = useRouter();
  const { currentLimit, currentPage, currentSearch } = useChangeUrl();

  const getMemberTransactions = async () => {
    let params = `limit=${currentLimit}&page=${currentPage}&search=${currentSearch}`;

    const res = await orderServices.getMemberOrder(params);
    const data = res;

    return data;
  };

  const {
    data: dataTransactions,
    isLoading: isLoadingTransactions,
    isRefetching: isRefetchingTransactions,
    error: errorTransactions,
  } = useQuery({
    queryKey: ["MemberTransactions", currentPage, currentLimit, currentSearch],
    queryFn: getMemberTransactions,
    enabled: router.isReady && !!currentPage && !!currentLimit,
  });

  return {
    dataTransactions,
    errorTransactions,
    isLoadingTransactions,
    isRefetchingTransactions,
  };
};

export default useTransaction;
