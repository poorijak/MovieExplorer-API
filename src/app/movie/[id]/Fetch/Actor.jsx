import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Autoplay, Navigation } from "swiper/modules";
import Image from "next/image";

const Actor = ({ data }) => {
  return (
    <div className="mx-auto mt-10 w-full">
      <div>
        <h2 className="mb-4 text-2xl font-semibold">Top Billed Cast</h2>
      </div>
      <div className="max-w-full rounded-md lg:ml-10">
        <Swiper
          modules={[Autoplay, Mousewheel, Navigation]}
          direction="horizontal" // แสดงแนวนอน
          spaceBetween={2}
          slidesPerView={2} // ค่าเริ่มต้น
          breakpoints={{
            640: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 5,
            },
            1280: {
              slidesPerView: 6,
              spaceBetween: 5,
            },
          }}
          // navigation={true} // เปิดใช้งานปุ่มเลื่อน
          // autoplay={{
          //     delay: 3000,
          //     disableOnInteraction: true, // ไม่ปิด autoplay เมื่อเลื่อนด้วย mousewheel
          // }}
          mousewheel={{
            forceToAxis: true,
            releaseOnEdges: true,
          }}
          className="mb-10 h-auto max-w-full"
        >
          {data.map((item) => (
            <SwiperSlide key={item.id} className="">
              <Image
                src={`https://image.tmdb.org/t/p/original${item.profile_path}`}
                width={235}
                height={300}
                alt={item.name}
                className="rounded-lg object-cover"
              />
              <div className="flex flex-col items-center justify-center">
                <p className="mt-2 text-center text-xl font-medium">
                  {item.name}
                </p>
                <p className="text-[#A6A6A6]">{item.character}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Actor;
