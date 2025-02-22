"use client";
import React, { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { motion, AnimatePresence, delay } from "framer-motion";
import { AiOutlinePlus } from "react-icons/ai";
import { usePathname } from "next/navigation";
import Aos from "aos";
import "aos/dist/aos.css";

const accordionData = [
  {
    id: 1,
    title: "Where does Movie Explorer get its movie data from?",
    content:
      "Movie Explorer retrieves movie and TV show data from TMDB (The Movie Database). This includes details such as movie descriptions, ratings, release dates, and posters.",
  },
  {
    id: 2,
    title: "Why are some movies missing information or images?",
    content:
      "Since Movie Explorer relies on TMDB, if a movie’s information has not been updated on TMDB, it may result in missing posters, details, or ratings.",
  },
  {
    id: 3,
    title: "Can I watch movies or TV shows on Movie Explorer?",
    content:
      "No, Movie Explorer is designed for browsing movie information and recommendations only. It does not provide streaming services, but you can follow links to official sources for more details.",
  },
  {
    id: 4,
    title: "Where do the ratings come from, and how reliable are they?",
    content:
      "The ratings displayed come from TMDB User Ratings, which are based on real user reviews from a global audience. These ratings reflect audience opinions but may differ from critic scores.",
  },
  {
    id: 5,
    title: "Can I search or filter movies based on my preferences?",
    content:
      "Yes! Movie Explorer allows you to search and filter movies based on genre, release year, popularity, and ratings, making it easier to find movies that match your interests.",
  },
];

function AccordionItem({ title, content }) {
  const [expanded, setExpanded] = useState(false);
  const pathName = usePathname();

  const handleToggle = () => {
    setExpanded((prev) => !prev);
  };

  const variants = {
    hidden: {
      opacity: 0,
    },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  useEffect(() => {
    setExpanded(false);
  }, [pathName]);

  useEffect(() => {
    Aos.init({
      duration: 300,
      once: false,
    });
  }, []);
  return (
    <div
      data-aos="fade-up"
      className="max-w-full border-b-2 border-[#5C5C5C] p-7 transition-transform duration-300"
    >
      <div
        onClick={handleToggle}
        className="flex cursor-pointer justify-between text-xl font-medium lg:text-3xl"
      >
        <div className="">{title}</div>
        <AiOutlinePlus
          className={`ml-3 text-4xl transition-transform duration-300 ${expanded ? "rotate-45" : "rotate-0"}`}
        />
      </div>
      <motion.div
        initial={{ height: 0 }}
        animate={expanded ? { height: "auto" } : { height: 0 }}
        exit={{ height: 0 }}
        transition={{
          duration: 0.5, // คุมระยะเวลา
          ease: [0.25, 0.8, 0.25, 1], // ค่า cubic-bezier ที่ให้การเคลื่อนไหวสไลด์นุ่ม
        }}
        className="font-Poppins mt-2 overflow-hidden text-lg font-medium text-[#808080] lg:mt-4 lg:text-xl"
      >
        {content}
      </motion.div>
    </div>
  );
}

const Page = () => {
  return (
    <div
      data-aos="fade-up"
      className="mx-auto mt-40 flex w-11/12 flex-col items-center space-y-4 lg:w-2/3 lg:flex-row lg:items-start"
    >
      <div className="w-1/2 pt-7 text-center">
        <div className="flex flex-col items-center justify-center lg:items-start">
          <p className="rounded-full bg-white px-7 py-1.5 text-lg font-semibold text-black lg:text-4xl">
            FAQs
          </p>
          <p className="mt-4 text-xl font-semibold text-[#5e5e5e] lg:text-2xl">
            the most common question
          </p>
        </div>
      </div>
      <div className="w-11/12 lg:w-2/3">
        {accordionData.map((item) => (
          <AccordionItem
            key={item.id}
            title={item.title}
            content={item.content}
          />
        ))}
      </div>
    </div>
  );
};

export default Page;
