import Image from "next/image";
import React, { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";

const page = ({ data, name }) => {
  useEffect(() => {
    Aos.init({
      duration: 300,
      once: false, // อนุญาตให้ AOS ทำงานซ้ำ
    });
  }, []);
  return (
    <div>
      <h1 className="mx-10 my-14 text-4xl font-semibold">Seasons of {name}</h1>
      {data?.seasons.map((item) => (
        <div
          className="mx-auto mb-10 flex max-w-[90%] flex-col rounded-3xl border border-[#313131] bg-[#ffffff11] py-10 lg:max-w-[80%]"
          data-aos="fade-up"
          key={item.id}
        >
          <div className="mx-10 flex flex-col items-center justify-start lg:flex-row">
            <Image
              src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
              width={200}
              height={300}
              priority
              alt={item.original_name || item.name}
              className="rounded-lg"
            />
            <div className="mt-5 flex flex-col items-center justify-center lg:items-start lg:pl-16">
              <h1 className="mb-5 text-center text-3xl font-bold md:text-4xl lg:text-left lg:text-5xl">
                {name} : <span>{item.original_name || item.name}</span>
              </h1>
              <div>
                <p className="mb-4 px-10 text-xl font-medium text-[#7c7c7c] lg:px-0">
                  Overview :{" "}
                  <span className="text-lg text-white lg:text-lg">
                    {item.overview || "Not available"}
                  </span>
                </p>
                <p className="mb-4 px-10 text-xl font-medium text-[#7c7c7c] lg:px-0">
                  Episode :{" "}
                  <span className="text-lg text-white lg:text-lg">
                    {item.episode_count || "Not available"}
                  </span>
                </p>
                <p className="mb-4 px-10 text-xl font-medium text-[#7c7c7c] lg:px-0">
                  Seasons :{" "}
                  <span className="text-lg text-white lg:text-lg">
                    {item.season_number || "Not available"}
                  </span>
                </p>
              </div>
              <div className="mb-4 mt-5 flex items-center gap-2 text-lg">
                <p className="mr-2 flex items-center text-3xl font-bold">
                  {item.vote_average.toFixed(1) || "Not available"}
                  <span className="ml-2 text-2xl"> /10</span>
                </p>
                <Image src="/IMDB.svg" width={50} height={50} alt="imdb logo" />
              </div>
              <div className="item-center flex justify-center gap-5 lg:justify-normal"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default page;
