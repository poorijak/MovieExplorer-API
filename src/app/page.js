'use client';

import React, { useEffect, useState } from 'react';
import HeroSection from './components/HeroSection/HeroSection';
import PopularMovie from './components/PopularMovie/PopularMovie';
import PopularSeries from './components/PopularSeries/PopularSeries'
import TopRated from './components/TopRated/TopRated'
import Genres from './components/Genres/Genres'


export default function TrendingMovies() {
  
  

  return (
    <div className=''>
      <HeroSection/>
      <PopularMovie/>
      <PopularSeries/>
      <TopRated/>
      <Genres/>
      <PopularMovie/>
      <PopularMovie/>
      <PopularMovie/>
      <PopularMovie/>
      
    </div>
  );
}
