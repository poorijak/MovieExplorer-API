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
    <div>
      <div className="flex justify-center">
        <h1 className="mb-10 text-4xl font-medium">
          Detail of {data?.original_title}
        </h1>
      </div>
      {[
        {
          label: "Name : ",
          value: data?.original_title,
        },
        {
          label: "Tagline : ",
          value: data?.tagline,
        },
        {
          label: "Total buget : ",
          value: data?.budget,
        },
        {
          label: "Genres : ",
          value: data?.genres?.map((item) => item.name),
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
          value: data?.production_companies?.map((item) => item.name),
        },
        {
          label: "Production Countries : ",
          value: data?.production_countries?.map((item) => item.name),
        },
        {
          label: "Time :",
          value: `${Math.floor(data.runtime / 60)} h ${data.runtime % 60}m`,
        },
        {
          label: "Release Data : ",
          value: data?.release_date,
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
        <div key={index} data-aos="fade-up" data-aos-delay={index * 50}>
          <hr className="mx-10 mb-20 border-[1px] border-[#262626] lg:mx-20 lg:my-5" />
          <p className="mx-20 text-xl font-medium text-[#7c7c7c]">
            {item.label}
            <span className="text-white"> {item.value}</span>
          </p>
        </div>
      ))}
      <hr className="mx-10 mb-20 border-[1px] border-[#262626] lg:mx-20 lg:my-5" />
    </div>
  );
};

export default Detail;
