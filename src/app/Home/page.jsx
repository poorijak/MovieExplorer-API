"use client";
import { useEffect, useState } from "react";
import VideoCarousol from "../../components/VideoCarousol/page";
import HomeHero from "../../components/HomeHero/page";
import TrendingPala from "../../components/TrendingPala/Page";
import Link from "next/link";
import Accordion from "../../components/Accordion/Page";
import Scroll_vel from "../../../src/components/Scroll_velocity/Page";
import { fetchTrending, fetchPopular } from "../../../Service/imdbAPI";
import PopularMovie from "@/src/components/CompContent/PopularContent/PopularMovie";
import HeroSection from "@/src/components/HeroSection/HeroSection";
import TopRated from "@/src/components/TopRated/TopRated";
import useSWR from "swr";

const Page = () => {
  const [heroMovie, setHeroMovie] = useState([]);
  const [movie, setMovie] = useState([]);
  const [tv, setTv] = useState([]);
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // ดึงข้อมูลสำหรับ movie และ tv แยกกัน
        const [trendingData, movieData, tvData, HeroMovie] = await Promise.all([
          fetchTrending("movie"),
          fetchPopular("movie"),
          fetchPopular("tv"),
        ]);

        setTrending(trendingData);
        setMovie(movieData); // ตั้งค่า movie state
        setTv(tvData); // ตั้งค่า tv state
        const heroMovie = await fetchPopular("movie");
        setHeroMovie(heroMovie[8]);
      } catch (err) {
        console.log("Error: ", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="h-full w-full bg-[#0D0D0D]">
      <div className="relative z-10">
        <HomeHero movie={heroMovie} />
      </div>
      <VideoCarousol />
      <div className="h-[20vh]"></div>
      <TrendingPala data={trending} />
      <div className="mt-24">
        <PopularMovie content={"movie"} data={movie} />
        <PopularMovie content={"tv"} data={tv} />

        <div className="w-full text-center">
          <button className="text-md rounded-full bg-[#272727] px-4 py-2 font-medium transition-all duration-300 ease-in-out hover:bg-[#555] active:scale-95">
            <Link href={"/MainContent"} className="text-white">
              See All LineUp!
            </Link>
          </button>
        </div>
        <Accordion />
        <Scroll_vel />
      </div>
    </div>
  );
};

export default Page;
