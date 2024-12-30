'use client';

import React, { useEffect, useState } from 'react';
import { fetchTrending } from '@/app/Service/imdbAPI';

export default function TrendingMovies() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getTrendingMovies = async () => {
      try {
        const results = await fetchTrending('movie'); // 'movie' คือ type
        setMovies(results); // เก็บผลลัพธ์ใน state
      } catch (err) {
        console.error('Error fetching trending movies:', err);
      }
    };
    getTrendingMovies();
  }, []);

  return (
    <div>
      <h1>Trending Movies</h1>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>{movie.title}</li> // แสดงชื่อหนัง
        ))}
      </ul>
    </div>
  );
}
