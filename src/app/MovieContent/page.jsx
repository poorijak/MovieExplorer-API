import React from "react";
import HeroSection from "@/src/components/HeroSection/HeroSection";
import TopRatedContent from "@/src/components/CompContent/TopRatedContent/page";
import TrendingContent from "@/src/components/CompContent/TrendingContent/page";
import UpComingContent from "@/src/components/CompContent/UpComingContent/page";
import PopularMovie from "@/src/components/CompContent/PopularContent/PopularMovie";
import NowComingContent from "@/src/components/CompContent/NowComingContent/page";
import {
  fetchPopular,
  fetchTrending,
  fetchTopRate,
  fetchUpcoming,
  fetchNowplayMovie,
} from "@/Service/imdbAPI";

const page = async () => {
  try {
    const [trending, popular, top_rated, upcoming, now_playing, HeroSec] =
      await Promise.all([
        fetchTrending("movie"),
        fetchPopular("movie", 20),
        fetchTopRate("movie"),
        fetchUpcoming(),
        fetchNowplayMovie(),
        fetchPopular("movie", 5),
      ]);

    return (
      <div>
        <HeroSection data={HeroSec} />
        <PopularMovie content={"movie"} data={popular} />
        <TopRatedContent content={"movie"} data={top_rated} />
        <TrendingContent content={"movie"} data={trending} />
        <UpComingContent content={"movie"} data={upcoming} />
        <NowComingContent content={"movie"} data={now_playing} />
      </div>
    );
  } catch (err) {
    console.log("Error: ", err);
  }
};

export default page;
