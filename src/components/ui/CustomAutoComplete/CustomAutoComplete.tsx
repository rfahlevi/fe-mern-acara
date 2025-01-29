import { Autocomplete, AutocompleteProps } from "@heroui/react";
import { forwardRef } from "react";

interface PropTypes {
  children: any;
}

const CustomAutoComplete = forwardRef<
  HTMLInputElement,
  AutocompleteProps & PropTypes
>((props, ref) => {
  const { children, ...field } = props;

  return (
    <Autocomplete
      {...field}
      ref={ref}
      radius="sm"
      labelPlacement={props.labelPlacement ?? "outside"}
      variant="bordered"
      autoComplete="off"
      inputProps={{
        classNames: {
          inputWrapper: [
            "border border-default-200 h-12",
            "data-[hover=true]:border-danger-300",
            "group-data-[focus=true]:border-danger-300",
          ],
        },
      }}
    >
      {children}
    </Autocomplete>
  );
});

CustomAutoComplete.displayName = "CustomAutoComplete";

export default CustomAutoComplete;
