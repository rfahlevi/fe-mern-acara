import { Skeleton } from "@heroui/react";
import Image from "next/image";

interface PropTypes {
  bannerUrl: string;
  isLoadingBanner: boolean;
}

export default function HomeBanner(props: PropTypes) {
  const { bannerUrl, isLoadingBanner } = props;

  return isLoadingBanner ? (
    <Skeleton
      isLoaded={!!isLoadingBanner}
      className="mb-16 h-[20vw] w-full rounded-lg px-4 lg:px-0"
    />
  ) : (
    <Image
      src={bannerUrl}
      alt="single-banner"
      width={1920}
      height={500}
      className="h-[20vw] rounded-lg object-cover object-center"
    />
  );
}
