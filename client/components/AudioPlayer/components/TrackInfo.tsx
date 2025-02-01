"use client";
import { useAudioPlayerContext } from "@/context/audio-player-context";
import Image from "next/image";
import React from "react";

const TrackInfo = () => {
  const { currentTrack } = useAudioPlayerContext();

  return (
    <div className="flex items-center gap-4">
      <div className="w-24 h-24 rounded">
        <Image
          src={currentTrack.thumbnail || ""}
          alt="avatarMyself"
          className="rounded h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-1">
        <p className="font-bold text-lg">{currentTrack.title}</p>
        <p className="text-xs text-left font-medium">{currentTrack.author}</p>
        <p className="text-xs text-left font-medium">Nhạc trẻ - Việt Nam</p>
      </div>
    </div>
  );
};

export default TrackInfo;
