'use client'
import React, { use, useEffect, useState } from 'react'
import { fetchMovieTrending } from '@/app/Service/imdbAPI'

export default function page() {

  const [movie, setMovie] = useState([])
  useEffect(() => {
    const getMovieTrending = async () => {
      try {
        const res = await fetchMovieTrending();
        setMovie(res)
        
      }
      catch (err) {
        console.log('getMovieTrending error is : ' , err)
      }
    }
    getMovieTrending();
  }, [])
  
  console.log(movie);
  

  return (
    <div>
      {
        movie.map((items) => (
          <div key={items.id}>{items.title}</div>
        ))
      }
    </div>
  )
}
