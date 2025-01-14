"use client";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import { lato } from "../fonts";
import { formatDate } from "../utils/formatDate";
import type { UrlObject } from "url";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import thumnailBlog from "@/assets/images/thumnailBlog.jpg";
import { useCategoryStore } from "@/zustand/stores/category-store";

interface BlogComponentProps {
  linkTo?: string | UrlObject;
  title?: string;
  thumbnail?: string | StaticImport;
  categories?: string[];
  description?: string;
  content?: string;
}

const BlogComponent: FC<BlogComponentProps> = ({
  title,
  thumbnail,
  content,
  description,
  linkTo,
  categories,
}) => {
  const categoryOptions = useCategoryStore((state) => state.listCategories);
  const createdAt = formatDate(new Date());

  return (
    <div className={`mb-16`}>
      <div className="text-center">
        <h1 className="uppercase text-2xl mb-2">
          <Link className="break-words" href={linkTo || "#"}>
            {title}
          </Link>
        </h1>
        <p
          className={`uppercase text-xs text-subTitleColor mb-2 font-medium tracking-wider ${lato.variable} font-sans`}
        >
          {createdAt} By Lộc Nguyễn
        </p>
        {thumbnail && (
          <Image
            src={thumnailBlog || thumbnail}
            alt="thumnai-blog"
            fill
            className="!static"
          />
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
      {categories && categoryOptions && (
        <p className={`mt-5 text-subTitleColor`}>
          <span className="mr-1">Mục lục:</span>
          {categories.map((categoryId) => {
            const option = categoryOptions.find(
              (opt) => Number(opt.id) === Number(categoryId)
            );
            return (
              option && (
                <Link href={`/category/${option.id}`} key={option.id}>
                  {option.name},{" "}
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
