import React, { useEffect, useState } from "react";
import { fetchVideo } from "../../../../../Service/imdbAPI";

const VideoTrailer = ({ id }) => {
  const [video, setVideo] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getVideo = async () => {
      setLoading(true);
      try {
        const res = await fetchVideo("movie", id);
        setVideo(res || []);
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
    (video) =>
      video.type.toLowerCase() === "trailer" &&
      video.site.toLowerCase() === "youtube",
  );

  // เลือก 5 คลิปแรกจาก youtubeTrailers
  const top5Trailers = youtubeTrailers.slice(0, 5);

  console.log(video);

  return (
    <div className="mx-auto w-full">
      {loading ? (
        <p>Loading...</p>
      ) : top5Trailers.length > 0 ? (
        <div className="mx-auto w-full">
          <div className="w-full">
            <h3 className="mb-4 text-2xl font-semibold">Watch Trailers</h3>
          </div>
          {top5Trailers.map((trailer) => (
            <div key={trailer.key} className="mb-4 flex justify-center">
              <div className="relative h-0 w-full pb-[56.25%] lg:w-[80%]">
                <iframe
                  className="absolute left-0 top-0 h-full w-full rounded-2xl"
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
