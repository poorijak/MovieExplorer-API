"use client";
import React, { useState, useEffect } from "react";
import { fetchDetail, fetchCasting } from "../../../../Service/imdbAPI";
import Image from "next/image";
import { FaHeart } from "react-icons/fa";
import { FaBookmark, FaStar } from "react-icons/fa6";
import { motion, AnimatePresence, delay } from "framer-motion";
import Casting from "./Actor";
import Video from "./VideoTrailer";

const MovieDetail = ({ id }) => {
  const [moveDetail, setMovieDetail] = useState(null); // ตั้งค่าเริ่มต้นเป็น null
  const [cast, setCast] = useState([]);
  const [heartActive, setHeartActive] = useState(false);
  const [myFav, setMyFav] = useState(false);

  useEffect(() => {
    const getMovieDetail = async () => {
      try {
        const res = await fetchDetail("movie", id);
        setMovieDetail(res); // ดึงข้อมูลมาแล้วอัพเดต state
      } catch (err) {
        console.log("getMovieDetail err is :", err);
      }
    };
    getMovieDetail();
  }, [id]);

  useEffect(() => {
    const getCasting = async () => {
      try {
        const res = await fetchCasting("movie", id);
        setCast(res);
      } catch (err) {
        console.log("getMovieCast err is :", err);
      }
    };
    getCasting();
  }, []);

  if (!moveDetail) {
    return <div>Loading...</div>; // แสดงข้อความขณะรอข้อมูล
  }

  console.log(cast);

  const handleHeart = () => {
    setHeartActive(!heartActive);
  };
  const handleFav = () => {
    setMyFav(!myFav);
  };

  return (
    <div className="w-full overflow-hidden">
      {" "}
      {/* ป้องกัน overflow */}
      {/* Backdrop image */}
      <div className="relative h-[50vh] w-full">
        {" "}
        {/* ใช้ w-full แทน w-screen */}
        {moveDetail.backdrop_path && (
          <Image
            src={`https://image.tmdb.org/t/p/original${moveDetail.backdrop_path}`}
            width={1440}
            height={1080}
            alt={moveDetail.original_title || moveDetail.overview}
            className="h-full w-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-blackOverlay_5"></div>
      </div>
      {/* Content Section */}
      <div className="relative mt-20 w-full">
        {" "}
        {/* จำกัดความกว้างและจัดให้อยู่ตรงกลาง */}
        <div className="flex w-full flex-wrap justify-center gap-8 px-5">
          {/* Poster */}
          <div className="flex justify-center">
            {moveDetail.poster_path && (
              <Image
                src={`https://image.tmdb.org/t/p/original${moveDetail.poster_path}`}
                width={300}
                height={450}
                alt={moveDetail.original_title || moveDetail.overview}
                className="h-full w-11/12 rounded-lg object-cover md:w-full"
              />
            )}
          </div>
          {/* Text Content */}
          <div>
            {/* Header */}
            <div className="flex items-baseline">
              <h1 className="mr-3 text-4xl font-semibold">
                {moveDetail.original_title || moveDetail.name}{" "}
                <span className="text-3xl text-[#bfbfbf]">
                  ({moveDetail.release_date.split("-")[0]})
                </span>
              </h1>
            </div>
            {/* detail */}
            <div className="mt-2 block gap-2 text-lg font-medium text-[#bfbfbf] lg:flex">
              <p>{moveDetail.release_date.split("-").reverse().join("/")}</p>
              <p>{moveDetail.genres.map((genre) => genre.name).join(" , ")}</p>
              <p>
                {Math.floor(moveDetail.runtime / 60)}h {moveDetail.runtime % 60}
                m
              </p>
            </div>

            {/* rating */}
            <div>
              <div className="mb-5 mt-8 flex items-center justify-center gap-4 text-lg lg:justify-start">
                <FaStar className="text-2xl text-amber-400" />
                <div className="flex items-baseline gap-2">
                  <p className="mr-2 text-5xl font-bold">
                    {moveDetail.vote_average.toFixed(1)}
                  </p>
                  <span className="text-2xl"> /10</span>
                  <Image
                    src="/IMDB.svg"
                    width={60}
                    height={60}
                    alt="imdb logo"
                  />
                </div>
              </div>
            </div>

            <div className="px-2 xl:px-0">
              <p className="text-2xl font-bold">Overview :</p>
              <p className="w-auto max-w-[600px]">{moveDetail.overview}</p>
            </div>

            {/* button */}
            <div className="mt-5 flex justify-center gap-5 lg:justify-start">
              <button
                className={`group flex h-[50px] w-[50px] items-center justify-center rounded-full bg-[#262626] text-xl transition-colors duration-150 ${heartActive ? "bg-[#270202]" : ""}`}
                onClick={handleHeart}
              >
                <FaHeart
                  className={`transition-colors duration-150 group-hover:scale-105 group-hover:text-red-500 ${heartActive ? "text-red-500" : "text-white"}`}
                />
              </button>
              <button
                className={`group flex h-[50px] w-[50px] items-center justify-center rounded-full bg-[#262626] text-xl transition-colors duration-150 ${myFav ? "bg-[#4b3d01]" : ""}`}
                onClick={handleFav}
              >
                <FaBookmark
                  className={`transition-colors duration-150 group-hover:scale-105 group-hover:text-yellow-500 ${myFav ? "text-yellow-500" : "text-white"}`}
                />
              </button>
              <button className="group rounded-xl bg-[#303030] px-3 font-semibold text-white transition-shadow duration-300 hover:shadow-[0px_0px_10px_-1px_#545454]">
                Play trailer
              </button>
            </div>
          </div>
          <div className="ml-11 w-screen">
            <Casting cast={cast} />
          </div>
          <div className="w-screen">
            <Video id={id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
