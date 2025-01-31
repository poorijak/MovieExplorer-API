import Image from "next/image";
import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from "react";
import { fetchTrending } from "../../../Service/imdbAPI";
import { InfiniteSlider } from "../../../components/ui/infinite-slider";
import {
  useScroll,
  useTransform,
  motion,
  useMotionValueEvent,
  progress,
} from "framer-motion";
import { useWindowSize } from "react-use";

const Page = () => {
  const { width, height } = useWindowSize();
  const carouselWrapperRef = useRef(null);
  const [movie, setMovie] = useState([]);
  const { scrollYProgress } = useScroll({
    target: carouselWrapperRef,
    offset: ["start start", "end start"],
  });
  const [caerouselVal, setCarouselVariant] = useState("inactive" | "active");

  const maximumScale = useMemo(() => {
    const windowYRatio = height / width;
    const Xscale = 1.6667;
    const Yscale = Xscale * (16 / 9) * windowYRatio;
    return Math.max(Xscale, Yscale);
  }, [width, height]);

  const postersOpacity = useTransform(scrollYProgress, [0.64, 0.8], [0, 1]);
  const posterTranslateXLeft = useTransform(
    scrollYProgress,
    [0.64, 0.66],
    [-20, 0],
  );
  const posterTranslateXRight = useTransform(
    scrollYProgress,
    [0.64, 0.66],
    [20, 0],
  );

  // กำหนด scale สำหรับไอเท็มตรงกลาง (อันที่ 2)
  const centerScale = useTransform(
    scrollYProgress,
    [0.3, 0.5, 0.66],
    [maximumScale * 1.1, maximumScale, 1],
  );

  useEffect(() => {
    const getTrending = async () => {
      try {
        const res = await fetchTrending("movie");
        setMovie(res);
      } catch (err) {
        console.log("getTrending error is :", err);
      }
    };

    getTrending();
  }, []);

  return (
    <div className="pb-8">
      <div
        ref={carouselWrapperRef}
        className="mt-[-100vh] h-[300vh] overflow-clip"
      >
        <div className="sticky top-0 flex h-screen items-center">
          <div className="relative left-1/2 mb-10 flex -translate-x-1/2 gap-5">
            {/* แสดงผลเฉพาะ 3 ตัวแรก */}
            {movie.slice(3, 6).map((item, index) => (
              <motion.div
                style={{
                  scale: index === 1 ? centerScale : 1, // ใช้ scale เฉพาะไอเท็มที่ 2
                  opacity: index !== 1 && 2 ? postersOpacity : 1,
                }}
                className="aspect-[9/16] w-[60vw] shrink-0 lg:aspect-video"
                key={item.id}
              >
                <Image
                  src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
                  width={1440}
                  height={1080}
                  alt="movie"
                  className="relative h-full w-full rounded-2xl object-cover"
                />
                <div className="absolute bottom-0 mb-5 flex w-full justify-between px-10">
                  <p>{item.original_title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      {/* ส่ง movie เป็น props */}
      <div className="mt-[-120px] space-y-5">
        <SmallVideoCarousel_1 movie={movie} />
        <SmallVideoCarousel_2 movie={movie} />
      </div>
    </div>
  );
};

export default Page;

// SmallVideoCarousel_1: แสดงลำดับปกติ
const SmallVideoCarousel_1 = ({ movie }) => {
  return (
    <div>
      <InfiniteSlider durationOnHover={80} gap={24} duration={35}>
        {movie.map((item) => (
          <div
            className="aspect-video w-[60vw] shrink-0 lg:w-[23vw]"
            key={item.id}
          >
            <Image
              src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
              width={1440}
              height={1080}
              alt="movie"
              className="relative h-full w-full rounded-xl object-cover"
            />
            <div className="absolute bottom-0 mb-2 ml-3">
              <p>{item.original_title}</p>
            </div>
          </div>
        ))}
      </InfiniteSlider>
    </div>
  );
};

// SmallVideoCarousel_2: แสดงลำดับย้อนกลับ
const SmallVideoCarousel_2 = ({ movie }) => {
  return (
    <div>
      <InfiniteSlider
        durationOnHover={80}
        gap={24}
        reverse={true}
        duration={35}
      >
        {movie
          .slice() // Clone array ก่อน reverse เพื่อไม่ให้กระทบ array เดิม
          .reverse()
          .map((item) => (
            <div
              key={item.id}
              className="aspect-video w-[60vw] shrink-0 lg:w-[23vw]"
            >
              <Image
                src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
                width={1440}
                height={1080}
                alt="movie"
                className="h-full w-full rounded-xl object-cover"
              />
              <div className="absolute bottom-0 mb-2 ml-3 w-full">
                <p>{item.original_title}</p>
              </div>
            </div>
          ))}
      </InfiniteSlider>
    </div>
  );
};
