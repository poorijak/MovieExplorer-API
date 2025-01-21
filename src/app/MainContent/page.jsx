import React from 'react'
import HeroSection from '../../components/HeroSection/HeroSection';
import PopularMoive from '../../components/PopularMovie/PopularMovie'
import PopularSeries from '../../components/PopularSeries/PopularSeries'
import TopRated from '../../components/TopRated/TopRated'
import Genres from '../../components/Genres/Genres'

const page = () => {
  return (
    <div>
      <HeroSection/>
      <PopularMoive/>
      <PopularSeries/>
      <TopRated/>
      <Genres/>
    </div>
  )
}

export default page
