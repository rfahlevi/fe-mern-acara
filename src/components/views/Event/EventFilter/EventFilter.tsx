import CustomAutoComplete from "@/components/ui/CustomAutoComplete";
import { ICategory } from "@/types/Category";
import { AutocompleteItem, Skeleton } from "@heroui/react";
import { Controller } from "react-hook-form";
import useEventFilter from "./useEventFilter";
import useChangeUrl from "@/hooks/useChangeUrl";
import { useEffect } from "react";

export default function EventFilter() {
  const {
    control,
    dataCategories,
    isLoadingCategories,
    isSuccessCategories,
    setValue,
  } = useEventFilter();

  const {
    currentCategory,
    currentIsFeatured,
    currentIsOnline,
    handleChangeCategory,
    handleChangeIsFeatured,
    handleChangeIsOnline,
  } = useChangeUrl();

  useEffect(() => {
    if (currentCategory !== "") {
      setValue("category", `${currentCategory}`);
      setValue("isFeatured", `${currentIsFeatured}`);
      setValue("isOnline", `${currentIsOnline}`);
    }
  }, [isSuccessCategories]);

  return (
    <div className="sticky top-20 h-fit w-full rounded-lg border p-4 lg:w-80">
      <h4 className="font-semibold text-danger">Filter</h4>
      <div className="mt-2 flex flex-col gap-4">
        {isSuccessCategories ? (
          <>
            <Controller
              name="category"
              control={control}
              render={({ field: { onChange, ...field } }) => (
                <CustomAutoComplete
                  {...field}
                  defaultSelectedKey={`${currentCategory}`}
                  defaultItems={dataCategories?.data?.data || []}
                  isLoading={isLoadingCategories}
                  label="Category"
                  placeholder="Select or search category"
                  variant="bordered"
                  labelPlacement="outside"
                  onSelectionChange={(value) => {
                    onChange(value);
                    handleChangeCategory(value !== null ? `${value}` : "");
                  }}
                >
                  {(category: ICategory) => (
                    <AutocompleteItem key={category._id}>
                      {category.name}
                    </AutocompleteItem>
                  )}
                </CustomAutoComplete>
              )}
            />
            <Controller
              name="isOnline"
              control={control}
              render={({ field }) => (
                <CustomAutoComplete
                  {...field}
                  label="Online / Offline"
                  variant="bordered"
                  labelPlacement="outside"
                  placeholder="Select or search status"
                  defaultSelectedKey={`${currentIsOnline}`}
                  onSelectionChange={(e) =>
                    handleChangeIsOnline(e !== null ? `${e}` : "")
                  }
                >
                  <AutocompleteItem key="true" value="true">
                    Online
                  </AutocompleteItem>
                  <AutocompleteItem key="false" value="false">
                    Offline
                  </AutocompleteItem>
                </CustomAutoComplete>
              )}
            />
            <Controller
              name="isFeatured"
              control={control}
              render={({ field }) => (
                <CustomAutoComplete
                  {...field}
                  label="Featured"
                  variant="bordered"
                  labelPlacement="outside"
                  placeholder="Select or search status"
                  defaultSelectedKey={`${currentIsFeatured}`}
                  onSelectionChange={(e) =>
                    handleChangeIsFeatured(e !== null ? `${e}` : "")
                  }
                >
                  <AutocompleteItem key="true" value="true">
                    Yes
                  </AutocompleteItem>
                  <AutocompleteItem key="false" value="false">
                    No
                  </AutocompleteItem>
                </CustomAutoComplete>
              )}
            />
          </>
        ) : (
          <div className="flex flex-col gap-1">
            <Skeleton className="h-3 w-1/3 rounded-md" />
            <div className="flex h-fit w-full rounded-md border border-default-200 p-2">
              <Skeleton className="h-7 w-full rounded-md" />
            </div>
            <Skeleton className="mt-4 h-3 w-1/3 rounded-md" />
            <div className="flex h-fit w-full rounded-md border border-default-200 p-2">
              <Skeleton className="h-7 w-full rounded-md" />
            </div>
            <Skeleton className="mt-4 h-3 w-1/3 rounded-md" />
            <div className="flex h-fit w-full rounded-md border border-default-200 p-2">
              <Skeleton className="h-7 w-full rounded-md" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
