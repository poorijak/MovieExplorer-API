"use client";
import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Autoplay, Navigation } from "swiper/modules";
import Image from "next/image";
import Aos from "aos";
import { MdOutlineImageNotSupported } from "react-icons/md";
import "aos/dist/aos.css";

const Actor = ({ data }) => {
  useEffect(() => {
    Aos.init({
      duration: 300,
      once: false, // อนุญาตให้ AOS ทำงานซ้ำ
    });
  }, []);

  return (
    <div className="mt-10 w-full px-3 text-white lg:px-10">
      <div>
        <h2 className="lg:ext-2xl mb-4 text-4xl font-semibold">
          Top Billed Cast
        </h2>
      </div>
      <div className="w-full rounded-md">
        <Swiper
          modules={[Autoplay, Mousewheel, Navigation]}
          direction="horizontal" // แสดงแนวนอน
          spaceBetween={15}
          slidesPerView={9} // ค่าเริ่มต้น
          breakpoints={{
            640: {
              slidesPerView: 9,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 9,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 9,
              spaceBetween: 10,
            },
            1280: {
              slidesPerView: 9,
              spaceBetween: 20,
            },
            1500: {
              slidesPerView: 8,
              spaceBetween: 20,
            },
          }}
          mousewheel={{
            forceToAxis: true,
            releaseOnEdges: true,
          }}
          className="mb-10 h-auto w-[1600px] lg:w-[2000px]"
          onSlideChange={() => Aos.refresh()} // แก้ปัญหา AOS หายเมื่อเปลี่ยนสไลด์
        >
          {data.map((item, index) => (
            <SwiperSlide key={item.id} className="h-60 w-72">
              <div
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="flex h-72 border-spacing-1 flex-col items-center gap-2 rounded-3xl border border-[#313131] bg-[#ffffff11] p-4 text-white"
              >
                {item.profile_path ? (
                  <Image
                    src={`https://image.tmdb.org/t/p/original${item.profile_path || "null"}`}
                    width={150}
                    height={150}
                    alt={item.name}
                    className="lg h-36 w-36 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center">
                    <MdOutlineImageNotSupported className="text-8xl" />
                  </div>
                )}
                <div className="flex flex-col items-center justify-center">
                  <p className="mt-2 text-center text-base font-medium lg:text-lg">
                    {item.name}
                  </p>
                  <p className="mt-1 text-center text-lg text-[#A6A6A6]">
                    {item.character}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Actor;
