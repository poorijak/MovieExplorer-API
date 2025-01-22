"use client";
import Link from "next/link";
import React, { useState, useEffect, use } from "react";
import { RiMovie2AiFill } from "react-icons/ri";
import { motion, AnimatePresence, delay } from "framer-motion";
import { FiSearch } from "react-icons/fi";
import { useRouter, usePathname } from "next/navigation";
import { Squash as Hamburger } from "hamburger-react";

export default function Navbar() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [toggled, setToggled] = useState(false);
  const pathName = usePathname();
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    const query = search.trim().startsWith("search/")
      ? search.trim().slice(7)
      : search.trim();
    console.log("Search Query : ", query);

    router.push(`search/${query}`);
  };

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

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollPosition]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setIsOpen(false);
    setToggled(false);
  }, [pathName]);

  const items = {
    hidden: {
      opacity: 0,
      y: -20,
    },
    show: {
      opacity: 1,
      y: 0,
    },
    visible: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  };

  return (
    <>
      <motion.div className="flex w-full justify-center rounded-xl transition-transform duration-300">
        {/* desktop navbar */}
        <motion.div
          variants={{
            visible: { y: 0 },
            hidden: { y: "-200%" },
          }}
          initial={{ y: "-200%" }}
          animate={isVisible ? "visible" : "hidden"}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className={`fixed top-0 mt-3 h-[52px] w-11/12 bg-[#17171771] shadow-lg shadow-[#171717]/50 lg:w-[935px] ${isOpen ? "backdrop-blur-none" : "backdrop-blur-lg"} after:conten-[] z-50 rounded-xl border-[#ffff] px-4 after:absolute after:inset-0 after:-z-10 after:rounded-xl after:outline after:outline-1 after:-outline-offset-1 after:outline-white/30 lg:px-10`}
        >
          <div className="relative flex h-full w-full items-center justify-between">
            <div className="">
              <Link href={"/"}>
                <RiMovie2AiFill className="text-2xl lg:text-3xl" />
              </Link>
            </div>

            {/* desktop nav */}
            <div className="hidden items-center gap-8 text-lg font-medium lg:flex">
              <Link href={"/"}>Home</Link>
              <Link href={"/MainContent"}>Movie</Link>
              <Link href={"#"}>Tv Series</Link>
              <Link href={"#"}>My List</Link>
            </div>
            <form
              action=""
              className="gruop hidden items-center lg:flex"
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                name=""
                id=""
                className="w-44 bg-transparent focus:outline-none"
                placeholder="search your keywords..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="rounded-lg px-4 py-1.5 text-2xl font-medium text-gray-400 transition-transform duration-300 hover:scale-105 hover:text-white">
                <FiSearch />
              </button>
            </form>

            {/* moblie nav */}
            <div className="flex items-center lg:hidden">
              <button onClick={toggleMenu}>
                <Hamburger size={25} toggled={toggled} toggle={setToggled} />
              </button>
            </div>
          </div>

          <AnimatePresence>
            {isOpen ? (
              <motion.div
                initial={{ scaleY: 0, opacity: 0 }} // เริ่มจากย่อขนาดลง
                animate={{ scaleY: 1, opacity: 1 }} // ยืดเต็มขนาด
                exit={{
                  scaleY: 0,
                  opacity: 0,
                  transition: { duration: 0.3, ease: "easeInOut" },
                }} // หดกลับ
                style={{ originY: 0 }} // ตั้งค่าให้ขยายจากด้านบน
                className="after:conten-[] absolute top-[52px] z-50 mt-2 flex w-11/12 flex-col items-center rounded-xl border-[#ffff] bg-[#00000071] px-4 py-6 shadow-lg shadow-[#171717]/50 backdrop-blur-lg after:absolute after:inset-0 after:-z-10 after:rounded-xl after:outline after:outline-1 after:-outline-offset-1 after:outline-white/30"
              >
                <ul className="ml-5 flex w-full flex-col items-center text-4xl font-bold">
                  <motion.li
                    variants={items}
                    initial="hidden"
                    animate="show"
                    exit="visible"
                    className="mb-5 pt-5"
                  >
                    <Link href={"/"}>Home</Link>
                  </motion.li>
                  <motion.li
                    variants={items}
                    initial="hidden"
                    animate="show"
                    exit="visible"
                    className="mb-5"
                  >
                    <Link href={"/"}>Movie</Link>
                  </motion.li>

                  <motion.li
                    variants={items}
                    initial="hidden"
                    animate="show"
                    exit="visible"
                    className="mb-5"
                  >
                    <Link href={"/"}>Tv Series</Link>
                  </motion.li>

                  <motion.li
                    variants={items}
                    initial="hidden"
                    animate="show"
                    exit="visible"
                    className="mb-5"
                  >
                    <Link href={"/"}>My List</Link>
                  </motion.li>
                </ul>

                <motion.form
                  variants={items}
                  initial="hidden"
                  animate="show"
                  exit="visible"
                  action=""
                  className="flex items-center"
                  onSubmit={handleSubmit}
                >
                  <input
                    type="text"
                    name=""
                    id=""
                    className="w-44 bg-transparent focus:outline-none"
                    placeholder="search your keywords..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <button className="rounded-lg px-4 py-1.5 text-2xl font-medium text-gray-400 transition-transform duration-300 hover:scale-105 hover:text-white">
                    <FiSearch />
                  </button>
                </motion.form>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </>
  );
}
