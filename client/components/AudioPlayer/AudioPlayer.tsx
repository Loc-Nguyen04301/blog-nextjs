"use client";
import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
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
import { IconButton } from "@mui/material";
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

const INITIALVOLUME = 100;

const AudioPlayer = () => {
  const {
    currentTrack,
    audioRef,
    duration,
    timeProgress,
    isPlaying,
    progressBarRef,
    volumeBarRef,
    setDuration,
    setIsPlaying,
    setTimeProgress,
    setTrackIndex,
  } = useAudioPlayerContext();

  const [isShowListMusic, setShowListMusic] = useState(true);
  const [isShuffle, setIsShuffle] = useState<boolean>(false);
  const [isRepeat, setIsRepeat] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(INITIALVOLUME);
  const [muteVolume, setMuteVolume] = useState(false);
  const playAnimationRef = useRef<number | null>(null);

  const onLoadedMetadata = () => {
    console.log("onLoadedMetadata");
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
    console.log("handleProgressChange");
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
    console.log("updateProgress");
    if (audioRef.current && progressBarRef.current && duration) {
      // set thời gian đã chạy được của audio thông qua timeProgress
      const currentTime = audioRef.current?.currentTime;
      progressBarRef.current.value = currentTime.toString();
      setTimeProgress(currentTime);

      progressBarRef.current.style.setProperty(
        "--range-progress",
        `${(currentTime / duration) * 100}%`
      );
    }
  }, [duration, setTimeProgress, audioRef, progressBarRef]);

  const startAnimation = useCallback(() => {
    console.log("startAnimation");
    if (audioRef.current && progressBarRef.current && duration) {
      const animate = () => {
        updateProgress();
        playAnimationRef.current = requestAnimationFrame(animate);
      };
      playAnimationRef.current = requestAnimationFrame(animate);
    }
  }, [updateProgress, duration, audioRef, progressBarRef]);

  const handleNextTrack = () => {
    setTrackIndex((prev) => prev + 1);
  };

  const handlePreviousTrack = () => {
    setTrackIndex((prev) => prev - 1);
  };

  const handleChangeMuteVolume = () => {
    setMuteVolume((prev) => !prev);

    // volumeBarRef.current?.style.setProperty("--range-volume", "0");
  };

  const handleVolumeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(e.target.value));

    // volumeBarRef.current?.style.setProperty(
    //   "--range-volume",
    //   `${e.target.value}%`
    // );
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
    }
  }, [currentTrack.src]);

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
  }, [isPlaying, startAnimation, updateProgress, audioRef]);

  useEffect(() => {
    volume === 0 ? setMuteVolume(true) : setMuteVolume(false);
  }, [volume]);

  useEffect(() => {
    volumeBarRef.current?.style.setProperty("--range-volume", `${volume}%`);
  }, [volume]);

  useEffect(() => {
    muteVolume ? setVolume(0) : setVolume(INITIALVOLUME);
  }, [muteVolume]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
      audioRef.current.muted = muteVolume;
    }
  }, [volume, audioRef, muteVolume]);

  return (
    <div className="max-w-[600px] text-center mx-auto">
      <div className="min-h-8 bg-[#2e2d2d] flex flex-col gap-3 justify-between items-center text-white p-6">
        <TrackInfo />
        <audio
          src={currentTrack.src}
          ref={audioRef}
          onLoadedMetadata={onLoadedMetadata}
        />
        <div className="w-full flex flex-col items-center gap-1 flex-1">
          <div className="flex gap-2 items-center">
            <IconButton onClick={handlePreviousTrack}>
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

            <IconButton onClick={handleNextTrack}>
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
          <div className="flex items-center w-full">
            <span className="mr-5 min-w-[45px]">
              {formatTime(timeProgress)}
            </span>
            <input
              className="timer-duration"
              type="range"
              onChange={handleProgressChange}
              ref={progressBarRef}
            />
            <span className="ml-5 min-w-[45px]">{formatTime(duration)}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-gray-400">
          <IconButton className="p-0" onClick={handleChangeMuteVolume}>
            {muteVolume ? (
              <VolumeOffRoundedIcon className="text-white" />
            ) : !muteVolume && volume >= 40 ? (
              <VolumeUpRoundedIcon className="text-white" />
            ) : (
              <VolumeDownRoundedIcon className="text-white" />
            )}
          </IconButton>
          <input
            className="volume"
            type="range"
            min={0}
            max={100}
            value={volume}
            onChange={handleVolumeChange}
            ref={volumeBarRef}
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
    </div>
  );
};

export default AudioPlayer;
