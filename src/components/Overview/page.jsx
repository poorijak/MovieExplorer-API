import React, { useState } from "react";
import { useCollapse } from "react-collapsed";

const page = ({ text }) => {
  const previewLength = 200; // จำนวนตัวอักษรที่จะแสดง
  // หาตำแหน่งที่ดีที่สุดเพื่อให้ไม่ตัดคำกลาง
  const cutText = (str, length) => {
    const cutAt = str.lastIndexOf(" ", length); // หาตำแหน่งช่องว่างใกล้ที่สุด
    return cutAt === -1 ? str : str.slice(0, cutAt); // ถ้าไม่พบช่องว่างให้ตัดที่ตำแหน่งนี้
  };

  const showText = cutText(text, previewLength); // แสดงข้อความแรกที่ตัดที่ช่องว่าง
  const hiddenText = text.slice(showText.length); // ข้อความที่เหลือหลังจากตัด

  const [isExpanded, setExpanded] = useState(false);
  const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded });

  return (
    <div className="block text-center lg:hidden lg:text-left">
      <p className="text-white">
        {showText}
        {!isExpanded && hiddenText.length > 0 && "..."}
      </p>
      {hiddenText.length > 0 && (
        <>
          <p {...getCollapseProps()} className="text-white">
            {hiddenText}
          </p>
          <div className="flex justify-center">
            <button
              {...getToggleProps({
                onClick: () => setExpanded((prev) => !prev),
              })}
              className="mt-5 rounded-full border border-[#6b6b6b] bg-[#1d1d1d] px-5 py-1 text-white"
            >
              {isExpanded ? "Read less" : "Read more"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default page;
