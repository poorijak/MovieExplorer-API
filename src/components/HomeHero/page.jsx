import { React, useEffect, useRef, useState } from "react";
import { fetchPopular } from "../../../Service/imdbAPI";
import Image from "next/image";
import Link from "next/link";
import { FaPlay, FaStar } from "react-icons/fa6";
import { useScroll, useTransform, motion } from "framer-motion";

const page = ({ movie }) => {
  const ImageRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ImageRef,
    offset: ["start end", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [1, 1, 0, 0]);

  return (
    <>
      <div className="relative h-[240vh] bg-black">
        <motion.div
          style={{ opacity }}
          ref={ImageRef}
          className="absolute -top-[--header-height] left-0 h-[190vh] w-full"
        >
          <Image
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            width={1440}
            height={1080}
            alt="HeroMovie"
            className="sticky top-0 h-screen w-full object-cover"
          />
        </motion.div>
        <motion.div
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          whileInView="visible"
          exit="hidden"
          animate="hidden"
          viewport={{ amount: 0.8 }}
          className="relative z-10 flex min-h-[--hero-height] flex-col items-center pl-0 pt-[40vh] text-center xl:inline-block xl:pl-56"
        >
          <p className="mb-5 text-7xl font-bold">{movie.original_title}</p>
          <button className="group mb-5 inline-block rounded-full bg-[#3d3d3d9a] px-3 py-3 font-semibold text-white transition-shadow duration-300 hover:shadow-[0px_0px_10px_-1px_#545454]">
            <Link href={`/movie/${movie.id}`}>Watch Trailer</Link>
          </button>
          <div className="flex items-baseline justify-center gap-2">
            <FaStar className="text-lg text-amber-400" />
            <p className="mr-2 flex items-center text-2xl font-bold">
              {movie.vote_average}
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default page;
