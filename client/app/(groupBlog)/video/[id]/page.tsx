"use client";
import React from "react";
import mp4SrcFile from "@/public/video/mua_roi_lang_tham.mp4";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";

type Props = {
  params: { id: string };
};

export default function Page({ params }: Props) {
  const id = params.id;
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
            <div className="flex gap-3">
              <div className="flex items-center">
                <VisibilityRoundedIcon className="text-[#8E8E90] mr-1 text-xl" />
                <span>123 views</span>
              </div>
              <ShareRoundedIcon className="text-[#8E8E90] mr-1 hover:cursor-pointer text-xl" />
            </div>
          </div>
          <p className="text-sm">
            PCX 160 không sở hữu quá nhiều góc cạnh mà thay vào đó là những góc
            bo với đường vát gọt sắc sảo giúp mẫu xe tăng cường tính khí động
            học và khả năng giữ cân bằng.
          </p>
        </div>
      </div>
      <div className="w-2/5">CommentComment</div>
    </div>
  );
}
