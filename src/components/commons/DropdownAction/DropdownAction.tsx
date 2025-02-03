import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import { CiMenuKebab } from "react-icons/ci";

interface PropTypes {
  detailKey: string;
  onPressDetail: () => void;
  onPressDelete?: () => void;
  hideButtonDelete?: boolean;
}

const DropdownAction = (props: PropTypes) => {
  const {
    detailKey,
    hideButtonDelete = false,
    onPressDelete,
    onPressDetail,
  } = props;

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button isIconOnly size="sm" variant="light">
          <CiMenuKebab className="text-default-700" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem key={`detail-${detailKey}`} onPress={onPressDetail}>
          Detail
        </DropdownItem>
        {!hideButtonDelete ? (
          <DropdownItem
            key={`delete-${detailKey}`}
            className="text-danger-500"
            onPress={onPressDelete}
          >
            Delete
          </DropdownItem>
        ) : null}
      </DropdownMenu>
    </Dropdown>
  );
};

export default DropdownAction;
