import { Skeleton } from "@heroui/react";
import Image from "next/image";

interface PropTypes {
  bannerUrl: string;
  isLoadingBanner: boolean;
}

export default function HomeBanner(props: PropTypes) {
  const { bannerUrl, isLoadingBanner } = props;

  return isLoadingBanner ? (
    <Skeleton className="mb-16 h-[20vw] w-full rounded-lg" />
  ) : (
    <div className="mx-4 lg:mx-0">
      <Image
        src={bannerUrl}
        alt="single-banner"
        width={1920}
        height={500}
        className="mb-16 h-[20vw] w-full rounded-lg object-cover object-center"
      />
    </div>
  );
}
