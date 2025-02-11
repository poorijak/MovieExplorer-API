import React from 'react'
import HeroSection from '../../components/HeroSection/HeroSection';
import PopularMoive from '../../components/CompContent/PopularContent/PopularMovie'
import TopRated from '../../components/TopRated/TopRated'
import Genres from '../../components/Genres/Genres'

const page = () => {
  return (
    <div>
      <HeroSection content={'movie'} lastSlice={4} />
      <PopularMoive content={'movie'} />
      <PopularMoive content={'tv'} />
      <TopRated />
      <Genres />
    </div>
  )
}

export default page
