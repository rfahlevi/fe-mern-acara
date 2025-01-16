import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import React from "react";
import { CiMenuKebab } from "react-icons/ci";

interface PropTypes {
  key: string;
  onPressDetail: () => {};
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
        <DropdownItem key={`detail-${props.key}`} onPress={props.onPressDetail}>
          Detail
        </DropdownItem>
        <DropdownItem
          key={`detail-${props.key}`}
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
