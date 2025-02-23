"use client";
import React, { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";

const Detail = ({ data }) => {
  useEffect(() => {
    Aos.init({
      duration: 300,
      once: false, // อนุญาตให้ AOS ทำงานซ้ำ
    });
  }, []);

  return (
    <div className="">
      <div className="flex justify-center">
        <h1 className="mb-10 text-center text-4xl font-medium text-white lg:text-left">
          Detail of {data?.original_title || data?.name}
        </h1>
      </div>
      <div
        data-aos="fade-up"
        className="mx-auto flex max-w-[90%] flex-col rounded-3xl border border-[#313131] bg-[#ffffff11] py-10 lg:max-w-[80%]"
      >
        {[
          {
            label: "Name : ",
            value: data?.original_title || data?.original_name,
          },
          {
            label: "Tagline : ",
            value: data?.tagline || "Not available",
          },
          {
            label: "Total buget : ",
            value: data?.budget || "Not available",
          },
          {
            label: "Genres : ",
            value: data?.genres?.map((item) => item.name).join(" , "),
          },
          {
            label: "Origin Country : ",
            value: data?.origin_country?.map((item) => item),
          },
          {
            label: "Original Language : ",
            value: data?.original_language,
          },
          {
            label: "Production Companies : ",
            value: data?.production_companies
              ?.map((item) => item.name)
              .join(" , "),
          },
          {
            label: "Production Countries : ",
            value: data?.production_countries
              ?.map((item) => item.name)
              .join(" , "),
          },
          {
            label: "Time :",
            value: `${Math.floor(data.runtime / 60)} h ${data.runtime % 60}m`,
          },
          {
            label: "episode : ",
            value: data?.number_of_episodes || "Not available",
          },
          {
            label: "seasons : ",
            value: data?.number_of_seasons || "Not available",
          },
          {
            label: "Release Data : ",
            value: data?.release_date || data?.first_air_date,
          },
          {
            label: "Vote Average : ",
            value: data?.vote_average,
          },

          {
            label: "Vote Count : ",
            value: data?.vote_count,
          },
        ].map((item, index) => (
          <div key={index}>
            <p className="mx-5 text-lg font-medium text-[#7c7c7c] lg:mx-20">
              {item.label}
              <span className="text-base text-white lg:text-lg">
                {" "}
                {item.value}
              </span>
            </p>
            <hr className="mx-5 my-5 border-[1px] border-[#262626] lg:mx-20 lg:my-5" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Detail;
