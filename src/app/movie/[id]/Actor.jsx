import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Autoplay, Navigation } from 'swiper/modules';


const Actor = ({ cast }) => {
    return (
        <div>
            <div>
                <h2>Top Billed Cast</h2>
            </div>
            <div>
                <Swiper
                    modules={[Autoplay, Mousewheel, Navigation]}
                    direction='horizontal'
                    spaceBetween={10}
                    slidesPerView={2}
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


                    className='max-w-full h-auto mb-10 '
                >
                    
                </Swiper>
            </div>
        </div>
    )
}

export default Actor