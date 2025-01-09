'use client'
import React, { useState, useEffect } from 'react'
import { fetchDetail } from '../../Service/imdbAPI';
import Image from 'next/image';

const MovieDetail = ({ id }) => {

    const [moveDetail, setMovieDetail] = useState(null);  // ตั้งค่าเริ่มต้นเป็น null

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

    if (!moveDetail) {
        return <div>Loading...</div>; // แสดงข้อความขณะรอข้อมูล
    }

    return (
        <>
            {/* Backdrop image */}
            <div className="relative w-screen h-[50vh]">
                {moveDetail.backdrop_path && (
                    <Image
                        src={`https://image.tmdb.org/t/p/original${moveDetail.backdrop_path}`}
                        width={1440}
                        height={1080}
                        alt={moveDetail.original_title || moveDetail.overview}
                        className="w-full h-full object-cover"
                    />
                )}
                <div className="absolute inset-0 bg-blackOverlay_3"></div>
            </div>

            <div className='flex max-w-6xl my-10 mx-20 flex-col '>
                {/* Poster image */}
                {moveDetail.poster_path && (
                    <div className="w-[370px] h-[500px] relative ">
                        <Image
                            src={`https://image.tmdb.org/t/p/original${moveDetail.poster_path}`}
                            layout="fill"
                            objectFit="contain"  // หรือ "cover" ขึ้นอยู่กับที่คุณต้องการ
                            alt={moveDetail.original_title || moveDetail.overview}
                        />
                    </div>
                )}
                {/* Content */}
                <div className='w-1/2 flex justify-start ml-5'>
                    {/* Header */}
                    <div className='flex items-baseline text-4xl font-medium '>
                        <h1 className='whitespace-nowrap text-4xl font-semibold mr-4'>{moveDetail.original_title}</h1>
                        <span>({moveDetail.release_date.split('-')[0]})</span>
                    </div>
                    {/* Detailing */}
                    <div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MovieDetail;
