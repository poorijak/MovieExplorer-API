'use client';

import React, { useEffect, useState } from 'react';
import { fetchTrending } from '@/app/Service/imdbAPI';
import HeroSection from './components/HeroSection/HeroSection';
import PopularMovie from './components/PopularMovie/PopularMovie';

export default function TrendingMovies() {
  

  return (
    <div className=''>
      <HeroSection/>
      <PopularMovie/>
      
    </div>
  );
}
