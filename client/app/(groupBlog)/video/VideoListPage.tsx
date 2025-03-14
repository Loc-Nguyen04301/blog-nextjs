"use client";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import { useAlertStore } from "@/zustand/stores/alert-store";
import VideoService from "@/services/VideoService";
import { IVideoDetail } from "@/types/video";
import { CircularProgress } from "@mui/material";
import { format } from "date-fns";
import clsx from "clsx";
import _ from "lodash";

const VideoListPage = () => {
  const Page_SIZE = 6;

  const observer = useRef<IntersectionObserver | null>(null);

  const [videos, setVideos] = useState<IVideoDetail[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [hoveredVideoId, setHoveredVideoId] = useState<string | null>(null);

  const { addError } = useAlertStore((state) => state);

  const debouncedSetPage = useMemo(
    () => _.debounce(() => setCurrentPage((prev) => prev + 1), 500),
    []
  );

  const fetchMoreData = useCallback(
    async (page: number) => {
      if (!hasMore || loading) return;

      setLoading(true);
      try {
        const response = await VideoService.getAllVideos({
          page,
          itemsPerPage: Page_SIZE,
        });
        setVideos((prev) => {
          const newVideos = response.data.data.videos;
          const combined = _.uniqBy([...prev, ...newVideos], "id");
          return combined;
        });

        if (response.data.data.videos.length < Page_SIZE) {
          setHasMore(false);
        }
      } catch (error: any) {
        addError(error);
      } finally {
        setLoading(false);
      }
    },
    [addError, hasMore, loading]
  );

  const lastVideoElementRef = useCallback(
    (node: HTMLAnchorElement) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            debouncedSetPage();
          }
        },
        { threshold: 1.0 }
      );
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, debouncedSetPage]
  );

  useEffect(() => {
    fetchMoreData(currentPage);
  }, [currentPage]);

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
        <div className="grid grid-cols-3 max-md:grid-cols-2">
          {videos.map((video, index) => {
            return videos.length === index + 1 ? (
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
                ref={lastVideoElementRef}
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
            ) : (
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
            );
          })}
        </div>
        {loading && (
          <div className="text-center">
            <CircularProgress />
          </div>
        )}
      </>
    );
};

export default VideoListPage;
