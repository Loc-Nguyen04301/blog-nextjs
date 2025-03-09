"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAlertStore } from "@/zustand/stores/alert-store";
import InfiniteScroll from "react-infinite-scroll-component";
import VideoService from "@/services/VideoService";
import { IVideoDetail } from "@/types/video";
import { CircularProgress } from "@mui/material";
import { format } from "date-fns";
import clsx from "clsx";

const VideoListPage = () => {
  const Page_SIZE = 6;

  const [videos, setVideos] = useState<IVideoDetail[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [hoveredVideoId, setHoveredVideoId] = useState<string | null>(null);

  const { setLoading: setLoadingApp, addError } = useAlertStore(
    (state) => state
  );

  const fetchMoreData = async () => {
    if (page === 1) {
      setLoadingApp(true);
    } else {
      setLoading(true);
    }

    try {
      const response = await VideoService.getAllVideos({
        page,
        itemsPerPage: Page_SIZE,
      });

      if (response.data.data.videos.length < Page_SIZE) {
        setHasMore(false);
      }

      setLoadingApp(false);
      setLoading(false);
      setVideos((prev) => {
        const newListVideo = [...prev, ...response.data.data.videos];
        return newListVideo;
      });
      setPage((prevPage) => prevPage + 1);
    } catch (error: any) {
      addError(error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchMoreData();
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (hoveredVideoId) {
      const videoElement = document.getElementById(
        hoveredVideoId
      ) as HTMLVideoElement;
      if (videoElement) {
        videoElement
          .play()
          .catch((error) => console.log("Autoplay blocked:", error));
      }
    }
  }, [hoveredVideoId]);

  if (videos)
    return (
      <>
        <InfiniteScroll
          dataLength={videos.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<></>}
          scrollThreshold={"1000px"}
        >
          <div className="grid grid-cols-3 max-md:grid-cols-2">
            {videos?.map((video) => (
              <Link
                key={video.id}
                className="m-3 cursor-pointer duration-300"
                href={`/video/${video.id}`}
                onMouseEnter={() => setHoveredVideoId(video.id)}
                onMouseLeave={() => {
                  setHoveredVideoId(null);
                  const videoElement = document.getElementById(
                    video.id
                  ) as HTMLVideoElement;
                  if (videoElement) videoElement.pause();
                }}
              >
                <div className="flex flex-col gap-2">
                  <div className="relative">
                    <video
                      id={video.id}
                      autoPlay={hoveredVideoId === video.id}
                      muted
                      loop
                    >
                      <source src={video.videoUrl} type="video/mp4" />
                    </video>
                    <div className="absolute right-1 bottom-[4%] bg-[#00000080] text-white text-[8px] px-1 rounded-[4px] tracking-wide">
                      {video.duration}
                    </div>
                  </div>
                  <div
                    className={clsx(
                      "text-sm px-1 font-medium line-clamp-2",
                      hoveredVideoId === video.id && "opacity-65"
                    )}
                  >
                    {video.title}
                  </div>
                  <div
                    className={clsx(
                      "flex justify-between px-1 text-xs tracking-wide text-[10px]",
                      hoveredVideoId === video.id && "opacity-65"
                    )}
                  >
                    <span>
                      {format(new Date(video.createdAt), "yyyy/MM/dd")}
                    </span>
                    <span>{video.viewers} views</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </InfiniteScroll>
        {loading && (
          <div className="text-center">
            <CircularProgress />
          </div>
        )}
      </>
    );
};

export default VideoListPage;
