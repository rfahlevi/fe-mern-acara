import { DatePicker, DatePickerProps } from "@nextui-org/react";
import React, { forwardRef, Ref } from "react";

const CustomDatePicker = forwardRef(
  (field: DatePickerProps, ref: Ref<HTMLInputElement>) => {
    return (
      <DatePicker
        {...field}
        variant="bordered"
        hideTimeZone
        showMonthAndYearPickers
        radius="sm"
        dateInputClassNames={{
          inputWrapper: [
            "border border-default-200 h-12",
            "hover:border-danger-300",
            "focus-within:border-danger-300",
            "focus-within:hover:border-danger-300",
          ],
        }}
      />
    );
  },
);

export default CustomDatePicker;
