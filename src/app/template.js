"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LoadingPage from "../components/Loading/Page";
import { usePathname } from "next/navigation"; // คอมโพเนนต์หน้าจอโหลด

export default function Template({ children }) {
  const [Loading, setLoading] = useState(true); // กำหนดเริ่มต้นเป็น true
  const pathName = usePathname();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 2000); // ปรับเวลาให้โหลด 2000ms
    return () => clearTimeout(timer);
  }, [pathName]);

  useEffect(() => {
    console.log("Template Loading state: ", Loading); // ตรวจสอบค่า Loading
  }, [Loading]);

  return (
    <>
      <AnimatePresence>
        {Loading && (
          <motion.div
            key="loading"
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#0D0D0D]"
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 1 }}
            exit={{ scaleY: 0 }}
            style={{ originY: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.8, 0.25, 1] }}
          >
            <LoadingPage />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ตรวจสอบว่าเป็น React element แล้วจึงส่ง props */}
      {React.isValidElement(children)
        ? React.cloneElement(children, { Loading }) // ส่ง props ไปยัง children
        : children // หากไม่ใช่ React element ก็ให้แสดง children ตามปกติ
      }
    </>
  );
}
