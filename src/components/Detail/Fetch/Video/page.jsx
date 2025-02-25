"use client";
import React, { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import { TbMoodSadDizzy } from "react-icons/tb";

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
      <div className="w-full px-5 text-white lg:mx-10">
        <div className="mb-10 w-full">
          <h3 className="mb-4 text-2xl font-semibold lg:text-4xl">
            Watch Trailers
          </h3>
        </div>
        {data.length > 0 ? ( // ถ้า data มีค่ามากกว่า 0 ให้แสดงข้อมูล
          data.map(
            (
              trailer,
              index, // map ข้อมูลใน data
            ) => (
              <div
                key={trailer?.key || index}
                data-aos="fade-up"
                className="mb-20"
              >
                {trailer && trailer.key ? ( // เช็คข้อมูล tailer และ key ว่ามีค่าหรือไม่
                  <div>
                    <div className="flex h-full w-full flex-col items-center gap-2">
                      <div className="relative mb-5 aspect-video w-full lg:w-[70%]">
                        <iframe
                          className="absolute left-0 top-0 h-full w-full rounded-xl lg:rounded-2xl"
                          src={`https://www.youtube.com/embed/${trailer.key}`}
                          title={trailer.name || "Video Trailer"}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                    </div>
                    <div className="flex w-auto items-center px-5 lg:mx-40 2xl:mx-72">
                      <p className="text-base font-medium lg:text-3xl 2xl:text-4xl">
                        {name} :{" "}
                        <span>
                          {trailer?.name || trailer.originail_name || "Unknown"}
                        </span>
                      </p>
                      <hr className="my-8 ml-4 mr-4 hidden h-px w-full flex-1 border-0 bg-[#4F4F4F] lg:block" />
                    </div>
                  </div>
                ) : (
                  <div>
                    <p>No trailer available</p>
                  </div>
                )}{" "}
              </div>
            ),
          )
        ) : (
          <div className="mb-10 flex flex-col items-center justify-center">
            <TbMoodSadDizzy className="text-8xl" />
            <p className="mt-5 text-[#a6a6a6] 2xl:text-2xl">
              No trailer available
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default VideoTrailer;
