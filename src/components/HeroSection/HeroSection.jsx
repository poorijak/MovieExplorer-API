"use client";
import React, { useEffect, useState } from "react";
import { fetchPopular, fetchTrending } from "../../../Service/imdbAPI";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import { FaPlay, FaStar } from "react-icons/fa6";
import "swiper/css/navigation";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection({ content, lastSlice, data }) {
  return (
    <div className="relative w-full">
      <Swiper
        modules={[Autoplay, Mousewheel, Navigation]}
        direction="horizontal"
        spaceBetween={10}
        slidesPerView={1}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        autoplay={{
          delay: 10000,
          disableOnInteraction: true, // ไม่ปิด autoplay เมื่อใช้ mousewheel
        }}
        mousewheel={{
          forceToAxis: true,
          releaseOnEdges: true,
        }}
        className="max-w-full hover:cursor-grabbing"
      >
        {data.map((item) => (
          <SwiperSlide key={item.id}>
            <div
              style={{
                backgroundImage: `url(${`https://image.tmdb.org/t/p/original${item.backdrop_path}`})`,
              }}
              className="h-[90vh] w-screen bg-cover bg-center xl:bg-top"
            >
              <div className="flex h-full w-full items-center justify-center bg-blackOverlay_1 xl:block xl:bg-blackOverlay_2">
                <div className="">
                  <div className="flex flex-col justify-center pt-36 xl:justify-start xl:pl-16">
                    <h1 className="mb-2 text-center text-3xl font-bold md:text-4xl lg:text-left xl:mb-5 xl:text-6xl">
                      {item.original_title || item.name}
                    </h1>
                    <p className="smblock mb-5 line-clamp-1 hidden w-96 font-medium md:line-clamp-2 2xl:line-clamp-3">
                      {item.overview}
                    </p>
                    <p className="mb-5 text-center font-semibold text-white xl:text-left xl:text-[#BFBFBF]">
                      {item.genres.join(" , ")}
                    </p>
                    <div className="mb-5 flex items-center justify-center gap-2 text-lg xl:justify-start">
                      <FaStar className="text-amber-400" />
                      <p className="mr-2 flex items-center text-2xl font-bold">
                        {item.vote_average.toFixed(1)}
                        <span className="ml-2 text-lg"> /10</span>
                      </p>
                      <Image
                        src="IMDB.svg"
                        width={50}
                        height={50}
                        alt="imdb logo"
                      />
                    </div>
                    <div className="item-center flex justify-center gap-5 lg:justify-normal">
                      <button className="group rounded-md bg-[#FF1C1C] font-bold text-black transition-shadow duration-300 hover:shadow-[0px_0px_10px_-1px_#ff4f4f]">
                        <Link
                          href={`/movie/${item.id}`}
                          className="flex items-center gap-4 px-4 py-2 transition-colors duration-100 group-hover:text-white"
                        >
                          <FaPlay /> Watch Detail
                        </Link>
                      </button>
                      <button className="group rounded-md bg-[#303030] font-semibold text-white transition-shadow duration-300 hover:shadow-[0px_0px_10px_-1px_#545454]">
                        <Link
                          href={`/movie/${item.id}`}
                          className="flex items-center gap-4 px-4 py-2 transition-colors duration-100 group-hover:text-white"
                        >
                          Play trailer
                        </Link>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
