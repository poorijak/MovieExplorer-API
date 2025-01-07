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



    return (
        <div className='mt-10'>
            <div className='w-11/12 mx-auto mb-10'>
                <button className={`w-1/2 py-4 px-2 rounded-l-full border-2 border-gray-100 ${category === 'movie' ? 'bg-red-500' : 'bg-[#4b4b4b] ' }`} onClick={() => setCategory('movie')}>movie</button>
                <button className={`w-1/2 py-4 px-2 rounded-r-full border-2 border-gray-100 ${category === 'tv'  ? 'bg-red-500' : 'bg-[#4b4b4b] '}`} onClick={() => setCategory('tv')}>tv</button>
            </div>
            <GenresFillter selected={selected} setSelected={setSelected} genres={genres} />
            <div>
                <GenresContent content={content} />
            </div>
        </div>
    )
}
