import { Textarea, TextAreaProps } from "@nextui-org/react";
import { forwardRef, Ref } from "react";

const CustomTextArea = forwardRef(
  (props: TextAreaProps, ref: Ref<HTMLInputElement>) => {
    return (
      <Textarea
        {...props}
        radius="sm"
        labelPlacement={props.labelPlacement ?? "outside"}
        variant="bordered"
        autoComplete="off"
        classNames={{
          label: ["text-sm"],
          inputWrapper: [
            "border border-default-200 h-12 shadow-none",
            "data-[hover=true]:border-danger-300",
            "group-data-[focus=true]:border-danger-300",
          ],
        }}
      />
    );
  },
);

CustomTextArea.displayName = "CustomTextArea";

export default CustomTextArea;
