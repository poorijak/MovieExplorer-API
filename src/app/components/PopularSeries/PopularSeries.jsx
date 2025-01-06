import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Autoplay, Navigation } from 'swiper/modules';
import { FaPlay, FaStar } from "react-icons/fa6";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { TbHandFinger } from "react-icons/tb";
import Image from 'next/image';
import Link from 'next/link';
import { fetchPopular } from '../../Service/imdbAPI';


export default function PopularSeries() {
    const [series, setSeries] = useState([])

    useEffect(() => {
        const getPopularseries = async () => {
            try {
                const res = await fetchPopular('tv');
                setSeries(res)
            }
            catch (err) {
                console.log('getPopularseriesSection is : ', err);

            }
        }
        getPopularseries()
    }, [])

    console.log(series);

    return (
        <>
            <div className=' my-5 ml-8 flex items-center'>
                <h1 className='text-xl font-semibold'>Popular Tv</h1>
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

                    className='max-w-full h-auto mb-10'
                >
                    {
                        series.map((item) => (
                            <SwiperSlide key={item.id} className='h-[500px]'>
                                <div>
                                    <Link
                                        href={`/series/${item.id}`}
                                        className="block overflow-hidden rounded-md relative"
                                    >
                                        <div className="group relative w-full h-0 pb-[150%] overflow-hidden">
                                            <Image
                                                src={`https://image.tmdb.org/t/p/original${item.poster_path || item.backdrop_path}`}
                                                width={250}
                                                height={250}
                                                alt={item.original_name}
                                                className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                                            />
                                        </div>
                                    </Link>
                                    <h2 className='font-semibold line-clamp-1'>{item.original_name || item.name}</h2>
                                    <div className='flex justify-between'>
                                        <div className='flex items-center'>
                                            <FaStar className='text-amber-400' />
                                            <p className='ml-1 text-[#a6a6a6] '>{item.vote_average.toFixed(1)}</p>
                                        </div>
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
