import { LIMIT_LISTS } from "@/constants/list.constants";
import useChangeUrl from "@/hooks/useChangeUrl";
import { Divider, Pagination, Select, SelectItem } from "@heroui/react";

interface PropTypes {
  totalPages: number;
}

const EventFooter = (props: PropTypes) => {
  const { totalPages } = props;
  const { currentLimit, currentPage, handleChangeLimit, handleChangePage } =
    useChangeUrl();

  return (
    <div className="flex flex-col items-center justify-center gap-4 lg:flex-row lg:justify-between lg:gap-0">
      <Select
        className="max-w-28"
        size="md"
        selectedKeys={[String(currentLimit)]}
        selectionMode="single"
        aria-label="Limit"
        onChange={handleChangeLimit}
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
          page={Number(currentPage)}
          total={totalPages}
          onChange={handleChangePage}
          loop
        />
      )}
    </div>
  );
};

export default EventFooter;
