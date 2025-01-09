'use client';

import React, { useEffect, useState } from 'react';
import HeroSection from './components/HeroSection/HeroSection';
import PopularMovie from './components/PopularMovie/PopularMovie';
import PopularSeries from './components/PopularSeries/PopularSeries'
import TopRated from './components/TopRated/TopRated'
import Genres from './components/Genres/Genres'
import Footer1 from './components/Footer/Footer1'
import Lenis from 'lenis';


export default function TrendingMovies() {

  useEffect(() => {

    const lenis = new Lenis()
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

  }, [])



  return (
    <div className=''>
      <HeroSection />
      <PopularMovie />
      <PopularSeries />
      <TopRated />
      <Genres />
    </div>
  );
}
