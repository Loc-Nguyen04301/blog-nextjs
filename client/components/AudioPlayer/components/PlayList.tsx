"use client";
import { trackMusics } from "@/assets/music/track";
import { useAudioPlayerContext } from "@/context/audio-player-context";
import clsx from "clsx";
import React from "react";

interface PlayListProps {
  isShowListMusic: boolean;
}

const PlayList = ({ isShowListMusic }: PlayListProps) => {
  const { trackIndex, setTrackIndex } = useAudioPlayerContext();

  return (
    <div
      className={`duration-500 ease-in-out overflow-hidden rounded-b-md  overflow-y-auto ${
        isShowListMusic ? "max-h-[400px]" : "max-h-0"
      }`}
    >
      <ul className="player-list bg-[#4c4848] text-white">
        {trackMusics.map((track, index) => (
          <li
            key={index}
            className={clsx(
              "px-3 py-2 text-left hover:bg-primaryColorBold text-sm",
              index === trackIndex &&
                "bg-mediaMainColor hover:bg-mediaMainColor"
            )}
            onClick={() => setTrackIndex(index)}
          >
            <div className="w-fit cursor-pointer">
              <span className="w-[19px] inline-block">{index + 1}.</span>
              <span>{track.title}</span>
              <span className="px-2">-</span>
              <span>{track.author}</span>
              <audio src={track.src} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlayList;
