import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Autoplay, Navigation } from 'swiper/modules';
import { fetchPopular } from '@/app/Service/imdbAPI';
import { FaPlay, FaStar } from "react-icons/fa6";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import Image from 'next/image';
import Link from 'next/link';


export default function PopularMovie() {
    const [movie, setMovie] = useState([])

    useEffect(() => {
        const getPopularMovie = async () => {
            try {
                const res = await fetchPopular('movie');
                setMovie(res)
            }
            catch (err) {
                console.log('getPopularMovieSection is : ', err);

            }
        }
        getPopularMovie()
    }, [])

    console.log(movie);

    return (
        <>
            <div className=' my-5 ml-8 flex items-center'>
                <h1 className='text-xl font-semibold'>Popular Movie</h1>
                <div className="ml-2 group flex items-center">
                    <div className="relative flex items-center w-auto">
                        {/* ลูกศร */}
                        <IoIosArrowDroprightCircle
                            className="transition-transform duration-300 group-hover:translate-x-20 group-hover:text-amber-300 "
                        />
                        {/* ลิงก์ */}
                        <Link
                            href={'#'}
                            className="absolute text-md text-amber-400 left-0 opacity-0 transition-all duration-300 group-hover:opacity-100 g:translate-x-4 group-hover:underline-offset-1 w-20"
                        >
                            See more
                        </Link>
                    </div>
                </div>

            </div>
            <div className='max-w-full ml-10 rounded-md'>
                <Swiper
                    modules={[Autoplay, Mousewheel, Navigation]}
                    direction='horizontal'
                    spaceBetween={10}
                    slidesPerView={2}
                    navigation={{
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    }}
                    breakpoints={{

                        768: {
                            slidesPerView: 4,
                            spaceBetween: 10,
                        },
                        1024: {
                            slidesPerView: 5,
                            spaceBetween: 10,
                        },
                        1280: {
                            slidesPerView: 6,
                            spaceBetween: 10,
                        },
                        1580: {
                            slidesPerView: 7,
                            spaceBetween: 10,
                        }
                    }}
                    // autoplay={{
                    //   delay: 10000,
                    //   disableOnInteraction: true, // ไม่ปิด autoplay เมื่อใช้ mousewheel
                    // }}
                    mousewheel={{
                        forceToAxis: true,
                        releaseOnEdges: true,
                    }}
                    onSlideChange={() => console.log('Slide changed')}
                    onSwiper={(swiper) => console.log('Swiper initialized:', swiper)}

                    className='max-w-full h-[600px]'
                >
                    {
                        movie.map((item) => (
                            <SwiperSlide key={item.id} className='h-[500px]'>
                                <Link href={`/movie/${item.id}`}>
                                    <Image src={`https://image.tmdb.org/t/p/original${item.poster_path || item.backdrop_path}`} width={250} height={250} alt={item.original_title} className=' rounded-md w-auto' />
                                </Link>
                                <h2>{item.original_title || item.name}</h2>
                                <div className='flex justify-between'>
                                    <p>{item.release_date.split('-')[0]}</p>
                                    <div className='flex items-center'>
                                        <FaStar className='text-amber-400' />
                                        <p className='ml-1 '>{item.vote_average.toFixed(1)}</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>

            </div>
        </>
    )
}
