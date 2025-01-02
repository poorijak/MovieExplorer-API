'use client'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { RiMovie2AiFill } from "react-icons/ri";
import { motion, AnimatePresence, delay } from 'framer-motion';


export default function Navbar() {

  const [scrollPosition, setScrollPosition] = useState(0);
  const [isVisible, setIsVisible] = useState(true)
  const [isActive, setIsActive] = useState(false);
  const [open, setOpen] = useState(false)




  useEffect(() => {
    const handleScroll = () => {
      const currentScrollState = window.scrollY;
      if (currentScrollState > scrollPosition && currentScrollState > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setScrollPosition(currentScrollState);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollPosition]);







  return (
    <motion.div
      initial= {{ y: '-150%' }}
      animate= {{ y:  0 }} 
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.div className='w-full flex justify-center rounded-xl transition-transform duration-300'
      >
        <motion.div
          variants={{
            visible: { y: 0 },
            hidden: { y: '-150%' },
          }}
          initial={{ y: '-150%' }}
          animate={isVisible ? 'visible' : 'hidden'}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className='w-[935px] h-[52px] fixed  top-0 mt-3 shadow-lg shadow-[#171717]/50 bg-[#17171771] backdrop-blur-xl z-50 px-10 rounded-xl border-[#ffff] after:-z-10 after:conte-[] after:absolute after:inset-0 after:outline-1 after:outline after:-outline-offset-1 after:rounded-xl after:outline-white/30'
        >
          <div className='w-full h-full flex justify-between items-center'>
            <div className=''>
              <Link href={'#'}>
                <RiMovie2AiFill className='text-2xl ' />
              </Link>
            </div>
            <div className='flex gap-8 text-lg font-mediumitems-center'>
              <Link href={'/'} >Home</Link>
              <Link href={'#'}>Movie</Link>
              <Link href={'#'}>My List</Link>

            </div>
            <button className='text-gray-500 font-medium bg-white px-4 py-1.5 rounded-lg transition-transform  duration-300 hover:scale-105 hover:text-black'>Sign-up!</button>

          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
