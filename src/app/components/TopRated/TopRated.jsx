import { fetchTopRate } from '../../Service/imdbAPI'
import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Autoplay, Navigation } from 'swiper/modules';
import Image from 'next/image';
import { FaPlay, FaStar } from "react-icons/fa6";
import Link from 'next/link';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';



export default function TopRated() {

    const [topRate, setTopRate] = useState([])

    useEffect(() => {
        const getTopRated = async () => {
            try {
                const res = await fetchTopRate('movie');
                setTopRate(res.slice(11, 20))
            }
            catch (err) {
                console.log('getTopRated err is : ', err);
            }
        }

        getTopRated()
    }, [])



    return (
        <>
            <div className=' my-5 ml-8 flex items-center'>
                <h1 className='text-xl font-semibold'>Top Rated Movie!</h1>
            </div>
            <div className='w-full'>
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
                        delay: 4000,
                        disableOnInteraction: false, // ไม่ปิด autoplay เมื่อใช้ mousewheel
                    }}
                    mousewheel={{
                        forceToAxis: true,
                        releaseOnEdges: true,
                    }}
                    pagination={{ clickable: true }}
                    scrollbar={{ draggable: true }}

                    className='max-w-full '
                >

                    {
                        topRate.map((item) => (
                            <SwiperSlide key={item.id}>
                                <div
                                    style={{
                                        backgroundImage: `url(${`https://image.tmdb.org/t/p/original${item.backdrop_path}`})`,
                                    }}
                                    className='bg-cover bg-center h-screen lg:h-[500px] lg:bg-top  w-11/12 mx-auto lg:rounded-xl hover:cursor-grab'
                                >
                                    <div className='bg-blackOverlay_4 flex justify-center items-center lg:block w-full h-full lg:rounded-xl'>
                                        <div className='flex flex-col lg:flex-row justify-center items-center  pt-32'>
                                            <Image src={`https://image.tmdb.org/t/p/original${item.poster_path}`} width={200} height={300} priority  alt={item.original_title} />
                                            <div className='flex flex-col mt-5 lg:pl-16 justify-center items-center lg:items-start'>
                                                <h1 className='text-3xl text-center lg:text-left md:text-4xl lg:text-5xl font-bold mb-5 w-96 line-clamp-2 '>{item.original_title}</h1>
                                                <p className='w-96 px-10 lg:px-0 line-clamp-3  mb-4 font-medium'>{item.overview}</p>
                                                <div className='flex gap-2 mb-4 text-lg items-center'>
                                                    <FaStar className='text-amber-400' />
                                                    <p className='flex items-center text-2xl font-bold mr-2'>{item.vote_average.toFixed(1)}<span className='ml-2 text-lg'> /10</span></p>
                                                    <Image src='IMDB.svg' width={50} height={50} alt='imdb logo' />
                                                </div>
                                                <div className='flex justify-center lg:justify-normal item-center gap-5'>
                                                    <button className='group bg-[#ffd000] rounded-md text-black font-bold hover:shadow-[0px_0px_6px_0px_#ffd900] transition-shadow duration-300'>
                                                        <Link href={`/movie/${item.id}`} className='flex items-center px-4 py-2 gap-4 group-hover:text-white transition-colors duration-100'><FaPlay /> Watch Detail</Link>
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
        </>
    )
}
