"use client";
import React, { useState } from "react";
import mp4SrcFile from "@/public/video/mua_roi_lang_tham.mp4";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import { Alert, Button, IconButton, Popover, Snackbar } from "@mui/material";
// import FacebookColorIcon from "@/assets/icons/FacebookColorIcon";
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

type Props = {
  params: { id: string };
};

export default function Page({ params }: Props) {
  const id = params.id;
  const currentUrl = window.location.href;
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

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [copied, setCopied] = useState(false);

  const handleOpenSharePopover = (
    event: React.MouseEvent<HTMLButtonElement>
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

  return (
    <div className="flex gap-6">
      <div className="w-3/5">
        <video controls className="w-full">
          <source src={mp4SrcFile} type="video/mp4" />
          Your browser does not support HTML video.{id}
        </video>

        <div className="mt-4">
          <p className="mb-4">#pcx160 #pcx160_2025 #hondapcx160</p>
          <h1 className="mb-2 text-xl">
            PCX 160 2025 đã xuất hiện tại Việt Nam với nhiều thay đổi
          </h1>
          <div className="mb-2 flex justify-between text-xs tracking-wide">
            <span>2023/09/01</span>
            <div className="flex items-center gap-3">
              <div className="flex items-center">
                <VisibilityRoundedIcon className="text-[#8E8E90] mr-1 text-xl" />

                <span>123 views</span>
              </div>
              <IconButton onClick={handleOpenSharePopover}>
                <ShareRoundedIcon className="text-[#8E8E90] mr-1 hover:cursor-pointer text-xl" />
              </IconButton>
            </div>
          </div>
          <p className="text-sm">
            PCX 160 không sở hữu quá nhiều góc cạnh mà thay vào đó là những góc
            bo với đường vát gọt sắc sảo giúp mẫu xe tăng cường tính khí động
            học và khả năng giữ cân bằng.
          </p>
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
                  <li key={idx} className="flex flex-col gap-2 items-center">
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
      <div className="w-2/5">Comment</div>
    </div>
  );
}
