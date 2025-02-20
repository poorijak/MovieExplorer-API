import React from "react";
import HeroSection from "@/src/components/HeroSection/HeroSection";
import TopRatedContent from "@/src/components/CompContent/TopRatedContent/page";
import TrendingContent from "@/src/components/CompContent/TrendingContent/page";
import OnAirContent from "@/src/components/CompContent/OnAirSeries/page";
import PopularMovie from "@/src/components/CompContent/PopularContent/PopularMovie";
import AiringTv from "@/src/components/CompContent/AiringTv/page";
import {
  fetchPopular,
  fetchTrending,
  fetchTopRate,
  fetchOnAirSeries,
  fetchAiringSeries,
} from "@/Service/imdbAPI";

const page = async () => {
  try {
    const [trending, popular, top_rated, OnAir, AiringNow] = await Promise.all([
      fetchTrending("tv"),
      fetchPopular("tv", 20),
      fetchTopRate("tv"),
      fetchOnAirSeries(),
      fetchAiringSeries(),
    ]);

    return (
      <div>
        <HeroSection content={"tv"} data={popular} />
        <PopularMovie content={"tv"} data={popular} />
        <TopRatedContent content={"tv"} data={top_rated} />
        <TrendingContent content={"tv"} data={trending} />
        <OnAirContent content={"tv"} data={OnAir} />
        <AiringTv content={"tv"} data={AiringNow} />
      </div>
    );
  } catch (err) {
    console.log("Error: ", err);
  }
};

export default page;
