"use client";
import React, { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";

const VideoTrailer = ({ data, name }) => {
  // console.log("VideoTrailer : ", data);

  useEffect(() => {
    Aos.init({
      duration: 300,
      once: false, // อนุญาตให้ AOS ทำงานซ้ำ
    });
  }, []);

  return (
    <>
      <div className="w-full px-5 lg:mx-10">
        <div className="mb-10 w-full">
          <h3 className="mb-4 text-2xl font-semibold lg:text-4xl">
            Watch Trailers
          </h3>
        </div>
        {data.map((trailer) => (
          <div key={trailer.key} data-aos="fade-up" className="mb-20">
            <div className="flex h-full w-full flex-col items-center gap-2">
              <div className="relative mb-5 aspect-video w-full lg:w-[70%]">
                <iframe
                  className="absolute left-0 top-0 h-full w-full rounded-2xl"
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                  title={trailer.name}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
            <div className="flex w-auto items-center px-5 lg:mx-72">
              <p className="text-center text-base font-medium lg:text-4xl">
                {name} :<span> {trailer?.name || trailer.originail_name}</span>
              </p>
              <hr className="my-8 ml-4 mr-4 hidden h-px w-full flex-1 border-0 bg-[#4F4F4F] lg:block" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default VideoTrailer;
