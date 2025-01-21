'use client';

import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import Home from '../app/Home/page'




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
    <Home/>
  );
}
