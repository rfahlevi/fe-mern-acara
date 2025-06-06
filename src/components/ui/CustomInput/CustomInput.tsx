import { Input, InputProps } from "@heroui/react";
import { forwardRef, Ref } from "react";

const CustomInput = forwardRef(
  (props: InputProps, ref: Ref<HTMLInputElement>) => {
    return (
      <Input
        ref={ref}
        {...props}
        radius="sm"
        labelPlacement={props.labelPlacement ?? "outside"}
        variant="bordered"
        autoComplete="off"
        classNames={{
          label: ["text-sm"],
          inputWrapper: [
            "border border-default-200 h-12 shadow-none h-6",
            "data-[hover=true]:border-danger-300",
            "group-data-[focus=true]:border-danger-300",
          ],
        }}
      />
    );
  },
);

CustomInput.displayName = "CustomInput";

export default CustomInput;
