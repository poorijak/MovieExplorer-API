import React, { useEffect, useState } from 'react'
import { fetchTrending } from '../Service/imdbAPI'
import { Swiper, SwiperSlide } from 'swiper/react';

export default function HeroSection() {

  const [movie , setMovie] = useState([])

  useEffect(() => {
    const getTrending = async() => {
      try {
        const res = await fetchTrending('movie');
        setMovie(res.slice(0 , 4))
      }
      catch (err) {
        console.log('getTreding error is :' , err);
      }

    }

    getTrending();
  } , [])


  return (
    <div>
    </div>
  )
}
