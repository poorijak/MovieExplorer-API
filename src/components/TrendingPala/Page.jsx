import React, { useEffect, useState } from "react";
import { fetchPopular } from "@/Service/imdbAPI";
import { Parallax } from "react-parallax";
import { FaPlay, FaStar } from "react-icons/fa6";
import { TextEffect } from "../../../components/ui/text-effect";

export default function Page() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    let getPopular = async () => {
      try {
        const res = await fetchPopular("movie");
        setMovie(res.slice(0, 3));
      } catch (err) {
        console.log("getTvTrending palla error is :", err);
      }
    };

    getPopular();
  }, []);

  console.log(movie);

  return (
    <div>
      {movie.map((item) => (
        <Parallax
          bgImage={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
          key={item.id}
          strength={400}
          className="flex h-screen items-center justify-center"
          blur={{ min: -15, max: 15 }}
          style={{ willChange: "transform" }}
          bgImageStyle={{
            width: "100%",
            height: "100%",
            objectFit: "cover", // ✅ ปรับให้ภาพเต็มพื้นที่
          }}
        >
          <p className="mb-10 bg-gray-500 bg-opacity-10 bg-clip-padding text-center font-PlayFair text-6xl backdrop-blur backdrop-contrast-100 backdrop-saturate-100 backdrop-filter">
            {item.original_title}
          </p>
          <div className="flex w-full justify-center gap-5">
            <div className="flex w-auto flex-col text-center">
              <div className="flex items-baseline">
                <FaStar className="mr-2 text-lg text-amber-400" />
                <p className="text-2xl font-bold">
                  {item.vote_average.toFixed(1)}
                </p>
              </div>
              <p className="font-medium text-gray-300">Rating</p>
            </div>
            <div className="flex w-auto flex-col text-center">
              <p className="text-2xl font-bold">
                {item.release_date.split("-").reverse().join("/")}
              </p>
              <p className="font-medium text-gray-300">Release Date</p>
            </div>
          </div>
        </Parallax>
      ))}
    </div>
  );
}
