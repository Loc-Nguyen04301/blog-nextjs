"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import thumnailBlog from "@/assets/images/thumnailBlog.jpg";
import { lato } from "@/app/fonts";

const BlogComponent = () => {
  return (
    <>
      {Array.from({ length: 3 }, (_, idx) => (
        <div
          className={`${lato.variable} font-sans pb-16 mb-16 border-b border-[#000]`}
          key={idx}
        >
          <div className="text-center">
            <h1 className="uppercase text-2xl mb-2">
              <Link href={`/blog/${idx}`}>
                Tại sao tôi ngừng viết & Tương lai The Present Writer
              </Link>
            </h1>
            <p
              className={`uppercase text-xs text-subTitleColor mb-2 font-medium tracking-wider `}
            >
              March 6, 2024 By Chi Nguyễn 29 comments
            </p>
            <Image src={thumnailBlog} alt="thumnaiblog" />
            <div className="mt-3 border-b border-[#dd9933]"></div>
          </div>
          <p className={`mt-3 leading-7`}>
            Đã khá lâu tôi không đăng bài viết mới trên blog. Đôi lúc tôi tự
            hỏi: Cái tên “The Present Writer” có còn đúng nữa không khi mình
            không còn là một writer (người viết) trong lòng công chúng? Mới cách
            đây vài hôm, tôi nhận được một tin nhắn trên Instagram: “Em theo dõi
            chị mấy năm nay qua YouTube và podcast nhưng hôm nay em mới biết chị
            có cả blog!” Đối với các bạn khán giả mới (và đôi khi cả với chính
            tôi!), thật khó có thể tưởng tượng rằng tôi bắt đầu xây dựng thương
            hiệu The Present Writer với trang blog này năm 2016. Phải tới 4 năm
            sau, năm 2020, các kênh video và podcast mới ra đời. Đã có những
            giai đoạn, hàng năm liền, tôi đều đặn đăng bài viết mới vào thứ Tư
            hàng tuần. Dù bận rộn, đau …
            <Link
              href={`/link-to-detail-blog`}
              className="hover:text-primaryColor font-semibold ml-1"
            >
              [Read more ...]
            </Link>
          </p>
          <p className={`mt-5 text-subTitleColor`}>
            <span className="mr-1">Category:</span>
            <Link href={"/#"}>Công việc</Link>,{" "}
            <Link href={"/#"}>Hành trình của tôi </Link>{" "}
          </p>
        </div>
      ))}
    </>
  );
};

export default BlogComponent;
