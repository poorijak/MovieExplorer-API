import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { FaPlay, FaStar } from "react-icons/fa6";


export default function GenresContent({ content }) {
  return (
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 mx-10'>
      {
        content.map((item) => (
          <div key={item.id}
            className='rounded-md mx-2 my-5'
          >
            <Link
              href={`/movie/${item.id}`}
              className="block overflow rounded-md relative"
            >
              <div className="group relative w-full h-0 pb-[150%] overflow-hidden">
                <Image
                  src={`https://image.tmdb.org/t/p/original${item.poster_path || item.backdrop_path}`}
                  width={250}
                  height={250}
                  alt={item.original_title || item.name}
                  className="absolute rounded-md   top-0 left-0 w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                />
              </div>
            </Link>
            <h2 className='font-semibold line-clamp-1'>{item.original_title || item.name}</h2>
            <div className='flex justify-between'>
              <p className='text-[#a6a6a6]'>
                {item.release_date ? item.release_date.split('-')[0] : item.first_air_date ? item.first_air_date.split('-')[0] : 'Unknown'}</p>
              <div className='flex items-center'>
                <FaStar className='text-amber-400' />
                <p className='ml-1 text-[#a6a6a6] '>{item.vote_average.toFixed(1)}</p>
              </div>
            </div>
          </div>
        ))
      }
    </div>
  )
}
