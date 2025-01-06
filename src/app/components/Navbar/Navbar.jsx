'use client'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { RiMovie2AiFill } from "react-icons/ri";
import { motion, AnimatePresence, delay } from 'framer-motion';
import { FiSearch } from "react-icons/fi";
import { useRouter } from 'next/navigation';
import { Squash as Hamburger } from 'hamburger-react'

export default function Navbar() {

  const [scrollPosition, setScrollPosition] = useState(0);
  const [isVisible, setIsVisible] = useState(true)
  const [isActive, setIsActive] = useState(false);
  const [search, setSearch] = useState('')
  const [isOpen, setIsOpen] = useState(false)
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



  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const items = {
    hidden: {
      opacity: 0,
      y: -20,
    },
    show: {
      opacity: 1,
      y: 0,
    },
    visible : {
      opacity : 0,
      y : -20 , 
      transition : {
        duration: 0.2,
                ease: 'easeInOut'
      }
    }
  };









  return (
    <>
      <motion.div className='w-full flex justify-center rounded-xl transition-transform duration-300'>
        {/* desktop navbar */}
        <motion.div
          variants={{
            visible: { y: 0 },
            hidden: { y: '-200%' },
          }}
          initial={{ y: '-200%' }}
          animate={isVisible ? 'visible' : 'hidden'}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className={`w-11/12 lg:w-[935px] h-[52px] fixed  top-0 mt-3 shadow-lg shadow-[#171717]/50 bg-[#17171771] ${isOpen ? 'backdrop-blur-none' : 'backdrop-blur-lg'} z-50 px-4 lg:px-10  rounded-xl border-[#ffff] after:-z-10 after:conten-[] after:absolute after:inset-0 after:outline-1 after:outline after:-outline-offset-1 after:rounded-xl after:outline-white/30`}
        >
          <div className='w-full h-full flex justify-between items-center relative'>
            <div className=''>
              <Link href={'/'}>
                <RiMovie2AiFill className='text-2xl lg:text-3xl' />
              </Link>
            </div>

            {/* desktop nav */}
            <div className='hidden  lg:flex gap-8 text-lg font-medium items-center'>
              <Link href={'#'}>Movie</Link>
              <Link href={'#'}>Tv Series</Link>
              <Link href={'#'}>My List</Link>
            </div>
            <form action="" className='gruop hidden  lg:flex items-center' onSubmit={handleSumit}>
              <input type="text" name="" id="" className='bg-transparent w-44 focus:outline-none' placeholder='search your keywords...' value={search} onChange={(e) => setSearch(e.target.value)} />
              <button className='text-gray-400 text-2xl font-medium  px-4 py-1.5 rounded-lg transition-transform  duration-300 hover:scale-105 hover:text-white'><FiSearch /></button>
            </form>

            {/* moblie nav */}
            <div className='lg:hidden flex items-center '>
              <button onClick={toggleMenu}>
                <Hamburger size={25} />
              </button>
            </div>
          </div>

          <AnimatePresence>
            {isOpen ? (
              <motion.div
              
                initial={{ scaleY: 0, opacity: 0 }} // เริ่มจากย่อขนาดลง
                animate={{ scaleY: 1, opacity: 1 }} // ยืดเต็มขนาด
                exit={{ scaleY: 0, opacity: 0, transition: { duration: 0.3, ease: 'easeInOut' } }} // หดกลับ
                style={{ originY: 0 }} // ตั้งค่าให้ขยายจากด้านบน
                className='absolute flex flex-col items-center top-[52px] w-11/12 mt-2 shadow-lg shadow-[#171717]/50 bg-[#00000071] backdrop-blur-lg z-50 px-4 py-6 rounded-xl border-[#ffff] after:-z-10 after:conten-[] after:absolute after:inset-0 after:outline-1 after:outline after:-outline-offset-1 after:rounded-xl after:outline-white/30'
              >
                <ul className='w-full text-4xl font-bold ml-5 flex flex-col items-center'>
                  <motion.li
                  variants={items}
                  initial='hidden'
                  animate='show'
                  exit='visible'
                    className='mb-5 pt-5'>
                    <Link href={'/'}>Movie</Link>
                  </motion.li>

                  <motion.li
                  variants={items}
                  initial='hidden'
                  animate='show'
                  exit='visible'
                    className='mb-5'>
                    <Link href={'/'}>Tv Series</Link>
                  </motion.li>

                  <motion.li
                  variants={items}
                  initial='hidden'
                  animate='show'
                  exit='visible'
                    className='mb-5'>
                    <Link href={'/'}>My List</Link>
                  </motion.li>
                </ul>

                <motion.form
                variants={items}
                initial='hidden'
                animate='show'
                exit='visible'
                  action=""
                  className='flex items-center'
                  onSubmit={handleSumit}
                >
                  <input
                    type="text"
                    name=""
                    id=""
                    className='bg-transparent w-44 focus:outline-none'
                    placeholder='search your keywords...'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <button className='text-gray-400 text-2xl font-medium px-4 py-1.5 rounded-lg transition-transform duration-300 hover:scale-105 hover:text-white'>
                    <FiSearch />
                  </button>
                </motion.form>
              </motion.div>
            ) : null}
          </AnimatePresence>



        </motion.div>


      </motion.div>
    </>
  )
}
