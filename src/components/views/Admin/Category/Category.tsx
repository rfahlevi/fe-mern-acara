import Datatable from "@/components/ui/Datatable";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { Key, ReactNode, useCallback } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { COLUMN_LISTS_CATEGORY } from "./Category.constant";
import { LIMIT_LISTS } from "@/constants/list.constants";

export default function Category() {
  const { push } = useRouter();
  const renderCell = useCallback(
    (category: Record<string, unknown>, columnKey: Key) => {
      const cellValue = category[columnKey as keyof typeof category];

      switch (columnKey) {
        case "icon":
          return (
            <Image src={`${cellValue}`} alt="icon" width={100} height={200} />
          );
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
      <Datatable
        buttonTopContentLabel="Create Category"
        columns={COLUMN_LISTS_CATEGORY}
        currentPage={1}
        data={[
          {
            _id: "12345",
            name: "Kategori 1",
            description: "Deskripsi kategori 1",
            icon: "/images/general/logo.png",
          },
          {
            _id: "12346",
            name: "Kategori 2",
            description: "Deskripsi kategori 3",
            icon: "/images/general/logo.png",
          },
        ]}
        emptyContent="Categori is Empty"
        limit={LIMIT_LISTS[0].label}
        onChangeLimit={() => {}}
        onChangePage={() => {}}
        onChangeSearch={() => {}}
        onClearSearch={() => {}}
        onClickButtonTopContent={() => {}}
        renderCell={renderCell}
        totalPage={2}
      />
    </section>
  );
}
