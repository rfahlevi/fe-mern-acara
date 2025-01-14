import Datatable from "@/components/ui/Datatable";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  useDisclosure,
} from "@nextui-org/react";
import { useRouter } from "next/router";
import React, { Key, ReactNode, useCallback, useEffect } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { COLUMN_LISTS_CATEGORY } from "./Category.constant";
import useCategory from "./useCategory";
import AddCategoryModal from "./AddCategoryModal";

export default function Category() {
  const { push, isReady, query } = useRouter();
  const {
    dataCategory,
    isLoadingCategory,
    isRefetchingCategory,
    refetchCategory,

    setURL,
    currentPage,
    currentLimit,
    currentSearch,
    handleChangeLimit,
    handleChangePage,
    handleSearch,
    handleClearSearch,
  } = useCategory();

  const addCategoryModal = useDisclosure();

  useEffect(() => {
    if (isReady) {
      setURL();
    }
  }, [isReady]);

  const renderCell = useCallback(
    (category: Record<string, unknown>, columnKey: Key) => {
      const cellValue = category[columnKey as keyof typeof category];

      switch (columnKey) {
        case "actions":
          return (
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <CiMenuKebab className="text-default-700" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem
                  key="detail-category"
                  onPress={() => push(`/admin/categories/${category._id}`)}
                >
                  Detail
                </DropdownItem>
                <DropdownItem key="delete-category" className="text-danger-500">
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
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
          buttonTopContentLabel="Create Category"
          columns={COLUMN_LISTS_CATEGORY}
          currentPage={Number(currentPage)}
          data={dataCategory?.data.data || []}
          emptyContent="Categori is Empty"
          isLoading={isLoadingCategory || isRefetchingCategory}
          limit={String(currentLimit)}
          onChangeLimit={handleChangeLimit}
          onChangePage={handleChangePage}
          onChangeSearch={handleSearch}
          onClearSearch={handleClearSearch}
          onClickButtonTopContent={addCategoryModal.onOpen}
          renderCell={renderCell}
          totalPages={dataCategory?.data.pagination.totalPages}
        />
      )}
      <AddCategoryModal
        {...addCategoryModal}
        refectCategory={refetchCategory}
      />
    </section>
  );
}
