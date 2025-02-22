"use client";
import { fetchTrending } from "@/Service/imdbAPI";
import React, { useEffect, useState } from "react";

const page = ({ data }) => {
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    let getTrending = async () => {
      try {
        const res = await fetchTrending("movie");
        setTrending(res.slice(1, 2));
      } catch (err) {
        console.log("getTvTrending palla error is :", err);
      }
    };

    getTrending();
  }, []);

  return (
    <div>
      {trending.map((item) => (
        <div
          key={item.id}
          style={{
            backgroundImage: `url(${`https://image.tmdb.org/t/p/original${item.backdrop_path}`})`,
            backgroundSize: "cover", // ปรับให้ภาพไม่ถูกตัด
            backgroundPosition: "center", // ให้ภาพอยู่ตรงกลาง
            backgroundRepeat: "no-repeat", // ไม่ให้ภาพทำการ repeat
          }}
          className="h-[20vh] w-full bg-bottom lg:h-[30vh]"
        >
          <div className="relative h-full w-full bg-blackOverlay_1"></div>
        </div>
      ))}
    </div>
  );
};

export default page;
