'use client'
import React, { useEffect, useState } from 'react'
import { fetchPopular, fetchTrending } from '../../../Service/imdbAPI'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import { FaPlay, FaStar } from "react-icons/fa6";
import 'swiper/css/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {

  const [movie, setMovie] = useState([])

  useEffect(() => {
    const getTrending = async () => {
      try {
        const res = await fetchPopular('movie');
        setMovie(res.slice(0, 4).reverse())
      }
      catch (err) {
        console.log('getTreding error is :', err);
      }

    }

    getTrending();
  }, [])




  return (
    <div className=' relative w-full'>
      <Swiper
        modules={[Autoplay, Mousewheel, Navigation]}
        direction='horizontal'
        spaceBetween={10}
        slidesPerView={1}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        autoplay={{
          delay: 10000,
          disableOnInteraction: true, // ไม่ปิด autoplay เมื่อใช้ mousewheel
        }}
        mousewheel={{
          forceToAxis: true,
          releaseOnEdges: true,
        }}
       

        className='max-w-full hover:cursor-grabbing '
      >

        {
          movie.map((item) => (
            <SwiperSlide key={item.id}>
              <div
                style={{
                  backgroundImage: `url(${`https://image.tmdb.org/t/p/original${item.backdrop_path}`})`,
                }}
                className='bg-cover bg-center h-[80vh] xl:bg-top  w-screen'
              >
                <div className='bg-blackOverlay_1 xl:bg-blackOverlay_2 flex justify-center items-center xl:block w-full h-full'>
                  <div className=''>
                    <div className='flex flex-col pt-32 xl:pl-16  justify-center xl:justify-start '>
                      <h1 className='text-3xl md:text-4xl xl:text-6xl font-bold mb-2 xl:mb-5'>{item.original_title}</h1>
                      <p className='hidden smblock w-96 line-clamp-1 md:line-clamp-2 2xl:line-clamp-3  mb-5 font-medium'>{item.overview}</p>
                      <p className='mb-5 font-semibold xl:text-[#c2c2c2] text-white text-center xl:text-left'>{item.genres.join(' , ')}</p>
                      <div className='flex gap-2 mb-5 text-lg items-center justify-center xl:justify-start'>
                        <FaStar className='text-amber-400' />
                        <p className='flex items-center text-2xl font-bold mr-2'>{item.vote_average.toFixed(1)}<span className='ml-2 text-lg'> /10</span></p>
                        <Image src='IMDB.svg' width={50} height={50} alt='imdb logo' />
                      </div>
                      <div className='flex justify-center lg:justify-normal item-center gap-5'>
                        <button className='group bg-[#FF1C1C] rounded-md text-black font-bold hover:shadow-[0px_0px_10px_-1px_#ff4f4f] transition-shadow duration-300'>
                          <Link href={`/movie/${item.id}`} className='flex items-center px-4 py-2 gap-4 group-hover:text-white transition-colors duration-100'><FaPlay /> Watch Detail</Link>
                        </button>
                        <button className='group bg-[#303030] rounded-md text-white font-semibold hover:shadow-[0px_0px_10px_-1px_#545454] transition-shadow duration-300'>
                          <Link href={`/movie/${item.id}`} className='flex items-center px-4 py-2 gap-4 group-hover:text-white transition-colors duration-100'>Play trailer</Link>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))
        }

      </Swiper>
    </div >
  )
}
