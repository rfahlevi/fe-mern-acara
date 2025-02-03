import Datatable from "@/components/ui/Datatable";
import { Chip } from "@heroui/react";
import { useRouter } from "next/router";
import React, { Key, ReactNode, useCallback, useEffect } from "react";
import { COLUMN_LISTS_TRANSACTION } from "./Transaction.constant";
import useTransaction from "./useTransaction";
import useChangeUrl from "@/hooks/useChangeUrl";
import DropdownAction from "@/components/commons/DropdownAction";
import convertIDR from "@/utils/currency";

export default function Transaction() {
  const { push, query, isReady } = useRouter();
  const { dataTransactions, isLoadingTransactions, isRefetchingTransactions } =
    useTransaction();

  const { setUrl } = useChangeUrl();

  useEffect(() => {
    if (isReady) {
      setUrl();
    }
  }, [isReady]);

  const renderCell = useCallback(
    (transaction: Record<string, unknown>, columnKey: Key) => {
      const cellValue = transaction[columnKey as keyof typeof transaction];
      const chipColor = () => {
        switch (cellValue) {
          case "completed":
            return "success";
          case "pending":
            return "warning";
          case "cancelled":
            return "danger";
          default:
            break;
        }
      };

      switch (columnKey) {
        case "status":
          return (
            <Chip
              color={chipColor()}
              size="sm"
              variant="flat"
              className="capitalize"
            >
              {cellValue as ReactNode}
            </Chip>
          );
        case "total":
          return convertIDR(Number(cellValue));
        case "actions":
          return (
            <DropdownAction
              detailKey="transaction"
              onPressDetail={() =>
                push(`/member/transactions/${transaction.orderId}`)
              }
              hideButtonDelete
            />
          );

        default:
          return cellValue as ReactNode;
      }
    },
    [push],
  );
  return (
    <section>
      {Object.keys(query).length > 0 && (
        <Datatable
          columns={COLUMN_LISTS_TRANSACTION}
          data={dataTransactions?.data.data || []}
          emptyContent="Transaction is Empty"
          isLoading={isLoadingTransactions || isRefetchingTransactions}
          renderCell={renderCell}
          totalPages={dataTransactions?.data.pagination.totalPages}
        />
      )}
    </section>
  );
}
