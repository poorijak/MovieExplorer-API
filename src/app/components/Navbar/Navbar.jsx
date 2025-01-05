'use client'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { RiMovie2AiFill } from "react-icons/ri";
import { motion, AnimatePresence, delay } from 'framer-motion';
import { FiSearch } from "react-icons/fi";
import { useRouter } from 'next/navigation';
import { Slant as Hamburger } from 'hamburger-react';


export default function Navbar() {

  const [scrollPosition, setScrollPosition] = useState(0);
  const [isVisible, setIsVisible] = useState(true)
  const [isActive, setIsActive] = useState(false);
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const router = useRouter();
  const handleSumit = (e) => {
    e.preventDefault();
    router.push(`search/${search}`)
  }




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
    <>
      <motion.div
        initial={{ y: '-200%' }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <motion.div className='w-full flex justify-center rounded-xl transition-transform duration-300'
        >

          {/* desktop navbar */}
          <motion.div
            variants={{
              visible: { y: 0 },
              hidden: { y: '-200%' },
            }}
            initial={{ y: '-200%' }}
            animate={isVisible ? 'visible' : 'hidden'}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className='hidden lg:block w-[935px] h-[52px] fixed  top-0 mt-3 shadow-lg shadow-[#171717]/50 bg-[#17171771] backdrop-blur-xl z-50 px-10 rounded-xl border-[#ffff] after:-z-10 after:conte-[] after:absolute after:inset-0 after:outline-1 after:outline after:-outline-offset-1 after:rounded-xl after:outline-white/30'
          >
            <div className='w-full h-full flex justify-between items-center'>
              <div className=''>
                <Link href={'#'}>
                  <RiMovie2AiFill className='text-3xl' />
                </Link>
              </div>
              <div className='flex gap-8 text-lg font-mediumitems-center'>
                <Link href={'/'} >Home</Link>
                <Link href={'#'}>Movie</Link>
                <Link href={'#'}>My List</Link>

              </div>
              <form action="" className='gruop flex items-center' onSubmit={handleSumit}>
                <input type="text" name="" id="" className='bg-transparent w-44 focus:outline-none' placeholder='search your keywords...' value={search} onChange={(e) => setSearch(e.target.value)} />
                <button className='text-gray-400 text-2xl font-medium  px-4 py-1.5 rounded-lg transition-transform  duration-300 hover:scale-105 hover:text-white'><FiSearch /></button>
              </form>

            </div>
          </motion.div>

          {/* moblie navbar */}

        </motion.div>
      </motion.div>
      <div className='lg:hidden h-[52px] fixed w-full flex justify-between items-center '>
        <Link href={'#'}>
          <RiMovie2AiFill className='text-3xl' />
        </Link>
        <div>
          <Hamburger />
        </div>

      </div>
      <motion.div 
      
      className='lg:hidden h-[52px] fixed w-full flex justify-between items-center '>
        <Link href={'#'}>
          <RiMovie2AiFill className='text-3xl' />
        </Link>
        <div>
          <Hamburger />
        </div>

      </motion.div>
    </>
  )
}
