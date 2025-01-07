import { fetchTopRate } from '../../Service/imdbAPI'
import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Autoplay, Navigation } from 'swiper/modules';
import Image from 'next/image';
import { FaPlay, FaStar } from "react-icons/fa6";
import Link from 'next/link';



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

    console.log('topRated : ', topRate);


    return (
        <>
            <div className=' my-5 ml-8 flex items-center'>
                <h1 className='text-xl font-semibold'>Popular Movie</h1>
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

                    className='max-w-full '
                >

                    {
                        topRate.map((item) => (
                            <SwiperSlide key={item.id}>
                                <div
                                    style={{
                                        backgroundImage: `url(${`https://image.tmdb.org/t/p/original${item.backdrop_path}`})`,
                                    }}
                                    className='bg-cover bg-center h-[500px] xl:bg-top  w-11/12 mx-auto rounded-xl'
                                >
                                    <div className='bg-blackOverlay_3 flex justify-center items-center xl:block w-full h-full'>
                                        <div className='flex'>
                                            <Image src={`https://image.tmdb.org/t/p/original${item.poster_path}`} width={250} height={75}  alt={item.original_title} />
                                            <div className='flex flex-col pt-32 xl:pl-16 justify-center'>
                                                <h1 className='text-3xl md:text-4xl xl:text-6xl font-bold mb-5'>{item.original_title}</h1>
                                                <p className='hidden sm:block w-96 line-clamp-1 md:line-clamp-2 2xl:line-clamp-3  mb-5 font-medium'>{item.overview}</p>
                                                <div className='flex gap-2 mb-5 text-lg items-center'>
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
        </>
    )
}