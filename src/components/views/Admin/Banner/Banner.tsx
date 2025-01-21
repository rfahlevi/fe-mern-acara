import Datatable from "@/components/ui/Datatable";
import { Chip, useDisclosure } from "@nextui-org/react";
import { useRouter } from "next/router";
import React, { Key, ReactNode, useCallback, useEffect } from "react";
import { COLUMN_LISTS_BANNER } from "./Banner.constant";
import useBanner from "./useBanner";
import AddBannerModal from "./AddBannerModal";
import DeleteBannerModal from "./DeleteBannerModal";
import Image from "next/image";
import useChangeUrl from "@/hooks/useChangeUrl";
import DropdownAction from "@/components/commons/DropdownAction";

export default function Banner() {
  const { push, query, isReady } = useRouter();
  const {
    dataBanner,
    isLoadingBanner,
    isRefetchingBanner,
    refetchBanner,

    selectedId,
    setSelectedId,
  } = useBanner();

  const addBannerModal = useDisclosure();
  const deleteBannerModal = useDisclosure();
  const { setUrl } = useChangeUrl();

  useEffect(() => {
    if (isReady) {
      setUrl();
    }
  }, [isReady]);

  const renderCell = useCallback(
    (banner: Record<string, unknown>, columnKey: Key) => {
      const cellValue = banner[columnKey as keyof typeof banner];

      switch (columnKey) {
        case "image":
          return (
            <Image src={`${cellValue}`} alt="image" width={200} height={200} />
          );
        case "isShow":
          return (
            <Chip
              color={cellValue === true ? "success" : "warning"}
              size="sm"
              variant="flat"
            >
              {cellValue === true ? "Published" : "Not Published"}
            </Chip>
          );
        case "actions":
          return (
            <DropdownAction
              detailKey="banner"
              onPressDetail={() => push(`/admin/categories/${banner._id}`)}
              onPressDelete={() => {
                setSelectedId(`${banner._id}`);
                deleteBannerModal.onOpen();
              }}
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
          buttonTopContentLabel="Create Banner"
          columns={COLUMN_LISTS_BANNER}
          data={dataBanner?.data.data || []}
          emptyContent="Banner is Empty"
          isLoading={isLoadingBanner || isRefetchingBanner}
          onClickButtonTopContent={addBannerModal.onOpen}
          renderCell={renderCell}
          totalPages={dataBanner?.data.pagination.totalPages}
        />
      )}
      {/* <AddBannerModal {...addBannerModal} refectBanner={refetchBanner} />
      <DeleteBannerModal
        {...deleteBannerModal}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        refectBanner={refetchBanner}
      /> */}
    </section>
  );
}
