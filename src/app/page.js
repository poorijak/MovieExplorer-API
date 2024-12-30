'use client'
import Image from "next/image";
import tmdbApi, { movieType } from "./Service/imdbAPI";
import axiosClient from "./Service/axiosClient";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = { language: 'en-US', page: 1 }
        const res = await tmdbApi.getMovieList(movieType.popular, {params});
        setData(res.results.genres)

      }
      catch (err) {
        console.log('error is : ', err);

      }
    }

    fetchData();
  }, [])

  useEffect(() => {
    console.log(data)
  } , [data])

  return (
    <>
      <h2>Hello</h2>
    </>
  );
}
