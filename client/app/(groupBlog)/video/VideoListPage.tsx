"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
// import VideoService from "@/services/VideoService";
// import { IVideoDetail } from "@/types/video";
import blogImage from "@/assets/images/blogImage.jpg";
import InfiniteScroll from "react-infinite-scroll-component";
import VideoService from "@/services/VideoService";

const VideoListPage = () => {
  //   const videos: IVideoDetail[] = response.data.videos;
  const [videos, setVideos] = useState<IVideoDetail[]>();
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchMoreData = async () => {
    const response = await VideoService.getAllVideos({ page, itemsPerPage: 3 });
    try {
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {}, []);

  if (videos)
    return (
      <InfiniteScroll
        dataLength={videos.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        <div className="grid grid-cols-3 max-md:grid-cols-2">
          {/* {videos?.map((video) => (
        <Link
          key={video.id}
          className="m-3 cursor-pointer hover:opacity-65"
          href={`/video/${video.id}`}
        >
          <div className="flex flex-col gap-2">
            <Image src={blogImage} alt="blogImage" className="w-full rounded" />
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
      ))} */}

          {Array.from({ length: 20 }, (_, idx) => (
            <Link
              key={idx}
              className="m-3 cursor-pointer hover:opacity-65"
              href={`/video/${idx}`}
            >
              <div className="flex flex-col gap-2">
                <Image
                  src={blogImage}
                  alt="blogImage"
                  className="w-full rounded"
                />
                <div className="text-sm font-medium line-clamp-2">
                  Dương Đức và Sơn Hanma - Ai Là Người Mạnh Hơn Dương Đức và Sơn
                  Hanma - Ai Là Người Mạnh Hơn Dương Đức và Sơn Hanma - Ai Là
                  Người Mạnh Hơn
                </div>
                <div className="flex justify-between px-1 text-xs tracking-wide">
                  <span>2023/09/01</span>
                  <div>
                    <span>123 views</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </InfiniteScroll>
    );
};

export default VideoListPage;
