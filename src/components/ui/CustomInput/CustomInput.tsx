import { Input, InputProps } from "@nextui-org/react"
import { forwardRef, Ref } from "react"

const CustomInput = forwardRef((props: InputProps, ref: Ref<HTMLInputElement>) => {
    return <Input
        ref={ref}
        {...props}
        radius="sm"
        labelPlacement="outside"
        variant="bordered"
        autoComplete="off"
        classNames={{
            label: [
                "text-sm",
            ],
            inputWrapper: [
                "border border-default-200 h-12",
                "data-[hover=true]:border-danger-300",
                "group-data-[focus=true]:border-danger-500",
            ]
        }}
    />
})

CustomInput.displayName = "CustomInput"

export default CustomInput