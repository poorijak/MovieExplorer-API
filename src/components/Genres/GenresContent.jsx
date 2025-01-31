import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaPlay, FaStar } from "react-icons/fa6";
import Aos from "aos";
import "aos/dist/aos.css";

export default function GenresContent({ content }) {
  useEffect(() => {
    Aos.init({
      duration: 400,
      once: true,
    });
  }, []);

  return (
    <div className="mx-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
      {content.map((item, index) => (
        <div
          key={item.id}
          className="mx-2 my-5 rounded-md"
          data-aos="fade-up"
          data-aos-delay={index * 50}
        >
          <Link
            href={`/movie/${item.id}`}
            className="overflow relative block overflow-hidden rounded-md"
          >
            <div className="group relative h-0 w-full pb-[150%]">
              <Image
                src={`https://image.tmdb.org/t/p/original${item.poster_path || item.backdrop_path}`}
                width={250}
                height={250}
                alt={item.original_title || item.name}
                className="absolute left-0 top-0 h-full w-full rounded-md object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
              />
            </div>
          </Link>
          <h2 className="mt-2 line-clamp-1 font-semibold">
            {item.original_title || item.name}
          </h2>
          <div className="flex justify-between">
            <p className="text-[#a6a6a6]">
              {item.release_date
                ? item.release_date.split("-")[0]
                : item.first_air_date
                  ? item.first_air_date.split("-")[0]
                  : "Unknown"}
            </p>
            <div className="flex items-center">
              <FaStar className="text-amber-400" />
              <p className="ml-1 text-[#a6a6a6]">
                {item.vote_average.toFixed(1)}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
