"use client";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import { lato } from "../fonts";
import { formatDate } from "../utils/formatDate";
import type { UrlObject } from "url";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { useCategoryStore } from "@/zustand/stores/category-store";
import clsx from "clsx";

interface BlogComponentProps {
  linkTo?: string | UrlObject;
  title?: string;
  thumbnail?: string | StaticImport;
  categories?: string[];
  description?: string;
  content?: string;
  isDetail?: boolean;
  className?: string;
}

const BlogComponent: FC<BlogComponentProps> = ({
  title,
  thumbnail,
  content,
  description,
  linkTo,
  categories,
  isDetail,
  className,
}) => {
  const categoryOptions = useCategoryStore((state) => state.listCategories);
  const createdAt = formatDate(new Date());

  return (
    <div className={clsx("mb-16 border-b border-[#000]", className)}>
      <div className={clsx("mb-16", isDetail && "!mb-0")}>
        <div className="text-center">
          <h1 className="uppercase text-2xl mb-2 font-medium">
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
            <Link className="break-words" href={linkTo || "#"}>
              <div>
                <Image
                  src={thumbnail}
                  alt="thumnai-blog"
                  fill
                  className="!static max-w-[400px] mx-auto"
                />
              </div>
            </Link>
          )}
          {!isDetail && <div className="mt-8 border-b border-[#dd9933]" />}
        </div>
        {description && (
          <div className={`leading-7 ${lato.variable} font-sans text-wrap`}>
            <p className="break-words inline">{description}</p>
            <Link
              href={linkTo || "#"}
              className="hover:text-primaryColor font-semibold ml-1"
            >
              [Read more ...]
            </Link>
          </div>
        )}
        {content && (
          <div
            className="mt-3 break-words text-sm font-arial text-[#4f4f4f]"
            dangerouslySetInnerHTML={{
              __html: content,
            }}
          />
        )}
        {categories && categoryOptions && (
          <p className="mt-5 text-subTitleColor text-sm">
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
    </div>
  );
};

export default BlogComponent;
