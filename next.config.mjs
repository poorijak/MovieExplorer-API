/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizeCss: true, // เปิดการจัดการ CSS ที่ดีขึ้น
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        pathname: "/t/p/**", // อนุญาตให้โหลดรูปภาพจาก TMDB
      },
    ],
  },
};

export default nextConfig;
