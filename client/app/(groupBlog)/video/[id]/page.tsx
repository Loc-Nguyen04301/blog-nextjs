"use client";
import React, { useState } from "react";
import mp4SrcFile from "@/public/video/mua_roi_lang_tham.mp4";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import { Button, IconButton, Popover } from "@mui/material";
import FacebookColorIcon from "@/assets/icons/FacebookColorIcon";

type Props = {
  params: { id: string };
};

export default function Page({ params }: Props) {
  const id = params.id;

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
  const idPopover = open ? "simple-absjgdahsld" : undefined;

  const handleCopyUrl = async () => {
    await navigator.clipboard.writeText(window.location.href);
    handleClosePopover();

    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {}
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
        id={idPopover}
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
        <div className="p-6">
          <div className="flex justify-center gap-5">
            <div className="flex flex-col gap-2 items-center">
              <FacebookColorIcon style={{ fontSize: "40px" }} />
              <span className="text-[#0f0f0f] text-xs">Facebook</span>
            </div>
          </div>

          <div className="p-2 rounded-lg border border-solid border-[rgba(0,0,0,0.12)] mt-4">
            <span>{window.location.href}</span>
            <Button
              className="ml-10"
              variant="contained"
              onClick={handleCopyUrl}
            >
              Copy
            </Button>
          </div>
        </div>
      </Popover>
      {copied && <span className="ml-2 text-green-500">Copied!</span>}
      <div className="w-2/5">Comment</div>
    </div>
  );
}
