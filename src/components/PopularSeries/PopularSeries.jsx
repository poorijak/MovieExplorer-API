"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Autoplay, Navigation } from "swiper/modules";
import { FaPlay, FaStar } from "react-icons/fa6";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { TbHandFinger } from "react-icons/tb";
import Image from "next/image";
import { ImFire } from "react-icons/im";
import Link from "next/link";
import Aos from "aos";
import "aos/dist/aos.css";
import { fetchPopular } from "../../../Service/imdbAPI";

export default function PopularSeries() {
  const [series, setSeries] = useState([]);

  useEffect(() => {
    const getPopularseries = async () => {
      try {
        const res = await fetchPopular("tv");
        setSeries(res);
      } catch (err) {
        console.log("getPopularseriesSection is : ", err);
      }
    };
    getPopularseries();
  }, []);

  useEffect(() => {
    Aos.init({
      duration: 400,
      once: false,
    });
  }, []);

  return (
    <>
      <div className="my-5 ml-8 flex items-center">
        <ImFire className="mr-2 text-xl text-[#00B2FF]" />
        <h1 className="text-xl font-semibold">Popular Tv</h1>
        <div className="group ml-2 flex items-center">
          <div className="relative flex w-auto items-center">
            {/* ลูกศร */}
            <IoIosArrowDroprightCircle className="transition-transform duration-300 group-hover:translate-x-20 group-hover:text-amber-300" />
            {/* ลิงก์ */}
            <Link
              href={"#"}
              className="text-md g:translate-x-4 absolute left-0 w-20 text-amber-400 opacity-0 transition-all duration-300 group-hover:underline-offset-1 group-hover:opacity-100"
            >
              See more
            </Link>
          </div>
        </div>
      </div>
      <div className="ml-10 max-w-full rounded-md">
        <Swiper
          modules={[Autoplay, Mousewheel, Navigation]}
          direction="horizontal"
          spaceBetween={10}
          slidesPerView={2}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          breakpoints={{
            768: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 10,
            },
            1280: {
              slidesPerView: 6,
              spaceBetween: 10,
            },
            1580: {
              slidesPerView: 7,
              spaceBetween: 10,
            },
          }}
          // autoplay={{
          //   delay: 10000,
          //   disableOnInteraction: true, // ไม่ปิด autoplay เมื่อใช้ mousewheel
          // }}
          mousewheel={{
            forceToAxis: true,
            releaseOnEdges: true,
          }}
          onSlideChange={Aos.refresh}
          className="mb-10 h-auto max-w-full focus:cursor-grabbing"
        >
          {series.map((item, index) => (
            <SwiperSlide
              key={item.id}
              className="h-[500px]"
              data-aos="fade-up"
              data-aos-delay={index * 50}
            >
              <div>
                <Link
                  href={`/series/${item.id}`}
                  className="relative block overflow-hidden rounded-md"
                >
                  <div className="group relative h-0 w-full overflow-hidden pb-[150%]">
                    <Image
                      src={`https://image.tmdb.org/t/p/original${item.poster_path || item.backdrop_path}`}
                      width={250}
                      height={250}
                      alt={item.original_name}
                      className="absolute left-0 top-0 h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                    />
                  </div>
                </Link>
                <div className="mt-1 flex justify-between">
                  <h2 className="mt-2 line-clamp-1 font-semibold">
                    {item.original_name || item.name}
                  </h2>
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <FaStar className="text-amber-400" />
                      <p className="ml-1 text-[#a6a6a6]">
                        {item.vote_average.toFixed(1)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
