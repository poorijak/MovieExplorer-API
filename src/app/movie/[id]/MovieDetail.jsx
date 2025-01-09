'use client'
import React, { useState, useEffect } from 'react'
import { fetchDetail } from '../../Service/imdbAPI';
import Image from 'next/image';



const MovieDetail = ({ id }) => {

    const [moveDetail, setMovieDetail] = useState([])

    useEffect(() => {
        const getMovieDetail = async () => {
            try {
                const res = await fetchDetail('movie', id)
                setMovieDetail(res)
            }
            catch (err) {
                console.log('getMovieDetail err is :', err);

            }
        }
        getMovieDetail()
    }, [id])

    console.log(moveDetail);




    return (
        <>
            <div className="relative w-screen h-[50vh]">
                <Image
                    src={`https://image.tmdb.org/t/p/original${moveDetail.backdrop_path}`}
                    width={1440}
                    height={1080}
                    alt={moveDetail.original_title || moveDetail.overview}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-blackOverlay_3"></div>
            </div>

            <div className='flex w-[100vh] mt-10 mx-auto'>
                <Image
                    src={`https://image.tmdb.org/t/p/original${moveDetail.poster_path}`}
                    width={1440}
                    height={1080}
                    alt={moveDetail.original_title || moveDetail.overview}
                    className="w-[370px] h-[500px] "
                />
                <div className='w-1/2 flex justify-start ml-5'>
                    <h1 className='text-4xl font-semibold'>{moveDetail.original_title}</h1>
                </div>
            </div>

        </>
    )
}

export default MovieDetail