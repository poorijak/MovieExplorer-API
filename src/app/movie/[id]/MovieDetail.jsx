"use client";
import React, { useState, useEffect } from "react";
import { fetchDetail, fetchCasting } from "../../../../Service/imdbAPI";
import Image from "next/image";
import { FaHeart } from "react-icons/fa";
import { FaBookmark, FaStar } from "react-icons/fa6";
import Casting from "./Fetch/Actor";
import Video from "./Fetch/VideoTrailer";
import { Parallax } from "react-parallax";
import { motion, AnimatePresence } from "framer-motion";

const MovieDetail = ({ id, loading }) => {
  const [moveDetail, setMovieDetail] = useState([]);
  const [cast, setCast] = useState([]);
  const [heartActive, setHeartActive] = useState(false);
  const [myFav, setMyFav] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [detail, casting] = await Promise.all([
          fetchDetail("movie", id),
          fetchCasting("movie", id),
        ]);
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

  return (
    <>
      <AnimatePresence>
        <motion.div
          key={id} // ใช้ key ให้ motion รู้ว่ามีการเปลี่ยนแปลง
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          onAnimationStart={() => console.log("Animation started")}
          onAnimationComplete={() => console.log("Animation completed")}
        >
          <Parallax
            bgImage={`https://image.tmdb.org/t/p/original${moveDetail?.backdrop_path}`}
            strength={400}
            className="b h-screen w-full"
            style={{ willChange: "transform" }}
            bgImageStyle={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          >
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 2 }}
              className="h-f mt-28 flex w-full justify-between px-11"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 2.3 }}
              >
                <p className="mb-10 bg-gray-500 bg-opacity-10 bg-clip-padding text-center text-8xl font-medium backdrop-blur backdrop-contrast-100 backdrop-saturate-100 backdrop-filter">
                  {moveDetail?.original_title}
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 2 }}
              >
                <div className="w-[400px]">
                  <p className="mb-5 rounded-t-lg bg-gray-500 bg-opacity-10 bg-clip-padding px-5 py-5 text-left text-xl backdrop-blur-md backdrop-contrast-100 backdrop-saturate-100 backdrop-filter">
                    {moveDetail?.overview}
                  </p>
                </div>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 1 }}
                  className="inline-block rounded-full bg-[#F6C700] py-2 pl-4 pr-6"
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
              </motion.div>
            </motion.div>
          </Parallax>
        </motion.div>
      </AnimatePresence>

      <Casting data={cast} />
    </>
  );
};

export default MovieDetail;
