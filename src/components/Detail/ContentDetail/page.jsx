"use client";
import React, { useState, useEffect } from "react";
import {
  fetchDetail,
  fetchCasting,
  fetchPopular,
  fetchVideo,
  fetchSimilar,
} from "../../../../Service/imdbAPI";
import Image from "next/image";
import { FaHeart, FaPlay } from "react-icons/fa";
import { FaBookmark, FaStar } from "react-icons/fa6";
import Casting from "../Fetch/Actor/page";
import Video from "../Fetch/Video/page";
import { Parallax } from "react-parallax";
import { motion, AnimatePresence, delay } from "framer-motion";
import { TextAnimate } from "@/src/components/magicui/text-animate";
import Aos from "aos";
import "aos/dist/aos.css";
import HeroSection from "@/src/components/HeroSection/HeroSection";
import TopRated from "@/src/components/TopRated/TopRated";
import Overview from "@/src/components/Overview/page";
import Seasons from "@/src/components/Detail/ContentDetail/Seasons/page";
import Detail from "./Detail";
import Similar from "@/src/components/CompContent/Silimar/page";
import useSWR from "swr";

const fetcher = async (id, category) => {
  if (!id) return null;
  const [detail, casting, popular, video, similar] = await Promise.all([
    fetchDetail(category, id),
    fetchCasting(category, id),
    fetchPopular(category),
    fetchVideo(category, id),
    fetchSimilar(category, id),
  ]);
  return { detail, casting, popular, video, similar };
};

