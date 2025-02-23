import Link from "next/link";
import React from "react";

export default function Content() {
  return (
    <div className="flex h-full w-full flex-col justify-between bg-[#050505] px-12 py-8">
      <Section1 />
    </div>
  );
}

const Section1 = () => {
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
      <div className="flex flex-col gap-2 text-center text-2xl text-white xl:text-2xl">
        <h3 className="mb-2 uppercase text-[#ffffff80]">About</h3>
        <Link href={"/Home"}>Home</Link>
        <Link href={"/MovieContent"}>Movie</Link>
        <Link href={"/TvContent"}>Tv</Link>
      </div>
    </div>
  );
};
