import { React, useEffect, useState } from "react";
import VideoCarousol from "../../components/VideoCarousol/page";
import HomeHero from "../../components/HomeHero/page";
import { fetchPopular } from "../../../Service/imdbAPI";
import TrendingPala from "../../components/TrendingPala/Page";
import TopRated from "@/src/components/TopRated/TopRated";
import PopularMovie from "@/src/components/PopularMovie/PopularMovie";
import PopularSeries from "@/src/components/PopularSeries/PopularSeries";
import Genres from "@/src/components/Genres/Genres";
import Link from "next/link";
import Accordion from "../../components/Accordion/Page";
import Scroll_vel from "../../../src/components/Scroll_velocity/Page";

const page = () => {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    const getTrending = async () => {
      try {
        const res = await fetchPopular("movie");
        setMovie(res[8]);
      } catch (err) {
        console.log("getTreding error is :", err);
      }
    };

    getTrending();
  }, []);
  console.log(movie);
  return (
    <>
      <div className="bg-[#0D0D0D] h-full">
        <div className="relative z-10">
          <HomeHero movie={movie} />
        </div>
        <VideoCarousol movie={movie} />
        <div className="h-[50vh]"></div>
        <TrendingPala />
        <div className="my-24">
          <PopularMovie />
          <PopularSeries />
          <div className="w-full text-center">
            <button className="rounded-full bg-[#272727] px-4 py-2 text-md font-medium transition-all duration-300 ease-in-out hover:bg-[#555] active:scale-95">
              <Link href={"/MainContent"} className="text-white">
                See All LineUp!
              </Link>
            </button>
          </div>
          <Accordion/>
          <Scroll_vel/>
        </div>
      </div>
    </>
  );
};

export default page;