const MovieDetail = ({ id, category }) => {
  const { data, error } = useSWR(id ? `movie-datail-${id}` : null, () =>
    fetcher(id, category),
  );

  useEffect(() => {
    Aos.init({
      duration: 300,
      once: false,
    });
  }, []);

  if (error) return <p>Error loading movie</p>;
  if (!data) return <p>Loading...</p>;

  const { detail, casting, video, similar } = data;

  const youtubeTrailers = video.filter(
    (video) =>
      video.type.toLowerCase() === "trailer" &&
      video.site.toLowerCase() === "youtube",
  );

  const top5Trailers = youtubeTrailers.slice(0, 5);

  const itmes = {
    hidden: { y: 100, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: { duration: 1, ease: [0, 0.71, 0.2, 1.01], delay: 1.8 },
    },
  };

  const title = {
    hidden: { y: 20, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: { duration: 1.5, delay: 2.2 },
    },
  };

  const overVirew = {
    hidden: { y: 20, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: { duration: 1, delay: 2.5 },
    },
  };

  const vote_average = {
    hidden: { scale: 1.1, opacity: 0 },
    show: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.2, delay: 3 },
    },
  };

  const details = {
    hidden: {
      scale: 1.3,
      opacity: 0,
      filter: "blur(5px)",
    },
    show: {
      scale: 1,
      opacity: 1,
      filter: "blur(0px)",
    },
    style: { originZ: 0 },
  };

  const poster_image = {
    hidden: { y: 20, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: { duration: 1, delay: 2.2 },
    },
  };

  return (
    <>
      <motion.div
        className="h-full w-full overflow-hidden bg-[#0D0D0D]"
        variants={itmes}
        initial="hidden"
        animate="show"
      >
        <Parallax
          bgImage={`https://image.tmdb.org/t/p/original${detail?.backdrop_path}`}
          key={detail?.id}
          strength={400}
          className="relative flex h-[70vh] w-full justify-center lg:h-[100vh]"
          style={{ willChange: "transform" }}
          bgImageStyle={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        ></Parallax>
        <div className="absolute inset-0 h-[70vh] w-full bg-blackOverlay_1 lg:hidden"></div>
        <div className="absolute inset-0 hidden h-full w-full bg-blackOverlay_6 lg:flex"></div>
        <div className="absolute left-20 top-40 hidden lg:block">
          <motion.div
            variants={title}
            initial="hidden"
            animate="show"
            className="absoloute left-10 top-0 lg:w-[60%]"
          >
            <p
              style={{ textShadow: "2px 2px 8px rgba(0, 0, 0, 0.6)" }}
              className="mb-10 mt-60 text-center font-medium text-white drop-shadow-lg md:text-3xl lg:mt-0 lg:text-7xl xl:text-8xl"
            >
              {detail?.original_title || detail?.original_name}
            </p>
          </motion.div>
        </div>
        <div className="absolute top-32 hidden lg:right-10 lg:block xl:right-20">
          <motion.div
            variants={overVirew}
            initial="hidden"
            animate="show"
            className="mb-5 w-[400px]"
          >
            <TextAnimate
              animation="blurInUp"
              by="word"
              duration={1}
              delay={2}
              startOnView={false}
              className={`text-left text-lg font-normal text-white drop-shadow-lg`}
            >
              {detail?.overview ?? ""}
            </TextAnimate>
          </motion.div>
          <motion.div
            variants={vote_average}
            initial="hidden"
            animate="show"
            className="inline-block rounded-full bg-[#F6C700] py-2 pl-4 pr-6"
            data-aos="fade-up"
          >
            <div className="flex items-center justify-center gap-2">
              <Image src="/IMDB.svg" width={70} height={70} alt="imdb logo" />
              <p className="text-2xl font-bold text-black">
                {detail?.vote_average.toFixed(1)}
              </p>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-5 left-5 hidden p-2 lg:inline-block">
          {[
            {
              label: "Country :",
              value: detail?.production_countries?.map((item) => item.name),
            },
            {
              label: "Genre :",
              value: detail?.genres?.map((item) => item.name), // แทนที่จะ join ให้แยกตามค่า
            },
            {
              label: "Time :",
              value: `${Math.floor(detail.runtime / 60)} h ${detail.runtime % 60}m`,
            },
            {
              label: "Studio :",
              value: detail?.production_companies?.map((item) => item.name),
            },
            {
              label: "Date :",
              value: detail?.release_date || detail?.first_air_date,
            },
          ].map((item, index) => (
            <motion.div
              variants={details}
              initial="hidden"
              animate="show"
              transition={{ duration: index * 0.5, delay: 3.2 }}
              key={index}
              className="mb-2 flex items-center gap-3 text-white"
            >
              <p className="w-20">{item.label}</p>

              <div className="flex gap-2">
                {Array.isArray(item.value) ? (
                  item.value.map((valueItem, subIndex) => (
                    <p
                      key={subIndex}
                      className="flex items-center text-nowrap rounded-full px-3 py-1 text-center outline outline-1 outline-[#BDBDBD]"
                    >
                      {valueItem}
                    </p>
                  ))
                ) : (
                  <p className="rounded-full px-3 py-1 outline outline-1 outline-[#BDBDBD]">
                    {item.value}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
        <div className="flex w-full -translate-y-52 flex-col items-center justify-center lg:hidden">
          <div>
            <motion.div variants={poster_image} initial="hidden" animate="show">
              <Image
                src={`https://image.tmdb.org/t/p/original${detail?.poster_path}`}
                height={1920}
                width={1080}
                alt="Poster_Movie"
                className="h-[350px] w-auto rounded-lg object-cover shadow-lg"
              />
            </motion.div>
          </div>
          <div data-aos="fade-up" className="mt-10">
            <p
              style={{ textShadow: "2px 2px 8px rgba(0, 0, 0, 0.6)" }}
              className="text-center text-4xl font-semibold drop-shadow-lg"
            >
              {detail?.original_title}
            </p>
          </div>

          <div data-aos="fade-up" className="mx-10 mt-5">
            <Overview text={detail?.overview} />
          </div>
          <Casting data={casting} />
        </div>
        {category === "tv" ? (
          <>
            <hr className="mx-10 mb-20 border-[#4F4F4F] lg:mx-20 lg:my-20" />
            <Seasons data={detail} name={detail?.original_name} />
            <hr className="mx-10 mb-10 border-[#4F4F4F] lg:mx-20 lg:my-20" />
          </>
        ) : (
          ""
        )}
        <div className="hidden lg:block">
          <Casting data={casting} />
        </div>
        <Video
          data={top5Trailers}
          name={detail?.original_title || detail?.original_name}
        />
        <hr className="mx-10 mb-20 border-[#4F4F4F] lg:mx-20 lg:my-20" />
        <Detail data={detail} />
        <Similar
          data={similar}
          name={detail?.original_title || detail?.original_name}
          content={category}
        />
      </motion.div>
    </>
  );
};

export default MovieDetail;
