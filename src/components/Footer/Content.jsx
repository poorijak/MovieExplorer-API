"use client";
import Aos from "aos";
import Link from "next/link";
import React, { useEffect } from "react";

export default function Content() {
  return (
    <div className="flex h-full w-full flex-col justify-between bg-[#050505] px-12 py-8">
      <Section1 />
    </div>
  );
}

const Section1 = () => {
  useEffect(() => {
    Aos.init({
      duration: 300,
      once: false,
    });
  }, []);
  return (
    <div>
      <Nav />
    </div>
  );
};

const Section2 = () => {
  return (
    <div className="flex items-end justify-between">
      <h1 className="mt-10 text-[14vw] leading-[0.8]">Sticky Footer</h1>
      <p>©copyright</p>
    </div>
  );
};

const Nav = () => {
  return (
    <div className="flex h-[400px] w-auto items-center justify-center gap-12">
      <div className="flex flex-col gap-2 text-center text-5xl text-white xl:text-5xl">
        <h3 className="mb-2 font-bold uppercase text-[#ffffff80]">About</h3>
        <div className="flex flex-col font-semibold">
          {[
            {
              label: "Home",
              link: "/Home",
            },
            {
              label: "Movie",
              link: "/MovieContent",
            },
            {
              label: "Tv",
              link: "/TvContent",
            },
          ].map((item, index) => (
            <Link
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 400}
              href={item.link}
              className="mb-5 underline underline-offset-[1px]"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
