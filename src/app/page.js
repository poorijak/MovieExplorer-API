"use client";

import React, { useEffect, useState } from "react";
import Lenis from "lenis";
import Home from "@/src/app/Home/page";
import { metadata } from "./metadata";

export default function TrendingMovies() {
  useEffect(() => {
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  return <Home />;
}
