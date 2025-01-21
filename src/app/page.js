'use client';

import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import HeroSection from '../components/HeroSection/HeroSection'



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
      <HeroSection/>

    </div>
  );
}
