"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
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
import TrackInfo from "./components/TrackInfo";

const formatTime = (time: number | undefined): string => {
  if (typeof time === "number" && !isNaN(time)) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    // Convert to string and pad with leading zeros if necessary
    const formatMinutes = minutes.toString().padStart(2, "0");
    const formatSeconds = seconds.toString().padStart(2, "0");
    return `${formatMinutes}:${formatSeconds}`;
  }
  return "00:00";
};

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

  const [isShuffle, setIsShuffle] = useState<boolean>(false);
  const [isRepeat, setIsRepeat] = useState<boolean>(false);
  const playAnimationRef = useRef<number | null>(null);

  const onLoadedMetadata = () => {
    const audioDuration = audioRef.current?.duration;
    if (audioDuration !== undefined) {
      // lấy thời gian của audio tính bằng seconds
      setDuration(audioDuration);
      if (progressBarRef.current) {
        // đặt max cho thành progress
        progressBarRef.current.max = audioDuration.toString();
      }
    }
  };

  const handleProgressChange = () => {
    if (audioRef.current && progressBarRef.current) {
      // lấy giá trị khi change thanh progress = thời gian audio chạy được
      const newTime = Number(progressBarRef.current.value);
      audioRef.current.currentTime = newTime;
      setTimeProgress(newTime);

      progressBarRef.current.style.setProperty(
        "--range-progress",
        `${(newTime / duration) * 100}%`
      );
    }
  };

  const updateProgress = useCallback(() => {
    if (audioRef.current && progressBarRef.current && duration) {
      // set thời gian đã chạy được của audio thông qua timeProgress
      const currentTime = audioRef.current?.currentTime;
      setTimeProgress(currentTime);

      progressBarRef.current.value = currentTime.toString();
      progressBarRef.current.style.setProperty(
        "--range-progress",
        `${(currentTime / duration) * 100}%`
      );
    }
  }, [duration, setTimeProgress, audioRef, progressBarRef]);

  const startAnimation = useCallback(() => {
    if (audioRef.current && progressBarRef.current && duration) {
      const animate = () => {
        updateProgress();
        playAnimationRef.current = requestAnimationFrame(animate);
      };
      playAnimationRef.current = requestAnimationFrame(animate);
    }
  }, [updateProgress, duration, audioRef, progressBarRef]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
      startAnimation();
    } else {
      audioRef.current?.pause();
      if (playAnimationRef.current !== null) {
        cancelAnimationFrame(playAnimationRef.current);
        playAnimationRef.current = null;
      }
      updateProgress();
    }

    return () => {
      if (playAnimationRef.current !== null) {
        cancelAnimationFrame(playAnimationRef.current);
      }
    };
  }, [isPlaying]);

  console.log({ duration, timeProgress });

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
    }
  }, []);

  return (
    <div className="max-w-[600px] text-center mx-auto">
      <div className="min-h-8 bg-[#2e2d2d] flex flex-col gap-3 justify-between items-center text-white p-4">
        <TrackInfo />
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
            <IconButton onClick={() => setTrackIndex((prev) => prev + 1)}>
              <SkipNextRoundedIcon className="text-white" />
            </IconButton>
            <IconButton onClick={() => setIsShuffle((prev) => !prev)}>
              <ShuffleRoundedIcon
                className={isShuffle ? "text-mediaMainColor" : "text-white"}
              />
            </IconButton>
            <IconButton onClick={() => setIsRepeat((prev) => !prev)}>
              <RepeatRoundedIcon
                className={isRepeat ? "text-mediaMainColor" : "text-white"}
              />
            </IconButton>
          </div>
          <div className="flex items-center justify-center w-full gap-5">
            <span>{formatTime(timeProgress)}</span>
            <input
              className={`min-w-[80%] bg-gray-300 timer-duration`}
              type="range"
              defaultValue={0}
              ref={progressBarRef}
              onChange={handleProgressChange}
            />
            <span>{formatTime(duration)}</span>
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
            <li
              className="px-3 py-2 text-left hover:bg-primaryColorBold text-sm"
              key={index}
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
    </div>
  );
};

export default AudioPlayer;
