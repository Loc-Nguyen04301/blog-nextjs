import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import { lato } from "../fonts";
import thumnailBlog from "@/assets/images/thumnailBlog.jpg";
import { formatDate } from "../utils/formatDate";
import type { UrlObject } from "url";

interface BlogComponentProps {
  title: string;
  description?: string;
  content?: string;
  linkTo: string | UrlObject;
}

const BlogComponent: FC<BlogComponentProps> = ({
  title,
  content,
  description,
  linkTo,
}) => {
  const createdAt = formatDate(new Date());

  return (
    <div className={`mb-16`}>
      <div className="text-center">
        <h1 className="uppercase text-2xl mb-2">
          <Link href={linkTo}>{title}</Link>
        </h1>
        <p
          className={`uppercase text-xs text-subTitleColor mb-2 font-medium tracking-wider ${lato.variable} font-sans`}
        >
          {createdAt} By Lộc Nguyễn 10 comments
        </p>
        {thumnailBlog && (
          <Image
            src={thumnailBlog}
            alt="thumnaiblog"
            fill
            className="!static"
          />
        )}
        <div className="mt-3 border-b border-[#dd9933]"></div>
      </div>
      {description && (
        <div className={`mt-3 leading-7 ${lato.variable} font-sans text-wrap`}>
          <p className="break-words">
            {description}...
            <Link
              href={linkTo}
              className="hover:text-primaryColor font-semibold ml-1"
            >
              [Read more ...]
            </Link>
          </p>
        </div>
      )}
      {content && (
        <div
          className="mt-3"
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        />
      )}
      {/* <p className={`mt-5 text-subTitleColor`}>
        <span className="mr-1">Category:</span>
        <Link href={"/#"}>Công việc</Link>,{" "}
        <Link href={"/#"}>Hành trình của tôi </Link>{" "}
      </p> */}
    </div>
  );
};

export default BlogComponent;
