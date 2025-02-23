import React, { useState } from "react";
import { motion, AnimatePresence, delay } from "framer-motion";
import { IoIosArrowDown } from "react-icons/io";

export default function GenresFilter({
  selected,
  setSelected,
  genres,
  category,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [nameGenre, setNameGenre] = useState("All");

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Genres สำหรับหน้าจอใหญ่ */}
      <div className="mx-auto hidden max-w-6xl flex-wrap justify-center gap-2 pb-5 lg:flex">
        {[{ id: 0, name: "All" }, ...(genres || [])].map((genre) => (
          <button
            key={genre.id}
            className={`flex h-12 w-36 items-center justify-center rounded-full border border-[#ffffff49] transition-colors duration-100 ease-in-out hover:bg-[#4d4d4d] ${
              category === "movie"
                ? selected === genre.id
                  ? "bg-red-600 shadow-[0px_0px_12px_-4px_#ff7a7a] hover:bg-red-900"
                  : "bg-[#242424]"
                : selected === genre.id
                  ? "bg-blue-500 shadow-[0px_0px_6px_0px_#61a5ff] hover:bg-blue-900"
                  : "bg-[#242424]"
            } `}
            onClick={() => setSelected(genre.id)}
          >
            {genre.name}
          </button>
        ))}
      </div>

      {/* ปุ่ม Toggle สำหรับ Mobile */}
      <div className="relative">
        <button
          onClick={toggleMenu}
          className={`mx-auto block w-1/3 rounded-xl py-2 text-center text-lg font-semibold text-white transition-transform active:scale-95 lg:hidden ${category === "movie" ? "bg-red-600" : "bg-blue-500"} `}
        >
          <div className="flex items-center justify-center">
            {nameGenre}
            <IoIosArrowDown
              className={`mx-1 text-lg transition-transform duration-100 ${isOpen ? "rotate-180" : ""}`}
            />
          </div>
        </button>

        {/* Dropdown Genres สำหรับ Mobile */}
        <AnimatePresence mode="wait">
          {isOpen && (
            <motion.div
              initial={{ scaleY: 0, opacity: 0 }} // เริ่มจากย่อขนาดลง
              animate={{ scaleY: 1, opacity: 1 }} // ยืดเต็มขนาด
              exit={{
                scaleY: 0,
                opacity: 0,
                transition: { duration: 0.1, ease: "easeInOut" },
              }} // หดกลับ
              style={{ originY: 0 }} // ตั้งค่าให้ขยายจากด้านบน
              className="after:conten-[] absolute left-[50px] z-50 mt-5 grid w-3/4 grid-cols-2 justify-center gap-2 rounded-xl border-[#ffff] bg-[#00000071] px-4 py-6 pb-5 shadow-lg shadow-[#171717]/50 backdrop-blur-md after:absolute after:inset-0 after:-z-10 after:rounded-xl after:outline after:outline-1 after:-outline-offset-1 after:outline-white/30 lg:hidden"
            >
              {[{ id: 0, name: "All" }, ...(genres || [])].map((genre) => (
                <button
                  key={genre.id}
                  className={`flex h-12 w-full items-center justify-center rounded-full border border-[#ffffff49] transition-colors duration-150 ease-in-out hover:bg-[#4d4d4d] ${
                    category === "movie"
                      ? selected === genre.id
                        ? "bg-red-600 shadow-[0px_0px_12px_-4px_#ff7a7a] hover:bg-red-900"
                        : "bg-[#242424]"
                      : selected === genre.id
                        ? "bg-blue-500 shadow-[0px_0px_6px_0px_#61a5ff] hover:bg-blue-900"
                        : "bg-[#242424]"
                  } `}
                  onClick={() => {
                    setSelected(genre.id);
                    setIsOpen(false);
                    setNameGenre(genre.name); // ปิดเมนูหลังเลือก
                  }}
                >
                  {genre.name}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <hr className="mx-10 my-10 w-[100wh] border-spacing-x-0.5 border-[#3a3a3a]" />
    </>
  );
}
