"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Autoplay, Navigation } from "swiper/modules";
import { FaStar } from "react-icons/fa6";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { ImFire } from "react-icons/im";
import Image from "next/image";
import Link from "next/link";
import { fetchPopular } from "../../../Service/imdbAPI";
import Aos from "aos";
import "aos/dist/aos.css";

export default function PopularMovie() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    const getPopularMovie = async () => {
      try {
        const res = await fetchPopular("movie");
        setMovie(res);
      } catch (err) {
        console.log("getPopularMovieSection error: ", err);
      }
    };

    getPopularMovie();
  }, []);

  useEffect(() => {
    Aos.init({
      duration: 300,
      once: false, // อนุญาตให้ AOS ทำงานซ้ำ
    });
  }, []);

  return (
    <div className="relative">
      {/* Header */}
      <div className="my-5 ml-8 flex items-center">
        <ImFire className="mr-2 text-xl text-[#FFC300]" />
        <h1 className="text-xl font-semibold">Popular Movie</h1>
        <div className="group ml-2 flex items-center">
          <div className="relative flex w-auto items-center">
            <IoIosArrowDroprightCircle className="transition-transform duration-300 group-hover:translate-x-20 group-hover:text-amber-300" />
            <Link
              href={"#"}
              className="text-md g:translate-x-4 absolute left-0 w-20 text-amber-400 opacity-0 transition-all duration-300 group-hover:underline-offset-1 group-hover:opacity-100"
            >
              See more
            </Link>
          </div>
        </div>
      </div>

      {/* Swiper */}
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
            768: { slidesPerView: 4, spaceBetween: 10 },
            1024: { slidesPerView: 5, spaceBetween: 10 },
            1280: { slidesPerView: 6, spaceBetween: 10 },
            1580: { slidesPerView: 7, spaceBetween: 10 },
          }}
          mousewheel={{ forceToAxis: true, releaseOnEdges: true }}
          className="mb-10 h-auto max-w-full"
          onSlideChange={() => Aos.refresh()} // แก้ปัญหา AOS หายเมื่อเปลี่ยนสไลด์
        >
          {movie.map((item, index) => (
            <SwiperSlide key={item.id} className="h-[500px]">
              <div data-aos="fade-up" data-aos-delay={index * 100}>
                <Link
                  href={`/movie/${item.id}`}
                  className="relative block overflow-hidden rounded-md"
                >
                  <div className="group relative h-0 w-full pb-[150%]">
                    <Image
                      src={`https://image.tmdb.org/t/p/original${item.poster_path || item.backdrop_path}`}
                      width={250}
                      height={250}
                      alt={item.original_title}
                      className="absolute left-0 top-0 h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                    />
                  </div>
                </Link>
                <h2 className="mt-2 line-clamp-1 font-semibold">
                  {item.original_title || item.name}
                </h2>
                <div className="flex justify-between">
                  <p className="text-[#a6a6a6]">
                    {item.release_date?.split("-")[0] || "N/A"}
                  </p>
                  <div className="flex items-center">
                    <FaStar className="text-amber-400" />
                    <p className="ml-1 text-[#a6a6a6]">
                      {item.vote_average?.toFixed(1) || "-"}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
