import { React, useEffect, useState } from 'react'
import { fetchPopular } from '../../../Service/imdbAPI'
import Image from 'next/image'


const page = () => {

    const [movie, setMovie] = useState([])

    useEffect(() => {
        const getTrending = async () => {
            try {
                const res = await fetchPopular('movie');
                setMovie(res[4])
            }
            catch (err) {
                console.log('getTreding error is :', err);
            }

        }

        getTrending();
    }, [])
    console.log(movie);

    return (
        <>
            <div className='relative h-[300vh] bg-black'>
                <div className='absolute w-full top-0 left-0'>
                    <Image src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} width={1440} height={1080} alt='HeroMovie' className='w-full' />
                </div>
                <div className='relative z-10 top-[400px] '>
                    <p className='text-7xl font-bold'>{movie.original_title}</p>
                </div>
            </div>
        </>
    )
}

export default page
