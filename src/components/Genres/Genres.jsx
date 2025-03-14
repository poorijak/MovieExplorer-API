"use client";

import axios from "axios";
import { fetchGenres } from "../../../Service/imdbAPI";
import React, { use, useEffect, useState } from "react";
import GenresFillter from "../Genres/GenresFillter";
import GenresContent from "../Genres/GenresContent";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function Genres() {
  const [genres, setGenres] = useState([]);
  const [selected, setSelected] = useState(0);
  const [content, setContent] = useState([]);
  const [category, setCategory] = useState("movie");
  const [loadMore, setLoadMore] = useState(12);

  useEffect(() => {
    const getGenres = async () => {
      try {
        const res = await fetchGenres(category);
        setGenres(res);
      } catch (err) {
        console.log("getGenre err is :", err);
      }
    };

    getGenres();
  }, [category]);

  useEffect(() => {
    setSelected(0);
  }, [category]);

  useEffect(() => {
    if (selected === undefined || !category || genres.length === 0) {
      return; // หยุดการ fetch หากยังไม่มี genres หรือ selected
    }
    let fetchContent = async () => {
      try {
        let url = `${BASE_URL}/discover/${category}?api_key=${API_KEY}&language=en-US`;
        if (selected !== 0) {
          url += `&with_genres=${selected}`;
        }
        const res = await axios.get(url);
        setContent(res.data.results.slice(0, loadMore) || []);
      } catch (err) {
        console.log("Content fetch error:", err);
      }
    };
    fetchContent();
  }, [selected, category, genres, loadMore]); // เพิ่ม genres ใน dependency

  console.log(content);

  const haddleLoad = () => {
    setLoadMore((loadMore) => loadMore + 8);
  };

  return (
    <div className="mt-10">
      <div className="mb-10 flex w-full justify-center">
        <div className="flex w-52 rounded-full border border-[#ffffff49] bg-[#242424] p-1.5">
          <button
            className={`w-24 rounded-full px-4 py-2 text-lg font-semibold transition-all duration-300 ease-in-out ${category === "movie" ? "bg-red-600 shadow-[0px_0px_12px_-4px_#ff7a7a]" : "bg-[#242424]"}`}
            onClick={() => setCategory("movie")}
          >
            movie
          </button>
          <button
            className={`w-24 rounded-full px-4 py-2 text-lg font-semibold transition-all duration-300 ease-in-out ${category === "tv" ? "bg-blue-500 shadow-[0px_0px_6px_0px_#61a5ff]" : "bg-[#242424]"}`}
            onClick={() => setCategory("tv")}
          >
            tv
          </button>
        </div>
      </div>
      <GenresFillter
        selected={selected}
        setSelected={setSelected}
        genres={genres}
        category={category}
      />
      <GenresContent content={content} category={category} />
      <div className="mb-36 mt-10 flex w-full justify-center">
        {content.length < 20 && (
          <button
            onClick={haddleLoad}
            className="ctive:scale-95 rounded-full bg-red-600 px-4 py-2 text-lg font-semibold transition-all duration-300 ease-in-out"
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
}
