'use client'
import React, { useState, useEffect } from 'react'
import { fetchDetail, fetchCasting } from '../../Service/imdbAPI';
import Image from 'next/image';
import { FaHeart } from "react-icons/fa";
import { FaBookmark, FaStar } from "react-icons/fa6";
import { motion, AnimatePresence, delay } from 'framer-motion';
import Casting from './Actor'


const MovieDetail = ({ id }) => {
    const [moveDetail, setMovieDetail] = useState(null);  // ตั้งค่าเริ่มต้นเป็น null
    const [cast, setCast] = useState(null)
    const [heartActive, setHeartActive] = useState(false)
    const [myFav, setMyFav] = useState(false)

    useEffect(() => {
        const getMovieDetail = async () => {
            try {
                const res = await fetchDetail('movie', id)
                setMovieDetail(res);  // ดึงข้อมูลมาแล้วอัพเดต state
            }
            catch (err) {
                console.log('getMovieDetail err is :', err);
            }
        }
        getMovieDetail();
    }, [id]);


    useEffect(() => {
        const getCasting = async () => {
            try {
                const res = await fetchCasting('movie', id)
                setCast(res)
            }
            catch (err) {
                console.log('getMovieCast err is :', err);
            }
        }
        getCasting()
    }, [])


    if (!moveDetail) {
        return <div>Loading...</div>; // แสดงข้อความขณะรอข้อมูล
    }

    console.log(cast);

    const handleHeart = () => {
        setHeartActive(!heartActive)
    }
    const handleFav = () => {
        setMyFav(!myFav)
    }


    return (
        <div className="w-full overflow-hidden"> {/* ป้องกัน overflow */}
            {/* Backdrop image */}
            <div className="relative w-full h-[50vh]"> {/* ใช้ w-full แทน w-screen */}
                {moveDetail.backdrop_path && (
                    <Image
                        src={`https://image.tmdb.org/t/p/original${moveDetail.backdrop_path}`}
                        width={1440}
                        height={1080}
                        alt={moveDetail.original_title || moveDetail.overview}
                        className="w-full h-full object-cover"
                    />
                )}
                <div className="absolute inset-0 bg-blackOverlay_5 lg:bg-blackOverlay_3"></div>
            </div>

            {/* Content Section */}
            <div className="w-full mt-20 relative"> {/* จำกัดความกว้างและจัดให้อยู่ตรงกลาง */}
                <div className="w-full flex flex-wrap justify-center px-5  gap-8">
                    {/* Poster */}
                    <div className="flex-shrink-0 w-[300px] h-[450px]">
                        {moveDetail.poster_path && (
                            <Image
                                src={`https://image.tmdb.org/t/p/original${moveDetail.poster_path}`}
                                width={300}
                                height={450}
                                alt={moveDetail.original_title || moveDetail.overview}
                                className="w-full h-full object-cover rounded-lg"
                            />
                        )}
                    </div>
                    {/* Text Content */}
                    <div>
                        {/* Header */}
                        <div className='flex items-baseline'>
                            <h1 className='text-4xl font-semibold mr-3'>{moveDetail.original_title || moveDetail.name} <span className='text-3xl text-[#bfbfbf]'>({moveDetail.release_date.split('-')[0]})</span></h1>
                        </div>
                        {/* detail */}
                        <div className='block lg:flex text-lg mt-2 font-medium text-[#bfbfbf] gap-2'>
                            <p>{moveDetail.release_date.split('-').reverse().join('/')}</p>
                            <p>{moveDetail.genres.map((genre) => genre.name).join(" , ")}</p>
                            <p>{Math.floor(moveDetail.runtime / 60)}h {moveDetail.runtime % 60}m</p>
                        </div>
                        {/* button */}
                        <div className=' mt-5 flex gap-5 justify-center lg:justify-start' >

                            <button className={`group rounded-full w-[50px] h-[50px] bg-[#262626] flex justify-center items-center text-xl transition-colors duration-150 ${heartActive ? 'bg-[#270202]' : ''}`} onClick={handleHeart}>
                                <FaHeart className={`group-hover:text-red-500 transition-colors duration-150 group-hover:scale-105 ${heartActive ? 'text-red-500' : 'text-white'}`} /></button>
                            <button className={`group rounded-full w-[50px] h-[50px] bg-[#262626] flex justify-center items-center text-xl transition-colors duration-150 ${myFav ? 'bg-[#4b3d01]' : ''}`} onClick={handleFav}>
                                <FaBookmark className={`group-hover:text-yellow-500 transition-colors duration-150 group-hover:scale-105 ${myFav ? 'text-yellow-500' : 'text-white'}`} />
                            </button>
                            <button className='group bg-[#303030] rounded-xl text-white font-semibold hover:shadow-[0px_0px_10px_-1px_#545454] transition-shadow duration-300 px-3'>
                                Play trailer
                            </button>
                        </div>


                        {/* rating */}
                        <div>
                            <div className='mt-8 flex gap-4 mb-5 text-lg items-center justify-center lg:justify-start '>
                                <FaStar className='text-amber-400 text-2xl' />
                                <div className='flex items-baseline gap-2 '>
                                    <p className='text-5xl font-bold mr-2'>{moveDetail.vote_average.toFixed(1)}</p>
                                    <span className='text-2xl '> /10</span>
                                    <Image src='/IMDB.svg' width={60} height={60} alt='imdb logo' />
                                </div>
                            </div>
                        </div>

                        <div className='px-5 xl:px-0'>
                            <p className='text-2xl font-bold'>Overview :</p>
                            <p className='w-auto max-w-[600px] ml-2'>{moveDetail.overview}</p>
                        </div>
                    </div>
                </div>

            </div>

            <div>
                <Casting cast={cast} />
            </div>
        </div>
    );
};

export default MovieDetail;
