"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Autoplay, Navigation } from "swiper/modules";
import Image from "next/image";
import { FaPlay, FaStar } from "react-icons/fa6";
import Link from "next/link";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default function TopRated({ data }) {
  return (
    <>
      <div className="my-5 ml-8 flex items-center">
        <h1 className="text-xl font-semibold">Top Rated Movie!</h1>
      </div>
      <div className="w-full">
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
            delay: 4000,
            disableOnInteraction: false, // ไม่ปิด autoplay เมื่อใช้ mousewheel
          }}
          mousewheel={{
            forceToAxis: true,
            releaseOnEdges: true,
          }}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          className="max-w-full"
        >
          {data.map((item) => (
            <SwiperSlide key={item.id}>
              <div
                style={{
                  backgroundImage: `url(${`https://image.tmdb.org/t/p/original${item.backdrop_path}`})`,
                }}
                className="mx-auto h-screen w-11/12 bg-cover bg-center hover:cursor-grab lg:h-[500px] lg:rounded-xl lg:bg-top"
              >
                <div className="flex h-full w-full items-center justify-center bg-blackOverlay_4 lg:block lg:rounded-xl">
                  <div className="flex flex-col items-center justify-center pt-32 lg:flex-row">
                    <Image
                      src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                      width={200}
                      height={300}
                      priority
                      alt={item.original_title}
                    />
                    <div className="mt-5 flex flex-col items-center justify-center lg:items-start lg:pl-16">
                      <h1 className="mb-5 line-clamp-2 w-96 text-center text-3xl font-bold md:text-4xl lg:text-left lg:text-5xl">
                        {item.original_title}
                      </h1>
                      <p className="mb-4 line-clamp-3 w-96 px-10 font-medium lg:px-0">
                        {item.overview}
                      </p>
                      <div className="mb-4 flex items-center gap-2 text-lg">
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
                        <button className="group rounded-md bg-[#ffd000] font-bold text-black transition-shadow duration-300 hover:shadow-[0px_0px_6px_0px_#ffd900]">
                          <Link
                            href={`/movie/${item.id}`}
                            className="flex items-center gap-4 px-4 py-2 transition-colors duration-100 group-hover:text-white"
                          >
                            <FaPlay /> Watch Detail
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
    </>
  );
}
