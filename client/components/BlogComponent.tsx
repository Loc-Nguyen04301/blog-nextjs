import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import { lato } from "../fonts";
import { formatDate } from "../utils/formatDate";
import type { UrlObject } from "url";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

interface BlogComponentProps {
  linkTo?: string | UrlObject;
  title?: string;
  thumbnail?: string | StaticImport;
  categories?: number[];
  description?: string;
  content?: string;
}

const categoryOptions = [
  { label: "Option 1", id: 1 },
  { label: "Option 2", id: 2 },
  { label: "Option 3", id: 3 },
];

const BlogComponent: FC<BlogComponentProps> = ({
  title,
  thumbnail,
  content,
  description,
  linkTo,
  categories,
}) => {
  const createdAt = formatDate(new Date());
  return (
    <div className={`mb-16`}>
      <div className="text-center">
        <h1 className="uppercase text-2xl mb-2">
          <Link href={linkTo || "#"}>{title}</Link>
        </h1>
        <p
          className={`uppercase text-xs text-subTitleColor mb-2 font-medium tracking-wider ${lato.variable} font-sans`}
        >
          {createdAt} By Lộc Nguyễn 10 comments
        </p>
        {thumbnail && (
          <Image src={thumbnail} alt="thumnai-blog" fill className="!static" />
        )}
        <div className="mt-3 border-b border-[#dd9933]"></div>
      </div>
      {description && (
        <div className={`mt-3 leading-7 ${lato.variable} font-sans text-wrap`}>
          <p className="break-words">
            {description}
            <Link
              href={linkTo || "#"}
              className="hover:text-primaryColor font-semibold ml-1"
            >
              [Read more ...]
            </Link>
          </p>
        </div>
      )}
      {content && (
        <div
          className="mt-3 break-words"
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        />
      )}
      {categories && (
        <p className={`mt-5 text-subTitleColor`}>
          <span className="mr-1">Mục lục:</span>
          {categories.map((categoryId) => {
            const option = categoryOptions.find(
              (opt) => Number(opt.id) === Number(categoryId)
            );
            return (
              option && (
                <Link href="/#" key={option.id}>
                  {option.label},{" "}
                </Link>
              )
            );
          })}
        </p>
      )}
    </div>
  );
};

export default BlogComponent;
