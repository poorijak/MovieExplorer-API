import { React, useRef } from "react";
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
      <div className="relative h-[240vh] bg-black text-white">
        <motion.div
          style={{ opacity }}
          ref={ImageRef}
          className="absolute inset-0 -top-[--header-height] h-[190vh] w-full overflow-clip"
        >
          <Image
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            width={1440}
            height={1080}
            alt="HeroMovie"
            className="sticky top-0 h-[100vh] w-full object-cover"
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
          className="relative z-10 mx-auto flex min-h-[--hero-height] max-w-screen-xl flex-col items-center px-5 pt-[40vh] text-center"
        >
          <p className="mb-5 px-10 text-6xl font-bold lg:text-7xl">
            {movie.original_title}
          </p>
          <button className="group mb-5 inline-block rounded-full bg-[#ffffff2f] px-3 py-3 font-semibold text-white transition-shadow duration-300 hover:shadow-[0px_0px_10px_-1px_#545454]">
            <Link href={`/movie/${movie.id}`}>Watch Detail</Link>
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
