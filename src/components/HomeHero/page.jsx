import { React, useEffect, useRef, useState } from 'react'
import { fetchPopular } from '../../../Service/imdbAPI'
import Image from 'next/image'
import Link from 'next/link'
import { FaPlay, FaStar } from "react-icons/fa6";
import { useScroll, useTransform , motion } from 'framer-motion'



const page = ({movie}) => {
    const ImageRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: ImageRef,
        offset: ['start end', 'end start'],
    });
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [1, 1, 0, 0]);
    

    return (
        <>
            <div className='relative h-[240vh] bg-black '>
                <motion.div
                style={{ opacity }}
                    ref={ImageRef}
                    className='absolute w-full -top-[--header-height] left-0 h-[190vh] '>
                    <Image src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} width={1440} height={1080} alt='HeroMovie' className='sticky top-0 w-full h-screen object-cover' />
                </motion.div>
                <motion.div 
                variants={{
                    hidden : { opacity : 0},
                    visible : { opacity : 1}
                }}
                whileInView='visible'
                exit='hidden'
                animate='hidden'
                viewport={{ amount : 0.8}}
                className='relative z-10 min-h-[--hero-height] pt-[40vh] pl-0  xl:pl-56 flex items-center flex-col xl:inline-block text-center'>
                    <p className='text-7xl font-bold mb-5'>{movie.original_title}</p>
                    <button className='inline-block group bg-[#ffffff3f] py-3 mb-5  rounded-full text-white font-semibold hover:shadow-[0px_0px_10px_-1px_#545454] transition-shadow duration-300 px-3'>
                        <Link href={`/movie/${movie.id}`}>Watch Trailer</Link>
                    </button>
                    <div className='flex items-baseline justify-center gap-2'>
                        <FaStar className='text-amber-400 text-lg' />
                        <p className='flex items-center text-2xl font-bold mr-2'>{movie.vote_average}</p>
                    </div>
                </motion.div>
            </div>
        </>
    )
}

export default page
