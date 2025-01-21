import React, { useEffect, useState } from 'react';
import { fetchVideo } from '../../../../Service/imdbAPI'; // ฟังก์ชัน fetch ที่ใช้ดึงข้อมูล

const VideoTrailer = ({ id }) => {
    const [video, setVideo] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getVideo = async () => {
            setLoading(true);
            try {
                const res = await fetchVideo('movie', id); // เรียก API เพื่อดึงข้อมูล
                setVideo(res || []); // เก็บข้อมูลที่ดึงมาใน state
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        getVideo();
    }, [id]);

    // คัดเลือกคลิปที่เป็น "trailer" และ "YouTube"
    const youtubeTrailers = video.filter(
        (video) => video.type.toLowerCase() === 'trailer' && video.site.toLowerCase() === 'youtube'
    );

    // เลือก 5 คลิปแรกจาก youtubeTrailers
    const top5Trailers = youtubeTrailers.slice(0, 5);

    console.log(video);


    return (
        <div className='w-full mx-auto'>
            {loading ? (
                <p>Loading...</p>
            ) : top5Trailers.length > 0 ? (
                <div className="w-full mx-auto">
                    <div className='w-full'>
                        <h3 className='text-2xl font-semibold mb-4'>Watch Trailers</h3>
                    </div>
                    {top5Trailers.map((trailer) => (
                        <div key={trailer.key} className="mb-4 justify-center flex ">
                            <div className="relative  w-full lg:w-[80%] pb-[56.25%]  h-0">
                                <iframe
                                    className="absolute top-0 left-0 w-full h-full rounded-2xl"
                                    src={`https://www.youtube.com/embed/${trailer.key}`}
                                    title={trailer.name}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No Trailer Available</p>
            )}
        </div>
    );
};

export default VideoTrailer;
