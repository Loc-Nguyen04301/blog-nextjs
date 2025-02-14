"use client";
import { IconButton } from "@mui/material";
import React from "react";
import SkipPreviousRoundedIcon from "@mui/icons-material/SkipPreviousRounded";
import SkipNextRoundedIcon from "@mui/icons-material/SkipNextRounded";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import RepeatRoundedIcon from "@mui/icons-material/RepeatRounded";
import Replay10Icon from "@mui/icons-material/Replay10";
import Forward10Icon from "@mui/icons-material/Forward10";

interface ControlTrackProps {
  isPlaying: boolean;
  isRepeat: boolean;
  handlePreviousTrack: () => void;
  handleNextTrack: () => void;
  handleReplayTen: () => void;
  handleForwardTen: () => void;
  handlePlayToggle: () => void;
  handleRepeatToggle: () => void;
}

const ControlTrack = ({
  handlePreviousTrack,
  handleNextTrack,
  handleReplayTen,
  handleForwardTen,
  isPlaying,
  isRepeat,
  handlePlayToggle,
  handleRepeatToggle,
}: ControlTrackProps) => {
  return (
    <div className="flex gap-2 items-center">
      <IconButton onClick={handlePreviousTrack}>
        <SkipPreviousRoundedIcon className="text-white" />
      </IconButton>
      <IconButton onClick={handleReplayTen}>
        <Replay10Icon className="text-white" />
      </IconButton>

      <IconButton onClick={handlePlayToggle}>
        {isPlaying ? (
          <PauseRoundedIcon className="text-white" />
        ) : (
          <PlayArrowRoundedIcon className="text-white" />
        )}
      </IconButton>

      <IconButton onClick={handleForwardTen}>
        <Forward10Icon className="text-white" />
      </IconButton>

      <IconButton onClick={handleNextTrack}>
        <SkipNextRoundedIcon className="text-white" />
      </IconButton>

      <IconButton onClick={handleRepeatToggle}>
        <RepeatRoundedIcon
          className={isRepeat ? "text-mediaMainColor" : "text-white"}
        />
      </IconButton>
    </div>
  );
};

export default ControlTrack;
