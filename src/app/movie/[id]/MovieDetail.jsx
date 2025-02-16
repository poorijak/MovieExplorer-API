"use client";
import React, { useState, useEffect } from "react";
import {
  fetchDetail,
  fetchCasting,
  fetchPopular,
} from "../../../../Service/imdbAPI";
import Image from "next/image";
import { FaHeart, FaPlay } from "react-icons/fa";
import { FaBookmark, FaStar } from "react-icons/fa6";
import Casting from "./Fetch/Actor";
import Video from "./Fetch/VideoTrailer";
import { Parallax } from "react-parallax";
import { motion, AnimatePresence, delay } from "framer-motion";
import { TextAnimate } from "@/src/components/magicui/text-animate";
import Aos from "aos";
import "aos/dist/aos.css";
import HeroSection from "@/src/components/HeroSection/HeroSection";
import TopRated from "@/src/components/TopRated/TopRated";

const MovieDetail = ({ id }) => {
  const [popular, setPopular] = useState([]);
  const [moveDetail, setMovieDetail] = useState([]);
  const [cast, setCast] = useState([]);
  const [heartActive, setHeartActive] = useState(false);
  const [myFav, setMyFav] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [detail, casting, popular] = await Promise.all([
          fetchDetail("movie", id),
          fetchCasting("movie", id),
          fetchPopular("movie"),
        ]);

        setPopular(popular);
        setMovieDetail(detail);
        setCast(casting);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [id]);

  const handleHeart = () => {
    setHeartActive(!heartActive);
  };
  const handleFav = () => {
    setMyFav(!myFav);
  };

  console.log(moveDetail);

  useEffect(() => {
    Aos.init({
      duration: 300,
      once: false,
    });
  }, []);

  const itmes = {
    hidden: { y: 100, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: { duration: 1, ease: [0, 0.71, 0.2, 1.01], delay: 2 },
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
        className="h-full w-full overflow-hidden"
        variants={itmes}
        initial="hidden"
        animate="show"
      >
        <div
          style={{
            backgroundImage: `url(${`https://image.tmdb.org/t/p/original${moveDetail?.backdrop_path}`})`,
          }}
          className="inset-0 h-[70vh] w-full bg-cover bg-fixed bg-center lg:h-[100vh] lg:bg-top"
        >
          <div className="relative h-full w-full bg-blackOverlay_1 px-11 pt-36 lg:hidden"></div>

          <div className="relative hidden h-full w-full bg-blackOverlay_6 px-11 pt-36 lg:flex">
            <div>
              <motion.div
                variants={title}
                initial="hidden"
                animate="show"
                className="absoloute left-10 top-0 lg:w-[60%]"
              >
                <p
                  style={{ textShadow: "2px 2px 8px rgba(0, 0, 0, 0.6)" }}
                  className="mb-10 mt-60 text-center text-6xl font-medium drop-shadow-lg lg:mt-0 lg:text-8xl"
                >
                  {moveDetail?.original_title}
                </p>
              </motion.div>
            </div>

            <div className="top-30 absolute right-10">
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
                  className={`text-left text-lg font-normal drop-shadow-lg`}
                >
                  {moveDetail?.overview ?? ""}
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
                  <Image
                    src="/IMDB.svg"
                    width={70}
                    height={70}
                    alt="imdb logo"
                  />
                  <p className="text-2xl font-bold text-black">
                    {moveDetail?.vote_average}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-5 left-5 hidden p-2 lg:inline-block">
          {[
            {
              label: "Country :",
              value: moveDetail?.production_countries?.map((item) => item.name),
            },
            {
              label: "Genre :",
              value: moveDetail?.genres?.map((item) => item.name), // แทนที่จะ join ให้แยกตามค่า
            },
            {
              label: "Time :",
              value: `${Math.floor(moveDetail.runtime / 60)} h ${moveDetail.runtime % 60}m`,
            },
            {
              label: "Studio :",
              value: moveDetail?.production_companies?.map((item) => item.name),
            },
            { label: "Date :", value: moveDetail?.release_date },
          ].map((item, index) => (
            <motion.div
              variants={details}
              initial="hidden"
              animate="show"
              transition={{ duration: index * 0.5, delay: 3.2 }}
              key={index}
              className="mb-2 flex gap-3"
            >
              <p>{item.label}</p>

              <div className="flex gap-2">
                {Array.isArray(item.value) ? (
                  item.value.map((valueItem, subIndex) => (
                    <p
                      key={subIndex}
                      className="rounded-full px-3 py-1 outline outline-1 outline-[#BDBDBD]"
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
                src={`https://image.tmdb.org/t/p/original${moveDetail?.poster_path}`}
                height={1920}
                width={1080}
                alt="Poster_Movie"
                className="h-[350px] w-auto rounded-lg object-cover shadow-lg"
              />
            </motion.div>
          </div>
          <div data-aos="fade-up" className="mt-10">
            <button className="group flex items-center gap-4 rounded-md bg-[#4A4A4A] px-8 py-2 font-bold text-white">
              <FaPlay /> Tralier
            </button>
          </div>
          <div data-aos="fade-up" className="mt-10">
            <p
              style={{ textShadow: "2px 2px 8px rgba(0, 0, 0, 0.6)" }}
              className="text-center text-4xl font-semibold drop-shadow-lg"
            >
              {moveDetail?.original_title}
            </p>
          </div>

          <div data-aos="fade-up" className="mx-10 mt-5">
            <p>
              <span className="text-lg font-semibold">Overview : </span>
              {moveDetail?.overview}
            </p>
          </div>
          <Casting data={cast} />
        </div>
        {/* <HeroSection data={popular} /> */}
        <Casting data={cast} className="hidden lg:inline-block" />
        {/* <TopRated data={popular} /> */}
      </motion.div>
    </>
  );
};

export default MovieDetail;
