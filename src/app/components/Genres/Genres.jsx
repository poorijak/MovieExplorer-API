import axios from 'axios'
import { fetchGenres } from '../../Service/imdbAPI'
import React, { use, useEffect, useState } from 'react'
import GenresFillter from '../Genres/GenresFillter'
import GenresContent from '../Genres/GenresContent'


const API_KEY = process.env.NEXT_PUBLIC_API_KEY
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export default function Genres() {

    const [genres, setGenres] = useState([])
    const [selected, setSelected] = useState(0)
    const [content, setContent] = useState([])
    const [category, setCategory] = useState('movie')

    useEffect(() => {
        const getGenres = async () => {
            try {
                const res = await fetchGenres(category);
                setGenres(res)
            }
            catch (err) {
                console.log('getGenre err is :', err);

            }
        }

        getGenres();
    }, [category])



    useEffect(() => {
        if (selected !== undefined && category) {
            let fetchContent = async () => {
                try {
                    let url = `${BASE_URL}/discover/${category}?api_key=${API_KEY}&language=en-US`
                    if (selected !== 0) {
                        url += `&with_genres=${selected}`
                    }
                    const res = await axios.get(url)
                    setContent(res.data.results || [])
                }
                catch (err) {
                    console.log('Content is : ', err)
                }
            }

            fetchContent()
        }


    }, [selected, category])

    console.log(content);
    



    return (
        <div className='mt-10'>
            <div className='w-full flex justify-center mb-10'>
                <div className='flex w-52 p-1.5 border border-[#ffffff49] rounded-full bg-[#242424] '>
                    <button className={`text-lg font-semibold w-24 py-2 px-4 rounded-full transition-all duration-300 ease-in-out ${category === 'movie' ? 'bg-red-500 shadow-[0px_0px_6px_-4px_#ff7a7a] ' : 'bg-[#242424] '}`} onClick={() => setCategory('movie')}>movie</button>
                    <button className={`text-lg font-semibold w-24 py-2 px-4 rounded-full transition-all duration-300 ease-in-out ${category === 'tv' ? 'bg-blue-500 shadow-[0px_0px_6px_0px_#61a5ff]' : 'bg-[#242424] '}`} onClick={() => setCategory('tv')}>tv</button>
                </div>
            </div>
            <GenresFillter selected={selected} setSelected={setSelected} genres={genres} />
            <div>
                <GenresContent content={content} />
            </div>
        </div>
    )
}
