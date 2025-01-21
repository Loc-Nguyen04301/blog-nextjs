"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import avatar from "@/assets/images/avatarMyself.jpg";
import SkipPreviousRoundedIcon from "@mui/icons-material/SkipPreviousRounded";
import SkipNextRoundedIcon from "@mui/icons-material/SkipNextRounded";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import FastRewindRoundedIcon from "@mui/icons-material/FastRewindRounded";
import RepeatRoundedIcon from "@mui/icons-material/RepeatRounded";
import ShuffleRoundedIcon from "@mui/icons-material/ShuffleRounded";
import VolumeUpRoundedIcon from "@mui/icons-material/VolumeUpRounded";
import VolumeOffRoundedIcon from "@mui/icons-material/VolumeOffRounded";
import VolumeDownRoundedIcon from "@mui/icons-material/VolumeDownRounded";
import QueueMusicRoundedIcon from "@mui/icons-material/QueueMusicRounded";
import { IconButton, Button } from "@mui/material";
import { trackMusics } from "@/assets/music/track";
import { useAudioPlayerContext } from "@/context/audio-player-context";
const AudioPlayer = () => {
  const [isShowListMusic, setShowListMusic] = useState(true);
  const {
    currentTrack,
    audioRef,
    duration,
    timeProgress,
    isPlaying,
    progressBarRef,
    setCurrentTrack,
    setDuration,
    setIsPlaying,
    setTimeProgress,
    setTrackIndex,
  } = useAudioPlayerContext();

  const onLoadedMetadata = () => {
    const duration = audioRef.current?.duration;
    if (duration !== undefined) {
      setDuration(duration);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying]);

  return (
    <div className="max-w-[600px] text-center mx-auto">
      <div className="min-h-8 bg-[#2e2d2d] flex flex-col gap-3 justify-between items-center text-white p-4">
        <div className="flex items-center gap-4">
          <div className="w-24 h-24 rounded">
            <Image
              src={currentTrack.thumbnail || ""}
              alt="avatarMyself"
              className="rounded"
            />
          </div>
          <div>
            <p className="font-bold">{currentTrack.title}</p>
            <p className="text-sm text-gray-400 text-left">
              {currentTrack.author}
            </p>
          </div>
        </div>
        <audio
          src={currentTrack.src}
          ref={audioRef}
          onLoadedMetadata={onLoadedMetadata}
        />
        <div className="w-full flex flex-col items-center gap-1 flex-1">
          <div className="flex gap-2">
            <IconButton>
              <SkipPreviousRoundedIcon className="text-white" />
            </IconButton>
            <IconButton>
              <FastRewindRoundedIcon className="text-white" />
            </IconButton>

            <IconButton onClick={() => setIsPlaying((prev) => !prev)}>
              {isPlaying ? (
                <PauseRoundedIcon className="text-white" />
              ) : (
                <PlayArrowRoundedIcon className="text-white" />
              )}
            </IconButton>

            <IconButton className="p-0">
              <FastRewindRoundedIcon className="text-white rotate-180 " />
            </IconButton>
            <IconButton>
              <SkipNextRoundedIcon className="text-white" />
            </IconButton>
            <IconButton>
              <ShuffleRoundedIcon className="text-white" />
            </IconButton>
            <IconButton>
              <RepeatRoundedIcon className="text-white" />
            </IconButton>
          </div>
          <div className="flex items-center justify-center w-full gap-5">
            <span>{timeProgress}</span>
            <input
              className="min-w-[80%] bg-gray-300 border-2 cursor-pointer h-[2px] rounded-sm"
              type="range"
              defaultValue={0}
              ref={progressBarRef}
            />
            <span>{duration}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-gray-400">
          <IconButton className="p-0">
            <VolumeUpRoundedIcon className="text-white" />
          </IconButton>
          <input
            className="min-w-[80%] bg-gray-300 border-2 cursor-pointer h-[2px] rounded-sm"
            type="range"
            defaultValue={0}
          />
          <IconButton
            className="p-0"
            onClick={() => setShowListMusic((prev) => !prev)}
          >
            <QueueMusicRoundedIcon
              className={isShowListMusic ? "text-mediaMainColor" : "text-white"}
            />
          </IconButton>
        </div>
      </div>
      <div
        className={`transition-max-height duration-300 ease-in-out overflow-hidden ${
          isShowListMusic ? "max-h-72" : "max-h-0"
        }`}
      >
        {/* <PlayList /> */}
        <ul className="player-list bg-[#4c4848] text-white max-h-[280px] overflow-y-auto">
          {trackMusics.map((track, index) => (
            <li className="px-3 py-1 text-left hover:bg-primaryColorBold text-sm">
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
    </div>
  );
};

export default AudioPlayer;
