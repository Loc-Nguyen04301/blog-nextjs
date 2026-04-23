"use client";
import React, { useEffect, useState } from "react";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import {
  Alert,
  Button,
  CircularProgress,
  IconButton,
  Popover,
  Snackbar,
} from "@mui/material";
import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
  TelegramShareButton,
  LinkedinShareButton,
} from "react-share";

import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import TelegramIcon from "@mui/icons-material/Telegram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import VideoService from "@/services/VideoService";
import { IVideoDetail } from "@/types/video";
import { useAlertStore } from "@/zustand/stores/alert-store";
import VideoCommentComponent from "@/components/VideoCommentComponent";

type DetailVideoPageClientSideProps = {
  id: string;
};

const socialIcons = [
  { component: EmailShareButton, icon: <EmailIcon />, label: "Email" },
  {
    component: FacebookShareButton,
    icon: <FacebookIcon />,
    label: "Facebook",
  },
  { component: TwitterShareButton, icon: <TwitterIcon />, label: "X" },
  {
    component: TelegramShareButton,
    icon: <TelegramIcon />,
    label: "Telegram",
  },
  {
    component: LinkedinShareButton,
    icon: <LinkedInIcon />,
    label: "LinkedIn",
  },
];

const DetailVideoPageClientSide = ({ id }: DetailVideoPageClientSideProps) => {
  const [currentUrl, setCurrentUrl] = useState("");
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [copied, setCopied] = useState(false);
  const [video, setVideo] = useState<IVideoDetail | null>(null);
  const { setLoading, addError } = useAlertStore();

  const handleOpenSharePopover = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const handleCopyUrl = async () => {
    handleClosePopover();
    await navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  useEffect(() => {
    const fetchVideo = async () => {
      setLoading(true);
      try {
        const response = await VideoService.getVideosById(id);
        setVideo(response.data);
      } catch (error) {
        const err = error as any;
        addError(err?.response?.data?.message || "Failed to load video");
      } finally {
        setLoading(false);
      }
    };
    fetchVideo();
  }, [id, addError, setLoading]);

  if (!video) {
    return (
      <div className="flex justify-center items-center h-64">
        <CircularProgress />
      </div>
    );
  }

  const formattedDate = new Date(video.createdAt).toLocaleDateString("en-CA");
  const tags = video.videoTags?.map((t) => `#${t}`).join(" ");

  const getYouTubeEmbedUrl = (url: string): string | null => {
    const match = url.match(
      /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    );
    return match ? `https://www.youtube.com/embed/${match[1]}` : null;
  };

  const youtubeEmbedUrl = getYouTubeEmbedUrl(video.videoUrl);

  return (
    <div className="flex gap-6">
      <div className="w-3/5">
        {youtubeEmbedUrl ? (
          <iframe
            className="w-full aspect-video"
            src={youtubeEmbedUrl}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <video controls className="w-full" preload="metadata">
            <source src={`${video.videoUrl}#t=0.1`} type="video/mp4" />
            Your browser does not support HTML video.
          </video>
        )}

        <div className="mt-4">
          <p className="mb-4">{tags}</p>
          <h1 className="mb-2 text-xl">{video.title}</h1>
          <div className="mb-2 flex justify-between text-xs tracking-wide">
            <span>{formattedDate}</span>
            <div className="flex items-center gap-3">
              <div className="flex items-center">
                <VisibilityRoundedIcon className="text-[#8E8E90] mr-1 text-xl" />
                <span>{video.viewers} views</span>
              </div>
              <IconButton onClick={handleOpenSharePopover}>
                <ShareRoundedIcon className="text-[#8E8E90] mr-1 hover:cursor-pointer text-xl" />
              </IconButton>
            </div>
          </div>
          <p className="text-sm">{video.description}</p>
        </div>
      </div>
      <Popover
        id={"idPopover"}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        sx={{
          "& .MuiBackdrop-root": {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
        }}
      >
        <div className="p-4">
          <div className="flex justify-center gap-5">
            <ul className="flex gap-4">
              {socialIcons.map((item, idx) => {
                const ShareButtonComponent = item.component;
                return (
                  <li
                    key={idx}
                    className="flex flex-col gap-2 items-center hover:opacity-60"
                  >
                    <ShareButtonComponent url={currentUrl}>
                      {item.icon}
                    </ShareButtonComponent>
                    <span className="text-[#0f0f0f] text-xs">{item.label}</span>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="p-2 rounded-lg border border-solid border-[rgba(0,0,0,0.12)] mt-2">
            <div className="flex justify-between items-center">
              <span className="text-xs mr-4">{currentUrl}</span>
              <Button
                className="ml-10 text-xs !text-white"
                variant="contained"
                onClick={handleCopyUrl}
                size="small"
              >
                Copy
              </Button>
            </div>
          </div>
        </div>
      </Popover>
      {copied && (
        <Snackbar
          open={copied}
          key={id}
          anchorOrigin={{ horizontal: "center", vertical: "top" }}
        >
          <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
            Copied!
          </Alert>
        </Snackbar>
      )}
      <VideoCommentComponent id={id} />
    </div>
  );
};

export default DetailVideoPageClientSide;
