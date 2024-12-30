'use client';

import React, { useEffect, useState } from 'react';
import { fetchTrending } from '@/app/Service/imdbAPI';
import HeroSection from './components/HeroSection';

export default function TrendingMovies() {
  

  return (
    <div>
      <HeroSection/>
    </div>
  );
}
