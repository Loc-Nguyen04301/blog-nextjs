import { Metadata } from "next";
import React from "react";
import BlogByMonthClientSide from "./BlogByMonthClientSide";

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] };
}): Promise<Metadata> {
  const [year, month] = params.slug || [];
  return {
    title:
      year && month
        ? `${year}/${month} - Tìm kiếm blog`
        : "Mục lục - Loc Nguyen Writer",
    description: `${year}/${month} - Tìm kiếm blog`,
    icons: {
      icon: "/favicon.ico",
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  return (
    <>
      <BlogByMonthClientSide slug={slug} />
    </>
  );
}
