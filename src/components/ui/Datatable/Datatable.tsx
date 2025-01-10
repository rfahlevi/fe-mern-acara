import {
  Button,
  Pagination,
  Select,
  SelectItem,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React, { ChangeEvent, Key, ReactNode, useMemo } from "react";
import CustomInput from "../CustomInput";
import { CiSearch } from "react-icons/ci";
import { LIMIT_LISTS } from "@/constants/list.constants";
import { cn } from "@/utils/cn";

interface PropTypes {
  buttonTopContentLabel?: string;
  columns: Record<string, unknown>[];
  currentPage: number;
  data: Record<string, unknown>[];
  emptyContent: string;
  isLoading?: boolean;
  limit: string;
  onChangeLimit: (e: ChangeEvent<HTMLSelectElement>) => void;
  onChangePage: (page: number) => void;
  onChangeSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  onClearSearch: () => void;
  onClickButtonTopContent?: () => void;
  totalPages: number;
  renderCell: (item: Record<string, unknown>, columnKey: Key) => ReactNode;
}

export default function Datatable(props: PropTypes) {
  const {
    buttonTopContentLabel,
    columns,
    currentPage,
    data,
    emptyContent,
    isLoading,
    limit,
    onChangeLimit,
    onChangePage,
    onChangeSearch,
    onClearSearch,
    onClickButtonTopContent,
    totalPages,
    renderCell,
  } = props;

  const TopContent = useMemo(() => {
    return (
      <div className="flex flex-col-reverse items-start justify-between gap-y-4 lg:flex-row lg:items-center">
        <CustomInput
          isClearable
          className="w-full sm:max-w-[24%]"
          placeholder="Search by name"
          startContent={<CiSearch />}
          onClear={onClearSearch}
          onChange={onChangeSearch}
        />
        {buttonTopContentLabel && (
          <Button color="danger" onPress={onClickButtonTopContent}>
            {buttonTopContentLabel}
          </Button>
        )}
      </div>
    );
  }, [
    buttonTopContentLabel,
    onChangeSearch,
    onClearSearch,
    onClickButtonTopContent,
  ]);

  const BottomContent = useMemo(() => {
    return (
      <div className="flex items-center justify-center lg:justify-between">
        <Select
          className="hidden max-w-36 lg:block"
          size="md"
          selectedKeys={[limit]}
          selectionMode="single"
          onChange={onChangeLimit}
          startContent={<p className="text-sm">Show: </p>}
          disallowEmptySelection
        >
          {LIMIT_LISTS.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </Select>

        {totalPages > 1 && (
          <Pagination
            isCompact
            showControls
            color="danger"
            page={currentPage}
            total={totalPages}
            onChange={onChangePage}
            loop
          />
        )}
      </div>
    );
  }, [currentPage, limit, onChangeLimit, onChangePage, totalPages]);

  return (
    <Table
      aria-label="Category Table"
      bottomContent={BottomContent}
      bottomContentPlacement="outside"
      classNames={{
        base: "max-w-full",
        wrapper: cn({
          "overflow-x-hidden": isLoading,
        }),
      }}
      shadow="sm"
      topContent={TopContent}
      topContentPlacement="outside"
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid as Key}>
            {column.name as string}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        items={data}
        emptyContent={emptyContent}
        isLoading={isLoading}
        loadingContent={
          <div className="flex h-full w-full items-center justify-center bg-foreground-700/30 backdrop-blur">
            <Spinner color="danger" />
          </div>
        }
      >
        {(item) => (
          <TableRow key={item._id as Key}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
