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
      <div>
        <p className="font-bold">{currentTrack.title}</p>
        <p className="text-sm text-gray-400 text-left">{currentTrack.author}</p>
      </div>
    </div>
  );
};

export default TrackInfo;
