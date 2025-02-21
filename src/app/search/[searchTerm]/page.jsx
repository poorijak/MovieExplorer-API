"use client";

import { useEffect, useState, use } from "react";
import { fetchSearch, fetchTrending } from "../../../../Service/imdbAPI";
import Backdrop from "@/src/components/CompContent/Backdrop/page";
import useSWR from "swr";
import { useRouter, usePathname } from "next/navigation";
import { IoSearch } from "react-icons/io5";
import { FaPlay, FaStar } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";

const fetcher = async (searchTerm) => {
  if (!searchTerm) return { searchResults: [], trending: [] };

  const [searchResults, trending] = await Promise.all([
    fetchSearch(searchTerm),
    fetchTrending("movie"),
  ]);

  return { searchResults, trending };
};

function SearchPage({ paramsPromise }) {
  const pathName = usePathname();
  const router = useRouter();
  const params = use(paramsPromise);
  const { searchTerm } = params;
  const [inputValue, setInputValue] = useState(searchTerm || "");
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/search/${inputValue}`);
  };

  // ตรวจสอบว่า searchTerm มีค่าไหม ถ้าไม่มีจะไม่เรียก useSWR
  const { data, error } = useSWR(
    searchTerm ? ["ContentData", searchTerm] : null,
    () => fetcher(searchTerm),
  );

  if (error) return <p>Error loading movie</p>;
  if (!data) return <p>Loading...</p>;

  const { searchResults = [], trending = [] } = data;

  console.log(searchResults);
  console.log(trending);

  return (
    <div>
      <Backdrop data={trending} />
      <div className="flex max-w-full -translate-y-10 flex-col items-center justify-center lg:-translate-y-20">
        <div className="mb-10 flex w-10/12 items-center rounded-full border-2 border-[#313131] bg-[#1F1F1F] px-5 py-2 lg:w-6/12 lg:py-5">
          <IoSearch className="mr-2 text-xl text-[#636363] lg:mr-5 lg:text-2xl" />
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name=""
              id=""
              className="w-64 bg-transparent text-lg focus:outline-none lg:w-auto lg:text-xl"
              placeholder="search your keywords..."
              value={isEditing ? inputValue : searchTerm}
              onChange={(e) => setInputValue(e.target.value)}
              onFocus={() => {
                if (!isEditing) {
                  setInputValue("");
                  setIsEditing(true);
                }
              }}
              onBlur={() => {
                if (!inputValue) {
                  setInputValue(searchTerm);
                  setIsEditing(false);
                }
              }}
            />
          </form>
        </div>
        <div className="flex max-w-[90%] flex-col">
          {searchResults.map((item) => (
            <div
              className="mx-auto mb-10 flex max-w-[100%] rounded-3xl border border-[#313131] bg-[#ffffff11] py-6 lg:max-w-[80%] lg:py-10"
              data-aos="fade-up"
              key={item.id}
            >
              <Link href={`/${item.media_type}/${item.id}`}>
                <div className="mx-6 flex flex-row items-start justify-start lg:mx-10 lg:items-center">
                  <Image
                    src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                    width={200}
                    height={300}
                    priority
                    alt={item.original_title || item.name}
                    className="h-52 w-44 rounded-lg lg:h-72 lg:w-52"
                  />
                  <div className="mt-0 flex flex-col items-center justify-center pl-0 lg:mt-5 lg:items-start lg:pl-16">
                    <h1 className="mb-2 ml-2 line-clamp-2 text-center text-2xl font-bold md:text-4xl lg:mb-5 lg:ml-0 lg:line-clamp-none lg:text-left lg:text-5xl">
                      {item.original_title || item.original_name}
                    </h1>

                    <div>
                      <p className="mb-4 ml-5 line-clamp-[8] px-0 text-sm font-medium text-[#7c7c7c] lg:ml-0 lg:line-clamp-none lg:text-xl">
                        {item.overview || "Not available"}
                      </p>
                    </div>
                    <div className="mb-4 mt-5 hidden w-full items-baseline justify-between gap-2 text-lg lg:flex">
                      <div className="text-xl font-semibold text-[#595959]">
                        <p>{item.release_date || item.first_air_date}</p>
                      </div>
                      <div className="flex items-baseline">
                        <FaStar className="mr-2 text-2xl text-amber-400" />
                        <p className="mr-2 flex items-baseline text-3xl font-bold">
                          {item.vote_average?.toFixed(1) || "Not available"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5 flex w-full items-baseline justify-between gap-2 px-6 text-lg lg:hidden">
                  <div className="text-base font-semibold text-[#595959]">
                    <p>{item.release_date || item.first_air_date}</p>
                  </div>
                  <div className="flex items-baseline">
                    <FaStar className="mr-2 text-base text-amber-400" />
                    <p className="mr-2 flex items-baseline text-lg font-bold">
                      {item.vote_average?.toFixed(1) || "Not available"}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Page({ params }) {
  return <SearchPage paramsPromise={params} />;
}
