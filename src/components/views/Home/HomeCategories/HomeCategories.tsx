import { ICategory } from "@/types/Category";
import { Card, CardBody, CardHeader, Skeleton } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";

interface PropTypes {
  categories: ICategory[];
  isLoading: boolean;
}

export default function HomeCategories(props: PropTypes) {
  const { categories, isLoading } = props;

  return (
    <Card className="mx-4 mb-8 p-8 lg:mx-0">
      <CardHeader className="p-0">
        <h1 className="text-lg font-bold text-danger lg:text-xl">
          Category of Events
        </h1>
      </CardHeader>
      <CardBody className="grid auto-cols-[8rem] grid-flow-col gap-4 overflow-x-auto px-0 lg:grid-cols-8">
        {isLoading
          ? Array.from({ length: 8 }, (_, index) => (
              <div
                key={`card-category-skeleton-${index}`}
                className="hover: flex aspect-square cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-default-200 p-4 transition-all duration-200 hover:bg-default-100"
              >
                <Skeleton className="aspect-square w-2/3 rounded-md" />
                <Skeleton className="h-4 w-3/4 rounded-md" />
              </div>
            ))
          : categories.map((category) => (
              <Link
                href={`/events?category=${category._id}`}
                key={`card-category-${category._id}`}
                className="hover: flex aspect-square cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-default-200 p-4 transition-all duration-200 hover:bg-default-100"
              >
                <Image
                  src={`${category.icon}`}
                  alt={`${category.name}`}
                  width={200}
                  height={200}
                  className="w-1/2 rounded-md"
                />
                <h2 className="text-sm font-semibold text-default-700">{`${category.name}`}</h2>
              </Link>
            ))}
      </CardBody>
    </Card>
  );
}
