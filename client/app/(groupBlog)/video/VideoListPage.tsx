"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAlertStore } from "@/zustand/stores/alert-store";
import blogImage from "@/assets/images/blogImage.jpg";
import InfiniteScroll from "react-infinite-scroll-component";
import VideoService from "@/services/VideoService";
import { IVideoDetail } from "@/types/video";
import { CircularProgress } from "@mui/material";

const VideoListPage = () => {
  const Page_SIZE = 6;
  const [videos, setVideos] = useState<IVideoDetail[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

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

      setLoadingApp(false);
      setLoading(false);
      setVideos((prev) => {
        const newListVideo = [...prev, ...response.data.data.videos];
        return newListVideo;
      });

      if (response.data.data.videos.length < Page_SIZE) {
        setHasMore(false);
      } else {
        setPage((prevPage) => prevPage + 1);
      }
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

  if (videos)
    return (
      <>
        <InfiniteScroll
          dataLength={videos.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<></>}
          scrollThreshold={"200px"}
        >
          <div className="grid grid-cols-3 max-md:grid-cols-2">
            {videos?.map((video) => (
              <Link
                key={video.id}
                className="m-3 cursor-pointer hover:opacity-65"
                href={`/video/${video.id}`}
              >
                <div className="flex flex-col gap-2">
                  <Image
                    src={blogImage}
                    alt="blogImage"
                    className="w-full rounded"
                  />
                  <div className="text-sm font-medium line-clamp-2">
                    {video.title}
                  </div>
                  <div className="flex justify-between px-1 text-xs tracking-wide">
                    <span>{video.createdAt as string}</span>
                    <div>
                      <span>{video.viewers} views</span>
                    </div>
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
