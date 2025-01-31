import { IBanner } from "@/types/Banner";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Skeleton } from "@heroui/react";
import Image from "next/image";

interface PropTypes {
  banners: IBanner[];
  isLoadingBanners: boolean;
}

export default function HomeSlider(props: PropTypes) {
  const { banners, isLoadingBanners } = props;

  return (
    <div className="mx-4 mb-6 h-[30vw] rounded-lg lg:mx-0 lg:h-[20vw]">
      {!isLoadingBanners ? (
        <Swiper
          pagination={{
            dynamicBullets: true,
            clickable: true,
          }}
          spaceBetween={20}
          loop
          modules={[Autoplay, Pagination]}
          className="h-full w-full"
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
        >
          {banners.map((banner: IBanner) => (
            <SwiperSlide key={`banner-${banner._id}`}>
              <Image
                src={`${banner?.image}`}
                alt={`${banner.title}`}
                width={1920}
                height={500}
                className="h-[70%] w-full rounded-xl object-cover lg:h-[90%]"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <Skeleton className="h-[90%] w-full rounded-xl" />
      )}
    </div>
  );
}
