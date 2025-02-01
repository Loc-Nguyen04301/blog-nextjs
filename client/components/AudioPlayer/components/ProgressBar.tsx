import { useAudioPlayerContext } from "@/context/audio-player-context";
import { formatTimeMusic } from "@/utils/formatTimeMusic";
import React from "react";

interface ProgressBarProps {
  handleProgressChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProgressBar = ({ handleProgressChange }: ProgressBarProps) => {
  const { duration, timeProgress, progressBarRef } = useAudioPlayerContext();

  return (
    <div className="flex items-center w-full">
      <span className="mr-5 min-w-[45px]">{formatTimeMusic(timeProgress)}</span>
      <input
        className="timer-duration"
        type="range"
        onChange={handleProgressChange}
        ref={progressBarRef}
      />
      <span className="ml-5 min-w-[45px]">{formatTimeMusic(duration)}</span>
    </div>
  );
};

export default ProgressBar;
