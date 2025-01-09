import React, { useState } from 'react';
import { motion, AnimatePresence, delay } from 'framer-motion';
import { IoIosArrowDown } from "react-icons/io";


export default function GenresFilter({ selected, setSelected, genres, category }) {
    const [isOpen, setIsOpen] = useState(false);
    const [nameGenre, setNameGenre] = useState('All')

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {/* Genres สำหรับหน้าจอใหญ่ */}
            <div className="hidden lg:flex flex-wrap gap-2 justify-center pb-5 max-w-6xl mx-auto">
                {[{ id: 0, name: 'All' }, ...(genres || [])].map((genre) => (
                    <button
                        key={genre.id}
                        className={`flex justify-center items-center w-36 h-12 rounded-full border transition-colors duration-100 ease-in-out border-[#ffffff49] hover:bg-[#4d4d4d] 
                            ${category === 'movie'
                                ? (selected === genre.id
                                    ? 'bg-red-600 shadow-[0px_0px_12px_-4px_#ff7a7a] hover:bg-red-900'
                                    : 'bg-[#242424]'
                                )
                                : (selected === genre.id
                                    ? 'bg-blue-500 shadow-[0px_0px_6px_0px_#61a5ff] hover:bg-blue-900'
                                    : 'bg-[#242424]'
                                )
                            }
                            `}
                        onClick={() => setSelected(genre.id)}
                    >
                        {genre.name}
                    </button>
                ))}
            </div>

            {/* ปุ่ม Toggle สำหรับ Mobile */}
            <div className='relative'>
                <button
                    onClick={toggleMenu}
                    className={`lg:hidden block w-1/3 py-2 mx-auto  text-white font-semibold text-lg text-center rounded-xl active:scale-95 transition-transform ${category === 'movie' ? 'bg-red-600' : 'bg-blue-500'} `}
                >
                    <div className='flex items-center justify-center'>
                        {nameGenre}
                        <IoIosArrowDown className={`mx-1 text-lg transition-transform duration-100 ${isOpen ? 'rotate-180' : ''}`} />
                    </div>
                </button>

                {/* Dropdown Genres สำหรับ Mobile */}
                <AnimatePresence mode='wait'>
                    {isOpen && (
                        <motion.div
                            initial={{ scaleY: 0, opacity: 0 }} // เริ่มจากย่อขนาดลง
                            animate={{ scaleY: 1, opacity: 1 }} // ยืดเต็มขนาด
                            exit={{ scaleY: 0, opacity: 0, transition: { duration: 0.1, ease: 'easeInOut' } }} // หดกลับ
                            style={{ originY: 0 }} // ตั้งค่าให้ขยายจากด้านบน
                            className="lg:hidden grid grid-cols-2 gap-2 justify-center pb-5 w-3/4 left-[50px] mt-5 absolute   shadow-lg shadow-[#171717]/50 bg-[#00000071] backdrop-blur-md z-50 px-4 py-6 rounded-xl border-[#ffff] after:-z-10 after:conten-[] after:absolute after:inset-0 after:outline-1 after:outline after:-outline-offset-1 after:rounded-xl after:outline-white/30">
                            {[{ id: 0, name: 'All' }, ...(genres || [])].map((genre) => (
                                <button
                                    key={genre.id}
                                    className={`flex justify-center items-center w-full h-12 rounded-full border transition-colors duration-150 ease-in-out border-[#ffffff49] hover:bg-[#4d4d4d] 
                                    ${category === 'movie'
                                            ? (selected === genre.id
                                                ? 'bg-red-600 shadow-[0px_0px_12px_-4px_#ff7a7a] hover:bg-red-900' : 'bg-[#242424]')
                                            : (selected === genre.id
                                                ? 'bg-blue-500 shadow-[0px_0px_6px_0px_#61a5ff] hover:bg-blue-900'
                                                : 'bg-[#242424]'
                                            )
                                        }
                                        `}
                                    onClick={() => {
                                        setSelected(genre.id);
                                        setIsOpen(false);
                                        setNameGenre(genre.name) // ปิดเมนูหลังเลือก
                                    }}
                                >
                                    {genre.name}
                                </button>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <hr className='my-10 max-w-6xl mx-8 border-spacing-x-0.5 border-[#3a3a3a]' />


        </>
    );
}
