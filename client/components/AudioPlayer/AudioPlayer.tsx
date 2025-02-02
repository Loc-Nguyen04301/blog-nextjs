"use client";
import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import VolumeUpRoundedIcon from "@mui/icons-material/VolumeUpRounded";
import VolumeOffRoundedIcon from "@mui/icons-material/VolumeOffRounded";
import VolumeDownRoundedIcon from "@mui/icons-material/VolumeDownRounded";
import { IconButton } from "@mui/material";
import { useAudioPlayerContext } from "@/context/audio-player-context";
import TrackInfo from "./components/TrackInfo";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import PlaylistRemoveIcon from "@mui/icons-material/PlaylistRemove";

import PlayList from "./components/PlayList";
import { useAlertStore } from "@/zustand/stores/alert-store";
import ControlTrack from "./components/ControlTrack";
import ProgressBar from "./components/ProgressBar";

const INITIALVOLUME = 60;

const AudioPlayer = () => {
  const {
    currentTrack,
    audioRef,
    duration,
    isPlaying,
    progressBarRef,
    volumeBarRef,
    trackIndex,
    setDuration,
    setIsPlaying,
    setTimeProgress,
    setTrackIndex,
  } = useAudioPlayerContext();
  const { setLoading } = useAlertStore();
  const [isShowListMusic, setShowListMusic] = useState(true);
  const [isRepeat, setIsRepeat] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(INITIALVOLUME);
  const [muteVolume, setMuteVolume] = useState(false);
  const prevTrackIndexRef = useRef<number | null>(null);
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
      progressBarRef.current.value = currentTime.toString();
      setTimeProgress(currentTime);

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

  const handleNextTrack = () => {
    setTrackIndex((prev) => prev + 1);
  };

  const handlePreviousTrack = () => {
    setTrackIndex((prev) => prev - 1);
  };

  const handleChangeMuteVolume = () => {
    setMuteVolume((prev) => !prev);
  };

  const handleVolumeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(e.target.value));
  };

  const handleReplayTen = () => {
    if (audioRef.current) {
      audioRef.current.currentTime -= 10;
      updateProgress();
    }
  };

  const handleForwardTen = () => {
    if (audioRef.current) {
      audioRef.current.currentTime += 10;
      updateProgress();
    }
  };

  const handlePlayToggle = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleRepeatToggle = () => {
    setIsRepeat((prev) => !prev);
  };

  useEffect(() => {
    setLoading(true);
    if (audioRef.current) {
      audioRef.current.load();
      setLoading(false);
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

  // automatically playing when song have finished playing
  useEffect(() => {
    const currentAudioRef = audioRef.current;

    if (currentAudioRef) {
      currentAudioRef.onended = () => {
        if (isRepeat) {
          currentAudioRef.play();
        } else {
          handleNextTrack();
        }
      };
    }

    return () => {
      if (currentAudioRef) {
        currentAudioRef.onended = null;
      }
    };
  }, [isRepeat, audioRef]);

  // automatically playing when change song
  useEffect(() => {
    if (
      typeof prevTrackIndexRef.current === "number" &&
      typeof trackIndex === "number" &&
      prevTrackIndexRef.current !== trackIndex
    ) {
      setIsPlaying(true);
    }

    prevTrackIndexRef.current = trackIndex;
  }, [trackIndex]);

  // reset current track when component unmounted
  useEffect(() => {
    return () => {
      setTrackIndex(0);
    };
  }, []);

  return (
    <div className="max-w-[600px] text-center mx-auto">
      <div className="min-h-8 bg-[#2e2d2d] flex flex-col gap-3 justify-between items-center text-white p-3 pt-6 rounded-t-md">
        <TrackInfo />
        <audio
          src={currentTrack.src}
          ref={audioRef}
          onLoadedMetadata={onLoadedMetadata}
        />
        <div className="w-full flex flex-col items-center gap-1 flex-1">
          <ControlTrack
            isRepeat={isRepeat}
            isPlaying={isPlaying}
            handleNextTrack={handleNextTrack}
            handlePreviousTrack={handlePreviousTrack}
            handlePlayToggle={handlePlayToggle}
            handleRepeatToggle={handleRepeatToggle}
            handleForwardTen={handleForwardTen}
            handleReplayTen={handleReplayTen}
          />
          <ProgressBar handleProgressChange={handleProgressChange} />
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
            {isShowListMusic ? (
              <PlaylistAddCheckIcon className="text-white" />
            ) : (
              <PlaylistRemoveIcon className="text-white" />
            )}
          </IconButton>
        </div>
      </div>
      <PlayList isShowListMusic={isShowListMusic} />
    </div>
  );
};

export default AudioPlayer;
