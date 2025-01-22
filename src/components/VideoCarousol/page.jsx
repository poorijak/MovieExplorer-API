import Image from 'next/image'
import React from 'react'


const page = ({movie}) => {



  return (
    <div className='bg-black'>
        <p>{movie.original_title}</p>
    </div>
  )
}

export default page
