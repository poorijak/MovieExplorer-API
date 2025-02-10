import Image from "next/image";
import React from "react";

export default function LoadingPage() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-[#0D0D0D]">
      <Image
        src="/Loading.gif"
        alt="Loading"
        width={1000}
        height={1500}
        className="h-[450px] w-[250px] lg:h-[500px] lg:w-[350px]"
      />
    </div>
  );
}
