import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Autoplay, Navigation } from 'swiper/modules';


export default function GenresFillter({ selected, setSelected, genres }) {
    return (
        <div>
            <Swiper
                modules={[Autoplay, Mousewheel, Navigation]}
                direction='horizontal'
                spaceBetween={2}
                slidesPerView={10}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }}
                breakpoints={{

                    768: {
                        slidesPerView: 4,
                        spaceBetween: 10,
                    },
                    1024: {
                        slidesPerView: 5,
                        spaceBetween: 10,
                    },
                    1280: {
                        slidesPerView: 6,
                        spaceBetween: 10,
                    },
                    1580: {
                        slidesPerView: 7,
                        spaceBetween: 10,
                    }
                }}
                // autoplay={{
                //   delay: 10000,
                //   disableOnInteraction: true, // ไม่ปิด autoplay เมื่อใช้ mousewheel
                // }}
                mousewheel={{
                    forceToAxis: true,
                    releaseOnEdges: true,
                }}
                

                className='max-w-full h-auto mb-10'
            >
                {
                    [{ id: 0, name: 'all' }, ...(genres || [])].map((genre) => (
                        <SwiperSlide key={genre.id}>
                            <button
                                className={`px-2 w-30 h-10 rounded-full mx-2 ${selected === genre.id ? 'bg-red-600' : 'bg-[#fffff]'}`}
                                onClick={() => setSelected(genre.id)}
                            >
                                {genre.name}
                            </button>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    )
}
