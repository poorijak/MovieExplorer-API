import React from "react";
import HeroSection from "../../components/HeroSection/HeroSection";
import PopularMoive from "../../components/CompContent/PopularContent/PopularMovie";
import TopRated from "../../components/TopRated/TopRated";
import Genres from "../../components/Genres/Genres";
import {
  fetchPopular,
  fetchTrending,
  fetchTopRate,
  fetchUpcoming,
  fetchNowplayMovie,
} from "@/Service/imdbAPI";

const page = async () => {
  try {
    const [trending, MovieData, TvData, top_rated, upcoming, now_playing] =
      await Promise.all([
        fetchTrending("movie"),
        fetchPopular("movie", 20),
        fetchPopular("tv", 20),
        fetchTopRate("movie"),
        fetchUpcoming(),
        fetchNowplayMovie(),
      ]);

    return (
      <div>
        <HeroSection data={MovieData} />
        <PopularMoive data={MovieData} content={"movie"} />
        <PopularMoive data={TvData} content={"tv"} />
        <TopRated data={top_rated} />
        <Genres />
      </div>
    );
  } catch (err) {
    console.log("Error: ", err);
  }
};

export default page;
