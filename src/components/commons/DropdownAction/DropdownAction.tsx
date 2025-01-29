import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import React from "react";
import { CiMenuKebab } from "react-icons/ci";

interface PropTypes {
  detailKey: string;
  onPressDetail: () => void;
  onPressDelete: () => void;
}

const DropdownAction = (props: PropTypes) => {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button isIconOnly size="sm" variant="light">
          <CiMenuKebab className="text-default-700" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem
          key={`detail-${props.detailKey}`}
          onPress={props.onPressDetail}
        >
          Detail
        </DropdownItem>
        <DropdownItem
          key={`delete-${props.detailKey}`}
          className="text-danger-500"
          onPress={props.onPressDelete}
        >
          Delete
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default DropdownAction;
