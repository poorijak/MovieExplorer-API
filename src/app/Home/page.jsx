import {React , useEffect, useState} from 'react'
import VideoCarousol from '../../components/VideoCarousol/page'
import HomeHero from '../../components/HomeHero/page'
import { fetchPopular } from '../../../Service/imdbAPI'


const page = () => {

    const [movie, setMovie] = useState([])

    useEffect(() => {
        const getTrending = async () => {
            try {
                const res = await fetchPopular('movie');
                setMovie(res[1])
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
            <div className='bg-black relative z-10'>
                <HomeHero movie={movie} />
            </div>
            <VideoCarousol movie={movie} />
            <div className='h-[300vh] bg-white'></div>
        </>
    )
}

export default page
