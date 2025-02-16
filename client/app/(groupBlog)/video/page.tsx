import React from "react";
import blogImage from "@/assets/images/blogImage.jpg";
import Image from "next/image";
import Link from "next/link";

export default async function Page() {
  return (
    <div className="grid grid-cols-3 max-md:grid-cols-2">
      {Array.from({ length: 20 }, (_, idx) => (
        <Link
          key={idx}
          className="m-3 cursor-pointer hover:opacity-65"
          href={`/video/${idx}`}
        >
          <div className="flex flex-col gap-2">
            <Image src={blogImage} alt="blogImage" className="w-full rounded" />
            <div className="text-sm font-medium line-clamp-2">
              Dương Đức và Sơn Hanma - Ai Là Người Mạnh Hơn Dương Đức và Sơn
              Hanma - Ai Là Người Mạnh Hơn Dương Đức và Sơn Hanma - Ai Là Người
              Mạnh Hơn
            </div>
            <div className="flex justify-between px-1 text-xs tracking-wide">
              <span className="">2023/09/01</span>
              <div>
                <span>123 views</span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
